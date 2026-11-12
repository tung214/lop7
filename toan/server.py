#!/usr/bin/env python3
"""Server LAN cho web Toán 7 — chỉ dùng thư viện chuẩn Python.

Chạy:   python3 server.py            (cổng mặc định 8000)
        python3 server.py --port 8080
Các máy cùng wifi mở địa chỉ được in ra (vd http://192.168.1.17:8000).
Dữ liệu lưu trong thư mục data/ cạnh file này. Chỉ dùng trong mạng nhà (không có HTTPS).
"""
import argparse
import base64
import json
import os
import re
import secrets
import shutil
import socket
import threading
import time
from datetime import date, datetime, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, unquote, urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.join(ROOT, 'web')
DATA = os.environ.get('TOAN7_DATA') or os.path.join(ROOT, 'data')
UPLOADS = os.path.join(DATA, 'uploads')
BACKUPS = os.path.join(DATA, 'backup')
COLS = ['students', 'attempts', 'assignments', 'drafts', 'reads']
KEEP_BACKUP_DAYS = 14
MAX_BODY = 25 * 1024 * 1024

LOCK = threading.Lock()
SESSIONS = {}          # token -> session dict
FAILS = {}             # ip -> [count, first_ts]  (chống dò PIN)
_last_backup_day = None


