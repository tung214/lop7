(function () {
  // ---------- Hình vẽ SVG (dùng currentColor để hợp chế độ sáng/tối) ----------
  // o = { w, h, max, pts: {Tên: [x, y]}, segs: [[P, Q, số gạch, nét đứt?]], ang: [[đỉnh, P, Q, số cung]],
  //       lab: {Tên: [dx, dy]} (vị trí nhãn), nolab: [tên không ghi nhãn], dots: [tên], txt: [[x, y, "chữ"]] }
  function f(v) { return (+v).toFixed(1); }
  function fig(o) {
    var P = o.pts, W = o.w || 300, H = o.h || 170;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + (o.max || 320) + 'px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">';
    (o.segs || []).forEach(function (g) {
      var a = P[g[0]], b = P[g[1]];
      s += '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" stroke="currentColor" stroke-width="1.6"' + (g[3] ? ' stroke-dasharray="5 4"' : '') + '/>';
      var n = g[2] || 0;
      if (n) {
        var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
        var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
        for (var i = 0; i < n; i++) {
          var off = (i - (n - 1) / 2) * 4.5, cx = mx + ux * off, cy = my + uy * off;
          s += '<line x1="' + f(cx - nx * 5) + '" y1="' + f(cy - ny * 5) + '" x2="' + f(cx + nx * 5) + '" y2="' + f(cy + ny * 5) + '" stroke="currentColor" stroke-width="1.4"/>';
        }
      }
    });
    (o.ang || []).forEach(function (g) {
      var v = P[g[0]], p = P[g[1]], q = P[g[2]];
      var a1 = Math.atan2(p[1] - v[1], p[0] - v[0]), a2 = Math.atan2(q[1] - v[1], q[0] - v[0]);
      var d = a2 - a1;
      while (d <= -Math.PI) d += 2 * Math.PI;
      while (d > Math.PI) d -= 2 * Math.PI;
      var sw = d > 0 ? 1 : 0;
      for (var k = 0; k < (g[3] || 1); k++) {
        var r = 15 + k * 4;
        s += '<path d="M' + f(v[0] + r * Math.cos(a1)) + ' ' + f(v[1] + r * Math.sin(a1)) + ' A' + r + ' ' + r + ' 0 0 ' + sw + ' ' + f(v[0] + r * Math.cos(a2)) + ' ' + f(v[1] + r * Math.sin(a2)) + '" fill="none" stroke="currentColor" stroke-width="1.1"/>';
      }
    });
    (o.dots || []).forEach(function (n) {
      s += '<circle cx="' + f(P[n][0]) + '" cy="' + f(P[n][1]) + '" r="2.8" fill="#e5484d"/>';
    });
    var names = Object.keys(P), cx = 0, cy = 0;
    names.forEach(function (n) { cx += P[n][0]; cy += P[n][1]; });
    cx /= names.length; cy /= names.length;
    names.forEach(function (n) {
      if ((o.nolab || []).indexOf(n) >= 0) return;
      var p = P[n], d = (o.lab || {})[n];
      if (!d) {
        var dx = p[0] - cx, dy = p[1] - cy, l = Math.hypot(dx, dy) || 1;
        d = [dx / l * 13, dy / l * 13];
      }
      s += '<text x="' + f(p[0] + d[0]) + '" y="' + f(p[1] + d[1] + 5) + '" font-size="14" font-style="italic" text-anchor="middle" fill="currentColor">' + n + '</text>';
    });
    (o.txt || []).forEach(function (t) {
      s += '<text x="' + f(t[0]) + '" y="' + f(t[1]) + '" font-size="12" text-anchor="middle" fill="#e5484d">' + t[2] + '</text>';
    });
    return s + '</svg>';
  }

  // Hai tam giác bằng nhau ABC và A'B'C' (các cạnh, góc tương ứng được đánh dấu giống nhau)
  var FIG_DEF = fig({
    w: 320, h: 150, pts: { A: [55, 22], B: [15, 125], C: [135, 125], "A'": [225, 22], "B'": [185, 125], "C'": [305, 125] },
    segs: [["A", "B", 1], ["B", "C", 3], ["C", "A", 2], ["A'", "B'", 1], ["B'", "C'", 3], ["C'", "A'", 2]],
    ang: [["A", "B", "C", 1], ["B", "A", "C", 2], ["C", "A", "B", 3], ["A'", "B'", "C'", 1], ["B'", "A'", "C'", 2], ["C'", "A'", "B'", 3]],
    lab: { A: [0, -12], "A'": [0, -12], B: [-12, 6], "B'": [-12, 6], C: [12, 6], "C'": [12, 6] }
  });

  // Hình "cánh diều": AB = AD, CB = CD, đường chéo AC
  var FIG_KITE = fig({
    w: 300, h: 160, pts: { A: [30, 80], B: [110, 20], C: [270, 80], D: [110, 140] },
    segs: [["A", "B", 1], ["A", "D", 1], ["C", "B", 2], ["C", "D", 2], ["A", "C", 0]],
    lab: { A: [-12, 0], B: [0, -12], C: [12, 0], D: [0, 14] }
  });

  // Cánh diều có số đo góc DAC = 35°, DCA = 65°
  var FIG_KITE2 = fig({
    w: 250, h: 252, max: 250, pts: { A: [20, 125], C: [220, 125], D: [170.8, 19.4], B: [170.8, 230.6] },
    segs: [["A", "D", 1], ["A", "B", 1], ["C", "D", 2], ["C", "B", 2], ["A", "C", 0]],
    ang: [["A", "D", "C", 1], ["C", "D", "A", 1]],
    lab: { A: [-10, 0], C: [12, 0], D: [0, -10], B: [0, 14] },
    txt: [[62, 116, "35°"], [190, 108, "65°"]]
  });

  // Hình thang cân: AD = BC, AC = BD; E là giao điểm của AC và BD. deg = số đo góc ABD (vẽ đúng tỉ lệ)
  function trap(deg, label) {
    var dy = 180 * Math.tan(deg * Math.PI / 180), top = 140 - dy;
    var o = {
      w: 280, h: 170, pts: { A: [20, 140], B: [260, 140], C: [200, top], D: [80, top], E: [140, 140 - dy * 2 / 3] },
      segs: [["A", "B", 0], ["A", "D", 1], ["B", "C", 1], ["A", "C", 2], ["B", "D", 2]],
      lab: { A: [-10, 6], B: [10, 6], C: [8, -8], D: [-8, -8], E: [0, -12] }
    };
    if (label) {
      o.ang = [["B", "A", "D", 1]];
      var m = (180 + deg / 2) * Math.PI / 180;
      o.txt = [[260 + 48 * Math.cos(m), 140 + 48 * Math.sin(m) + 9, label]];
    }
    return fig(o);
  }

  // Hình "mũi tên": MN = MQ, PN = PQ
  var FIG_DART = fig({
    w: 300, h: 175, pts: { M: [150, 15], N: [40, 150], Q: [260, 150], P: [150, 105] },
    segs: [["M", "N", 1], ["M", "Q", 1], ["P", "N", 2], ["P", "Q", 2], ["M", "P", 0]],
    lab: { M: [0, -10], N: [-12, 6], Q: [12, 6], P: [0, 18] }
  });

  // B, D, E, C thẳng hàng; AB = AC, AD = AE, BD = CE
  function line5(withAngle) {
    var o = {
      w: 280, h: 160, pts: { B: [10, 130], D: [100, 130], E: [180, 130], C: [270, 130], A: [140, 20] },
      segs: [["B", "D", 3], ["D", "E", 0], ["E", "C", 3], ["A", "B", 1], ["A", "C", 1], ["A", "D", 2], ["A", "E", 2]],
      lab: { B: [0, 18], D: [0, 18], E: [0, 18], C: [0, 18], A: [0, -10] }
    };
    if (withAngle) { o.ang = [["D", "B", "A", 1]]; o.txt = [[82, 112, "110°"]]; }
    return fig(o);
  }

  // Dựng tia phân giác bằng compa (SGK tr.67 – Vận dụng)
  var FIG_BIS = fig({
    w: 300, h: 160, pts: { O: [30, 140], x: [290, 140], y: [77.9, 8.4], z: [187, 30], A: [120, 140], B: [60.8, 55.4], M: [150.8, 55.4] },
    segs: [["O", "x", 0], ["O", "y", 0], ["O", "z", 0], ["A", "M", 0, 1], ["B", "M", 0, 1]],
    dots: ["A", "B", "M"],
    lab: { O: [-10, 8], x: [0, 14], y: [10, 2], z: [10, 2], A: [0, 16], B: [-12, 2], M: [2, -11] }
  });

  // Hai tam giác ABC và EFD vẽ đối xứng, đánh dấu các cạnh bằng nhau
  var FIG_PAIR = fig({
    w: 320, h: 135, pts: { A: [20, 110], B: [70, 20], C: [110, 110], E: [300, 110], F: [250, 20], D: [210, 110] },
    segs: [["A", "B", 2], ["B", "C", 3], ["C", "A", 1], ["E", "F", 2], ["F", "D", 3], ["D", "E", 1]],
    lab: { A: [-10, 8], B: [0, -10], C: [8, 12], E: [10, 8], F: [0, -10], D: [-8, 12] }
  });

  // Hình 4.6-dạng: AB = CB, AD = CD, góc DAB = 100°, góc BDC = 25°
  var FIG_KITE3 = fig({
    w: 290, h: 205, pts: { D: [20, 100], B: [260, 100], A: [200.9, 15.6], C: [200.9, 184.4] },
    segs: [["D", "A", 2], ["D", "C", 2], ["B", "A", 1], ["B", "C", 1], ["D", "B", 0]],
    ang: [["A", "D", "B", 1], ["D", "B", "C", 1]],
    lab: { D: [-11, 0], B: [12, 0], A: [0, -10], C: [0, 15] },
    txt: [[196, 44, "100°"], [64, 118, "25°"]]
  });

  // Hai cung tròn cùng bán kính tâm A và B cắt nhau tại C, D
  var FIG_RHOMB = fig({
    w: 300, h: 180, pts: { A: [80, 90], B: [220, 90], C: [150, 22], D: [150, 158] },
    segs: [["A", "B", 0, 1], ["A", "C", 1], ["B", "C", 1], ["A", "D", 1], ["B", "D", 1], ["C", "D", 0]],
    lab: { A: [-12, 0], B: [12, 0], C: [0, -10], D: [0, 15] }
  });

  // C, D khác phía AB; AC = BD, BC = AD
  var FIG_PARA = fig({
    w: 300, h: 180, pts: { A: [80, 90], B: [220, 90], C: [195.7, 23.2], D: [104.3, 156.8] },
    segs: [["A", "B", 0], ["A", "C", 1], ["B", "D", 1], ["B", "C", 2], ["A", "D", 2]],
    lab: { A: [-12, 0], B: [12, 0], C: [4, -10], D: [-4, 15] }
  });

  registerLesson({
    id: "c4-b13",
    chapter: 4,
    kind: "lesson",
    title: "Bài 13. Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất của tam giác",
    sgkPages: [63, 67],
    sbtPages: [55, 58],
    objectives: [
      "Nhận biết hai tam giác bằng nhau; chỉ ra các đỉnh, cạnh, góc tương ứng",
      "Viết đúng kí hiệu hai tam giác bằng nhau (đúng thứ tự đỉnh tương ứng)",
      "Giải thích hai tam giác bằng nhau theo trường hợp cạnh – cạnh – cạnh (c.c.c)",
      "Lập luận, chứng minh hình học đơn giản: suy ra các cạnh, góc bằng nhau từ hai tam giác bằng nhau"
    ],

    theory: [
      {
        heading: "1. Hai tam giác bằng nhau",
        html: "Hai tam giác $ABC$ và $A'B'C'$ gọi là <b>bằng nhau</b> nếu chúng có <b>các cạnh tương ứng bằng nhau</b> và <b>các góc tương ứng bằng nhau</b>:" +
          "$$AB = A'B',\\ AC = A'C',\\ BC = B'C';\\quad \\widehat{A} = \\widehat{A'},\\ \\widehat{B} = \\widehat{B'},\\ \\widehat{C} = \\widehat{C'}.$$" +
          "Khi đó ta viết $\\Delta ABC = \\Delta A'B'C'$. Nói cách khác, hai tam giác bằng nhau là hai tam giác có thể đặt \"chồng khít\" lên nhau." +
          FIG_DEF +
          "<ul><li>$A$ và $A'$, $B$ và $B'$, $C$ và $C'$ là các <b>đỉnh tương ứng</b>.</li>" +
          "<li>$\\widehat{A}$ và $\\widehat{A'}$, … là các <b>góc tương ứng</b>; $AB$ và $A'B'$, … là các <b>cạnh tương ứng</b>.</li>" +
          "<li>Trên hình vẽ, các cạnh (góc) bằng nhau thường được đánh dấu bằng cùng một kiểu gạch (cung).</li></ul>"
      },
      {
        heading: "2. Viết kí hiệu đúng thứ tự đỉnh",
        html: "Khi viết $\\Delta ABC = \\Delta DEF$, các đỉnh tương ứng phải được viết <b>theo cùng thứ tự</b>: $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$. Từ đó đọc ngay được:" +
          "<ul><li>Cạnh tương ứng: $AB = DE$, $BC = EF$, $CA = FD$ (lấy hai chữ cái ở cùng vị trí).</li>" +
          "<li>Góc tương ứng: $\\widehat{A} = \\widehat{D}$, $\\widehat{B} = \\widehat{E}$, $\\widehat{C} = \\widehat{F}$.</li>" +
          "<li>Có thể đổi thứ tự đỉnh, miễn là đổi <b>đồng thời</b> ở cả hai vế: $\\Delta ABC = \\Delta DEF$ cũng viết được là $\\Delta BCA = \\Delta EFD$ hay $\\Delta CBA = \\Delta FED$, nhưng <b>không</b> được viết $\\Delta ABC = \\Delta EDF$.</li>" +
          "<li>Hai tam giác bằng nhau thì có chu vi bằng nhau.</li></ul>"
      },
      {
        heading: "3. Trường hợp bằng nhau thứ nhất: cạnh – cạnh – cạnh (c.c.c)",
        html: "<b>Định lí (thừa nhận):</b> Nếu <b>ba cạnh</b> của tam giác này bằng <b>ba cạnh</b> của tam giác kia thì hai tam giác đó bằng nhau." +
          "<ul><li>Như vậy, để kết luận hai tam giác bằng nhau, chỉ cần kiểm tra ba cặp cạnh tương ứng bằng nhau; khi đó các góc tương ứng tự động bằng nhau.</li>" +
          "<li>Vẽ tam giác $ABC$ biết ba cạnh (ví dụ $BC = 6$ cm, $AB = 5$ cm, $AC = 4$ cm): vẽ đoạn $BC$; vẽ cung tròn tâm $B$ bán kính $5$ cm và cung tròn tâm $C$ bán kính $4$ cm, hai cung cắt nhau tại $A$; nối $AB$, $AC$.</li>" +
          "<li><b>Chú ý:</b> hai tam giác có ba góc tương ứng bằng nhau <b>chưa chắc</b> bằng nhau (một tam giác có thể là \"phóng to\" của tam giác kia).</li></ul>"
      },
      {
        heading: "4. Cách trình bày một bài chứng minh",
        html: "Ví dụ: cho hình dưới, biết $AB = AD$, $CB = CD$. Chứng minh $\\Delta ABC = \\Delta ADC$." + FIG_KITE +
          "<i>Xét</i> $\\Delta ABC$ và $\\Delta ADC$ có:<br>" +
          "&nbsp;&nbsp;$AB = AD$ (giả thiết);<br>&nbsp;&nbsp;$CB = CD$ (giả thiết);<br>&nbsp;&nbsp;$AC$ là cạnh chung.<br>" +
          "Vậy $\\Delta ABC = \\Delta ADC$ (c.c.c).<br>" +
          "Từ đó suy ra các góc tương ứng bằng nhau, chẳng hạn $\\widehat{BAC} = \\widehat{DAC}$ và $\\widehat{ABC} = \\widehat{ADC}$."
      }
    ],

    skills: [
      "<b>Viết kí hiệu hai tam giác bằng nhau:</b> xác định từng cặp đỉnh tương ứng trước (đỉnh nằm giữa hai cạnh nào thì ứng với đỉnh nằm giữa hai cạnh bằng chúng), rồi viết các đỉnh tương ứng ở <b>cùng vị trí</b>.",
      "<b>Tìm cạnh, góc tương ứng:</b> từ $\\Delta ABC = \\Delta MNP$, cạnh $BC$ (vị trí 2–3) ứng với cạnh $NP$ (vị trí 2–3); góc $C$ (vị trí 3) ứng với góc $P$.",
      "<b>Tính góc:</b> kết hợp \"góc tương ứng bằng nhau\" với \"tổng ba góc của tam giác bằng $180^\\circ$\". Ví dụ $\\Delta ABC = \\Delta DEF$, $\\widehat{B} = 40^\\circ$, $\\widehat{C} = 60^\\circ$ thì $\\widehat{D} = \\widehat{A} = 80^\\circ$.",
      "<b>Chứng minh theo c.c.c:</b> tìm đủ <b>ba</b> cặp cạnh bằng nhau; hay gặp nhất là <b>cạnh chung</b> của hai tam giác. Ghi rõ lí do từng cặp (giả thiết / cạnh chung / chứng minh trên).",
      "<b>Chứng minh hai góc (hai đoạn thẳng) bằng nhau:</b> chọn hai tam giác lần lượt chứa hai góc (đoạn) đó, chứng minh hai tam giác bằng nhau rồi suy ra \"hai góc tương ứng\".",
      "<b>Lỗi hay gặp:</b> viết sai thứ tự đỉnh (ví dụ $\\Delta ABC = \\Delta ADC$ thì $BC$ ứng với $DC$, không phải $AD$); kết luận bằng nhau khi mới có hai cặp cạnh; nghĩ rằng ba góc bằng nhau là đủ."
    ],

    examples: [
      {
        q: "Cho $\\Delta ABC = \\Delta MNP$, biết $AB = 5$ cm, $BC = 7$ cm, $\\widehat{A} = 60^\\circ$, $\\widehat{N} = 50^\\circ$. Tính độ dài $MN$, $NP$ và số đo $\\widehat{M}$, $\\widehat{P}$.",
        solution: "Từ $\\Delta ABC = \\Delta MNP$ ta có các đỉnh tương ứng $A \\leftrightarrow M$, $B \\leftrightarrow N$, $C \\leftrightarrow P$.<br>" +
          "• $MN = AB = 5$ cm; $\\ NP = BC = 7$ cm.<br>" +
          "• $\\widehat{M} = \\widehat{A} = 60^\\circ$.<br>" +
          "• Trong $\\Delta MNP$: $\\widehat{P} = 180^\\circ - \\widehat{M} - \\widehat{N} = 180^\\circ - 60^\\circ - 50^\\circ = 70^\\circ$."
      },
      {
        q: "Cho hình vẽ, biết $AB = AD$, $CB = CD$. Chứng minh rằng $AC$ là tia phân giác của góc $BAD$." + FIG_KITE,
        solution: "Xét $\\Delta ABC$ và $\\Delta ADC$ có: $AB = AD$ (giả thiết); $CB = CD$ (giả thiết); $AC$ là cạnh chung.<br>" +
          "Do đó $\\Delta ABC = \\Delta ADC$ (c.c.c), suy ra $\\widehat{BAC} = \\widehat{DAC}$ (hai góc tương ứng).<br>" +
          "Tia $AC$ nằm giữa hai tia $AB$, $AD$ và tạo với chúng hai góc bằng nhau, nên $AC$ là tia phân giác của $\\widehat{BAD}$."
      },
      {
        q: "Cho hình vẽ, biết $AD = BC$, $AC = BD$, $\\widehat{ABD} = 30^\\circ$; $E$ là giao điểm của $AC$ và $BD$. Tính số đo góc $DEC$." + trap(30, "30°"),
        solution: "Xét $\\Delta ADB$ và $\\Delta BCA$ có: $AD = BC$, $DB = CA$ (giả thiết), $AB$ là cạnh chung. Do đó $\\Delta ADB = \\Delta BCA$ (c.c.c).<br>" +
          "Suy ra $\\widehat{ABD} = \\widehat{BAC}$ (hai góc tương ứng), tức là $\\widehat{BAC} = 30^\\circ$.<br>" +
          "Trong $\\Delta EAB$: $\\widehat{AEB} = 180^\\circ - 30^\\circ - 30^\\circ = 120^\\circ$.<br>" +
          "$\\widehat{DEC}$ và $\\widehat{AEB}$ là hai góc đối đỉnh nên $\\widehat{DEC} = 120^\\circ$."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.64 – Câu hỏi",
            q: "Cho $\\Delta ABC = \\Delta DEF$. Cạnh tương ứng với cạnh $BC$ là",
            options: ["$DE$", "$DF$", "$EF$", "$AC$"],
            answer: 2,
            explain: "$B \\leftrightarrow E$, $C \\leftrightarrow F$ nên cạnh $BC$ tương ứng với cạnh $EF$."
          },
          {
            id: "d1q2", level: "de", source: "SBT Bài 13 – BT 4.10",
            q: "Cho $\\Delta MNP = \\Delta HIK$. Góc tương ứng với góc $P$ là",
            options: ["$\\widehat{K}$", "$\\widehat{H}$", "$\\widehat{I}$", "$\\widehat{N}$"],
            answer: 0,
            explain: "Đỉnh $P$ ở vị trí thứ ba, tương ứng với đỉnh thứ ba $K$ của $\\Delta HIK$, nên $\\widehat{P} = \\widehat{K}$."
          },
          {
            id: "d1q3", level: "de", source: "SBT Bài 13 – BT 4.12",
            q: "Cho $\\Delta ABC = \\Delta MNP$. Cách viết nào sau đây cũng đúng?",
            options: ["$\\Delta BAC = \\Delta MNP$", "$\\Delta CAB = \\Delta PNM$", "$\\Delta ACB = \\Delta MNP$", "$\\Delta BAC = \\Delta NMP$"],
            answer: 3,
            explain: "Các cặp đỉnh tương ứng là $A$–$M$, $B$–$N$, $C$–$P$. Viết $\\Delta BAC = \\Delta NMP$ giữ đúng các cặp đó. Các cách còn lại ghép sai cặp (ví dụ $\\Delta CAB = \\Delta PNM$ ghép $A$ với $N$)."
          },
          {
            id: "d1q4", level: "de", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta DEF$, biết $AB = 6$ cm, $BC = 8$ cm, $AC = 7$ cm. Độ dài cạnh $DF$ là",
            options: ["$6$ cm", "$7$ cm", "$8$ cm", "$21$ cm"],
            answer: 1,
            explain: "$A \\leftrightarrow D$, $C \\leftrightarrow F$ nên $DF = AC = 7$ cm."
          },
          {
            id: "d1q5", level: "vua", source: "SGK tr.65 – Luyện tập 1",
            q: "Cho $\\Delta ABC = \\Delta DEF$, biết $\\widehat{B} = 50^\\circ$, $\\widehat{C} = 70^\\circ$. Số đo góc $D$ là",
            options: ["$50^\\circ$", "$70^\\circ$", "$60^\\circ$", "$120^\\circ$"],
            answer: 2,
            explain: "Trong $\\Delta ABC$: $\\widehat{A} = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$. Vì $\\widehat{D}$ tương ứng với $\\widehat{A}$ nên $\\widehat{D} = 60^\\circ$."
          },
          {
            id: "d1q6", level: "vua", source: "SGK Bài 13 – BT 4.4",
            q: "Hai tam giác trong hình có các cạnh bằng nhau được đánh dấu giống nhau. Cách viết nào sau đây đúng?" + FIG_PAIR,
            options: ["$\\Delta ABC = \\Delta EFD$", "$\\Delta ABC = \\Delta DEF$", "$\\Delta ACB = \\Delta EFD$", "$\\Delta BCA = \\Delta DEF$"],
            answer: 0,
            explain: "$AB = EF$ (2 gạch), $BC = FD$ (3 gạch), $CA = DE$ (1 gạch). Đỉnh $A$ nằm giữa cạnh 2 gạch và 1 gạch nên ứng với $E$; tương tự $B \\leftrightarrow F$, $C \\leftrightarrow D$. Vậy $\\Delta ABC = \\Delta EFD$ (c.c.c)."
          },
          {
            id: "d1q7", level: "vua", source: "mới",
            q: "Hai tam giác $ABC$ và $A'B'C'$ có $AB = A'B'$, $AC = A'C'$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta A'B'C'$ theo trường hợp cạnh – cạnh – cạnh?",
            options: ["$\\widehat{A} = \\widehat{A'}$", "$AB = B'C'$", "$BC = A'C'$", "$BC = B'C'$"],
            answer: 3,
            explain: "Trường hợp c.c.c cần đủ ba cặp cạnh tương ứng; đã có hai cặp nên cần thêm $BC = B'C'$. Điều kiện về góc không thuộc trường hợp c.c.c."
          },
          {
            id: "d1q8", level: "vua", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta MNP$. Chu vi tam giác $ABC$ bằng $24$ cm, $MN = 7$ cm, $NP = 9$ cm. Độ dài cạnh $AC$ là",
            options: ["$7$ cm", "$8$ cm", "$9$ cm", "$16$ cm"],
            answer: 1,
            explain: "Hai tam giác bằng nhau có chu vi bằng nhau nên $MN + NP + MP = 24$, suy ra $MP = 24 - 7 - 9 = 8$ (cm). Vì $AC$ tương ứng với $MP$ nên $AC = 8$ cm."
          },
          {
            id: "d1q9", level: "kho", source: "SBT Bài 13 – BT 4.17",
            q: "Cho hình vẽ, biết $AB = AD$, $CB = CD$, $\\widehat{DAC} = 35^\\circ$, $\\widehat{DCA} = 65^\\circ$. Số đo góc $ABC$ là" + FIG_KITE2,
            options: ["$70^\\circ$", "$100^\\circ$", "$65^\\circ$", "$80^\\circ$"],
            answer: 3,
            explain: "$\\Delta ABC = \\Delta ADC$ (c.c.c: $AB = AD$, $CB = CD$, $AC$ chung) nên $\\widehat{ABC} = \\widehat{ADC}$. Trong $\\Delta ADC$: $\\widehat{ADC} = 180^\\circ - 35^\\circ - 65^\\circ = 80^\\circ$. Vậy $\\widehat{ABC} = 80^\\circ$."
          },
          {
            id: "d1q10", level: "kho", source: "mới",
            q: "Khẳng định nào sau đây <b>sai</b>?",
            options: [
              "Hai tam giác bằng nhau thì có chu vi bằng nhau",
              "Hai tam giác có ba góc tương ứng bằng nhau thì bằng nhau",
              "Nếu $\\Delta ABC = \\Delta DEF$ thì $\\Delta BCA = \\Delta EFD$",
              "Nếu $\\Delta ABC = \\Delta DEF$ và $\\Delta DEF = \\Delta MNP$ thì $\\Delta ABC = \\Delta MNP$"
            ],
            answer: 1,
            explain: "Hai tam giác có ba góc bằng nhau có thể có kích thước khác nhau (ví dụ hai tam giác đều cạnh 2 cm và 5 cm), nên chưa chắc bằng nhau. Các khẳng định còn lại đều đúng."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK tr.66 – Luyện tập 2 (mở rộng)", maxPoints: 3,
            q: "Cho hình vẽ, biết $AB = AD$, $CB = CD$." + FIG_KITE +
              "a) Chứng minh $\\Delta ABC = \\Delta ADC$.<br>b) Chứng minh $AC$ là tia phân giác của góc $BAD$ và của góc $BCD$.<br>c) Biết $\\widehat{BAD} = 100^\\circ$, $\\widehat{BCD} = 60^\\circ$. Tính số đo góc $ABC$.",
            modelAnswer: "a) Xét $\\Delta ABC$ và $\\Delta ADC$ có: $AB = AD$ (giả thiết); $CB = CD$ (giả thiết); $AC$ là cạnh chung.<br>Vậy $\\Delta ABC = \\Delta ADC$ (c.c.c).<br>" +
              "b) Từ câu a suy ra $\\widehat{BAC} = \\widehat{DAC}$ và $\\widehat{BCA} = \\widehat{DCA}$ (các góc tương ứng). Tia $AC$ nằm giữa hai tia $AB$, $AD$ nên $AC$ là tia phân giác của $\\widehat{BAD}$; tương tự tia $CA$ là tia phân giác của $\\widehat{BCD}$.<br>" +
              "c) $\\widehat{BAC} = \\frac{100^\\circ}{2} = 50^\\circ$; $\\ \\widehat{BCA} = \\frac{60^\\circ}{2} = 30^\\circ$.<br>Trong $\\Delta ABC$: $\\widehat{ABC} = 180^\\circ - 50^\\circ - 30^\\circ = 100^\\circ$.",
            rubric: [
              { pts: 1, text: "Câu a: nêu đủ ba cặp cạnh bằng nhau (có lí do, có cạnh chung $AC$) và kết luận $\\Delta ABC = \\Delta ADC$ (c.c.c)." },
              { pts: 1, text: "Câu b: suy ra $\\widehat{BAC} = \\widehat{DAC}$, $\\widehat{BCA} = \\widehat{DCA}$ và kết luận đúng hai tia phân giác." },
              { pts: 0.5, text: "Câu c: tính được $\\widehat{BAC} = 50^\\circ$, $\\widehat{BCA} = 30^\\circ$." },
              { pts: 0.5, text: "Câu c: tính đúng $\\widehat{ABC} = 100^\\circ$." }
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
            q: "Cho $\\Delta PQR = \\Delta XYZ$. Cạnh tương ứng với cạnh $QR$ là",
            options: ["$XY$", "$YZ$", "$XZ$", "$PR$"],
            answer: 1,
            explain: "$Q \\leftrightarrow Y$, $R \\leftrightarrow Z$ nên cạnh $QR$ tương ứng với cạnh $YZ$."
          },
          {
            id: "d2q2", level: "de", source: "SBT Bài 13 – BT 4.11",
            q: "Cho $\\Delta ABC = \\Delta DEF$. Khẳng định nào sau đây đúng?",
            options: ["$AC = DF$", "$\\widehat{B} = \\widehat{D}$", "$AB = EF$", "$\\widehat{C} = \\widehat{E}$"],
            answer: 0,
            explain: "$A \\leftrightarrow D$, $C \\leftrightarrow F$ nên $AC = DF$. Còn $\\widehat{B} = \\widehat{E}$ (không phải $\\widehat{D}$), $AB = DE$, $\\widehat{C} = \\widehat{F}$."
          },
          {
            id: "d2q3", level: "de", source: "SBT Bài 13 – BT 4.12",
            q: "Cho $\\Delta HIK = \\Delta MNP$. Cách viết nào sau đây cũng đúng?",
            options: ["$\\Delta KHI = \\Delta MNP$", "$\\Delta KHI = \\Delta NPM$", "$\\Delta KHI = \\Delta PMN$", "$\\Delta IHK = \\Delta MNP$"],
            answer: 2,
            explain: "Các cặp đỉnh tương ứng: $H$–$M$, $I$–$N$, $K$–$P$. Viết $K, H, I$ thì vế phải phải là $P, M, N$: $\\Delta KHI = \\Delta PMN$."
          },
          {
            id: "d2q4", level: "de", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta MNP$, biết $\\widehat{M} = 65^\\circ$. Số đo góc $A$ là",
            options: ["$25^\\circ$", "$115^\\circ$", "$130^\\circ$", "$65^\\circ$"],
            answer: 3,
            explain: "Góc $A$ tương ứng với góc $M$ nên $\\widehat{A} = \\widehat{M} = 65^\\circ$."
          },
          {
            id: "d2q5", level: "vua", source: "SGK tr.65 – Luyện tập 1",
            q: "Cho $\\Delta DEF = \\Delta MNP$, biết $EF = 5$ cm, $\\widehat{E} = 45^\\circ$, $\\widehat{F} = 75^\\circ$. Khẳng định nào sau đây đúng?",
            options: ["$\\widehat{M} = 75^\\circ,\\ NP = 5$ cm", "$\\widehat{M} = 45^\\circ,\\ NP = 5$ cm", "$\\widehat{M} = 60^\\circ,\\ NP = 5$ cm", "$\\widehat{M} = 120^\\circ,\\ NP = 5$ cm"],
            answer: 2,
            explain: "$NP$ tương ứng với $EF$ nên $NP = 5$ cm. Trong $\\Delta DEF$: $\\widehat{D} = 180^\\circ - 45^\\circ - 75^\\circ = 60^\\circ$, mà $\\widehat{M} = \\widehat{D}$ nên $\\widehat{M} = 60^\\circ$."
          },
          {
            id: "d2q6", level: "vua", source: "SGK tr.66 – Ví dụ 2",
            q: "Cho hình vẽ, biết $AD = BC$, $AC = BD$. Khẳng định nào sau đây đúng?" + trap(32),
            options: ["$\\Delta ACB = \\Delta ADB$", "$\\Delta ABC = \\Delta ABD$", "$\\Delta ACB = \\Delta BDA$", "$\\Delta ACB = \\Delta DBA$"],
            answer: 2,
            explain: "Xét $\\Delta ACB$ và $\\Delta BDA$: $AC = BD$, $CB = DA$ (giả thiết), $AB = BA$ (cạnh chung). Vậy $\\Delta ACB = \\Delta BDA$ (c.c.c). Các cách viết khác ghép sai đỉnh (ví dụ $\\Delta ABC = \\Delta ABD$ đòi hỏi $BC = BD$, không có)."
          },
          {
            id: "d2q7", level: "vua", source: "SGK tr.66 – Câu hỏi (Hình 4.15)",
            q: "Tam giác $ABC$ có $AB = 5$ cm, $BC = 7$ cm, $CA = 6$ cm; tam giác $MNP$ có $MN = 6$ cm, $NP = 5$ cm, $PM = 7$ cm. Khẳng định nào sau đây đúng?",
            options: ["$\\Delta ABC = \\Delta MNP$", "$\\Delta ABC = \\Delta NPM$", "$\\Delta ABC = \\Delta PMN$", "$\\Delta ABC = \\Delta NMP$"],
            answer: 1,
            explain: "$AB = NP = 5$, $BC = PM = 7$, $CA = MN = 6$. Đỉnh $A$ (giữa cạnh 5 và 6) ứng với $N$; $B$ (giữa cạnh 5 và 7) ứng với $P$; $C$ ứng với $M$. Vậy $\\Delta ABC = \\Delta NPM$ (c.c.c)."
          },
          {
            id: "d2q8", level: "vua", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta DEF$, biết $\\widehat{F} = 60^\\circ$ và $\\widehat{A} = 2\\widehat{B}$. Số đo góc $E$ là",
            options: ["$40^\\circ$", "$80^\\circ$", "$60^\\circ$", "$30^\\circ$"],
            answer: 0,
            explain: "$\\widehat{C} = \\widehat{F} = 60^\\circ$ nên $\\widehat{A} + \\widehat{B} = 120^\\circ$, tức $3\\widehat{B} = 120^\\circ$, $\\widehat{B} = 40^\\circ$. Vì $\\widehat{E} = \\widehat{B}$ nên $\\widehat{E} = 40^\\circ$."
          },
          {
            id: "d2q9", level: "kho", source: "SBT Bài 13 – BT 4.18",
            q: "Cho hình vẽ, biết $AD = BC$, $AC = BD$, $\\widehat{ABD} = 35^\\circ$; $E$ là giao điểm của $AC$ và $BD$. Số đo góc $DEC$ là" + trap(35, "35°"),
            options: ["$70^\\circ$", "$145^\\circ$", "$35^\\circ$", "$110^\\circ$"],
            answer: 3,
            explain: "$\\Delta ADB = \\Delta BCA$ (c.c.c) nên $\\widehat{BAC} = \\widehat{ABD} = 35^\\circ$. Trong $\\Delta EAB$: $\\widehat{AEB} = 180^\\circ - 35^\\circ - 35^\\circ = 110^\\circ$. Góc $DEC$ đối đỉnh với góc $AEB$ nên $\\widehat{DEC} = 110^\\circ$."
          },
          {
            id: "d2q10", level: "kho", source: "SBT Bài 13 – BT 4.14",
            q: "Cho hình vuông $ABCD$, $E$ là giao điểm của hai đường chéo $AC$ và $BD$. Xét bốn tam giác $EAB$, $EBC$, $ECD$, $EDA$. Có bao nhiêu cặp tam giác bằng nhau trong bốn tam giác đó?",
            options: ["$6$", "$2$", "$4$", "$8$"],
            answer: 0,
            explain: "Hai đường chéo hình vuông bằng nhau và cắt nhau tại trung điểm mỗi đường nên $EA = EB = EC = ED$; bốn cạnh hình vuông bằng nhau. Do đó bốn tam giác đôi một bằng nhau (c.c.c). Số cặp là $\\frac{4 \\cdot 3}{2} = 6$."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SBT Bài 13 – BT 4.15b", maxPoints: 1.5,
            q: "Cho hình vẽ, biết $MN = MQ$, $PN = PQ$. Chứng minh $\\Delta MNP = \\Delta MQP$ và $\\widehat{NMP} = \\widehat{QMP}$." + FIG_DART,
            modelAnswer: "Xét $\\Delta MNP$ và $\\Delta MQP$ có:<br>$MN = MQ$ (giả thiết); $PN = PQ$ (giả thiết); $MP$ là cạnh chung.<br>" +
              "Vậy $\\Delta MNP = \\Delta MQP$ (c.c.c).<br>Suy ra $\\widehat{NMP} = \\widehat{QMP}$ (hai góc tương ứng).",
            rubric: [
              { pts: 0.5, text: "Nêu đủ ba cặp cạnh bằng nhau, có lí do (có cạnh chung $MP$)." },
              { pts: 0.5, text: "Kết luận $\\Delta MNP = \\Delta MQP$ (c.c.c), đúng thứ tự đỉnh." },
              { pts: 0.5, text: "Suy ra $\\widehat{NMP} = \\widehat{QMP}$ (góc tương ứng)." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SGK tr.67 – Vận dụng", maxPoints: 1.5,
            q: "Để vẽ tia phân giác của góc $xOy$, bạn Lan làm như sau: vẽ đường tròn tâm $O$ cắt $Ox$, $Oy$ lần lượt tại $A$, $B$; vẽ đường tròn tâm $A$ bán kính $AO$ và đường tròn tâm $B$ bán kính $BO$, chúng cắt nhau tại $M$ (khác $O$); vẽ tia $Oz$ đi qua $M$. Giải thích vì sao $Oz$ là tia phân giác của góc $xOy$." + FIG_BIS,
            modelAnswer: "$A$, $B$ cùng nằm trên đường tròn tâm $O$ nên $OA = OB$.<br>$M$ nằm trên đường tròn tâm $A$ bán kính $AO$ nên $AM = AO$; $M$ nằm trên đường tròn tâm $B$ bán kính $BO$ nên $BM = BO$. Do đó $AM = BM$.<br>" +
              "Xét $\\Delta OAM$ và $\\Delta OBM$ có: $OA = OB$, $AM = BM$, $OM$ là cạnh chung. Vậy $\\Delta OAM = \\Delta OBM$ (c.c.c).<br>" +
              "Suy ra $\\widehat{AOM} = \\widehat{BOM}$, tức $\\widehat{xOz} = \\widehat{yOz}$. Tia $Oz$ nằm giữa $Ox$, $Oy$ nên $Oz$ là tia phân giác của góc $xOy$.",
            rubric: [
              { pts: 0.5, text: "Giải thích được $OA = OB$ và $AM = BM$ (từ các bán kính)." },
              { pts: 0.5, text: "Chứng minh $\\Delta OAM = \\Delta OBM$ (c.c.c)." },
              { pts: 0.5, text: "Suy ra $\\widehat{AOM} = \\widehat{BOM}$ và kết luận $Oz$ là tia phân giác." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.64 – Định nghĩa",
            q: "Hai tam giác được gọi là bằng nhau nếu chúng",
            options: ["có chu vi bằng nhau", "có ba góc tương ứng bằng nhau", "có các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau", "có hai cặp cạnh tương ứng bằng nhau"],
            answer: 2,
            explain: "Theo định nghĩa, hai tam giác bằng nhau khi có các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau."
          },
          {
            id: "d3q2", level: "de", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta IKH$. Cạnh tương ứng với cạnh $AC$ là",
            options: ["$IH$", "$IK$", "$KH$", "$BC$"],
            answer: 0,
            explain: "$A \\leftrightarrow I$, $C \\leftrightarrow H$ nên cạnh $AC$ tương ứng với cạnh $IH$."
          },
          {
            id: "d3q3", level: "de", source: "SBT Bài 13 – BT 4.10",
            q: "Cho $\\Delta EFG = \\Delta RST$. Góc tương ứng với góc $S$ là",
            options: ["$\\widehat{E}$", "$\\widehat{G}$", "$\\widehat{T}$", "$\\widehat{F}$"],
            answer: 3,
            explain: "$S$ ở vị trí thứ hai của $\\Delta RST$, tương ứng với đỉnh thứ hai $F$ của $\\Delta EFG$."
          },
          {
            id: "d3q4", level: "de", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta DEF$, biết $DE = 3$ cm, $EF = 5$ cm, $DF = 4$ cm. Chu vi tam giác $ABC$ là",
            options: ["$15$ cm", "$12$ cm", "$8$ cm", "$9$ cm"],
            answer: 1,
            explain: "Hai tam giác bằng nhau có chu vi bằng nhau: $3 + 5 + 4 = 12$ (cm)."
          },
          {
            id: "d3q5", level: "vua", source: "SGK Bài 13 – BT 4.6",
            q: "Cho hình vẽ, biết $AB = CB$, $AD = CD$, $\\widehat{DAB} = 100^\\circ$, $\\widehat{BDC} = 25^\\circ$. Số đo góc $ABC$ là" + FIG_KITE3,
            options: ["$55^\\circ$", "$50^\\circ$", "$130^\\circ$", "$110^\\circ$"],
            answer: 3,
            explain: "$\\Delta ABD = \\Delta CBD$ (c.c.c: $AB = CB$, $AD = CD$, $BD$ chung) nên $\\widehat{ADB} = \\widehat{CDB} = 25^\\circ$ và $\\widehat{ABD} = \\widehat{CBD}$. Trong $\\Delta ABD$: $\\widehat{ABD} = 180^\\circ - 100^\\circ - 25^\\circ = 55^\\circ$. Vậy $\\widehat{ABC} = 2 \\cdot 55^\\circ = 110^\\circ$."
          },
          {
            id: "d3q6", level: "vua", source: "mới",
            q: "Hai tam giác $ABC$ và $MNP$ có $AB = MP$, $BC = NM$, $CA = PN$. Khẳng định nào sau đây đúng?",
            options: ["$\\Delta ABC = \\Delta MNP$", "$\\Delta ABC = \\Delta PNM$", "$\\Delta ABC = \\Delta NPM$", "$\\Delta ABC = \\Delta PMN$"],
            answer: 3,
            explain: "Đỉnh $A$ là chung của $AB$, $CA$ ứng với đỉnh chung của $MP$, $PN$ là $P$; đỉnh $B$ (chung của $AB$, $BC$) ứng với đỉnh chung của $MP$, $NM$ là $M$; còn lại $C \\leftrightarrow N$. Vậy $\\Delta ABC = \\Delta PMN$ (c.c.c)."
          },
          {
            id: "d3q7", level: "vua", source: "SBT Bài 13 – BT 4.11",
            q: "Với hai tam giác $ABC$ và $MNP$ bất kì sao cho $\\Delta ABC = \\Delta MNP$, khẳng định nào sau đây đúng?",
            options: ["$\\widehat{B} = \\widehat{P}$", "$BA = NM,\\ CB = PN$", "$AC = MN$", "$\\widehat{C} = \\widehat{N}$"],
            answer: 1,
            explain: "$BA$ tương ứng với $NM$, $CB$ tương ứng với $PN$ (đọc cặp đỉnh $B$–$N$, $A$–$M$, $C$–$P$). Các khẳng định khác ghép sai đỉnh."
          },
          {
            id: "d3q8", level: "vua", source: "SBT Bài 13 – Ví dụ 2",
            q: "Cho hình vẽ, biết $AB = AD$, $CB = CD$. Khẳng định nào sau đây <b>chắc chắn</b> đúng?" + FIG_KITE,
            options: ["$\\widehat{ABC} = \\widehat{ADC}$", "$\\widehat{BAC} = \\widehat{BCA}$", "$AB = BC$", "$\\widehat{ACB} = \\widehat{CAD}$"],
            answer: 0,
            explain: "$\\Delta ABC = \\Delta ADC$ (c.c.c) nên $\\widehat{ABC} = \\widehat{ADC}$ (hai góc tương ứng). Các đẳng thức còn lại không suy ra được từ giả thiết."
          },
          {
            id: "d3q9", level: "kho", source: "SBT Bài 13 – BT 4.19",
            q: "Cho các điểm $B, D, E, C$ thẳng hàng theo thứ tự đó và điểm $A$ như hình, biết $AB = AC$, $AD = AE$, $BD = CE$, $\\widehat{ADB} = 110^\\circ$. Số đo góc $DAE$ là" + line5(true),
            options: ["$70^\\circ$", "$110^\\circ$", "$40^\\circ$", "$20^\\circ$"],
            answer: 2,
            explain: "$\\Delta ABD = \\Delta ACE$ (c.c.c) nên $\\widehat{AEC} = \\widehat{ADB} = 110^\\circ$. Các góc kề bù: $\\widehat{ADE} = 180^\\circ - 110^\\circ = 70^\\circ$, $\\widehat{AED} = 180^\\circ - 110^\\circ = 70^\\circ$. Trong $\\Delta ADE$: $\\widehat{DAE} = 180^\\circ - 70^\\circ - 70^\\circ = 40^\\circ$."
          },
          {
            id: "d3q10", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta DEF$, biết $\\widehat{A} + \\widehat{E} = 130^\\circ$ và $\\widehat{B} - \\widehat{D} = 20^\\circ$. Số đo góc $E$ là",
            options: ["$55^\\circ$", "$75^\\circ$", "$50^\\circ$", "$65^\\circ$"],
            answer: 1,
            explain: "Vì $\\widehat{E} = \\widehat{B}$, $\\widehat{D} = \\widehat{A}$ nên $\\widehat{A} + \\widehat{B} = 130^\\circ$ và $\\widehat{B} - \\widehat{A} = 20^\\circ$. Suy ra $\\widehat{B} = (130^\\circ + 20^\\circ) : 2 = 75^\\circ$. Vậy $\\widehat{E} = 75^\\circ$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SGK tr.66 – Ví dụ 2 (biến đổi)", maxPoints: 1.5,
            q: "Cho hình vẽ, biết $AD = BC$, $AC = BD$. Chứng minh $\\Delta ADB = \\Delta BCA$, từ đó suy ra $\\widehat{DAB} = \\widehat{CBA}$." + trap(32),
            modelAnswer: "Xét $\\Delta ADB$ và $\\Delta BCA$ có:<br>$AD = BC$ (giả thiết); $DB = CA$ (giả thiết); $AB$ là cạnh chung.<br>" +
              "Vậy $\\Delta ADB = \\Delta BCA$ (c.c.c).<br>Góc $DAB$ (tại đỉnh $A$) tương ứng với góc $CBA$ (tại đỉnh $B$), nên $\\widehat{DAB} = \\widehat{CBA}$.",
            rubric: [
              { pts: 0.5, text: "Nêu đủ ba cặp cạnh bằng nhau có lí do (cạnh chung $AB$)." },
              { pts: 0.5, text: "Kết luận $\\Delta ADB = \\Delta BCA$ (c.c.c), đúng thứ tự đỉnh." },
              { pts: 0.5, text: "Suy ra đúng $\\widehat{DAB} = \\widehat{CBA}$ (góc tương ứng)." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SBT Bài 13 – BT 4.19 (biến đổi)", maxPoints: 1.5,
            q: "Cho các điểm $B, D, E, C$ thẳng hàng theo thứ tự đó và điểm $A$ không thuộc đường thẳng $BC$ như hình, biết $AB = AC$, $AD = AE$, $BD = CE$. Chứng minh rằng:<br>a) $\\widehat{BAD} = \\widehat{CAE}$;<br>b) $\\widehat{BAE} = \\widehat{CAD}$." + line5(false),
            modelAnswer: "a) Xét $\\Delta ABD$ và $\\Delta ACE$ có: $AB = AC$, $AD = AE$, $BD = CE$ (giả thiết).<br>Vậy $\\Delta ABD = \\Delta ACE$ (c.c.c), suy ra $\\widehat{BAD} = \\widehat{CAE}$ (hai góc tương ứng).<br>" +
              "b) Tia $AD$ nằm giữa hai tia $AB$, $AE$ nên $\\widehat{BAE} = \\widehat{BAD} + \\widehat{DAE}$.<br>Tia $AE$ nằm giữa hai tia $AD$, $AC$ nên $\\widehat{CAD} = \\widehat{CAE} + \\widehat{DAE}$.<br>" +
              "Mà $\\widehat{BAD} = \\widehat{CAE}$ (câu a) nên $\\widehat{BAE} = \\widehat{CAD}$.",
            rubric: [
              { pts: 0.5, text: "Câu a: chứng minh $\\Delta ABD = \\Delta ACE$ (c.c.c)." },
              { pts: 0.5, text: "Câu a: suy ra $\\widehat{BAD} = \\widehat{CAE}$." },
              { pts: 0.5, text: "Câu b: cộng thêm góc chung $\\widehat{DAE}$ và kết luận đúng." }
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
            q: "Cho $\\Delta ABC = \\Delta DEF$, biết $AB = 3$ cm, $BC = 4$ cm và chu vi tam giác $DEF$ bằng $12$ cm. Độ dài cạnh $DF$ là",
            options: ["$4$ cm", "$7$ cm", "$5$ cm", "$3$ cm"],
            answer: 2,
            explain: "Chu vi $\\Delta ABC$ bằng chu vi $\\Delta DEF$ bằng $12$ cm nên $AC = 12 - 3 - 4 = 5$ (cm). $DF$ tương ứng với $AC$ nên $DF = 5$ cm."
          },
          {
            id: "d4q2", level: "vua", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta MNP$ và $\\widehat{A} : \\widehat{B} : \\widehat{C} = 2 : 3 : 4$. Số đo góc $N$ là",
            options: ["$40^\\circ$", "$60^\\circ$", "$80^\\circ$", "$100^\\circ$"],
            answer: 1,
            explain: "$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$ chia theo tỉ lệ $2 : 3 : 4$ (tổng 9 phần), mỗi phần $20^\\circ$, nên $\\widehat{B} = 60^\\circ$. Vì $\\widehat{N} = \\widehat{B}$ nên $\\widehat{N} = 60^\\circ$."
          },
          {
            id: "d4q3", level: "kho", source: "mới",
            q: "Cho tam giác $ABC$ thỏa mãn đồng thời $\\Delta ABC = \\Delta DEF$ và $\\Delta ABC = \\Delta DFE$. Khẳng định nào sau đây đúng?",
            options: ["$AB = AC$", "$AB = BC$", "$BC = AC$", "$\\widehat{A} = \\widehat{B}$"],
            answer: 0,
            explain: "Từ $\\Delta ABC = \\Delta DEF$: $AB = DE$, $AC = DF$. Từ $\\Delta ABC = \\Delta DFE$: $AB = DF$. Suy ra $AB = DF = AC$."
          },
          {
            id: "d4q4", level: "kho", source: "SGK tr.65 – HĐ2 (mở rộng)",
            q: "Cho đoạn thẳng $AB = 6$ cm. Vẽ cung tròn tâm $A$ và cung tròn tâm $B$ cùng bán kính $4$ cm, chúng cắt nhau tại $C$ và $D$ nằm khác phía đối với $AB$. Khẳng định nào sau đây đúng?",
            options: ["$\\widehat{CAB} = \\widehat{ACB}$", "$AC = AB$", "$\\widehat{ACB} = \\widehat{CAD}$", "$\\widehat{CAB} = \\widehat{DAB}$"],
            answer: 3,
            explain: "$AC = AD = 4$ cm, $BC = BD = 4$ cm, $AB$ chung nên $\\Delta ACB = \\Delta ADB$ (c.c.c), suy ra $\\widehat{CAB} = \\widehat{DAB}$. Còn $AC = 4 \\ne 6 = AB$; các đẳng thức góc khác không suy ra được."
          },
          {
            id: "d4q5", level: "kho", source: "SBT Bài 13 – BT 4.18",
            q: "Cho bốn điểm $A, B, C, D$ với $C$, $D$ cùng phía đối với $AB$, biết $AD = BC$, $AC = BD$ và hai đoạn $AC$, $BD$ cắt nhau tại $E$ với $\\widehat{DEC} = 130^\\circ$. Số đo góc $ABD$ là",
            options: ["$50^\\circ$", "$25^\\circ$", "$65^\\circ$", "$130^\\circ$"],
            answer: 1,
            explain: "$\\Delta ADB = \\Delta BCA$ (c.c.c) nên $\\widehat{ABD} = \\widehat{BAC}$. Góc $AEB$ đối đỉnh với góc $DEC$ nên $\\widehat{AEB} = 130^\\circ$. Trong $\\Delta EAB$: $\\widehat{ABD} + \\widehat{BAC} = 50^\\circ$, mà hai góc bằng nhau nên $\\widehat{ABD} = 25^\\circ$."
          },
          {
            id: "d4q6", level: "kho", source: "SGK Bài 13 – BT 4.6 (biến đổi)",
            q: "Cho tứ giác $ABCD$ có $AB = AD$, $CB = CD$, $\\widehat{BAD} = 80^\\circ$, $\\widehat{BCD} = 40^\\circ$ (hình cánh diều, $AC$ là đường chéo). Số đo góc $ABC$ là",
            options: ["$60^\\circ$", "$140^\\circ$", "$120^\\circ$", "$100^\\circ$"],
            answer: 2,
            explain: "$\\Delta ABC = \\Delta ADC$ (c.c.c) nên $AC$ là phân giác của $\\widehat{BAD}$ và $\\widehat{BCD}$: $\\widehat{BAC} = 40^\\circ$, $\\widehat{BCA} = 20^\\circ$. Trong $\\Delta ABC$: $\\widehat{ABC} = 180^\\circ - 40^\\circ - 20^\\circ = 120^\\circ$."
          },
          {
            id: "d4q7", level: "kho", source: "mới",
            q: "Hai tam giác $ABC$ và $DEF$ có $AB = DE$, $BC = EF$, $CA = FD$. Biết $\\widehat{A} - \\widehat{B} = 20^\\circ$ và $\\widehat{E} = 50^\\circ$. Số đo góc $F$ là",
            options: ["$70^\\circ$", "$50^\\circ$", "$40^\\circ$", "$60^\\circ$"],
            answer: 3,
            explain: "$\\Delta ABC = \\Delta DEF$ (c.c.c) nên $\\widehat{B} = \\widehat{E} = 50^\\circ$, $\\widehat{A} = 70^\\circ$, $\\widehat{C} = 180^\\circ - 70^\\circ - 50^\\circ = 60^\\circ$. Vậy $\\widehat{F} = \\widehat{C} = 60^\\circ$."
          },
          {
            id: "d4q8", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta DEF$, biết $AB = (2x + 1)$ cm và $DE = (3x - 4)$ cm. Độ dài cạnh $AB$ là",
            options: ["$5$ cm", "$11$ cm", "$9$ cm", "$15$ cm"],
            answer: 1,
            explain: "$AB = DE$ nên $2x + 1 = 3x - 4$, suy ra $x = 5$. Khi đó $AB = 2 \\cdot 5 + 1 = 11$ (cm)."
          },
          {
            id: "d4q9", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta DEF$. Chu vi tam giác $ABC$ là $36$ cm và $AB : BC : CA = 3 : 4 : 5$. Độ dài cạnh $EF$ là",
            options: ["$9$ cm", "$15$ cm", "$12$ cm", "$16$ cm"],
            answer: 2,
            explain: "$36$ cm chia theo tỉ lệ $3 : 4 : 5$ (tổng 12 phần), mỗi phần $3$ cm, nên $BC = 4 \\cdot 3 = 12$ (cm). $EF$ tương ứng với $BC$ nên $EF = 12$ cm."
          },
          {
            id: "d4q10", level: "kho", source: "SBT Bài 13 – BT 4.12",
            q: "Cho $\\Delta ABC = \\Delta DEF$. Trong các cách viết $\\Delta BAC = \\Delta EDF$; $\\ \\Delta CBA = \\Delta FED$; $\\ \\Delta ACB = \\Delta DEF$; $\\ \\Delta CAB = \\Delta FDE$, có bao nhiêu cách viết đúng?",
            options: ["$3$", "$1$", "$2$", "$4$"],
            answer: 0,
            explain: "Các cặp đỉnh tương ứng: $A$–$D$, $B$–$E$, $C$–$F$. Ba cách $\\Delta BAC = \\Delta EDF$, $\\Delta CBA = \\Delta FED$, $\\Delta CAB = \\Delta FDE$ đúng; cách $\\Delta ACB = \\Delta DEF$ sai (ghép $C$ với $E$)."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "SGK tr.65 – HĐ2 (mở rộng)", maxPoints: 1.5,
            q: "Cho đoạn thẳng $AB$. Vẽ cung tròn tâm $A$ và cung tròn tâm $B$ có cùng bán kính, chúng cắt nhau tại hai điểm $C$, $D$ nằm khác phía đối với $AB$. Chứng minh rằng:<br>a) $\\Delta CAD = \\Delta CBD$;<br>b) $CD$ là tia phân giác của góc $ACB$." + FIG_RHOMB,
            modelAnswer: "Gọi $r$ là bán kính chung của hai cung. Vì $C$, $D$ nằm trên cả hai cung nên $CA = CB = r$ và $DA = DB = r$.<br>" +
              "a) Xét $\\Delta CAD$ và $\\Delta CBD$ có: $CA = CB$; $AD = BD$; $CD$ là cạnh chung. Vậy $\\Delta CAD = \\Delta CBD$ (c.c.c).<br>" +
              "b) Từ câu a suy ra $\\widehat{ACD} = \\widehat{BCD}$ (hai góc tương ứng). Tia $CD$ nằm giữa hai tia $CA$, $CB$ nên $CD$ là tia phân giác của góc $ACB$.",
            rubric: [
              { pts: 0.5, text: "Giải thích được $CA = CB$, $DA = DB$ (cùng bằng bán kính)." },
              { pts: 0.5, text: "Câu a: chứng minh $\\Delta CAD = \\Delta CBD$ (c.c.c), có cạnh chung $CD$." },
              { pts: 0.5, text: "Câu b: suy ra $\\widehat{ACD} = \\widehat{BCD}$ và kết luận tia phân giác." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "SBT Bài 13 – BT 4.20 (biến đổi)", maxPoints: 1.5,
            q: "Cho hai điểm $C$, $D$ nằm khác phía đối với đường thẳng $AB$ sao cho $AC = BD$, $BC = AD$ (hình vẽ)." + FIG_PARA +
              "a) Chứng minh $\\Delta ABC = \\Delta BAD$.<br>b) Biết $\\widehat{CAB} = 30^\\circ$, $\\widehat{ABC} = 70^\\circ$. Tính số đo các góc $ABD$ và $ADB$.<br>c) Chứng minh $AC \\parallel BD$.",
            modelAnswer: "a) Xét $\\Delta ABC$ và $\\Delta BAD$ có: $AC = BD$, $BC = AD$ (giả thiết), $AB$ là cạnh chung. Vậy $\\Delta ABC = \\Delta BAD$ (c.c.c).<br>" +
              "b) Từ câu a: $\\widehat{ABD} = \\widehat{BAC} = 30^\\circ$ (góc tương ứng tại $B$ và $A$).<br>Trong $\\Delta ABC$: $\\widehat{ACB} = 180^\\circ - 30^\\circ - 70^\\circ = 80^\\circ$, nên $\\widehat{ADB} = \\widehat{ACB} = 80^\\circ$.<br>" +
              "c) $\\widehat{CAB} = \\widehat{DBA} = 30^\\circ$ và hai góc này ở vị trí so le trong (đường thẳng $AB$ cắt hai đường thẳng $AC$, $BD$; $C$, $D$ khác phía $AB$). Do đó $AC \\parallel BD$.",
            rubric: [
              { pts: 0.5, text: "Câu a: chứng minh $\\Delta ABC = \\Delta BAD$ (c.c.c), đúng thứ tự đỉnh." },
              { pts: 0.5, text: "Câu b: $\\widehat{ABD} = 30^\\circ$, $\\widehat{ADB} = 80^\\circ$ (có lập luận)." },
              { pts: 0.5, text: "Câu c: chỉ ra cặp góc so le trong bằng nhau và kết luận $AC \\parallel BD$." }
            ]
          }
        ]
      }
    ]
  });
})();
