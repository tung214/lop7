(function () {
  // ===== Hình vẽ SVG (dùng currentColor để hợp chế độ sáng/tối; màu nhấn #e5484d) =====
  var RED = "#e5484d";
  function rad(d) { return d * Math.PI / 180; }
  function f(n) { return (+n).toFixed(1); }
  // điểm cách O một đoạn r theo hướng deg (độ, ngược chiều kim đồng hồ, 0° = sang phải)
  function pt(O, deg, r) { return [O[0] + r * Math.cos(rad(deg)), O[1] - r * Math.sin(rad(deg))]; }
  // giao của tia (P, hướng a1) và tia (Q, hướng a2)
  function inter(P, a1, Q, a2) {
    var u = [Math.cos(rad(a1)), -Math.sin(rad(a1))], v = [Math.cos(rad(a2)), -Math.sin(rad(a2))];
    var det = u[0] * (-v[1]) - u[1] * (-v[0]);
    var dx = Q[0] - P[0], dy = Q[1] - P[1];
    var t = (dx * (-v[1]) - dy * (-v[0])) / det;
    return [P[0] + t * u[0], P[1] + t * u[1]];
  }
  function svg(w, h, body) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="100%" style="max-width:320px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">' + body + '</svg>';
  }
  function line(p, q, col, dash) {
    return '<line x1="' + f(p[0]) + '" y1="' + f(p[1]) + '" x2="' + f(q[0]) + '" y2="' + f(q[1]) + '" stroke="' + (col || 'currentColor') + '" stroke-width="1.6"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>';
  }
  function txt(p, s, opt) {
    opt = opt || {};
    return '<text x="' + f(p[0]) + '" y="' + f(p[1]) + '" font-size="' + (opt.size || 13) + '" text-anchor="middle" dominant-baseline="middle" fill="' + (opt.col || 'currentColor') + '"' +
      (opt.bold ? ' font-weight="bold"' : '') + (opt.it === false ? '' : ' font-style="italic"') + '>' + s + '</text>';
  }
  function dot(p) { return '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2.6" fill="currentColor"/>'; }
  // cung góc từ hướng a1 tới a2 (ngược chiều kim đồng hồ, a2 > a1)
  function arc(O, r, a1, a2, col) {
    var p = pt(O, a1, r), q = pt(O, a2, r), large = (a2 - a1) > 180 ? 1 : 0;
    return '<path d="M' + f(p[0]) + ' ' + f(p[1]) + ' A' + r + ' ' + r + ' 0 ' + large + ' 0 ' + f(q[0]) + ' ' + f(q[1]) + '" fill="none" stroke="' + (col || RED) + '" stroke-width="1.5"/>';
  }

  // Đường thẳng c cắt hai đường thẳng a (trên), b (dưới) tại A, B.
  // Đánh số góc tại mỗi đỉnh: 1 = trên-phải, 2 = trên-trái, 3 = dưới-trái, 4 = dưới-phải.
  // o.ang: góc (độ) giữa tia đi lên của c và hướng sang phải của a. o.labels: {A1: "70°", B2: "2", ...}; không có → đánh số tất cả.
  function tfig(o) {
    o = o || {};
    var ang = o.ang || 60, A = [180, 55], B = [180 - 95 / Math.tan(rad(ang)), 150];
    var s = line([15, A[1]], [305, A[1]]) + line([15, B[1]], [305, B[1]]) + line(pt(A, ang, 42), pt(B, ang + 180, 42));
    s += txt([24, A[1] - 11], 'a') + txt([24, B[1] - 11], 'b') + txt(pt(A, ang, 42).map(function (v, i) { return v + (i ? 4 : 12); }), 'c');
    var labels = o.labels;
    if (!labels) { labels = {}; ['A', 'B'].forEach(function (P) { for (var k = 1; k <= 4; k++) labels[P + k] = String(k); }); }
    var regions = { 1: [0, ang], 2: [ang, 180], 3: [180, 180 + ang], 4: [180 + ang, 360] };
    [['A', A], ['B', B]].forEach(function (V) {
      for (var k = 1; k <= 4; k++) {
        var lab = labels[V[0] + k];
        if (!lab) continue;
        var r = regions[k], mid = (r[0] + r[1]) / 2, isDeg = lab.length > 1;
        if (isDeg) s += arc(V[1], 13, r[0], r[1]);
        s += txt(pt(V[1], mid, isDeg ? 29 : 17), lab, { size: isDeg ? 12 : 11, it: false, col: isDeg ? RED : 'currentColor' });
      }
      s += dot(V[1]);
    });
    s += txt(pt(A, (ang + 180) / 2, 34), 'A', { bold: true }) + txt(pt(B, 180 + ang + (180 - ang) / 2, 34), 'B', { bold: true });
    return svg(320, 200, s);
  }

  // Các tia chung gốc O. o.rays = [[hướng, "tên"]], o.arcs = [[từ, tới, "nhãn"]]
  function rfig(o) {
    var O = [160, 115], s = '';
    o.rays.forEach(function (r) { s += line(O, pt(O, r[0], 95)) + txt(pt(O, r[0], 106), r[1]); });
    (o.arcs || []).forEach(function (a, i) {
      var r = a[3] || (18 + 4 * i), mid = (a[0] + a[1]) / 2, isDeg = a[2].length > 1;
      if (isDeg) s += arc(O, r, a[0], a[1]);
      s += txt(pt(O, mid, isDeg ? r + 17 : (o.numR || 20)), a[2], { size: isDeg ? 12 : 11, it: false, col: isDeg ? RED : 'currentColor' });
    });
    var op = o.oPos || [o.oDx || 0, 16];
    s += dot(O) + txt([O[0] + op[0], O[1] + op[1]], 'O', { bold: true });
    return svg(320, 225, s);
  }

  // Hình chữ "<": tia Ax, By song song cùng hướng sang phải; C nằm giữa. o.a = góc xAC, o.b = góc yBC; o.la/lb/lc: nhãn
  function zfig(o) {
    var A = [40, 40], B = [40, 175], C = inter(A, -o.a, B, o.b);
    var s = line(A, [295, A[1]]) + line(B, [295, B[1]]) + line(A, C) + line(B, C);
    s += arc(A, 20, -o.a, 0) + arc(B, 20, 0, o.b) + arc(C, 16, 180 - o.a, 180 + o.b);
    s += txt(pt(A, -o.a / 2, 40), o.la, { size: 12, it: false, col: RED }) + txt(pt(B, o.b / 2, 40), o.lb, { size: 12, it: false, col: RED }) +
      txt(pt(C, 180 + (o.b - o.a) / 2, 34), o.lc, { size: 12, it: false, col: RED });
    s += dot(A) + dot(B) + dot(C) + txt([A[0] - 12, A[1] - 6], 'A', { bold: true }) + txt([B[0] - 12, B[1] + 6], 'B', { bold: true }) +
      txt([C[0] + 13, C[1]], 'C', { bold: true }) + txt([290, A[1] - 11], 'x') + txt([290, B[1] - 11], 'y');
    return svg(320, 210, s);
  }

  // Hình cho tự luận Đề 2: B, C, D thẳng hàng; AB song song Cx
  function figC() {
    var B = [30, 165], C = [200, 165], D = [300, 165], A = inter(B, 60, C, 130), X = pt(C, 60, 125);
    var s = line(B, D) + line(B, A) + line(A, C) + line(C, X);
    s += arc(B, 20, 0, 60) + txt(pt(B, 30, 38), '60°', { size: 12, it: false, col: RED });
    s += arc(A, 18, 240, 310) + txt(pt(A, 275, 36), '70°', { size: 12, it: false, col: RED });
    s += txt(pt(C, 155, 22), '1', { size: 11, it: false }) + txt(pt(C, 95, 20), '2', { size: 11, it: false }) + txt(pt(C, 30, 22), '3', { size: 11, it: false });
    s += dot(A) + dot(B) + dot(C) + dot(D) + txt([A[0], A[1] - 12], 'A', { bold: true }) + txt([B[0] - 4, B[1] + 16], 'B', { bold: true }) +
      txt([C[0], C[1] + 16], 'C', { bold: true }) + txt([D[0] - 4, D[1] + 16], 'D', { bold: true }) + txt([X[0] + 10, X[1]], 'x');
    return svg(320, 190, s);
  }

  // Hình cho tự luận Đề 3: AB song song CD, O nằm giữa hai đường thẳng
  function figO() {
    var B = [210, 40], O = pt(B, 220, 105), D = pt(O, 290, (170 - O[1]) / Math.sin(rad(70))), A = [25, 40], C = [25, 170];
    var s = line(A, [235, 40]) + line(C, [235, 170]) + line(B, O) + line(O, D);
    s += arc(B, 18, 180, 220) + txt(pt(B, 200, 36), '40°', { size: 12, it: false, col: RED });
    s += arc(D, 18, 110, 180) + txt(pt(D, 145, 36), '70°', { size: 12, it: false, col: RED });
    s += dot(A) + dot(B) + dot(C) + dot(D) + dot(O) + txt([A[0], A[1] - 12], 'A', { bold: true }) + txt([B[0] + 4, B[1] - 12], 'B', { bold: true }) +
      txt([C[0], C[1] + 15], 'C', { bold: true }) + txt([D[0] + 4, D[1] + 15], 'D', { bold: true }) + txt([O[0] - 14, O[1]], 'O', { bold: true });
    return svg(260, 195, s);
  }

  registerLesson({
    id: "c3-on",
    chapter: 3,
    kind: "review",
    title: "Ôn tập chương III",
    sgkPages: [40, 59],
    sbtPages: [47, 50],
    objectives: [
      "Nhận biết và tính số đo hai góc kề bù, hai góc đối đỉnh; vận dụng tia phân giác của một góc",
      "Nhận biết cặp góc so le trong, cặp góc đồng vị; dấu hiệu nhận biết hai đường thẳng song song",
      "Phát biểu tiên đề Euclid; vận dụng tính chất của hai đường thẳng song song để tính góc và chứng minh",
      "Phân biệt giả thiết, kết luận của định lí; trình bày một chứng minh đơn giản"
    ],

    theory: [
      {
        heading: "1. Hai góc kề bù, hai góc đối đỉnh (Bài 8)",
        html: "<ul>" +
          "<li><b>Hai góc kề bù</b>: hai góc có một cạnh chung, hai cạnh còn lại là hai tia đối nhau. Tổng số đo hai góc kề bù bằng $180^\\circ$.</li>" +
          "<li><b>Hai góc đối đỉnh</b>: mỗi cạnh của góc này là tia đối của một cạnh của góc kia. <b>Hai góc đối đỉnh thì bằng nhau.</b> (Ngược lại, hai góc bằng nhau chưa chắc đối đỉnh.)</li>" +
          "<li>Hai đường thẳng cắt nhau tạo thành hai cặp góc đối đỉnh; biết một góc là tính được cả bốn góc. Ví dụ: $\\widehat{xOy} = 65^\\circ$ thì $\\widehat{x'Oy'} = 65^\\circ$ và $\\widehat{xOy'} = \\widehat{x'Oy} = 115^\\circ$.</li></ul>" +
          rfig({ rays: [[25, "x"], [205, "x'"], [110, "y"], [290, "y'"]], arcs: [[25, 110, "1"], [110, 205, "2"], [205, 290, "3"], [290, 385, "4"]], numR: 32, oPos: [13, 13] }) +
          "Ở hình trên: $\\widehat{O_1}$ và $\\widehat{O_3}$ đối đỉnh; $\\widehat{O_2}$ và $\\widehat{O_4}$ đối đỉnh; $\\widehat{O_1}$ và $\\widehat{O_2}$ kề bù."
      },
      {
        heading: "2. Tia phân giác của một góc (Bài 8)",
        html: "<ul>" +
          "<li>Tia $Oz$ là <b>tia phân giác</b> của góc $xOy$ (không phải góc bẹt) nếu $Oz$ nằm giữa hai tia $Ox$, $Oy$ và $\\widehat{xOz} = \\widehat{zOy}$.</li>" +
          "<li>Khi đó $\\widehat{xOz} = \\widehat{zOy} = \\frac{1}{2}\\widehat{xOy}$. Ví dụ $\\widehat{xOy} = 130^\\circ$ thì mỗi góc tạo bởi tia phân giác với một cạnh bằng $65^\\circ$.</li>" +
          "<li>Đường thẳng chứa tia phân giác gọi là <b>đường phân giác</b> của góc. Có thể vẽ tia phân giác bằng thước đo góc hoặc gấp giấy.</li></ul>"
      },
      {
        heading: "3. Góc so le trong, góc đồng vị. Dấu hiệu nhận biết hai đường thẳng song song (Bài 9)",
        html: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ tạo thành 8 góc (đánh số như hình):" +
          tfig({ ang: 60 }) +
          "<ul><li><b>Cặp góc so le trong</b>: $\\widehat{A_3}$ và $\\widehat{B_1}$; $\\widehat{A_4}$ và $\\widehat{B_2}$ (nằm \"trong\" hai đường thẳng $a$, $b$ và ở hai phía của $c$).</li>" +
          "<li><b>Cặp góc đồng vị</b>: $\\widehat{A_1}$ và $\\widehat{B_1}$; $\\widehat{A_2}$ và $\\widehat{B_2}$; $\\widehat{A_3}$ và $\\widehat{B_3}$; $\\widehat{A_4}$ và $\\widehat{B_4}$ (cùng vị trí ở hai đỉnh).</li>" +
          "<li><b>Dấu hiệu nhận biết</b>: nếu đường thẳng $c$ cắt hai đường thẳng $a$, $b$ và trong các góc tạo thành có <b>một cặp góc so le trong bằng nhau</b> (hoặc <b>một cặp góc đồng vị bằng nhau</b>) thì $a \\parallel b$.</li>" +
          "<li>Hệ quả: hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì song song với nhau ($a \\perp c$, $b \\perp c \\Rightarrow a \\parallel b$).</li></ul>"
      },
      {
        heading: "4. Tiên đề Euclid. Tính chất của hai đường thẳng song song (Bài 10)",
        html: "<ul>" +
          "<li><b>Tiên đề Euclid</b>: qua một điểm nằm ngoài một đường thẳng, <b>chỉ có một</b> đường thẳng song song với đường thẳng đó.</li>" +
          "<li><b>Tính chất</b>: nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau và hai góc đồng vị bằng nhau.</li>" +
          "<li>Nếu một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó vuông góc với đường thẳng còn lại ($a \\parallel b$, $c \\perp a \\Rightarrow c \\perp b$).</li>" +
          "<li>Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì song song với nhau ($a \\parallel c$, $b \\parallel c \\Rightarrow a \\parallel b$).</li></ul>"
      },
      {
        heading: "5. Định lí và chứng minh định lí (Bài 11)",
        html: "<ul>" +
          "<li><b>Định lí</b> là một khẳng định được suy ra từ những khẳng định đúng đã biết. Định lí thường phát biểu dạng \"<b>Nếu</b> ... <b>thì</b> ...\": phần giữa \"Nếu\" và \"thì\" là <b>giả thiết</b> (GT), phần sau \"thì\" là <b>kết luận</b> (KL).</li>" +
          "<li>Ví dụ: \"Nếu hai góc đối đỉnh thì hai góc đó bằng nhau\": GT là hai góc đối đỉnh; KL là hai góc đó bằng nhau.</li>" +
          "<li><b>Chứng minh định lí</b>: dùng lập luận (dựa vào định nghĩa, tính chất, định lí đã biết) để từ giả thiết suy ra kết luận. Khi chứng minh thường vẽ hình, ghi GT – KL rồi lập luận từng bước có căn cứ.</li></ul>"
      }
    ],

    skills: [
      "<b>Tính góc khi hai đường thẳng cắt nhau</b>: biết một góc thì góc đối đỉnh với nó bằng nó, còn góc kề bù với nó bằng $180^\\circ$ trừ đi nó.",
      "<b>Nhận dạng cặp góc</b>: tìm đường thẳng cắt (cát tuyến) trước; góc <b>so le trong</b> nằm giữa hai đường thẳng và ở hai phía cát tuyến (hình chữ Z); góc <b>đồng vị</b> nằm cùng vị trí ở hai giao điểm (hình chữ F).",
      "<b>Chứng minh hai đường thẳng song song</b>: chỉ ra một cặp góc so le trong (hoặc đồng vị) bằng nhau; hoặc chỉ ra chúng cùng vuông góc (cùng song song) với một đường thẳng thứ ba. Thường phải tính góc kề bù, góc đối đỉnh trước.",
      "<b>Tính góc khi biết hai đường thẳng song song</b>: dùng góc so le trong bằng nhau, góc đồng vị bằng nhau, kết hợp góc kề bù ($180^\\circ$) và góc đối đỉnh.",
      "<b>Góc có đỉnh nằm giữa hai đường thẳng song song</b> (hình chữ \"&lt;\"): kẻ thêm qua đỉnh đó một đường thẳng song song với hai đường thẳng đã cho, rồi dùng góc so le trong. Kết quả hay dùng: $\\widehat{ACB} = \\widehat{xAC} + \\widehat{yBC}$.",
      "<b>Ba tia chung gốc chia mặt phẳng</b> (như các góc $xOy$, $yOz$, $zOx$ không có điểm trong chung): kẻ thêm tia đối của một tia rồi dùng góc kề bù; tổng ba góc bằng $360^\\circ$.",
      "<b>Lỗi hay gặp</b>: cho rằng \"hai góc bằng nhau thì đối đỉnh\"; dùng tính chất góc so le trong bằng nhau khi <b>chưa biết</b> hai đường thẳng song song; nhầm góc so le trong với góc đồng vị; quên điều kiện tia phân giác phải nằm giữa hai cạnh của góc."
    ],

    examples: [
      {
        q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$, biết $\\widehat{xOy} = 3 \\cdot \\widehat{x'Oy}$. Tính số đo bốn góc tạo thành.",
        solution: "$\\widehat{xOy}$ và $\\widehat{x'Oy}$ kề bù nên $\\widehat{xOy} + \\widehat{x'Oy} = 180^\\circ$, tức $3 \\cdot \\widehat{x'Oy} + \\widehat{x'Oy} = 180^\\circ$, suy ra $\\widehat{x'Oy} = 45^\\circ$ và $\\widehat{xOy} = 135^\\circ$.<br>" +
          "Các góc đối đỉnh bằng nhau: $\\widehat{x'Oy'} = \\widehat{xOy} = 135^\\circ$; $\\ \\widehat{xOy'} = \\widehat{x'Oy} = 45^\\circ$."
      },
      {
        q: "Cho hình vẽ, biết $a \\parallel b$ và $\\widehat{A_1} = 60^\\circ$. Tính $\\widehat{B_1}$, $\\widehat{B_2}$, $\\widehat{B_3}$." + tfig({ ang: 60, labels: { A1: "60°", B1: "1", B2: "2", B3: "3", B4: "4" } }),
        solution: "Vì $a \\parallel b$ nên hai góc đồng vị bằng nhau: $\\widehat{B_1} = \\widehat{A_1} = 60^\\circ$.<br>" +
          "$\\widehat{B_2}$ kề bù với $\\widehat{B_1}$: $\\widehat{B_2} = 180^\\circ - 60^\\circ = 120^\\circ$.<br>" +
          "$\\widehat{B_3}$ đối đỉnh với $\\widehat{B_1}$: $\\widehat{B_3} = 60^\\circ$."
      },
      {
        q: "Cho hình vẽ, hai tia $Ax$, $By$ nằm trên hai đường thẳng song song, $\\widehat{xAC} = 45^\\circ$, $\\widehat{yBC} = 35^\\circ$. Tính $\\widehat{ACB}$." + zfig({ a: 45, b: 35, la: "45°", lb: "35°", lc: "?" }),
        solution: "Qua $C$ kẻ tia $Ct$ song song với $Ax$ (cùng hướng với $Ax$). Vì $Ax \\parallel By$ nên $Ct \\parallel By$ (hai đường thẳng cùng song song với đường thẳng thứ ba).<br>" +
          "$\\widehat{ACt} = \\widehat{xAC} = 45^\\circ$ (so le trong); $\\ \\widehat{BCt} = \\widehat{yBC} = 35^\\circ$ (so le trong).<br>" +
          "Tia $Ct$ nằm giữa hai tia $CA$, $CB$ nên $\\widehat{ACB} = 45^\\circ + 35^\\circ = 80^\\circ$."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK Bài 8 – Hai góc kề bù",
            q: "Tổng số đo của hai góc kề bù bằng",
            options: ["$90^\\circ$", "$180^\\circ$", "$360^\\circ$", "$120^\\circ$"],
            answer: 1,
            explain: "Hai góc kề bù có hai cạnh còn lại là hai tia đối nhau, tạo thành góc bẹt, nên tổng số đo bằng $180^\\circ$."
          },
          {
            id: "d1q2", level: "de", source: "SBT Ôn tập chương III – câu 3",
            q: "Hai đường thẳng cắt nhau tạo thành bốn góc, trong đó có một góc bằng $65^\\circ$. Góc đối đỉnh với góc đó có số đo là",
            options: ["$115^\\circ$", "$25^\\circ$", "$65^\\circ$", "$130^\\circ$"],
            answer: 2,
            explain: "Hai góc đối đỉnh thì bằng nhau nên góc đối đỉnh với góc $65^\\circ$ cũng bằng $65^\\circ$. ($115^\\circ$ là số đo góc kề bù với nó.)"
          },
          {
            id: "d1q3", level: "de", source: "SGK Bài 10 – Tiên đề Euclid",
            q: "Qua một điểm $M$ nằm ngoài đường thẳng $a$, có bao nhiêu đường thẳng song song với $a$?",
            options: ["Vô số đường thẳng", "Hai đường thẳng", "Không có đường thẳng nào", "Chỉ có một đường thẳng"],
            answer: 3,
            explain: "Theo tiên đề Euclid: qua một điểm nằm ngoài một đường thẳng chỉ có một đường thẳng song song với đường thẳng đó."
          },
          {
            id: "d1q4", level: "de", source: "SBT Ôn tập chương III – câu 6",
            q: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ như hình. Cặp góc nào sau đây là cặp góc so le trong?" + tfig({ ang: 60 }),
            options: ["$\\widehat{A_1}$ và $\\widehat{B_1}$", "$\\widehat{A_3}$ và $\\widehat{B_1}$", "$\\widehat{A_1}$ và $\\widehat{A_3}$", "$\\widehat{A_2}$ và $\\widehat{B_1}$"],
            answer: 1,
            explain: "$\\widehat{A_3}$ và $\\widehat{B_1}$ cùng nằm giữa hai đường thẳng $a$, $b$ và ở hai phía của $c$ nên là cặp góc so le trong. $\\widehat{A_1}$ và $\\widehat{B_1}$ là cặp góc đồng vị; $\\widehat{A_1}$ và $\\widehat{A_3}$ là hai góc đối đỉnh."
          },
          {
            id: "d1q5", level: "vua", source: "SGK Bài 8 – Tia phân giác",
            q: "Tia $Ot$ là tia phân giác của góc $xOy$, biết $\\widehat{xOy} = 130^\\circ$. Số đo góc $xOt$ là",
            options: ["$130^\\circ$", "$50^\\circ$", "$260^\\circ$", "$65^\\circ$"],
            answer: 3,
            explain: "Tia phân giác chia góc thành hai góc bằng nhau: $\\widehat{xOt} = \\frac{1}{2}\\widehat{xOy} = \\frac{130^\\circ}{2} = 65^\\circ$."
          },
          {
            id: "d1q6", level: "vua", source: "SGK Bài 10 – Tính chất hai đường thẳng song song",
            q: "Cho hình vẽ, biết $a \\parallel b$ và $\\widehat{A_1} = 70^\\circ$. Số đo góc $B_2$ là" + tfig({ ang: 70, labels: { A1: "70°", B1: "1", B2: "2", B3: "3", B4: "4" } }),
            options: ["$70^\\circ$", "$110^\\circ$", "$20^\\circ$", "$140^\\circ$"],
            answer: 1,
            explain: "Vì $a \\parallel b$ nên $\\widehat{B_1} = \\widehat{A_1} = 70^\\circ$ (đồng vị). $\\widehat{B_2}$ kề bù với $\\widehat{B_1}$ nên $\\widehat{B_2} = 180^\\circ - 70^\\circ = 110^\\circ$."
          },
          {
            id: "d1q7", level: "vua", source: "mới",
            q: "Hai góc kề bù, trong đó góc này gấp đôi góc kia. Số đo của góc lớn hơn là",
            options: ["$90^\\circ$", "$60^\\circ$", "$135^\\circ$", "$120^\\circ$"],
            answer: 3,
            explain: "Gọi góc nhỏ là $\\alpha$, góc lớn là $2\\alpha$. Ta có $\\alpha + 2\\alpha = 180^\\circ$ nên $\\alpha = 60^\\circ$, góc lớn bằng $120^\\circ$."
          },
          {
            id: "d1q8", level: "vua", source: "SGK Bài 9 – Dấu hiệu nhận biết",
            q: "Cho ba đường thẳng phân biệt $a$, $b$, $c$ với $a \\perp c$ và $b \\perp c$. Khẳng định nào đúng?",
            options: ["$a \\parallel b$", "$a \\perp b$", "$a$ và $b$ cắt nhau tại một điểm", "$a$ và $b$ trùng nhau"],
            answer: 0,
            explain: "Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì song song với nhau (các góc đồng vị đều bằng $90^\\circ$). Vậy $a \\parallel b$."
          },
          {
            id: "d1q9", level: "vua", source: "SGK Bài 11 – Giả thiết, kết luận",
            q: "Cho định lí: \"Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau\". Giả thiết của định lí là",
            options: ["Hai góc so le trong bằng nhau", "Hai góc đồng vị bằng nhau", "Một đường thẳng cắt hai đường thẳng song song", "Hai đường thẳng cắt nhau"],
            answer: 2,
            explain: "Giả thiết là phần nằm giữa \"Nếu\" và \"thì\": một đường thẳng cắt hai đường thẳng song song. Phần sau \"thì\" (hai góc so le trong bằng nhau) là kết luận."
          },
          {
            id: "d1q10", level: "kho", source: "SGK Bài tập cuối chương III – BT 3.34",
            q: "Cho hình vẽ, hai tia $Ax$, $By$ nằm trên hai đường thẳng song song, $\\widehat{xAC} = 40^\\circ$, $\\widehat{yBC} = 30^\\circ$. Số đo góc $ACB$ là" + zfig({ a: 40, b: 30, la: "40°", lb: "30°", lc: "?" }),
            options: ["$70^\\circ$", "$110^\\circ$", "$10^\\circ$", "$140^\\circ$"],
            answer: 0,
            explain: "Qua $C$ kẻ tia $Ct$ song song và cùng hướng với $Ax$, khi đó $Ct \\parallel By$. Ta có $\\widehat{ACt} = \\widehat{xAC} = 40^\\circ$ và $\\widehat{BCt} = \\widehat{yBC} = 30^\\circ$ (so le trong). Vậy $\\widehat{ACB} = 40^\\circ + 30^\\circ = 70^\\circ$."
          },
          {
            id: "d1q11", level: "kho", source: "SGK Bài tập cuối chương III – BT 3.36",
            q: "Cho ba tia $Ox$, $Oy$, $Oz$ như hình, biết $\\widehat{xOy} = 130^\\circ$, $\\widehat{yOz} = 120^\\circ$. Số đo góc $zOx$ là" +
              rfig({ rays: [[0, "x"], [130, "y"], [250, "z"]], arcs: [[0, 130, "130°", 20], [130, 250, "120°", 26]], oDx: 8 }),
            options: ["$100^\\circ$", "$120^\\circ$", "$110^\\circ$", "$70^\\circ$"],
            answer: 2,
            explain: "Kẻ tia $Oy'$ là tia đối của tia $Oy$. Khi đó $\\widehat{xOy'} = 180^\\circ - 130^\\circ = 50^\\circ$ và $\\widehat{zOy'} = 180^\\circ - 120^\\circ = 60^\\circ$ (các góc kề bù). Tia $Oy'$ nằm giữa $Ox$ và $Oz$ nên $\\widehat{zOx} = 50^\\circ + 60^\\circ = 110^\\circ$. (Cách khác: $360^\\circ - 130^\\circ - 120^\\circ = 110^\\circ$.)"
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SBT Ôn tập chương III – BT 3.33", maxPoints: 1.5,
            q: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ lần lượt tại $A$, $B$ như hình, biết $\\widehat{A_1} = 55^\\circ$ và $\\widehat{B_2} = 125^\\circ$." +
              tfig({ ang: 55, labels: { A1: "55°", B2: "125°" } }) +
              "a) Chứng minh $a \\parallel b$.<br>b) Đường thẳng $d$ vuông góc với $a$. Chứng minh $d \\perp b$.",
            modelAnswer: "a) $\\widehat{B_1}$ và $\\widehat{B_2}$ kề bù nên $\\widehat{B_1} = 180^\\circ - \\widehat{B_2} = 180^\\circ - 125^\\circ = 55^\\circ$.<br>" +
              "Do đó $\\widehat{A_1} = \\widehat{B_1} = 55^\\circ$. Hai góc này ở vị trí đồng vị, nên theo dấu hiệu nhận biết, $a \\parallel b$.<br>" +
              "b) Vì $a \\parallel b$ và $d \\perp a$ nên $d \\perp b$ (một đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường thẳng còn lại).",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{B_1} = 55^\\circ$ (dùng góc kề bù)." },
              { pts: 0.5, text: "Chỉ ra cặp góc đồng vị bằng nhau và kết luận $a \\parallel b$." },
              { pts: 0.5, text: "Câu b: lập luận đúng tính chất và kết luận $d \\perp b$." }
            ]
          },
          {
            id: "d1e2", level: "kho", source: "SGK Bài tập cuối chương III – BT 3.35", maxPoints: 1.5,
            q: "Cho hình vẽ, trong đó $Ox$ và $Ox'$ là hai tia đối nhau; $\\widehat{O_1} = \\widehat{x'Oz}$, $\\widehat{O_2} = \\widehat{zOy}$, $\\widehat{O_3} = \\widehat{yOx}$." +
              rfig({ rays: [[0, "x"], [180, "x'"], [130, "z"], [75, "y"]], arcs: [[130, 180, "1"], [75, 130, "2"], [0, 75, "3"]] }) +
              "a) Tính tổng $\\widehat{O_1} + \\widehat{O_2} + \\widehat{O_3}$.<br>b) Cho $\\widehat{O_1} = 50^\\circ$, $\\widehat{O_3} = 75^\\circ$. Tính $\\widehat{O_2}$.",
            modelAnswer: "a) Tia $Oz$ nằm giữa hai tia $Ox'$ và $Oy$ nên $\\widehat{O_1} + \\widehat{O_2} = \\widehat{x'Oy}$.<br>" +
              "Hai góc $x'Oy$ và $yOx$ kề bù (vì $Ox$, $Ox'$ là hai tia đối nhau) nên $\\widehat{x'Oy} + \\widehat{yOx} = 180^\\circ$.<br>" +
              "Do đó $\\widehat{O_1} + \\widehat{O_2} + \\widehat{O_3} = \\widehat{x'Oy} + \\widehat{O_3} = 180^\\circ$.<br>" +
              "b) $\\widehat{O_2} = 180^\\circ - \\widehat{O_1} - \\widehat{O_3} = 180^\\circ - 50^\\circ - 75^\\circ = 55^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Viết được $\\widehat{O_1} + \\widehat{O_2} = \\widehat{x'Oy}$ và $\\widehat{x'Oy}$, $\\widehat{yOx}$ kề bù." },
              { pts: 0.5, text: "Kết luận tổng ba góc bằng $180^\\circ$." },
              { pts: 0.5, text: "Câu b: tính đúng $\\widehat{O_2} = 55^\\circ$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SBT Ôn tập chương III – câu 2",
            q: "Hai góc đối đỉnh thì luôn",
            options: ["bằng nhau", "bù nhau", "kề nhau", "phụ nhau"],
            answer: 0,
            explain: "Tính chất: hai góc đối đỉnh thì bằng nhau. Chúng không có cạnh chung nên không kề nhau; chỉ bù nhau (hay phụ nhau) trong trường hợp đặc biệt."
          },
          {
            id: "d2q2", level: "de", source: "SGK Bài 8 – Tia phân giác",
            q: "Tia $Oz$ là tia phân giác của góc $xOy$ khi",
            options: ["$Oz$ nằm giữa hai tia $Ox$, $Oy$", "$\\widehat{xOz} + \\widehat{zOy} = 180^\\circ$", "$Oz$ nằm giữa hai tia $Ox$, $Oy$ và $\\widehat{xOz} = \\widehat{zOy}$", "$Oz \\perp Ox$"],
            answer: 2,
            explain: "Định nghĩa: tia phân giác của góc $xOy$ là tia nằm giữa hai cạnh $Ox$, $Oy$ và tạo với hai cạnh ấy hai góc bằng nhau. Chỉ \"nằm giữa\" thôi là chưa đủ."
          },
          {
            id: "d2q3", level: "de", source: "SBT Ôn tập chương III – câu 6",
            q: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ như hình. Cặp góc nào sau đây là cặp góc đồng vị?" + tfig({ ang: 60 }),
            options: ["$\\widehat{A_3}$ và $\\widehat{B_1}$", "$\\widehat{A_2}$ và $\\widehat{A_4}$", "$\\widehat{A_4}$ và $\\widehat{B_1}$", "$\\widehat{A_2}$ và $\\widehat{B_2}$"],
            answer: 3,
            explain: "$\\widehat{A_2}$ và $\\widehat{B_2}$ ở cùng vị trí (phía trên – bên trái) tại hai giao điểm nên là cặp góc đồng vị. $\\widehat{A_3}$, $\\widehat{B_1}$ là cặp góc so le trong; $\\widehat{A_2}$, $\\widehat{A_4}$ đối đỉnh."
          },
          {
            id: "d2q4", level: "de", source: "SGK Bài 10 – Tính chất",
            q: "Cho ba đường thẳng phân biệt $a$, $b$, $c$ với $a \\parallel b$ và $c \\parallel b$. Khẳng định nào đúng?",
            options: ["$a \\perp c$", "$a \\parallel c$", "$a$ cắt $c$", "$a$ trùng $b$"],
            answer: 1,
            explain: "Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì song song với nhau, nên $a \\parallel c$."
          },
          {
            id: "d2q5", level: "vua", source: "mới",
            q: "Cho $\\widehat{xOy} = 50^\\circ$. Vẽ góc $yOx'$ kề bù với góc $xOy$ và tia $Ot$ là tia phân giác của góc $yOx'$. Số đo góc $tOx'$ là",
            options: ["$65^\\circ$", "$25^\\circ$", "$130^\\circ$", "$50^\\circ$"],
            answer: 0,
            explain: "$\\widehat{yOx'} = 180^\\circ - 50^\\circ = 130^\\circ$ (kề bù). $Ot$ là tia phân giác nên $\\widehat{tOx'} = \\frac{130^\\circ}{2} = 65^\\circ$."
          },
          {
            id: "d2q6", level: "vua", source: "SBT Ôn tập chương III – câu 4",
            q: "Hai đường thẳng cắt nhau tạo thành bốn góc (khác góc bẹt). Số đo bốn góc đó có thể là",
            options: ["$70^\\circ, 70^\\circ, 70^\\circ, 110^\\circ$", "$60^\\circ, 120^\\circ, 120^\\circ, 120^\\circ$", "$90^\\circ, 90^\\circ, 90^\\circ, 90^\\circ$", "$80^\\circ, 50^\\circ, 130^\\circ, 100^\\circ$"],
            answer: 2,
            explain: "Bốn góc gồm hai cặp đối đỉnh (bằng nhau) và hai góc kề nhau thì bù nhau, nên phải có dạng $\\alpha, \\alpha, 180^\\circ - \\alpha, 180^\\circ - \\alpha$. Chỉ bộ $90^\\circ, 90^\\circ, 90^\\circ, 90^\\circ$ thỏa mãn (với $\\alpha = 90^\\circ$)."
          },
          {
            id: "d2q7", level: "vua", source: "SGK Bài 10 – Tính chất hai đường thẳng song song",
            q: "Cho hình vẽ, biết $a \\parallel b$ và $\\widehat{A_4} = 115^\\circ$. Số đo góc $B_1$ là" + tfig({ ang: 65, labels: { A4: "115°", B1: "1", B2: "2", B3: "3", B4: "4" } }),
            options: ["$115^\\circ$", "$65^\\circ$", "$25^\\circ$", "$75^\\circ$"],
            answer: 1,
            explain: "$\\widehat{A_1}$ kề bù với $\\widehat{A_4}$ nên $\\widehat{A_1} = 180^\\circ - 115^\\circ = 65^\\circ$. Vì $a \\parallel b$ nên $\\widehat{B_1} = \\widehat{A_1} = 65^\\circ$ (đồng vị)."
          },
          {
            id: "d2q8", level: "vua", source: "SGK Bài 10 – Tính chất",
            q: "Cho $a \\parallel b$ và đường thẳng $c \\perp a$. Khẳng định nào đúng?",
            options: ["$b \\parallel c$", "$b$ trùng $c$", "$b$ và $c$ không có điểm chung", "$b \\perp c$"],
            answer: 3,
            explain: "Một đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường thẳng còn lại, nên $c \\perp b$."
          },
          {
            id: "d2q9", level: "vua", source: "SGK Bài 11 – Giả thiết, kết luận",
            q: "Kết luận của định lí \"Nếu hai góc đối đỉnh thì hai góc đó bằng nhau\" là",
            options: ["Hai góc đó bằng nhau", "Hai góc đó đối đỉnh", "Hai góc đó kề bù", "Hai đường thẳng cắt nhau"],
            answer: 0,
            explain: "Kết luận là phần đứng sau chữ \"thì\": hai góc đó bằng nhau. \"Hai góc đối đỉnh\" là giả thiết."
          },
          {
            id: "d2q10", level: "kho", source: "SGK Bài tập cuối chương III – BT 3.33",
            q: "Vẽ ba đường thẳng phân biệt $a$, $b$, $c$ sao cho $a \\parallel b$, $b \\parallel c$ và hai đường thẳng phân biệt $m$, $n$ cùng vuông góc với $a$. Trên hình có bao nhiêu cặp đường thẳng vuông góc?",
            options: ["$3$", "$5$", "$6$", "$9$"],
            answer: 2,
            explain: "Ta có $a \\parallel b \\parallel c$. Vì $m \\perp a$ nên $m$ vuông góc với cả $a$, $b$, $c$; tương tự với $n$. Các cặp vuông góc: $(m, a), (m, b), (m, c), (n, a), (n, b), (n, c)$, tổng cộng 6 cặp. ($m \\parallel n$ nên $m$, $n$ không vuông góc.)"
          },
          {
            id: "d2q11", level: "kho", source: "SGK Bài tập cuối chương III – BT 3.34",
            q: "Cho hình vẽ, hai tia $Ax$, $By$ nằm trên hai đường thẳng song song, $\\widehat{xAC} = 50^\\circ$, $\\widehat{ACB} = 85^\\circ$. Số đo góc $yBC$ là" + zfig({ a: 50, b: 35, la: "50°", lb: "?", lc: "85°" }),
            options: ["$45^\\circ$", "$50^\\circ$", "$130^\\circ$", "$35^\\circ$"],
            answer: 3,
            explain: "Qua $C$ kẻ tia $Ct$ song song, cùng hướng với $Ax$ (khi đó $Ct \\parallel By$). Ta có $\\widehat{ACt} = \\widehat{xAC} = 50^\\circ$ (so le trong), nên $\\widehat{BCt} = 85^\\circ - 50^\\circ = 35^\\circ$. Mà $\\widehat{yBC} = \\widehat{BCt}$ (so le trong) nên $\\widehat{yBC} = 35^\\circ$."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SBT Ôn tập chương III – BT 3.34", maxPoints: 1.5,
            q: "Cho hình vẽ, ba điểm $B$, $C$, $D$ thẳng hàng, $AB \\parallel Cx$, $\\widehat{BAC} = 70^\\circ$, $\\widehat{ABC} = 60^\\circ$. Tính số đo các góc $C_1$, $C_2$, $C_3$." + figC(),
            modelAnswer: "• Với cát tuyến $AC$ cắt hai đường thẳng song song $AB$ và $Cx$: $\\widehat{C_2}$ và $\\widehat{BAC}$ là cặp góc so le trong nên $\\widehat{C_2} = 70^\\circ$.<br>" +
              "• Với cát tuyến $BD$: $\\widehat{C_3}$ và $\\widehat{ABC}$ là cặp góc đồng vị nên $\\widehat{C_3} = 60^\\circ$.<br>" +
              "• $\\widehat{C_1}$ kề bù với góc $ACD$ (mà $\\widehat{ACD} = \\widehat{C_2} + \\widehat{C_3}$) nên $\\widehat{C_1} = 180^\\circ - (70^\\circ + 60^\\circ) = 50^\\circ$.<br>" +
              "Vậy $\\widehat{C_1} = 50^\\circ$, $\\widehat{C_2} = 70^\\circ$, $\\widehat{C_3} = 60^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{C_2} = 70^\\circ$ (so le trong)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{C_3} = 60^\\circ$ (đồng vị)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{C_1} = 50^\\circ$ (kề bù)." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SGK Bài tập cuối chương III – BT 3.32", maxPoints: 1.5,
            q: "Chứng minh rằng: cho điểm $A$ và đường thẳng $d$ thì có duy nhất một đường thẳng đi qua $A$ và vuông góc với $d$ (tức là nếu có hai đường thẳng đi qua $A$ cùng vuông góc với $d$ thì chúng phải trùng nhau).",
            modelAnswer: "Giả sử có hai đường thẳng $a$ và $a'$ cùng đi qua $A$ và cùng vuông góc với $d$.<br>" +
              "Nếu $a$ và $a'$ phân biệt thì, vì chúng cùng vuông góc với đường thẳng thứ ba là $d$, ta có $a \\parallel a'$.<br>" +
              "Nhưng $a$ và $a'$ có điểm chung $A$, mà hai đường thẳng song song thì không có điểm chung — vô lí.<br>" +
              "Vậy $a$ và $a'$ phải trùng nhau, tức là chỉ có duy nhất một đường thẳng qua $A$ vuông góc với $d$.",
            rubric: [
              { pts: 0.5, text: "Giả sử có hai đường thẳng (phân biệt) qua $A$ cùng vuông góc với $d$." },
              { pts: 0.5, text: "Suy ra hai đường thẳng đó song song với nhau (cùng vuông góc với $d$)." },
              { pts: 0.5, text: "Chỉ ra mâu thuẫn (có điểm chung $A$) và kết luận chúng trùng nhau." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SBT Ôn tập chương III – câu 1",
            q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$. Góc đối đỉnh với góc $xOy$ là",
            options: ["$\\widehat{xOy'}$", "$\\widehat{x'Oy}$", "$\\widehat{yOy'}$", "$\\widehat{x'Oy'}$"],
            answer: 3,
            explain: "Cạnh $Ox'$ là tia đối của $Ox$, cạnh $Oy'$ là tia đối của $Oy$ nên $\\widehat{x'Oy'}$ đối đỉnh với $\\widehat{xOy}$. Các góc $xOy'$, $x'Oy$ kề bù với $xOy$; $yOy'$ là góc bẹt."
          },
          {
            id: "d3q2", level: "de", source: "SGK Bài 8 – Hai góc kề bù",
            q: "Hai góc kề bù, trong đó một góc bằng $72^\\circ$. Số đo góc còn lại là",
            options: ["$18^\\circ$", "$108^\\circ$", "$72^\\circ$", "$118^\\circ$"],
            answer: 1,
            explain: "Tổng hai góc kề bù là $180^\\circ$, nên góc còn lại bằng $180^\\circ - 72^\\circ = 108^\\circ$. ($18^\\circ$ là số đo góc phụ với $72^\\circ$.)"
          },
          {
            id: "d3q3", level: "de", source: "SGK Bài 9 – Dấu hiệu nhận biết",
            q: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ và trong các góc tạo thành có một cặp góc so le trong bằng nhau. Khi đó",
            options: ["$a \\parallel b$", "$a \\perp b$", "$c \\perp a$", "$a$ và $b$ cắt nhau"],
            answer: 0,
            explain: "Đây là dấu hiệu nhận biết hai đường thẳng song song: có một cặp góc so le trong bằng nhau thì $a \\parallel b$."
          },
          {
            id: "d3q4", level: "de", source: "SBT Ôn tập chương III – câu 6",
            q: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ như hình. Góc nào sau đây so le trong với góc $A_4$?" + tfig({ ang: 60 }),
            options: ["$\\widehat{B_4}$", "$\\widehat{B_1}$", "$\\widehat{B_2}$", "$\\widehat{A_2}$"],
            answer: 2,
            explain: "$\\widehat{A_4}$ nằm giữa $a$, $b$, bên phải $c$; góc so le trong với nó nằm giữa $a$, $b$, bên trái $c$ tại $B$: đó là $\\widehat{B_2}$. ($\\widehat{B_4}$ đồng vị với $\\widehat{A_4}$; $\\widehat{A_2}$ đối đỉnh với $\\widehat{A_4}$.)"
          },
          {
            id: "d3q5", level: "vua", source: "SGK Bài 8 – Tia phân giác",
            q: "Tia $Ot$ là tia phân giác của góc $xOy$ và $\\widehat{xOt} = 35^\\circ$. Số đo góc $xOy$ là",
            options: ["$17{,}5^\\circ$", "$35^\\circ$", "$145^\\circ$", "$70^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xOt} = \\widehat{tOy} = 35^\\circ$ và $Ot$ nằm giữa $Ox$, $Oy$ nên $\\widehat{xOy} = 2 \\cdot 35^\\circ = 70^\\circ$."
          },
          {
            id: "d3q6", level: "vua", source: "SBT Ôn tập chương III – câu 5",
            q: "Hai đường thẳng $AB$ và $CD$ cắt nhau tại $O$. Tia $OM$ là tia phân giác của góc $BOD$ và $\\widehat{BOM} = 30^\\circ$. Số đo góc $AOC$ là",
            options: ["$30^\\circ$", "$60^\\circ$", "$120^\\circ$", "$150^\\circ$"],
            answer: 1,
            explain: "$\\widehat{BOD} = 2 \\cdot \\widehat{BOM} = 60^\\circ$. Góc $AOC$ đối đỉnh với góc $BOD$ (vì $OA$, $OB$ đối nhau; $OC$, $OD$ đối nhau) nên $\\widehat{AOC} = 60^\\circ$."
          },
          {
            id: "d3q7", level: "vua", source: "mới",
            q: "Cho hình vẽ, biết $a \\parallel b$ và $\\widehat{A_2} = 3 \\cdot \\widehat{A_1}$. Số đo góc $B_3$ là" + tfig({ ang: 45 }),
            options: ["$45^\\circ$", "$135^\\circ$", "$60^\\circ$", "$90^\\circ$"],
            answer: 0,
            explain: "$\\widehat{A_1}$ và $\\widehat{A_2}$ kề bù nên $\\widehat{A_1} + 3\\widehat{A_1} = 180^\\circ$, suy ra $\\widehat{A_1} = 45^\\circ$. Vì $a \\parallel b$: $\\widehat{B_1} = \\widehat{A_1} = 45^\\circ$ (đồng vị), và $\\widehat{B_3} = \\widehat{B_1} = 45^\\circ$ (đối đỉnh)."
          },
          {
            id: "d3q8", level: "vua", source: "SGK Bài 10 – Tiên đề Euclid",
            q: "Cho điểm $M$ nằm ngoài đường thẳng $a$. Đường thẳng $b$ đi qua $M$ và song song với $a$; đường thẳng $c$ cũng đi qua $M$ và song song với $a$. Khi đó",
            options: ["$b \\perp c$", "$b \\parallel c$", "$b$ và $c$ trùng nhau", "$b$ và $c$ cắt nhau tại một điểm khác $M$"],
            answer: 2,
            explain: "Theo tiên đề Euclid, qua $M$ chỉ có một đường thẳng song song với $a$, nên $b$ và $c$ trùng nhau."
          },
          {
            id: "d3q9", level: "kho", source: "SGK Bài tập cuối chương III – BT 3.33",
            q: "Vẽ ba đường thẳng phân biệt $a$, $b$, $c$ sao cho $a \\parallel b$, $b \\parallel c$ và hai đường thẳng phân biệt $m$, $n$ cùng vuông góc với $a$. Trên hình có bao nhiêu cặp đường thẳng song song?",
            options: ["$2$", "$3$", "$6$", "$4$"],
            answer: 3,
            explain: "Từ $a \\parallel b$, $b \\parallel c$ suy ra $a \\parallel c$: có 3 cặp $(a, b), (b, c), (a, c)$. Hai đường thẳng $m$, $n$ cùng vuông góc với $a$ nên $m \\parallel n$: thêm 1 cặp. Tổng cộng 4 cặp."
          },
          {
            id: "d3q10", level: "kho", source: "SGK Bài tập cuối chương III – BT 3.36",
            q: "Cho ba tia $Ox$, $Oy$, $Oz$ như hình, biết $\\widehat{xOy} = 125^\\circ$, $\\widehat{yOz} = 105^\\circ$. Số đo góc $zOx$ là" +
              rfig({ rays: [[0, "x"], [125, "y"], [230, "z"]], arcs: [[0, 125, "125°", 20], [125, 230, "105°", 26]], oDx: 8 }),
            options: ["$130^\\circ$", "$110^\\circ$", "$120^\\circ$", "$50^\\circ$"],
            answer: 0,
            explain: "Kẻ tia $Oy'$ đối với tia $Oy$. Khi đó $\\widehat{xOy'} = 180^\\circ - 125^\\circ = 55^\\circ$ và $\\widehat{zOy'} = 180^\\circ - 105^\\circ = 75^\\circ$. Vậy $\\widehat{zOx} = 55^\\circ + 75^\\circ = 130^\\circ$ (cũng bằng $360^\\circ - 125^\\circ - 105^\\circ$)."
          },
          {
            id: "d3q11", level: "kho", source: "mới",
            q: "Cho hình vẽ, biết $a \\parallel b$ và $\\widehat{A_2} - \\widehat{B_1} = 40^\\circ$. Số đo góc $B_1$ là" + tfig({ ang: 70 }),
            options: ["$110^\\circ$", "$40^\\circ$", "$70^\\circ$", "$55^\\circ$"],
            answer: 2,
            explain: "Vì $a \\parallel b$ nên $\\widehat{B_1} = \\widehat{A_1}$ (đồng vị). Do đó $\\widehat{A_2} - \\widehat{A_1} = 40^\\circ$, mà $\\widehat{A_2} + \\widehat{A_1} = 180^\\circ$ (kề bù). Suy ra $\\widehat{A_1} = (180^\\circ - 40^\\circ) : 2 = 70^\\circ$, nên $\\widehat{B_1} = 70^\\circ$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SBT Ôn tập chương III – BT 3.36", maxPoints: 1.5,
            q: "Cho hình vẽ, biết $AB \\parallel CD$, $\\widehat{ABO} = 40^\\circ$, $\\widehat{CDO} = 70^\\circ$. Tính số đo góc $BOD$.<br><i>Gợi ý: qua $O$ kẻ tia $Ox$ song song với $AB$ (tia $Ox$ nằm trong góc $BOD$).</i>" + figO(),
            modelAnswer: "Qua $O$ kẻ tia $Ox \\parallel AB$ (tia $Ox$ hướng sang phải, nằm trong góc $BOD$).<br>" +
              "• Với cát tuyến $BO$: $\\widehat{BOx} = \\widehat{ABO} = 40^\\circ$ (so le trong).<br>" +
              "• Vì $Ox \\parallel AB$ và $AB \\parallel CD$ nên $Ox \\parallel CD$. Với cát tuyến $OD$: $\\widehat{xOD} = \\widehat{CDO} = 70^\\circ$ (so le trong).<br>" +
              "• Tia $Ox$ nằm giữa hai tia $OB$, $OD$ nên $\\widehat{BOD} = \\widehat{BOx} + \\widehat{xOD} = 40^\\circ + 70^\\circ = 110^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Kẻ $Ox \\parallel AB$ và tính đúng $\\widehat{BOx} = 40^\\circ$." },
              { pts: 0.5, text: "Lập luận $Ox \\parallel CD$ và tính đúng $\\widehat{xOD} = 70^\\circ$." },
              { pts: 0.5, text: "Kết luận $\\widehat{BOD} = 110^\\circ$." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SGK Bài tập cuối chương III – BT 3.34", maxPoints: 1.5,
            q: "Cho hình vẽ, hai tia $Ax$, $By$ nằm trên hai đường thẳng song song (cùng hướng sang phải), điểm $C$ nằm giữa hai đường thẳng đó. Chứng minh rằng $\\widehat{ACB} = \\widehat{xAC} + \\widehat{yBC}$." +
              zfig({ a: 40, b: 35, la: "", lb: "", lc: "" }),
            modelAnswer: "Qua $C$ kẻ tia $Ct$ song song với $Ax$ và cùng hướng với $Ax$ (tia $Ct$ nằm giữa $CA$ và $CB$).<br>" +
              "Vì $Ax \\parallel By$ và $Ct \\parallel Ax$ nên $Ct \\parallel By$ (hai đường thẳng cùng song song với đường thẳng thứ ba).<br>" +
              "Với cát tuyến $AC$: $\\widehat{ACt} = \\widehat{xAC}$ (so le trong). Với cát tuyến $BC$: $\\widehat{BCt} = \\widehat{yBC}$ (so le trong).<br>" +
              "Do $Ct$ nằm giữa $CA$ và $CB$: $\\widehat{ACB} = \\widehat{ACt} + \\widehat{BCt} = \\widehat{xAC} + \\widehat{yBC}$.",
            rubric: [
              { pts: 0.5, text: "Kẻ được đường phụ $Ct \\parallel Ax$ qua $C$ và suy ra $Ct \\parallel By$." },
              { pts: 0.5, text: "Chỉ ra hai cặp góc so le trong bằng nhau: $\\widehat{ACt} = \\widehat{xAC}$, $\\widehat{BCt} = \\widehat{yBC}$." },
              { pts: 0.5, text: "Cộng góc và kết luận đúng." }
            ]
          }
        ]
      }
    ]
  });
})();