def now_iso():
    return datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S.') + f'{datetime.now().microsecond // 1000:03d}Z'


def path_of(col):
    return os.path.join(DATA, col + '.json')


def read_col(col):
    try:
        with open(path_of(col), encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


def write_col(col, obj):
    """Ghi an toàn: file tạm rồi os.replace. Gọi khi đang giữ LOCK."""
    daily_backup()
    tmp = path_of(col) + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False)
    os.replace(tmp, path_of(col))


def daily_backup():
    global _last_backup_day
    today = date.today().isoformat()
    if _last_backup_day == today:
        return
    _last_backup_day = today
    dest = os.path.join(BACKUPS, today)
    if not os.path.exists(dest):
        os.makedirs(dest, exist_ok=True)
        for name in COLS + ['settings']:
            src = path_of(name)
            if os.path.exists(src):
                shutil.copy2(src, dest)
    # xoá bản sao lưu cũ
    days = sorted(d for d in os.listdir(BACKUPS) if re.fullmatch(r'\d{4}-\d{2}-\d{2}', d))
    for d in days[:-KEEP_BACKUP_DAYS]:
        shutil.rmtree(os.path.join(BACKUPS, d), ignore_errors=True)


def visible(sess, col, item):
    if sess['role'] == 'parent':
        return True
    sid = sess['studentId']
    if col == 'students':
        return item.get('id') == sid
    if col == 'assignments':
        return sid in (item.get('studentIds') or [])
    return item.get('studentId') == sid


def can_write(sess, col, item):
    if sess['role'] == 'parent':
        return True
    return col in ('attempts', 'drafts', 'reads') and item.get('studentId') == sess['studentId']


def public_student(s):
    return {'id': s['id'], 'name': s['name'], 'color': s.get('color')}


def merge_into(incoming):
    n = 0
    for col in COLS:
        data = read_col(col)
        changed = False
        for item in (incoming.get(col) or {}).values():
            if not isinstance(item, dict) or 'id' not in item:
                continue
            cur = data.get(item['id'])
            if not cur or (item.get('updatedAt') or '') >= (cur.get('updatedAt') or ''):
                data[item['id']] = item
                n += 1
                changed = True
        if changed:
            write_col(col, data)
    st = read_col('settings')
    pin = (incoming.get('settings') or {}).get('parentPin')
    if pin and not st.get('parentPin'):
        st['parentPin'] = pin
        write_col('settings', st)
    return n


def save_data_url(data_url):
    m = re.match(r'data:image/(jpeg|png|webp);base64,(.+)', data_url or '', re.S)
    if not m:
        raise ValueError('Ảnh không hợp lệ')
    ext = 'jpg' if m.group(1) == 'jpeg' else m.group(1)
    name = f"{int(time.time())}-{secrets.token_hex(4)}.{ext}"
    os.makedirs(UPLOADS, exist_ok=True)
    with open(os.path.join(UPLOADS, name), 'wb') as f:
        f.write(base64.b64decode(m.group(2)))
    return 'uploads/' + name


class Handler(SimpleHTTPRequestHandler):
    server_version = 'Toan7/1.0'

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=WEB, **kw)

    def log_message(self, fmt, *args):
        if args and '/api/' in str(args[0]):
            super().log_message(fmt, *args)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    # ---------- helpers ----------
    def send_json(self, obj, status=200):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def fail(self, msg, status=400):
        self.send_json({'error': msg}, status)

    def body(self):
        n = int(self.headers.get('Content-Length') or 0)
        if n > MAX_BODY:
            raise ValueError('Dữ liệu quá lớn')
        return json.loads(self.rfile.read(n) or b'{}')

    def session(self):
        return SESSIONS.get(self.headers.get('X-Token') or '')

    # ---------- routing ----------
    def do_GET(self):
        u = urlparse(self.path)
        if u.path.startswith('/uploads/'):
            name = os.path.basename(unquote(u.path))
            fp = os.path.join(UPLOADS, name)
            if not os.path.isfile(fp):
                return self.fail('Không tìm thấy', 404)
            # ảnh có tên ngẫu nhiên, khó đoán; chỉ dùng trong mạng nhà
            self.send_response(200)
            self.send_header('Content-Type', 'image/png' if name.endswith('.png') else 'image/jpeg')
            self.end_headers()
            with open(fp, 'rb') as f:
                shutil.copyfileobj(f, self.wfile)
            return
        if u.path.startswith('/api/'):
            return self.api('GET', u)
        if u.path.startswith('/data') or '..' in u.path:
            return self.fail('Không có quyền', 403)
        return super().do_GET()

    def do_POST(self):
        self.api('POST', urlparse(self.path))

    def do_PUT(self):
        self.api('PUT', urlparse(self.path))

    def do_DELETE(self):
        self.api('DELETE', urlparse(self.path))

    def api(self, method, u):
        try:
            parts = [unquote(p) for p in u.path[len('/api/'):].split('/') if p]
            q = {k: v[0] for k, v in parse_qs(u.query).items()}
            with LOCK:
                return self.route(method, parts, q)
        except (ValueError, json.JSONDecodeError) as e:
            return self.fail(str(e))
        except Exception as e:  # noqa
            return self.fail('Lỗi server: ' + str(e), 500)

    def route(self, method, parts, q):
        head = parts[0] if parts else ''
        settings = read_col('settings')

        if head == 'ping':
            return self.send_json({'ok': True, 'mode': 'server'})
        if head == 'setup':
            if method == 'GET':
                return self.send_json({'hasParent': bool(settings.get('parentPin')), 'studentCount': len(read_col('students'))})
            if settings.get('parentPin'):
                return self.fail('Đã cài đặt')
            pin = str(self.body().get('parentPin') or '')
            if not re.fullmatch(r'\d{4,8}', pin):
                return self.fail('PIN phải gồm 4–8 chữ số')
            settings['parentPin'] = pin
            write_col('settings', settings)
            return self.send_json({'ok': True})
        if head == 'students' and len(parts) == 2 and parts[1] == 'public':
            return self.send_json(sorted((public_student(s) for s in read_col('students').values()), key=lambda s: s['name']))
        if head == 'login' and method == 'POST':
            ip = self.client_address[0]
            cnt, t0 = FAILS.get(ip, [0, time.time()])
            if cnt >= 10 and time.time() - t0 < 300:
                return self.fail('Nhập sai quá nhiều, đợi 5 phút', 429)
            b = self.body()
            sess = None
            if b.get('role') == 'parent':
                if settings.get('parentPin') and str(b.get('pin')) == settings['parentPin']:
                    sess = {'role': 'parent'}
            else:
                s = read_col('students').get(b.get('studentId') or '')
                if s and str(b.get('pin')) == s.get('pin'):
                    sess = {'role': 'student', 'studentId': s['id'], 'name': s['name'], 'color': s.get('color')}
            if not sess:
                FAILS[ip] = [cnt + 1, t0 if cnt else time.time()]
                return self.fail('Sai PIN', 403)
            FAILS.pop(ip, None)
            token = secrets.token_urlsafe(24)
            SESSIONS[token] = sess
            return self.send_json({'token': token, 'session': sess})

        sess = self.session()
        if not sess:
            return self.fail('Chưa đăng nhập', 401)
        is_parent = sess['role'] == 'parent'

        if head == 'settings' and parts[1:] == ['parentPin'] and method == 'PUT':
            if not is_parent:
                return self.fail('Không có quyền', 403)
            pin = str(self.body().get('pin') or '')
            if not re.fullmatch(r'\d{4,8}', pin):
                return self.fail('PIN phải gồm 4–8 chữ số')
            settings['parentPin'] = pin
            write_col('settings', settings)
            return self.send_json({'ok': True})
        if head == 'upload' and method == 'POST':
            return self.send_json({'url': save_data_url(self.body().get('dataUrl'))})
        if head == 'export' and method == 'GET':
            if not is_parent:
                return self.fail('Không có quyền', 403)
            out = {c: read_col(c) for c in COLS}
            out['settings'] = settings
            return self.send_json(out)
        if head == 'import' and method == 'POST':
            if not is_parent:
                return self.fail('Không có quyền', 403)
            return self.send_json({'merged': merge_into(self.body())})

        if head not in COLS:
            return self.fail('Không tìm thấy', 404)
        col = head
        data = read_col(col)

        if len(parts) == 1 and method == 'GET':
            items = [it for it in data.values() if visible(sess, col, it)]
            sid = q.get('studentId')
            if sid:
                if col == 'assignments':
                    items = [it for it in items if sid in (it.get('studentIds') or [])]
                else:
                    items = [it for it in items if it.get('studentId') == sid]
            if col == 'students' and not is_parent:
                items = [public_student(s) for s in items]
            return self.send_json(items)

        if len(parts) != 2:
            return self.fail('Đường dẫn không hợp lệ', 404)
        item_id = parts[1]

        if method == 'GET':
            it = data.get(item_id)
            if not it or not visible(sess, col, it):
                return self.fail('Không tìm thấy', 404)
            return self.send_json(it if is_parent or col != 'students' else public_student(it))
        if method == 'PUT':
            item = self.body()
            item['id'] = item_id
            old = data.get(item_id)
            if not can_write(sess, col, item) or (old and not can_write(sess, col, old)):
                return self.fail('Không có quyền', 403)
            if col == 'attempts' and not is_parent:      # con không tự chấm tự luận
                item['essayGrades'] = (old or {}).get('essayGrades') or {}
            item['updatedAt'] = now_iso()
            data[item_id] = item
            write_col(col, data)
            return self.send_json(item)
        if method == 'DELETE':
            old = data.get(item_id)
            if old:
                if not can_write(sess, col, old):
                    return self.fail('Không có quyền', 403)
                del data[item_id]
                write_col(col, data)
            return self.send_json({'ok': True})
        return self.fail('Phương thức không hỗ trợ', 405)


def lan_ips():
    ips = set()
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('10.255.255.255', 1))
        ips.add(s.getsockname()[0])
        s.close()
    except OSError:
        pass
    try:
        for info in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            ips.add(info[4][0])
    except OSError:
        pass
    return sorted(ip for ip in ips if not ip.startswith('127.'))


def main():
    ap = argparse.ArgumentParser(description='Server LAN cho web Toán 7')
    ap.add_argument('--port', type=int, default=8000)
    ap.add_argument('--host', default='0.0.0.0')
    args = ap.parse_args()
    os.makedirs(UPLOADS, exist_ok=True)
    os.makedirs(BACKUPS, exist_ok=True)
    srv = ThreadingHTTPServer((args.host, args.port), Handler)
    print('Web Toán 7 đang chạy. Mở trên các máy cùng wifi:')
    for ip in lan_ips() or ['<IP máy này>']:
        print(f'   http://{ip}:{args.port}')
    print(f'   (trên máy này: http://localhost:{args.port})')
    print(f'Dữ liệu: {DATA}\nNhấn Ctrl+C để dừng.')
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print('\nĐã dừng.')


if __name__ == '__main__':
    main()
