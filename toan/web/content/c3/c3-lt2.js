(function () {
  // ===== Trợ giúp vẽ hình SVG (currentColor để hợp chế độ sáng/tối; điểm nhấn #e5484d) =====
  var RED = "#e5484d";
  var rad = function (d) { return d * Math.PI / 180; };
  var u = function (d) { return [Math.cos(rad(d)), -Math.sin(rad(d))]; };          // hướng theo góc toán học (ngược chiều kim đồng hồ)
  var f = function (v) { return (+v).toFixed(1); };
  var mv = function (p, d, len) { var e = u(d); return [p[0] + e[0] * len, p[1] + e[1] * len]; };

  function svg(w, h, body) {
    return '<svg viewBox="-14 -14 ' + (w + 28) + ' ' + (h + 28) + '" width="100%" style="max-width:320px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">' + body + '</svg>';
  }
  function L(p, q, red, dash) {
    return '<line x1="' + f(p[0]) + '" y1="' + f(p[1]) + '" x2="' + f(q[0]) + '" y2="' + f(q[1]) + '" stroke="' + (red ? RED : 'currentColor') + '" stroke-width="1.5"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>';
  }
  function T(p, s, red, size) {
    return '<text x="' + f(p[0]) + '" y="' + f(p[1]) + '" font-size="' + (size || 14) + '" font-style="italic" text-anchor="middle" dominant-baseline="middle" fill="' + (red ? RED : 'currentColor') + '">' + s + '</text>';
  }
  function Dot(p) { return '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2.5" fill="currentColor"/>'; }
  // cung góc tại đỉnh c, từ hướng a1 đến a2 (độ, a1 < a2), nhãn ở giữa cung
  function Arc(c, a1, a2, label, r) {
    r = r || 18;
    var p = mv(c, a1, r), q = mv(c, a2, r), big = (a2 - a1) > 180 ? 1 : 0;
    var s = '<path d="M' + f(p[0]) + ' ' + f(p[1]) + ' A' + r + ' ' + r + ' 0 ' + big + ' 0 ' + f(q[0]) + ' ' + f(q[1]) + '" fill="none" stroke="' + RED + '" stroke-width="1.3"/>';
    if (label) s += T(mv(c, (a1 + a2) / 2, r + 14), label, true, 12);
    return s;
  }
  // kí hiệu góc vuông tại c, hai cạnh theo hướng d và d+90
  function RA(c, d, s) {
    s = s || 9;
    var p1 = mv(c, d, s), p3 = mv(c, d + 90, s), p2 = mv(p1, d + 90, s);
    return '<path d="M' + f(p1[0]) + ' ' + f(p1[1]) + ' L' + f(p2[0]) + ' ' + f(p2[1]) + ' L' + f(p3[0]) + ' ' + f(p3[1]) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
  }

  // Hai đường thẳng song song nằm ngang + một cát tuyến.
  // o.theta: góc nhọn tạo bởi cát tuyến và đường thẳng; o.dir = 1 (điểm dưới lệch phải) | -1 (lệch trái)
  // o.top/o.bot: [nhãn trái, nhãn phải]; o.A/o.B: tên giao điểm trên/dưới; o.z: [nhãn trên, nhãn dưới] của cát tuyến
  // o.arcs: [[ "A"|"B", a1, a2, nhãn ]]; o.extra(A, B): chuỗi SVG vẽ thêm
  function par(o) {
    var dir = o.dir || 1, yT = 45, yB = 125;
    var A = [o.ax || 165, yT], B = [A[0] + dir * 80 / Math.tan(rad(o.theta)), yB];
    var phi = dir > 0 ? 180 - o.theta : o.theta;               // hướng từ B lên A
    var s = L([20, yT], [300, yT]) + L([20, yB], [300, yB]) + L(mv(B, phi + 180, 32), mv(A, phi, 32));
    s += T([28, yT - 12], o.top[0]) + T([292, yT - 12], o.top[1]) + T([28, yB - 12], o.bot[0]) + T([292, yB - 12], o.bot[1]);
    var ao = o.Aoff || [dir * 13, -12];
    s += T([A[0] + ao[0], yT + ao[1]], o.A || "A") + T([B[0] - dir * 13, yB + 13], o.B || "B");
    var z = o.z || ["", ""];
    if (z[0]) s += T(mv(A, phi, 42), z[0]);
    if (z[1]) s += T(mv(B, phi + 180, 42), z[1]);
    (o.arcs || []).forEach(function (a) { s += Arc(a[0] === "A" ? A : B, a[1], a[2], a[3]); });
    if (o.extra) s += o.extra(A, B);
    return svg(320, 160, s + Dot(A) + Dot(B));
  }

  // Hình "chữ V": Ax // By, C nằm giữa; góc xAC = a (C lệch xuống phải), góc CBy = b
  function zig(a, b) {
    var A = [50, 30], C = [170, 30 + 120 * Math.tan(rad(a))];
    var B = [C[0] - 80 / Math.tan(rad(b)), C[1] + 80];
    var s = L(A, [300, A[1]]) + L(B, [300, B[1]]) + L(A, C) + L(C, B);
    s += T([A[0] - 12, A[1]], "A") + T([292, A[1] - 12], "x") + T([B[0] - 12, B[1]], "B") + T([292, B[1] - 12], "y") + T([C[0] + 13, C[1]], "C");
    s += Arc(A, -a, 0, a + "°", 24) + Arc(B, 0, b, b + "°", 24);
    return svg(320, B[1] + 20, s + Dot(A) + Dot(B) + Dot(C));
  }

  // ---------- các hình dùng trong bài ----------
  var figD1q3 = par({ theta: 70, top: ["x", "y"], bot: ["x'", "y'"], z: ["z", "z'"], arcs: [["A", 290, 360, "70°"]] });
  var figD1q5 = par({ theta: 65, top: ["x", "y"], bot: ["x'", "y'"], z: ["z", "z'"], arcs: [["A", 180, 295, "115°"]] });
  var figD2q3 = par({ theta: 55, top: ["x", "y"], bot: ["x'", "y'"], z: ["z", "z'"], arcs: [["A", 305, 360, "55°"]] });
  var figD2q5 = par({ theta: 50, top: ["x", "y"], bot: ["x'", "y'"], z: ["z", "z'"], arcs: [["A", 130, 180, "50°"]] });
  var figD3q3 = par({ theta: 40, ax: 140, Aoff: [-14, 13], top: ["x", "y"], bot: ["x'", "y'"], z: ["z", "z'"], arcs: [["A", 0, 140, "140°"]] });
  var figD3q5 = par({ theta: 65, dir: -1, ax: 175, top: ["m", "n"], bot: ["p", "q"], A: "H", B: "K", z: ["v", ""], arcs: [["B", 0, 65, "65°"]] });
  var figD3q10 = par({
    theta: 70, top: ["x", "y"], bot: ["x'", "y'"], z: ["z", "z'"], arcs: [["A", 290, 360, "70°"]],
    extra: function (A) { var C = [A[0] - 80 / Math.tan(rad(55)), 125]; return L(A, C, true) + Dot(C) + T([C[0] - 4, 140], "C"); }
  });
  var figD1e2 = par({
    theta: 60, top: ["x", "y"], bot: ["x'", "y'"], z: ["z", "z'"],
    extra: function (A, B) {
      var t1 = mv(A, -30, 62), t2 = mv(B, 150, 62);
      return L(A, t1, true) + L(B, t2, true) + T(mv(A, -30, 74), "t", true) + T(mv(B, 150, 74), "t'", true);
    }
  });

  // Tam giác ABC, MN // BC (Đề 1 câu 6)
  var figD1q6 = (function () {
    var A = [150, 22], B = [40, 150], C = [290, 150], M = [106, 73.2], N = [206, 73.2];
    var s = L(A, B) + L(A, C) + L(B, C) + L(M, N);
    s += T([150, 10], "A") + T([30, 160], "B") + T([300, 160], "C") + T([94, 66], "M") + T([218, 66], "N");
    s += Arc(B, 0, 49.8, "55°", 22) + Arc(N, 180, 317.1, "140°", 16);
    return svg(320, 172, s);
  })();

  // Hai đường thẳng xy, Am bị cắt bởi hai cát tuyến (Đề 2 câu 7)
  var figD2q7 = (function () {
    var B = [90, 50], C = [210, 50], A = [65.9, 140], D = [242.8, 140];
    var s = L([20, 50], [300, 50]) + L([40, 140], [300, 140]) + L(A, mv(B, 75, 38)) + L(D, mv(C, 110, 38));
    s += T([26, 38], "x") + T([294, 38], "y") + T([294, 128], "m") + T([84, 36], "B") + T([226, 38], "C") + T([56, 152], "A") + T([250, 153], "D");
    s += T(mv(B, 75, 50), "n") + T(mv(C, 110, 50), "t");
    s += Arc(B, 180, 255, "75°", 18) + Arc(A, 0, 75, "75°", 18) + Arc(C, 0, 110, "110°", 16);
    return svg(320, 165, s + Dot(A) + Dot(B) + Dot(C) + Dot(D));
  })();

  // Tam giác ABC, đường cao AH, đường thẳng d qua A (Đề 2 câu tự luận 2)
  var figD2e2 = (function () {
    var A = [120, 34], B = [30, 150], C = [290, 150], H = [120, 150];
    var s = L([20, 34], [300, 34]) + L(A, B) + L(A, C) + L(B, C) + L(A, H) + RA(H, 0);
    s += T([120, 20], "A") + T([22, 160], "B") + T([298, 160], "C") + T([120, 163], "H") + T([28, 22], "d") + T([292, 22], "t");
    s += Arc(A, 325.6, 360, "40°", 30) + Arc(C, 145.6, 180, "40°", 30);
    return svg(320, 172, s);
  })();

  // Ax // Dy (cùng hướng sang phải), C ở giữa (Đề 1 câu 10)
  var figD1q10 = (function () {
    var A = [60, 165], C = [137.8, 87.2], D = [122.3, 29.2];
    var s = L(A, [300, 165]) + L(D, [300, 29.2]) + L(A, C) + L(C, D);
    s += T([48, 168], "A") + T([292, 153], "x") + T([110, 22], "D") + T([292, 17], "y") + T([152, 88], "C");
    s += Arc(A, 0, 45, "45°", 24) + Arc(C, 105, 225, "120°", 16);
    return svg(320, 185, s + Dot(A) + Dot(C) + Dot(D));
  })();

  // Ax // Dy, AD ⊥ Ax (Đề 3 câu 6)
  var figD3q6 = (function () {
    var A = [60, 40], B = [230, 40], D = [60, 140], C = [160, 140];
    var s = L([30, 40], [300, 40]) + L([30, 140], [300, 140]) + L([60, 20], [60, 160]) + L(B, C) + RA(A, 0);
    s += T([48, 28], "A") + T([230, 28], "B") + T([294, 28], "x") + T([48, 152], "D") + T([160, 154], "C") + T([294, 128], "y");
    s += Arc(C, 0, 55, "55°", 22);
    return svg(320, 168, s + Dot(B) + Dot(C));
  })();

  // Tam giác DEF, HK và MN (Đề 3 câu 9)
  var figD3q9 = (function () {
    var D = [160, 15], E = [30, 190], F = [290, 190], H = [127.5, 58.8], K = [192.5, 58.8], M = [88.5, 111.3], N = [231.5, 111.3];
    var s = L(D, E) + L(D, F) + L(E, F) + L(H, K) + L(M, N) + L(N, E);
    s += T([160, 6], "D") + T([20, 198], "E") + T([300, 198], "F") + T([115, 54], "H") + T([205, 54], "K") + T([76, 108], "M") + T([244, 108], "N");
    return svg(320, 205, s);
  })();

  // Ví dụ 1: hai góc kề bù và hai tia phân giác
  var figEx1 = (function () {
    var O = [160, 130];
    var s = L([20, 130], [300, 130]) + L(O, mv(O, 70, 110)) + L(O, mv(O, 35, 120), true) + L(O, mv(O, 125, 120), true);
    s += T([292, 142], "x") + T([28, 142], "z") + T([160, 145], "O") + T(mv(O, 70, 122), "y") + T(mv(O, 35, 132), "u", true) + T(mv(O, 125, 132), "v", true);
    return svg(320, 150, s + Dot(O));
  })();

  registerLesson({
    id: "c3-lt2",
    chapter: 3,
    kind: "review",
    title: "Luyện tập chung (Bài 10–11)",
    sgkPages: [58, 58],
    sbtPages: [42, 47],
    objectives: [
      "Vận dụng tiên đề Euclid và tính chất của hai đường thẳng song song để tính số đo góc",
      "Phối hợp dấu hiệu nhận biết và tính chất của hai đường thẳng song song",
      "Nhận biết giả thiết, kết luận của định lí; viết GT – KL bằng kí hiệu và trình bày chứng minh đơn giản"
    ],

    theory: [
      {
        heading: "1. Tiên đề Euclid (Bài 10)",
        html: "Qua một điểm nằm ngoài một đường thẳng, <b>chỉ có một</b> đường thẳng song song với đường thẳng đó." +
          "<ul><li>Hệ quả: nếu một đường thẳng cắt một trong hai đường thẳng song song thì nó cũng cắt đường thẳng còn lại.</li>" +
          "<li>Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì chúng song song với nhau.</li></ul>"
      },
      {
        heading: "2. Tính chất và dấu hiệu nhận biết hai đường thẳng song song",
        html: "<b>Tính chất</b> (biết $a \\parallel b$ → suy ra góc): nếu một đường thẳng cắt hai đường thẳng song song thì" +
          "<ul><li>hai góc so le trong bằng nhau;</li><li>hai góc đồng vị bằng nhau;</li>" +
          "<li>(suy ra) hai góc trong cùng phía bù nhau (tổng bằng $180^\\circ$).</li></ul>" +
          "<b>Dấu hiệu nhận biết</b> (biết góc → suy ra $a \\parallel b$): nếu đường thẳng $c$ cắt $a$, $b$ và tạo thành một cặp góc so le trong (hoặc đồng vị) bằng nhau thì $a \\parallel b$." +
          "<ul><li>Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia.</li>" +
          "<li>Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau.</li></ul>"
      },
      {
        heading: "3. Định lí và chứng minh định lí (Bài 11)",
        html: "<b>Định lí</b> là một khẳng định được suy ra từ những khẳng định đúng đã biết, thường phát biểu dạng <b>“Nếu … thì …”</b>:" +
          "<ul><li>phần giữa “nếu” và “thì” là <b>giả thiết</b> (GT);</li><li>phần sau “thì” là <b>kết luận</b> (KL).</li></ul>" +
          "<b>Chứng minh định lí</b> là dùng lập luận để từ giả thiết và những điều đúng đã biết suy ra kết luận." +
          "<br>Để chỉ ra một khẳng định là <b>sai</b>, chỉ cần nêu <b>một ví dụ</b> (phản ví dụ) mà khẳng định đó không đúng."
      }
    ],

    skills: [
      "<b>Phân biệt khi nào dùng tính chất, khi nào dùng dấu hiệu:</b> đã <b>biết</b> hai đường thẳng song song → dùng tính chất để suy ra các góc bằng nhau; cần <b>chứng minh</b> hai đường thẳng song song → dùng dấu hiệu (góc so le trong / đồng vị bằng nhau, hoặc cùng vuông góc / cùng song song với đường thứ ba).",
      "<b>Tính góc:</b> tìm cặp góc so le trong, đồng vị; kết hợp hai góc kề bù (tổng $180^\\circ$) và hai góc đối đỉnh (bằng nhau). Luôn ghi rõ lí do trong ngoặc.",
      "<b>Hình “chữ V” (gấp khúc) giữa hai đường song song:</b> qua đỉnh gấp khúc kẻ thêm một đường thẳng song song với hai đường đã cho, rồi dùng so le trong hai lần.",
      "<b>Viết GT – KL:</b> đưa định lí về dạng “Nếu … thì …”, vẽ hình, đặt tên điểm/đường, rồi ghi bằng kí hiệu ($a \\parallel b$, $c \\perp a$, $\\widehat{A_1} = \\widehat{B_1}$, …).",
      "<b>Lỗi hay gặp:</b> dùng “so le trong bằng nhau” khi chưa biết hai đường thẳng song song; nhầm giả thiết với kết luận; cho rằng hai góc bằng nhau thì đối đỉnh, hay hai góc có tổng $180^\\circ$ thì kề bù."
    ],

    examples: [
      {
        q: "Vẽ hình, viết giả thiết, kết luận và chứng minh: “Hai tia phân giác của hai góc kề bù tạo thành một góc vuông”." + figEx1,
        solution: "GT: $\\widehat{xOy}$ và $\\widehat{yOz}$ kề bù; $Ou$ là tia phân giác của $\\widehat{xOy}$; $Ov$ là tia phân giác của $\\widehat{yOz}$. &nbsp; KL: $\\widehat{uOv} = 90^\\circ$.<br>" +
          "Chứng minh: vì $Ou$, $Ov$ là các tia phân giác nên $\\widehat{uOy} = \\frac{1}{2}\\widehat{xOy}$ và $\\widehat{yOv} = \\frac{1}{2}\\widehat{yOz}$.<br>" +
          "Do đó $\\widehat{uOv} = \\widehat{uOy} + \\widehat{yOv} = \\frac{1}{2}\\left(\\widehat{xOy} + \\widehat{yOz}\\right) = \\frac{1}{2} \\cdot 180^\\circ = 90^\\circ$ (vì hai góc kề bù có tổng $180^\\circ$)."
      },
      {
        q: "Cho $Ax \\parallel By$ và điểm $C$ như hình, $\\widehat{xAC} = 40^\\circ$, $\\widehat{CBy} = 30^\\circ$. Tính $\\widehat{ACB}$." + zig(40, 30),
        solution: "Qua $C$ kẻ tia $Ct$ song song với $Ax$, nằm trong góc $ACB$ (hướng về phía $A$, $B$).<br>" +
          "• $Ct \\parallel Ax$ nên $\\widehat{ACt} = \\widehat{xAC} = 40^\\circ$ (hai góc so le trong).<br>" +
          "• $Ct \\parallel By$ (vì cùng song song với $Ax$) nên $\\widehat{tCB} = \\widehat{CBy} = 30^\\circ$ (hai góc so le trong).<br>" +
          "Vậy $\\widehat{ACB} = \\widehat{ACt} + \\widehat{tCB} = 40^\\circ + 30^\\circ = 70^\\circ$."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.51 – Tiên đề Euclid",
            q: "Qua một điểm $M$ nằm ngoài đường thẳng $a$, có bao nhiêu đường thẳng song song với $a$?",
            options: ["Không có đường thẳng nào", "Có vô số đường thẳng", "Chỉ có một đường thẳng", "Có đúng hai đường thẳng"],
            answer: 2,
            explain: "Theo tiên đề Euclid: qua một điểm ở ngoài một đường thẳng chỉ có <b>một</b> đường thẳng song song với đường thẳng đó."
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.55 – Giả thiết và kết luận",
            q: "Trong định lí “Nếu hai góc đối đỉnh thì hai góc đó bằng nhau”, giả thiết là",
            options: ["Hai góc đó bằng nhau", "Hai góc đối đỉnh", "Hai góc kề bù", "Hai góc có tổng bằng $180^\\circ$"],
            answer: 1,
            explain: "Giả thiết là phần nằm giữa “nếu” và “thì”: <i>hai góc đối đỉnh</i>. Còn “hai góc đó bằng nhau” là kết luận."
          },
          {
            id: "d1q3", level: "de", source: "SGK tr.52 – Ví dụ 2",
            q: "Cho hình vẽ, biết $xy \\parallel x'y'$ và $\\widehat{yAB} = 70^\\circ$. Số đo góc $\\widehat{y'Bz'}$ là" + figD1q3,
            options: ["$110^\\circ$", "$20^\\circ$", "$140^\\circ$", "$70^\\circ$"],
            answer: 3,
            explain: "$\\widehat{yAB}$ và $\\widehat{y'Bz'}$ là hai góc đồng vị, mà $xy \\parallel x'y'$ nên $\\widehat{y'Bz'} = \\widehat{yAB} = 70^\\circ$."
          },
          {
            id: "d1q4", level: "de", source: "SGK tr.53 – Nhận xét",
            q: "Cho $a \\parallel b$. Nếu đường thẳng $c$ vuông góc với $a$ thì $c$",
            options: ["vuông góc với $b$", "song song với $b$", "tạo với $b$ một góc $45^\\circ$", "không cắt $b$"],
            answer: 0,
            explain: "Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia, nên $c \\perp b$."
          },
          {
            id: "d1q5", level: "vua", source: "SGK Bài 10 – BT 3.17 (biến đổi)",
            q: "Cho hình vẽ, biết $xy \\parallel x'y'$ và $\\widehat{xAB} = 115^\\circ$. Số đo góc $\\widehat{ABx'}$ là" + figD1q5,
            options: ["$115^\\circ$", "$65^\\circ$", "$75^\\circ$", "$25^\\circ$"],
            answer: 1,
            explain: "$xy \\parallel x'y'$ nên $\\widehat{ABy'} = \\widehat{xAB} = 115^\\circ$ (hai góc so le trong). $\\widehat{ABx'}$ và $\\widehat{ABy'}$ kề bù nên $\\widehat{ABx'} = 180^\\circ - 115^\\circ = 65^\\circ$."
          },
          {
            id: "d1q6", level: "vua", source: "SGK tr.53 – Luyện tập 2 (biến đổi)",
            q: "Cho tam giác $ABC$, $M \\in AB$, $N \\in AC$ sao cho $MN \\parallel BC$. Biết $\\widehat{ABC} = 55^\\circ$, $\\widehat{MNC} = 140^\\circ$. Số đo góc $\\widehat{ACB}$ là" + figD1q6,
            options: ["$40^\\circ$", "$140^\\circ$", "$55^\\circ$", "$35^\\circ$"],
            answer: 0,
            explain: "$\\widehat{ANM}$ và $\\widehat{MNC}$ kề bù nên $\\widehat{ANM} = 180^\\circ - 140^\\circ = 40^\\circ$. Vì $MN \\parallel BC$ nên $\\widehat{ACB} = \\widehat{ANM} = 40^\\circ$ (hai góc đồng vị)."
          },
          {
            id: "d1q7", level: "vua", source: "SGK tr.52 – Chú ý",
            q: "Cho $a \\parallel b$. Đường thẳng $c$ cắt đường thẳng $a$ tại điểm $M$. Khẳng định nào sau đây đúng?",
            options: ["$c \\parallel b$", "$c$ cắt $b$", "$c$ trùng với $b$", "Không xác định được vị trí của $c$ và $b$"],
            answer: 1,
            explain: "Nếu $c \\parallel b$ thì qua $M$ có hai đường thẳng $a$ và $c$ cùng song song với $b$, trái với tiên đề Euclid. Vậy $c$ cắt $b$."
          },
          {
            id: "d1q8", level: "vua", source: "SGK Luyện tập chung – BT 3.28",
            q: "Định lí “Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau” được viết GT – KL bằng kí hiệu là",
            options: [
              "GT: $a \\parallel b$; &nbsp; KL: $a \\perp c$, $b \\perp c$",
              "GT: $a \\perp c$; &nbsp; KL: $b \\perp c$",
              "GT: $a$, $b$ phân biệt, $a \\perp c$, $b \\perp c$; &nbsp; KL: $a \\parallel b$",
              "GT: $a \\parallel b$, $a \\perp c$; &nbsp; KL: $b \\perp c$"
            ],
            answer: 2,
            explain: "Giả thiết: hai đường thẳng phân biệt $a$, $b$ cùng vuông góc với $c$. Kết luận: $a \\parallel b$. (Phương án GT: $a \\parallel b$, $a \\perp c$; KL: $b \\perp c$ là một định lí khác.)"
          },
          {
            id: "d1q9", level: "kho", source: "SGK Luyện tập chung – BT 3.27",
            q: "Cho hình thang $ABCD$ có cạnh $AD$ vuông góc với hai đáy $AB$ và $CD$. Biết số đo góc ở đỉnh $B$ gấp đôi số đo góc ở đỉnh $C$. Số đo góc $\\widehat{BCD}$ là",
            options: ["$90^\\circ$", "$120^\\circ$", "$45^\\circ$", "$60^\\circ$"],
            answer: 3,
            explain: "$AB \\perp AD$, $CD \\perp AD$ nên $AB \\parallel CD$. Gọi $Bx$ là tia đối của tia $BA$: $\\widehat{xBC} = \\widehat{BCD}$ (so le trong), mà $\\widehat{ABC} + \\widehat{xBC} = 180^\\circ$ (kề bù), nên $\\widehat{ABC} + \\widehat{BCD} = 180^\\circ$. Với $\\widehat{ABC} = 2\\,\\widehat{BCD}$: $3\\,\\widehat{BCD} = 180^\\circ$, $\\widehat{BCD} = 60^\\circ$ (và $\\widehat{ABC} = 120^\\circ$)."
          },
          {
            id: "d1q10", level: "kho", source: "SBT Bài 10 – BT 3.26 (biến đổi)",
            q: "Cho hình vẽ, biết $Ax \\parallel Dy$, $\\widehat{xAC} = 45^\\circ$, $\\widehat{ACD} = 120^\\circ$. Số đo góc $\\widehat{CDy}$ là" + figD1q10,
            options: ["$165^\\circ$", "$105^\\circ$", "$45^\\circ$", "$75^\\circ$"],
            answer: 3,
            explain: "Qua $C$ kẻ tia $Ct$ song song với $Ax$ (hướng sang trái, nằm trong góc $ACD$). $\\widehat{ACt} = \\widehat{xAC} = 45^\\circ$ (so le trong), nên $\\widehat{tCD} = 120^\\circ - 45^\\circ = 75^\\circ$. Vì $Ct \\parallel Dy$ (cùng song song $Ax$) nên $\\widehat{CDy} = \\widehat{tCD} = 75^\\circ$ (so le trong)."
          },
          {
            id: "d1q11", level: "kho", source: "SGK Bài 11 – BT 3.26",
            q: "Cho góc $xOy$ không phải là góc bẹt. Khẳng định nào sau đây đúng?",
            options: [
              "Nếu tia $Ot$ thoả mãn $\\widehat{xOt} = \\widehat{tOy}$ thì $Ot$ là tia phân giác của góc $xOy$",
              "Nếu hai góc bằng nhau thì hai góc đó đối đỉnh",
              "Nếu $Ot$ là tia phân giác của góc $xOy$ thì $\\widehat{xOt} = \\widehat{tOy}$",
              "Nếu hai góc có tổng số đo bằng $180^\\circ$ thì hai góc đó kề bù"
            ],
            answer: 2,
            explain: "Theo định nghĩa tia phân giác, $\\widehat{xOt} = \\widehat{tOy}$ là đúng. Các khẳng định còn lại sai: tia đối $Ot'$ của tia phân giác cũng có $\\widehat{xOt'} = \\widehat{t'Oy}$ nhưng không nằm trong góc $xOy$; hai góc bằng nhau chưa chắc đối đỉnh; hai góc có tổng $180^\\circ$ chưa chắc có chung cạnh nên chưa chắc kề bù."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK Bài 11 – BT 3.25", maxPoints: 1.5,
            q: "Vẽ hình, viết giả thiết, kết luận và chứng minh định lí: “Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng còn lại”.",
            modelAnswer: "Vẽ hai đường thẳng song song $a$, $b$; đường thẳng $c$ vuông góc với $a$ tại $A$ và cắt $b$ tại $B$.<br>" +
              "GT: $a \\parallel b$; $c \\perp a$ tại $A$; $c$ cắt $b$ tại $B$. &nbsp; KL: $c \\perp b$.<br>" +
              "Chứng minh: gọi $\\widehat{A_1}$ là một góc tại $A$ tạo bởi $c$ và $a$, $\\widehat{B_1}$ là góc đồng vị với nó tại $B$. Vì $c \\perp a$ nên $\\widehat{A_1} = 90^\\circ$.<br>" +
              "Vì $a \\parallel b$ nên $\\widehat{B_1} = \\widehat{A_1} = 90^\\circ$ (hai góc đồng vị). Vậy $c \\perp b$.<br>" +
              "(Ta đã dùng: tính chất hai góc đồng vị của hai đường thẳng song song; định nghĩa hai đường thẳng vuông góc.)",
            rubric: [
              { pts: 0.5, text: "Vẽ hình và viết đúng GT ($a \\parallel b$, $c \\perp a$) và KL ($c \\perp b$)." },
              { pts: 0.5, text: "Chỉ ra cặp góc đồng vị và dùng tính chất hai đường thẳng song song để suy ra chúng bằng nhau." },
              { pts: 0.5, text: "Suy ra góc tại $B$ bằng $90^\\circ$ và kết luận $c \\perp b$." }
            ]
          },
          {
            id: "d1e2", level: "kho", source: "SGK Luyện tập chung – BT 3.29 (biến đổi)", maxPoints: 1.5,
            q: "Cho hình vẽ: $xy \\parallel x'y'$, đường thẳng $zz'$ cắt $xy$ tại $A$, cắt $x'y'$ tại $B$. Tia $At$ là tia phân giác của góc $yAB$, tia $Bt'$ là tia phân giác của góc $x'BA$. Chứng minh rằng $At \\parallel Bt'$." + figD1e2,
            modelAnswer: "Vì $xy \\parallel x'y'$ nên $\\widehat{yAB} = \\widehat{x'BA}$ (hai góc so le trong).<br>" +
              "$At$ là tia phân giác của $\\widehat{yAB}$ nên $\\widehat{tAB} = \\frac{1}{2}\\widehat{yAB}$; $Bt'$ là tia phân giác của $\\widehat{x'BA}$ nên $\\widehat{ABt'} = \\frac{1}{2}\\widehat{x'BA}$.<br>" +
              "Do đó $\\widehat{tAB} = \\widehat{ABt'}$.<br>" +
              "Hai góc này ở vị trí so le trong (tạo bởi đường thẳng $AB$ với hai đường thẳng chứa $At$ và $Bt'$), nên theo dấu hiệu nhận biết, $At \\parallel Bt'$.",
            rubric: [
              { pts: 0.5, text: "Dùng tính chất hai đường thẳng song song: $\\widehat{yAB} = \\widehat{x'BA}$ (so le trong)." },
              { pts: 0.5, text: "Dùng tính chất tia phân giác suy ra $\\widehat{tAB} = \\widehat{ABt'}$." },
              { pts: 0.5, text: "Nhận ra cặp góc so le trong bằng nhau và kết luận $At \\parallel Bt'$ theo dấu hiệu nhận biết." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SGK tr.51 – HĐ1",
            q: "Cho điểm $M$ nằm ngoài đường thẳng $a$. Vẽ đường thẳng $b$ đi qua $M$ và song song với $a$, rồi vẽ đường thẳng $c$ đi qua $M$ và song song với $a$. Khi đó",
            options: ["$b$ và $c$ cắt nhau tại $M$", "$b$ vuông góc với $c$", "$b$ và $c$ trùng nhau", "$b$ song song với $c$"],
            answer: 2,
            explain: "Theo tiên đề Euclid, qua $M$ chỉ có một đường thẳng song song với $a$, nên $b$ và $c$ trùng nhau."
          },
          {
            id: "d2q2", level: "de", source: "SGK tr.55 – Định lí",
            q: "Khi một định lí được phát biểu dưới dạng “Nếu … thì …”, phần đứng sau từ “thì” là",
            options: ["giả thiết của định lí", "kết luận của định lí", "chứng minh của định lí", "hình vẽ của định lí"],
            answer: 1,
            explain: "Phần giữa “nếu” và “thì” là giả thiết; phần sau “thì” là kết luận của định lí."
          },
          {
            id: "d2q3", level: "de", source: "SGK tr.52 – HĐ2",
            q: "Cho hình vẽ, biết $xy \\parallel x'y'$ và $\\widehat{yAB} = 55^\\circ$. Số đo góc $\\widehat{ABx'}$ là" + figD2q3,
            options: ["$55^\\circ$", "$125^\\circ$", "$35^\\circ$", "$110^\\circ$"],
            answer: 0,
            explain: "$\\widehat{yAB}$ và $\\widehat{ABx'}$ là hai góc so le trong, mà $xy \\parallel x'y'$ nên $\\widehat{ABx'} = \\widehat{yAB} = 55^\\circ$."
          },
          {
            id: "d2q4", level: "de", source: "SGK tr.53 – Nhận xét",
            q: "Cho ba đường thẳng phân biệt $a$, $b$, $c$ với $a \\parallel b$ và $b \\parallel c$. Khi đó",
            options: ["$a \\perp c$", "$a$ cắt $c$", "$a$ trùng với $c$", "$a \\parallel c$"],
            answer: 3,
            explain: "Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì chúng song song với nhau: $a \\parallel c$."
          },
          {
            id: "d2q5", level: "vua", source: "SGK tr.52 – Ví dụ 2 (biến đổi)",
            q: "Cho hình vẽ, biết $xy \\parallel x'y'$ và $\\widehat{zAx} = 50^\\circ$. Số đo góc $\\widehat{ABy'}$ là" + figD2q5,
            options: ["$50^\\circ$", "$40^\\circ$", "$130^\\circ$", "$140^\\circ$"],
            answer: 2,
            explain: "$\\widehat{yAB} = \\widehat{zAx} = 50^\\circ$ (đối đỉnh). Vì $xy \\parallel x'y'$ nên $\\widehat{ABx'} = \\widehat{yAB} = 50^\\circ$ (so le trong). Do $\\widehat{ABx'}$ và $\\widehat{ABy'}$ kề bù: $\\widehat{ABy'} = 180^\\circ - 50^\\circ = 130^\\circ$."
          },
          {
            id: "d2q6", level: "vua", source: "SGK tr.53 – Luyện tập 2 (ý 2)",
            q: "Cho $xx' \\parallel yy'$, đường thẳng $zz'$ vuông góc với $xx'$ tại $A$ và cắt $yy'$ tại $B$. Số đo góc $\\widehat{ABy}$ là",
            options: ["$45^\\circ$", "$180^\\circ$", "$60^\\circ$", "$90^\\circ$"],
            answer: 3,
            explain: "$zz' \\perp xx'$ và $xx' \\parallel yy'$ nên $zz' \\perp yy'$. Do đó $\\widehat{ABy} = 90^\\circ$."
          },
          {
            id: "d2q7", level: "vua", source: "SGK Bài 10 – BT 3.18 (biến đổi)",
            q: "Cho hình vẽ, biết $\\widehat{xBA} = \\widehat{BAm} = 75^\\circ$ và $\\widehat{tCy} = 110^\\circ$. Số đo góc $\\widehat{CDm}$ là" + figD2q7,
            options: ["$70^\\circ$", "$110^\\circ$", "$75^\\circ$", "$105^\\circ$"],
            answer: 1,
            explain: "$\\widehat{xBA}$ và $\\widehat{BAm}$ là hai góc so le trong bằng nhau nên $Am \\parallel xy$ (dấu hiệu nhận biết). Khi đó $\\widehat{CDm} = \\widehat{tCy} = 110^\\circ$ (hai góc đồng vị)."
          },
          {
            id: "d2q8", level: "vua", source: "SGK tr.56 – Chứng minh định lí",
            q: "Khi chứng minh định lí “Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc đồng vị bằng nhau”, SGK đã dùng điều nào sau đây?",
            options: ["Tiên đề Euclid", "Tính chất tia phân giác của một góc", "Hai góc kề bù thì bằng nhau", "Hai góc bằng nhau thì đối đỉnh"],
            answer: 0,
            explain: "Qua $B$ kẻ $b'$ tạo góc đồng vị bằng $\\widehat{A_1}$, khi đó $b' \\parallel a$ (dấu hiệu). Theo <b>tiên đề Euclid</b>, $b'$ trùng $b$, suy ra hai góc đồng vị bằng nhau. Các phương án còn lại không dùng (và hai phương án cuối là khẳng định sai)."
          },
          {
            id: "d2q9", level: "kho", source: "mới",
            q: "Cho $a \\parallel b$, đường thẳng $c$ cắt $a$ và $b$. Trong một cặp góc trong cùng phía tạo thành, góc này gấp 4 lần góc kia. Số đo góc nhỏ hơn trong cặp đó là",
            options: ["$45^\\circ$", "$30^\\circ$", "$36^\\circ$", "$144^\\circ$"],
            answer: 2,
            explain: "Hai góc trong cùng phía bù nhau (vì góc này bằng góc so le trong với góc kia, cộng với góc kề bù của nó). Gọi góc nhỏ là $x$: $x + 4x = 180^\\circ$, $x = 36^\\circ$ (góc lớn là $144^\\circ$)."
          },
          {
            id: "d2q10", level: "kho", source: "SBT Bài 10 – BT 3.25 (biến đổi)",
            q: "Cho hình vẽ, biết $Ax \\parallel By$, $\\widehat{xAC} = 35^\\circ$, $\\widehat{CBy} = 50^\\circ$. Số đo góc $\\widehat{ACB}$ là" + zig(35, 50),
            options: ["$15^\\circ$", "$95^\\circ$", "$75^\\circ$", "$85^\\circ$"],
            answer: 3,
            explain: "Qua $C$ kẻ tia $Ct \\parallel Ax$ nằm trong góc $ACB$. $\\widehat{ACt} = \\widehat{xAC} = 35^\\circ$ (so le trong); $Ct \\parallel By$ (cùng song song $Ax$) nên $\\widehat{tCB} = \\widehat{CBy} = 50^\\circ$ (so le trong). Vậy $\\widehat{ACB} = 35^\\circ + 50^\\circ = 85^\\circ$."
          },
          {
            id: "d2q11", level: "kho", source: "SGK tr.58 – Ví dụ (biến đổi)",
            q: "Cho $\\widehat{xOy}$ và $\\widehat{yOz}$ là hai góc kề bù với $\\widehat{xOy} = 5\\,\\widehat{yOz}$. Gọi $Ou$, $Ov$ lần lượt là tia phân giác của $\\widehat{xOy}$ và $\\widehat{yOz}$. Số đo $\\widehat{uOy}$ và $\\widehat{uOv}$ lần lượt là",
            options: ["$75^\\circ$ và $105^\\circ$", "$75^\\circ$ và $90^\\circ$", "$150^\\circ$ và $90^\\circ$", "$60^\\circ$ và $90^\\circ$"],
            answer: 1,
            explain: "$\\widehat{xOy} + \\widehat{yOz} = 180^\\circ$ và $\\widehat{xOy} = 5\\,\\widehat{yOz}$ nên $\\widehat{yOz} = 30^\\circ$, $\\widehat{xOy} = 150^\\circ$. Suy ra $\\widehat{uOy} = 75^\\circ$, $\\widehat{yOv} = 15^\\circ$, $\\widehat{uOv} = 75^\\circ + 15^\\circ = 90^\\circ$ (đúng với định lí: phân giác của hai góc kề bù vuông góc với nhau)."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SGK tr.57 – Luyện tập 2", maxPoints: 1.5,
            q: "Vẽ hình, viết giả thiết, kết luận và chứng minh định lí: “Hai góc kề bù bằng nhau thì mỗi góc là một góc vuông”.",
            modelAnswer: "Vẽ đường thẳng $xz$, điểm $O$ thuộc $xz$ và tia $Oy$ sao cho $\\widehat{xOy} = \\widehat{yOz}$.<br>" +
              "GT: $\\widehat{xOy}$ và $\\widehat{yOz}$ kề bù; $\\widehat{xOy} = \\widehat{yOz}$. &nbsp; KL: $\\widehat{xOy} = \\widehat{yOz} = 90^\\circ$.<br>" +
              "Chứng minh: vì hai góc kề bù nên $\\widehat{xOy} + \\widehat{yOz} = 180^\\circ$.<br>" +
              "Mà $\\widehat{xOy} = \\widehat{yOz}$ nên $2\\,\\widehat{xOy} = 180^\\circ$, suy ra $\\widehat{xOy} = 90^\\circ$ và $\\widehat{yOz} = 90^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Vẽ hình, viết đúng GT và KL." },
              { pts: 0.5, text: "Dùng tính chất hai góc kề bù: tổng bằng $180^\\circ$." },
              { pts: 0.5, text: "Suy ra mỗi góc bằng $90^\\circ$ và kết luận." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SGK Luyện tập chung – BT 3.31 (biến đổi)", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ có $AH \\perp BC$ ($H \\in BC$). Qua $A$ vẽ đường thẳng $d$, trên $d$ lấy tia $At$ (cùng phía với $C$ đối với đường thẳng $AH$) sao cho $\\widehat{tAC} = \\widehat{ACB} = 40^\\circ$ (hình vẽ).<br>a) Chứng minh $d \\parallel BC$.<br>b) Chứng minh $d \\perp AH$.<br>c) Trong hai kết luận trên, kết luận nào suy ra từ dấu hiệu nhận biết, kết luận nào suy ra từ tính chất của hai đường thẳng song song?" + figD2e2,
            modelAnswer: "a) $\\widehat{tAC}$ và $\\widehat{ACB}$ là hai góc so le trong tạo bởi đường thẳng $AC$ với hai đường thẳng $d$ và $BC$. Hai góc này bằng nhau (cùng bằng $40^\\circ$) nên $d \\parallel BC$.<br>" +
              "b) $AH \\perp BC$ và $d \\parallel BC$ nên $AH \\perp d$ (một đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường thẳng kia).<br>" +
              "c) Kết luận a) suy ra từ <b>dấu hiệu nhận biết</b> hai đường thẳng song song; kết luận b) suy ra từ <b>tính chất</b> của hai đường thẳng song song.",
            rubric: [
              { pts: 0.5, text: "a) Chỉ ra cặp góc so le trong bằng nhau và kết luận $d \\parallel BC$." },
              { pts: 0.5, text: "b) Lập luận đúng $d \\perp AH$ từ $AH \\perp BC$ và $d \\parallel BC$." },
              { pts: 0.5, text: "c) Phân biệt đúng: a) dùng dấu hiệu nhận biết, b) dùng tính chất." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.52 – Luyện tập 1",
            q: "Phát biểu nào sau đây diễn đạt đúng nội dung của tiên đề Euclid?",
            options: [
              "Có duy nhất một đường thẳng song song với một đường thẳng cho trước",
              "Qua điểm $M$ nằm ngoài đường thẳng $a$ có ít nhất hai đường thẳng song song với $a$",
              "Qua điểm $M$ bất kì có vô số đường thẳng song song với đường thẳng $a$",
              "Cho điểm $M$ nằm ngoài đường thẳng $a$. Đường thẳng đi qua $M$ và song song với $a$ là duy nhất"
            ],
            answer: 3,
            explain: "Tiên đề Euclid: qua một điểm nằm ngoài một đường thẳng chỉ có một đường thẳng song song với đường thẳng đó. Phát biểu “có duy nhất một đường thẳng song song với một đường thẳng cho trước” sai vì có vô số đường thẳng song song với một đường thẳng (qua các điểm khác nhau)."
          },
          {
            id: "d3q2", level: "de", source: "SGK tr.55 – Định lí",
            q: "Định lí là",
            options: [
              "một khẳng định được suy ra từ những khẳng định đúng đã biết",
              "một khẳng định được kiểm tra bằng cách đo trên một hình vẽ",
              "một khẳng định được thừa nhận mà không chứng minh",
              "một hình vẽ có ghi giả thiết và kết luận"
            ],
            answer: 0,
            explain: "Định lí là khẳng định được suy ra (chứng minh) từ những khẳng định đúng đã biết. Đo đạc chỉ cho kết quả gần đúng trong một trường hợp; khẳng định được thừa nhận không chứng minh là tiên đề."
          },
          {
            id: "d3q3", level: "de", source: "SGK tr.52 – HĐ2",
            q: "Cho hình vẽ, biết $xy \\parallel x'y'$ và $\\widehat{zAy} = 140^\\circ$. Số đo góc $\\widehat{ABy'}$ là" + figD3q3,
            options: ["$40^\\circ$", "$140^\\circ$", "$50^\\circ$", "$120^\\circ$"],
            answer: 1,
            explain: "$\\widehat{zAy}$ và $\\widehat{ABy'}$ là hai góc đồng vị, mà $xy \\parallel x'y'$ nên $\\widehat{ABy'} = \\widehat{zAy} = 140^\\circ$."
          },
          {
            id: "d3q4", level: "de", source: "SGK Luyện tập chung – BT 3.28",
            q: "Giả thiết của định lí “Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau” là",
            options: [
              "Hai đường thẳng song song với nhau",
              "Hai đường thẳng cùng song song với một đường thẳng thứ ba",
              "Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba",
              "Đường thẳng thứ ba vuông góc với hai đường thẳng song song"
            ],
            answer: 2,
            explain: "Viết lại: “<i>Nếu</i> hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba <i>thì</i> chúng song song với nhau”. Giả thiết là phần giữa “nếu” và “thì”."
          },
          {
            id: "d3q5", level: "vua", source: "SGK Bài 10 – BT 3.17",
            q: "Cho hình vẽ, biết $mn \\parallel pq$ và $\\widehat{HKq} = 65^\\circ$. Số đo góc $\\widehat{mHK}$ là" + figD3q5,
            options: ["$115^\\circ$", "$25^\\circ$", "$130^\\circ$", "$65^\\circ$"],
            answer: 3,
            explain: "$\\widehat{mHK}$ và $\\widehat{HKq}$ là hai góc so le trong, mà $mn \\parallel pq$ nên $\\widehat{mHK} = \\widehat{HKq} = 65^\\circ$."
          },
          {
            id: "d3q6", level: "vua", source: "SGK Bài 10 – BT 3.20 (biến đổi)",
            q: "Cho hình vẽ, biết $Ax \\parallel Dy$, $AD \\perp Ax$ và $\\widehat{BCy} = 55^\\circ$. Số đo các góc $\\widehat{ADC}$ và $\\widehat{ABC}$ lần lượt là" + figD3q6,
            options: ["$90^\\circ$ và $125^\\circ$", "$90^\\circ$ và $55^\\circ$", "$55^\\circ$ và $90^\\circ$", "$45^\\circ$ và $55^\\circ$"],
            answer: 1,
            explain: "$AD \\perp Ax$ và $Ax \\parallel Dy$ nên $AD \\perp Dy$, do đó $\\widehat{ADC} = 90^\\circ$. $\\widehat{ABC}$ và $\\widehat{BCy}$ là hai góc so le trong nên $\\widehat{ABC} = \\widehat{BCy} = 55^\\circ$."
          },
          {
            id: "d3q7", level: "vua", source: "mới",
            q: "Cho đường thẳng $a$ và điểm $M$ không thuộc $a$. Vẽ đường thẳng $b$ đi qua $M$ và vuông góc với $a$, rồi vẽ đường thẳng $c$ đi qua $M$ và vuông góc với $b$. Khi đó",
            options: ["$c \\perp a$", "$c$ cắt $a$ tại một điểm", "$c \\parallel a$", "$c$ trùng với $b$"],
            answer: 2,
            explain: "$a$ và $c$ phân biệt (vì $M \\in c$, $M \\notin a$) và cùng vuông góc với $b$ nên $c \\parallel a$. Theo tiên đề Euclid, $c$ chính là đường thẳng duy nhất qua $M$ song song với $a$."
          },
          {
            id: "d3q8", level: "vua", source: "SGK Bài 11 – BT 3.24",
            q: "Định lí “Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau” được suy ra trực tiếp từ",
            options: [
              "dấu hiệu nhận biết hai đường thẳng song song (cặp góc đồng vị bằng nhau, cùng bằng $90^\\circ$)",
              "tính chất của hai góc kề bù",
              "định nghĩa tia phân giác của một góc",
              "tính chất của hai góc đối đỉnh"
            ],
            answer: 0,
            explain: "Nếu $a \\perp c$ và $b \\perp c$ thì $c$ tạo với $a$, $b$ hai góc đồng vị cùng bằng $90^\\circ$. Theo dấu hiệu nhận biết, $a \\parallel b$."
          },
          {
            id: "d3q9", level: "kho", source: "SGK Bài 10 – BT 3.23 (biến đổi)",
            q: "Cho tam giác $DEF$; $H$, $M$ thuộc cạnh $DE$; $K$, $N$ thuộc cạnh $DF$ (hình vẽ). Biết $\\widehat{DKH} = \\widehat{DFE} = 55^\\circ$ và $\\widehat{MNE} = \\widehat{NEF} = 25^\\circ$. Khẳng định nào sau đây đúng?" + figD3q9,
            options: [
              "$HK \\parallel EF$ nhưng $MN$ không song song với $EF$",
              "$MN \\parallel EF$ nhưng $HK$ không song song với $MN$",
              "$HK \\parallel MN$",
              "$HK \\perp MN$"
            ],
            answer: 2,
            explain: "$\\widehat{DKH} = \\widehat{DFE}$ là cặp góc đồng vị bằng nhau nên $HK \\parallel EF$. $\\widehat{MNE} = \\widehat{NEF}$ là cặp góc so le trong bằng nhau nên $MN \\parallel EF$. Hai đường thẳng phân biệt $HK$, $MN$ cùng song song với $EF$ nên $HK \\parallel MN$."
          },
          {
            id: "d3q10", level: "kho", source: "SBT Bài 10 – BT 3.24 (biến đổi)",
            q: "Cho hình vẽ, biết $xy \\parallel x'y'$, $\\widehat{yAB} = 70^\\circ$. Tia phân giác của góc $xAB$ cắt $x'y'$ tại $C$. Số đo góc $\\widehat{ACB}$ là" + figD3q10,
            options: ["$70^\\circ$", "$110^\\circ$", "$35^\\circ$", "$55^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xAB} = 180^\\circ - 70^\\circ = 110^\\circ$ (kề bù với $\\widehat{yAB}$). $AC$ là tia phân giác nên $\\widehat{xAC} = 55^\\circ$. Vì $xy \\parallel x'y'$ nên $\\widehat{ACB} = \\widehat{xAC} = 55^\\circ$ (hai góc so le trong)."
          },
          {
            id: "d3q11", level: "kho", source: "SGK tr.57 – Tranh luận",
            q: "Để chứng tỏ khẳng định “Hai góc bằng nhau thì đối đỉnh” là <b>sai</b>, ta chỉ cần",
            options: [
              "đo thật nhiều cặp góc đối đỉnh và thấy chúng bằng nhau",
              "chỉ ra một cặp góc bằng nhau nhưng không đối đỉnh",
              "chứng minh hai góc đối đỉnh thì bằng nhau",
              "vẽ hai góc kề bù có số đo bằng nhau"
            ],
            answer: 1,
            explain: "Muốn chỉ ra một khẳng định sai, chỉ cần một phản ví dụ, chẳng hạn hai góc $\\widehat{yAB}$ và $\\widehat{ABx'}$ so le trong (khi $xy \\parallel x'y'$) bằng nhau nhưng không đối đỉnh. Đo đạc hay chứng minh “đối đỉnh thì bằng nhau” chỉ nói về chiều ngược lại."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SGK Luyện tập chung – BT 3.30", maxPoints: 1.5,
            q: "Cho hai đường thẳng phân biệt $a$, $b$ cùng vuông góc với đường thẳng $c$; $d$ là một đường thẳng khác $c$ và $d$ vuông góc với $a$. Chứng minh rằng:<br>a) $a \\parallel b$; &nbsp; b) $c \\parallel d$; &nbsp; c) $b \\perp d$.",
            modelAnswer: "a) $a$, $b$ phân biệt và cùng vuông góc với $c$ nên $a \\parallel b$.<br>" +
              "b) $c$, $d$ phân biệt và cùng vuông góc với $a$ ($c \\perp a$ theo giả thiết, $d \\perp a$) nên $c \\parallel d$.<br>" +
              "c) $d \\perp a$ và $a \\parallel b$ nên $d \\perp b$ (một đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường thẳng kia).",
            rubric: [
              { pts: 0.5, text: "a) Lập luận đúng: hai đường thẳng phân biệt cùng vuông góc với $c$ nên $a \\parallel b$." },
              { pts: 0.5, text: "b) Lập luận đúng: $c$, $d$ cùng vuông góc với $a$ nên $c \\parallel d$." },
              { pts: 0.5, text: "c) Lập luận đúng: $d \\perp a$, $a \\parallel b$ nên $b \\perp d$." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SBT Bài 11 – BT 3.29", maxPoints: 1.5,
            q: "Vẽ hình, viết giả thiết, kết luận và chứng minh định lí: “Tia đối của tia phân giác của một góc là tia phân giác của góc đối đỉnh với góc đó”.",
            modelAnswer: "Vẽ góc $xOy$ (không bẹt), tia phân giác $Ot$; vẽ các tia đối $Ox'$, $Oy'$, $Ot'$ của $Ox$, $Oy$, $Ot$. Khi đó $\\widehat{x'Oy'}$ đối đỉnh với $\\widehat{xOy}$.<br>" +
              "GT: $Ot$ là tia phân giác của $\\widehat{xOy}$; $Ox'$, $Oy'$, $Ot'$ lần lượt là tia đối của $Ox$, $Oy$, $Ot$. &nbsp; KL: $Ot'$ là tia phân giác của $\\widehat{x'Oy'}$.<br>" +
              "Chứng minh: $\\widehat{x'Ot'} = \\widehat{xOt}$ và $\\widehat{t'Oy'} = \\widehat{tOy}$ (các cặp góc đối đỉnh).<br>" +
              "Mà $\\widehat{xOt} = \\widehat{tOy}$ (vì $Ot$ là tia phân giác) nên $\\widehat{x'Ot'} = \\widehat{t'Oy'}$.<br>" +
              "Lại có $Ot$ nằm giữa $Ox$, $Oy$ nên tia đối $Ot'$ nằm giữa $Ox'$, $Oy'$. Vậy $Ot'$ là tia phân giác của $\\widehat{x'Oy'}$.",
            rubric: [
              { pts: 0.5, text: "Vẽ hình, viết đúng GT và KL." },
              { pts: 0.5, text: "Chỉ ra hai cặp góc đối đỉnh: $\\widehat{x'Ot'} = \\widehat{xOt}$, $\\widehat{t'Oy'} = \\widehat{tOy}$." },
              { pts: 0.5, text: "Suy ra $\\widehat{x'Ot'} = \\widehat{t'Oy'}$ và kết luận $Ot'$ là tia phân giác của $\\widehat{x'Oy'}$." }
            ]
          }
        ]
      }
    ]
  });
})();
