(function () {
  // ===== Hình vẽ SVG (dùng currentColor để hợp chế độ sáng/tối) =====
  // Hướng đo bằng độ theo kiểu toán học: 0° = sang phải, ngược chiều kim đồng hồ là chiều dương.
  var R = Math.PI / 180, RED = "#e5484d";
  function f(n) { return (+n).toFixed(1); }
  function P(O, d, L) { return [O[0] + L * Math.cos(d * R), O[1] - L * Math.sin(d * R)]; }
  function svg(w, h, body) {
    return '<svg viewBox="-14 -14 ' + (w + 28) + ' ' + (h + 28) + '" width="100%" style="max-width:320px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">' + body + '</svg>';
  }
  function ln(p, q, dash) {
    return '<line x1="' + f(p[0]) + '" y1="' + f(p[1]) + '" x2="' + f(q[0]) + '" y2="' + f(q[1]) + '" stroke="currentColor" stroke-width="1.5"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>';
  }
  function tx(p, t, o) {
    o = o || {};
    return '<text x="' + f(p[0]) + '" y="' + f(p[1]) + '" font-size="' + (o.s || 13) + '" text-anchor="middle" dominant-baseline="middle" fill="' + (o.c || 'currentColor') + '"' + (o.i ? ' font-style="italic"' : '') + '>' + t + '</text>';
  }
  function dot(p) { return '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2.5" fill="currentColor"/>'; }
  // Cung đánh dấu góc từ hướng d1 tới hướng d2 (d1 < d2), nhãn đặt trên tia phân giác của góc.
  function ang(O, d1, d2, r, label, lr) {
    var a = P(O, d1, r), b = P(O, d2, r);
    var s = '<path d="M' + f(a[0]) + ' ' + f(a[1]) + ' A' + r + ' ' + r + ' 0 ' + (d2 - d1 > 180 ? 1 : 0) + ' 0 ' + f(b[0]) + ' ' + f(b[1]) + '" fill="none" stroke="' + RED + '" stroke-width="1.3"/>';
    if (label) s += tx(P(O, (d1 + d2) / 2, lr || r + 14), label, { c: RED, s: 12 });
    return s;
  }
  function rightMark(O, d, k) {
    var p = P(O, d, k), q = P(O, d + 90, k), m = P(p, d + 90, k);
    return '<path d="M' + f(p[0]) + ' ' + f(p[1]) + ' L' + f(m[0]) + ' ' + f(m[1]) + ' L' + f(q[0]) + ' ' + f(q[1]) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
  }
  // Các tia chung gốc O. o = { rays: [[hướng, "tên"]], arcs: [[d1, d2, "nhãn", bán kính]], namePos: hướng đặt chữ O }
  function rays(o) {
    var O = [150, 90], L = 72, s = '';
    o.rays.forEach(function (r) { s += ln(O, P(O, r[0], L)) + tx(P(O, r[0], L + 11), r[1], { i: 1 }); });
    (o.arcs || []).forEach(function (a) { s += ang(O, a[0], a[1], a[3] || 20, a[2]); });
    s += dot(O) + tx(P(O, o.namePos == null ? 270 : o.namePos, 15), 'O', { i: 1 });
    return svg(300, 180, s);
  }
  // Đường thẳng c cắt hai đường thẳng nằm ngang a (trên), b (dưới) tại A, B; c nghiêng góc al so với tia sang phải.
  // Bốn góc ở mỗi đỉnh được đánh số 1, 2, 3, 4 ngược chiều kim đồng hồ, góc 1 nằm giữa tia sang phải và tia c đi lên.
  // o = { al, num: đánh số?, marks: [["A"|"B", số góc, "nhãn"]], names: [a, b, c, A, B], pA, pB: góc đặt tên điểm }
  function tv(o) {
    var al = o.al || 60, A = [175, 45], B = [175 - 80 / Math.tan(al * R), 125], s = '';
    var N = o.names || ['a', 'b', 'c', 'A', 'B'];
    var reg = function (k) { return [[0, al], [al, 180], [180, 180 + al], [180 + al, 360]][k - 1]; };
    var mid = function (k) { var g = reg(k); return (g[0] + g[1]) / 2; };
    s += ln([15, 45], [285, 45]) + ln([15, 125], [285, 125]) + ln(P(B, 180 + al, 45), P(A, al, 45));
    s += tx([278, 34], N[0], { i: 1 }) + tx([278, 114], N[1], { i: 1 }) + tx(P(A, al, 56), N[2], { i: 1 });
    (o.marks || []).forEach(function (m) { var g = reg(m[1]); s += ang(m[0] === 'A' ? A : B, g[0], g[1], 22, m[2], 37); });
    [A, B].forEach(function (X) {
      if (o.num) for (var k = 1; k <= 4; k++) {
        var g = reg(k);
        s += tx(P(X, mid(k), g[1] - g[0] < 90 ? 15 : 11), '' + k, { s: 10 });
      }
      s += dot(X);
    });
    s += tx(P(A, mid(o.pA || 2), 28), N[3], { i: 1 }) + tx(P(B, mid(o.pB || 4), 28), N[4], { i: 1 });
    return svg(300, 170, s);
  }
  // Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba
  function perp() {
    var s = ln([150, 10], [150, 165]) + ln([40, 55], [260, 55]) + ln([40, 120], [260, 120]);
    s += rightMark([150, 55], 0, 9) + rightMark([150, 120], 0, 9);
    s += tx([268, 48], 'a', { i: 1 }) + tx([268, 113], 'b', { i: 1 }) + tx([162, 14], 'c', { i: 1 });
    return svg(300, 175, s);
  }
  // Tam giác ABC, E thuộc AB, F thuộc AC, EF nằm ngang
  function triEF() {
    var B = [40, 150], C = [280, 150], A = P(B, 58, 140), E = P(B, 58, 62);
    var t = (E[1] - A[1]) / (C[1] - A[1]), F = [A[0] + t * (C[0] - A[0]), E[1]];
    var s = ln(A, B) + ln(B, C) + ln(C, A) + ln(E, F);
    s += ang(B, 0, 58, 20, '58°') + ang(E, 238, 360, 15, '122°', 30);
    s += tx([A[0], A[1] - 12], 'A', { i: 1 }) + tx([30, 160], 'B', { i: 1 }) + tx([290, 160], 'C', { i: 1 });
    s += tx([E[0] - 12, E[1]], 'E', { i: 1 }) + tx([F[0] + 12, F[1]], 'F', { i: 1 });
    return svg(300, 172, s);
  }
  // Tứ giác MNPQ có đường chéo NQ, góc MNQ = góc NQP = 40°; Qx là tia đối của tia QP
  function quadMNPQ() {
    var M = [40, 40], N = [210, 40], Pp = [270, 140], Q = [91, 140];
    var s = ln(M, N) + ln(N, Pp) + ln(Pp, Q) + ln(Q, M) + ln(N, Q) + ln(Q, [22, 140], true);
    s += ang(N, 180, 220, 22, '40°', 36) + ang(Q, 0, 40, 22, '40°', 36);
    s += tx([32, 30], 'M', { i: 1 }) + tx([220, 30], 'N', { i: 1 }) + tx([282, 148], 'P', { i: 1 }) + tx([96, 156], 'Q', { i: 1 }) + tx([14, 140], 'x', { i: 1 });
    return svg(300, 165, s);
  }
  // Đoạn AB, tia Ax và By ở hai phía của AB, góc xAB = góc yBA = 70°
  function raysAB() {
    var A = [120, 30], B = P(A, -70, 110);
    var s = ln(A, B) + ln(A, [282, 30]) + ln(B, [22, B[1]]);
    s += ang(A, 290, 360, 22, '70°', 36) + ang(B, 110, 180, 22, '70°', 36);
    s += dot(A) + dot(B) + tx([108, 22], 'A', { i: 1 }) + tx([B[0] + 8, B[1] + 15], 'B', { i: 1 });
    s += tx([291, 30], 'x', { i: 1 }) + tx([13, B[1]], 'y', { i: 1 });
    return svg(300, 160, s);
  }

  registerLesson({
    id: "c3-lt1",
    chapter: 3,
    kind: "review",
    title: "Luyện tập chung (Bài 8–9)",
    sgkPages: [50, 50],
    sbtPages: [35, 40],
    objectives: [
      "Ôn hai góc kề bù, hai góc đối đỉnh và tia phân giác của một góc",
      "Nhận biết cặp góc so le trong, cặp góc đồng vị khi một đường thẳng cắt hai đường thẳng",
      "Dùng dấu hiệu nhận biết để giải thích hai đường thẳng song song",
      "Phối hợp góc kề bù, góc đối đỉnh để tính góc và suy luận"
    ],

    theory: [
      { heading: "1. Hai góc kề bù, hai góc đối đỉnh",
        html: "<ul><li>Hai góc <b>kề bù</b>: có một cạnh chung, hai cạnh còn lại là hai tia đối nhau. Hai góc kề bù có tổng số đo bằng $180^\\circ$.</li>" +
              "<li>Hai góc <b>đối đỉnh</b>: mỗi cạnh của góc này là tia đối của một cạnh của góc kia. <b>Hai góc đối đỉnh thì bằng nhau.</b></li></ul>" +
              "Ví dụ: hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$, $\\widehat{xOy} = 50^\\circ$ thì $\\widehat{x'Oy'} = 50^\\circ$ (đối đỉnh), còn $\\widehat{x'Oy} = \\widehat{xOy'} = 180^\\circ - 50^\\circ = 130^\\circ$ (kề bù)." +
              rays({ rays: [[0, 'x'], [180, "x'"], [50, 'y'], [230, "y'"]], arcs: [[0, 50, '50°'], [180, 230, '50°']], namePos: 300 }) },
      { heading: "2. Tia phân giác của một góc",
        html: "Tia $Oz$ là <b>tia phân giác</b> của $\\widehat{xOy}$ nếu $Oz$ nằm trong góc đó và $\\widehat{xOz} = \\widehat{zOy}$. Khi đó $\\widehat{xOz} = \\widehat{zOy} = \\frac{1}{2}\\widehat{xOy}$." +
              rays({ rays: [[0, 'x'], [80, 'y'], [40, 'z']], arcs: [[0, 40, '40°', 24], [40, 80, '40°', 24]], namePos: 220 }) +
              "Đường thẳng chứa tia phân giác của một góc gọi là <b>đường phân giác</b> của góc đó." },
      { heading: "3. Các góc tạo bởi một đường thẳng cắt hai đường thẳng",
        html: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$, tạo ra bốn góc đỉnh $A$ và bốn góc đỉnh $B$ (đánh số như hình):" +
              tv({ al: 60, num: 1 }) +
              "<ul><li>Cặp góc <b>so le trong</b> (cùng nằm giữa $a$ và $b$, ở hai phía của $c$): $\\widehat{A_3}$ và $\\widehat{B_1}$; $\\widehat{A_4}$ và $\\widehat{B_2}$.</li>" +
              "<li>Cặp góc <b>đồng vị</b> (ở vị trí giống nhau tại hai đỉnh): $\\widehat{A_1}$ và $\\widehat{B_1}$; $\\widehat{A_2}$ và $\\widehat{B_2}$; $\\widehat{A_3}$ và $\\widehat{B_3}$; $\\widehat{A_4}$ và $\\widehat{B_4}$.</li>" +
              "<li>Cặp góc <b>trong cùng phía</b>: $\\widehat{A_3}$ và $\\widehat{B_2}$; $\\widehat{A_4}$ và $\\widehat{B_1}$.</li>" +
              "<li>Nếu có <b>một</b> cặp góc so le trong bằng nhau thì cặp so le trong còn lại bằng nhau và các cặp góc đồng vị bằng nhau.</li></ul>" },
      { heading: "4. Dấu hiệu nhận biết hai đường thẳng song song",
        html: "Nếu đường thẳng $c$ cắt hai đường thẳng phân biệt $a$, $b$ và trong các góc tạo thành có <b>một cặp góc so le trong bằng nhau</b> hoặc <b>một cặp góc đồng vị bằng nhau</b> thì $a \\parallel b$." +
              tv({ al: 60, marks: [['A', 3, '60°'], ['B', 1, '60°']] }) +
              "Hệ quả: hai đường thẳng phân biệt <b>cùng vuông góc</b> với một đường thẳng thứ ba thì song song với nhau." }
    ],

    skills: [
      "Biết một góc, tìm góc <b>kề bù</b> với nó: lấy $180^\\circ$ trừ đi; tìm góc <b>đối đỉnh</b> với nó: bằng chính góc đó.",
      "Tia phân giác chia góc thành hai góc bằng nhau, mỗi góc bằng <b>một nửa</b> góc ban đầu; ngược lại, biết một nửa thì nhân đôi để được cả góc.",
      "Nhận dạng góc: <b>so le trong</b> thì cả hai góc nằm <b>giữa</b> $a$ và $b$ và ở <b>hai phía</b> của $c$; <b>đồng vị</b> thì hai góc nằm ở <b>cùng vị trí</b> (cùng phía trên/dưới, cùng bên trái/phải) tại hai đỉnh.",
      "Muốn chứng tỏ $a \\parallel b$: tìm một cặp góc so le trong bằng nhau hoặc một cặp góc đồng vị bằng nhau. Nếu đề cho góc khác, dùng <b>kề bù</b> hoặc <b>đối đỉnh</b> để chuyển về đúng cặp góc cần dùng.",
      "Hai góc trong cùng phía có tổng $180^\\circ$ thì cũng suy ra được $a \\parallel b$ (vì khi đó cặp so le trong bằng nhau, xem kề bù).",
      "Lỗi hay gặp: cho rằng hai góc bằng nhau thì đối đỉnh; nhầm góc kề bù (tổng $180^\\circ$) với góc phụ nhau (tổng $90^\\circ$); nhầm cặp so le trong với cặp đồng vị; dùng \"song song thì góc bằng nhau\" để chứng minh song song (ngược chiều suy luận)."
    ],

    examples: [
      { q: "Trên hình, đường thẳng $c$ cắt $a$, $b$ tại $A$, $B$; $\\widehat{A_2} = 115^\\circ$ và $\\widehat{B_1} = 65^\\circ$. Giải thích vì sao $a \\parallel b$." +
           tv({ al: 65, num: 1, marks: [['A', 2, '115°'], ['B', 1, '65°']], pA: 4, pB: 3 }),
        solution: "$\\widehat{A_1}$ và $\\widehat{A_2}$ là hai góc kề bù nên $\\widehat{A_1} = 180^\\circ - 115^\\circ = 65^\\circ$.<br>" +
                  "Khi đó $\\widehat{A_1} = \\widehat{B_1} = 65^\\circ$; hai góc này ở vị trí đồng vị.<br>" +
                  "Theo dấu hiệu nhận biết, $a \\parallel b$." },
      { q: "Cho $\\widehat{xOy} = 130^\\circ$, tia $Oz$ là tia phân giác của $\\widehat{xOy}$. Vẽ tia $Ox'$ là tia đối của tia $Ox$. Tính $\\widehat{x'Oz}$.",
        solution: "Vì $Oz$ là tia phân giác của $\\widehat{xOy}$ nên $\\widehat{xOz} = \\frac{130^\\circ}{2} = 65^\\circ$.<br>" +
                  "$\\widehat{xOz}$ và $\\widehat{x'Oz}$ là hai góc kề bù (vì $Ox$, $Ox'$ là hai tia đối nhau) nên $\\widehat{x'Oz} = 180^\\circ - 65^\\circ = 115^\\circ$." },
      { q: "Hai đường thẳng phân biệt $a$ và $b$ cùng vuông góc với đường thẳng $c$. Vì sao $a \\parallel b$?",
        solution: "Đường thẳng $c$ cắt $a$ và $b$; các góc tạo thành tại hai giao điểm đều bằng $90^\\circ$.<br>" +
                  "Như vậy có một cặp góc đồng vị bằng nhau (cùng bằng $90^\\circ$), nên theo dấu hiệu nhận biết $a \\parallel b$." }
    ],

    sets: [
      /* ======================= ĐỀ 1 ======================= */
      { id: "d1", name: "Đề 1",
        mcq: [
          { id: "d1q1", level: "de", source: "SGK Bài 8",
            q: "Hai góc kề bù có tổng số đo bằng",
            options: ["$90^\\circ$", "$180^\\circ$", "$360^\\circ$", "$120^\\circ$"],
            answer: 1,
            explain: "Hai góc kề bù có hai cạnh không chung là hai tia đối nhau, nên tổng của chúng là góc bẹt $180^\\circ$. (Tổng $90^\\circ$ là hai góc phụ nhau.)" },
          { id: "d1q2", level: "de", source: "SBT Bài 8 – BT 3.6",
            q: "Cho $\\widehat{xOy} = 72^\\circ$. Góc kề bù với $\\widehat{xOy}$ có số đo là",
            options: ["$72^\\circ$", "$18^\\circ$", "$108^\\circ$", "$118^\\circ$"],
            answer: 2,
            explain: "Góc kề bù với nó bằng $180^\\circ - 72^\\circ = 108^\\circ$. ($18^\\circ$ là góc phụ với $72^\\circ$.)" },
          { id: "d1q3", level: "de", source: "SBT Bài 8 – BT 3.3",
            q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$, $\\widehat{xOy} = 40^\\circ$. Số đo $\\widehat{x'Oy'}$ là" +
               rays({ rays: [[0, 'x'], [180, "x'"], [40, 'y'], [220, "y'"]], arcs: [[0, 40, '40°']], namePos: 300 }),
            options: ["$140^\\circ$", "$50^\\circ$", "$80^\\circ$", "$40^\\circ$"],
            answer: 3,
            explain: "$\\widehat{x'Oy'}$ và $\\widehat{xOy}$ là hai góc đối đỉnh nên bằng nhau: $\\widehat{x'Oy'} = 40^\\circ$. ($140^\\circ$ là số đo của $\\widehat{x'Oy}$, góc kề bù với $\\widehat{xOy}$.)" },
          { id: "d1q4", level: "de", source: "SBT Bài 8 – BT 3.4",
            q: "Tia $Oz$ là tia phân giác của $\\widehat{xOy}$, biết $\\widehat{xOy} = 84^\\circ$. Số đo $\\widehat{xOz}$ là",
            options: ["$42^\\circ$", "$84^\\circ$", "$168^\\circ$", "$96^\\circ$"],
            answer: 0,
            explain: "$\\widehat{xOz} = \\frac{1}{2}\\widehat{xOy} = \\frac{84^\\circ}{2} = 42^\\circ$." },
          { id: "d1q5", level: "vua", source: "SGK Bài 9 – Câu hỏi tr.46",
            q: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ lần lượt tại $A$, $B$ (các góc được đánh số như hình). Góc ở vị trí so le trong với $\\widehat{A_4}$ là" +
               tv({ al: 60, num: 1 }),
            options: ["$\\widehat{B_4}$", "$\\widehat{B_2}$", "$\\widehat{B_1}$", "$\\widehat{A_2}$"],
            answer: 1,
            explain: "$\\widehat{A_4}$ nằm giữa $a$ và $b$, bên phải $c$. Góc so le trong với nó phải nằm giữa $a$ và $b$, bên trái $c$, tại đỉnh $B$: đó là $\\widehat{B_2}$. ($\\widehat{B_4}$ là góc đồng vị, $\\widehat{B_1}$ là góc trong cùng phía, $\\widehat{A_2}$ là góc đối đỉnh.)" },
          { id: "d1q6", level: "vua", source: "SBT Bài 9 – BT 3.9",
            q: "Trên hình, cặp góc nào là cặp góc đồng vị?" + tv({ al: 65, num: 1 }),
            options: ["$\\widehat{A_1}$ và $\\widehat{B_3}$", "$\\widehat{A_3}$ và $\\widehat{B_3}$", "$\\widehat{A_4}$ và $\\widehat{B_1}$", "$\\widehat{A_2}$ và $\\widehat{A_4}$"],
            answer: 1,
            explain: "Hai góc đồng vị nằm ở cùng vị trí tại hai đỉnh: $\\widehat{A_3}$ và $\\widehat{B_3}$ đều ở dưới đường nằm ngang và bên trái $c$. $\\widehat{A_4}$, $\\widehat{B_1}$ là cặp trong cùng phía; $\\widehat{A_2}$, $\\widehat{A_4}$ là cặp đối đỉnh." },
          { id: "d1q7", level: "vua", source: "SGK Bài 9 – Dấu hiệu nhận biết",
            q: "Đường thẳng $c$ cắt hai đường thẳng phân biệt $a$, $b$. Điều kiện nào sau đây đủ để kết luận $a \\parallel b$?",
            options: ["Có một cặp góc đồng vị bằng nhau", "Có một cặp góc đối đỉnh bằng nhau", "Có một cặp góc kề bù", "Tại giao điểm của $c$ và $a$ có hai góc nhọn bằng nhau"],
            answer: 0,
            explain: "Đây chính là dấu hiệu nhận biết hai đường thẳng song song. Các điều kiện còn lại luôn xảy ra khi hai đường thẳng cắt nhau, nên không giúp kết luận được gì." },
          { id: "d1q8", level: "vua", source: "SGK tr.50 – Ví dụ",
            q: "Trên hình, $\\widehat{A_3} = 70^\\circ$ và $\\widehat{B_1} = 70^\\circ$. Khẳng định nào sau đây đúng?" +
               tv({ al: 70, num: 1, marks: [['A', 3, '70°'], ['B', 1, '70°']] }),
            options: ["$a \\parallel b$ vì $\\widehat{A_3}$, $\\widehat{B_1}$ là hai góc đồng vị bằng nhau", "$a$ cắt $b$ vì $\\widehat{A_3} + \\widehat{B_1} \\ne 180^\\circ$", "$a \\parallel b$ vì $\\widehat{A_3}$, $\\widehat{B_1}$ là hai góc so le trong bằng nhau", "$a \\perp b$"],
            answer: 2,
            explain: "$\\widehat{A_3}$ (dưới $a$, bên trái $c$) và $\\widehat{B_1}$ (trên $b$, bên phải $c$) đều nằm giữa $a$ và $b$, ở hai phía của $c$: đó là cặp so le trong. Chúng bằng nhau nên $a \\parallel b$." },
          { id: "d1q9", level: "vua", source: "mới",
            q: "Cho hai góc kề bù $\\widehat{xOy}$ và $\\widehat{yOx'}$, biết $\\widehat{xOy} = 3\\cdot\\widehat{yOx'}$. Số đo $\\widehat{xOy}$ là",
            options: ["$45^\\circ$", "$120^\\circ$", "$135^\\circ$", "$60^\\circ$"],
            answer: 2,
            explain: "$\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$, tức $3\\cdot\\widehat{yOx'} + \\widehat{yOx'} = 180^\\circ$, nên $\\widehat{yOx'} = 45^\\circ$ và $\\widehat{xOy} = 135^\\circ$." },
          { id: "d1q10", level: "kho", source: "SGK tr.50 – BT 3.13 (biến đổi)",
            q: "Trên hình, $\\widehat{A_2} = 120^\\circ$ và $\\widehat{B_3} = 60^\\circ$. Khẳng định nào sau đây đúng?" +
               tv({ al: 60, num: 1, marks: [['A', 2, '120°'], ['B', 3, '60°']], pA: 4 }),
            options: ["$a$ và $b$ cắt nhau", "$\\widehat{A_1} = 120^\\circ$", "$\\widehat{B_1} = 120^\\circ$", "$a \\parallel b$"],
            answer: 3,
            explain: "$\\widehat{A_1} = 180^\\circ - \\widehat{A_2} = 60^\\circ$ (kề bù); $\\widehat{B_1} = \\widehat{B_3} = 60^\\circ$ (đối đỉnh). Vậy $\\widehat{A_1} = \\widehat{B_1}$, là hai góc đồng vị bằng nhau, nên $a \\parallel b$." },
          { id: "d1q11", level: "kho", source: "mới",
            q: "Cho hai góc kề bù $\\widehat{xOy}$ và $\\widehat{yOx'}$. Tia $Om$ là tia phân giác của $\\widehat{xOy}$, tia $On$ là tia phân giác của $\\widehat{yOx'}$. Số đo $\\widehat{mOn}$ là",
            options: ["$45^\\circ$", "$180^\\circ$", "Phụ thuộc vào số đo $\\widehat{xOy}$", "$90^\\circ$"],
            answer: 3,
            explain: "$\\widehat{mOn} = \\widehat{mOy} + \\widehat{yOn} = \\frac{1}{2}\\widehat{xOy} + \\frac{1}{2}\\widehat{yOx'} = \\frac{1}{2}\\cdot 180^\\circ = 90^\\circ$, với mọi số đo của $\\widehat{xOy}$." }
        ],
        essay: [
          { id: "d1e1", level: "vua", source: "SBT Bài 8 – BT 3.3 (biến đổi)", maxPoints: 1.5,
            q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$ sao cho $\\widehat{xOy} = 110^\\circ$.<br>a) Tính $\\widehat{x'Oy}$, $\\widehat{x'Oy'}$, $\\widehat{xOy'}$.<br>b) Vẽ tia $Ot$ là tia phân giác của $\\widehat{xOy}$. Tính $\\widehat{tOx'}$.",
            modelAnswer: "a) $\\widehat{x'Oy}$ và $\\widehat{xOy}$ kề bù nên $\\widehat{x'Oy} = 180^\\circ - 110^\\circ = 70^\\circ$.<br>" +
                         "$\\widehat{x'Oy'} = \\widehat{xOy} = 110^\\circ$ (đối đỉnh); $\\widehat{xOy'} = \\widehat{x'Oy} = 70^\\circ$ (đối đỉnh).<br>" +
                         "b) $Ot$ là tia phân giác của $\\widehat{xOy}$ nên $\\widehat{xOt} = \\frac{110^\\circ}{2} = 55^\\circ$.<br>" +
                         "$\\widehat{xOt}$ và $\\widehat{tOx'}$ kề bù (vì $Ox$, $Ox'$ là hai tia đối nhau) nên $\\widehat{tOx'} = 180^\\circ - 55^\\circ = 125^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{x'Oy} = 70^\\circ$ (nêu lí do kề bù)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{x'Oy'} = 110^\\circ$ và $\\widehat{xOy'} = 70^\\circ$ (nêu lí do đối đỉnh)." },
              { pts: 0.5, text: "Câu b: $\\widehat{xOt} = 55^\\circ$ và $\\widehat{tOx'} = 125^\\circ$." }
            ] },
          { id: "d1e2", level: "kho", source: "SBT Bài 9 – BT 3.17 (biến đổi)", maxPoints: 1.5,
            q: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ lần lượt tại $A$, $B$ (các góc được đánh số như hình). Biết $\\widehat{A_1} = 50^\\circ$, $\\widehat{B_2} = 130^\\circ$.<br>a) Giải thích vì sao $a \\parallel b$.<br>b) Tính $\\widehat{B_4}$." +
               tv({ al: 50, num: 1, marks: [['A', 1, '50°'], ['B', 2, '130°']] }),
            modelAnswer: "a) $\\widehat{B_1}$ và $\\widehat{B_2}$ là hai góc kề bù nên $\\widehat{B_1} = 180^\\circ - 130^\\circ = 50^\\circ$.<br>" +
                         "Khi đó $\\widehat{A_1} = \\widehat{B_1} = 50^\\circ$, mà hai góc này ở vị trí đồng vị nên $a \\parallel b$ (dấu hiệu nhận biết).<br>" +
                         "b) $\\widehat{B_4}$ và $\\widehat{B_2}$ là hai góc đối đỉnh nên $\\widehat{B_4} = 130^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Tính được $\\widehat{B_1} = 50^\\circ$ (hoặc tính một góc khác giúp tạo cặp so le trong / đồng vị bằng nhau)." },
              { pts: 0.5, text: "Chỉ ra cặp góc đồng vị (hoặc so le trong) bằng nhau và kết luận $a \\parallel b$." },
              { pts: 0.5, text: "Câu b: $\\widehat{B_4} = 130^\\circ$ (đối đỉnh với $\\widehat{B_2}$)." }
            ] }
        ] },

      /* ======================= ĐỀ 2 ======================= */
      { id: "d2", name: "Đề 2",
        mcq: [
          { id: "d2q1", level: "de", source: "SGK Bài 8",
            q: "Hai góc đối đỉnh thì",
            options: ["bằng nhau", "bù nhau", "phụ nhau", "có một cạnh chung"],
            answer: 0,
            explain: "Tính chất: hai góc đối đỉnh thì bằng nhau. Chúng không có cạnh chung." },
          { id: "d2q2", level: "de", source: "SBT Bài 8 – BT 3.3",
            q: "Hai đường thẳng $mn$ và $pq$ cắt nhau tại $O$, $\\widehat{mOp} = 125^\\circ$. Số đo $\\widehat{pOn}$ là" +
               rays({ rays: [[0, 'm'], [180, 'n'], [125, 'p'], [305, 'q']], arcs: [[0, 125, '125°']], namePos: 250 }),
            options: ["$125^\\circ$", "$55^\\circ$", "$65^\\circ$", "$35^\\circ$"],
            answer: 1,
            explain: "$Om$ và $On$ là hai tia đối nhau, nên $\\widehat{mOp}$ và $\\widehat{pOn}$ kề bù: $\\widehat{pOn} = 180^\\circ - 125^\\circ = 55^\\circ$." },
          { id: "d2q3", level: "de", source: "mới",
            q: "Khẳng định nào sau đây là <b>sai</b>?",
            options: ["Hai góc đối đỉnh thì bằng nhau", "Hai góc bằng nhau thì đối đỉnh", "Hai góc kề bù có tổng số đo bằng $180^\\circ$", "Mỗi góc nhọn có đúng một tia phân giác"],
            answer: 1,
            explain: "Hai góc bằng nhau chưa chắc đối đỉnh. Ví dụ, tia phân giác chia một góc thành hai góc bằng nhau nhưng hai góc đó kề nhau, không đối đỉnh." },
          { id: "d2q4", level: "de", source: "SBT Bài 8 – BT 3.5",
            q: "Tia $Ot$ là tia phân giác của $\\widehat{xOy}$ và $\\widehat{xOt} = 35^\\circ$. Số đo $\\widehat{xOy}$ là",
            options: ["$17{,}5^\\circ$", "$70^\\circ$", "$35^\\circ$", "$145^\\circ$"],
            answer: 1,
            explain: "$\\widehat{xOt} = \\frac{1}{2}\\widehat{xOy}$ nên $\\widehat{xOy} = 2 \\cdot 35^\\circ = 70^\\circ$." },
          { id: "d2q5", level: "vua", source: "SGK Bài 9 – Câu hỏi tr.46",
            q: "Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ lần lượt tại $A$, $B$ (các góc được đánh số như hình). Góc ở vị trí đồng vị với $\\widehat{A_2}$ là" +
               tv({ al: 55, num: 1 }),
            options: ["$\\widehat{B_4}$", "$\\widehat{A_4}$", "$\\widehat{B_3}$", "$\\widehat{B_2}$"],
            answer: 3,
            explain: "$\\widehat{A_2}$ nằm phía trên $a$, bên trái $c$. Góc đồng vị với nó ở đỉnh $B$ cũng nằm phía trên $b$, bên trái $c$: $\\widehat{B_2}$." },
          { id: "d2q6", level: "vua", source: "SBT Bài 9 – BT 3.9",
            q: "Trên hình, cặp góc nào là cặp góc so le trong?" + tv({ al: 70, num: 1 }),
            options: ["$\\widehat{A_3}$ và $\\widehat{B_1}$", "$\\widehat{A_3}$ và $\\widehat{B_3}$", "$\\widehat{A_1}$ và $\\widehat{B_3}$", "$\\widehat{A_4}$ và $\\widehat{B_1}$"],
            answer: 0,
            explain: "$\\widehat{A_3}$ và $\\widehat{B_1}$ cùng nằm giữa $a$ và $b$, ở hai phía của $c$, nên là cặp so le trong. $\\widehat{A_3}$, $\\widehat{B_3}$ là cặp đồng vị; $\\widehat{A_4}$, $\\widehat{B_1}$ là cặp trong cùng phía; $\\widehat{A_1}$ và $\\widehat{B_3}$ đều không nằm giữa $a$ và $b$." },
          { id: "d2q7", level: "vua", source: "SBT Bài 9 – BT 3.13",
            q: "Hai đường thẳng phân biệt $a$, $b$ cùng vuông góc với đường thẳng $c$ (như hình). Khi đó" + perp(),
            options: ["$a \\perp b$", "$a$ cắt $b$", "$a \\parallel b$", "$a$ trùng với $b$"],
            answer: 2,
            explain: "Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì song song (các góc đồng vị đều bằng $90^\\circ$)." },
          { id: "d2q8", level: "vua", source: "SGK tr.50 – BT 3.15 (biến đổi)",
            q: "Trên hình, $\\widehat{A_4} = \\widehat{B_2} = 115^\\circ$. Vì sao $a \\parallel b$?" +
               tv({ al: 65, num: 1, marks: [['A', 4, '115°'], ['B', 2, '115°']] }),
            options: ["Vì $\\widehat{A_4}$ và $\\widehat{B_2}$ là hai góc so le trong bằng nhau", "Vì $\\widehat{A_4}$ và $\\widehat{B_2}$ là hai góc đồng vị bằng nhau", "Vì $\\widehat{A_4}$ và $\\widehat{B_2}$ là hai góc đối đỉnh", "Vì $\\widehat{A_4} + \\widehat{B_2} = 180^\\circ$"],
            answer: 0,
            explain: "$\\widehat{A_4}$ (dưới $a$, bên phải $c$) và $\\widehat{B_2}$ (trên $b$, bên trái $c$) là cặp so le trong. Chúng bằng nhau nên $a \\parallel b$. Hai góc này có đỉnh khác nhau nên không thể đối đỉnh; tổng của chúng là $230^\\circ$." },
          { id: "d2q9", level: "vua", source: "SBT Bài 8 – BT 3.4 (biến đổi)",
            q: "Cho $\\widehat{xOy} = 140^\\circ$, tia $Ot$ là tia phân giác của $\\widehat{xOy}$. Vẽ tia $Ox'$ là tia đối của tia $Ox$. Số đo $\\widehat{x'Ot}$ là",
            options: ["$70^\\circ$", "$40^\\circ$", "$110^\\circ$", "$140^\\circ$"],
            answer: 2,
            explain: "$\\widehat{xOt} = \\frac{140^\\circ}{2} = 70^\\circ$. $\\widehat{xOt}$ và $\\widehat{x'Ot}$ kề bù nên $\\widehat{x'Ot} = 180^\\circ - 70^\\circ = 110^\\circ$. ($40^\\circ$ là số đo $\\widehat{x'Oy}$.)" },
          { id: "d2q10", level: "kho", source: "SBT Bài 9 – BT 3.17 (biến đổi)",
            q: "Trên hình, $\\widehat{A_1} = 50^\\circ$ và $\\widehat{B_4} = 130^\\circ$. Khẳng định nào sau đây đúng?" +
               tv({ al: 50, num: 1, marks: [['A', 1, '50°'], ['B', 4, '130°']], pB: 2 }),
            options: ["$a$ và $b$ cắt nhau", "$\\widehat{B_1} = 130^\\circ$", "$a \\parallel b$", "$\\widehat{A_3} = 130^\\circ$"],
            answer: 2,
            explain: "$\\widehat{B_1}$ và $\\widehat{B_4}$ kề bù nên $\\widehat{B_1} = 180^\\circ - 130^\\circ = 50^\\circ = \\widehat{A_1}$. Đây là hai góc đồng vị bằng nhau nên $a \\parallel b$. Còn $\\widehat{A_3} = \\widehat{A_1} = 50^\\circ$ (đối đỉnh)." },
          { id: "d2q11", level: "kho", source: "mới",
            q: "Hai đường thẳng cắt nhau tạo thành bốn góc (không kể góc bẹt). Biết tổng của hai trong bốn góc đó bằng $100^\\circ$. Số đo góc lớn nhất trong bốn góc là",
            options: ["$50^\\circ$", "$100^\\circ$", "$80^\\circ$", "$130^\\circ$"],
            answer: 3,
            explain: "Hai góc kề bù có tổng $180^\\circ$, nên hai góc có tổng $100^\\circ$ phải là hai góc đối đỉnh, mỗi góc bằng $50^\\circ$. Hai góc còn lại bằng $180^\\circ - 50^\\circ = 130^\\circ$. Góc lớn nhất là $130^\\circ$." }
        ],
        essay: [
          { id: "d2e1", level: "vua", source: "SBT Bài 8 – BT 3.8 (biến đổi)", maxPoints: 1.5,
            q: "Cho $\\widehat{xOy} = 60^\\circ$. Vẽ tia $Oz$ là tia đối của tia $Ox$. Vẽ tia $Om$ là tia phân giác của $\\widehat{yOz}$.<br>a) Tính $\\widehat{yOz}$ và $\\widehat{zOm}$.<br>b) Tính $\\widehat{xOm}$.",
            modelAnswer: "a) $\\widehat{xOy}$ và $\\widehat{yOz}$ kề bù (vì $Ox$, $Oz$ là hai tia đối nhau) nên $\\widehat{yOz} = 180^\\circ - 60^\\circ = 120^\\circ$.<br>" +
                         "$Om$ là tia phân giác của $\\widehat{yOz}$ nên $\\widehat{zOm} = \\widehat{mOy} = \\frac{120^\\circ}{2} = 60^\\circ$.<br>" +
                         "b) $\\widehat{zOm}$ và $\\widehat{xOm}$ kề bù nên $\\widehat{xOm} = 180^\\circ - 60^\\circ = 120^\\circ$.<br>" +
                         "(Cách khác: $\\widehat{xOm} = \\widehat{xOy} + \\widehat{yOm} = 60^\\circ + 60^\\circ = 120^\\circ$.)",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{yOz} = 120^\\circ$ (nêu lí do kề bù)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{zOm} = 60^\\circ$ (dùng tia phân giác)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{xOm} = 120^\\circ$ có giải thích." }
            ] },
          { id: "d2e2", level: "kho", source: "SGK tr.50 – BT 3.15 (biến đổi)", maxPoints: 1.5,
            q: "Cho hình vẽ, biết $\\widehat{MNQ} = \\widehat{NQP} = 40^\\circ$; $Qx$ là tia đối của tia $QP$.<br>a) Chứng tỏ $MN \\parallel QP$.<br>b) Tính $\\widehat{NQx}$." + quadMNPQ(),
            modelAnswer: "a) Đường thẳng $NQ$ cắt hai đường thẳng $MN$ và $QP$; $\\widehat{MNQ}$ và $\\widehat{NQP}$ là hai góc ở vị trí so le trong.<br>" +
                         "Vì $\\widehat{MNQ} = \\widehat{NQP} = 40^\\circ$ nên $MN \\parallel QP$ (dấu hiệu nhận biết hai đường thẳng song song).<br>" +
                         "b) $Qx$ là tia đối của tia $QP$ nên $\\widehat{NQx}$ và $\\widehat{NQP}$ kề bù: $\\widehat{NQx} = 180^\\circ - 40^\\circ = 140^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Chỉ ra $\\widehat{MNQ}$ và $\\widehat{NQP}$ là cặp góc so le trong." },
              { pts: 0.5, text: "Kết luận $MN \\parallel QP$ theo dấu hiệu nhận biết." },
              { pts: 0.5, text: "Câu b: $\\widehat{NQx} = 140^\\circ$ (kề bù)." }
            ] }
        ] },

      /* ======================= ĐỀ 3 ======================= */
      { id: "d3", name: "Đề 3",
        mcq: [
          { id: "d3q1", level: "de", source: "SGK Bài 8",
            q: "Hai góc kề bù là hai góc",
            options: ["có tổng số đo bằng $90^\\circ$", "có chung một cạnh, hai cạnh còn lại là hai tia đối nhau", "có chung đỉnh và bằng nhau", "mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia"],
            answer: 1,
            explain: "Đó là định nghĩa hai góc kề bù. Phương án \"mỗi cạnh của góc này là tia đối của một cạnh của góc kia\" là định nghĩa hai góc đối đỉnh." },
          { id: "d3q2", level: "de", source: "SBT Bài 8 – BT 3.6",
            q: "Cho hai góc kề bù $\\widehat{AOB}$ và $\\widehat{BOC}$, biết $\\widehat{AOB} = 35^\\circ$. Số đo $\\widehat{BOC}$ là",
            options: ["$55^\\circ$", "$135^\\circ$", "$145^\\circ$", "$35^\\circ$"],
            answer: 2,
            explain: "$\\widehat{BOC} = 180^\\circ - 35^\\circ = 145^\\circ$." },
          { id: "d3q3", level: "de", source: "SBT Bài 8 – BT 3.2",
            q: "Hai đường thẳng $AB$ và $CD$ cắt nhau tại $O$, $\\widehat{AOC} = 65^\\circ$. Số đo $\\widehat{BOD}$ là" +
               rays({ rays: [[0, 'A'], [180, 'B'], [65, 'C'], [245, 'D']], arcs: [[0, 65, '65°']], namePos: 300 }),
            options: ["$115^\\circ$", "$65^\\circ$", "$25^\\circ$", "$130^\\circ$"],
            answer: 1,
            explain: "$\\widehat{BOD}$ và $\\widehat{AOC}$ là hai góc đối đỉnh ($OB$ là tia đối của $OA$, $OD$ là tia đối của $OC$) nên $\\widehat{BOD} = 65^\\circ$." },
          { id: "d3q4", level: "de", source: "SGK Bài 8",
            q: "Tia $Om$ nằm trong $\\widehat{xOy}$ và $\\widehat{xOm} = \\widehat{mOy}$. Khi đó",
            options: ["$\\widehat{xOm}$ và $\\widehat{mOy}$ là hai góc kề bù", "$Om$ là tia đối của tia $Ox$", "$\\widehat{xOm}$ và $\\widehat{mOy}$ là hai góc đối đỉnh", "$Om$ là tia phân giác của $\\widehat{xOy}$"],
            answer: 3,
            explain: "Tia nằm trong một góc và tạo với hai cạnh hai góc bằng nhau là tia phân giác của góc đó." },
          { id: "d3q5", level: "vua", source: "SGK Bài 9 – Câu hỏi tr.46",
            q: "Đường thẳng $t$ cắt hai đường thẳng $m$, $n$ lần lượt tại $M$, $N$ (các góc được đánh số như hình). Góc ở vị trí so le trong với $\\widehat{M_3}$ là" +
               tv({ al: 60, num: 1, names: ['m', 'n', 't', 'M', 'N'] }),
            options: ["$\\widehat{N_3}$", "$\\widehat{N_1}$", "$\\widehat{M_1}$", "$\\widehat{N_2}$"],
            answer: 1,
            explain: "$\\widehat{M_3}$ nằm giữa $m$ và $n$, bên trái $t$. Góc so le trong với nó nằm giữa $m$ và $n$, bên phải $t$, tại đỉnh $N$: $\\widehat{N_1}$. ($\\widehat{N_3}$ là góc đồng vị, $\\widehat{M_1}$ là góc đối đỉnh, $\\widehat{N_2}$ là góc trong cùng phía.)" },
          { id: "d3q6", level: "vua", source: "SGK Bài 9 – Tính chất tr.47",
            q: "Trên hình, biết $\\widehat{A_4} = \\widehat{B_2}$. Khi đó cặp góc nào sau đây cũng bằng nhau?" + tv({ al: 60, num: 1 }),
            options: ["$\\widehat{A_3}$ và $\\widehat{B_1}$", "$\\widehat{A_1}$ và $\\widehat{B_2}$", "$\\widehat{A_4}$ và $\\widehat{B_1}$", "$\\widehat{A_2}$ và $\\widehat{B_3}$"],
            answer: 0,
            explain: "$\\widehat{A_4}$ và $\\widehat{B_2}$ là một cặp so le trong bằng nhau, nên cặp so le trong còn lại $\\widehat{A_3}$ và $\\widehat{B_1}$ cũng bằng nhau. Các cặp khác chỉ bằng nhau khi các góc đều là góc vuông." },
          { id: "d3q7", level: "vua", source: "SBT Bài 9 – BT 3.10 (biến đổi)",
            q: "Qua điểm $M$ nằm ngoài đường thẳng $d$, vẽ đường thẳng $a$ vuông góc với $d$, rồi vẽ đường thẳng $b$ đi qua $M$ và vuông góc với $a$. Khi đó",
            options: ["$b \\perp d$", "$b$ trùng với $a$", "$b$ cắt $d$", "$b \\parallel d$"],
            answer: 3,
            explain: "$b$ và $d$ cùng vuông góc với $a$; chúng phân biệt vì $M \\in b$ nhưng $M \\notin d$. Vậy $b \\parallel d$." },
          { id: "d3q8", level: "vua", source: "SGK tr.50 – Ví dụ",
            q: "Trên hình, $\\widehat{A_2} = \\widehat{B_2} = 135^\\circ$. Hai góc này ở vị trí nào và suy ra điều gì?" +
               tv({ al: 45, num: 1, marks: [['A', 2, '135°'], ['B', 2, '135°']], pA: 4 }),
            options: ["So le trong; suy ra $a \\parallel b$", "Đồng vị; suy ra $a \\perp b$", "Đồng vị; suy ra $a \\parallel b$", "Trong cùng phía; suy ra $a$ cắt $b$"],
            answer: 2,
            explain: "$\\widehat{A_2}$ và $\\widehat{B_2}$ cùng nằm phía trên đường nằm ngang, bên trái $c$, nên là cặp đồng vị. Chúng bằng nhau nên $a \\parallel b$." },
          { id: "d3q9", level: "vua", source: "mới",
            q: "Hai đường thẳng $xy$ và $zt$ cắt nhau tại $O$, biết $\\widehat{xOz} - \\widehat{zOy} = 40^\\circ$. Số đo $\\widehat{xOz}$ là",
            options: ["$110^\\circ$", "$70^\\circ$", "$140^\\circ$", "$40^\\circ$"],
            answer: 0,
            explain: "$\\widehat{xOz}$ và $\\widehat{zOy}$ kề bù nên tổng bằng $180^\\circ$; hiệu bằng $40^\\circ$. Suy ra $\\widehat{xOz} = (180^\\circ + 40^\\circ) : 2 = 110^\\circ$ (và $\\widehat{zOy} = 70^\\circ$)." },
          { id: "d3q10", level: "kho", source: "SBT Bài 9 – Ví dụ 3 (biến đổi)",
            q: "Cho tam giác $ABC$, điểm $E$ thuộc cạnh $AB$, điểm $F$ thuộc cạnh $AC$. Biết $\\widehat{BEF} = 122^\\circ$ và $\\widehat{ABC} = 58^\\circ$. Khẳng định nào sau đây đúng?" + triEF(),
            options: ["$EF \\parallel BC$", "$EF$ cắt $BC$", "$\\widehat{AEF} = 122^\\circ$", "$\\widehat{AEF} = 32^\\circ$"],
            answer: 0,
            explain: "$\\widehat{AEF}$ và $\\widehat{BEF}$ kề bù nên $\\widehat{AEF} = 180^\\circ - 122^\\circ = 58^\\circ = \\widehat{ABC}$. Hai góc này ở vị trí đồng vị (đường thẳng $AB$ cắt $EF$ và $BC$) nên $EF \\parallel BC$." },
          { id: "d3q11", level: "kho", source: "mới",
            q: "Cho $\\widehat{AOB} = 80^\\circ$. Vẽ tia $OC$ là tia đối của tia $OA$, tia $OD$ là tia đối của tia $OB$. Tia $Om$ là tia phân giác của $\\widehat{AOB}$, tia $On$ là tia phân giác của $\\widehat{COD}$. Số đo $\\widehat{mOn}$ là",
            options: ["$80^\\circ$", "$160^\\circ$", "$180^\\circ$", "$100^\\circ$"],
            answer: 2,
            explain: "$\\widehat{COD}$ đối đỉnh với $\\widehat{AOB}$ nên bằng $80^\\circ$. Ta có $\\widehat{mOB} = 40^\\circ$, $\\widehat{BOC} = 180^\\circ - 80^\\circ = 100^\\circ$ (kề bù), $\\widehat{COn} = 40^\\circ$. Vậy $\\widehat{mOn} = 40^\\circ + 100^\\circ + 40^\\circ = 180^\\circ$: $Om$ và $On$ là hai tia đối nhau." }
        ],
        essay: [
          { id: "d3e1", level: "vua", source: "SBT Bài 8 – BT 3.3 (biến đổi)", maxPoints: 1.5,
            q: "Hai đường thẳng $AB$ và $CD$ cắt nhau tại $O$ sao cho $\\widehat{AOC} = 2\\cdot\\widehat{BOC}$.<br>a) Tính $\\widehat{AOC}$ và $\\widehat{BOC}$.<br>b) Tính $\\widehat{BOD}$ và $\\widehat{AOD}$.",
            modelAnswer: "a) $\\widehat{AOC}$ và $\\widehat{BOC}$ kề bù (vì $OA$, $OB$ là hai tia đối nhau) nên $\\widehat{AOC} + \\widehat{BOC} = 180^\\circ$.<br>" +
                         "Thay $\\widehat{AOC} = 2\\cdot\\widehat{BOC}$: $3\\cdot\\widehat{BOC} = 180^\\circ$, suy ra $\\widehat{BOC} = 60^\\circ$ và $\\widehat{AOC} = 120^\\circ$.<br>" +
                         "b) $\\widehat{BOD} = \\widehat{AOC} = 120^\\circ$ (đối đỉnh); $\\widehat{AOD} = \\widehat{BOC} = 60^\\circ$ (đối đỉnh).",
            rubric: [
              { pts: 0.5, text: "Nêu được $\\widehat{AOC} + \\widehat{BOC} = 180^\\circ$ (kề bù)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{BOC} = 60^\\circ$, $\\widehat{AOC} = 120^\\circ$." },
              { pts: 0.5, text: "Câu b: $\\widehat{BOD} = 120^\\circ$, $\\widehat{AOD} = 60^\\circ$ (đối đỉnh)." }
            ] },
          { id: "d3e2", level: "kho", source: "SGK tr.50 – BT 3.16 (mở rộng)", maxPoints: 1.5,
            q: "Cho đoạn thẳng $AB$. Vẽ hai tia $Ax$, $By$ nằm ở hai phía của đường thẳng $AB$ sao cho $\\widehat{xAB} = \\widehat{yBA} = 70^\\circ$ (như hình).<br>a) Giải thích vì sao hai đường thẳng chứa tia $Ax$ và $By$ song song với nhau.<br>b) Vẽ tia $Am$ là tia phân giác của $\\widehat{xAB}$, tia $Bn$ là tia phân giác của $\\widehat{yBA}$. Chứng tỏ hai đường thẳng chứa tia $Am$ và $Bn$ song song với nhau." + raysAB(),
            modelAnswer: "a) Đường thẳng $AB$ cắt hai đường thẳng chứa $Ax$ và $By$; $\\widehat{xAB}$ và $\\widehat{yBA}$ ở vị trí so le trong và bằng nhau ($= 70^\\circ$). Vậy hai đường thẳng chứa $Ax$ và $By$ song song.<br>" +
                         "b) $Am$ là tia phân giác của $\\widehat{xAB}$ nên $\\widehat{mAB} = 35^\\circ$; $Bn$ là tia phân giác của $\\widehat{yBA}$ nên $\\widehat{nBA} = 35^\\circ$.<br>" +
                         "Tia $Am$ nằm cùng phía với $Ax$, tia $Bn$ nằm cùng phía với $By$ so với đường thẳng $AB$, nên $\\widehat{mAB}$ và $\\widehat{nBA}$ ở vị trí so le trong và bằng nhau. Vậy hai đường thẳng chứa $Am$ và $Bn$ song song.",
            rubric: [
              { pts: 0.5, text: "Câu a: chỉ ra cặp góc so le trong bằng nhau và kết luận song song." },
              { pts: 0.5, text: "Câu b: tính đúng $\\widehat{mAB} = \\widehat{nBA} = 35^\\circ$." },
              { pts: 0.5, text: "Câu b: nêu được hai góc ở vị trí so le trong và kết luận song song." }
            ] }
        ] }
    ]
  });
})();
