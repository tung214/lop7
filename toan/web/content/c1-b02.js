registerLesson({
  id: "c1-b02",
  chapter: 1,
  kind: "lesson",
  title: "Bài 2. Cộng, trừ, nhân, chia số hữu tỉ",
  sgkPages: [10, 13],
  sbtPages: [9, 12],
  objectives: [
    "Thực hiện các phép cộng, trừ, nhân, chia trong tập hợp $\\mathbb{Q}$",
    "Vận dụng tính chất các phép toán và quy tắc dấu ngoặc để tính nhẩm, tính nhanh, tính hợp lí",
    "Giải một số bài toán thực tế có sử dụng số hữu tỉ"
  ],

  theory: [
    {
      heading: "1. Cộng và trừ hai số hữu tỉ",
      html: "Mỗi số hữu tỉ đều viết được dưới dạng phân số <b>có mẫu dương</b>. Muốn cộng, trừ hai số hữu tỉ, ta viết chúng dưới dạng phân số rồi áp dụng quy tắc cộng, trừ phân số:" +
        "$$\\frac{a}{m} + \\frac{b}{m} = \\frac{a+b}{m}; \\qquad \\frac{a}{m} - \\frac{b}{m} = \\frac{a-b}{m} \\quad (m > 0).$$" +
        "<ul><li>Khác mẫu thì <b>quy đồng mẫu</b> trước. Ví dụ: $\\frac{-7}{8} + \\frac{5}{12} = \\frac{-21}{24} + \\frac{10}{24} = \\frac{-11}{24}$.</li>" +
        "<li>Trừ một số là cộng với số đối của nó: $x - y = x + (-y)$.</li>" +
        "<li>Nếu hai số đều ở dạng số thập phân thì cộng, trừ như số thập phân: $(-9{,}15) + 8{,}09 = -(9{,}15 - 8{,}09) = -1{,}06$.</li>" +
        "<li>Phép cộng trong $\\mathbb{Q}$ có tính chất <b>giao hoán</b>, <b>kết hợp</b>, cộng với $0$, và hai số đối nhau có tổng bằng 0: $a + (-a) = 0$.</li></ul>"
    },
    {
      heading: "2. Quy tắc dấu ngoặc",
      html: "Trong $\\mathbb{Q}$, quy tắc dấu ngoặc giống như trong $\\mathbb{Z}$:" +
        "<ul><li>Bỏ ngoặc có dấu \"+\" đứng trước: giữ nguyên dấu các số hạng trong ngoặc: $a + (b - c) = a + b - c$.</li>" +
        "<li>Bỏ ngoặc có dấu \"−\" đứng trước: <b>đổi dấu tất cả</b> các số hạng trong ngoặc: $a - (b - c) = a - b + c$.</li>" +
        "<li>Đặt ngoặc có dấu \"−\" đứng trước thì cũng phải đổi dấu các số hạng đưa vào ngoặc: $a - b - c = a - (b + c)$.</li>" +
        "<li>Trong một tổng, ta có thể đổi chỗ các số hạng và nhóm chúng tùy ý để tính thuận tiện.</li></ul>" +
        "Ví dụ: $\\frac{8}{9} - \\left[\\frac{7}{4} - \\left(\\frac{3}{4} - \\frac{2}{3}\\right)\\right] = \\frac{8}{9} - \\frac{7}{4} + \\frac{3}{4} - \\frac{2}{3} = \\left(\\frac{8}{9} - \\frac{6}{9}\\right) - \\left(\\frac{7}{4} - \\frac{3}{4}\\right) = \\frac{2}{9} - 1 = -\\frac{7}{9}$."
    },
    {
      heading: "3. Nhân và chia hai số hữu tỉ",
      html: "Viết các số dưới dạng phân số rồi áp dụng quy tắc nhân, chia phân số:" +
        "$$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}; \\qquad \\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} \\quad (c \\ne 0).$$" +
        "<ul><li>Chia cho một số khác 0 là nhân với <b>số nghịch đảo</b> của số đó (số nghịch đảo của $\\frac{c}{d}$ là $\\frac{d}{c}$).</li>" +
        "<li>Quy tắc dấu: tích (thương) hai số cùng dấu là số dương, hai số khác dấu là số âm.</li>" +
        "<li>Với số thập phân có thể nhân, chia trực tiếp: $1{,}25 \\cdot (-4{,}6) = -5{,}75$; $\\ 7{,}8 : (-0{,}13) = -60$.</li>" +
        "<li>Phép nhân trong $\\mathbb{Q}$ có tính chất giao hoán, kết hợp, nhân với $1$, và <b>phân phối</b> đối với phép cộng, phép trừ:" +
        "$$a \\cdot b + a \\cdot c = a(b + c); \\qquad a \\cdot b - a \\cdot c = a(b - c).$$</li></ul>" +
        "Ví dụ: $\\frac{6}{7} \\cdot 0{,}25 = \\frac{6}{7} \\cdot \\frac{1}{4} = \\frac{3}{14}$; $\\quad -2{,}4 : \\frac{6}{5} = \\frac{-12}{5} \\cdot \\frac{5}{6} = -2$."
    },
    {
      heading: "4. Thứ tự thực hiện phép tính",
      html: "<ul><li>Biểu thức không có ngoặc: nhân, chia trước; cộng, trừ sau (từ trái sang phải).</li>" +
        "<li>Biểu thức có ngoặc: làm trong ngoặc tròn $( )$ trước, rồi ngoặc vuông $[ ]$, rồi ngoặc nhọn $\\{ \\}$.</li>" +
        "<li>Hỗn số âm: $-2\\frac{1}{3} = -\\left(2 + \\frac{1}{3}\\right) = -\\frac{7}{3}$ (không phải $-2 + \\frac{1}{3}$).</li></ul>"
    }
  ],

  skills: [
    "<b>Đổi về cùng một dạng:</b> nếu các số đều là số thập phân thì tính trực tiếp; nếu có phân số, hỗn số thì đổi tất cả về phân số (mẫu dương).",
    "<b>Nhóm các số hạng hợp lí</b> (giao hoán, kết hợp): gom các số đối nhau để được 0, gom các phân số cùng mẫu, gom các số thập phân có tổng tròn. Ví dụ: $\\frac{-2}{3} + 2{,}5 + \\frac{1}{3} + 1\\frac{1}{2} = \\left(\\frac{-2}{3} + \\frac{1}{3}\\right) + \\left(\\frac{5}{2} + \\frac{3}{2}\\right) = \\frac{11}{3}$.",
    "<b>Đặt thừa số chung</b> (tính chất phân phối): $a \\cdot b + a \\cdot c = a(b + c)$. Ví dụ: $21{,}92 \\cdot 17{,}5 + 21{,}92 = 21{,}92 \\cdot (17{,}5 + 1)$. Phép chia cho cùng một số cũng làm được như vậy: $x : c + y : c = (x + y) : c$.",
    "<b>Dùng quy tắc dấu ngoặc</b> để bỏ ngoặc rồi nhóm lại các số hạng cho thuận tiện.",
    "<b>Bài toán thực tế:</b> đọc kĩ đề, xác định phép tính (tổng, hiệu, \"gấp ... lần\" là phép nhân, \"chia đều\" là phép chia), ghi đơn vị; với bài \"nhiều nhất bao nhiêu cái\" thì lấy phần nguyên của thương.",
    "<b>Lỗi hay gặp:</b> cộng tử với tử, mẫu với mẫu ($\\frac{1}{2} + \\frac{1}{3} \\ne \\frac{2}{5}$); bỏ ngoặc có dấu \"−\" đứng trước mà quên đổi dấu; khi chia lại lấy nghịch đảo số bị chia; hiểu $2\\frac{1}{3}$ là $2 \\cdot \\frac{1}{3}$; quên quy tắc dấu khi nhân, chia hai số âm."
  ],

  examples: [
    {
      q: "Tính: $\\frac{3}{-5} + 1{,}25 + \\frac{2}{5} + 1\\frac{3}{4}$.",
      solution: "$\\frac{3}{-5} + 1{,}25 + \\frac{2}{5} + 1\\frac{3}{4} = \\frac{-3}{5} + \\frac{5}{4} + \\frac{2}{5} + \\frac{7}{4}$ &nbsp;(viết dưới dạng phân số mẫu dương)<br>" +
        "$= \\left(\\frac{-3}{5} + \\frac{2}{5}\\right) + \\left(\\frac{5}{4} + \\frac{7}{4}\\right)$ &nbsp;(giao hoán, kết hợp)<br>" +
        "$= \\frac{-1}{5} + 3 = \\frac{14}{5}$."
    },
    {
      q: "Bỏ dấu ngoặc rồi tính: $\\frac{5}{6} - \\left[\\frac{3}{4} - \\left(\\frac{1}{2} - \\frac{1}{6}\\right)\\right]$.",
      solution: "Bỏ ngoặc vuông (dấu \"−\" đứng trước, đổi dấu): $\\frac{5}{6} - \\frac{3}{4} + \\left(\\frac{1}{2} - \\frac{1}{6}\\right)$.<br>" +
        "Bỏ ngoặc tròn (dấu \"+\" đứng trước): $\\frac{5}{6} - \\frac{3}{4} + \\frac{1}{2} - \\frac{1}{6}$.<br>" +
        "Nhóm: $\\left(\\frac{5}{6} - \\frac{1}{6}\\right) + \\left(\\frac{1}{2} - \\frac{3}{4}\\right) = \\frac{2}{3} + \\frac{-1}{4} = \\frac{8}{12} - \\frac{3}{12} = \\frac{5}{12}$."
    },
    {
      q: "Tính một cách hợp lí: $\\frac{5}{8} \\cdot 2\\frac{3}{5} + \\frac{5}{8} \\cdot (-0{,}6)$.",
      solution: "Đặt thừa số chung $\\frac{5}{8}$: $\\frac{5}{8} \\cdot \\left[2\\frac{3}{5} + (-0{,}6)\\right] = \\frac{5}{8} \\cdot (2{,}6 - 0{,}6) = \\frac{5}{8} \\cdot 2 = \\frac{5}{4}$."
    },
    {
      q: "Một khinh khí cầu bay thẳng lên từ mặt đất với vận tốc $1{,}2$ m/s trong 40 giây, sau đó hạ độ cao với vận tốc $\\frac{3}{7}$ m/s trong 35 giây. Lúc đó khinh khí cầu cách mặt đất bao nhiêu mét?",
      solution: "Độ cao sau 40 giây bay lên: $1{,}2 \\cdot 40 = 48$ (m).<br>" +
        "Độ cao giảm trong 35 giây: $\\frac{3}{7} \\cdot 35 = 15$ (m).<br>" +
        "Khinh khí cầu cách mặt đất: $48 - 15 = 33$ (m)."
    }
  ],

  sets: [
    // ======================= ĐỀ 1 =======================
    {
      id: "d1", name: "Đề 1",
      mcq: [
        {
          id: "d1q1", level: "de", source: "SGK Bài 2 – BT 1.7a",
          q: "Kết quả của phép tính $\\frac{-3}{4} + \\frac{5}{6}$ là",
          options: ["$\\frac{1}{12}$", "$\\frac{2}{10}$", "$-\\frac{19}{12}$", "$-\\frac{1}{12}$"],
          answer: 0,
          explain: "Quy đồng mẫu 12: $\\frac{-9}{12} + \\frac{10}{12} = \\frac{1}{12}$. ($\\frac{2}{10}$ là lỗi cộng tử với tử, mẫu với mẫu.)"
        },
        {
          id: "d1q2", level: "de", source: "SGK tr.10 – HĐ2",
          q: "Kết quả của phép tính $-1{,}5 - \\frac{3}{4}$ là",
          options: ["$-\\frac{3}{4}$", "$\\frac{9}{4}$", "$-\\frac{9}{4}$", "$\\frac{3}{4}$"],
          answer: 2,
          explain: "$-1{,}5 - \\frac{3}{4} = \\frac{-6}{4} - \\frac{3}{4} = \\frac{-9}{4}$."
        },
        {
          id: "d1q3", level: "de", source: "SGK Bài 2 – BT 1.7c",
          q: "Kết quả của phép tính $\\frac{-4}{9} \\cdot \\frac{15}{8}$ là",
          options: ["$\\frac{5}{6}$", "$-\\frac{32}{135}$", "$\\frac{11}{17}$", "$-\\frac{5}{6}$"],
          answer: 3,
          explain: "$\\frac{-4}{9} \\cdot \\frac{15}{8} = \\frac{-4 \\cdot 15}{9 \\cdot 8} = \\frac{-60}{72} = -\\frac{5}{6}$ (hai số khác dấu nên tích âm)."
        },
        {
          id: "d1q4", level: "de", source: "SGK tr.12 – Ví dụ 3",
          q: "Kết quả của phép tính $-2{,}4 : \\frac{3}{5}$ là",
          options: ["$-\\frac{36}{25}$", "$-4$", "$4$", "$-\\frac{1}{4}$"],
          answer: 1,
          explain: "$-2{,}4 : \\frac{3}{5} = \\frac{-12}{5} \\cdot \\frac{5}{3} = -4$. ($-\\frac{36}{25}$ là kết quả của phép nhân, không phải phép chia.)"
        },
        {
          id: "d1q5", level: "vua", source: "SGK tr.11 – Luyện tập 2",
          q: "Giá trị của biểu thức $\\frac{5}{6} - \\left(\\frac{2}{3} - \\frac{1}{4}\\right)$ là",
          options: ["$-\\frac{1}{12}$", "$\\frac{5}{4}$", "$\\frac{5}{12}$", "$-\\frac{5}{12}$"],
          answer: 2,
          explain: "$\\frac{5}{6} - \\frac{2}{3} + \\frac{1}{4} = \\frac{10}{12} - \\frac{8}{12} + \\frac{3}{12} = \\frac{5}{12}$. ($-\\frac{1}{12}$ là lỗi bỏ ngoặc quên đổi dấu $\\frac{1}{4}$.)"
        },
        {
          id: "d1q6", level: "vua", source: "SGK tr.12 – Luyện tập 4",
          q: "Tính hợp lí: $\\frac{4}{7} \\cdot 2\\frac{1}{3} - \\frac{4}{7} \\cdot \\frac{1}{3}$.",
          options: ["$\\frac{32}{21}$", "$\\frac{4}{21}$", "$-\\frac{8}{7}$", "$\\frac{8}{7}$"],
          answer: 3,
          explain: "$\\frac{4}{7} \\cdot \\left(2\\frac{1}{3} - \\frac{1}{3}\\right) = \\frac{4}{7} \\cdot 2 = \\frac{8}{7}$. ($\\frac{4}{21}$ là lỗi hiểu $2\\frac{1}{3}$ thành $2 \\cdot \\frac{1}{3}$.)"
        },
        {
          id: "d1q7", level: "vua", source: "SGK tr.12 – Vận dụng 1",
          q: "Giả sử trong 100 g lạc (đậu phộng) có $7{,}5$ g nước; $27{,}5$ g protein; $44{,}5$ g lipid; $15{,}5$ g glucid và còn lại là các chất khác. Khối lượng các chất khác trong 100 g lạc là",
          options: ["$4{,}5$ g", "$5$ g", "$6$ g", "$95$ g"],
          answer: 1,
          explain: "$100 - 7{,}5 - 27{,}5 - 44{,}5 - 15{,}5 = 100 - 95 = 5$ (g)."
        },
        {
          id: "d1q8", level: "vua", source: "mới",
          q: "Tìm $x$, biết $x + \\frac{2}{5} = -\\frac{1}{3}$.",
          options: ["$\\frac{1}{15}$", "$\\frac{11}{15}$", "$-\\frac{11}{15}$", "$-\\frac{1}{15}$"],
          answer: 2,
          explain: "$x = -\\frac{1}{3} - \\frac{2}{5} = \\frac{-5}{15} - \\frac{6}{15} = -\\frac{11}{15}$. ($\\frac{1}{15}$ là lỗi cộng $\\frac{2}{5}$ thay vì trừ.)"
        },
        {
          id: "d1q9", level: "kho", source: "SGK tr.10 – Bài toán mở đầu",
          q: "Một thang máy đi lên với vận tốc $1{,}5$ m/s trong 12 giây, sau đó đi xuống với vận tốc $\\frac{4}{3}$ m/s trong 9 giây. Khi đó thang máy cao hơn vị trí xuất phát bao nhiêu mét?",
          options: ["$6$ m", "$30$ m", "$18$ m", "$12$ m"],
          answer: 0,
          explain: "Đi lên: $1{,}5 \\cdot 12 = 18$ (m). Đi xuống: $\\frac{4}{3} \\cdot 9 = 12$ (m). Cao hơn vị trí xuất phát: $18 - 12 = 6$ (m)."
        },
        {
          id: "d1q10", level: "kho", source: "SGK Bài 2 – BT 1.11",
          q: "Một ngăn tủ dài 90 cm. Người ta xếp đứng các cuốn sách dày $2{,}8$ cm vào ngăn đó. Ngăn tủ để được nhiều nhất bao nhiêu cuốn sách như vậy?",
          options: ["31 cuốn", "33 cuốn", "30 cuốn", "32 cuốn"],
          answer: 3,
          explain: "$90 : 2{,}8 = \\frac{225}{7} \\approx 32{,}14$. Số cuốn sách phải là số tự nhiên và không vượt quá $32{,}14$ nên nhiều nhất 32 cuốn (33 cuốn cần $92{,}4$ cm, quá dài)."
        }
      ],
      essay: [
        {
          id: "d1e1", level: "vua", source: "SGK Bài 2 – BT 1.8", maxPoints: 3,
          q: "Tính giá trị của các biểu thức sau (tính hợp lí nếu có thể):<br>" +
            "a) $A = \\left(5 + 1\\frac{1}{3} - \\frac{2}{5}\\right) - (2 + 0{,}6) - \\left(4\\frac{1}{3} - 1\\right)$;<br>" +
            "b) $B = \\left(4 - \\frac{1}{2} - \\frac{5}{6}\\right) : \\left(3 - \\frac{1}{3} - \\frac{1}{2}\\right)$.",
          modelAnswer: "a) Đổi $1\\frac{1}{3} = \\frac{4}{3}$; $0{,}6 = \\frac{3}{5}$; $4\\frac{1}{3} = \\frac{13}{3}$. Bỏ ngoặc:<br>" +
            "$A = 5 + \\frac{4}{3} - \\frac{2}{5} - 2 - \\frac{3}{5} - \\frac{13}{3} + 1$<br>" +
            "$= (5 - 2 + 1) + \\left(\\frac{4}{3} - \\frac{13}{3}\\right) - \\left(\\frac{2}{5} + \\frac{3}{5}\\right) = 4 + (-3) - 1 = 0$.<br>" +
            "b) $4 - \\frac{1}{2} - \\frac{5}{6} = \\frac{24}{6} - \\frac{3}{6} - \\frac{5}{6} = \\frac{16}{6} = \\frac{8}{3}$.<br>" +
            "$3 - \\frac{1}{3} - \\frac{1}{2} = \\frac{18}{6} - \\frac{2}{6} - \\frac{3}{6} = \\frac{13}{6}$.<br>" +
            "$B = \\frac{8}{3} : \\frac{13}{6} = \\frac{8}{3} \\cdot \\frac{6}{13} = \\frac{16}{13}$.",
          rubric: [
            { pts: 0.5, text: "Câu a: đổi hỗn số, số thập phân về phân số và bỏ ngoặc đúng dấu." },
            { pts: 0.5, text: "Câu a: nhóm hợp lí các số hạng." },
            { pts: 0.5, text: "Câu a: kết quả $A = 0$." },
            { pts: 0.5, text: "Câu b: tính đúng ngoặc thứ nhất bằng $\\frac{8}{3}$." },
            { pts: 0.5, text: "Câu b: tính đúng ngoặc thứ hai bằng $\\frac{13}{6}$." },
            { pts: 0.5, text: "Câu b: chia đúng (nhân với nghịch đảo), kết quả $B = \\frac{16}{13}$." }
          ]
        }
      ]
    },

    // ======================= ĐỀ 2 =======================
    {
      id: "d2", name: "Đề 2",
      mcq: [
        {
          id: "d2q1", level: "de", source: "SGK tr.10 – HĐ1",
          q: "Kết quả của phép tính $\\frac{-5}{12} + \\frac{3}{8}$ là",
          options: ["$-\\frac{1}{24}$", "$\\frac{1}{24}$", "$-\\frac{2}{20}$", "$-\\frac{19}{24}$"],
          answer: 0,
          explain: "Quy đồng mẫu 24: $\\frac{-10}{24} + \\frac{9}{24} = \\frac{-1}{24}$."
        },
        {
          id: "d2q2", level: "de", source: "SGK tr.11 – Luyện tập 1",
          q: "Kết quả của phép tính $(-7) - \\left(-\\frac{3}{5}\\right)$ là",
          options: ["$-\\frac{38}{5}$", "$\\frac{32}{5}$", "$-\\frac{32}{5}$", "$-\\frac{4}{5}$"],
          answer: 2,
          explain: "$(-7) - \\left(-\\frac{3}{5}\\right) = -7 + \\frac{3}{5} = \\frac{-35}{5} + \\frac{3}{5} = -\\frac{32}{5}$. ($-\\frac{38}{5}$ là lỗi quên đổi dấu.)"
        },
        {
          id: "d2q3", level: "de", source: "SGK tr.12 – HĐ3",
          q: "Kết quả của phép tính $-0{,}35 \\cdot \\left(-\\frac{8}{7}\\right)$ là",
          options: ["$-\\frac{2}{5}$", "$\\frac{2}{5}$", "$\\frac{49}{160}$", "$-\\frac{49}{160}$"],
          answer: 1,
          explain: "$-0{,}35 = \\frac{-7}{20}$. $\\frac{-7}{20} \\cdot \\frac{-8}{7} = \\frac{56}{140} = \\frac{2}{5}$ (hai số cùng dấu âm nên tích dương)."
        },
        {
          id: "d2q4", level: "de", source: "SGK Bài 2 – BT 1.7d",
          q: "Kết quả của phép tính $\\frac{-9}{10} : 1\\frac{1}{5}$ là",
          options: ["$-\\frac{27}{25}$", "$\\frac{3}{4}$", "$-\\frac{9}{50}$", "$-\\frac{3}{4}$"],
          answer: 3,
          explain: "$1\\frac{1}{5} = \\frac{6}{5}$. $\\frac{-9}{10} : \\frac{6}{5} = \\frac{-9}{10} \\cdot \\frac{5}{6} = \\frac{-45}{60} = -\\frac{3}{4}$."
        },
        {
          id: "d2q5", level: "vua", source: "SGK tr.11 – Ví dụ 2",
          q: "Giá trị của biểu thức $\\frac{7}{8} - \\left[\\frac{1}{2} - \\left(\\frac{3}{4} - \\frac{1}{8}\\right)\\right]$ là",
          options: ["$-\\frac{1}{2}$", "$1$", "$-\\frac{1}{4}$", "$\\frac{5}{4}$"],
          answer: 1,
          explain: "Bỏ ngoặc: $\\frac{7}{8} - \\frac{1}{2} + \\frac{3}{4} - \\frac{1}{8} = \\left(\\frac{7}{8} - \\frac{1}{8}\\right) + \\left(\\frac{3}{4} - \\frac{1}{2}\\right) = \\frac{3}{4} + \\frac{1}{4} = 1$."
        },
        {
          id: "d2q6", level: "vua", source: "SGK tr.12 – Luyện tập 4",
          q: "Tính hợp lí: $0{,}75 \\cdot 4\\frac{2}{3} + 0{,}75 \\cdot \\left(-1\\frac{2}{3}\\right)$.",
          options: ["$\\frac{19}{4}$", "$-\\frac{9}{4}$", "$\\frac{9}{4}$", "$3$"],
          answer: 2,
          explain: "$0{,}75 \\cdot \\left(4\\frac{2}{3} - 1\\frac{2}{3}\\right) = 0{,}75 \\cdot 3 = 2{,}25 = \\frac{9}{4}$."
        },
        {
          id: "d2q7", level: "vua", source: "SBT Bài 2 – BT 1.10",
          q: "Trong một \"tháp số\", mỗi ô ở hàng trên bằng tổng hai số ở hai ô kề nó ở hàng dưới. Một ô ở hàng trên là $\\frac{1}{6}$, một trong hai ô ngay dưới nó là $-\\frac{1}{4}$. Số ở ô còn lại là",
          options: ["$\\frac{5}{12}$", "$-\\frac{1}{12}$", "$-\\frac{5}{12}$", "$\\frac{1}{12}$"],
          answer: 0,
          explain: "Ô cần tìm $= \\frac{1}{6} - \\left(-\\frac{1}{4}\\right) = \\frac{2}{12} + \\frac{3}{12} = \\frac{5}{12}$. Thử lại: $\\frac{5}{12} + \\left(-\\frac{3}{12}\\right) = \\frac{2}{12} = \\frac{1}{6}$."
        },
        {
          id: "d2q8", level: "vua", source: "mới",
          q: "Tìm $x$, biết $\\frac{3}{4} \\cdot x = -\\frac{9}{10}$.",
          options: ["$-\\frac{27}{40}$", "$\\frac{6}{5}$", "$-\\frac{5}{6}$", "$-\\frac{6}{5}$"],
          answer: 3,
          explain: "$x = -\\frac{9}{10} : \\frac{3}{4} = -\\frac{9}{10} \\cdot \\frac{4}{3} = -\\frac{36}{30} = -\\frac{6}{5}$. ($-\\frac{27}{40}$ là lỗi nhân thay vì chia.)"
        },
        {
          id: "d2q9", level: "kho", source: "SBT Bài 2 – BT 1.15",
          q: "Loài chim A dài $6{,}4$ cm. Loài chim B dài gấp $2\\frac{3}{8}$ lần loài chim A. Chim B dài bao nhiêu xăng-ti-mét?",
          options: ["$4{,}8$ cm", "$15{,}2$ cm", "$12{,}8$ cm", "$13{,}175$ cm"],
          answer: 1,
          explain: "$6{,}4 \\cdot 2\\frac{3}{8} = \\frac{32}{5} \\cdot \\frac{19}{8} = \\frac{76}{5} = 15{,}2$ (cm). ($4{,}8$ là lỗi hiểu $2\\frac{3}{8}$ thành $2 \\cdot \\frac{3}{8}$; $13{,}175 = 6{,}4 \\cdot 2 + \\frac{3}{8}$ là lỗi tách hỗn số sai.)"
        },
        {
          id: "d2q10", level: "kho", source: "SGK tr.13 – Vận dụng 2",
          q: "Trên một tờ giấy ảnh kích thước $20{,}5$ cm × $25{,}4$ cm, người ta in hai tấm ảnh, mỗi tấm kích thước 9 cm × 12 cm. Nếu cắt ảnh theo đúng kích thước thì diện tích phần giấy còn lại là",
          options: ["$412{,}7\\ \\mathrm{cm}^2$", "$520{,}7\\ \\mathrm{cm}^2$", "$304{,}7\\ \\mathrm{cm}^2$", "$478{,}7\\ \\mathrm{cm}^2$"],
          answer: 2,
          explain: "Diện tích giấy: $20{,}5 \\cdot 25{,}4 = 520{,}7$ (cm²). Hai tấm ảnh: $2 \\cdot 9 \\cdot 12 = 216$ (cm²). Còn lại: $520{,}7 - 216 = 304{,}7$ (cm²)."
        }
      ],
      essay: [
        {
          id: "d2e1", level: "vua", source: "SGK tr.10 – Ví dụ 1 (biến đổi)", maxPoints: 1.5,
          q: "Tính một cách hợp lí: $A = \\frac{-3}{7} + \\frac{5}{13} + \\frac{-4}{7} + \\frac{8}{13} - 0{,}5$.",
          modelAnswer: "Nhóm các phân số cùng mẫu:<br>" +
            "$A = \\left(\\frac{-3}{7} + \\frac{-4}{7}\\right) + \\left(\\frac{5}{13} + \\frac{8}{13}\\right) - 0{,}5$<br>" +
            "$= \\frac{-7}{7} + \\frac{13}{13} - 0{,}5 = (-1) + 1 - 0{,}5 = -0{,}5$.",
          rubric: [
            { pts: 0.5, text: "Nhóm đúng các phân số cùng mẫu (giao hoán, kết hợp)." },
            { pts: 0.5, text: "Tính đúng từng nhóm: $-1$ và $1$." },
            { pts: 0.5, text: "Kết quả $A = -0{,}5$ (hoặc $-\\frac{1}{2}$)." }
          ]
        },
        {
          id: "d2e2", level: "kho", source: "SBT Bài 2 – Ví dụ 2 (biến đổi)", maxPoints: 1.5,
          q: "Một bình chứa $2\\frac{1}{4}$ lít nước. Bạn An rót ra 3 cốc, mỗi cốc $0{,}35$ lít, sau đó đổ thêm vào bình $\\frac{3}{5}$ lít nước. Hỏi lúc này trong bình có bao nhiêu lít nước?",
          modelAnswer: "Lượng nước đã rót ra: $3 \\cdot 0{,}35 = 1{,}05$ (lít).<br>" +
            "Đổi $2\\frac{1}{4} = 2{,}25$; $\\ \\frac{3}{5} = 0{,}6$.<br>" +
            "Lượng nước trong bình lúc này: $2{,}25 - 1{,}05 + 0{,}6 = 1{,}8$ (lít).<br>" +
            "Vậy trong bình có $1{,}8$ lít nước.",
          rubric: [
            { pts: 0.5, text: "Tính đúng lượng nước rót ra $1{,}05$ lít." },
            { pts: 0.5, text: "Lập đúng phép tính $2\\frac{1}{4} - 1{,}05 + \\frac{3}{5}$ (đổi đơn vị/dạng số hợp lí)." },
            { pts: 0.5, text: "Kết quả đúng $1{,}8$ lít, có câu trả lời." }
          ]
        }
      ]
    },

    // ======================= ĐỀ 3 =======================
    {
      id: "d3", name: "Đề 3",
      mcq: [
        {
          id: "d3q1", level: "de", source: "SGK tr.10 – HĐ1",
          q: "Kết quả của phép tính $\\frac{7}{-10} + \\frac{2}{15}$ là",
          options: ["$\\frac{5}{6}$", "$-\\frac{17}{30}$", "$-\\frac{5}{6}$", "$\\frac{17}{30}$"],
          answer: 1,
          explain: "$\\frac{7}{-10} = \\frac{-7}{10}$. Quy đồng mẫu 30: $\\frac{-21}{30} + \\frac{4}{30} = \\frac{-17}{30}$."
        },
        {
          id: "d3q2", level: "de", source: "SGK tr.11 – Luyện tập 1b",
          q: "Kết quả của phép tính $-3{,}25 + 1{,}8$ là",
          options: ["$-5{,}05$", "$1{,}45$", "$-1{,}55$", "$-1{,}45$"],
          answer: 3,
          explain: "Hai số trái dấu: $-3{,}25 + 1{,}8 = -(3{,}25 - 1{,}8) = -1{,}45$."
        },
        {
          id: "d3q3", level: "de", source: "SGK tr.12 – Luyện tập 3a",
          q: "Kết quả của phép tính $\\left(-\\frac{6}{11}\\right) \\cdot \\left(-\\frac{22}{9}\\right)$ là",
          options: ["$\\frac{4}{3}$", "$-\\frac{4}{3}$", "$\\frac{27}{121}$", "$\\frac{3}{4}$"],
          answer: 0,
          explain: "Hai số cùng dấu nên tích dương: $\\frac{6}{11} \\cdot \\frac{22}{9} = \\frac{6 \\cdot 22}{11 \\cdot 9} = \\frac{132}{99} = \\frac{4}{3}$."
        },
        {
          id: "d3q4", level: "de", source: "SGK tr.12 – Luyện tập 3b",
          q: "Kết quả của phép tính $1{,}2 : \\left(-\\frac{4}{5}\\right)$ là",
          options: ["$-\\frac{24}{25}$", "$\\frac{3}{2}$", "$-\\frac{3}{2}$", "$-\\frac{2}{3}$"],
          answer: 2,
          explain: "$1{,}2 : \\left(-\\frac{4}{5}\\right) = \\frac{6}{5} \\cdot \\left(-\\frac{5}{4}\\right) = -\\frac{6}{4} = -\\frac{3}{2}$."
        },
        {
          id: "d3q5", level: "vua", source: "SGK tr.11 – Luyện tập 2a",
          q: "Giá trị của biểu thức $\\frac{3}{5} - \\left(\\frac{7}{10} - \\frac{5}{4}\\right)$ là",
          options: ["$-\\frac{27}{20}$", "$\\frac{23}{20}$", "$\\frac{1}{20}$", "$-\\frac{23}{20}$"],
          answer: 1,
          explain: "Bỏ ngoặc (đổi dấu): $\\frac{3}{5} - \\frac{7}{10} + \\frac{5}{4} = \\frac{12}{20} - \\frac{14}{20} + \\frac{25}{20} = \\frac{23}{20}$."
        },
        {
          id: "d3q6", level: "vua", source: "SGK Bài 2 – BT 1.10",
          q: "Tính hợp lí: $\\frac{5}{9} \\cdot \\frac{-3}{7} + \\frac{5}{9} \\cdot \\frac{-4}{7}$.",
          options: ["$\\frac{5}{9}$", "$\\frac{5}{63}$", "$-\\frac{10}{9}$", "$-\\frac{5}{9}$"],
          answer: 3,
          explain: "$\\frac{5}{9} \\cdot \\left(\\frac{-3}{7} + \\frac{-4}{7}\\right) = \\frac{5}{9} \\cdot (-1) = -\\frac{5}{9}$."
        },
        {
          id: "d3q7", level: "vua", source: "SGK tr.12 – Chú ý",
          q: "Kết quả của phép tính $(-4{,}5) : 0{,}15$ là",
          options: ["$-30$", "$-3$", "$30$", "$-300$"],
          answer: 0,
          explain: "$4{,}5 : 0{,}15 = 450 : 15 = 30$; hai số khác dấu nên thương âm: $-30$."
        },
        {
          id: "d3q8", level: "vua", source: "mới",
          q: "Tìm $x$, biết $x - \\frac{3}{4} = -\\frac{5}{6}$.",
          options: ["$-\\frac{19}{12}$", "$\\frac{1}{12}$", "$-\\frac{1}{12}$", "$\\frac{19}{12}$"],
          answer: 2,
          explain: "$x = -\\frac{5}{6} + \\frac{3}{4} = \\frac{-10}{12} + \\frac{9}{12} = -\\frac{1}{12}$. ($-\\frac{19}{12}$ là lỗi trừ $\\frac{3}{4}$ thay vì cộng.)"
        },
        {
          id: "d3q9", level: "kho", source: "SGK tr.13 – Ví dụ 4",
          q: "Một tàu ngầm đang ở độ sâu $25{,}5$ m dưới mực nước biển. Tàu lặn xuống thêm với vận tốc $\\frac{3}{4}$ m/s trong 18 giây, rồi nổi lên với vận tốc $0{,}6$ m/s trong 25 giây. Lúc đó tàu ở độ sâu bao nhiêu mét dưới mực nước biển?",
          options: ["$27$ m", "$24$ m", "$54$ m", "$39$ m"],
          answer: 1,
          explain: "Lặn thêm: $\\frac{3}{4} \\cdot 18 = 13{,}5$ (m), tàu ở độ sâu $25{,}5 + 13{,}5 = 39$ (m). Nổi lên: $0{,}6 \\cdot 25 = 15$ (m). Độ sâu cuối: $39 - 15 = 24$ (m)."
        },
        {
          id: "d3q10", level: "kho", source: "SBT Bài 2 – BT 1.16",
          q: "Mật độ dân số là số người sinh sống trên một đơn vị diện tích. Một hòn đảo có diện tích $0{,}8$ km² và có 5 640 người sinh sống. Mật độ dân số của đảo là",
          options: ["$4\\,512$ người/km²", "$705$ người/km²", "$70\\,500$ người/km²", "$7\\,050$ người/km²"],
          answer: 3,
          explain: "Mật độ $= 5\\,640 : 0{,}8 = 7\\,050$ (người/km²). ($4\\,512$ là lỗi nhân thay vì chia.)"
        }
      ],
      essay: [
        {
          id: "d3e1", level: "vua", source: "SGK Bài 2 – BT 1.8a", maxPoints: 2,
          q: "Tính một cách hợp lí:<br>$A = \\left(3 - \\frac{1}{4} + \\frac{2}{3}\\right) - \\left(5 - \\frac{1}{3} - \\frac{6}{5}\\right) - \\left(6 - \\frac{7}{4} + \\frac{3}{5}\\right)$.",
          modelAnswer: "Bỏ ngoặc (đổi dấu các số hạng trong ngoặc có dấu \"−\" đứng trước):<br>" +
            "$A = 3 - \\frac{1}{4} + \\frac{2}{3} - 5 + \\frac{1}{3} + \\frac{6}{5} - 6 + \\frac{7}{4} - \\frac{3}{5}$.<br>" +
            "Nhóm: $A = (3 - 5 - 6) + \\left(-\\frac{1}{4} + \\frac{7}{4}\\right) + \\left(\\frac{2}{3} + \\frac{1}{3}\\right) + \\left(\\frac{6}{5} - \\frac{3}{5}\\right)$<br>" +
            "$= -8 + \\frac{3}{2} + 1 + \\frac{3}{5} = -8 + 1{,}5 + 1 + 0{,}6 = -4{,}9$.<br>" +
            "Vậy $A = -4{,}9 = -\\frac{49}{10}$.",
          rubric: [
            { pts: 0.75, text: "Bỏ ngoặc đúng, đổi dấu đúng tất cả các số hạng." },
            { pts: 0.75, text: "Nhóm hợp lí các số hạng và tính đúng từng nhóm ($-8$; $\\frac{3}{2}$; $1$; $\\frac{3}{5}$)." },
            { pts: 0.5, text: "Kết quả $A = -4{,}9$ (hoặc $-\\frac{49}{10}$)." }
          ]
        },
        {
          id: "d3e2", level: "kho", source: "SGK Bài 2 – BT 1.11", maxPoints: 1,
          q: "Một ngăn kéo dài 75 cm. Người ta xếp đứng các hộp băng đĩa dày $3{,}2$ cm vào ngăn kéo. Hỏi ngăn kéo chứa được nhiều nhất bao nhiêu hộp?",
          modelAnswer: "Ta có $75 : 3{,}2 = 23{,}4375$.<br>" +
            "Số hộp là số tự nhiên và không vượt quá $23{,}4375$, nên nhiều nhất là 23 hộp (23 hộp dày $23 \\cdot 3{,}2 = 73{,}6$ cm $\\le 75$ cm; 24 hộp dày $76{,}8$ cm $> 75$ cm).<br>" +
            "Vậy ngăn kéo chứa được nhiều nhất 23 hộp.",
          rubric: [
            { pts: 0.5, text: "Thực hiện đúng phép chia $75 : 3{,}2 = 23{,}4375$." },
            { pts: 0.5, text: "Lập luận lấy phần nguyên, kết luận 23 hộp." }
          ]
        }
      ]
    },

    // ======================= ĐỀ 4 – NÂNG CAO =======================
    {
      id: "d4", name: "Đề 4 – Nâng cao", advanced: true,
      mcq: [
        {
          id: "d4q1", level: "vua", source: "SBT Bài 2 – Ví dụ 1a",
          q: "Giá trị của biểu thức $A = -(2024 \\cdot 0{,}5 + 13{,}6) + 2024 \\cdot 0{,}5 - (7 - 13{,}6)$ là",
          options: ["$-7$", "$7$", "$-34{,}2$", "$20{,}2$"],
          answer: 0,
          explain: "Bỏ ngoặc: $A = -2024 \\cdot 0{,}5 - 13{,}6 + 2024 \\cdot 0{,}5 - 7 + 13{,}6 = (-2024 \\cdot 0{,}5 + 2024 \\cdot 0{,}5) + (-13{,}6 + 13{,}6) - 7 = -7$."
        },
        {
          id: "d4q2", level: "vua", source: "SBT Bài 2 – Ví dụ 1b",
          q: "Giá trị của biểu thức $B = 3{,}7 \\cdot 45 + 3{,}7 \\cdot 55 - 6{,}3 \\cdot 20 - 6{,}3 \\cdot 80$ là",
          options: ["$260$", "$-260$", "$370$", "$-630$"],
          answer: 1,
          explain: "$B = 3{,}7 \\cdot (45 + 55) - 6{,}3 \\cdot (20 + 80) = 370 - 630 = -260$."
        },
        {
          id: "d4q3", level: "kho", source: "SBT Bài 2 – BT 1.13a",
          q: "Giá trị của biểu thức $\\left(-\\frac{2}{3} + \\frac{4}{9}\\right) : \\frac{7}{5} + \\left(-\\frac{1}{3} + \\frac{5}{9}\\right) : \\frac{7}{5}$ là",
          options: ["$\\frac{5}{7}$", "$-\\frac{10}{63}$", "$0$", "$\\frac{10}{63}$"],
          answer: 2,
          explain: "Chia cho cùng một số: $\\left(-\\frac{2}{3} + \\frac{4}{9} - \\frac{1}{3} + \\frac{5}{9}\\right) \\cdot \\frac{5}{7} = \\left[\\left(-\\frac{2}{3} - \\frac{1}{3}\\right) + \\left(\\frac{4}{9} + \\frac{5}{9}\\right)\\right] \\cdot \\frac{5}{7} = (-1 + 1) \\cdot \\frac{5}{7} = 0$."
        },
        {
          id: "d4q4", level: "kho", source: "SBT Bài 2 – BT 1.14",
          q: "Đặt một cặp dấu ngoặc vào biểu thức $1{,}5 - 2{,}5 + 3{,}5 - 4{,}5 + 5{,}5$ để được kết quả bằng $-3{,}5$. Cách đặt đúng là",
          options: [
            "$1{,}5 - (2{,}5 + 3{,}5 - 4{,}5) + 5{,}5$",
            "$1{,}5 - (2{,}5 + 3{,}5 - 4{,}5 + 5{,}5)$",
            "$1{,}5 - 2{,}5 + 3{,}5 - (4{,}5 + 5{,}5)$",
            "$1{,}5 - (2{,}5 + 3{,}5) - 4{,}5 + 5{,}5$"
          ],
          answer: 3,
          explain: "$1{,}5 - (2{,}5 + 3{,}5) - 4{,}5 + 5{,}5 = 1{,}5 - 6 - 4{,}5 + 5{,}5 = -3{,}5$. Các cách khác cho $5{,}5$; $-5{,}5$; $-7{,}5$."
        },
        {
          id: "d4q5", level: "kho", source: "mới",
          q: "Tìm $x$, biết $\\left(x - \\frac{1}{2}\\right) : \\frac{3}{4} = -\\frac{2}{3}$.",
          options: ["$0$", "$-1$", "$-\\frac{7}{18}$", "$1$"],
          answer: 0,
          explain: "$x - \\frac{1}{2} = -\\frac{2}{3} \\cdot \\frac{3}{4} = -\\frac{1}{2}$, suy ra $x = -\\frac{1}{2} + \\frac{1}{2} = 0$. ($-\\frac{7}{18}$ là lỗi chia thay vì nhân.)"
        },
        {
          id: "d4q6", level: "kho", source: "mới",
          q: "Giá trị của tổng $\\frac{1}{1 \\cdot 2} + \\frac{1}{2 \\cdot 3} + \\frac{1}{3 \\cdot 4} + \\dots + \\frac{1}{9 \\cdot 10}$ là",
          options: ["$\\frac{1}{10}$", "$\\frac{9}{10}$", "$\\frac{10}{11}$", "$\\frac{11}{10}$"],
          answer: 1,
          explain: "Vì $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$ nên tổng $= \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\dots + \\left(\\frac{1}{9} - \\frac{1}{10}\\right) = 1 - \\frac{1}{10} = \\frac{9}{10}$."
        },
        {
          id: "d4q7", level: "kho", source: "SBT Bài 2 – BT 1.11",
          q: "Số thích hợp điền vào ô trống để $\\left(-\\frac{3}{8}\\right) \\cdot \\square = \\frac{9}{4} : (-2)$ là",
          options: ["$-3$", "$\\frac{1}{3}$", "$3$", "$-\\frac{27}{64}$"],
          answer: 2,
          explain: "Vế phải: $\\frac{9}{4} : (-2) = -\\frac{9}{8}$. Ô trống $= -\\frac{9}{8} : \\left(-\\frac{3}{8}\\right) = \\frac{9}{8} \\cdot \\frac{8}{3} = 3$."
        },
        {
          id: "d4q8", level: "kho", source: "mới",
          q: "Một cửa hàng có 40 kg đường. Ngày thứ nhất bán $\\frac{3}{8}$ số đường. Ngày thứ hai bán $0{,}4$ số đường <b>còn lại</b>. Sau hai ngày, cửa hàng còn bao nhiêu ki-lô-gam đường?",
          options: ["$9$ kg", "$25$ kg", "$10$ kg", "$15$ kg"],
          answer: 3,
          explain: "Ngày 1 bán $40 \\cdot \\frac{3}{8} = 15$ (kg), còn $25$ kg. Ngày 2 bán $0{,}4 \\cdot 25 = 10$ (kg). Còn lại $25 - 10 = 15$ (kg). (Đáp án 9 kg là lỗi tính $0{,}4$ của 40 kg.)"
        },
        {
          id: "d4q9", level: "kho", source: "mới",
          q: "Giá trị của tích $\\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{3}\\right)\\left(1 - \\frac{1}{4}\\right) \\cdots \\left(1 - \\frac{1}{20}\\right)$ là",
          options: ["$\\frac{1}{20}$", "$\\frac{19}{20}$", "$\\frac{1}{19}$", "$\\frac{1}{2}$"],
          answer: 0,
          explain: "Tích $= \\frac{1}{2} \\cdot \\frac{2}{3} \\cdot \\frac{3}{4} \\cdots \\frac{19}{20}$. Các tử và mẫu giống nhau triệt tiêu, còn lại $\\frac{1}{20}$."
        },
        {
          id: "d4q10", level: "kho", source: "SBT Bài 2 – BT 1.10",
          q: "Một \"tháp số\" có 3 hàng; mỗi ô ở hàng trên bằng tổng hai số ở hai ô kề nó ở hàng dưới. Hàng dưới cùng gồm các số $\\frac{1}{2};\\ -\\frac{1}{3};\\ \\frac{1}{4}$. Số ở ô trên cùng là",
          options: ["$\\frac{5}{12}$", "$\\frac{1}{12}$", "$-\\frac{1}{12}$", "$\\frac{1}{6}$"],
          answer: 1,
          explain: "Hàng giữa: $\\frac{1}{2} + \\left(-\\frac{1}{3}\\right) = \\frac{1}{6}$ và $-\\frac{1}{3} + \\frac{1}{4} = -\\frac{1}{12}$. Ô trên cùng: $\\frac{1}{6} + \\left(-\\frac{1}{12}\\right) = \\frac{1}{12}$. ($\\frac{5}{12}$ là lỗi cộng cả ba số ở hàng dưới.)"
        }
      ],
      essay: [
        {
          id: "d4e1", level: "kho", source: "SBT Bài 2 – BT 1.12", maxPoints: 1.5,
          q: "Tính một cách hợp lí: $A = -4{,}8 \\cdot 36 + 52{,}3 + 4{,}8 \\cdot (-64) + (-2{,}3)$.",
          modelAnswer: "Ta có $4{,}8 \\cdot (-64) = (-4{,}8) \\cdot 64$. Nhóm các số hạng:<br>" +
            "$A = \\left[(-4{,}8) \\cdot 36 + (-4{,}8) \\cdot 64\\right] + \\left[52{,}3 + (-2{,}3)\\right]$<br>" +
            "$= (-4{,}8) \\cdot (36 + 64) + 50$<br>" +
            "$= (-4{,}8) \\cdot 100 + 50 = -480 + 50 = -430$.",
          rubric: [
            { pts: 0.5, text: "Nhóm đúng hai tích có thừa số chung $-4{,}8$ và hai số $52{,}3$; $-2{,}3$." },
            { pts: 0.5, text: "Đặt thừa số chung: $(-4{,}8) \\cdot (36 + 64) = -480$; tính $52{,}3 - 2{,}3 = 50$." },
            { pts: 0.5, text: "Kết quả $A = -430$." }
          ]
        },
        {
          id: "d4e2", level: "kho", source: "mới", maxPoints: 1.5,
          q: "Tính tổng $S = \\frac{1}{3 \\cdot 5} + \\frac{1}{5 \\cdot 7} + \\frac{1}{7 \\cdot 9} + \\dots + \\frac{1}{19 \\cdot 21}$.",
          modelAnswer: "Nhận xét: $\\frac{1}{n} - \\frac{1}{n+2} = \\frac{2}{n(n+2)}$, nên $\\frac{1}{n(n+2)} = \\frac{1}{2}\\left(\\frac{1}{n} - \\frac{1}{n+2}\\right)$.<br>" +
            "Do đó $S = \\frac{1}{2}\\left(\\frac{1}{3} - \\frac{1}{5} + \\frac{1}{5} - \\frac{1}{7} + \\dots + \\frac{1}{19} - \\frac{1}{21}\\right)$<br>" +
            "$= \\frac{1}{2}\\left(\\frac{1}{3} - \\frac{1}{21}\\right) = \\frac{1}{2} \\cdot \\frac{6}{21} = \\frac{3}{21} = \\frac{1}{7}$.",
          rubric: [
            { pts: 0.5, text: "Tách đúng mỗi số hạng: $\\frac{1}{n(n+2)} = \\frac{1}{2}\\left(\\frac{1}{n} - \\frac{1}{n+2}\\right)$." },
            { pts: 0.5, text: "Triệt tiêu đúng, còn $\\frac{1}{2}\\left(\\frac{1}{3} - \\frac{1}{21}\\right)$." },
            { pts: 0.5, text: "Kết quả $S = \\frac{1}{7}$." }
          ]
        }
      ]
    }
  ]
});
