#### Nguồn
THCS.TOANMATH.com [https://thcs.toanmath.com]

---

# Web Học Toán 7 – Cài đặt máy server

Hướng dẫn sử dụng chi tiết (Dashboard, giao bài, chấm bài, AI chấm…): xem [HUONG-DAN.md](HUONG-DAN.md).

## 1. Yêu cầu
| Việc | Cần cài |
|---|---|
| Chạy server (máy server) | **Python 3.7+** – chỉ dùng thư viện chuẩn, **không cần `pip install`** |
| Máy/điện thoại của các con | Chỉ cần trình duyệt (+ app Tailscale nếu truy cập từ xa) |
| Soạn / kiểm tra nội dung (không bắt buộc) | Node.js, rồi `cd web/tools && npm install` một lần |

Không cần internet khi chạy (KaTeX, Chart.js đã có sẵn trong `web/vendor/`).

## 2. Chạy server
Chỉ cần `server.py` và thư mục `web/` (PDF, `plan.md`, `web/tools/` không cần cho server).
```bash
cd toan
python3 server.py              # cổng mặc định 8000
python3 server.py --port 8080  # hoặc cổng khác
```
- Màn hình in ra địa chỉ để các máy cùng wifi mở, ví dụ `http://192.168.1.17:8000`.
- Lần đầu mở web: đặt **PIN phụ huynh** → Dashboard → **Học sinh** → thêm từng con (tên + PIN).
- Dữ liệu (học sinh, PIN, bài làm, ảnh) lưu ở `toan/data/`, tự sao lưu mỗi ngày vào `data/backup/` (giữ 14 ngày). Thư mục này đã được `.gitignore` – **không đẩy lên git**.
- Dừng server: `Ctrl+C`. Máy server phải bật và đang chạy server thì các con mới vào được.
- Điện thoại cùng wifi không vào được → mở cổng trên tường lửa, ví dụ Ubuntu: `sudo ufw allow 8000/tcp`.
- **Không mở cổng ra internet (router)**: server không có HTTPS, PIN chỉ để các con không vào nhầm, không phải bảo mật.

## 3. Truy cập từ xa bằng Tailscale (con ở nhà khác / ngoài wifi nhà)
Tailscale tạo một mạng riêng mã hoá giữa các thiết bị đã đăng nhập → vào web như đang cùng wifi, **không cần sửa code, không lộ ra internet**.

```
          Mạng riêng Tailscale
                │
  Máy server ở nhà ──────── Điện thoại / laptop của con
  (python3 server.py)  └─── Máy của bạn ở nhà khác
  data/ nằm ở đây
```

1. **Máy server** (máy chạy `server.py` – không cần là máy phụ huynh dùng hằng ngày; laptop cũ / mini PC / Raspberry Pi để cố định ở nhà đều được):
   - Cài Tailscale: https://tailscale.com/download (Linux: `curl -fsSL https://tailscale.com/install.sh | sh` rồi `sudo tailscale up`).
   - Đăng nhập tài khoản Tailscale, chạy `python3 server.py` như bình thường.
   - Xem IP Tailscale của máy: `tailscale ip -4` (dạng `100.x.y.z`).
2. **Thiết bị của các con**: cài app Tailscale (Android / iOS / Windows / macOS / Linux), đăng nhập **cùng mạng Tailscale**:
   - đơn giản nhất: dùng chung tài khoản gia đình trên mọi thiết bị;
   - hoặc mời tài khoản khác vào mạng / *share* riêng máy server cho bạn ở nhà khác (trong trang quản trị Tailscale).
3. Các con mở trình duyệt: `http://100.x.y.z:8000` (bật **MagicDNS** trong trang quản trị Tailscale thì gõ được `http://<tên-máy-server>:8000`).

Lưu ý:
- Thiết bị của con phải **bật Tailscale** khi học từ xa. Ở nhà cùng wifi vẫn dùng địa chỉ LAN `192.168.x.x:8000` như thường.
- Gói miễn phí của Tailscale có giới hạn số người dùng/thiết bị – kiểm tra trên trang Tailscale (quy mô gia đình thường đủ).
- Nếu tường lửa máy server chặn: cho phép cổng 8000 trên giao diện `tailscale0` (Ubuntu: `sudo ufw allow in on tailscale0 to any port 8000 proto tcp`).

## 4. Tự chạy server khi bật máy (tuỳ chọn – chưa làm)
Hiện phải mở Terminal và chạy `python3 server.py` mỗi lần bật máy. Có thể cài thành service (Linux: systemd; Windows: Task Scheduler) – nhờ Claude làm khi cần, cho biết máy server dùng hệ điều hành gì.

## 5. Chuyển dữ liệu sang máy server mới
Dữ liệu không đi theo git. Trên máy cũ: Dashboard → **Dữ liệu** → *Sao lưu* (tải file JSON). Trên máy server mới: chạy server, đặt PIN phụ huynh → Dashboard → **Dữ liệu** → *Khôi phục / Nhập file*.
Hoặc chép nguyên thư mục `toan/data/` sang máy mới (khi server đang tắt).
