# Plan: Web học Toán 7 (Tập 1 – Kết nối tri thức) cho con

## Context
Phụ huynh có SGK Toán 7 tập 1 (PDF 122 trang, **ảnh scan – không trích xuất chữ được**) và muốn một web đơn giản để con:
học lý thuyết theo từng bài → làm bài tập (chủ yếu trắc nghiệm, 1–2 câu tự luận) → lưu bài làm tại máy → chấm
(trắc nghiệm có sẵn đáp án tự so; tự luận lưu lại để phụ huynh chấm hoặc nhờ AI chấm sau) → xem đáp án/phản hồi → theo dõi điểm bằng biểu đồ.

Yêu cầu kiến trúc: giao diện **chỉ HTML + JavaScript**, không build, không database. Chạy được **2 chế độ**:
- **Một máy**: mở `index.html` trực tiếp, không cần server.
- **Mạng nội bộ (LAN/wifi)**: một máy (máy của phụ huynh) chạy `server.py`; các con dùng điện thoại/máy tính bảng/laptop cùng wifi mở `http://<IP máy phụ huynh>:8000` để học và làm bài. Dữ liệu tập trung ở máy phụ huynh.

## Kiến trúc tổng thể

```
 Điện thoại / tablet / laptop của các con  ──wifi──┐
                                                   ▼
 Máy phụ huynh:  python3 server.py  (0.0.0.0:8000)
   ├─ phục vụ file tĩnh trong web/  (HTML/JS/CSS/nội dung)
   ├─ /api/*  — đọc/ghi dữ liệu JSON
   └─ data/   — students.json, attempts.json, assignments.json, drafts.json, settings.json, uploads/ (ảnh bài tự luận)

 Giao diện (giống nhau ở cả 2 chế độ)
 ├─ content/*.js   — nội dung lý thuyết + câu hỏi (dữ liệu tĩnh, Claude soạn)
 ├─ js/app.js      — router (#hash), render các màn hình
 ├─ js/store.js    — lớp lưu trữ có 2 backend cùng một giao diện (async):
 │                    • LocalBackend  → localStorage (khi mở bằng file://)
 │                    • ServerBackend → gọi /api (khi mở qua http:// và /api/ping trả lời)
 ├─ js/grade.js    — chấm trắc nghiệm, tổng hợp điểm, xuất/nhập file chấm AI
 └─ vendor/        — KaTeX (công thức toán), Chart.js (biểu đồ) — tải sẵn, không cần internet
```

**server.py** — một file, chỉ dùng thư viện chuẩn Python (`http.server.ThreadingHTTPServer`, `json`, `threading`), không cần `pip install`:
- Chạy: `python3 server.py` → in ra địa chỉ để các con mở, ví dụ `http://192.168.1.17:8000` (tự tìm IP LAN của máy).
- API tối giản kiểu "collection":
  - `GET /api/ping`
  - `GET /api/students` → danh sách tên + màu (**không trả PIN**); `POST /api/login {studentId, pin}` → token phiên.
  - `GET /api/attempts?studentId=…`, `PUT /api/attempts/<id>`; tương tự cho `assignments`, `drafts`.
  - `POST /api/upload` (ảnh bài tự luận, lưu vào `data/uploads/`, trả về đường dẫn).
  - Các API của phụ huynh (quản lý học sinh, chấm điểm, giao bài, sao lưu/khôi phục, nhập kết quả chấm AI) yêu cầu token phụ huynh (đăng nhập bằng PIN phụ huynh).
  - Học sinh chỉ đọc/ghi được dữ liệu của chính mình (kiểm tra theo token).
- Ghi file an toàn: khoá `threading.Lock` + ghi file tạm rồi `os.replace` → nhiều bạn nộp bài cùng lúc không hỏng dữ liệu.
- Tự sao lưu `data/` mỗi ngày vào `data/backup/YYYY-MM-DD/` (giữ 14 ngày).
- Chỉ dùng trong mạng nhà: không có HTTPS, không mở ra internet.

