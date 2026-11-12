registerLesson({
  id: "c1-lt1",
  chapter: 1,
  kind: "review",
  title: "Luyện tập chung (Bài 1–2)",
  sgkPages: [14, 15],
  sbtPages: [7, 12],
  objectives: [
    "Ôn lại khái niệm số hữu tỉ, số đối, biểu diễn số hữu tỉ trên trục số",
    "So sánh và sắp xếp các số hữu tỉ (dạng phân số và số thập phân)",
    "Thực hiện thành thạo cộng, trừ, nhân, chia số hữu tỉ",
    "Vận dụng tính chất của các phép tính để tính nhanh, tính hợp lí",
    "Giải bài toán thực tế có sử dụng số hữu tỉ"
  ],

  theory: [
    { heading: "1. Số hữu tỉ và tập hợp $\\mathbb{Q}$",
      html: "Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z},\\ b \\ne 0$. Tập hợp các số hữu tỉ kí hiệu là $\\mathbb{Q}$.<br>" +
            "Mỗi số nguyên, mỗi số thập phân (như $-7$; $0{,}25$; $-1{,}6$) đều là số hữu tỉ. Các phân số bằng nhau cùng biểu diễn một số hữu tỉ, ví dụ $\\frac{-6}{8} = \\frac{-3}{4} = -0{,}75$." },
    { heading: "2. Trục số, số đối",
      html: "Mỗi số hữu tỉ được biểu diễn bởi một điểm trên trục số. Muốn biểu diễn $\\frac{a}{b}$ ($b > 0$), ta chia đoạn đơn vị thành $b$ phần bằng nhau rồi lấy $|a|$ phần về bên phải (nếu $a > 0$) hoặc bên trái (nếu $a < 0$) điểm $0$.<br>" +
            "Hai số hữu tỉ có điểm biểu diễn cách đều và nằm về hai phía của điểm $0$ gọi là hai <b>số đối</b> nhau. Số đối của $x$ là $-x$; ta có $-(-x) = x$. Số đối của $0$ là $0$." },
    { heading: "3. So sánh hai số hữu tỉ",
      html: "<ul><li>Đưa hai số về cùng dạng (cùng là phân số có mẫu dương, hoặc cùng là số thập phân) rồi so sánh.</li>" +
            "<li>Số hữu tỉ dương lớn hơn $0$; số hữu tỉ âm nhỏ hơn $0$; số âm luôn nhỏ hơn số dương. Số $0$ không là số hữu tỉ dương, cũng không là số hữu tỉ âm.</li>" +
            "<li>Trên trục số nằm ngang, nếu $a < b$ thì điểm $a$ nằm bên trái điểm $b$.</li>" +
            "<li>Tính chất bắc cầu: nếu $a < b$ và $b < c$ thì $a < c$.</li></ul>" },
    { heading: "4. Cộng, trừ, nhân, chia số hữu tỉ",
      html: "Viết các số hữu tỉ dưới dạng phân số rồi áp dụng quy tắc của phân số (hoặc tính trực tiếp nếu cả hai đều là số thập phân):" +
            "$$\\frac{a}{m} + \\frac{b}{m} = \\frac{a+b}{m};\\quad \\frac{a}{b}\\cdot\\frac{c}{d} = \\frac{a\\cdot c}{b\\cdot d};\\quad \\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b}\\cdot\\frac{d}{c}\\ (c \\ne 0).$$" +
            "Trừ một số là cộng với số đối của nó: $x - y = x + (-y)$. Chia cho một số khác $0$ là nhân với số nghịch đảo của nó." },
    { heading: "5. Tính chất của các phép tính",
      html: "<ul><li>Phép cộng và phép nhân có tính chất giao hoán, kết hợp; $x + 0 = x$; $x \\cdot 1 = x$; $x + (-x) = 0$.</li>" +
            "<li>Tính chất phân phối của phép nhân đối với phép cộng (trừ): $a\\cdot b + a\\cdot c = a\\cdot(b + c)$; $a\\cdot b - a\\cdot c = a\\cdot(b - c)$.</li>" +
            "<li>Tương tự với phép chia: $b : a + c : a = (b + c) : a$ ($a \\ne 0$).</li></ul>" }
  ],

  skills: [
    "Khi biểu thức có cả phân số và số thập phân, nên đổi tất cả về <b>cùng một dạng</b>. Phân số có mẫu là $2, 4, 5, 8, 10, 20, 25$ thì đổi ra số thập phân rất nhanh: $\\frac{3}{4} = 0{,}75$; $\\frac{7}{20} = 0{,}35$; $\\frac{5}{8} = 0{,}625$.",
    "Tính nhanh tổng nhiều số: dùng giao hoán và kết hợp để <b>nhóm các số có tổng tròn</b> (ra số nguyên hoặc bằng $0$), ví dụ $7{,}4 + (-0{,}7) + 2{,}5 + (-4{,}3) = (7{,}4 + 2{,}5) + [(-0{,}7) + (-4{,}3)] = 9{,}9 - 5 = 4{,}9$.",
    "Thấy các tích có <b>thừa số chung</b> thì đặt thừa số chung ra ngoài: $\\frac{3}{2}\\cdot\\left(-\\frac{37}{10}\\right) + \\frac{17}{2}\\cdot\\left(-\\frac{37}{10}\\right) = \\left(\\frac{3}{2} + \\frac{17}{2}\\right)\\cdot\\left(-\\frac{37}{10}\\right) = 10\\cdot\\left(-\\frac{37}{10}\\right) = -37$.",
    "Biểu thức chỉ có nhân và chia thì làm <b>lần lượt từ trái sang phải</b>; không được tự ý nhân trước rồi chia sau.",
    "Lỗi hay gặp: cộng tử với tử, mẫu với mẫu ($\\frac{-3}{4} + \\frac{1}{2} \\ne \\frac{-2}{6}$); quên đổi dấu khi trừ số âm ($\\frac{5}{6} - \\left(-\\frac{1}{4}\\right) = \\frac{5}{6} + \\frac{1}{4}$); chia phân số mà quên đảo ngược số chia.",
    "So sánh hai số âm: số nào có phần số (không kể dấu) lớn hơn thì số đó <b>nhỏ hơn</b>. Ví dụ $8{,}29 > 8{,}25$ nên $-8{,}29 < -8{,}25$."
  ],

  examples: [
    { q: "Tính một cách hợp lí: $A = \\frac{9}{4} + (-0{,}35) + 1{,}75 + \\left(-\\frac{13}{20}\\right)$.",
      solution: "Đổi các phân số ra số thập phân: $\\frac{9}{4} = 2{,}25$; $\\frac{13}{20} = 0{,}65$.<br>" +
                "$A = 2{,}25 + (-0{,}35) + 1{,}75 + (-0{,}65)$<br>" +
                "$\\phantom{A} = (2{,}25 + 1{,}75) + [(-0{,}35) + (-0{,}65)]$<br>" +
                "$\\phantom{A} = 4 + (-1) = 3$." },
    { q: "Sắp xếp các số sau theo thứ tự tăng dần: $-\\frac{5}{6};\\ 0{,}6;\\ -0{,}8;\\ \\frac{2}{3}$.",
      solution: "Hai số âm: $-0{,}8 = -\\frac{4}{5} = -\\frac{24}{30}$ và $-\\frac{5}{6} = -\\frac{25}{30}$. Vì $\\frac{25}{30} > \\frac{24}{30}$ nên $-\\frac{5}{6} < -0{,}8$.<br>" +
                "Hai số dương: $0{,}6 = \\frac{3}{5} = \\frac{9}{15}$ và $\\frac{2}{3} = \\frac{10}{15}$ nên $0{,}6 < \\frac{2}{3}$.<br>" +
                "Số âm luôn nhỏ hơn số dương, do đó: $-\\frac{5}{6} < -0{,}8 < 0{,}6 < \\frac{2}{3}$." },
    { q: "Tìm $x$, biết: $\\frac{3}{5}x - \\frac{1}{2} = -\\frac{4}{5}$.",
      solution: "$\\frac{3}{5}x$ là số bị trừ nên $\\frac{3}{5}x = -\\frac{4}{5} + \\frac{1}{2} = \\frac{-8 + 5}{10} = -\\frac{3}{10}$.<br>" +
                "Suy ra $x = -\\frac{3}{10} : \\frac{3}{5} = -\\frac{3}{10}\\cdot\\frac{5}{3} = -\\frac{1}{2}$.<br>" +
                "Thử lại: $\\frac{3}{5}\\cdot\\left(-\\frac{1}{2}\\right) - \\frac{1}{2} = -\\frac{3}{10} - \\frac{5}{10} = -\\frac{8}{10} = -\\frac{4}{5}$ (đúng). Vậy $x = -\\frac{1}{2}$." }
  ],

  sets: [
    /* ======================= ĐỀ 1 ======================= */
    { id: "d1", name: "Đề 1",
      mcq: [
        { id: "d1q1", level: "de", source: "SBT Bài 1 – BT 1.2",
          q: "Khẳng định nào sau đây là <b>đúng</b>?",
          options: ["$-\\frac{2}{3} \\in \\mathbb{Z}$", "$0{,}5 \\in \\mathbb{Q}$", "$-7 \\notin \\mathbb{Q}$", "$\\frac{4}{-9} \\in \\mathbb{N}$"],
          answer: 1,
          explain: "$0{,}5 = \\frac{1}{2}$ là số hữu tỉ. $-\\frac{2}{3}$ không là số nguyên, $-7 = \\frac{-7}{1} \\in \\mathbb{Q}$, còn $\\frac{4}{-9} < 0$ không là số tự nhiên." },
        { id: "d1q2", level: "de", source: "mới",
          q: "Số đối của $-\\frac{5}{8}$ là",
          options: ["$\\frac{5}{8}$", "$-\\frac{5}{8}$", "$\\frac{8}{5}$", "$-\\frac{8}{5}$"],
          answer: 0,
          explain: "Số đối của $-x$ là $x$, nên số đối của $-\\frac{5}{8}$ là $\\frac{5}{8}$. ($-\\frac{8}{5}$ là số nghịch đảo, không phải số đối.)" },
        { id: "d1q3", level: "de", source: "mới",
          q: "Số thập phân $1{,}75$ viết dưới dạng phân số tối giản là",
          options: ["$\\frac{7}{5}$", "$\\frac{175}{100}$", "$\\frac{4}{7}$", "$\\frac{7}{4}$"],
          answer: 3,
          explain: "$1{,}75 = \\frac{175}{100} = \\frac{7}{4}$. Phân số $\\frac{175}{100}$ đúng giá trị nhưng chưa tối giản." },
        { id: "d1q4", level: "de", source: "mới",
          q: "Kết quả của phép tính $-\\frac{3}{4} + \\frac{1}{2}$ là",
          options: ["$\\frac{1}{4}$", "$-\\frac{5}{4}$", "$-\\frac{1}{4}$", "$-\\frac{2}{6}$"],
          answer: 2,
          explain: "$-\\frac{3}{4} + \\frac{2}{4} = -\\frac{1}{4}$. Không được cộng tử với tử, mẫu với mẫu." },
        { id: "d1q5", level: "vua", source: "SGK Luyện tập chung tr.14 – BT 1.12",
          q: "Khẳng định nào sau đây là đúng?",
          options: ["$\\frac{-58}{7} > -8{,}25$", "$\\frac{-58}{7} < -8{,}25$", "$\\frac{-58}{7} = -8{,}25$", "$\\frac{-58}{7} > 0$"],
          answer: 1,
          explain: "$\\frac{58}{7} = 8\\frac{2}{7} \\approx 8{,}29 > 8{,}25$ nên $\\frac{-58}{7} < -8{,}25$ (số âm có phần số lớn hơn thì nhỏ hơn)." },
        { id: "d1q6", level: "vua", source: "mới",
          q: "Kết quả của phép tính $\\frac{2}{5} : \\left(-\\frac{4}{15}\\right)$ là",
          options: ["$-\\frac{8}{75}$", "$\\frac{3}{2}$", "$-\\frac{2}{3}$", "$-\\frac{3}{2}$"],
          answer: 3,
          explain: "$\\frac{2}{5}\\cdot\\left(-\\frac{15}{4}\\right) = -\\frac{30}{20} = -\\frac{3}{2}$. Đáp án $-\\frac{8}{75}$ là do nhân mà quên đảo ngược số chia." },
        { id: "d1q7", level: "vua", source: "SGK Luyện tập chung tr.14 – Ví dụ 1b",
          q: "Giá trị của biểu thức $\\frac{4}{9}\\cdot\\frac{-7}{5} + \\frac{4}{9}\\cdot\\frac{-3}{5}$ là",
          options: ["$-\\frac{8}{9}$", "$\\frac{8}{9}$", "$-\\frac{4}{9}$", "$-\\frac{8}{45}$"],
          answer: 0,
          explain: "Đặt thừa số chung: $\\frac{4}{9}\\cdot\\left(\\frac{-7}{5} + \\frac{-3}{5}\\right) = \\frac{4}{9}\\cdot(-2) = -\\frac{8}{9}$." },
        { id: "d1q8", level: "vua", source: "SGK Luyện tập chung tr.15 – BT 1.14",
          q: "Buổi sáng nhiệt độ ở một thị trấn vùng núi là $-2{,}5^\\circ\\mathrm{C}$. Đến trưa nhiệt độ tăng thêm $6{,}3^\\circ\\mathrm{C}$, đến tối lại giảm $4{,}1^\\circ\\mathrm{C}$ so với buổi trưa. Nhiệt độ buổi tối là",
          options: ["$0{,}3^\\circ\\mathrm{C}$", "$-12{,}9^\\circ\\mathrm{C}$", "$-0{,}3^\\circ\\mathrm{C}$", "$7{,}9^\\circ\\mathrm{C}$"],
          answer: 2,
          explain: "$-2{,}5 + 6{,}3 - 4{,}1 = 3{,}8 - 4{,}1 = -0{,}3\\ (^\\circ\\mathrm{C})$." },
        { id: "d1q9", level: "vua", source: "mới",
          q: "Số $x$ thỏa mãn $x + \\frac{1}{3} = -\\frac{1}{2}$ là",
          options: ["$x = -\\frac{1}{6}$", "$x = -\\frac{5}{6}$", "$x = \\frac{5}{6}$", "$x = \\frac{1}{6}$"],
          answer: 1,
          explain: "$x = -\\frac{1}{2} - \\frac{1}{3} = -\\frac{3}{6} - \\frac{2}{6} = -\\frac{5}{6}$." },
        { id: "d1q10", level: "kho", source: "SGK Luyện tập chung tr.15 – BT 1.16",
          q: "Giá trị của biểu thức $A = \\left(3 - \\frac{1}{4} - \\frac{1}{2}\\right) : \\left(1 - \\frac{5}{4} - \\frac{1}{2}\\right)$ là",
          options: ["$3$", "$-\\frac{27}{16}$", "$-\\frac{1}{3}$", "$-3$"],
          answer: 3,
          explain: "$3 - \\frac{1}{4} - \\frac{1}{2} = \\frac{9}{4}$; $1 - \\frac{5}{4} - \\frac{1}{2} = -\\frac{3}{4}$. Vậy $A = \\frac{9}{4} : \\left(-\\frac{3}{4}\\right) = -3$." },
        { id: "d1q11", level: "kho", source: "mới",
          q: "Số $x$ thỏa mãn $\\frac{3}{4} - \\frac{1}{2}x = -\\frac{5}{8}$ là",
          options: ["$x = \\frac{11}{4}$", "$x = \\frac{11}{16}$", "$x = \\frac{1}{4}$", "$x = -\\frac{11}{4}$"],
          answer: 0,
          explain: "$\\frac{1}{2}x = \\frac{3}{4} + \\frac{5}{8} = \\frac{11}{8}$, suy ra $x = \\frac{11}{8} : \\frac{1}{2} = \\frac{11}{4}$." }
      ],
      essay: [
        { id: "d1e1", level: "vua", source: "SGK Luyện tập chung tr.14 – Ví dụ 1", maxPoints: 1.5,
          q: "Tính một cách hợp lí: $A = \\frac{5}{7}\\cdot\\frac{-3}{8} + \\frac{5}{7}\\cdot\\frac{-5}{8} + 1\\frac{5}{7}$.",
          modelAnswer: "$A = \\frac{5}{7}\\cdot\\left(\\frac{-3}{8} + \\frac{-5}{8}\\right) + 1\\frac{5}{7}$ (đặt thừa số chung $\\frac{5}{7}$)<br>" +
                       "$\\phantom{A} = \\frac{5}{7}\\cdot\\frac{-8}{8} + \\frac{12}{7} = \\frac{5}{7}\\cdot(-1) + \\frac{12}{7}$<br>" +
                       "$\\phantom{A} = \\frac{-5 + 12}{7} = \\frac{7}{7} = 1$.",
          rubric: [
            { pts: 0.5, text: "Đặt thừa số chung $\\frac{5}{7}$ đúng." },
            { pts: 0.5, text: "Tính đúng $\\frac{-3}{8} + \\frac{-5}{8} = -1$ và đổi $1\\frac{5}{7} = \\frac{12}{7}$." },
            { pts: 0.5, text: "Kết quả đúng $A = 1$." }
          ] },
        { id: "d1e2", level: "kho", source: "mới", maxPoints: 1.5,
          q: "Bạn An có $120\\,000$ đồng. An dùng $\\frac{2}{5}$ số tiền đó để mua sách, sau đó dùng $\\frac{1}{4}$ số tiền <b>còn lại</b> để mua bút. Hỏi An còn lại bao nhiêu tiền?",
          modelAnswer: "Số tiền An mua sách: $120\\,000\\cdot\\frac{2}{5} = 48\\,000$ (đồng).<br>" +
                       "Số tiền còn lại sau khi mua sách: $120\\,000 - 48\\,000 = 72\\,000$ (đồng).<br>" +
                       "Số tiền mua bút: $72\\,000\\cdot\\frac{1}{4} = 18\\,000$ (đồng).<br>" +
                       "Số tiền An còn lại: $72\\,000 - 18\\,000 = 54\\,000$ (đồng).<br>" +
                       "Vậy An còn lại $54\\,000$ đồng.",
          rubric: [
            { pts: 0.5, text: "Tính đúng tiền mua sách $48\\,000$ đồng và số tiền còn lại $72\\,000$ đồng." },
            { pts: 0.5, text: "Tính đúng tiền mua bút $18\\,000$ đồng (lấy $\\frac{1}{4}$ của số tiền còn lại, không phải của $120\\,000$)." },
            { pts: 0.5, text: "Kết luận đúng: còn lại $54\\,000$ đồng." }
          ] }
      ] },

    /* ======================= ĐỀ 2 ======================= */
    { id: "d2", name: "Đề 2",
      mcq: [
        { id: "d2q1", level: "de", source: "SBT Bài 1 – BT 1.3",
          q: "Cách viết nào sau đây <b>không</b> biểu diễn một số hữu tỉ?",
          options: ["$-2{,}5$", "$0$", "$\\frac{3}{0}$", "$1\\frac{1}{2}$"],
          answer: 2,
          explain: "Phân số phải có mẫu khác $0$, nên $\\frac{3}{0}$ không có nghĩa, không là số hữu tỉ." },
        { id: "d2q2", level: "de", source: "mới",
          q: "Trên trục số nằm ngang, điểm biểu diễn số $-\\frac{3}{4}$ nằm ở đâu?",
          options: ["Bên trái điểm $0$, cách điểm $0$ một khoảng $\\frac{3}{4}$ đơn vị", "Bên phải điểm $0$, cách điểm $0$ một khoảng $\\frac{3}{4}$ đơn vị", "Bên trái điểm $-1$", "Giữa điểm $0$ và điểm $1$"],
          answer: 0,
          explain: "$-\\frac{3}{4} < 0$ nên nằm bên trái điểm $0$, cách $0$ đúng $\\frac{3}{4}$ đơn vị; vì $-1 < -\\frac{3}{4}$ nên nó nằm bên phải điểm $-1$." },
        { id: "d2q3", level: "de", source: "mới",
          q: "Số đối của $\\frac{-2}{-7}$ là",
          options: ["$\\frac{2}{7}$", "$-\\frac{7}{2}$", "$\\frac{7}{2}$", "$-\\frac{2}{7}$"],
          answer: 3,
          explain: "$\\frac{-2}{-7} = \\frac{2}{7}$ nên số đối của nó là $-\\frac{2}{7}$." },
        { id: "d2q4", level: "de", source: "mới",
          q: "Kết quả của phép tính $(-0{,}4)\\cdot 2{,}5$ là",
          options: ["$1$", "$-1$", "$-10$", "$-0{,}1$"],
          answer: 1,
          explain: "$0{,}4\\cdot 2{,}5 = 1$, hai số khác dấu nên tích âm: $-1$." },
        { id: "d2q5", level: "vua", source: "SGK Luyện tập chung tr.14 – Ví dụ 2",
          q: "Các số $-\\frac{1}{2};\\ 0{,}3;\\ -0{,}75;\\ \\frac{1}{4}$ được sắp xếp theo thứ tự tăng dần là",
          options: ["$-\\frac{1}{2};\\ -0{,}75;\\ \\frac{1}{4};\\ 0{,}3$", "$-0{,}75;\\ -\\frac{1}{2};\\ 0{,}3;\\ \\frac{1}{4}$", "$-0{,}75;\\ -\\frac{1}{2};\\ \\frac{1}{4};\\ 0{,}3$", "$0{,}3;\\ \\frac{1}{4};\\ -\\frac{1}{2};\\ -0{,}75$"],
          answer: 2,
          explain: "Đổi ra số thập phân: $-0{,}75 < -0{,}5 < 0{,}25 < 0{,}3$." },
        { id: "d2q6", level: "vua", source: "mới",
          q: "Kết quả của phép tính $\\frac{5}{6} - \\left(-\\frac{1}{4}\\right)$ là",
          options: ["$\\frac{7}{12}$", "$\\frac{13}{12}$", "$\\frac{6}{10}$", "$-\\frac{13}{12}$"],
          answer: 1,
          explain: "Trừ một số âm là cộng số đối: $\\frac{5}{6} + \\frac{1}{4} = \\frac{10}{12} + \\frac{3}{12} = \\frac{13}{12}$." },
        { id: "d2q7", level: "vua", source: "SGK Luyện tập chung tr.15 – BT 1.14",
          q: "Cùng một ngày, nhiệt độ thấp nhất ở đỉnh Mẫu Sơn là $-1{,}2^\\circ\\mathrm{C}$, còn ở Hà Nội là $14{,}5^\\circ\\mathrm{C}$ (số liệu giả định). Nhiệt độ ở Hà Nội cao hơn ở Mẫu Sơn bao nhiêu độ?",
          options: ["$13{,}3^\\circ\\mathrm{C}$", "$-15{,}7^\\circ\\mathrm{C}$", "$16{,}7^\\circ\\mathrm{C}$", "$15{,}7^\\circ\\mathrm{C}$"],
          answer: 3,
          explain: "$14{,}5 - (-1{,}2) = 14{,}5 + 1{,}2 = 15{,}7\\ (^\\circ\\mathrm{C})$." },
        { id: "d2q8", level: "vua", source: "mới",
          q: "Giá trị của biểu thức $\\left(-\\frac{3}{4}\\right) : \\frac{9}{8}\\cdot\\frac{1}{2}$ là",
          options: ["$-\\frac{1}{3}$", "$-\\frac{4}{3}$", "$\\frac{1}{3}$", "$-\\frac{27}{64}$"],
          answer: 0,
          explain: "Làm từ trái sang phải: $-\\frac{3}{4}\\cdot\\frac{8}{9} = -\\frac{2}{3}$; rồi $-\\frac{2}{3}\\cdot\\frac{1}{2} = -\\frac{1}{3}$. Đáp án $-\\frac{4}{3}$ là do nhân trước rồi mới chia." },
        { id: "d2q9", level: "vua", source: "mới",
          q: "Số $x$ thỏa mãn $\\frac{2}{3}x = -\\frac{4}{9}$ là",
          options: ["$x = -\\frac{8}{27}$", "$x = \\frac{2}{3}$", "$x = -\\frac{2}{3}$", "$x = -\\frac{3}{2}$"],
          answer: 2,
          explain: "$x = -\\frac{4}{9} : \\frac{2}{3} = -\\frac{4}{9}\\cdot\\frac{3}{2} = -\\frac{2}{3}$." },
        { id: "d2q10", level: "kho", source: "SGK Luyện tập chung tr.15 – BT 1.17",
          q: "Tính hợp lí: $1{,}5\\cdot\\frac{7}{3} + \\frac{4}{5}\\cdot\\frac{-9}{8} - 1{,}5\\cdot\\frac{4}{3} - \\frac{4}{5}\\cdot\\frac{-1}{8}$. Kết quả là",
          options: ["$2{,}3$", "$0{,}5$", "$-0{,}7$", "$0{,}7$"],
          answer: 3,
          explain: "$= 1{,}5\\cdot\\left(\\frac{7}{3} - \\frac{4}{3}\\right) + \\frac{4}{5}\\cdot\\left(\\frac{-9}{8} - \\frac{-1}{8}\\right) = 1{,}5\\cdot 1 + \\frac{4}{5}\\cdot(-1) = 1{,}5 - 0{,}8 = 0{,}7$." },
        { id: "d2q11", level: "kho", source: "mới",
          q: "Tập hợp các số $x$ thỏa mãn $\\left(x - \\frac{1}{2}\\right)\\cdot\\left(x + \\frac{2}{3}\\right) = 0$ là",
          options: ["$\\left\\{-\\frac{1}{2};\\ \\frac{2}{3}\\right\\}$", "$\\left\\{\\frac{1}{2};\\ -\\frac{2}{3}\\right\\}$", "$\\left\\{\\frac{1}{2}\\right\\}$", "$\\left\\{\\frac{1}{2};\\ \\frac{2}{3}\\right\\}$"],
          answer: 1,
          explain: "Tích bằng $0$ khi có một thừa số bằng $0$: $x - \\frac{1}{2} = 0 \\Rightarrow x = \\frac{1}{2}$ hoặc $x + \\frac{2}{3} = 0 \\Rightarrow x = -\\frac{2}{3}$." }
      ],
      essay: [
        { id: "d2e1", level: "vua", source: "SGK Luyện tập chung tr.15 – BT 1.16", maxPoints: 1,
          q: "Tính giá trị của biểu thức $B = 4 - \\dfrac{1 + \\frac{1}{4}}{1 - \\frac{1}{4}}$.",
          modelAnswer: "Tử số: $1 + \\frac{1}{4} = \\frac{5}{4}$. Mẫu số: $1 - \\frac{1}{4} = \\frac{3}{4}$.<br>" +
                       "Thương: $\\frac{5}{4} : \\frac{3}{4} = \\frac{5}{4}\\cdot\\frac{4}{3} = \\frac{5}{3}$.<br>" +
                       "$B = 4 - \\frac{5}{3} = \\frac{12}{3} - \\frac{5}{3} = \\frac{7}{3}$.",
          rubric: [
            { pts: 0.5, text: "Tính đúng tử $\\frac{5}{4}$ và mẫu $\\frac{3}{4}$." },
            { pts: 0.25, text: "Tính đúng thương $\\frac{5}{3}$." },
            { pts: 0.25, text: "Kết quả đúng $B = \\frac{7}{3}$ (hoặc $2\\frac{1}{3}$)." }
          ] },
        { id: "d2e2", level: "kho", source: "mới", maxPoints: 2,
          q: "Một mảnh vườn hình chữ nhật có chiều dài $12{,}5$ m, chiều rộng bằng $\\frac{3}{5}$ chiều dài. Người ta dùng $\\frac{2}{5}$ diện tích mảnh vườn để trồng rau, phần còn lại trồng hoa. Tính diện tích phần trồng hoa.",
          modelAnswer: "Chiều rộng mảnh vườn: $12{,}5\\cdot\\frac{3}{5} = 7{,}5$ (m).<br>" +
                       "Diện tích mảnh vườn: $12{,}5\\cdot 7{,}5 = 93{,}75\\ (\\mathrm{m}^2)$.<br>" +
                       "Diện tích trồng rau: $93{,}75\\cdot\\frac{2}{5} = 37{,}5\\ (\\mathrm{m}^2)$.<br>" +
                       "Diện tích trồng hoa: $93{,}75 - 37{,}5 = 56{,}25\\ (\\mathrm{m}^2)$.<br>" +
                       "(Cách khác: diện tích trồng hoa bằng $1 - \\frac{2}{5} = \\frac{3}{5}$ diện tích vườn: $93{,}75\\cdot\\frac{3}{5} = 56{,}25\\ \\mathrm{m}^2$.)",
          rubric: [
            { pts: 0.5, text: "Tính đúng chiều rộng $7{,}5$ m." },
            { pts: 0.5, text: "Tính đúng diện tích mảnh vườn $93{,}75\\ \\mathrm{m}^2$." },
            { pts: 0.5, text: "Tính đúng diện tích trồng rau $37{,}5\\ \\mathrm{m}^2$ (hoặc tìm đúng phân số $\\frac{3}{5}$ ứng với phần trồng hoa)." },
            { pts: 0.5, text: "Kết quả đúng: diện tích trồng hoa $56{,}25\\ \\mathrm{m}^2$, có đơn vị." }
          ] }
      ] },

    /* ======================= ĐỀ 3 ======================= */
    { id: "d3", name: "Đề 3",
      mcq: [
        { id: "d3q1", level: "de", source: "SBT Bài 1 – BT 1.1",
          q: "Khẳng định nào sau đây là <b>đúng</b>?",
          options: ["Số $0$ là số hữu tỉ dương", "Số nguyên âm không phải là số hữu tỉ âm", "Số hữu tỉ âm nhỏ hơn mọi số tự nhiên", "Tập hợp $\\mathbb{Q}$ chỉ gồm các số hữu tỉ dương và các số hữu tỉ âm"],
          answer: 2,
          explain: "Số hữu tỉ âm nhỏ hơn $0$, mà mọi số tự nhiên đều $\\ge 0$. Số $0$ không dương cũng không âm, và $\\mathbb{Q}$ còn chứa số $0$." },
        { id: "d3q2", level: "de", source: "mới",
          q: "Phân số nào sau đây biểu diễn cùng một số hữu tỉ với $\\frac{-6}{8}$?",
          options: ["$\\frac{3}{4}$", "$\\frac{-3}{8}$", "$\\frac{-12}{8}$", "$\\frac{-9}{12}$"],
          answer: 3,
          explain: "$\\frac{-6}{8} = \\frac{-3}{4} = \\frac{-9}{12}$." },
        { id: "d3q3", level: "de", source: "mới",
          q: "Số lớn nhất trong các số $-\\frac{1}{3};\\ -0{,}5;\\ -\\frac{1}{4};\\ -1$ là",
          options: ["$-\\frac{1}{4}$", "$-\\frac{1}{3}$", "$-0{,}5$", "$-1$"],
          answer: 0,
          explain: "Các số đều âm; số có phần số nhỏ nhất là lớn nhất. Vì $\\frac{1}{4} < \\frac{1}{3} < 0{,}5 < 1$ nên $-\\frac{1}{4}$ lớn nhất." },
        { id: "d3q4", level: "de", source: "mới",
          q: "Kết quả của phép tính $-1{,}2 + 3{,}5$ là",
          options: ["$-2{,}3$", "$2{,}3$", "$4{,}7$", "$-4{,}7$"],
          answer: 1,
          explain: "Hai số khác dấu: $3{,}5 - 1{,}2 = 2{,}3$, lấy dấu của số có phần số lớn hơn ($3{,}5$) nên kết quả dương." },
        { id: "d3q5", level: "vua", source: "SBT Bài 1 – BT 1.8",
          q: "Phân số nào có mẫu bằng $6$, lớn hơn $-\\frac{1}{2}$ và nhỏ hơn $\\frac{1}{3}$?",
          options: ["$\\frac{-4}{6}$", "$\\frac{-3}{6}$", "$\\frac{-1}{6}$", "$\\frac{2}{6}$"],
          answer: 2,
          explain: "$-\\frac{1}{2} = \\frac{-3}{6}$ và $\\frac{1}{3} = \\frac{2}{6}$. Cần $-3 < a < 2$; trong các phương án chỉ có $\\frac{-1}{6}$ thỏa mãn ($\\frac{-3}{6}$ và $\\frac{2}{6}$ là bằng, không phải lớn hơn/nhỏ hơn)." },
        { id: "d3q6", level: "vua", source: "mới",
          q: "Kết quả của phép tính $\\frac{-5}{12} + \\frac{3}{8}$ là",
          options: ["$\\frac{-2}{20}$", "$\\frac{1}{24}$", "$-\\frac{19}{24}$", "$-\\frac{1}{24}$"],
          answer: 3,
          explain: "Mẫu chung $24$: $\\frac{-10}{24} + \\frac{9}{24} = -\\frac{1}{24}$." },
        { id: "d3q7", level: "vua", source: "mới",
          q: "Giá trị của biểu thức $(-0{,}25)\\cdot\\left(-\\frac{8}{5}\\right) : \\frac{2}{5}$ là",
          options: ["$1$", "$-1$", "$\\frac{4}{25}$", "$-\\frac{4}{25}$"],
          answer: 0,
          explain: "$(-0{,}25)\\cdot\\left(-\\frac{8}{5}\\right) = \\frac{1}{4}\\cdot\\frac{8}{5} = \\frac{2}{5}$; $\\frac{2}{5} : \\frac{2}{5} = 1$." },
        { id: "d3q8", level: "vua", source: "mới",
          q: "Một chai nước chứa $1{,}5$ lít. Mai rót ra $4$ cốc, mỗi cốc $\\frac{1}{5}$ lít. Trong chai còn lại bao nhiêu lít nước?",
          options: ["$1{,}3$ lít", "$0{,}7$ lít", "$0{,}8$ lít", "$2{,}3$ lít"],
          answer: 1,
          explain: "Đã rót $4\\cdot\\frac{1}{5} = 0{,}8$ (lít). Còn lại $1{,}5 - 0{,}8 = 0{,}7$ (lít)." },
        { id: "d3q9", level: "vua", source: "mới",
          q: "Số $x$ thỏa mãn $x - \\frac{3}{4} = -\\frac{1}{6}$ là",
          options: ["$x = -\\frac{11}{12}$", "$x = -\\frac{7}{12}$", "$x = \\frac{7}{12}$", "$x = \\frac{11}{12}$"],
          answer: 2,
          explain: "$x = -\\frac{1}{6} + \\frac{3}{4} = -\\frac{2}{12} + \\frac{9}{12} = \\frac{7}{12}$." },
        { id: "d3q10", level: "kho", source: "SBT Bài 2 – Ví dụ 1c",
          q: "Giá trị của biểu thức $\\left(\\frac{1}{5} - \\frac{5}{6}\\right) : \\frac{2}{3} + \\left(\\frac{9}{5} - \\frac{1}{6}\\right) : \\frac{2}{3}$ là",
          options: ["$\\frac{2}{3}$", "$-\\frac{3}{2}$", "$1$", "$\\frac{3}{2}$"],
          answer: 3,
          explain: "$= \\left(\\frac{1}{5} - \\frac{5}{6} + \\frac{9}{5} - \\frac{1}{6}\\right) : \\frac{2}{3} = \\left[\\left(\\frac{1}{5} + \\frac{9}{5}\\right) - \\left(\\frac{5}{6} + \\frac{1}{6}\\right)\\right] : \\frac{2}{3} = (2 - 1)\\cdot\\frac{3}{2} = \\frac{3}{2}$." },
        { id: "d3q11", level: "kho", source: "mới",
          q: "Có bao nhiêu số nguyên $x$ thỏa mãn $-\\frac{7}{3} < x < \\frac{9}{4}$?",
          options: ["$4$", "$5$", "$6$", "$3$"],
          answer: 1,
          explain: "$-\\frac{7}{3} = -2\\frac{1}{3}$ và $\\frac{9}{4} = 2\\frac{1}{4}$, nên $x \\in \\{-2; -1; 0; 1; 2\\}$: có $5$ số." }
      ],
      essay: [
        { id: "d3e1", level: "vua", source: "SGK Luyện tập chung tr.15 – BT 1.13", maxPoints: 1.5,
          q: "Nhiệt độ thấp nhất trong một ngày mùa đông ở năm thành phố như sau (số liệu giả định): Ô-xlô $-7{,}2^\\circ\\mathrm{C}$; Mát-xcơ-va $-9{,}5^\\circ\\mathrm{C}$; Bắc Kinh $-3{,}8^\\circ\\mathrm{C}$; Hà Nội $12{,}6^\\circ\\mathrm{C}$; Xơ-un $-6{,}4^\\circ\\mathrm{C}$.<br>a) Những thành phố nào có nhiệt độ thấp hơn Xơ-un?<br>b) Sắp xếp các thành phố theo thứ tự nhiệt độ tăng dần.",
          modelAnswer: "a) So sánh với $-6{,}4$: ta có $9{,}5 > 6{,}4$ và $7{,}2 > 6{,}4$ nên $-9{,}5 < -6{,}4$ và $-7{,}2 < -6{,}4$. Còn $-3{,}8 > -6{,}4$ và $12{,}6 > -6{,}4$.<br>" +
                       "Vậy Mát-xcơ-va và Ô-xlô có nhiệt độ thấp hơn Xơ-un.<br>" +
                       "b) $-9{,}5 < -7{,}2 < -6{,}4 < -3{,}8 < 12{,}6$.<br>" +
                       "Thứ tự tăng dần: Mát-xcơ-va, Ô-xlô, Xơ-un, Bắc Kinh, Hà Nội.",
          rubric: [
            { pts: 0.5, text: "a) Chỉ ra đúng hai thành phố Mát-xcơ-va và Ô-xlô (có so sánh)." },
            { pts: 0.5, text: "b) Sắp xếp đúng các số $-9{,}5 < -7{,}2 < -6{,}4 < -3{,}8 < 12{,}6$." },
            { pts: 0.5, text: "b) Kết luận đúng thứ tự tên các thành phố." }
          ] },
        { id: "d3e2", level: "kho", source: "mới", maxPoints: 1.5,
          q: "Tìm $x$, biết: $\\frac{2}{3} - \\frac{1}{3}\\cdot\\left(x - \\frac{3}{2}\\right) = \\frac{1}{2}$.",
          modelAnswer: "$\\frac{1}{3}\\cdot\\left(x - \\frac{3}{2}\\right)$ là số trừ nên $\\frac{1}{3}\\cdot\\left(x - \\frac{3}{2}\\right) = \\frac{2}{3} - \\frac{1}{2} = \\frac{1}{6}$.<br>" +
                       "Suy ra $x - \\frac{3}{2} = \\frac{1}{6} : \\frac{1}{3} = \\frac{1}{6}\\cdot 3 = \\frac{1}{2}$.<br>" +
                       "Do đó $x = \\frac{1}{2} + \\frac{3}{2} = 2$.<br>" +
                       "Vậy $x = 2$.",
          rubric: [
            { pts: 0.5, text: "Tìm đúng $\\frac{1}{3}\\cdot\\left(x - \\frac{3}{2}\\right) = \\frac{1}{6}$." },
            { pts: 0.5, text: "Tìm đúng $x - \\frac{3}{2} = \\frac{1}{2}$." },
            { pts: 0.5, text: "Kết quả đúng $x = 2$." }
          ] }
      ] }
  ]
});
