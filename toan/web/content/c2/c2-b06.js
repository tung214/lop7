registerLesson({
  id: "c2-b06",
  chapter: 2,
  kind: "lesson",
  title: "Bài 6. Số vô tỉ. Căn bậc hai số học",
  sgkPages: [29, 32],
  sbtPages: [26, 28],
  objectives: [
    "Nhận biết số vô tỉ (số thập phân vô hạn không tuần hoàn), kí hiệu $\\mathbb{I}$",
    "Nhận biết căn bậc hai số học của một số không âm, tính được trong trường hợp thuận lợi",
    "Dùng máy tính cầm tay tính căn bậc hai số học và làm tròn kết quả",
    "Vận dụng căn bậc hai số học vào bài toán thực tế (cạnh hình vuông, đường chéo hình chữ nhật)"
  ],

  theory: [
    {
      heading: "1. Số vô tỉ",
      html: "Hình vuông có diện tích $2$ dm² có cạnh $x$ (dm) với $x^2 = 2$. Không có số hữu tỉ nào bình phương bằng $2$; người ta tính được $x = 1{,}41421356\\ldots$ – một số thập phân <b>vô hạn không tuần hoàn</b>." +
        "<ul><li><b>Số vô tỉ</b> là số viết được dưới dạng số thập phân vô hạn không tuần hoàn. Tập hợp các số vô tỉ kí hiệu là $\\mathbb{I}$.</li>" +
        "<li>Ví dụ số vô tỉ: $\\pi = 3{,}14159265\\ldots$ (tỉ số chu vi : đường kính của mọi đường tròn); $-0{,}101001000\\ldots$ (sau dấu phẩy viết liên tiếp $10;\\ 100;\\ 1000;\\ldots$).</li>" +
        "<li>Phân biệt: số thập phân <b>hữu hạn</b> hoặc <b>vô hạn tuần hoàn</b> là số hữu tỉ (ví dụ $0{,}(3) = \\frac{1}{3}$); số thập phân <b>vô hạn không tuần hoàn</b> là số vô tỉ.</li>" +
        "<li>Làm tròn số vô tỉ giống như làm tròn số thập phân: $0{,}1010010001\\ldots \\approx 0{,}101$ (làm tròn đến chữ số thập phân thứ ba).</li></ul>"
    },
    {
      heading: "2. Căn bậc hai số học",
      html: "<b>Căn bậc hai số học</b> của số $a \\ge 0$, kí hiệu $\\sqrt{a}$, là số $x$ <b>không âm</b> sao cho $x^2 = a$." +
        "<ul><li>Ví dụ: $\\sqrt{100} = 10$ vì $10 \\ge 0$ và $10^2 = 100$; $\\ \\sqrt{0{,}04} = 0{,}2$; $\\ \\sqrt{0} = 0$.</li>" +
        "<li>Số âm <b>không có</b> căn bậc hai số học (vì bình phương của mọi số đều không âm). Ví dụ $\\sqrt{-4}$ không có nghĩa.</li>" +
        "<li>Luôn có $\\sqrt{a} \\ge 0$, nên viết $\\sqrt{16} = -4$ là <b>sai</b>.</li>" +
        "<li>Hình vuông có diện tích $a$ thì cạnh dài $\\sqrt{a}$. Ví dụ cạnh hình vuông diện tích $2$ dm² là $\\sqrt{2}$ dm.</li>" +
        "<li>Tính chất: $(\\sqrt{a})^2 = a$ (với $a \\ge 0$); $\\ \\sqrt{a^2} = a$ nếu $a \\ge 0$; $\\ \\sqrt{a^2} = -a$ nếu $a < 0$ (ví dụ $\\sqrt{(-7)^2} = \\sqrt{49} = 7$).</li>" +
        "<li>Nếu $a$ là số chính phương thì $\\sqrt{a}$ là số tự nhiên; nếu $a$ là số tự nhiên <b>không</b> chính phương thì $\\sqrt{a}$ là số vô tỉ (ví dụ $\\sqrt{2}, \\sqrt{3}, \\sqrt{47}$).</li></ul>" +
        "Nên thuộc bình phương các số từ $1$ đến $15$:<br>" +
        "<table><tr><td>$n$</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>" +
        "<tr><td>$n^2$</td><td>1</td><td>4</td><td>9</td><td>16</td><td>25</td><td>36</td><td>49</td><td>64</td><td>81</td><td>100</td><td>121</td><td>144</td><td>169</td><td>196</td><td>225</td></tr></table>"
    },
    {
      heading: "3. Tính căn bậc hai số học bằng máy tính cầm tay",
      html: "Bấm phím căn $\\sqrt{\\ }$, nhập số rồi bấm <b>=</b>. Ví dụ $\\sqrt{1024} = 32$; $\\ \\sqrt{2} \\approx 1{,}414213562$ (màn hình chỉ hiện hữu hạn chữ số nên kết quả vô hạn đã được làm tròn)." +
        "<ul><li>Làm tròn <b>với độ chính xác</b> $d$: $\\ d = 0{,}5 \\to$ làm tròn đến hàng đơn vị; $\\ d = 0{,}05 \\to$ hàng phần mười; $\\ d = 0{,}005 \\to$ hàng phần trăm; $\\ d = 0{,}0005 \\to$ hàng phần nghìn.</li>" +
        "<li>Ví dụ: $\\sqrt{91} = 9{,}539392\\ldots$ nên $\\sqrt{91} \\approx 9{,}5394$ (đến chữ số thập phân thứ tư) và $\\sqrt{91} \\approx 9{,}5$ (độ chính xác $0{,}05$).</li>" +
        "<li>Có thể tính gần đúng với số vô tỉ bằng cách làm tròn trước: $\\sqrt{2} \\approx 1{,}41$ nên $1 + \\sqrt{2} \\approx 2{,}41$.</li></ul>"
    }
  ],

  skills: [
    "<b>Tính $\\sqrt{a}$ khi $a$ là bình phương đẹp:</b> tìm số $x \\ge 0$ có $x^2 = a$. Với số thập phân, đếm chữ số: $\\sqrt{0{,}81} = 0{,}9$ vì $0{,}9^2 = 0{,}81$; $\\ \\sqrt{8100} = 90$ vì $90^2 = 8100$.",
    "<b>Số lớn:</b> phân tích ra thừa số nguyên tố, ghép thành bình phương: $324 = 2^2 \\cdot 3^4 = (2 \\cdot 3^2)^2 = 18^2$ nên $\\sqrt{324} = 18$.",
    "<b>Nhận biết số vô tỉ:</b> $\\sqrt{n}$ với $n$ tự nhiên không chính phương là số vô tỉ; $\\pi$ là số vô tỉ; số hữu tỉ cộng (trừ) số vô tỉ, số hữu tỉ khác 0 nhân số vô tỉ đều cho số vô tỉ (ví dụ $2 + \\sqrt{7}$, $-2\\pi$).",
    "<b>Cẩn thận:</b> $\\sqrt{-0{,}09}$ không có nghĩa; $\\sqrt{0{,}1} \\ne 0{,}01$ (vì $0{,}01^2 = 0{,}0001$); $\\sqrt{(-5)^2} = 5$ chứ không phải $-5$.",
    "<b>Giá trị lớn nhất / nhỏ nhất:</b> dùng $\\sqrt{A} \\ge 0$, dấu \"=\" khi $A = 0$. Ví dụ $\\sqrt{x+8} - 7 \\ge -7$, nhỏ nhất bằng $-7$ khi $x = -8$.",
    "<b>Làm tròn:</b> xác định đúng hàng cần làm tròn từ độ chính xác (độ chính xác $0{,}005$ → hàng phần trăm), rồi nhìn chữ số ngay sau hàng đó: $\\ge 5$ thì cộng thêm 1."
  ],

  examples: [
    {
      q: "Tính: a) $\\sqrt{0{,}49}$; b) $\\sqrt{21{,}5^2}$; c) $\\sqrt{(-12)^2}$.",
      solution: "a) $0{,}7 \\ge 0$ và $0{,}7^2 = 0{,}49$ nên $\\sqrt{0{,}49} = 0{,}7$.<br>" +
        "b) $21{,}5 > 0$ nên $\\sqrt{21{,}5^2} = 21{,}5$.<br>" +
        "c) $(-12)^2 = 144 = 12^2$ nên $\\sqrt{(-12)^2} = \\sqrt{144} = 12$ (căn bậc hai số học không âm)."
    },
    {
      q: "Tính $\\sqrt{1764}$ bằng cách phân tích ra thừa số nguyên tố.",
      solution: "$1764 = 2^2 \\cdot 3^2 \\cdot 7^2 = (2 \\cdot 3 \\cdot 7)^2 = 42^2$.<br>Vì $42 > 0$ nên $\\sqrt{1764} = 42$."
    },
    {
      q: "Dùng máy tính tính $\\sqrt{3}$ rồi làm tròn: a) đến chữ số thập phân thứ ba; b) với độ chính xác $0{,}05$.",
      solution: "Máy tính cho $\\sqrt{3} = 1{,}732050808\\ldots$<br>" +
        "a) Chữ số thập phân thứ tư là $0 < 5$ nên $\\sqrt{3} \\approx 1{,}732$.<br>" +
        "b) Độ chính xác $0{,}05$ → làm tròn đến hàng phần mười: chữ số hàng phần trăm là $3 < 5$ nên $\\sqrt{3} \\approx 1{,}7$."
    },
    {
      q: "Người xưa tính đường kính thân cây theo quy tắc \"quân bát, phát tam, tồn ngũ, quân nhị\": chia chu vi thành 8 phần bằng nhau, bỏ 3 phần, còn 5 phần rồi chia đôi. Theo quy tắc này, người xưa đã ước lượng số $\\pi$ bằng bao nhiêu?",
      solution: "Gọi chu vi là $C$. Đường kính $d = \\frac{5}{8}C : 2 = \\frac{5C}{16}$.<br>" +
        "Khi đó $\\pi = \\frac{C}{d} = C : \\frac{5C}{16} = \\frac{16}{5} = 3{,}2$.<br>Vậy người xưa ước lượng $\\pi \\approx 3{,}2$ (giá trị thật $\\pi = 3{,}14159\\ldots$)."
    }
  ],

  sets: [
    // ======================= ĐỀ 1 =======================
    {
      id: "d1", name: "Đề 1",
      mcq: [
        {
          id: "d1q1", level: "de", source: "SGK tr.30 – Định nghĩa số vô tỉ",
          q: "Số nào sau đây là số vô tỉ?",
          options: ["$0{,}(3)$", "$\\sqrt{9}$", "$\\sqrt{5}$", "$-\\frac{2}{7}$"],
          answer: 2,
          explain: "$5$ là số tự nhiên không chính phương nên $\\sqrt{5} = 2{,}2360679\\ldots$ là số vô tỉ. Còn $0{,}(3) = \\frac{1}{3}$, $\\sqrt{9} = 3$, $-\\frac{2}{7}$ đều là số hữu tỉ."
        },
        {
          id: "d1q2", level: "de", source: "SGK Bài 6 – BT 2.7",
          q: "$\\sqrt{49}$ bằng",
          options: ["$7$", "$-7$", "$\\pm 7$", "$24{,}5$"],
          answer: 0,
          explain: "$7 \\ge 0$ và $7^2 = 49$ nên $\\sqrt{49} = 7$. Căn bậc hai số học luôn không âm nên không thể là $-7$ hay $\\pm 7$."
        },
        {
          id: "d1q3", level: "de", source: "SBT Bài 6 – BT 2.11",
          q: "Kết quả nào sau đây đúng?",
          options: ["$\\sqrt{0{,}04} = 0{,}02$", "$\\sqrt{0{,}04} = 0{,}2$", "$\\sqrt{-4} = -2$", "$\\sqrt{4} = -2$"],
          answer: 1,
          explain: "$0{,}2^2 = 0{,}04$ và $0{,}2 \\ge 0$ nên $\\sqrt{0{,}04} = 0{,}2$. ($0{,}02^2 = 0{,}0004$; số âm không có căn bậc hai; $\\sqrt{4} = 2$.)"
        },
        {
          id: "d1q4", level: "de", source: "SBT Bài 6 – BT 2.10",
          q: "Số nào sau đây <b>không</b> có căn bậc hai số học?",
          options: ["$0$", "$0{,}9$", "$\\frac{4}{5}$", "$-4$"],
          answer: 3,
          explain: "Chỉ số không âm mới có căn bậc hai số học. $-4 < 0$ nên không có căn bậc hai số học."
        },
        {
          id: "d1q5", level: "vua", source: "SGK tr.30 – Luyện tập 1",
          q: "Giá trị của $\\sqrt{15^2}$ là",
          options: ["$225$", "$-15$", "$15$", "$30$"],
          answer: 2,
          explain: "Với $a \\ge 0$ thì $\\sqrt{a^2} = a$. Vì $15 > 0$ nên $\\sqrt{15^2} = 15$."
        },
        {
          id: "d1q6", level: "vua", source: "SGK tr.30 – Vận dụng 2",
          q: "Một sàn tập hình vuông có diện tích $196$ m². Chu vi của sàn tập là",
          options: ["$14$ m", "$56$ m", "$49$ m", "$28$ m"],
          answer: 1,
          explain: "Cạnh sàn là $\\sqrt{196} = 14$ (m). Chu vi là $4 \\cdot 14 = 56$ (m)."
        },
        {
          id: "d1q7", level: "vua", source: "SGK tr.31 – Ví dụ 3",
          q: "Biết $\\sqrt{3} = 1{,}7320508\\ldots$ Làm tròn $\\sqrt{3}$ đến chữ số thập phân thứ hai, ta được",
          options: ["$1{,}73$", "$1{,}74$", "$1{,}7$", "$1{,}732$"],
          answer: 0,
          explain: "Chữ số thập phân thứ ba là $2 < 5$ nên giữ nguyên: $\\sqrt{3} \\approx 1{,}73$."
        },
        {
          id: "d1q8", level: "vua", source: "SGK Bài 6 – BT 2.10",
          q: "Biết $\\sqrt{41} = 6{,}4031242\\ldots$ Làm tròn $\\sqrt{41}$ với độ chính xác $0{,}005$, ta được",
          options: ["$6{,}41$", "$6{,}5$", "$6{,}403$", "$6{,}40$"],
          answer: 3,
          explain: "Độ chính xác $0{,}005$ → làm tròn đến hàng phần trăm. Chữ số hàng phần nghìn là $3 < 5$ nên $\\sqrt{41} \\approx 6{,}40$."
        },
        {
          id: "d1q9", level: "kho", source: "SGK Bài 6 – BT 2.11",
          q: "Bình phương độ dài đường chéo hình chữ nhật bằng tổng bình phương hai cạnh. Một hình chữ nhật có chiều dài $6$ dm, chiều rộng $4$ dm. Độ dài đường chéo (làm tròn đến hàng phần mười) là",
          options: ["$7{,}2$ dm", "$10$ dm", "$7{,}3$ dm", "$52$ dm"],
          answer: 0,
          explain: "Bình phương đường chéo là $6^2 + 4^2 = 36 + 16 = 52$, nên đường chéo dài $\\sqrt{52} = 7{,}211\\ldots \\approx 7{,}2$ (dm)."
        },
        {
          id: "d1q10", level: "kho", source: "SBT Bài 6 – BT 2.13",
          q: "Trong các số $\\sqrt{36};\\ \\sqrt{0{,}01};\\ -\\frac{16}{3};\\ 2 + \\sqrt{7}$, số vô tỉ là",
          options: ["$\\sqrt{36}$", "$\\sqrt{0{,}01}$", "$-\\frac{16}{3}$", "$2 + \\sqrt{7}$"],
          answer: 3,
          explain: "$\\sqrt{36} = 6$, $\\sqrt{0{,}01} = 0{,}1$, $-\\frac{16}{3}$ đều là số hữu tỉ. $7$ không chính phương nên $\\sqrt{7}$ vô tỉ, cộng thêm số hữu tỉ $2$ vẫn là số vô tỉ."
        }
      ],
      essay: [
        {
          id: "d1e1", level: "vua", source: "SGK Bài 6 – BT 2.12 (biến đổi)", maxPoints: 3,
          q: "Người ta lát một mảnh sân hình vuông có diện tích $81$ m² bằng các viên gạch hình vuông cạnh $30$ cm (coi mạch ghép không đáng kể).<br>a) Tính độ dài cạnh của mảnh sân.<br>b) Cần dùng bao nhiêu viên gạch?",
          modelAnswer: "a) Cạnh mảnh sân là $\\sqrt{81} = 9$ (m) (vì $9^2 = 81$).<br>" +
            "b) Đổi $9$ m $= 900$ cm. Mỗi cạnh sân xếp được $900 : 30 = 30$ (viên).<br>" +
            "Số viên gạch cần dùng: $30 \\cdot 30 = 900$ (viên).<br>" +
            "(Cách khác: diện tích sân $81$ m² $= 810\\,000$ cm², diện tích mỗi viên $30 \\cdot 30 = 900$ cm², số viên $810\\,000 : 900 = 900$.)",
          rubric: [
            { pts: 1, text: "Tính đúng cạnh sân $\\sqrt{81} = 9$ m." },
            { pts: 1, text: "Đổi đơn vị đúng và tính được mỗi cạnh xếp 30 viên (hoặc diện tích sân $810\\,000$ cm² và mỗi viên $900$ cm²)." },
            { pts: 1, text: "Kết luận đúng: cần $900$ viên gạch." }
          ]
        }
      ]
    },

    // ======================= ĐỀ 2 =======================
    {
      id: "d2", name: "Đề 2",
      mcq: [
        {
          id: "d2q1", level: "de", source: "SGK tr.30 – Định nghĩa số vô tỉ",
          q: "Số vô tỉ là số viết được dưới dạng",
          options: ["số thập phân hữu hạn", "số thập phân vô hạn tuần hoàn", "phân số có tử và mẫu là số nguyên, mẫu khác 0", "số thập phân vô hạn không tuần hoàn"],
          answer: 3,
          explain: "Theo định nghĩa, số vô tỉ là số thập phân vô hạn không tuần hoàn. Ba dạng còn lại đều là số hữu tỉ."
        },
        {
          id: "d2q2", level: "de", source: "SGK Bài 6 – BT 2.7",
          q: "$\\sqrt{121}$ bằng",
          options: ["$12$", "$11$", "$-11$", "$60{,}5$"],
          answer: 1,
          explain: "$11 \\ge 0$ và $11^2 = 121$ nên $\\sqrt{121} = 11$."
        },
        {
          id: "d2q3", level: "de", source: "SBT Bài 6 – BT 2.11",
          q: "Kết quả nào sau đây đúng?",
          options: ["$\\sqrt{16} = -4$", "$\\sqrt{0{,}1} = 0{,}01$", "$\\sqrt{0{,}09} = 0{,}3$", "$\\sqrt{-0{,}09} = -0{,}3$"],
          answer: 2,
          explain: "$0{,}3^2 = 0{,}09$ và $0{,}3 \\ge 0$ nên $\\sqrt{0{,}09} = 0{,}3$. Căn bậc hai số học không âm ($\\sqrt{16} = 4$); $0{,}01^2 = 0{,}0001 \\ne 0{,}1$; số âm không có căn bậc hai."
        },
        {
          id: "d2q4", level: "de", source: "SGK tr.31 – Nhận xét",
          q: "Số nào sau đây là số hữu tỉ?",
          options: ["$\\sqrt{64}$", "$\\pi$", "$\\sqrt{11}$", "$\\sqrt{2}$"],
          answer: 0,
          explain: "$\\sqrt{64} = 8$ là số hữu tỉ. $\\pi$ là số vô tỉ; $11$ và $2$ không chính phương nên $\\sqrt{11}, \\sqrt{2}$ là số vô tỉ."
        },
        {
          id: "d2q5", level: "vua", source: "SBT Bài 6 – BT 2.15",
          q: "Căn bậc hai số học của $8\\,100$ là",
          options: ["$900$", "$-90$", "$90$", "$4\\,050$"],
          answer: 2,
          explain: "$90^2 = 8\\,100$ và $90 > 0$ nên $\\sqrt{8\\,100} = 90$."
        },
        {
          id: "d2q6", level: "vua", source: "SGK Bài 6 – BT 2.9",
          q: "Độ dài cạnh của hình vuông có diện tích $3\\,600$ m² là",
          options: ["$600$ m", "$900$ m", "$1\\,800$ m", "$60$ m"],
          answer: 3,
          explain: "Cạnh hình vuông là $\\sqrt{3\\,600} = 60$ (m) vì $60^2 = 3\\,600$. ($900$ là kết quả sai khi lấy $3\\,600 : 4$.)"
        },
        {
          id: "d2q7", level: "vua", source: "SGK Bài 6 – BT 2.6",
          q: "Cho biết $147^2 = 21\\,609$. Giá trị của $\\sqrt{21\\,609}$ là",
          options: ["$147$", "$-147$", "$1\\,470$", "$14{,}7$"],
          answer: 0,
          explain: "Vì $147 > 0$ và $147^2 = 21\\,609$ nên $\\sqrt{21\\,609} = 147$."
        },
        {
          id: "d2q8", level: "vua", source: "SGK tr.31 – Luyện tập 2",
          q: "Biết $\\sqrt{15} = 3{,}8729833\\ldots$ Làm tròn $\\sqrt{15}$ với độ chính xác $0{,}005$, ta được",
          options: ["$3{,}88$", "$3{,}87$", "$3{,}9$", "$3{,}873$"],
          answer: 1,
          explain: "Độ chính xác $0{,}005$ → làm tròn đến hàng phần trăm. Chữ số hàng phần nghìn là $2 < 5$ nên $\\sqrt{15} \\approx 3{,}87$."
        },
        {
          id: "d2q9", level: "kho", source: "SGK tr.31 – Vận dụng 3",
          q: "Đáy của một kim tự tháp có dạng hình vuông với diện tích $52\\,198{,}16$ m². Độ dài cạnh đáy (làm tròn đến chữ số thập phân thứ nhất) là",
          options: ["$228{,}4$ m", "$228{,}5$ m", "$13\\,049{,}5$ m", "$26\\,099{,}1$ m"],
          answer: 1,
          explain: "Cạnh đáy là $\\sqrt{52\\,198{,}16} = 228{,}469\\ldots$ (m). Chữ số hàng phần trăm là $6 \\ge 5$ nên làm tròn được $228{,}5$ m."
        },
        {
          id: "d2q10", level: "kho", source: "SBT Bài 6 – BT 2.12",
          q: "Biểu thức nào sau đây có giá trị <b>khác</b> $\\frac{2}{5}$?",
          options: ["$\\sqrt{\\frac{2^2}{5^2}}$", "$\\frac{\\sqrt{2^2} + \\sqrt{6^2}}{\\sqrt{5^2} + \\sqrt{15^2}}$", "$\\frac{\\sqrt{2^2} + \\sqrt{3^2}}{\\sqrt{5^2} + \\sqrt{7^2}}$", "$\\frac{14}{35}$"],
          answer: 2,
          explain: "$\\sqrt{\\frac{2^2}{5^2}} = \\sqrt{\\left(\\frac{2}{5}\\right)^2} = \\frac{2}{5}$; $\\ \\frac{2 + 6}{5 + 15} = \\frac{8}{20} = \\frac{2}{5}$; $\\ \\frac{14}{35} = \\frac{2}{5}$. Còn $\\frac{2 + 3}{5 + 7} = \\frac{5}{12} \\ne \\frac{2}{5}$."
        }
      ],
      essay: [
        {
          id: "d2e1", level: "vua", source: "SBT Bài 6 – BT 2.15", maxPoints: 1.5,
          q: "Tính: a) $\\sqrt{0{,}81}$; &nbsp; b) $\\sqrt{81^2}$; &nbsp; c) $\\sqrt{(-9)^2}$.",
          modelAnswer: "a) $0{,}9 \\ge 0$ và $0{,}9^2 = 0{,}81$ nên $\\sqrt{0{,}81} = 0{,}9$.<br>" +
            "b) $81 > 0$ nên $\\sqrt{81^2} = 81$.<br>" +
            "c) $(-9)^2 = 81 = 9^2$ nên $\\sqrt{(-9)^2} = \\sqrt{81} = 9$.",
          rubric: [
            { pts: 0.5, text: "Câu a: $\\sqrt{0{,}81} = 0{,}9$ (có giải thích)." },
            { pts: 0.5, text: "Câu b: $\\sqrt{81^2} = 81$." },
            { pts: 0.5, text: "Câu c: $\\sqrt{(-9)^2} = 9$ (không ghi $-9$)." }
          ]
        },
        {
          id: "d2e2", level: "kho", source: "SBT Bài 6 – BT 2.16 (biến đổi)", maxPoints: 1.5,
          q: "Cho $a = \\sqrt{841} + \\frac{1}{\\sqrt{842}}$ và $b = \\sqrt{900} + \\frac{1}{\\sqrt{899}} - 1$. So sánh $a$ và $b$.",
          modelAnswer: "Ta có $841 = 29^2$ và $900 = 30^2$ nên $\\sqrt{841} = 29$, $\\sqrt{900} = 30$.<br>" +
            "Do đó $a = 29 + \\frac{1}{\\sqrt{842}}$ và $b = 30 - 1 + \\frac{1}{\\sqrt{899}} = 29 + \\frac{1}{\\sqrt{899}}$.<br>" +
            "Vì $\\sqrt{842} < \\sqrt{899}$ (diện tích hình vuông lớn hơn thì cạnh dài hơn) nên $\\frac{1}{\\sqrt{842}} > \\frac{1}{\\sqrt{899}}$.<br>" +
            "Vậy $a > b$.",
          rubric: [
            { pts: 0.5, text: "Tính đúng $\\sqrt{841} = 29$ và $\\sqrt{900} = 30$." },
            { pts: 0.5, text: "Đưa được $a = 29 + \\frac{1}{\\sqrt{842}}$, $b = 29 + \\frac{1}{\\sqrt{899}}$." },
            { pts: 0.5, text: "So sánh $\\frac{1}{\\sqrt{842}} > \\frac{1}{\\sqrt{899}}$ và kết luận $a > b$." }
          ]
        }
      ]
    },

    // ======================= ĐỀ 3 =======================
    {
      id: "d3", name: "Đề 3",
      mcq: [
        {
          id: "d3q1", level: "de", source: "SGK tr.30 – Kí hiệu",
          q: "Tập hợp các số vô tỉ được kí hiệu là",
          options: ["$\\mathbb{Q}$", "$\\mathbb{I}$", "$\\mathbb{Z}$", "$\\mathbb{N}$"],
          answer: 1,
          explain: "Tập hợp các số vô tỉ kí hiệu là $\\mathbb{I}$. ($\\mathbb{N}$: số tự nhiên, $\\mathbb{Z}$: số nguyên, $\\mathbb{Q}$: số hữu tỉ.)"
        },
        {
          id: "d3q2", level: "de", source: "SGK tr.30 – Ví dụ 2",
          q: "$\\sqrt{0{,}25}$ bằng",
          options: ["$0{,}05$", "$0{,}125$", "$0{,}5$", "$-0{,}5$"],
          answer: 2,
          explain: "$0{,}5 \\ge 0$ và $0{,}5^2 = 0{,}25$ nên $\\sqrt{0{,}25} = 0{,}5$. ($0{,}05^2 = 0{,}0025$.)"
        },
        {
          id: "d3q3", level: "de", source: "SBT Bài 6 – BT 2.13",
          q: "Số nào sau đây là số vô tỉ?",
          options: ["$\\sqrt{16}$", "$-\\frac{3}{8}$", "$1{,}(25)$", "$\\sqrt{13}$"],
          answer: 3,
          explain: "$13$ không chính phương nên $\\sqrt{13}$ là số vô tỉ. $\\sqrt{16} = 4$; $-\\frac{3}{8}$ là phân số; $1{,}(25)$ là số thập phân vô hạn tuần hoàn nên là số hữu tỉ."
        },
        {
          id: "d3q4", level: "de", source: "SGK tr.30 – Định nghĩa căn bậc hai số học",
          q: "Số $x$ không âm thỏa mãn $x^2 = 64$ là",
          options: ["$8$", "$-8$", "$32$", "$4$"],
          answer: 0,
          explain: "$8^2 = 64$ và $8 \\ge 0$, nên $x = \\sqrt{64} = 8$. ($-8$ cũng có bình phương bằng 64 nhưng là số âm.)"
        },
        {
          id: "d3q5", level: "vua", source: "SBT Bài 6 – BT 2.10",
          q: "Trong các số $0{,}9;\\ -4;\\ 11;\\ -100;\\ \\frac{4}{5};\\ \\pi$, có bao nhiêu số có căn bậc hai số học?",
          options: ["$2$", "$3$", "$4$", "$6$"],
          answer: 2,
          explain: "Chỉ số không âm có căn bậc hai số học: $0{,}9;\\ 11;\\ \\frac{4}{5};\\ \\pi$ – gồm 4 số. ($-4$ và $-100$ là số âm.)"
        },
        {
          id: "d3q6", level: "vua", source: "SGK Bài 6 – BT 2.9c",
          q: "Độ dài cạnh của hình vuông có diện tích $1$ ha là",
          options: ["$1\\,000$ m", "$100$ m", "$10$ m", "$50$ m"],
          answer: 1,
          explain: "$1$ ha $= 10\\,000$ m². Cạnh hình vuông là $\\sqrt{10\\,000} = 100$ (m)."
        },
        {
          id: "d3q7", level: "vua", source: "SBT Bài 6 – BT 2.17a",
          q: "Biết $\\sqrt{2} = 1{,}41421\\ldots$ Làm tròn số $1 + \\sqrt{2}$ đến hàng phần trăm, ta được",
          options: ["$2{,}41$", "$2{,}42$", "$2{,}4$", "$1{,}41$"],
          answer: 0,
          explain: "$1 + \\sqrt{2} = 2{,}41421\\ldots$ Chữ số hàng phần nghìn là $4 < 5$ nên $1 + \\sqrt{2} \\approx 2{,}41$."
        },
        {
          id: "d3q8", level: "vua", source: "SGK Bài 6 – BT 2.8",
          q: "Phân tích $44\\,100 = 2^2 \\cdot 3^2 \\cdot 5^2 \\cdot 7^2$. Khi đó $\\sqrt{44\\,100}$ bằng",
          options: ["$2\\,100$", "$441$", "$21$", "$210$"],
          answer: 3,
          explain: "$44\\,100 = (2 \\cdot 3 \\cdot 5 \\cdot 7)^2 = 210^2$ nên $\\sqrt{44\\,100} = 210$."
        },
        {
          id: "d3q9", level: "kho", source: "SBT Bài 6 – BT 2.18",
          q: "Biểu thức $\\sqrt{x + 5} - 3$ có giá trị nhỏ nhất bằng",
          options: ["$\\sqrt{5} - 3$", "$-3$", "$0$", "$-8$"],
          answer: 1,
          explain: "$\\sqrt{x + 5} \\ge 0$ nên $\\sqrt{x + 5} - 3 \\ge -3$; dấu \"=\" xảy ra khi $x + 5 = 0$, tức $x = -5$. Vậy giá trị nhỏ nhất là $-3$."
        },
        {
          id: "d3q10", level: "kho", source: "SGK Bài 6 – BT 2.11",
          q: "Bình phương độ dài đường chéo hình chữ nhật bằng tổng bình phương hai cạnh. Hình chữ nhật có hai cạnh $7$ cm và $3$ cm thì đường chéo (làm tròn đến hàng phần mười) dài",
          options: ["$10$ cm", "$7{,}7$ cm", "$7{,}6$ cm", "$58$ cm"],
          answer: 2,
          explain: "Bình phương đường chéo là $7^2 + 3^2 = 49 + 9 = 58$, nên đường chéo dài $\\sqrt{58} = 7{,}615\\ldots \\approx 7{,}6$ (cm)."
        }
      ],
      essay: [
        {
          id: "d3e1", level: "vua", source: "SGK Bài 6 – BT 2.10 (biến đổi)", maxPoints: 2,
          q: "Dùng máy tính cầm tay tính rồi làm tròn kết quả:<br>a) $\\sqrt{7}$ đến chữ số thập phân thứ ba;<br>b) $\\sqrt{2021}$ với độ chính xác $0{,}05$.",
          modelAnswer: "a) $\\sqrt{7} = 2{,}6457513\\ldots$ Chữ số thập phân thứ tư là $7 \\ge 5$ nên $\\sqrt{7} \\approx 2{,}646$.<br>" +
            "b) $\\sqrt{2021} = 44{,}955533\\ldots$ Độ chính xác $0{,}05$ → làm tròn đến hàng phần mười. Chữ số hàng phần trăm là $5 \\ge 5$ nên $\\sqrt{2021} \\approx 45{,}0$.",
          rubric: [
            { pts: 1, text: "Câu a: kết quả đúng $\\sqrt{7} \\approx 2{,}646$." },
            { pts: 0.5, text: "Câu b: xác định đúng làm tròn đến hàng phần mười." },
            { pts: 0.5, text: "Câu b: kết quả đúng $\\sqrt{2021} \\approx 45{,}0$ (chấp nhận $45$)." }
          ]
        },
        {
          id: "d3e2", level: "kho", source: "SBT Bài 6 – Ví dụ 2c", maxPoints: 1,
          q: "Có hay không hai số vô tỉ $x, y$ (với $y \\ne 0$) sao cho $x + y$ và $x : y$ đều là số hữu tỉ? Nếu có, hãy nêu một ví dụ và giải thích.",
          modelAnswer: "Có. Chẳng hạn $x = \\sqrt{2}$ và $y = -\\sqrt{2}$ (đều là số vô tỉ vì $2$ không chính phương, $y \\ne 0$).<br>" +
            "Khi đó $x + y = \\sqrt{2} + (-\\sqrt{2}) = 0$ và $x : y = \\sqrt{2} : (-\\sqrt{2}) = -1$ đều là số hữu tỉ.",
          rubric: [
            { pts: 0.5, text: "Trả lời \"có\" và nêu được ví dụ đúng (như $\\sqrt{2}$ và $-\\sqrt{2}$)." },
            { pts: 0.5, text: "Kiểm tra đúng tổng và thương đều là số hữu tỉ." }
          ]
        }
      ]
    },

    // ======================= ĐỀ 4 – NÂNG CAO =======================
    {
      id: "d4", name: "Đề 4 – Nâng cao", advanced: true,
      mcq: [
        {
          id: "d4q1", level: "vua", source: "SBT Bài 6 – Kiến thức cần nhớ",
          q: "Với mọi số $a < 0$, khẳng định nào sau đây đúng?",
          options: ["$\\sqrt{a^2} = a$", "$\\sqrt{a^2} = -a$", "$\\sqrt{a^2}$ không có nghĩa", "$(\\sqrt{a})^2 = a$"],
          answer: 1,
          explain: "$a^2 > 0$ nên $\\sqrt{a^2}$ có nghĩa và không âm; vì $a < 0$ nên $-a > 0$ và $(-a)^2 = a^2$, do đó $\\sqrt{a^2} = -a$. Còn $\\sqrt{a}$ không có nghĩa khi $a < 0$."
        },
        {
          id: "d4q2", level: "vua", source: "SBT Bài 6 – BT 2.19",
          q: "Giá trị lớn nhất của biểu thức $5 - \\sqrt{x - 2}$ bằng",
          options: ["$5 - \\sqrt{2}$", "$5 + \\sqrt{2}$", "$5$", "$3$"],
          answer: 2,
          explain: "$\\sqrt{x - 2} \\ge 0$ nên $5 - \\sqrt{x - 2} \\le 5$; dấu \"=\" khi $x = 2$. Vậy giá trị lớn nhất là $5$."
        },
        {
          id: "d4q3", level: "kho", source: "SBT Bài 6 – BT 2.20",
          q: "Giá trị lớn nhất của biểu thức $\\frac{6}{2 + \\sqrt{3 - x}}$ bằng",
          options: ["$2$", "$\\frac{6}{5}$", "$6$", "$3$"],
          answer: 3,
          explain: "Tử $6 > 0$ không đổi, mẫu $2 + \\sqrt{3 - x} \\ge 2$ nên $\\frac{6}{2 + \\sqrt{3 - x}} \\le \\frac{6}{2} = 3$; dấu \"=\" khi $x = 3$."
        },
        {
          id: "d4q4", level: "kho", source: "SBT Bài 6 – BT 2.14",
          q: "Số $b = 0{,}70700700070000\\ldots$ (sau dấu phẩy viết liên tiếp các số $70;\\ 700;\\ 7000;\\ \\ldots$) là",
          options: ["số thập phân hữu hạn", "số thập phân vô hạn tuần hoàn", "số vô tỉ", "số nguyên"],
          answer: 2,
          explain: "Các nhóm chữ số 0 dài dần mãi nên không có chu kì nào lặp lại (nếu có chu kì thì chu kì phải toàn chữ số 0, vô lí). $b$ là số thập phân vô hạn không tuần hoàn, tức là số vô tỉ."
        },
        {
          id: "d4q5", level: "kho", source: "SBT Bài 6 – BT 2.21 (biến đổi)",
          q: "Có bao nhiêu số tự nhiên $n < 100$ sao cho $\\frac{\\sqrt{n} - 1}{2}$ là số nguyên?",
          options: ["$3$", "$5$", "$9$", "$4$"],
          answer: 1,
          explain: "Nếu $\\frac{\\sqrt{n} - 1}{2} = k$ nguyên thì $\\sqrt{n} = 2k + 1$ là số tự nhiên lẻ. Vì $n < 100$ nên $\\sqrt{n} < 10$, suy ra $\\sqrt{n} \\in \\{1; 3; 5; 7; 9\\}$, tức $n \\in \\{1; 9; 25; 49; 81\\}$ – có 5 số."
        },
        {
          id: "d4q6", level: "kho", source: "SBT Bài 6 – BT 2.17c",
          q: "Biết $\\sqrt{3} = 1{,}7320508\\ldots$ Làm tròn số $2 + \\sqrt{3}$ với độ chính xác $0{,}0005$, ta được",
          options: ["$3{,}73$", "$3{,}7321$", "$3{,}733$", "$3{,}732$"],
          answer: 3,
          explain: "$2 + \\sqrt{3} = 3{,}7320508\\ldots$ Độ chính xác $0{,}0005$ → làm tròn đến hàng phần nghìn; chữ số hàng phần chục nghìn là $0 < 5$ nên được $3{,}732$."
        },
        {
          id: "d4q7", level: "kho", source: "mới",
          q: "So sánh $\\sqrt{17} + \\sqrt{26}$ với $9$, ta được",
          options: ["$\\sqrt{17} + \\sqrt{26} < 9$", "$\\sqrt{17} + \\sqrt{26} > 9$", "$\\sqrt{17} + \\sqrt{26} = 9$", "$\\sqrt{17} + \\sqrt{26} = \\sqrt{43}$"],
          answer: 1,
          explain: "$4^2 = 16 < 17$ nên $\\sqrt{17} > 4$; $5^2 = 25 < 26$ nên $\\sqrt{26} > 5$. Do đó $\\sqrt{17} + \\sqrt{26} > 4 + 5 = 9$. (Lưu ý $\\sqrt{17} + \\sqrt{26} \\ne \\sqrt{43}$ vì $\\sqrt{43} < 7$.)"
        },
        {
          id: "d4q8", level: "kho", source: "SBT Bài 6 – Ví dụ 2",
          q: "Khẳng định nào sau đây đúng?",
          options: ["Tổng của hai số vô tỉ luôn là số vô tỉ", "Tích của hai số vô tỉ luôn là số vô tỉ", "Tổng của một số hữu tỉ và một số vô tỉ là số vô tỉ", "Thương của hai số vô tỉ luôn là số vô tỉ"],
          answer: 2,
          explain: "Nếu $q + x = r$ với $q, r$ hữu tỉ thì $x = r - q$ hữu tỉ – vô lí, nên số hữu tỉ cộng số vô tỉ là số vô tỉ. Các khẳng định khác sai: $\\sqrt{2} + (-\\sqrt{2}) = 0$; $\\sqrt{2} \\cdot \\sqrt{2} = 2$; $\\sqrt{2} : \\sqrt{2} = 1$."
        },
        {
          id: "d4q9", level: "kho", source: "SGK tr.29 – Hoạt động 1–3 (biến đổi)",
          q: "Một hình vuông có diện tích gấp đôi diện tích hình vuông cạnh $5$ cm. Cạnh của hình vuông đó (làm tròn đến hàng phần mười) là",
          options: ["$7{,}1$ cm", "$7{,}0$ cm", "$10$ cm", "$25$ cm"],
          answer: 0,
          explain: "Diện tích là $2 \\cdot 5^2 = 50$ (cm²), nên cạnh là $\\sqrt{50} = 7{,}071\\ldots \\approx 7{,}1$ (cm). (Gấp đôi diện tích không phải gấp đôi cạnh.)"
        },
        {
          id: "d4q10", level: "kho", source: "mới",
          q: "Có bao nhiêu số tự nhiên $n$ sao cho $\\sqrt{n} < 4$ và $\\sqrt{n}$ là số vô tỉ?",
          options: ["$12$", "$16$", "$15$", "$11$"],
          answer: 0,
          explain: "$\\sqrt{n} < 4$ khi $n < 16$, tức $n \\in \\{0; 1; \\ldots; 15\\}$ (16 số). Bỏ các số chính phương $0; 1; 4; 9$ (khi đó $\\sqrt{n}$ là số tự nhiên), còn $16 - 4 = 12$ số."
        }
      ],
      essay: [
        {
          id: "d4e1", level: "kho", source: "mới", maxPoints: 1.5,
          q: "Tìm số $x \\ge 0$, biết:<br>a) $\\sqrt{x} = 1{,}2$; &nbsp; b) $2\\sqrt{x} - 3 = 11$.",
          modelAnswer: "a) $\\sqrt{x} = 1{,}2$ nên $x = 1{,}2^2 = 1{,}44$.<br>" +
            "b) $2\\sqrt{x} = 11 + 3 = 14$, suy ra $\\sqrt{x} = 7$.<br>Do đó $x = 7^2 = 49$.",
          rubric: [
            { pts: 0.5, text: "Câu a: $x = 1{,}44$." },
            { pts: 0.5, text: "Câu b: chuyển vế, tìm được $\\sqrt{x} = 7$." },
            { pts: 0.5, text: "Câu b: kết luận $x = 49$." }
          ]
        },
        {
          id: "d4e2", level: "kho", source: "SBT Bài 6 – BT 2.18–2.20 (biến đổi)", maxPoints: 1.5,
          q: "a) Tìm giá trị nhỏ nhất của biểu thức $A = 2\\sqrt{x - 1} + 5$.<br>b) Tìm giá trị lớn nhất của biểu thức $B = \\frac{10}{4 + \\sqrt{x}}$.",
          modelAnswer: "a) Vì $\\sqrt{x - 1} \\ge 0$ nên $2\\sqrt{x - 1} \\ge 0$, suy ra $A \\ge 5$. Dấu \"=\" xảy ra khi $x - 1 = 0$, tức $x = 1$. Vậy giá trị nhỏ nhất của $A$ là $5$ (khi $x = 1$).<br>" +
            "b) Vì $\\sqrt{x} \\ge 0$ nên $4 + \\sqrt{x} \\ge 4 > 0$. Tử $10$ dương không đổi nên $B \\le \\frac{10}{4} = \\frac{5}{2}$. Dấu \"=\" khi $x = 0$. Vậy giá trị lớn nhất của $B$ là $\\frac{5}{2}$ (khi $x = 0$).",
          rubric: [
            { pts: 0.5, text: "Câu a: lập luận $\\sqrt{x - 1} \\ge 0$ nên $A \\ge 5$." },
            { pts: 0.25, text: "Câu a: chỉ ra dấu \"=\" khi $x = 1$, kết luận GTNN bằng 5." },
            { pts: 0.5, text: "Câu b: lập luận mẫu $4 + \\sqrt{x} \\ge 4$ nên $B \\le \\frac{10}{4}$." },
            { pts: 0.25, text: "Câu b: chỉ ra dấu \"=\" khi $x = 0$, kết luận GTLN bằng $\\frac{5}{2}$." }
          ]
        }
      ]
    }
  ]
});
