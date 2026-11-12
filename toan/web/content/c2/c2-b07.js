(function () {
  // Vẽ trục số bằng SVG (dùng currentColor để hợp chế độ sáng/tối).
  // o = { min, max, n (số vạch chia từ min đến max), every (cứ bao nhiêu vạch thì một vạch lớn),
  //       labels: [[giá trị, "nhãn"]], pts: [[giá trị, "tên"]], w }
  function axis(o) {
    var W = o.w || 360, H = 76, y = 36, pad = 24;
    var x = function (v) { return (pad + (v - o.min) / (o.max - o.min) * (W - 2 * pad)).toFixed(1); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:6px auto" role="img" aria-label="Trục số">';
    s += '<line x1="6" y1="' + y + '" x2="' + (W - 6) + '" y2="' + y + '" stroke="currentColor" stroke-width="1.5"/>';
    s += '<path d="M' + (W - 4) + ' ' + y + ' l-9 -4.5 v9 z" fill="currentColor"/>';
    for (var i = 0; i <= o.n; i++) {
      var h = (i % (o.every || 1) === 0) ? 7 : 4;
      var xx = x(o.min + (o.max - o.min) * i / o.n);
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
  var INT = function (a, b) { var r = []; for (var k = a; k <= b; k++) r.push([k, k < 0 ? "−" + (-k) : String(k)]); return r; };

  registerLesson({
    id: "c2-b07",
    chapter: 2,
    kind: "lesson",
    title: "Bài 7. Tập hợp các số thực",
    sgkPages: [33, 36],
    sbtPages: [29, 32],
    objectives: [
      "Nhận biết số thực, tập hợp $\\mathbb{R}$ và quan hệ giữa các tập hợp số $\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}, \\mathbb{I}, \\mathbb{R}$",
      "Tìm số đối và giá trị tuyệt đối của một số thực",
      "Biểu diễn số thực trên trục số trong trường hợp thuận lợi",
      "So sánh, sắp xếp các số thực; ước lượng căn bậc hai"
    ],

    theory: [
      {
        heading: "1. Số thực",
        html: "Số hữu tỉ và số vô tỉ được gọi chung là <b>số thực</b>. Tập hợp các số thực kí hiệu là $\\mathbb{R}$." +
          "<ul><li>Mọi số thực đều viết được dưới dạng số thập phân: hữu hạn hoặc vô hạn tuần hoàn (đó là số hữu tỉ), vô hạn không tuần hoàn (đó là số vô tỉ). Ví dụ: $\\frac{3}{4} = 0{,}75$; $\\ \\frac{1}{9} = 0{,}(1)$; $\\ \\sqrt{2} = 1{,}4142\\ldots$; $\\ \\pi = 3{,}14159\\ldots$</li>" +
          "<li>Quan hệ giữa các tập hợp số: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ và $\\mathbb{I} \\subset \\mathbb{R}$ ($\\mathbb{I}$ là tập hợp các số vô tỉ). Một số thực hoặc là số hữu tỉ, hoặc là số vô tỉ, không thể vừa là cả hai.</li>" +
          "<li>Mỗi số thực $a$ có một <b>số đối</b> kí hiệu là $-a$. Ví dụ số đối của $\\sqrt{3}$ là $-\\sqrt{3}$; số đối của $-\\pi$ là $\\pi$; số đối của $2 - \\sqrt{5}$ là $\\sqrt{5} - 2$.</li>" +
          "<li>Trong $\\mathbb{R}$ cũng có các phép cộng, trừ, nhân, chia (chia cho số khác 0) với các tính chất giống như trong $\\mathbb{Q}$.</li></ul>"
      },
      {
        heading: "2. Trục số thực",
        html: "Số vô tỉ cũng biểu diễn được trên trục số. Ví dụ, $\\sqrt{2}$ là nửa đường chéo của hình vuông cạnh 2: vẽ đường tròn tâm $O$ bán kính bằng nửa đường chéo đó, đường tròn cắt tia số dương tại điểm biểu diễn $\\sqrt{2}$." +
          "<ul><li>Mỗi số thực được biểu diễn bởi <b>một</b> điểm trên trục số; ngược lại, mỗi điểm trên trục số biểu diễn <b>một</b> số thực. Các số thực lấp đầy trục số, nên trục số còn gọi là <b>trục số thực</b>.</li>" +
          "<li>Hai số đối nhau $a$ và $-a$ được biểu diễn bởi hai điểm nằm về hai phía của gốc $O$ và cách đều $O$.</li></ul>" +
          axis({ min: -3, max: 3, n: 6, labels: INT(-3, 3), pts: [[-Math.SQRT2, "−√2"], [Math.SQRT2, "√2"], [Math.sqrt(5), "√5"]] })
      },
      {
        heading: "3. Thứ tự trong tập hợp số thực",
        html: "Vì mọi số thực đều viết được dưới dạng số thập phân, ta so sánh hai số thực giống như so sánh hai số thập phân. Ví dụ: $0{,}24(7) = 0{,}2477\\ldots > 0{,}2382\\ldots$; $\\ \\sqrt{2} = 1{,}414\\ldots > 1{,}41$ nên $-\\sqrt{2} < -1{,}41$." +
          "<ul><li>Với hai số thực $a, b$ bất kì luôn có đúng một trong ba trường hợp: $a < b$, $a = b$ hoặc $a > b$. Kí hiệu $a \\le b$ nghĩa là $a < b$ hoặc $a = b$.</li>" +
          "<li><b>Tính chất bắc cầu:</b> nếu $a < b$ và $b < c$ thì $a < c$.</li>" +
          "<li>Trên trục số, nếu $a < b$ thì điểm $a$ nằm <b>trước</b> (bên trái) điểm $b$. Điểm nằm trước $O$ biểu diễn số âm ($x < 0$), điểm nằm sau $O$ biểu diễn số dương ($x > 0$).</li>" +
          "<li><b>So sánh căn bậc hai:</b> nếu $0 \\le a < b$ thì $\\sqrt{a} < \\sqrt{b}$. Ví dụ $\\sqrt{2} < \\sqrt{5}$ vì $2 < 5$; $\\ \\sqrt{5} > 2$ vì $\\sqrt{5} > \\sqrt{4} = 2$.</li></ul>"
      },
      {
        heading: "4. Giá trị tuyệt đối của một số thực",
        html: "Khoảng cách từ điểm $a$ đến gốc $O$ trên trục số là <b>giá trị tuyệt đối</b> của $a$, kí hiệu $|a|$." +
          "$$|a| = \\begin{cases} a & \\text{khi } a \\ge 0 \\\\ -a & \\text{khi } a < 0 \\end{cases}$$" +
          "<ul><li>Ví dụ: $|5{,}1| = 5{,}1$; $\\ |0| = 0$; $\\ |-2| = 2$; $\\ |-\\sqrt{2}| = \\sqrt{2}$; $\\ |1 - \\sqrt{2}| = \\sqrt{2} - 1$ (vì $1 - \\sqrt{2} < 0$).</li>" +
          "<li>$|a| \\ge 0$ với mọi $a$; hai số đối nhau có giá trị tuyệt đối bằng nhau: $|-a| = |a|$.</li>" +
          "<li>Với $k > 0$: $|x| = k \\Leftrightarrow x = k$ hoặc $x = -k$. Không có số $x$ nào để $|x|$ bằng một số âm.</li>" +
          "<li>Với $k > 0$: $|x| \\le k \\Leftrightarrow -k \\le x \\le k$ (điểm $x$ nằm giữa hai điểm $-k$ và $k$).</li></ul>"
      }
    ],

    skills: [
      "<b>Nhận biết số hữu tỉ / vô tỉ:</b> số nguyên, phân số, số thập phân hữu hạn, số thập phân vô hạn tuần hoàn là số hữu tỉ. Căn bậc hai của số không chính phương (như $\\sqrt{2}, \\sqrt{15}$) và $\\pi$ là số vô tỉ. Chú ý rút gọn trước: $-\\sqrt{81} = -9$, $\\sqrt{0{,}25} = 0{,}5$ là số hữu tỉ.",
      "<b>So sánh hai số thực:</b> viết cả hai dưới dạng số thập phân rồi so sánh từng chữ số từ trái sang phải. Với số thập phân vô hạn tuần hoàn, viết rõ vài chu kì: $1{,}(32) = 1{,}3232\\ldots$",
      "<b>So sánh căn với một số:</b> bình phương số đó lên. Ví dụ $1{,}7^2 = 2{,}89 < 3 < 3{,}24 = 1{,}8^2$ nên $1{,}7 < \\sqrt{3} < 1{,}8$.",
      "<b>Sắp xếp nhiều số thực:</b> tách nhóm số âm, số $0$, nhóm số dương; trong nhóm số âm, số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn.",
      "<b>Bỏ dấu giá trị tuyệt đối:</b> xét dấu biểu thức bên trong trước. Nếu không âm thì giữ nguyên, nếu âm thì đổi dấu. Ví dụ $\\sqrt{35} < \\sqrt{36} = 6$ nên $|6 - \\sqrt{35}| = 6 - \\sqrt{35}$.",
      "<b>Lỗi hay gặp:</b> viết $|-2{,}5| = -2{,}5$ (sai, giá trị tuyệt đối không âm); quên nghiệm âm khi giải $|x| = k$; nghĩ $-\\sqrt{81}$ là số vô tỉ; nhầm số đối với số nghịch đảo."
    ],

    examples: [
      {
        q: "So sánh $1{,}313233\\ldots$ và $1{,}(32)$.",
        solution: "Viết rõ: $1{,}(32) = 1{,}3232\\ldots$<br>So sánh từng chữ số: phần nguyên và hàng phần mười giống nhau ($1{,}3$); ở hàng phần trăm có $1 < 2$.<br>Vậy $1{,}313233\\ldots < 1{,}(32)$."
      },
      {
        q: "Không dùng máy tính, chứng tỏ $1{,}7 < \\sqrt{3} < 1{,}8$.",
        solution: "Ta có $1{,}7^2 = 2{,}89$ và $1{,}8^2 = 3{,}24$, nên $2{,}89 < 3 < 3{,}24$.<br>" +
          "Vì $0 \\le a < b$ thì $\\sqrt{a} < \\sqrt{b}$, suy ra $\\sqrt{2{,}89} < \\sqrt{3} < \\sqrt{3{,}24}$, tức là $1{,}7 < \\sqrt{3} < 1{,}8$."
      },
      {
        q: "Tìm tất cả các số thực $x$ thỏa mãn $|x| = 2{,}5$ và biểu diễn chúng trên trục số.",
        solution: "$|x| = 2{,}5$ nghĩa là điểm $x$ cách gốc $O$ đúng $2{,}5$ đơn vị. Có hai điểm như vậy, nằm về hai phía của $O$: $x = 2{,}5$ hoặc $x = -2{,}5$." +
          axis({ min: -3, max: 3, n: 12, every: 2, labels: INT(-3, 3), pts: [[-2.5, "−2,5"], [2.5, "2,5"]] })
      },
      {
        q: "Tính $|6 - \\sqrt{35}| + 5 + \\sqrt{35}$.",
        solution: "Vì $35 < 36$ nên $\\sqrt{35} < \\sqrt{36} = 6$, do đó $6 - \\sqrt{35} > 0$ và $|6 - \\sqrt{35}| = 6 - \\sqrt{35}$.<br>" +
          "Vậy $|6 - \\sqrt{35}| + 5 + \\sqrt{35} = 6 - \\sqrt{35} + 5 + \\sqrt{35} = 11$."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.33 – Luyện tập 1",
            q: "Cách viết nào sau đây đúng?",
            options: ["$\\sqrt{2} \\in \\mathbb{Q}$", "$\\pi \\in \\mathbb{Q}$", "$-15 \\in \\mathbb{R}$", "$0{,}5 \\in \\mathbb{I}$"],
            answer: 2,
            explain: "$-15$ là số nguyên nên là số thực: $-15 \\in \\mathbb{R}$. Còn $\\sqrt{2}$ và $\\pi$ là số vô tỉ (không thuộc $\\mathbb{Q}$); $0{,}5 = \\frac{1}{2}$ là số hữu tỉ (không thuộc $\\mathbb{I}$)."
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.33 – Luyện tập 1",
            q: "Số đối của $-\\sqrt{5}$ là",
            options: ["$\\sqrt{5}$", "$-\\sqrt{5}$", "$\\frac{1}{\\sqrt{5}}$", "$5$"],
            answer: 0,
            explain: "Số đối của $a$ là $-a$, nên số đối của $-\\sqrt{5}$ là $-(-\\sqrt{5}) = \\sqrt{5}$. ($\\frac{1}{\\sqrt{5}}$ liên quan tới số nghịch đảo, không phải số đối.)"
          },
          {
            id: "d1q3", level: "de", source: "SGK tr.36 – Luyện tập 4",
            q: "$|-2{,}3|$ bằng",
            options: ["$-2{,}3$", "$2{,}3$", "$0$", "$\\frac{1}{2{,}3}$"],
            answer: 1,
            explain: "$-2{,}3 < 0$ nên $|-2{,}3| = -(-2{,}3) = 2{,}3$. Giá trị tuyệt đối là khoảng cách tới gốc $O$, không bao giờ âm."
          },
          {
            id: "d1q4", level: "de", source: "SGK Bài 7 – BT 2.13",
            q: "Trong các số sau, số nào là số vô tỉ?",
            options: ["$-\\sqrt{81}$", "$\\frac{4}{7}$", "$-2{,}(61)$", "$\\sqrt{15}$"],
            answer: 3,
            explain: "$15$ không là số chính phương nên $\\sqrt{15}$ là số vô tỉ. Còn $-\\sqrt{81} = -9$, $\\frac{4}{7}$ và $-2{,}(61)$ (thập phân vô hạn tuần hoàn) đều là số hữu tỉ."
          },
          {
            id: "d1q5", level: "vua", source: "SGK tr.35 – Luyện tập 3b",
            q: "Khẳng định nào đúng khi so sánh $\\sqrt{5}$ và $2{,}36$?",
            options: ["$\\sqrt{5} > 2{,}36$", "$\\sqrt{5} < 2{,}36$", "$\\sqrt{5} = 2{,}36$", "Không so sánh được vì $\\sqrt{5}$ là số vô tỉ"],
            answer: 1,
            explain: "$\\sqrt{5} = 2{,}236\\ldots$ So sánh với $2{,}360$: hàng phần mười $2 < 3$, nên $\\sqrt{5} < 2{,}36$. (Hoặc: $2{,}36^2 = 5{,}5696 > 5$.)"
          },
          {
            id: "d1q6", level: "vua", source: "SGK Bài 7 – BT 2.15a",
            q: "Đoạn thẳng từ $0$ đến $1$ trên trục số dưới đây được chia thành 10 phần bằng nhau. Điểm $A$ biểu diễn số thực nào?" +
              axis({ min: 0, max: 1, n: 10, every: 10, labels: [[0, "0"], [1, "1"]], pts: [[0.7, "A"]] }),
            options: ["$0{,}7$", "$7$", "$0{,}07$", "$-0{,}7$"],
            answer: 0,
            explain: "Mỗi phần nhỏ dài $\\frac{1}{10} = 0{,}1$. Điểm $A$ nằm bên phải $O$, cách $O$ 7 phần nên $A$ biểu diễn $0{,}7$."
          },
          {
            id: "d1q7", level: "vua", source: "SGK Bài 7 – BT 2.18",
            q: "Các số thực $x$ thỏa mãn $|x| = 2{,}5$ là",
            options: ["chỉ có $x = 2{,}5$", "chỉ có $x = -2{,}5$", "$x = 2{,}5$ hoặc $x = -2{,}5$", "không có số $x$ nào"],
            answer: 2,
            explain: "Có hai điểm cách gốc $O$ đúng $2{,}5$ đơn vị, nằm hai phía của $O$: $x = 2{,}5$ và $x = -2{,}5$ (vì $|2{,}5| = |-2{,}5| = 2{,}5$)."
          },
          {
            id: "d1q8", level: "vua", source: "SBT Bài 7 – BT 2.26",
            q: "Sắp xếp các số $\\sqrt{5};\\ -1{,}7(5);\\ \\pi;\\ -2;\\ \\frac{22}{7};\\ 0$ theo thứ tự từ bé đến lớn, ta được",
            options: [
              "$-1{,}7(5);\\ -2;\\ 0;\\ \\sqrt{5};\\ \\pi;\\ \\frac{22}{7}$",
              "$-2;\\ -1{,}7(5);\\ 0;\\ \\sqrt{5};\\ \\frac{22}{7};\\ \\pi$",
              "$-2;\\ -1{,}7(5);\\ 0;\\ \\pi;\\ \\sqrt{5};\\ \\frac{22}{7}$",
              "$-2;\\ -1{,}7(5);\\ 0;\\ \\sqrt{5};\\ \\pi;\\ \\frac{22}{7}$"
            ],
            answer: 3,
            explain: "Số âm: $2 > 1{,}755\\ldots$ nên $-2 < -1{,}7(5)$. Số dương: $\\sqrt{5} = 2{,}236\\ldots$; $\\pi = 3{,}14159\\ldots$; $\\frac{22}{7} = 3{,}14285\\ldots$ nên $\\sqrt{5} < \\pi < \\frac{22}{7}$. Thứ tự: $-2;\\ -1{,}7(5);\\ 0;\\ \\sqrt{5};\\ \\pi;\\ \\frac{22}{7}$."
          },
          {
            id: "d1q9", level: "kho", source: "SGK tr.36 – Thử thách nhỏ",
            q: "Tập hợp $A = \\{x \\mid x \\in \\mathbb{Z},\\ |x| < 5\\}$ có bao nhiêu phần tử?",
            options: ["$9$", "$10$", "$11$", "$5$"],
            answer: 0,
            explain: "$|x| < 5$ nghĩa là $-5 < x < 5$. Các số nguyên thỏa mãn: $-4; -3; -2; -1; 0; 1; 2; 3; 4$, gồm 9 phần tử (không lấy $\\pm 5$ vì $|5| = 5$ không nhỏ hơn 5)."
          },
          {
            id: "d1q10", level: "kho", source: "SBT Bài 7 – BT 2.30",
            q: "Giá trị của biểu thức $|6 - \\sqrt{35}| + 5 + \\sqrt{35}$ là",
            options: ["$1$", "$11 + 2\\sqrt{35}$", "$11$", "$2\\sqrt{35} - 1$"],
            answer: 2,
            explain: "$\\sqrt{35} < \\sqrt{36} = 6$ nên $6 - \\sqrt{35} > 0$, do đó $|6 - \\sqrt{35}| = 6 - \\sqrt{35}$. Biểu thức bằng $6 - \\sqrt{35} + 5 + \\sqrt{35} = 11$."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK Bài 7 – BT 2.13, 2.14 (biến đổi)", maxPoints: 3,
            q: "Cho tập hợp $A = \\left\\{-3{,}2;\\ \\sqrt{7};\\ 0;\\ 1{,}(45);\\ \\frac{-5}{6};\\ -\\sqrt{49};\\ \\pi\\right\\}$.<br>" +
              "a) Viết tập hợp $B$ gồm các số hữu tỉ thuộc $A$ và tập hợp $C$ gồm các số vô tỉ thuộc $A$.<br>" +
              "b) Viết tập hợp $A'$ gồm các số đối của các số thuộc $A$.",
            modelAnswer: "a) Ta có $-\\sqrt{49} = -7$ là số nguyên; $1{,}(45)$ là số thập phân vô hạn tuần hoàn nên là số hữu tỉ; $-3{,}2$, $0$, $\\frac{-5}{6}$ là số hữu tỉ.<br>" +
              "$\\sqrt{7}$ (7 không là số chính phương) và $\\pi$ là số vô tỉ.<br>" +
              "Vậy $B = \\left\\{-3{,}2;\\ 0;\\ 1{,}(45);\\ \\frac{-5}{6};\\ -\\sqrt{49}\\right\\}$ và $C = \\{\\sqrt{7};\\ \\pi\\}$.<br>" +
              "b) $A' = \\left\\{3{,}2;\\ -\\sqrt{7};\\ 0;\\ -1{,}(45);\\ \\frac{5}{6};\\ \\sqrt{49};\\ -\\pi\\right\\}$ (có thể viết $\\sqrt{49} = 7$).",
            rubric: [
              { pts: 0.5, text: "Nhận ra $-\\sqrt{49} = -7$ và $1{,}(45)$ là số hữu tỉ." },
              { pts: 1, text: "Viết đúng, đủ tập hợp $B$ (5 phần tử)." },
              { pts: 0.5, text: "Viết đúng tập hợp $C = \\{\\sqrt{7};\\ \\pi\\}$." },
              { pts: 1, text: "Viết đúng, đủ tập hợp $A'$ (7 phần tử, số đối của $0$ là $0$)." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SBT Bài 7 – BT 2.22",
            q: "Khẳng định nào sau đây là <b>sai</b>?",
            options: ["Mọi số nguyên đều là số thực", "Mọi số vô tỉ đều là số thực", "Mọi số thực đều là số hữu tỉ", "Số $0$ là số thực"],
            answer: 2,
            explain: "Số thực gồm cả số hữu tỉ và số vô tỉ; ví dụ $\\sqrt{2}$ là số thực nhưng không là số hữu tỉ. Ba khẳng định còn lại đều đúng."
          },
          {
            id: "d2q2", level: "de", source: "SGK tr.33 – Luyện tập 1b",
            q: "Số đối của $5{,}08(299)$ là",
            options: ["$5{,}08(299)$", "$-5{,}08(299)$", "$-5{,}08299$", "$\\frac{1}{5{,}08(299)}$"],
            answer: 1,
            explain: "Số đối có cùng phần số và trái dấu: $-5{,}08(299)$. Chú ý $-5{,}08299$ là số thập phân hữu hạn, khác với $-5{,}08(299)$."
          },
          {
            id: "d2q3", level: "de", source: "SGK Bài 7 – BT 2.16b",
            q: "$\\left|\\frac{-4}{9}\\right|$ bằng",
            options: ["$\\frac{-4}{9}$", "$-\\frac{9}{4}$", "$\\frac{9}{4}$", "$\\frac{4}{9}$"],
            answer: 3,
            explain: "$\\frac{-4}{9} < 0$ nên giá trị tuyệt đối của nó là số đối: $\\frac{4}{9}$."
          },
          {
            id: "d2q4", level: "de", source: "mới",
            q: "Số nào sau đây là số hữu tỉ?",
            options: ["$\\sqrt{3}$", "$\\pi$", "$\\sqrt{0{,}25}$", "$-\\sqrt{2}$"],
            answer: 2,
            explain: "$\\sqrt{0{,}25} = 0{,}5$ (vì $0{,}5^2 = 0{,}25$) là số hữu tỉ. $\\sqrt{3}$, $\\pi$, $-\\sqrt{2}$ là số vô tỉ."
          },
          {
            id: "d2q5", level: "vua", source: "SGK tr.35 – Luyện tập 3a",
            q: "Khẳng định nào đúng khi so sánh $1{,}313233\\ldots$ và $1{,}(32)$?",
            options: ["$1{,}313233\\ldots > 1{,}(32)$", "$1{,}313233\\ldots < 1{,}(32)$", "$1{,}313233\\ldots = 1{,}(32)$", "Không so sánh được vì cả hai là số thập phân vô hạn"],
            answer: 1,
            explain: "$1{,}(32) = 1{,}3232\\ldots$ Hai số giống nhau đến hàng phần mười; ở hàng phần trăm có $1 < 2$, nên $1{,}313233\\ldots < 1{,}(32)$."
          },
          {
            id: "d2q6", level: "vua", source: "SGK Bài 7 – BT 2.15b",
            q: "Đoạn thẳng từ $4{,}6$ đến $4{,}7$ trên trục số dưới đây được chia thành 10 phần bằng nhau. Điểm $C$ biểu diễn số thực nào?" +
              axis({ min: 4.6, max: 4.7, n: 10, every: 10, labels: [[4.6, "4,6"], [4.7, "4,7"]], pts: [[4.62, "C"]] }),
            options: ["$4{,}62$", "$4{,}2$", "$4{,}602$", "$4{,}68$"],
            answer: 0,
            explain: "Đoạn dài $4{,}7 - 4{,}6 = 0{,}1$ chia 10 phần, mỗi phần dài $0{,}01$. $C$ cách điểm $4{,}6$ hai phần nên $C$ biểu diễn $4{,}6 + 0{,}02 = 4{,}62$."
          },
          {
            id: "d2q7", level: "vua", source: "mới",
            q: "Số thực $x$ thỏa mãn $|x| = -3$ là",
            options: ["$x = 3$", "$x = -3$", "$x = 3$ hoặc $x = -3$", "không có số $x$ nào"],
            answer: 3,
            explain: "Giá trị tuyệt đối luôn lớn hơn hoặc bằng 0, nên không có số thực nào có giá trị tuyệt đối bằng $-3$. (Chú ý $|3| = |-3| = 3$, không phải $-3$.)"
          },
          {
            id: "d2q8", level: "vua", source: "SBT Bài 7 – BT 2.25",
            q: "So sánh $a = 1{,}(41)$ và $\\sqrt{2}$, ta được",
            options: ["$a > \\sqrt{2}$", "$a = \\sqrt{2}$", "$a < \\sqrt{2}$", "Không so sánh được"],
            answer: 2,
            explain: "$a = 1{,}414141\\ldots$ và $\\sqrt{2} = 1{,}414213\\ldots$ Hai số giống nhau đến chữ số $1{,}414$; chữ số tiếp theo $1 < 2$. Vậy $a < \\sqrt{2}$. (Cũng có thể thấy $a$ là số hữu tỉ, $\\sqrt{2}$ là số vô tỉ nên chắc chắn $a \\ne \\sqrt{2}$.)"
          },
          {
            id: "d2q9", level: "kho", source: "SBT Bài 7 – Ví dụ 3",
            q: "Không dùng máy tính, số $\\sqrt{3}$ nằm giữa hai số nào sau đây?",
            options: ["$1{,}6$ và $1{,}7$", "$1{,}7$ và $1{,}8$", "$1{,}8$ và $1{,}9$", "$1{,}5$ và $1{,}6$"],
            answer: 1,
            explain: "$1{,}7^2 = 2{,}89 < 3$ và $1{,}8^2 = 3{,}24 > 3$, nên $\\sqrt{2{,}89} < \\sqrt{3} < \\sqrt{3{,}24}$, tức $1{,}7 < \\sqrt{3} < 1{,}8$."
          },
          {
            id: "d2q10", level: "kho", source: "SBT Bài 7 – BT 2.28b",
            q: "Dấu và giá trị tuyệt đối của số $1 - \\sqrt{2}$ là",
            options: ["Âm; $\\sqrt{2} - 1$", "Dương; $1 - \\sqrt{2}$", "Âm; $1 - \\sqrt{2}$", "Dương; $\\sqrt{2} - 1$"],
            answer: 0,
            explain: "$\\sqrt{2} > \\sqrt{1} = 1$ nên $1 - \\sqrt{2} < 0$ (số âm). Giá trị tuyệt đối của số âm là số đối của nó: $|1 - \\sqrt{2}| = \\sqrt{2} - 1$."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SBT Bài 7 – BT 2.28", maxPoints: 1.5,
            q: "Xác định dấu và giá trị tuyệt đối của mỗi số thực sau:<br>a) $a = -1{,}3(51)$;<br>b) $b = 2 - \\sqrt{5}$.",
            modelAnswer: "a) $a = -1{,}3(51) < 0$ nên $a$ là số âm và $|a| = 1{,}3(51)$.<br>" +
              "b) Vì $5 > 4$ nên $\\sqrt{5} > \\sqrt{4} = 2$, do đó $b = 2 - \\sqrt{5} < 0$: $b$ là số âm.<br>" +
              "$|b| = -(2 - \\sqrt{5}) = \\sqrt{5} - 2$.",
            rubric: [
              { pts: 0.5, text: "Câu a: $a$ âm, $|a| = 1{,}3(51)$." },
              { pts: 0.5, text: "Câu b: lập luận $\\sqrt{5} > 2$ nên $b$ âm." },
              { pts: 0.5, text: "Câu b: $|b| = \\sqrt{5} - 2$." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SBT Bài 7 – BT 2.26 (biến đổi)", maxPoints: 1.5,
            q: "Sắp xếp các số thực sau theo thứ tự từ bé đến lớn (có giải thích):<br>$\\sqrt{7};\\ \\ -2{,}(6);\\ \\ \\frac{8}{3};\\ \\ -\\sqrt{6};\\ \\ 2{,}6$.",
            modelAnswer: "Viết dưới dạng số thập phân: $\\sqrt{7} = 2{,}6457\\ldots$; $\\ -2{,}(6) = -2{,}666\\ldots$; $\\ \\frac{8}{3} = 2{,}666\\ldots$; $\\ -\\sqrt{6} = -2{,}449\\ldots$; $\\ 2{,}6$.<br>" +
              "Số âm: $2{,}666\\ldots > 2{,}449\\ldots$ nên $-2{,}(6) < -\\sqrt{6}$.<br>" +
              "Số dương: $2{,}6 < 2{,}6457\\ldots < 2{,}666\\ldots$ nên $2{,}6 < \\sqrt{7} < \\frac{8}{3}$.<br>" +
              "Vậy: $-2{,}(6) < -\\sqrt{6} < 2{,}6 < \\sqrt{7} < \\frac{8}{3}$.",
            rubric: [
              { pts: 0.5, text: "Viết đúng dạng thập phân (gần đúng) của $\\sqrt{7}$, $\\sqrt{6}$, $\\frac{8}{3}$, $-2{,}(6)$." },
              { pts: 0.5, text: "So sánh đúng hai số âm: $-2{,}(6) < -\\sqrt{6}$." },
              { pts: 0.5, text: "So sánh đúng các số dương và viết đúng thứ tự cuối cùng." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.33 – Luyện tập 1a",
            q: "Cách viết nào sau đây đúng?",
            options: ["$\\frac{1}{3} \\in \\mathbb{I}$", "$\\sqrt{9} \\in \\mathbb{I}$", "$\\sqrt{11} \\in \\mathbb{R}$", "$-\\sqrt{3} \\in \\mathbb{Q}$"],
            answer: 2,
            explain: "$\\sqrt{11}$ là số vô tỉ, mà mọi số vô tỉ đều là số thực nên $\\sqrt{11} \\in \\mathbb{R}$. $\\frac{1}{3}$ và $\\sqrt{9} = 3$ là số hữu tỉ (không thuộc $\\mathbb{I}$); $-\\sqrt{3}$ là số vô tỉ (không thuộc $\\mathbb{Q}$)."
          },
          {
            id: "d3q2", level: "de", source: "SBT Bài 7 – BT 2.24",
            q: "Số đối của $\\frac{2}{\\pi}$ là",
            options: ["$\\frac{\\pi}{2}$", "$-\\frac{2}{\\pi}$", "$\\frac{2}{\\pi}$", "$-\\frac{\\pi}{2}$"],
            answer: 1,
            explain: "Số đối của $a$ là $-a$, nên số đối của $\\frac{2}{\\pi}$ là $-\\frac{2}{\\pi}$. ($\\frac{\\pi}{2}$ là số nghịch đảo.)"
          },
          {
            id: "d3q3", level: "de", source: "SGK tr.36 – Luyện tập 4d",
            q: "$|-\\sqrt{8}|$ bằng",
            options: ["$\\sqrt{8}$", "$-\\sqrt{8}$", "$8$", "$-8$"],
            answer: 0,
            explain: "$-\\sqrt{8} < 0$ nên $|-\\sqrt{8}| = -(-\\sqrt{8}) = \\sqrt{8}$."
          },
          {
            id: "d3q4", level: "de", source: "mới",
            q: "Với mọi số thực $a$, khẳng định nào sau đây <b>luôn</b> đúng?",
            options: ["$|a| < 0$", "$|a| = a$", "$|a| = -a$", "$|a| \\ge 0$"],
            answer: 3,
            explain: "$|a|$ là khoảng cách từ điểm $a$ đến gốc $O$ nên luôn $\\ge 0$. $|a| = a$ chỉ đúng khi $a \\ge 0$; $|a| = -a$ chỉ đúng khi $a \\le 0$."
          },
          {
            id: "d3q5", level: "vua", source: "SBT Bài 7 – BT 2.24",
            q: "Số đối của $3 - \\sqrt{2}$ là",
            options: ["$3 + \\sqrt{2}$", "$-3 - \\sqrt{2}$", "$\\sqrt{2} - 3$", "$\\frac{1}{3 - \\sqrt{2}}$"],
            answer: 2,
            explain: "$-(3 - \\sqrt{2}) = -3 + \\sqrt{2} = \\sqrt{2} - 3$. Kiểm tra: $(3 - \\sqrt{2}) + (\\sqrt{2} - 3) = 0$."
          },
          {
            id: "d3q6", level: "vua", source: "SGK tr.35 – Hình 2.5",
            q: "Trên trục số, số nào sau đây được biểu diễn bởi một điểm nằm giữa hai điểm $2$ và $3$?",
            options: ["$\\sqrt{5}$", "$\\sqrt{3}$", "$\\sqrt{10}$", "$\\sqrt{2}$"],
            answer: 0,
            explain: "$4 < 5 < 9$ nên $\\sqrt{4} < \\sqrt{5} < \\sqrt{9}$, tức $2 < \\sqrt{5} < 3$. Còn $\\sqrt{2}, \\sqrt{3}$ nhỏ hơn $2$ (vì $2, 3 < 4$) và $\\sqrt{10} > 3$ (vì $10 > 9$)."
          },
          {
            id: "d3q7", level: "vua", source: "SGK Bài 7 – BT 2.17c",
            q: "Dấu và giá trị tuyệt đối của số $c = -1{,}414213562\\ldots$ là",
            options: ["Dương; $1{,}414213562\\ldots$", "Âm; $-1{,}414213562\\ldots$", "Dương; $-1{,}414213562\\ldots$", "Âm; $1{,}414213562\\ldots$"],
            answer: 3,
            explain: "$c < 0$ nên $c$ là số âm, và $|c| = -c = 1{,}414213562\\ldots$ (giá trị tuyệt đối không âm)."
          },
          {
            id: "d3q8", level: "vua", source: "mới",
            q: "Số lớn nhất trong các số $3{,}(1);\\ \\sqrt{10};\\ \\pi;\\ 3{,}16$ là",
            options: ["$3{,}(1)$", "$\\sqrt{10}$", "$\\pi$", "$3{,}16$"],
            answer: 1,
            explain: "$3{,}(1) = 3{,}111\\ldots$; $\\ \\sqrt{10} = 3{,}1622\\ldots$; $\\ \\pi = 3{,}1415\\ldots$; $\\ 3{,}16 = 3{,}1600$. So sánh: $3{,}1622\\ldots$ lớn nhất, nên $\\sqrt{10}$ lớn nhất."
          },
          {
            id: "d3q9", level: "kho", source: "SBT Bài 7 – BT 2.33",
            q: "So sánh $a = 0{,}(12)$ và $b = 0{,}1(21)$, ta được",
            options: ["$a = b$", "$a < b$", "$a > b$", "Không so sánh được"],
            answer: 0,
            explain: "$a = 0{,}121212\\ldots$ và $b = 0{,}1212121\\ldots$ — viết ra thì các chữ số giống hệt nhau. Thật vậy, cả hai đều bằng $\\frac{12}{99} = \\frac{4}{33}$. Vậy $a = b$."
          },
          {
            id: "d3q10", level: "kho", source: "mới",
            q: "Có bao nhiêu số nguyên $x$ thỏa mãn $|x| \\le \\sqrt{10}$?",
            options: ["$6$", "$7$", "$3$", "$4$"],
            answer: 1,
            explain: "$\\sqrt{10} = 3{,}16\\ldots$ nên $-3{,}16\\ldots \\le x \\le 3{,}16\\ldots$ Các số nguyên thỏa mãn: $-3; -2; -1; 0; 1; 2; 3$, gồm 7 số."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SBT Bài 7 – BT 2.32 (biến đổi)", maxPoints: 2,
            q: "Tính:<br>a) $\\sqrt{0{,}36} - \\sqrt{0{,}64}$;<br>b) $0{,}3 \\cdot \\sqrt{400} - |-\\sqrt{0{,}81}|$;<br>c) $|2 - \\sqrt{5}| + 2$.",
            modelAnswer: "a) $\\sqrt{0{,}36} - \\sqrt{0{,}64} = 0{,}6 - 0{,}8 = -0{,}2$.<br>" +
              "b) $\\sqrt{400} = 20$ và $|-\\sqrt{0{,}81}| = \\sqrt{0{,}81} = 0{,}9$. Vậy $0{,}3 \\cdot 20 - 0{,}9 = 6 - 0{,}9 = 5{,}1$.<br>" +
              "c) Vì $\\sqrt{5} > \\sqrt{4} = 2$ nên $2 - \\sqrt{5} < 0$, do đó $|2 - \\sqrt{5}| = \\sqrt{5} - 2$.<br>Vậy $|2 - \\sqrt{5}| + 2 = \\sqrt{5} - 2 + 2 = \\sqrt{5}$.",
            rubric: [
              { pts: 0.5, text: "Câu a: tính đúng $0{,}6 - 0{,}8 = -0{,}2$." },
              { pts: 0.5, text: "Câu b: $\\sqrt{400} = 20$ và $|-\\sqrt{0{,}81}| = 0{,}9$." },
              { pts: 0.5, text: "Câu b: kết quả đúng $5{,}1$." },
              { pts: 0.5, text: "Câu c: xét dấu $2 - \\sqrt{5} < 0$, bỏ dấu giá trị tuyệt đối đúng, kết quả $\\sqrt{5}$." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SBT Bài 7 – BT 2.27", maxPoints: 1,
            q: "Tìm các số thực $x$ có giá trị tuyệt đối bằng $1{,}6(7)$. Điểm biểu diễn các số tìm được nằm trong hay nằm ngoài khoảng giữa hai điểm $-2$ và $2{,}(1)$ trên trục số?",
            modelAnswer: "$|x| = 1{,}6(7)$ nên $x = 1{,}6(7)$ hoặc $x = -1{,}6(7)$.<br>" +
              "Ta có $-2 < -1{,}6(7)$ (vì $2 > 1{,}677\\ldots$) và $1{,}6(7) = 1{,}677\\ldots < 2{,}111\\ldots = 2{,}(1)$.<br>" +
              "Do đó $-2 < -1{,}6(7) < 1{,}6(7) < 2{,}(1)$: cả hai điểm đều nằm <b>trong</b> khoảng giữa hai điểm $-2$ và $2{,}(1)$.",
            rubric: [
              { pts: 0.5, text: "Tìm đủ hai giá trị $x = \\pm 1{,}6(7)$." },
              { pts: 0.5, text: "So sánh đúng và kết luận cả hai điểm nằm trong khoảng." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 4 – NÂNG CAO =======================
      {
        id: "d4", name: "Đề 4 – Nâng cao", advanced: true,
        mcq: [
          {
            id: "d4q1", level: "vua", source: "SBT Bài 7 – Ví dụ 1",
            q: "Biết $\\sqrt{2}$ là số vô tỉ. Số $3 - \\sqrt{2}$ là",
            options: ["số hữu tỉ", "số vô tỉ", "số nguyên", "số tự nhiên"],
            answer: 1,
            explain: "Nếu $3 - \\sqrt{2} = q$ là số hữu tỉ thì $\\sqrt{2} = 3 - q$ cũng là số hữu tỉ (hiệu hai số hữu tỉ), vô lí. Vậy $3 - \\sqrt{2}$ là số vô tỉ."
          },
          {
            id: "d4q2", level: "vua", source: "SBT Bài 7 – BT 2.31",
            q: "Biết $\\sqrt{11}$ là số vô tỉ. Phép tính nào sau đây có kết quả là số hữu tỉ?",
            options: ["$\\frac{1}{\\sqrt{11}}$", "$1 + \\sqrt{11}$", "$\\sqrt{11} \\cdot \\sqrt{11}$", "$2\\sqrt{11}$"],
            answer: 2,
            explain: "$\\sqrt{11} \\cdot \\sqrt{11} = (\\sqrt{11})^2 = 11$ là số hữu tỉ. Ba số còn lại đều là số vô tỉ (nếu chúng hữu tỉ thì suy ra $\\sqrt{11}$ hữu tỉ, vô lí)."
          },
          {
            id: "d4q3", level: "kho", source: "SBT Bài 7 – BT 2.28c",
            q: "Dấu và giá trị tuyệt đối của số $(3 - \\sqrt{2})(2 - \\sqrt{5})$ là",
            options: ["Âm; $(3 - \\sqrt{2})(\\sqrt{5} - 2)$", "Dương; $(3 - \\sqrt{2})(2 - \\sqrt{5})$", "Âm; $(\\sqrt{2} - 3)(\\sqrt{5} - 2)$", "Dương; $(\\sqrt{2} - 3)(2 - \\sqrt{5})$"],
            answer: 0,
            explain: "$\\sqrt{2} < \\sqrt{9} = 3$ nên $3 - \\sqrt{2} > 0$; $\\sqrt{5} > \\sqrt{4} = 2$ nên $2 - \\sqrt{5} < 0$. Tích một số dương với một số âm là số âm. Giá trị tuyệt đối là số đối: $(3 - \\sqrt{2})(\\sqrt{5} - 2)$."
          },
          {
            id: "d4q4", level: "kho", source: "SBT Bài 7 – BT 2.34",
            q: "Giá trị nhỏ nhất của biểu thức $A = 2 + 3\\sqrt{x^2 + 1}$ là",
            options: ["$2$", "$3$", "$5$", "$8$"],
            answer: 2,
            explain: "$x^2 \\ge 0$ nên $x^2 + 1 \\ge 1$, suy ra $\\sqrt{x^2 + 1} \\ge 1$ và $A \\ge 2 + 3 \\cdot 1 = 5$. Dấu bằng xảy ra khi $x = 0$. Vậy giá trị nhỏ nhất là $5$."
          },
          {
            id: "d4q5", level: "kho", source: "SBT Bài 7 – BT 2.35",
            q: "Giá trị nhỏ nhất của biểu thức $B = |x - 1| + |x - 3|$ là",
            options: ["$0$", "$1$", "$4$", "$2$"],
            answer: 3,
            explain: "$|x - 1|$ và $|x - 3|$ là khoảng cách từ điểm $x$ đến hai điểm $1$ và $3$ trên trục số. Tổng hai khoảng cách này nhỏ nhất bằng khoảng cách giữa $1$ và $3$, tức là $2$, đạt được khi $1 \\le x \\le 3$."
          },
          {
            id: "d4q6", level: "kho", source: "SBT Bài 7 – BT 2.36",
            q: "Khẳng định nào sau đây đúng với <b>mọi</b> số thực $x, y$?",
            options: ["$|x + y| = |x| + |y|$", "$|x + y| \\le |x| + |y|$", "$|x - y| = |x| - |y|$", "$|x + y| \\ge |x| + |y|$"],
            answer: 1,
            explain: "Luôn có $|x + y| \\le |x| + |y|$ (dấu bằng khi $x, y$ cùng dấu hoặc có số bằng 0). Phản ví dụ cho các khẳng định khác: $x = 1, y = -1$ thì $|x + y| = 0 < 2 = |x| + |y|$; $|1 - (-1)| = 2 \\ne 0 = |1| - |-1|$."
          },
          {
            id: "d4q7", level: "kho", source: "mới",
            q: "Có bao nhiêu số nguyên $x$ thỏa mãn $|x - 2| < 3$?",
            options: ["$5$", "$6$", "$7$", "$4$"],
            answer: 0,
            explain: "$|x - 2| < 3$ nghĩa là $-3 < x - 2 < 3$, tức $-1 < x < 5$. Các số nguyên: $0; 1; 2; 3; 4$, gồm 5 số."
          },
          {
            id: "d4q8", level: "kho", source: "SBT Bài 7 – Ví dụ 2",
            q: "Cho số thực $x$ thỏa mãn $-\\sqrt{7} \\le x \\le \\sqrt{7}$. Khẳng định nào sau đây <b>luôn</b> đúng?",
            options: ["$|x| \\ge \\sqrt{7}$", "$|x| = \\sqrt{7}$", "$x \\ge 0$", "$|x| \\le \\sqrt{7}$"],
            answer: 3,
            explain: "Điểm $x$ nằm giữa hai điểm $-\\sqrt{7}$ và $\\sqrt{7}$, hai điểm này cách $O$ đúng $\\sqrt{7}$, nên khoảng cách từ $x$ tới $O$ không vượt quá $\\sqrt{7}$: $|x| \\le \\sqrt{7}$. (Ví dụ $x = -1$ cho thấy các khẳng định khác có thể sai.)"
          },
          {
            id: "d4q9", level: "kho", source: "mới",
            q: "Giá trị của biểu thức $|\\sqrt{3} - 2| + |\\sqrt{3} - 1|$ là",
            options: ["$2\\sqrt{3} - 3$", "$1$", "$3 - 2\\sqrt{3}$", "$-1$"],
            answer: 1,
            explain: "$1 < \\sqrt{3} < 2$ nên $\\sqrt{3} - 2 < 0$ và $\\sqrt{3} - 1 > 0$. Do đó biểu thức bằng $(2 - \\sqrt{3}) + (\\sqrt{3} - 1) = 1$."
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Các số thực $x$ thỏa mãn $|x - 1{,}5| = 2$ là",
            options: ["chỉ có $x = 3{,}5$", "chỉ có $x = -0{,}5$", "$x = 3{,}5$ hoặc $x = -0{,}5$", "$x = 0{,}5$ hoặc $x = -3{,}5$"],
            answer: 2,
            explain: "$|x - 1{,}5| = 2$ nên $x - 1{,}5 = 2$ hoặc $x - 1{,}5 = -2$, tức $x = 3{,}5$ hoặc $x = -0{,}5$."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "SBT Bài 7 – BT 2.35 (biến đổi)", maxPoints: 1.5,
            q: "Tìm giá trị nhỏ nhất của biểu thức $B = |x - 2| + |x - 6|$ và các giá trị của $x$ để $B$ đạt giá trị nhỏ nhất đó.",
            modelAnswer: "Trên trục số, $|x - 2|$ là khoảng cách từ điểm $x$ đến điểm $2$, $|x - 6|$ là khoảng cách từ điểm $x$ đến điểm $6$.<br>" +
              "• Nếu $x$ nằm ngoài đoạn giữa $2$ và $6$ (tức $x < 2$ hoặc $x > 6$) thì tổng hai khoảng cách lớn hơn khoảng cách giữa $2$ và $6$, tức $B > 4$.<br>" +
              "• Nếu $2 \\le x \\le 6$ thì $B = (x - 2) + (6 - x) = 4$.<br>" +
              "Vậy giá trị nhỏ nhất của $B$ là $4$, đạt được khi $2 \\le x \\le 6$.<br>" +
              "(Cách khác: $B = |x - 2| + |6 - x| \\ge |(x - 2) + (6 - x)| = 4$.)",
            rubric: [
              { pts: 0.5, text: "Diễn giải được $B$ là tổng khoảng cách (hoặc dùng bất đẳng thức $|a| + |b| \\ge |a + b|$, hoặc xét các trường hợp)." },
              { pts: 0.5, text: "Chứng tỏ được $B \\ge 4$ với mọi $x$." },
              { pts: 0.5, text: "Kết luận giá trị nhỏ nhất bằng $4$, đạt được khi $2 \\le x \\le 6$." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "SBT Bài 7 – Ví dụ 1, Ví dụ 3 (biến đổi)", maxPoints: 1.5,
            q: "Biết $\\sqrt{3}$ là số vô tỉ.<br>a) Chứng tỏ $2 + \\sqrt{3}$ là số vô tỉ.<br>b) Không dùng máy tính, so sánh $2 + \\sqrt{3}$ với $3{,}7$.",
            modelAnswer: "a) Giả sử $2 + \\sqrt{3} = q$ là số hữu tỉ. Khi đó $\\sqrt{3} = q - 2$ là hiệu của hai số hữu tỉ nên cũng là số hữu tỉ. Điều này vô lí vì $\\sqrt{3}$ là số vô tỉ. Vậy $2 + \\sqrt{3}$ là số vô tỉ.<br>" +
              "b) $1{,}7^2 = 2{,}89 < 3$ nên $\\sqrt{2{,}89} < \\sqrt{3}$, tức $1{,}7 < \\sqrt{3}$.<br>" +
              "Do đó $2 + \\sqrt{3} > 2 + 1{,}7 = 3{,}7$.",
            rubric: [
              { pts: 0.5, text: "Câu a: giả sử $2 + \\sqrt{3}$ hữu tỉ và suy ra $\\sqrt{3} = q - 2$." },
              { pts: 0.5, text: "Câu a: chỉ ra mâu thuẫn và kết luận." },
              { pts: 0.5, text: "Câu b: chứng tỏ $\\sqrt{3} > 1{,}7$ (qua $1{,}7^2 = 2{,}89 < 3$) và kết luận $2 + \\sqrt{3} > 3{,}7$." }
            ]
          }
        ]
      }
    ]
  });
})();
