(function () {
  // ---------- Hình vẽ SVG (dùng currentColor để hợp chế độ sáng/tối) ----------
  // o = { w, h, P: {tên: [x, y]}, seg: [[a, b]], dash: [[a, b]], tick: [[a, b, số gạch]],
  //       right: [[đỉnh, a, b]], arc: [[đỉnh, a, b, số cung]], ang: [[đỉnh, a, b, "chữ", khoảng cách]],
  //       lab: ["A", ...], off: {A: [dx, dy]}, txt: [[x, y, "chữ"]] }
  function fig(o) {
    var W = o.w || 320, H = o.h || 200, P = o.P;
    var pt = function (n) { return typeof n === "string" ? P[n] : n; };
    var f = function (v) { return (+v).toFixed(1); };
    var unit = function (a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy); return [dx / l, dy / l]; };
    var line = function (a, b, extra) { return '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" stroke="currentColor" stroke-width="1.6"' + (extra || "") + '/>'; };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + (o.max || 320) + 'px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">';
    (o.dash || []).forEach(function (g) { s += line(pt(g[0]), pt(g[1]), ' stroke-dasharray="5 4"'); });
    (o.seg || []).forEach(function (g) { s += line(pt(g[0]), pt(g[1])); });
    (o.tick || []).forEach(function (g) {
      var a = pt(g[0]), b = pt(g[1]), n = g[2] || 1, d = unit(a, b), nr = [-d[1], d[0]];
      var m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      for (var i = 0; i < n; i++) {
        var k = (i - (n - 1) / 2) * 4, c = [m[0] + d[0] * k, m[1] + d[1] * k];
        s += '<line x1="' + f(c[0] - nr[0] * 5) + '" y1="' + f(c[1] - nr[1] * 5) + '" x2="' + f(c[0] + nr[0] * 5) + '" y2="' + f(c[1] + nr[1] * 5) + '" stroke="currentColor" stroke-width="1.4"/>';
      }
    });
    (o.right || []).forEach(function (g) {
      var V = pt(g[0]), u = unit(V, pt(g[1])), v = unit(V, pt(g[2])), k = 9;
      s += '<polyline points="' + f(V[0] + u[0] * k) + ',' + f(V[1] + u[1] * k) + ' ' + f(V[0] + u[0] * k + v[0] * k) + ',' + f(V[1] + u[1] * k + v[1] * k) + ' ' + f(V[0] + v[0] * k) + ',' + f(V[1] + v[1] * k) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
    });
    (o.arc || []).forEach(function (g) {
      var V = pt(g[0]), u = unit(V, pt(g[1])), v = unit(V, pt(g[2])), n = g[3] || 1;
      var sw = (u[0] * v[1] - u[1] * v[0]) > 0 ? 1 : 0;
      for (var i = 0; i < n; i++) {
        var r = 15 + i * 4;
        s += '<path d="M' + f(V[0] + u[0] * r) + ' ' + f(V[1] + u[1] * r) + ' A' + r + ' ' + r + ' 0 0 ' + sw + ' ' + f(V[0] + v[0] * r) + ' ' + f(V[1] + v[1] * r) + '" fill="none" stroke="#e5484d" stroke-width="1.3"/>';
      }
    });
    (o.ang || []).forEach(function (g) {
      var V = pt(g[0]), u = unit(V, pt(g[1])), v = unit(V, pt(g[2])), b = unit([0, 0], [u[0] + v[0], u[1] + v[1]]), r = g[4] || 26;
      s += '<text x="' + f(V[0] + b[0] * r) + '" y="' + f(V[1] + b[1] * r + 4) + '" font-size="12" text-anchor="middle" fill="#e5484d">' + g[3] + '</text>';
    });
    var names = o.lab || Object.keys(P), cx = 0, cy = 0;
    names.forEach(function (n) { cx += P[n][0]; cy += P[n][1]; });
    cx /= names.length; cy /= names.length;
    names.forEach(function (n) {
      var p = P[n], d = (o.off && o.off[n]) ? null : unit([cx, cy], p);
      var x = d ? p[0] + d[0] * 13 : p[0] + o.off[n][0], y = d ? p[1] + d[1] * 13 + 4 : p[1] + o.off[n][1];
      s += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2" fill="currentColor"/>';
      s += '<text x="' + f(x) + '" y="' + f(y) + '" font-size="14" font-style="italic" text-anchor="middle" fill="currentColor">' + n + '</text>';
    });
    (o.txt || []).forEach(function (t) { s += '<text x="' + t[0] + '" y="' + t[1] + '" font-size="13" font-style="italic" text-anchor="middle" fill="currentColor">' + t[2] + '</text>'; });
    return s + '</svg>';
  }
  // Chân đường vuông góc kẻ từ P xuống đường thẳng AB
  function foot(P, A, B) {
    var dx = B[0] - A[0], dy = B[1] - A[1], t = ((P[0] - A[0]) * dx + (P[1] - A[1]) * dy) / (dx * dx + dy * dy);
    return [A[0] + t * dx, A[1] + t * dy];
  }

  // ----- tọa độ các hình có tính toán -----
  // Đề 2 – câu 9: d qua trung điểm M của AB, AP ⊥ d, BQ ⊥ d
  var h9A = [30, 120], h9B = [290, 80], h9M = [160, 100], h9U = [160 + 1, 100 - 2];
  var h9P = foot(h9A, h9M, h9U), h9Q = foot(h9B, h9M, h9U);
  var h9d1 = [160 + 0.4472 * 92, 100 - 0.8944 * 92], h9d2 = [160 - 0.4472 * 92, 100 + 0.8944 * 92];
  // Đề 2 – câu 10: B = 35°, AD = AC, góc ADC = 75°, DE ⊥ AB
  var h10L = 130 / (1.6840 * Math.cos(35 * Math.PI / 180) - Math.cos(75 * Math.PI / 180));
  var h10D = [150, 150], h10B = [20, 150];
  var h10A = [150 + h10L * Math.cos(75 * Math.PI / 180), 150 - h10L * Math.sin(75 * Math.PI / 180)];
  var h10C = [2 * h10A[0] - 150, 150], h10E = foot(h10D, h10B, h10A);
  // Đề 1 – tự luận 2: tam giác cân tại A, góc A = 120°, MA ⊥ AB, NA ⊥ AC
  var e2B = [20, 150], e2C = [300, 150], e2A = [160, 150 - 140 * Math.tan(Math.PI / 6)];
  var e2M = [20 + 280 * (2 / 3), 150], e2N = [300 - 280 * (2 / 3), 150];
  // Đề 2 – tự luận 2: tam giác cân tại A, M trung điểm BC, MP ⊥ AB, MQ ⊥ AC
  var f2A = [150, 30], f2B = [30, 180], f2C = [270, 180], f2M = [150, 180];
  var f2P = foot(f2M, f2A, f2B), f2Q = foot(f2M, f2A, f2C);

  registerLesson({
    id: "c4-on",
    chapter: 4,
    kind: "review",
    title: "Ôn tập chương IV",
    sgkPages: [60, 87],
    sbtPages: [71, 74],
    objectives: [
      "Vận dụng định lí tổng ba góc của một tam giác; phân loại tam giác nhọn, vuông, tù",
      "Nhận biết hai tam giác bằng nhau, viết đúng các cặp cạnh, cặp góc tương ứng",
      "Vận dụng các trường hợp bằng nhau c.c.c, c.g.c, g.c.g và các trường hợp bằng nhau của tam giác vuông",
      "Nhận biết và vận dụng tính chất tam giác cân, tam giác đều, đường trung trực của đoạn thẳng",
      "Trình bày chứng minh hình học ngắn gọn, có căn cứ"
    ],

    theory: [
      {
        heading: "1. Tổng các góc trong một tam giác (Bài 12)",
        html: "<ul>" +
          "<li>Tổng ba góc của một tam giác bằng $180^\\circ$: $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$.</li>" +
          "<li>Mọi tam giác có ít nhất hai góc nhọn. <b>Tam giác nhọn</b>: ba góc đều nhọn; <b>tam giác vuông</b>: có một góc vuông; <b>tam giác tù</b>: có một góc tù.</li>" +
          "<li>Trong tam giác vuông, hai góc nhọn có tổng bằng $90^\\circ$ (phụ nhau).</li>" +
          "</ul>"
      },
      {
        heading: "2. Hai tam giác bằng nhau (Bài 13)",
        html: "Hai tam giác bằng nhau là hai tam giác có các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau." +
          "<ul><li>Khi viết $\\Delta ABC = \\Delta DEF$, các đỉnh tương ứng phải viết <b>đúng thứ tự</b>: $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$.</li>" +
          "<li>Từ đó suy ra: $AB = DE$, $BC = EF$, $AC = DF$ và $\\widehat{A} = \\widehat{D}$, $\\widehat{B} = \\widehat{E}$, $\\widehat{C} = \\widehat{F}$.</li></ul>"
      },
      {
        heading: "3. Các trường hợp bằng nhau của hai tam giác (Bài 13, 14)",
        html: "<table>" +
          "<tr><th>Trường hợp</th><th>Điều kiện</th></tr>" +
          "<tr><td>cạnh – cạnh – cạnh (c.c.c)</td><td>Ba cặp cạnh tương ứng bằng nhau</td></tr>" +
          "<tr><td>cạnh – góc – cạnh (c.g.c)</td><td>Hai cặp cạnh bằng nhau và cặp góc <b>xen giữa</b> hai cạnh đó bằng nhau</td></tr>" +
          "<tr><td>góc – cạnh – góc (g.c.g)</td><td>Một cặp cạnh bằng nhau và hai cặp góc <b>kề</b> cạnh đó bằng nhau</td></tr>" +
          "</table>" +
          "Chú ý: hai tam giác có ba cặp góc bằng nhau <b>chưa chắc</b> bằng nhau (một tam giác có thể là \"phóng to\" của tam giác kia)."
      },
      {
        heading: "4. Các trường hợp bằng nhau của tam giác vuông (Bài 15)",
        html: "Hai tam giác vuông bằng nhau nếu có:" +
          "<ul><li>hai cạnh góc vuông tương ứng bằng nhau; hoặc</li>" +
          "<li>một cạnh góc vuông và góc nhọn kề cạnh ấy tương ứng bằng nhau; hoặc</li>" +
          "<li>cạnh huyền và một góc nhọn tương ứng bằng nhau; hoặc</li>" +
          "<li>cạnh huyền và một cạnh góc vuông tương ứng bằng nhau.</li></ul>"
      },
      {
        heading: "5. Tam giác cân, tam giác đều (Bài 16)",
        html: "<ul>" +
          "<li><b>Tam giác cân</b> là tam giác có hai cạnh bằng nhau. Nếu $AB = AC$: $A$ là đỉnh, $BC$ là cạnh đáy, $\\widehat{B}, \\widehat{C}$ là hai góc ở đáy.</li>" +
          "<li>Trong tam giác cân, hai góc ở đáy bằng nhau. Ngược lại, tam giác có hai góc bằng nhau là tam giác cân.</li>" +
          "<li>Tam giác cân tại $A$: $\\widehat{B} = \\widehat{C} = \\frac{180^\\circ - \\widehat{A}}{2}$ và $\\widehat{A} = 180^\\circ - 2\\widehat{B}$.</li>" +
          "<li><b>Tam giác đều</b>: ba cạnh bằng nhau, mỗi góc bằng $60^\\circ$. Tam giác cân có một góc bằng $60^\\circ$ là tam giác đều.</li>" +
          "<li>Tam giác vuông cân: hai cạnh góc vuông bằng nhau, mỗi góc nhọn bằng $45^\\circ$.</li>" +
          "</ul>"
      },
      {
        heading: "6. Đường trung trực của đoạn thẳng (Bài 16)",
        html: "<ul>" +
          "<li><b>Đường trung trực</b> của đoạn thẳng $AB$ là đường thẳng <b>vuông góc</b> với $AB$ <b>tại trung điểm</b> của $AB$.</li>" +
          "<li>Điểm nằm trên đường trung trực của $AB$ thì cách đều $A$ và $B$: $MA = MB$.</li>" +
          "<li>Ngược lại, điểm cách đều $A$ và $B$ thì nằm trên đường trung trực của $AB$. Vì vậy, nếu hai điểm khác nhau $M, N$ đều cách đều $A$ và $B$ thì $MN$ là đường trung trực của $AB$.</li>" +
          "</ul>"
      }
    ],

    skills: [
      "<b>Tính góc</b>: dùng tổng ba góc bằng $180^\\circ$; trong tam giác vuông dùng \"hai góc nhọn phụ nhau\"; trong tam giác cân dùng \"hai góc ở đáy bằng nhau\". Bài có ẩn $x$: lập phương trình từ tổng ba góc, ví dụ $x + (x + 20^\\circ) + (x + 10^\\circ) = 180^\\circ$.",
      "<b>Chứng minh hai đoạn thẳng (hai góc) bằng nhau</b>: tìm hai tam giác chứa chúng, chứng minh hai tam giác đó bằng nhau, rồi suy ra cặp cạnh (góc) tương ứng.",
      "<b>Trình bày</b>: \"Xét $\\Delta \\ldots$ và $\\Delta \\ldots$ có: (1) …; (2) …; (3) …. Do đó $\\Delta \\ldots = \\Delta \\ldots$ (c.g.c). Suy ra …\". Mỗi ý phải có lí do (giả thiết, cạnh chung, góc chung, hai góc đối đỉnh…).",
      "<b>Tìm yếu tố chung</b>: cạnh chung, góc chung, hai góc đối đỉnh thường là yếu tố thứ ba còn thiếu.",
      "<b>Chứng minh tam giác cân</b>: chỉ ra hai cạnh bằng nhau hoặc hai góc bằng nhau. <b>Tam giác đều</b>: ba cạnh bằng nhau, hoặc tam giác cân có một góc $60^\\circ$.",
      "<b>Chứng minh vuông góc / trung điểm</b> bằng đường trung trực: nếu hai điểm cùng cách đều hai đầu đoạn thẳng thì đường thẳng qua hai điểm ấy là đường trung trực của đoạn thẳng.",
      "<b>Lỗi hay gặp</b>: viết sai thứ tự đỉnh tương ứng; dùng góc không xen giữa trong trường hợp c.g.c; cho rằng ba góc bằng nhau thì hai tam giác bằng nhau; quên rằng tam giác tù chỉ có <b>một</b> góc tù."
    ],

    examples: [
      {
        q: "Cho tam giác $ABC$ có $\\widehat{A} = 80^\\circ$ và $\\widehat{B} - \\widehat{C} = 20^\\circ$. Tính $\\widehat{B}$ và $\\widehat{C}$.",
        solution: "Ta có $\\widehat{B} + \\widehat{C} = 180^\\circ - 80^\\circ = 100^\\circ$ và $\\widehat{B} - \\widehat{C} = 20^\\circ$.<br>" +
          "Suy ra $\\widehat{B} = (100^\\circ + 20^\\circ) : 2 = 60^\\circ$; $\\ \\widehat{C} = 100^\\circ - 60^\\circ = 40^\\circ$."
      },
      {
        q: "Cho tam giác $ABC$ vuông tại $A$ có $\\widehat{B} = 60^\\circ$. Trên cạnh $BC$ lấy điểm $M$ sao cho $\\widehat{CAM} = 30^\\circ$. Chứng minh $M$ là trung điểm của $BC$." +
          fig({ w: 240, h: 200, P: { A: [40, 175], B: [40, 80], C: [205, 175], M: [122.5, 127.5] },
            seg: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "M"]], right: [["A", "B", "C"]] }),
        solution: "• Trong tam giác vuông $ABC$: $\\widehat{C} = 90^\\circ - 60^\\circ = 30^\\circ$. Tam giác $CAM$ có $\\widehat{CAM} = \\widehat{C} = 30^\\circ$ nên cân tại $M$: $MA = MC$.<br>" +
          "• $\\widehat{BAM} = 90^\\circ - 30^\\circ = 60^\\circ$. Tam giác $BAM$ có $\\widehat{B} = \\widehat{BAM} = 60^\\circ$ nên $\\widehat{AMB} = 60^\\circ$, tức tam giác $BAM$ đều: $MA = MB$.<br>" +
          "• Từ đó $MB = MC$ $(= MA)$, mà $M$ nằm trên đoạn $BC$, nên $M$ là trung điểm của $BC$."
      },
      {
        q: "Cho đoạn thẳng $AB$ và hai điểm $C, D$ nằm khác phía đối với $AB$ sao cho $CA = CB$, $DA = DB$. Chứng minh $CD$ là đường trung trực của $AB$.",
        solution: "$CA = CB$ nên $C$ nằm trên đường trung trực của $AB$. $DA = DB$ nên $D$ cũng nằm trên đường trung trực của $AB$.<br>" +
          "Hai điểm phân biệt $C, D$ cùng nằm trên đường trung trực của $AB$ nên đường thẳng $CD$ chính là đường trung trực của $AB$."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SBT Ôn tập chương IV – câu 1",
            q: "Khẳng định nào sau đây đúng?",
            options: ["Mọi tam giác đều có ít nhất một góc tù", "Mọi tam giác đều có ít nhất hai góc nhọn", "Mọi tam giác cân đều có một góc bằng $60^\\circ$", "Tam giác vuông cân có hai góc vuông"],
            answer: 1,
            explain: "Tổng ba góc là $180^\\circ$ nên một tam giác có nhiều nhất một góc vuông hoặc tù; hai góc còn lại phải nhọn. Tam giác nhọn không có góc tù; tam giác cân có góc đỉnh $40^\\circ$ không có góc $60^\\circ$; tam giác vuông cân chỉ có một góc vuông."
          },
          {
            id: "d1q2", level: "de", source: "SGK Bài 12 (biến đổi)",
            q: "Tam giác $ABC$ có $\\widehat{A} = 50^\\circ$, $\\widehat{B} = 75^\\circ$. Số đo $\\widehat{C}$ là",
            options: ["$55^\\circ$", "$65^\\circ$", "$45^\\circ$", "$75^\\circ$"],
            answer: 0,
            explain: "$\\widehat{C} = 180^\\circ - 50^\\circ - 75^\\circ = 55^\\circ$."
          },
          {
            id: "d1q3", level: "de", source: "SBT Ôn tập chương IV – BT 4.54",
            q: "Tam giác $MNP$ vuông tại $M$ có $\\widehat{N} = 38^\\circ$. Số đo $\\widehat{P}$ là",
            options: ["$42^\\circ$", "$62^\\circ$", "$52^\\circ$", "$142^\\circ$"],
            answer: 2,
            explain: "Hai góc nhọn của tam giác vuông phụ nhau: $\\widehat{P} = 90^\\circ - 38^\\circ = 52^\\circ$."
          },
          {
            id: "d1q4", level: "de", source: "SGK Bài 13 (biến đổi)",
            q: "Cho $\\Delta ABC = \\Delta DEF$. Khẳng định nào sau đây <b>sai</b>?",
            options: ["$AB = DE$", "$\\widehat{B} = \\widehat{E}$", "$BC = EF$", "$AC = EF$"],
            answer: 3,
            explain: "Các đỉnh tương ứng: $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$. Cạnh tương ứng với $AC$ là $DF$, không phải $EF$."
          },
          {
            id: "d1q5", level: "vua", source: "SGK Bài 16 (biến đổi)",
            q: "Một tam giác cân có góc ở đỉnh bằng $40^\\circ$. Mỗi góc ở đáy của tam giác đó bằng",
            options: ["$40^\\circ$", "$80^\\circ$", "$140^\\circ$", "$70^\\circ$"],
            answer: 3,
            explain: "Hai góc ở đáy bằng nhau, tổng của chúng là $180^\\circ - 40^\\circ = 140^\\circ$. Mỗi góc ở đáy bằng $140^\\circ : 2 = 70^\\circ$."
          },
          {
            id: "d1q6", level: "vua", source: "SGK Bài 13 (biến đổi)",
            q: "Trong hình dưới đây, các đoạn thẳng có cùng số gạch thì bằng nhau. Hai tam giác $ABC$ và $DEF$ bằng nhau theo trường hợp nào?" +
              fig({ w: 320, h: 130, P: { A: [60, 20], B: [20, 110], C: [140, 110], D: [220, 20], E: [180, 110], F: [300, 110] },
                seg: [["A", "B"], ["B", "C"], ["A", "C"], ["D", "E"], ["E", "F"], ["D", "F"]],
                tick: [["A", "B", 1], ["D", "E", 1], ["B", "C", 2], ["E", "F", 2], ["A", "C", 3], ["D", "F", 3]],
                off: { A: [0, -8], D: [0, -8], B: [0, 18], C: [0, 18], E: [0, 18], F: [0, 18] } }),
            options: ["cạnh – cạnh – cạnh", "cạnh – góc – cạnh", "góc – cạnh – góc", "cạnh huyền – góc nhọn"],
            answer: 0,
            explain: "Hình cho $AB = DE$, $BC = EF$, $AC = DF$ (ba cặp cạnh tương ứng bằng nhau), không cho góc nào. Vậy $\\Delta ABC = \\Delta DEF$ (c.c.c)."
          },
          {
            id: "d1q7", level: "vua", source: "SGK Bài tập cuối chương IV – BT 4.33 (biến đổi)",
            q: "Tam giác $ABC$ có $\\widehat{B} = \\widehat{A} + 15^\\circ$ và $\\widehat{C} = \\widehat{A} + 30^\\circ$. Số đo $\\widehat{A}$ là",
            options: ["$50^\\circ$", "$45^\\circ$", "$60^\\circ$", "$35^\\circ$"],
            answer: 1,
            explain: "$\\widehat{A} + (\\widehat{A} + 15^\\circ) + (\\widehat{A} + 30^\\circ) = 180^\\circ \\Rightarrow 3\\widehat{A} = 135^\\circ \\Rightarrow \\widehat{A} = 45^\\circ$. (Khi đó $\\widehat{B} = 60^\\circ$, $\\widehat{C} = 75^\\circ$.)"
          },
          {
            id: "d1q8", level: "vua", source: "SBT Ôn tập chương IV – câu 7",
            q: "Khẳng định nào sau đây đúng về đường trung trực của đoạn thẳng $AB$?",
            options: ["Là đường thẳng bất kì đi qua trung điểm của $AB$", "Là đường thẳng bất kì vuông góc với $AB$", "Là đường thẳng vuông góc với $AB$ tại trung điểm của $AB$", "Là đường thẳng đi qua $A$ và vuông góc với $AB$"],
            answer: 2,
            explain: "Đường trung trực phải thỏa mãn <b>cả hai</b> điều kiện: vuông góc với $AB$ và đi qua trung điểm của $AB$."
          },
          {
            id: "d1q9", level: "vua", source: "SGK Bài tập cuối chương IV – BT 4.35",
            q: "Trong hình dưới đây, $OA = OB$ và $\\widehat{OAM} = \\widehat{OBN}$ ($A$ thuộc $ON$, $B$ thuộc $OM$). Khẳng định nào đúng?" +
              fig({ w: 290, h: 200, P: { O: [30, 100], A: [140, 65], N: [250, 30], B: [140, 135], M: [250, 170] },
                seg: [["O", "N"], ["O", "M"], ["A", "M"], ["B", "N"]],
                tick: [["O", "A", 1], ["O", "B", 1]], arc: [["A", "O", "M", 1], ["B", "O", "N", 1]],
                off: { A: [0, -10], B: [0, 22] } }),
            options: ["$\\Delta OAM = \\Delta OBN$ (c.g.c)", "$\\Delta OAM = \\Delta ONB$ (g.c.g)", "$\\Delta OAM = \\Delta OBN$ (c.c.c)", "$\\Delta OAM = \\Delta OBN$ (g.c.g)"],
            answer: 3,
            explain: "Xét $\\Delta OAM$ và $\\Delta OBN$: $\\widehat{O}$ chung; $OA = OB$; $\\widehat{OAM} = \\widehat{OBN}$. Cạnh $OA$ (và $OB$) nằm giữa hai góc đã biết nên $\\Delta OAM = \\Delta OBN$ (g.c.g), với $O \\leftrightarrow O$, $A \\leftrightarrow B$, $M \\leftrightarrow N$. Viết $\\Delta ONB$ là sai thứ tự đỉnh."
          },
          {
            id: "d1q10", level: "kho", source: "SGK Bài tập cuối chương IV – BT 4.39",
            q: "Cho tam giác $ABC$ vuông tại $A$ có $\\widehat{B} = 60^\\circ$. Trên cạnh $BC$ lấy điểm $M$ sao cho $\\widehat{CAM} = 30^\\circ$. Tam giác $ABM$ là",
            options: ["tam giác đều", "tam giác vuông cân", "tam giác tù", "tam giác cân nhưng không đều"],
            answer: 0,
            explain: "$\\widehat{BAM} = 90^\\circ - 30^\\circ = 60^\\circ$, $\\widehat{B} = 60^\\circ$, nên $\\widehat{AMB} = 180^\\circ - 60^\\circ - 60^\\circ = 60^\\circ$. Tam giác có ba góc $60^\\circ$ là tam giác đều."
          },
          {
            id: "d1q11", level: "kho", source: "SBT Ôn tập chương IV – BT 4.59",
            q: "Trong hình dưới đây, $B, C, D, E$ thẳng hàng và $BC = CD = DE = AC = AD$. Số đo $\\widehat{BAE}$ là" +
              fig({ w: 310, h: 165, P: { A: [155, 62], B: [20, 140], C: [110, 140], D: [200, 140], E: [290, 140] },
                seg: [["B", "E"], ["A", "B"], ["A", "C"], ["A", "D"], ["A", "E"]],
                tick: [["B", "C", 1], ["C", "D", 1], ["D", "E", 1], ["A", "C", 1], ["A", "D", 1]],
                off: { A: [0, -10], B: [0, 20], C: [0, 20], D: [0, 20], E: [0, 20] } }),
            options: ["$90^\\circ$", "$120^\\circ$", "$150^\\circ$", "$100^\\circ$"],
            answer: 1,
            explain: "Tam giác $ACD$ đều nên $\\widehat{ACD} = 60^\\circ$, suy ra $\\widehat{ACB} = 180^\\circ - 60^\\circ = 120^\\circ$. Tam giác $ACB$ cân tại $C$ ($CA = CB$) nên $\\widehat{CAB} = \\widehat{B} = (180^\\circ - 120^\\circ) : 2 = 30^\\circ$. Tương tự $\\widehat{DAE} = 30^\\circ$. Vậy $\\widehat{BAE} = 30^\\circ + 60^\\circ + 30^\\circ = 120^\\circ$."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SBT Ôn tập chương IV – BT 4.55a", maxPoints: 1.5,
            q: "Cho hình dưới đây, trong đó $DA = DB$ và $CA = CB$. Chứng minh $\\Delta DAC = \\Delta DBC$, từ đó suy ra $\\widehat{DAC} = \\widehat{DBC}$." +
              fig({ w: 320, h: 205, P: { D: [160, 20], A: [40, 180], B: [280, 180], C: [160, 125] },
                seg: [["D", "A"], ["D", "B"], ["D", "C"], ["C", "A"], ["C", "B"], ["A", "B"]],
                tick: [["D", "A", 2], ["D", "B", 2], ["C", "A", 1], ["C", "B", 1]], off: { C: [14, -4] } }),
            modelAnswer: "Xét $\\Delta DAC$ và $\\Delta DBC$ có:<br>" +
              "• $DA = DB$ (giả thiết);<br>• $CA = CB$ (giả thiết);<br>• $DC$ là cạnh chung.<br>" +
              "Do đó $\\Delta DAC = \\Delta DBC$ (c.c.c).<br>" +
              "Suy ra $\\widehat{DAC} = \\widehat{DBC}$ (hai góc tương ứng).",
            rubric: [
              { pts: 0.5, text: "Nêu đủ ba cặp yếu tố bằng nhau: $DA = DB$, $CA = CB$, $DC$ chung." },
              { pts: 0.5, text: "Kết luận đúng $\\Delta DAC = \\Delta DBC$ (c.c.c), viết đúng thứ tự đỉnh." },
              { pts: 0.5, text: "Suy ra $\\widehat{DAC} = \\widehat{DBC}$ (góc tương ứng)." }
            ]
          },
          {
            id: "d1e2", level: "kho", source: "SGK Bài tập cuối chương IV – BT 4.38", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 120^\\circ$. Trên cạnh $BC$ lấy hai điểm $M, N$ sao cho $MA \\perp AB$ và $NA \\perp AC$.<br>a) Chứng minh $\\Delta BAM = \\Delta CAN$.<br>b) Chứng minh tam giác $ANB$ cân tại $N$." +
              fig({ w: 320, h: 175, P: { A: e2A, B: e2B, C: e2C, M: e2M, N: e2N },
                seg: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "M"], ["A", "N"]],
                tick: [["A", "B", 1], ["A", "C", 1]], right: [["A", "B", "M"], ["A", "C", "N"]],
                off: { A: [0, -10], M: [0, 20], N: [0, 20], B: [-4, 18], C: [4, 18] } }),
            modelAnswer: "Tam giác $ABC$ cân tại $A$ nên $\\widehat{B} = \\widehat{C} = (180^\\circ - 120^\\circ) : 2 = 30^\\circ$.<br>" +
              "a) Xét $\\Delta BAM$ và $\\Delta CAN$ có: $\\widehat{BAM} = \\widehat{CAN} = 90^\\circ$; $AB = AC$; $\\widehat{B} = \\widehat{C}$.<br>" +
              "Do đó $\\Delta BAM = \\Delta CAN$ (g.c.g) (hoặc: hai tam giác vuông có cạnh góc vuông và góc nhọn kề bằng nhau).<br>" +
              "b) $\\widehat{BAN} = \\widehat{BAC} - \\widehat{NAC} = 120^\\circ - 90^\\circ = 30^\\circ$. Tam giác $ANB$ có $\\widehat{BAN} = \\widehat{B} = 30^\\circ$ nên cân tại $N$.",
            rubric: [
              { pts: 0.5, text: "Tính được (hoặc nêu được) $\\widehat{B} = \\widehat{C} = 30^\\circ$." },
              { pts: 0.5, text: "Câu a: nêu đủ ba yếu tố và kết luận $\\Delta BAM = \\Delta CAN$ (g.c.g)." },
              { pts: 0.5, text: "Câu b: tính $\\widehat{BAN} = 30^\\circ = \\widehat{B}$, kết luận tam giác $ANB$ cân tại $N$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SBT Ôn tập chương IV – câu 2",
            q: "Khẳng định nào sau đây <b>sai</b>?",
            options: ["Tổng ba góc của một tam giác bằng $180^\\circ$", "Hai góc nhọn của một tam giác vuông có tổng bằng $90^\\circ$", "Tổng hai góc nhọn của một tam giác tù lớn hơn $90^\\circ$", "Góc lớn nhất của một tam giác nhọn nhỏ hơn $90^\\circ$"],
            answer: 2,
            explain: "Trong tam giác tù, góc tù lớn hơn $90^\\circ$ nên tổng hai góc còn lại $= 180^\\circ - (\\text{góc tù})$ <b>nhỏ hơn</b> $90^\\circ$."
          },
          {
            id: "d2q2", level: "de", source: "SGK Bài 12 (biến đổi)",
            q: "Một tam giác có ba góc lần lượt bằng $30^\\circ$, $60^\\circ$, $90^\\circ$. Tam giác đó là",
            options: ["tam giác nhọn", "tam giác vuông", "tam giác tù", "tam giác cân"],
            answer: 1,
            explain: "Tam giác có một góc bằng $90^\\circ$ là tam giác vuông. Ba góc khác nhau nên không cân."
          },
          {
            id: "d2q3", level: "de", source: "SBT Ôn tập chương IV – BT 4.54",
            q: "Trong hình dưới đây, tam giác $DEF$ có $DE = DF$ và $\\widehat{F} = 55^\\circ$. Số đo $\\widehat{D}$ là" +
              fig({ w: 240, h: 175, P: { D: [120, 30], E: [40, 150], F: [200, 150] },
                seg: [["D", "E"], ["D", "F"], ["E", "F"]], tick: [["D", "E", 1], ["D", "F", 1]],
                ang: [["F", "E", "D", "55°", 30], ["D", "E", "F", "?", 28]] }),
            options: ["$55^\\circ$", "$65^\\circ$", "$125^\\circ$", "$70^\\circ$"],
            answer: 3,
            explain: "Tam giác $DEF$ cân tại $D$ nên $\\widehat{E} = \\widehat{F} = 55^\\circ$. Do đó $\\widehat{D} = 180^\\circ - 2 \\cdot 55^\\circ = 70^\\circ$."
          },
          {
            id: "d2q4", level: "de", source: "SGK Bài 13 (biến đổi)",
            q: "Cho $\\Delta MNP = \\Delta HIK$ với $MN = 5$ cm, $NP = 7$ cm, $MP = 6$ cm. Độ dài cạnh $IK$ là",
            options: ["$7$ cm", "$5$ cm", "$6$ cm", "$18$ cm"],
            answer: 0,
            explain: "$N \\leftrightarrow I$, $P \\leftrightarrow K$ nên cạnh $IK$ tương ứng với cạnh $NP$: $IK = NP = 7$ cm."
          },
          {
            id: "d2q5", level: "vua", source: "SGK Bài 16 (biến đổi)",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{B} = 50^\\circ$. Số đo $\\widehat{A}$ là",
            options: ["$80^\\circ$", "$50^\\circ$", "$100^\\circ$", "$65^\\circ$"],
            answer: 0,
            explain: "Cân tại $A$ nên $\\widehat{C} = \\widehat{B} = 50^\\circ$, do đó $\\widehat{A} = 180^\\circ - 2 \\cdot 50^\\circ = 80^\\circ$."
          },
          {
            id: "d2q6", level: "vua", source: "SGK Bài 15 (biến đổi)",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $BC = EF$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta DEF$?",
            options: ["$\\widehat{B} = \\widehat{F}$", "$AB = DE$", "$\\widehat{A} = \\widehat{D}$", "$AB = EF$"],
            answer: 1,
            explain: "$BC$ và $EF$ là hai cạnh huyền. Thêm $AB = DE$ (cặp cạnh góc vuông tương ứng) thì hai tam giác vuông bằng nhau theo trường hợp cạnh huyền – cạnh góc vuông. $\\widehat{A} = \\widehat{D}$ đã có sẵn (đều vuông); $\\widehat{B} = \\widehat{F}$ và $AB = EF$ không phải các yếu tố tương ứng."
          },
          {
            id: "d2q7", level: "vua", source: "SGK Bài tập cuối chương IV – BT 4.33",
            q: "Một tam giác có ba góc là $60^\\circ$, $y$ và $2y$. Giá trị của $y$ là",
            options: ["$60^\\circ$", "$30^\\circ$", "$40^\\circ$", "$80^\\circ$"],
            answer: 2,
            explain: "$60^\\circ + y + 2y = 180^\\circ \\Rightarrow 3y = 120^\\circ \\Rightarrow y = 40^\\circ$."
          },
          {
            id: "d2q8", level: "vua", source: "SGK Bài 16 (biến đổi)",
            q: "Điểm $M$ nằm trên đường trung trực của đoạn thẳng $AB$, $MA = 4$ cm và $AB = 6$ cm. Độ dài $MB$ là",
            options: ["$3$ cm", "$6$ cm", "$2$ cm", "$4$ cm"],
            answer: 3,
            explain: "Điểm nằm trên đường trung trực của $AB$ thì cách đều $A$ và $B$: $MB = MA = 4$ cm. (Độ dài $AB$ là dữ kiện thừa.)"
          },
          {
            id: "d2q9", level: "vua", source: "SBT Ôn tập chương IV – BT 4.58",
            q: "Đường thẳng $d$ đi qua trung điểm $M$ của đoạn thẳng $AB$; $AP$ và $BQ$ vuông góc với $d$ ($P, Q$ thuộc $d$) như hình dưới. Hai tam giác vuông $AMP$ và $BMQ$ bằng nhau theo trường hợp nào?" +
              fig({ w: 320, h: 200, P: { A: h9A, B: h9B, M: h9M, P: h9P, Q: h9Q },
                seg: [["A", "B"], [h9d1, h9d2], ["A", "P"], ["B", "Q"]],
                tick: [["A", "M", 1], ["M", "B", 1]], right: [["P", "A", "M"], ["Q", "B", "M"]],
                off: { M: [10, 18], P: [-18, 10], Q: [18, 2] }, txt: [[h9d1[0] - 12, h9d1[1] + 8, "d"]] }),
            options: ["cạnh huyền – cạnh góc vuông", "hai cạnh góc vuông", "cạnh – cạnh – cạnh", "cạnh huyền – góc nhọn"],
            answer: 3,
            explain: "Hai tam giác vuông $AMP$ (vuông tại $P$) và $BMQ$ (vuông tại $Q$) có: cạnh huyền $AM = BM$ ($M$ là trung điểm); $\\widehat{AMP} = \\widehat{BMQ}$ (đối đỉnh). Vậy chúng bằng nhau theo trường hợp cạnh huyền – góc nhọn."
          },
          {
            id: "d2q10", level: "kho", source: "SBT Ôn tập chương IV – BT 4.51 (biến đổi)",
            q: "Cho tam giác $ABC$ có $\\widehat{B} = 35^\\circ$; điểm $D$ thuộc cạnh $BC$ sao cho $AD = AC$ và $\\widehat{ADC} = 75^\\circ$; $DE \\perp AB$ tại $E$ (hình dưới). Số đo $\\widehat{EDA}$ là" +
              fig({ w: 240, h: 175, P: { A: h10A, B: h10B, C: h10C, D: h10D, E: h10E },
                seg: [["A", "B"], ["B", "C"], ["A", "C"], ["A", "D"], ["D", "E"]],
                tick: [["A", "D", 1], ["A", "C", 1]], right: [["E", "D", "A"]],
                ang: [["B", "C", "A", "35°", 34], ["D", "C", "A", "75°", 24]],
                off: { D: [0, 20], B: [-8, 16], C: [8, 16] } }),
            options: ["$55^\\circ$", "$50^\\circ$", "$40^\\circ$", "$35^\\circ$"],
            answer: 1,
            explain: "Tam giác $BDE$ vuông tại $E$: $\\widehat{BDE} = 90^\\circ - 35^\\circ = 55^\\circ$. Ta có $\\widehat{ADB} = 180^\\circ - 75^\\circ = 105^\\circ$. Vậy $\\widehat{EDA} = \\widehat{ADB} - \\widehat{BDE} = 105^\\circ - 55^\\circ = 50^\\circ$."
          },
          {
            id: "d2q11", level: "kho", source: "mới",
            q: "Cho tam giác $ABC$ có $\\widehat{A} = 70^\\circ$. Các tia phân giác của góc $B$ và góc $C$ cắt nhau tại $I$. Số đo $\\widehat{BIC}$ là",
            options: ["$110^\\circ$", "$140^\\circ$", "$125^\\circ$", "$55^\\circ$"],
            answer: 2,
            explain: "$\\widehat{B} + \\widehat{C} = 180^\\circ - 70^\\circ = 110^\\circ$, nên $\\widehat{IBC} + \\widehat{ICB} = 110^\\circ : 2 = 55^\\circ$. Trong tam giác $IBC$: $\\widehat{BIC} = 180^\\circ - 55^\\circ = 125^\\circ$."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SGK Bài tập cuối chương IV – BT 4.36 (biến đổi)", maxPoints: 1.5,
            q: "Cho hình dưới đây, trong đó $AD = BC$ và $\\widehat{BAD} = \\widehat{ABC}$ ($C, D$ nằm cùng phía đối với $AB$). Chứng minh $\\Delta ABD = \\Delta BAC$, từ đó suy ra $BD = AC$." +
              fig({ w: 320, h: 195, P: { D: [20, 40], C: [300, 40], A: [70, 170], B: [250, 170] },
                seg: [["A", "B"], ["A", "D"], ["B", "C"], ["A", "C"], ["B", "D"]],
                tick: [["A", "D", 1], ["B", "C", 1]], arc: [["A", "B", "D", 1], ["B", "A", "C", 1]] }),
            modelAnswer: "Xét $\\Delta ABD$ và $\\Delta BAC$ có:<br>" +
              "• $AD = BC$ (giả thiết);<br>• $\\widehat{BAD} = \\widehat{ABC}$ (giả thiết);<br>• $AB$ là cạnh chung.<br>" +
              "Góc $\\widehat{BAD}$ xen giữa hai cạnh $AB, AD$; góc $\\widehat{ABC}$ xen giữa hai cạnh $BA, BC$. Do đó $\\Delta ABD = \\Delta BAC$ (c.g.c).<br>" +
              "Suy ra $BD = AC$ (hai cạnh tương ứng).",
            rubric: [
              { pts: 0.5, text: "Nêu đủ ba yếu tố: $AD = BC$, $\\widehat{BAD} = \\widehat{ABC}$, $AB$ chung." },
              { pts: 0.5, text: "Kết luận $\\Delta ABD = \\Delta BAC$ (c.g.c), đúng thứ tự đỉnh." },
              { pts: 0.5, text: "Suy ra $BD = AC$ (cạnh tương ứng)." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SBT Ôn tập chương IV – BT 4.57", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ cân tại $A$, $M$ là trung điểm của $BC$. Kẻ $MP \\perp AB$ ($P$ thuộc $AB$) và $MQ \\perp AC$ ($Q$ thuộc $AC$).<br>a) Chứng minh $MP = MQ$ và $AP = AQ$.<br>b) Đường thẳng $AM$ có vuông góc với $PQ$ không? Vì sao?" +
              fig({ w: 300, h: 205, P: { A: f2A, B: f2B, C: f2C, M: f2M, P: f2P, Q: f2Q },
                seg: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "M"], ["M", "P"], ["M", "Q"], ["P", "Q"]],
                tick: [["B", "M", 1], ["M", "C", 1], ["A", "B", 2], ["A", "C", 2]], right: [["P", "M", "A"], ["Q", "M", "A"]],
                off: { M: [0, 20], P: [-12, 0], Q: [12, 0] } }),
            modelAnswer: "a) Tam giác $ABC$ cân tại $A$ nên $\\widehat{B} = \\widehat{C}$.<br>" +
              "Xét hai tam giác vuông $BPM$ (vuông tại $P$) và $CQM$ (vuông tại $Q$): cạnh huyền $BM = CM$; góc nhọn $\\widehat{B} = \\widehat{C}$.<br>" +
              "Do đó $\\Delta BPM = \\Delta CQM$ (cạnh huyền – góc nhọn), suy ra $MP = MQ$ và $BP = CQ$.<br>" +
              "Vì $AB = AC$ nên $AP = AB - BP = AC - CQ = AQ$.<br>" +
              "b) Có. Vì $AP = AQ$ nên $A$ nằm trên đường trung trực của $PQ$; vì $MP = MQ$ nên $M$ cũng nằm trên đường trung trực của $PQ$. Do đó $AM$ là đường trung trực của $PQ$, nên $AM \\perp PQ$.",
            rubric: [
              { pts: 0.5, text: "Chứng minh đúng $\\Delta BPM = \\Delta CQM$ (cạnh huyền – góc nhọn)." },
              { pts: 0.5, text: "Suy ra $MP = MQ$, $BP = CQ$ và lập luận $AP = AQ$." },
              { pts: 0.5, text: "Câu b: chỉ ra $A$, $M$ cách đều $P, Q$ nên $AM$ là đường trung trực của $PQ$, kết luận $AM \\perp PQ$." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SBT Ôn tập chương IV – câu 3",
            q: "Khẳng định nào sau đây đúng?",
            options: ["Hai tam giác có ba cặp góc tương ứng bằng nhau thì bằng nhau", "Hai tam giác có ba cặp cạnh tương ứng bằng nhau thì bằng nhau", "Hai tam giác có hai cặp cạnh và một cặp góc bất kì tương ứng bằng nhau thì bằng nhau", "Hai tam giác có một cặp cạnh bằng nhau thì bằng nhau"],
            answer: 1,
            explain: "Đó là trường hợp c.c.c. Ba góc bằng nhau chưa đủ (tam giác lớn, tam giác nhỏ cùng hình dạng); với hai cạnh và một góc thì góc phải <b>xen giữa</b> hai cạnh."
          },
          {
            id: "d3q2", level: "de", source: "SBT Ôn tập chương IV – BT 4.53d",
            q: "Mỗi góc nhọn của một tam giác vuông cân bằng",
            options: ["$30^\\circ$", "$60^\\circ$", "$90^\\circ$", "$45^\\circ$"],
            answer: 3,
            explain: "Hai góc nhọn bằng nhau và có tổng $90^\\circ$, nên mỗi góc bằng $45^\\circ$."
          },
          {
            id: "d3q3", level: "de", source: "SBT Ôn tập chương IV – BT 4.53a",
            q: "Tam giác $ABC$ cân tại $A$ có $\\widehat{B} = 60^\\circ$. Khi đó tam giác $ABC$ là",
            options: ["tam giác đều", "tam giác vuông", "tam giác tù", "tam giác vuông cân"],
            answer: 0,
            explain: "$\\widehat{C} = \\widehat{B} = 60^\\circ$ nên $\\widehat{A} = 60^\\circ$. Tam giác có ba góc bằng $60^\\circ$ là tam giác đều."
          },
          {
            id: "d3q4", level: "de", source: "SBT Ôn tập chương IV – BT 4.54",
            q: "Trong hình dưới đây, tam giác $MNP$ vuông tại $N$ và $\\widehat{P} = 40^\\circ$. Số đo $\\widehat{M}$ là" +
              fig({ w: 230, h: 175, P: { M: [40, 25], N: [40, 150], P: [190, 150] },
                seg: [["M", "N"], ["N", "P"], ["M", "P"]], right: [["N", "M", "P"]],
                ang: [["P", "N", "M", "40°", 34], ["M", "N", "P", "?", 26]] }),
            options: ["$40^\\circ$", "$50^\\circ$", "$140^\\circ$", "$60^\\circ$"],
            answer: 1,
            explain: "Hai góc nhọn của tam giác vuông phụ nhau: $\\widehat{M} = 90^\\circ - 40^\\circ = 50^\\circ$."
          },
          {
            id: "d3q5", level: "vua", source: "SGK Bài 13 (biến đổi)",
            q: "Cho $\\Delta ABC = \\Delta MNP$ với $\\widehat{A} = 50^\\circ$ và $\\widehat{N} = 70^\\circ$. Số đo $\\widehat{P}$ là",
            options: ["$50^\\circ$", "$70^\\circ$", "$60^\\circ$", "$120^\\circ$"],
            answer: 2,
            explain: "$\\widehat{M} = \\widehat{A} = 50^\\circ$ (góc tương ứng). Trong tam giác $MNP$: $\\widehat{P} = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$."
          },
          {
            id: "d3q6", level: "vua", source: "SGK Bài 14 (biến đổi)",
            q: "Tam giác $ABC$ và tam giác $DEF$ có $AB = DE$, $BC = EF$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta DEF$ theo trường hợp cạnh – góc – cạnh?",
            options: ["$\\widehat{A} = \\widehat{D}$", "$\\widehat{C} = \\widehat{F}$", "$AC = DF$", "$\\widehat{B} = \\widehat{E}$"],
            answer: 3,
            explain: "Góc xen giữa hai cạnh $AB, BC$ là $\\widehat{B}$; góc xen giữa $DE, EF$ là $\\widehat{E}$. Cần $\\widehat{B} = \\widehat{E}$. ($AC = DF$ cũng làm hai tam giác bằng nhau nhưng theo trường hợp c.c.c.)"
          },
          {
            id: "d3q7", level: "vua", source: "SGK Bài 14 (biến đổi)",
            q: "Tam giác $ABC$ và tam giác $MNP$ có $\\widehat{B} = \\widehat{N}$, $BC = NP$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta MNP$ theo trường hợp góc – cạnh – góc?",
            options: ["$AB = MP$", "$\\widehat{C} = \\widehat{P}$", "$\\widehat{C} = \\widehat{M}$", "$AC = NP$"],
            answer: 1,
            explain: "Hai góc kề cạnh $BC$ là $\\widehat{B}, \\widehat{C}$; hai góc kề cạnh $NP$ là $\\widehat{N}, \\widehat{P}$. Đã có $\\widehat{B} = \\widehat{N}$, cần thêm $\\widehat{C} = \\widehat{P}$."
          },
          {
            id: "d3q8", level: "vua", source: "SGK Bài 16 (biến đổi)",
            q: "Điểm $M$ cách đều hai đầu mút của đoạn thẳng $AB$ ($MA = MB$). Khẳng định nào sau đây luôn đúng?",
            options: ["$M$ là trung điểm của $AB$", "$MA \\perp AB$", "$M$ nằm trên đường trung trực của $AB$", "$M$ nằm trên đoạn thẳng $AB$"],
            answer: 2,
            explain: "Điểm cách đều hai đầu mút của đoạn thẳng thì nằm trên đường trung trực của đoạn thẳng đó. $M$ chỉ là trung điểm khi nó nằm trên đoạn $AB$, điều này không luôn xảy ra."
          },
          {
            id: "d3q9", level: "vua", source: "SGK Bài tập cuối chương IV – BT 4.33",
            q: "Một tam giác có ba góc là $x$, $x + 20^\\circ$ và $x + 10^\\circ$. Góc lớn nhất của tam giác đó bằng",
            options: ["$50^\\circ$", "$60^\\circ$", "$70^\\circ$", "$80^\\circ$"],
            answer: 2,
            explain: "$x + (x + 20^\\circ) + (x + 10^\\circ) = 180^\\circ \\Rightarrow 3x = 150^\\circ \\Rightarrow x = 50^\\circ$. Ba góc là $50^\\circ, 70^\\circ, 60^\\circ$; lớn nhất là $70^\\circ$."
          },
          {
            id: "d3q10", level: "kho", source: "SGK Bài tập cuối chương IV – BT 4.37 (biến đổi)",
            q: "Điểm $M$ nằm trên đường trung trực của đoạn thẳng $AB$ (không nằm trên $AB$) và $\\widehat{MAB} = 50^\\circ$. Số đo $\\widehat{AMB}$ là",
            options: ["$80^\\circ$", "$50^\\circ$", "$100^\\circ$", "$40^\\circ$"],
            answer: 0,
            explain: "$M$ thuộc đường trung trực của $AB$ nên $MA = MB$: tam giác $MAB$ cân tại $M$, $\\widehat{MBA} = \\widehat{MAB} = 50^\\circ$. Vậy $\\widehat{AMB} = 180^\\circ - 2 \\cdot 50^\\circ = 80^\\circ$."
          },
          {
            id: "d3q11", level: "kho", source: "mới",
            q: "Cho tam giác $ABC$ vuông tại $A$ có $\\widehat{C} = 30^\\circ$. Tia phân giác của góc $B$ cắt $AC$ tại $D$. Số đo $\\widehat{ADB}$ là",
            options: ["$30^\\circ$", "$120^\\circ$", "$75^\\circ$", "$60^\\circ$"],
            answer: 3,
            explain: "$\\widehat{ABC} = 90^\\circ - 30^\\circ = 60^\\circ$, nên $\\widehat{ABD} = 30^\\circ$. Tam giác $ABD$ vuông tại $A$: $\\widehat{ADB} = 90^\\circ - 30^\\circ = 60^\\circ$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SGK Bài tập cuối chương IV – BT 4.37", maxPoints: 1.5,
            q: "Cho $M, N$ là hai điểm phân biệt nằm trên đường trung trực của đoạn thẳng $AB$ sao cho $AM = AN$ (hình dưới). Chứng minh $MB = NB$ và $\\widehat{AMB} = \\widehat{ANB}$." +
              fig({ w: 280, h: 220, P: { A: [60, 110], B: [220, 110], M: [140, 30], N: [140, 190] },
                dash: [[[140, 14], [140, 206]]],
                seg: [["A", "B"], ["A", "M"], ["B", "M"], ["A", "N"], ["B", "N"]],
                tick: [["A", [140, 110], 1], [[140, 110], "B", 1], ["A", "M", 2], ["A", "N", 2]], right: [[[140, 110], "B", "M"]],
                off: { A: [-12, 4], B: [12, 4], M: [14, -2], N: [14, 12] } }),
            modelAnswer: "$M$ nằm trên đường trung trực của $AB$ nên $MA = MB$; $N$ nằm trên đường trung trực của $AB$ nên $NA = NB$.<br>" +
              "Mà $AM = AN$, do đó $MB = MA = NA = NB$, tức $MB = NB$.<br>" +
              "Xét $\\Delta AMB$ và $\\Delta ANB$ có: $AM = AN$; $MB = NB$; $AB$ là cạnh chung. Do đó $\\Delta AMB = \\Delta ANB$ (c.c.c), suy ra $\\widehat{AMB} = \\widehat{ANB}$.",
            rubric: [
              { pts: 0.5, text: "Nêu được $MA = MB$ và $NA = NB$ (tính chất đường trung trực)." },
              { pts: 0.5, text: "Suy ra đúng $MB = NB$." },
              { pts: 0.5, text: "Chứng minh $\\Delta AMB = \\Delta ANB$ (c.c.c) và suy ra $\\widehat{AMB} = \\widehat{ANB}$." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SGK Bài 16 (biến đổi)", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ cân tại $A$. Tia phân giác của góc $A$ cắt $BC$ tại $D$.<br>a) Chứng minh $\\Delta ABD = \\Delta ACD$.<br>b) Chứng minh $AD$ là đường trung trực của đoạn thẳng $BC$." +
              fig({ w: 300, h: 200, P: { A: [150, 25], B: [40, 175], C: [260, 175], D: [150, 175] },
                seg: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "D"]],
                tick: [["A", "B", 1], ["A", "C", 1]], arc: [["A", "B", "D", 1], ["A", "D", "C", 1]],
                off: { D: [0, 20] } }),
            modelAnswer: "a) Xét $\\Delta ABD$ và $\\Delta ACD$ có: $AB = AC$ (tam giác cân tại $A$); $\\widehat{BAD} = \\widehat{CAD}$ ($AD$ là tia phân giác); $AD$ là cạnh chung.<br>" +
              "Do đó $\\Delta ABD = \\Delta ACD$ (c.g.c).<br>" +
              "b) Từ câu a suy ra $DB = DC$ và $\\widehat{ADB} = \\widehat{ADC}$. Mà $\\widehat{ADB} + \\widehat{ADC} = 180^\\circ$ (hai góc kề bù) nên $\\widehat{ADB} = \\widehat{ADC} = 90^\\circ$, tức $AD \\perp BC$.<br>" +
              "$D$ là trung điểm của $BC$ và $AD \\perp BC$ tại $D$, nên $AD$ là đường trung trực của $BC$.",
            rubric: [
              { pts: 0.5, text: "Câu a: nêu đủ ba yếu tố và kết luận $\\Delta ABD = \\Delta ACD$ (c.g.c)." },
              { pts: 0.5, text: "Câu b: suy ra $DB = DC$ ($D$ là trung điểm của $BC$)." },
              { pts: 0.5, text: "Câu b: chứng minh $\\widehat{ADB} = 90^\\circ$ (kề bù và bằng nhau), kết luận $AD$ là đường trung trực của $BC$." }
            ]
          }
        ]
      }
    ]
  });
})();
