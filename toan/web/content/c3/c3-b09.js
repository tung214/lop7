(function () {
  // ---------- Hình vẽ SVG (currentColor để hợp chế độ sáng/tối) ----------
  var BLUE = "#2f81f7", RED = "#e5484d";
  function rad(d) { return d * Math.PI / 180; }
  function dir(t) { return [Math.cos(rad(t)), -Math.sin(rad(t))]; }          // t: độ, chiều toán học (y hướng lên)
  function at(P, t, d) { var u = dir(t); return [P[0] + u[0] * d, P[1] + u[1] * d]; }
  function lerp(P, Q, k) { return [P[0] + (Q[0] - P[0]) * k, P[1] + (Q[1] - P[1]) * k]; }
  function heading(P, Q) { return Math.atan2(-(Q[1] - P[1]), Q[0] - P[0]) * 180 / Math.PI; }
  function f(n) { return (+n).toFixed(1); }
  function pt(P) { return f(P[0]) + ',' + f(P[1]); }
  function seg(P, Q) {
    return '<line x1="' + f(P[0]) + '" y1="' + f(P[1]) + '" x2="' + f(Q[0]) + '" y2="' + f(Q[1]) + '" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
  }
  function txt(P, s, o) {
    o = o || {};
    return '<text x="' + f(P[0]) + '" y="' + f(P[1]) + '" font-size="' + (o.size || 14) + '" text-anchor="middle" dominant-baseline="middle" fill="' + (o.c || 'currentColor') + '"' +
      (o.it === false ? '' : ' font-style="italic"') + '>' + s + '</text>';
  }
  function lab(P, s, dx, dy) { return txt([P[0] + dx, P[1] + dy], s); }
  function arcd(V, r, t1, d) {
    return '<path d="M' + pt(at(V, t1, r)) + ' A' + r + ' ' + r + ' 0 ' + (d > 180 ? 1 : 0) + ' 0 ' + pt(at(V, t1 + d, r)) + '" fill="none" stroke="' + RED + '" stroke-width="1.3"/>';
  }
  // Đánh dấu góc nhỏ hơn 180° tạo bởi hai tia V→P và V→Q
  function ang(V, P, Q, label, o) {
    o = o || {};
    var t1 = heading(V, P), t2 = heading(V, Q), d = ((t2 - t1) % 360 + 360) % 360;
    if (d > 180) { t1 = t2; d = 360 - d; }
    var r = o.r || 15, s = arcd(V, r, t1, d);
    if (o.dbl) s += arcd(V, r + 4, t1, d);
    if (label) s += txt(at(V, t1 + d / 2, o.lr || r + 15), label, { c: RED, size: 12, it: false });
    return s;
  }
  function right(V, P, Q) {
    var k = 9, u = dir(heading(V, P)), w = dir(heading(V, Q));
    var A = [V[0] + u[0] * k, V[1] + u[1] * k], B = [A[0] + w[0] * k, A[1] + w[1] * k], C = [V[0] + w[0] * k, V[1] + w[1] * k];
    return '<path d="M' + pt(A) + ' L' + pt(B) + ' L' + pt(C) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
  }
  function svg(W, H, body) {
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:320px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">' + body + '</svg>';
  }

  // Đường thẳng c cắt hai đường thẳng a, b tại A, B.
  // tc: góc của hướng "lên" của c (độ); q1 = dưới–trái, q2 = trên–trái, q3 = trên–phải, q4 = dưới–phải (tại mỗi đỉnh).
  function cut(o) {
    var A = o.A || [150, 62], tc = o.tc || 112, d = o.d || 92, B = at(A, tc + 180, d);
    var ta = o.ta || 0, tb = o.tb == null ? ta : o.tb, L = o.L || 130, e = o.e || 38, W = o.W || 320;
    // độ dài mỗi nửa đường thẳng, cắt bớt để nhãn không tràn ra ngoài khung
    function len(P, t, side) { var c = Math.abs(Math.cos(rad(t))) || 1; return Math.min(L, (side < 0 ? P[0] - 16 : W - 16 - P[0]) / c); }
    var a1 = at(A, ta + 180, len(A, ta, -1)), a2 = at(A, ta, len(A, ta, 1)), b1 = at(B, tb + 180, len(B, tb, -1)), b2 = at(B, tb, len(B, tb, 1));
    var c1 = at(A, tc, e), c2 = at(B, tc + 180, e);
    var s = seg(a1, a2) + seg(b1, b2) + seg(c1, c2), n = o.names || {};
    if (n.aL) s += txt(at(at(a1, ta, 6), ta + 90, 11), n.aL);
    if (n.aR) s += txt(at(at(a2, ta, -6), ta + 90, 11), n.aR);
    if (n.bL) s += txt(at(at(b1, tb, 6), tb + 90, 11), n.bL);
    if (n.bR) s += txt(at(at(b2, tb, -6), tb + 90, 11), n.bR);
    if (n.cT) s += txt(at(c1, tc - 90, 11), n.cT);
    if (n.cB) s += txt(at(c2, tc - 90, 11), n.cB);
    function quad(t, k) {
      var r = { 3: [t, tc], 2: [tc, t + 180], 1: [t + 180, tc + 180], 4: [tc + 180, t + 360] }[k];
      var dd = ((r[1] - r[0]) % 360 + 360) % 360;
      return [r[0], dd];
    }
    var V = { A: [A, ta], B: [B, tb] };
    if (o.nums) ['A', 'B'].forEach(function (v) {
      for (var k = 1; k <= 4; k++) { var q = quad(V[v][1], k); s += txt(at(V[v][0], q[0] + q[1] / 2, 15), k, { c: BLUE, size: 12, it: false }); }
    });
    (o.marks || []).forEach(function (m) {
      var q = quad(V[m.v][1], m.q);
      s += arcd(V[m.v][0], 14, q[0], q[1]) + txt(at(V[m.v][0], q[0] + q[1] / 2, 30), m.t, { c: RED, size: 12, it: false });
    });
    var pd = o.nums ? 30 : 15;
    if (o.pA) s += txt(at(A, o.pA[1] != null ? o.pA[1] : quad(ta, 3)[0] + quad(ta, 3)[1] / 2, pd), o.pA[0]);
    if (o.pB) s += txt(at(B, o.pB[1] != null ? o.pB[1] : quad(tb, 1)[0] + quad(tb, 1)[1] / 2, pd), o.pB[0]);
    return svg(o.W || 320, o.H || 215, s);
  }

  // Hình chung: c cắt a, b tại A, B, các góc đánh số 1–4
  var NUM = cut({ nums: true, names: { aL: "a", bL: "b", cT: "c" }, pA: ["A"], pB: ["B"] });
  // Hình xy, x'y' bị cắt bởi mn tại M, N
  var XY = cut({ tc: 104, tb: -7, names: { aL: "x", aR: "y", bL: "x'", bR: "y'", cT: "m", cB: "n" }, pA: ["M", 40], pB: ["N", 220] });
  // Hình kiểu "Ví dụ" SGK: hai góc so le trong bằng nhau
  function zz(t, val) {
    return cut({ tc: t, names: { aL: "x", aR: "y", bL: "x'", bR: "y'", cT: "z", cB: "z'" }, pA: ["A", t / 2], pB: ["B", 180 + t / 2],
      marks: val ? [{ v: "A", q: 1, t: val }, { v: "B", q: 3, t: val }] : [] });
  }
  // Hình H, K: tia Kz là tia đối của tia KH; Hx, Ky cùng hướng
  function hk(t, aH, aK) {
    var H = [45, 182], K = at(H, t, 120), Z = at(K, t, 42), X = [292, 182], Y = [292, K[1]];
    return svg(320, 200, seg(H, Z) + seg(H, X) + seg(K, Y) +
      ang(H, X, K, aH) + ang(K, H, Y, aK) +
      lab(H, "H", -9, 8) + lab(K, "K", -13, -2) + lab(Z, "z", 9, 0) + lab(X, "x", 10, 0) + lab(Y, "y", 10, 0));
  }
  // Tam giác ABC, M ∈ AB, N ∈ AC, nối MN và BN (kiểu Hình 3.24)
  var TRI = (function () {
    var A = [150, 22], B = [55, 172], C = [275, 172], M = lerp(A, B, 0.45), N = lerp(A, C, 0.45);
    return svg(320, 192, seg(A, B) + seg(A, C) + seg(B, C) + seg(M, N) + seg(B, N) +
      lab(A, "A", 0, -11) + lab(B, "B", -10, 9) + lab(C, "C", 10, 9) + lab(M, "M", -13, -2) + lab(N, "N", 13, -2));
  })();
  // Tứ giác EFMN với đường chéo EM (kiểu Hình 3.25)
  var EFMN = (function () {
    var N = [30, 170], M = [290, 170], E = [110, 40], F = [200, 40];
    return svg(320, 190, seg(E, F) + seg(F, M) + seg(M, N) + seg(N, E) + seg(E, M) +
      ang(E, F, M, "35°", { r: 16 }) + ang(M, E, N, "35°", { r: 16 }) +
      lab(E, "E", -6, -12) + lab(F, "F", 6, -12) + lab(N, "N", -6, 12) + lab(M, "M", 6, 12));
  })();
  // Tam giác có E ∈ AB, F ∈ AC, góc AEF = góc ABC = 62°
  var AEF = (function () {
    var B = [50, 170], A = at(B, 62, 170), C = [290, 170], E = lerp(A, B, 0.45), F = lerp(A, C, 0.45);
    return svg(320, 190, seg(A, B) + seg(A, C) + seg(B, C) + seg(E, F) +
      ang(E, F, A, "62°") + ang(B, C, A, "62°") +
      lab(A, "A", 0, -11) + lab(B, "B", -10, 9) + lab(C, "C", 10, 9) + lab(E, "E", -12, 0) + lab(F, "F", 12, 0));
  })();
  // Tứ giác ABCD có góc A, D vuông (kiểu Hình 3.26)
  var RECT = (function () {
    var A = [60, 40], B = [180, 40], C = [290, 170], D = [60, 170];
    return svg(320, 190, seg(A, B) + seg(B, C) + seg(C, D) + seg(D, A) + right(A, B, D) + right(D, A, C) +
      lab(A, "A", -10, -8) + lab(B, "B", 8, -10) + lab(C, "C", 10, 10) + lab(D, "D", -10, 10));
  })();
  // Tứ giác ABCD, góc DAB = 115°, góc ADC = 65°
  var ABCD2 = (function () {
    var D = [40, 172], C = [290, 172], A = at(D, 65, 140), B = [230, A[1]];
    return svg(320, 192, seg(A, B) + seg(B, C) + seg(C, D) + seg(D, A) + ang(A, D, B, "115°") + ang(D, C, A, "65°") +
      lab(A, "A", -8, -11) + lab(B, "B", 8, -11) + lab(C, "C", 10, 10) + lab(D, "D", -10, 10));
  })();
  // Tam giác MNP, MH ⊥ NP, EF ⊥ MH (kiểu SBT Hình 3.14)
  var MNP = (function () {
    var M = [160, 22], N = [40, 172], P = [280, 172], H = [160, 172], E = lerp(M, N, 0.55), F = lerp(M, P, 0.55), I = [160, E[1]];
    return svg(320, 194, seg(M, N) + seg(M, P) + seg(N, P) + seg(M, H) + seg(E, F) + right(H, M, P) + right(I, M, F) +
      lab(M, "M", 0, -11) + lab(N, "N", -10, 9) + lab(P, "P", 10, 9) + lab(H, "H", 0, 13) + lab(E, "E", -12, 0) + lab(F, "F", 12, 0));
  })();
  // Hai đường thẳng xy, x'y' cùng vuông góc với zz' (kiểu Hình 3.23)
  var PERP = (function () {
    var H = [150, 65], K = [150, 145];
    return svg(320, 205, seg([150, 15], [150, 195]) + seg([30, 65], [290, 65]) + seg([30, 145], [290, 145]) +
      right(H, [150, 195], [290, 65]) + right(K, [150, 195], [290, 145]) +
      lab([30, 65], "x", 0, -11) + lab([290, 65], "y", 0, -11) + lab([30, 145], "x'", 0, -11) + lab([290, 145], "y'", 0, -11) +
      lab([150, 15], "z", 10, 0) + lab([150, 195], "z'", 12, 0) + lab(H, "H", -11, -10) + lab(K, "K", -11, -10));
  })();
  // Tứ giác ABCD, tia Ax là tia đối của tia AD, góc xAB = góc ADC = 70°
  var ABCD3 = (function () {
    var D = [40, 175], C = [270, 175], A = at(D, 70, 130), X = at(A, 70, 42), B = [225, A[1]];
    return svg(320, 195, seg(D, X) + seg(A, B) + seg(B, C) + seg(C, D) + ang(A, X, B, "70°") + ang(D, C, A, "70°") +
      lab(A, "A", -12, 2) + lab(B, "B", 8, -11) + lab(C, "C", 10, 10) + lab(D, "D", -10, 10) + lab(X, "x", 9, 0));
  })();
  // xOy = 80°, Oz phân giác, At (góc xAt = 40°)
  var OZ = (function () {
    var O = [28, 172], X = [298, 172], Y = at(O, 80, 150), Z = at(O, 40, 150), A = [175, 172], T = at(A, 40, 135);
    return svg(320, 190, seg(O, X) + seg(O, Y) + seg(O, Z) + seg(A, T) +
      ang(O, X, Z, "", { r: 22 }) + ang(O, Z, Y, "", { r: 22 }) + ang(A, X, T, "40°") +
      lab(O, "O", -6, 12) + lab(X, "x", 10, 0) + lab(Y, "y", -9, 0) + lab(Z, "z", 8, -6) + lab(A, "A", 0, 13) + lab(T, "t", 8, -6));
  })();
  // Tam giác ABC, góc B = 50°, M ∈ AB, tia Mx cắt AC tại N, góc AMx = 50°
  var AMN = (function () {
    var B = [45, 172], A = at(B, 50, 170), C = [290, 172], M = lerp(A, B, 0.45), N = lerp(A, C, 0.45), X = [N[0] + 34, N[1]];
    return svg(320, 192, seg(A, B) + seg(A, C) + seg(B, C) + seg(M, X) + ang(M, A, N, "50°") + ang(B, C, A, "50°") +
      lab(A, "A", 0, -11) + lab(B, "B", -10, 9) + lab(C, "C", 10, 9) + lab(M, "M", -13, 0) + lab(N, "N", -2, -12) + lab(X, "x", 9, 0));
  })();
  // xOy = 50°, A ∈ Ox, góc OAt = 130°
  var OA = (function () {
    var O = [30, 172], X = [298, 172], Y = at(O, 50, 160), A = [185, 172], T = at(A, 50, 130);
    return svg(320, 190, seg(O, X) + seg(O, Y) + seg(A, T) + ang(O, X, Y, "50°") + ang(A, O, T, "130°") +
      lab(O, "O", -6, 12) + lab(X, "x", 10, 0) + lab(Y, "y", 8, -6) + lab(A, "A", 0, 13) + lab(T, "t", 8, -6));
  })();
  // xOy = 120°, Ot phân giác, A ∈ Ox, góc OAz = 120°
  var OT = (function () {
    var O = [110, 172], X = [300, 172], Y = at(O, 120, 125), T = at(O, 60, 140), A = [215, 172], Z = at(A, 60, 125);
    return svg(320, 190, seg([20, 172], X) + seg(O, Y) + seg(O, T) + seg(A, Z) +
      ang(O, X, T, "", { r: 18 }) + ang(O, T, Y, "", { r: 18 }) + ang(A, O, Z, "120°") +
      lab(O, "O", 0, 13) + lab(X, "x", 10, 0) + lab(Y, "y", -9, -2) + lab(T, "t", 8, -6) + lab(A, "A", 0, 13) + lab(Z, "z", 8, -6));
  })();

  registerLesson({
    id: "c3-b09",
    chapter: 3,
    kind: "lesson",
    title: "Bài 9. Hai đường thẳng song song và dấu hiệu nhận biết",
    sgkPages: [46, 49],
    sbtPages: [38, 40],
    objectives: [
      "Nhận biết các cặp góc so le trong, đồng vị, trong cùng phía tạo bởi một đường thẳng cắt hai đường thẳng",
      "Biết quan hệ giữa các cặp góc khi có một cặp góc so le trong bằng nhau",
      "Dùng dấu hiệu (so le trong, đồng vị bằng nhau; cùng vuông góc với đường thẳng thứ ba) để nhận biết hai đường thẳng song song",
      "Vẽ đường thẳng đi qua một điểm và song song với một đường thẳng cho trước"
    ],

    theory: [
      {
        heading: "1. Các góc tạo bởi một đường thẳng cắt hai đường thẳng",
        html: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ lần lượt tại $A$ và $B$. Tại mỗi đỉnh có 4 góc, đánh số như hình:" + NUM +
          "<ul><li>Hai góc nằm <b>trong</b> dải giữa $a$ và $b$, ở <b>hai phía</b> của $c$: cặp <b>góc so le trong</b>. Có 2 cặp: $\\widehat{A_1}$ và $\\widehat{B_3}$; $\\widehat{A_4}$ và $\\widehat{B_2}$.</li>" +
          "<li>Hai góc có <b>vị trí giống nhau</b> ở hai đỉnh: cặp <b>góc đồng vị</b>. Có 4 cặp: $\\widehat{A_1}$ và $\\widehat{B_1}$; $\\widehat{A_2}$ và $\\widehat{B_2}$; $\\widehat{A_3}$ và $\\widehat{B_3}$; $\\widehat{A_4}$ và $\\widehat{B_4}$.</li>" +
          "<li>Hai góc nằm trong dải giữa $a$, $b$ và <b>cùng phía</b> đối với $c$: cặp <b>góc trong cùng phía</b>: $\\widehat{A_1}$ và $\\widehat{B_2}$; $\\widehat{A_4}$ và $\\widehat{B_3}$.</li>" +
          "<li>Gọi tên góc bằng ba chữ cái (như $\\widehat{xAB}$) thì chữ ở giữa là đỉnh. Cách đánh số 1, 2, 3, 4 mỗi sách/hình có thể khác nhau: hãy nhận biết theo <b>vị trí</b>, không theo con số.</li></ul>"
      },
      {
        heading: "2. Quan hệ giữa các cặp góc",
        html: "Nếu đường thẳng $c$ cắt hai đường thẳng phân biệt $a$, $b$ và trong các góc tạo thành có <b>một cặp góc so le trong bằng nhau</b> thì:" +
          "<ul><li>cặp góc so le trong còn lại cũng bằng nhau;</li><li>mỗi cặp góc đồng vị bằng nhau;</li>" +
          "<li>(suy ra từ góc kề bù) mỗi cặp góc trong cùng phía có tổng bằng $180^\\circ$.</li></ul>" +
          "Ví dụ: $\\widehat{A_1} = \\widehat{B_3} = 60^\\circ$ thì $\\widehat{A_4} = \\widehat{B_2} = 180^\\circ - 60^\\circ = 120^\\circ$; $\\widehat{B_1} = \\widehat{A_1} = 60^\\circ$; $\\widehat{A_1} + \\widehat{B_2} = 180^\\circ$."
      },
      {
        heading: "3. Dấu hiệu nhận biết hai đường thẳng song song",
        html: "Hai đường thẳng <b>song song</b> là hai đường thẳng không có điểm chung, kí hiệu $a \\parallel b$." +
          "<br><b>Dấu hiệu:</b> Nếu đường thẳng $c$ cắt hai đường thẳng phân biệt $a$, $b$ và trong các góc tạo thành có <b>một cặp góc so le trong bằng nhau</b> hoặc <b>một cặp góc đồng vị bằng nhau</b> thì $a \\parallel b$." +
          zz(70, "70°") +
          "Ví dụ: trên hình, $\\widehat{xAB} = \\widehat{ABy'} = 70^\\circ$; đây là cặp góc so le trong bằng nhau nên $xy \\parallel x'y'$." +
          "<br><b>Nhận xét:</b> Hai đường thẳng phân biệt <b>cùng vuông góc</b> với một đường thẳng thứ ba thì song song với nhau (hai góc đồng vị cùng bằng $90^\\circ$)."
      },
      {
        heading: "4. Vẽ đường thẳng song song với một đường thẳng cho trước",
        html: "Vẽ đường thẳng $b$ đi qua điểm $A$ (nằm ngoài đường thẳng $a$) và song song với $a$:" +
          "<ul><li><b>Dùng góc $60^\\circ$ (hoặc $30^\\circ$) của êke:</b> vẽ đường thẳng qua $A$ cắt $a$ tại $B$, tạo với $a$ góc $60^\\circ$; rồi vẽ qua $A$ đường thẳng $b$ tạo với $AB$ góc $60^\\circ$ ở vị trí <b>đồng vị</b> (hoặc so le trong). Cặp góc đồng vị bằng nhau nên $b \\parallel a$.</li>" +
          "<li><b>Dùng góc vuông của êke:</b> vẽ đường thẳng $c$ qua $A$ vuông góc với $a$, rồi vẽ $b$ qua $A$ vuông góc với $c$. Vì $a$, $b$ cùng vuông góc với $c$ nên $b \\parallel a$.</li></ul>"
      }
    ],

    skills: [
      "<b>Nhận biết cặp góc:</b> trước hết xác định <b>hai đường thẳng</b> đang xét và <b>đường thẳng cắt</b> chúng. Góc nằm giữa hai đường thẳng là góc \"trong\". So le trong = trong + khác phía; đồng vị = cùng vị trí; trong cùng phía = trong + cùng phía.",
      "<b>Trong tam giác, tứ giác:</b> chỉ nhìn hai cạnh cần xét song song và cạnh cắt chúng, bỏ qua các đoạn khác. Ví dụ xét $MN$, $BC$ bị cắt bởi $AB$ thì $\\widehat{AMN}$ và $\\widehat{ABC}$ là cặp đồng vị.",
      "<b>Chứng minh hai đường thẳng song song:</b> tìm một cặp góc so le trong hoặc đồng vị bằng nhau. Nếu chưa có sẵn, dùng <b>góc kề bù</b> (tổng $180^\\circ$) hoặc <b>góc đối đỉnh</b> (bằng nhau) để tính ra góc cần thiết.",
      "<b>Cặp góc trong cùng phía có tổng $180^\\circ$</b> cũng cho hai đường thẳng song song: lấy góc kề bù của một góc để được cặp đồng vị bằng nhau.",
      "<b>Cùng vuông góc với đường thẳng thứ ba</b> thì song song: hay gặp ở hình chữ nhật, hình thang vuông, đường cao trong tam giác.",
      "<b>Lỗi hay gặp:</b> ghép hai góc cùng một đỉnh thành \"so le trong\"; nhầm vị trí khi hình đánh số khác; dùng \"vì $a \\parallel b$ nên các góc bằng nhau\" khi đề bài yêu cầu <b>chứng minh</b> $a \\parallel b$; cho rằng hai góc trong cùng phía <b>bằng nhau</b> thì hai đường thẳng song song (phải là <b>bù nhau</b>)."
    ],

    examples: [
      {
        q: "Đường thẳng $mn$ cắt $xy$ tại $M$ và cắt $x'y'$ tại $N$ (hình vẽ)." + XY + "a) Gọi tên góc so le trong với $\\widehat{yMN}$.<br>b) Gọi tên góc đồng vị với $\\widehat{yMm}$.",
        solution: "a) $\\widehat{yMN}$ nằm giữa hai đường thẳng $xy$, $x'y'$ và về phía $y$ đối với $mn$. Góc so le trong với nó ở đỉnh $N$, nằm giữa hai đường thẳng và về phía $x'$: $\\widehat{MNx'}$.<br>" +
          "b) $\\widehat{yMm}$ tạo bởi tia $My$ và tia hướng lên $Mm$. Góc đồng vị với nó ở đỉnh $N$ tạo bởi tia $Ny'$ và tia hướng lên $NM$: $\\widehat{y'NM}$."
      },
      {
        q: "Đường thẳng $c$ cắt $a$, $b$ tại $A$, $B$, các góc đánh số như hình ở mục 1. Biết $\\widehat{A_1} = \\widehat{B_3} = 65^\\circ$. Tính các góc còn lại.",
        solution: "Tại $A$: $\\widehat{A_3} = \\widehat{A_1} = 65^\\circ$ (đối đỉnh); $\\widehat{A_2} = 180^\\circ - 65^\\circ = 115^\\circ$ (kề bù với $\\widehat{A_1}$); $\\widehat{A_4} = \\widehat{A_2} = 115^\\circ$ (đối đỉnh).<br>" +
          "Tại $B$: tương tự $\\widehat{B_1} = \\widehat{B_3} = 65^\\circ$; $\\widehat{B_2} = \\widehat{B_4} = 115^\\circ$.<br>" +
          "Nhận xét: các cặp so le trong, các cặp đồng vị đều bằng nhau; mỗi cặp trong cùng phía có tổng $180^\\circ$, ví dụ $\\widehat{A_1} + \\widehat{B_2} = 65^\\circ + 115^\\circ = 180^\\circ$."
      },
      {
        q: "Trên hình, tia $Kz$ là tia đối của tia $KH$; tia $Hx$, $Ky$ nằm cùng phía đối với đường thẳng $HK$; $\\widehat{KHx} = 55^\\circ$, $\\widehat{HKy} = 125^\\circ$. Giải thích vì sao $Hx \\parallel Ky$." + hk(55, "55°", "125°"),
        solution: "$\\widehat{yKz} = 180^\\circ - \\widehat{HKy} = 180^\\circ - 125^\\circ = 55^\\circ$ (hai góc kề bù).<br>" +
          "Hai đường thẳng $Hx$, $Ky$ bị cắt bởi đường thẳng $HK$; $\\widehat{yKz}$ và $\\widehat{KHx}$ là cặp góc đồng vị, cùng bằng $55^\\circ$. Vậy $Hx \\parallel Ky$.<br>" +
          "(Cách nhìn khác: $\\widehat{KHx} + \\widehat{HKy} = 180^\\circ$, cặp góc trong cùng phía bù nhau.)"
      },
      {
        q: "Cho đường thẳng $a$ và điểm $A$ không thuộc $a$. Nêu cách dùng êke vẽ đường thẳng $b$ đi qua $A$ và song song với $a$, và giải thích.",
        solution: "Cách 1 (góc vuông): vẽ đường thẳng $c$ đi qua $A$ và vuông góc với $a$; vẽ đường thẳng $b$ đi qua $A$ và vuông góc với $c$. Vì $a$, $b$ phân biệt và cùng vuông góc với $c$ nên $b \\parallel a$.<br>" +
          "Cách 2 (góc $60^\\circ$): vẽ đường thẳng qua $A$ cắt $a$ tại $B$ tạo góc $60^\\circ$; vẽ qua $A$ đường thẳng $b$ tạo với $AB$ góc $60^\\circ$ ở vị trí đồng vị. Có một cặp góc đồng vị bằng nhau nên $b \\parallel a$."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.46 – Hình 3.16",
            q: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ lần lượt tại $A$ và $B$, các góc được đánh số như hình. Cặp góc nào là cặp góc <b>so le trong</b>?" + NUM,
            options: ["$\\widehat{A_1}$ và $\\widehat{B_3}$", "$\\widehat{A_1}$ và $\\widehat{B_1}$", "$\\widehat{A_1}$ và $\\widehat{B_2}$", "$\\widehat{A_2}$ và $\\widehat{A_4}$"],
            answer: 0,
            explain: "$\\widehat{A_1}$ và $\\widehat{B_3}$ cùng nằm trong dải giữa $a$ và $b$, ở hai phía của $c$ nên là cặp so le trong. ($\\widehat{A_1}, \\widehat{B_1}$: đồng vị; $\\widehat{A_1}, \\widehat{B_2}$: trong cùng phía; $\\widehat{A_2}, \\widehat{A_4}$: đối đỉnh.)"
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.46 – Hình 3.16",
            q: "Với hình vẽ dưới đây, cặp góc nào là cặp góc <b>đồng vị</b>?" + NUM,
            options: ["$\\widehat{A_3}$ và $\\widehat{B_1}$", "$\\widehat{A_4}$ và $\\widehat{B_2}$", "$\\widehat{A_3}$ và $\\widehat{B_3}$", "$\\widehat{A_3}$ và $\\widehat{A_1}$"],
            answer: 2,
            explain: "Hai góc đồng vị có vị trí giống nhau ở hai đỉnh: $\\widehat{A_3}$ và $\\widehat{B_3}$ cùng ở phía trên đường thẳng ($a$, $b$) và bên phải $c$. $\\widehat{A_4}, \\widehat{B_2}$ là so le trong; $\\widehat{A_3}, \\widehat{A_1}$ là hai góc đối đỉnh; $\\widehat{A_3}, \\widehat{B_1}$ không thuộc ba loại cặp góc đã học."
          },
          {
            id: "d1q3", level: "de", source: "SGK tr.47",
            q: "Hai đường thẳng phân biệt được gọi là song song với nhau khi chúng",
            options: ["có đúng một điểm chung", "không có điểm chung nào", "cùng đi qua một điểm", "tạo với nhau một góc vuông"],
            answer: 1,
            explain: "Hai đường thẳng song song là hai đường thẳng không có điểm chung. Có đúng một điểm chung là hai đường thẳng cắt nhau (vuông góc là trường hợp đặc biệt của cắt nhau)."
          },
          {
            id: "d1q4", level: "de", source: "SGK tr.47 – Dấu hiệu nhận biết",
            q: "Đường thẳng $c$ cắt hai đường thẳng phân biệt $a$, $b$. Điều kiện nào sau đây đủ để khẳng định $a \\parallel b$?",
            options: ["Có một cặp góc đối đỉnh bằng nhau", "Có một cặp góc kề bù", "Có một cặp góc trong cùng phía bằng nhau", "Có một cặp góc so le trong bằng nhau"],
            answer: 3,
            explain: "Dấu hiệu nhận biết: có một cặp góc so le trong (hoặc đồng vị) bằng nhau thì $a \\parallel b$. Hai góc đối đỉnh luôn bằng nhau, góc kề bù luôn có nên không cho biết gì. Hai góc trong cùng phía bằng nhau chỉ cho $a \\parallel b$ khi cùng bằng $90^\\circ$."
          },
          {
            id: "d1q5", level: "vua", source: "SGK tr.47 – HĐ1, HĐ2",
            q: "Trên hình, biết $\\widehat{A_1} = \\widehat{B_3} = 70^\\circ$. Số đo $\\widehat{B_4}$ là" + NUM,
            options: ["$70^\\circ$", "$110^\\circ$", "$90^\\circ$", "$20^\\circ$"],
            answer: 1,
            explain: "$\\widehat{B_3}$ và $\\widehat{B_4}$ là hai góc kề bù nên $\\widehat{B_4} = 180^\\circ - 70^\\circ = 110^\\circ$. (Cũng có thể: $\\widehat{A_4} = 180^\\circ - 70^\\circ = 110^\\circ$ và cặp đồng vị $\\widehat{B_4} = \\widehat{A_4}$.)"
          },
          {
            id: "d1q6", level: "vua", source: "SGK tr.48 – Ví dụ",
            q: "Quan sát hình, biết $\\widehat{xAB} = \\widehat{ABy'} = 75^\\circ$. Vì sao $xy \\parallel x'y'$?" + zz(75, "75°"),
            options: [
              "Vì $\\widehat{xAB}$ và $\\widehat{ABy'}$ là cặp góc so le trong bằng nhau",
              "Vì $\\widehat{xAB}$ và $\\widehat{ABy'}$ là cặp góc đồng vị bằng nhau",
              "Vì $\\widehat{xAB}$ và $\\widehat{ABy'}$ là hai góc đối đỉnh",
              "Vì $\\widehat{xAB} + \\widehat{ABy'} = 150^\\circ$"
            ],
            answer: 0,
            explain: "$\\widehat{xAB}$ và $\\widehat{ABy'}$ đều nằm giữa hai đường thẳng $xy$, $x'y'$ và ở hai phía của đường thẳng $AB$: đó là cặp góc so le trong. Chúng bằng nhau nên $xy \\parallel x'y'$."
          },
          {
            id: "d1q7", level: "vua", source: "SGK tr.48 – Nhận xét",
            q: "Cho ba đường thẳng phân biệt $a$, $b$, $c$ với $a \\perp c$ và $b \\perp c$. Khi đó",
            options: ["$a \\perp b$", "$a$ cắt $b$ tại một điểm thuộc $c$", "$a \\parallel b$", "$a$ trùng với $b$"],
            answer: 2,
            explain: "Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì song song với nhau (tại hai giao điểm có cặp góc đồng vị cùng bằng $90^\\circ$)."
          },
          {
            id: "d1q8", level: "vua", source: "SGK Bài 9 – BT 3.6a",
            q: "Trên hình, $M$ thuộc cạnh $AB$, $N$ thuộc cạnh $AC$. Góc ở vị trí <b>so le trong</b> với $\\widehat{MNB}$ là" + TRI,
            options: ["$\\widehat{MBN}$", "$\\widehat{BNC}$", "$\\widehat{ACB}$", "$\\widehat{NBC}$"],
            answer: 3,
            explain: "Xét hai đường thẳng $MN$, $BC$ bị cắt bởi $BN$. $\\widehat{MNB}$ nằm giữa $MN$ và $BC$, về phía điểm $M$ đối với $BN$. Góc so le trong với nó ở đỉnh $B$, nằm giữa $MN$, $BC$ và về phía điểm $C$: $\\widehat{NBC}$. ($\\widehat{MBN}$ và $\\widehat{MNB}$ là cặp trong cùng phía.)"
          },
          {
            id: "d1q9", level: "kho", source: "SBT Bài 9 – BT 3.17",
            q: "Trên hình, biết $\\widehat{A_2} = 125^\\circ$ và $\\widehat{B_1} = 55^\\circ$. Khẳng định nào đúng?" + NUM,
            options: [
              "$a$ không song song với $b$",
              "$a \\parallel b$ vì $\\widehat{A_2} = \\widehat{B_2} = 125^\\circ$ (cặp góc đồng vị)",
              "$a \\parallel b$ vì $\\widehat{A_2}$ và $\\widehat{B_1}$ là hai góc kề bù",
              "Chưa đủ dữ kiện để kết luận"
            ],
            answer: 1,
            explain: "$\\widehat{B_1}$ và $\\widehat{B_2}$ kề bù nên $\\widehat{B_2} = 180^\\circ - 55^\\circ = 125^\\circ = \\widehat{A_2}$. Hai góc này đồng vị và bằng nhau nên $a \\parallel b$. ($\\widehat{A_2}$, $\\widehat{B_1}$ ở hai đỉnh khác nhau nên không phải hai góc kề bù.)"
          },
          {
            id: "d1q10", level: "kho", source: "SGK Bài 9 – BT 3.7",
            q: "Quan sát hình, biết $\\widehat{MEF} = \\widehat{EMN} = 35^\\circ$. Khẳng định nào đúng?" + EFMN,
            options: ["$EF \\parallel NM$", "$EN \\parallel FM$", "$EM \\perp NM$", "$EF \\perp EM$"],
            answer: 0,
            explain: "Hai đường thẳng $EF$ và $NM$ bị cắt bởi $EM$; $\\widehat{MEF}$ và $\\widehat{EMN}$ là cặp góc so le trong và cùng bằng $35^\\circ$ nên $EF \\parallel NM$."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SBT Bài 9 – BT 3.17", maxPoints: 3,
            q: "Trên hình, tia $Kz$ là tia đối của tia $KH$; hai tia $Hx$, $Ky$ nằm cùng phía đối với đường thẳng $HK$. Biết $\\widehat{KHx} = 65^\\circ$, $\\widehat{HKy} = 115^\\circ$." + hk(65, "65°", "115°") +
              "a) Tính $\\widehat{yKz}$.<br>b) Giải thích tại sao $Hx \\parallel Ky$.",
            modelAnswer: "a) Tia $Kz$ là tia đối của tia $KH$ nên $\\widehat{HKy}$ và $\\widehat{yKz}$ là hai góc kề bù:<br>$\\widehat{yKz} = 180^\\circ - \\widehat{HKy} = 180^\\circ - 115^\\circ = 65^\\circ$.<br>" +
              "b) Hai đường thẳng $Hx$ và $Ky$ bị cắt bởi đường thẳng $HK$. Hai góc $\\widehat{yKz}$ và $\\widehat{KHx}$ ở vị trí đồng vị và $\\widehat{yKz} = \\widehat{KHx} = 65^\\circ$.<br>" +
              "Vậy $Hx \\parallel Ky$ (dấu hiệu nhận biết hai đường thẳng song song).",
            rubric: [
              { pts: 1, text: "Nêu $\\widehat{HKy}$, $\\widehat{yKz}$ kề bù và tính đúng $\\widehat{yKz} = 65^\\circ$." },
              { pts: 1, text: "Chỉ ra $\\widehat{yKz}$ và $\\widehat{KHx}$ là cặp góc đồng vị bằng nhau (hoặc lập luận đúng bằng cặp góc trong cùng phía bù nhau)." },
              { pts: 1, text: "Kết luận $Hx \\parallel Ky$ theo dấu hiệu nhận biết." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SBT Bài 9 – Ví dụ 1",
            q: "Đường thẳng $mn$ cắt hai đường thẳng $xy$, $x'y'$ lần lượt tại $M$, $N$ (hình vẽ). Góc ở vị trí so le trong với $\\widehat{xMN}$ là" + XY,
            options: ["$\\widehat{MNx'}$", "$\\widehat{MNy'}$", "$\\widehat{x'Nn}$", "$\\widehat{yMN}$"],
            answer: 1,
            explain: "$\\widehat{xMN}$ nằm giữa hai đường thẳng $xy$, $x'y'$ và về phía $x$ đối với $mn$. Góc so le trong với nó ở đỉnh $N$, nằm giữa hai đường thẳng và ở phía bên kia của $mn$: $\\widehat{MNy'}$. ($\\widehat{MNx'}$: trong cùng phía; $\\widehat{x'Nn}$: đồng vị; $\\widehat{yMN}$: kề bù.)"
          },
          {
            id: "d2q2", level: "de", source: "SBT Bài 9 – BT 3.9",
            q: "Với hình vẽ dưới đây, góc ở vị trí đồng vị với $\\widehat{xMm}$ là" + XY,
            options: ["$\\widehat{MNy'}$", "$\\widehat{x'Nn}$", "$\\widehat{yMN}$", "$\\widehat{x'NM}$"],
            answer: 3,
            explain: "$\\widehat{xMm}$ ở đỉnh $M$, tạo bởi tia $Mx$ và tia hướng lên $Mm$. Góc đồng vị với nó ở đỉnh $N$ có vị trí tương tự: tạo bởi tia $Nx'$ và tia hướng lên $NM$, tức $\\widehat{x'NM}$."
          },
          {
            id: "d2q3", level: "de", source: "SGK tr.48 – Nhận xét",
            q: "Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì",
            options: ["song song với nhau", "vuông góc với nhau", "cắt nhau", "trùng nhau"],
            answer: 0,
            explain: "Theo nhận xét trong SGK: hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì song song với nhau."
          },
          {
            id: "d2q4", level: "de", source: "SGK tr.46",
            q: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại hai điểm phân biệt. Số cặp góc đồng vị được tạo thành là",
            options: ["$1$", "$2$", "$4$", "$8$"],
            answer: 2,
            explain: "Mỗi góc đỉnh $A$ có đúng một góc đỉnh $B$ đồng vị với nó: 4 cặp ($\\widehat{A_1}$ và $\\widehat{B_1}$, $\\widehat{A_2}$ và $\\widehat{B_2}$, $\\widehat{A_3}$ và $\\widehat{B_3}$, $\\widehat{A_4}$ và $\\widehat{B_4}$). Số cặp so le trong là 2."
          },
          {
            id: "d2q5", level: "vua", source: "SGK tr.47 – HĐ1",
            q: "Trên hình, biết $\\widehat{A_1} = \\widehat{B_3} = 50^\\circ$. Khẳng định nào đúng?" + NUM,
            options: ["$\\widehat{B_2} = 130^\\circ$", "$\\widehat{B_2} = 50^\\circ$", "$\\widehat{B_1} = 130^\\circ$", "$\\widehat{A_4} = 50^\\circ$"],
            answer: 0,
            explain: "$\\widehat{A_4} = 180^\\circ - \\widehat{A_1} = 130^\\circ$ (kề bù). Một cặp so le trong bằng nhau nên cặp còn lại cũng bằng nhau: $\\widehat{B_2} = \\widehat{A_4} = 130^\\circ$. Còn $\\widehat{B_1} = \\widehat{A_1} = 50^\\circ$ (đồng vị)."
          },
          {
            id: "d2q6", level: "vua", source: "SBT Bài 9 – Ví dụ 3",
            q: "Trên hình, $E$ thuộc $AB$, $F$ thuộc $AC$ và $\\widehat{AEF} = \\widehat{ABC} = 62^\\circ$. Ta có $EF \\parallel BC$ vì" + AEF,
            options: [
              "$\\widehat{AEF}$ và $\\widehat{ABC}$ là hai góc so le trong bằng nhau",
              "$\\widehat{AEF}$ và $\\widehat{ABC}$ là hai góc đối đỉnh",
              "$E$ nằm giữa $A$ và $B$",
              "$\\widehat{AEF}$ và $\\widehat{ABC}$ là hai góc đồng vị bằng nhau"
            ],
            answer: 3,
            explain: "Hai đường thẳng $EF$, $BC$ bị cắt bởi $AB$. $\\widehat{AEF}$ (phía trên $EF$) và $\\widehat{ABC}$ (phía trên $BC$) cùng về phía điểm $C$ đối với $AB$: cặp góc đồng vị. Chúng bằng nhau nên $EF \\parallel BC$."
          },
          {
            id: "d2q7", level: "vua", source: "SGK tr.47 – Tính chất",
            q: "Đường thẳng $c$ cắt hai đường thẳng phân biệt $a$, $b$ và trong các góc tạo thành có một cặp góc so le trong bằng nhau. Khẳng định nào sau đây <b>sai</b>?",
            options: ["Cặp góc so le trong còn lại cũng bằng nhau", "Mỗi cặp góc trong cùng phía luôn bằng nhau", "Mỗi cặp góc đồng vị bằng nhau", "$a \\parallel b$"],
            answer: 1,
            explain: "Khi một cặp so le trong bằng nhau thì cặp còn lại bằng nhau, các cặp đồng vị bằng nhau và $a \\parallel b$. Còn mỗi cặp góc trong cùng phía có tổng $180^\\circ$; chúng chỉ bằng nhau khi cùng bằng $90^\\circ$."
          },
          {
            id: "d2q8", level: "vua", source: "SGK Bài 9 – BT 3.8",
            q: "Quan sát hình, tứ giác $ABCD$ có $\\widehat{A} = \\widehat{D} = 90^\\circ$. Vì sao $AB \\parallel DC$?" + RECT,
            options: ["Vì $AB$ và $DC$ cùng vuông góc với $BC$", "Vì $AB = DC$", "Vì $AB$ và $DC$ cùng vuông góc với $AD$", "Vì $AB$ và $DC$ cùng song song với $AD$"],
            answer: 2,
            explain: "$AB \\perp AD$ và $DC \\perp AD$. Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba $AD$ nên $AB \\parallel DC$."
          },
          {
            id: "d2q9", level: "kho", source: "SGK tr.47 – Luyện tập 1b",
            q: "Trên hình, biết $\\widehat{A_1} = 72^\\circ$ và $\\widehat{B_2} = 108^\\circ$. Khi đó hai đường thẳng $a$ và $b$" + NUM,
            options: ["song song với nhau", "vuông góc với nhau", "cắt nhau", "chưa đủ dữ kiện để kết luận"],
            answer: 0,
            explain: "$\\widehat{B_1}$ kề bù với $\\widehat{B_2}$ nên $\\widehat{B_1} = 180^\\circ - 108^\\circ = 72^\\circ = \\widehat{A_1}$. Đây là cặp góc đồng vị bằng nhau nên $a \\parallel b$. Ghi nhớ: cặp góc trong cùng phía bù nhau thì hai đường thẳng song song."
          },
          {
            id: "d2q10", level: "kho", source: "SGK Bài 9 – Luyện tập 2 (biến đổi)",
            q: "Tứ giác $ABCD$ có $\\widehat{DAB} = 115^\\circ$, $\\widehat{ADC} = 65^\\circ$ (hình vẽ). Từ dữ kiện trên, ta suy ra được" + ABCD2,
            options: ["$AD \\parallel BC$", "$AB \\parallel DC$", "$AB \\perp AD$", "Tứ giác không có hai cạnh nào song song"],
            answer: 1,
            explain: "Hai đường thẳng $AB$, $DC$ bị cắt bởi $AD$; $\\widehat{DAB} + \\widehat{ADC} = 115^\\circ + 65^\\circ = 180^\\circ$ (cặp trong cùng phía bù nhau). Cụ thể: gọi $Ax$ là tia đối của tia $AD$ thì $\\widehat{xAB} = 180^\\circ - 115^\\circ = 65^\\circ = \\widehat{ADC}$ (đồng vị) nên $AB \\parallel DC$."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SGK tr.47 – Luyện tập 1a", maxPoints: 1.5,
            q: "Trên hình, biết $\\widehat{A_4} = \\widehat{B_2} = 45^\\circ$. Tính số đo các góc $\\widehat{A_1}$, $\\widehat{A_2}$, $\\widehat{A_3}$, $\\widehat{B_1}$, $\\widehat{B_3}$, $\\widehat{B_4}$." + NUM,
            modelAnswer: "• Tại đỉnh $A$: $\\widehat{A_1} = 180^\\circ - \\widehat{A_4} = 135^\\circ$ (kề bù); $\\widehat{A_2} = \\widehat{A_4} = 45^\\circ$ (đối đỉnh); $\\widehat{A_3} = \\widehat{A_1} = 135^\\circ$ (đối đỉnh).<br>" +
              "• Tại đỉnh $B$: $\\widehat{B_4} = \\widehat{B_2} = 45^\\circ$ (đối đỉnh); $\\widehat{B_1} = 180^\\circ - \\widehat{B_2} = 135^\\circ$ (kề bù); $\\widehat{B_3} = \\widehat{B_1} = 135^\\circ$ (đối đỉnh).",
            rubric: [
              { pts: 0.75, text: "Tính đúng $\\widehat{A_1} = \\widehat{A_3} = 135^\\circ$, $\\widehat{A_2} = 45^\\circ$, có nêu lí do (kề bù, đối đỉnh)." },
              { pts: 0.75, text: "Tính đúng $\\widehat{B_1} = \\widehat{B_3} = 135^\\circ$, $\\widehat{B_4} = 45^\\circ$, có nêu lí do." }
            ]
          },
          {
            id: "d2e2", level: "vua", source: "SBT Bài 9 – BT 3.15", maxPoints: 1.5,
            q: "Cho tam giác $MNP$, điểm $H$ thuộc $NP$ sao cho $MH \\perp NP$. Trên cạnh $MN$ lấy $E$, trên cạnh $MP$ lấy $F$ sao cho $EF \\perp MH$ (hình vẽ). Giải thích tại sao $EF \\parallel NP$." + MNP,
            modelAnswer: "Ta có $EF \\perp MH$ và $NP \\perp MH$ (giả thiết).<br>Hai đường thẳng phân biệt $EF$ và $NP$ cùng vuông góc với đường thẳng $MH$ nên $EF \\parallel NP$.",
            rubric: [
              { pts: 0.5, text: "Nêu được $EF \\perp MH$ và $NP \\perp MH$." },
              { pts: 0.5, text: "Nêu đúng tính chất: hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì song song." },
              { pts: 0.5, text: "Kết luận $EF \\parallel NP$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.47 – Luyện tập 1b",
            q: "Với hình vẽ dưới đây, cặp góc nào là cặp góc <b>trong cùng phía</b>?" + NUM,
            options: ["$\\widehat{A_1}$ và $\\widehat{B_3}$", "$\\widehat{A_1}$ và $\\widehat{B_1}$", "$\\widehat{A_1}$ và $\\widehat{B_2}$", "$\\widehat{A_3}$ và $\\widehat{B_2}$"],
            answer: 2,
            explain: "Hai góc trong cùng phía cùng nằm trong dải giữa $a$, $b$ và cùng phía đối với $c$: $\\widehat{A_1}$ và $\\widehat{B_2}$. ($\\widehat{A_1}, \\widehat{B_3}$: so le trong; $\\widehat{A_1}, \\widehat{B_1}$: đồng vị; $\\widehat{A_3}$ nằm ngoài dải giữa $a$ và $b$.)"
          },
          {
            id: "d3q2", level: "de", source: "SGK Bài 9 – BT 3.6b",
            q: "Trên hình, $M$ thuộc $AB$, $N$ thuộc $AC$. Góc ở vị trí đồng vị với $\\widehat{ACB}$ là" + TRI,
            options: ["$\\widehat{ANM}$", "$\\widehat{MNC}$", "$\\widehat{AMN}$", "$\\widehat{NBC}$"],
            answer: 0,
            explain: "Xét $MN$, $BC$ bị cắt bởi $AC$. $\\widehat{ACB}$ ở đỉnh $C$, phía trên $BC$, về phía điểm $B$ đối với $AC$. Góc đồng vị với nó ở đỉnh $N$, phía trên $MN$, về phía điểm $M$: $\\widehat{ANM}$. ($\\widehat{MNC}$ và $\\widehat{ACB}$ là cặp trong cùng phía; $\\widehat{AMN}$ đồng vị với $\\widehat{ABC}$.)"
          },
          {
            id: "d3q3", level: "de", source: "SGK tr.47 – Dấu hiệu nhận biết",
            q: "Đường thẳng $c$ cắt hai đường thẳng phân biệt $a$, $b$ tại $A$, $B$ (hình vẽ). Nếu $\\widehat{A_2} = \\widehat{B_2}$ thì" + NUM,
            options: ["$a \\perp b$", "$a$ cắt $b$", "$c \\parallel a$", "$a \\parallel b$"],
            answer: 3,
            explain: "$\\widehat{A_2}$ và $\\widehat{B_2}$ là cặp góc đồng vị; chúng bằng nhau nên $a \\parallel b$ (dấu hiệu nhận biết)."
          },
          {
            id: "d3q4", level: "de", source: "SGK tr.46",
            q: "Với hình vẽ dưới đây, góc ở vị trí so le trong với $\\widehat{A_4}$ là" + NUM,
            options: ["$\\widehat{B_4}$", "$\\widehat{B_2}$", "$\\widehat{B_3}$", "$\\widehat{A_2}$"],
            answer: 1,
            explain: "$\\widehat{A_4}$ (dưới $a$, bên phải $c$) và $\\widehat{B_2}$ (trên $b$, bên trái $c$) cùng nằm giữa $a$, $b$ và ở hai phía của $c$: so le trong. ($\\widehat{B_4}$: đồng vị; $\\widehat{B_3}$: trong cùng phía; $\\widehat{A_2}$: đối đỉnh.)"
          },
          {
            id: "d3q5", level: "vua", source: "SGK tr.47 – HĐ2",
            q: "Trên hình, biết $\\widehat{A_2} = \\widehat{B_2} = 110^\\circ$. Số đo $\\widehat{B_3}$ là" + NUM,
            options: ["$70^\\circ$", "$110^\\circ$", "$90^\\circ$", "$180^\\circ$"],
            answer: 0,
            explain: "$\\widehat{B_2}$ và $\\widehat{B_3}$ là hai góc kề bù nên $\\widehat{B_3} = 180^\\circ - 110^\\circ = 70^\\circ$."
          },
          {
            id: "d3q6", level: "vua", source: "SBT Bài 9 – BT 3.12",
            q: "Quan sát hình, biết $\\widehat{mAx'} = \\widehat{ABy'} = 58^\\circ$. Ta có $xx' \\parallel yy'$ vì" +
              cut({ tc: 58, e: 55, names: { aL: "x", aR: "x'", bL: "y", bR: "y'", cT: "m", cB: "n" }, pA: ["A", 135], pB: ["B", 135], marks: [{ v: "A", q: 3, t: "58°" }, { v: "B", q: 3, t: "58°" }] }),
            options: [
              "$\\widehat{mAx'}$ và $\\widehat{ABy'}$ là cặp góc so le trong bằng nhau",
              "$\\widehat{mAx'}$ và $\\widehat{ABy'}$ là cặp góc trong cùng phía",
              "$\\widehat{mAx'}$ và $\\widehat{ABy'}$ là cặp góc đồng vị bằng nhau",
              "$\\widehat{mAx'}$ và $\\widehat{ABy'}$ là hai góc đối đỉnh"
            ],
            answer: 2,
            explain: "$\\widehat{mAx'}$ (tại $A$, phía trên $xx'$, về phía $x'$) và $\\widehat{ABy'}$ (tại $B$, phía trên $yy'$, về phía $y'$) có vị trí giống nhau nên là cặp góc đồng vị; chúng bằng nhau nên $xx' \\parallel yy'$."
          },
          {
            id: "d3q7", level: "vua", source: "SGK tr.48 – Luyện tập 2",
            q: "Trên hình, đường thẳng $zz'$ vuông góc với $xy$ tại $H$ và vuông góc với $x'y'$ tại $K$. Hai đường thẳng nào song song với nhau?" + PERP,
            options: ["$xy$ và $zz'$", "$x'y'$ và $zz'$", "Không có hai đường thẳng nào song song", "$xy$ và $x'y'$"],
            answer: 3,
            explain: "$xy$ và $x'y'$ là hai đường thẳng phân biệt cùng vuông góc với $zz'$ nên $xy \\parallel x'y'$. Còn $xy$, $x'y'$ đều cắt $zz'$."
          },
          {
            id: "d3q8", level: "vua", source: "SGK Bài 9 – BT 3.6c",
            q: "Trên hình, xét hai đường thẳng $MN$ và $BC$ bị cắt bởi đường thẳng $AB$. Cặp góc nào là cặp góc trong cùng phía?" + TRI,
            options: ["$\\widehat{AMN}$ và $\\widehat{MBC}$", "$\\widehat{NMB}$ và $\\widehat{MBC}$", "$\\widehat{MNB}$ và $\\widehat{NBC}$", "$\\widehat{AMN}$ và $\\widehat{ANM}$"],
            answer: 1,
            explain: "$\\widehat{NMB}$ và $\\widehat{MBC}$ cùng nằm giữa $MN$ và $BC$, cùng về phía điểm $C$ đối với $AB$: cặp góc trong cùng phía. ($\\widehat{AMN}$, $\\widehat{MBC}$: đồng vị; $\\widehat{MNB}$, $\\widehat{NBC}$: so le trong khi xét cát tuyến $BN$.)"
          },
          {
            id: "d3q9", level: "kho", source: "mới",
            q: "Trên hình, biết $\\widehat{A_2} = 120^\\circ$ và $\\widehat{B_4} = 120^\\circ$. Khẳng định nào đúng?" + NUM,
            options: ["$a \\parallel b$", "$a$ cắt $b$", "$a \\perp c$", "Chưa đủ dữ kiện để kết luận"],
            answer: 0,
            explain: "$\\widehat{A_4} = \\widehat{A_2} = 120^\\circ$ (đối đỉnh). Khi đó $\\widehat{A_4} = \\widehat{B_4} = 120^\\circ$ là cặp góc đồng vị bằng nhau nên $a \\parallel b$."
          },
          {
            id: "d3q10", level: "kho", source: "mới",
            q: "Trên hình, biết $\\widehat{A_1} = 2\\widehat{A_2}$ và $\\widehat{B_3} = 120^\\circ$. Khẳng định nào đúng?" + NUM,
            options: [
              "$\\widehat{A_1} = 60^\\circ$ và $a \\parallel b$",
              "$\\widehat{A_1} = 120^\\circ$ và $a \\parallel b$",
              "$\\widehat{A_1} = 90^\\circ$ và $a \\perp c$",
              "$\\widehat{A_2} = 120^\\circ$ và $a \\parallel b$"
            ],
            answer: 1,
            explain: "$\\widehat{A_1}$, $\\widehat{A_2}$ kề bù nên $\\widehat{A_1} + \\widehat{A_2} = 180^\\circ$; mà $\\widehat{A_1} = 2\\widehat{A_2}$ nên $3\\widehat{A_2} = 180^\\circ$, $\\widehat{A_2} = 60^\\circ$, $\\widehat{A_1} = 120^\\circ$. Khi đó $\\widehat{A_1} = \\widehat{B_3} = 120^\\circ$ (so le trong) nên $a \\parallel b$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SGK Bài 9 – Luyện tập 2", maxPoints: 2,
            q: "Cho tứ giác $ABCD$, tia $Ax$ là tia đối của tia $AD$ (hình vẽ). Biết $\\widehat{xAB} = 70^\\circ$, $\\widehat{ADC} = 70^\\circ$." + ABCD3 +
              "a) Tính $\\widehat{DAB}$.<br>b) Giải thích tại sao $AB \\parallel DC$.",
            modelAnswer: "a) $Ax$ là tia đối của tia $AD$ nên $\\widehat{xAB}$ và $\\widehat{DAB}$ kề bù: $\\widehat{DAB} = 180^\\circ - 70^\\circ = 110^\\circ$.<br>" +
              "b) Hai đường thẳng $AB$, $DC$ bị cắt bởi đường thẳng $AD$. $\\widehat{xAB}$ và $\\widehat{ADC}$ ở vị trí đồng vị và cùng bằng $70^\\circ$ nên $AB \\parallel DC$.",
            rubric: [
              { pts: 0.5, text: "Câu a: nêu kề bù, tính đúng $\\widehat{DAB} = 110^\\circ$." },
              { pts: 1, text: "Câu b: chỉ ra cặp góc đồng vị $\\widehat{xAB} = \\widehat{ADC}$ (hoặc $\\widehat{DAB} + \\widehat{ADC} = 180^\\circ$, cặp trong cùng phía bù nhau)." },
              { pts: 0.5, text: "Kết luận $AB \\parallel DC$ theo dấu hiệu nhận biết." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SBT Bài 9 – BT 3.11", maxPoints: 1,
            q: "Cho tam giác $ABC$ có $\\widehat{ABC} = 50^\\circ$. Nêu cách vẽ đường thẳng $xy$ đi qua $A$ và song song với $BC$ (dùng thước đo góc), rồi giải thích vì sao $xy \\parallel BC$.",
            modelAnswer: "Cách vẽ: vẽ tia $Ax$ nằm khác phía với điểm $C$ đối với đường thẳng $AB$ sao cho $\\widehat{xAB} = 50^\\circ$; vẽ tia $Ay$ là tia đối của tia $Ax$. Đường thẳng $xy$ là đường thẳng cần vẽ.<br>" +
              "Giải thích: hai đường thẳng $xy$ và $BC$ bị cắt bởi $AB$; $\\widehat{xAB}$ và $\\widehat{ABC}$ ở vị trí so le trong và cùng bằng $50^\\circ$ nên $xy \\parallel BC$.",
            rubric: [
              { pts: 0.5, text: "Nêu đúng cách vẽ (tạo góc $50^\\circ$ ở vị trí so le trong hoặc đồng vị với $\\widehat{ABC}$)." },
              { pts: 0.5, text: "Giải thích đúng bằng dấu hiệu nhận biết (cặp góc so le trong / đồng vị bằng nhau)." }
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
            q: "Đường thẳng $zz'$ cắt $xy$ tại $A$ và cắt $x'y'$ tại $B$ (hình vẽ). Biết $\\widehat{xAB} = 68^\\circ$. Để có $xy \\parallel x'y'$ theo dấu hiệu so le trong thì $\\widehat{ABy'}$ phải bằng" + zz(68),
            options: ["$68^\\circ$", "$112^\\circ$", "$22^\\circ$", "$90^\\circ$"],
            answer: 0,
            explain: "$\\widehat{xAB}$ và $\\widehat{ABy'}$ là cặp góc so le trong. Nếu $\\widehat{ABy'} = 68^\\circ = \\widehat{xAB}$ thì $xy \\parallel x'y'$."
          },
          {
            id: "d4q2", level: "vua", source: "mới",
            q: "Đường thẳng $zz'$ cắt $xy$ tại $A$ và cắt $x'y'$ tại $B$ (hình vẽ). Biết $\\widehat{zAy} = 115^\\circ$. Số đo $\\widehat{x'Bz'}$ bằng bao nhiêu thì $xy \\parallel x'y'$?" + zz(115),
            options: ["$65^\\circ$", "$25^\\circ$", "$115^\\circ$", "$57{,}5^\\circ$"],
            answer: 2,
            explain: "$\\widehat{xAB} = \\widehat{zAy} = 115^\\circ$ (đối đỉnh). Nếu $\\widehat{x'Bz'} = 115^\\circ$ thì $\\widehat{ABy'} = \\widehat{x'Bz'} = 115^\\circ$ (đối đỉnh), suy ra cặp so le trong $\\widehat{xAB} = \\widehat{ABy'}$, do đó $xy \\parallel x'y'$."
          },
          {
            id: "d4q3", level: "vua", source: "SGK tr.47 – Luyện tập 1b",
            q: "Trên hình, biết $\\widehat{A_1} + \\widehat{B_2} = 180^\\circ$. Khẳng định nào đúng?" + NUM,
            options: ["$\\widehat{A_1} = \\widehat{B_2}$", "$a \\parallel b$", "$a \\perp b$", "$c \\perp a$"],
            answer: 1,
            explain: "$\\widehat{B_1} = 180^\\circ - \\widehat{B_2}$ (kề bù) $= \\widehat{A_1}$. Cặp góc đồng vị $\\widehat{A_1} = \\widehat{B_1}$ nên $a \\parallel b$. Không suy ra được $\\widehat{A_1} = \\widehat{B_2}$ hay $c \\perp a$."
          },
          {
            id: "d4q4", level: "kho", source: "mới",
            q: "Trên hình, biết $\\widehat{A_1} = \\widehat{B_3} = 40^\\circ$. Có bao nhiêu cặp góc (một góc đỉnh $A$, một góc đỉnh $B$) bằng nhau?" + NUM,
            options: ["$2$", "$4$", "$8$", "$16$"],
            answer: 2,
            explain: "$\\widehat{A_1} = \\widehat{A_3} = \\widehat{B_1} = \\widehat{B_3} = 40^\\circ$ và $\\widehat{A_2} = \\widehat{A_4} = \\widehat{B_2} = \\widehat{B_4} = 140^\\circ$. Mỗi góc $40^\\circ$ ở đỉnh $A$ ghép được với 2 góc $40^\\circ$ ở đỉnh $B$: $2 \\cdot 2 = 4$ cặp; tương tự các góc $140^\\circ$: 4 cặp. Tổng cộng $8$ cặp."
          },
          {
            id: "d4q5", level: "kho", source: "mới",
            q: "Trên hình, biết $\\widehat{A_1} - \\widehat{A_2} = 40^\\circ$ và $\\widehat{B_3} = 110^\\circ$. Khẳng định nào đúng?" + NUM,
            options: [
              "$\\widehat{A_1} = 110^\\circ$ và $a \\parallel b$",
              "$\\widehat{A_1} = 70^\\circ$ và $a \\parallel b$",
              "$\\widehat{A_1} = 140^\\circ$ và $a \\parallel b$",
              "$\\widehat{A_1} = 110^\\circ$ và $a \\perp b$"
            ],
            answer: 0,
            explain: "$\\widehat{A_1} + \\widehat{A_2} = 180^\\circ$ (kề bù) và $\\widehat{A_1} - \\widehat{A_2} = 40^\\circ$ nên $\\widehat{A_1} = (180^\\circ + 40^\\circ) : 2 = 110^\\circ$. Khi đó $\\widehat{A_1} = \\widehat{B_3}$ (so le trong) nên $a \\parallel b$."
          },
          {
            id: "d4q6", level: "kho", source: "mới",
            q: "Đường thẳng $c$ vuông góc với cả ba đường thẳng phân biệt $a$, $b$, $d$. Trong ba đường thẳng $a$, $b$, $d$ có bao nhiêu cặp đường thẳng song song?",
            options: ["$0$", "$1$", "$2$", "$3$"],
            answer: 3,
            explain: "Hai đường thẳng phân biệt bất kì trong $a$, $b$, $d$ đều cùng vuông góc với $c$ nên song song. Có 3 cặp: $a$ và $b$; $a$ và $d$; $b$ và $d$."
          },
          {
            id: "d4q7", level: "kho", source: "mới",
            q: "Cho $\\widehat{xOy} = 80^\\circ$, tia $Oz$ là tia phân giác của $\\widehat{xOy}$. Lấy điểm $A$ trên tia $Ox$ ($A \\ne O$), vẽ tia $At$ nằm cùng phía với tia $Oy$ đối với đường thẳng $Ox$ sao cho $\\widehat{xAt} = 40^\\circ$ (hình vẽ). Tia $At$ song song với" + OZ,
            options: ["tia $Oy$", "tia $Oz$", "tia $Ox$", "không tia nào trong ba tia $Ox$, $Oy$, $Oz$"],
            answer: 1,
            explain: "$\\widehat{xOz} = 80^\\circ : 2 = 40^\\circ$. Hai đường thẳng $Oz$, $At$ bị cắt bởi $Ox$; $\\widehat{xOz}$ và $\\widehat{xAt}$ là cặp góc đồng vị cùng bằng $40^\\circ$ nên $At \\parallel Oz$."
          },
          {
            id: "d4q8", level: "kho", source: "mới",
            q: "Trên hình, biết $\\widehat{A_3} = 5\\widehat{A_4}$. Để $a \\parallel b$ thì $\\widehat{B_1}$ phải bằng" + NUM,
            options: ["$30^\\circ$", "$36^\\circ$", "$144^\\circ$", "$150^\\circ$"],
            answer: 3,
            explain: "$\\widehat{A_3} + \\widehat{A_4} = 180^\\circ$ (kề bù) và $\\widehat{A_3} = 5\\widehat{A_4}$ nên $6\\widehat{A_4} = 180^\\circ$, $\\widehat{A_4} = 30^\\circ$, $\\widehat{A_3} = 150^\\circ$. Suy ra $\\widehat{A_1} = \\widehat{A_3} = 150^\\circ$ (đối đỉnh). Nếu $\\widehat{B_1} = 150^\\circ = \\widehat{A_1}$ (đồng vị) thì $a \\parallel b$."
          },
          {
            id: "d4q9", level: "kho", source: "SBT Bài 9 – Ví dụ 3 (biến đổi)",
            q: "Cho tam giác $ABC$ có $\\widehat{ABC} = 50^\\circ$. Trên cạnh $AB$ lấy điểm $M$, vẽ tia $Mx$ nằm cùng phía với $C$ đối với $AB$ sao cho $\\widehat{AMx} = 50^\\circ$; tia $Mx$ cắt $AC$ tại $N$ (hình vẽ). Khẳng định nào đúng?" + AMN,
            options: ["$MN \\parallel BC$", "$MN \\perp AB$", "$MN \\parallel AC$", "$MN = BC$"],
            answer: 0,
            explain: "Hai đường thẳng $MN$ và $BC$ bị cắt bởi $AB$; $\\widehat{AMN}$ và $\\widehat{ABC}$ là cặp góc đồng vị cùng bằng $50^\\circ$ nên $MN \\parallel BC$. ($MN$ cắt $AC$ tại $N$ nên không song song với $AC$.)"
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Cho $\\widehat{xOy} = 50^\\circ$. Lấy điểm $A$ trên tia $Ox$ ($A \\ne O$), vẽ tia $At$ nằm cùng phía với tia $Oy$ đối với đường thẳng $Ox$ sao cho $\\widehat{OAt} = 130^\\circ$ (hình vẽ). Khẳng định nào đúng?" + OA,
            options: ["$At \\perp Ox$", "$At \\parallel Oy$", "$At \\perp Oy$", "Đường thẳng $At$ cắt đường thẳng $Oy$"],
            answer: 1,
            explain: "Gọi $Am$ là tia đối của tia $AO$. Khi đó $\\widehat{mAt} = 180^\\circ - 130^\\circ = 50^\\circ$ (kề bù). Hai đường thẳng $Oy$, $At$ bị cắt bởi $Ox$; $\\widehat{mAt}$ và $\\widehat{AOy}$ là cặp góc đồng vị cùng bằng $50^\\circ$ nên $At \\parallel Oy$. (Hoặc: $\\widehat{yOA} + \\widehat{OAt} = 180^\\circ$, cặp góc trong cùng phía bù nhau.)"
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Trên hình, biết $\\widehat{A_1} = 3\\widehat{A_2}$ và $\\widehat{B_4} = 45^\\circ$. Chứng tỏ $a \\parallel b$." + NUM,
            modelAnswer: "Vì $\\widehat{A_1}$ và $\\widehat{A_2}$ kề bù nên $\\widehat{A_1} + \\widehat{A_2} = 180^\\circ$. Mà $\\widehat{A_1} = 3\\widehat{A_2}$ nên $4\\widehat{A_2} = 180^\\circ$, suy ra $\\widehat{A_2} = 45^\\circ$, $\\widehat{A_1} = 135^\\circ$.<br>" +
              "$\\widehat{A_4} = \\widehat{A_2} = 45^\\circ$ (đối đỉnh).<br>" +
              "Do đó $\\widehat{A_4} = \\widehat{B_4} = 45^\\circ$. Hai góc này ở vị trí đồng vị nên $a \\parallel b$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{A_2} = 45^\\circ$, $\\widehat{A_1} = 135^\\circ$." },
              { pts: 0.5, text: "Tìm được một cặp góc đồng vị hoặc so le trong bằng nhau (ví dụ $\\widehat{A_4} = \\widehat{B_4} = 45^\\circ$, hoặc $\\widehat{B_3} = 135^\\circ = \\widehat{A_1}$)." },
              { pts: 0.5, text: "Kết luận $a \\parallel b$ theo dấu hiệu nhận biết." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Cho $\\widehat{xOy} = 120^\\circ$, tia $Ot$ là tia phân giác của $\\widehat{xOy}$. Lấy điểm $A$ trên tia $Ox$ ($A \\ne O$), vẽ tia $Az$ nằm cùng phía với tia $Oy$ đối với đường thẳng $Ox$ sao cho $\\widehat{OAz} = 120^\\circ$ (hình vẽ). Chứng tỏ $Az \\parallel Ot$." + OT,
            modelAnswer: "Vì $Ot$ là tia phân giác của $\\widehat{xOy}$ nên $\\widehat{xOt} = 120^\\circ : 2 = 60^\\circ$.<br>" +
              "Gọi $Am$ là tia đối của tia $AO$. Vì $\\widehat{OAz}$ và $\\widehat{mAz}$ kề bù nên $\\widehat{mAz} = 180^\\circ - 120^\\circ = 60^\\circ$.<br>" +
              "Hai đường thẳng $Ot$ và $Az$ bị cắt bởi đường thẳng $Ox$; $\\widehat{AOt}$ (tức $\\widehat{xOt}$) và $\\widehat{mAz}$ là cặp góc đồng vị và cùng bằng $60^\\circ$. Vậy $Az \\parallel Ot$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{xOt} = 60^\\circ$ (tính chất tia phân giác)." },
              { pts: 0.5, text: "Tính được góc kề bù $\\widehat{mAz} = 60^\\circ$ và chỉ ra cặp góc đồng vị bằng nhau (hoặc $\\widehat{tOA} + \\widehat{OAz} = 180^\\circ$, cặp trong cùng phía bù nhau)." },
              { pts: 0.5, text: "Kết luận $Az \\parallel Ot$." }
            ]
          }
        ]
      }
    ]
  });
})();
