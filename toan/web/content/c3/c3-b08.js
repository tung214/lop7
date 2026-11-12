(function () {
  // ---- Hình vẽ SVG (dùng currentColor để hợp chế độ sáng/tối) ----
  // P(c, len, deg): điểm cách c một đoạn len theo hướng deg (độ, ngược chiều kim đồng hồ, 0° = sang phải)
  function P(c, len, deg) { var r = deg * Math.PI / 180; return [c[0] + len * Math.cos(r), c[1] - len * Math.sin(r)]; }
  function f(n) { return (+n).toFixed(1); }
  function txt(p, t, col, size, it) {
    return '<text x="' + f(p[0]) + '" y="' + f(p[1]) + '" font-size="' + size + '" text-anchor="middle" dominant-baseline="middle" fill="' + col + '"' + (it ? ' font-style="italic"' : '') + '>' + t + '</text>';
  }
  // L(c, len, deg, "x"): nhãn đặt theo hướng deg
  function L(c, len, deg, t) { var p = P(c, len, deg); return [p[0], p[1], t]; }
  // o = { w, h, lines: [[p1, p2, dashed]], arcs: [{c, r, a1, a2, t, tr, red, n}], dots: [p], labels: [[x, y, "t", red]], nums: [[x, y, "t"]] }
  function fig(o) {
    var W = o.w || 320, H = o.h || 160;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">';
    (o.lines || []).forEach(function (l) {
      s += '<line x1="' + f(l[0][0]) + '" y1="' + f(l[0][1]) + '" x2="' + f(l[1][0]) + '" y2="' + f(l[1][1]) + '" stroke="currentColor" stroke-width="1.6"' + (l[2] ? ' stroke-dasharray="5 4"' : '') + '/>';
    });
    (o.arcs || []).forEach(function (a) {
      var col = a.red ? '#e5484d' : 'currentColor';
      for (var k = 0; k < (a.n || 1); k++) {
        var r = a.r + 4 * k, p1 = P(a.c, r, a.a1), p2 = P(a.c, r, a.a2), large = (a.a2 - a.a1) > 180 ? 1 : 0;
        s += '<path d="M' + f(p1[0]) + ' ' + f(p1[1]) + ' A' + r + ' ' + r + ' 0 ' + large + ' 0 ' + f(p2[0]) + ' ' + f(p2[1]) + '" fill="none" stroke="' + col + '" stroke-width="1.3"/>';
      }
      if (a.t) s += txt(P(a.c, a.tr || a.r + 16, (a.a1 + a.a2) / 2), a.t, col, 12, false);
    });
    (o.dots || []).forEach(function (p) { s += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2.6" fill="currentColor"/>'; });
    (o.labels || []).forEach(function (l) { s += txt(l, l[2], l[3] ? '#e5484d' : 'currentColor', 14, true); });
    (o.nums || []).forEach(function (l) { s += txt(l, l[2], '#e5484d', 13, false); });
    return s + '</svg>';
  }

  // Hình lý thuyết 1: hai góc kề bù xOz, zOy
  var c1 = [160, 115];
  var figKeBu = fig({ h: 140,
    lines: [[P(c1, 140, 180), P(c1, 140, 0)], [c1, P(c1, 90, 50)]],
    arcs: [{ c: c1, r: 22, a1: 0, a2: 50, red: true }, { c: c1, r: 18, a1: 50, a2: 180 }],
    labels: [L(c1, 150, 180, "x"), L(c1, 150, 0, "y"), L(c1, 102, 50, "z"), [c1[0], c1[1] + 15, "O"]]
  });
  // Hình lý thuyết 2: hai đường thẳng cắt nhau, các góc đối đỉnh
  var c2 = [160, 85];
  var figDoiDinh = fig({ h: 170,
    lines: [[P(c2, 120, 210), P(c2, 120, 30)], [P(c2, 120, 330), P(c2, 120, 150)]],
    arcs: [{ c: c2, r: 16, a1: 30, a2: 150, red: true }, { c: c2, r: 16, a1: 210, a2: 330, red: true }],
    labels: [L(c2, 133, 30, "x"), L(c2, 133, 210, "x’"), L(c2, 133, 150, "y"), L(c2, 133, 330, "y’"), [c2[0] + 18, c2[1] + 1, "O"]],
    nums: [L(c2, 30, 90, "1"), L(c2, 30, 270, "2"), L(c2, 40, 180, "3"), L(c2, 44, 0, "4")]
  });
  // Hình lý thuyết 3: tia phân giác Oz của góc xOy
  var c3 = [60, 140];
  var figPhanGiac = fig({ h: 160,
    lines: [[c3, P(c3, 230, 0)], [c3, P(c3, 120, 70)], [c3, P(c3, 200, 35)]],
    arcs: [{ c: c3, r: 34, a1: 0, a2: 35, red: true }, { c: c3, r: 34, a1: 35, a2: 70, red: true, n: 2 }],
    labels: [L(c3, 240, 0, "x"), L(c3, 132, 70, "y"), L(c3, 212, 35, "z"), [c3[0] - 12, c3[1] + 4, "O"]]
  });

  // Hình câu hỏi
  var q1 = [160, 110];
  var figD1Q3 = fig({ h: 135,
    lines: [[P(q1, 140, 180), P(q1, 140, 0)], [q1, P(q1, 90, 55)]],
    arcs: [{ c: q1, r: 24, a1: 0, a2: 55, t: "55°", tr: 42, red: true }, { c: q1, r: 16, a1: 55, a2: 180, t: "?", tr: 30 }],
    labels: [L(q1, 150, 180, "m"), L(q1, 150, 0, "n"), L(q1, 102, 55, "t"), [q1[0], q1[1] + 15, "O"]]
  });
  var q2 = [160, 100];
  var figD1Q5 = fig({ h: 195,
    lines: [[P(q2, 140, 180), P(q2, 140, 0)], [P(q2, 85, 245), P(q2, 85, 65)]],
    arcs: [{ c: q2, r: 24, a1: 0, a2: 65, t: "65°", tr: 44, red: true }, { c: q2, r: 16, a1: 65, a2: 180, t: "?", tr: 30 }],
    labels: [L(q2, 150, 0, "x"), L(q2, 150, 180, "x’"), L(q2, 96, 65, "y"), L(q2, 96, 245, "y’"), [q2[0] + 14, q2[1] + 13, "O"]]
  });
  var q3 = [160, 110];
  var figD2Q4 = fig({ h: 135,
    lines: [[P(q3, 140, 180), P(q3, 140, 0)], [q3, P(q3, 92, 120)]],
    labels: [L(q3, 150, 180, "m"), L(q3, 150, 0, "n"), L(q3, 104, 120, "t"), [q3[0], q3[1] + 15, "O"]]
  });
  var q4 = [160, 90];
  var figD2Q5 = fig({ h: 180,
    lines: [[P(q4, 130, 180), P(q4, 130, 0)], [P(q4, 85, 230), P(q4, 85, 50)]],
    dots: [P(q4, 130, 180), P(q4, 130, 0), P(q4, 85, 230), P(q4, 85, 50), q4],
    labels: [L(q4, 142, 180, "A"), L(q4, 142, 0, "B"), L(q4, 97, 50, "C"), L(q4, 97, 230, "D"), [q4[0] + 4, q4[1] + 16, "O"]]
  });
  var q5 = [160, 85];
  var figD3Q4 = fig({ h: 170,
    lines: [[P(q5, 120, 210), P(q5, 120, 30)], [P(q5, 120, 330), P(q5, 120, 150)]],
    labels: [[q5[0] + 16, q5[1] + 2, "O"]],
    nums: [L(q5, 30, 90, "1"), L(q5, 44, 0, "2"), L(q5, 30, 270, "3"), L(q5, 40, 180, "4")]
  });
  var A = [150, 22], B = [40, 150], C = [290, 150], M = [190, 150];
  var figD3Q7 = fig({ h: 170,
    lines: [[A, B], [B, C], [C, A], [A, M]],
    dots: [A, B, C, M],
    labels: [[A[0], A[1] - 12, "A"], [B[0] - 12, B[1] + 4, "B"], [C[0] + 12, C[1] + 4, "C"], [M[0], M[1] + 14, "M"]]
  });

  registerLesson({
    id: "c3-b08",
    chapter: 3,
    kind: "lesson",
    title: "Bài 8. Góc ở vị trí đặc biệt. Tia phân giác của một góc",
    sgkPages: [40, 45],
    sbtPages: [35, 37],
    objectives: [
      "Nhận biết hai góc kề bù, hai góc đối đỉnh và tính chất của chúng",
      "Nhận biết tia phân giác của một góc; vẽ tia phân giác bằng thước đo góc",
      "Tính số đo góc dựa vào hai góc kề bù, hai góc đối đỉnh, tia phân giác"
    ],

    theory: [
      {
        heading: "1. Hai góc kề bù",
        html: "Hai góc có <b>một cạnh chung</b>, hai cạnh còn lại là <b>hai tia đối nhau</b> được gọi là <b>hai góc kề bù</b>." +
          figKeBu +
          "Trong hình, $Ox$ và $Oy$ là hai tia đối nhau, $Oz$ là cạnh chung, nên $\\widehat{xOz}$ và $\\widehat{zOy}$ là hai góc kề bù." +
          "<ul><li><b>Tính chất:</b> hai góc kề bù có tổng số đo bằng $180^\\circ$: $\\widehat{xOz} + \\widehat{zOy} = 180^\\circ$.</li>" +
          "<li>Hai góc kề bù là hai góc vừa <b>kề nhau</b> (chung một cạnh, hai cạnh còn lại nằm về hai phía của đường thẳng chứa cạnh chung), vừa <b>bù nhau</b> (tổng bằng $180^\\circ$).</li>" +
          "<li>Nếu tia $OM$ nằm giữa hai cạnh $Ox$, $Oy$ của góc $xOy$ thì $\\widehat{xOM} + \\widehat{MOy} = \\widehat{xOy}$.</li></ul>"
      },
      {
        heading: "2. Hai góc đối đỉnh",
        html: "<b>Hai góc đối đỉnh</b> là hai góc mà mỗi cạnh của góc này là <b>tia đối</b> của một cạnh của góc kia." +
          figDoiDinh +
          "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$ tạo thành hai cặp góc đối đỉnh: $\\widehat{O_1}$ và $\\widehat{O_2}$ (tức $\\widehat{xOy}$ và $\\widehat{x'Oy'}$); $\\widehat{O_3}$ và $\\widehat{O_4}$ (tức $\\widehat{yOx'}$ và $\\widehat{y'Ox}$)." +
          "<ul><li><b>Tính chất:</b> hai góc đối đỉnh thì <b>bằng nhau</b>.</li>" +
          "<li>Giải thích: $\\widehat{O_1} + \\widehat{O_3} = 180^\\circ$ và $\\widehat{O_2} + \\widehat{O_3} = 180^\\circ$ (các cặp góc kề bù), suy ra $\\widehat{O_1} = \\widehat{O_2}$.</li>" +
          "<li>Chú ý: hai góc bằng nhau <b>chưa chắc</b> là hai góc đối đỉnh.</li>" +
          "<li>Nếu hai đường thẳng $xx'$, $yy'$ cắt nhau và trong các góc tạo thành có <b>một góc vuông</b> thì cả bốn góc đều vuông; ta nói $xx'$ và $yy'$ <b>vuông góc</b>, kí hiệu $xx' \\perp yy'$.</li></ul>"
      },
      {
        heading: "3. Tia phân giác của một góc",
        html: "Tia nằm <b>giữa hai cạnh</b> của một góc và tạo với hai cạnh ấy <b>hai góc bằng nhau</b> được gọi là <b>tia phân giác</b> của góc đó." +
          figPhanGiac +
          "<ul><li><b>Tính chất:</b> nếu $Oz$ là tia phân giác của góc $xOy$ thì $\\widehat{xOz} = \\widehat{zOy} = \\frac{1}{2}\\widehat{xOy}$.</li>" +
          "<li>Đường thẳng chứa tia phân giác của một góc gọi là <b>đường phân giác</b> của góc đó.</li>" +
          "<li><b>Vẽ tia phân giác bằng thước đo góc:</b> ví dụ góc $xOy = 80^\\circ$ thì $\\frac{1}{2} \\cdot 80^\\circ = 40^\\circ$; đặt thước đo góc có tâm trùng $O$, vạch $0$ nằm trên $Ox$, đánh dấu điểm ở vạch $40^\\circ$ rồi kẻ tia $Oz$ qua điểm đó.</li>" +
          "<li>Cũng có thể gấp giấy: gấp sao cho hai cạnh của góc trùng nhau, nếp gấp là tia phân giác.</li></ul>"
      }
    ],

    skills: [
      "<b>Nhận biết hai góc kề bù:</b> tìm hai góc có chung một cạnh, rồi kiểm tra hai cạnh còn lại có tạo thành một đường thẳng (hai tia đối nhau) hay không.",
      "<b>Nhận biết hai góc đối đỉnh:</b> hai góc phải chung đỉnh và cạnh này là tia đối của cạnh kia (cả hai cặp cạnh). Hai đường thẳng cắt nhau cho đúng <b>2 cặp</b> góc đối đỉnh.",
      "<b>Tính góc khi hai đường thẳng cắt nhau:</b> biết một góc $\\alpha$ thì góc đối đỉnh với nó bằng $\\alpha$, hai góc còn lại đều bằng $180^\\circ - \\alpha$.",
      "<b>Tia phân giác:</b> góc nhỏ bằng một nửa góc lớn, góc lớn gấp đôi góc nhỏ: $\\widehat{xOz} = \\frac{1}{2}\\widehat{xOy}$, $\\widehat{xOy} = 2\\widehat{xOz}$.",
      "<b>Bài toán tổng – hiệu, gấp mấy lần:</b> với hai góc kề bù, đặt tổng bằng $180^\\circ$ rồi giải như bài toán tổng – hiệu hoặc tổng – tỉ ở lớp dưới.",
      "<b>Trình bày:</b> mỗi bước tính đều ghi lí do trong ngoặc: (hai góc kề bù), (hai góc đối đỉnh), (tia phân giác).",
      "<b>Lỗi hay gặp:</b> nghĩ hai góc bằng nhau thì đối đỉnh; nghĩ hai góc có tổng $180^\\circ$ thì kề bù (còn cần chung cạnh); nhầm tia phân giác là tia bất kì tạo hai góc bằng nhau nhưng không nằm giữa hai cạnh."
    ],

    examples: [
      {
        q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$, biết $\\widehat{xOy} = 70^\\circ$. Tính $\\widehat{x'Oy'}$, $\\widehat{x'Oy}$ và $\\widehat{xOy'}$.",
        solution: "• $\\widehat{x'Oy'} = \\widehat{xOy} = 70^\\circ$ (hai góc đối đỉnh).<br>" +
          "• $\\widehat{x'Oy} + \\widehat{xOy} = 180^\\circ$ (hai góc kề bù), nên $\\widehat{x'Oy} = 180^\\circ - 70^\\circ = 110^\\circ$.<br>" +
          "• $\\widehat{xOy'} = \\widehat{x'Oy} = 110^\\circ$ (hai góc đối đỉnh)."
      },
      {
        q: "Vẽ $\\widehat{xOy} = 50^\\circ$, tia $Om$ là tia phân giác của góc $xOy$. Vẽ tia $On$ là tia đối của tia $Ox$. Tính $\\widehat{xOm}$ và $\\widehat{mOn}$.",
        solution: "• Vì $Om$ là tia phân giác của góc $xOy$ nên $\\widehat{xOm} = \\frac{1}{2}\\widehat{xOy} = \\frac{50^\\circ}{2} = 25^\\circ$.<br>" +
          "• $\\widehat{xOm} + \\widehat{mOn} = 180^\\circ$ (hai góc kề bù, vì $Ox$ và $On$ là hai tia đối nhau), nên $\\widehat{mOn} = 180^\\circ - 25^\\circ = 155^\\circ$."
      },
      {
        q: "Cho góc bẹt $xOy$, vẽ tia $Oz$ sao cho $\\widehat{xOz} = 50^\\circ$. Gọi $Om$, $On$ lần lượt là tia phân giác của $\\widehat{xOz}$ và $\\widehat{zOy}$. Tính $\\widehat{mOn}$.",
        solution: "• $\\widehat{zOy} = 180^\\circ - 50^\\circ = 130^\\circ$ (hai góc kề bù).<br>" +
          "• $\\widehat{mOz} = \\frac{1}{2} \\cdot 50^\\circ = 25^\\circ$; $\\ \\widehat{zOn} = \\frac{1}{2} \\cdot 130^\\circ = 65^\\circ$ (tính chất tia phân giác).<br>" +
          "• Tia $Oz$ nằm giữa $Om$ và $On$ nên $\\widehat{mOn} = 25^\\circ + 65^\\circ = 90^\\circ$.<br>" +
          "Nhận xét: hai tia phân giác của hai góc kề bù luôn vuông góc với nhau, vì $\\widehat{mOn} = \\frac{1}{2} \\cdot 180^\\circ = 90^\\circ$."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.41 – Tính chất hai góc kề bù",
            q: "Hai góc kề bù có tổng số đo bằng",
            options: ["$90^\\circ$", "$180^\\circ$", "$360^\\circ$", "$120^\\circ$"],
            answer: 1,
            explain: "Hai góc kề bù có hai cạnh còn lại là hai tia đối nhau, tạo thành góc bẹt, nên tổng số đo bằng $180^\\circ$."
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.42 – Tính chất hai góc đối đỉnh",
            q: "Hai góc đối đỉnh thì",
            options: ["có tổng bằng $180^\\circ$", "có tổng bằng $90^\\circ$", "bằng nhau", "có chung một cạnh"],
            answer: 2,
            explain: "Tính chất: hai góc đối đỉnh thì bằng nhau. Chúng không có cạnh chung (mỗi cạnh của góc này là tia đối của một cạnh của góc kia)."
          },
          {
            id: "d1q3", level: "de", source: "SGK tr.42 – Luyện tập 1",
            q: "Trong hình dưới đây, $Om$ và $On$ là hai tia đối nhau, $\\widehat{nOt} = 55^\\circ$. Số đo góc $mOt$ là" + figD1Q3,
            options: ["$125^\\circ$", "$55^\\circ$", "$35^\\circ$", "$145^\\circ$"],
            answer: 0,
            explain: "$\\widehat{mOt}$ và $\\widehat{tOn}$ là hai góc kề bù nên $\\widehat{mOt} = 180^\\circ - 55^\\circ = 125^\\circ$."
          },
          {
            id: "d1q4", level: "de", source: "SGK tr.44 – Ví dụ 2",
            q: "Tia $Oz$ là tia phân giác của góc $xOy$ và $\\widehat{xOy} = 80^\\circ$. Số đo góc $xOz$ là",
            options: ["$160^\\circ$", "$80^\\circ$", "$20^\\circ$", "$40^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xOz} = \\frac{1}{2}\\widehat{xOy} = \\frac{1}{2} \\cdot 80^\\circ = 40^\\circ$."
          },
          {
            id: "d1q5", level: "vua", source: "SGK tr.43 – Ví dụ 1",
            q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$, $\\widehat{xOy} = 65^\\circ$ (hình dưới). Số đo góc $x'Oy$ là" + figD1Q5,
            options: ["$65^\\circ$", "$25^\\circ$", "$115^\\circ$", "$125^\\circ$"],
            answer: 2,
            explain: "$\\widehat{x'Oy}$ và $\\widehat{yOx}$ là hai góc kề bù (vì $Ox$, $Ox'$ là hai tia đối nhau) nên $\\widehat{x'Oy} = 180^\\circ - 65^\\circ = 115^\\circ$."
          },
          {
            id: "d1q6", level: "vua", source: "SGK Bài 8 – BT 3.2",
            q: "Hai đường thẳng cắt nhau tại một điểm tạo thành bao nhiêu cặp góc đối đỉnh (không kể góc bẹt)?",
            options: ["$1$", "$2$", "$4$", "$3$"],
            answer: 1,
            explain: "Hai đường thẳng $xx'$, $yy'$ cắt nhau tại $O$ tạo thành bốn góc, ghép được hai cặp góc đối đỉnh: $\\widehat{xOy}$ và $\\widehat{x'Oy'}$; $\\widehat{x'Oy}$ và $\\widehat{xOy'}$."
          },
          {
            id: "d1q7", level: "vua", source: "SGK tr.44 – Luyện tập 3",
            q: "Tia $Am$ là tia phân giác của góc $xAy$ và $\\widehat{xAm} = 35^\\circ$. Số đo góc $xAy$ là",
            options: ["$70^\\circ$", "$17{,}5^\\circ$", "$145^\\circ$", "$35^\\circ$"],
            answer: 0,
            explain: "$\\widehat{xAy} = 2 \\cdot \\widehat{xAm} = 2 \\cdot 35^\\circ = 70^\\circ$."
          },
          {
            id: "d1q8", level: "vua", source: "mới",
            q: "Khẳng định nào sau đây đúng?",
            options: ["Hai góc bằng nhau thì đối đỉnh", "Hai góc có tổng số đo bằng $180^\\circ$ thì kề bù", "Hai góc chung đỉnh thì đối đỉnh", "Hai góc kề bù thì có một cạnh chung"],
            answer: 3,
            explain: "Theo định nghĩa, hai góc kề bù có một cạnh chung. Các câu còn lại sai: hai góc bằng nhau hoặc có tổng $180^\\circ$ có thể nằm ở hai chỗ khác nhau; hai góc chung đỉnh chưa chắc đối đỉnh."
          },
          {
            id: "d1q9", level: "kho", source: "SGK Bài 8 – BT 3.3",
            q: "Vẽ $\\widehat{xOy} = 60^\\circ$, tia $Om$ là tia đối của tia $Ox$, tia $Ot$ là tia phân giác của góc $xOy$. Số đo góc $tOm$ là",
            options: ["$120^\\circ$", "$150^\\circ$", "$30^\\circ$", "$90^\\circ$"],
            answer: 1,
            explain: "$\\widehat{xOt} = \\frac{1}{2} \\cdot 60^\\circ = 30^\\circ$. Vì $Ox$, $Om$ đối nhau nên $\\widehat{xOt}$ và $\\widehat{tOm}$ kề bù: $\\widehat{tOm} = 180^\\circ - 30^\\circ = 150^\\circ$."
          },
          {
            id: "d1q10", level: "kho", source: "mới",
            q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$. Biết $\\widehat{xOy} + \\widehat{x'Oy'} = 140^\\circ$. Số đo góc $x'Oy$ là",
            options: ["$70^\\circ$", "$40^\\circ$", "$140^\\circ$", "$110^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xOy} = \\widehat{x'Oy'}$ (đối đỉnh) nên mỗi góc bằng $140^\\circ : 2 = 70^\\circ$. Suy ra $\\widehat{x'Oy} = 180^\\circ - 70^\\circ = 110^\\circ$ (kề bù với $\\widehat{xOy}$)."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK Bài 8 – BT 3.3 (biến đổi)", maxPoints: 3,
            q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$, biết $\\widehat{xOy} = 40^\\circ$.<br>a) Tính số đo các góc $x'Oy'$, $x'Oy$, $xOy'$.<br>b) Vẽ tia $Ot$ là tia phân giác của góc $xOy$. Tính số đo góc $tOx'$.",
            modelAnswer: "a) • $\\widehat{x'Oy'} = \\widehat{xOy} = 40^\\circ$ (hai góc đối đỉnh).<br>" +
              "• $\\widehat{x'Oy} + \\widehat{yOx} = 180^\\circ$ (hai góc kề bù) nên $\\widehat{x'Oy} = 180^\\circ - 40^\\circ = 140^\\circ$.<br>" +
              "• $\\widehat{xOy'} = \\widehat{x'Oy} = 140^\\circ$ (hai góc đối đỉnh).<br>" +
              "b) Vì $Ot$ là tia phân giác của góc $xOy$ nên $\\widehat{xOt} = \\frac{1}{2} \\cdot 40^\\circ = 20^\\circ$.<br>" +
              "Vì $Ox$ và $Ox'$ là hai tia đối nhau nên $\\widehat{xOt}$ và $\\widehat{tOx'}$ là hai góc kề bù: $\\widehat{tOx'} = 180^\\circ - 20^\\circ = 160^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{x'Oy'} = 40^\\circ$, nêu lí do hai góc đối đỉnh." },
              { pts: 0.5, text: "Tính đúng $\\widehat{x'Oy} = 140^\\circ$, nêu lí do hai góc kề bù." },
              { pts: 0.5, text: "Tính đúng $\\widehat{xOy'} = 140^\\circ$ (có lí do)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{xOt} = 20^\\circ$ theo tính chất tia phân giác." },
              { pts: 1, text: "Lập luận hai góc kề bù và tính đúng $\\widehat{tOx'} = 160^\\circ$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SGK tr.42 – Định nghĩa hai góc đối đỉnh",
            q: "Theo định nghĩa, hai góc đối đỉnh là hai góc",
            options: ["có chung một đỉnh", "mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia", "có tổng số đo bằng $180^\\circ$", "có một cạnh chung"],
            answer: 1,
            explain: "Định nghĩa: hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia. Chung đỉnh thôi là chưa đủ."
          },
          {
            id: "d2q2", level: "de", source: "mới",
            q: "Một góc có số đo $75^\\circ$. Góc kề bù với nó có số đo là",
            options: ["$105^\\circ$", "$75^\\circ$", "$15^\\circ$", "$115^\\circ$"],
            answer: 0,
            explain: "Hai góc kề bù có tổng $180^\\circ$ nên góc cần tìm bằng $180^\\circ - 75^\\circ = 105^\\circ$."
          },
          {
            id: "d2q3", level: "de", source: "SGK tr.44 – Luyện tập 3",
            q: "Tia $Ot$ là tia phân giác của góc $mOn$ và $\\widehat{mOt} = 27^\\circ$. Số đo góc $mOn$ là",
            options: ["$27^\\circ$", "$13{,}5^\\circ$", "$63^\\circ$", "$54^\\circ$"],
            answer: 3,
            explain: "$\\widehat{mOn} = 2 \\cdot \\widehat{mOt} = 2 \\cdot 27^\\circ = 54^\\circ$."
          },
          {
            id: "d2q4", level: "de", source: "SBT Bài 8 – BT 3.1",
            q: "Trong hình dưới đây, $Om$ và $On$ là hai tia đối nhau. Cặp góc kề bù là" + figD2Q4,
            options: ["$\\widehat{mOt}$ và $\\widehat{mOn}$", "$\\widehat{tOn}$ và $\\widehat{nOm}$", "$\\widehat{mOt}$ và $\\widehat{tOn}$", "Không có cặp góc kề bù nào"],
            answer: 2,
            explain: "$\\widehat{mOt}$ và $\\widehat{tOn}$ có cạnh chung $Ot$, hai cạnh còn lại $Om$, $On$ là hai tia đối nhau nên chúng kề bù."
          },
          {
            id: "d2q5", level: "vua", source: "SGK Bài 8 – BT 3.2",
            q: "Hai đường thẳng $AB$ và $CD$ cắt nhau tại $O$ (hình dưới). Cặp góc nào sau đây là hai góc đối đỉnh?" + figD2Q5,
            options: ["$\\widehat{AOC}$ và $\\widehat{BOD}$", "$\\widehat{AOC}$ và $\\widehat{COB}$", "$\\widehat{AOD}$ và $\\widehat{AOC}$", "$\\widehat{BOC}$ và $\\widehat{BOD}$"],
            answer: 0,
            explain: "$OA$ là tia đối của $OB$, $OC$ là tia đối của $OD$, nên $\\widehat{AOC}$ và $\\widehat{BOD}$ là hai góc đối đỉnh. Các cặp còn lại có cạnh chung (là cặp góc kề bù)."
          },
          {
            id: "d2q6", level: "vua", source: "SGK tr.43 – Luyện tập 2",
            q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$ và $\\widehat{xOy} = 90^\\circ$. Khẳng định nào sau đây <b>sai</b>?",
            options: ["$\\widehat{x'Oy} = 90^\\circ$", "$xx' \\perp yy'$", "$\\widehat{x'Oy'} = 180^\\circ$", "$\\widehat{xOy'} = 90^\\circ$"],
            answer: 2,
            explain: "$\\widehat{x'Oy'} = \\widehat{xOy} = 90^\\circ$ (đối đỉnh), không phải $180^\\circ$. Các góc còn lại đều vuông và $xx' \\perp yy'$."
          },
          {
            id: "d2q7", level: "vua", source: "SGK tr.44 – Ví dụ 2",
            q: "Tia $Oz$ là tia phân giác của góc $xOy$, $\\widehat{xOy} = 130^\\circ$. Số đo góc $xOz$ là",
            options: ["$130^\\circ$", "$65^\\circ$", "$50^\\circ$", "$25^\\circ$"],
            answer: 1,
            explain: "$\\widehat{xOz} = \\frac{1}{2} \\cdot 130^\\circ = 65^\\circ$."
          },
          {
            id: "d2q8", level: "vua", source: "SGK Bài 8 – BT 3.5",
            q: "Hai đường thẳng cắt nhau tạo thành bốn góc, trong đó có một góc bằng $48^\\circ$. Số đo ba góc còn lại là",
            options: ["$132^\\circ;\\ 132^\\circ;\\ 132^\\circ$", "$48^\\circ;\\ 48^\\circ;\\ 132^\\circ$", "$42^\\circ;\\ 48^\\circ;\\ 42^\\circ$", "$132^\\circ;\\ 48^\\circ;\\ 132^\\circ$"],
            answer: 3,
            explain: "Góc đối đỉnh với góc $48^\\circ$ cũng bằng $48^\\circ$; hai góc còn lại kề bù với nó nên đều bằng $180^\\circ - 48^\\circ = 132^\\circ$."
          },
          {
            id: "d2q9", level: "kho", source: "SBT Bài 8 – BT 3.7",
            q: "Cho góc bẹt $xOy$. Vẽ tia $Oz$ sao cho $\\widehat{xOz} = 70^\\circ$; $Om$ là tia phân giác của $\\widehat{xOz}$, $On$ là tia phân giác của $\\widehat{zOy}$. Số đo góc $mOn$ là",
            options: ["$90^\\circ$", "$70^\\circ$", "$110^\\circ$", "$125^\\circ$"],
            answer: 0,
            explain: "$\\widehat{zOy} = 180^\\circ - 70^\\circ = 110^\\circ$. $\\widehat{mOz} = 35^\\circ$, $\\widehat{zOn} = 55^\\circ$, nên $\\widehat{mOn} = 35^\\circ + 55^\\circ = 90^\\circ$."
          },
          {
            id: "d2q10", level: "kho", source: "mới",
            q: "Hai góc $xOz$ và $zOy$ kề bù, biết $\\widehat{xOz} - \\widehat{zOy} = 40^\\circ$. Số đo góc $xOz$ là",
            options: ["$70^\\circ$", "$140^\\circ$", "$110^\\circ$", "$100^\\circ$"],
            answer: 2,
            explain: "Tổng hai góc là $180^\\circ$, hiệu là $40^\\circ$, nên $\\widehat{xOz} = (180^\\circ + 40^\\circ) : 2 = 110^\\circ$ (và $\\widehat{zOy} = 70^\\circ$)."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SBT Bài 8 – BT 3.4 (biến đổi)", maxPoints: 1.5,
            q: "Vẽ $\\widehat{xAm} = 64^\\circ$. Vẽ tia $An$ là tia phân giác của góc $xAm$.<br>a) Tính $\\widehat{xAn}$.<br>b) Vẽ tia $Ay$ là tia đối của tia $An$. Tính $\\widehat{mAy}$.",
            modelAnswer: "a) Vì $An$ là tia phân giác của góc $xAm$ nên $\\widehat{xAn} = \\widehat{nAm} = \\frac{64^\\circ}{2} = 32^\\circ$.<br>" +
              "b) Vì $An$ và $Ay$ là hai tia đối nhau nên $\\widehat{nAm}$ và $\\widehat{mAy}$ là hai góc kề bù:<br>" +
              "$\\widehat{nAm} + \\widehat{mAy} = 180^\\circ$, suy ra $\\widehat{mAy} = 180^\\circ - 32^\\circ = 148^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{xAn} = 32^\\circ$ (dùng tính chất tia phân giác)." },
              { pts: 0.5, text: "Nhận ra $\\widehat{nAm}$ và $\\widehat{mAy}$ là hai góc kề bù." },
              { pts: 0.5, text: "Tính đúng $\\widehat{mAy} = 148^\\circ$." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Hai đường thẳng $AB$ và $CD$ cắt nhau tại $O$ sao cho $\\widehat{AOC} - \\widehat{AOD} = 50^\\circ$. Tính số đo các góc $AOC$, $AOD$, $BOD$, $BOC$.",
            modelAnswer: "Vì $OC$ và $OD$ là hai tia đối nhau nên $\\widehat{AOC}$ và $\\widehat{AOD}$ là hai góc kề bù: $\\widehat{AOC} + \\widehat{AOD} = 180^\\circ$.<br>" +
              "Kết hợp $\\widehat{AOC} - \\widehat{AOD} = 50^\\circ$: $\\widehat{AOC} = (180^\\circ + 50^\\circ) : 2 = 115^\\circ$; $\\ \\widehat{AOD} = 180^\\circ - 115^\\circ = 65^\\circ$.<br>" +
              "$\\widehat{BOD} = \\widehat{AOC} = 115^\\circ$ và $\\widehat{BOC} = \\widehat{AOD} = 65^\\circ$ (các cặp góc đối đỉnh).",
            rubric: [
              { pts: 0.5, text: "Lập được $\\widehat{AOC} + \\widehat{AOD} = 180^\\circ$ (hai góc kề bù)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{AOC} = 115^\\circ$, $\\widehat{AOD} = 65^\\circ$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{BOD} = 115^\\circ$, $\\widehat{BOC} = 65^\\circ$ (lí do đối đỉnh)." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "mới",
            q: "Hai góc $\\widehat{A}$ và $\\widehat{B}$ là hai góc đối đỉnh, $\\widehat{A} = 38^\\circ$. Khi đó",
            options: ["$\\widehat{B} = 142^\\circ$", "$\\widehat{B} = 52^\\circ$", "$\\widehat{B} = 38^\\circ$", "$\\widehat{B} = 76^\\circ$"],
            answer: 2,
            explain: "Hai góc đối đỉnh thì bằng nhau nên $\\widehat{B} = \\widehat{A} = 38^\\circ$."
          },
          {
            id: "d3q2", level: "de", source: "SGK tr.44 – Định nghĩa tia phân giác",
            q: "Tia $Oz$ là tia phân giác của góc $xOy$ khi",
            options: ["tia $Oz$ nằm giữa hai tia $Ox$ và $Oy$", "$\\widehat{xOz} = \\widehat{zOy}$", "$\\widehat{xOz} + \\widehat{zOy} = \\widehat{xOy}$", "tia $Oz$ nằm giữa hai cạnh $Ox$, $Oy$ và $\\widehat{xOz} = \\widehat{zOy}$"],
            answer: 3,
            explain: "Tia phân giác phải thỏa mãn đồng thời hai điều kiện: nằm giữa hai cạnh của góc và tạo với hai cạnh hai góc bằng nhau. Chỉ một điều kiện thì chưa đủ."
          },
          {
            id: "d3q3", level: "de", source: "mới",
            q: "Tia phân giác của một góc vuông tạo với mỗi cạnh của góc đó một góc bằng",
            options: ["$45^\\circ$", "$90^\\circ$", "$30^\\circ$", "$180^\\circ$"],
            answer: 0,
            explain: "Góc vuông bằng $90^\\circ$, tia phân giác chia đôi: $90^\\circ : 2 = 45^\\circ$."
          },
          {
            id: "d3q4", level: "de", source: "SGK tr.42 – Tập suy luận",
            q: "Hai đường thẳng cắt nhau tại $O$ tạo thành bốn góc $\\widehat{O_1}$, $\\widehat{O_2}$, $\\widehat{O_3}$, $\\widehat{O_4}$ như hình dưới. Biết $\\widehat{O_1} = 120^\\circ$. Số đo $\\widehat{O_2}$ là" + figD3Q4,
            options: ["$120^\\circ$", "$60^\\circ$", "$30^\\circ$", "$240^\\circ$"],
            answer: 1,
            explain: "$\\widehat{O_1}$ và $\\widehat{O_2}$ là hai góc kề bù nên $\\widehat{O_2} = 180^\\circ - 120^\\circ = 60^\\circ$. (Còn $\\widehat{O_3} = \\widehat{O_1} = 120^\\circ$ vì đối đỉnh.)"
          },
          {
            id: "d3q5", level: "vua", source: "SBT tr.36 – Ví dụ 3",
            q: "Cho $\\widehat{xOy} = 100^\\circ$. Vẽ tia $Oy'$ là tia đối của tia $Oy$. Số đo góc $xOy'$ là",
            options: ["$100^\\circ$", "$50^\\circ$", "$180^\\circ$", "$80^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xOy}$ và $\\widehat{xOy'}$ kề bù (vì $Oy$, $Oy'$ đối nhau) nên $\\widehat{xOy'} = 180^\\circ - 100^\\circ = 80^\\circ$."
          },
          {
            id: "d3q6", level: "vua", source: "mới",
            q: "Hai góc kề bù, trong đó một góc gấp 4 lần góc kia. Số đo góc nhỏ hơn là",
            options: ["$36^\\circ$", "$45^\\circ$", "$144^\\circ$", "$72^\\circ$"],
            answer: 0,
            explain: "Tổng hai góc là $180^\\circ$, chia thành $1 + 4 = 5$ phần bằng nhau. Góc nhỏ $= 180^\\circ : 5 = 36^\\circ$ (góc lớn $= 144^\\circ$)."
          },
          {
            id: "d3q7", level: "vua", source: "SBT Bài 8 – BT 3.1",
            q: "Cho tam giác $ABC$, điểm $M$ nằm giữa $B$ và $C$ (hình dưới). Góc kề bù với góc $AMB$ là" + figD3Q7,
            options: ["$\\widehat{BAM}$", "$\\widehat{ABM}$", "$\\widehat{AMC}$", "$\\widehat{MAC}$"],
            answer: 2,
            explain: "$\\widehat{AMB}$ và $\\widehat{AMC}$ có cạnh chung $MA$, hai cạnh còn lại $MB$, $MC$ là hai tia đối nhau (vì $M$ nằm giữa $B$ và $C$), nên chúng kề bù."
          },
          {
            id: "d3q8", level: "vua", source: "mới",
            q: "Tia $Om$ là tia phân giác của góc $xOy$. Biết $\\widehat{xOy} - \\widehat{xOm} = 36^\\circ$. Số đo góc $xOy$ là",
            options: ["$36^\\circ$", "$72^\\circ$", "$18^\\circ$", "$108^\\circ$"],
            answer: 1,
            explain: "$\\widehat{xOm} = \\frac{1}{2}\\widehat{xOy}$ nên $\\widehat{xOy} - \\widehat{xOm} = \\frac{1}{2}\\widehat{xOy} = 36^\\circ$. Suy ra $\\widehat{xOy} = 72^\\circ$."
          },
          {
            id: "d3q9", level: "kho", source: "mới",
            q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$. Biết $\\widehat{xOy} + \\widehat{x'Oy'} + \\widehat{x'Oy} = 250^\\circ$. Số đo góc $xOy$ là",
            options: ["$125^\\circ$", "$110^\\circ$", "$83^\\circ$", "$70^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xOy} + \\widehat{x'Oy} = 180^\\circ$ (kề bù) nên $\\widehat{x'Oy'} = 250^\\circ - 180^\\circ = 70^\\circ$. Mà $\\widehat{xOy} = \\widehat{x'Oy'}$ (đối đỉnh) nên $\\widehat{xOy} = 70^\\circ$."
          },
          {
            id: "d3q10", level: "kho", source: "SBT Bài 8 – BT 3.8",
            q: "Cho $\\widehat{xOy} = 120^\\circ$, tia $Ot$ là tia phân giác của góc $xOy$, tia $Ox'$ là tia đối của tia $Ox$. Tia $Oy$ có là tia phân giác của góc $tOx'$ không?",
            options: ["Có, vì $Oy$ nằm giữa $Ot$, $Ox'$ và $\\widehat{tOy} = \\widehat{yOx'} = 60^\\circ$", "Không, vì $\\widehat{tOy} = 60^\\circ$ còn $\\widehat{yOx'} = 120^\\circ$", "Không, vì tia $Oy$ không nằm giữa hai tia $Ot$ và $Ox'$", "Có, vì $\\widehat{tOy} = \\widehat{yOx'} = 30^\\circ$"],
            answer: 0,
            explain: "$\\widehat{tOy} = \\frac{1}{2} \\cdot 120^\\circ = 60^\\circ$; $\\ \\widehat{yOx'} = 180^\\circ - 120^\\circ = 60^\\circ$ (kề bù). Tia $Oy$ nằm giữa $Ot$ và $Ox'$, tạo hai góc bằng nhau, nên $Oy$ là tia phân giác của $\\widehat{tOx'}$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SBT Bài 8 – BT 3.3 (biến đổi)", maxPoints: 2,
            q: "Vẽ hai đường thẳng $mn$ và $pq$ cắt nhau tại $O$ sao cho $\\widehat{mOp} = 35^\\circ$. Tính số đo các góc $pOn$, $nOq$, $qOm$.",
            modelAnswer: "• $\\widehat{mOp} + \\widehat{pOn} = 180^\\circ$ (hai góc kề bù, vì $Om$, $On$ là hai tia đối nhau), nên $\\widehat{pOn} = 180^\\circ - 35^\\circ = 145^\\circ$.<br>" +
              "• $\\widehat{nOq} = \\widehat{mOp} = 35^\\circ$ (hai góc đối đỉnh).<br>" +
              "• $\\widehat{qOm} = \\widehat{pOn} = 145^\\circ$ (hai góc đối đỉnh).",
            rubric: [
              { pts: 1, text: "Tính đúng $\\widehat{pOn} = 145^\\circ$, nêu lí do hai góc kề bù." },
              { pts: 0.5, text: "Tính đúng $\\widehat{nOq} = 35^\\circ$ (đối đỉnh)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{qOm} = 145^\\circ$ (đối đỉnh hoặc kề bù)." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SBT Bài 8 – BT 3.7 (tổng quát)", maxPoints: 1,
            q: "Cho hai góc kề bù $xOz$ và $zOy$. Gọi $Om$, $On$ lần lượt là tia phân giác của hai góc đó. Chứng tỏ rằng $\\widehat{mOn} = 90^\\circ$.",
            modelAnswer: "Vì $Om$, $On$ là tia phân giác nên $\\widehat{mOz} = \\frac{1}{2}\\widehat{xOz}$ và $\\widehat{zOn} = \\frac{1}{2}\\widehat{zOy}$.<br>" +
              "Tia $Oz$ nằm giữa hai tia $Om$ và $On$ nên $\\widehat{mOn} = \\widehat{mOz} + \\widehat{zOn} = \\frac{1}{2}(\\widehat{xOz} + \\widehat{zOy}) = \\frac{1}{2} \\cdot 180^\\circ = 90^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Viết đúng $\\widehat{mOz} = \\frac{1}{2}\\widehat{xOz}$, $\\widehat{zOn} = \\frac{1}{2}\\widehat{zOy}$." },
              { pts: 0.5, text: "Cộng lại và dùng tổng hai góc kề bù bằng $180^\\circ$, kết luận $\\widehat{mOn} = 90^\\circ$." }
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
            q: "Hai đường thẳng cắt nhau tạo thành bốn góc (không kể góc bẹt). Tổng ba trong bốn góc đó bằng $300^\\circ$. Góc còn lại có số đo là",
            options: ["$120^\\circ$", "$30^\\circ$", "$100^\\circ$", "$60^\\circ$"],
            answer: 3,
            explain: "Bốn góc gồm hai cặp kề bù, tổng bằng $180^\\circ + 180^\\circ = 360^\\circ$. Góc còn lại $= 360^\\circ - 300^\\circ = 60^\\circ$."
          },
          {
            id: "d4q2", level: "vua", source: "mới",
            q: "Ba đường thẳng phân biệt cùng đi qua điểm $O$ tạo thành bao nhiêu cặp góc đối đỉnh (không kể góc bẹt)?",
            options: ["$3$", "$6$", "$9$", "$12$"],
            answer: 1,
            explain: "Ba đường thẳng cho 6 tia gốc $O$. Hai tia không đối nhau tạo thành một góc: có $\\frac{6 \\cdot 5}{2} - 3 = 12$ góc. Mỗi góc có đúng một góc đối đỉnh với nó, nên có $12 : 2 = 6$ cặp."
          },
          {
            id: "d4q3", level: "kho", source: "mới",
            q: "Hai góc $xOy$ và $yOz$ kề bù, $\\widehat{xOy} = 3 \\cdot \\widehat{yOz}$. Tia $Ot$ là tia phân giác của góc $xOy$. Số đo góc $tOz$ là",
            options: ["$112{,}5^\\circ$", "$67{,}5^\\circ$", "$135^\\circ$", "$90^\\circ$"],
            answer: 0,
            explain: "$\\widehat{yOz} = 180^\\circ : 4 = 45^\\circ$, $\\widehat{xOy} = 135^\\circ$, $\\widehat{tOy} = 67{,}5^\\circ$. Tia $Oy$ nằm giữa $Ot$ và $Oz$ nên $\\widehat{tOz} = 67{,}5^\\circ + 45^\\circ = 112{,}5^\\circ$."
          },
          {
            id: "d4q4", level: "kho", source: "mới",
            q: "Cho $\\widehat{AOB} = 80^\\circ$, tia $OC$ nằm giữa hai tia $OA$, $OB$ và $\\widehat{BOC} = 40^\\circ$. Khẳng định nào sau đây đúng?",
            options: ["$OC$ không là tia phân giác của $\\widehat{AOB}$", "$\\widehat{AOC} = 120^\\circ$", "$OC$ là tia phân giác của $\\widehat{AOB}$", "$\\widehat{AOC} = 60^\\circ$"],
            answer: 2,
            explain: "$OC$ nằm giữa $OA$, $OB$ nên $\\widehat{AOC} = 80^\\circ - 40^\\circ = 40^\\circ = \\widehat{BOC}$. Vậy $OC$ là tia phân giác của $\\widehat{AOB}$."
          },
          {
            id: "d4q5", level: "kho", source: "mới",
            q: "Hai đường thẳng $xx'$, $yy'$ cắt nhau tại $O$. Tia $Ot$ là tia phân giác của góc $xOy$, tia $Ot'$ là tia đối của tia $Ot$. Khẳng định nào sau đây đúng?",
            options: ["$Ot'$ là tia phân giác của $\\widehat{xOy'}$", "$Ot'$ là tia phân giác của $\\widehat{x'Oy}$", "$Ot'$ là tia phân giác của $\\widehat{x'Oy'}$", "$\\widehat{tOt'} = 90^\\circ$"],
            answer: 2,
            explain: "$\\widehat{x'Ot'} = \\widehat{xOt}$ và $\\widehat{t'Oy'} = \\widehat{tOy}$ (các cặp góc đối đỉnh), mà $\\widehat{xOt} = \\widehat{tOy}$, nên $Ot'$ chia $\\widehat{x'Oy'}$ thành hai góc bằng nhau: $Ot'$ là tia phân giác của $\\widehat{x'Oy'}$. Còn $\\widehat{tOt'} = 180^\\circ$."
          },
          {
            id: "d4q6", level: "kho", source: "SBT Bài 8 – BT 3.8",
            q: "Vẽ $\\widehat{xOy} = 50^\\circ$, tia $Oz$ là tia đối của tia $Ox$, tia $Om$ là tia phân giác của góc $yOz$. Số đo góc $xOm$ là",
            options: ["$65^\\circ$", "$130^\\circ$", "$90^\\circ$", "$115^\\circ$"],
            answer: 3,
            explain: "$\\widehat{yOz} = 180^\\circ - 50^\\circ = 130^\\circ$ (kề bù), $\\widehat{yOm} = 65^\\circ$. Tia $Oy$ nằm giữa $Ox$ và $Om$ nên $\\widehat{xOm} = 50^\\circ + 65^\\circ = 115^\\circ$. (Hoặc $\\widehat{xOm} = 180^\\circ - \\widehat{mOz} = 180^\\circ - 65^\\circ$.)"
          },
          {
            id: "d4q7", level: "kho", source: "mới",
            q: "Có $n$ đường thẳng phân biệt cùng đi qua một điểm $O$, tạo thành tất cả $30$ cặp góc đối đỉnh (không kể góc bẹt). Giá trị của $n$ là",
            options: ["$6$", "$5$", "$15$", "$10$"],
            answer: 0,
            explain: "$n$ đường thẳng cho $2n$ tia; số góc (không kể góc bẹt) là $\\frac{2n(2n-1)}{2} - n = 2n^2 - 2n$, nên số cặp đối đỉnh là $n^2 - n = n(n-1)$. $n(n-1) = 30$ cho $n = 6$."
          },
          {
            id: "d4q8", level: "kho", source: "mới",
            q: "Hai góc $xOy$ và $yOz$ kề bù, biết $\\widehat{xOy} = 4 \\cdot \\widehat{yOz} - 20^\\circ$. Số đo góc $xOy$ là",
            options: ["$40^\\circ$", "$140^\\circ$", "$160^\\circ$", "$36^\\circ$"],
            answer: 1,
            explain: "$\\widehat{xOy} + \\widehat{yOz} = 180^\\circ$ nên $5 \\cdot \\widehat{yOz} - 20^\\circ = 180^\\circ$, suy ra $\\widehat{yOz} = 40^\\circ$ và $\\widehat{xOy} = 140^\\circ$."
          },
          {
            id: "d4q9", level: "kho", source: "mới",
            q: "Hai đường thẳng cắt nhau tạo thành bốn góc. Hiệu của hai góc kề nhau bằng $40^\\circ$. Góc lớn hơn có số đo là",
            options: ["$70^\\circ$", "$140^\\circ$", "$100^\\circ$", "$110^\\circ$"],
            answer: 3,
            explain: "Hai góc kề nhau ở đây là hai góc kề bù, tổng $180^\\circ$, hiệu $40^\\circ$. Góc lớn $= (180^\\circ + 40^\\circ) : 2 = 110^\\circ$."
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Tia $Oz$ là tia phân giác của góc $xOy$, tia $Ot$ là tia phân giác của góc $xOz$. Biết $\\widehat{tOy} = 75^\\circ$. Số đo góc $xOy$ là",
            options: ["$100^\\circ$", "$150^\\circ$", "$112{,}5^\\circ$", "$50^\\circ$"],
            answer: 0,
            explain: "Đặt $\\widehat{xOt} = a$ thì $\\widehat{tOz} = a$, $\\widehat{xOz} = 2a$, $\\widehat{zOy} = 2a$. Khi đó $\\widehat{tOy} = a + 2a = 3a = 75^\\circ$, nên $a = 25^\\circ$ và $\\widehat{xOy} = 4a = 100^\\circ$."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "SBT Bài 8 – BT 3.8 (biến đổi)", maxPoints: 1.5,
            q: "Cho hai góc kề bù $xOy$ và $yOz$, trong đó $\\widehat{xOy} = 2 \\cdot \\widehat{yOz}$. Vẽ tia $Om$ là tia phân giác của góc $xOy$.<br>a) Tính $\\widehat{xOy}$ và $\\widehat{yOz}$.<br>b) Chứng tỏ tia $Oy$ là tia phân giác của góc $mOz$.",
            modelAnswer: "a) $\\widehat{xOy} + \\widehat{yOz} = 180^\\circ$ (kề bù) và $\\widehat{xOy} = 2\\widehat{yOz}$, nên $3\\widehat{yOz} = 180^\\circ$: $\\widehat{yOz} = 60^\\circ$, $\\widehat{xOy} = 120^\\circ$.<br>" +
              "b) $Om$ là tia phân giác của $\\widehat{xOy}$ nên $\\widehat{mOy} = \\frac{1}{2} \\cdot 120^\\circ = 60^\\circ$.<br>" +
              "Tia $Om$ nằm trong góc $xOy$, tia $Oz$ nằm ở phía bên kia của $Oy$, nên tia $Oy$ nằm giữa hai tia $Om$ và $Oz$. Lại có $\\widehat{mOy} = \\widehat{yOz} = 60^\\circ$.<br>" +
              "Vậy $Oy$ là tia phân giác của góc $mOz$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{yOz} = 60^\\circ$, $\\widehat{xOy} = 120^\\circ$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{mOy} = 60^\\circ$." },
              { pts: 0.5, text: "Nêu được $Oy$ nằm giữa $Om$, $Oz$ và hai góc bằng nhau, kết luận đúng." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Hai đường thẳng $AB$ và $CD$ cắt nhau tại $O$. Vẽ tia $Om$ là tia phân giác của góc $AOC$ và tia $On$ là tia phân giác của góc $BOD$. Chứng tỏ rằng $Om$ và $On$ là hai tia đối nhau.",
            modelAnswer: "Đặt $\\widehat{AOC} = 2a$. Ta có $\\widehat{BOD} = \\widehat{AOC} = 2a$ (hai góc đối đỉnh).<br>" +
              "Do đó $\\widehat{mOC} = a$ và $\\widehat{BOn} = a$ (tính chất tia phân giác).<br>" +
              "$\\widehat{COB} = 180^\\circ - \\widehat{AOC} = 180^\\circ - 2a$ (hai góc kề bù, vì $OA$, $OB$ đối nhau).<br>" +
              "Các góc $\\widehat{mOC}$, $\\widehat{COB}$, $\\widehat{BOn}$ nằm liên tiếp nhau nên $\\widehat{mOn} = a + (180^\\circ - 2a) + a = 180^\\circ$.<br>" +
              "Góc $mOn$ là góc bẹt, vậy $Om$ và $On$ là hai tia đối nhau.",
            rubric: [
              { pts: 0.5, text: "Dùng hai góc đối đỉnh: $\\widehat{BOD} = \\widehat{AOC}$, suy ra $\\widehat{mOC} = \\widehat{BOn}$." },
              { pts: 0.5, text: "Tính được $\\widehat{COB} = 180^\\circ - \\widehat{AOC}$ (kề bù)." },
              { pts: 0.5, text: "Cộng ba góc liên tiếp được $180^\\circ$, kết luận $Om$, $On$ đối nhau." }
            ]
          }
        ]
      }
    ]
  });
})();
