# Định dạng file nội dung

Mỗi đơn vị (bài học / luyện tập chung / ôn tập chương) là một file `content/<id>.js`, gọi `registerLesson({...})`.
Thêm file mới thì khai báo id trong `content/toc.js` (danh sách file được nạp).

## Id
- Bài học: `c1-b01`, `c1-b02`, … (`c<chương>-b<số bài 2 chữ số>`)
- Luyện tập chung: `c1-lt1`, `c1-lt2`, …
- Ôn tập / bài tập cuối chương: `c1-on`

## Cấu trúc

```js
registerLesson({
  id: "c1-b01",
  chapter: 1,
  kind: "lesson",                 // "lesson" | "review"
  title: "Bài 1. Tập hợp các số hữu tỉ",
  sgkPages: [5, 9],               // trang SGK (số in trên sách)
  sbtPages: [5, 8],               // trang Sách bài tập (số in trên sách)
  objectives: ["Nhận biết số hữu tỉ", "..."],

  // Lý thuyết (kind "review": có thể chỉ là tóm tắt ngắn các ý chính của các bài liên quan)
  theory: [
    { heading: "1. Số hữu tỉ", html: "Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\ne 0$." }
  ],
  skills: [ "Muốn so sánh hai số hữu tỉ ta …" ],          // mẹo / kĩ năng giải toán
  examples: [ { q: "So sánh $-0{,}75$ và $\\frac{-4}{5}$.", solution: "…" } ],

  sets: [
    { id: "d1", name: "Đề 1",
      mcq: [
        { id: "d1q1", level: "de", source: "mới",
          q: "Số nào sau đây là số hữu tỉ âm?",
          options: ["$\\frac{3}{4}$", "$0$", "$-\\frac{2}{5}$", "$\\frac{-3}{-7}$"],
          answer: 2,                                     // chỉ số 0..3 của đáp án đúng
          explain: "$-\\frac{2}{5} < 0$. Còn $\\frac{-3}{-7} = \\frac{3}{7} > 0$." }
      ],
      essay: [
        { id: "d1e1", level: "vua", source: "SBT Bài 1 – BT 1.10", maxPoints: 3,
          q: "…",
          modelAnswer: "…",                              // lời giải mẫu đầy đủ, từng bước
          rubric: [ { pts: 1, text: "…" }, { pts: 2, text: "…" } ] }   // tổng pts = maxPoints
      ] },
    { id: "d2", name: "Đề 2", mcq: [...], essay: [...] },
    { id: "d3", name: "Đề 3", mcq: [...], essay: [...] },
    { id: "d4", name: "Đề 4 – Nâng cao", advanced: true, mcq: [...], essay: [...] }   // chỉ kind "lesson"
  ]
});
```

## Quy tắc
- **Thang điểm 10**: trắc nghiệm 7 điểm (chia đều), tự luận 3 điểm → **tổng `maxPoints` các câu tự luận trong 1 đề = 3**.
- Mỗi đề bài học: 8–10 câu trắc nghiệm, 1–2 câu tự luận. Đề ôn tập (`review`): 10–12 câu trắc nghiệm, 2 câu tự luận.
- `level`: `"de"` | `"vua"` | `"kho"`. **Câu trong đề sắp xếp từ dễ đến khó**; app giữ nguyên thứ tự câu, chỉ xáo thứ tự đáp án A/B/C/D.
- Đúng 4 phương án, không trùng nhau; không dùng "Cả A, B, C đều đúng" (vì đáp án bị xáo).
- `source`: `"SGK Bài 1 – BT 1.3"`, `"SGK tr.8 – Luyện tập 2"`, `"SBT Bài 1 – BT 1.12"`, `"SBT Ôn tập chương I – câu 3"`, hoặc `"mới"`.
- Công thức toán dùng KaTeX trong `$...$` (`$$...$$` để xuống dòng riêng). Trong chuỗi JS **phải gấp đôi dấu `\`** (`"\\frac{1}{2}"`). Số thập phân viết kiểu Việt Nam: `$0{,}75$`.
- Được dùng HTML đơn giản (`<b>`, `<br>`, `<ul><li>`, `<table>`) và SVG nội tuyến cho hình vẽ.
- Id câu hỏi không trùng trong cùng một file.

Kiểm tra: `node tools/validate.js` (báo lỗi định dạng, đáp án, công thức KaTeX hỏng).
