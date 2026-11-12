// Lớp lưu trữ: cùng một giao diện cho 2 chế độ
//  - LocalBackend: localStorage (mở index.html trực tiếp)
//  - ServerBackend: gọi /api của server.py (chạy qua mạng LAN)
// Collections: students, attempts, assignments, drafts, reads
'use strict';

const COLS = ['students', 'attempts', 'assignments', 'drafts', 'reads'];

const safeStorage = (kind) => {
  const mem = {};
  let s = null;
  try { s = window[kind]; s.setItem('__t', '1'); s.removeItem('__t'); } catch (e) { s = null; }
  return {
    get: k => { try { return s ? s.getItem(k) : (mem[k] ?? null); } catch (e) { return mem[k] ?? null; } },
    set: (k, v) => { if (s) s.setItem(k, v); else mem[k] = v; },   // ném lỗi khi đầy để báo người dùng
    del: k => { try { s ? s.removeItem(k) : delete mem[k]; } catch (e) { } },
  };
};
const LS = safeStorage('localStorage');
const SS = safeStorage('sessionStorage');

const uid = (p = '') => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const now = () => new Date().toISOString();

// Quyền xem: học sinh chỉ thấy dữ liệu của mình
function visibleTo(session, col, item) {
  if (!session) return false;
  if (session.role === 'parent') return true;
  const sid = session.studentId;
  if (col === 'students') return item.id === sid;
  if (col === 'assignments') return (item.studentIds || []).includes(sid);
  return item.studentId === sid;
}
function canWrite(session, col, item) {
  if (!session) return false;
  if (session.role === 'parent') return true;
  if (col === 'attempts' || col === 'drafts' || col === 'reads') return item.studentId === session.studentId;
  return false;
}
function publicStudent(s) { return { id: s.id, name: s.name, color: s.color }; }

// Gộp dữ liệu theo id + updatedAt (bản mới hơn thắng)
function mergeInto(target, incoming) {
  let n = 0;
  for (const col of COLS) {
    for (const item of Object.values(incoming[col] || {})) {
      const cur = target[col][item.id];
      if (!cur || (item.updatedAt || '') >= (cur.updatedAt || '')) { target[col][item.id] = item; n++; }
    }
  }
  if (incoming.settings && incoming.settings.parentPin && !target.settings.parentPin) target.settings.parentPin = incoming.settings.parentPin;
  return n;
}

// ---------------- Local ----------------
const LocalBackend = {
  mode: 'local',
  _db: null,
  load() {
    if (this._db) return this._db;
    const db = { settings: JSON.parse(LS.get('toan7.settings') || '{}') };
    for (const c of COLS) db[c] = JSON.parse(LS.get('toan7.' + c) || '{}');
    return (this._db = db);
  },
  save(col) {
    const db = this.load();
    try {
      if (col === 'settings') LS.set('toan7.settings', JSON.stringify(db.settings));
      else LS.set('toan7.' + col, JSON.stringify(db[col]));
    } catch (e) {
      throw new Error('Bộ nhớ trình duyệt đã đầy. Hãy Sao lưu rồi xoá bớt ảnh/bài cũ, hoặc dùng chế độ server.');
    }
  },
  async setupInfo() { const db = this.load(); return { hasParent: !!db.settings.parentPin, studentCount: Object.keys(db.students).length }; },
  async setup(parentPin) { const db = this.load(); if (db.settings.parentPin) throw new Error('Đã cài đặt'); db.settings.parentPin = parentPin; this.save('settings'); },
  async listStudents() { return Object.values(this.load().students).map(publicStudent).sort((a, b) => a.name.localeCompare(b.name, 'vi')); },
  async login(role, studentId, pin) {
    const db = this.load();
    if (role === 'parent') return db.settings.parentPin && db.settings.parentPin === pin ? { role: 'parent' } : null;
    const s = db.students[studentId];
    return s && s.pin === pin ? { role: 'student', studentId: s.id, name: s.name, color: s.color } : null;
  },
  async setParentPin(session, pin) { if (session.role !== 'parent') throw new Error('Không có quyền'); this.load().settings.parentPin = pin; this.save('settings'); },
  async list(session, col, query = {}) {
    let items = Object.values(this.load()[col]).filter(it => visibleTo(session, col, it));
    if (query.studentId) items = items.filter(it => col === 'assignments' ? (it.studentIds || []).includes(query.studentId) : it.studentId === query.studentId);
    if (col === 'students' && session.role !== 'parent') items = items.map(publicStudent);
    return items;
  },
  async get(session, col, id) { const it = this.load()[col][id]; return it && visibleTo(session, col, it) ? it : null; },
  async put(session, col, item) {
    if (!canWrite(session, col, item)) throw new Error('Không có quyền');
    const db = this.load();
    if (col === 'attempts' && session.role !== 'parent') {   // con không tự chấm được tự luận
      const old = db.attempts[item.id];
      item.essayGrades = old ? old.essayGrades || {} : {};
    }
    item.updatedAt = now();
    db[col][item.id] = item; this.save(col); return item;
  },
  async del(session, col, id) {
    const db = this.load(); const it = db[col][id];
    if (!it) return; if (!canWrite(session, col, it)) throw new Error('Không có quyền');
    delete db[col][id]; this.save(col);
  },
  async uploadImage(session, dataUrl) { return dataUrl; },
  async exportAll(session) {
    if (session.role !== 'parent') throw new Error('Không có quyền');
    const db = this.load(); return JSON.parse(JSON.stringify(db));
  },
  async importData(session, data) {
    // cho phép khi: phụ huynh, hoặc máy chưa có phụ huynh (máy của con nhận gói)
    const db = this.load();
    if (session?.role !== 'parent' && db.settings.parentPin) throw new Error('Cần đăng nhập phụ huynh');
    const n = mergeInto(db, data);
    for (const c of COLS) this.save(c); this.save('settings');
    return n;
  },
  async exportStudentWork(session) {   // học sinh: gửi bài cho phụ huynh
    const db = this.load(); const sid = session.studentId;
    const pick = col => Object.fromEntries(Object.values(db[col]).filter(x => x.studentId === sid).map(x => [x.id, x]));
    return { kind: 'bai-lam', from: session.name, students: { [sid]: db.students[sid] }, attempts: pick('attempts'), reads: pick('reads') };
  },
};

