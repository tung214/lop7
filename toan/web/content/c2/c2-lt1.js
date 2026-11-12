(function () {
  // Trục số bằng SVG (giống c1-b01). o = { min, max, div, labels: [[giá trị, "nhãn"]], pts: [[giá trị, "tên"]] }
  function axis(o) {
    var W = o.w || 360, H = 70, y = 36, pad = 24;
    var x = function (v) { return (pad + (v - o.min) / (o.max - o.min) * (W - 2 * pad)).toFixed(1); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:6px auto" role="img" aria-label="Trục số">';
    s += '<line x1="6" y1="' + y + '" x2="' + (W - 6) + '" y2="' + y + '" stroke="currentColor" stroke-width="1.5"/>';
    s += '<path d="M' + (W - 4) + ' ' + y + ' l-9 -4.5 v9 z" fill="currentColor"/>';
    for (var k = Math.round(o.min * o.div); k <= Math.round(o.max * o.div); k++) {
      var h = (k % o.div === 0) ? 7 : 4;
      var xx = x(k / o.div);
      s += '<line x1="' + xx + '" y1="' + (y - h) + '" x2="' + xx + '" y2="' + (y + h) + '" stroke="currentColor" stroke-width="1.2"/>';
    }
    (o.labels || []).forEach(function (l) {
      s += '<text x="' + x(l[0]) + '" y="' + (y + 24) + '" font-size="13" text-anchor="middle" fill="currentColor">' + l[1] + '</text>';
    });
    (o.pts || []).forEach(function (p) {
      var xx = x(p[0]);
      s += '<circle cx="' + xx + '" cy="' + y + '" r="4" fill="#e5484d"/>';
      s += '<text x="' + xx + '" y="' + (y - 12) + '" font-size="13" font-weight="bold" text-anchor="middle" fill="#e5484d">' + p[1] + '</text>';
    });
    return s + '</svg>';
  }

  registerLesson({
    id: "c2-lt1",
    chapter: 2,
    kind: "review",
    title: "Luyện tập chung (Bài 5–7)",
    sgkPages: [37, 38],
    sbtPages: [22, 32],
    objectives: [
      "Nhận biết phân số viết được dưới dạng số thập phân hữu hạn hay vô hạn tuần hoàn; tìm chu kì",
      "Nhận biết số vô tỉ; tính căn bậc hai số học",
      "Nhận biết số thực, số đối, giá trị tuyệt đối của một số thực",
      "So sánh, sắp xếp các số thực; làm tròn số theo độ chính xác cho trước"
    ],

    theory: [
      { heading: "1. Số thập phân hữu hạn và vô hạn tuần hoàn",
        html: "Viết phân số dưới dạng <b>tối giản, mẫu dương</b>:" +
          "<ul><li>Nếu mẫu không có ước nguyên tố nào khác $2$ và $5$ thì phân số viết được dưới dạng <b>số thập phân hữu hạn</b>: $\\frac{9}{40} = 0{,}225$.</li>" +
          "<li>Nếu mẫu có ước nguyên tố khác $2$ và $5$ thì phân số viết được dưới dạng <b>số thập phân vô hạn tuần hoàn</b>. Phần lặp lại gọi là <b>chu kì</b>, viết trong ngoặc: $\\frac{7}{12} = 0{,}58333\\ldots = 0{,}58(3)$.</li>" +
          "<li>Nhớ: $\\frac{1}{9} = 0{,}(1)$; $\\frac{1}{99} = 0{,}(01)$; $\\frac{1}{999} = 0{,}(001)$.</li></ul>" },
      { heading: "2. Làm tròn số theo độ chính xác",
        html: "Làm tròn đến một hàng nào đó thì <b>độ chính xác</b> bằng nửa đơn vị của hàng đó. Vì vậy:" +
          "<ul><li>độ chính xác $0{,}5$ → làm tròn đến hàng đơn vị;</li><li>độ chính xác $0{,}05$ → làm tròn đến hàng phần mười;</li><li>độ chính xác $0{,}005$ → làm tròn đến hàng phần trăm.</li></ul>" +
          "Ví dụ: $\\sqrt{5} = 2{,}2360\\ldots \\approx 2{,}24$ (độ chính xác $0{,}005$)." },
      { heading: "3. Số vô tỉ. Căn bậc hai số học",
        html: "<b>Số vô tỉ</b> là số viết được dưới dạng số thập phân vô hạn <b>không tuần hoàn</b>; tập hợp số vô tỉ kí hiệu $\\mathbb{I}$. Ví dụ $\\sqrt{2}$, $\\pi$.<br>" +
          "<b>Căn bậc hai số học</b> của số $a \\ge 0$ là số $x \\ge 0$ sao cho $x^2 = a$, kí hiệu $\\sqrt{a}$. Ví dụ $\\sqrt{0{,}49} = 0{,}7$.<br>" +
          "Với $a \\ge 0$: $(\\sqrt{a})^2 = a$ và $\\sqrt{a^2} = a$." },
      { heading: "4. Số thực",
        html: "<ul><li>Số hữu tỉ và số vô tỉ gọi chung là <b>số thực</b>; tập hợp số thực kí hiệu $\\mathbb{R}$. Ta có $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ và $\\mathbb{I} \\subset \\mathbb{R}$.</li>" +
          "<li>Mỗi số thực $a$ có số đối là $-a$; mỗi số thực được biểu diễn bởi đúng một điểm trên trục số.</li>" +
          "<li>So sánh hai số thực: viết chúng dưới dạng số thập phân rồi so sánh như số thập phân. Nếu $0 \\le a < b$ thì $\\sqrt{a} < \\sqrt{b}$.</li>" +
          "<li><b>Giá trị tuyệt đối</b> $|x|$ là khoảng cách từ điểm $x$ đến điểm $0$: $|x| = x$ nếu $x \\ge 0$; $|x| = -x$ nếu $x < 0$. Luôn có $|x| \\ge 0$.</li></ul>" }
    ],

    skills: [
      "Xét phân số hữu hạn hay vô hạn tuần hoàn: <b>rút gọn trước</b> rồi mới phân tích mẫu. Ví dụ $\\frac{21}{60} = \\frac{7}{20}$ là số thập phân hữu hạn dù $60$ có ước $3$.",
      "So sánh hai số thập phân vô hạn tuần hoàn: viết ra vài chu kì rồi so sánh từng chữ số: $0{,}(12) = 0{,}121212\\ldots$ và $0{,}1(21) = 0{,}121212\\ldots$ là <b>bằng nhau</b>.",
      "Ước lượng căn: tìm hai số có bình phương kẹp số dưới căn. Vì $2{,}6^2 = 6{,}76 < 7 < 7{,}0225 = 2{,}65^2$ nên $2{,}6 < \\sqrt{7} < 2{,}65$.",
      "Bỏ dấu giá trị tuyệt đối: xét dấu biểu thức bên trong trước. Ví dụ $\\sqrt{17} > \\sqrt{16} = 4$ nên $|4 - \\sqrt{17}| = \\sqrt{17} - 4$.",
      "Lỗi hay gặp: cho rằng $\\sqrt{9} = \\pm 3$ (căn bậc hai số học luôn không âm); cho mọi số thập phân vô hạn đều là số vô tỉ (vô hạn tuần hoàn vẫn là số hữu tỉ); so sánh hai số âm như hai số dương."
    ],

    examples: [
      { q: "Viết phân số $\\frac{7}{12}$ dưới dạng số thập phân và chỉ ra chu kì.",
        solution: "$\\frac{7}{12}$ tối giản, mẫu $12 = 2^2 \\cdot 3$ có ước nguyên tố $3$ nên là số thập phân vô hạn tuần hoàn.<br>" +
          "Chia: $7 : 12 = 0{,}58333\\ldots = 0{,}58(3)$; chu kì là $3$." },
      { q: "So sánh $2{,}(15)$ và $2{,}1(5)$.",
        solution: "$2{,}(15) = 2{,}151515\\ldots$; $\\ 2{,}1(5) = 2{,}155555\\ldots$<br>" +
          "Hai số giống nhau đến chữ số thập phân thứ hai; ở chữ số thứ ba: $1 < 5$. Vậy $2{,}(15) < 2{,}1(5)$." },
      { q: "Tính $|\\sqrt{5} - 3| + \\sqrt{5}$.",
        solution: "Vì $5 < 9$ nên $\\sqrt{5} < \\sqrt{9} = 3$, do đó $\\sqrt{5} - 3 < 0$ và $|\\sqrt{5} - 3| = 3 - \\sqrt{5}$.<br>" +
          "Vậy $|\\sqrt{5} - 3| + \\sqrt{5} = 3 - \\sqrt{5} + \\sqrt{5} = 3$." }
    ],

    sets: [
      /* ======================= ĐỀ 1 ======================= */
      { id: "d1", name: "Đề 1",
        mcq: [
          { id: "d1q1", level: "de", source: "SGK Luyện tập chung tr.38 – BT 2.19",
            q: "Phân số nào sau đây viết được dưới dạng số thập phân hữu hạn?",
            options: ["$\\frac{7}{12}$", "$\\frac{5}{6}$", "$\\frac{9}{40}$", "$\\frac{4}{15}$"],
            answer: 2,
            explain: "$40 = 2^3 \\cdot 5$ chỉ có ước nguyên tố $2$ và $5$, nên $\\frac{9}{40} = 0{,}225$. Các mẫu $12, 6, 15$ đều có ước nguyên tố $3$ (phân số đã tối giản) nên cho số thập phân vô hạn tuần hoàn." },
          { id: "d1q2", level: "de", source: "SBT Bài 5 – BT 2.3",
            q: "Phân số $\\frac{4}{9}$ viết dưới dạng số thập phân là",
            options: ["$0{,}(4)$", "$0{,}4$", "$0{,}(49)$", "$0{,}44$"],
            answer: 0,
            explain: "$4 : 9 = 0{,}444\\ldots = 0{,}(4)$. Số $0{,}44$ chỉ là giá trị làm tròn." },
          { id: "d1q3", level: "de", source: "SBT Bài 7 – BT 2.32",
            q: "$\\sqrt{0{,}49}$ bằng",
            options: ["$0{,}07$", "$7$", "$0{,}245$", "$0{,}7$"],
            answer: 3,
            explain: "$0{,}7 \\ge 0$ và $0{,}7^2 = 0{,}49$ nên $\\sqrt{0{,}49} = 0{,}7$. (Chú ý $0{,}07^2 = 0{,}0049$.)" },
          { id: "d1q4", level: "de", source: "SBT Bài 7 – BT 2.22",
            q: "Khẳng định nào sau đây là <b>sai</b>?",
            options: ["$\\sqrt{2} \\in \\mathbb{I}$", "$-3 \\in \\mathbb{R}$", "$\\frac{2}{3} \\in \\mathbb{R}$", "$0{,}(3) \\in \\mathbb{I}$"],
            answer: 3,
            explain: "$0{,}(3) = \\frac{1}{3}$ là số thập phân vô hạn <b>tuần hoàn</b> nên là số hữu tỉ, không phải số vô tỉ. Các khẳng định còn lại đều đúng." },
          { id: "d1q5", level: "vua", source: "SGK Luyện tập chung tr.38 – BT 2.26",
            q: "Giá trị của $(\\sqrt{3})^2 + \\sqrt{5^2}$ là",
            options: ["$\\sqrt{34}$", "$8$", "$34$", "$\\sqrt{8}$"],
            answer: 1,
            explain: "$(\\sqrt{3})^2 = 3$ và $\\sqrt{5^2} = 5$, nên tổng bằng $3 + 5 = 8$." },
          { id: "d1q6", level: "vua", source: "SBT Bài 7 – BT 2.24",
            q: "Số đối của số thực $1 - \\sqrt{2}$ là",
            options: ["$-1-\\sqrt{2}$", "$1+\\sqrt{2}$", "$\\sqrt{2}-1$", "$\\frac{1}{1-\\sqrt{2}}$"],
            answer: 2,
            explain: "Số đối của $a$ là $-a$: $-(1 - \\sqrt{2}) = -1 + \\sqrt{2} = \\sqrt{2} - 1$." },
          { id: "d1q7", level: "vua", source: "SGK Luyện tập chung tr.38 – BT 2.24",
            q: "Khẳng định nào đúng khi so sánh $5{,}31$ và $5{,}(31)$?",
            options: ["$5{,}31 < 5{,}(31)$", "$5{,}31 > 5{,}(31)$", "$5{,}31 = 5{,}(31)$", "Không so sánh được vì $5{,}(31)$ có vô số chữ số"],
            answer: 0,
            explain: "$5{,}(31) = 5{,}3131\\ldots$ Hai số giống nhau đến chữ số thập phân thứ hai; ở chữ số thứ ba: $0 < 3$. Vậy $5{,}31 < 5{,}(31)$." },
          { id: "d1q8", level: "vua", source: "SGK Luyện tập chung tr.37 – Ví dụ 1b",
            q: "Biết $\\sqrt{7} = 2{,}6457513\\ldots$ Làm tròn $\\sqrt{7}$ với độ chính xác $0{,}005$, ta được",
            options: ["$2{,}6$", "$2{,}65$", "$2{,}646$", "$2{,}64$"],
            answer: 1,
            explain: "Độ chính xác $0{,}005$ → làm tròn đến hàng phần trăm. Chữ số hàng phần nghìn là $5$ nên làm tròn lên: $\\sqrt{7} \\approx 2{,}65$." },
          { id: "d1q9", level: "vua", source: "SGK Luyện tập chung tr.38 – BT 2.23",
            q: "Thay dấu ? bằng chữ số nào sau đây để được khẳng định đúng: $-3{,}5?8 > -3{,}528$?",
            options: ["$1$", "$2$", "$5$", "$9$"],
            answer: 0,
            explain: "Với hai số âm, $-3{,}5?8 > -3{,}528$ khi $3{,}5?8 < 3{,}528$, tức là $? < 2$. Trong các phương án chỉ có $1$ thỏa mãn ($-3{,}518 > -3{,}528$). Với $? = 2$ hai số bằng nhau." },
          { id: "d1q10", level: "kho", source: "mới",
            q: "Có bao nhiêu số nguyên $x$ thỏa mãn $|x| < \\sqrt{10}$?",
            options: ["$3$", "$6$", "$7$", "$4$"],
            answer: 2,
            explain: "$\\sqrt{9} < \\sqrt{10} < \\sqrt{16}$ nên $3 < \\sqrt{10} < 4$. Cần $|x| \\le 3$: $x \\in \\{-3; -2; -1; 0; 1; 2; 3\\}$, gồm $7$ số." },
          { id: "d1q11", level: "kho", source: "SBT Bài 7 – BT 2.34",
            q: "Giá trị nhỏ nhất của biểu thức $A = 2 + 3\\sqrt{x^2 + 1}$ là",
            options: ["$2$", "$5$", "$3$", "$1$"],
            answer: 1,
            explain: "$x^2 \\ge 0$ nên $x^2 + 1 \\ge 1$, suy ra $\\sqrt{x^2 + 1} \\ge 1$ và $A \\ge 2 + 3 \\cdot 1 = 5$. Dấu bằng khi $x = 0$. Vậy giá trị nhỏ nhất là $5$." }
        ],
        essay: [
          { id: "d1e1", level: "vua", source: "SGK Luyện tập chung tr.38 – BT 2.19 (biến đổi)", maxPoints: 1.5,
            q: "Cho bốn phân số: $\\frac{11}{40};\\ \\frac{7}{30};\\ \\frac{-9}{25};\\ \\frac{17}{12}$.<br>a) Phân số nào viết được dưới dạng số thập phân vô hạn tuần hoàn? Vì sao? Viết các số đó (dùng dấu ngoặc chỉ chu kì).<br>b) Biết $\\sqrt{2} = 1{,}414213\\ldots$, hãy so sánh $\\frac{17}{12}$ với $\\sqrt{2}$.",
            modelAnswer: "a) Các phân số đều tối giản, mẫu dương. $40 = 2^3 \\cdot 5$ và $25 = 5^2$ chỉ có ước nguyên tố $2, 5$ nên $\\frac{11}{40} = 0{,}275$; $\\frac{-9}{25} = -0{,}36$ là số thập phân hữu hạn.<br>" +
              "$30 = 2 \\cdot 3 \\cdot 5$ và $12 = 2^2 \\cdot 3$ có ước nguyên tố $3$ nên $\\frac{7}{30}$ và $\\frac{17}{12}$ viết được dưới dạng số thập phân vô hạn tuần hoàn: $\\frac{7}{30} = 0{,}2(3)$; $\\ \\frac{17}{12} = 1{,}41(6)$.<br>" +
              "b) $\\frac{17}{12} = 1{,}41666\\ldots$ và $\\sqrt{2} = 1{,}41421\\ldots$ Hai số giống nhau đến chữ số thập phân thứ hai; ở chữ số thứ ba: $6 > 4$. Vậy $\\frac{17}{12} > \\sqrt{2}$.",
            rubric: [
              { pts: 0.5, text: "Chỉ ra đúng $\\frac{7}{30}$ và $\\frac{17}{12}$, giải thích bằng ước nguyên tố $3$ của mẫu." },
              { pts: 0.5, text: "Viết đúng $\\frac{7}{30} = 0{,}2(3)$ và $\\frac{17}{12} = 1{,}41(6)$." },
              { pts: 0.5, text: "So sánh đúng $\\frac{17}{12} > \\sqrt{2}$ có lập luận." }
            ] },
          { id: "d1e2", level: "kho", source: "SBT Bài 7 – BT 2.30 (biến đổi)", maxPoints: 1.5,
            q: "Tính giá trị của biểu thức $M = |4 - \\sqrt{17}| + 3 - \\sqrt{17}$.",
            modelAnswer: "Vì $17 > 16$ nên $\\sqrt{17} > \\sqrt{16} = 4$, do đó $4 - \\sqrt{17} < 0$.<br>" +
              "Suy ra $|4 - \\sqrt{17}| = -(4 - \\sqrt{17}) = \\sqrt{17} - 4$.<br>" +
              "$M = \\sqrt{17} - 4 + 3 - \\sqrt{17} = -1$.",
            rubric: [
              { pts: 0.5, text: "So sánh được $\\sqrt{17} > 4$, suy ra $4 - \\sqrt{17} < 0$." },
              { pts: 0.5, text: "Bỏ dấu giá trị tuyệt đối đúng: $|4 - \\sqrt{17}| = \\sqrt{17} - 4$." },
              { pts: 0.5, text: "Tính đúng $M = -1$." }
            ] }
        ] },

      /* ======================= ĐỀ 2 ======================= */
      { id: "d2", name: "Đề 2",
        mcq: [
          { id: "d2q1", level: "de", source: "SBT Bài 5 – BT 2.1",
            q: "Phân số nào sau đây viết được dưới dạng số thập phân vô hạn tuần hoàn?",
            options: ["$\\frac{21}{60}$", "$\\frac{-8}{125}$", "$\\frac{28}{-63}$", "$\\frac{37}{800}$"],
            answer: 2,
            explain: "$\\frac{28}{-63} = \\frac{-4}{9}$, mẫu $9 = 3^2$ nên là số thập phân vô hạn tuần hoàn: $-0{,}(4)$. Chú ý $\\frac{21}{60} = \\frac{7}{20} = 0{,}35$ (phải rút gọn trước); $125 = 5^3$, $800 = 2^5 \\cdot 5^2$." },
          { id: "d2q2", level: "de", source: "SBT Bài 5 – BT 2.2",
            q: "Số thập phân $2{,}75$ viết dưới dạng phân số tối giản là",
            options: ["$\\frac{275}{100}$", "$\\frac{11}{4}$", "$\\frac{4}{11}$", "$\\frac{27}{5}$"],
            answer: 1,
            explain: "$2{,}75 = \\frac{275}{100} = \\frac{11}{4}$ (chia cả tử và mẫu cho $25$). $\\frac{275}{100}$ chưa tối giản." },
          { id: "d2q3", level: "de", source: "SGK Luyện tập chung tr.38 – BT 2.25",
            q: "$\\sqrt{1 + 2 + 3 + 2 + 1}$ bằng",
            options: ["$3$", "$9$", "$\\sqrt{3}$", "$81$"],
            answer: 0,
            explain: "$1 + 2 + 3 + 2 + 1 = 9$ và $\\sqrt{9} = 3$ (vì $3 \\ge 0$ và $3^2 = 9$)." },
          { id: "d2q4", level: "de", source: "mới",
            q: "Số nào sau đây là số vô tỉ?",
            options: ["$\\sqrt{16}$", "$0{,}(12)$", "$-\\frac{3}{7}$", "$\\sqrt{11}$"],
            answer: 3,
            explain: "$11$ không là bình phương của số hữu tỉ nào nên $\\sqrt{11} = 3{,}3166\\ldots$ là số vô tỉ. $\\sqrt{16} = 4$; $0{,}(12)$ là số thập phân vô hạn tuần hoàn; $-\\frac{3}{7}$ là phân số — đều là số hữu tỉ." },
          { id: "d2q5", level: "vua", source: "SGK Luyện tập chung tr.38 – BT 2.22a",
            q: "Trên trục số dưới đây, mỗi đoạn đơn vị được chia thành 10 phần bằng nhau. Điểm $B$ biểu diễn số thập phân nào?" +
              axis({ min: 13, max: 15, div: 10, labels: [[13, "13"], [14, "14"], [15, "15"]], pts: [[14.3, "B"]] }),
            options: ["$14{,}03$", "$13{,}3$", "$14{,}3$", "$14{,}6$"],
            answer: 2,
            explain: "Mỗi phần nhỏ ứng với $0{,}1$. Điểm $B$ nằm sau điểm $14$ ba phần nên biểu diễn $14 + 0{,}3 = 14{,}3$." },
          { id: "d2q6", level: "vua", source: "SGK Luyện tập chung tr.38 – BT 2.22b",
            q: "Làm tròn số $14{,}58$ với độ chính xác $0{,}05$, ta được",
            options: ["$14{,}5$", "$14{,}6$", "$14{,}58$", "$15$"],
            answer: 1,
            explain: "Độ chính xác $0{,}05$ → làm tròn đến hàng phần mười. Chữ số hàng phần trăm là $8 \\ge 5$ nên làm tròn lên: $14{,}58 \\approx 14{,}6$." },
          { id: "d2q7", level: "vua", source: "SBT Bài 7 – BT 2.28b",
            q: "Giá trị tuyệt đối của số thực $1 - \\sqrt{2}$ là",
            options: ["$\\sqrt{2}-1$", "$1-\\sqrt{2}$", "$1+\\sqrt{2}$", "$-1-\\sqrt{2}$"],
            answer: 0,
            explain: "$\\sqrt{2} \\approx 1{,}414 > 1$ nên $1 - \\sqrt{2} < 0$. Do đó $|1 - \\sqrt{2}| = -(1 - \\sqrt{2}) = \\sqrt{2} - 1$." },
          { id: "d2q8", level: "vua", source: "SBT Bài 7 – BT 2.33",
            q: "Khẳng định nào đúng khi so sánh $a = 0{,}(12)$ và $b = 0{,}1(21)$?",
            options: ["$a > b$", "$a = b$", "$a < b$", "Không so sánh được vì chu kì khác nhau"],
            answer: 1,
            explain: "$a = 0{,}121212\\ldots$ và $b = 0{,}1212121\\ldots$ Viết ra ta thấy mọi chữ số thập phân đều giống nhau, nên $a = b$ (cùng bằng $\\frac{4}{33}$)." },
          { id: "d2q9", level: "vua", source: "SGK Luyện tập chung tr.38 – BT 2.26",
            q: "Giá trị của $(\\sqrt{21})^2 - \\sqrt{16}$ là",
            options: ["$\\sqrt{17}$", "$437$", "$-17$", "$17$"],
            answer: 3,
            explain: "$(\\sqrt{21})^2 = 21$; $\\sqrt{16} = 4$. Vậy kết quả là $21 - 4 = 17$." },
          { id: "d2q10", level: "kho", source: "SBT Bài 7 – BT 2.26",
            q: "Sắp xếp các số thực $\\sqrt{5};\\ -1{,}7(5);\\ \\pi;\\ -2;\\ \\frac{22}{7};\\ 0$ theo thứ tự từ bé đến lớn, ta được",
            options: [
              "$-2;\\ -1{,}7(5);\\ 0;\\ \\sqrt{5};\\ \\pi;\\ \\frac{22}{7}$",
              "$-1{,}7(5);\\ -2;\\ 0;\\ \\sqrt{5};\\ \\pi;\\ \\frac{22}{7}$",
              "$-2;\\ -1{,}7(5);\\ 0;\\ \\sqrt{5};\\ \\frac{22}{7};\\ \\pi$",
              "$-2;\\ -1{,}7(5);\\ 0;\\ \\pi;\\ \\sqrt{5};\\ \\frac{22}{7}$"
            ],
            answer: 0,
            explain: "Số âm: $2 > 1{,}755\\ldots$ nên $-2 < -1{,}7(5)$. Số dương: $\\sqrt{5} \\approx 2{,}236$; $\\pi \\approx 3{,}1416$; $\\frac{22}{7} \\approx 3{,}1429$. Vậy $-2 < -1{,}7(5) < 0 < \\sqrt{5} < \\pi < \\frac{22}{7}$." },
          { id: "d2q11", level: "kho", source: "SBT Bài 7 – BT 2.35",
            q: "Giá trị nhỏ nhất của biểu thức $B = |x - 1| + |x - 3|$ là",
            options: ["$0$", "$1$", "$2$", "$4$"],
            answer: 2,
            explain: "$|x - 1|$ là khoảng cách từ điểm $x$ đến điểm $1$, $|x - 3|$ là khoảng cách từ $x$ đến $3$ trên trục số. Tổng hai khoảng cách này không nhỏ hơn khoảng cách giữa $1$ và $3$, tức $B \\ge 2$; $B = 2$ khi $x$ nằm giữa $1$ và $3$ (ví dụ $x = 2$)." }
        ],
        essay: [
          { id: "d2e1", level: "vua", source: "SGK Luyện tập chung tr.38 – BT 2.20", maxPoints: 1.5,
            q: "a) Viết các phân số $\\frac{1}{9};\\ \\frac{1}{99}$ dưới dạng số thập phân vô hạn tuần hoàn.<br>b) Dựa vào câu a, hãy viết các số $0{,}(7)$ và $0{,}(23)$ dưới dạng phân số.",
            modelAnswer: "a) $\\frac{1}{9} = 0{,}111\\ldots = 0{,}(1)$; $\\ \\frac{1}{99} = 0{,}0101\\ldots = 0{,}(01)$.<br>" +
              "b) $0{,}(7) = 7 \\cdot 0{,}(1) = 7 \\cdot \\frac{1}{9} = \\frac{7}{9}$.<br>" +
              "$0{,}(23) = 0{,}2323\\ldots = 23 \\cdot 0{,}(01) = 23 \\cdot \\frac{1}{99} = \\frac{23}{99}$.",
            rubric: [
              { pts: 0.5, text: "Viết đúng $\\frac{1}{9} = 0{,}(1)$ và $\\frac{1}{99} = 0{,}(01)$." },
              { pts: 0.5, text: "Viết đúng $0{,}(7) = \\frac{7}{9}$ (có lập luận)." },
              { pts: 0.5, text: "Viết đúng $0{,}(23) = \\frac{23}{99}$ (có lập luận)." }
            ] },
          { id: "d2e2", level: "kho", source: "SBT Bài 7 – BT 2.29 (biến đổi)", maxPoints: 1.5,
            q: "Không dùng máy tính cầm tay, hãy ước lượng giá trị thập phân của $\\sqrt{7}$ với độ chính xác $0{,}05$ (gợi ý: tính $2{,}6^2$; $2{,}7^2$; $2{,}65^2$).",
            modelAnswer: "$2{,}6^2 = 6{,}76 < 7$ và $2{,}7^2 = 7{,}29 > 7$ nên $2{,}6 < \\sqrt{7} < 2{,}7$.<br>" +
              "$2{,}65^2 = 7{,}0225 > 7$ nên $2{,}6 < \\sqrt{7} < 2{,}65$.<br>" +
              "Vậy $\\sqrt{7}$ cách $2{,}6$ chưa tới $0{,}05$: $\\sqrt{7} \\approx 2{,}6$ (độ chính xác $0{,}05$).",
            rubric: [
              { pts: 0.5, text: "Tính đúng $2{,}6^2$, $2{,}7^2$ và suy ra $2{,}6 < \\sqrt{7} < 2{,}7$." },
              { pts: 0.5, text: "Tính đúng $2{,}65^2 = 7{,}0225$, thu hẹp được $2{,}6 < \\sqrt{7} < 2{,}65$." },
              { pts: 0.5, text: "Kết luận $\\sqrt{7} \\approx 2{,}6$ với độ chính xác $0{,}05$." }
            ] }
        ] },

      /* ======================= ĐỀ 3 ======================= */
      { id: "d3", name: "Đề 3",
        mcq: [
          { id: "d3q1", level: "de", source: "SBT Bài 5 – BT 2.4",
            q: "Trong các phân số $\\frac{13}{15};\\ \\frac{13}{4};\\ \\frac{-1}{18};\\ \\frac{11}{6};\\ \\frac{7}{20};\\ \\frac{-19}{50}$, có bao nhiêu phân số viết được dưới dạng số thập phân hữu hạn?",
            options: ["$2$", "$3$", "$4$", "$6$"],
            answer: 1,
            explain: "Các mẫu $4 = 2^2$; $20 = 2^2 \\cdot 5$; $50 = 2 \\cdot 5^2$ chỉ có ước nguyên tố $2, 5$: $\\frac{13}{4} = 3{,}25$; $\\frac{7}{20} = 0{,}35$; $\\frac{-19}{50} = -0{,}38$. Các mẫu $15, 18, 6$ có ước $3$. Vậy có $3$ phân số." },
          { id: "d3q2", level: "de", source: "SGK Luyện tập chung tr.38 – BT 2.21",
            q: "Phân số $\\frac{5}{99}$ viết dưới dạng số thập phân là",
            options: ["$0{,}(5)$", "$0{,}0(5)$", "$0{,}(05)$", "$0{,}05$"],
            answer: 2,
            explain: "$\\frac{5}{99} = 5 \\cdot \\frac{1}{99} = 5 \\cdot 0{,}(01) = 0{,}050505\\ldots = 0{,}(05)$. Còn $0{,}(5) = \\frac{5}{9}$; $0{,}0(5) = 0{,}0555\\ldots$" },
          { id: "d3q3", level: "de", source: "mới",
            q: "Căn bậc hai số học của $81$ là",
            options: ["$9$", "$-9$", "$\\pm 9$", "$40{,}5$"],
            answer: 0,
            explain: "Căn bậc hai số học của $81$ là số <b>không âm</b> có bình phương bằng $81$, đó là $9$. Vậy $\\sqrt{81} = 9$." },
          { id: "d3q4", level: "de", source: "SBT Bài 7 – BT 2.23",
            q: "Khẳng định nào sau đây là <b>đúng</b>?",
            options: ["$2$ không phải là số hữu tỉ", "Nếu $x$ là số tự nhiên thì $\\sqrt{x}$ là số vô tỉ", "Mọi số thập phân vô hạn đều là số vô tỉ", "Nếu $x$ là số hữu tỉ thì $x$ là số thực"],
            answer: 3,
            explain: "$\\mathbb{Q} \\subset \\mathbb{R}$ nên mọi số hữu tỉ là số thực. Còn: $2 = \\frac{2}{1}$ là số hữu tỉ; $\\sqrt{4} = 2$ không vô tỉ; $0{,}(3)$ vô hạn nhưng tuần hoàn nên là số hữu tỉ." },
          { id: "d3q5", level: "vua", source: "SGK Luyện tập chung tr.37 – Ví dụ 2 (mở rộng)",
            q: "$\\sqrt{(-7)^2}$ bằng",
            options: ["$-7$", "$7$", "$49$", "$\\pm 7$"],
            answer: 1,
            explain: "$(-7)^2 = 49$ và $\\sqrt{49} = 7$. Căn bậc hai số học luôn không âm nên không thể bằng $-7$." },
          { id: "d3q6", level: "vua", source: "mới",
            q: "Biết $\\pi = 3{,}14159\\ldots$ Làm tròn $\\pi$ với độ chính xác $0{,}005$, ta được",
            options: ["$3{,}1$", "$3{,}15$", "$3{,}142$", "$3{,}14$"],
            answer: 3,
            explain: "Độ chính xác $0{,}005$ → làm tròn đến hàng phần trăm. Chữ số hàng phần nghìn là $1 < 5$ nên giữ nguyên: $\\pi \\approx 3{,}14$." },
          { id: "d3q7", level: "vua", source: "SGK Luyện tập chung tr.37 – Ví dụ 1",
            q: "Một hình vuông có diện tích $10\\ \\mathrm{cm^2}$. Độ dài cạnh hình vuông (làm tròn đến chữ số thập phân thứ hai) là",
            options: ["$3{,}16$ cm", "$3{,}17$ cm", "$5$ cm", "$2{,}5$ cm"],
            answer: 0,
            explain: "Cạnh hình vuông là $\\sqrt{10} = 3{,}1622\\ldots$ cm. Chữ số thập phân thứ ba là $2 < 5$ nên làm tròn được $3{,}16$ cm. ($5$ cm và $2{,}5$ cm là nhầm lấy $10 : 2$ hay $10 : 4$.)" },
          { id: "d3q8", level: "vua", source: "SBT Bài 7 – BT 2.25",
            q: "Khẳng định nào đúng khi so sánh $1{,}(41)$ và $\\sqrt{2} = 1{,}414213\\ldots$?",
            options: ["$1{,}(41) > \\sqrt{2}$", "$1{,}(41) = \\sqrt{2}$", "$1{,}(41) < \\sqrt{2}$", "Không so sánh được vì $\\sqrt{2}$ là số vô tỉ"],
            answer: 2,
            explain: "$1{,}(41) = 1{,}414141\\ldots$ và $\\sqrt{2} = 1{,}414213\\ldots$ Hai số giống nhau đến chữ số thập phân thứ ba ($1{,}414$); ở chữ số thứ tư: $1 < 2$. Vậy $1{,}(41) < \\sqrt{2}$." },
          { id: "d3q9", level: "vua", source: "SGK Luyện tập chung tr.38 – BT 2.23b",
            q: "Thay dấu ? bằng chữ số nào sau đây để được khẳng định đúng: $-15{,}3?021 < -15{,}3819$?",
            options: ["$9$", "$8$", "$7$", "$0$"],
            answer: 0,
            explain: "Với hai số âm, $-15{,}3?021 < -15{,}3819$ khi $15{,}3?021 > 15{,}3819$. Nếu $? = 8$ thì $15{,}38021 < 15{,}3819$ (vì $0 < 1$ ở hàng phần nghìn); chỉ $? = 9$ cho $15{,}39021 > 15{,}3819$." },
          { id: "d3q10", level: "kho", source: "SBT Bài 7 – BT 2.31",
            q: "Biết $\\sqrt{11}$ là số vô tỉ. Phép tính nào sau đây có kết quả là số hữu tỉ?",
            options: ["$1+\\sqrt{11}$", "$\\frac{1}{\\sqrt{11}}$", "$\\sqrt{11}-3$", "$\\sqrt{11}\\cdot\\sqrt{11}$"],
            answer: 3,
            explain: "$\\sqrt{11} \\cdot \\sqrt{11} = (\\sqrt{11})^2 = 11$ là số hữu tỉ. Các số $1 + \\sqrt{11}$, $\\sqrt{11} - 3$, $\\frac{1}{\\sqrt{11}}$ đều là số vô tỉ (nếu chúng hữu tỉ thì suy ra $\\sqrt{11}$ hữu tỉ, vô lí)." },
          { id: "d3q11", level: "kho", source: "SBT Bài 7 – BT 2.28c",
            q: "Số thực $(3 - \\sqrt{2})(2 - \\sqrt{5})$ là",
            options: ["số thực dương", "số thực âm", "số $0$", "số tự nhiên"],
            answer: 1,
            explain: "$\\sqrt{2} < \\sqrt{9} = 3$ nên $3 - \\sqrt{2} > 0$; $\\sqrt{5} > \\sqrt{4} = 2$ nên $2 - \\sqrt{5} < 0$. Tích của một số dương và một số âm là số âm." }
        ],
        essay: [
          { id: "d3e1", level: "vua", source: "SBT Bài 7 – BT 2.27 (biến đổi)", maxPoints: 1.5,
            q: "Tìm các số thực $x$ có giá trị tuyệt đối bằng $2{,}(3)$. Điểm biểu diễn mỗi số tìm được nằm trong hay nằm ngoài khoảng giữa hai điểm $-2$ và $2{,}(5)$ trên trục số? Giải thích.",
            modelAnswer: "$|x| = 2{,}(3)$ nên $x = 2{,}(3)$ hoặc $x = -2{,}(3)$.<br>" +
              "• $x = 2{,}(3) = 2{,}333\\ldots$: ta có $-2 < 2{,}333\\ldots < 2{,}555\\ldots = 2{,}(5)$ nên điểm này nằm <b>trong</b> khoảng.<br>" +
              "• $x = -2{,}(3) = -2{,}333\\ldots$: vì $2{,}333\\ldots > 2$ nên $-2{,}(3) < -2$, điểm này nằm <b>ngoài</b> khoảng (bên trái điểm $-2$).",
            rubric: [
              { pts: 0.5, text: "Tìm đủ hai số $x = 2{,}(3)$ và $x = -2{,}(3)$." },
              { pts: 0.5, text: "Lập luận đúng: điểm $2{,}(3)$ nằm trong khoảng." },
              { pts: 0.5, text: "Lập luận đúng: điểm $-2{,}(3)$ nằm ngoài khoảng (vì $-2{,}(3) < -2$)." }
            ] },
          { id: "d3e2", level: "kho", source: "SBT Bài 7 – Ví dụ 1 (biến đổi)", maxPoints: 1.5,
            q: "Biết $\\sqrt{2}$ là số vô tỉ. Chứng tỏ rằng $5 + \\sqrt{2}$ là số vô tỉ.",
            modelAnswer: "Giả sử $5 + \\sqrt{2}$ là số hữu tỉ, tức là $5 + \\sqrt{2} = \\frac{p}{q}$ với $p, q \\in \\mathbb{Z},\\ q \\ne 0$.<br>" +
              "Khi đó $\\sqrt{2} = \\frac{p}{q} - 5 = \\frac{p - 5q}{q}$; vì $p - 5q$ và $q$ là số nguyên, $q \\ne 0$, nên $\\sqrt{2}$ là số hữu tỉ.<br>" +
              "Điều này vô lí vì $\\sqrt{2}$ là số vô tỉ. Vậy $5 + \\sqrt{2}$ là số vô tỉ.",
            rubric: [
              { pts: 0.5, text: "Đặt giả sử $5 + \\sqrt{2} = \\frac{p}{q}$ là số hữu tỉ." },
              { pts: 0.5, text: "Biến đổi được $\\sqrt{2} = \\frac{p - 5q}{q}$ là số hữu tỉ." },
              { pts: 0.5, text: "Chỉ ra mâu thuẫn và kết luận $5 + \\sqrt{2}$ là số vô tỉ." }
            ] }
        ] }
    ]
  });
})();
