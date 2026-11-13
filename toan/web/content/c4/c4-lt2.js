(function () {
  // Vẽ hình học bằng SVG (currentColor để hợp chế độ sáng/tối).
  // o = { w, h, pts: {A:[x,y],...}, segs: ["AB", ...], dash: ["AD"], rays: [["O",[x,y],"x"]],
  //       ticks: [["A","B",n]] (gạch đánh dấu cạnh bằng nhau), arcs: [["B","A","C",n]] (cung ở đỉnh giữa),
  //       r: bán kính cung, lab: {A:[dx,dy]} (vị trí nhãn), texts: [[x,y,"60°"]] }
  function fig(o) {
    var P = o.pts, W = o.w || 320, H = o.h || 200;
    var f = function (v) { return v.toFixed(1); };
    var unit = function (a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy) || 1; return [dx / l, dy / l]; };
    var line = function (a, b, extra) { return '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" stroke="currentColor" stroke-width="1.6"' + (extra || '') + '/>'; };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:320px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">';
    (o.rays || []).forEach(function (r) {
      var a = P[r[0]], b = r[1];
      s += line(a, b);
      if (r[2]) { var u = unit(a, b); s += '<text x="' + f(b[0] + u[0] * 9) + '" y="' + f(b[1] + u[1] * 9) + '" font-size="13" font-style="italic" text-anchor="middle" dominant-baseline="middle" fill="currentColor">' + r[2] + '</text>'; }
    });
    (o.segs || []).forEach(function (sg) {
      s += line(P[sg[0]], P[sg[1]], (o.dash || []).indexOf(sg) >= 0 ? ' stroke-dasharray="5 4"' : '');
    });
    (o.ticks || []).forEach(function (t) {
      var a = P[t[0]], b = P[t[1]], n = t[2] || 1, u = unit(a, b), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      for (var i = 0; i < n; i++) {
        var off = (i - (n - 1) / 2) * 5, c = [m[0] + u[0] * off, m[1] + u[1] * off];
        s += '<line x1="' + f(c[0] - u[1] * 6) + '" y1="' + f(c[1] + u[0] * 6) + '" x2="' + f(c[0] + u[1] * 6) + '" y2="' + f(c[1] - u[0] * 6) + '" stroke="#e5484d" stroke-width="1.6"/>';
      }
    });
    (o.arcs || []).forEach(function (a) {
      var V = P[a[1]], u1 = unit(V, P[a[0]]), u2 = unit(V, P[a[2]]), n = a[3] || 1;
      var sweep = (u1[0] * u2[1] - u1[1] * u2[0]) > 0 ? 1 : 0;
      for (var i = 0; i < n; i++) {
        var r = (o.r || 18) + i * 4;
        s += '<path d="M' + f(V[0] + u1[0] * r) + ' ' + f(V[1] + u1[1] * r) + ' A' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + f(V[0] + u2[0] * r) + ' ' + f(V[1] + u2[1] * r) + '" fill="none" stroke="#e5484d" stroke-width="1.4"/>';
      }
    });
    var names = Object.keys(P), cx = 0, cy = 0;
    names.forEach(function (k) { cx += P[k][0]; cy += P[k][1]; });
    cx /= names.length; cy /= names.length;
    names.forEach(function (k) {
      var p = P[k], d;
      if (o.lab && o.lab[k]) d = o.lab[k];
      else { var u = unit([cx, cy], p); d = [u[0] * 13, u[1] * 13]; }
      s += '<text x="' + f(p[0] + d[0]) + '" y="' + f(p[1] + d[1]) + '" font-size="14" font-style="italic" text-anchor="middle" dominant-baseline="middle" fill="currentColor">' + k + '</text>';
    });
    (o.texts || []).forEach(function (t) {
      s += '<text x="' + t[0] + '" y="' + t[1] + '" font-size="12" text-anchor="middle" dominant-baseline="middle" fill="currentColor">' + t[2] + '</text>';
    });
    return s + '</svg>';
  }

  // Hai tam giác ABC và DEF cùng hình dạng, đặt cạnh nhau; marks = { ticks, arcs, texts }
  function twoTri(marks) {
    return fig({
      w: 320, h: 175,
      pts: { A: [30, 150], B: [140, 150], C: [65, 45], D: [180, 150], E: [290, 150], F: [215, 45] },
      segs: ["AB", "BC", "CA", "DE", "EF", "FD"],
      lab: { A: [-10, 10], B: [10, 10], C: [0, -12], D: [-10, 10], E: [10, 10], F: [0, -12] },
      ticks: marks.ticks, arcs: marks.arcs, texts: marks.texts
    });
  }

  // Hai đoạn AC, BD cắt nhau tại trung điểm O của mỗi đoạn
  function bowtie(segs) {
    return fig({
      w: 320, h: 195,
      pts: { A: [40, 40], B: [230, 30], C: [280, 160], D: [90, 170], O: [160, 100] },
      segs: segs, lab: { O: [16, 2] },
      ticks: [["O", "A", 1], ["O", "C", 1], ["O", "B", 2], ["O", "D", 2]]
    });
  }

  // Hình "cánh diều": AB là cạnh chung, C và D ở hai phía của AB
  function kite(o) {
    var pts = { A: [40, 100], B: [280, 100], C: [190, 25], D: [190, 175] };
    var segs = ["AB", "AC", "AD", "BC", "BD"];
    if (o.M) { pts.M = [150, 100]; segs = segs.concat(["MC", "MD"]); }
    return fig({ w: 320, h: 200, pts: pts, segs: segs, ticks: o.ticks, arcs: o.arcs, r: 22, lab: { M: [-8, 14] } });
  }

  registerLesson({
    id: "c4-lt2",
    chapter: 4,
    kind: "review",
    title: "Luyện tập chung (Bài 14)",
    sgkPages: [74, 74],
    sbtPages: [59, 62],
    objectives: [
      "Nhận biết góc xen giữa hai cạnh, góc kề một cạnh của tam giác",
      "Chứng minh hai tam giác bằng nhau theo trường hợp cạnh – góc – cạnh (c.g.c) và góc – cạnh – góc (g.c.g)",
      "Từ hai tam giác bằng nhau suy ra các cạnh, các góc tương ứng bằng nhau; tính độ dài, số đo góc",
      "Phối hợp với tổng ba góc của tam giác, góc đối đỉnh, góc kề bù, dấu hiệu song song khi lập luận"
    ],

    theory: [
      {
        heading: "1. Nhắc lại: hai tam giác bằng nhau",
        html: "$\\Delta ABC = \\Delta DEF$ nghĩa là các cạnh tương ứng bằng nhau ($AB = DE$, $BC = EF$, $CA = FD$) và các góc tương ứng bằng nhau ($\\widehat{A} = \\widehat{D}$, $\\widehat{B} = \\widehat{E}$, $\\widehat{C} = \\widehat{F}$)." +
          "<ul><li>Khi viết, các đỉnh tương ứng phải được viết <b>theo cùng thứ tự</b>.</li>" +
          "<li>Trường hợp thứ nhất (Bài 13): ba cạnh tương ứng bằng nhau → bằng nhau (c.c.c).</li>" +
          "<li>Tổng ba góc của một tam giác bằng $180^\\circ$, nên hai tam giác có hai cặp góc bằng nhau thì cặp góc thứ ba cũng bằng nhau.</li></ul>"
      },
      {
        heading: "2. Trường hợp cạnh – góc – cạnh (c.g.c)",
        html: "Trong tam giác $ABC$, góc $A$ là <b>góc xen giữa</b> hai cạnh $AB$ và $AC$." +
          "<br>Nếu <b>hai cạnh và góc xen giữa</b> của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia thì hai tam giác đó bằng nhau." +
          twoTri({ ticks: [["A", "B", 1], ["D", "E", 1], ["A", "C", 2], ["D", "F", 2]], arcs: [["B", "A", "C", 1], ["E", "D", "F", 1]] }) +
          "Hình trên: $AB = DE$, $\\widehat{A} = \\widehat{D}$, $AC = DF$ nên $\\Delta ABC = \\Delta DEF$ (c.g.c).<br>" +
          "<b>Chú ý:</b> góc bằng nhau phải là góc <b>xen giữa</b> hai cặp cạnh đó; \"hai cạnh và một góc không xen giữa\" thì chưa kết luận được."
      },
      {
        heading: "3. Trường hợp góc – cạnh – góc (g.c.g)",
        html: "Trong tam giác $ABC$, hai góc $B$ và $C$ là hai <b>góc kề</b> cạnh $BC$." +
          "<br>Nếu <b>một cạnh và hai góc kề</b> của tam giác này bằng một cạnh và hai góc kề của tam giác kia thì hai tam giác đó bằng nhau." +
          twoTri({ ticks: [["B", "C", 1], ["E", "F", 1]], arcs: [["A", "B", "C", 1], ["D", "E", "F", 1], ["B", "C", "A", 2], ["E", "F", "D", 2]] }) +
          "Hình trên: $\\widehat{B} = \\widehat{E}$, $BC = EF$, $\\widehat{C} = \\widehat{F}$ nên $\\Delta ABC = \\Delta DEF$ (g.c.g).<br>" +
          "<b>Mở rộng:</b> nếu biết một cạnh, một góc kề và góc đối diện với cạnh đó bằng nhau, ta tính góc còn lại nhờ tổng ba góc bằng $180^\\circ$ rồi dùng g.c.g."
      },
      {
        heading: "4. Cách chứng minh hai đoạn thẳng (hai góc) bằng nhau",
        html: "<ul><li>Bước 1: chọn hai tam giác lần lượt chứa hai đoạn thẳng (hai góc) đó.</li>" +
          "<li>Bước 2: chứng minh hai tam giác bằng nhau (c.c.c, c.g.c hoặc g.c.g), ghi rõ lí do từng cặp yếu tố: theo giả thiết, cạnh chung, hai góc đối đỉnh, hai góc kề bù với hai góc bằng nhau, hai góc so le trong…</li>" +
          "<li>Bước 3: suy ra cặp cạnh (cặp góc) tương ứng bằng nhau.</li></ul>" +
          "Có khi phải chứng minh <b>hai lần</b>: cặp tam giác thứ nhất cho thêm một cặp yếu tố bằng nhau, dùng nó cho cặp tam giác thứ hai."
      }
    ],

    skills: [
      "<b>Xác định đúng trường hợp:</b> đánh dấu các yếu tố đã biết lên hình. Góc nằm <b>giữa</b> hai cạnh đã biết → nghĩ đến c.g.c; cạnh nằm <b>giữa</b> hai góc đã biết → nghĩ đến g.c.g.",
      "<b>Tìm yếu tố \"ẩn\":</b> cạnh chung, hai góc đối đỉnh, góc chung, hai góc kề bù với hai góc bằng nhau, cặp góc so le trong (khi có hai đường thẳng song song), tia phân giác chia góc thành hai góc bằng nhau, trung điểm chia đoạn thẳng thành hai đoạn bằng nhau.",
      "<b>Viết đúng thứ tự đỉnh:</b> đỉnh có góc bằng nhau đặt cùng vị trí. Ví dụ $AB = EF$, $\\widehat{B} = \\widehat{F}$, $BC = FD$ thì $A \\leftrightarrow E$, $B \\leftrightarrow F$, $C \\leftrightarrow D$ nên viết $\\Delta ABC = \\Delta EFD$.",
      "<b>Tính số đo, độ dài:</b> chứng minh hai tam giác bằng nhau trước, rồi lấy cạnh/góc tương ứng; góc còn thiếu thì dùng tổng ba góc bằng $180^\\circ$.",
      "<b>Lỗi hay gặp:</b> dùng c.g.c khi góc không xen giữa hai cạnh; dùng g.c.g khi góc không kề cạnh đã biết; viết sai thứ tự đỉnh nên suy ra sai cạnh tương ứng; quên ghi lí do (\"cạnh chung\", \"đối đỉnh\")."
    ],

    examples: [
      {
        q: "Cho hai tam giác $ABC$ và $DEF$ có $AB = DE$, $AC = DF$, $\\widehat{BAC} = \\widehat{EDF} = 60^\\circ$, $BC = 5$ cm, $\\widehat{ABC} = 50^\\circ$. Tính $EF$ và số đo các góc $ACB$, $DEF$, $DFE$.",
        solution: "Hai tam giác $ABC$ và $DEF$ có: $AB = DE$, $\\widehat{BAC} = \\widehat{EDF}$, $AC = DF$ (giả thiết). Vậy $\\Delta ABC = \\Delta DEF$ (c.g.c).<br>" +
          "Suy ra $EF = BC = 5$ cm và $\\widehat{DEF} = \\widehat{ABC} = 50^\\circ$.<br>" +
          "Trong tam giác $ABC$: $\\widehat{ACB} = 180^\\circ - 60^\\circ - 50^\\circ = 70^\\circ$, nên $\\widehat{DFE} = \\widehat{ACB} = 70^\\circ$."
      },
      {
        q: "Cho hình vẽ, điểm $M$ thuộc đoạn thẳng $AB$, $AC = AD$ và $\\widehat{CAB} = \\widehat{DAB}$. Chứng minh: a) $\\Delta ABC = \\Delta ABD$; b) $MC = MD$." +
          kite({ M: true, ticks: [["A", "C", 1], ["A", "D", 1]], arcs: [["C", "A", "B", 1], ["B", "A", "D", 1]] }),
        solution: "a) Hai tam giác $ABC$ và $ABD$ có: $AC = AD$ (giả thiết); $\\widehat{CAB} = \\widehat{DAB}$ (giả thiết); $AB$ là cạnh chung. Vậy $\\Delta ABC = \\Delta ABD$ (c.g.c).<br>" +
          "b) Từ câu a suy ra $BC = BD$ và $\\widehat{ABC} = \\widehat{ABD}$, tức là $\\widehat{MBC} = \\widehat{MBD}$.<br>" +
          "Hai tam giác $MBC$ và $MBD$ có: $BC = BD$; $\\widehat{MBC} = \\widehat{MBD}$; $MB$ là cạnh chung. Vậy $\\Delta MBC = \\Delta MBD$ (c.g.c), suy ra $MC = MD$."
      },
      {
        q: "Bạn Lan nói: \"Nếu một cạnh, một góc kề cạnh đó và góc đối diện với cạnh đó của tam giác này lần lượt bằng một cạnh, một góc kề và góc đối diện tương ứng của tam giác kia thì hai tam giác bằng nhau\". Bạn Lan nói đúng không?",
        solution: "Đúng. Giả sử $\\Delta ABC$ và $\\Delta A'B'C'$ có $AC = A'C'$, $\\widehat{A} = \\widehat{A'}$ (kề cạnh $AC$) và $\\widehat{B} = \\widehat{B'}$ (đối diện cạnh $AC$).<br>" +
          "Vì tổng ba góc của tam giác bằng $180^\\circ$ nên $\\widehat{C} = 180^\\circ - \\widehat{A} - \\widehat{B} = 180^\\circ - \\widehat{A'} - \\widehat{B'} = \\widehat{C'}$.<br>" +
          "Khi đó hai tam giác có $\\widehat{A} = \\widehat{A'}$, $AC = A'C'$, $\\widehat{C} = \\widehat{C'}$ nên $\\Delta ABC = \\Delta A'B'C'$ (g.c.g)."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "mới",
            q: "Hai tam giác $ABC$ và $MNP$ có $AB = MN$, $\\widehat{B} = \\widehat{N}$, $BC = NP$. Khẳng định nào đúng?",
            options: ["$\\Delta ABC = \\Delta MNP$ (c.g.c)", "$\\Delta ABC = \\Delta NMP$ (c.g.c)", "$\\Delta ABC = \\Delta MNP$ (g.c.g)", "$\\Delta ABC = \\Delta MPN$ (c.g.c)"],
            answer: 0,
            explain: "Góc $B$ xen giữa $AB, BC$; góc $N$ xen giữa $MN, NP$. Hai cạnh và góc xen giữa bằng nhau nên $\\Delta ABC = \\Delta MNP$ (c.g.c), với $A \\leftrightarrow M$, $B \\leftrightarrow N$, $C \\leftrightarrow P$."
          },
          {
            id: "d1q2", level: "de", source: "SGK Bài 14 – Khái niệm góc xen giữa",
            q: "Trong tam giác $ABC$, góc xen giữa hai cạnh $AB$ và $AC$ là",
            options: ["$\\widehat{ABC}$", "$\\widehat{ACB}$", "$\\widehat{BAC}$", "Không có góc nào"],
            answer: 2,
            explain: "Hai cạnh $AB$ và $AC$ cùng đi qua đỉnh $A$, nên góc xen giữa chúng là $\\widehat{BAC}$."
          },
          {
            id: "d1q3", level: "de", source: "SGK tr.72 – Khái niệm góc kề",
            q: "Trong tam giác $ABC$, hai góc kề cạnh $BC$ là",
            options: ["$\\widehat{A}$ và $\\widehat{B}$", "$\\widehat{B}$ và $\\widehat{C}$", "$\\widehat{A}$ và $\\widehat{C}$", "Chỉ có $\\widehat{A}$"],
            answer: 1,
            explain: "Hai góc kề cạnh $BC$ là hai góc ở hai đầu mút $B$ và $C$ của cạnh đó: $\\widehat{B}$ và $\\widehat{C}$. Góc $A$ là góc đối diện cạnh $BC$."
          },
          {
            id: "d1q4", level: "de", source: "SGK Bài 14 – BT 4.12 (biến đổi)",
            q: "Quan sát hình vẽ (các kí hiệu giống nhau chỉ các cạnh, các góc bằng nhau). Hai tam giác $ABC$ và $DEF$ bằng nhau theo trường hợp nào?" +
              twoTri({ ticks: [["A", "B", 1], ["D", "E", 1], ["A", "C", 2], ["D", "F", 2]], arcs: [["B", "A", "C", 1], ["E", "D", "F", 1]] }),
            options: ["c.c.c", "g.c.g", "Không đủ dữ kiện để kết luận", "c.g.c"],
            answer: 3,
            explain: "Hình cho $AB = DE$, $AC = DF$ và $\\widehat{A} = \\widehat{D}$ là góc xen giữa hai cặp cạnh đó. Vậy $\\Delta ABC = \\Delta DEF$ (c.g.c)."
          },
          {
            id: "d1q5", level: "vua", source: "mới",
            q: "Cho $\\Delta ABC$ và $\\Delta DEF$ có $\\widehat{B} = \\widehat{E}$, $BC = EF$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta DEF$ theo trường hợp góc – cạnh – góc?",
            options: ["$AB = DE$", "$AC = DF$", "$\\widehat{C} = \\widehat{F}$", "$\\widehat{C} = \\widehat{D}$"],
            answer: 2,
            explain: "Trường hợp g.c.g cần cạnh $BC = EF$ và <b>hai góc kề</b> cạnh đó: $\\widehat{B} = \\widehat{E}$ và $\\widehat{C} = \\widehat{F}$. Thêm $AB = DE$ thì là trường hợp c.g.c, không phải g.c.g."
          },
          {
            id: "d1q6", level: "vua", source: "SGK Bài 14 – BT 4.16 (biến đổi)",
            q: "Cho $\\Delta ABC$ và $\\Delta DEF$ có $AB = DE$, $AC = DF$, $\\widehat{A} = \\widehat{D} = 70^\\circ$ và $\\widehat{B} = 50^\\circ$. Số đo góc $F$ là",
            options: ["$60^\\circ$", "$50^\\circ$", "$70^\\circ$", "$110^\\circ$"],
            answer: 0,
            explain: "$\\Delta ABC = \\Delta DEF$ (c.g.c) nên $\\widehat{F} = \\widehat{C} = 180^\\circ - 70^\\circ - 50^\\circ = 60^\\circ$."
          },
          {
            id: "d1q7", level: "vua", source: "SGK Bài 14 – BT 4.17 (biến đổi)",
            q: "Cho $\\Delta ABC$ và $\\Delta DEF$ có $AB = DE$, $\\widehat{A} = \\widehat{D} = 55^\\circ$, $\\widehat{B} = \\widehat{E} = 65^\\circ$, $AC = 7$ cm. Độ dài cạnh $DF$ là",
            options: ["$3{,}5$ cm", "$14$ cm", "Không tính được vì chưa biết $AB$", "$7$ cm"],
            answer: 3,
            explain: "Cạnh $AB$ và hai góc kề $\\widehat{A}, \\widehat{B}$ bằng cạnh $DE$ và hai góc kề $\\widehat{D}, \\widehat{E}$ nên $\\Delta ABC = \\Delta DEF$ (g.c.g). Suy ra $DF = AC = 7$ cm."
          },
          {
            id: "d1q8", level: "vua", source: "SGK Bài 14 – BT 4.13 (biến đổi)",
            q: "Hai đoạn thẳng $AC$ và $BD$ cắt nhau tại $O$ sao cho $OA = OC$, $OB = OD$ (hình vẽ). Khẳng định nào đúng?" +
              bowtie(["AC", "BD", "AB", "CD"]),
            options: ["$\\Delta AOB = \\Delta DOC$ (c.g.c)", "$\\Delta AOB = \\Delta COD$ (c.g.c)", "$\\Delta AOB = \\Delta COD$ (g.c.g)", "$\\Delta AOB = \\Delta COD$ (c.c.c)"],
            answer: 1,
            explain: "$OA = OC$; $\\widehat{AOB} = \\widehat{COD}$ (hai góc đối đỉnh); $OB = OD$. Vậy $\\Delta AOB = \\Delta COD$ (c.g.c) với $A \\leftrightarrow C$, $B \\leftrightarrow D$. Chưa biết $AB = CD$ nên chưa dùng được c.c.c; chỉ có một cặp góc nên không phải g.c.g."
          },
          {
            id: "d1q9", level: "kho", source: "SGK tr.74 – Ví dụ (biến đổi)",
            q: "Trong hình vẽ, $\\widehat{BAC} = \\widehat{BAD}$ và $\\widehat{ABC} = \\widehat{ABD}$. Khẳng định nào chắc chắn đúng?" +
              kite({ arcs: [["C", "A", "B", 1], ["B", "A", "D", 1], ["A", "B", "C", 2], ["D", "B", "A", 2]] }),
            options: ["$AC = AD$", "$AC = BD$", "$AC = BC$", "$CD = AB$"],
            answer: 0,
            explain: "Hai tam giác $ABC$ và $ABD$ có: $\\widehat{BAC} = \\widehat{BAD}$; $AB$ là cạnh chung; $\\widehat{ABC} = \\widehat{ABD}$. Vậy $\\Delta ABC = \\Delta ABD$ (g.c.g), suy ra $AC = AD$ (và $BC = BD$)."
          },
          {
            id: "d1q10", level: "kho", source: "SGK tr.73 – Thử thách nhỏ",
            q: "Hai tam giác $ABC$ và $A'B'C'$ có $AC = A'C'$, $\\widehat{A} = \\widehat{A'}$, $\\widehat{B} = \\widehat{B'}$. Khẳng định nào đúng?",
            options: [
              "Không kết luận được vì $\\widehat{B}$ không kề cạnh $AC$",
              "$\\Delta ABC = \\Delta A'B'C'$ (c.g.c)",
              "Hai tam giác bằng nhau: suy ra $\\widehat{C} = \\widehat{C'}$ (tổng ba góc bằng $180^\\circ$) rồi dùng g.c.g",
              "$\\Delta ABC = \\Delta A'C'B'$"
            ],
            answer: 2,
            explain: "$\\widehat{C} = 180^\\circ - \\widehat{A} - \\widehat{B} = 180^\\circ - \\widehat{A'} - \\widehat{B'} = \\widehat{C'}$. Khi đó $\\widehat{A} = \\widehat{A'}$, $AC = A'C'$, $\\widehat{C} = \\widehat{C'}$ nên $\\Delta ABC = \\Delta A'B'C'$ (g.c.g)."
          },
          {
            id: "d1q11", level: "kho", source: "SGK Bài 14 – BT 4.13 (biến đổi)",
            q: "Hai đoạn thẳng $AC$ và $BD$ cắt nhau (không vuông góc) tại $O$ sao cho $OA = OC$, $OB = OD$ (hình vẽ). Có bao nhiêu cặp tam giác bằng nhau có chung đỉnh $O$?" +
              bowtie(["AC", "BD", "AB", "BC", "CD", "DA"]),
            options: ["$1$", "$2$", "$3$", "$4$"],
            answer: 1,
            explain: "Các tam giác có đỉnh $O$: $AOB, BOC, COD, DOA$. Theo c.g.c (cùng với các cặp góc đối đỉnh): $\\Delta AOB = \\Delta COD$ và $\\Delta AOD = \\Delta COB$. Hai tam giác kề nhau như $AOB$ và $BOC$ nói chung không bằng nhau. Vậy có $2$ cặp."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK Bài 14 – BT 4.18 (biến đổi)", maxPoints: 1.5,
            q: "Cho hình vẽ: điểm $E$ nằm trên đoạn thẳng $AB$, $EC = ED$ và $\\widehat{AEC} = \\widehat{AED}$. Chứng minh rằng:<br>a) $\\Delta AEC = \\Delta AED$;<br>b) $BC = BD$." +
              fig({
                w: 320, h: 200,
                pts: { A: [30, 100], B: [290, 100], E: [170, 100], C: [150, 25], D: [150, 175] },
                segs: ["AB", "AC", "AD", "BC", "BD", "EC", "ED"],
                ticks: [["E", "C", 1], ["E", "D", 1]], arcs: [["A", "E", "C", 1], ["A", "E", "D", 1]], r: 16,
                lab: { A: [-12, 0], B: [12, 0], E: [16, -10], C: [0, -12], D: [0, 13] }
              }),
            modelAnswer: "a) Hai tam giác $AEC$ và $AED$ có: $EC = ED$ (giả thiết); $\\widehat{AEC} = \\widehat{AED}$ (giả thiết); $AE$ là cạnh chung.<br>Vậy $\\Delta AEC = \\Delta AED$ (c.g.c).<br>" +
              "b) Vì $E$ nằm giữa $A$ và $B$ nên $\\widehat{BEC} = 180^\\circ - \\widehat{AEC}$ và $\\widehat{BED} = 180^\\circ - \\widehat{AED}$ (các cặp góc kề bù). Mà $\\widehat{AEC} = \\widehat{AED}$ nên $\\widehat{BEC} = \\widehat{BED}$.<br>" +
              "Hai tam giác $BEC$ và $BED$ có: $EC = ED$; $\\widehat{BEC} = \\widehat{BED}$; $EB$ là cạnh chung. Vậy $\\Delta BEC = \\Delta BED$ (c.g.c), suy ra $BC = BD$.",
            rubric: [
              { pts: 0.5, text: "Câu a: nêu đủ ba yếu tố ($EC = ED$, $\\widehat{AEC} = \\widehat{AED}$, $AE$ chung) và kết luận c.g.c." },
              { pts: 0.5, text: "Câu b: chứng minh được $\\widehat{BEC} = \\widehat{BED}$ (kề bù với hai góc bằng nhau)." },
              { pts: 0.5, text: "Câu b: chứng minh $\\Delta BEC = \\Delta BED$ (c.g.c) và suy ra $BC = BD$." }
            ]
          },
          {
            id: "d1e2", level: "kho", source: "SGK Bài 14 – BT 4.19 (biến đổi)", maxPoints: 1.5,
            q: "Cho tia $Oz$ là tia phân giác của góc $xOy$. Lấy điểm $A$ trên tia $Ox$, điểm $B$ trên tia $Oy$ sao cho $OA = OB$; lấy điểm $C$ trên tia $Oz$.<br>a) Chứng minh $\\Delta OAC = \\Delta OBC$.<br>b) Lấy điểm $M$ trên tia đối của tia $CO$. Chứng minh $MA = MB$." +
              fig({
                w: 320, h: 200,
                pts: { O: [25, 100], A: [180, 31], B: [180, 169], C: [150, 100], M: [250, 100] },
                rays: [["O", [221, 13], "x"], ["O", [221, 187], "y"], ["O", [300, 100], "z"]],
                segs: ["CA", "CB", "MA", "MB"],
                ticks: [["O", "A", 1], ["O", "B", 1]], arcs: [["A", "O", "C", 1], ["C", "O", "B", 1]], r: 28,
                lab: { O: [-12, 0], A: [0, -13], B: [0, 14], C: [-6, -12], M: [4, -12] }
              }),
            modelAnswer: "a) Vì $Oz$ là tia phân giác của góc $xOy$ nên $\\widehat{AOC} = \\widehat{BOC}$.<br>Hai tam giác $OAC$ và $OBC$ có: $OA = OB$ (giả thiết); $\\widehat{AOC} = \\widehat{BOC}$; $OC$ là cạnh chung. Vậy $\\Delta OAC = \\Delta OBC$ (c.g.c).<br>" +
              "b) Từ câu a suy ra $CA = CB$ và $\\widehat{OCA} = \\widehat{OCB}$.<br>Vì $M$ thuộc tia đối của tia $CO$ nên $\\widehat{ACM} = 180^\\circ - \\widehat{OCA}$, $\\widehat{BCM} = 180^\\circ - \\widehat{OCB}$ (kề bù), do đó $\\widehat{ACM} = \\widehat{BCM}$.<br>" +
              "Hai tam giác $MAC$ và $MBC$ có: $CA = CB$; $\\widehat{ACM} = \\widehat{BCM}$; $CM$ là cạnh chung. Vậy $\\Delta MAC = \\Delta MBC$ (c.g.c), suy ra $MA = MB$.",
            rubric: [
              { pts: 0.5, text: "Câu a: dùng tính chất tia phân giác, nêu đủ yếu tố và kết luận $\\Delta OAC = \\Delta OBC$ (c.g.c)." },
              { pts: 0.5, text: "Câu b: suy ra $CA = CB$, $\\widehat{OCA} = \\widehat{OCB}$ và chứng minh $\\widehat{ACM} = \\widehat{BCM}$ (kề bù)." },
              { pts: 0.5, text: "Câu b: chứng minh $\\Delta MAC = \\Delta MBC$ (c.g.c) và kết luận $MA = MB$." }
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
            q: "Cho $\\Delta MNP = \\Delta IHK$. Khẳng định nào đúng?",
            options: ["$MN = HK$", "$MN = IH$", "$NP = IK$", "$MP = IH$"],
            answer: 1,
            explain: "Thứ tự đỉnh tương ứng: $M \\leftrightarrow I$, $N \\leftrightarrow H$, $P \\leftrightarrow K$. Do đó $MN = IH$, $NP = HK$, $MP = IK$."
          },
          {
            id: "d2q2", level: "de", source: "SGK tr.72 – Câu hỏi (biến đổi)",
            q: "Quan sát hình vẽ (các kí hiệu giống nhau chỉ các cạnh, các góc bằng nhau). Hai tam giác $ABC$ và $DEF$ bằng nhau theo trường hợp nào?" +
              twoTri({ ticks: [["B", "C", 1], ["E", "F", 1]], arcs: [["A", "B", "C", 1], ["D", "E", "F", 1], ["B", "C", "A", 2], ["E", "F", "D", 2]] }),
            options: ["c.g.c", "c.c.c", "Không đủ dữ kiện để kết luận", "g.c.g"],
            answer: 3,
            explain: "Hình cho $BC = EF$ và hai góc kề các cạnh đó: $\\widehat{B} = \\widehat{E}$, $\\widehat{C} = \\widehat{F}$. Vậy $\\Delta ABC = \\Delta DEF$ (g.c.g)."
          },
          {
            id: "d2q3", level: "de", source: "mới",
            q: "Cho $\\Delta ABC$ và $\\Delta DEF$ có $AB = DE$, $\\widehat{A} = \\widehat{D}$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta DEF$ theo trường hợp cạnh – góc – cạnh?",
            options: ["$AC = DF$", "$BC = EF$", "$\\widehat{B} = \\widehat{E}$", "$\\widehat{C} = \\widehat{F}$"],
            answer: 0,
            explain: "Góc $A$ xen giữa hai cạnh $AB$ và $AC$; góc $D$ xen giữa $DE$ và $DF$. Vậy cần thêm $AC = DF$. ($\\widehat{B} = \\widehat{E}$ cho trường hợp g.c.g; $BC = EF$ thì góc $A$ không xen giữa.)"
          },
          {
            id: "d2q4", level: "de", source: "SGK tr.72 – Định lí g.c.g",
            q: "Phát biểu nào sau đây đúng?",
            options: [
              "Nếu hai góc của tam giác này bằng hai góc của tam giác kia thì hai tam giác đó bằng nhau",
              "Nếu hai cạnh và một góc bất kì của tam giác này bằng hai cạnh và một góc của tam giác kia thì hai tam giác đó bằng nhau",
              "Nếu một cạnh và hai góc kề của tam giác này bằng một cạnh và hai góc kề của tam giác kia thì hai tam giác đó bằng nhau",
              "Nếu ba góc của tam giác này bằng ba góc của tam giác kia thì hai tam giác đó bằng nhau"
            ],
            answer: 2,
            explain: "Đó là trường hợp góc – cạnh – góc. Chỉ có các góc bằng nhau thì hai tam giác có thể to nhỏ khác nhau; hai cạnh và một góc <b>không xen giữa</b> thì chưa đủ."
          },
          {
            id: "d2q5", level: "vua", source: "SBT Bài 14 – BT 4.22 (biến đổi)",
            q: "Cho $\\Delta ABC$ và $\\Delta DEF$ có $AB = EF$, $\\widehat{B} = \\widehat{F}$, $BC = FD$. Cách viết nào đúng?",
            options: ["$\\Delta ABC = \\Delta DEF$", "$\\Delta ABC = \\Delta FED$", "$\\Delta ABC = \\Delta DFE$", "$\\Delta ABC = \\Delta EFD$"],
            answer: 3,
            explain: "Góc $B$ (xen giữa $AB, BC$) ứng với góc $F$ (xen giữa $EF, FD$) nên $B \\leftrightarrow F$; $AB = EF$ cho $A \\leftrightarrow E$; còn lại $C \\leftrightarrow D$. Vậy $\\Delta ABC = \\Delta EFD$ (c.g.c)."
          },
          {
            id: "d2q6", level: "vua", source: "SBT Bài 14 – BT 4.23 (biến đổi)",
            q: "Cho $\\Delta ABC$ và $\\Delta MNP$ có $\\widehat{B} = \\widehat{P}$, $\\widehat{C} = \\widehat{N}$, $BC = PN$. Cách viết nào đúng?",
            options: ["$\\Delta ABC = \\Delta MNP$", "$\\Delta ABC = \\Delta MPN$", "$\\Delta ABC = \\Delta NPM$", "$\\Delta ABC = \\Delta PMN$"],
            answer: 1,
            explain: "$B \\leftrightarrow P$, $C \\leftrightarrow N$, nên $A \\leftrightarrow M$. Theo g.c.g: $\\Delta ABC = \\Delta MPN$."
          },
          {
            id: "d2q7", level: "vua", source: "SGK Bài 14 – BT 4.16 (biến đổi)",
            q: "Cho $\\Delta ABC$ và $\\Delta MNP$ có $AB = MN = 5$ cm, $\\widehat{B} = \\widehat{N} = 60^\\circ$, $BC = NP = 8$ cm và $\\widehat{A} = 80^\\circ$. Số đo góc $P$ là",
            options: ["$40^\\circ$", "$60^\\circ$", "$80^\\circ$", "$100^\\circ$"],
            answer: 0,
            explain: "$\\Delta ABC = \\Delta MNP$ (c.g.c) nên $\\widehat{P} = \\widehat{C} = 180^\\circ - 80^\\circ - 60^\\circ = 40^\\circ$."
          },
          {
            id: "d2q8", level: "vua", source: "mới",
            q: "Trong hình vẽ, $AC = AD$ và $\\widehat{CAB} = \\widehat{DAB}$. Đoạn thẳng nào bằng đoạn $BC$?" +
              kite({ ticks: [["A", "C", 1], ["A", "D", 1]], arcs: [["C", "A", "B", 1], ["B", "A", "D", 1]] }),
            options: ["$AD$", "$AC$", "$BD$", "$AB$"],
            answer: 2,
            explain: "Hai tam giác $ABC$ và $ABD$ có $AC = AD$, $\\widehat{CAB} = \\widehat{DAB}$, $AB$ chung nên $\\Delta ABC = \\Delta ABD$ (c.g.c). Suy ra $BC = BD$."
          },
          {
            id: "d2q9", level: "kho", source: "SGK tr.73 – Luyện tập 2 (biến đổi)",
            q: "Trong hình vẽ, $\\widehat{ABD} = \\widehat{CBD}$ và $\\widehat{ADB} = \\widehat{CDB}$. Khẳng định nào đúng?" +
              fig({
                w: 320, h: 210,
                pts: { A: [60, 90], B: [170, 20], C: [261, 114], D: [150, 190] },
                segs: ["AB", "BC", "CD", "DA", "BD"],
                arcs: [["A", "B", "D", 1], ["D", "B", "C", 1], ["A", "D", "B", 2], ["B", "D", "C", 2]], r: 20,
                lab: { A: [-12, 0], B: [0, -12], C: [12, 0], D: [0, 14] }
              }),
            options: ["$AB = CD$", "$AB = CB$", "$AD = BC$", "$AB = BD$"],
            answer: 1,
            explain: "Hai tam giác $ABD$ và $CBD$ có: $\\widehat{ABD} = \\widehat{CBD}$; $BD$ là cạnh chung; $\\widehat{ADB} = \\widehat{CDB}$. Vậy $\\Delta ABD = \\Delta CBD$ (g.c.g), suy ra $AB = CB$ (và $AD = CD$)."
          },
          {
            id: "d2q10", level: "kho", source: "SBT Bài 14 – BT 4.28a",
            q: "Cho $\\Delta ABC = \\Delta DEF$. Gọi $M$ là trung điểm của $BC$, $N$ là trung điểm của $EF$. Khẳng định nào đúng?",
            options: ["$AM = EN$", "$AM = DF$", "$BM = DN$", "$AM = DN$"],
            answer: 3,
            explain: "Từ $\\Delta ABC = \\Delta DEF$: $AB = DE$, $\\widehat{B} = \\widehat{E}$, $BC = EF$ nên $BM = \\frac{BC}{2} = \\frac{EF}{2} = EN$. Hai tam giác $ABM$ và $DEN$ có $AB = DE$, $\\widehat{B} = \\widehat{E}$, $BM = EN$ nên bằng nhau (c.g.c). Suy ra $AM = DN$."
          },
          {
            id: "d2q11", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ và $\\Delta DEF$ có $AB = DE$, $AC = DF$, $\\widehat{B} = \\widehat{E}$. Khẳng định nào đúng?",
            options: [
              "Chưa đủ để kết luận theo c.g.c vì $\\widehat{B}$ không xen giữa hai cạnh $AB$ và $AC$",
              "$\\Delta ABC = \\Delta DEF$ (c.g.c)",
              "$\\Delta ABC = \\Delta DEF$ (g.c.g)",
              "$\\Delta ABC = \\Delta EDF$ (c.g.c)"
            ],
            answer: 0,
            explain: "Góc xen giữa $AB$ và $AC$ là góc $A$, không phải góc $B$. \"Hai cạnh và một góc không xen giữa\" không phải trường hợp bằng nhau nào đã học, nên chưa kết luận được."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SGK Bài 14 – BT 4.13 (biến đổi)", maxPoints: 1.5,
            q: "Cho hai đoạn thẳng $AC$ và $BD$ cắt nhau tại $O$ sao cho $OA = OC$, $OB = OD$ (hình vẽ). Chứng minh rằng:<br>a) $\\Delta AOD = \\Delta COB$;<br>b) $AD$ song song với $BC$." +
              bowtie(["AC", "BD", "AB", "BC", "CD", "DA"]),
            modelAnswer: "a) Hai tam giác $AOD$ và $COB$ có: $OA = OC$ (giả thiết); $\\widehat{AOD} = \\widehat{COB}$ (hai góc đối đỉnh); $OD = OB$ (giả thiết).<br>Vậy $\\Delta AOD = \\Delta COB$ (c.g.c).<br>" +
              "b) Từ câu a suy ra $\\widehat{OAD} = \\widehat{OCB}$, tức là $\\widehat{CAD} = \\widehat{ACB}$.<br>Hai góc này ở vị trí so le trong tạo bởi đường thẳng $AC$ cắt hai đường thẳng $AD$ và $BC$. Vậy $AD$ song song với $BC$.",
            rubric: [
              { pts: 0.5, text: "Câu a: nêu đủ ba yếu tố (có lí do \"đối đỉnh\") và kết luận c.g.c." },
              { pts: 0.5, text: "Câu b: suy ra được $\\widehat{OAD} = \\widehat{OCB}$ từ hai tam giác bằng nhau." },
              { pts: 0.5, text: "Câu b: nhận ra cặp góc so le trong bằng nhau và kết luận $AD$ song song với $BC$." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SBT Bài 14 – BT 4.24 (biến đổi)", maxPoints: 1.5,
            q: "Cho các điểm $A, B, C, D$ như hình vẽ, biết $AC = BD$ và $\\widehat{CAB} = \\widehat{DBA}$. Chứng minh rằng $AD = BC$ và $\\widehat{ACB} = \\widehat{BDA}$." +
              fig({
                w: 320, h: 175,
                pts: { A: [30, 150], B: [290, 150], C: [80, 30], D: [240, 30] },
                segs: ["AB", "AC", "BD", "AD", "BC"],
                ticks: [["A", "C", 1], ["B", "D", 1]], arcs: [["C", "A", "B", 1], ["A", "B", "D", 1]], r: 22,
                lab: { A: [-10, 10], B: [10, 10], C: [-6, -12], D: [6, -12] }
              }),
            modelAnswer: "Xét hai tam giác $CAB$ và $DBA$ có: $CA = DB$ (giả thiết); $\\widehat{CAB} = \\widehat{DBA}$ (giả thiết); $AB$ là cạnh chung.<br>" +
              "Vậy $\\Delta CAB = \\Delta DBA$ (c.g.c), với $C \\leftrightarrow D$, $A \\leftrightarrow B$, $B \\leftrightarrow A$.<br>" +
              "Suy ra $CB = DA$ (hai cạnh tương ứng), tức là $AD = BC$; và $\\widehat{ACB} = \\widehat{BDA}$ (hai góc tương ứng).",
            rubric: [
              { pts: 0.5, text: "Chọn đúng hai tam giác $CAB$ và $DBA$, nêu đủ ba yếu tố ($AB$ là cạnh chung)." },
              { pts: 0.5, text: "Kết luận $\\Delta CAB = \\Delta DBA$ (c.g.c) với thứ tự đỉnh đúng." },
              { pts: 0.5, text: "Suy ra đúng $AD = BC$ và $\\widehat{ACB} = \\widehat{BDA}$." }
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
            q: "Cho $\\Delta ABC = \\Delta PQR$. Góc nào bằng góc $\\widehat{ACB}$?",
            options: ["$\\widehat{PQR}$", "$\\widehat{QPR}$", "$\\widehat{PRQ}$", "Không có góc nào"],
            answer: 2,
            explain: "$A \\leftrightarrow P$, $B \\leftrightarrow Q$, $C \\leftrightarrow R$. Góc $ACB$ (đỉnh $C$) tương ứng với góc $PRQ$ (đỉnh $R$)."
          },
          {
            id: "d3q2", level: "de", source: "SGK Bài 14 – BT 4.12 (biến đổi)",
            q: "Quan sát hình vẽ (các kí hiệu giống nhau chỉ các cạnh, các góc bằng nhau). Hai tam giác $ABC$ và $DEF$ bằng nhau theo trường hợp nào?" +
              twoTri({ ticks: [["A", "B", 1], ["D", "E", 1], ["B", "C", 2], ["E", "F", 2]], arcs: [["A", "B", "C", 1], ["D", "E", "F", 1]] }),
            options: ["c.g.c", "g.c.g", "c.c.c", "Không đủ dữ kiện để kết luận"],
            answer: 0,
            explain: "Hình cho $AB = DE$, $BC = EF$ và góc xen giữa $\\widehat{B} = \\widehat{E}$. Vậy $\\Delta ABC = \\Delta DEF$ (c.g.c)."
          },
          {
            id: "d3q3", level: "de", source: "SGK Bài 14 – Khái niệm góc xen giữa",
            q: "Trong tam giác $MNP$, góc xen giữa hai cạnh $MN$ và $NP$ là",
            options: ["$\\widehat{NMP}$", "$\\widehat{MPN}$", "Không xác định được", "$\\widehat{MNP}$"],
            answer: 3,
            explain: "Hai cạnh $MN$ và $NP$ có chung đỉnh $N$, nên góc xen giữa là $\\widehat{MNP}$."
          },
          {
            id: "d3q4", level: "de", source: "mới",
            q: "Cho $\\Delta ABC$ và $\\Delta MNP$ có $\\widehat{A} = \\widehat{M}$, $AC = MP$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta MNP$ theo trường hợp góc – cạnh – góc?",
            options: ["$AB = MN$", "$\\widehat{C} = \\widehat{P}$", "$BC = NP$", "$\\widehat{C} = \\widehat{N}$"],
            answer: 1,
            explain: "Hai góc kề cạnh $AC$ là $\\widehat{A}, \\widehat{C}$; hai góc kề cạnh $MP$ là $\\widehat{M}, \\widehat{P}$. Đã có $\\widehat{A} = \\widehat{M}$, cần thêm $\\widehat{C} = \\widehat{P}$. ($AB = MN$ cho trường hợp c.g.c.)"
          },
          {
            id: "d3q5", level: "vua", source: "SGK Bài 14 – BT 4.17 (biến đổi)",
            q: "Cho $\\Delta ABC$ và $\\Delta DEF$ có $AB = DE$, $\\widehat{A} = \\widehat{D} = 50^\\circ$, $\\widehat{B} = \\widehat{E} = 75^\\circ$, $BC = 9$ cm. Khẳng định nào đúng?",
            options: ["$\\widehat{F} = 55^\\circ$, $EF = 9$ cm", "$\\widehat{F} = 75^\\circ$, $EF = 9$ cm", "$\\widehat{F} = 50^\\circ$, $EF = 9$ cm", "$\\widehat{F} = 55^\\circ$, $EF = 4{,}5$ cm"],
            answer: 0,
            explain: "$\\Delta ABC = \\Delta DEF$ (g.c.g: cạnh $AB = DE$ và hai góc kề). Suy ra $EF = BC = 9$ cm và $\\widehat{F} = \\widehat{C} = 180^\\circ - 50^\\circ - 75^\\circ = 55^\\circ$."
          },
          {
            id: "d3q6", level: "vua", source: "SGK tr.72 – Ví dụ 2 (biến đổi)",
            q: "Trong hình vẽ, $C$ là trung điểm của $AD$, ba điểm $B, C, E$ thẳng hàng và $\\widehat{BAC} = \\widehat{EDC}$. Hai tam giác $ABC$ và $DEC$ bằng nhau theo trường hợp nào?" +
              fig({
                w: 320, h: 200,
                pts: { A: [40, 40], B: [200, 25], C: [160, 100], D: [280, 160], E: [120, 175] },
                segs: ["AB", "AD", "BE", "ED"],
                ticks: [["A", "C", 1], ["C", "D", 1]], arcs: [["B", "A", "C", 1], ["E", "D", "C", 1]], r: 24,
                lab: { A: [-10, -8], B: [8, -10], C: [16, 4], D: [12, 8], E: [-8, 10] }
              }),
            options: ["c.g.c", "c.c.c", "g.c.g", "Hai tam giác không bằng nhau"],
            answer: 2,
            explain: "$\\widehat{BAC} = \\widehat{EDC}$ (giả thiết); $AC = DC$ ($C$ là trung điểm $AD$); $\\widehat{BCA} = \\widehat{ECD}$ (hai góc đối đỉnh). Cạnh $AC$ và hai góc kề bằng cạnh $DC$ và hai góc kề nên $\\Delta ABC = \\Delta DEC$ (g.c.g)."
          },
          {
            id: "d3q7", level: "vua", source: "mới",
            q: "Cho tam giác $ABC$, $AD$ là tia phân giác của góc $A$ ($D$ thuộc $BC$). Trên cạnh $AC$ lấy điểm $E$ sao cho $AE = AB$ (hình vẽ). Khẳng định nào đúng?" +
              fig({
                w: 320, h: 190,
                pts: { A: [30, 170], B: [114, 70], C: [290, 170], D: [173, 103], E: [160, 170] },
                segs: ["AB", "BC", "CA", "AD", "DE"],
                ticks: [["A", "B", 1], ["A", "E", 1]], arcs: [["B", "A", "D", 1], ["D", "A", "E", 1]], r: 30,
                lab: { A: [-10, 6], B: [-6, -12], C: [12, 6], D: [10, -10], E: [0, 14] }
              }),
            options: ["$\\Delta ABD = \\Delta ADE$", "$\\Delta ABD = \\Delta AED$", "$\\Delta ABD = \\Delta ACD$", "$\\Delta ABD = \\Delta EAD$"],
            answer: 1,
            explain: "$AB = AE$; $\\widehat{BAD} = \\widehat{EAD}$ ($AD$ là phân giác); $AD$ là cạnh chung. Vậy $\\Delta ABD = \\Delta AED$ (c.g.c) với $A \\leftrightarrow A$, $B \\leftrightarrow E$, $D \\leftrightarrow D$."
          },
          {
            id: "d3q8", level: "vua", source: "SBT Bài 14 – BT 4.25 (biến đổi)",
            q: "Cho hai tam giác $ABC$ và $ABD$ (với $C, D$ nằm khác phía đối với $AB$) có $\\widehat{BAC} = \\widehat{BAD}$ và $\\widehat{BCA} = \\widehat{BDA}$. Muốn chứng minh $\\Delta ABC = \\Delta ABD$ theo trường hợp g.c.g, ta cần chỉ ra thêm điều gì?",
            options: [
              "$AC = AD$",
              "$BC = BD$",
              "Không cần thêm gì vì $\\widehat{BCA}$ và $\\widehat{BDA}$ là hai góc kề cạnh $AB$",
              "$\\widehat{ABC} = \\widehat{ABD}$ (suy ra từ tổng ba góc của tam giác bằng $180^\\circ$)"
            ],
            answer: 3,
            explain: "Cạnh chung là $AB$, hai góc kề cạnh $AB$ là góc ở $A$ và góc ở $B$. Góc ở $C$, $D$ không kề cạnh $AB$. Ta có $\\widehat{ABC} = 180^\\circ - \\widehat{BAC} - \\widehat{BCA} = 180^\\circ - \\widehat{BAD} - \\widehat{BDA} = \\widehat{ABD}$, rồi dùng g.c.g."
          },
          {
            id: "d3q9", level: "kho", source: "SBT Bài 14 – BT 4.28b",
            q: "Cho $\\Delta ABC = \\Delta DEF$. Tia phân giác của góc $ABC$ cắt $AC$ tại $P$, tia phân giác của góc $DEF$ cắt $DF$ tại $Q$. Khẳng định nào đúng?",
            options: ["$BP = DQ$", "$AP = EQ$", "$BP = EQ$", "$BP = EF$"],
            answer: 2,
            explain: "Từ $\\Delta ABC = \\Delta DEF$: $\\widehat{A} = \\widehat{D}$, $AB = DE$, $\\widehat{ABC} = \\widehat{DEF}$ nên $\\widehat{ABP} = \\frac{1}{2}\\widehat{ABC} = \\frac{1}{2}\\widehat{DEF} = \\widehat{DEQ}$. Do đó $\\Delta ABP = \\Delta DEQ$ (g.c.g), suy ra $BP = EQ$."
          },
          {
            id: "d3q10", level: "kho", source: "SGK Bài 14 – BT 4.15 (biến đổi)",
            q: "Cho đoạn thẳng $AB$ song song và bằng đoạn thẳng $CD$ như hình vẽ; $E$ là giao điểm của $AD$ và $BC$. Khẳng định nào đúng?" +
              fig({
                w: 320, h: 200,
                pts: { A: [40, 30], B: [200, 30], C: [120, 170], D: [280, 170], E: [160, 100] },
                segs: ["AB", "CD", "AD", "BC"],
                ticks: [["A", "B", 1], ["C", "D", 1]],
                lab: { A: [-10, -8], B: [10, -8], C: [-10, 8], D: [10, 8], E: [16, 0] }
              }),
            options: ["$EA = ED$ và $EB = EC$", "$EA = EB$ và $EC = ED$", "$EA = EC$ và $EB = ED$", "$AD = BC$"],
            answer: 0,
            explain: "Vì $AB \\parallel CD$ nên $\\widehat{BAE} = \\widehat{CDE}$ và $\\widehat{ABE} = \\widehat{DCE}$ (các cặp góc so le trong). Cùng với $AB = DC$ ta có $\\Delta ABE = \\Delta DCE$ (g.c.g), suy ra $EA = ED$, $EB = EC$."
          },
          {
            id: "d3q11", level: "kho", source: "SGK Bài 14 – BT 4.19 (biến đổi)",
            q: "Cho tia $Oz$ là tia phân giác của góc $xOy$. Lấy $A$ trên tia $Ox$, $B$ trên tia $Oy$, $C$ trên tia $Oz$ ($C \\ne O$) sao cho $\\widehat{OCA} = \\widehat{OCB}$. Khẳng định nào đúng?",
            options: ["$OA = OC$ và $OB = OC$", "$CA = CB$ nhưng chưa chắc $OA = OB$", "$OA = OB$ nhưng chưa chắc $CA = CB$", "$OA = OB$ và $CA = CB$"],
            answer: 3,
            explain: "Hai tam giác $OAC$ và $OBC$ có: $\\widehat{AOC} = \\widehat{BOC}$ (phân giác); $OC$ là cạnh chung; $\\widehat{OCA} = \\widehat{OCB}$. Vậy $\\Delta OAC = \\Delta OBC$ (g.c.g), suy ra cả $OA = OB$ và $CA = CB$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SGK Bài 14 – BT 4.16 (biến đổi)", maxPoints: 1.5,
            q: "Cho hai tam giác $ABC$ và $DEF$ có $AB = DE$, $BC = EF$, $\\widehat{ABC} = \\widehat{DEF} = 50^\\circ$. Biết $AC = 6$ cm và $\\widehat{BAC} = 70^\\circ$.<br>a) Chứng minh $\\Delta ABC = \\Delta DEF$.<br>b) Tính độ dài $DF$ và số đo các góc $EDF$, $DFE$.",
            modelAnswer: "a) Hai tam giác $ABC$ và $DEF$ có: $AB = DE$; $\\widehat{ABC} = \\widehat{DEF}$; $BC = EF$ (giả thiết). Vậy $\\Delta ABC = \\Delta DEF$ (c.g.c).<br>" +
              "b) Từ câu a: $DF = AC = 6$ cm; $\\widehat{EDF} = \\widehat{BAC} = 70^\\circ$.<br>" +
              "Trong tam giác $ABC$: $\\widehat{ACB} = 180^\\circ - 70^\\circ - 50^\\circ = 60^\\circ$, nên $\\widehat{DFE} = \\widehat{ACB} = 60^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Câu a: nêu đủ hai cạnh và góc xen giữa, kết luận c.g.c." },
              { pts: 0.5, text: "Câu b: $DF = 6$ cm và $\\widehat{EDF} = 70^\\circ$ (có lí do: cạnh, góc tương ứng)." },
              { pts: 0.5, text: "Câu b: tính đúng $\\widehat{ACB} = 60^\\circ$ và suy ra $\\widehat{DFE} = 60^\\circ$." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SBT Bài 14 – BT 4.26 (biến đổi)", maxPoints: 1.5,
            q: "Cho hai đoạn thẳng $AC$ và $BD$ cắt nhau tại $E$, biết $AB = CD$ và $AB$ song song với $CD$ (hình vẽ). Chứng minh rằng:<br>a) $\\Delta ABE = \\Delta CDE$;<br>b) $AD = CB$ và $AD$ song song với $BC$." +
              fig({
                w: 320, h: 195,
                pts: { A: [30, 40], B: [190, 40], E: [160, 100], C: [290, 160], D: [130, 160] },
                segs: ["AB", "CD", "AC", "BD", "AD", "BC"], dash: ["AD", "BC"],
                ticks: [["A", "B", 1], ["C", "D", 1]],
                lab: { A: [-10, -8], B: [8, -10], C: [10, 8], D: [-8, 10], E: [16, -4] }
              }),
            modelAnswer: "a) Vì $AB \\parallel CD$ nên $\\widehat{BAE} = \\widehat{DCE}$ (so le trong, cát tuyến $AC$) và $\\widehat{ABE} = \\widehat{CDE}$ (so le trong, cát tuyến $BD$).<br>" +
              "Hai tam giác $ABE$ và $CDE$ có: $\\widehat{BAE} = \\widehat{DCE}$; $AB = CD$; $\\widehat{ABE} = \\widehat{CDE}$. Vậy $\\Delta ABE = \\Delta CDE$ (g.c.g).<br>" +
              "b) Từ câu a: $EA = EC$, $EB = ED$.<br>Hai tam giác $AED$ và $CEB$ có: $EA = EC$; $\\widehat{AED} = \\widehat{CEB}$ (đối đỉnh); $ED = EB$. Vậy $\\Delta AED = \\Delta CEB$ (c.g.c).<br>" +
              "Suy ra $AD = CB$ và $\\widehat{EAD} = \\widehat{ECB}$, tức $\\widehat{CAD} = \\widehat{ACB}$ là hai góc so le trong, nên $AD \\parallel BC$.",
            rubric: [
              { pts: 0.5, text: "Câu a: chỉ ra hai cặp góc so le trong bằng nhau, cùng $AB = CD$, kết luận g.c.g." },
              { pts: 0.5, text: "Câu b: suy ra $EA = EC$, $EB = ED$ và chứng minh $\\Delta AED = \\Delta CEB$ (c.g.c, có góc đối đỉnh)." },
              { pts: 0.5, text: "Câu b: kết luận $AD = CB$ và $AD \\parallel BC$ (cặp góc so le trong bằng nhau)." }
            ]
          }
        ]
      }
    ]
  });
})();
