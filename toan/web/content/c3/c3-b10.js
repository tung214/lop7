(function () {
  // ===== Hình vẽ SVG (currentColor để hợp chế độ sáng/tối; màu nhấn #e5484d) =====
  var RED = '#e5484d', W = 320;
  function f(n) { return (+n).toFixed(1); }
  function svg(h, body) {
    return '<svg viewBox="0 0 ' + W + ' ' + f(h) + '" width="100%" style="max-width:320px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">' + body + '</svg>';
  }
  function ln(p, q, col, dash) {
    return '<line x1="' + f(p[0]) + '" y1="' + f(p[1]) + '" x2="' + f(q[0]) + '" y2="' + f(q[1]) + '" stroke="' + (col || 'currentColor') + '" stroke-width="1.5"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>';
  }
  function tx(p, s, col, size) {
    return '<text x="' + f(p[0]) + '" y="' + f(p[1]) + '" font-size="' + (size || 13) + '" text-anchor="middle" dominant-baseline="central" fill="' + (col || 'currentColor') + '"' + (col ? '' : ' font-style="italic"') + '>' + s + '</text>';
  }
  function dot(p) { return '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2.5" fill="currentColor"/>'; }
  // điểm cách p một đoạn r theo hướng a (độ, ngược chiều kim đồng hồ, trục y hướng lên)
  function pol(p, a, r) { a = a * Math.PI / 180; return [p[0] + r * Math.cos(a), p[1] - r * Math.sin(a)]; }
  function dir(p, q) { return Math.atan2(p[1] - q[1], q[0] - p[0]) * 180 / Math.PI; }
  // cung đánh dấu góc tại p: từ hướng a1 quay ngược chiều kim đồng hồ d độ
  function arc(p, a1, d, s, r) {
    r = r || 15;
    var p1 = pol(p, a1, r), p2 = pol(p, a1 + d, r);
    var o = '<path d="M' + f(p1[0]) + ' ' + f(p1[1]) + ' A' + r + ' ' + r + ' 0 ' + (d > 180 ? 1 : 0) + ' 0 ' + f(p2[0]) + ' ' + f(p2[1]) + '" fill="none" stroke="' + RED + '" stroke-width="1.3"/>';
    if (s) o += tx(pol(p, a1 + d / 2, r + 14), s, RED, 11);
    return o;
  }
  // góc q1–p–q2 (góc nhỏ hơn 180°)
  function ang(p, q1, q2, s, r) {
    var a1 = dir(p, q1), a2 = dir(p, q2), d = ((a2 - a1) % 360 + 360) % 360;
    if (d > 180) { a1 = a2; d = 360 - d; }
    return arc(p, a1, d, s, r);
  }
  // kí hiệu góc vuông giữa hướng a và a + 90
  function sq(p, a) {
    var k = 8, u = pol(p, a, k), v = pol(p, a + 90, k), w = [u[0] + v[0] - p[0], u[1] + v[1] - p[1]];
    return '<path d="M' + f(u[0]) + ' ' + f(u[1]) + ' L' + f(w[0]) + ' ' + f(w[1]) + ' L' + f(v[0]) + ' ' + f(v[1]) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
  }

  // Hai đường thẳng song song nằm ngang (xy ở trên, x'y' ở dưới) bị các cát tuyến cắt.
  // cut = { th: góc (độ) giữa tia phải của đường ngang và phần trên cát tuyến, x: hoành độ giữa,
  //         P, Q: tên giao điểm trên/dưới, e: [tên đầu trên, tên đầu dưới],
  //         m: [[0 = điểm trên | 1 = điểm dưới, góc phần tư 1..4, "nhãn"]], rt: [[0|1, q]] góc vuông, pl: [q nhãn điểm trên, q nhãn điểm dưới] }
  // Góc phần tư tại một giao điểm: 1 = giữa tia phải và phần trên cát tuyến; 2 = phần trên cát tuyến và tia trái; 3 = tia trái và phần dưới; 4 = phần dưới và tia phải.
  function par(o) {
    var y1 = 50, y2 = 120, h = 170, b = '', P = {}, top = o.top || ['x', 'y'], bot = o.bot || ['x′', 'y′'];
    b += ln([10, y1], [W - 10, y1]) + ln([10, y2], [W - 10, y2]);
    b += tx([16, y1 - 11], top[0]) + tx([W - 16, y1 - 11], top[1]) + tx([16, y2 - 11], bot[0]) + tx([W - 16, y2 - 11], bot[1]);
    (o.cuts || []).forEach(function (c) {
      var th = c.th, t = th * Math.PI / 180, k = Math.cos(t) / Math.sin(t);
      var cx = c.x || W / 2, A = [cx + (y2 - y1) / 2 * k, y1], B = [cx - (y2 - y1) / 2 * k, y2];
      var e1 = [A[0] + 36 * k, y1 - 36], e2 = [B[0] - 36 * k, y2 + 36];
      var en = c.e || ['z', 'z′'];
      b += ln(e1, e2) + tx(pol(e1, th, 9), en[0]) + tx(pol(e2, th + 180, 9), en[1]);
      P[c.P || 'A'] = A; P[c.Q || 'B'] = B;
      var st = [0, th, 180, 180 + th], wd = [th, 180 - th, th, 180 - th];
      (c.m || []).forEach(function (m) { b += arc(m[0] ? B : A, st[m[1] - 1], wd[m[1] - 1], m[2]); });
      (c.rt || []).forEach(function (m) { b += sq(m[0] ? B : A, st[m[1] - 1]); });
      var pl = c.pl || [2, 4];
      [[A, pl[0], c.P || 'A'], [B, pl[1], c.Q || 'B']].forEach(function (z) {
        b += dot(z[0]) + tx(pol(z[0], st[z[1] - 1] + wd[z[1] - 1] / 2, 13), z[2]);
      });
    });
    // tia xuất phát từ một giao điểm phía trên, đi xuống cắt đường dưới
    (o.rays || []).forEach(function (r) {
      var A = P[r.from], len = (y2 - A[1]) / -Math.sin(r.ang * Math.PI / 180), H = pol(A, r.ang, len), E = pol(A, r.ang, len + 30);
      b += ln(A, E) + dot(H) + tx([H[0] + 11, H[1] + 12], r.name) + tx(pol(E, r.ang, 9), r.end);
      P[r.name] = H;
    });
    return svg(h, b);
  }

  // Tam giác ABC (đáy BC nằm ngang) có B, C cho trước; t: vẽ MN // BC với AM = t·AB; xy: vẽ đường thẳng xy qua A song song BC
  // m: [[đỉnh, điểm 1, điểm 2, "nhãn"]]
  function tri(o) {
    var L = 240, tB = Math.tan(o.B * Math.PI / 180), tC = Math.tan(o.C * Math.PI / 180);
    var ax = L * tC / (tB + tC), ay = ax * tB, s = Math.min(1, 130 / ay), top = 28;
    var X = function (x, y) { return [40 + x * s, top + (ay - y) * s]; };
    var P = { A: X(ax, ay), B: X(0, 0), C: X(L, 0) }, h = top + ay * s + 28, b = '';
    b += ln(P.A, P.B) + ln(P.B, P.C) + ln(P.C, P.A);
    if (o.t) {
      P.M = [P.A[0] + o.t * (P.B[0] - P.A[0]), P.A[1] + o.t * (P.B[1] - P.A[1])];
      P.N = [P.A[0] + o.t * (P.C[0] - P.A[0]), P.A[1] + o.t * (P.C[1] - P.A[1])];
      b += ln(P.M, P.N);
    }
    if (o.xy) {
      P.x = [P.A[0] - 95, P.A[1]]; P.y = [P.A[0] + 95, P.A[1]];
      b += ln(P.x, P.y) + tx([P.x[0] - 8, P.x[1]], 'x') + tx([P.y[0] + 8, P.y[1]], 'y');
    }
    (o.m || []).forEach(function (m) { b += ang(P[m[0]], P[m[1]], P[m[2]], m[3]); });
    var off = { A: [0, -12], B: [-10, 8], C: [10, 8], M: [-12, -3], N: [12, -3] };
    ['A', 'B', 'C'].concat(o.t ? ['M', 'N'] : []).forEach(function (k) { b += dot(P[k]) + tx([P[k][0] + off[k][0], P[k][1] + off[k][1]], k); });
    return svg(h, b);
  }

  // "Đường gấp khúc" giữa hai tia song song cùng hướng sang phải: A ở dưới (tia Ax), D ở trên (tia Dy),
  // a = góc xAC, b = góc CDy; điểm C tự tính. n: [tên A, tên D, tên C]; r: [tên tia dưới, tên tia trên];
  // mA, mD, mC: nhãn góc tại A, D, C; perp: tên đường thẳng vuông góc với hai tia (nếu có)
  function zig(o) {
    var h0 = 110, ra = o.a * Math.PI / 180, rb = -o.b * Math.PI / 180;
    var s = h0 * Math.cos(rb) / Math.sin(ra - rb), cx = s * Math.cos(ra), cy = s * Math.sin(ra);
    var ox = 50 - Math.min(0, cx), Y = function (y) { return 145 - y; };
    var n = o.n || ['A', 'D', 'C'], r = o.r || ['x', 'y'];
    var A = [ox, Y(0)], D = [ox, Y(h0)], C = [ox + cx, Y(cy)], Ex = [W - 20, A[1]], Ey = [W - 20, D[1]], b = '';
    b += ln(A, Ex) + ln(D, Ey) + ln(A, C) + ln(C, D);
    b += tx([W - 26, A[1] - 11], r[0]) + tx([W - 26, D[1] - 11], r[1]);
    if (o.perp) {
      var X = W - 60;
      b += ln([X, 12], [X, 162]) + tx([X + 10, 18], o.perp) + sq([X, A[1]], 90) + sq([X, D[1]], 90);
    }
    if (o.mA) b += ang(A, Ex, C, o.mA);
    if (o.mD) b += ang(D, Ey, C, o.mD);
    if (o.mC) b += ang(C, A, D, o.mC);
    b += dot(A) + tx([A[0] - 11, A[1] + 9], n[0]) + dot(D) + tx([D[0] - 11, D[1] - 9], n[1]);
    b += dot(C) + tx([C[0] + (cx > 0 ? 13 : -13), C[1]], n[2]);
    return svg(170, b);
  }

  // Tiên đề Euclid: qua M chỉ có một đường thẳng b song song với a
  function euc() {
    var M = [165, 55], b = '';
    b += ln([15, 125], [305, 125]) + tx([296, 112], 'a');
    b += ln([15, 55], [305, 55], RED) + tx([296, 42], 'b', RED);
    b += ln(pol(M, 18, 150), pol(M, 198, 150), null, true) + ln(pol(M, -16, 155), pol(M, 164, 155), null, true);
    b += dot(M) + tx([M[0] - 2, M[1] - 13], 'M');
    return svg(160, b);
  }

  var STD = "Cho $xy \\parallel x'y'$. Đường thẳng $zz'$ cắt $xy$ tại $A$ và cắt $x'y'$ tại $B$ (tia $Az$ không chứa $B$; $x$ và $x'$ nằm cùng phía đối với $zz'$, như hình).";
  var ZTXT = "Cho hình vẽ: $Ax \\parallel Dy$, hai tia $Ax$ và $Dy$ cùng hướng; điểm $C$ nằm giữa hai đường thẳng $Ax$, $Dy$ và cùng phía với hai tia đó đối với đường thẳng $AD$.";
  var ZSOL = "Qua $C$ kẻ đường thẳng $mn \\parallel Ax$ (tia $Cm$ ngược hướng với tia $Ax$). Vì $Ax \\parallel Dy$ nên $mn \\parallel Dy$. " +
    "Khi đó $\\widehat{ACm} = \\widehat{xAC}$ và $\\widehat{mCD} = \\widehat{CDy}$ (các cặp góc so le trong), nên $\\widehat{ACD} = \\widehat{xAC} + \\widehat{CDy}$.";

  registerLesson({
    id: "c3-b10",
    chapter: 3,
    kind: "lesson",
    title: "Bài 10. Tiên đề Euclid. Tính chất của hai đường thẳng song song",
    sgkPages: [51, 54],
    sbtPages: [41, 44],
    objectives: [
      "Nhận biết tiên đề Euclid về đường thẳng song song",
      "Mô tả tính chất của hai đường thẳng song song (góc so le trong, góc đồng vị bằng nhau)",
      "Vận dụng tính chất để tính số đo góc và giải thích hai đường thẳng vuông góc, song song"
    ],

    theory: [
      {
        heading: "1. Tiên đề Euclid về đường thẳng song song",
        html: "<b>Tiên đề Euclid:</b> Qua một điểm ở ngoài một đường thẳng, <b>chỉ có một</b> đường thẳng song song với đường thẳng đó." +
          euc() +
          "<ul><li>Nếu điểm $M$ nằm ngoài đường thẳng $a$ thì đường thẳng $b$ đi qua $M$ và song song với $a$ là <b>duy nhất</b>. Mọi đường thẳng khác đi qua $M$ (nét đứt) đều cắt $a$.</li>" +
          "<li>Hệ quả: nếu hai đường thẳng cùng đi qua $M$ và cùng song song với $a$ thì chúng <b>trùng nhau</b>.</li>" +
          "<li>Hệ quả: nếu một đường thẳng <b>cắt</b> một trong hai đường thẳng song song thì nó cũng cắt đường thẳng còn lại.</li></ul>"
      },
      {
        heading: "2. Tính chất của hai đường thẳng song song",
        html: "Nếu một đường thẳng cắt hai đường thẳng <b>song song</b> thì:" +
          "<ul><li>hai góc <b>so le trong</b> bằng nhau;</li><li>hai góc <b>đồng vị</b> bằng nhau.</li></ul>" +
          par({ cuts: [{ th: 60, m: [[0, 3, '60°'], [1, 1, '60°'], [1, 3, '60°']] }] }) +
          "Trong hình ($xy \\parallel x'y'$): $\\widehat{xAB} = \\widehat{ABy'}$ (so le trong), $\\widehat{xAB} = \\widehat{x'Bz'}$ (đồng vị)." +
          "<br>Kết hợp với <b>góc kề bù</b> (tổng $180^\\circ$) và <b>góc đối đỉnh</b> (bằng nhau), ta tính được cả 8 góc khi biết một góc. " +
          "Đặc biệt, hai góc <b>trong cùng phía</b> (như $\\widehat{xAB}$ và $\\widehat{ABx'}$) có tổng bằng $180^\\circ$."
      },
      {
        heading: "3. Hai nhận xét quan trọng",
        html: "<ul><li>Một đường thẳng <b>vuông góc</b> với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia: $a \\parallel b,\\ c \\perp a \\Rightarrow c \\perp b$.</li>" +
          "<li>Hai đường thẳng <b>phân biệt</b> cùng song song với một đường thẳng thứ ba thì chúng song song với nhau: $a \\parallel c,\\ b \\parallel c \\Rightarrow a \\parallel b$.</li></ul>"
      },
      {
        heading: "4. Phân biệt tính chất và dấu hiệu nhận biết",
        html: "<ul><li><b>Dấu hiệu nhận biết</b> (Bài 9): biết cặp góc so le trong (hoặc đồng vị) bằng nhau $\\Rightarrow$ hai đường thẳng song song.</li>" +
          "<li><b>Tính chất</b> (Bài 10): biết hai đường thẳng song song $\\Rightarrow$ các cặp góc so le trong, đồng vị bằng nhau.</li></ul>" +
          "Khi làm bài, phải biết chắc hai đường thẳng song song (đề cho, hoặc đã chứng minh bằng dấu hiệu) rồi mới dùng tính chất."
      }
    ],

    skills: [
      "<b>Tính góc:</b> xác định cặp góc cần dùng là so le trong hay đồng vị (với hai đường thẳng song song) rồi suy ra chúng bằng nhau; kết hợp góc kề bù ($180^\\circ$) và góc đối đỉnh để đi tới góc cần tìm.",
      "<b>Hai góc trong cùng phía</b> tạo bởi một đường thẳng cắt hai đường thẳng song song luôn có tổng $180^\\circ$ (suy ra từ góc so le trong và góc kề bù).",
      "<b>Bài hai bước:</b> trước hết dùng dấu hiệu nhận biết để chứng tỏ hai đường thẳng song song (hoặc cùng vuông góc với đường thẳng thứ ba), sau đó mới dùng tính chất để tính góc.",
      "<b>Góc có đỉnh nằm giữa hai đường thẳng song song</b> (hình gấp khúc): kẻ thêm qua đỉnh đó một đường thẳng song song với hai đường thẳng đã cho, rồi dùng góc so le trong hoặc trong cùng phía.",
      "<b>Dùng tiên đề Euclid:</b> để chứng tỏ ba điểm thẳng hàng hoặc hai đường thẳng trùng nhau, chỉ ra chúng cùng đi qua một điểm và cùng song song với một đường thẳng.",
      "<b>Lỗi hay gặp:</b> dùng tính chất khi chưa biết hai đường thẳng song song; nhầm góc so le trong với góc đồng vị; cho rằng hai góc trong cùng phía bằng nhau (thực ra chúng bù nhau); nhầm \"chỉ có một đường thẳng song song\" thành \"có duy nhất một đường thẳng song song với một đường thẳng cho trước\" (thiếu điều kiện đi qua một điểm)."
    ],

    examples: [
      {
        q: STD + " Biết $\\widehat{zAy} = 65^\\circ$. Tính $\\widehat{ABy'}$, $\\widehat{ABx'}$ và $\\widehat{xAB}$." +
          par({ cuts: [{ th: 65, m: [[0, 1, '65°']] }] }),
        solution: "• Vì $xy \\parallel x'y'$ nên $\\widehat{ABy'} = \\widehat{zAy} = 65^\\circ$ (hai góc đồng vị).<br>" +
          "• $\\widehat{ABx'}$ và $\\widehat{ABy'}$ kề bù nên $\\widehat{ABx'} = 180^\\circ - 65^\\circ = 115^\\circ$.<br>" +
          "• $\\widehat{xAB} = \\widehat{ABy'} = 65^\\circ$ (hai góc so le trong). (Cũng có thể dùng: $\\widehat{xAB}$ và $\\widehat{zAy}$ đối đỉnh.)"
      },
      {
        q: "Tam giác $ABC$ có $\\widehat{ABC} = 55^\\circ$. Điểm $M$ thuộc $AB$, điểm $N$ thuộc $AC$ sao cho $MN \\parallel BC$ và $\\widehat{MNC} = 140^\\circ$. Tính $\\widehat{BMN}$ và $\\widehat{ACB}$." +
          tri({ B: 55, C: 40, t: 0.45, m: [['B', 'A', 'C', '55°'], ['N', 'M', 'C', '140°']] }),
        solution: "• Vì $MN \\parallel BC$ nên $\\widehat{AMN} = \\widehat{ABC} = 55^\\circ$ (đồng vị). Mà $\\widehat{AMN}$ và $\\widehat{BMN}$ kề bù nên $\\widehat{BMN} = 180^\\circ - 55^\\circ = 125^\\circ$.<br>" +
          "• $\\widehat{ANM}$ và $\\widehat{MNC}$ kề bù nên $\\widehat{ANM} = 180^\\circ - 140^\\circ = 40^\\circ$. Vì $MN \\parallel BC$ nên $\\widehat{ACB} = \\widehat{ANM} = 40^\\circ$ (đồng vị)."
      },
      {
        q: ZTXT + " Biết $\\widehat{xAC} = 40^\\circ$, $\\widehat{CDy} = 35^\\circ$. Tính $\\widehat{ACD}$." +
          zig({ a: 40, b: 35, mA: '40°', mD: '35°', mC: '?' }),
        solution: ZSOL + "<br>Vậy $\\widehat{ACD} = 40^\\circ + 35^\\circ = 75^\\circ$."
      },
      {
        q: "Cho $a \\parallel b$. Đường thẳng $c$ vuông góc với $a$ tại $A$. Giải thích vì sao $c$ cắt $b$ và $c \\perp b$." +
          par({ top: ['', 'a'], bot: ['', 'b'], cuts: [{ th: 90, e: ['c', ''], rt: [[0, 4]], pl: [2, 2] }] }),
        solution: "• $c$ cắt $a$ tại $A$, mà $a \\parallel b$ nên $c$ cũng cắt $b$ (hệ quả của tiên đề Euclid); gọi giao điểm là $B$.<br>" +
          "• Góc tạo bởi $c$ và $b$ tại $B$ đồng vị với góc tạo bởi $c$ và $a$ tại $A$, nên bằng $90^\\circ$. Vậy $c \\perp b$."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.51 – Tiên đề Euclid",
            q: "Theo tiên đề Euclid, qua một điểm $M$ nằm ngoài đường thẳng $a$ có bao nhiêu đường thẳng song song với $a$?",
            options: ["Không có đường thẳng nào", "Chỉ có một", "Đúng hai", "Vô số"],
            answer: 1,
            explain: "Tiên đề Euclid: qua một điểm ở ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó."
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.52 – Tính chất",
            q: "Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong",
            options: ["bằng nhau", "bù nhau", "phụ nhau", "đối đỉnh"],
            answer: 0,
            explain: "Tính chất của hai đường thẳng song song: hai góc so le trong bằng nhau, hai góc đồng vị bằng nhau."
          },
          {
            id: "d1q3", level: "de", source: "SGK Bài 10 – BT 3.17",
            q: STD + " Biết $\\widehat{xAB} = 60^\\circ$. Số đo $\\widehat{ABy'}$ là" +
              par({ cuts: [{ th: 60, m: [[0, 3, '60°']] }] }),
            options: ["$120^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"],
            answer: 2,
            explain: "$\\widehat{xAB}$ và $\\widehat{ABy'}$ là hai góc so le trong, mà $xy \\parallel x'y'$ nên $\\widehat{ABy'} = \\widehat{xAB} = 60^\\circ$."
          },
          {
            id: "d1q4", level: "de", source: "SGK tr.53 – Nhận xét",
            q: "Cho $a \\parallel b$ và đường thẳng $c \\perp a$. Khẳng định nào sau đây đúng?",
            options: ["$c \\parallel b$", "$c$ không cắt $b$", "$c$ trùng với $b$", "$c \\perp b$"],
            answer: 3,
            explain: "Một đường thẳng vuông góc với một trong hai đường thẳng song song thì cũng vuông góc với đường thẳng kia, nên $c \\perp b$."
          },
          {
            id: "d1q5", level: "vua", source: "SGK tr.52 – Ví dụ 2",
            q: STD + " Biết $\\widehat{zAy} = 70^\\circ$. Số đo $\\widehat{y'Bz'}$ là" +
              par({ cuts: [{ th: 70, m: [[0, 1, '70°']] }] }),
            options: ["$70^\\circ$", "$110^\\circ$", "$20^\\circ$", "$140^\\circ$"],
            answer: 1,
            explain: "$\\widehat{ABy'} = \\widehat{zAy} = 70^\\circ$ (đồng vị). $\\widehat{y'Bz'}$ kề bù với $\\widehat{ABy'}$ nên $\\widehat{y'Bz'} = 180^\\circ - 70^\\circ = 110^\\circ$. (Hoặc: $\\widehat{y'Bz'}$ đồng vị với $\\widehat{yAB} = 110^\\circ$.)"
          },
          {
            id: "d1q6", level: "vua", source: "SGK tr.53 – Luyện tập 2",
            q: "Tam giác $ABC$ có $\\widehat{ABC} = 65^\\circ$. Điểm $M$ thuộc cạnh $AB$, điểm $N$ thuộc cạnh $AC$ sao cho $MN \\parallel BC$. Số đo $\\widehat{AMN}$ là" +
              tri({ B: 65, C: 45, t: 0.42, m: [['B', 'A', 'C', '65°']] }),
            options: ["$65^\\circ$", "$115^\\circ$", "$25^\\circ$", "$130^\\circ$"],
            answer: 0,
            explain: "$MN \\parallel BC$, đường thẳng $AB$ cắt chúng tạo thành cặp góc đồng vị $\\widehat{AMN}$ và $\\widehat{ABC}$, nên $\\widehat{AMN} = 65^\\circ$."
          },
          {
            id: "d1q7", level: "vua", source: "SBT Bài 10 – BT 3.18",
            q: STD + " Biết $\\widehat{yAB} = 125^\\circ$. Số đo $\\widehat{ABy'}$ là" +
              par({ cuts: [{ th: 55, m: [[0, 4, '125°']] }] }),
            options: ["$125^\\circ$", "$65^\\circ$", "$35^\\circ$", "$55^\\circ$"],
            answer: 3,
            explain: "$\\widehat{yAB}$ và $\\widehat{ABy'}$ là hai góc trong cùng phía nên bù nhau: $\\widehat{ABy'} = 180^\\circ - 125^\\circ = 55^\\circ$. (Cách khác: $\\widehat{ABx'} = \\widehat{yAB} = 125^\\circ$ (so le trong), rồi dùng góc kề bù.)"
          },
          {
            id: "d1q8", level: "vua", source: "SBT Bài 10 – BT 3.20",
            q: "Cho điểm $M$ nằm ngoài đường thẳng $d$. Đường thẳng $a$ và đường thẳng $b$ cùng đi qua $M$ và cùng song song với $d$. Khi đó",
            options: ["$a \\perp b$", "$a$ và $b$ cắt nhau tại $M$, không trùng nhau", "$a$ trùng với $b$", "$a \\parallel b$"],
            answer: 2,
            explain: "Theo tiên đề Euclid, qua $M$ chỉ có một đường thẳng song song với $d$, nên $a$ và $b$ trùng nhau."
          },
          {
            id: "d1q9", level: "kho", source: "SBT Bài 10 – BT 3.26",
            q: ZTXT + " Biết $\\widehat{xAC} = 35^\\circ$, $\\widehat{CDy} = 45^\\circ$. Số đo $\\widehat{ACD}$ là" +
              zig({ a: 35, b: 45, mA: '35°', mD: '45°', mC: '?' }),
            options: ["$10^\\circ$", "$80^\\circ$", "$100^\\circ$", "$45^\\circ$"],
            answer: 1,
            explain: ZSOL + " Vậy $\\widehat{ACD} = 35^\\circ + 45^\\circ = 80^\\circ$."
          },
          {
            id: "d1q10", level: "kho", source: "mới",
            q: STD + " Biết $\\widehat{xAB} - \\widehat{ABx'} = 40^\\circ$. Số đo $\\widehat{xAB}$ là" +
              par({ cuts: [{ th: 110 }] }),
            options: ["$70^\\circ$", "$40^\\circ$", "$140^\\circ$", "$110^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xAB}$ và $\\widehat{ABx'}$ là hai góc trong cùng phía nên $\\widehat{xAB} + \\widehat{ABx'} = 180^\\circ$. Kết hợp hiệu bằng $40^\\circ$: $\\widehat{xAB} = (180^\\circ + 40^\\circ) : 2 = 110^\\circ$."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SBT Bài 10 – BT 3.19 (biến đổi)", maxPoints: 3,
            q: "Cho hình vẽ: đường thẳng $zz'$ cắt hai đường thẳng $xy$, $x'y'$ lần lượt tại $A$, $B$; đường thẳng $mn$ cắt $xy$ tại $C$ ($C$ thuộc tia $Ay$) và cắt $x'y'$ tại $D$. Biết $\\widehat{zAy} = 75^\\circ$, $\\widehat{ABy'} = 75^\\circ$ và $\\widehat{yCD} = 110^\\circ$." +
              par({ cuts: [{ th: 75, x: 100, m: [[0, 1, '75°'], [1, 1, '75°']] }, { th: 70, x: 215, P: 'C', Q: 'D', e: ['m', 'n'], m: [[0, 4, '110°']] }] }) +
              "a) Giải thích vì sao $xy \\parallel x'y'$.<br>b) Tính số đo các góc $\\widehat{CDx'}$ và $\\widehat{CDy'}$.",
            modelAnswer: "a) $\\widehat{zAy}$ và $\\widehat{ABy'}$ ở vị trí đồng vị và bằng nhau ($= 75^\\circ$), nên $xy \\parallel x'y'$ (dấu hiệu nhận biết hai đường thẳng song song).<br>" +
              "b) Vì $xy \\parallel x'y'$ nên $\\widehat{CDx'} = \\widehat{yCD} = 110^\\circ$ (hai góc so le trong).<br>" +
              "$\\widehat{CDy'}$ kề bù với $\\widehat{CDx'}$ nên $\\widehat{CDy'} = 180^\\circ - 110^\\circ = 70^\\circ$.",
            rubric: [
              { pts: 1, text: "Câu a: chỉ ra cặp góc đồng vị bằng nhau và kết luận $xy \\parallel x'y'$." },
              { pts: 1, text: "Câu b: $\\widehat{CDx'} = 110^\\circ$, nêu đúng lí do (so le trong, dùng $xy \\parallel x'y'$)." },
              { pts: 1, text: "Câu b: $\\widehat{CDy'} = 70^\\circ$ (góc kề bù)." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SGK tr.52 – Luyện tập 1",
            q: "Phát biểu nào sau đây diễn đạt đúng nội dung của tiên đề Euclid?",
            options: [
              "Có duy nhất một đường thẳng song song với một đường thẳng cho trước",
              "Qua điểm $M$ nằm ngoài đường thẳng $a$ có vô số đường thẳng song song với $a$",
              "Qua điểm $M$ nằm ngoài đường thẳng $a$ chỉ có một đường thẳng song song với $a$",
              "Qua điểm $M$ nằm ngoài đường thẳng $a$ có ít nhất hai đường thẳng song song với $a$"
            ],
            answer: 2,
            explain: "Tiên đề Euclid nói về đường thẳng đi qua một điểm ở ngoài đường thẳng đã cho: chỉ có một. Phát biểu \"có duy nhất một đường thẳng song song với một đường thẳng cho trước\" sai vì thiếu điều kiện đi qua một điểm (thực ra có vô số đường thẳng song song với một đường thẳng)."
          },
          {
            id: "d2q2", level: "de", source: "SGK tr.52 – Tính chất",
            q: "Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc đồng vị",
            options: ["bù nhau", "bằng nhau", "phụ nhau", "kề bù"],
            answer: 1,
            explain: "Một đường thẳng cắt hai đường thẳng song song thì hai góc đồng vị bằng nhau (và hai góc so le trong bằng nhau)."
          },
          {
            id: "d2q3", level: "de", source: "SGK tr.52 – Ví dụ 2",
            q: STD + " Biết $\\widehat{zAx} = 130^\\circ$. Số đo $\\widehat{ABx'}$ là" +
              par({ cuts: [{ th: 50, m: [[0, 2, '130°']], pl: [1, 4] }] }),
            options: ["$50^\\circ$", "$40^\\circ$", "$140^\\circ$", "$130^\\circ$"],
            answer: 3,
            explain: "$\\widehat{zAx}$ và $\\widehat{ABx'}$ là hai góc đồng vị, mà $xy \\parallel x'y'$ nên $\\widehat{ABx'} = \\widehat{zAx} = 130^\\circ$."
          },
          {
            id: "d2q4", level: "de", source: "SGK tr.52 – Chú ý",
            q: "Cho $a \\parallel b$. Đường thẳng $c$ cắt đường thẳng $a$. Khẳng định nào sau đây đúng?",
            options: ["$c$ cắt $b$", "$c \\parallel b$", "$c$ trùng với $b$", "$c$ không có điểm chung với $b$"],
            answer: 0,
            explain: "Từ tiên đề Euclid: một đường thẳng cắt một trong hai đường thẳng song song thì cũng cắt đường thẳng còn lại. Nếu $c \\parallel b$ thì qua giao điểm của $c$ và $a$ có hai đường thẳng $a$, $c$ cùng song song với $b$ – vô lí."
          },
          {
            id: "d2q5", level: "vua", source: "SGK Bài 10 – BT 3.17",
            q: STD + " Biết $\\widehat{y'Bz'} = 122^\\circ$. Số đo $\\widehat{xAB}$ là" +
              par({ cuts: [{ th: 58, m: [[1, 4, '122°']], pl: [2, 2] }] }),
            options: ["$122^\\circ$", "$58^\\circ$", "$32^\\circ$", "$68^\\circ$"],
            answer: 1,
            explain: "$\\widehat{yAB} = \\widehat{y'Bz'} = 122^\\circ$ (đồng vị). $\\widehat{xAB}$ kề bù với $\\widehat{yAB}$ nên $\\widehat{xAB} = 180^\\circ - 122^\\circ = 58^\\circ$."
          },
          {
            id: "d2q6", level: "vua", source: "SGK tr.53 – Luyện tập 2",
            q: "Tam giác $ABC$ có $\\widehat{ACB} = 50^\\circ$. Điểm $M$ thuộc cạnh $AB$, điểm $N$ thuộc cạnh $AC$ sao cho $MN \\parallel BC$. Số đo $\\widehat{MNC}$ là" +
              tri({ B: 70, C: 50, t: 0.45, m: [['C', 'A', 'B', '50°']] }),
            options: ["$50^\\circ$", "$40^\\circ$", "$130^\\circ$", "$140^\\circ$"],
            answer: 2,
            explain: "$\\widehat{ANM} = \\widehat{ACB} = 50^\\circ$ (đồng vị, vì $MN \\parallel BC$). $\\widehat{MNC}$ kề bù với $\\widehat{ANM}$ nên $\\widehat{MNC} = 180^\\circ - 50^\\circ = 130^\\circ$."
          },
          {
            id: "d2q7", level: "vua", source: "SGK tr.53 – Luyện tập 2 (câu 2)",
            q: "Cho $a \\parallel b$. Đường thẳng $c$ vuông góc với $a$ tại $A$ và cắt $b$ tại $B$. Góc tạo bởi hai đường thẳng $c$ và $b$ bằng",
            options: ["$45^\\circ$", "$180^\\circ$", "Không xác định được", "$90^\\circ$"],
            answer: 3,
            explain: "Đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường thẳng kia, nên $c \\perp b$: góc tạo bởi $c$ và $b$ bằng $90^\\circ$."
          },
          {
            id: "d2q8", level: "vua", source: "mới",
            q: STD + " Biết $\\widehat{xAB} = 90^\\circ$. Trong 8 góc tạo thành tại $A$ và $B$,",
            options: ["Tám góc tạo thành đều là góc vuông", "Chỉ có hai góc là góc vuông", "Chỉ có bốn góc là góc vuông", "Không có thêm góc vuông nào"],
            answer: 0,
            explain: "Tại $A$: các góc kề bù, đối đỉnh với góc $90^\\circ$ đều bằng $90^\\circ$, nên 4 góc tại $A$ vuông. Ta có $zz' \\perp xy$ mà $xy \\parallel x'y'$ nên $zz' \\perp x'y'$: 4 góc tại $B$ cũng vuông."
          },
          {
            id: "d2q9", level: "kho", source: "mới",
            q: STD + " Biết $\\widehat{zAy} = 3 \\cdot \\widehat{zAx}$. Số đo $\\widehat{ABy'}$ là" +
              par({ cuts: [{ th: 135 }] }),
            options: ["$45^\\circ$", "$135^\\circ$", "$60^\\circ$", "$120^\\circ$"],
            answer: 1,
            explain: "$\\widehat{zAx} + \\widehat{zAy} = 180^\\circ$ (kề bù) nên $4 \\cdot \\widehat{zAx} = 180^\\circ$, $\\widehat{zAx} = 45^\\circ$, $\\widehat{zAy} = 135^\\circ$. $\\widehat{ABy'} = \\widehat{zAy} = 135^\\circ$ (đồng vị)."
          },
          {
            id: "d2q10", level: "kho", source: "SBT Bài 10 – BT 3.26",
            q: ZTXT + " Biết $\\widehat{xAC} = 40^\\circ$, $\\widehat{ACD} = 100^\\circ$. Số đo $\\widehat{CDy}$ là" +
              zig({ a: 40, b: 60, mA: '40°', mC: '100°', mD: '?' }),
            options: ["$140^\\circ$", "$40^\\circ$", "$60^\\circ$", "$80^\\circ$"],
            answer: 2,
            explain: ZSOL + " Do đó $\\widehat{CDy} = \\widehat{ACD} - \\widehat{xAC} = 100^\\circ - 40^\\circ = 60^\\circ$."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SGK tr.53 – Luyện tập 2 (biến đổi)", maxPoints: 1.5,
            q: "Tam giác $ABC$ có $\\widehat{ABC} = 70^\\circ$. Điểm $M$ thuộc cạnh $AB$, điểm $N$ thuộc cạnh $AC$ sao cho $MN \\parallel BC$ và $\\widehat{MNC} = 135^\\circ$. Tính số đo các góc $\\widehat{BMN}$ và $\\widehat{ACB}$." +
              tri({ B: 70, C: 45, t: 0.45, m: [['B', 'A', 'C', '70°'], ['N', 'M', 'C', '135°']] }),
            modelAnswer: "• Vì $MN \\parallel BC$ nên $\\widehat{AMN} = \\widehat{ABC} = 70^\\circ$ (đồng vị). $\\widehat{BMN}$ kề bù với $\\widehat{AMN}$ nên $\\widehat{BMN} = 180^\\circ - 70^\\circ = 110^\\circ$.<br>" +
              "• $\\widehat{ANM}$ kề bù với $\\widehat{MNC}$ nên $\\widehat{ANM} = 180^\\circ - 135^\\circ = 45^\\circ$. Vì $MN \\parallel BC$ nên $\\widehat{ACB} = \\widehat{ANM} = 45^\\circ$ (đồng vị).",
            rubric: [
              { pts: 0.5, text: "Nêu $\\widehat{AMN} = \\widehat{ABC} = 70^\\circ$ (đồng vị), hoặc dùng hai góc trong cùng phía bù nhau." },
              { pts: 0.25, text: "Tính đúng $\\widehat{BMN} = 110^\\circ$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{ANM} = 45^\\circ$ (kề bù) và nêu $\\widehat{ACB} = \\widehat{ANM}$ (đồng vị)." },
              { pts: 0.25, text: "Kết luận $\\widehat{ACB} = 45^\\circ$." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SBT Bài 10 – BT 3.25 (biến đổi)", maxPoints: 1.5,
            q: "Cho hình vẽ: hai tia $Ax$ và $By$ cùng hướng sang phải ($A$ ở dưới, $B$ ở trên); đường thẳng $c$ vuông góc với cả đường thẳng chứa tia $Ax$ và đường thẳng chứa tia $By$. Điểm $C$ nằm giữa hai đường thẳng đó, cùng phía với hai tia $Ax$, $By$ đối với đường thẳng $AB$, sao cho $\\widehat{xAC} = 35^\\circ$ và $\\widehat{yBC} = 25^\\circ$." +
              zig({ a: 35, b: 25, n: ['A', 'B', 'C'], r: ['x', 'y'], perp: 'c', mA: '35°', mD: '25°' }) +
              "a) Vì sao $Ax \\parallel By$?<br>b) Tính $\\widehat{ACB}$.",
            modelAnswer: "a) Hai đường thẳng chứa tia $Ax$ và tia $By$ cùng vuông góc với đường thẳng $c$ nên chúng song song với nhau: $Ax \\parallel By$.<br>" +
              "b) Qua $C$ kẻ đường thẳng $mn \\parallel Ax$ (tia $Cm$ ngược hướng với tia $Ax$). Vì $Ax \\parallel By$ nên $mn \\parallel By$.<br>" +
              "$\\widehat{ACm} = \\widehat{xAC} = 35^\\circ$ (so le trong, $mn \\parallel Ax$); $\\widehat{mCB} = \\widehat{yBC} = 25^\\circ$ (so le trong, $mn \\parallel By$).<br>" +
              "Tia $Cm$ nằm giữa hai tia $CA$, $CB$ nên $\\widehat{ACB} = \\widehat{ACm} + \\widehat{mCB} = 35^\\circ + 25^\\circ = 60^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Câu a: hai đường thẳng cùng vuông góc với $c$ nên song song." },
              { pts: 0.5, text: "Câu b: kẻ được đường thẳng qua $C$ song song với $Ax$ và suy ra nó song song với $By$." },
              { pts: 0.25, text: "Câu b: tính đúng hai góc thành phần $35^\\circ$ và $25^\\circ$ (so le trong)." },
              { pts: 0.25, text: "Câu b: kết luận $\\widehat{ACB} = 60^\\circ$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.53 – Nhận xét",
            q: "Khẳng định nào sau đây đúng?",
            options: [
              "Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì cắt nhau",
              "Một đường thẳng vuông góc với một trong hai đường thẳng song song thì song song với đường thẳng kia",
              "Qua một điểm ở ngoài một đường thẳng có hai đường thẳng song song với đường thẳng đó",
              "Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì song song với nhau"
            ],
            answer: 3,
            explain: "Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song với nhau. Đường thẳng vuông góc với một trong hai đường thẳng song song thì <b>vuông góc</b> (không phải song song) với đường kia; qua một điểm ngoài đường thẳng chỉ có <b>một</b> đường song song."
          },
          {
            id: "d3q2", level: "de", source: "SGK Bài 10 – BT 3.22",
            q: "Cho tam giác $ABC$. Qua đỉnh $A$ vẽ được bao nhiêu đường thẳng song song với $BC$?",
            options: ["$2$", "Vô số", "$1$", "$0$"],
            answer: 2,
            explain: "Điểm $A$ nằm ngoài đường thẳng $BC$; theo tiên đề Euclid, qua $A$ có một và chỉ một đường thẳng song song với $BC$."
          },
          {
            id: "d3q3", level: "de", source: "SGK Bài 10 – BT 3.17",
            q: STD + " Biết $\\widehat{ABy'} = 45^\\circ$. Số đo $\\widehat{xAB}$ là" +
              par({ cuts: [{ th: 45, m: [[1, 1, '45°']] }] }),
            options: ["$45^\\circ$", "$135^\\circ$", "$90^\\circ$", "$55^\\circ$"],
            answer: 0,
            explain: "$\\widehat{xAB}$ và $\\widehat{ABy'}$ là hai góc so le trong, mà $xy \\parallel x'y'$ nên $\\widehat{xAB} = 45^\\circ$."
          },
          {
            id: "d3q4", level: "de", source: "SGK tr.52 – Tính chất",
            q: "Một đường thẳng cắt hai đường thẳng song song tạo thành một cặp góc đồng vị, trong đó một góc bằng $112^\\circ$. Góc còn lại bằng",
            options: ["$68^\\circ$", "$112^\\circ$", "$78^\\circ$", "$22^\\circ$"],
            answer: 1,
            explain: "Hai góc đồng vị tạo bởi một đường thẳng cắt hai đường thẳng song song thì bằng nhau, nên góc còn lại bằng $112^\\circ$."
          },
          {
            id: "d3q5", level: "vua", source: "SGK tr.52 – Ví dụ 2",
            q: STD + " Biết $\\widehat{zAy} = 64^\\circ$. Số đo $\\widehat{ABx'}$ là" +
              par({ cuts: [{ th: 64, m: [[0, 1, '64°']] }] }),
            options: ["$64^\\circ$", "$26^\\circ$", "$116^\\circ$", "$126^\\circ$"],
            answer: 2,
            explain: "$\\widehat{ABy'} = \\widehat{zAy} = 64^\\circ$ (đồng vị). $\\widehat{ABx'}$ kề bù với $\\widehat{ABy'}$ nên $\\widehat{ABx'} = 180^\\circ - 64^\\circ = 116^\\circ$."
          },
          {
            id: "d3q6", level: "vua", source: "SGK tr.53 – Luyện tập 2",
            q: "Tam giác $ABC$ có điểm $M$ thuộc cạnh $AB$, điểm $N$ thuộc cạnh $AC$ sao cho $MN \\parallel BC$. Biết $\\widehat{AMN} = 72^\\circ$, $\\widehat{ANM} = 48^\\circ$. Tổng $\\widehat{ABC} + \\widehat{ACB}$ bằng" +
              tri({ B: 72, C: 48, t: 0.42, m: [['M', 'A', 'N', '72°'], ['N', 'A', 'M', '48°']] }),
            options: ["$60^\\circ$", "$180^\\circ$", "$90^\\circ$", "$120^\\circ$"],
            answer: 3,
            explain: "Vì $MN \\parallel BC$: $\\widehat{ABC} = \\widehat{AMN} = 72^\\circ$, $\\widehat{ACB} = \\widehat{ANM} = 48^\\circ$ (các cặp góc đồng vị). Tổng bằng $72^\\circ + 48^\\circ = 120^\\circ$."
          },
          {
            id: "d3q7", level: "vua", source: "SGK tr.53 – Luyện tập 2 (câu 2)",
            q: STD + " Biết $zz' \\perp xy$. Số đo $\\widehat{ABy'}$ là",
            options: ["$90^\\circ$", "$45^\\circ$", "$180^\\circ$", "$0^\\circ$"],
            answer: 0,
            explain: "$zz' \\perp xy$ và $xy \\parallel x'y'$ nên $zz' \\perp x'y'$, do đó $\\widehat{ABy'} = 90^\\circ$."
          },
          {
            id: "d3q8", level: "vua", source: "SBT Bài 10 – BT 3.18",
            q: STD + " Biết $\\widehat{xAB} = 74^\\circ$. Số đo $\\widehat{ABx'}$ là" +
              par({ cuts: [{ th: 74, m: [[0, 3, '74°']] }] }),
            options: ["$74^\\circ$", "$106^\\circ$", "$16^\\circ$", "$116^\\circ$"],
            answer: 1,
            explain: "$\\widehat{ABy'} = \\widehat{xAB} = 74^\\circ$ (so le trong). $\\widehat{ABx'}$ kề bù với $\\widehat{ABy'}$ nên $\\widehat{ABx'} = 106^\\circ$. (Hai góc trong cùng phía $\\widehat{xAB}$, $\\widehat{ABx'}$ bù nhau.)"
          },
          {
            id: "d3q9", level: "kho", source: "mới",
            q: STD + " Biết $\\widehat{xAB} + \\widehat{ABy'} = 100^\\circ$. Số đo $\\widehat{ABx'}$ là" +
              par({ cuts: [{ th: 50 }] }),
            options: ["$50^\\circ$", "$100^\\circ$", "$130^\\circ$", "$80^\\circ$"],
            answer: 2,
            explain: "$\\widehat{xAB} = \\widehat{ABy'}$ (so le trong) nên mỗi góc bằng $100^\\circ : 2 = 50^\\circ$. $\\widehat{ABx'}$ kề bù với $\\widehat{ABy'}$ nên $\\widehat{ABx'} = 180^\\circ - 50^\\circ = 130^\\circ$."
          },
          {
            id: "d3q10", level: "kho", source: "SBT Bài 10 – BT 3.26",
            q: ZTXT + " Biết $\\widehat{xAC} = 52^\\circ$ và $AC \\perp CD$. Số đo $\\widehat{CDy}$ là" +
              zig({ a: 52, b: 38, mA: '52°', mC: '90°', mD: '?' }),
            options: ["$52^\\circ$", "$128^\\circ$", "$142^\\circ$", "$38^\\circ$"],
            answer: 3,
            explain: ZSOL + " Mà $\\widehat{ACD} = 90^\\circ$ nên $\\widehat{CDy} = 90^\\circ - 52^\\circ = 38^\\circ$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SBT Bài 10 – BT 3.24 (biến đổi)", maxPoints: 2,
            q: STD + " Biết $\\widehat{zAy} = 60^\\circ$." +
              par({ cuts: [{ th: 60, m: [[0, 1, '60°']] }], rays: [{ from: 'A', ang: -60, name: 'H', end: 't' }] }) +
              "a) Tính $\\widehat{ABy'}$ và $\\widehat{ABx'}$.<br>b) Tia phân giác $At$ của góc $yAB$ cắt đường thẳng $x'y'$ tại $H$. Tính $\\widehat{AHB}$.",
            modelAnswer: "a) Vì $xy \\parallel x'y'$ nên $\\widehat{ABy'} = \\widehat{zAy} = 60^\\circ$ (đồng vị). $\\widehat{ABx'}$ kề bù với $\\widehat{ABy'}$ nên $\\widehat{ABx'} = 180^\\circ - 60^\\circ = 120^\\circ$.<br>" +
              "b) $\\widehat{yAB}$ kề bù với $\\widehat{zAy}$ nên $\\widehat{yAB} = 120^\\circ$. $At$ là tia phân giác của $\\widehat{yAB}$ nên $\\widehat{yAH} = 120^\\circ : 2 = 60^\\circ$.<br>" +
              "Vì $xy \\parallel x'y'$ nên $\\widehat{AHx'} = \\widehat{yAH} = 60^\\circ$ (so le trong). Điểm $B$ nằm trên tia $Hx'$ nên $\\widehat{AHB} = \\widehat{AHx'} = 60^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Câu a: $\\widehat{ABy'} = 60^\\circ$ (đồng vị)." },
              { pts: 0.5, text: "Câu a: $\\widehat{ABx'} = 120^\\circ$ (kề bù)." },
              { pts: 0.5, text: "Câu b: tính được $\\widehat{yAB} = 120^\\circ$ và $\\widehat{yAH} = 60^\\circ$ (tia phân giác)." },
              { pts: 0.5, text: "Câu b: dùng so le trong, kết luận $\\widehat{AHB} = 60^\\circ$." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SGK tr.51 – Ví dụ 1 (biến đổi)", maxPoints: 1,
            q: "Cho tam giác $ABC$. Qua $A$ vẽ đường thẳng $d$ song song với $BC$. Đường thẳng $d'$ đi qua $A$ và khác $d$. Dùng tiên đề Euclid, chứng tỏ rằng $d'$ cắt đường thẳng $BC$.",
            modelAnswer: "Giả sử $d'$ không cắt đường thẳng $BC$. Vì $A \\notin BC$ nên $d'$ khác $BC$, do đó $d' \\parallel BC$.<br>" +
              "Khi đó qua điểm $A$ nằm ngoài đường thẳng $BC$ có hai đường thẳng phân biệt $d$ và $d'$ cùng song song với $BC$, trái với tiên đề Euclid.<br>" +
              "Vậy $d'$ cắt đường thẳng $BC$.",
            rubric: [
              { pts: 0.5, text: "Lập luận: nếu $d'$ không cắt $BC$ thì $d' \\parallel BC$." },
              { pts: 0.5, text: "Chỉ ra mâu thuẫn với tiên đề Euclid (qua $A$ có hai đường thẳng song song với $BC$) và kết luận." }
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
            q: "Đường thẳng $c$ cắt hai đường thẳng song song $a$, $b$ tạo thành 8 góc (4 góc tại mỗi giao điểm). Biết một trong các góc đó bằng $40^\\circ$. Trong 8 góc có bao nhiêu góc bằng $140^\\circ$?",
            options: ["$2$", "$4$", "$6$", "$8$"],
            answer: 1,
            explain: "Tại mỗi giao điểm có 2 góc $40^\\circ$ (đối đỉnh) và 2 góc $140^\\circ$ (kề bù với góc $40^\\circ$). Nhờ tính chất góc đồng vị, góc tại giao điểm kia cũng như vậy. Vậy có $2 + 2 = 4$ góc bằng $140^\\circ$."
          },
          {
            id: "d4q2", level: "vua", source: "mới",
            q: "Một đường thẳng cắt hai đường thẳng song song. Hai góc trong cùng phía có số đo tỉ lệ với $2$ và $3$. Góc nhỏ hơn bằng",
            options: ["$72^\\circ$", "$108^\\circ$", "$36^\\circ$", "$60^\\circ$"],
            answer: 0,
            explain: "Hai góc trong cùng phía bù nhau (tổng $180^\\circ$). Chia $180^\\circ$ thành $2 + 3 = 5$ phần, mỗi phần $36^\\circ$. Góc nhỏ hơn $= 2 \\cdot 36^\\circ = 72^\\circ$."
          },
          {
            id: "d4q3", level: "kho", source: "SBT Bài 10 – BT 3.26",
            q: ZTXT + " Biết $AC \\perp CD$ và $\\widehat{xAC} = 2 \\cdot \\widehat{CDy}$. Số đo $\\widehat{xAC}$ là" +
              zig({ a: 60, b: 30, mC: '90°' }),
            options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
            answer: 2,
            explain: ZSOL + " Nên $\\widehat{xAC} + \\widehat{CDy} = 90^\\circ$, mà $\\widehat{xAC} = 2 \\cdot \\widehat{CDy}$ nên $3 \\cdot \\widehat{CDy} = 90^\\circ$, $\\widehat{CDy} = 30^\\circ$, $\\widehat{xAC} = 60^\\circ$."
          },
          {
            id: "d4q4", level: "kho", source: "mới",
            q: STD + " Tia phân giác của $\\widehat{xAB}$ và tia phân giác của $\\widehat{ABx'}$ cắt nhau tại $I$. Số đo $\\widehat{AIB}$ là",
            options: ["$45^\\circ$", "$60^\\circ$", "$180^\\circ$", "$90^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xAB} + \\widehat{ABx'} = 180^\\circ$ (trong cùng phía), nên $\\widehat{xAI} + \\widehat{x'BI} = 90^\\circ$ (mỗi góc bằng nửa góc tương ứng). Qua $I$ kẻ đường thẳng song song với $xy$ (cũng song song với $x'y'$), dùng các cặp góc so le trong ta được $\\widehat{AIB} = \\widehat{xAI} + \\widehat{x'BI} = 90^\\circ$."
          },
          {
            id: "d4q5", level: "kho", source: "mới",
            q: STD + " Gọi $At$ là tia phân giác của $\\widehat{xAB}$, $Bt'$ là tia phân giác của $\\widehat{ABy'}$. Hai đường thẳng chứa $At$ và $Bt'$",
            options: ["vuông góc với nhau", "song song với nhau", "cắt nhau tạo thành góc $60^\\circ$", "cắt nhau tạo thành góc $45^\\circ$"],
            answer: 1,
            explain: "$\\widehat{xAB} = \\widehat{ABy'}$ (so le trong) nên nửa của chúng bằng nhau: $\\widehat{tAB} = \\widehat{t'BA}$. Hai góc này ở vị trí so le trong (đường thẳng $AB$ cắt hai đường chứa $At$, $Bt'$) nên hai đường thẳng đó song song."
          },
          {
            id: "d4q6", level: "kho", source: "mới",
            q: "Một đường thẳng cắt hai đường thẳng song song. Hiệu hai góc trong cùng phía bằng $50^\\circ$. Góc nhỏ hơn bằng",
            options: ["$50^\\circ$", "$115^\\circ$", "$65^\\circ$", "$25^\\circ$"],
            answer: 2,
            explain: "Tổng hai góc trong cùng phía là $180^\\circ$, hiệu là $50^\\circ$. Góc nhỏ hơn $= (180^\\circ - 50^\\circ) : 2 = 65^\\circ$ (góc lớn $115^\\circ$)."
          },
          {
            id: "d4q7", level: "kho", source: "SGK tr.53 – Nhận xét",
            q: "Cho ba đường thẳng phân biệt $a$, $b$, $c$ với $a \\parallel b$ và $b \\parallel c$. Đường thẳng $d$ vuông góc với $a$. Khẳng định nào sau đây đúng?",
            options: ["$d \\parallel c$", "$d$ không cắt $c$", "$d$ trùng với $b$", "$d \\perp c$"],
            answer: 3,
            explain: "$a \\parallel b$, $b \\parallel c$ và $a$, $c$ phân biệt nên $a \\parallel c$. Mà $d \\perp a$ nên $d \\perp c$."
          },
          {
            id: "d4q8", level: "kho", source: "SBT Bài 10 – BT 3.21",
            q: "Cho điểm $A$ nằm ngoài đường thẳng $d$. Lấy hai điểm $B$, $C$ phân biệt (khác $A$) sao cho $AB \\parallel d$ và $AC \\parallel d$. Khẳng định nào sau đây đúng?",
            options: ["Ba điểm $A$, $B$, $C$ thẳng hàng", "Ba điểm $A$, $B$, $C$ là ba đỉnh của một tam giác", "$AB \\perp AC$", "Đường thẳng $AB$ cắt đường thẳng $d$"],
            answer: 0,
            explain: "Đường thẳng $AB$ và đường thẳng $AC$ cùng đi qua $A$ và cùng song song với $d$. Theo tiên đề Euclid chúng trùng nhau, nên $A$, $B$, $C$ thẳng hàng."
          },
          {
            id: "d4q9", level: "kho", source: "mới",
            q: "Đường thẳng $c$ cắt hai đường thẳng song song $a$, $b$ lần lượt tại $A$ và $B$. Tại $A$ có hai góc kề bù, góc này gấp 4 lần góc kia. Góc nhọn tạo bởi $c$ và $b$ tại $B$ bằng",
            options: ["$144^\\circ$", "$36^\\circ$", "$45^\\circ$", "$72^\\circ$"],
            answer: 1,
            explain: "Hai góc kề bù có tổng $180^\\circ$: góc nhỏ $= 180^\\circ : 5 = 36^\\circ$, góc lớn $= 144^\\circ$. Tại $B$, góc đồng vị với góc $36^\\circ$ cũng bằng $36^\\circ$, nên góc nhọn tại $B$ là $36^\\circ$."
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Cho $a \\parallel b$. Đường thẳng $c$ cắt $a$ tại $A$ và tạo với $a$ một góc nhọn $35^\\circ$. Đường thẳng $d$ đi qua $A$ và vuông góc với $c$. Góc nhọn tạo bởi $d$ và $b$ bằng",
            options: ["$55^\\circ$", "$35^\\circ$", "$90^\\circ$", "$145^\\circ$"],
            answer: 0,
            explain: "Tại $A$, góc nhọn giữa $d$ và $a$ bằng $90^\\circ - 35^\\circ = 55^\\circ$. $d$ cắt $a$ nên cắt $b$; góc nhọn tạo bởi $d$ và $b$ đồng vị với góc nhọn tạo bởi $d$ và $a$, nên bằng $55^\\circ$."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Cho tam giác $ABC$. Qua $A$ kẻ đường thẳng $xy$ song song với $BC$ (tia $Ax$ ở phía điểm $B$, tia $Ay$ ở phía điểm $C$ như hình). Chứng minh rằng $\\widehat{BAC} + \\widehat{ABC} + \\widehat{ACB} = 180^\\circ$." +
              tri({ B: 55, C: 65, xy: true }),
            modelAnswer: "• Vì $xy \\parallel BC$ nên $\\widehat{xAB} = \\widehat{ABC}$ (hai góc so le trong).<br>" +
              "• Tương tự $\\widehat{yAC} = \\widehat{ACB}$ (hai góc so le trong).<br>" +
              "• Tia $AB$, $AC$ nằm giữa hai tia đối nhau $Ax$, $Ay$ nên $\\widehat{xAB} + \\widehat{BAC} + \\widehat{CAy} = 180^\\circ$ (góc bẹt $xAy$).<br>" +
              "Thay vào: $\\widehat{ABC} + \\widehat{BAC} + \\widehat{ACB} = 180^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Chỉ ra $\\widehat{xAB} = \\widehat{ABC}$ (so le trong, dùng $xy \\parallel BC$)." },
              { pts: 0.5, text: "Chỉ ra $\\widehat{yAC} = \\widehat{ACB}$ (so le trong)." },
              { pts: 0.5, text: "Dùng góc bẹt $xAy = 180^\\circ$ và kết luận đúng." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "SBT Bài 10 – BT 3.26 (nâng cao)", maxPoints: 1.5,
            q: "Cho hình vẽ: $Ax \\parallel By$, hai tia $Ax$ và $By$ cùng hướng sang phải ($A$ ở dưới, $B$ ở trên). Điểm $C$ nằm giữa hai đường thẳng $Ax$, $By$ và <b>khác phía</b> với hai tia $Ax$, $By$ đối với đường thẳng $AB$. Biết $\\widehat{xAC} = 125^\\circ$, $\\widehat{yBC} = 135^\\circ$. Tính $\\widehat{ACB}$." +
              zig({ a: 125, b: 135, n: ['A', 'B', 'C'], r: ['x', 'y'], mA: '125°', mD: '135°', mC: '?' }),
            modelAnswer: "Qua $C$ kẻ tia $Ct$ cùng hướng với tia $Ax$ (sang phải). Khi đó đường thẳng chứa $Ct$ song song với $Ax$, nên cũng song song với $By$.<br>" +
              "$\\widehat{xAC}$ và $\\widehat{ACt}$ là hai góc trong cùng phía nên $\\widehat{ACt} = 180^\\circ - 125^\\circ = 55^\\circ$.<br>" +
              "Tương tự $\\widehat{yBC}$ và $\\widehat{BCt}$ trong cùng phía nên $\\widehat{BCt} = 180^\\circ - 135^\\circ = 45^\\circ$.<br>" +
              "Tia $Ct$ nằm giữa hai tia $CA$, $CB$ nên $\\widehat{ACB} = 55^\\circ + 45^\\circ = 100^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Kẻ được đường thẳng qua $C$ song song với $Ax$ và nêu nó song song với $By$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{ACt} = 55^\\circ$ và $\\widehat{BCt} = 45^\\circ$ (góc trong cùng phía bù nhau)." },
              { pts: 0.5, text: "Kết luận $\\widehat{ACB} = 100^\\circ$." }
            ]
          }
        ]
      }
    ]
  });
})();
