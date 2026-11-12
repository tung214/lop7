registerLesson({
  id: "c1-b03",
  chapter: 1,
  kind: "lesson",
  title: "Bài 3. Luỹ thừa với số mũ tự nhiên của một số hữu tỉ",
  sgkPages: [16, 19],
  sbtPages: [13, 16],
  objectives: [
    "Hiểu và tính được luỹ thừa với số mũ tự nhiên của một số hữu tỉ",
    "Nhận biết cơ số, số mũ; dấu của luỹ thừa một số âm với số mũ chẵn, lẻ",
    "Nhân, chia hai luỹ thừa cùng cơ số; tính luỹ thừa của luỹ thừa",
    "Vận dụng luỹ thừa của một tích, một thương để tính nhanh",
    "Giải bài toán tìm số mũ và bài toán thực tế có dùng luỹ thừa"
  ],

  theory: [
    { heading: "1. Luỹ thừa với số mũ tự nhiên",
      html: "Với $x$ là số hữu tỉ và $n$ là số tự nhiên lớn hơn $1$, <b>luỹ thừa bậc $n$ của $x$</b> là tích của $n$ thừa số đều bằng $x$:" +
            "$$x^n = \\underbrace{x\\cdot x\\cdot \\ldots \\cdot x}_{n}\\qquad (x \\in \\mathbb{Q},\\ n \\in \\mathbb{N},\\ n > 1)$$" +
            "(vế phải có đúng $n$ thừa số $x$).<br>" +
            "Ta đọc $x^n$ là “$x$ mũ $n$” hoặc “$x$ luỹ thừa $n$”. Trong đó $x$ là <b>cơ số</b>, $n$ là <b>số mũ</b>.<br>" +
            "<b>Quy ước:</b> $x^1 = x$; $x^0 = 1$ (với $x \\ne 0$).<br>" +
            "Ví dụ: $(-3)^3 = (-3)\\cdot(-3)\\cdot(-3) = -27$; $\\left(\\frac{1}{3}\\right)^4 = \\frac{1}{81}$; $(0{,}7)^2 = 0{,}49$." },
    { heading: "2. Luỹ thừa của một phân số, dấu của luỹ thừa",
      html: "<ul><li>Luỹ thừa của một phân số: $\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$ ($b \\ne 0$) — nâng cả tử và mẫu lên luỹ thừa $n$.</li>" +
            "<li>Luỹ thừa của số âm: với số mũ <b>chẵn</b> thì kết quả <b>dương</b>, với số mũ <b>lẻ</b> thì kết quả <b>âm</b>. Ví dụ $(-2)^4 = 16$, $(-2)^5 = -32$.</li>" +
            "<li>Phân biệt: $(-2)^4 = 16$ (cơ số là $-2$), còn $-2^4 = -(2^4) = -16$ (cơ số là $2$, dấu trừ đứng ngoài).</li>" +
            "<li>$1^n = 1$; $0^n = 0$ ($n \\ge 1$); $(-1)^n = 1$ nếu $n$ chẵn, $(-1)^n = -1$ nếu $n$ lẻ.</li></ul>" },
    { heading: "3. Luỹ thừa của một tích, một thương",
      html: "Luỹ thừa của một tích bằng tích các luỹ thừa; luỹ thừa của một thương bằng thương các luỹ thừa:" +
            "$$(x\\cdot y)^n = x^n\\cdot y^n;\\qquad \\left(\\frac{x}{y}\\right)^n = \\frac{x^n}{y^n}\\ \\ (y \\ne 0).$$" +
            "Đọc theo chiều ngược lại, hai luỹ thừa <b>cùng số mũ</b> có thể gộp thành một: $\\left(\\frac{2}{3}\\right)^{10}\\cdot 3^{10} = \\left(\\frac{2}{3}\\cdot 3\\right)^{10} = 2^{10}$; $(-125)^3 : 25^3 = (-5)^3$." },
    { heading: "4. Nhân và chia hai luỹ thừa cùng cơ số",
      html: "<ul><li>Nhân hai luỹ thừa cùng cơ số: giữ nguyên cơ số, <b>cộng</b> các số mũ: $$x^m\\cdot x^n = x^{m+n}.$$</li>" +
            "<li>Chia hai luỹ thừa cùng cơ số (khác $0$): giữ nguyên cơ số, lấy số mũ của số bị chia <b>trừ</b> số mũ của số chia: $$x^m : x^n = x^{m-n}\\quad (x \\ne 0,\\ m \\ge n).$$</li></ul>" +
            "Ví dụ: $\\left(\\frac{2}{3}\\right)^5\\cdot\\left(\\frac{2}{3}\\right)^3 = \\left(\\frac{2}{3}\\right)^8 = \\frac{256}{6561}$; $(-5)^5 : (-5)^5 = (-5)^0 = 1$." },
    { heading: "5. Luỹ thừa của luỹ thừa",
      html: "Khi tính luỹ thừa của một luỹ thừa, ta giữ nguyên cơ số và <b>nhân</b> các số mũ:" +
            "$$(x^m)^n = x^{m\\cdot n}.$$" +
            "Ví dụ: $\\left[(-5)^3\\right]^7 = (-5)^{21}$; $\\left(\\frac{1}{4}\\right)^8 = \\left[\\left(\\frac{1}{2}\\right)^2\\right]^8 = \\left(\\frac{1}{2}\\right)^{16}$." },
    { heading: "6. Hai luỹ thừa bằng nhau",
      html: "Với $a \\ne 0$, $a \\ne 1$, $a \\ne -1$: nếu $a^m = a^n$ thì $m = n$.<br>" +
            "Tính chất này dùng để <b>tìm số mũ</b>: đưa hai vế về luỹ thừa cùng cơ số rồi cho hai số mũ bằng nhau. Ví dụ $2^{n} = 32 = 2^5$ nên $n = 5$." }
  ],

  skills: [
    "Thuộc một số luỹ thừa hay dùng: $2^{10} = 1024$; $3^5 = 243$; $4^3 = 64$; $5^4 = 625$; $6^3 = 216$; $7^3 = 343$. Chúng giúp nhận ra nhanh $243 = 3^5$, $\\frac{1}{64} = \\left(\\frac{1}{4}\\right)^3 = \\left(\\frac{1}{2}\\right)^6$…",
    "Muốn viết một biểu thức thành luỹ thừa của một số hữu tỉ: <b>đưa các số về cùng cơ số</b> (ví dụ $8 = 2^3$, $32 = 2^5$, $3^{11}\\cdot\\frac{1}{9} = \\frac{3^{11}}{3^2} = 3^9$) rồi dùng quy tắc nhân, chia; hoặc <b>đưa về cùng số mũ</b> rồi dùng luỹ thừa của tích, thương: $16\\cdot 81 = 2^4\\cdot 3^4 = 6^4$.",
    "Tính giá trị biểu thức có luỹ thừa: tính luỹ thừa trước, rồi nhân chia, cuối cùng cộng trừ; nhóm các số hạng có tổng tròn để tính nhanh.",
    "Tìm số mũ $n$: biến đổi hai vế thành luỹ thừa cùng cơ số $a^{\\ldots} = a^{\\ldots}$ (với $a \\ne 0, \\pm 1$) rồi cho số mũ bằng nhau.",
    "Khi biết $x^n$, muốn tính $x^{n+1}$ thì chỉ cần nhân thêm một thừa số $x$: $x^{n+1} = x^n\\cdot x$.",
    "<b>Lỗi hay gặp 1:</b> nhầm $-2^2$ với $(-2)^2$. Ta có $-2^2 = -4$ còn $(-2)^2 = 4$.",
    "<b>Lỗi hay gặp 2:</b> nhân cơ số hoặc nhân số mũ khi nhân hai luỹ thừa: $2^3\\cdot 2^4 \\ne 4^7$ và $\\ne 2^{12}$; đúng là $2^3\\cdot 2^4 = 2^7$.",
    "<b>Lỗi hay gặp 3:</b> chỉ nâng tử mà quên mẫu: $\\left(\\frac{2}{3}\\right)^3 = \\frac{8}{27}$, không phải $\\frac{8}{3}$; và nhầm $x^n$ với $x\\cdot n$: $(0{,}2)^3 = 0{,}008$, không phải $0{,}6$.",
    "<b>Lỗi hay gặp 4:</b> nghĩ $x^0 = 0$. Thực ra $x^0 = 1$ với mọi $x \\ne 0$."
  ],

  examples: [
    { q: "Tính: a) $\\left(-\\frac{3}{4}\\right)^3$; b) $(0{,}4)^2$; c) $-2^4$ và $(-2)^4$.",
      solution: "a) $\\left(-\\frac{3}{4}\\right)^3 = \\frac{(-3)^3}{4^3} = \\frac{-27}{64}$ (số mũ lẻ nên kết quả âm).<br>" +
                "b) $(0{,}4)^2 = 0{,}4\\cdot 0{,}4 = 0{,}16$.<br>" +
                "c) $-2^4 = -(2\\cdot 2\\cdot 2\\cdot 2) = -16$; còn $(-2)^4 = (-2)\\cdot(-2)\\cdot(-2)\\cdot(-2) = 16$." },
    { q: "Viết các biểu thức sau dưới dạng luỹ thừa của một số hữu tỉ: a) $A = 4\\cdot\\left(\\frac{1}{2}\\right)^5\\cdot 16\\cdot 2^6$; b) $B = 9\\cdot 3^5 : \\left(2^9\\cdot\\frac{1}{4}\\right)$.",
      solution: "a) $A = 2^2\\cdot\\frac{1}{2^5}\\cdot 2^4\\cdot 2^6 = \\frac{2^{2+4+6}}{2^5} = \\frac{2^{12}}{2^5} = 2^{12-5} = 2^7$.<br>" +
                "b) $2^9\\cdot\\frac{1}{4} = \\frac{2^9}{2^2} = 2^7$ và $9\\cdot 3^5 = 3^2\\cdot 3^5 = 3^7$.<br>" +
                "Vậy $B = 3^7 : 2^7 = \\left(\\frac{3}{2}\\right)^7$." },
    { q: "Tính giá trị của biểu thức $C = \\left(-\\frac{1}{2}\\right)^3\\cdot 8 - 1{,}5^2 + \\left(\\frac{2}{3}\\right)^0$.",
      solution: "$\\left(-\\frac{1}{2}\\right)^3 = -\\frac{1}{8}$, nên $\\left(-\\frac{1}{2}\\right)^3\\cdot 8 = -1$.<br>" +
                "$1{,}5^2 = 2{,}25$; $\\left(\\frac{2}{3}\\right)^0 = 1$.<br>" +
                "$C = -1 - 2{,}25 + 1 = -2{,}25$." },
    { q: "Tìm số tự nhiên $n$, biết $2\\cdot 9^n : 3^2 = 162$.",
      solution: "$9^n = (3^2)^n = 3^{2n}$, nên $2\\cdot 3^{2n} : 3^2 = 2\\cdot 3^{2n-2}$.<br>" +
                "Từ $2\\cdot 3^{2n-2} = 162$ suy ra $3^{2n-2} = 81 = 3^4$.<br>" +
                "Do đó $2n - 2 = 4$, tức $2n = 6$, $n = 3$.<br>" +
                "Thử lại: $2\\cdot 9^3 : 9 = 2\\cdot 81 = 162$ (đúng)." }
  ],

  sets: [
    /* ======================= ĐỀ 1 ======================= */
    { id: "d1", name: "Đề 1",
      mcq: [
        { id: "d1q1", level: "de", source: "SGK tr.17 – Luyện tập 1",
          q: "Giá trị của $\\left(-\\frac{2}{3}\\right)^3$ là",
          options: ["$\\frac{8}{27}$", "$-\\frac{8}{9}$", "$-\\frac{6}{9}$", "$-\\frac{8}{27}$"],
          answer: 3,
          explain: "$\\left(-\\frac{2}{3}\\right)^3 = \\frac{(-2)^3}{3^3} = -\\frac{8}{27}$ (số mũ lẻ nên kết quả âm; nâng cả tử và mẫu)." },
        { id: "d1q2", level: "de", source: "mới",
          q: "Trong luỹ thừa $(-0{,}5)^4$, cơ số và số mũ lần lượt là",
          options: ["$0{,}5$ và $4$", "$-0{,}5$ và $4$", "$4$ và $-0{,}5$", "$-5$ và $4$"],
          answer: 1,
          explain: "Cơ số là số nằm trong ngoặc $-0{,}5$; số mũ là $4$." },
        { id: "d1q3", level: "de", source: "mới",
          q: "Giá trị của $\\left(\\frac{3}{4}\\right)^0$ là",
          options: ["$1$", "$0$", "$\\frac{3}{4}$", "$\\frac{4}{3}$"],
          answer: 0,
          explain: "Quy ước $x^0 = 1$ với mọi $x \\ne 0$." },
        { id: "d1q4", level: "de", source: "SGK tr.18 – Luyện tập 3",
          q: "Kết quả của $\\left(-\\frac{1}{2}\\right)^5\\cdot\\left(-\\frac{1}{2}\\right)^3$ viết dưới dạng luỹ thừa là",
          options: ["$\\left(-\\frac{1}{2}\\right)^{15}$", "$\\left(\\frac{1}{4}\\right)^8$", "$\\left(-\\frac{1}{2}\\right)^8$", "$\\left(-\\frac{1}{2}\\right)^2$"],
          answer: 2,
          explain: "Nhân hai luỹ thừa cùng cơ số: giữ cơ số, cộng số mũ $5 + 3 = 8$." },
        { id: "d1q5", level: "vua", source: "SGK tr.18 – Luyện tập 3",
          q: "Kết quả của $(0{,}25)^7 : (0{,}25)^3$ là",
          options: ["$(0{,}25)^{10}$", "$(0{,}25)^4$", "$1^4$", "$(0{,}25)^{21}$"],
          answer: 1,
          explain: "Chia hai luỹ thừa cùng cơ số: giữ cơ số, trừ số mũ $7 - 3 = 4$." },
        { id: "d1q6", level: "vua", source: "SGK tr.18 – Ví dụ 4",
          q: "Viết $\\left[\\left(-\\frac{2}{5}\\right)^2\\right]^3$ dưới dạng một luỹ thừa:",
          options: ["$\\left(-\\frac{2}{5}\\right)^5$", "$\\left(-\\frac{2}{5}\\right)^8$", "$\\left(-\\frac{2}{5}\\right)^9$", "$\\left(-\\frac{2}{5}\\right)^6$"],
          answer: 3,
          explain: "Luỹ thừa của luỹ thừa: nhân số mũ $2\\cdot 3 = 6$." },
        { id: "d1q7", level: "vua", source: "SGK Bài 3 – BT 1.19",
          q: "Viết $\\left(\\frac{1}{9}\\right)^4$ dưới dạng luỹ thừa cơ số $\\frac{1}{3}$:",
          options: ["$\\left(\\frac{1}{3}\\right)^8$", "$\\left(\\frac{1}{3}\\right)^6$", "$\\left(\\frac{1}{3}\\right)^4$", "$\\left(\\frac{1}{3}\\right)^2$"],
          answer: 0,
          explain: "$\\frac{1}{9} = \\left(\\frac{1}{3}\\right)^2$ nên $\\left(\\frac{1}{9}\\right)^4 = \\left(\\frac{1}{3}\\right)^{2\\cdot 4} = \\left(\\frac{1}{3}\\right)^8$." },
        { id: "d1q8", level: "vua", source: "SGK tr.17 – Luyện tập 2",
          q: "Giá trị của $\\left(\\frac{2}{3}\\right)^5\\cdot 3^5$ là",
          options: ["$10$", "$\\frac{32}{243}$", "$32$", "$1024$"],
          answer: 2,
          explain: "Luỹ thừa của một tích: $\\left(\\frac{2}{3}\\cdot 3\\right)^5 = 2^5 = 32$." },
        { id: "d1q9", level: "kho", source: "SGK Bài 3 – BT 1.21",
          q: "Biết $(-2)^9 = -512$. Không dùng máy tính, giá trị của $(-2)^{10}$ là",
          options: ["$-1024$", "$-514$", "$-510$", "$1024$"],
          answer: 3,
          explain: "$(-2)^{10} = (-2)^9\\cdot(-2) = (-512)\\cdot(-2) = 1024$ (số mũ chẵn nên dương)." },
        { id: "d1q10", level: "kho", source: "SBT Bài 3 – BT 1.25",
          q: "Số tự nhiên $n$ thỏa mãn $3^n\\cdot\\left(\\frac{1}{3}\\right)^2 = 27$ là",
          options: ["$n = 3$", "$n = 5$", "$n = 1$", "$n = 6$"],
          answer: 1,
          explain: "$3^n\\cdot\\frac{1}{9} = 27 \\Rightarrow 3^n = 27\\cdot 9 = 243 = 3^5$, nên $n = 5$." }
      ],
      essay: [
        { id: "d1e1", level: "vua", source: "SBT Bài 3 – BT 1.18", maxPoints: 1,
          q: "Viết các số sau dưới dạng luỹ thừa của một số hữu tỉ: a) $16\\cdot 81$; b) $125 : 343$.",
          modelAnswer: "a) $16\\cdot 81 = 2^4\\cdot 3^4 = (2\\cdot 3)^4 = 6^4$.<br>" +
                       "b) $125 : 343 = 5^3 : 7^3 = \\left(\\frac{5}{7}\\right)^3$.",
          rubric: [
            { pts: 0.5, text: "a) Viết đúng $2^4\\cdot 3^4 = 6^4$." },
            { pts: 0.5, text: "b) Viết đúng $5^3 : 7^3 = \\left(\\frac{5}{7}\\right)^3$." }
          ] },
        { id: "d1e2", level: "kho", source: "SBT Bài 3 – BT 1.20", maxPoints: 2,
          q: "Tính giá trị của biểu thức $A = 4^3 : 2^4 + 3^4 : 9^2 - \\left(-\\frac{1}{2}\\right)^2$.",
          modelAnswer: "$4^3 : 2^4 = 64 : 16 = 4$ (hoặc $2^6 : 2^4 = 2^2 = 4$).<br>" +
                       "$3^4 : 9^2 = 81 : 81 = 1$ (vì $9^2 = 3^4$).<br>" +
                       "$\\left(-\\frac{1}{2}\\right)^2 = \\frac{1}{4}$.<br>" +
                       "$A = 4 + 1 - \\frac{1}{4} = 5 - \\frac{1}{4} = \\frac{19}{4}$ (hay $4{,}75$).",
          rubric: [
            { pts: 0.75, text: "Tính đúng $4^3 : 2^4 = 4$." },
            { pts: 0.5, text: "Tính đúng $3^4 : 9^2 = 1$." },
            { pts: 0.25, text: "Tính đúng $\\left(-\\frac{1}{2}\\right)^2 = \\frac{1}{4}$ (dương)." },
            { pts: 0.5, text: "Kết quả đúng $A = \\frac{19}{4}$." }
          ] }
      ] },

    /* ======================= ĐỀ 2 ======================= */
    { id: "d2", name: "Đề 2",
      mcq: [
        { id: "d2q1", level: "de", source: "SGK tr.16 – HĐ3",
          q: "Tích $\\frac{3}{5}\\cdot\\frac{3}{5}\\cdot\\frac{3}{5}\\cdot\\frac{3}{5}$ viết dưới dạng luỹ thừa là",
          options: ["$4\\cdot\\frac{3}{5}$", "$\\left(\\frac{3}{5}\\right)^4$", "$\\frac{3^4}{5}$", "$\\left(\\frac{3}{5}\\right)^5$"],
          answer: 1,
          explain: "Tích của $4$ thừa số bằng $\\frac{3}{5}$ là $\\left(\\frac{3}{5}\\right)^4$." },
        { id: "d2q2", level: "de", source: "SGK tr.17 – Luyện tập 1",
          q: "Giá trị của $(-0{,}2)^3$ là",
          options: ["$0{,}008$", "$-0{,}6$", "$-0{,}008$", "$-0{,}08$"],
          answer: 2,
          explain: "$(-0{,}2)^3 = (-0{,}2)\\cdot(-0{,}2)\\cdot(-0{,}2) = -0{,}008$ (số mũ lẻ nên âm)." },
        { id: "d2q3", level: "de", source: "mới",
          q: "Số nào sau đây là số <b>dương</b>?",
          options: ["$(-3)^3$", "$\\left(-\\frac{1}{2}\\right)^5$", "$-2^4$", "$(-0{,}4)^2$"],
          answer: 3,
          explain: "Số âm mũ chẵn cho kết quả dương: $(-0{,}4)^2 = 0{,}16$. Còn $-2^4 = -16$ vì dấu trừ đứng ngoài luỹ thừa." },
        { id: "d2q4", level: "de", source: "SGK tr.17 – HĐ4",
          q: "Kết quả của $(-3)^2\\cdot(-3)^4$ là",
          options: ["$(-3)^6$", "$(-3)^8$", "$9^6$", "$9^8$"],
          answer: 0,
          explain: "Giữ nguyên cơ số $-3$, cộng số mũ: $2 + 4 = 6$." },
        { id: "d2q5", level: "vua", source: "mới",
          q: "Giá trị của $\\left(\\frac{-2}{3}\\right)^6 : \\left(\\frac{-2}{3}\\right)^4$ là",
          options: ["$-\\frac{4}{9}$", "$\\frac{4}{9}$", "$-\\frac{2}{3}$", "$\\frac{4}{6}$"],
          answer: 1,
          explain: "$= \\left(\\frac{-2}{3}\\right)^{6-4} = \\left(\\frac{-2}{3}\\right)^2 = \\frac{4}{9}$." },
        { id: "d2q6", level: "vua", source: "SBT Bài 3 – BT 1.22",
          q: "Số thích hợp thay cho dấu “?” trong đẳng thức $\\left(\\frac{4}{5}\\right)^{?} : \\left(\\frac{4}{5}\\right)^3 = \\left(\\frac{4}{5}\\right)^5$ là",
          options: ["$2$", "$15$", "$8$", "$5$"],
          answer: 2,
          explain: "Số mũ: $? - 3 = 5$ nên $? = 8$." },
        { id: "d2q7", level: "vua", source: "SGK tr.17 – Luyện tập 2",
          q: "Giá trị của $(0{,}5)^4\\cdot 4^4$ là",
          options: ["$8$", "$2$", "$256$", "$16$"],
          answer: 3,
          explain: "$(0{,}5\\cdot 4)^4 = 2^4 = 16$." },
        { id: "d2q8", level: "vua", source: "SBT Bài 3 – BT 1.19",
          q: "Số $3{,}2\\cdot\\left(\\frac{1}{10}\\right)^3$ viết dưới dạng số thập phân là",
          options: ["$0{,}0032$", "$0{,}032$", "$0{,}00032$", "$3\\,200$"],
          answer: 0,
          explain: "$\\left(\\frac{1}{10}\\right)^3 = 0{,}001$; $3{,}2\\cdot 0{,}001 = 0{,}0032$ (dời dấu phẩy sang trái $3$ chữ số)." },
        { id: "d2q9", level: "kho", source: "SBT Bài 3 – Ví dụ 3",
          q: "Số tự nhiên $n$ thỏa mãn $2\\cdot 4^n : 2^3 = 256$ là",
          options: ["$n = 4$", "$n = 6$", "$n = 5$", "$n = 10$"],
          answer: 2,
          explain: "$2\\cdot 2^{2n} : 2^3 = 2^{2n-2} = 256 = 2^8$, nên $2n - 2 = 8$, $n = 5$." },
        { id: "d2q10", level: "kho", source: "mới",
          q: "Khẳng định nào sau đây là <b>đúng</b>?",
          options: ["$2^{30} > 3^{20}$", "$4^{15} > 3^{20}$", "$8^{10} = 9^{10}$", "$2^{30} < 3^{20}$"],
          answer: 3,
          explain: "$2^{30} = (2^3)^{10} = 8^{10}$ và $3^{20} = (3^2)^{10} = 9^{10}$. Vì $8 < 9$ nên $2^{30} < 3^{20}$; mà $4^{15} = 2^{30}$ nên $4^{15} < 3^{20}$." }
      ],
      essay: [
        { id: "d2e1", level: "vua", source: "SGK Bài 3 – BT 1.23", maxPoints: 1.5,
          q: "Tính: a) $\\left(1 - \\frac{1}{3} + \\frac{1}{6}\\right)^2\\cdot\\frac{12}{5}$; b) $3 : \\left(\\frac{1}{2} - \\frac{3}{4}\\right)^2$.",
          modelAnswer: "a) $1 - \\frac{1}{3} + \\frac{1}{6} = \\frac{6 - 2 + 1}{6} = \\frac{5}{6}$; $\\left(\\frac{5}{6}\\right)^2 = \\frac{25}{36}$.<br>" +
                       "$\\frac{25}{36}\\cdot\\frac{12}{5} = \\frac{25\\cdot 12}{36\\cdot 5} = \\frac{5}{3}$.<br>" +
                       "b) $\\frac{1}{2} - \\frac{3}{4} = -\\frac{1}{4}$; $\\left(-\\frac{1}{4}\\right)^2 = \\frac{1}{16}$.<br>" +
                       "$3 : \\frac{1}{16} = 3\\cdot 16 = 48$.",
          rubric: [
            { pts: 0.5, text: "a) Tính đúng trong ngoặc $\\frac{5}{6}$ và bình phương $\\frac{25}{36}$." },
            { pts: 0.25, text: "a) Kết quả đúng $\\frac{5}{3}$." },
            { pts: 0.5, text: "b) Tính đúng $-\\frac{1}{4}$ và $\\left(-\\frac{1}{4}\\right)^2 = \\frac{1}{16}$ (dương)." },
            { pts: 0.25, text: "b) Kết quả đúng $48$." }
          ] },
        { id: "d2e2", level: "kho", source: "SGK Bài 3 – BT 1.24", maxPoints: 1.5,
          q: "Khoảng cách từ Trái Đất đến Mặt Trăng khoảng $3{,}84\\cdot 10^5$ km; khoảng cách từ Trái Đất đến Mặt Trời khoảng $1{,}5\\cdot 10^8$ km. Khoảng cách từ Trái Đất đến Mặt Trời gấp khoảng bao nhiêu lần khoảng cách từ Trái Đất đến Mặt Trăng? (Làm tròn kết quả đến hàng đơn vị.)",
          modelAnswer: "Số lần cần tìm là $\\left(1{,}5\\cdot 10^8\\right) : \\left(3{,}84\\cdot 10^5\\right) = (1{,}5 : 3{,}84)\\cdot\\left(10^8 : 10^5\\right)$.<br>" +
                       "$10^8 : 10^5 = 10^3 = 1000$.<br>" +
                       "$1{,}5 : 3{,}84 = 0{,}390625$, nên kết quả là $0{,}390625\\cdot 1000 = 390{,}625 \\approx 391$.<br>" +
                       "Vậy khoảng cách từ Trái Đất đến Mặt Trời gấp khoảng $391$ lần khoảng cách từ Trái Đất đến Mặt Trăng.",
          rubric: [
            { pts: 0.5, text: "Lập đúng phép chia $\\left(1{,}5\\cdot 10^8\\right) : \\left(3{,}84\\cdot 10^5\\right)$." },
            { pts: 0.5, text: "Tính đúng $10^8 : 10^5 = 10^3$ (chia hai luỹ thừa cùng cơ số)." },
            { pts: 0.5, text: "Kết quả đúng $390{,}625 \\approx 391$ lần, có kết luận." }
          ] }
      ] },

    /* ======================= ĐỀ 3 ======================= */
    { id: "d3", name: "Đề 3",
      mcq: [
        { id: "d3q1", level: "de", source: "SGK tr.17 – Ví dụ 1",
          q: "Giá trị của $\\left(\\frac{-1}{3}\\right)^4$ là",
          options: ["$-\\frac{1}{81}$", "$\\frac{1}{12}$", "$\\frac{1}{81}$", "$-\\frac{1}{12}$"],
          answer: 2,
          explain: "$\\left(\\frac{-1}{3}\\right)^4 = \\frac{(-1)^4}{3^4} = \\frac{1}{81}$ (số mũ chẵn nên dương)." },
        { id: "d3q2", level: "de", source: "mới",
          q: "Giá trị của $-3^2$ là",
          options: ["$-9$", "$9$", "$-6$", "$6$"],
          answer: 0,
          explain: "Dấu trừ đứng ngoài luỹ thừa: $-3^2 = -(3\\cdot 3) = -9$. Khác với $(-3)^2 = 9$." },
        { id: "d3q3", level: "de", source: "SGK tr.17 – Vận dụng",
          q: "Một hộp quà hình lập phương có cạnh $1{,}5$ dm. Thể tích của hộp quà là",
          options: ["$4{,}5\\ \\mathrm{dm}^3$", "$3{,}375\\ \\mathrm{dm}^3$", "$2{,}25\\ \\mathrm{dm}^3$", "$33{,}75\\ \\mathrm{dm}^3$"],
          answer: 1,
          explain: "$V = a^3 = 1{,}5^3 = 1{,}5\\cdot 1{,}5\\cdot 1{,}5 = 3{,}375\\ (\\mathrm{dm}^3)$. Lưu ý $1{,}5^3 \\ne 1{,}5\\cdot 3$." },
        { id: "d3q4", level: "de", source: "SGK tr.18 – Luyện tập 3",
          q: "Kết quả của $(-0{,}6)^9 : (-0{,}6)^4$ là",
          options: ["$(-0{,}6)^{13}$", "$1^5$", "$(0{,}6)^5$", "$(-0{,}6)^5$"],
          answer: 3,
          explain: "Giữ nguyên cơ số $-0{,}6$, trừ số mũ: $9 - 4 = 5$." },
        { id: "d3q5", level: "vua", source: "SGK tr.18 – Luyện tập 4",
          q: "Viết $\\left(\\frac{1}{8}\\right)^3$ dưới dạng luỹ thừa cơ số $\\frac{1}{2}$:",
          options: ["$\\left(\\frac{1}{2}\\right)^6$", "$\\left(\\frac{1}{2}\\right)^9$", "$\\left(\\frac{1}{2}\\right)^5$", "$\\left(\\frac{1}{2}\\right)^{24}$"],
          answer: 1,
          explain: "$\\frac{1}{8} = \\left(\\frac{1}{2}\\right)^3$ nên $\\left(\\frac{1}{8}\\right)^3 = \\left(\\frac{1}{2}\\right)^{3\\cdot 3} = \\left(\\frac{1}{2}\\right)^9$." },
        { id: "d3q6", level: "vua", source: "SGK tr.17 – Ví dụ 2",
          q: "Giá trị của $\\frac{(-6)^3}{3^3}$ là",
          options: ["$8$", "$-2$", "$-8$", "$-1$"],
          answer: 2,
          explain: "$\\frac{(-6)^3}{3^3} = \\left(\\frac{-6}{3}\\right)^3 = (-2)^3 = -8$." },
        { id: "d3q7", level: "vua", source: "SGK Bài 3 – BT 1.20",
          q: "Một dãy ô: ô thứ nhất là $2^0$, ô thứ hai là $2^1$; từ ô thứ ba trở đi, mỗi ô bằng tích hai ô liền trước. Ô thứ bảy là",
          options: ["$2^8$", "$2^6$", "$2^5$", "$2^{13}$"],
          answer: 0,
          explain: "Nhân luỹ thừa cùng cơ số thì cộng số mũ. Số mũ lần lượt: $0, 1, 1, 2, 3, 5, 8$. Ô thứ bảy là $2^8$." },
        { id: "d3q8", level: "vua", source: "SGK tr.17 – Luyện tập 2",
          q: "Giá trị của $(-0{,}25)^5\\cdot 4^5$ là",
          options: ["$1$", "$-1$", "$0$", "$-5$"],
          answer: 1,
          explain: "$\\left[(-0{,}25)\\cdot 4\\right]^5 = (-1)^5 = -1$ (số mũ lẻ)." },
        { id: "d3q9", level: "kho", source: "mới",
          q: "Giá trị của $\\frac{27^4\\cdot 9^3}{3^{17}}$ là",
          options: ["$1$", "$9$", "$\\frac{1}{3}$", "$3$"],
          answer: 3,
          explain: "$27^4 = (3^3)^4 = 3^{12}$; $9^3 = (3^2)^3 = 3^6$. Tử bằng $3^{18}$, nên $\\frac{3^{18}}{3^{17}} = 3$." },
        { id: "d3q10", level: "kho", source: "mới",
          q: "Số $x$ thỏa mãn $(2x - 1)^3 = -8$ là",
          options: ["$x = \\frac{3}{2}$", "$x = -\\frac{3}{2}$", "$x = -\\frac{1}{2}$", "$x = \\frac{1}{2}$"],
          answer: 2,
          explain: "$-8 = (-2)^3$ nên $2x - 1 = -2$, $2x = -1$, $x = -\\frac{1}{2}$." }
      ],
      essay: [
        { id: "d3e1", level: "vua", source: "SGK Bài 3 – BT 1.22", maxPoints: 1.5,
          q: "Viết các biểu thức sau dưới dạng luỹ thừa của một số hữu tỉ: a) $12^6\\cdot 5^3$; b) $8^4 : 9^6$.",
          modelAnswer: "a) $12^6 = (12^2)^3 = 144^3$, nên $12^6\\cdot 5^3 = 144^3\\cdot 5^3 = (144\\cdot 5)^3 = 720^3$.<br>" +
                       "b) $8^4 = (2^3)^4 = 2^{12} = (2^2)^6 = 4^6$, nên $8^4 : 9^6 = 4^6 : 9^6 = \\left(\\frac{4}{9}\\right)^6$.<br>" +
                       "(Cũng có thể viết $\\left(\\frac{4}{9}\\right)^6 = \\left(\\frac{2}{3}\\right)^{12}$; cả hai cách đều đúng.)",
          rubric: [
            { pts: 0.5, text: "a) Đưa về cùng số mũ: $12^6 = 144^3$." },
            { pts: 0.25, text: "a) Kết quả đúng $720^3$." },
            { pts: 0.5, text: "b) Đưa về cùng số mũ: $8^4 = 4^6$ (hoặc $8^4 = 2^{12}$, $9^6 = 3^{12}$)." },
            { pts: 0.25, text: "b) Kết quả đúng $\\left(\\frac{4}{9}\\right)^6$ hoặc $\\left(\\frac{2}{3}\\right)^{12}$." }
          ] },
        { id: "d3e2", level: "kho", source: "SBT Bài 3 – BT 1.25", maxPoints: 1.5,
          q: "Tìm số tự nhiên $n$, biết: a) $2^n\\cdot\\left(\\frac{1}{2}\\right)^2 = 16$; b) $5\\cdot 5^n = 625$.",
          modelAnswer: "a) $2^n\\cdot\\frac{1}{4} = 16 \\Rightarrow 2^n = 16\\cdot 4 = 64 = 2^6$. Vậy $n = 6$.<br>" +
                       "b) $5\\cdot 5^n = 5^{n+1}$ và $625 = 5^4$, nên $5^{n+1} = 5^4$, suy ra $n + 1 = 4$, $n = 3$.",
          rubric: [
            { pts: 0.5, text: "a) Đưa được về $2^n = 64 = 2^6$." },
            { pts: 0.25, text: "a) Kết luận $n = 6$." },
            { pts: 0.5, text: "b) Đưa được về $5^{n+1} = 5^4$." },
            { pts: 0.25, text: "b) Kết luận $n = 3$." }
          ] }
      ] },

    /* ======================= ĐỀ 4 – NÂNG CAO ======================= */
    { id: "d4", name: "Đề 4 – Nâng cao", advanced: true,
      mcq: [
        { id: "d4q1", level: "vua", source: "mới",
          q: "Giá trị của $(-1)^{2025} + (-1)^{2026}$ là",
          options: ["$-2$", "$0$", "$2$", "$1$"],
          answer: 1,
          explain: "$2025$ lẻ nên $(-1)^{2025} = -1$; $2026$ chẵn nên $(-1)^{2026} = 1$. Tổng bằng $0$." },
        { id: "d4q2", level: "vua", source: "mới",
          q: "Giá trị của $\\frac{4^5\\cdot 9^4}{6^9}$ là",
          options: ["$\\frac{3}{2}$", "$6$", "$\\frac{2}{3}$", "$1$"],
          answer: 2,
          explain: "$4^5 = 2^{10}$, $9^4 = 3^8$, $6^9 = 2^9\\cdot 3^9$. Vậy $\\frac{2^{10}\\cdot 3^8}{2^9\\cdot 3^9} = \\frac{2}{3}$." },
        { id: "d4q3", level: "vua", source: "mới",
          q: "Cho $a = \\left(-\\frac{1}{2}\\right)^3$, $b = \\left(-\\frac{1}{2}\\right)^4$, $c = \\left(-\\frac{1}{2}\\right)^0$, $d = -\\left(\\frac{1}{2}\\right)^2$. Sắp xếp theo thứ tự tăng dần:",
          options: ["$a < d < b < c$", "$d < a < c < b$", "$c < b < a < d$", "$d < a < b < c$"],
          answer: 3,
          explain: "$a = -\\frac{1}{8}$, $b = \\frac{1}{16}$, $c = 1$, $d = -\\frac{1}{4}$. Vì $-\\frac{1}{4} < -\\frac{1}{8} < \\frac{1}{16} < 1$ nên $d < a < b < c$." },
        { id: "d4q4", level: "kho", source: "SBT Bài 3 – BT 1.26",
          q: "Giá trị của $\\frac{4^6 + 8^2}{2^9 + 2^3}$ là",
          options: ["$8$", "$4$", "$64$", "$\\frac{1}{8}$"],
          answer: 0,
          explain: "Tử: $4^6 + 8^2 = 2^{12} + 2^6 = 2^6(2^6 + 1)$. Mẫu: $2^9 + 2^3 = 2^3(2^6 + 1)$. Thương bằng $\\frac{2^6}{2^3} = 2^3 = 8$." },
        { id: "d4q5", level: "kho", source: "mới",
          q: "Số $x$ thỏa mãn $\\left(x + \\frac{1}{3}\\right)^3 = -\\frac{8}{27}$ là",
          options: ["$x = -\\frac{1}{3}$", "$x = -1$", "$x = \\frac{1}{3}$", "$x = 1$"],
          answer: 1,
          explain: "$-\\frac{8}{27} = \\left(-\\frac{2}{3}\\right)^3$ nên $x + \\frac{1}{3} = -\\frac{2}{3}$, suy ra $x = -1$." },
        { id: "d4q6", level: "kho", source: "SBT Bài 3 – BT 1.25",
          q: "Số tự nhiên $n$ thỏa mãn $\\frac{1}{9}\\cdot 27^n = 3^n$ là",
          options: ["$n = 2$", "$n = 0$", "$n = 1$", "$n = 3$"],
          answer: 2,
          explain: "$\\frac{1}{9}\\cdot 27^n = \\frac{3^{3n}}{3^2} = 3^{3n-2}$. Từ $3^{3n-2} = 3^n$ suy ra $3n - 2 = n$, $n = 1$." },
        { id: "d4q7", level: "kho", source: "mới",
          q: "Khẳng định nào sau đây là <b>đúng</b>?",
          options: ["$3^{200} < 2^{300}$", "$3^{200} = 2^{300}$", "$9^{100} < 8^{100}$", "$3^{200} > 2^{300}$"],
          answer: 3,
          explain: "$3^{200} = (3^2)^{100} = 9^{100}$ và $2^{300} = (2^3)^{100} = 8^{100}$. Vì $9 > 8$ nên $3^{200} > 2^{300}$." },
        { id: "d4q8", level: "kho", source: "mới",
          q: "Giá trị của tổng $S = 1 + 2 + 2^2 + 2^3 + \\ldots + 2^{10}$ là",
          options: ["$2047$", "$2048$", "$1023$", "$4095$"],
          answer: 0,
          explain: "$2S = 2 + 2^2 + \\ldots + 2^{11}$. Lấy $2S - S$, các số hạng giống nhau triệt tiêu: $S = 2^{11} - 1 = 2047$." },
        { id: "d4q9", level: "kho", source: "mới",
          q: "Một loại vi khuẩn cứ sau $20$ phút lại phân đôi (mỗi con thành $2$ con). Từ $1$ con ban đầu, sau $3$ giờ có bao nhiêu con vi khuẩn?",
          options: ["$256$", "$18$", "$512$", "$1024$"],
          answer: 2,
          explain: "$3$ giờ $= 180$ phút, có $180 : 20 = 9$ lần phân đôi. Số vi khuẩn: $2^9 = 512$." }
      ],
      essay: [
        { id: "d4e1", level: "kho", source: "SBT Bài 3 – Ví dụ 3", maxPoints: 1.5,
          q: "Tìm số tự nhiên $n$, biết: a) $\\dfrac{2^5\\cdot 4^n}{8^2} = 512$; b) $3^n + 3^{n+2} = 810$.",
          modelAnswer: "a) $4^n = 2^{2n}$, $8^2 = 2^6$, $512 = 2^9$.<br>" +
                       "$\\frac{2^5\\cdot 2^{2n}}{2^6} = 2^{5 + 2n - 6} = 2^{2n-1}$. Từ $2^{2n-1} = 2^9$ suy ra $2n - 1 = 9$, $n = 5$.<br>" +
                       "b) $3^{n+2} = 3^n\\cdot 9$, nên $3^n + 3^{n+2} = 3^n\\cdot(1 + 9) = 10\\cdot 3^n$.<br>" +
                       "Từ $10\\cdot 3^n = 810$ suy ra $3^n = 81 = 3^4$, vậy $n = 4$.",
          rubric: [
            { pts: 0.5, text: "a) Đưa về cùng cơ số $2$: $2^{2n-1} = 2^9$." },
            { pts: 0.25, text: "a) Kết luận $n = 5$." },
            { pts: 0.5, text: "b) Đặt nhân tử chung: $3^n\\cdot 10 = 810$, suy ra $3^n = 81$." },
            { pts: 0.25, text: "b) Kết luận $n = 4$." }
          ] },
        { id: "d4e2", level: "kho", source: "mới", maxPoints: 1.5,
          q: "Tính giá trị của biểu thức $B = \\dfrac{2^{10}\\cdot 13 + 2^{10}\\cdot 65}{2^8\\cdot 104}$.",
          modelAnswer: "Tử số: $2^{10}\\cdot 13 + 2^{10}\\cdot 65 = 2^{10}\\cdot(13 + 65) = 2^{10}\\cdot 78$.<br>" +
                       "$B = \\frac{2^{10}\\cdot 78}{2^8\\cdot 104} = 2^{10-8}\\cdot\\frac{78}{104} = 4\\cdot\\frac{3}{4} = 3$.",
          rubric: [
            { pts: 0.5, text: "Đặt thừa số chung ở tử: $2^{10}\\cdot 78$." },
            { pts: 0.5, text: "Rút gọn $\\frac{2^{10}}{2^8} = 2^2 = 4$ và $\\frac{78}{104} = \\frac{3}{4}$." },
            { pts: 0.5, text: "Kết quả đúng $B = 3$." }
          ] }
      ] }
  ]
});
