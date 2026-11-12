registerLesson({
  id: "c1-on",
  chapter: 1,
  kind: "review",
  title: "Ôn tập chương I",
  sgkPages: [5, 25],
  sbtPages: [20, 21],
  objectives: [
    "Hệ thống lại khái niệm số hữu tỉ, biểu diễn trên trục số, số đối và so sánh số hữu tỉ",
    "Thực hiện thành thạo cộng, trừ, nhân, chia số hữu tỉ và vận dụng tính chất để tính hợp lí",
    "Vận dụng các công thức luỹ thừa với số mũ tự nhiên",
    "Thực hiện đúng thứ tự phép tính, quy tắc dấu ngoặc, quy tắc chuyển vế để tính giá trị biểu thức và tìm $x$",
    "Giải các bài toán thực tế gắn với số hữu tỉ"
  ],

  theory: [
    {
      heading: "1. Số hữu tỉ và so sánh số hữu tỉ (Bài 1)",
      html: "<ul>" +
        "<li><b>Số hữu tỉ</b> là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z},\\ b \\ne 0$. Tập hợp các số hữu tỉ kí hiệu là $\\mathbb{Q}$. Ta có $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}$.</li>" +
        "<li>Số thập phân hữu hạn, hỗn số, số nguyên đều là số hữu tỉ, ví dụ $-0{,}6 = \\frac{-3}{5}$, $1\\frac{1}{2} = \\frac{3}{2}$, $-4 = \\frac{-4}{1}$.</li>" +
        "<li>Mỗi số hữu tỉ được biểu diễn bởi đúng một điểm trên trục số. Số hữu tỉ dương nằm bên phải điểm $0$, số hữu tỉ âm nằm bên trái điểm $0$. Số $0$ không là số hữu tỉ dương, cũng không là số hữu tỉ âm.</li>" +
        "<li><b>Số đối</b> của $x$ là $-x$; $-(-x) = x$.</li>" +
        "<li><b>So sánh</b>: viết các số về cùng dạng (cùng phân số có mẫu dương hoặc cùng số thập phân) rồi so sánh. Với hai số hữu tỉ bất kì $x, y$ luôn có đúng một trong ba trường hợp $x \\lt y$, $x = y$, $x \\gt y$. Nếu $x \\lt y$ và $y \\lt z$ thì $x \\lt z$ (tính chất bắc cầu).</li>" +
        "</ul>"
    },
    {
      heading: "2. Cộng, trừ, nhân, chia số hữu tỉ (Bài 2)",
      html: "<table>" +
        "<tr><th>Phép tính</th><th>Cách làm</th></tr>" +
        "<tr><td>Cộng, trừ</td><td>Đưa về phân số cùng mẫu dương: $\\frac{a}{m} \\pm \\frac{b}{m} = \\frac{a \\pm b}{m}$. Trừ là cộng với số đối: $x - y = x + (-y)$.</td></tr>" +
        "<tr><td>Nhân</td><td>$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$</td></tr>" +
        "<tr><td>Chia</td><td>$\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$ (với $\\frac{c}{d} \\ne 0$); số nghịch đảo của $\\frac{c}{d}$ là $\\frac{d}{c}$.</td></tr>" +
        "</table>" +
        "<ul>" +
        "<li>Phép cộng và phép nhân có tính chất giao hoán, kết hợp; cộng với $0$, nhân với $1$; phân phối: $x(y + z) = xy + xz$, $x(y - z) = xy - xz$.</li>" +
        "<li>Quy tắc dấu: tích (thương) hai số cùng dấu là số dương, khác dấu là số âm.</li>" +
        "</ul>"
    },
    {
      heading: "3. Luỹ thừa với số mũ tự nhiên (Bài 3)",
      html: "Với $x \\in \\mathbb{Q}$, $n \\in \\mathbb{N}$, $n \\gt 1$: $x^n = \\underbrace{x \\cdot x \\cdots x}_{n}$ ($n$ thừa số). Quy ước: $x^1 = x$; $x^0 = 1$ ($x \\ne 0$)." +
        "<table>" +
        "<tr><th>Công thức</th><th>Ghi nhớ</th></tr>" +
        "<tr><td>$x^m \\cdot x^n = x^{m+n}$</td><td>Nhân hai luỹ thừa cùng cơ số: giữ cơ số, <b>cộng</b> số mũ</td></tr>" +
        "<tr><td>$x^m : x^n = x^{m-n}$ ($x \\ne 0$, $m \\ge n$)</td><td>Chia hai luỹ thừa cùng cơ số: giữ cơ số, <b>trừ</b> số mũ</td></tr>" +
        "<tr><td>$(x^m)^n = x^{m \\cdot n}$</td><td>Luỹ thừa của luỹ thừa: giữ cơ số, <b>nhân</b> số mũ</td></tr>" +
        "<tr><td>$(x \\cdot y)^n = x^n \\cdot y^n$</td><td>Luỹ thừa của một tích</td></tr>" +
        "<tr><td>$\\left(\\frac{x}{y}\\right)^n = \\frac{x^n}{y^n}$ ($y \\ne 0$)</td><td>Luỹ thừa của một thương</td></tr>" +
        "</table>" +
        "Dấu: luỹ thừa bậc chẵn của số âm là số dương, luỹ thừa bậc lẻ của số âm là số âm, ví dụ $(-2)^4 = 16$, $(-2)^3 = -8$."
    },
    {
      heading: "4. Thứ tự thực hiện phép tính, quy tắc dấu ngoặc, quy tắc chuyển vế (Bài 4)",
      html: "<ul>" +
        "<li>Biểu thức chỉ có cộng, trừ (hoặc chỉ có nhân, chia): làm từ trái sang phải.</li>" +
        "<li>Biểu thức không có ngoặc: <b>Luỹ thừa → Nhân và chia → Cộng và trừ</b>.</li>" +
        "<li>Biểu thức có ngoặc: làm trong ngoặc trước, theo thứ tự $(\\ ) \\to [\\ ] \\to \\{\\ \\}$.</li>" +
        "<li><b>Quy tắc dấu ngoặc</b>: bỏ ngoặc có dấu \"+\" đứng trước thì giữ nguyên dấu các số hạng trong ngoặc; bỏ ngoặc có dấu \"−\" đứng trước thì đổi dấu tất cả các số hạng trong ngoặc: $x - (y - z) = x - y + z$.</li>" +
        "<li><b>Quy tắc chuyển vế</b>: khi chuyển một số hạng từ vế này sang vế kia của đẳng thức phải đổi dấu số hạng đó: nếu $a + b = c$ thì $a = c - b$; nếu $a - b = c$ thì $a = c + b$.</li>" +
        "</ul>"
    }
  ],

  skills: [
    "<b>Đọc kĩ đề, xác định dạng bài</b>: so sánh – tính giá trị biểu thức – tính hợp lí – tìm $x$ – bài toán thực tế. Mỗi dạng có cách làm riêng đã ôn ở trên.",
    "Khi trong một biểu thức có cả phân số và số thập phân, nên đổi hết về một dạng (thường là phân số tối giản) trước khi tính: $0{,}25 = \\frac{1}{4}$, $0{,}5 = \\frac{1}{2}$, $0{,}75 = \\frac{3}{4}$, $0{,}125 = \\frac{1}{8}$, $0{,}2 = \\frac{1}{5}$.",
    "<b>Tính hợp lí</b>: bỏ ngoặc (nhớ đổi dấu khi trước ngoặc là dấu \"−\") rồi nhóm các số cùng mẫu, các số nguyên với nhau; dùng tính chất phân phối $ab + ac = a(b + c)$ khi các tích có chung thừa số.",
    "<b>Biểu thức có luỹ thừa với cơ số khác nhau</b>: đưa về cùng cơ số ($4 = 2^2$, $8 = 2^3$, $9 = 3^2$, $27 = 3^3$, $25 = 5^2$, $0{,}36 = 0{,}6^2$) hoặc dùng $(x \\cdot y)^n = x^n y^n$, ví dụ $0{,}125^3 \\cdot 8^3 = (0{,}125 \\cdot 8)^3 = 1$. Với phân thức kiểu $\\frac{3^{12} + 3^{15}}{1 + 3^3}$: đặt thừa số chung $3^{12}$ ở tử.",
    "<b>Tìm $x$</b>: coi cả cụm chứa $x$ là một số chưa biết, dùng quy tắc chuyển vế (hoặc quan hệ số bị chia – số chia – thương, thừa số – tích) để \"bóc\" dần từ ngoài vào trong. Tìm xong nên thay lại để thử.",
    "<b>Bài toán thực tế</b>: viết biểu thức cho cả bài rồi mới tính; ghi đơn vị và trả lời đúng câu hỏi (ví dụ \"muộn nhất\", \"nhiều nhất bao nhiêu chiếc\" thì phải làm tròn xuống số nguyên).",
    "<b>Lỗi hay gặp 1</b>: cộng tử với tử, mẫu với mẫu: $\\frac{1}{2} + \\frac{1}{3} \\ne \\frac{2}{5}$. Phải quy đồng: $\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}$.",
    "<b>Lỗi hay gặp 2</b>: quên đổi dấu khi bỏ ngoặc có dấu \"−\" đứng trước hoặc khi chuyển vế: $x - (a - b) = x - a + b$, <i>không phải</i> $x - a - b$.",
    "<b>Lỗi hay gặp 3</b>: nhầm công thức luỹ thừa: $x^m \\cdot x^n = x^{m+n}$ (không phải $x^{m \\cdot n}$); $(x^m)^n = x^{m \\cdot n}$ (không phải $x^{m+n}$); $5^3 \\cdot 5^4 = 5^7$ chứ không phải $25^7$. Không có công thức cho $x^m + x^n$.",
    "<b>Lỗi hay gặp 4</b>: nhầm dấu luỹ thừa: $(-3)^2 = 9$ nhưng $-3^2 = -9$; $\\left(-\\frac{1}{2}\\right)^3 = -\\frac{1}{8}$ (bậc lẻ giữ dấu âm).",
    "<b>Lỗi hay gặp 5</b>: làm sai thứ tự phép tính, ví dụ tính $2 + 3 \\cdot 4$ thành $5 \\cdot 4$; hay chia cho một phân số mà quên đảo ngược: $\\frac{2}{3} : \\frac{4}{5} = \\frac{2}{3} \\cdot \\frac{5}{4} = \\frac{5}{6}$.",
    "<b>Lỗi hay gặp 6</b>: so sánh hai số âm như số dương: $-\\frac{3}{4} = -0{,}75 \\lt -\\frac{2}{3} \\approx -0{,}67$ (số âm nào có \"phần số\" lớn hơn thì nhỏ hơn)."
  ],

  examples: [
    {
      q: "Tính giá trị của biểu thức $A = \\left(\\frac{3}{4} - 1\\right)^2 : \\frac{1}{8} - 0{,}5 \\cdot \\left(-\\frac{2}{5}\\right)$.",
      solution: "Làm trong ngoặc trước: $\\frac{3}{4} - 1 = -\\frac{1}{4}$.<br>" +
        "Luỹ thừa: $\\left(-\\frac{1}{4}\\right)^2 = \\frac{1}{16}$.<br>" +
        "Nhân, chia: $\\frac{1}{16} : \\frac{1}{8} = \\frac{1}{16} \\cdot 8 = \\frac{1}{2}$; $\\ 0{,}5 \\cdot \\left(-\\frac{2}{5}\\right) = \\frac{1}{2} \\cdot \\left(-\\frac{2}{5}\\right) = -\\frac{1}{5}$.<br>" +
        "Cộng, trừ: $A = \\frac{1}{2} - \\left(-\\frac{1}{5}\\right) = \\frac{1}{2} + \\frac{1}{5} = \\frac{5}{10} + \\frac{2}{10} = \\frac{7}{10}$.<br>" +
        "Vậy $A = \\frac{7}{10}$."
    },
    {
      q: "Tìm $x$, biết $\\frac{1}{2} - \\left(x - \\frac{2}{3}\\right) = \\left(-\\frac{1}{2}\\right)^2$.",
      solution: "Ta có $\\left(-\\frac{1}{2}\\right)^2 = \\frac{1}{4}$ nên $\\frac{1}{2} - \\left(x - \\frac{2}{3}\\right) = \\frac{1}{4}$.<br>" +
        "Coi $x - \\frac{2}{3}$ là số trừ: $x - \\frac{2}{3} = \\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4}$.<br>" +
        "Chuyển vế: $x = \\frac{1}{4} + \\frac{2}{3} = \\frac{3}{12} + \\frac{8}{12} = \\frac{11}{12}$.<br>" +
        "Thử lại: $\\frac{1}{2} - \\left(\\frac{11}{12} - \\frac{8}{12}\\right) = \\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4}$ ✓. Vậy $x = \\frac{11}{12}$."
    },
    {
      q: "(Bài toán thực tế) Lớp 7A đặt mua $3$ hộp bánh để liên hoan, mỗi hộp giá $45{,}5$ nghìn đồng. Lớp có phiếu giảm giá $4{,}5$ nghìn đồng cho mỗi hộp. Lớp nộp quỹ $150$ nghìn đồng để trả tiền. Hỏi cửa hàng phải trả lại bao nhiêu tiền?",
      solution: "Giá mỗi hộp sau khi giảm: $45{,}5 - 4{,}5 = 41$ (nghìn đồng).<br>" +
        "Số tiền mua $3$ hộp: $3 \\cdot 41 = 123$ (nghìn đồng).<br>" +
        "(Hoặc viết một biểu thức: $3 \\cdot (45{,}5 - 4{,}5) = 3 \\cdot 45{,}5 - 3 \\cdot 4{,}5 = 136{,}5 - 13{,}5 = 123$.)<br>" +
        "Tiền trả lại: $150 - 123 = 27$ (nghìn đồng).<br>" +
        "Vậy cửa hàng trả lại $27\\,000$ đồng."
    }
  ],

  sets: [
    // ========================= ĐỀ 1 =========================
    { id: "d1", name: "Đề 1",
      mcq: [
        { id: "d1q1", level: "de", source: "SBT Ôn tập chương I – câu 1",
          q: "Số $-\\frac{3}{8}$ là:",
          options: ["Số tự nhiên", "Số nguyên", "Số hữu tỉ dương", "Số hữu tỉ âm"],
          answer: 3,
          explain: "$-\\frac{3}{8}$ viết được dạng phân số và nhỏ hơn $0$ nên là số hữu tỉ âm; nó không phải số nguyên." },
        { id: "d1q2", level: "de", source: "SBT Ôn tập chương I – câu 2",
          q: "Kết quả của phép nhân $5^4 \\cdot 5^7$ là:",
          options: ["$5^{11}$", "$5^{28}$", "$25^{11}$", "$10^{11}$"],
          answer: 0,
          explain: "Nhân hai luỹ thừa cùng cơ số: giữ cơ số, cộng số mũ: $5^{4+7} = 5^{11}$." },
        { id: "d1q3", level: "de", source: "mới",
          q: "Số đối của $\\frac{-2}{7}$ là:",
          options: ["$\\frac{7}{2}$", "$\\frac{2}{7}$", "$\\frac{-2}{7}$", "$-\\frac{7}{2}$"],
          answer: 1,
          explain: "Số đối của $x$ là $-x$: $-\\frac{-2}{7} = \\frac{2}{7}$. ($-\\frac{7}{2}$ là số nghịch đảo, không phải số đối.)" },
        { id: "d1q4", level: "de", source: "mới",
          q: "Tìm $x$, biết $x + 1{,}5 = 4$.",
          options: ["$5{,}5$", "$-2{,}5$", "$2{,}5$", "$-5{,}5$"],
          answer: 2,
          explain: "Chuyển vế: $x = 4 - 1{,}5 = 2{,}5$." },
        { id: "d1q5", level: "vua", source: "mới",
          q: "Sắp xếp các số $-\\frac{2}{3};\\ 0{,}5;\\ -0{,}75;\\ \\frac{1}{4}$ theo thứ tự tăng dần ta được:",
          options: [
            "$-\\frac{2}{3} \\lt -0{,}75 \\lt \\frac{1}{4} \\lt 0{,}5$",
            "$-0{,}75 \\lt -\\frac{2}{3} \\lt 0{,}5 \\lt \\frac{1}{4}$",
            "$-0{,}75 \\lt -\\frac{2}{3} \\lt \\frac{1}{4} \\lt 0{,}5$",
            "$\\frac{1}{4} \\lt 0{,}5 \\lt -\\frac{2}{3} \\lt -0{,}75$"
          ],
          answer: 2,
          explain: "$-0{,}75 = -\\frac{9}{12} \\lt -\\frac{8}{12} = -\\frac{2}{3}$; số âm nhỏ hơn số dương; $\\frac{1}{4} = 0{,}25 \\lt 0{,}5$." },
        { id: "d1q6", level: "vua", source: "mới",
          q: "Kết quả của phép tính $\\frac{-5}{6} + \\frac{3}{4}$ là:",
          options: ["$-\\frac{1}{12}$", "$-\\frac{1}{5}$", "$\\frac{1}{12}$", "$-\\frac{19}{12}$"],
          answer: 0,
          explain: "Quy đồng mẫu $12$: $\\frac{-10}{12} + \\frac{9}{12} = \\frac{-1}{12}$." },
        { id: "d1q7", level: "vua", source: "mới",
          q: "Kết quả của phép tính $-1{,}2 : \\frac{3}{5}$ là:",
          options: ["$-\\frac{18}{25}$", "$2$", "$-\\frac{1}{2}$", "$-2$"],
          answer: 3,
          explain: "$-1{,}2 : \\frac{3}{5} = -\\frac{6}{5} \\cdot \\frac{5}{3} = -2$." },
        { id: "d1q8", level: "vua", source: "mới",
          q: "Giá trị của $\\left(-\\frac{2}{3}\\right)^3$ là:",
          options: ["$\\frac{8}{27}$", "$-\\frac{8}{27}$", "$-\\frac{6}{9}$", "$-\\frac{8}{9}$"],
          answer: 1,
          explain: "$\\left(-\\frac{2}{3}\\right)^3 = \\frac{(-2)^3}{3^3} = -\\frac{8}{27}$ (bậc lẻ nên mang dấu âm)." },
        { id: "d1q9", level: "vua", source: "mới",
          q: "Giá trị của biểu thức $1{,}5 - 2^2 \\cdot 0{,}5$ là:",
          options: ["$-0{,}5$", "$-1{,}25$", "$0{,}5$", "$-2{,}5$"],
          answer: 0,
          explain: "Luỹ thừa trước, rồi nhân, cuối cùng trừ: $1{,}5 - 4 \\cdot 0{,}5 = 1{,}5 - 2 = -0{,}5$." },
        { id: "d1q10", level: "kho", source: "SBT Ôn tập chương I – BT 1.33",
          q: "Tìm $x$, biết $x : \\left(-\\frac{1}{2}\\right)^3 = \\left(-\\frac{1}{2}\\right)^2$.",
          options: ["$\\frac{1}{32}$", "$-\\frac{1}{2}$", "$\\frac{1}{64}$", "$-\\frac{1}{32}$"],
          answer: 3,
          explain: "$x = \\left(-\\frac{1}{2}\\right)^2 \\cdot \\left(-\\frac{1}{2}\\right)^3 = \\left(-\\frac{1}{2}\\right)^5 = -\\frac{1}{32}$." },
        { id: "d1q11", level: "kho", source: "mới",
          q: "Tìm $x$, biết $\\frac{2}{3} - x = \\frac{1}{2} - \\left(-\\frac{1}{4}\\right)$.",
          options: ["$\\frac{1}{12}$", "$-\\frac{1}{12}$", "$\\frac{17}{12}$", "$\\frac{5}{12}$"],
          answer: 1,
          explain: "Vế phải: $\\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}$. Khi đó $x = \\frac{2}{3} - \\frac{3}{4} = \\frac{8}{12} - \\frac{9}{12} = -\\frac{1}{12}$." },
        { id: "d1q12", level: "kho", source: "SGK Bài tập cuối chương I – BT 1.36",
          q: "Giá trị của biểu thức $\\frac{2^{10} + 2^{13}}{1 + 2^3}$ là:",
          options: ["$2^{13}$", "$2^{20}$", "$2^{10}$", "$\\frac{2^{23}}{9}$"],
          answer: 2,
          explain: "$2^{10} + 2^{13} = 2^{10}(1 + 2^3)$ nên biểu thức bằng $\\frac{2^{10}(1 + 2^3)}{1 + 2^3} = 2^{10}$." }
      ],
      essay: [
        { id: "d1e1", level: "vua", source: "SBT Ôn tập chương I – BT 1.32", maxPoints: 1,
          q: "Tính: $3 - \\left(1 - \\frac{1}{4}\\right) : \\left(1 + \\frac{1}{2}\\right)$.",
          modelAnswer: "Tính trong ngoặc: $1 - \\frac{1}{4} = \\frac{3}{4}$; $\\ 1 + \\frac{1}{2} = \\frac{3}{2}$.<br>" +
            "Phép chia: $\\frac{3}{4} : \\frac{3}{2} = \\frac{3}{4} \\cdot \\frac{2}{3} = \\frac{1}{2}$.<br>" +
            "Phép trừ: $3 - \\frac{1}{2} = \\frac{5}{2}$.<br>" +
            "Vậy giá trị biểu thức là $\\frac{5}{2}$ (hay $2{,}5$).",
          rubric: [
            { pts: 0.5, text: "Tính đúng hai ngoặc: $\\frac{3}{4}$ và $\\frac{3}{2}$" },
            { pts: 0.25, text: "Thực hiện đúng phép chia (nhân với nghịch đảo) được $\\frac{1}{2}$" },
            { pts: 0.25, text: "Kết quả đúng $\\frac{5}{2}$" }
          ] },
        { id: "d1e2", level: "kho", source: "SGK Bài tập cuối chương I – BT 1.37", maxPoints: 2,
          q: "Mẹ Lan mua $3$ kg táo giá $45{,}5$ nghìn đồng/kg và $2{,}5$ kg cam giá $32$ nghìn đồng/kg. Cửa hàng giảm giá $\\frac{1}{10}$ tổng số tiền.<br>a) Tính số tiền mẹ Lan phải trả.<br>b) Mẹ Lan đưa cho cửa hàng $200$ nghìn đồng. Hỏi cửa hàng phải trả lại bao nhiêu đồng?",
          modelAnswer: "a) Tiền táo: $3 \\cdot 45{,}5 = 136{,}5$ (nghìn đồng).<br>" +
            "Tiền cam: $2{,}5 \\cdot 32 = 80$ (nghìn đồng).<br>" +
            "Tổng tiền chưa giảm: $136{,}5 + 80 = 216{,}5$ (nghìn đồng).<br>" +
            "Được giảm $\\frac{1}{10}$ nên phải trả $\\frac{9}{10}$ tổng tiền: $216{,}5 \\cdot \\frac{9}{10} = 194{,}85$ (nghìn đồng), tức $194\\,850$ đồng.<br>" +
            "b) Tiền trả lại: $200 - 194{,}85 = 5{,}15$ (nghìn đồng), tức $5\\,150$ đồng.",
          rubric: [
            { pts: 0.5, text: "Tính đúng tiền táo $136{,}5$ và tiền cam $80$ nghìn đồng" },
            { pts: 0.5, text: "Tính đúng tổng tiền chưa giảm $216{,}5$ nghìn đồng" },
            { pts: 0.5, text: "Tính đúng số tiền phải trả sau giảm $194{,}85$ nghìn đồng ($194\\,850$ đồng)" },
            { pts: 0.5, text: "Câu b: tiền trả lại $5{,}15$ nghìn đồng ($5\\,150$ đồng), có kết luận" }
          ] }
      ] },

    // ========================= ĐỀ 2 =========================
    { id: "d2", name: "Đề 2",
      mcq: [
        { id: "d2q1", level: "de", source: "SBT Ôn tập chương I – câu 5",
          q: "Khẳng định nào sau đây là đúng?",
          options: ["Mọi số nguyên đều là số tự nhiên", "Mọi số nguyên đều là số hữu tỉ", "Mọi số hữu tỉ đều là số nguyên", "Số $0$ không phải là số hữu tỉ"],
          answer: 1,
          explain: "Mỗi số nguyên $a$ viết được thành $\\frac{a}{1}$ nên là số hữu tỉ. Số $0 = \\frac{0}{1}$ cũng là số hữu tỉ." },
        { id: "d2q2", level: "de", source: "SBT Ôn tập chương I – câu 3",
          q: "Số hữu tỉ $\\frac{a}{b}$ (với $a, b \\in \\mathbb{Z},\\ b \\ne 0$) là số hữu tỉ âm nếu:",
          options: ["$a$ và $b$ cùng dấu", "$a = 0$, $b \\lt 0$", "$a$ và $b$ khác dấu", "$a$ và $b$ là hai số tự nhiên khác $0$"],
          answer: 2,
          explain: "Thương hai số khác dấu là số âm. Nếu $a = 0$ thì $\\frac{a}{b} = 0$, không âm." },
        { id: "d2q3", level: "de", source: "mới",
          q: "Giá trị của $\\left(-\\frac{3}{5}\\right)^0$ là:",
          options: ["$1$", "$0$", "$-\\frac{3}{5}$", "$-1$"],
          answer: 0,
          explain: "Quy ước $x^0 = 1$ với mọi $x \\ne 0$." },
        { id: "d2q4", level: "de", source: "mới",
          q: "Kết quả của phép tính $0{,}4 \\cdot \\left(-\\frac{5}{8}\\right)$ là:",
          options: ["$\\frac{1}{4}$", "$\\frac{16}{25}$", "$-\\frac{9}{40}$", "$-\\frac{1}{4}$"],
          answer: 3,
          explain: "$0{,}4 = \\frac{2}{5}$; $\\ \\frac{2}{5} \\cdot \\left(-\\frac{5}{8}\\right) = -\\frac{10}{40} = -\\frac{1}{4}$." },
        { id: "d2q5", level: "vua", source: "SBT Ôn tập chương I – câu 4",
          q: "Trên trục số, điểm biểu diễn số hữu tỉ nào sau đây nằm giữa hai điểm biểu diễn $-1$ và $-\\frac{1}{2}$?",
          options: ["$-\\frac{1}{4}$", "$-\\frac{5}{4}$", "$\\frac{3}{4}$", "$-\\frac{3}{4}$"],
          answer: 3,
          explain: "$-1 = -\\frac{4}{4} \\lt -\\frac{3}{4} \\lt -\\frac{2}{4} = -\\frac{1}{2}$." },
        { id: "d2q6", level: "vua", source: "SGK Bài 3 – BT 1.19",
          q: "Viết số $\\left(\\frac{1}{27}\\right)^4$ dưới dạng luỹ thừa cơ số $\\frac{1}{3}$ ta được:",
          options: ["$\\left(\\frac{1}{3}\\right)^{7}$", "$\\left(\\frac{1}{3}\\right)^{12}$", "$\\left(\\frac{1}{3}\\right)^{81}$", "$\\left(\\frac{1}{3}\\right)^{108}$"],
          answer: 1,
          explain: "$\\frac{1}{27} = \\left(\\frac{1}{3}\\right)^3$ nên $\\left(\\frac{1}{27}\\right)^4 = \\left[\\left(\\frac{1}{3}\\right)^3\\right]^4 = \\left(\\frac{1}{3}\\right)^{12}$." },
        { id: "d2q7", level: "vua", source: "SGK Bài 4 – BT 1.29",
          q: "Bỏ dấu ngoặc rồi tính: $\\frac{5}{7} - \\left(\\frac{2}{3} - \\frac{2}{7}\\right) + \\frac{2}{3}$.",
          options: ["$1$", "$\\frac{3}{7}$", "$\\frac{7}{3}$", "$-\\frac{1}{3}$"],
          answer: 0,
          explain: "$\\frac{5}{7} - \\frac{2}{3} + \\frac{2}{7} + \\frac{2}{3} = \\left(\\frac{5}{7} + \\frac{2}{7}\\right) + \\left(-\\frac{2}{3} + \\frac{2}{3}\\right) = 1 + 0 = 1$." },
        { id: "d2q8", level: "vua", source: "mới",
          q: "Một bình có $2\\frac{1}{2}$ lít nước. Bạn Minh rót ra $3$ cốc, mỗi cốc $0{,}35$ lít. Trong bình còn lại bao nhiêu lít nước?",
          options: ["$2{,}15$ lít", "$1{,}05$ lít", "$1{,}45$ lít", "$1{,}55$ lít"],
          answer: 2,
          explain: "$2\\frac{1}{2} = 2{,}5$; lượng nước rót ra $3 \\cdot 0{,}35 = 1{,}05$ lít; còn lại $2{,}5 - 1{,}05 = 1{,}45$ lít." },
        { id: "d2q9", level: "vua", source: "SGK tr.17 – Luyện tập 2",
          q: "Giá trị của $(-0{,}25)^5 \\cdot 4^5$ là:",
          options: ["$1$", "$-1$", "$-5$", "$-0{,}25$"],
          answer: 1,
          explain: "$(-0{,}25)^5 \\cdot 4^5 = (-0{,}25 \\cdot 4)^5 = (-1)^5 = -1$." },
        { id: "d2q10", level: "kho", source: "SGK Bài tập cuối chương I – BT 1.36",
          q: "Giá trị của biểu thức $3 : \\left(\\frac{1}{2} - \\frac{3}{4}\\right)^2 - 0{,}5^3 \\cdot 8^3 + (-6)^4 : 3^4$ là:",
          options: ["$0$", "$-32$", "$-96$", "$32$"],
          answer: 0,
          explain: "$\\left(-\\frac{1}{4}\\right)^2 = \\frac{1}{16}$ nên $3 : \\frac{1}{16} = 48$; $\\ 0{,}5^3 \\cdot 8^3 = 4^3 = 64$; $\\ (-6)^4 : 3^4 = (-2)^4 = 16$. Vậy $48 - 64 + 16 = 0$." },
        { id: "d2q11", level: "kho", source: "mới",
          q: "Có bao nhiêu số nguyên $x$ thoả mãn $-\\frac{7}{3} \\lt x \\lt \\frac{9}{4}$?",
          options: ["$4$", "$6$", "$5$", "$3$"],
          answer: 2,
          explain: "$-\\frac{7}{3} = -2\\frac{1}{3}$ và $\\frac{9}{4} = 2\\frac{1}{4}$ nên $x \\in \\{-2; -1; 0; 1; 2\\}$: có $5$ số." },
        { id: "d2q12", level: "kho", source: "SBT Ôn tập chương I – BT 1.33",
          q: "Tìm $x$, biết $0{,}6^2 \\cdot x = 0{,}36^3$.",
          options: ["$0{,}6^3$", "$0{,}6^8$", "$0{,}36$", "$0{,}6^4$"],
          answer: 3,
          explain: "$0{,}36 = 0{,}6^2$ nên $0{,}36^3 = 0{,}6^6$. Do đó $x = 0{,}6^6 : 0{,}6^2 = 0{,}6^4$." }
      ],
      essay: [
        { id: "d2e1", level: "vua", source: "SBT Ôn tập chương I – BT 1.32", maxPoints: 1,
          q: "Tính một cách hợp lí: $\\left(2 + \\frac{3}{5} - \\frac{1}{4}\\right) - \\left(3 - \\frac{1}{4}\\right) + \\left(\\frac{2}{5} - 5\\right)$.",
          modelAnswer: "Bỏ dấu ngoặc (ngoặc thứ hai có dấu \"−\" đứng trước nên đổi dấu):<br>" +
            "$= 2 + \\frac{3}{5} - \\frac{1}{4} - 3 + \\frac{1}{4} + \\frac{2}{5} - 5$<br>" +
            "Nhóm hợp lí: $= (2 - 3 - 5) + \\left(\\frac{3}{5} + \\frac{2}{5}\\right) + \\left(-\\frac{1}{4} + \\frac{1}{4}\\right)$<br>" +
            "$= -6 + 1 + 0 = -5$.",
          rubric: [
            { pts: 0.5, text: "Bỏ ngoặc đúng, đổi dấu đúng các số hạng trong ngoặc có dấu \"−\" đứng trước" },
            { pts: 0.25, text: "Nhóm hợp lí các số nguyên, các phân số cùng mẫu" },
            { pts: 0.25, text: "Kết quả đúng $-5$" }
          ] },
        { id: "d2e2", level: "kho", source: "SBT Ôn tập chương I – BT 1.33", maxPoints: 2,
          q: "Tìm $x$, biết:<br>a) $x : \\left(-\\frac{2}{3}\\right)^2 = \\left(-\\frac{2}{3}\\right)^3$;<br>b) $\\frac{3}{4} - \\left(x + \\frac{1}{2}\\right) = -\\frac{5}{6}$.",
          modelAnswer: "a) $x = \\left(-\\frac{2}{3}\\right)^3 \\cdot \\left(-\\frac{2}{3}\\right)^2 = \\left(-\\frac{2}{3}\\right)^{3+2} = \\left(-\\frac{2}{3}\\right)^5 = -\\frac{32}{243}$.<br>" +
            "b) Coi $x + \\frac{1}{2}$ là số trừ: $x + \\frac{1}{2} = \\frac{3}{4} - \\left(-\\frac{5}{6}\\right) = \\frac{3}{4} + \\frac{5}{6} = \\frac{9}{12} + \\frac{10}{12} = \\frac{19}{12}$.<br>" +
            "Chuyển vế: $x = \\frac{19}{12} - \\frac{1}{2} = \\frac{19}{12} - \\frac{6}{12} = \\frac{13}{12}$.<br>" +
            "Vậy a) $x = -\\frac{32}{243}$; b) $x = \\frac{13}{12}$.",
          rubric: [
            { pts: 0.5, text: "Câu a: lập được $x = \\left(-\\frac{2}{3}\\right)^3 \\cdot \\left(-\\frac{2}{3}\\right)^2 = \\left(-\\frac{2}{3}\\right)^5$" },
            { pts: 0.5, text: "Câu a: tính đúng $x = -\\frac{32}{243}$ (đúng dấu âm)" },
            { pts: 0.5, text: "Câu b: tìm đúng $x + \\frac{1}{2} = \\frac{19}{12}$" },
            { pts: 0.5, text: "Câu b: chuyển vế, tính đúng $x = \\frac{13}{12}$" }
          ] }
      ] },

    // ========================= ĐỀ 3 =========================
    { id: "d3", name: "Đề 3",
      mcq: [
        { id: "d3q1", level: "de", source: "SBT Ôn tập chương I – câu 4",
          q: "Khẳng định nào sau đây là <b>sai</b>?",
          options: [
            "Hai số hữu tỉ bất kì luôn so sánh được với nhau",
            "Trên trục số, điểm biểu diễn số hữu tỉ âm nằm bên trái điểm $0$",
            "Số $0$ là số hữu tỉ dương",
            "Mỗi số hữu tỉ được biểu diễn bởi một điểm trên trục số"
          ],
          answer: 2,
          explain: "Số $0$ không là số hữu tỉ dương, cũng không là số hữu tỉ âm. Ba khẳng định còn lại đều đúng." },
        { id: "d3q2", level: "de", source: "mới",
          q: "Phân số nào sau đây biểu diễn số hữu tỉ $-0{,}6$?",
          options: ["$\\frac{-6}{100}$", "$\\frac{3}{5}$", "$\\frac{-5}{3}$", "$\\frac{-3}{5}$"],
          answer: 3,
          explain: "$-0{,}6 = \\frac{-6}{10} = \\frac{-3}{5}$." },
        { id: "d3q3", level: "de", source: "SBT Ôn tập chương I – câu 2",
          q: "Kết quả của phép chia $(-3)^8 : (-3)^2$ là:",
          options: ["$(-3)^6$", "$(-3)^4$", "$(-3)^{10}$", "$1^6$"],
          answer: 0,
          explain: "Chia hai luỹ thừa cùng cơ số: giữ cơ số, trừ số mũ: $(-3)^{8-2} = (-3)^6$." },
        { id: "d3q4", level: "de", source: "mới",
          q: "Kết quả của phép tính $-\\frac{4}{9} - \\left(-\\frac{1}{3}\\right)$ là:",
          options: ["$-\\frac{7}{9}$", "$-\\frac{1}{9}$", "$\\frac{1}{9}$", "$-\\frac{1}{2}$"],
          answer: 1,
          explain: "$-\\frac{4}{9} + \\frac{1}{3} = -\\frac{4}{9} + \\frac{3}{9} = -\\frac{1}{9}$." },
        { id: "d3q5", level: "vua", source: "mới",
          q: "Số nhỏ nhất trong các số $-\\frac{5}{6};\\ -0{,}85;\\ -\\frac{7}{9};\\ -\\frac{3}{4}$ là:",
          options: ["$-0{,}85$", "$-\\frac{3}{4}$", "$-\\frac{5}{6}$", "$-\\frac{7}{9}$"],
          answer: 0,
          explain: "$-\\frac{5}{6} \\approx -0{,}833$; $-\\frac{7}{9} \\approx -0{,}778$; $-\\frac{3}{4} = -0{,}75$. Số âm có phần số lớn nhất là $-0{,}85$ nên nó nhỏ nhất." },
        { id: "d3q6", level: "vua", source: "mới",
          q: "Giá trị của biểu thức $\\frac{3}{7} \\cdot \\frac{5}{9} + \\frac{3}{7} \\cdot \\frac{4}{9} - \\frac{3}{7} \\cdot 2$ là:",
          options: ["$\\frac{3}{7}$", "$\\frac{9}{7}$", "$-\\frac{3}{7}$", "$-\\frac{1}{7}$"],
          answer: 2,
          explain: "Đặt thừa số chung: $\\frac{3}{7} \\cdot \\left(\\frac{5}{9} + \\frac{4}{9} - 2\\right) = \\frac{3}{7} \\cdot (1 - 2) = -\\frac{3}{7}$." },
        { id: "d3q7", level: "vua", source: "SGK tr.22 – Luyện tập 2",
          q: "Tìm $x$, biết $-\\frac{1}{3} - x = \\frac{5}{6}$.",
          options: ["$\\frac{7}{6}$", "$-\\frac{7}{6}$", "$\\frac{1}{2}$", "$-\\frac{1}{2}$"],
          answer: 1,
          explain: "Chuyển vế: $x = -\\frac{1}{3} - \\frac{5}{6} = -\\frac{2}{6} - \\frac{5}{6} = -\\frac{7}{6}$." },
        { id: "d3q8", level: "vua", source: "SGK Bài 3 – BT 1.24",
          q: "Khoảng cách từ Trái Đất đến Mặt Trời khoảng $1{,}5 \\cdot 10^8$ km, từ Sao Thổ đến Mặt Trời khoảng $1{,}43 \\cdot 10^9$ km. Khoảng cách từ Sao Thổ đến Mặt Trời gấp khoảng bao nhiêu lần khoảng cách từ Trái Đất đến Mặt Trời?",
          options: ["Khoảng $95$ lần", "Khoảng $0{,}1$ lần", "Khoảng $950$ lần", "Khoảng $9{,}5$ lần"],
          answer: 3,
          explain: "$1{,}43 \\cdot 10^9 = 14{,}3 \\cdot 10^8$; $\\ 14{,}3 : 1{,}5 \\approx 9{,}5$." },
        { id: "d3q9", level: "vua", source: "SGK Bài tập cuối chương I – BT 1.38",
          q: "Chuyến tàu của bác Nam khởi hành lúc $7$ giờ $15$ phút. Bác cần có mặt ở ga trước giờ tàu chạy ít nhất $\\frac{3}{4}$ giờ, đi từ nhà đến ga mất $1$ giờ $20$ phút. Bác Nam phải đi từ nhà muộn nhất lúc mấy giờ?",
          options: ["$6$ giờ $30$ phút", "$5$ giờ $55$ phút", "$5$ giờ $10$ phút", "$9$ giờ $20$ phút"],
          answer: 2,
          explain: "$\\frac{3}{4}$ giờ $= 45$ phút. Thời gian cần trước giờ tàu chạy: $45$ phút $+ 1$ giờ $20$ phút $= 2$ giờ $5$ phút. $7$ giờ $15$ phút $- 2$ giờ $5$ phút $= 5$ giờ $10$ phút." },
        { id: "d3q10", level: "kho", source: "mới",
          q: "So sánh $2^{30}$ và $3^{20}$.",
          options: ["$2^{30} \\gt 3^{20}$", "$2^{30} \\lt 3^{20}$", "$2^{30} = 3^{20}$", "Không so sánh được vì cơ số và số mũ đều khác nhau"],
          answer: 1,
          explain: "$2^{30} = (2^3)^{10} = 8^{10}$ và $3^{20} = (3^2)^{10} = 9^{10}$. Vì $8 \\lt 9$ nên $2^{30} \\lt 3^{20}$." },
        { id: "d3q11", level: "kho", source: "SBT Ôn tập chương I – BT 1.38",
          q: "Giá trị của biểu thức $A = \\frac{4^6 + 2^4}{4^5 + 4}$ là:",
          options: ["$16$", "$2$", "$\\frac{1}{4}$", "$4$"],
          answer: 3,
          explain: "$2^4 = 4^2$ nên tử $= 4^6 + 4^2 = 4^2(4^4 + 1)$, mẫu $= 4(4^4 + 1)$. Vậy $A = \\frac{4^2}{4} = 4$." },
        { id: "d3q12", level: "kho", source: "SBT Ôn tập chương I – BT 1.37",
          q: "Biết $1^2 + 2^2 + 3^2 + \\dots + 10^2 = 385$. Giá trị của $3^2 + 6^2 + 9^2 + \\dots + 30^2$ là:",
          options: ["$3\\,465$", "$1\\,155$", "$3\\,850$", "$34\\,650$"],
          answer: 0,
          explain: "$(3k)^2 = 9k^2$ nên tổng $= 9 \\cdot (1^2 + 2^2 + \\dots + 10^2) = 9 \\cdot 385 = 3\\,465$." }
      ],
      essay: [
        { id: "d3e1", level: "vua", source: "SGK Bài tập cuối chương I – BT 1.36", maxPoints: 1,
          q: "Tính giá trị của biểu thức: $\\left(\\frac{1}{3} - \\frac{1}{2}\\right)^2 : \\frac{1}{12} + 0{,}2^3 \\cdot 5^3 - (-10)^3 : 5^3$.",
          modelAnswer: "Trong ngoặc: $\\frac{1}{3} - \\frac{1}{2} = -\\frac{1}{6}$, nên $\\left(-\\frac{1}{6}\\right)^2 = \\frac{1}{36}$.<br>" +
            "$\\frac{1}{36} : \\frac{1}{12} = \\frac{1}{36} \\cdot 12 = \\frac{1}{3}$.<br>" +
            "$0{,}2^3 \\cdot 5^3 = (0{,}2 \\cdot 5)^3 = 1^3 = 1$.<br>" +
            "$(-10)^3 : 5^3 = (-10 : 5)^3 = (-2)^3 = -8$.<br>" +
            "Vậy biểu thức $= \\frac{1}{3} + 1 - (-8) = \\frac{1}{3} + 9 = \\frac{28}{3}$.",
          rubric: [
            { pts: 0.25, text: "Tính đúng $\\left(-\\frac{1}{6}\\right)^2 : \\frac{1}{12} = \\frac{1}{3}$" },
            { pts: 0.25, text: "Tính đúng $0{,}2^3 \\cdot 5^3 = 1$" },
            { pts: 0.25, text: "Tính đúng $(-10)^3 : 5^3 = -8$" },
            { pts: 0.25, text: "Kết quả đúng $\\frac{28}{3}$ (chú ý trừ số âm thành cộng)" }
          ] },
        { id: "d3e2", level: "kho", source: "SBT Ôn tập chương I – BT 1.36", maxPoints: 2,
          q: "Để làm $18$ chiếc bánh cần $2\\frac{1}{4}$ cốc bột mì.<br>a) Bạn Mai muốn làm $12$ chiếc bánh. Hỏi Mai cần bao nhiêu cốc bột mì?<br>b) Nếu chỉ có $1\\frac{1}{5}$ cốc bột mì thì Mai làm được nhiều nhất bao nhiêu chiếc bánh?",
          modelAnswer: "Lượng bột cho một chiếc bánh: $2\\frac{1}{4} : 18 = \\frac{9}{4} \\cdot \\frac{1}{18} = \\frac{1}{8}$ (cốc).<br>" +
            "a) Làm $12$ chiếc bánh cần: $12 \\cdot \\frac{1}{8} = \\frac{3}{2} = 1\\frac{1}{2}$ (cốc bột mì).<br>" +
            "b) $1\\frac{1}{5} = \\frac{6}{5}$; ta có $\\frac{6}{5} : \\frac{1}{8} = \\frac{6}{5} \\cdot 8 = \\frac{48}{5} = 9{,}6$.<br>" +
            "Số chiếc bánh phải là số tự nhiên và không vượt quá $9{,}6$ nên Mai làm được nhiều nhất $9$ chiếc bánh.",
          rubric: [
            { pts: 0.5, text: "Tính được lượng bột cho một chiếc bánh $\\frac{1}{8}$ cốc (hoặc lập đúng tỉ số $\\frac{12}{18}$)" },
            { pts: 0.5, text: "Câu a: kết quả đúng $\\frac{3}{2}$ cốc" },
            { pts: 0.5, text: "Câu b: tính đúng $\\frac{6}{5} : \\frac{1}{8} = \\frac{48}{5}$" },
            { pts: 0.5, text: "Câu b: lập luận làm tròn xuống, kết luận nhiều nhất $9$ chiếc bánh" }
          ] }
      ] }
  ]
});
