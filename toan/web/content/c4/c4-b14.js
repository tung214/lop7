(function () {
  // Vẽ hình học bằng SVG (currentColor để hợp chế độ sáng/tối; kí hiệu bằng nhau màu đỏ).
  // o = { w, h, p: {A:[x,y], ...}, s: [["A","B"], ...] (đoạn thẳng),
  //       k: [["A","B",n]] (n gạch trên cạnh), a: [["B","A","C",n,r]] (n cung ở góc BAC, bán kính r mặc định 16),
  //       off: {A:[dx,dy]} (dời nhãn), hide: ["X"] (không ghi nhãn), t: [[x,y,"chữ"]] }
  function fig(o) {
    var P = o.p, W = o.w || 300, H = o.h || 180, RED = "#e5484d";
    var pt = function (n) { return Array.isArray(n) ? n : P[n]; };
    var f = function (v) { return (+v).toFixed(1); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:320px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">';
    (o.s || []).forEach(function (g) {
      var a = pt(g[0]), b = pt(g[1]);
      s += '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" stroke="currentColor" stroke-width="1.6"/>';
    });
    (o.k || []).forEach(function (g) {
      var a = pt(g[0]), b = pt(g[1]), n = g[2] || 1;
      var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy);
      var ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
      for (var i = 0; i < n; i++) {
        var c = (i - (n - 1) / 2) * 4, cx = mx + ux * c, cy = my + uy * c;
        s += '<line x1="' + f(cx - nx * 5) + '" y1="' + f(cy - ny * 5) + '" x2="' + f(cx + nx * 5) + '" y2="' + f(cy + ny * 5) + '" stroke="' + RED + '" stroke-width="1.6"/>';
      }
    });
    (o.a || []).forEach(function (g) {
      var p = pt(g[0]), v = pt(g[1]), q = pt(g[2]), n = g[3] || 1, r0 = g[4] || 16;
      var l1 = Math.hypot(p[0] - v[0], p[1] - v[1]), l2 = Math.hypot(q[0] - v[0], q[1] - v[1]);
      var u1 = [(p[0] - v[0]) / l1, (p[1] - v[1]) / l1], u2 = [(q[0] - v[0]) / l2, (q[1] - v[1]) / l2];
      var sw = (u1[0] * u2[1] - u1[1] * u2[0]) > 0 ? 1 : 0;
      for (var i = 0; i < n; i++) {
        var r = r0 + 4 * i;
        s += '<path d="M' + f(v[0] + u1[0] * r) + ' ' + f(v[1] + u1[1] * r) + ' A' + r + ' ' + r + ' 0 0 ' + sw + ' ' + f(v[0] + u2[0] * r) + ' ' + f(v[1] + u2[1] * r) + '" fill="none" stroke="' + RED + '" stroke-width="1.4"/>';
      }
    });
    var names = Object.keys(P), cx = 0, cy = 0;
    names.forEach(function (n) { cx += P[n][0]; cy += P[n][1]; });
    cx /= names.length; cy /= names.length;
    names.forEach(function (n) {
      if ((o.hide || []).indexOf(n) >= 0) return;
      var d = (o.off || {})[n], x = P[n][0], y = P[n][1];
      if (!d) {
        var dx = x - cx, dy = y - cy, L = Math.sqrt(dx * dx + dy * dy) || 1;
        d = [dx / L * 13, dy / L * 13];
      }
      s += '<text x="' + f(x + d[0]) + '" y="' + f(y + d[1]) + '" dy="0.35em" font-size="14" font-style="italic" text-anchor="middle" fill="currentColor">' + n + '</text>';
    });
    (o.t || []).forEach(function (t) {
      s += '<text x="' + t[0] + '" y="' + t[1] + '" dy="0.35em" font-size="12" text-anchor="middle" fill="currentColor">' + t[2] + '</text>';
    });
    return s + '</svg>';
  }

  // ---- Các hình dùng nhiều lần ----
  // Hai tam giác c.g.c: AB = DE, góc A = góc D, AC = DF
  var FIG_CGC = fig({
    w: 300, h: 160,
    p: { A: [20, 130], B: [70, 30], C: [130, 130], D: [170, 130], E: [220, 30], F: [280, 130] },
    s: [["A", "B"], ["B", "C"], ["C", "A"], ["D", "E"], ["E", "F"], ["F", "D"]],
    k: [["A", "B", 1], ["D", "E", 1], ["A", "C", 2], ["D", "F", 2]],
    a: [["B", "A", "C", 1], ["E", "D", "F", 1]],
    off: { A: [-8, 10], C: [8, 10], D: [-8, 10], F: [8, 10], B: [0, -12], E: [0, -12] }
  });
  // Hai tam giác g.c.g: góc B = góc E, BC = EF, góc C = góc F
  var FIG_GCG = fig({
    w: 300, h: 160,
    p: { A: [60, 30], B: [20, 130], C: [130, 130], D: [210, 30], E: [170, 130], F: [280, 130] },
    s: [["A", "B"], ["B", "C"], ["C", "A"], ["D", "E"], ["E", "F"], ["F", "D"]],
    k: [["B", "C", 1], ["E", "F", 1]],
    a: [["C", "B", "A", 1], ["F", "E", "D", 1], ["A", "C", "B", 2], ["D", "F", "E", 2]],
    off: { A: [0, -12], D: [0, -12], B: [-8, 10], C: [8, 10], E: [-8, 10], F: [8, 10] }
  });
  // Tia phân giác: OA = OB, M thuộc Ot
  var FIG_PG = fig({
    w: 300, h: 200,
    p: { O: [20, 100], A: [161.6, 50.8], B: [161.6, 149.2], M: [200, 100] },
    s: [["O", [260, 16.5]], ["O", [260, 183.5]], ["O", [270, 100]], ["M", "A"], ["M", "B"]],
    k: [["O", "A", 1], ["O", "B", 1]],
    a: [["A", "O", "M", 1, 40], ["M", "O", "B", 1, 46]],
    off: { O: [-10, 0], A: [-4, -13], B: [-4, 13], M: [6, -12] },
    t: [[268, 14, "x"], [268, 186, "y"], [282, 100, "t"]]
  });
  // Hai đoạn AC và BD cắt nhau tại trung điểm O của mỗi đoạn
  var FIG_X = fig({
    w: 280, h: 180,
    p: { A: [40, 30], B: [200, 25], C: [240, 150], D: [80, 155], O: [140, 90] },
    s: [["A", "C"], ["B", "D"], ["A", "B"], ["C", "D"]],
    k: [["O", "A", 1], ["O", "C", 1], ["O", "B", 2], ["O", "D", 2]],
    off: { O: [16, 2] }
  });

  registerLesson({
    id: "c4-b14",
    chapter: 4,
    kind: "lesson",
    title: "Bài 14. Trường hợp bằng nhau thứ hai và thứ ba của tam giác",
    sgkPages: [70, 73],
    sbtPages: [59, 62],
    objectives: [
      "Nhận biết góc xen giữa hai cạnh và hai góc kề một cạnh của tam giác",
      "Giải thích hai tam giác bằng nhau theo trường hợp cạnh – góc – cạnh (c.g.c)",
      "Giải thích hai tam giác bằng nhau theo trường hợp góc – cạnh – góc (g.c.g)",
      "Lập luận, chứng minh hình học đơn giản: suy ra cạnh, góc bằng nhau từ hai tam giác bằng nhau"
    ],

    theory: [
      {
        heading: "1. Góc xen giữa và góc kề",
        html: "Trong tam giác $ABC$:" +
          "<ul><li>Góc $\\widehat{BAC}$ (gọi tắt là góc $A$) là <b>góc xen giữa</b> hai cạnh $AB$ và $AC$ — tức là góc tạo bởi chính hai cạnh đó, có đỉnh là điểm chung của hai cạnh.</li>" +
          "<li>Hai góc $\\widehat{B}$ và $\\widehat{C}$ là hai <b>góc kề</b> cạnh $BC$ — hai góc ở hai đầu mút của cạnh đó.</li>" +
          "<li>Góc $A$ là góc <b>đối diện</b> với cạnh $BC$ (không kề cạnh $BC$).</li></ul>"
      },
      {
        heading: "2. Trường hợp bằng nhau cạnh – góc – cạnh (c.g.c)",
        html: "<b>Định lí.</b> Nếu hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia thì hai tam giác đó bằng nhau." +
          FIG_CGC +
          "$\\Delta ABC$ và $\\Delta DEF$ có: $AB = DE$, $\\widehat{A} = \\widehat{D}$, $AC = DF$ $\\Rightarrow \\Delta ABC = \\Delta DEF$ (c.g.c)." +
          "<ul><li>Góc phải là góc <b>xen giữa</b> hai cạnh đã biết. Nếu biết hai cạnh và một góc <b>không</b> xen giữa thì chưa kết luận được hai tam giác bằng nhau.</li></ul>"
      },
      {
        heading: "3. Trường hợp bằng nhau góc – cạnh – góc (g.c.g)",
        html: "<b>Định lí.</b> Nếu một cạnh và hai góc kề của tam giác này bằng một cạnh và hai góc kề của tam giác kia thì hai tam giác đó bằng nhau." +
          FIG_GCG +
          "$\\Delta ABC$ và $\\Delta DEF$ có: $\\widehat{B} = \\widehat{E}$, $BC = EF$, $\\widehat{C} = \\widehat{F}$ $\\Rightarrow \\Delta ABC = \\Delta DEF$ (g.c.g)." +
          "<ul><li>Hai góc phải là hai góc <b>kề</b> cạnh đã biết.</li>" +
          "<li><b>Mở rộng:</b> nếu biết một cạnh, một góc kề và góc đối diện với cạnh đó bằng nhau thì do tổng ba góc của tam giác bằng $180^\\circ$, góc kề còn lại cũng bằng nhau, nên vẫn dùng được g.c.g.</li></ul>"
      },
      {
        heading: "4. Ba trường hợp bằng nhau của tam giác – cách trình bày",
        html: "<table><tr><th>Trường hợp</th><th>Cần biết</th></tr>" +
          "<tr><td>c.c.c</td><td>3 cặp cạnh bằng nhau</td></tr>" +
          "<tr><td>c.g.c</td><td>2 cặp cạnh + cặp góc xen giữa</td></tr>" +
          "<tr><td>g.c.g</td><td>1 cặp cạnh + 2 cặp góc kề cạnh đó</td></tr></table>" +
          "Trình bày: <i>\"Xét $\\Delta \\ldots$ và $\\Delta \\ldots$ có: (1) …; (2) …; (3) …. Vậy $\\Delta \\ldots = \\Delta \\ldots$ (c.g.c / g.c.g).\"</i> Sau đó suy ra các cạnh, góc tương ứng còn lại bằng nhau." +
          "<br>Khi viết $\\Delta ABC = \\Delta DEF$, các đỉnh tương ứng phải viết <b>đúng thứ tự</b>: $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$."
      }
    ],

    skills: [
      "<b>Chọn trường hợp:</b> đếm xem đã có những cặp cạnh, cặp góc nào bằng nhau. Có 2 cạnh → tìm góc xen giữa (c.g.c) hoặc cạnh thứ ba (c.c.c). Có 1 cạnh và các góc → tìm đủ hai góc kề cạnh đó (g.c.g).",
      "<b>Những yếu tố bằng nhau \"có sẵn\" hay dùng:</b> cạnh chung; góc chung; hai góc đối đỉnh; trung điểm cho hai đoạn bằng nhau; tia phân giác cho hai góc bằng nhau; hai đường thẳng song song cho các góc so le trong / đồng vị bằng nhau.",
      "<b>Tìm góc kề còn thiếu:</b> nếu đã có hai cặp góc bằng nhau nhưng không phải hai góc kề cạnh đã biết, dùng tổng ba góc bằng $180^\\circ$ để suy ra cặp góc còn lại bằng nhau.",
      "<b>Viết đúng tương ứng:</b> đỉnh của góc bằng nhau phải ở cùng vị trí. Ví dụ $AB = FE$, $\\widehat{B} = \\widehat{F}$, $BC = FD$ thì $\\Delta ABC = \\Delta EFD$.",
      "<b>Chứng minh hai đoạn (hai góc) bằng nhau:</b> tìm hai tam giác chứa chúng, chứng minh hai tam giác đó bằng nhau, rồi suy ra hai cạnh (góc) tương ứng bằng nhau.",
      "<b>Lỗi hay gặp:</b> dùng c.g.c với góc không xen giữa (\"cạnh – cạnh – góc\" không phải là trường hợp bằng nhau); dùng g.c.g với góc không kề cạnh đã cho; viết sai thứ tự đỉnh tương ứng."
    ],

    examples: [
      {
        q: "Cho $\\widehat{xOy}$ có tia phân giác $Ot$. Lấy $A \\in Ox$, $B \\in Oy$ sao cho $OA = OB$; lấy điểm $M$ trên tia $Ot$. Chứng minh $MA = MB$." + FIG_PG,
        solution: "Xét $\\Delta OAM$ và $\\Delta OBM$ có:<br>• $OA = OB$ (giả thiết);<br>• $\\widehat{AOM} = \\widehat{BOM}$ ($Ot$ là tia phân giác);<br>• $OM$ là cạnh chung.<br>" +
          "Vậy $\\Delta OAM = \\Delta OBM$ (c.g.c), suy ra $MA = MB$ (hai cạnh tương ứng)."
      },
      {
        q: "Hai đoạn thẳng $AC$ và $BD$ cắt nhau tại $O$ sao cho $OA = OC$, $OB = OD$. Chứng minh $AB = CD$." + FIG_X,
        solution: "Xét $\\Delta OAB$ và $\\Delta OCD$ có:<br>• $OA = OC$ (giả thiết);<br>• $\\widehat{AOB} = \\widehat{COD}$ (hai góc đối đỉnh);<br>• $OB = OD$ (giả thiết).<br>" +
          "Vậy $\\Delta OAB = \\Delta OCD$ (c.g.c), suy ra $AB = CD$ (hai cạnh tương ứng)."
      },
      {
        q: "Cho $\\Delta ABC$ và $\\Delta DEF$ có $BC = EF$, $\\widehat{B} = \\widehat{E}$, $\\widehat{A} = \\widehat{D}$. Hai tam giác này có bằng nhau không?",
        solution: "Góc $A$ và góc $D$ không kề cạnh $BC$, $EF$ nên chưa dùng ngay được g.c.g.<br>" +
          "Theo định lí tổng ba góc: $\\widehat{C} = 180^\\circ - \\widehat{A} - \\widehat{B}$ và $\\widehat{F} = 180^\\circ - \\widehat{D} - \\widehat{E}$. Vì $\\widehat{A} = \\widehat{D}$, $\\widehat{B} = \\widehat{E}$ nên $\\widehat{C} = \\widehat{F}$.<br>" +
          "Xét $\\Delta ABC$ và $\\Delta DEF$ có: $\\widehat{B} = \\widehat{E}$, $BC = EF$, $\\widehat{C} = \\widehat{F}$. Vậy $\\Delta ABC = \\Delta DEF$ (g.c.g)."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.71 – Góc xen giữa",
            q: "Trong tam giác $ABC$, góc xen giữa hai cạnh $AB$ và $BC$ là",
            options: ["$\\widehat{A}$", "$\\widehat{B}$", "$\\widehat{C}$", "Không có góc nào"],
            answer: 1,
            explain: "Góc xen giữa hai cạnh là góc có đỉnh là điểm chung của hai cạnh. $AB$ và $BC$ chung đỉnh $B$ nên góc xen giữa là $\\widehat{B}$."
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.72 – Góc kề",
            q: "Trong tam giác $MNP$, hai góc kề cạnh $NP$ là",
            options: ["$\\widehat{M}$ và $\\widehat{N}$", "$\\widehat{M}$ và $\\widehat{P}$", "$\\widehat{N}$ và $\\widehat{P}$", "Chỉ có $\\widehat{M}$"],
            answer: 2,
            explain: "Hai góc kề một cạnh là hai góc ở hai đầu mút của cạnh đó: $\\widehat{N}$ và $\\widehat{P}$. Góc $M$ là góc đối diện với cạnh $NP$."
          },
          {
            id: "d1q3", level: "de", source: "SBT Bài 14 – Ví dụ 1",
            q: "$\\Delta ABC$ và $\\Delta DEF$ có $AB = DE$, $\\widehat{B} = \\widehat{E}$, $BC = EF$. Khi đó",
            options: ["$\\Delta ABC = \\Delta DEF$ (c.g.c)", "$\\Delta ABC = \\Delta DEF$ (g.c.g)", "$\\Delta ABC = \\Delta EDF$ (c.g.c)", "Chưa đủ điều kiện để kết luận"],
            answer: 0,
            explain: "$\\widehat{B}$ xen giữa $AB, BC$; $\\widehat{E}$ xen giữa $DE, EF$. Hai cạnh và góc xen giữa bằng nhau nên $\\Delta ABC = \\Delta DEF$ (c.g.c), với $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$."
          },
          {
            id: "d1q4", level: "de", source: "SGK tr.72 – Câu hỏi (Hình 4.35)",
            q: "Hai tam giác trong hình có $BC = NP$, $\\widehat{B} = \\widehat{N}$, $\\widehat{C} = \\widehat{P}$ (các kí hiệu giống nhau chỉ các yếu tố bằng nhau). Hai tam giác $ABC$ và $MNP$ bằng nhau theo trường hợp nào?" +
              fig({
                w: 300, h: 160,
                p: { A: [60, 35], B: [20, 130], C: [130, 130], M: [210, 35], N: [170, 130], P: [280, 130] },
                s: [["A", "B"], ["B", "C"], ["C", "A"], ["M", "N"], ["N", "P"], ["P", "M"]],
                k: [["B", "C", 1], ["N", "P", 1]],
                a: [["C", "B", "A", 1], ["P", "N", "M", 1], ["A", "C", "B", 2], ["M", "P", "N", 2]],
                off: { A: [0, -12], M: [0, -12], B: [-8, 10], C: [8, 10], N: [-8, 10], P: [8, 10] }
              }),
            options: ["c.c.c", "c.g.c", "Không bằng nhau", "g.c.g"],
            answer: 3,
            explain: "Cạnh $BC = NP$ và hai góc kề cạnh đó: $\\widehat{B} = \\widehat{N}$, $\\widehat{C} = \\widehat{P}$. Vậy $\\Delta ABC = \\Delta MNP$ (g.c.g)."
          },
          {
            id: "d1q5", level: "vua", source: "SGK tr.71 – Định lí c.g.c",
            q: "$\\Delta ABC$ và $\\Delta MNP$ có $AB = MN$, $AC = MP$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta MNP$ theo trường hợp cạnh – góc – cạnh?",
            options: ["$\\widehat{B} = \\widehat{N}$", "$\\widehat{A} = \\widehat{M}$", "$\\widehat{C} = \\widehat{P}$", "$BC = NP$"],
            answer: 1,
            explain: "Góc xen giữa $AB, AC$ là $\\widehat{A}$; góc xen giữa $MN, MP$ là $\\widehat{M}$. Cần $\\widehat{A} = \\widehat{M}$. (Thêm $BC = NP$ thì hai tam giác bằng nhau theo c.c.c, không phải c.g.c.)"
          },
          {
            id: "d1q6", level: "vua", source: "SGK tr.72 – Định lí g.c.g",
            q: "$\\Delta ABC$ và $\\Delta DEF$ có $\\widehat{B} = \\widehat{E}$, $BC = EF$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta DEF$ theo trường hợp góc – cạnh – góc?",
            options: ["$\\widehat{A} = \\widehat{D}$", "$AB = DE$", "$\\widehat{C} = \\widehat{F}$", "$AC = DF$"],
            answer: 2,
            explain: "Hai góc kề cạnh $BC$ là $\\widehat{B}, \\widehat{C}$; kề cạnh $EF$ là $\\widehat{E}, \\widehat{F}$. Đã có $\\widehat{B} = \\widehat{E}$ nên cần thêm $\\widehat{C} = \\widehat{F}$. ($AB = DE$ dẫn tới c.g.c, không phải g.c.g.)"
          },
          {
            id: "d1q7", level: "vua", source: "SGK tr.71 – Ví dụ 1",
            q: "Trong hình, $AB = AD$ và $\\widehat{BAC} = \\widehat{DAC}$. Khẳng định nào đúng?" +
              fig({
                w: 300, h: 180,
                p: { A: [30, 90], B: [140, 25], C: [270, 90], D: [140, 155] },
                s: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"]],
                k: [["A", "B", 1], ["A", "D", 1]],
                a: [["B", "A", "C", 1, 30], ["C", "A", "D", 1, 30]],
                off: { A: [-12, 0], C: [12, 0] }
              }),
            options: ["$\\Delta ABC = \\Delta ADC$ (c.g.c)", "$\\Delta ABC = \\Delta ADC$ (g.c.g)", "$\\Delta ABC = \\Delta ACD$ (c.g.c)", "$\\Delta ABC = \\Delta DAC$ (c.g.c)"],
            answer: 0,
            explain: "Xét $\\Delta ABC$ và $\\Delta ADC$: $AB = AD$, $\\widehat{BAC} = \\widehat{DAC}$, $AC$ chung. Vậy $\\Delta ABC = \\Delta ADC$ (c.g.c) với $A \\leftrightarrow A$, $B \\leftrightarrow D$, $C \\leftrightarrow C$."
          },
          {
            id: "d1q8", level: "vua", source: "SGK Bài 14 – BT 4.13",
            q: "Hai đoạn thẳng $AC$ và $BD$ cắt nhau tại $O$ sao cho $OA = OC$, $OB = OD$ (như hình). Tam giác $OAB$ bằng tam giác nào?" + FIG_X,
            options: ["$\\Delta ODC$", "$\\Delta OBC$", "$\\Delta OAD$", "$\\Delta OCD$"],
            answer: 3,
            explain: "$\\Delta OAB$ và $\\Delta OCD$ có $OA = OC$, $\\widehat{AOB} = \\widehat{COD}$ (đối đỉnh), $OB = OD$ nên bằng nhau (c.g.c). Tương ứng: $O \\leftrightarrow O$, $A \\leftrightarrow C$, $B \\leftrightarrow D$, nên viết $\\Delta OAB = \\Delta OCD$."
          },
          {
            id: "d1q9", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta DEF$ (g.c.g) với $\\widehat{A} = \\widehat{D} = 50^\\circ$, $AB = DE = 4$ cm, $\\widehat{B} = \\widehat{E}$. Biết $\\widehat{C} = 70^\\circ$. Số đo $\\widehat{E}$ là",
            options: ["$50^\\circ$", "$70^\\circ$", "$80^\\circ$", "$60^\\circ$"],
            answer: 3,
            explain: "$\\widehat{B} = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$. Vì $\\widehat{E} = \\widehat{B}$ nên $\\widehat{E} = 60^\\circ$."
          },
          {
            id: "d1q10", level: "kho", source: "SGK tr.73 – Thử thách nhỏ",
            q: "$\\Delta ABC$ và $\\Delta DEF$ có $BC = EF$, $\\widehat{B} = \\widehat{E}$, $\\widehat{A} = \\widehat{D}$. Khẳng định nào đúng?",
            options: [
              "Chưa đủ điều kiện để hai tam giác bằng nhau",
              "$\\Delta ABC = \\Delta DEF$, vì suy ra được $\\widehat{C} = \\widehat{F}$ rồi dùng g.c.g",
              "$\\Delta ABC = \\Delta DEF$ (c.g.c)",
              "$\\Delta ABC = \\Delta EDF$ (g.c.g)"
            ],
            answer: 1,
            explain: "Tổng ba góc bằng $180^\\circ$ nên $\\widehat{C} = 180^\\circ - \\widehat{A} - \\widehat{B} = 180^\\circ - \\widehat{D} - \\widehat{E} = \\widehat{F}$. Khi đó $\\widehat{B} = \\widehat{E}$, $BC = EF$, $\\widehat{C} = \\widehat{F}$ nên $\\Delta ABC = \\Delta DEF$ (g.c.g)."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK Bài 14 – BT 4.13 (biến đổi)", maxPoints: 3,
            q: "Hai đoạn thẳng $MP$ và $NQ$ cắt nhau tại $I$, trong đó $I$ là trung điểm của mỗi đoạn.<br>a) Chứng minh $\\Delta IMN = \\Delta IPQ$.<br>b) Chứng minh $MN = PQ$.<br>c) Chứng minh $MN \\parallel PQ$.",
            modelAnswer: "a) Xét $\\Delta IMN$ và $\\Delta IPQ$ có:<br>• $IM = IP$ ($I$ là trung điểm $MP$);<br>• $\\widehat{MIN} = \\widehat{PIQ}$ (hai góc đối đỉnh);<br>• $IN = IQ$ ($I$ là trung điểm $NQ$).<br>Vậy $\\Delta IMN = \\Delta IPQ$ (c.g.c).<br>" +
              "b) Từ câu a suy ra $MN = PQ$ (hai cạnh tương ứng).<br>" +
              "c) Từ câu a suy ra $\\widehat{IMN} = \\widehat{IPQ}$ (hai góc tương ứng), tức $\\widehat{NMP} = \\widehat{QPM}$. Hai góc này ở vị trí so le trong tạo bởi đường thẳng $MP$ cắt hai đường thẳng $MN$ và $PQ$. Vậy $MN \\parallel PQ$.",
            rubric: [
              { pts: 1, text: "Câu a: nêu đủ ba yếu tố $IM = IP$, $\\widehat{MIN} = \\widehat{PIQ}$ (đối đỉnh), $IN = IQ$." },
              { pts: 0.5, text: "Câu a: kết luận $\\Delta IMN = \\Delta IPQ$ (c.g.c), đúng thứ tự đỉnh." },
              { pts: 0.5, text: "Câu b: suy ra $MN = PQ$ (cạnh tương ứng)." },
              { pts: 0.5, text: "Câu c: suy ra $\\widehat{IMN} = \\widehat{IPQ}$ (góc tương ứng)." },
              { pts: 0.5, text: "Câu c: chỉ ra hai góc so le trong bằng nhau và kết luận $MN \\parallel PQ$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SGK tr.71 – Định lí c.g.c",
            q: "Phát biểu nào sau đây là trường hợp bằng nhau cạnh – góc – cạnh?",
            options: [
              "Nếu hai cạnh và một góc của tam giác này bằng hai cạnh và một góc của tam giác kia thì hai tam giác đó bằng nhau",
              "Nếu hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia thì hai tam giác đó bằng nhau",
              "Nếu một cạnh và hai góc bất kì của tam giác này bằng một cạnh và hai góc bất kì của tam giác kia thì hai tam giác đó bằng nhau",
              "Nếu ba góc của tam giác này bằng ba góc của tam giác kia thì hai tam giác đó bằng nhau"
            ],
            answer: 1,
            explain: "Trường hợp c.g.c đòi hỏi góc bằng nhau phải là <b>góc xen giữa</b> hai cạnh. Ba góc bằng nhau thì chưa chắc hai tam giác bằng nhau (một tam giác có thể to hơn)."
          },
          {
            id: "d2q2", level: "de", source: "SGK tr.71 – Góc xen giữa",
            q: "Trong tam giác $DEF$, góc $\\widehat{F}$ là góc xen giữa hai cạnh nào?",
            options: ["$DE$ và $EF$", "$FD$ và $FE$", "$DE$ và $DF$", "Chỉ cạnh $DE$"],
            answer: 1,
            explain: "Góc $F$ có đỉnh $F$, tạo bởi hai cạnh đi qua $F$ là $FD$ và $FE$."
          },
          {
            id: "d2q3", level: "de", source: "SGK tr.72 – Góc kề",
            q: "Trong tam giác $ABC$, cạnh nào nhận $\\widehat{A}$ và $\\widehat{C}$ làm hai góc kề?",
            options: ["$AC$", "$AB$", "$BC$", "Không có cạnh nào"],
            answer: 0,
            explain: "Cạnh có hai đầu mút là $A$ và $C$ là cạnh $AC$; hai góc kề của nó là $\\widehat{A}$ và $\\widehat{C}$."
          },
          {
            id: "d2q4", level: "de", source: "SBT Bài 14 – Ví dụ 2",
            q: "$\\Delta PQR$ và $\\Delta XYZ$ có $\\widehat{Q} = \\widehat{Y}$, $QR = YZ$, $\\widehat{R} = \\widehat{Z}$. Khi đó",
            options: ["$\\Delta PQR = \\Delta XYZ$ (c.g.c)", "$\\Delta PQR = \\Delta XZY$ (g.c.g)", "$\\Delta PQR = \\Delta XYZ$ (g.c.g)", "$\\Delta QPR = \\Delta XYZ$ (g.c.g)"],
            answer: 2,
            explain: "Cạnh $QR = YZ$ và hai góc kề: $\\widehat{Q} = \\widehat{Y}$, $\\widehat{R} = \\widehat{Z}$. Tương ứng $P \\leftrightarrow X$, $Q \\leftrightarrow Y$, $R \\leftrightarrow Z$ nên $\\Delta PQR = \\Delta XYZ$ (g.c.g)."
          },
          {
            id: "d2q5", level: "vua", source: "SGK tr.72 – Ví dụ 2",
            q: "Trong hình, $A, C, D$ thẳng hàng; $B, C, E$ thẳng hàng; $CA = CD$ và $\\widehat{BAC} = \\widehat{EDC}$. Hai tam giác $ABC$ và $DEC$ bằng nhau theo trường hợp nào, và yếu tố thứ ba được dùng là gì?" +
              fig({
                w: 300, h: 190,
                p: { A: [30, 30], B: [130, 30], C: [150, 100], D: [270, 170], E: [170, 170] },
                s: [["A", "B"], ["A", "D"], ["B", "E"], ["E", "D"]],
                k: [["C", "A", 1], ["C", "D", 1]],
                a: [["B", "A", "C", 1], ["E", "D", "C", 1]],
                off: { C: [14, -4], A: [-10, -6], B: [6, -12], D: [10, 8], E: [-6, 12] }
              }),
            options: [
              "g.c.g, dùng $\\widehat{ACB} = \\widehat{DCE}$ (hai góc đối đỉnh)",
              "c.g.c, dùng $BC = EC$",
              "g.c.g, dùng $\\widehat{B} = \\widehat{E}$",
              "c.c.c, dùng $AB = DE$"
            ],
            answer: 0,
            explain: "Cạnh $CA = CD$; hai góc kề cạnh này: $\\widehat{BAC} = \\widehat{EDC}$ (giả thiết) và $\\widehat{ACB} = \\widehat{DCE}$ (đối đỉnh). Vậy $\\Delta ABC = \\Delta DEC$ (g.c.g). $\\widehat{B}, \\widehat{E}$ không kề cạnh $CA, CD$ và cũng chưa biết bằng nhau."
          },
          {
            id: "d2q6", level: "vua", source: "mới",
            q: "$\\Delta ABC$ và $\\Delta DEF$ có $AB = DE$, $BC = EF$. Thêm điều kiện nào sau đây thì <b>chưa</b> đủ để kết luận hai tam giác bằng nhau?",
            options: ["$\\widehat{B} = \\widehat{E}$", "$AC = DF$", "$\\widehat{A} = \\widehat{D}$", "$\\widehat{B} = \\widehat{E} = 90^\\circ$"],
            answer: 2,
            explain: "$\\widehat{A}$ không xen giữa $AB$ và $BC$ nên không dùng được c.g.c (\"cạnh – cạnh – góc\" không phải trường hợp bằng nhau). Còn $\\widehat{B} = \\widehat{E}$ (kể cả bằng $90^\\circ$) cho c.g.c; $AC = DF$ cho c.c.c."
          },
          {
            id: "d2q7", level: "vua", source: "SBT Bài 14 – BT 4.22",
            q: "$\\Delta ABC$ và $\\Delta MNP$ có $AB = PN$, $BC = NM$, $\\widehat{ABC} = \\widehat{PNM}$. Khẳng định nào đúng?",
            options: ["$\\Delta ABC = \\Delta MNP$", "$\\Delta ABC = \\Delta PNM$", "$\\Delta ABC = \\Delta NPM$", "$\\Delta ABC = \\Delta PMN$"],
            answer: 1,
            explain: "Góc bằng nhau ở đỉnh $B$ và $N$ nên $B \\leftrightarrow N$. $AB = PN$ nên $A \\leftrightarrow P$; $BC = NM$ nên $C \\leftrightarrow M$. Vậy $\\Delta ABC = \\Delta PNM$ (c.g.c)."
          },
          {
            id: "d2q8", level: "vua", source: "SGK Bài 14 – BT 4.12a",
            q: "Trong hình, $AB = CD$ và $\\widehat{ABD} = \\widehat{CDB}$. Khẳng định nào đúng?" +
              fig({
                w: 280, h: 170,
                p: { A: [40, 30], B: [220, 30], C: [200, 140], D: [20, 140] },
                s: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["B", "D"]],
                k: [["A", "B", 1], ["C", "D", 1]],
                a: [["A", "B", "D", 1], ["C", "D", "B", 1]]
              }),
            options: ["$\\Delta ABD = \\Delta CDB$ (c.g.c)", "$\\Delta ABD = \\Delta CBD$ (c.g.c)", "$\\Delta ABD = \\Delta CDB$ (g.c.g)", "$\\Delta ABD = \\Delta BDC$ (c.g.c)"],
            answer: 0,
            explain: "Xét $\\Delta ABD$ và $\\Delta CDB$: $AB = CD$, $\\widehat{ABD} = \\widehat{CDB}$ (góc xen giữa), $BD$ chung. Vậy $\\Delta ABD = \\Delta CDB$ (c.g.c) với $A \\leftrightarrow C$, $B \\leftrightarrow D$, $D \\leftrightarrow B$."
          },
          {
            id: "d2q9", level: "kho", source: "mới",
            q: "$\\Delta ABC$ và $\\Delta MNP$ có $AB = MN = 5$ cm, $\\widehat{B} = \\widehat{N}$, $BC = NP$. Biết $\\widehat{A} = 65^\\circ$ và $\\widehat{P} = 45^\\circ$. Số đo $\\widehat{B}$ là",
            options: ["$45^\\circ$", "$65^\\circ$", "$110^\\circ$", "$70^\\circ$"],
            answer: 3,
            explain: "$\\Delta ABC = \\Delta MNP$ (c.g.c) nên $\\widehat{C} = \\widehat{P} = 45^\\circ$. Do đó $\\widehat{B} = 180^\\circ - 65^\\circ - 45^\\circ = 70^\\circ$."
          },
          {
            id: "d2q10", level: "kho", source: "SGK tr.71 – Vận dụng",
            q: "Trong hình, các điểm $A, B, C, D$ thẳng hàng theo thứ tự đó; $OA = OD$, $\\widehat{OAB} = \\widehat{ODC}$ và $AB = CD$. Khẳng định nào sau đây <b>sai</b>?" +
              fig({
                w: 300, h: 175,
                p: { O: [150, 30], A: [20, 150], B: [100, 150], C: [200, 150], D: [280, 150] },
                s: [["O", "A"], ["O", "B"], ["O", "C"], ["O", "D"], ["A", "D"]],
                k: [["O", "A", 1], ["O", "D", 1], ["A", "B", 2], ["C", "D", 2]],
                a: [["O", "A", "B", 1], ["O", "D", "C", 1]],
                off: { O: [0, -12], A: [0, 14], B: [0, 14], C: [0, 14], D: [0, 14] }
              }),
            options: ["$\\Delta OAB = \\Delta ODC$", "$OB = OC$", "$AC = DB$", "$\\Delta OAB = \\Delta OCD$"],
            answer: 3,
            explain: "$\\Delta OAB = \\Delta ODC$ (c.g.c: $OA = OD$, $\\widehat{A} = \\widehat{D}$, $AB = DC$), nên $OB = OC$. Ngoài ra $AC = AB + BC = DC + CB = DB$. Viết $\\Delta OAB = \\Delta OCD$ là sai tương ứng (khi đó phải có $OA = OC$)."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SGK tr.73 – Luyện tập 2 (biến đổi)", maxPoints: 1.5,
            q: "Tứ giác $MNPQ$ có đường chéo $NQ$ là tia phân giác của cả góc $\\widehat{MNP}$ và góc $\\widehat{MQP}$. Chứng minh $\\Delta MNQ = \\Delta PNQ$, từ đó suy ra $MN = PN$.",
            modelAnswer: "Xét $\\Delta MNQ$ và $\\Delta PNQ$ có:<br>• $\\widehat{MNQ} = \\widehat{PNQ}$ ($NQ$ là phân giác của $\\widehat{MNP}$);<br>• $NQ$ là cạnh chung;<br>• $\\widehat{MQN} = \\widehat{PQN}$ ($QN$ là phân giác của $\\widehat{MQP}$).<br>" +
              "Vậy $\\Delta MNQ = \\Delta PNQ$ (g.c.g). Suy ra $MN = PN$ (hai cạnh tương ứng).",
            rubric: [
              { pts: 0.5, text: "Nêu đúng hai cặp góc bằng nhau nhờ tính chất tia phân giác." },
              { pts: 0.25, text: "Nêu $NQ$ là cạnh chung." },
              { pts: 0.5, text: "Kết luận $\\Delta MNQ = \\Delta PNQ$ (g.c.g)." },
              { pts: 0.25, text: "Suy ra $MN = PN$ (cạnh tương ứng)." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SGK Bài 14 – BT 4.14 (biến đổi)", maxPoints: 1.5,
            q: "Hai đoạn thẳng $AC$ và $BD$ cắt nhau tại $E$ sao cho $EA = EB$ và $\\widehat{EAD} = \\widehat{EBC}$. Chứng minh $\\Delta EAD = \\Delta EBC$, từ đó suy ra $AD = BC$.",
            modelAnswer: "Xét $\\Delta EAD$ và $\\Delta EBC$ có:<br>• $\\widehat{EAD} = \\widehat{EBC}$ (giả thiết);<br>• $EA = EB$ (giả thiết);<br>• $\\widehat{AED} = \\widehat{BEC}$ (hai góc đối đỉnh, vì $A, E, C$ thẳng hàng và $B, E, D$ thẳng hàng).<br>" +
              "Hai góc $\\widehat{EAD}, \\widehat{AED}$ kề cạnh $EA$; hai góc $\\widehat{EBC}, \\widehat{BEC}$ kề cạnh $EB$.<br>" +
              "Vậy $\\Delta EAD = \\Delta EBC$ (g.c.g). Suy ra $AD = BC$ (hai cạnh tương ứng).",
            rubric: [
              { pts: 0.5, text: "Chỉ ra $\\widehat{AED} = \\widehat{BEC}$ (đối đỉnh)." },
              { pts: 0.5, text: "Nêu đủ ba yếu tố và kết luận $\\Delta EAD = \\Delta EBC$ (g.c.g)." },
              { pts: 0.5, text: "Suy ra $AD = BC$ (cạnh tương ứng)." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.72 – Định lí g.c.g",
            q: "Phát biểu nào sau đây là trường hợp bằng nhau góc – cạnh – góc?",
            options: [
              "Nếu một cạnh và hai góc bất kì của tam giác này bằng một cạnh và hai góc bất kì của tam giác kia thì hai tam giác đó bằng nhau",
              "Nếu hai cạnh và một góc kề của tam giác này bằng hai cạnh và một góc kề của tam giác kia thì hai tam giác đó bằng nhau",
              "Nếu một cạnh và hai góc kề của tam giác này bằng một cạnh và hai góc kề của tam giác kia thì hai tam giác đó bằng nhau",
              "Nếu ba góc của tam giác này bằng ba góc của tam giác kia thì hai tam giác đó bằng nhau"
            ],
            answer: 2,
            explain: "Trường hợp g.c.g: một cạnh và <b>hai góc kề</b> cạnh đó."
          },
          {
            id: "d3q2", level: "de", source: "SGK tr.71 – Góc xen giữa",
            q: "Trong tam giác $HIK$, góc $\\widehat{I}$ là góc xen giữa hai cạnh",
            options: ["$IH$ và $IK$", "$HI$ và $HK$", "$KH$ và $KI$", "$HK$ và $IK$"],
            answer: 0,
            explain: "Góc $I$ có đỉnh $I$, tạo bởi hai cạnh đi qua $I$: $IH$ và $IK$."
          },
          {
            id: "d3q3", level: "de", source: "SGK tr.71 – Câu hỏi (Hình 4.29)",
            q: "Hai tam giác trong hình bằng nhau theo trường hợp nào? (Các kí hiệu giống nhau chỉ các yếu tố bằng nhau.)" + FIG_CGC,
            options: ["c.c.c", "c.g.c", "g.c.g", "Không đủ dữ kiện để kết luận"],
            answer: 1,
            explain: "$AB = DE$, $AC = DF$ và góc xen giữa $\\widehat{A} = \\widehat{D}$. Vậy $\\Delta ABC = \\Delta DEF$ (c.g.c)."
          },
          {
            id: "d3q4", level: "de", source: "SGK tr.72 – Định lí g.c.g",
            q: "$\\Delta ABC = \\Delta MNP$ theo trường hợp g.c.g, trong đó cặp cạnh bằng nhau được dùng là $BC = NP$. Hai cặp góc bằng nhau được dùng là",
            options: ["$\\widehat{A} = \\widehat{M}$ và $\\widehat{B} = \\widehat{N}$", "$\\widehat{B} = \\widehat{N}$ và $\\widehat{C} = \\widehat{P}$", "$\\widehat{A} = \\widehat{M}$ và $\\widehat{C} = \\widehat{P}$", "$\\widehat{A} = \\widehat{N}$ và $\\widehat{B} = \\widehat{M}$"],
            answer: 1,
            explain: "Hai góc kề cạnh $BC$ là $\\widehat{B}, \\widehat{C}$; kề cạnh $NP$ là $\\widehat{N}, \\widehat{P}$."
          },
          {
            id: "d3q5", level: "vua", source: "SBT Bài 14 – BT 4.23",
            q: "$\\Delta ABC$ và $\\Delta DEF$ có $\\widehat{ABC} = \\widehat{EFD}$, $\\widehat{ACB} = \\widehat{EDF}$ và $BC = FD$. Khẳng định nào đúng?",
            options: ["$\\Delta ABC = \\Delta DEF$", "$\\Delta ABC = \\Delta EDF$", "$\\Delta ABC = \\Delta EFD$", "$\\Delta ABC = \\Delta FED$"],
            answer: 2,
            explain: "$\\widehat{B} = \\widehat{F}$ nên $B \\leftrightarrow F$; $\\widehat{C} = \\widehat{D}$ nên $C \\leftrightarrow D$; còn lại $A \\leftrightarrow E$. Cạnh $BC = FD$ kề hai góc đó, nên $\\Delta ABC = \\Delta EFD$ (g.c.g)."
          },
          {
            id: "d3q6", level: "vua", source: "SBT Bài 14 – Ví dụ 3",
            q: "Cho $\\widehat{xOy}$ có tia phân giác $Ot$. Lấy $A \\in Ox$, $B \\in Oy$ sao cho $OA = OB$; điểm $M$ thuộc tia $Ot$ (như hình). Khẳng định nào đúng?" + FIG_PG,
            options: ["$MA = OA$", "$MA = OM$", "$MB = AB$", "$MA = MB$"],
            answer: 3,
            explain: "$\\Delta OAM$ và $\\Delta OBM$ có $OA = OB$, $\\widehat{AOM} = \\widehat{BOM}$ (phân giác), $OM$ chung nên bằng nhau (c.g.c). Suy ra $MA = MB$."
          },
          {
            id: "d3q7", level: "vua", source: "mới",
            q: "Tam giác $ABC$ có $AB = AC$. Tia phân giác của góc $A$ cắt $BC$ tại $D$. Khẳng định nào đúng?",
            options: ["$DB = DC$", "$AD = BD$", "$AB = BC$", "$AD = AC$"],
            answer: 0,
            explain: "$\\Delta ABD$ và $\\Delta ACD$ có $AB = AC$, $\\widehat{BAD} = \\widehat{CAD}$ (phân giác), $AD$ chung nên $\\Delta ABD = \\Delta ACD$ (c.g.c). Suy ra $DB = DC$."
          },
          {
            id: "d3q8", level: "vua", source: "SGK tr.70 – HĐ1, HĐ2",
            q: "$\\Delta ABC$ và $\\Delta A'B'C'$ có $AB = A'B' = 3$ cm, $\\widehat{A} = \\widehat{A'} = 60^\\circ$, $AC = A'C' = 4$ cm. Đo được $BC \\approx 3{,}6$ cm. Độ dài $B'C'$ khoảng",
            options: ["$3$ cm", "$4$ cm", "$3{,}6$ cm", "$7$ cm"],
            answer: 2,
            explain: "Hai tam giác có hai cạnh và góc xen giữa bằng nhau nên $\\Delta ABC = \\Delta A'B'C'$ (c.g.c). Do đó $B'C' = BC \\approx 3{,}6$ cm."
          },
          {
            id: "d3q9", level: "kho", source: "mới",
            q: "$\\Delta ABC$ và $\\Delta DEF$ có $\\widehat{A} = \\widehat{D}$, $AC = DF$, $\\widehat{C} = \\widehat{F}$. Biết $\\widehat{A} = 2\\widehat{C}$ và $\\widehat{E} = 75^\\circ$. Số đo $\\widehat{F}$ là",
            options: ["$35^\\circ$", "$70^\\circ$", "$75^\\circ$", "$52{,}5^\\circ$"],
            answer: 0,
            explain: "$\\Delta ABC = \\Delta DEF$ (g.c.g) nên $\\widehat{B} = \\widehat{E} = 75^\\circ$. Khi đó $\\widehat{A} + \\widehat{C} = 105^\\circ$, mà $\\widehat{A} = 2\\widehat{C}$ nên $3\\widehat{C} = 105^\\circ$, $\\widehat{C} = 35^\\circ$. Vậy $\\widehat{F} = \\widehat{C} = 35^\\circ$."
          },
          {
            id: "d3q10", level: "kho", source: "SGK Bài 14 – BT 4.15",
            q: "Trong hình, $AB \\parallel CD$ và $AB = CD$; $E$ là giao điểm của $AD$ và $BC$; $G \\in AB$, $H \\in CD$ sao cho $G, E, H$ thẳng hàng. Khẳng định nào sau đây <b>không</b> suy ra được?" +
              fig({
                w: 300, h: 200,
                p: { A: [40, 30], B: [220, 30], C: [80, 170], D: [260, 170], E: [150, 100], G: [110, 30], H: [190, 170] },
                s: [["A", "B"], ["C", "D"], ["A", "D"], ["B", "C"], ["G", "H"]],
                k: [["A", "B", 1], ["C", "D", 1]],
                off: { E: [16, 0], G: [0, -12], H: [0, 12], A: [-10, -6], B: [10, -6], C: [-10, 6], D: [10, 6] }
              }),
            options: ["$EA = ED$", "$EB = EC$", "$EG = EH$", "$EA = EB$"],
            answer: 3,
            explain: "$\\Delta ABE = \\Delta DCE$ (g.c.g: $\\widehat{BAE} = \\widehat{CDE}$ và $\\widehat{ABE} = \\widehat{DCE}$ so le trong, $AB = DC$) nên $EA = ED$, $EB = EC$. Tiếp theo $\\Delta AEG = \\Delta DEH$ (g.c.g: $\\widehat{GAE} = \\widehat{HDE}$, $EA = ED$, $\\widehat{AEG} = \\widehat{DEH}$ đối đỉnh) nên $EG = EH$. Còn $EA = EB$ không có căn cứ."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SBT Bài 14 – BT 4.24 (biến đổi)", maxPoints: 2,
            q: "Cho đoạn thẳng $AB$. Trên cùng một nửa mặt phẳng bờ $AB$ lấy hai điểm $C$ và $D$ sao cho $AC = BD$ và $\\widehat{CAB} = \\widehat{DBA}$.<br>a) Chứng minh $\\Delta CAB = \\Delta DBA$.<br>b) Suy ra $BC = AD$.",
            modelAnswer: "a) Xét $\\Delta CAB$ và $\\Delta DBA$ có:<br>• $AC = BD$ (giả thiết);<br>• $\\widehat{CAB} = \\widehat{DBA}$ (giả thiết) — đây là góc xen giữa $AC, AB$ và góc xen giữa $BD, BA$;<br>• $AB$ là cạnh chung.<br>Vậy $\\Delta CAB = \\Delta DBA$ (c.g.c), với $C \\leftrightarrow D$, $A \\leftrightarrow B$, $B \\leftrightarrow A$.<br>" +
              "b) Từ câu a suy ra $CB = DA$ (hai cạnh tương ứng), tức $BC = AD$.",
            rubric: [
              { pts: 1, text: "Nêu đủ ba yếu tố: $AC = BD$, $\\widehat{CAB} = \\widehat{DBA}$, $AB$ chung." },
              { pts: 0.5, text: "Kết luận $\\Delta CAB = \\Delta DBA$ (c.g.c), đúng thứ tự đỉnh." },
              { pts: 0.5, text: "Suy ra $BC = AD$ (cạnh tương ứng)." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SGK tr.73 – Thử thách nhỏ", maxPoints: 1,
            q: "$\\Delta ABC$ và $\\Delta DEF$ có $BC = EF$, $\\widehat{A} = \\widehat{D}$, $\\widehat{B} = \\widehat{E}$. Chứng minh $\\Delta ABC = \\Delta DEF$.",
            modelAnswer: "Theo định lí tổng ba góc của tam giác: $\\widehat{C} = 180^\\circ - \\widehat{A} - \\widehat{B}$ và $\\widehat{F} = 180^\\circ - \\widehat{D} - \\widehat{E}$. Vì $\\widehat{A} = \\widehat{D}$, $\\widehat{B} = \\widehat{E}$ nên $\\widehat{C} = \\widehat{F}$.<br>" +
              "Xét $\\Delta ABC$ và $\\Delta DEF$ có: $\\widehat{B} = \\widehat{E}$, $BC = EF$, $\\widehat{C} = \\widehat{F}$. Vậy $\\Delta ABC = \\Delta DEF$ (g.c.g).",
            rubric: [
              { pts: 0.5, text: "Dùng tổng ba góc suy ra $\\widehat{C} = \\widehat{F}$." },
              { pts: 0.5, text: "Áp dụng g.c.g (cạnh $BC = EF$ với hai góc kề) và kết luận đúng." }
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
            q: "$\\Delta ABC$ và $\\Delta DEF$ có $AB = DE$, $AC = DF$, $\\widehat{B} = \\widehat{E}$. Kết luận nào đúng?",
            options: ["$\\Delta ABC = \\Delta DEF$ (c.g.c)", "Chưa thể kết luận hai tam giác bằng nhau", "$\\Delta ABC = \\Delta DEF$ (g.c.g)", "$\\Delta ABC = \\Delta DFE$ (c.g.c)"],
            answer: 1,
            explain: "Góc xen giữa $AB, AC$ là $\\widehat{A}$, không phải $\\widehat{B}$. Hai cạnh và một góc không xen giữa thì chưa đủ để kết luận hai tam giác bằng nhau."
          },
          {
            id: "d4q2", level: "vua", source: "mới",
            q: "$\\Delta MNP$ và $\\Delta HIK$ có $MN = HI$, $\\widehat{M} = \\widehat{H}$, $\\widehat{P} = \\widehat{K}$. Để chứng minh hai tam giác bằng nhau theo g.c.g với cạnh $MN = HI$, cần chỉ ra thêm điều gì?",
            options: ["$\\widehat{N} = \\widehat{I}$", "$MP = HK$", "$NP = IK$", "$\\widehat{N} = \\widehat{K}$"],
            answer: 0,
            explain: "Hai góc kề cạnh $MN$ là $\\widehat{M}, \\widehat{N}$; kề cạnh $HI$ là $\\widehat{H}, \\widehat{I}$. Cần $\\widehat{N} = \\widehat{I}$, điều này suy ra được từ tổng ba góc: $\\widehat{N} = 180^\\circ - \\widehat{M} - \\widehat{P} = 180^\\circ - \\widehat{H} - \\widehat{K} = \\widehat{I}$."
          },
          {
            id: "d4q3", level: "kho", source: "SBT Bài 14 – BT 4.26",
            q: "Hai đoạn thẳng $AC$ và $BD$ cắt nhau tại $E$; biết $AB = CD$ và $\\widehat{BAE} = \\widehat{DCE}$. Khẳng định nào đúng?",
            options: ["$E$ là trung điểm của cả $AC$ và $BD$", "$EA = EB$", "$AC = BD$", "$AB = AC$"],
            answer: 0,
            explain: "$\\widehat{AEB} = \\widehat{CED}$ (đối đỉnh) và $\\widehat{BAE} = \\widehat{DCE}$ nên $\\widehat{ABE} = \\widehat{CDE}$ (tổng ba góc). Do đó $\\Delta ABE = \\Delta CDE$ (g.c.g), suy ra $EA = EC$, $EB = ED$: $E$ là trung điểm của $AC$ và $BD$."
          },
          {
            id: "d4q4", level: "kho", source: "mới",
            q: "Cho tam giác $ABC$, $M$ là trung điểm của $BC$. Trên tia đối của tia $MA$ lấy điểm $D$ sao cho $MD = MA$. Khẳng định nào đúng?",
            options: ["$AB = AC$", "$AD = BC$", "$AB = CD$", "$AM = BC$"],
            answer: 2,
            explain: "$\\Delta MAB$ và $\\Delta MDC$ có $MA = MD$, $\\widehat{AMB} = \\widehat{DMC}$ (đối đỉnh), $MB = MC$ nên bằng nhau (c.g.c). Suy ra $AB = DC$. Các khẳng định còn lại không đúng với tam giác bất kì."
          },
          {
            id: "d4q5", level: "kho", source: "SBT Bài 14 – BT 4.28b",
            q: "Cho $\\Delta ABC = \\Delta DEF$. Tia phân giác của $\\widehat{ABC}$ cắt $AC$ tại $P$, tia phân giác của $\\widehat{DEF}$ cắt $DF$ tại $Q$. Hai tam giác $ABP$ và $DEQ$ bằng nhau theo trường hợp nào?",
            options: ["c.c.c", "c.g.c", "g.c.g", "Không bằng nhau"],
            answer: 2,
            explain: "$\\widehat{A} = \\widehat{D}$, $AB = DE$ (từ $\\Delta ABC = \\Delta DEF$) và $\\widehat{ABP} = \\frac{1}{2}\\widehat{ABC} = \\frac{1}{2}\\widehat{DEF} = \\widehat{DEQ}$. Cạnh $AB$ kề hai góc $\\widehat{A}, \\widehat{ABP}$ nên $\\Delta ABP = \\Delta DEQ$ (g.c.g), do đó $BP = EQ$."
          },
          {
            id: "d4q6", level: "kho", source: "mới",
            q: "Tam giác $ABC$ có $\\widehat{B} = \\widehat{C}$. Tia phân giác của góc $A$ cắt $BC$ tại $D$. Khẳng định nào đúng?",
            options: ["$AB = AC$", "$AB = BC$", "$AD = BD$", "$AD = BC$"],
            answer: 0,
            explain: "$\\widehat{ADB} = 180^\\circ - \\widehat{B} - \\widehat{BAD}$, $\\widehat{ADC} = 180^\\circ - \\widehat{C} - \\widehat{CAD}$, mà $\\widehat{B} = \\widehat{C}$, $\\widehat{BAD} = \\widehat{CAD}$ nên $\\widehat{ADB} = \\widehat{ADC}$. Vậy $\\Delta ABD = \\Delta ACD$ (g.c.g: $\\widehat{BAD} = \\widehat{CAD}$, $AD$ chung, $\\widehat{ADB} = \\widehat{ADC}$), suy ra $AB = AC$."
          },
          {
            id: "d4q7", level: "kho", source: "mới",
            q: "$\\Delta ABC$ và $\\Delta MNP$ có $AB = MN$, $\\widehat{B} = \\widehat{N}$, $BC = NP$. Biết $\\widehat{A} - \\widehat{C} = 20^\\circ$ và $\\widehat{N} = 60^\\circ$. Số đo $\\widehat{P}$ là",
            options: ["$60^\\circ$", "$70^\\circ$", "$40^\\circ$", "$50^\\circ$"],
            answer: 3,
            explain: "$\\Delta ABC = \\Delta MNP$ (c.g.c) nên $\\widehat{B} = \\widehat{N} = 60^\\circ$ và $\\widehat{P} = \\widehat{C}$. Ta có $\\widehat{A} + \\widehat{C} = 120^\\circ$, $\\widehat{A} - \\widehat{C} = 20^\\circ$ nên $\\widehat{C} = (120^\\circ - 20^\\circ) : 2 = 50^\\circ$. Vậy $\\widehat{P} = 50^\\circ$."
          },
          {
            id: "d4q8", level: "kho", source: "SGK Bài 14 – BT 4.13a",
            q: "Hai đoạn thẳng $AC$ và $BD$ cắt nhau tại $O$ với $OA = OC$, $OB = OD$; nối $AB, BC, CD, DA$. Với tứ giác $ABCD$ bất kì như vậy, có bao nhiêu cặp tam giác bằng nhau có chung đỉnh $O$ (trong các tam giác $OAB, OBC, OCD, ODA$)?",
            options: ["$1$", "$2$", "$3$", "$4$"],
            answer: 1,
            explain: "Dùng c.g.c với góc đối đỉnh: $\\Delta OAB = \\Delta OCD$ và $\\Delta OAD = \\Delta OCB$. Hai tam giác kề nhau như $OAB$ và $OBC$ nói chung không bằng nhau (vì $\\widehat{AOB} \\ne \\widehat{BOC}$ nếu $AC$ không vuông góc $BD$). Vậy có 2 cặp."
          },
          {
            id: "d4q9", level: "kho", source: "SBT Bài 14 – BT 4.25",
            q: "Trong hình, điểm $B$ nằm trong góc $\\widehat{CAD}$; $\\widehat{BAC} = \\widehat{BAD} = 25^\\circ$ và $\\widehat{BCA} = \\widehat{BDA} = 30^\\circ$. Số đo góc $\\widehat{CBD}$ (góc ở phía trên, không chứa điểm $A$) là" +
              fig({
                w: 300, h: 200,
                p: { A: [150, 175], B: [150, 95], C: [55, 30], D: [245, 30] },
                s: [["A", "C"], ["A", "D"], ["B", "C"], ["B", "D"], ["A", "B"]],
                a: [["C", "A", "B", 1, 32], ["B", "A", "D", 1, 32], ["A", "C", "B", 2, 30], ["B", "D", "A", 2, 30]],
                off: { A: [0, 13], B: [0, -14], C: [-10, -6], D: [10, -6] }
              }),
            options: ["$125^\\circ$", "$110^\\circ$", "$55^\\circ$", "$70^\\circ$"],
            answer: 1,
            explain: "$\\Delta ABC = \\Delta ABD$ (g.c.g: $\\widehat{BAC} = \\widehat{BAD}$, $AB$ chung, $\\widehat{ABC} = \\widehat{ABD}$ vì cùng bằng $180^\\circ - 25^\\circ - 30^\\circ = 125^\\circ$). Ba góc quanh điểm $B$ có tổng $360^\\circ$: $\\widehat{CBD} = 360^\\circ - 125^\\circ - 125^\\circ = 110^\\circ$."
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Hai đoạn thẳng $AB$ và $CD$ cắt nhau tại $O$, trong đó $O$ là trung điểm của mỗi đoạn. Khẳng định nào sau đây <b>không</b> luôn đúng?",
            options: ["$AC = BD$", "$AD = BC$", "$AC \\parallel BD$", "$AC = AD$"],
            answer: 3,
            explain: "$\\Delta OAC = \\Delta OBD$ (c.g.c, góc đối đỉnh) nên $AC = BD$ và $\\widehat{OAC} = \\widehat{OBD}$ (so le trong) suy ra $AC \\parallel BD$. Tương tự $\\Delta OAD = \\Delta OBC$ nên $AD = BC$. Còn $AC = AD$ chỉ đúng khi $AB \\perp CD$."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "SBT Bài 14 – BT 4.28a", maxPoints: 1.5,
            q: "Cho $\\Delta ABC = \\Delta DEF$. Gọi $M$ là trung điểm của $BC$, $N$ là trung điểm của $EF$. Chứng minh $AM = DN$.",
            modelAnswer: "Vì $\\Delta ABC = \\Delta DEF$ nên $AB = DE$, $\\widehat{B} = \\widehat{E}$, $BC = EF$.<br>" +
              "Do $M, N$ là trung điểm của $BC, EF$ nên $BM = \\frac{BC}{2} = \\frac{EF}{2} = EN$.<br>" +
              "Xét $\\Delta ABM$ và $\\Delta DEN$ có: $AB = DE$; $\\widehat{ABM} = \\widehat{DEN}$; $BM = EN$.<br>" +
              "Vậy $\\Delta ABM = \\Delta DEN$ (c.g.c), suy ra $AM = DN$ (hai cạnh tương ứng).",
            rubric: [
              { pts: 0.5, text: "Từ hai tam giác bằng nhau nêu được $AB = DE$, $\\widehat{B} = \\widehat{E}$ và chứng minh $BM = EN$." },
              { pts: 0.5, text: "Chứng minh $\\Delta ABM = \\Delta DEN$ (c.g.c)." },
              { pts: 0.5, text: "Suy ra $AM = DN$." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ có $AB = AC$. Lấy điểm $D$ trên cạnh $AB$, điểm $E$ trên cạnh $AC$ sao cho $AD = AE$. Gọi $O$ là giao điểm của $BE$ và $CD$.<br>a) Chứng minh $BE = CD$ và $\\widehat{ABE} = \\widehat{ACD}$.<br>b) Chứng minh $\\Delta OBD = \\Delta OCE$.",
            modelAnswer: "a) Xét $\\Delta ABE$ và $\\Delta ACD$ có: $AB = AC$; $\\widehat{A}$ là góc chung; $AE = AD$.<br>Vậy $\\Delta ABE = \\Delta ACD$ (c.g.c), suy ra $BE = CD$ và $\\widehat{ABE} = \\widehat{ACD}$, đồng thời $\\widehat{AEB} = \\widehat{ADC}$.<br>" +
              "b) Ta có $BD = AB - AD = AC - AE = CE$.<br>" +
              "$\\widehat{BDO} = 180^\\circ - \\widehat{ADC}$ và $\\widehat{CEO} = 180^\\circ - \\widehat{AEB}$ (hai góc kề bù), mà $\\widehat{ADC} = \\widehat{AEB}$ nên $\\widehat{BDO} = \\widehat{CEO}$.<br>" +
              "Xét $\\Delta OBD$ và $\\Delta OCE$ có: $\\widehat{OBD} = \\widehat{OCE}$ (câu a); $BD = CE$; $\\widehat{BDO} = \\widehat{CEO}$.<br>Vậy $\\Delta OBD = \\Delta OCE$ (g.c.g).",
            rubric: [
              { pts: 0.5, text: "Câu a: chứng minh $\\Delta ABE = \\Delta ACD$ (c.g.c, góc $A$ chung)." },
              { pts: 0.25, text: "Câu a: suy ra $BE = CD$ và $\\widehat{ABE} = \\widehat{ACD}$." },
              { pts: 0.25, text: "Câu b: chứng minh $BD = CE$." },
              { pts: 0.25, text: "Câu b: chứng minh $\\widehat{BDO} = \\widehat{CEO}$ (kề bù với hai góc bằng nhau)." },
              { pts: 0.25, text: "Câu b: kết luận $\\Delta OBD = \\Delta OCE$ (g.c.g)." }
            ]
          }
        ]
      }
    ]
  });
})();
