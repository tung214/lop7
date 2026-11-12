# Hướng dẫn sử dụng web Học Toán 7

## Cách 1 – Học trên một máy (đơn giản nhất)
Mở file `web/index.html` bằng Chrome / Firefox / Edge (nhấp đúp). Không cần internet, không cần cài gì.
Dữ liệu lưu trong trình duyệt của máy đó → nhớ **Sao lưu** định kỳ (Dashboard → Dữ liệu).

## Cách 2 – Các con làm bài qua wifi (điện thoại, tablet, laptop)
1. Trên máy phụ huynh, mở Terminal trong thư mục `toan` và chạy:
   ```
   python3 server.py
   ```
2. Màn hình in ra địa chỉ, ví dụ `http://192.168.1.17:8000`. Các con mở địa chỉ đó trên thiết bị **cùng wifi**.
3. Dữ liệu lưu ở thư mục `toan/data/` (tự sao lưu mỗi ngày vào `data/backup/`, giữ 14 ngày).
4. Nhấn `Ctrl+C` để tắt server. Máy phụ huynh phải bật và chạy server thì các con mới vào được.
5. Nếu điện thoại không vào được: mở cổng 8000 trên tường lửa (Ubuntu: `sudo ufw allow 8000/tcp`).

Chuyển dữ liệu từ Cách 1 sang Cách 2: ở bản Cách 1 bấm *Sao lưu* → mở bản server, đăng nhập phụ huynh → *Khôi phục / Nhập file*.

## Lần đầu sử dụng
1. Đặt **PIN phụ huynh** (4–8 chữ số).
2. Dashboard → **Học sinh** → thêm từng con: tên, PIN riêng, màu.
3. Các con chọn tên mình và nhập PIN để vào học.

## Dashboard phụ huynh
| Tab | Dùng để |
|---|---|
| Tổng quan | Tình hình từng con, bài cần ôn (điểm thấp nhất) → nút *Giao ôn lại* |
| Chấm bài | Chấm câu tự luận theo thang điểm (tick tiêu chí), hoặc nhờ AI chấm |
| Giao bài | Giao lý thuyết / Đề 1–4 / Đề trộn / Đề tự chọn câu, đặt hạn nộp, lời nhắn, điểm tối thiểu |
| Tiến độ | Biểu đồ điểm theo thời gian, so sánh các con, bảng tiến bộ qua các đề, lịch sử |
| Học sinh | Thêm / sửa / xoá học sinh, đổi PIN |
| Dữ liệu | Sao lưu, khôi phục, đổi PIN phụ huynh |

Menu **Bài học** cho phụ huynh xem trước mọi đề kèm đáp án.

## Nhờ AI chấm tự luận
1. Dashboard → Chấm bài → **Xuất bài chờ chấm** → được file `cham-bai-<ngày>.json`.
2. Đưa file cho Claude, ví dụ trong Claude Code: *"chấm file cham-bai-2026-11-12.json, ghi kết quả ra ket-qua-cham.json"* (file đã chứa sẵn hướng dẫn chấm, lời giải mẫu, thang điểm, bài làm và ảnh).
3. **Nhập kết quả chấm** → chọn `ket-qua-cham.json`. Điểm hiện nhãn "🤖 AI chấm"; phụ huynh vẫn sửa được.

## Con học ở nhà khác (không cùng wifi)
- Phụ huynh: Học sinh → **📤 Gói giao bài** → gửi file cho con (Zalo, USB…).
- Máy của con (mở `index.html`): **Nhập gói từ phụ huynh** → đăng nhập bằng PIN của con.
- Con làm xong: mục tên mình (góc trên) → **Tải file bài làm** → gửi lại → phụ huynh *Dữ liệu → Nhập file*.

## Cách tính điểm
- Thang 10: trắc nghiệm 7 điểm + tự luận 3 điểm (đề không có tự luận: trắc nghiệm 10 điểm).
- Trắc nghiệm chấm ngay khi nộp, hiện đáp án đúng + giải thích. Tự luận chờ chấm; lời giải mẫu hiện sau khi chấm.
- Mỗi lần làm, thứ tự đáp án A/B/C/D được xáo; câu hỏi luôn xếp từ dễ đến khó.
- **Đề 4 – Nâng cao** mở khi con đạt ≥ 8 điểm ở một trong Đề 1–3. **Đề trộn** mở khi làm xong Đề 1–3 (ưu tiên câu từng sai).

## Lưu ý
- PIN chỉ để các con không vào nhầm/làm hộ nhau, **không phải bảo mật**.
- Nội dung bài học nằm trong `web/content/` (định dạng xem `web/content/FORMAT.md`). Sửa xong chạy `node web/tools/validate.js` để kiểm tra.