Quyết định chính:
- **Nội dung dạng `.js` thay vì `.json`**: mỗi file gọi `registerLesson({...})`. Lý do: mở `index.html` bằng double‑click (file://) thì `fetch()` JSON bị chặn; `<script src>` thì không. → Không cần chạy server.
- **Chế độ một máy** lưu bằng **localStorage** (đủ cho vài trăm lượt làm); **chế độ LAN** lưu trên server trong `data/`. Ảnh bài tự luận (nếu con chụp bài viết tay) được nén JPEG ~1000px trước khi lưu. Có nút **Sao lưu / Khôi phục** (file JSON) để không mất dữ liệu khi xoá trình duyệt.
- **KaTeX** để hiển thị phân số, lũy thừa, căn (`$\frac{-3}{4}$`, `$\sqrt{2}$`). **Chart.js** cho biểu đồ.
- Hình học (Chương III, IV): hình vẽ bằng **SVG nội tuyến** trong nội dung.
- Giao diện **responsive** (dùng tốt trên điện thoại/tablet): nút bấm to, ô tự luận có nút "Chụp ảnh bài làm" (`<input type="file" accept="image/*" capture>`).

## Cấu trúc thư mục
```
lop7/toan/
  server.py              — server LAN (tuỳ chọn)
  data/                  — dữ liệu khi chạy chế độ LAN (tự tạo)
  web/
  index.html
  css/style.css
  js/app.js  js/store.js  js/grade.js
  vendor/katex/…  vendor/chart.umd.min.js
  content/
    toc.js               — mục lục: chương → bài, trang SGK; chương có `dir` thì file nằm trong thư mục con đó
    c1/c1-b01.js … c1/c1-on.js — Chương I
    c2/c2-b05.js … c2/c2-on.js — Chương II (mỗi chương một thư mục con c<N>/)
    (mỗi chương: các bài học + "Luyện tập chung" / "Ôn tập chương" chỉ có bài tập)
```
Mục lục (đã đọc từ trang 4 SGK; trang PDF = trang sách + 1):
- Chương I. Số hữu tỉ: Bài 1–4 (tr.5–25)
- Chương II. Số thực: Bài 5–7 (tr.26–39)
- Chương III. Góc và đường thẳng song song: Bài 8–11 (tr.40–59)
- Chương IV. Tam giác bằng nhau: Bài 12–16 (tr.60–87)
- Chương V. Thu thập và biểu diễn dữ liệu: Bài 17–19 (tr.88–109)

## Mô hình dữ liệu

**Nội dung một bài** (`content/c1-b01.js`):
```js
registerLesson({
  id: "c1-b01", chapter: 1, title: "Bài 1. Tập hợp các số hữu tỉ", pages: [5, 9],
  theory: [ { heading: "1. Số hữu tỉ", html: "Số hữu tỉ là số viết được dưới dạng $\\frac{a}{b}$ …" }, … ],
  skills: [ "Muốn so sánh hai số hữu tỉ, đưa về cùng mẫu dương hoặc dùng số trung gian …" ],   // từ SBT phần B
  examples: [ { q: "…", solution: "…" } ],
  sets: [                                   // 3 đề tương đương: Đề 1, Đề 2, Đề 3
    { id: "d1", name: "Đề 1",
      mcq:   [ { id: "d1q1", q: "…", options: ["…","…","…","…"], answer: 2, explain: "Vì …", level: "de|vua|kho", source: "SBT Bài 1 – BT 1.5" } ],  // 8–10 câu
      essay: [ { id: "d1e1", q: "…", maxPoints: 3,
                 modelAnswer: "Lời giải mẫu …",
                 rubric: [ { pts: 1, text: "Quy đồng đúng" }, { pts: 2, text: "Tính đúng kết quả" } ] } ] },  // 1–2 câu
    { id: "d2", name: "Đề 2", … },
    { id: "d3", name: "Đề 3", … },
    { id: "d4", name: "Đề 4 – Nâng cao", advanced: true, … }   // chủ yếu từ SBT
  ]
});
```
**Nhiều đề để luyện nhiều lần:**
- Mỗi bài có **3 đề cố định** cùng độ khó và cùng phủ các ý kiến thức của bài (mỗi đề đều có câu dễ/vừa/khó theo tỉ lệ giống nhau). Mỗi ý kiến thức xuất hiện ở cả 3 đề nhưng với số liệu/cách hỏi khác nhau.
- Mỗi lần làm, **thứ tự câu và thứ tự đáp án A/B/C/D được xáo trộn**, nên làm lại cùng một đề cũng không thuộc lòng vị trí đáp án.
- **Đề trộn** (mở sau khi làm xong cả 3 đề): bốc ngẫu nhiên câu trắc nghiệm từ cả 3 đề, ưu tiên những câu con từng làm sai.
Thang điểm 10: trắc nghiệm 7 điểm (chia đều số câu), tự luận 3 điểm (theo rubric).

**Học sinh** (localStorage key `toan7.students`):
```js
{ id: "s1", name: "Minh", pin: "1234", color: "#4f8", createdAt }
```
Phụ huynh có PIN riêng (`toan7.settings.parentPin`). Mọi lượt làm, bản nháp và bài giao đều gắn `studentId` → dữ liệu mỗi bạn tách biệt.
*Lưu ý*: PIN chỉ để các bạn không vào nhầm/làm hộ nhau, **không phải bảo mật** (ai rành máy tính vẫn xem được localStorage).

**Một lượt làm bài** (localStorage key `toan7.attempts`):
```js
{ id, studentId, lessonId, assignmentId: null | "a…", setId: "d1" | "d2" | "d3" | "mix" | "custom", order: [...], optionOrder: {...}, startedAt, submittedAt, durationSec,
  mcq:   { answers: { q1: 2, … }, correct: 7, total: 9, score: 5.44 },
  essay: { e1: { text: "…", image: "data:image/jpeg…" } },
  essayGrades: { e1: { points: 2, comment: "…", by: "parent" | "ai", at } },
  status: "pending" | "graded",      // pending = tự luận chưa chấm
  score: 7.44 }                       // = mcq.score + tổng điểm tự luận (khi đã chấm)
```

**Bài được giao** (localStorage key `toan7.assignments`):
```js
{ id, createdAt, title: "Ôn số hữu tỉ", studentIds: ["s1", "s2"],   // giao cho 1 hoặc nhiều bạn
  items: [ { type: "theory", lessonId: "c1-b01" },                 // đọc lý thuyết
           { type: "set", lessonId: "c1-b01", setId: "d2" },       // làm 1 đề có sẵn
           { type: "custom", questionIds: ["c1-b01/d1q3", …] } ],   // đề phụ huynh tự chọn câu
  dueDate: "2026-11-20", note: "Làm cẩn thận phần quy đồng",
  minScore: 8 }   // tuỳ chọn: chưa đạt thì phải làm lại
```
Trạng thái (chưa làm / đang làm / chờ chấm / hoàn thành / quá hạn) được **tính từ các lượt làm có `assignmentId`**, không lưu riêng → không bị lệch dữ liệu.

## Màn hình & luồng

0. **Đăng nhập** (`#/login`): màn hình chọn tên (ô to, có màu riêng từng bạn) → nhập PIN 4 số → vào trang của mình. Nút "Đổi người" ở góc trên. Nút "Phụ huynh" → nhập PIN phụ huynh → Dashboard.
1. **Trang chủ của con** (`#/`, theo học sinh đang đăng nhập): trên cùng là khung **"Bài bố mẹ giao"** (hạn nộp, lời nhắn, trạng thái, nút "Làm ngay"; bài quá hạn tô đỏ). Bên dưới là mục lục: danh sách chương → bài; mỗi bài hiển thị điểm cao nhất, số lần làm, badge "chờ chấm", và trạng thái từng đề (Đề 1 ✓ 8,5 · Đề 2 ✓ 9 · Đề 3 chưa làm).
2. **Học lý thuyết** (`#/lesson/c1-b01`): tóm tắt lý thuyết + ví dụ có lời giải (bấm để hiện). Chọn "Đề 1 / Đề 2 / Đề 3 / Đề trộn" (gợi ý đề chưa làm tiếp theo).
3. **Làm bài** (`#/quiz/c1-b01`): trắc nghiệm (radio) + tự luận (ô nhập văn bản + tuỳ chọn chụp/đính kèm ảnh bài viết tay). Bộ đếm thời gian. Bài đang làm được lưu nháp tự động. Nộp bài → lưu ngay vào localStorage.
4. **Kết quả** (`#/attempt/<id>`): ngay sau khi nộp, trắc nghiệm được so đáp án: đánh dấu đúng/sai, hiện đáp án đúng + giải thích. Tự luận hiện "Chờ chấm"; sau khi chấm sẽ hiện điểm, nhận xét, lời giải mẫu.
5. **Dashboard phụ huynh** (`#/parent`, có mã PIN đơn giản để con không vào được). Gồm 4 tab:
   - **Thanh chọn học sinh** ở đầu Dashboard: "Tất cả" hoặc từng bạn; mọi tab lọc theo lựa chọn này.
   - **Học sinh**: thêm / sửa tên / đổi PIN / xoá học sinh (xoá kèm xác nhận, có sao lưu trước).
   - **Tổng quan**: bảng mỗi bạn một dòng (số bài đã làm tuần này, điểm TB, chờ chấm, bài quá hạn). Khi chọn 1 bạn: số bài đã làm tuần này, điểm trung bình, số bài chờ chấm, bài giao sắp đến hạn / quá hạn, 3 bài yếu nhất (điểm thấp nhất) kèm nút "Giao ôn lại".
   - **Giao bài**: chọn bạn được giao (tick 1 hoặc nhiều bạn, hoặc "cả nhóm") → chọn bài học → chọn đọc lý thuyết / Đề 1–3 / Đề trộn / **đề tự chọn** (lọc câu theo bài và mức dễ/vừa/khó, tick chọn câu; có nút "Thêm câu con hay sai") → đặt hạn nộp, lời nhắn, điểm tối thiểu → Giao. Có danh sách bài đã giao để sửa / xoá / xem tiến độ.
   - **Chấm bài**: (mục 5a, 6 dưới đây).
   - **Tiến độ**: các biểu đồ ở mục 7, thêm biểu đồ **so sánh giữa các bạn** (điểm TB theo chương, mỗi bạn một màu).
   - **Dùng nhiều máy**: cách chính là **chế độ LAN** (mục Kiến trúc) — các con mở web qua wifi, dữ liệu tự về máy phụ huynh, không cần chuyển file.
   - Trường hợp **không cùng mạng** (bạn ở nhà khác) — trao đổi bằng file:
     - Phụ huynh: "Xuất gói giao bài" → file `giao-bai-<tên>.json` (thông tin học sinh + bài giao) → gửi cho bạn đó (Zalo/USB) → máy của bạn đó "Nhập gói giao bài".
     - Học sinh: "Gửi bài cho phụ huynh" → file `bai-lam-<tên>-<ngày>.json` → phụ huynh "Nhập bài làm" → **gộp theo id lượt làm** (không bị trùng khi nhập lại nhiều lần).
     - Kết quả chấm gửi lại cho bạn đó cũng bằng gói giao bài (gói chứa luôn điểm + nhận xét).
     - Nếu các bạn cùng dùng chung một máy thì không cần bước này.
5a. **Chấm bài** (tab trong Dashboard): danh sách bài chờ chấm → mỗi câu tự luận hiển thị bài của con (chữ/ảnh) cạnh lời giải mẫu + rubric (tick từng tiêu chí → tự cộng điểm) + ô nhận xét → Lưu.
6. **Nhờ AI chấm sau** (cũng trong tab Chấm bài):
   - Nút **"Xuất bài chờ chấm"** → tải file `cham-bai-YYYYMMDD.json` gồm: hướng dẫn chấm, câu hỏi, lời giải mẫu, rubric, bài làm (chữ + ảnh).
   - Phụ huynh đưa file cho Claude (Claude Code: "chấm file này", hoặc upload lên claude.ai). Claude trả về `ket-qua-cham.json` dạng `[{attemptId, qid, points, comment}]`.
   - Nút **"Nhập kết quả chấm"** → cập nhật điểm, `by: "ai"`. Phụ huynh vẫn sửa được.
   - (Tuỳ chọn, làm sau nếu cần: nhập Claude API key để chấm trực tiếp trong trình duyệt.)
7. **Tiến độ** (`#/progress`):
   - Biểu đồ đường: điểm theo thời gian (lọc theo chương).
   - Biểu đồ cột: điểm cao nhất / trung bình từng bài → thấy bài nào yếu.
   - Trong từng bài: so điểm Đề 1 → Đề 2 → Đề 3 để thấy con có tiến bộ không.
   - Ô số liệu: tổng số bài đã làm, điểm trung bình, tỷ lệ đúng trắc nghiệm, số bài chờ chấm.
   - Bảng lịch sử các lượt làm (bấm vào để xem lại bài + phản hồi).
8. **Cài đặt** (`#/settings`): Sao lưu (tải JSON tất cả dữ liệu), Khôi phục (nhập JSON), đổi PIN phụ huynh.

## Soạn nội dung (Claude làm)
- **Nguồn 1 – SGK** (`sach-giao-khoa-…pdf`, 122 trang, trang PDF = trang sách + 1): lý thuyết, ví dụ, bài tập trong bài.
- **Nguồn 2 – Sách bài tập (SBT)** (`sach-bai-tap-…pdf`, 138 trang, ảnh scan, trang PDF = trang sách + 1). Cấu trúc mỗi bài: *A. Kiến thức cần nhớ* · *B. Kĩ năng giải toán* (+ ví dụ) · *C. Bài tập*; cuối chương có câu hỏi trắc nghiệm + bài tập ôn chương; **lời giải – hướng dẫn – đáp số từ tr.97 đến cuối sách**.

  | Chương | Đề bài (tr.) | Lời giải (tr.) |
  |---|---|---|
  | I. Số hữu tỉ (Bài 1–4, Ôn tập) | 5–21 | 97–101 |
  | II. Số thực (Bài 5–7, Ôn tập) | 22–34 | 101–110 |
  | III. Góc và đường thẳng song song (Bài 8–11, Ôn tập) | 35–50 | 111–118 |
  | IV. Tam giác bằng nhau (Bài 12–16, Ôn tập) | 51–74 | 119–129 |
  | V. Thu thập và biểu diễn dữ liệu (Bài 17–19, Ôn tập) | 75–96 | 130 → cuối sách |

- **SBT được dùng như sau:**
  - *Lý thuyết*: đối chiếu "Kiến thức cần nhớ" với SGK; thêm mục **"Kĩ năng giải toán / Mẹo"** vào mỗi bài (lấy từ phần B của SBT, viết lại ngắn gọn) + 1–2 ví dụ giải mẫu.
  - *Bài tập*: dạng bài trong phần C và trắc nghiệm ôn chương của SBT được đưa vào ngân hàng câu hỏi (giữ dạng bài, đổi số liệu/cách hỏi); bài SBT khó hơn SGK nên dùng cho câu mức "khó" và câu tự luận.
  - *Đáp án*: đối chiếu lời giải SBT (từ tr.97) khi viết lời giải mẫu + rubric cho câu tự luận, và kiểm tra chéo đáp án.
  - **Thêm "Đề 4 – Nâng cao"** cho mỗi bài, chủ yếu từ các bài khó của SBT (8 câu trắc nghiệm + 2 câu tự luận). Đề 4 không bắt buộc, mở sau khi con đạt ≥ 8 điểm ở một trong Đề 1–3; phụ huynh vẫn giao được bất cứ lúc nào.
  - Mỗi câu hỏi có trường `source` (ví dụ `"SGK Bài 1 – BT 1.3"`, `"SBT Bài 1 – BT 1.12"`, `"mới"`) để phụ huynh tra lại sách khi cần.
- Claude đọc từng trang PDF (dạng ảnh) theo bài, **tóm tắt lý thuyết bằng lời của mình** (định nghĩa, quy tắc, công thức, ví dụ) và **soạn câu hỏi mới theo dạng bài trong SGK** (không chép nguyên văn SGK, vì sách có bản quyền).
- Mỗi bài học: **3 đề cơ bản + 1 đề nâng cao**, mỗi đề 8–10 câu trắc nghiệm + 1–2 câu tự luận có lời giải mẫu + rubric (≈ 35–40 câu trắc nghiệm + 5–8 câu tự luận/bài). Mỗi phần Luyện tập chung / Cuối chương: 3 đề, mỗi đề 10–12 câu trắc nghiệm + 2 câu tự luận tổng hợp.
- Khối lượng ước tính: ~30 đơn vị × 4 đề ≈ 1.100 câu trắc nghiệm + ~200 câu tự luận → soạn theo từng chương, phụ huynh xem lại từng đợt.
- Trắc nghiệm có `explain` để con hiểu vì sao sai. Đáp án được Claude tự kiểm tra lại (tính toán lại từng câu) trước khi ghi file.
- Phụ huynh có thể sửa trực tiếp file `content/*.js` (định dạng đơn giản, có ví dụ mẫu).

## Lộ trình triển khai
0. **Bước đầu tiên**: ghi nguyên nội dung plan này ra `lop7/toan/plan.md`, rồi dừng lại để phụ huynh xem/sửa trước khi code.
1. **Giai đoạn 1 – Khung + 1 bài mẫu**: `index.html`, CSS, router, store, màn hình mục lục / lý thuyết / làm bài / kết quả; nội dung đầy đủ **Bài 1** (SGK tr.5–9 + SBT tr.5–8, lời giải tr.97): lý thuyết, mẹo, 3 đề + Đề 4 nâng cao. Chạy thử từ đầu đến cuối.
2. **Giai đoạn 2 – Nhiều học sinh + Dashboard phụ huynh + LAN**: `server.py` + ServerBackend, đăng nhập theo tên + PIN, quản lý học sinh, gói trao đổi file giữa các máy, PIN phụ huynh, tab Tổng quan, Giao bài (kể cả đề tự chọn), khung "Bài bố mẹ giao" ở trang của con, chấm bài theo rubric, xuất/nhập file chấm AI, trang Tiến độ với Chart.js, sao lưu/khôi phục.
3. **Giai đoạn 3 – Nội dung**: với mỗi chương, đọc SGK + SBT (cả phần đề bài và lời giải) rồi soạn; làm lần lượt Chương I → V (mỗi chương một đợt, phụ huynh xem lại), kèm các phần luyện tập / cuối chương.

## Kiểm tra
- Mở `lop7/toan/web/index.html` bằng Chrome/Firefox (file://) → kiểm tra KaTeX hiển thị đúng công thức, chạy offline.
- Làm hết Bài 1: cố tình sai vài câu trắc nghiệm → kết quả hiện đúng/sai + đáp án + giải thích; điểm trắc nghiệm đúng công thức.
- Tải lại trang giữa chừng → bản nháp còn nguyên; sau khi nộp → lượt làm xuất hiện trong localStorage (DevTools → Application).
- Chấm tự luận bằng màn hình phụ huynh → trạng thái chuyển "đã chấm", điểm tổng cập nhật, con thấy nhận xét + lời giải mẫu.
- Xuất file chờ chấm → Claude chấm → nhập lại → điểm cập nhật với nhãn "AI".
- Làm 3–4 lượt ở các bài khác nhau → biểu đồ Tiến độ hiển thị đúng.
- **Chế độ LAN**: chạy `python3 server.py` → từ điện thoại cùng wifi mở địa chỉ in ra → đăng nhập, làm bài, chụp ảnh bài tự luận bằng camera → trên máy phụ huynh thấy ngay bài chờ chấm. Hai thiết bị nộp cùng lúc → `data/attempts.json` đủ cả 2 lượt, không hỏng. Gọi `/api/students` không thấy PIN; dùng token học sinh A không đọc được bài của B. (Nếu điện thoại không vào được: mở cổng 8000 trên tường lửa, ví dụ `sudo ufw allow 8000/tcp`.)
- Tạo 2 học sinh A, B → A làm bài, đăng nhập B không thấy bài của A; PIN sai thì không vào được; Dashboard lọc theo từng bạn và biểu đồ so sánh đúng.
- Trên máy thứ 2: nhập gói giao bài của B → B làm → xuất bài làm → nhập vào máy phụ huynh hai lần → không bị trùng lượt làm.
- Phụ huynh giao 1 bài (Đề 2 + đề tự chọn 5 câu, hạn ngày mai) → con thấy ở trang chủ → làm xong → trạng thái chuyển "chờ chấm" rồi "hoàn thành"; đổi ngày máy qua hạn → hiện "quá hạn".
- Sao lưu → xoá localStorage → khôi phục → dữ liệu trở lại đầy đủ.
- Làm Đề 1 hai lần → thứ tự câu/đáp án khác nhau; chấm vẫn đúng. Làm đủ 3 đề → mở được Đề trộn.
- Lấy ngẫu nhiên 5 câu có `source` là SBT → tra đúng bài tập đó trong sách bài tập, so lời giải → đáp án khớp.
- Khi nạp nội dung, app tự kiểm tra (`console`): mỗi bài đủ 3 đề (+ Đề 4), id câu không trùng, `answer` nằm trong phạm vi `options`, mỗi câu tự luận có rubric và tổng `pts` = `maxPoints`.

## Trạng thái (cập nhật 12/11/2026)
- [x] Khung web: đăng nhập nhiều học sinh + PIN, học lý thuyết, làm bài (xáo đáp án, lưu nháp, chụp ảnh tự luận), kết quả + đáp án, Dashboard phụ huynh (tổng quan, giao bài, chấm bài, chấm AI, tiến độ + biểu đồ, học sinh, sao lưu), chế độ một máy + chế độ LAN (`server.py`). Hướng dẫn: `HUONG-DAN.md`.
- [x] **Chương I** – 7 đơn vị (Bài 1–4, 2 Luyện tập chung, Ôn tập chương): 260 câu trắc nghiệm + 48 câu tự luận; đã soát đáp án độc lập.
- [x] **Chương II** – 5 đơn vị trong `web/content/c2/` (Bài 5–7, Luyện tập chung, Ôn tập chương): 186 câu trắc nghiệm + 33 câu tự luận; đã soát đáp án độc lập.
- [ ] Chương III – Góc và đường thẳng song song (Bài 8–11)
- [ ] Chương IV – Tam giác bằng nhau (Bài 12–16)
- [ ] Chương V – Thu thập và biểu diễn dữ liệu (Bài 17–19)

Thêm chương mới: tạo thư mục `web/content/c<N>/`, các file `<id>.js` theo `FORMAT.md`; trong `web/content/toc.js` thêm `dir: "c<N>"` cho chương và đổi `ready: true`; chạy `node web/tools/validate.js`.
