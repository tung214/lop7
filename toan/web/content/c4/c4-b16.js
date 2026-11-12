(function () {
  // ===== Hình vẽ hình học bằng SVG (currentColor để hợp chế độ sáng/tối) =====
  // o = { w, h, max, pts: {A:[x,y],...},
  //       segs: [[P, Q, "dash|red|line"]]   (line = kéo dài hai phía),
  //       ticks: [[P, Q, k]]                  (k gạch đánh dấu cạnh bằng nhau),
  //       right: [[V, P, Q]]                  (kí hiệu góc vuông tại V giữa VP và VQ),
  //       arcs: [[V, P, Q, k, red]]           (cung đánh dấu góc tại V),
  //       texts: [[chuỗi, x, y, red]], names: ["A",...] (mặc định: mọi điểm), off: {A:[dx,dy]} }
  function fig(o) {
    var P = o.pts, W = o.w || 300, H = o.h || 195;
    var sub = function (a, b) { return [a[0] - b[0], a[1] - b[1]]; };
    var unit = function (v) { var l = Math.sqrt(v[0] * v[0] + v[1] * v[1]) || 1; return [v[0] / l, v[1] / l]; };
    var f = function (n) { return (+n).toFixed(1); };
    var col = function (r) { return r ? '#e5484d' : 'currentColor'; };
    var ln = function (a, b, extra) { return '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" ' + extra + '/>'; };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + (o.max || 320) + 'px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">';
    (o.segs || []).forEach(function (g) {
      var a = P[g[0]], b = P[g[1]], st = g[2] || '';
      if (st.indexOf('line') >= 0) {
        var u = unit(sub(b, a)), e = 22;
        a = [a[0] - u[0] * e, a[1] - u[1] * e]; b = [b[0] + u[0] * e, b[1] + u[1] * e];
      }
      s += ln(a, b, 'stroke="' + col(st.indexOf('red') >= 0) + '" stroke-width="1.6"' + (st.indexOf('dash') >= 0 ? ' stroke-dasharray="5 4"' : ''));
    });
    (o.ticks || []).forEach(function (t) {
      var a = P[t[0]], b = P[t[1]], k = t[2] || 1, u = unit(sub(b, a)), n = [-u[1], u[0]];
      var m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      for (var i = 0; i < k; i++) {
        var d = (i - (k - 1) / 2) * 4, c = [m[0] + u[0] * d, m[1] + u[1] * d];
        s += ln([c[0] + n[0] * 5, c[1] + n[1] * 5], [c[0] - n[0] * 5, c[1] - n[1] * 5], 'stroke="currentColor" stroke-width="1.3"');
      }
    });
    (o.right || []).forEach(function (r) {
      var v = P[r[0]], ua = unit(sub(P[r[1]], v)), ub = unit(sub(P[r[2]], v)), z = 9;
      s += '<path d="M' + f(v[0] + ua[0] * z) + ' ' + f(v[1] + ua[1] * z) + ' L' + f(v[0] + (ua[0] + ub[0]) * z) + ' ' + f(v[1] + (ua[1] + ub[1]) * z) +
        ' L' + f(v[0] + ub[0] * z) + ' ' + f(v[1] + ub[1] * z) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
    });
    (o.arcs || []).forEach(function (r) {
      var v = P[r[0]], ua = unit(sub(P[r[1]], v)), ub = unit(sub(P[r[2]], v)), k = r[3] || 1;
      var sw = (ua[0] * ub[1] - ua[1] * ub[0]) > 0 ? 1 : 0;
      for (var i = 0; i < k; i++) {
        var R = 16 + 4 * i;
        s += '<path d="M' + f(v[0] + ua[0] * R) + ' ' + f(v[1] + ua[1] * R) + ' A' + R + ' ' + R + ' 0 0 ' + sw + ' ' +
          f(v[0] + ub[0] * R) + ' ' + f(v[1] + ub[1] * R) + '" fill="none" stroke="' + col(r[4]) + '" stroke-width="1.3"/>';
      }
    });
    (o.texts || []).forEach(function (t) {
      s += '<text x="' + t[1] + '" y="' + t[2] + '" font-size="13" text-anchor="middle" dominant-baseline="middle" fill="' + col(t[3]) + '">' + t[0] + '</text>';
    });
    var names = o.names || Object.keys(P), cx = 0, cy = 0, keys = Object.keys(P);
    keys.forEach(function (k) { cx += P[k][0]; cy += P[k][1]; });
    cx /= keys.length; cy /= keys.length;
    names.forEach(function (k) {
      var p = P[k], d = (o.off && o.off[k]) || (function () { var u = unit([p[0] - cx, p[1] - cy]); return [u[0] * 13, u[1] * 13]; })();
      s += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2" fill="currentColor"/>';
      s += '<text x="' + f(p[0] + d[0]) + '" y="' + f(p[1] + d[1]) + '" font-size="14" font-style="italic" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="currentColor">' + k + '</text>';
    });
    return s + '</svg>';
  }
  function along(A, B, t) { return [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]; }
  function foot(Pt, A, B) {   // chân đường vuông góc hạ từ Pt xuống đường thẳng AB
    var dx = B[0] - A[0], dy = B[1] - A[1], t = ((Pt[0] - A[0]) * dx + (Pt[1] - A[1]) * dy) / (dx * dx + dy * dy);
    return along(A, B, t);
  }

  // ----- các hình dùng trong bài -----
  var figCan = fig({
    pts: { A: [150, 22], B: [70, 168], C: [230, 168] },
    segs: [["A", "B"], ["A", "C"], ["B", "C"]], ticks: [["A", "B", 1], ["A", "C", 1]],
    arcs: [["B", "C", "A", 1], ["C", "A", "B", 1]]
  });
  var figTrungTruc = fig({
    pts: { A: [50, 145], B: [250, 145], O: [150, 145], M: [150, 62] },
    segs: [["A", "B"], ["M", "O", "line"], ["M", "A", "dash"], ["M", "B", "dash"]],
    ticks: [["A", "O", 2], ["O", "B", 2]], right: [["O", "B", "M"]],
    texts: [["d", 160, 44]], off: { O: [12, 14], M: [-14, -4] }
  });
  var exA = [150, 22], exB = [60, 172], exC = [240, 172];
  var figVidu3 = fig({
    pts: { A: exA, B: exB, C: exC, D: along(exA, exB, 0.45), E: along(exA, exC, 0.45) },
    segs: [["A", "B"], ["A", "C"], ["B", "C"], ["B", "E"], ["C", "D"]],
    ticks: [["A", "D", 2], ["A", "E", 2], ["D", "B", 1], ["E", "C", 1]],
    off: { D: [-13, -2], E: [13, -2] }
  });
  var figDEF = fig({
    pts: { D: [150, 25], E: [80, 165], F: [220, 165] },
    segs: [["D", "E"], ["D", "F"], ["E", "F"]], ticks: [["D", "E", 1], ["D", "F", 1]], h: 190
  });
  var figPQR = fig({
    pts: { P: [150, 30], Q: [50, 165], R: [250, 165] },
    segs: [["P", "Q"], ["P", "R"], ["Q", "R"]], arcs: [["Q", "R", "P", 1], ["R", "P", "Q", 1]], h: 190
  });
  var fig556 = fig({
    pts: { A: [150, 25], B: [75, 165], C: [225, 165] },
    segs: [["A", "B"], ["A", "C"], ["B", "C"]], ticks: [["A", "B", 1], ["A", "C", 1]],
    texts: [["5 cm", 88, 90], ["5 cm", 212, 90], ["6 cm", 150, 182]]
  });
  var figTrungDiem = fig({
    pts: { A: [150, 22], B: [60, 170], C: [240, 170], M: [150, 170] },
    segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "M"]],
    ticks: [["A", "B", 1], ["A", "C", 1], ["B", "M", 2], ["M", "C", 2]], off: { M: [0, 15] }
  });
  var dA = [150, 22], dB = [60, 175], dC = [240, 175];
  var figDuongCao = fig({
    pts: { A: dA, B: dB, C: dC, E: foot(dB, dA, dC), F: foot(dC, dA, dB) },
    segs: [["A", "B"], ["A", "C"], ["B", "C"], ["B", "E"], ["C", "F"]],
    ticks: [["A", "B", 1], ["A", "C", 1]], right: [["E", "C", "B"], ["F", "B", "C"]],
    off: { E: [13, -4], F: [-13, -4] }
  });
  var figDeu60 = fig({
    pts: { A: [150, 25], B: [66, 170], H: [150, 170], C: [234, 170] },
    segs: [["A", "B"], ["A", "H"], ["B", "H"], ["H", "C", "dash"], ["A", "C", "dash"]],
    ticks: [["B", "H", 1], ["H", "C", 1]], right: [["H", "C", "A"]], arcs: [["B", "H", "A", 1]],
    texts: [["60°", 100, 158]], off: { H: [0, 15] }
  });
  var figAHM = fig({
    pts: { A: [150, 22], B: [60, 170], C: [240, 170], H: [150, 170], M: [150, 108] },
    segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "H"], ["M", "B"], ["M", "C"]],
    ticks: [["A", "B", 1], ["A", "C", 1]], right: [["H", "C", "A"]], off: { H: [0, 15], M: [14, -4] }
  });

  registerLesson({
    id: "c4-b16",
    chapter: 4,
    kind: "lesson",
    title: "Bài 16. Tam giác cân. Đường trung trực của đoạn thẳng",
    sgkPages: [80, 84],
    sbtPages: [67, 70],
    objectives: [
      "Nhận biết tam giác cân, tam giác đều; gọi tên cạnh bên, cạnh đáy, góc ở đỉnh, góc ở đáy",
      "Vận dụng tính chất hai góc ở đáy của tam giác cân bằng nhau (và điều ngược lại) để tính góc, chứng minh",
      "Nhận biết đường trung trực của đoạn thẳng và tính chất: điểm trên trung trực cách đều hai mút",
      "Vẽ đường trung trực của một đoạn thẳng bằng thước thẳng và compa"
    ],

    theory: [
      {
        heading: "1. Tam giác cân",
        html: "<b>Tam giác cân</b> là tam giác có hai cạnh bằng nhau." + figCan +
          "Tam giác $ABC$ có $AB = AC$ gọi là tam giác cân tại đỉnh $A$:" +
          "<ul><li>$AB$, $AC$ là hai <b>cạnh bên</b>; $BC$ là <b>cạnh đáy</b>.</li>" +
          "<li>$\\widehat{B}$, $\\widehat{C}$ là hai <b>góc ở đáy</b>; $\\widehat{A}$ là <b>góc ở đỉnh</b>.</li>" +
          "<li>Chú ý: \"cân tại đỉnh nào\" thì đỉnh đó nằm giữa hai cạnh bằng nhau; cạnh đối diện đỉnh đó là cạnh đáy.</li></ul>"
      },
      {
        heading: "2. Tính chất của tam giác cân",
        html: "<ul><li>Trong một tam giác cân, <b>hai góc ở đáy bằng nhau</b>: $\\triangle ABC$ cân tại $A$ thì $\\widehat{B} = \\widehat{C}$.</li>" +
          "<li><b>Ngược lại</b>, tam giác có hai góc bằng nhau thì là tam giác cân: nếu $\\widehat{B} = \\widehat{C}$ thì $\\triangle ABC$ cân tại $A$ (tức $AB = AC$).</li>" +
          "<li>Từ tổng ba góc bằng $180^\\circ$: nếu tam giác cân tại $A$ thì $\\widehat{B} = \\widehat{C} = \\dfrac{180^\\circ - \\widehat{A}}{2}$ và $\\widehat{A} = 180^\\circ - 2\\widehat{B}$. Vì vậy góc ở đáy của tam giác cân luôn là góc nhọn.</li>" +
          "<li>Trong tam giác $ABC$ cân tại $A$, nếu $M$ là trung điểm của $BC$ thì $\\triangle ABM = \\triangle ACM$ (c.c.c), suy ra $AM \\perp BC$ và $AM$ là tia phân giác của góc $BAC$.</li></ul>"
      },
      {
        heading: "3. Tam giác đều, tam giác vuông cân",
        html: "<ul><li><b>Tam giác đều</b> là tam giác có ba cạnh bằng nhau. Mỗi góc của tam giác đều bằng $60^\\circ$.</li>" +
          "<li>Tam giác có <b>ba góc bằng nhau</b> là tam giác đều. Tam giác cân có <b>một góc bằng $60^\\circ$</b> là tam giác đều.</li>" +
          "<li><b>Tam giác vuông cân</b> là tam giác vuông có hai cạnh góc vuông bằng nhau. Nó cân tại đỉnh góc vuông và hai góc nhọn đều bằng $45^\\circ$. Ngược lại, tam giác vuông có một góc nhọn bằng $45^\\circ$ là tam giác vuông cân.</li></ul>"
      },
      {
        heading: "4. Đường trung trực của đoạn thẳng",
        html: "Đường thẳng <b>vuông góc với một đoạn thẳng tại trung điểm</b> của nó gọi là <b>đường trung trực</b> của đoạn thẳng đó. Đường trung trực cũng là trục đối xứng của đoạn thẳng." +
          figTrungTruc +
          "<ul><li>Cần <b>đủ cả hai</b> điều kiện: đi qua trung điểm $O$ của $AB$ <b>và</b> vuông góc với $AB$.</li>" +
          "<li><b>Tính chất:</b> điểm nằm trên đường trung trực của một đoạn thẳng thì cách đều hai mút: $M \\in d \\Rightarrow MA = MB$.</li>" +
          "<li><b>Ngược lại:</b> điểm cách đều hai mút của đoạn thẳng thì nằm trên đường trung trực của đoạn thẳng đó. Vậy đường trung trực của $AB$ là tập hợp tất cả các điểm cách đều $A$ và $B$.</li>" +
          "<li><b>Vẽ bằng thước và compa:</b> lấy $A$ làm tâm vẽ cung tròn bán kính lớn hơn $\\frac{AB}{2}$; lấy $B$ làm tâm vẽ cung tròn cùng bán kính; hai cung cắt nhau tại $M$, $N$. Đường thẳng $MN$ là đường trung trực của $AB$ (giao điểm của $MN$ và $AB$ là trung điểm của $AB$).</li></ul>"
      }
    ],

    skills: [
      "<b>Tính góc trong tam giác cân:</b> xác định đúng đỉnh cân → hai góc ở đáy bằng nhau → dùng tổng ba góc $180^\\circ$. Biết góc đỉnh $\\alpha$: mỗi góc đáy $= (180^\\circ - \\alpha) : 2$. Biết góc đáy $\\beta$: góc đỉnh $= 180^\\circ - 2\\beta$.",
      "<b>Chứng minh tam giác cân:</b> chỉ ra hai cạnh bằng nhau (thường qua hai tam giác bằng nhau), hoặc hai góc bằng nhau.",
      "<b>Chứng minh tam giác đều:</b> ba cạnh bằng nhau; hoặc ba góc bằng nhau; hoặc tam giác cân có một góc $60^\\circ$.",
      "<b>Dùng đường trung trực:</b> muốn có $MA = MB$, chứng minh $M$ nằm trên trung trực của $AB$; muốn chứng minh một đường thẳng là trung trực của $AB$, chỉ ra hai điểm phân biệt của nó cùng cách đều $A$ và $B$ (hoặc nó vuông góc với $AB$ tại trung điểm).",
      "<b>Trong tam giác cân tại $A$:</b> đường thẳng đi qua $A$ và trung điểm $BC$ cũng vuông góc với $BC$, chia đôi góc $A$ — nó chính là đường trung trực của $BC$.",
      "<b>Lỗi hay gặp:</b> nhầm góc ở đáy với góc ở đỉnh khi tam giác cân tại đỉnh khác $A$; cho rằng đường thẳng chỉ cần đi qua trung điểm (hoặc chỉ cần vuông góc) là trung trực; cho rằng tam giác có một góc $60^\\circ$ là tam giác đều (phải là tam giác <b>cân</b> có một góc $60^\\circ$)."
    ],

    examples: [
      {
        q: "a) Tam giác $ABC$ cân tại $A$ có $\\widehat{B} = 72^\\circ$. Tính $\\widehat{C}$ và $\\widehat{A}$.<br>b) Tam giác $MNP$ cân tại $M$ có $\\widehat{M} = 40^\\circ$. Tính $\\widehat{N}$ và $\\widehat{P}$.",
        solution: "a) Tam giác $ABC$ cân tại $A$ nên $\\widehat{C} = \\widehat{B} = 72^\\circ$. Do đó $\\widehat{A} = 180^\\circ - 72^\\circ - 72^\\circ = 36^\\circ$.<br>" +
          "b) Tam giác $MNP$ cân tại $M$ nên $\\widehat{N} = \\widehat{P}$ và $\\widehat{N} + \\widehat{P} = 180^\\circ - 40^\\circ = 140^\\circ$. Vậy $\\widehat{N} = \\widehat{P} = 70^\\circ$."
      },
      {
        q: "Cho $M$ là một điểm nằm trên đường trung trực của đoạn thẳng $AB$ ($M$ không thuộc $AB$). Biết $AM = 5$ cm và $\\widehat{AMB} = 40^\\circ$. Tính $BM$ và $\\widehat{MAB}$.",
        solution: "$M$ nằm trên đường trung trực của $AB$ nên $MB = MA = 5$ cm.<br>" +
          "Tam giác $MAB$ có $MA = MB$ nên cân tại $M$, suy ra $\\widehat{MAB} = \\widehat{MBA}$.<br>" +
          "Do đó $\\widehat{MAB} = \\dfrac{180^\\circ - 40^\\circ}{2} = 70^\\circ$."
      },
      {
        q: "Cho tam giác $ABC$ cân tại $A$. Trên các cạnh $AB$, $AC$ lần lượt lấy các điểm $D$, $E$ sao cho $AD = AE$. Chứng minh rằng $BE = CD$." + figVidu3,
        solution: "Xét $\\triangle ABE$ và $\\triangle ACD$ có:<br>" +
          "• $AB = AC$ (vì $\\triangle ABC$ cân tại $A$);<br>• $\\widehat{A}$ là góc chung;<br>• $AE = AD$ (giả thiết).<br>" +
          "Vậy $\\triangle ABE = \\triangle ACD$ (c.g.c), suy ra $BE = CD$ (hai cạnh tương ứng)."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.80 – Định nghĩa",
            q: "Tam giác cân là tam giác",
            options: ["có ba góc nhọn", "có hai cạnh bằng nhau", "có một góc vuông", "có ba cạnh khác nhau"],
            answer: 1,
            explain: "Theo định nghĩa, tam giác cân là tam giác có hai cạnh bằng nhau."
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.81 – Tính chất",
            q: "Cho tam giác $ABC$ cân tại $A$. Khẳng định nào sau đây đúng?",
            options: ["$\\widehat{B} = \\widehat{C}$", "$\\widehat{A} = \\widehat{B}$", "$AB = BC$", "$\\widehat{A} = \\widehat{C}$"],
            answer: 0,
            explain: "Tam giác cân tại $A$ thì $AB = AC$ và hai góc ở đáy bằng nhau: $\\widehat{B} = \\widehat{C}$."
          },
          {
            id: "d1q3", level: "de", source: "SGK tr.80 – Câu hỏi",
            q: "Tam giác $DEF$ trong hình dưới có $DE = DF$. Cạnh đáy của tam giác cân $DEF$ là" + figDEF,
            options: ["$DE$", "$DF$", "$EF$", "$DE$ và $DF$"],
            answer: 2,
            explain: "Tam giác cân tại $D$; hai cạnh bên là $DE$, $DF$; cạnh đối diện đỉnh $D$ là cạnh đáy $EF$."
          },
          {
            id: "d1q4", level: "de", source: "SBT Bài 16 – BT 4.42",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{B} = 65^\\circ$. Số đo góc $C$ là",
            options: ["$25^\\circ$", "$50^\\circ$", "$115^\\circ$", "$65^\\circ$"],
            answer: 3,
            explain: "Hai góc ở đáy của tam giác cân bằng nhau nên $\\widehat{C} = \\widehat{B} = 65^\\circ$."
          },
          {
            id: "d1q5", level: "vua", source: "SBT Bài 16 – Ví dụ 1",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 40^\\circ$. Số đo góc $B$ là",
            options: ["$70^\\circ$", "$40^\\circ$", "$140^\\circ$", "$50^\\circ$"],
            answer: 0,
            explain: "$\\widehat{B} = \\widehat{C}$ và $\\widehat{B} + \\widehat{C} = 180^\\circ - 40^\\circ = 140^\\circ$, nên $\\widehat{B} = 70^\\circ$."
          },
          {
            id: "d1q6", level: "vua", source: "SBT Bài 16 – BT 4.42",
            q: "Tam giác $MNP$ cân tại $M$ có $\\widehat{N} = 50^\\circ$. Số đo góc $M$ là",
            options: ["$50^\\circ$", "$80^\\circ$", "$65^\\circ$", "$130^\\circ$"],
            answer: 1,
            explain: "$\\widehat{P} = \\widehat{N} = 50^\\circ$, nên $\\widehat{M} = 180^\\circ - 50^\\circ - 50^\\circ = 80^\\circ$."
          },
          {
            id: "d1q7", level: "vua", source: "SGK tr.82 – Định nghĩa",
            q: "Đường trung trực của đoạn thẳng $AB$ là",
            options: ["đường thẳng đi qua trung điểm của $AB$", "đường thẳng vuông góc với $AB$", "đường thẳng vuông góc với $AB$ tại trung điểm của $AB$", "đường thẳng song song với $AB$"],
            answer: 2,
            explain: "Đường trung trực phải vừa vuông góc với $AB$, vừa đi qua trung điểm của $AB$. Chỉ một trong hai điều kiện là chưa đủ."
          },
          {
            id: "d1q8", level: "vua", source: "SGK tr.83 – Luyện tập 2",
            q: "Điểm $M$ nằm trên đường trung trực của đoạn thẳng $AB$, biết $MA = 4$ cm và $AB = 6$ cm. Độ dài $MB$ là",
            options: ["$3$ cm", "$6$ cm", "$2$ cm", "$4$ cm"],
            answer: 3,
            explain: "Điểm nằm trên đường trung trực của $AB$ thì cách đều $A$ và $B$, nên $MB = MA = 4$ cm (độ dài $AB$ không ảnh hưởng)."
          },
          {
            id: "d1q9", level: "kho", source: "SGK tr.81 – Thử thách nhỏ",
            q: "Một tam giác cân có một góc bằng $60^\\circ$ là",
            options: ["tam giác vuông", "tam giác đều", "tam giác tù", "tam giác vuông cân"],
            answer: 1,
            explain: "Nếu góc $60^\\circ$ là góc ở đáy thì góc đáy kia cũng $60^\\circ$, góc đỉnh $= 60^\\circ$. Nếu là góc ở đỉnh thì mỗi góc đáy $= (180^\\circ - 60^\\circ) : 2 = 60^\\circ$. Cả hai trường hợp ba góc đều bằng $60^\\circ$, nên là tam giác đều."
          },
          {
            id: "d1q10", level: "kho", source: "mới",
            q: "Tam giác $ABC$ cân tại $A$. Góc kề bù với góc $ACB$ bằng $110^\\circ$. Số đo góc $A$ là",
            options: ["$70^\\circ$", "$55^\\circ$", "$40^\\circ$", "$110^\\circ$"],
            answer: 2,
            explain: "$\\widehat{ACB} = 180^\\circ - 110^\\circ = 70^\\circ$, nên $\\widehat{B} = 70^\\circ$ và $\\widehat{A} = 180^\\circ - 70^\\circ - 70^\\circ = 40^\\circ$."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK Bài 16 – BT 4.24", maxPoints: 3,
            q: "Cho tam giác $ABC$ cân tại $A$, $M$ là trung điểm của $BC$." + figTrungDiem +
              "a) Chứng minh $\\triangle ABM = \\triangle ACM$.<br>b) Chứng minh $AM \\perp BC$.<br>c) Chứng minh $AM$ là tia phân giác của góc $BAC$.",
            modelAnswer: "a) Xét $\\triangle ABM$ và $\\triangle ACM$ có: $AB = AC$ (tam giác $ABC$ cân tại $A$); $BM = CM$ ($M$ là trung điểm $BC$); $AM$ là cạnh chung.<br>" +
              "Vậy $\\triangle ABM = \\triangle ACM$ (c.c.c).<br>" +
              "b) Từ câu a suy ra $\\widehat{AMB} = \\widehat{AMC}$ (hai góc tương ứng). Mà $\\widehat{AMB} + \\widehat{AMC} = 180^\\circ$ (hai góc kề bù) nên $\\widehat{AMB} = \\widehat{AMC} = 90^\\circ$, tức $AM \\perp BC$.<br>" +
              "c) Từ câu a suy ra $\\widehat{BAM} = \\widehat{CAM}$. Tia $AM$ nằm giữa hai tia $AB$, $AC$ nên $AM$ là tia phân giác của góc $BAC$.",
            rubric: [
              { pts: 1, text: "Câu a: nêu đủ ba cặp cạnh bằng nhau (có lí do) và kết luận $\\triangle ABM = \\triangle ACM$ (c.c.c)." },
              { pts: 1, text: "Câu b: suy ra $\\widehat{AMB} = \\widehat{AMC}$, dùng kề bù để được $90^\\circ$, kết luận $AM \\perp BC$." },
              { pts: 1, text: "Câu c: suy ra $\\widehat{BAM} = \\widehat{CAM}$ và kết luận $AM$ là tia phân giác góc $BAC$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SGK tr.81 – Nhận xét",
            q: "Tam giác đều là tam giác",
            options: ["có ba cạnh bằng nhau", "có hai cạnh bằng nhau", "có một góc bằng $60^\\circ$", "có ba góc nhọn"],
            answer: 0,
            explain: "Tam giác đều là tam giác có ba cạnh bằng nhau. Tam giác có một góc $60^\\circ$ chưa chắc đều (ví dụ tam giác có các góc $60^\\circ, 70^\\circ, 50^\\circ$)."
          },
          {
            id: "d2q2", level: "de", source: "SGK tr.81 – Luyện tập 1",
            q: "Mỗi góc của một tam giác đều có số đo bằng",
            options: ["$45^\\circ$", "$90^\\circ$", "$60^\\circ$", "$30^\\circ$"],
            answer: 2,
            explain: "Tam giác đều có ba góc bằng nhau, tổng là $180^\\circ$, nên mỗi góc bằng $180^\\circ : 3 = 60^\\circ$."
          },
          {
            id: "d2q3", level: "de", source: "SGK tr.81 – HĐ2",
            q: "Tam giác $PQR$ trong hình dưới có $\\widehat{Q} = \\widehat{R}$. Tam giác $PQR$ cân tại đỉnh nào?" + figPQR,
            options: ["$Q$", "$R$", "Không là tam giác cân", "$P$"],
            answer: 3,
            explain: "Tam giác có hai góc bằng nhau thì là tam giác cân. Hai góc bằng nhau $\\widehat{Q}$, $\\widehat{R}$ là hai góc ở đáy, nên tam giác cân tại đỉnh còn lại là $P$ ($PQ = PR$)."
          },
          {
            id: "d2q4", level: "de", source: "SGK tr.80 – Câu hỏi",
            q: "Tam giác $ABC$ cân tại $B$ (tức $BA = BC$). Hai góc ở đáy của tam giác này là",
            options: ["$\\widehat{A}$ và $\\widehat{B}$", "$\\widehat{A}$ và $\\widehat{C}$", "$\\widehat{B}$ và $\\widehat{C}$", "chỉ có $\\widehat{B}$"],
            answer: 1,
            explain: "Cân tại $B$ thì $\\widehat{B}$ là góc ở đỉnh, cạnh đáy là $AC$, hai góc ở đáy là $\\widehat{A}$ và $\\widehat{C}$."
          },
          {
            id: "d2q5", level: "vua", source: "SBT Bài 16 – BT 4.42",
            q: "Tam giác $DEF$ cân tại $D$ có $\\widehat{E} = 35^\\circ$. Số đo góc $D$ là",
            options: ["$110^\\circ$", "$35^\\circ$", "$72{,}5^\\circ$", "$145^\\circ$"],
            answer: 0,
            explain: "$\\widehat{F} = \\widehat{E} = 35^\\circ$, nên $\\widehat{D} = 180^\\circ - 2 \\cdot 35^\\circ = 110^\\circ$."
          },
          {
            id: "d2q6", level: "vua", source: "SBT Bài 16 – BT 4.42",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 100^\\circ$. Số đo góc $C$ là",
            options: ["$80^\\circ$", "$100^\\circ$", "$40^\\circ$", "$50^\\circ$"],
            answer: 2,
            explain: "$\\widehat{B} = \\widehat{C} = (180^\\circ - 100^\\circ) : 2 = 40^\\circ$."
          },
          {
            id: "d2q7", level: "vua", source: "SBT Bài 16 – BT 4.49",
            q: "Cho $A$ là một điểm nằm trên đường trung trực của đoạn thẳng $BC$, $A$ không thuộc $BC$. Khẳng định nào sau đây <b>chưa chắc</b> đúng?",
            options: ["$AB = AC$", "$\\widehat{ABC} = \\widehat{ACB}$", "Tam giác $ABC$ cân tại $A$", "Tam giác $ABC$ đều"],
            answer: 3,
            explain: "$A$ thuộc trung trực của $BC$ nên $AB = AC$, tam giác $ABC$ cân tại $A$ và $\\widehat{ABC} = \\widehat{ACB}$. Nhưng $AB$ chưa chắc bằng $BC$, nên tam giác chưa chắc đều."
          },
          {
            id: "d2q8", level: "vua", source: "mới",
            q: "Cho đoạn thẳng $AB = 8$ cm. Đường thẳng $d$ vuông góc với $AB$ tại trung điểm của $AB$. Điểm $M$ thuộc $d$ sao cho $MA = 5$ cm. Chu vi tam giác $MAB$ bằng",
            options: ["$13$ cm", "$18$ cm", "$15$ cm", "$10$ cm"],
            answer: 1,
            explain: "$d$ là đường trung trực của $AB$, $M \\in d$ nên $MB = MA = 5$ cm. Chu vi $= 5 + 5 + 8 = 18$ (cm)."
          },
          {
            id: "d2q9", level: "kho", source: "SGK Bài 16 – BT 4.26",
            q: "Tam giác $ABC$ vuông cân tại $A$. Số đo góc $B$ là",
            options: ["$30^\\circ$", "$60^\\circ$", "$90^\\circ$", "$45^\\circ$"],
            answer: 3,
            explain: "Tam giác vuông cân tại $A$ nên $\\widehat{B} = \\widehat{C}$ và $\\widehat{B} + \\widehat{C} = 90^\\circ$, suy ra $\\widehat{B} = 45^\\circ$."
          },
          {
            id: "d2q10", level: "kho", source: "mới",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 2\\widehat{B}$. Số đo góc $A$ là",
            options: ["$60^\\circ$", "$90^\\circ$", "$45^\\circ$", "$120^\\circ$"],
            answer: 1,
            explain: "Gọi $\\widehat{B} = \\widehat{C} = x$, thì $\\widehat{A} = 2x$. Ta có $2x + x + x = 180^\\circ$, nên $x = 45^\\circ$ và $\\widehat{A} = 90^\\circ$ (tam giác vuông cân)."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SBT Bài 16 – Ví dụ 2", maxPoints: 1.5,
            q: "Cho $M$ là một điểm nằm trên đường trung trực của đoạn thẳng $AB$ ($M$ không thuộc $AB$). Biết $AM = 6$ cm và $\\widehat{AMB} = 70^\\circ$. Tính độ dài $BM$ và số đo góc $MAB$.",
            modelAnswer: "$M$ nằm trên đường trung trực của $AB$ nên $MB = MA = 6$ cm.<br>" +
              "Tam giác $MAB$ có $MA = MB$ nên cân tại $M$, suy ra $\\widehat{MAB} = \\widehat{MBA}$.<br>" +
              "Do đó $\\widehat{MAB} = \\dfrac{180^\\circ - 70^\\circ}{2} = 55^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $MB = 6$ cm, có lí do (điểm trên trung trực cách đều hai mút)." },
              { pts: 0.5, text: "Nhận ra tam giác $MAB$ cân tại $M$, nên $\\widehat{MAB} = \\widehat{MBA}$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{MAB} = 55^\\circ$." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SGK Bài 16 – BT 4.23", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ cân tại $A$. Các điểm $E$, $F$ lần lượt nằm trên các cạnh $AC$, $AB$ sao cho $BE \\perp AC$, $CF \\perp AB$. Chứng minh rằng $BE = CF$." + figDuongCao,
            modelAnswer: "Xét hai tam giác vuông $BEC$ (vuông tại $E$) và $CFB$ (vuông tại $F$) có:<br>" +
              "• $BC$ là cạnh huyền chung;<br>• $\\widehat{ECB} = \\widehat{FBC}$ (hai góc ở đáy của tam giác $ABC$ cân tại $A$).<br>" +
              "Vậy $\\triangle BEC = \\triangle CFB$ (cạnh huyền – góc nhọn).<br>" +
              "Suy ra $BE = CF$ (hai cạnh tương ứng).",
            rubric: [
              { pts: 0.5, text: "Chọn đúng hai tam giác vuông $BEC$, $CFB$; nêu cạnh huyền $BC$ chung." },
              { pts: 0.5, text: "Nêu $\\widehat{ECB} = \\widehat{FBC}$ (góc ở đáy tam giác cân) và kết luận hai tam giác bằng nhau (cạnh huyền – góc nhọn)." },
              { pts: 0.5, text: "Suy ra $BE = CF$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.81 – Tính chất",
            q: "Trong một tam giác cân, hai góc ở đáy",
            options: ["bù nhau", "phụ nhau", "bằng nhau", "có tổng bằng góc ở đỉnh"],
            answer: 2,
            explain: "Tính chất của tam giác cân: hai góc ở đáy bằng nhau."
          },
          {
            id: "d3q2", level: "de", source: "SGK tr.83 – Tính chất",
            q: "Một điểm nằm trên đường trung trực của một đoạn thẳng thì",
            options: ["cách đều hai mút của đoạn thẳng đó", "là trung điểm của đoạn thẳng đó", "nằm trên đoạn thẳng đó", "cách một mút gấp đôi mút còn lại"],
            answer: 0,
            explain: "Điểm nằm trên đường trung trực của một đoạn thẳng thì cách đều hai mút của đoạn thẳng đó. Nó chỉ là trung điểm khi nằm trên đoạn thẳng."
          },
          {
            id: "d3q3", level: "de", source: "SBT Bài 16 – BT 4.41",
            q: "Tam giác $HIK$ có $\\widehat{H} = 70^\\circ$, $\\widehat{I} = 40^\\circ$. Tam giác $HIK$ là",
            options: ["tam giác cân tại $H$", "tam giác cân tại $K$", "tam giác đều", "tam giác cân tại $I$"],
            answer: 3,
            explain: "$\\widehat{K} = 180^\\circ - 70^\\circ - 40^\\circ = 70^\\circ = \\widehat{H}$. Hai góc bằng nhau là $\\widehat{H}$, $\\widehat{K}$ (góc ở đáy), nên tam giác cân tại $I$."
          },
          {
            id: "d3q4", level: "de", source: "mới",
            q: "Tam giác $XYZ$ đều có cạnh $5$ cm. Chu vi tam giác $XYZ$ là",
            options: ["$10$ cm", "$15$ cm", "$25$ cm", "$20$ cm"],
            answer: 1,
            explain: "Tam giác đều có ba cạnh bằng nhau, nên chu vi $= 3 \\cdot 5 = 15$ (cm)."
          },
          {
            id: "d3q5", level: "vua", source: "SBT Bài 16 – BT 4.42",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 70^\\circ$. Số đo góc $B$ là",
            options: ["$110^\\circ$", "$70^\\circ$", "$55^\\circ$", "$35^\\circ$"],
            answer: 2,
            explain: "$\\widehat{B} = \\widehat{C} = (180^\\circ - 70^\\circ) : 2 = 55^\\circ$."
          },
          {
            id: "d3q6", level: "vua", source: "mới",
            q: "Tam giác $ABC$ cân tại $A$ như hình dưới, có $AB = 5$ cm, $BC = 6$ cm. Chu vi tam giác $ABC$ là" + fig556,
            options: ["$16$ cm", "$11$ cm", "$17$ cm", "$15$ cm"],
            answer: 0,
            explain: "Tam giác cân tại $A$ nên $AC = AB = 5$ cm. Chu vi $= 5 + 5 + 6 = 16$ (cm)."
          },
          {
            id: "d3q7", level: "vua", source: "SGK tr.82 – Câu hỏi (Hình 4.64)",
            q: "Đường thẳng $d$ cắt đoạn thẳng $AB$ tại $O$. Trong trường hợp nào sau đây, $d$ là đường trung trực của $AB$?",
            options: ["$OA = OB$", "$d \\perp AB$", "$OA = OB$ và $d \\perp AB$", "$OA = 2\\,OB$ và $d \\perp AB$"],
            answer: 2,
            explain: "Đường trung trực phải vuông góc với $AB$ tại trung điểm $O$ của $AB$, tức cần đủ cả $OA = OB$ và $d \\perp AB$."
          },
          {
            id: "d3q8", level: "vua", source: "SGK tr.81 – Thử thách nhỏ",
            q: "Tam giác $MNP$ cân tại $M$ có $MN = 6$ cm và $\\widehat{N} = 60^\\circ$. Độ dài $NP$ là",
            options: ["$3$ cm", "$12$ cm", "$8$ cm", "$6$ cm"],
            answer: 3,
            explain: "Tam giác cân có một góc $60^\\circ$ là tam giác đều, nên $NP = MN = 6$ cm."
          },
          {
            id: "d3q9", level: "kho", source: "SGK tr.83 – Nhận xét",
            q: "Hai điểm phân biệt $M$ và $N$ cùng cách đều hai điểm $A$ và $B$. Khẳng định nào sau đây đúng?",
            options: ["Đường thẳng $MN$ là đường trung trực của $AB$", "$MN$ song song với $AB$", "$M$ là trung điểm của $AB$", "$MA = NA$"],
            answer: 0,
            explain: "Điểm cách đều hai mút $A$, $B$ thì nằm trên trung trực của $AB$. Hai điểm phân biệt $M$, $N$ cùng nằm trên trung trực nên đường thẳng $MN$ chính là trung trực của $AB$. $MA$ và $NA$ chưa chắc bằng nhau."
          },
          {
            id: "d3q10", level: "kho", source: "mới",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 80^\\circ$. Tia phân giác của góc $B$ cắt $AC$ tại $D$. Số đo góc $ADB$ là",
            options: ["$65^\\circ$", "$75^\\circ$", "$105^\\circ$", "$25^\\circ$"],
            answer: 1,
            explain: "$\\widehat{ABC} = (180^\\circ - 80^\\circ) : 2 = 50^\\circ$, nên $\\widehat{ABD} = 25^\\circ$. Trong tam giác $ABD$: $\\widehat{ADB} = 180^\\circ - 80^\\circ - 25^\\circ = 75^\\circ$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SGK Bài 16 – BT 4.25a", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ và $M$ là trung điểm của đoạn thẳng $BC$. Giả sử $AM \\perp BC$. Chứng minh rằng tam giác $ABC$ cân tại $A$.",
            modelAnswer: "Xét $\\triangle AMB$ và $\\triangle AMC$ có:<br>" +
              "• $MB = MC$ ($M$ là trung điểm $BC$);<br>• $\\widehat{AMB} = \\widehat{AMC} = 90^\\circ$ (vì $AM \\perp BC$);<br>• $AM$ là cạnh chung.<br>" +
              "Vậy $\\triangle AMB = \\triangle AMC$ (c.g.c), suy ra $AB = AC$. Do đó tam giác $ABC$ cân tại $A$.<br>" +
              "<i>Cách khác:</i> $AM$ vuông góc với $BC$ tại trung điểm $M$ nên $AM$ là đường trung trực của $BC$; $A$ thuộc trung trực nên $AB = AC$.",
            rubric: [
              { pts: 0.5, text: "Nêu đủ các yếu tố bằng nhau: $MB = MC$, góc vuông tại $M$, cạnh chung $AM$ (hoặc nhận ra $AM$ là trung trực của $BC$)." },
              { pts: 0.5, text: "Kết luận $\\triangle AMB = \\triangle AMC$ (c.g.c) hoặc dùng tính chất điểm trên trung trực." },
              { pts: 0.5, text: "Suy ra $AB = AC$, kết luận tam giác $ABC$ cân tại $A$." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SGK Bài 16 – BT 4.26", maxPoints: 1.5,
            q: "a) Chứng minh rằng tam giác vuông cân có hai góc nhọn bằng $45^\\circ$.<br>b) Chứng minh rằng tam giác vuông có một góc nhọn bằng $45^\\circ$ là tam giác vuông cân.",
            modelAnswer: "a) Giả sử tam giác $ABC$ vuông cân tại $A$ ($AB = AC$, $\\widehat{A} = 90^\\circ$). Tam giác cân tại $A$ nên $\\widehat{B} = \\widehat{C}$.<br>" +
              "Mà $\\widehat{B} + \\widehat{C} = 180^\\circ - 90^\\circ = 90^\\circ$, nên $\\widehat{B} = \\widehat{C} = 45^\\circ$.<br>" +
              "b) Giả sử tam giác $ABC$ vuông tại $A$ có $\\widehat{B} = 45^\\circ$. Khi đó $\\widehat{C} = 90^\\circ - 45^\\circ = 45^\\circ = \\widehat{B}$.<br>" +
              "Tam giác có hai góc bằng nhau nên cân tại $A$, tức $AB = AC$. Vậy tam giác $ABC$ vuông cân tại $A$.",
            rubric: [
              { pts: 0.5, text: "Câu a: từ tam giác cân suy ra hai góc nhọn bằng nhau." },
              { pts: 0.5, text: "Câu a: dùng tổng hai góc nhọn bằng $90^\\circ$, kết luận mỗi góc $45^\\circ$." },
              { pts: 0.5, text: "Câu b: tính góc nhọn còn lại bằng $45^\\circ$, suy ra tam giác cân (có hai góc bằng nhau) nên là vuông cân." }
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
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 3\\widehat{B}$. Số đo góc $A$ là",
            options: ["$36^\\circ$", "$72^\\circ$", "$108^\\circ$", "$120^\\circ$"],
            answer: 2,
            explain: "Gọi $\\widehat{B} = \\widehat{C} = x$ thì $\\widehat{A} = 3x$. Ta có $3x + x + x = 180^\\circ$, nên $x = 36^\\circ$, $\\widehat{A} = 108^\\circ$."
          },
          {
            id: "d4q2", level: "vua", source: "mới",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{B} = 2\\widehat{A}$. Số đo góc $C$ là",
            options: ["$72^\\circ$", "$36^\\circ$", "$54^\\circ$", "$60^\\circ$"],
            answer: 0,
            explain: "Gọi $\\widehat{A} = x$ thì $\\widehat{B} = \\widehat{C} = 2x$. Ta có $x + 2x + 2x = 180^\\circ$, nên $x = 36^\\circ$ và $\\widehat{C} = 72^\\circ$."
          },
          {
            id: "d4q3", level: "vua", source: "mới",
            q: "Tam giác $ABC$ cân tại $A$ có chu vi $20$ cm và $BC = 6$ cm. Độ dài cạnh $AB$ là",
            options: ["$6$ cm", "$14$ cm", "$8$ cm", "$7$ cm"],
            answer: 3,
            explain: "$AB = AC$ và $AB + AC = 20 - 6 = 14$ (cm), nên $AB = 7$ cm."
          },
          {
            id: "d4q4", level: "kho", source: "SBT Bài 16 – BT 4.43 (biến đổi)",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 50^\\circ$. Kẻ $BH \\perp AC$ ($H$ thuộc cạnh $AC$). Số đo góc $HBC$ là",
            options: ["$40^\\circ$", "$25^\\circ$", "$65^\\circ$", "$50^\\circ$"],
            answer: 1,
            explain: "$\\widehat{C} = (180^\\circ - 50^\\circ) : 2 = 65^\\circ$. Tam giác $BHC$ vuông tại $H$ nên $\\widehat{HBC} = 90^\\circ - 65^\\circ = 25^\\circ$ (bằng một nửa góc $A$)."
          },
          {
            id: "d4q5", level: "kho", source: "mới",
            q: "Cho tam giác đều $ABC$. Trên tia đối của tia $CB$ lấy điểm $D$ sao cho $CD = CA$. Số đo góc $ADB$ là",
            options: ["$60^\\circ$", "$45^\\circ$", "$30^\\circ$", "$15^\\circ$"],
            answer: 2,
            explain: "$\\widehat{ACD} = 180^\\circ - \\widehat{ACB} = 180^\\circ - 60^\\circ = 120^\\circ$. Tam giác $ACD$ cân tại $C$ nên $\\widehat{CDA} = (180^\\circ - 120^\\circ) : 2 = 30^\\circ$. Vì $C$ nằm giữa $B$ và $D$ nên $\\widehat{ADB} = \\widehat{ADC} = 30^\\circ$."
          },
          {
            id: "d4q6", level: "kho", source: "mới",
            q: "Cho tam giác $ABC$ có $\\widehat{C} = 35^\\circ$. Đường trung trực của đoạn thẳng $AC$ cắt cạnh $BC$ tại $D$. Số đo góc $ADB$ là",
            options: ["$35^\\circ$", "$110^\\circ$", "$55^\\circ$", "$70^\\circ$"],
            answer: 3,
            explain: "$D$ thuộc trung trực của $AC$ nên $DA = DC$, tam giác $DAC$ cân tại $D$: $\\widehat{DAC} = \\widehat{DCA} = 35^\\circ$. Suy ra $\\widehat{ADC} = 180^\\circ - 70^\\circ = 110^\\circ$, và $\\widehat{ADB} = 180^\\circ - 110^\\circ = 70^\\circ$ (kề bù)."
          },
          {
            id: "d4q7", level: "kho", source: "SBT Bài 16 – BT 4.41",
            q: "Tam giác $ABC$ có $\\widehat{B} = \\widehat{C} = 50^\\circ$, $AB = 5$ cm, $BC = 7$ cm. Chu vi tam giác $ABC$ là",
            options: ["$12$ cm", "$17$ cm", "$19$ cm", "$15$ cm"],
            answer: 1,
            explain: "$\\widehat{B} = \\widehat{C}$ nên tam giác $ABC$ cân tại $A$: $AC = AB = 5$ cm. Chu vi $= 5 + 5 + 7 = 17$ (cm)."
          },
          {
            id: "d4q8", level: "kho", source: "mới",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 120^\\circ$. Đường trung trực của $AB$ cắt $BC$ tại $M$. Số đo góc $MAC$ là",
            options: ["$60^\\circ$", "$30^\\circ$", "$90^\\circ$", "$120^\\circ$"],
            answer: 2,
            explain: "$\\widehat{B} = \\widehat{C} = 30^\\circ$. $M$ thuộc trung trực của $AB$ nên $MA = MB$, do đó $\\widehat{MAB} = \\widehat{MBA} = 30^\\circ$. Suy ra $\\widehat{MAC} = 120^\\circ - 30^\\circ = 90^\\circ$."
          },
          {
            id: "d4q9", level: "kho", source: "mới",
            q: "Tam giác $ABC$ cân tại $A$. Trên các cạnh $AB$, $AC$ lần lượt lấy $D$, $E$ sao cho $AD = AE$. Khẳng định nào sau đây đúng?",
            options: ["$DE = BC$", "$DE \\parallel BC$", "$DE \\perp BC$", "$BD = DE$"],
            answer: 1,
            explain: "Tam giác $ADE$ cân tại $A$ nên $\\widehat{ADE} = \\dfrac{180^\\circ - \\widehat{A}}{2} = \\widehat{ABC}$. Hai góc này ở vị trí đồng vị nên $DE \\parallel BC$."
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 36^\\circ$. Tia phân giác của góc $B$ cắt $AC$ tại $D$. Trong hình có tất cả bao nhiêu tam giác cân?",
            options: ["$3$", "$1$", "$2$", "$4$"],
            answer: 0,
            explain: "$\\widehat{ABC} = \\widehat{C} = 72^\\circ$, $\\widehat{ABD} = \\widehat{DBC} = 36^\\circ$. Tam giác $ABD$ có $\\widehat{A} = \\widehat{ABD} = 36^\\circ$ nên cân tại $D$. Tam giác $BDC$ có $\\widehat{BDC} = 180^\\circ - 36^\\circ - 72^\\circ = 72^\\circ = \\widehat{C}$ nên cân tại $B$. Cùng với tam giác $ABC$, có 3 tam giác cân."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "SBT Bài 16 – BT 4.47", maxPoints: 1.5,
            q: "Cho tam giác $ABH$ vuông tại $H$ có $\\widehat{ABH} = 60^\\circ$. Trên tia đối của tia $HB$ lấy điểm $C$ sao cho $HC = HB$. Chứng minh rằng tam giác $ABC$ là tam giác đều và $BH = \\dfrac{AB}{2}$." + figDeu60,
            modelAnswer: "Đường thẳng $AH$ vuông góc với $BC$ tại $H$, mà $H$ là trung điểm của $BC$ (vì $HB = HC$), nên $AH$ là đường trung trực của $BC$.<br>" +
              "$A$ thuộc đường trung trực của $BC$ nên $AB = AC$, tức tam giác $ABC$ cân tại $A$.<br>" +
              "Tam giác cân $ABC$ có $\\widehat{B} = 60^\\circ$ nên là tam giác đều.<br>" +
              "Do đó $BC = AB$, và $BH = \\dfrac{BC}{2} = \\dfrac{AB}{2}$.",
            rubric: [
              { pts: 0.5, text: "Chỉ ra $AH$ là đường trung trực của $BC$ (hoặc chứng minh $\\triangle ABH = \\triangle ACH$), suy ra $AB = AC$." },
              { pts: 0.5, text: "Tam giác cân có một góc $60^\\circ$ nên là tam giác đều." },
              { pts: 0.5, text: "Suy ra $BH = \\dfrac{BC}{2} = \\dfrac{AB}{2}$." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "SBT Bài 16 – BT 4.50", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ cân tại $A$ có đường cao $AH$ ($H$ thuộc $BC$). Lấy điểm $M$ tùy ý trên đường thẳng $AH$, $M$ không trùng với $A$. Chứng minh rằng $\\widehat{MBA} = \\widehat{MCA}$." + figAHM,
            modelAnswer: "Hai tam giác vuông $ABH$ và $ACH$ (vuông tại $H$) có cạnh huyền $AB = AC$ và cạnh góc vuông $AH$ chung, nên $\\triangle ABH = \\triangle ACH$ (cạnh huyền – cạnh góc vuông). Suy ra $HB = HC$.<br>" +
              "Vậy $AH$ vuông góc với $BC$ tại trung điểm $H$, tức $AH$ là đường trung trực của $BC$. $M$ thuộc $AH$ nên $MB = MC$.<br>" +
              "Xét $\\triangle ABM$ và $\\triangle ACM$ có: $AB = AC$; $MB = MC$; $AM$ là cạnh chung. Vậy $\\triangle ABM = \\triangle ACM$ (c.c.c).<br>" +
              "Suy ra $\\widehat{MBA} = \\widehat{MCA}$ (hai góc tương ứng).",
            rubric: [
              { pts: 0.5, text: "Chứng minh được $HB = HC$ (hoặc $AH$ là trung trực của $BC$)." },
              { pts: 0.5, text: "Suy ra $MB = MC$ vì $M$ thuộc trung trực của $BC$." },
              { pts: 0.5, text: "Chứng minh $\\triangle ABM = \\triangle ACM$ (c.c.c) và kết luận $\\widehat{MBA} = \\widehat{MCA}$." }
            ]
          }
        ]
      }
    ]
  });
})();
