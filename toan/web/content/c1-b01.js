(function () {
  // Vẽ trục số bằng SVG (dùng currentColor để hợp chế độ sáng/tối).
  // o = { min, max, div (số phần chia mỗi đơn vị), labels: [[giá trị, "nhãn" | [tử, mẫu]]], pts: [[giá trị, "tên"]] }
  function axis(o) {
    var W = o.w || 360, H = 84, y = 36, pad = 24;
    var x = function (v) { return (pad + (v - o.min) / (o.max - o.min) * (W - 2 * pad)).toFixed(1); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:6px auto" role="img" aria-label="Trục số">';
    s += '<line x1="6" y1="' + y + '" x2="' + (W - 6) + '" y2="' + y + '" stroke="currentColor" stroke-width="1.5"/>';
    s += '<path d="M' + (W - 4) + ' ' + y + ' l-9 -4.5 v9 z" fill="currentColor"/>';
    for (var k = o.min * o.div; k <= o.max * o.div; k++) {
      var h = (k % o.div === 0) ? 7 : 4;
      var xx = x(k / o.div);
      s += '<line x1="' + xx + '" y1="' + (y - h) + '" x2="' + xx + '" y2="' + (y + h) + '" stroke="currentColor" stroke-width="1.2"/>';
    }
    (o.labels || []).forEach(function (l) {
      var xx = x(l[0]), t = l[1];
      if (Array.isArray(t)) {
        s += '<text x="' + xx + '" y="' + (y + 22) + '" font-size="12" text-anchor="middle" fill="currentColor">' + t[0] + '</text>';
        s += '<line x1="' + (xx - 8) + '" y1="' + (y + 26) + '" x2="' + (+xx + 8) + '" y2="' + (y + 26) + '" stroke="currentColor" stroke-width="1"/>';
        s += '<text x="' + xx + '" y="' + (y + 39) + '" font-size="12" text-anchor="middle" fill="currentColor">' + t[1] + '</text>';
      } else {
        s += '<text x="' + xx + '" y="' + (y + 24) + '" font-size="13" text-anchor="middle" fill="currentColor">' + t + '</text>';
      }
    });
    (o.pts || []).forEach(function (p) {
      var xx = x(p[0]);
      s += '<circle cx="' + xx + '" cy="' + y + '" r="4" fill="#e5484d"/>';
      s += '<text x="' + xx + '" y="' + (y - 12) + '" font-size="13" font-weight="bold" text-anchor="middle" fill="#e5484d">' + p[1] + '</text>';
    });
    return s + '</svg>';
  }

  registerLesson({
    id: "c1-b01",
    chapter: 1,
    kind: "lesson",
    title: "Bài 1. Tập hợp các số hữu tỉ",
    sgkPages: [5, 9],
    sbtPages: [5, 8],
    objectives: [
      "Nhận biết số hữu tỉ, tập hợp $\\mathbb{Q}$ và số đối của một số hữu tỉ",
      "Biểu diễn số hữu tỉ trên trục số",
      "So sánh hai số hữu tỉ, sắp xếp các số hữu tỉ theo thứ tự",
      "Vận dụng so sánh số hữu tỉ vào bài toán thực tế"
    ],

    theory: [
      {
        heading: "1. Số hữu tỉ",
        html: "<b>Số hữu tỉ</b> là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z},\\ b \\ne 0$. Tập hợp các số hữu tỉ kí hiệu là $\\mathbb{Q}$." +
          "<ul><li>Các phân số bằng nhau là những cách viết khác nhau của <b>cùng một</b> số hữu tỉ: $1{,}5 = \\frac{3}{2} = \\frac{6}{4} = \\frac{9}{6} = \\dots$</li>" +
          "<li>Số nguyên, số thập phân (hữu hạn), hỗn số đều là số hữu tỉ, ví dụ: $-7 = \\frac{-7}{1}$; $\\ 0{,}6 = \\frac{6}{10}$; $\\ -1{,}2 = \\frac{-12}{10}$; $\\ 1\\frac{4}{5} = \\frac{9}{5}$.</li>" +
          "<li>Quan hệ giữa các tập hợp số: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}$.</li>" +
          "<li>Biểu thức $\\frac{5}{0}$ <b>không</b> phải là số (mẫu bằng 0), nên không là số hữu tỉ.</li></ul>"
      },
      {
        heading: "2. Số đối của một số hữu tỉ",
        html: "Mỗi số hữu tỉ $m$ đều có một <b>số đối</b> là $-m$, và $m + (-m) = 0$." +
          "<ul><li>Số đối của $\\frac{2}{5}$ là $-\\frac{2}{5}$; số đối của $-0{,}75$ là $0{,}75$; số đối của $0$ là $0$.</li>" +
          "<li>Chú ý: $-(-m) = m$. Ví dụ số đối của $\\frac{-3}{-7}$ (tức $\\frac{3}{7}$) là $-\\frac{3}{7}$.</li></ul>"
      },
      {
        heading: "3. Biểu diễn số hữu tỉ trên trục số",
        html: "Mỗi số hữu tỉ được biểu diễn bởi đúng một điểm trên trục số; điểm biểu diễn số $a$ gọi là <b>điểm $a$</b>. Cách biểu diễn số $\\frac{a}{b}$ (viết với mẫu dương $b$):" +
          "<ul><li>Chia đoạn thẳng đơn vị (từ 0 đến 1) thành $b$ phần bằng nhau; mỗi phần là một <b>đơn vị mới</b> bằng $\\frac{1}{b}$ đơn vị cũ.</li>" +
          "<li>Nếu $\\frac{a}{b} > 0$: lấy điểm nằm <b>bên phải</b> (sau) gốc $O$, cách $O$ một đoạn $a$ đơn vị mới. Nếu $\\frac{a}{b} < 0$: lấy điểm nằm <b>bên trái</b> (trước) gốc $O$, cách $O$ một đoạn $|a|$ đơn vị mới.</li></ul>" +
          "Ví dụ: điểm $M$ biểu diễn $\\frac{3}{2}$, điểm $N$ biểu diễn $-\\frac{3}{2}$ (đơn vị mới bằng $\\frac{1}{2}$):" +
          axis({ min: -2, max: 2, div: 2, labels: [[-2, "−2"], [-1, "−1"], [0, "0"], [1, "1"], [2, "2"]], pts: [[-1.5, "N"], [1.5, "M"]] }) +
          "Hai số đối nhau $a$ và $-a$ được biểu diễn bởi hai điểm nằm về hai phía của $O$ và cách đều $O$ (ở trên $OM = ON$)." +
          "<br>Muốn biểu diễn nhiều số trên cùng một trục số, ta <b>quy đồng mẫu</b> (lấy mẫu chung dương) rồi chia đoạn đơn vị theo mẫu chung đó."
      },
      {
        heading: "4. Thứ tự trong tập hợp số hữu tỉ",
        html: "<ul><li>Với hai số hữu tỉ $a, b$ bất kì, luôn có đúng một trong ba trường hợp: $a = b$, $a < b$ hoặc $a > b$.</li>" +
          "<li>Để so sánh, ta viết hai số dưới dạng phân số <b>có cùng mẫu dương</b> rồi so sánh tử: với $m > 0$, $\\frac{a}{m} < \\frac{b}{m} \\Leftrightarrow a < b$.</li>" +
          "<li>Nếu cả hai số cho dưới dạng số thập phân thì so sánh trực tiếp như số thập phân.</li>" +
          "<li><b>Tính chất bắc cầu:</b> nếu $a < b$ và $b < c$ thì $a < c$.</li>" +
          "<li>Trên trục số (nằm ngang, chiều từ trái sang phải), nếu $a < b$ thì điểm $a$ nằm <b>trước</b> (bên trái) điểm $b$.</li>" +
          "<li>Số hữu tỉ lớn hơn 0 gọi là <b>số hữu tỉ dương</b>; nhỏ hơn 0 gọi là <b>số hữu tỉ âm</b>. Số $0$ không là số hữu tỉ dương, cũng không là số hữu tỉ âm.</li>" +
          "<li>Nhận biết dấu: $\\frac{a}{b} > 0$ khi $a, b$ cùng dấu; $\\frac{a}{b} < 0$ khi $a, b$ trái dấu. Ví dụ $\\frac{-5}{-8} > 0$, $\\frac{3}{-4} < 0$.</li></ul>"
      }
    ],

    skills: [
      "<b>So sánh bằng cách quy đồng mẫu:</b> trước hết đưa các phân số về <b>mẫu dương</b> (ví dụ $\\frac{3}{-4} = \\frac{-3}{4}$), rồi quy đồng và so sánh tử.",
      "<b>So sánh bằng cách đưa về cùng tử:</b> khi các tử dễ đưa về chung (ví dụ $9$ và $27$), với các phân số dương cùng tử, phân số nào có mẫu <b>lớn hơn</b> thì <b>nhỏ hơn</b>: $\\frac{9}{71} = \\frac{27}{213} < \\frac{27}{211}$.",
      "<b>So sánh qua số trung gian (bắc cầu):</b> thường dùng $0$, $1$, $-1$ hoặc một phân số dễ nhớ như $\\frac{1}{2}$, $\\frac{1}{3}$. Ví dụ: số âm luôn nhỏ hơn số dương; $\\frac{7}{8} < 1 < \\frac{9}{8}$.",
      "<b>So sánh hai số âm:</b> số nào có \"phần số\" (không kể dấu) lớn hơn thì số đó <b>nhỏ hơn</b>: vì $2{,}5 > 2{,}125$ nên $-2{,}5 < -2{,}125$.",
      "<b>Biểu diễn nhiều số trên một trục số:</b> viết các số dưới dạng phân số tối giản có mẫu dương, tìm mẫu chung (BCNN các mẫu), chia đoạn đơn vị thành số phần bằng mẫu chung.",
      "<b>Sắp xếp nhiều số:</b> tách nhóm số âm và nhóm số dương; so sánh trong từng nhóm (có thể đổi hết ra số thập phân hoặc quy đồng mẫu).",
      "<b>Lỗi hay gặp:</b> quy đồng khi mẫu còn âm (dẫn tới so sánh sai); cho rằng $0$ là số hữu tỉ dương; nghĩ $\\frac{-3}{-7}$ là số âm; so sánh hai số âm như so sánh hai số dương; nhầm $\\frac{5}{0}$ là số hữu tỉ."
    ],

    examples: [
      {
        q: "So sánh $-0{,}75$ và $\\frac{-4}{5}$.",
        solution: "Cách 1 (đưa về phân số cùng mẫu): $-0{,}75 = \\frac{-3}{4} = \\frac{-15}{20}$ và $\\frac{-4}{5} = \\frac{-16}{20}$.<br>" +
          "Vì $-15 > -16$ nên $\\frac{-15}{20} > \\frac{-16}{20}$, tức là $-0{,}75 > \\frac{-4}{5}$.<br>" +
          "Cách 2 (đưa về số thập phân): $\\frac{-4}{5} = -0{,}8$. Vì $0{,}75 < 0{,}8$ nên $-0{,}75 > -0{,}8$."
      },
      {
        q: "Biểu diễn các số hữu tỉ $-\\frac{3}{4}$ và $\\frac{1}{2}$ trên cùng một trục số.",
        solution: "Mẫu chung dương của $4$ và $2$ là $4$: $\\frac{1}{2} = \\frac{2}{4}$.<br>" +
          "Chia đoạn đơn vị thành $4$ phần bằng nhau (đơn vị mới bằng $\\frac{1}{4}$ đơn vị cũ).<br>" +
          "• Điểm $A$ biểu diễn $-\\frac{3}{4}$: nằm bên trái $O$, cách $O$ là $3$ đơn vị mới.<br>" +
          "• Điểm $B$ biểu diễn $\\frac{1}{2} = \\frac{2}{4}$: nằm bên phải $O$, cách $O$ là $2$ đơn vị mới." +
          axis({ min: -1, max: 1, div: 4, w: 320, labels: [[-1, "−1"], [-0.75, ["−3", "4"]], [0, "0"], [0.5, ["1", "2"]], [1, "1"]], pts: [[-0.75, "A"], [0.5, "B"]] })
      },
      {
        q: "So sánh $\\frac{9}{71}$ và $\\frac{27}{211}$.",
        solution: "Nhận thấy $27 = 9 \\cdot 3$ nên đưa về cùng tử: $\\frac{9}{71} = \\frac{9 \\cdot 3}{71 \\cdot 3} = \\frac{27}{213}$.<br>" +
          "Hai phân số dương có cùng tử $27$; mẫu $213 > 211$ nên $\\frac{27}{213} < \\frac{27}{211}$.<br>" +
          "Vậy $\\frac{9}{71} < \\frac{27}{211}$."
      },
      {
        q: "Sắp xếp các số $5\\frac{1}{4};\\ -2;\\ 3{,}125;\\ -\\frac{3}{2}$ theo thứ tự từ nhỏ đến lớn.",
        solution: "Nhóm số âm: $-2$ và $-\\frac{3}{2} = -1{,}5$. Vì $2 > 1{,}5$ nên $-2 < -\\frac{3}{2}$.<br>" +
          "Nhóm số dương: $5\\frac{1}{4} = 5{,}25$ và $3{,}125$. Vì $3{,}125 < 5{,}25$ nên $3{,}125 < 5\\frac{1}{4}$.<br>" +
          "Số âm luôn nhỏ hơn số dương, nên thứ tự từ nhỏ đến lớn là: $-2;\\ -\\frac{3}{2};\\ 3{,}125;\\ 5\\frac{1}{4}$."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK Bài 1 – BT 1.1",
            q: "Khẳng định nào sau đây đúng?",
            options: ["$-5 \\in \\mathbb{N}$", "$\\frac{2}{3} \\in \\mathbb{Z}$", "$-1{,}5 \\in \\mathbb{Q}$", "$\\frac{-4}{9} \\notin \\mathbb{Q}$"],
            answer: 2,
            explain: "$-1{,}5 = \\frac{-3}{2}$ viết được dưới dạng phân số nên $-1{,}5 \\in \\mathbb{Q}$. Còn $-5$ không là số tự nhiên, $\\frac{2}{3}$ không là số nguyên, $\\frac{-4}{9}$ là số hữu tỉ."
          },
          {
            id: "d1q2", level: "de", source: "SGK Bài 1 – BT 1.2",
            q: "Số đối của $-\\frac{3}{7}$ là",
            options: ["$\\frac{3}{7}$", "$-\\frac{7}{3}$", "$\\frac{7}{3}$", "$-\\frac{3}{7}$"],
            answer: 0,
            explain: "Số đối của $m$ là $-m$, nên số đối của $-\\frac{3}{7}$ là $-\\left(-\\frac{3}{7}\\right) = \\frac{3}{7}$. (Đừng nhầm số đối với số nghịch đảo.)"
          },
          {
            id: "d1q3", level: "de", source: "SBT Bài 1 – BT 1.3",
            q: "Số nào sau đây là số hữu tỉ dương?",
            options: ["$\\frac{0}{7}$", "$\\frac{-2}{9}$", "$\\frac{3}{-4}$", "$\\frac{-5}{-8}$"],
            answer: 3,
            explain: "$\\frac{-5}{-8} = \\frac{5}{8} > 0$ (tử và mẫu cùng dấu). $\\frac{0}{7} = 0$ không dương; $\\frac{-2}{9}$ và $\\frac{3}{-4}$ là số âm."
          },
          {
            id: "d1q4", level: "de", source: "SGK Bài 1 – BT 1.4",
            q: "Phân số nào sau đây biểu diễn số hữu tỉ $-0{,}4$?",
            options: ["$\\frac{4}{10}$", "$\\frac{-2}{5}$", "$\\frac{-4}{100}$", "$\\frac{-5}{2}$"],
            answer: 1,
            explain: "$-0{,}4 = \\frac{-4}{10} = \\frac{-2}{5}$. Còn $\\frac{4}{10}$ là số dương, $\\frac{-4}{100} = -0{,}04$, $\\frac{-5}{2} = -2{,}5$."
          },
          {
            id: "d1q5", level: "vua", source: "SGK Bài 1 – BT 1.5",
            q: "Khẳng định nào đúng khi so sánh $-0{,}6$ và $-\\frac{5}{8}$?",
            options: ["$-0{,}6 < -\\frac{5}{8}$", "$-0{,}6 > -\\frac{5}{8}$", "$-0{,}6 = -\\frac{5}{8}$", "Không so sánh được vì một số là số thập phân, một số là phân số"],
            answer: 1,
            explain: "$-\\frac{5}{8} = -0{,}625$. Vì $0{,}6 < 0{,}625$ nên $-0{,}6 > -0{,}625$, tức $-0{,}6 > -\\frac{5}{8}$."
          },
          {
            id: "d1q6", level: "vua", source: "SGK tr.7 – Câu hỏi (Hình 1.4)",
            q: "Trên trục số dưới đây, mỗi đoạn đơn vị được chia thành 4 phần bằng nhau. Điểm $M$ biểu diễn số hữu tỉ nào?" +
              axis({ min: -2, max: 2, div: 4, labels: [[-2, "−2"], [-1, "−1"], [0, "0"], [1, "1"], [2, "2"]], pts: [[-0.75, "M"]] }),
            options: ["$\\frac{3}{4}$", "$-\\frac{4}{3}$", "$-\\frac{3}{4}$", "$-3$"],
            answer: 2,
            explain: "Đơn vị mới bằng $\\frac{1}{4}$. Điểm $M$ nằm bên trái $O$, cách $O$ là 3 đơn vị mới nên $M$ biểu diễn $-\\frac{3}{4}$."
          },
          {
            id: "d1q7", level: "vua", source: "SGK tr.8 – Luyện tập 3",
            q: "Sắp xếp các số $-1{,}2;\\ \\frac{1}{3};\\ -\\frac{5}{4};\\ 0{,}3$ theo thứ tự từ nhỏ đến lớn, ta được",
            options: [
              "$-1{,}2;\\ -\\frac{5}{4};\\ 0{,}3;\\ \\frac{1}{3}$",
              "$-\\frac{5}{4};\\ -1{,}2;\\ \\frac{1}{3};\\ 0{,}3$",
              "$-1{,}2;\\ -\\frac{5}{4};\\ \\frac{1}{3};\\ 0{,}3$",
              "$-\\frac{5}{4};\\ -1{,}2;\\ 0{,}3;\\ \\frac{1}{3}$"
            ],
            answer: 3,
            explain: "$-\\frac{5}{4} = -1{,}25 < -1{,}2$ (vì $1{,}25 > 1{,}2$); $\\frac{1}{3} = 0{,}333\\ldots > 0{,}3$. Vậy $-\\frac{5}{4} < -1{,}2 < 0{,}3 < \\frac{1}{3}$."
          },
          {
            id: "d1q8", level: "vua", source: "SBT Bài 1 – BT 1.8",
            q: "Số hữu tỉ nào sau đây lớn hơn $-\\frac{1}{2}$ và nhỏ hơn $-\\frac{1}{3}$?",
            options: ["$-\\frac{1}{4}$", "$-\\frac{3}{5}$", "$-\\frac{2}{5}$", "$-\\frac{1}{6}$"],
            answer: 2,
            explain: "Quy đồng mẫu 30: $-\\frac{1}{2} = -\\frac{15}{30}$, $-\\frac{1}{3} = -\\frac{10}{30}$, $-\\frac{2}{5} = -\\frac{12}{30}$. Vì $-15 < -12 < -10$ nên $-\\frac{2}{5}$ thỏa mãn. ($-\\frac{1}{4}$, $-\\frac{1}{6}$ lớn hơn $-\\frac{1}{3}$; $-\\frac{3}{5}$ nhỏ hơn $-\\frac{1}{2}$.)"
          },
          {
            id: "d1q9", level: "kho", source: "SBT Bài 1 – BT 1.4c",
            q: "Số lớn nhất trong các số $\\frac{8}{55};\\ \\frac{24}{163};\\ \\frac{24}{170};\\ \\frac{4}{30}$ là",
            options: ["$\\frac{8}{55}$", "$\\frac{24}{163}$", "$\\frac{24}{170}$", "$\\frac{4}{30}$"],
            answer: 1,
            explain: "Đưa về cùng tử 24: $\\frac{8}{55} = \\frac{24}{165}$, $\\frac{4}{30} = \\frac{24}{180}$. Các phân số dương cùng tử, mẫu nhỏ nhất ($163$) cho phân số lớn nhất: $\\frac{24}{163}$."
          },
          {
            id: "d1q10", level: "kho", source: "SBT Bài 1 – BT 1.5",
            q: "Tốc độ màn trập của máy ảnh là khoảng thời gian màn trập mở (tính bằng giây); thời gian càng ngắn thì chụp càng nhanh. Trong các tốc độ $\\frac{1}{125}$ giây; $\\frac{1}{60}$ giây; $0{,}01$ giây; $0{,}005$ giây, tốc độ nhanh nhất là",
            options: ["$0{,}005$ giây", "$\\frac{1}{125}$ giây", "$\\frac{1}{60}$ giây", "$0{,}01$ giây"],
            answer: 0,
            explain: "$\\frac{1}{125} = 0{,}008$; $\\frac{1}{60} \\approx 0{,}0167$. So sánh: $0{,}005 < 0{,}008 < 0{,}01 < 0{,}0167$. Thời gian ngắn nhất là $0{,}005$ giây nên đó là tốc độ nhanh nhất."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK Bài 1 – BT 1.6", maxPoints: 3,
            q: "Kết quả nhảy xa (đơn vị: mét) của năm bạn trong giờ thể dục như sau:<br>" +
              "Hà: $3{,}25$; &nbsp; Lan: $3\\frac{1}{5}$; &nbsp; Mai: $\\frac{27}{8}$; &nbsp; Nga: $3{,}3$; &nbsp; Oanh: $3\\frac{2}{7}$.<br>" +
              "a) Sắp xếp các kết quả trên theo thứ tự từ nhỏ đến lớn (trình bày cách so sánh).<br>b) Bạn nào nhảy xa nhất? Bạn nào nhảy gần nhất?",
            modelAnswer: "a) Đổi các số: $3\\frac{1}{5} = 3{,}2$; $\\ \\frac{27}{8} = 3{,}375$. Còn $3\\frac{2}{7}$ không đổi được thành số thập phân hữu hạn, nên so sánh phần phân số:<br>" +
              "• So với $3{,}25 = 3\\frac{1}{4}$: $\\frac{2}{7} = \\frac{8}{28} > \\frac{7}{28} = \\frac{1}{4}$ nên $3\\frac{2}{7} > 3{,}25$.<br>" +
              "• So với $3{,}3 = 3\\frac{3}{10}$: $\\frac{2}{7} = \\frac{20}{70} < \\frac{21}{70} = \\frac{3}{10}$ nên $3\\frac{2}{7} < 3{,}3$.<br>" +
              "Ngoài ra $3{,}2 < 3{,}25$ và $3{,}3 < 3{,}375$.<br>" +
              "Vậy: $3\\frac{1}{5} < 3{,}25 < 3\\frac{2}{7} < 3{,}3 < \\frac{27}{8}$, tức là Lan, Hà, Oanh, Nga, Mai.<br>" +
              "b) Mai nhảy xa nhất ($\\frac{27}{8} = 3{,}375$ m); Lan nhảy gần nhất ($3\\frac{1}{5} = 3{,}2$ m).",
            rubric: [
              { pts: 1, text: "Đổi đúng $3\\frac{1}{5} = 3{,}2$ và $\\frac{27}{8} = 3{,}375$ (hoặc quy đồng hợp lí)." },
              { pts: 1, text: "So sánh đúng $3\\frac{2}{7}$ với $3{,}25$ và $3{,}3$ (có lập luận)." },
              { pts: 0.5, text: "Sắp xếp đúng thứ tự: Lan, Hà, Oanh, Nga, Mai." },
              { pts: 0.5, text: "Kết luận đúng: Mai xa nhất, Lan gần nhất." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SBT Bài 1 – BT 1.1",
            q: "Khẳng định nào sau đây là <b>sai</b>?",
            options: ["Mọi số nguyên đều là số hữu tỉ", "Số 0 là số hữu tỉ dương", "Số hữu tỉ âm nhỏ hơn mọi số tự nhiên", "Số 0 không là số hữu tỉ dương, cũng không là số hữu tỉ âm"],
            answer: 1,
            explain: "Số hữu tỉ dương là số lớn hơn 0, nên 0 không phải số hữu tỉ dương. Ba khẳng định còn lại đều đúng (số hữu tỉ âm $< 0 \\le$ mọi số tự nhiên)."
          },
          {
            id: "d2q2", level: "de", source: "SGK Bài 1 – BT 1.2",
            q: "Số đối của $-2\\frac{1}{3}$ là",
            options: ["$-\\frac{3}{7}$", "$-2\\frac{1}{3}$", "$2\\frac{1}{3}$", "$\\frac{3}{7}$"],
            answer: 2,
            explain: "Số đối của $-2\\frac{1}{3}$ là $2\\frac{1}{3}$ (đổi dấu, giữ nguyên phần số). $\\frac{3}{7}$ hay $-\\frac{3}{7}$ liên quan tới số nghịch đảo, không phải số đối."
          },
          {
            id: "d2q3", level: "de", source: "SBT Bài 1 – BT 1.2",
            q: "Khẳng định nào sau đây đúng?",
            options: ["$-7 \\in \\mathbb{N}$", "$\\frac{-3}{5} \\in \\mathbb{Z}$", "$-7 \\notin \\mathbb{Q}$", "$\\frac{-3}{5} \\in \\mathbb{Q}$"],
            answer: 3,
            explain: "$\\frac{-3}{5}$ có dạng $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\ne 0$ nên thuộc $\\mathbb{Q}$. $-7 \\notin \\mathbb{N}$, $\\frac{-3}{5} \\notin \\mathbb{Z}$, còn $-7 \\in \\mathbb{Q}$."
          },
          {
            id: "d2q4", level: "de", source: "SGK Bài 1 – BT 1.4",
            q: "Phân số nào sau đây <b>không</b> biểu diễn số hữu tỉ $-0{,}625$?",
            options: ["$\\frac{10}{-16}$", "$\\frac{20}{32}$", "$\\frac{-25}{40}$", "$\\frac{-15}{24}$"],
            answer: 1,
            explain: "$-0{,}625 = -\\frac{5}{8}$. Ta có $\\frac{10}{-16} = \\frac{-25}{40} = \\frac{-15}{24} = -\\frac{5}{8}$, còn $\\frac{20}{32} = \\frac{5}{8} > 0$."
          },
          {
            id: "d2q5", level: "vua", source: "SGK tr.5 – Bài toán mở đầu",
            q: "Chỉ số WHtR = vòng bụng : chiều cao (cùng đơn vị). Mức đánh giá: Gầy ($\\le 0{,}42$); Tốt (trên $0{,}42$ đến $0{,}52$); Hơi béo (trên $0{,}52$ đến $0{,}57$); Thừa cân (trên $0{,}57$ đến $0{,}63$). Ông Bình cao 175 cm, vòng bụng 98 cm. Ông Bình thuộc mức nào?",
            options: ["Tốt", "Gầy", "Thừa cân", "Hơi béo"],
            answer: 3,
            explain: "WHtR $= \\frac{98}{175} = \\frac{14}{25} = 0{,}56$. Vì $0{,}52 < 0{,}56 \\le 0{,}57$ nên ông Bình ở mức Hơi béo."
          },
          {
            id: "d2q6", level: "vua", source: "SBT Bài 1 – BT 1.4b",
            q: "Số lớn nhất trong các số $-\\frac{17}{30};\\ -\\frac{11}{20};\\ -\\frac{3}{5};\\ -\\frac{7}{12}$ là",
            options: ["$-\\frac{11}{20}$", "$-\\frac{17}{30}$", "$-\\frac{3}{5}$", "$-\\frac{7}{12}$"],
            answer: 0,
            explain: "Quy đồng mẫu 60: $-\\frac{34}{60};\\ -\\frac{33}{60};\\ -\\frac{36}{60};\\ -\\frac{35}{60}$. Tử lớn nhất là $-33$, nên $-\\frac{11}{20}$ lớn nhất."
          },
          {
            id: "d2q7", level: "vua", source: "SBT Bài 1 – BT 1.6",
            q: "Trên trục số dưới đây, mỗi đoạn đơn vị được chia thành 3 phần bằng nhau. Điểm $A$ biểu diễn số hữu tỉ nào?" +
              axis({ min: -1, max: 2, div: 3, labels: [[-1, "−1"], [0, "0"], [1, "1"], [2, "2"]], pts: [[5 / 3, "A"]] }),
            options: ["$\\frac{2}{3}$", "$-\\frac{5}{3}$", "$\\frac{5}{3}$", "$\\frac{5}{2}$"],
            answer: 2,
            explain: "Đơn vị mới bằng $\\frac{1}{3}$. Điểm $A$ nằm bên phải $O$, cách $O$ là 5 đơn vị mới (3 phần tới điểm 1, thêm 2 phần) nên $A$ biểu diễn $\\frac{5}{3}$."
          },
          {
            id: "d2q8", level: "vua", source: "SBT Bài 1 – BT 1.8",
            q: "Phân số nào sau đây có mẫu bằng 5, lớn hơn $-\\frac{3}{4}$ và nhỏ hơn $-\\frac{1}{4}$?",
            options: ["$\\frac{-4}{5}$", "$\\frac{-1}{5}$", "$\\frac{1}{5}$", "$\\frac{-2}{5}$"],
            answer: 3,
            explain: "Quy đồng mẫu 20: $-\\frac{15}{20} < \\frac{4x}{20} < -\\frac{5}{20}$, với $\\frac{x}{5}$ cần tìm. tức $-15 < 4x < -5$, nên $x = -3$ hoặc $x = -2$. Trong các phương án chỉ có $\\frac{-2}{5} = \\frac{-8}{20}$ thỏa mãn. $\\frac{-4}{5} = \\frac{-16}{20}$ quá nhỏ; $\\frac{-1}{5} = \\frac{-4}{20}$ và $\\frac{1}{5}$ quá lớn."
          },
          {
            id: "d2q9", level: "kho", source: "SBT Bài 1 – BT 1.4c",
            q: "Khi so sánh $\\frac{4}{37}$ và $\\frac{6}{55}$, khẳng định nào sau đây đúng?",
            options: ["$\\frac{4}{37} > \\frac{6}{55}$", "$\\frac{4}{37} = \\frac{6}{55}$", "$\\frac{4}{37} < \\frac{6}{55}$", "$\\frac{6}{55} < \\frac{1}{10}$"],
            answer: 2,
            explain: "Đưa về cùng tử 12: $\\frac{4}{37} = \\frac{12}{111}$, $\\frac{6}{55} = \\frac{12}{110}$. Cùng tử dương, mẫu $111 > 110$ nên $\\frac{4}{37} < \\frac{6}{55}$. Ngoài ra $\\frac{6}{55} > \\frac{6}{60} = \\frac{1}{10}$."
          },
          {
            id: "d2q10", level: "kho", source: "SBT Bài 1 – BT 1.9",
            q: "Hiệu suất ghi bàn = số bàn thắng : số trận đấu. Trong một giải, An ghi 18 bàn sau 24 trận; Bình ghi 20 bàn sau 26 trận; Cường ghi 22 bàn sau 30 trận; Dũng ghi 15 bàn sau 19 trận. Ai có hiệu suất ghi bàn cao nhất?",
            options: ["Dũng", "Bình", "An", "Cường"],
            answer: 0,
            explain: "$\\frac{18}{24} = 0{,}75$; $\\frac{20}{26} \\approx 0{,}769$; $\\frac{22}{30} \\approx 0{,}733$; $\\frac{15}{19} \\approx 0{,}789$. Lớn nhất là $\\frac{15}{19}$ nên Dũng có hiệu suất cao nhất."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SBT Bài 1 – BT 1.4", maxPoints: 1.5,
            q: "So sánh các số hữu tỉ sau:<br>a) $-\\frac{2}{2025}$ và $\\frac{1}{3000}$;<br>b) $\\frac{-21}{40}$ và $\\frac{-13}{25}$.",
            modelAnswer: "a) $-\\frac{2}{2025} < 0$ (số âm) và $\\frac{1}{3000} > 0$ (số dương). Dùng số trung gian 0: $-\\frac{2}{2025} < 0 < \\frac{1}{3000}$, nên $-\\frac{2}{2025} < \\frac{1}{3000}$.<br>" +
              "b) Mẫu chung dương: $\\mathrm{BCNN}(40, 25) = 200$.<br>$\\frac{-21}{40} = \\frac{-105}{200}$; $\\ \\frac{-13}{25} = \\frac{-104}{200}$.<br>Vì $-105 < -104$ nên $\\frac{-21}{40} < \\frac{-13}{25}$.",
            rubric: [
              { pts: 0.5, text: "Câu a: nhận xét một số âm, một số dương và kết luận đúng." },
              { pts: 0.5, text: "Câu b: quy đồng đúng mẫu 200 (được $\\frac{-105}{200}$ và $\\frac{-104}{200}$)." },
              { pts: 0.5, text: "Câu b: so sánh tử và kết luận đúng $\\frac{-21}{40} < \\frac{-13}{25}$." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SBT Bài 1 – BT 1.8 (biến đổi)", maxPoints: 1.5,
            q: "Tìm tất cả các số nguyên $x$ sao cho $-\\frac{3}{4} < \\frac{x}{6} < \\frac{1}{3}$.",
            modelAnswer: "Quy đồng mẫu 12: $-\\frac{3}{4} = \\frac{-9}{12}$; $\\ \\frac{x}{6} = \\frac{2x}{12}$; $\\ \\frac{1}{3} = \\frac{4}{12}$.<br>" +
              "Ta cần $\\frac{-9}{12} < \\frac{2x}{12} < \\frac{4}{12}$, tức là $-9 < 2x < 4$.<br>" +
              "$2x$ là số chẵn nằm giữa $-9$ và $4$: $2x \\in \\{-8; -6; -4; -2; 0; 2\\}$.<br>" +
              "Vậy $x \\in \\{-4; -3; -2; -1; 0; 1\\}$.",
            rubric: [
              { pts: 0.5, text: "Quy đồng đúng về mẫu chung 12 (hoặc mẫu chung hợp lí khác)." },
              { pts: 0.5, text: "Đưa về điều kiện $-9 < 2x < 4$ (hoặc $-4{,}5 < x < 2$)." },
              { pts: 0.5, text: "Kết luận đúng, đủ $x \\in \\{-4; -3; -2; -1; 0; 1\\}$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SBT Bài 1 – BT 1.3",
            q: "Cách viết nào sau đây <b>không</b> biểu diễn một số hữu tỉ?",
            options: ["$\\frac{0}{-8}$", "$-3\\frac{1}{2}$", "$\\frac{5}{0}$", "$-0{,}01$"],
            answer: 2,
            explain: "$\\frac{5}{0}$ có mẫu bằng 0 nên không có nghĩa, không là số hữu tỉ. Các số còn lại: $\\frac{0}{-8} = 0$; $-3\\frac{1}{2} = \\frac{-7}{2}$; $-0{,}01 = \\frac{-1}{100}$."
          },
          {
            id: "d3q2", level: "de", source: "SGK Bài 1 – BT 1.2",
            q: "Số đối của $\\frac{-5}{-9}$ là",
            options: ["$\\frac{5}{9}$", "$-\\frac{5}{9}$", "$\\frac{9}{5}$", "$-\\frac{9}{5}$"],
            answer: 1,
            explain: "$\\frac{-5}{-9} = \\frac{5}{9}$, nên số đối của nó là $-\\frac{5}{9}$."
          },
          {
            id: "d3q3", level: "de", source: "SBT Bài 1 – BT 1.3",
            q: "Số nào sau đây là số hữu tỉ âm?",
            options: ["$\\frac{-3}{-11}$", "$0$", "$1{,}2$", "$\\frac{4}{-13}$"],
            answer: 3,
            explain: "$\\frac{4}{-13}$ có tử và mẫu trái dấu nên âm. $\\frac{-3}{-11} = \\frac{3}{11} > 0$; $0$ không âm, không dương; $1{,}2 > 0$."
          },
          {
            id: "d3q4", level: "de", source: "SGK tr.6 – Ví dụ 1",
            q: "Số $-1{,}25$ viết dưới dạng phân số tối giản là",
            options: ["$-\\frac{5}{4}$", "$-\\frac{125}{10}$", "$-\\frac{4}{5}$", "$\\frac{5}{4}$"],
            answer: 0,
            explain: "$-1{,}25 = -\\frac{125}{100} = -\\frac{5}{4}$. ($-\\frac{125}{10} = -12{,}5$; $-\\frac{4}{5} = -0{,}8$.)"
          },
          {
            id: "d3q5", level: "vua", source: "SGK Bài 1 – BT 1.3",
            q: "Trên trục số dưới đây, mỗi đoạn đơn vị được chia thành 5 phần bằng nhau. Điểm $B$ biểu diễn số hữu tỉ nào?" +
              axis({ min: -2, max: 1, div: 5, labels: [[-2, "−2"], [-1, "−1"], [0, "0"], [1, "1"]], pts: [[-1.4, "B"]] }),
            options: ["$-\\frac{3}{5}$", "$-\\frac{6}{5}$", "$-\\frac{7}{5}$", "$\\frac{7}{5}$"],
            answer: 2,
            explain: "Đơn vị mới bằng $\\frac{1}{5}$. Điểm $B$ nằm bên trái $O$, cách $O$ là 7 đơn vị mới (5 phần tới $-1$, thêm 2 phần) nên $B$ biểu diễn $-\\frac{7}{5}$."
          },
          {
            id: "d3q6", level: "vua", source: "SGK Bài 1 – BT 1.5a",
            q: "Số nhỏ nhất trong các số $-2{,}105;\\ -2{,}15;\\ -2{,}1;\\ -2{,}0999$ là",
            options: ["$-2{,}105$", "$-2{,}15$", "$-2{,}1$", "$-2{,}0999$"],
            answer: 1,
            explain: "So sánh phần số: $2{,}15 > 2{,}105 > 2{,}1 > 2{,}0999$. Với số âm, phần số lớn nhất thì số nhỏ nhất, nên $-2{,}15$ nhỏ nhất."
          },
          {
            id: "d3q7", level: "vua", source: "SGK Bài 1 – BT 1.6",
            q: "Sắp xếp các số $\\frac{3}{5};\\ -0{,}7;\\ -\\frac{2}{3};\\ 0{,}65$ theo thứ tự từ <b>lớn đến nhỏ</b>, ta được",
            options: [
              "$\\frac{3}{5};\\ 0{,}65;\\ -\\frac{2}{3};\\ -0{,}7$",
              "$0{,}65;\\ \\frac{3}{5};\\ -0{,}7;\\ -\\frac{2}{3}$",
              "$-0{,}7;\\ -\\frac{2}{3};\\ \\frac{3}{5};\\ 0{,}65$",
              "$0{,}65;\\ \\frac{3}{5};\\ -\\frac{2}{3};\\ -0{,}7$"
            ],
            answer: 3,
            explain: "$\\frac{3}{5} = 0{,}6 < 0{,}65$; $-\\frac{2}{3} = -0{,}666\\ldots > -0{,}7$. Từ lớn đến nhỏ: $0{,}65 > \\frac{3}{5} > -\\frac{2}{3} > -0{,}7$."
          },
          {
            id: "d3q8", level: "vua", source: "mới",
            q: "Có bao nhiêu số nguyên $x$ thỏa mãn $-\\frac{5}{3} < x < \\frac{3}{2}$?",
            options: ["$2$", "$4$", "$3$", "$5$"],
            answer: 2,
            explain: "$-\\frac{5}{3} \\approx -1{,}67$ và $\\frac{3}{2} = 1{,}5$. Các số nguyên nằm giữa là $-1; 0; 1$, gồm 3 số. ($-2 < -\\frac{5}{3}$ và $2 > \\frac{3}{2}$ nên không thỏa mãn.)"
          },
          {
            id: "d3q9", level: "kho", source: "SBT Bài 1 – BT 1.8",
            q: "Phân số có mẫu bằng 9, lớn hơn $-\\frac{2}{3}$ và nhỏ hơn $-\\frac{1}{2}$ là",
            options: ["$\\frac{-5}{9}$", "$\\frac{-4}{9}$", "$\\frac{-7}{9}$", "$\\frac{-6}{9}$"],
            answer: 0,
            explain: "Quy đồng mẫu 18: $-\\frac{12}{18} < \\frac{2x}{18} < -\\frac{9}{18}$ nên $-12 < 2x < -9$, suy ra $x = -5$. Lưu ý $\\frac{-6}{9} = -\\frac{2}{3}$ (bằng, không lớn hơn); $\\frac{-4}{9} > -\\frac{1}{2}$; $\\frac{-7}{9} < -\\frac{2}{3}$."
          },
          {
            id: "d3q10", level: "kho", source: "SBT Bài 1 – BT 1.5",
            q: "Tốc độ màn trập (thời gian màn trập mở, tính bằng giây) càng lớn thì chụp càng chậm. Trong các tốc độ $\\frac{1}{30}$ giây; $0{,}04$ giây; $0{,}045$ giây; $\\frac{1}{20}$ giây, tốc độ chậm nhất là",
            options: ["$\\frac{1}{30}$ giây", "$0{,}04$ giây", "$0{,}045$ giây", "$\\frac{1}{20}$ giây"],
            answer: 3,
            explain: "$\\frac{1}{30} \\approx 0{,}033$; $\\frac{1}{20} = 0{,}05$. Ta có $0{,}033 < 0{,}04 < 0{,}045 < 0{,}05$. Thời gian dài nhất là $\\frac{1}{20}$ giây nên chậm nhất."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SGK Bài 1 – BT 1.6 (biến đổi)", maxPoints: 2,
            q: "Nhiệt độ trung bình tháng Một tại bốn thành phố như sau: A: $-3{,}5^\\circ$C; B: $-3\\frac{1}{4}{}^\\circ$C; C: $-\\frac{17}{5}{}^\\circ$C; D: $-3{,}45^\\circ$C.<br>a) Sắp xếp các nhiệt độ trên theo thứ tự tăng dần.<br>b) Thành phố nào lạnh nhất?",
            modelAnswer: "a) Đổi ra số thập phân: $-3\\frac{1}{4} = -3{,}25$; $\\ -\\frac{17}{5} = -3{,}4$.<br>" +
              "So sánh phần số: $3{,}5 > 3{,}45 > 3{,}4 > 3{,}25$, nên với các số âm: $-3{,}5 < -3{,}45 < -3{,}4 < -3{,}25$.<br>" +
              "Thứ tự tăng dần: $-3{,}5;\\ -3{,}45;\\ -\\frac{17}{5};\\ -3\\frac{1}{4}$ (tức A, D, C, B).<br>" +
              "b) Nhiệt độ thấp nhất là $-3{,}5^\\circ$C nên thành phố A lạnh nhất.",
            rubric: [
              { pts: 0.5, text: "Đổi đúng $-3\\frac{1}{4} = -3{,}25$ và $-\\frac{17}{5} = -3{,}4$." },
              { pts: 0.5, text: "Lập luận đúng cách so sánh các số âm." },
              { pts: 0.5, text: "Sắp xếp đúng thứ tự tăng dần A, D, C, B." },
              { pts: 0.5, text: "Kết luận thành phố A lạnh nhất." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SGK tr.8 – Nhận xét (tính chất bắc cầu)", maxPoints: 1,
            q: "Không quy đồng mẫu, hãy so sánh $\\frac{2023}{2024}$ và $\\frac{2024}{2023}$.",
            modelAnswer: "Phân số dương có tử nhỏ hơn mẫu thì nhỏ hơn 1: $\\frac{2023}{2024} < 1$.<br>" +
              "Phân số dương có tử lớn hơn mẫu thì lớn hơn 1: $\\frac{2024}{2023} > 1$.<br>" +
              "Theo tính chất bắc cầu: $\\frac{2023}{2024} < 1 < \\frac{2024}{2023}$, nên $\\frac{2023}{2024} < \\frac{2024}{2023}$.",
            rubric: [
              { pts: 0.5, text: "So sánh đúng mỗi phân số với số trung gian 1." },
              { pts: 0.5, text: "Dùng tính chất bắc cầu, kết luận đúng." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 4 – NÂNG CAO =======================
      {
        id: "d4", name: "Đề 4 – Nâng cao", advanced: true,
        mcq: [
          {
            id: "d4q1", level: "vua", source: "mới",
            q: "Khẳng định nào sau đây đúng?",
            options: ["$\\frac{-2023}{2024} < \\frac{-2024}{2025}$", "$\\frac{-2023}{2024} > \\frac{-2024}{2025}$", "$\\frac{-2023}{2024} = \\frac{-2024}{2025}$", "$\\frac{-2023}{2024} < -1$"],
            answer: 1,
            explain: "Xét phần bù tới 1: $\\frac{2023}{2024} = 1 - \\frac{1}{2024}$, $\\frac{2024}{2025} = 1 - \\frac{1}{2025}$. Vì $\\frac{1}{2024} > \\frac{1}{2025}$ nên $\\frac{2023}{2024} < \\frac{2024}{2025}$, do đó với số đối: $\\frac{-2023}{2024} > \\frac{-2024}{2025}$."
          },
          {
            id: "d4q2", level: "vua", source: "SBT Bài 1 – BT 1.4",
            q: "So sánh $\\frac{13}{38}$ và $\\frac{-29}{-88}$, ta được",
            options: ["$\\frac{13}{38} < \\frac{-29}{-88}$", "$\\frac{13}{38} = \\frac{-29}{-88}$", "$\\frac{13}{38} > \\frac{-29}{-88}$", "Không so sánh được"],
            answer: 2,
            explain: "Dùng số trung gian $\\frac{1}{3}$: $\\frac{13}{38} > \\frac{13}{39} = \\frac{1}{3}$; $\\ \\frac{-29}{-88} = \\frac{29}{88} < \\frac{29}{87} = \\frac{1}{3}$. Vậy $\\frac{13}{38} > \\frac{-29}{-88}$."
          },
          {
            id: "d4q3", level: "vua", source: "mới",
            q: "Có bao nhiêu số nguyên $x$ thỏa mãn $-\\frac{7}{2} \\le x < \\frac{13}{4}$?",
            options: ["$6$", "$8$", "$9$", "$7$"],
            answer: 3,
            explain: "$-\\frac{7}{2} = -3{,}5$ và $\\frac{13}{4} = 3{,}25$. Các số nguyên thỏa mãn: $-3; -2; -1; 0; 1; 2; 3$, gồm 7 số."
          },
          {
            id: "d4q4", level: "kho", source: "mới",
            q: "Cho hai số hữu tỉ $a, b$ với $a < b$. Khẳng định nào sau đây <b>luôn</b> đúng?",
            options: ["$-a > -b$", "$-a < -b$", "$a < 0 < b$", "$\\frac{a}{2} > \\frac{b}{2}$"],
            answer: 0,
            explain: "Trên trục số, điểm $a$ nằm trước điểm $b$; lấy đối xứng qua $O$ thì thứ tự đảo ngược, nên $-a > -b$. (Ví dụ $1 < 2$ thì $-1 > -2$.) $a < 0 < b$ chỉ đúng trong một số trường hợp."
          },
          {
            id: "d4q5", level: "kho", source: "mới",
            q: "Cho số hữu tỉ $x = \\frac{m - 2}{-4}$ với $m \\in \\mathbb{Z}$. Số $x$ là số hữu tỉ dương khi và chỉ khi",
            options: ["$m > 2$", "$m < 2$", "$m = 2$", "$m > -2$"],
            answer: 1,
            explain: "Mẫu $-4 < 0$, nên $x > 0$ khi tử cũng âm: $m - 2 < 0$, tức $m < 2$. Nếu $m = 2$ thì $x = 0$, không dương."
          },
          {
            id: "d4q6", level: "kho", source: "SBT Bài 1 – BT 1.4c",
            q: "Sắp xếp $\\frac{5}{17};\\ \\frac{10}{33};\\ \\frac{15}{49}$ theo thứ tự tăng dần, ta được",
            options: [
              "$\\frac{15}{49} < \\frac{10}{33} < \\frac{5}{17}$",
              "$\\frac{5}{17} < \\frac{15}{49} < \\frac{10}{33}$",
              "$\\frac{10}{33} < \\frac{5}{17} < \\frac{15}{49}$",
              "$\\frac{5}{17} < \\frac{10}{33} < \\frac{15}{49}$"
            ],
            answer: 3,
            explain: "Đưa về cùng tử 30: $\\frac{5}{17} = \\frac{30}{102}$, $\\frac{10}{33} = \\frac{30}{99}$, $\\frac{15}{49} = \\frac{30}{98}$. Cùng tử dương, mẫu càng lớn thì phân số càng nhỏ: $\\frac{30}{102} < \\frac{30}{99} < \\frac{30}{98}$."
          },
          {
            id: "d4q7", level: "kho", source: "mới",
            q: "Trên trục số, điểm $M$ biểu diễn số $-\\frac{9}{4}$. Điểm $N$ nằm ở phía bên kia gốc $O$ và $ON = OM$. Điểm $N$ nằm giữa hai điểm biểu diễn hai số nguyên nào?",
            options: ["$2$ và $3$", "$-3$ và $-2$", "$1$ và $2$", "$-2$ và $-1$"],
            answer: 0,
            explain: "$N$ đối xứng với $M$ qua $O$ nên $N$ biểu diễn số đối $\\frac{9}{4} = 2{,}25$, nằm giữa 2 và 3."
          },
          {
            id: "d4q8", level: "kho", source: "mới",
            q: "Giữa hai số hữu tỉ $\\frac{1}{3}$ và $\\frac{1}{2}$ có bao nhiêu số hữu tỉ?",
            options: ["Không có số nào", "Chỉ có 1 số", "Có đúng 5 số", "Có vô số"],
            answer: 3,
            explain: "Ví dụ $\\frac{1}{3} = \\frac{4}{12} < \\frac{5}{12} < \\frac{6}{12} = \\frac{1}{2}$. Nhân cả tử và mẫu với số lớn hơn (như $\\frac{40}{120}$ và $\\frac{60}{120}$) ta tìm được càng nhiều số ở giữa; vì vậy có vô số số hữu tỉ."
          },
          {
            id: "d4q9", level: "kho", source: "SGK tr.5 – Bài toán mở đầu",
            q: "Một người cao 160 cm. Để chỉ số WHtR (vòng bụng : chiều cao) vẫn ở mức \"Tốt\" (lớn hơn $0{,}42$ và không quá $0{,}52$), vòng bụng của người đó <b>lớn nhất</b> là bao nhiêu?",
            options: ["$67{,}2$ cm", "$80$ cm", "$83{,}2$ cm", "$91{,}2$ cm"],
            answer: 2,
            explain: "Cần vòng bụng : 160 $\\le 0{,}52$, tức vòng bụng $\\le 0{,}52 \\cdot 160 = 83{,}2$ (cm). ($67{,}2 = 0{,}42 \\cdot 160$ là ngưỡng dưới; $91{,}2 = 0{,}57 \\cdot 160$.)"
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Số lớn nhất trong các số $\\frac{2021}{2022};\\ \\frac{2022}{2023};\\ \\frac{2020}{2021};\\ \\frac{2023}{2025}$ là",
            options: ["$\\frac{2022}{2023}$", "$\\frac{2021}{2022}$", "$\\frac{2020}{2021}$", "$\\frac{2023}{2025}$"],
            answer: 0,
            explain: "Phần bù tới 1 lần lượt là $\\frac{1}{2022};\\ \\frac{1}{2023};\\ \\frac{1}{2021};\\ \\frac{2}{2025}$ (mà $\\frac{2}{2025} > \\frac{2}{4046} = \\frac{1}{2023}$). Phần bù nhỏ nhất là $\\frac{1}{2023}$ nên $\\frac{2022}{2023}$ lớn nhất."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "mới", maxPoints: 1.5,
            q: "a) Cho $a, b \\in \\mathbb{Z}$, $b > 0$ và $a < b$. Chứng tỏ rằng $\\frac{a}{b} < \\frac{a+1}{b+1}$.<br>b) Áp dụng, so sánh $\\frac{2024}{2025}$ và $\\frac{2025}{2026}$.",
            modelAnswer: "a) Vì $b > 0$ nên $b + 1 > 0$; mẫu chung dương là $b(b+1)$:<br>" +
              "$\\frac{a}{b} = \\frac{a(b+1)}{b(b+1)} = \\frac{ab + a}{b(b+1)}$; $\\ \\frac{a+1}{b+1} = \\frac{b(a+1)}{b(b+1)} = \\frac{ab + b}{b(b+1)}$.<br>" +
              "Vì $a < b$ nên $ab + a < ab + b$. Do đó $\\frac{a}{b} < \\frac{a+1}{b+1}$.<br>" +
              "b) Áp dụng với $a = 2024$, $b = 2025$ (thỏa mãn $b > 0$, $a < b$): $\\frac{2024}{2025} < \\frac{2025}{2026}$.",
            rubric: [
              { pts: 0.5, text: "Quy đồng đúng về mẫu dương $b(b+1)$." },
              { pts: 0.5, text: "So sánh tử $ab + a < ab + b$ từ $a < b$ và kết luận." },
              { pts: 0.5, text: "Áp dụng đúng: $\\frac{2024}{2025} < \\frac{2025}{2026}$." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "SBT Bài 1 – BT 1.8 (nâng cao)", maxPoints: 1.5,
            q: "Tìm tất cả các phân số có mẫu bằng 10, lớn hơn $-\\frac{3}{4}$ và nhỏ hơn $-\\frac{1}{3}$.",
            modelAnswer: "Gọi phân số cần tìm là $\\frac{x}{10}$ với $x \\in \\mathbb{Z}$. Mẫu chung $\\mathrm{BCNN}(4, 10, 3) = 60$:<br>" +
              "$-\\frac{3}{4} = \\frac{-45}{60}$; $\\ \\frac{x}{10} = \\frac{6x}{60}$; $\\ -\\frac{1}{3} = \\frac{-20}{60}$.<br>" +
              "Cần $-45 < 6x < -20$. Các bội của 6 nằm giữa $-45$ và $-20$ là $-42; -36; -30; -24$, nên $x \\in \\{-7; -6; -5; -4\\}$.<br>" +
              "Vậy các phân số là $\\frac{-7}{10};\\ \\frac{-6}{10};\\ \\frac{-5}{10};\\ \\frac{-4}{10}$.",
            rubric: [
              { pts: 0.5, text: "Quy đồng đúng về mẫu chung 60 (hoặc cách đưa về so sánh tương đương)." },
              { pts: 0.5, text: "Lập được điều kiện $-45 < 6x < -20$ (hoặc $-7{,}5 < x < -3{,}33\\ldots$)." },
              { pts: 0.5, text: "Tìm đủ 4 phân số $\\frac{-7}{10}; \\frac{-6}{10}; \\frac{-5}{10}; \\frac{-4}{10}$." }
            ]
          }
        ]
      }
    ]
  });
})();