// ---------------- Server ----------------
const ServerBackend = {
  mode: 'server',
  token: null,
  async call(method, path, body) {
    const res = await fetch('api/' + path, {
      method, headers: { 'Content-Type': 'application/json', ...(this.token ? { 'X-Token': this.token } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401 && this.token) { this.token = null; SS.del('toan7.session'); location.hash = '#/login'; }
    if (!res.ok) throw new Error(data.error || ('Lỗi server ' + res.status));
    return data;
  },
  async setupInfo() { return this.call('GET', 'setup'); },
  async setup(parentPin) { return this.call('POST', 'setup', { parentPin }); },
  async listStudents() { return this.call('GET', 'students/public'); },
  async login(role, studentId, pin) {
    try { const r = await this.call('POST', 'login', { role, studentId, pin }); this.token = r.token; return r.session; }
    catch (e) { if (/PIN/.test(e.message)) return null; throw e; }
  },
  async setParentPin(session, pin) { return this.call('PUT', 'settings/parentPin', { pin }); },
  async list(session, col, query = {}) {
    const q = query.studentId ? '?studentId=' + encodeURIComponent(query.studentId) : '';
    return this.call('GET', col + q);
  },
  async get(session, col, id) { try { return await this.call('GET', col + '/' + encodeURIComponent(id)); } catch (e) { return null; } },
  async put(session, col, item) { return this.call('PUT', col + '/' + encodeURIComponent(item.id), item); },
  async del(session, col, id) { return this.call('DELETE', col + '/' + encodeURIComponent(id)); },
  async uploadImage(session, dataUrl) { return (await this.call('POST', 'upload', { dataUrl })).url; },
  async exportAll() { return this.call('GET', 'export'); },
  async importData(session, data) { return (await this.call('POST', 'import', data)).merged; },
  async exportStudentWork(session) {
    const attempts = await this.list(session, 'attempts'); const reads = await this.list(session, 'reads');
    const byId = a => Object.fromEntries(a.map(x => [x.id, x]));
    return { kind: 'bai-lam', from: session.name, attempts: byId(attempts), reads: byId(reads) };
  },
};

// ---------------- Facade ----------------
const Store = {
  backend: LocalBackend,
  session: null,
  get mode() { return this.backend.mode; },
  async init() {
    if (location.protocol.startsWith('http')) {
      try {
        const r = await fetch('api/ping'); const j = await r.json();
        if (j.ok) this.backend = ServerBackend;
      } catch (e) { /* không có server → dùng localStorage */ }
    }
    const saved = SS.get('toan7.session');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.mode === this.mode) { this.session = s.session; if (s.token) ServerBackend.token = s.token; }
      } catch (e) { }
    }
  },
  async login(role, studentId, pin) {
    const s = await this.backend.login(role, studentId, pin);
    if (!s) return null;
    this.session = s;
    SS.set('toan7.session', JSON.stringify({ mode: this.mode, session: s, token: ServerBackend.token }));
    return s;
  },
  logout() { this.session = null; ServerBackend.token = null; SS.del('toan7.session'); },
  setupInfo() { return this.backend.setupInfo(); },
  setup(pin) { return this.backend.setup(pin); },
  listStudents() { return this.backend.listStudents(); },
  setParentPin(pin) { return this.backend.setParentPin(this.session, pin); },
  list(col, q) { return this.backend.list(this.session, col, q); },
  get(col, id) { return this.backend.get(this.session, col, id); },
  put(col, item) { return this.backend.put(this.session, col, item); },
  del(col, id) { return this.backend.del(this.session, col, id); },
  uploadImage(d) { return this.backend.uploadImage(this.session, d); },
  exportAll() { return this.backend.exportAll(this.session); },
  importData(d) { return this.backend.importData(this.session, d); },
  exportStudentWork() { return this.backend.exportStudentWork(this.session); },
  uid, now,
};
window.Store = Store;
