(function () {
  // Vẽ hình hình học bằng SVG (currentColor để hợp chế độ sáng/tối).
  // o = { w, h, P: {tên: [x, y]}, seg: [[a, b]], hl: [[a, b]] (tô đỏ), ticks: [[a, b, số gạch]],
  //       right: [[a, đỉnh, b]] (kí hiệu góc vuông), arcs: [[a, đỉnh, b, số cung]], lp: {tên: [dx, dy]} (vị trí nhãn),
  //       nolab: [tên không ghi nhãn], txt: [["chữ", x, y, màu?]] }
  function fig(o) {
    var P = o.P, W = o.w || 300, H = o.h || 210;
    var f = function (v) { return (+v).toFixed(1); };
    var pt = function (k) { return Array.isArray(k) ? k : P[k]; };
    var unit = function (p, v) { var dx = p[0] - v[0], dy = p[1] - v[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
    var ln = function (a, b, col, w) {
      return '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" stroke="' + (col || 'currentColor') + '" stroke-width="' + (w || 1.6) + '" stroke-linecap="round"/>';
    };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:320px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">';
    (o.seg || []).forEach(function (g) { s += ln(pt(g[0]), pt(g[1])); });
    (o.hl || []).forEach(function (g) { s += ln(pt(g[0]), pt(g[1]), '#e5484d', 2.2); });
    (o.ticks || []).forEach(function (t) {
      var a = pt(t[0]), b = pt(t[1]), n = t[2] || 1, u = unit(b, a), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      for (var k = 0; k < n; k++) {
        var off = (k - (n - 1) / 2) * 4, cx = mx + u[0] * off, cy = my + u[1] * off;
        s += ln([cx - u[1] * 5, cy + u[0] * 5], [cx + u[1] * 5, cy - u[0] * 5], null, 1.3);
      }
    });
    (o.right || []).forEach(function (r) {
      var v = pt(r[1]), u1 = unit(pt(r[0]), v), u2 = unit(pt(r[2]), v), d = 9;
      s += '<path d="M' + f(v[0] + u1[0] * d) + ' ' + f(v[1] + u1[1] * d) + ' L' + f(v[0] + (u1[0] + u2[0]) * d) + ' ' + f(v[1] + (u1[1] + u2[1]) * d) +
        ' L' + f(v[0] + u2[0] * d) + ' ' + f(v[1] + u2[1] * d) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
    });
    (o.arcs || []).forEach(function (r) {
      var v = pt(r[1]), u1 = unit(pt(r[0]), v), u2 = unit(pt(r[2]), v), n = r[3] || 1;
      var sw = (u1[0] * u2[1] - u1[1] * u2[0]) > 0 ? 1 : 0;
      for (var k = 0; k < n; k++) {
        var rr = 16 + k * 4;
        s += '<path d="M' + f(v[0] + u1[0] * rr) + ' ' + f(v[1] + u1[1] * rr) + ' A' + rr + ' ' + rr + ' 0 0 ' + sw + ' ' + f(v[0] + u2[0] * rr) + ' ' + f(v[1] + u2[1] * rr) + '" fill="none" stroke="#e5484d" stroke-width="1.3"/>';
      }
    });
    var names = Object.keys(P), cx = 0, cy = 0;
    names.forEach(function (k) { cx += P[k][0] / names.length; cy += P[k][1] / names.length; });
    names.forEach(function (k) {
      if ((o.nolab || []).indexOf(k) >= 0) return;
      var p = P[k], x, y;
      if (o.lp && o.lp[k]) { x = p[0] + o.lp[k][0]; y = p[1] + o.lp[k][1]; }
      else { var u = unit(p, [cx, cy]); x = p[0] + u[0] * 13; y = p[1] + u[1] * 13; }
      s += '<text x="' + f(x) + '" y="' + f(y + 4.5) + '" font-size="14" font-style="italic" text-anchor="middle" fill="currentColor">' + k + '</text>';
    });
    (o.txt || []).forEach(function (t) {
      s += '<text x="' + t[1] + '" y="' + t[2] + '" font-size="12" text-anchor="middle" fill="' + (t[3] || 'currentColor') + '">' + t[0] + '</text>';
    });
    return s + '</svg>';
  }

  // Một số hình dùng nhiều lần
  var ISO = { A: [150, 20], B: [60, 180], C: [240, 180] };

  registerLesson({
    id: "c4-lt3",
    chapter: 4,
    kind: "review",
    title: "Luyện tập chung (Bài 15–16)",
    sgkPages: [85, 86],
    sbtPages: [65, 71],
    objectives: [
      "Vận dụng các trường hợp bằng nhau của tam giác vuông để chứng minh hai đoạn thẳng, hai góc bằng nhau",
      "Vận dụng tính chất và dấu hiệu nhận biết tam giác cân, tam giác đều để tính góc, chứng minh",
      "Vận dụng tính chất đường trung trực của đoạn thẳng",
      "Trình bày lời giải bài chứng minh hình học có lập luận chặt chẽ"
    ],

    theory: [
      {
        heading: "1. Các trường hợp bằng nhau của tam giác vuông",
        html: "Hai tam giác vuông bằng nhau nếu có:" +
          "<ul><li><b>Hai cạnh góc vuông</b> tương ứng bằng nhau.</li>" +
          "<li><b>Một cạnh góc vuông và một góc nhọn kề cạnh ấy</b> tương ứng bằng nhau.</li>" +
          "<li><b>Cạnh huyền và một góc nhọn</b> tương ứng bằng nhau (cạnh huyền – góc nhọn).</li>" +
          "<li><b>Cạnh huyền và một cạnh góc vuông</b> tương ứng bằng nhau (cạnh huyền – cạnh góc vuông).</li></ul>" +
          "Từ hai tam giác bằng nhau suy ra các cạnh tương ứng, các góc tương ứng bằng nhau."
      },
      {
        heading: "2. Tam giác cân, tam giác đều",
        html: "<ul><li>Tam giác <b>cân</b> tại $A$: $AB = AC$; $A$ là đỉnh, $BC$ là cạnh đáy, $\\widehat{B}, \\widehat{C}$ là hai góc ở đáy.</li>" +
          "<li>Trong tam giác cân, <b>hai góc ở đáy bằng nhau</b>. Ngược lại, tam giác có hai góc bằng nhau là tam giác cân.</li>" +
          "<li>Tam giác cân tại $A$: $\\widehat{B} = \\widehat{C} = \\frac{180^\\circ - \\widehat{A}}{2}$ và $\\widehat{A} = 180^\\circ - 2\\widehat{B}$.</li>" +
          "<li>Tam giác <b>đều</b> có ba cạnh bằng nhau, mỗi góc bằng $60^\\circ$. Tam giác cân có một góc bằng $60^\\circ$ là tam giác đều.</li></ul>" +
          fig({ P: ISO, seg: [["A", "B"], ["A", "C"], ["B", "C"]], ticks: [["A", "B", 1], ["A", "C", 1]], arcs: [["A", "B", "C", 1], ["B", "C", "A", 1]] })
      },
      {
        heading: "3. Đường trung trực của đoạn thẳng",
        html: "<ul><li>Đường thẳng <b>vuông góc với một đoạn thẳng tại trung điểm</b> của nó là đường trung trực của đoạn thẳng đó.</li>" +
          "<li>Điểm nằm trên đường trung trực của đoạn $AB$ thì <b>cách đều</b> hai đầu mút: $MA = MB$.</li>" +
          "<li>Ngược lại, điểm cách đều hai đầu mút $A, B$ thì nằm trên đường trung trực của $AB$.</li></ul>" +
          fig({ w: 280, h: 200, P: { A: [40, 110], B: [240, 110], O: [140, 110], M: [140, 35] },
            seg: [["A", "B"], ["M", "A"], ["M", "B"], [[140, 10], [140, 190]]], ticks: [["A", "O", 1], ["O", "B", 1]], right: [["B", "O", "M"]],
            lp: { O: [10, 14], M: [12, -4] }, txt: [["d", 150, 186]] })
      }
    ],

    skills: [
      "<b>Muốn chứng minh hai đoạn thẳng (hai góc) bằng nhau</b>: tìm hai tam giác chứa chúng, chứng minh hai tam giác đó bằng nhau rồi suy ra cạnh (góc) tương ứng.",
      "<b>Với tam giác vuông</b>: xác định cạnh huyền (đối diện góc vuông) trước, rồi xem dữ kiện thuộc trường hợp nào: hai cạnh góc vuông; cạnh góc vuông – góc nhọn kề; cạnh huyền – góc nhọn; cạnh huyền – cạnh góc vuông.",
      "<b>Tính góc trong tam giác cân</b>: tam giác cân tại $A$ thì $\\widehat{B} = \\widehat{C} = (180^\\circ - \\widehat{A}) : 2$ và $\\widehat{A} = 180^\\circ - 2\\widehat{B}$. Chú ý xem tam giác cân tại đỉnh nào!",
      "<b>Chứng minh tam giác đều</b>: chỉ ra tam giác cân và có một góc $60^\\circ$, hoặc ba cạnh bằng nhau.",
      "<b>Điểm thuộc đường trung trực</b> cho ngay hai đoạn bằng nhau ($MA = MB$), từ đó có tam giác cân $MAB$.",
      "<b>Lỗi hay gặp</b>: viết sai thứ tự đỉnh tương ứng ($\\Delta ABC = \\Delta MNP$ nghĩa là $A \\leftrightarrow M$, $B \\leftrightarrow N$, $C \\leftrightarrow P$); nhầm góc ở đỉnh với góc ở đáy; dùng điều cần chứng minh làm giả thiết."
    ],

    examples: [
      {
        q: "Cho tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 80^\\circ$. Tính $\\widehat{B}$ và $\\widehat{C}$.",
        solution: "Tam giác $ABC$ cân tại $A$ nên $\\widehat{B} = \\widehat{C}$.<br>" +
          "Tổng ba góc của tam giác bằng $180^\\circ$: $\\widehat{B} + \\widehat{C} = 180^\\circ - 80^\\circ = 100^\\circ$.<br>" +
          "Vậy $\\widehat{B} = \\widehat{C} = 100^\\circ : 2 = 50^\\circ$."
      },
      {
        q: "Cho tam giác $ABC$ cân tại $A$ (ba góc nhọn). Kẻ $BH \\perp AC$ ($H \\in AC$) và $CK \\perp AB$ ($K \\in AB$). Chứng minh $BH = CK$." +
          fig({ P: { A: [150, 20], B: [60, 190], C: [240, 190], H: [200.6, 115.6], K: [99.4, 115.6] },
            seg: [["A", "B"], ["A", "C"], ["B", "C"], ["B", "H"], ["C", "K"]], ticks: [["A", "K", 1], ["A", "H", 1]],
            right: [["B", "H", "C"], ["C", "K", "B"]], nolab: [], lp: { H: [12, -2], K: [-12, -2] } }),
        solution: "Xét hai tam giác vuông $BHC$ (vuông tại $H$) và $CKB$ (vuông tại $K$):<br>" +
          "• $BC$ là cạnh huyền chung;<br>" +
          "• $\\widehat{HCB} = \\widehat{KBC}$ (hai góc ở đáy của tam giác cân $ABC$).<br>" +
          "Do đó $\\Delta BHC = \\Delta CKB$ (cạnh huyền – góc nhọn). Suy ra $BH = CK$ (hai cạnh tương ứng)."
      },
      {
        q: "Cho đoạn thẳng $AB$ và điểm $M$ nằm trên đường trung trực của $AB$ sao cho $MA = 7$ cm và $\\widehat{AMB} = 60^\\circ$. Tính độ dài $AB$.",
        solution: "$M$ thuộc đường trung trực của $AB$ nên $MB = MA = 7$ cm, do đó tam giác $MAB$ cân tại $M$.<br>" +
          "Tam giác cân $MAB$ có $\\widehat{AMB} = 60^\\circ$ nên là tam giác đều.<br>" +
          "Vậy $AB = MA = 7$ cm."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "mới",
            q: "Cho tam giác $ABC$ cân tại $A$ có $\\widehat{B} = 50^\\circ$. Số đo $\\widehat{C}$ là",
            options: ["$50^\\circ$", "$80^\\circ$", "$130^\\circ$", "$40^\\circ$"],
            answer: 0,
            explain: "Tam giác cân tại $A$ có hai góc ở đáy bằng nhau: $\\widehat{C} = \\widehat{B} = 50^\\circ$."
          },
          {
            id: "d1q2", level: "de", source: "mới",
            q: "Cho tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 40^\\circ$. Số đo $\\widehat{B}$ là",
            options: ["$40^\\circ$", "$70^\\circ$", "$140^\\circ$", "$50^\\circ$"],
            answer: 1,
            explain: "$\\widehat{B} = \\widehat{C} = \\frac{180^\\circ - 40^\\circ}{2} = 70^\\circ$."
          },
          {
            id: "d1q3", level: "de", source: "mới",
            q: "Mỗi góc của một tam giác đều có số đo bằng",
            options: ["$45^\\circ$", "$90^\\circ$", "$30^\\circ$", "$60^\\circ$"],
            answer: 3,
            explain: "Tam giác đều có ba góc bằng nhau, tổng là $180^\\circ$ nên mỗi góc bằng $180^\\circ : 3 = 60^\\circ$."
          },
          {
            id: "d1q4", level: "de", source: "SBT Bài 16 – BT 4.49",
            q: "Điểm $M$ nằm trên đường trung trực của đoạn thẳng $AB$ và $MA = 5$ cm. Khi đó",
            options: ["$MB = 2{,}5$ cm", "$MB = 10$ cm", "$MB = 5$ cm", "chưa tính được $MB$"],
            answer: 2,
            explain: "Điểm nằm trên đường trung trực của đoạn thẳng thì cách đều hai đầu mút, nên $MB = MA = 5$ cm."
          },
          {
            id: "d1q5", level: "vua", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $BC = EF$, $AB = DE$. Hai tam giác này bằng nhau theo trường hợp",
            options: ["hai cạnh góc vuông", "cạnh huyền – cạnh góc vuông", "cạnh huyền – góc nhọn", "cạnh góc vuông – góc nhọn kề cạnh ấy"],
            answer: 1,
            explain: "$BC$ và $EF$ là hai cạnh huyền (đối diện góc vuông), $AB$ và $DE$ là hai cạnh góc vuông. Vậy hai tam giác bằng nhau theo trường hợp cạnh huyền – cạnh góc vuông."
          },
          {
            id: "d1q6", level: "vua", source: "SBT Bài 16 – BT 4.50",
            q: "Cho tam giác $ABC$ cân tại $A$, kẻ $AH \\perp BC$ ($H \\in BC$). Biết $BC = 8$ cm. Độ dài $HB$ là" +
              fig({ P: { A: [150, 20], B: [60, 180], C: [240, 180], H: [150, 180] }, seg: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "H"]],
                ticks: [["A", "B", 1], ["A", "C", 1]], right: [["A", "H", "C"]], lp: { H: [0, 16] } }),
            options: ["$8$ cm", "$16$ cm", "$2$ cm", "$4$ cm"],
            answer: 3,
            explain: "Hai tam giác vuông $AHB$ và $AHC$ có cạnh huyền $AB = AC$ và cạnh góc vuông $AH$ chung, nên $\\Delta AHB = \\Delta AHC$ (cạnh huyền – cạnh góc vuông). Suy ra $HB = HC = 8 : 2 = 4$ (cm)."
          },
          {
            id: "d1q7", level: "vua", source: "mới",
            q: "Cho tam giác $ABC$ cân tại $B$ có $\\widehat{A} = 65^\\circ$. Số đo $\\widehat{B}$ là",
            options: ["$65^\\circ$", "$50^\\circ$", "$115^\\circ$", "$25^\\circ$"],
            answer: 1,
            explain: "Tam giác cân tại $B$ ($BA = BC$) nên hai góc ở đáy là $\\widehat{A} = \\widehat{C} = 65^\\circ$. Do đó $\\widehat{B} = 180^\\circ - 2 \\cdot 65^\\circ = 50^\\circ$. Chú ý: đỉnh là $B$, không phải $A$."
          },
          {
            id: "d1q8", level: "vua", source: "mới",
            q: "Tam giác $ABC$ có $\\widehat{A} = 60^\\circ$ và $\\widehat{B} = 60^\\circ$. Tam giác $ABC$ là",
            options: ["tam giác đều", "tam giác vuông", "tam giác cân nhưng không đều", "tam giác tù"],
            answer: 0,
            explain: "$\\widehat{C} = 180^\\circ - 60^\\circ - 60^\\circ = 60^\\circ$. Tam giác có ba góc bằng nhau (đều bằng $60^\\circ$) là tam giác đều."
          },
          {
            id: "d1q9", level: "kho", source: "SGK Luyện tập chung – BT 4.31",
            q: "Cho hai đoạn thẳng $AD$ và $BC$ cắt nhau tại $O$ sao cho $OA = OB$, $OC = OD$. Khẳng định nào sau đây đúng?" +
              fig({ P: { A: [60, 30], B: [240, 30], C: [100, 170], D: [200, 170], O: [150, 120] },
                seg: [["A", "D"], ["B", "C"], ["A", "C"], ["B", "D"]], ticks: [["O", "A", 1], ["O", "B", 1], ["O", "C", 2], ["O", "D", 2]], lp: { O: [14, 0] } }),
            options: ["$AC = AD$", "$\\Delta OAC = \\Delta ODB$", "$AC = BD$", "$AB = CD$"],
            answer: 2,
            explain: "Xét $\\Delta OAC$ và $\\Delta OBD$: $OA = OB$, $\\widehat{AOC} = \\widehat{BOD}$ (đối đỉnh), $OC = OD$. Do đó $\\Delta OAC = \\Delta OBD$ (c.g.c), suy ra $AC = BD$. Viết $\\Delta OAC = \\Delta ODB$ là sai thứ tự đỉnh tương ứng."
          },
          {
            id: "d1q10", level: "kho", source: "mới",
            q: "Điểm $M$ nằm trên đường trung trực của đoạn thẳng $AB$ ($M$ không thuộc $AB$) và $\\widehat{MAB} = 70^\\circ$. Số đo $\\widehat{AMB}$ là",
            options: ["$40^\\circ$", "$70^\\circ$", "$110^\\circ$", "$55^\\circ$"],
            answer: 0,
            explain: "$MA = MB$ nên tam giác $MAB$ cân tại $M$, suy ra $\\widehat{MBA} = \\widehat{MAB} = 70^\\circ$. Vậy $\\widehat{AMB} = 180^\\circ - 2 \\cdot 70^\\circ = 40^\\circ$."
          },
          {
            id: "d1q11", level: "kho", source: "SGK Luyện tập chung – BT 4.32",
            q: "Cho tam giác $MBC$ vuông tại $M$ có $\\widehat{B} = 60^\\circ$ và $BC = 6$ cm. Lấy điểm $A$ trên tia đối của tia $MB$ sao cho $MA = MB$. Chu vi tam giác $ABC$ là",
            options: ["$12$ cm", "$9$ cm", "$15$ cm", "$18$ cm"],
            answer: 3,
            explain: "$CM \\perp AB$ tại trung điểm $M$ nên $CM$ là đường trung trực của $AB$, suy ra $CA = CB$: tam giác $ABC$ cân tại $C$ có $\\widehat{B} = 60^\\circ$ nên là tam giác đều. Do đó $AB = BC = CA = 6$ cm, chu vi bằng $18$ cm."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK Luyện tập chung – BT 4.30 (biến đổi)", maxPoints: 1.5,
            q: "Cho góc $xOy$. Trên tia $Ox$ lấy hai điểm $A, M$; trên tia $Oy$ lấy hai điểm $B, N$ sao cho $OA = OB$, $OM = ON$ và $OA > OM$. Chứng minh rằng:<br>a) $\\Delta OAN = \\Delta OBM$;<br>b) $AN = BM$." +
              fig({ w: 300, h: 200, P: { O: [30, 180], M: [110, 180], A: [200, 180], N: [92.8, 130.4], B: [163.5, 74.6] },
                seg: [["O", [290, 180]], ["O", [220, 30]], ["A", "N"], ["B", "M"]], ticks: [["O", "M", 1], ["O", "N", 1], ["M", "A", 2], ["N", "B", 2]],
                lp: { O: [-8, 10], M: [0, 16], A: [0, 16], N: [-12, -4], B: [-12, -4] }, txt: [["x", 288, 196], ["y", 228, 32]] }),
            modelAnswer: "a) Xét $\\Delta OAN$ và $\\Delta OBM$ có:<br>" +
              "• $OA = OB$ (giả thiết);<br>• $\\widehat{O}$ là góc chung;<br>• $ON = OM$ (giả thiết).<br>" +
              "Do đó $\\Delta OAN = \\Delta OBM$ (c.g.c).<br>" +
              "b) Từ $\\Delta OAN = \\Delta OBM$ suy ra $AN = BM$ (hai cạnh tương ứng).",
            rubric: [
              { pts: 0.5, text: "Nêu đủ ba yếu tố: $OA = OB$, góc $O$ chung, $ON = OM$." },
              { pts: 0.5, text: "Kết luận $\\Delta OAN = \\Delta OBM$ (c.g.c), đúng thứ tự đỉnh." },
              { pts: 0.5, text: "Suy ra $AN = BM$ (cạnh tương ứng)." }
            ]
          },
          {
            id: "d1e2", level: "kho", source: "SGK Luyện tập chung – Ví dụ 2 (biến đổi)", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ cân tại $A$, gọi $H$ là trung điểm của $BC$. Chứng minh rằng:<br>a) $\\Delta AHB = \\Delta AHC$;<br>b) $AH$ là đường trung trực của đoạn thẳng $BC$." +
              fig({ P: { A: [150, 20], B: [60, 180], C: [240, 180], H: [150, 180] }, seg: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "H"]],
                ticks: [["A", "B", 1], ["A", "C", 1], ["B", "H", 2], ["H", "C", 2]], lp: { H: [0, 16] } }),
            modelAnswer: "a) Xét $\\Delta AHB$ và $\\Delta AHC$ có: $AB = AC$ (tam giác $ABC$ cân tại $A$); $HB = HC$ ($H$ là trung điểm $BC$); $AH$ là cạnh chung.<br>" +
              "Do đó $\\Delta AHB = \\Delta AHC$ (c.c.c).<br>" +
              "b) Suy ra $\\widehat{AHB} = \\widehat{AHC}$ (hai góc tương ứng). Mà $\\widehat{AHB} + \\widehat{AHC} = 180^\\circ$ (hai góc kề bù) nên $\\widehat{AHB} = \\widehat{AHC} = 90^\\circ$, tức $AH \\perp BC$.<br>" +
              "Đường thẳng $AH$ vuông góc với $BC$ tại trung điểm $H$ của $BC$, nên $AH$ là đường trung trực của $BC$.",
            rubric: [
              { pts: 0.5, text: "Chứng minh đúng $\\Delta AHB = \\Delta AHC$ (c.c.c), nêu đủ ba cặp cạnh." },
              { pts: 0.5, text: "Lập luận hai góc kề bù bằng nhau nên $\\widehat{AHB} = 90^\\circ$, tức $AH \\perp BC$." },
              { pts: 0.5, text: "Kết luận $AH$ vuông góc với $BC$ tại trung điểm nên là đường trung trực của $BC$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "mới",
            q: "Cho tam giác $ABC$ cân tại $A$. Khẳng định nào sau đây đúng?",
            options: ["$AB = BC$", "$\\widehat{A} = \\widehat{B}$", "$\\widehat{B} = \\widehat{C}$", "$\\widehat{A} = \\widehat{C}$"],
            answer: 2,
            explain: "Tam giác cân tại $A$ thì hai góc ở đáy $\\widehat{B}$ và $\\widehat{C}$ bằng nhau (và $AB = AC$, không phải $AB = BC$)."
          },
          {
            id: "d2q2", level: "de", source: "mới",
            q: "Cho tam giác $DEF$ cân tại $D$ có $\\widehat{E} = 72^\\circ$. Số đo $\\widehat{D}$ là",
            options: ["$72^\\circ$", "$36^\\circ$", "$108^\\circ$", "$54^\\circ$"],
            answer: 1,
            explain: "$\\widehat{F} = \\widehat{E} = 72^\\circ$ (hai góc ở đáy) nên $\\widehat{D} = 180^\\circ - 2 \\cdot 72^\\circ = 36^\\circ$."
          },
          {
            id: "d2q3", level: "de", source: "SBT Bài 16 – BT 4.48",
            q: "Đường trung trực của đoạn thẳng $AB$ là đường thẳng",
            options: ["đi qua trung điểm của $AB$", "vuông góc với $AB$", "song song với $AB$", "vuông góc với $AB$ tại trung điểm của $AB$"],
            answer: 3,
            explain: "Đường trung trực phải thỏa mãn <b>cả hai</b> điều kiện: vuông góc với $AB$ và đi qua trung điểm của $AB$."
          },
          {
            id: "d2q4", level: "de", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $AB = DE$, $AC = DF$. Hai tam giác này bằng nhau theo trường hợp",
            options: ["hai cạnh góc vuông", "cạnh huyền – góc nhọn", "cạnh huyền – cạnh góc vuông", "cạnh góc vuông – góc nhọn kề cạnh ấy"],
            answer: 0,
            explain: "$AB, AC$ và $DE, DF$ đều là các cạnh góc vuông (kề với góc vuông). Hai tam giác bằng nhau theo trường hợp hai cạnh góc vuông."
          },
          {
            id: "d2q5", level: "vua", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $MNP$ vuông tại $M$ có $BC = NP$, $\\widehat{B} = \\widehat{N}$. Cách viết nào sau đây đúng?",
            options: ["$\\Delta ABC = \\Delta MPN$", "$\\Delta ABC = \\Delta MNP$", "$\\Delta ABC = \\Delta NMP$", "$\\Delta ABC = \\Delta PNM$"],
            answer: 1,
            explain: "Hai tam giác bằng nhau theo trường hợp cạnh huyền – góc nhọn. Các đỉnh tương ứng: $A \\leftrightarrow M$ (góc vuông), $B \\leftrightarrow N$ (góc bằng nhau), $C \\leftrightarrow P$. Vậy $\\Delta ABC = \\Delta MNP$."
          },
          {
            id: "d2q6", level: "vua", source: "SGK Luyện tập chung – BT 4.29 (biến đổi)",
            q: "Trong hình dưới đây, $\\widehat{CAB} = \\widehat{DAB} = 40^\\circ$ và $\\widehat{CBA} = \\widehat{DBA} = 55^\\circ$. Số đo $\\widehat{ADB}$ là" +
              fig({ w: 260, h: 240, P: { A: [40, 122], B: [220, 122], C: [153.4, 26.9], D: [153.4, 217.1] },
                seg: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "D"], ["B", "D"]], arcs: [["C", "A", "B", 1], ["B", "A", "D", 1], ["A", "B", "C", 2], ["D", "B", "A", 2]],
                lp: { A: [-12, 0], B: [12, 0] }, txt: [["40°", 78, 112], ["40°", 78, 140], ["55°", 186, 112], ["55°", 186, 140]] }),
            options: ["$85^\\circ$", "$55^\\circ$", "$40^\\circ$", "$95^\\circ$"],
            answer: 0,
            explain: "$\\Delta ABC = \\Delta ABD$ (g.c.g: $\\widehat{CAB} = \\widehat{DAB}$, $AB$ chung, $\\widehat{CBA} = \\widehat{DBA}$). Suy ra $\\widehat{ADB} = \\widehat{ACB} = 180^\\circ - 40^\\circ - 55^\\circ = 85^\\circ$. (Cũng có thể tính thẳng trong tam giác $ABD$.)"
          },
          {
            id: "d2q7", level: "vua", source: "mới",
            q: "Một tam giác cân có một góc bằng $120^\\circ$. Hai góc còn lại có số đo là",
            options: ["$60^\\circ$ và $60^\\circ$", "$40^\\circ$ và $20^\\circ$", "$30^\\circ$ và $30^\\circ$", "$45^\\circ$ và $15^\\circ$"],
            answer: 2,
            explain: "Góc $120^\\circ$ không thể là góc ở đáy (vì hai góc đáy bằng nhau, tổng sẽ là $240^\\circ > 180^\\circ$), nên đó là góc ở đỉnh. Mỗi góc ở đáy bằng $(180^\\circ - 120^\\circ) : 2 = 30^\\circ$."
          },
          {
            id: "d2q8", level: "vua", source: "SBT Bài 16 – BT 4.49",
            q: "Cho đoạn thẳng $AB$ và điểm $M$ không nằm trên đường thẳng $AB$ sao cho $MA = MB = 4$ cm. Khẳng định nào sau đây đúng?",
            options: ["$M$ là trung điểm của $AB$", "$MA \\perp AB$", "$M$ thuộc đường trung trực của $AB$", "Tam giác $MAB$ là tam giác đều"],
            answer: 2,
            explain: "Điểm cách đều hai đầu mút của đoạn thẳng thì nằm trên đường trung trực của đoạn thẳng đó. $M$ không nằm trên $AB$ nên không là trung điểm; chưa biết $AB$ nên chưa kết luận được tam giác đều."
          },
          {
            id: "d2q9", level: "kho", source: "mới",
            q: "Cho tam giác $ABC$ cân tại $A$. Trên cạnh $BC$ lấy hai điểm $D, E$ sao cho $BD = CE$ ($D$ nằm giữa $B$ và $E$). Khẳng định nào sau đây đúng?" +
              fig({ P: { A: [150, 20], B: [30, 180], C: [270, 180], D: [100, 180], E: [200, 180] },
                seg: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "D"], ["A", "E"]], ticks: [["A", "B", 1], ["A", "C", 1], ["B", "D", 2], ["E", "C", 2]],
                lp: { D: [0, 17], E: [0, 17] } }),
            options: ["$AD = AE$", "$AD = DE$", "$AB = AD$", "$\\widehat{BAD} = \\widehat{DAE}$"],
            answer: 0,
            explain: "Xét $\\Delta ABD$ và $\\Delta ACE$: $AB = AC$, $\\widehat{B} = \\widehat{C}$ (tam giác $ABC$ cân), $BD = CE$. Do đó $\\Delta ABD = \\Delta ACE$ (c.g.c), suy ra $AD = AE$."
          },
          {
            id: "d2q10", level: "kho", source: "mới",
            q: "Cho tam giác đều $ABC$. Trên tia đối của tia $CB$ lấy điểm $D$ sao cho $CD = CA$. Số đo $\\widehat{BAD}$ là",
            options: ["$60^\\circ$", "$120^\\circ$", "$30^\\circ$", "$90^\\circ$"],
            answer: 3,
            explain: "$\\widehat{ACD} = 180^\\circ - \\widehat{ACB} = 180^\\circ - 60^\\circ = 120^\\circ$. Tam giác $ACD$ cân tại $C$ nên $\\widehat{CAD} = (180^\\circ - 120^\\circ) : 2 = 30^\\circ$. Vậy $\\widehat{BAD} = \\widehat{BAC} + \\widehat{CAD} = 60^\\circ + 30^\\circ = 90^\\circ$."
          },
          {
            id: "d2q11", level: "kho", source: "SBT Bài 16 – BT 4.47",
            q: "Cho tam giác $ABH$ vuông tại $H$ có $\\widehat{ABH} = 60^\\circ$ và $AB = 10$ cm. Trên tia đối của tia $HB$ lấy điểm $C$ sao cho $HC = HB$. Độ dài $BH$ là",
            options: ["$10$ cm", "$5$ cm", "$20$ cm", "$2{,}5$ cm"],
            answer: 1,
            explain: "$AH \\perp BC$ tại trung điểm $H$ nên $AB = AC$; tam giác $ABC$ cân tại $A$ có $\\widehat{B} = 60^\\circ$ nên là tam giác đều. Do đó $BC = AB = 10$ cm và $BH = BC : 2 = 5$ cm."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SBT Bài 15 – BT 4.38 (biến đổi)", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ vuông tại $A$ và tam giác $DCB$ vuông tại $D$ ($A$ và $D$ nằm cùng phía đối với đường thẳng $BC$) sao cho $AB = DC$. Chứng minh rằng $AC = DB$." +
              fig({ P: { B: [30, 170], C: [270, 170], A: [90, 66.1], D: [210, 66.1] }, seg: [["B", "C"], ["A", "B"], ["A", "C"], ["D", "B"], ["D", "C"]],
                ticks: [["A", "B", 1], ["D", "C", 1]], right: [["B", "A", "C"], ["B", "D", "C"]], lp: { A: [-6, -12], D: [6, -12] } }),
            modelAnswer: "Xét hai tam giác vuông $ABC$ (vuông tại $A$) và $DCB$ (vuông tại $D$) có:<br>" +
              "• $BC$ là cạnh huyền chung;<br>• $AB = DC$ (giả thiết).<br>" +
              "Do đó $\\Delta ABC = \\Delta DCB$ (cạnh huyền – cạnh góc vuông).<br>" +
              "Suy ra $AC = DB$ (hai cạnh tương ứng).",
            rubric: [
              { pts: 0.5, text: "Chỉ ra hai tam giác vuông có cạnh huyền chung $BC$ và $AB = DC$." },
              { pts: 0.5, text: "Kết luận $\\Delta ABC = \\Delta DCB$ (cạnh huyền – cạnh góc vuông), đúng thứ tự đỉnh." },
              { pts: 0.5, text: "Suy ra $AC = DB$ (cạnh tương ứng)." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SBT Bài 16 – BT 4.50", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ cân tại $A$ có đường cao $AH$ ($H \\in BC$). Lấy điểm $M$ tùy ý trên đoạn $AH$ ($M$ khác $A$). Chứng minh rằng:<br>a) $MB = MC$;<br>b) $\\widehat{MBA} = \\widehat{MCA}$." +
              fig({ P: { A: [150, 20], B: [50, 190], C: [250, 190], H: [150, 190], M: [150, 120] },
                seg: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "H"], ["M", "B"], ["M", "C"]], ticks: [["A", "B", 1], ["A", "C", 1]],
                right: [["A", "H", "C"]], lp: { H: [0, 16], M: [12, -6] } }),
            modelAnswer: "a) Hai tam giác vuông $AHB$ và $AHC$ có cạnh huyền $AB = AC$, cạnh góc vuông $AH$ chung nên $\\Delta AHB = \\Delta AHC$ (cạnh huyền – cạnh góc vuông). Suy ra $HB = HC$.<br>" +
              "Đường thẳng $AH$ vuông góc với $BC$ tại trung điểm $H$ nên là đường trung trực của $BC$. Điểm $M$ thuộc $AH$ nên $MB = MC$.<br>" +
              "b) Xét $\\Delta ABM$ và $\\Delta ACM$: $AB = AC$, $MB = MC$ (câu a), $AM$ là cạnh chung. Do đó $\\Delta ABM = \\Delta ACM$ (c.c.c), suy ra $\\widehat{MBA} = \\widehat{MCA}$ (hai góc tương ứng).",
            rubric: [
              { pts: 0.5, text: "Chứng minh $HB = HC$ (qua $\\Delta AHB = \\Delta AHC$)." },
              { pts: 0.5, text: "Suy ra $AH$ là trung trực của $BC$ nên $MB = MC$ (hoặc chứng minh qua $\\Delta MHB = \\Delta MHC$)." },
              { pts: 0.5, text: "Chứng minh $\\Delta ABM = \\Delta ACM$ (c.c.c) và suy ra $\\widehat{MBA} = \\widehat{MCA}$." }
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
            q: "Tam giác $ABC$ có $AB = AC$. Tam giác $ABC$ cân tại",
            options: ["đỉnh $B$", "đỉnh $C$", "đỉnh $A$", "không cân tại đỉnh nào"],
            answer: 2,
            explain: "Hai cạnh bằng nhau $AB$ và $AC$ cùng đi qua đỉnh $A$, nên tam giác $ABC$ cân tại $A$."
          },
          {
            id: "d3q2", level: "de", source: "mới",
            q: "Cho tam giác $MNP$ cân tại $M$ có $\\widehat{N} = 35^\\circ$. Số đo $\\widehat{M}$ là",
            options: ["$110^\\circ$", "$35^\\circ$", "$145^\\circ$", "$72{,}5^\\circ$"],
            answer: 0,
            explain: "$\\widehat{P} = \\widehat{N} = 35^\\circ$ nên $\\widehat{M} = 180^\\circ - 2 \\cdot 35^\\circ = 110^\\circ$."
          },
          {
            id: "d3q3", level: "de", source: "mới",
            q: "Tam giác có ba góc bằng nhau là",
            options: ["tam giác vuông cân", "tam giác đều", "tam giác tù", "tam giác vuông"],
            answer: 1,
            explain: "Ba góc bằng nhau thì mỗi góc bằng $60^\\circ$; đó là tam giác đều."
          },
          {
            id: "d3q4", level: "de", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $AB = DE$, $\\widehat{B} = \\widehat{E}$. Hai tam giác này bằng nhau theo trường hợp",
            options: ["hai cạnh góc vuông", "cạnh huyền – cạnh góc vuông", "cạnh huyền – góc nhọn", "cạnh góc vuông – góc nhọn kề cạnh ấy"],
            answer: 3,
            explain: "$AB$, $DE$ là cạnh góc vuông; góc $B$ (góc $E$) là góc nhọn kề với cạnh đó. Đây là trường hợp cạnh góc vuông – góc nhọn kề cạnh ấy."
          },
          {
            id: "d3q5", level: "vua", source: "SBT Bài 16 – BT 4.48",
            q: "Đường thẳng $d$ là đường trung trực của đoạn thẳng $AB$ dài $10$ cm, $d$ cắt $AB$ tại $O$. Khẳng định nào sau đây <b>sai</b>?",
            options: ["$OA = 5$ cm", "$d \\perp AB$", "Mọi điểm $M$ thuộc $d$ đều có $MA = MB$", "$OA = 10$ cm"],
            answer: 3,
            explain: "$O$ là trung điểm của $AB$ nên $OA = 10 : 2 = 5$ cm, không phải $10$ cm. Các khẳng định còn lại đều đúng."
          },
          {
            id: "d3q6", level: "vua", source: "mới",
            q: "Cho tam giác $ABC$ cân tại $A$ có $AB = 5$ cm, $BC = 6$ cm. Chu vi tam giác $ABC$ là",
            options: ["$16$ cm", "$17$ cm", "$11$ cm", "$15$ cm"],
            answer: 0,
            explain: "Tam giác cân tại $A$ nên $AC = AB = 5$ cm. Chu vi $= 5 + 5 + 6 = 16$ (cm)."
          },
          {
            id: "d3q7", level: "vua", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$ có $\\widehat{B} = 45^\\circ$. Tam giác $ABC$ là",
            options: ["tam giác đều", "tam giác vuông cân", "tam giác tù", "tam giác vuông nhưng không cân"],
            answer: 1,
            explain: "$\\widehat{C} = 90^\\circ - 45^\\circ = 45^\\circ = \\widehat{B}$, nên tam giác $ABC$ cân tại $A$. Tam giác vừa vuông vừa cân tại $A$ là tam giác vuông cân."
          },
          {
            id: "d3q8", level: "vua", source: "mới",
            q: "Cho điểm $H$ nằm giữa $B$ và $C$, $AH \\perp BC$ và $AB = AC$. Biết $\\widehat{BAH} = 25^\\circ$. Số đo $\\widehat{BAC}$ là",
            options: ["$25^\\circ$", "$65^\\circ$", "$50^\\circ$", "$130^\\circ$"],
            answer: 2,
            explain: "Hai tam giác vuông $AHB$ và $AHC$ có $AB = AC$ (cạnh huyền), $AH$ chung nên bằng nhau (cạnh huyền – cạnh góc vuông). Suy ra $\\widehat{CAH} = \\widehat{BAH} = 25^\\circ$, do đó $\\widehat{BAC} = 50^\\circ$."
          },
          {
            id: "d3q9", level: "kho", source: "mới",
            q: "Cho tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 36^\\circ$. Tia phân giác của góc $B$ cắt $AC$ tại $D$. Số đo $\\widehat{BDC}$ là",
            options: ["$36^\\circ$", "$72^\\circ$", "$108^\\circ$", "$54^\\circ$"],
            answer: 1,
            explain: "$\\widehat{ABC} = \\widehat{C} = (180^\\circ - 36^\\circ) : 2 = 72^\\circ$, nên $\\widehat{DBC} = 72^\\circ : 2 = 36^\\circ$. Trong tam giác $BDC$: $\\widehat{BDC} = 180^\\circ - 36^\\circ - 72^\\circ = 72^\\circ$."
          },
          {
            id: "d3q10", level: "kho", source: "SGK Luyện tập chung – Ví dụ 2",
            q: "Cho $d$ là đường trung trực của đoạn thẳng $AB$, $d$ cắt $AB$ tại $O$. Lấy $M, N$ là hai điểm phân biệt trên $d$ sao cho $OM = ON$. Khẳng định nào sau đây <b>luôn</b> đúng?" +
              fig({ w: 280, h: 214, P: { A: [40, 110], B: [240, 110], O: [140, 110], M: [140, 40], N: [140, 180] },
                seg: [["A", "B"], ["A", "M"], ["B", "M"], ["A", "N"], ["B", "N"], [[140, 10], [140, 205]]],
                ticks: [["A", "O", 1], ["O", "B", 1], ["O", "M", 2], ["O", "N", 2]], right: [["B", "O", "M"]],
                lp: { O: [-10, 14], M: [12, -6], N: [12, 8], A: [-12, 0], B: [12, 0] }, txt: [["d", 150, 18]] }),
            options: ["$AM = AB$", "$OM = OA$", "$AM = BN$", "$MN = AB$"],
            answer: 2,
            explain: "Hai tam giác vuông $AOM$ và $AON$ có $OA$ chung, $OM = ON$ nên bằng nhau, suy ra $AM = AN$. Mặt khác $N$ thuộc trung trực của $AB$ nên $AN = BN$. Vậy $AM = BN$. Các khẳng định khác phụ thuộc vào độ dài cụ thể nên không luôn đúng."
          },
          {
            id: "d3q11", level: "kho", source: "mới",
            q: "Cho tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 40^\\circ$. Trên tia đối của tia $BC$ lấy điểm $D$ sao cho $BD = BA$. Số đo $\\widehat{ADB}$ là",
            options: ["$70^\\circ$", "$55^\\circ$", "$20^\\circ$", "$35^\\circ$"],
            answer: 3,
            explain: "$\\widehat{ABC} = (180^\\circ - 40^\\circ) : 2 = 70^\\circ$, nên $\\widehat{ABD} = 180^\\circ - 70^\\circ = 110^\\circ$ (kề bù). Tam giác $ABD$ cân tại $B$ nên $\\widehat{ADB} = (180^\\circ - 110^\\circ) : 2 = 35^\\circ$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SGK Luyện tập chung – BT 4.32", maxPoints: 1.5,
            q: "Cho tam giác $MBC$ vuông tại $M$ có $\\widehat{B} = 60^\\circ$. Gọi $A$ là điểm nằm trên tia đối của tia $MB$ sao cho $MA = MB$. Chứng minh rằng tam giác $ABC$ là tam giác đều." +
              fig({ w: 300, h: 192, P: { A: [70, 170], M: [150, 170], B: [230, 170], C: [150, 31.4] },
                seg: [["A", "B"], ["M", "C"], ["C", "A"], ["C", "B"]], ticks: [["A", "M", 1], ["M", "B", 1]], right: [["C", "M", "B"]],
                arcs: [["M", "B", "C", 1]], lp: { M: [0, 17], A: [-10, 6], B: [10, 6] }, txt: [["60°", 205, 160]] }),
            modelAnswer: "Xét hai tam giác vuông $CMA$ và $CMB$ (vuông tại $M$) có: $MA = MB$ (giả thiết), $CM$ là cạnh chung.<br>" +
              "Do đó $\\Delta CMA = \\Delta CMB$ (hai cạnh góc vuông), suy ra $CA = CB$. Vậy tam giác $ABC$ cân tại $C$.<br>" +
              "Tam giác cân $ABC$ có $\\widehat{B} = 60^\\circ$ nên $\\widehat{A} = \\widehat{B} = 60^\\circ$ và $\\widehat{C} = 180^\\circ - 60^\\circ - 60^\\circ = 60^\\circ$.<br>" +
              "Tam giác $ABC$ có ba góc bằng $60^\\circ$ nên là tam giác đều.",
            rubric: [
              { pts: 0.5, text: "Chứng minh $\\Delta CMA = \\Delta CMB$ (hai cạnh góc vuông) hoặc chỉ ra $CM$ là trung trực của $AB$." },
              { pts: 0.5, text: "Suy ra $CA = CB$, tam giác $ABC$ cân tại $C$." },
              { pts: 0.5, text: "Dùng $\\widehat{B} = 60^\\circ$ để kết luận tam giác $ABC$ đều (có lập luận về các góc)." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SGK Luyện tập chung – Ví dụ 1 (biến đổi)", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ cân tại $A$. Trên cạnh $AB$ lấy điểm $D$, trên cạnh $AC$ lấy điểm $E$ sao cho $AD = AE$. Chứng minh rằng:<br>a) $BE = CD$;<br>b) $\\widehat{ABE} = \\widehat{ACD}$." +
              fig({ P: { A: [150, 20], B: [50, 190], C: [250, 190], D: [105, 96.5], E: [195, 96.5] },
                seg: [["A", "B"], ["A", "C"], ["B", "C"], ["B", "E"], ["C", "D"]], ticks: [["A", "D", 1], ["A", "E", 1]],
                lp: { D: [-12, -2], E: [12, -2] } }),
            modelAnswer: "Xét $\\Delta ABE$ và $\\Delta ACD$ có:<br>" +
              "• $AB = AC$ (tam giác $ABC$ cân tại $A$);<br>• $\\widehat{A}$ là góc chung;<br>• $AE = AD$ (giả thiết).<br>" +
              "Do đó $\\Delta ABE = \\Delta ACD$ (c.g.c).<br>" +
              "a) Suy ra $BE = CD$ (hai cạnh tương ứng).<br>" +
              "b) Suy ra $\\widehat{ABE} = \\widehat{ACD}$ (hai góc tương ứng).",
            rubric: [
              { pts: 0.5, text: "Nêu đủ ba yếu tố $AB = AC$, góc $A$ chung, $AE = AD$." },
              { pts: 0.5, text: "Kết luận $\\Delta ABE = \\Delta ACD$ (c.g.c), đúng thứ tự đỉnh." },
              { pts: 0.5, text: "Suy ra đúng $BE = CD$ và $\\widehat{ABE} = \\widehat{ACD}$." }
            ]
          }
        ]
      }
    ]
  });
})();
