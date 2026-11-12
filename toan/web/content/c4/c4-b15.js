(function () {
  // ===== Hình vẽ SVG (dùng currentColor để hợp chế độ sáng/tối) =====
  // o = { w, h, pts: {tên: [x, y]}, segs: [[P, Q, nétĐứt?]], right: [[đỉnh, P, Q]],
  //       ticks: [[P, Q, sốGạch]], angles: [[đỉnh, P, Q, sốCung]], lab: {tên: [dx, dy]}, hide: [tên], texts: [[x, y, "chữ"]] }
  var ACC = "#e5484d";
  function f(v) { return (+v).toFixed(1); }
  function unit(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy) || 1; return [dx / l, dy / l]; }
  function foot(P, A, B) { // chân đường vuông góc từ P xuống đường thẳng AB
    var dx = B[0] - A[0], dy = B[1] - A[1], t = ((P[0] - A[0]) * dx + (P[1] - A[1]) * dy) / (dx * dx + dy * dy);
    return [A[0] + t * dx, A[1] + t * dy];
  }
  function fig(o) {
    var W = o.w || 320, H = o.h || 190, P = o.pts, lab = o.lab || {}, hide = o.hide || [];
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + (o.max || 320) + 'px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">';
    (o.segs || []).forEach(function (g) {
      var a = P[g[0]], b = P[g[1]];
      s += '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" stroke="currentColor" stroke-width="1.6"' + (g[2] ? ' stroke-dasharray="5 4"' : '') + '/>';
    });
    (o.right || []).forEach(function (r) {
      var V = P[r[0]], u = unit(V, P[r[1]]), v = unit(V, P[r[2]]), k = 9;
      s += '<path d="M' + f(V[0] + u[0] * k) + ' ' + f(V[1] + u[1] * k) + ' L' + f(V[0] + u[0] * k + v[0] * k) + ' ' + f(V[1] + u[1] * k + v[1] * k) +
        ' L' + f(V[0] + v[0] * k) + ' ' + f(V[1] + v[1] * k) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
    });
    (o.ticks || []).forEach(function (t) {
      var a = P[t[0]], b = P[t[1]], d = unit(a, b), n = [-d[1], d[0]], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      for (var i = 0; i < t[2]; i++) {
        var off = (i - (t[2] - 1) / 2) * 4, cx = m[0] + d[0] * off, cy = m[1] + d[1] * off;
        s += '<line x1="' + f(cx - n[0] * 5) + '" y1="' + f(cy - n[1] * 5) + '" x2="' + f(cx + n[0] * 5) + '" y2="' + f(cy + n[1] * 5) + '" stroke="currentColor" stroke-width="1.4"/>';
      }
    });
    (o.angles || []).forEach(function (g) {
      var V = P[g[0]], u = unit(V, P[g[1]]), v = unit(V, P[g[2]]), sw = (u[0] * v[1] - u[1] * v[0]) > 0 ? 1 : 0;
      for (var i = 0; i < (g[3] || 1); i++) {
        var r = 17 + 4 * i;
        s += '<path d="M' + f(V[0] + u[0] * r) + ' ' + f(V[1] + u[1] * r) + ' A' + r + ' ' + r + ' 0 0 ' + sw + ' ' + f(V[0] + v[0] * r) + ' ' + f(V[1] + v[1] * r) + '" fill="none" stroke="' + ACC + '" stroke-width="1.4"/>';
      }
    });
    var names = Object.keys(P), cx = 0, cy = 0;
    names.forEach(function (n) { cx += P[n][0]; cy += P[n][1]; });
    cx /= names.length; cy /= names.length;
    names.forEach(function (n) {
      if (hide.indexOf(n) >= 0) return;
      var p = P[n], d = lab[n];
      if (!d) { var u = unit([cx, cy], p); d = [u[0] * 13, u[1] * 13]; }
      s += '<text x="' + f(p[0] + d[0]) + '" y="' + f(p[1] + d[1]) + '" font-size="14" font-style="italic" text-anchor="middle" dominant-baseline="central" fill="currentColor">' + n.replace(/'/g, "′") + '</text>';
    });
    (o.texts || []).forEach(function (t) {
      s += '<text x="' + t[0] + '" y="' + t[1] + '" font-size="12" text-anchor="middle" fill="' + ACC + '">' + t[2] + '</text>';
    });
    return s + '</svg>';
  }
  // Hai tam giác vuông đặt cạnh nhau. Đỉnh 0 = đỉnh góc vuông, 1 = đỉnh trên, 2 = đỉnh phải.
  // ticks: [[i, j, sốGạch]], angs: [[đỉnh, sốCung]]
  function pair(n1, n2, ticks, angs) {
    var base = [[30, 150], [30, 45], [160, 150]], dx = 170, pts = {}, lab = {}, off = [[-11, 9], [-10, -6], [11, 9]];
    [n1, n2].forEach(function (nn, t) {
      nn.forEach(function (n, i) { pts[n] = [base[i][0] + dx * t, base[i][1]]; lab[n] = off[i]; });
    });
    var segs = [], right = [], tk = [], an = [];
    [n1, n2].forEach(function (nn) {
      segs.push([nn[0], nn[1]], [nn[1], nn[2]], [nn[2], nn[0]]);
      right.push([nn[0], nn[1], nn[2]]);
      (ticks || []).forEach(function (t) { tk.push([nn[t[0]], nn[t[1]], t[2]]); });
      (angs || []).forEach(function (a) {
        var others = [0, 1, 2].filter(function (i) { return i !== a[0]; });
        an.push([nn[a[0]], nn[others[0]], nn[others[1]], a[1]]);
      });
    });
    return fig({ w: 345, h: 172, max: 340, pts: pts, segs: segs, right: right, ticks: tk, angles: an, lab: lab });
  }

  // Hình: E là trung điểm BC, AB ⊥ BC, DC ⊥ BC, A, E, D thẳng hàng
  var figMid = fig({
    w: 320, h: 205, pts: { A: [40, 25], B: [40, 105], C: [280, 105], D: [280, 185], E: [160, 105] },
    segs: [["A", "B"], ["B", "C"], ["C", "D"], ["A", "D"]],
    right: [["B", "A", "C"], ["C", "D", "B"]], ticks: [["B", "E", 1], ["E", "C", 1]],
    angles: [["E", "A", "B", 1], ["E", "D", "C", 1]],
    lab: { A: [-11, -4], B: [-11, 8], C: [11, -8], D: [11, 6], E: [4, -14] }
  });

  // Hình: tia phân giác Oz của góc xOy, MA ⊥ Ox, MB ⊥ Oy
  var figBis = (function () {
    var O = [30, 170], c40 = Math.cos(40 * Math.PI / 180), s40 = Math.sin(40 * Math.PI / 180),
      c20 = Math.cos(20 * Math.PI / 180), s20 = Math.sin(20 * Math.PI / 180);
    var M = [O[0] + 200 * c20, O[1] - 200 * s20], A = [M[0], O[1]], B = foot(M, O, [O[0] + c40, O[1] - s40]);
    return fig({
      w: 320, h: 190, pts: { O: O, A: A, B: B, M: M, x: [305, 170], y: [O[0] + 235 * c40, O[1] - 235 * s40], z: [O[0] + 285 * c20, O[1] - 285 * s20] },
      segs: [["O", "x"], ["O", "y"], ["O", "z"], ["M", "A"], ["M", "B"]],
      right: [["A", "O", "M"], ["B", "O", "M"]], angles: [["O", "x", "z", 1], ["O", "z", "y", 1]],
      lab: { O: [-10, 4], A: [0, 13], B: [-8, -10], M: [10, 10], x: [0, -10], y: [10, 0], z: [0, -10] }
    });
  })();

  // Hình: tam giác ABC có AB = AC, AH ⊥ BC
  var figIso = fig({
    w: 320, h: 190, pts: { A: [160, 22], B: [50, 165], C: [270, 165], H: [160, 165] },
    segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "H"]],
    right: [["H", "A", "C"]], ticks: [["A", "B", 1], ["A", "C", 1]],
    lab: { A: [0, -11], B: [-11, 6], C: [11, 6], H: [0, 14] }
  });

  // Hình: AB = AD, góc B = góc D = 90°, góc BAC = 65°
  var figKite = (function () {
    var A = [20, 120], C = [300, 120], k = 280 * Math.cos(65 * Math.PI / 180),
      B = [A[0] + k * Math.cos(65 * Math.PI / 180), A[1] - k * Math.sin(65 * Math.PI / 180)],
      D = [B[0], 2 * A[1] - B[1]];
    return fig({
      w: 320, h: 245, pts: { A: A, B: B, C: C, D: D },
      segs: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"]],
      right: [["B", "A", "C"], ["D", "A", "C"]], ticks: [["A", "B", 1], ["A", "D", 1]],
      lab: { A: [-11, 0], B: [0, -11], C: [11, 0], D: [0, 13] }
    });
  })();

  // Hình: M là trung điểm BC, BH ⊥ AM, CK ⊥ AM
  var figHK = (function () {
    var A = [120, 15], B = [30, 160], C = [290, 160], M = [160, 160], H = foot(B, A, M), K = foot(C, A, M);
    return fig({
      w: 320, h: 212, pts: { A: A, B: B, C: C, M: M, H: H, K: K },
      segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "K"], ["B", "H"], ["C", "K"]],
      right: [["H", "B", "A"], ["K", "C", "A"]], ticks: [["B", "M", 1], ["M", "C", 1]],
      lab: { A: [0, -10], B: [-11, 4], C: [11, 4], M: [12, 10], H: [12, -2], K: [-12, 6] }
    });
  })();

  // Hình: tam giác ABC vuông tại C, ABD vuông tại D, góc CAB = góc DAB
  var figCD = (function () {
    var B = [30, 110], A = [290, 110], r = 260 * Math.cos(25 * Math.PI / 180),
      C = [A[0] - r * Math.cos(25 * Math.PI / 180), A[1] - r * Math.sin(25 * Math.PI / 180)], D = [C[0], 220 - C[1]];
    return fig({
      w: 320, h: 222, pts: { A: A, B: B, C: C, D: D },
      segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "D"], ["B", "D"]],
      right: [["C", "A", "B"], ["D", "A", "B"]], angles: [["A", "C", "B", 1], ["A", "B", "D", 1]],
      lab: { A: [11, 0], B: [-11, 0], C: [-4, -10], D: [-4, 12] }
    });
  })();

  // Hình: AB = AD, CB = CD, AC ⊥ BD tại E (AE ≠ CE)
  var figKite2 = fig({
    w: 320, h: 190, pts: { A: [30, 95], B: [110, 25], C: [290, 95], D: [110, 165], E: [110, 95] },
    segs: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"], ["B", "D"]],
    right: [["E", "B", "C"]], ticks: [["A", "B", 1], ["A", "D", 1], ["C", "B", 2], ["C", "D", 2]],
    lab: { A: [-11, 0], B: [0, -11], C: [11, 0], D: [0, 13], E: [10, 12] }
  });

  registerLesson({
    id: "c4-b15",
    chapter: 4,
    kind: "lesson",
    title: "Bài 15. Các trường hợp bằng nhau của tam giác vuông",
    sgkPages: [75, 79],
    sbtPages: [63, 66],
    objectives: [
      "Nhận biết cạnh huyền, cạnh góc vuông của tam giác vuông",
      "Giải thích và vận dụng ba trường hợp bằng nhau của tam giác vuông suy ra từ c.g.c và g.c.g",
      "Vận dụng trường hợp đặc biệt cạnh huyền – cạnh góc vuông",
      "Chứng minh hai đoạn thẳng, hai góc bằng nhau nhờ hai tam giác vuông bằng nhau"
    ],

    theory: [
      {
        heading: "1. Nhắc lại về tam giác vuông",
        html: "<ul><li>Tam giác vuông là tam giác có một góc vuông.</li>" +
          "<li>Trong tam giác $ABC$ vuông tại $A$: hai cạnh kề góc vuông $AB$, $AC$ gọi là <b>cạnh góc vuông</b>; cạnh đối diện góc vuông $BC$ gọi là <b>cạnh huyền</b>.</li>" +
          "<li>Hai góc nhọn của tam giác vuông <b>phụ nhau</b>: $\\widehat{B} + \\widehat{C} = 90^\\circ$. Vì vậy nếu hai tam giác vuông có một cặp góc nhọn bằng nhau thì cặp góc nhọn còn lại cũng bằng nhau.</li></ul>"
      },
      {
        heading: "2. Ba trường hợp bằng nhau suy ra từ c.g.c và g.c.g",
        html: "Hai tam giác vuông đã có sẵn một cặp góc bằng nhau (góc vuông), nên chỉ cần thêm <b>hai yếu tố</b>:" +
          "<ul><li><b>Hai cạnh góc vuông:</b> nếu hai cạnh góc vuông của tam giác vuông này lần lượt bằng hai cạnh góc vuông của tam giác vuông kia thì hai tam giác vuông đó bằng nhau (vì góc vuông là góc xen giữa → c.g.c)." +
          pair(["A", "B", "C"], ["A'", "B'", "C'"], [[0, 1, 1], [0, 2, 2]], []) + "</li>" +
          "<li><b>Cạnh góc vuông – góc nhọn kề:</b> nếu một cạnh góc vuông và góc nhọn kề cạnh ấy của tam giác vuông này bằng một cạnh góc vuông và góc nhọn kề cạnh ấy của tam giác vuông kia thì hai tam giác vuông đó bằng nhau (cạnh nằm giữa góc vuông và góc nhọn → g.c.g)." +
          pair(["A", "B", "C"], ["A'", "B'", "C'"], [[0, 1, 1]], [[1, 1]]) + "</li>" +
          "<li><b>Cạnh huyền – góc nhọn:</b> nếu cạnh huyền và một góc nhọn của tam giác vuông này bằng cạnh huyền và một góc nhọn của tam giác vuông kia thì hai tam giác vuông đó bằng nhau (góc nhọn còn lại cũng bằng nhau vì cùng phụ với góc đã biết → g.c.g với cạnh huyền nằm giữa hai góc nhọn)." +
          pair(["A", "B", "C"], ["A'", "B'", "C'"], [[1, 2, 1]], [[1, 1]]) + "</li></ul>"
      },
      {
        heading: "3. Trường hợp đặc biệt: cạnh huyền – cạnh góc vuông",
        html: "<b>Định lí</b> (thừa nhận): Nếu cạnh huyền và một cạnh góc vuông của tam giác vuông này bằng cạnh huyền và một cạnh góc vuông của tam giác vuông kia thì hai tam giác vuông đó bằng nhau." +
          pair(["A", "B", "C"], ["A'", "B'", "C'"], [[1, 2, 1], [0, 1, 2]], []) +
          "Ví dụ: hai tam giác vuông có cạnh huyền cùng bằng $5$ cm và một cạnh góc vuông cùng bằng $3$ cm thì bằng nhau (cạnh góc vuông còn lại của chúng cũng bằng nhau)."
      },
      {
        heading: "4. Tóm tắt và chú ý",
        html: "<table><tr><th>Trường hợp</th><th>Hai tam giác vuông có</th></tr>" +
          "<tr><td>Hai cạnh góc vuông</td><td>2 cạnh góc vuông tương ứng bằng nhau</td></tr>" +
          "<tr><td>Cạnh góc vuông – góc nhọn kề</td><td>1 cạnh góc vuông + góc nhọn kề cạnh ấy</td></tr>" +
          "<tr><td>Cạnh huyền – góc nhọn</td><td>cạnh huyền + 1 góc nhọn</td></tr>" +
          "<tr><td>Cạnh huyền – cạnh góc vuông</td><td>cạnh huyền + 1 cạnh góc vuông</td></tr></table>" +
          "<ul><li>Nếu biết một cạnh góc vuông và góc nhọn <b>đối diện</b> cạnh ấy bằng nhau, ta suy ra góc nhọn kề cũng bằng nhau (cùng phụ với góc đã biết), rồi dùng trường hợp cạnh góc vuông – góc nhọn kề.</li>" +
          "<li>Hai tam giác vuông chỉ có các <b>góc</b> tương ứng bằng nhau thì <b>chưa chắc</b> bằng nhau: cần ít nhất một cặp cạnh tương ứng bằng nhau.</li>" +
          "<li>Khi viết $\\Delta ABC = \\Delta DEF$, các đỉnh tương ứng phải viết đúng thứ tự (đỉnh góc vuông ứng với đỉnh góc vuông).</li></ul>"
      }
    ],

    skills: [
      "<b>Các bước chứng minh hai tam giác vuông bằng nhau:</b> (1) chỉ ra hai tam giác vuông (vuông tại đâu); (2) liệt kê hai cặp yếu tố bằng nhau kèm lí do (giả thiết, cạnh chung, góc chung, góc đối đỉnh…); (3) kết luận và ghi rõ trường hợp.",
      "<b>Nhận ra cạnh huyền:</b> cạnh huyền luôn là cạnh <b>đối diện</b> góc vuông. Đừng nhầm cạnh huyền với cạnh góc vuông khi chọn trường hợp.",
      "<b>Tìm yếu tố chung:</b> cạnh chung (thường là cạnh huyền chung hoặc đường vuông góc chung), góc chung, hai góc đối đỉnh là những \"cặp bằng nhau miễn phí\" hay gặp.",
      "<b>Suy ra cạnh, góc bằng nhau:</b> muốn chứng minh hai đoạn thẳng (hai góc) bằng nhau, hãy tìm hai tam giác vuông chứa chúng ở vị trí tương ứng rồi chứng minh hai tam giác đó bằng nhau.",
      "<b>Điểm trên tia phân giác:</b> một điểm nằm trên tia phân giác của một góc thì cách đều hai cạnh của góc (hai tam giác vuông bằng nhau theo cạnh huyền – góc nhọn). Ngược lại, điểm nằm trong góc và cách đều hai cạnh thì nằm trên tia phân giác (cạnh huyền – cạnh góc vuông).",
      "<b>Lỗi hay gặp:</b> dùng \"góc – góc – góc\" để kết luận hai tam giác bằng nhau; chọn trường hợp \"cạnh góc vuông – góc nhọn kề\" khi góc nhọn lại đối diện với cạnh đó mà không giải thích; viết sai thứ tự đỉnh tương ứng."
    ],

    examples: [
      {
        q: "Hai tam giác $ABC$ vuông tại $A$ và $DEF$ vuông tại $D$ có $BC = EF = 5$ cm, $AC = DF = 4$ cm. Hai tam giác này có bằng nhau không? Biết $AB = 3$ cm, tính $DE$.",
        solution: "$BC$, $EF$ là các cạnh huyền; $AC$, $DF$ là các cạnh góc vuông.<br>" +
          "Hai tam giác vuông $ABC$ và $DEF$ có: $BC = EF$ (cạnh huyền), $AC = DF$ (cạnh góc vuông).<br>" +
          "Vậy $\\Delta ABC = \\Delta DEF$ (cạnh huyền – cạnh góc vuông). Suy ra $DE = AB = 3$ cm (hai cạnh tương ứng)."
      },
      {
        q: "Cho đoạn thẳng $BC$ có trung điểm $E$. Trên hai nửa mặt phẳng đối nhau bờ $BC$, kẻ $BA \\perp BC$, $CD \\perp BC$ sao cho $A, E, D$ thẳng hàng. Chứng minh $\\Delta ABE = \\Delta DCE$ và $AB = CD$." + figMid,
        solution: "Hai tam giác $ABE$ (vuông tại $B$) và $DCE$ (vuông tại $C$) có:<br>" +
          "• $BE = CE$ ($E$ là trung điểm $BC$) — cạnh góc vuông;<br>" +
          "• $\\widehat{AEB} = \\widehat{DEC}$ (hai góc đối đỉnh) — góc nhọn kề cạnh góc vuông đó.<br>" +
          "Vậy $\\Delta ABE = \\Delta DCE$ (cạnh góc vuông – góc nhọn kề), suy ra $AB = DC$ (hai cạnh tương ứng)."
      },
      {
        q: "Cho $Oz$ là tia phân giác của $\\widehat{xOy}$. Lấy điểm $M$ trên $Oz$, kẻ $MA \\perp Ox$ ($A \\in Ox$), $MB \\perp Oy$ ($B \\in Oy$). Chứng minh $MA = MB$." + figBis,
        solution: "Hai tam giác $OAM$ (vuông tại $A$) và $OBM$ (vuông tại $B$) có:<br>" +
          "• $OM$ là cạnh huyền chung;<br>" +
          "• $\\widehat{AOM} = \\widehat{BOM}$ (vì $Oz$ là tia phân giác).<br>" +
          "Vậy $\\Delta OAM = \\Delta OBM$ (cạnh huyền – góc nhọn), suy ra $MA = MB$.<br>" +
          "<i>Nhận xét:</i> mọi điểm nằm trên tia phân giác của một góc đều cách đều hai cạnh của góc đó."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$. Cạnh huyền của tam giác là",
            options: ["$BC$", "$AB$", "$AC$", "$AH$ ($H$ là chân đường vuông góc kẻ từ $A$ xuống $BC$)"],
            answer: 0,
            explain: "Cạnh huyền là cạnh đối diện với góc vuông. Góc vuông ở đỉnh $A$ nên cạnh huyền là $BC$; còn $AB$, $AC$ là hai cạnh góc vuông."
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.75 – HĐ1",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $AB = DE$, $AC = DF$. Hai tam giác này bằng nhau theo trường hợp nào?",
            options: ["Cạnh huyền – góc nhọn", "Hai cạnh góc vuông", "Cạnh huyền – cạnh góc vuông", "Cạnh góc vuông – góc nhọn kề"],
            answer: 1,
            explain: "$AB, AC$ và $DE, DF$ đều là các cạnh góc vuông, nên $\\Delta ABC = \\Delta DEF$ theo trường hợp hai cạnh góc vuông."
          },
          {
            id: "d1q3", level: "de", source: "SGK tr.76 – HĐ3",
            q: "Tam giác $MNP$ vuông tại $M$ và tam giác $HIK$ vuông tại $H$ có $NP = IK$, $\\widehat{N} = \\widehat{I}$. Khẳng định nào đúng?",
            options: ["$\\Delta MNP = \\Delta HKI$ (cạnh huyền – góc nhọn)", "$\\Delta NMP = \\Delta HIK$ (cạnh huyền – góc nhọn)", "$\\Delta MNP = \\Delta HIK$ (cạnh huyền – góc nhọn)", "$\\Delta MNP = \\Delta HIK$ (hai cạnh góc vuông)"],
            answer: 2,
            explain: "$NP$, $IK$ là cạnh huyền; $\\widehat{N} = \\widehat{I}$ là góc nhọn. Các đỉnh tương ứng: $M \\leftrightarrow H$ (góc vuông), $N \\leftrightarrow I$, $P \\leftrightarrow K$. Vậy $\\Delta MNP = \\Delta HIK$ (cạnh huyền – góc nhọn)."
          },
          {
            id: "d1q4", level: "de", source: "SGK tr.78 – Câu hỏi (Hình 4.52)",
            q: "Hai tam giác vuông trong hình dưới đây bằng nhau theo trường hợp nào?" +
              pair(["A", "B", "C"], ["D", "E", "F"], [[1, 2, 1], [0, 1, 2]], []),
            options: ["Hai cạnh góc vuông", "Cạnh huyền – góc nhọn", "Cạnh góc vuông – góc nhọn kề", "Cạnh huyền – cạnh góc vuông"],
            answer: 3,
            explain: "Hình cho $BC = EF$ (cạnh huyền, 1 gạch) và $AB = DE$ (cạnh góc vuông, 2 gạch). Đó là trường hợp cạnh huyền – cạnh góc vuông."
          },
          {
            id: "d1q5", level: "vua", source: "SGK tr.76 – HĐ2",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $AC = DF$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta DEF$ theo trường hợp <b>cạnh góc vuông – góc nhọn kề</b>?",
            options: ["$\\widehat{B} = \\widehat{E}$", "$\\widehat{C} = \\widehat{F}$", "$BC = EF$", "$AB = DE$"],
            answer: 1,
            explain: "Góc nhọn kề cạnh $AC$ là $\\widehat{C}$, kề cạnh $DF$ là $\\widehat{F}$. Vậy cần $\\widehat{C} = \\widehat{F}$. ($\\widehat{B} = \\widehat{E}$ là góc đối diện; $BC = EF$ hay $AB = DE$ thuộc các trường hợp khác.)"
          },
          {
            id: "d1q6", level: "vua", source: "SGK tr.78 – Định lí",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $MNP$ vuông tại $M$ có $BC = NP = 10$ cm, $AB = MN = 6$ cm. Khẳng định nào đúng?",
            options: ["$\\Delta ABC = \\Delta MPN$", "Không đủ điều kiện kết luận hai tam giác bằng nhau", "$\\Delta ABC = \\Delta MNP$ và $AC = MP$", "$\\Delta ABC = \\Delta MNP$ và $AC = NP$"],
            answer: 2,
            explain: "Cạnh huyền $BC = NP$ và cạnh góc vuông $AB = MN$, nên $\\Delta ABC = \\Delta MNP$ (cạnh huyền – cạnh góc vuông) với $A \\leftrightarrow M$, $B \\leftrightarrow N$, $C \\leftrightarrow P$. Suy ra $AC = MP$."
          },
          {
            id: "d1q7", level: "vua", source: "SBT Bài 15 – Ví dụ 2",
            q: "Cho tam giác $ABC$ có $AB = AC$, kẻ $AH \\perp BC$ ($H \\in BC$) như hình. Hai tam giác vuông $AHB$ và $AHC$ bằng nhau theo trường hợp nào?" + figIso,
            options: ["Hai cạnh góc vuông", "Cạnh góc vuông – góc nhọn kề", "Cạnh huyền – góc nhọn", "Cạnh huyền – cạnh góc vuông"],
            answer: 3,
            explain: "Hai tam giác vuông tại $H$ có cạnh huyền $AB = AC$ và cạnh góc vuông $AH$ chung, nên bằng nhau theo trường hợp cạnh huyền – cạnh góc vuông."
          },
          {
            id: "d1q8", level: "vua", source: "SGK tr.77 – Luyện tập 2",
            q: "Cho $Oz$ là tia phân giác của $\\widehat{xOy}$, điểm $M$ thuộc $Oz$; $MA \\perp Ox$ ($A \\in Ox$), $MB \\perp Oy$ ($B \\in Oy$). Biết $OA = 5$ cm, $MA = 3$ cm. Độ dài $MB$ là",
            options: ["$3$ cm", "$5$ cm", "$4$ cm", "$8$ cm"],
            answer: 0,
            explain: "$\\Delta OAM = \\Delta OBM$ (cạnh huyền $OM$ chung, $\\widehat{AOM} = \\widehat{BOM}$) nên $MB = MA = 3$ cm."
          },
          {
            id: "d1q9", level: "kho", source: "mới",
            q: "Khẳng định nào sau đây là <b>sai</b>?",
            options: [
              "Hai tam giác vuông có cạnh huyền và một cạnh góc vuông tương ứng bằng nhau thì bằng nhau",
              "Hai tam giác vuông có hai cạnh góc vuông tương ứng bằng nhau thì bằng nhau",
              "Hai tam giác vuông có hai góc nhọn tương ứng bằng nhau thì bằng nhau",
              "Hai tam giác vuông có cạnh huyền và một góc nhọn tương ứng bằng nhau thì bằng nhau"
            ],
            answer: 2,
            explain: "Chỉ biết các góc bằng nhau thì chưa đủ: một tam giác vuông nhỏ và một tam giác vuông lớn có thể có cùng các góc nhưng cạnh khác nhau. Ba khẳng định còn lại là các trường hợp bằng nhau của tam giác vuông."
          },
          {
            id: "d1q10", level: "kho", source: "SBT Bài 15 – BT 4.32",
            q: "Trong hình, $E$ là trung điểm của $BC$, $AB \\perp BC$, $DC \\perp BC$ và $A, E, D$ thẳng hàng. Biết $AB = 4$ cm, $AE = 5$ cm. Độ dài $DE$ là" + figMid,
            options: ["$4$ cm", "$5$ cm", "$9$ cm", "$3$ cm"],
            answer: 1,
            explain: "$\\Delta ABE$ (vuông tại $B$) và $\\Delta DCE$ (vuông tại $C$) có $BE = CE$, $\\widehat{AEB} = \\widehat{DEC}$ (đối đỉnh) nên $\\Delta ABE = \\Delta DCE$ (cạnh góc vuông – góc nhọn kề). Suy ra $DE = AE = 5$ cm."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SBT Bài 15 – Ví dụ 2 (biến đổi)", maxPoints: 3,
            q: "Cho tam giác $ABC$ có $AB = AC$. Kẻ $AH$ vuông góc với $BC$ ($H \\in BC$).<br>a) Chứng minh $\\Delta AHB = \\Delta AHC$.<br>b) Chứng minh $HB = HC$ và $AH$ là tia phân giác của $\\widehat{BAC}$." + figIso,
            modelAnswer: "a) Hai tam giác $AHB$ (vuông tại $H$) và $AHC$ (vuông tại $H$) có:<br>" +
              "• $AB = AC$ (giả thiết) — cạnh huyền;<br>• $AH$ là cạnh chung — cạnh góc vuông.<br>" +
              "Vậy $\\Delta AHB = \\Delta AHC$ (cạnh huyền – cạnh góc vuông).<br>" +
              "b) Từ $\\Delta AHB = \\Delta AHC$ suy ra $HB = HC$ (hai cạnh tương ứng) và $\\widehat{BAH} = \\widehat{CAH}$ (hai góc tương ứng).<br>" +
              "Tia $AH$ nằm giữa hai tia $AB$, $AC$ và tạo với chúng hai góc bằng nhau nên $AH$ là tia phân giác của $\\widehat{BAC}$.",
            rubric: [
              { pts: 0.5, text: "Chỉ ra hai tam giác vuông tại $H$." },
              { pts: 0.5, text: "Nêu đủ hai yếu tố: $AB = AC$ (cạnh huyền), $AH$ chung." },
              { pts: 0.5, text: "Kết luận $\\Delta AHB = \\Delta AHC$, ghi đúng trường hợp cạnh huyền – cạnh góc vuông." },
              { pts: 0.75, text: "Suy ra $HB = HC$ (cạnh tương ứng)." },
              { pts: 0.75, text: "Suy ra $\\widehat{BAH} = \\widehat{CAH}$ và kết luận $AH$ là tia phân giác." }
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
            q: "Trong một tam giác vuông, hai góc nhọn",
            options: ["bù nhau", "phụ nhau (có tổng bằng $90^\\circ$)", "luôn bằng nhau", "có một góc gấp đôi góc kia"],
            answer: 1,
            explain: "Tổng ba góc của tam giác là $180^\\circ$, góc vuông bằng $90^\\circ$ nên tổng hai góc nhọn bằng $90^\\circ$: hai góc nhọn phụ nhau."
          },
          {
            id: "d2q2", level: "de", source: "SGK tr.78 – Ví dụ 2",
            q: "Tam giác $ABC$ vuông tại $B$ và tam giác $DEF$ vuông tại $E$ có $AC = DF$, $AB = DE$. Hai tam giác bằng nhau theo trường hợp",
            options: ["hai cạnh góc vuông", "cạnh góc vuông – góc nhọn kề", "cạnh huyền – cạnh góc vuông", "cạnh huyền – góc nhọn"],
            answer: 2,
            explain: "Góc vuông ở $B$ và $E$ nên $AC$, $DF$ là cạnh huyền; $AB$, $DE$ là cạnh góc vuông. Đó là trường hợp cạnh huyền – cạnh góc vuông."
          },
          {
            id: "d2q3", level: "de", source: "SGK tr.76 – HĐ2",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $A'B'C'$ vuông tại $A'$ có $AB = A'B'$, $\\widehat{B} = \\widehat{B'}$. Hai tam giác bằng nhau theo trường hợp",
            options: ["hai cạnh góc vuông", "cạnh huyền – góc nhọn", "cạnh huyền – cạnh góc vuông", "cạnh góc vuông – góc nhọn kề"],
            answer: 3,
            explain: "$AB$, $A'B'$ là cạnh góc vuông; $\\widehat{B}$, $\\widehat{B'}$ là góc nhọn kề cạnh đó. Vậy là trường hợp cạnh góc vuông – góc nhọn kề."
          },
          {
            id: "d2q4", level: "de", source: "SGK tr.75 – Hình 4.45",
            q: "Hai tam giác vuông trong hình dưới đây bằng nhau theo trường hợp nào?" +
              pair(["M", "N", "P"], ["H", "I", "K"], [[0, 1, 1], [0, 2, 2]], []),
            options: ["Hai cạnh góc vuông", "Cạnh huyền – cạnh góc vuông", "Cạnh huyền – góc nhọn", "Cạnh góc vuông – góc nhọn kề"],
            answer: 0,
            explain: "Hình cho $MN = HI$ (1 gạch) và $MP = HK$ (2 gạch), đều là cạnh góc vuông. Vậy $\\Delta MNP = \\Delta HIK$ (hai cạnh góc vuông)."
          },
          {
            id: "d2q5", level: "vua", source: "SGK tr.76 – HĐ3",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $BC = EF$. Cần thêm điều kiện nào để $\\Delta ABC = \\Delta DEF$ theo trường hợp <b>cạnh huyền – góc nhọn</b>?",
            options: ["$AB = DE$", "$\\widehat{B} = \\widehat{E}$", "$\\widehat{A} = \\widehat{D}$", "$\\widehat{B} = \\widehat{F}$"],
            answer: 1,
            explain: "Cần thêm một cặp góc nhọn tương ứng: $\\widehat{B} = \\widehat{E}$. ($AB = DE$ là trường hợp cạnh huyền – cạnh góc vuông; $\\widehat{A} = \\widehat{D} = 90^\\circ$ đã có sẵn; $\\widehat{B} = \\widehat{F}$ không ứng với thứ tự $\\Delta DEF$.)"
          },
          {
            id: "d2q6", level: "vua", source: "SGK tr.78 – Định lí",
            q: "Tam giác $PQR$ vuông tại $P$ có $PQ = 5$ cm, $QR = 13$ cm. Tam giác vuông nào sau đây <b>chắc chắn</b> bằng tam giác $PQR$?",
            options: [
              "$\\Delta MNK$ vuông tại $M$, $MN = 5$ cm, $MK = 13$ cm",
              "$\\Delta MNK$ vuông tại $N$, $MN = 5$ cm, $NK = 13$ cm",
              "$\\Delta MNK$ vuông tại $M$, $MN = 5$ cm, $NK = 13$ cm",
              "$\\Delta MNK$ vuông tại $M$, $MN = MK = 5$ cm"
            ],
            answer: 2,
            explain: "$QR = 13$ cm là cạnh huyền, $PQ = 5$ cm là cạnh góc vuông. Tam giác $MNK$ vuông tại $M$ có cạnh huyền $NK = 13$ cm và cạnh góc vuông $MN = 5$ cm nên bằng $\\Delta PQR$ (cạnh huyền – cạnh góc vuông). Ở hai phương án đầu, $13$ cm là cạnh góc vuông chứ không phải cạnh huyền."
          },
          {
            id: "d2q7", level: "vua", source: "SGK tr.77 – Luyện tập 2",
            q: "Điểm $M$ nằm trên tia phân giác $Oz$ của $\\widehat{xOy}$; $MA \\perp Ox$ ($A \\in Ox$), $MB \\perp Oy$ ($B \\in Oy$). Biết $\\widehat{AMO} = 55^\\circ$. Số đo $\\widehat{BMO}$ là" + figBis,
            options: ["$35^\\circ$", "$110^\\circ$", "$45^\\circ$", "$55^\\circ$"],
            answer: 3,
            explain: "$\\Delta OAM = \\Delta OBM$ (cạnh huyền $OM$ chung, $\\widehat{AOM} = \\widehat{BOM}$) nên $\\widehat{BMO} = \\widehat{AMO} = 55^\\circ$ (hai góc tương ứng)."
          },
          {
            id: "d2q8", level: "vua", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $BC = EF = 10$ cm, $\\widehat{C} = \\widehat{F} = 30^\\circ$ và $AB = 5$ cm. Độ dài $DE$ là",
            options: ["$5$ cm", "$10$ cm", "$2{,}5$ cm", "$15$ cm"],
            answer: 0,
            explain: "$\\Delta ABC = \\Delta DEF$ (cạnh huyền $BC = EF$, góc nhọn $\\widehat{C} = \\widehat{F}$). Suy ra $DE = AB = 5$ cm."
          },
          {
            id: "d2q9", level: "kho", source: "SBT Bài 15 – BT 4.33 (biến đổi)",
            q: "Cho tam giác $ABC$ có $AB = AC$. Kẻ $BD \\perp AC$ ($D \\in AC$), $CE \\perp AB$ ($E \\in AB$). Khẳng định nào đúng?",
            options: ["$\\Delta ABD = \\Delta AEC$", "$\\Delta ABD = \\Delta ACE$", "$\\Delta ADB = \\Delta ACE$", "$\\Delta BAD = \\Delta ACE$"],
            answer: 1,
            explain: "$\\Delta ABD$ vuông tại $D$, $\\Delta ACE$ vuông tại $E$ có cạnh huyền $AB = AC$ và góc nhọn $\\widehat{A}$ chung, nên bằng nhau (cạnh huyền – góc nhọn). Đỉnh tương ứng: $A \\leftrightarrow A$, $B \\leftrightarrow C$, $D \\leftrightarrow E$, tức $\\Delta ABD = \\Delta ACE$."
          },
          {
            id: "d2q10", level: "kho", source: "SGK Bài 15 – BT 4.22",
            q: "Cho hình chữ nhật $ABCD$, $M$ là trung điểm của cạnh $BC$. Biết $AM = 6{,}5$ cm. Độ dài $DM$ là",
            options: ["$13$ cm", "$3{,}25$ cm", "$6{,}5$ cm", "Không tính được vì thiếu dữ kiện"],
            answer: 2,
            explain: "$\\Delta ABM$ (vuông tại $B$) và $\\Delta DCM$ (vuông tại $C$) có $AB = DC$ (cạnh hình chữ nhật), $BM = CM$. Vậy $\\Delta ABM = \\Delta DCM$ (hai cạnh góc vuông), suy ra $DM = AM = 6{,}5$ cm."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SGK Bài 15 – BT 4.21 (biến đổi)", maxPoints: 1.5,
            q: "Hai đoạn thẳng $AC$ và $BD$ cắt nhau tại $E$. Biết $\\widehat{BAE} = \\widehat{CDE} = 90^\\circ$ và $AB = DC$. Chứng minh $\\Delta ABE = \\Delta DCE$.",
            modelAnswer: "Ta có $\\widehat{AEB} = \\widehat{DEC}$ (hai góc đối đỉnh).<br>" +
              "Trong $\\Delta ABE$ vuông tại $A$: $\\widehat{ABE} = 90^\\circ - \\widehat{AEB}$. Trong $\\Delta DCE$ vuông tại $D$: $\\widehat{DCE} = 90^\\circ - \\widehat{DEC}$. Do đó $\\widehat{ABE} = \\widehat{DCE}$.<br>" +
              "Hai tam giác vuông $ABE$ và $DCE$ có: $AB = DC$ (giả thiết), $\\widehat{ABE} = \\widehat{DCE}$ (góc nhọn kề cạnh góc vuông đó).<br>" +
              "Vậy $\\Delta ABE = \\Delta DCE$ (cạnh góc vuông – góc nhọn kề).<br>" +
              "<i>Cách khác:</i> có $AB = DC$ và góc nhọn đối diện $\\widehat{AEB} = \\widehat{DEC}$, suy ra góc nhọn kề bằng nhau như trên.",
            rubric: [
              { pts: 0.5, text: "Nêu $\\widehat{AEB} = \\widehat{DEC}$ (đối đỉnh)." },
              { pts: 0.5, text: "Suy ra $\\widehat{ABE} = \\widehat{DCE}$ (cùng phụ với hai góc bằng nhau)." },
              { pts: 0.5, text: "Kết luận $\\Delta ABE = \\Delta DCE$ với đúng trường hợp và đúng thứ tự đỉnh." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SBT Bài 15 – BT 4.36 (biến đổi)", maxPoints: 1.5,
            q: "Cho tam giác $ABC$, $M$ là trung điểm của $BC$. Kẻ $BH$ và $CK$ cùng vuông góc với đường thẳng $AM$ ($H$, $K$ thuộc đường thẳng $AM$). Chứng minh $BH = CK$." + figHK,
            modelAnswer: "Hai tam giác $BHM$ (vuông tại $H$) và $CKM$ (vuông tại $K$) có:<br>" +
              "• $BM = CM$ ($M$ là trung điểm $BC$) — cạnh huyền;<br>" +
              "• $\\widehat{BMH} = \\widehat{CMK}$ (hai góc đối đỉnh) — góc nhọn.<br>" +
              "Vậy $\\Delta BHM = \\Delta CKM$ (cạnh huyền – góc nhọn), suy ra $BH = CK$ (hai cạnh tương ứng).",
            rubric: [
              { pts: 0.5, text: "Chỉ ra hai tam giác vuông $BHM$, $CKM$ và $BM = CM$ là cạnh huyền." },
              { pts: 0.5, text: "Nêu $\\widehat{BMH} = \\widehat{CMK}$ (đối đỉnh) và kết luận hai tam giác bằng nhau (cạnh huyền – góc nhọn)." },
              { pts: 0.5, text: "Suy ra $BH = CK$." }
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
            q: "Tam giác $DEF$ vuông tại $E$. Hai cạnh góc vuông của tam giác là",
            options: ["$DF$ và $EF$", "$DE$ và $DF$", "$DE$ và $EF$", "Chỉ có cạnh $DF$"],
            answer: 2,
            explain: "Hai cạnh góc vuông là hai cạnh kề góc vuông $E$: $DE$ và $EF$. Cạnh $DF$ đối diện góc vuông nên là cạnh huyền."
          },
          {
            id: "d3q2", level: "de", source: "SGK tr.76 – HĐ3",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $MNP$ vuông tại $M$ có $BC = NP$, $\\widehat{C} = \\widehat{P}$. Hai tam giác bằng nhau theo trường hợp",
            options: ["hai cạnh góc vuông", "cạnh huyền – cạnh góc vuông", "cạnh góc vuông – góc nhọn kề", "cạnh huyền – góc nhọn"],
            answer: 3,
            explain: "$BC$, $NP$ là cạnh huyền và $\\widehat{C} = \\widehat{P}$ là một cặp góc nhọn, nên đó là trường hợp cạnh huyền – góc nhọn."
          },
          {
            id: "d3q3", level: "de", source: "SGK tr.75 – HĐ1",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $AB = DE$, $AC = DF$. Cách viết nào đúng?",
            options: ["$\\Delta ABC = \\Delta DEF$", "$\\Delta ABC = \\Delta DFE$", "$\\Delta ABC = \\Delta EDF$", "$\\Delta ACB = \\Delta DEF$"],
            answer: 0,
            explain: "Đỉnh tương ứng: $A \\leftrightarrow D$ (góc vuông), $B \\leftrightarrow E$ (vì $AB = DE$), $C \\leftrightarrow F$ (vì $AC = DF$). Vậy $\\Delta ABC = \\Delta DEF$."
          },
          {
            id: "d3q4", level: "de", source: "SGK tr.77 – Câu hỏi (Hình 4.48)",
            q: "Hai tam giác vuông trong hình dưới đây bằng nhau theo trường hợp nào?" +
              pair(["D", "E", "F"], ["M", "N", "P"], [[1, 2, 1]], [[1, 1]]),
            options: ["Hai cạnh góc vuông", "Cạnh huyền – góc nhọn", "Cạnh huyền – cạnh góc vuông", "Cạnh góc vuông – góc nhọn kề"],
            answer: 1,
            explain: "Hình cho $EF = NP$ (cạnh huyền) và $\\widehat{E} = \\widehat{N}$ (góc nhọn). Vậy $\\Delta DEF = \\Delta MNP$ (cạnh huyền – góc nhọn)."
          },
          {
            id: "d3q5", level: "vua", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $AB = DE$. Thêm điều kiện nào sau đây thì <b>không đủ</b> để kết luận $\\Delta ABC = \\Delta DEF$?",
            options: ["$AC = DF$", "$BC = EF$", "$\\widehat{B} = \\widehat{E}$", "$\\widehat{B} = \\widehat{F}$"],
            answer: 3,
            explain: "$AC = DF$: hai cạnh góc vuông; $BC = EF$: cạnh huyền – cạnh góc vuông; $\\widehat{B} = \\widehat{E}$: cạnh góc vuông – góc nhọn kề. Còn $\\widehat{B} = \\widehat{F}$ không ứng với các đỉnh tương ứng $B \\leftrightarrow E$, nên không kết luận được $\\Delta ABC = \\Delta DEF$."
          },
          {
            id: "d3q6", level: "vua", source: "SBT Bài 15 – Ví dụ 2",
            q: "Cho tam giác $ABC$ có $AB = AC$, kẻ $AH \\perp BC$ ($H \\in BC$). Biết $HB = 4$ cm. Độ dài $BC$ là",
            options: ["$4$ cm", "$2$ cm", "$8$ cm", "$16$ cm"],
            answer: 2,
            explain: "$\\Delta AHB = \\Delta AHC$ (cạnh huyền $AB = AC$, cạnh góc vuông $AH$ chung) nên $HC = HB = 4$ cm. Vậy $BC = HB + HC = 8$ cm."
          },
          {
            id: "d3q7", level: "vua", source: "SGK tr.78 – Ví dụ 2",
            q: "Trong hình, $\\widehat{ABC} = \\widehat{ADC} = 90^\\circ$, $AB = AD$ và $\\widehat{BAC} = 65^\\circ$. Số đo $\\widehat{BCD}$ là" + figKite,
            options: ["$50^\\circ$", "$25^\\circ$", "$65^\\circ$", "$130^\\circ$"],
            answer: 0,
            explain: "$\\Delta ABC = \\Delta ADC$ (cạnh huyền $AC$ chung, $AB = AD$) nên $\\widehat{BCA} = \\widehat{DCA}$. Trong $\\Delta ABC$ vuông tại $B$: $\\widehat{BCA} = 90^\\circ - 65^\\circ = 25^\\circ$. Vậy $\\widehat{BCD} = 25^\\circ + 25^\\circ = 50^\\circ$."
          },
          {
            id: "d3q8", level: "vua", source: "SGK tr.79 – Thử thách nhỏ",
            q: "Hai chiếc thang $AB$ và $A'B'$ dài bằng nhau dựa vào tường thẳng đứng, chạm tường ở cùng độ cao: $BH = B'H'$ ($H$, $H'$ là chân tường, $BH \\perp AH$, $B'H' \\perp A'H'$). Khẳng định nào đúng?",
            options: [
              "$\\widehat{BAH} = \\widehat{B'A'H'}$ vì hai tam giác bằng nhau theo trường hợp hai cạnh góc vuông",
              "$\\widehat{BAH} = \\widehat{B'A'H'}$ vì hai tam giác bằng nhau theo trường hợp cạnh huyền – cạnh góc vuông",
              "Không so sánh được vì chưa biết $AH$ và $A'H'$",
              "$\\widehat{BAH} \\gt \\widehat{B'A'H'}$"
            ],
            answer: 1,
            explain: "$\\Delta ABH$ vuông tại $H$, $\\Delta A'B'H'$ vuông tại $H'$ có cạnh huyền $AB = A'B'$ (thang dài bằng nhau) và cạnh góc vuông $BH = B'H'$. Vậy hai tam giác bằng nhau (cạnh huyền – cạnh góc vuông), suy ra $\\widehat{BAH} = \\widehat{B'A'H'}$. Không cần biết $AH$."
          },
          {
            id: "d3q9", level: "kho", source: "mới",
            q: "Điểm $M$ nằm trong $\\widehat{xOy}$; kẻ $MA \\perp Ox$ ($A \\in Ox$), $MB \\perp Oy$ ($B \\in Oy$) và $MA = MB$. Khẳng định nào đúng?",
            options: ["$OA = AM$", "$\\widehat{AOM} = 2\\widehat{BOM}$", "$OM$ là tia phân giác của $\\widehat{xOy}$", "$\\widehat{xOy} = 90^\\circ$"],
            answer: 2,
            explain: "$\\Delta OAM$ (vuông tại $A$) và $\\Delta OBM$ (vuông tại $B$) có cạnh huyền $OM$ chung, $MA = MB$, nên bằng nhau (cạnh huyền – cạnh góc vuông). Suy ra $\\widehat{AOM} = \\widehat{BOM}$, tức $OM$ là tia phân giác của $\\widehat{xOy}$."
          },
          {
            id: "d3q10", level: "kho", source: "SBT Bài 15 – BT 4.33 (biến đổi)",
            q: "Cho tam giác $ABC$ có $AB = AC$; $BD \\perp AC$ ($D \\in AC$), $CE \\perp AB$ ($E \\in AB$). Biết $BD = 6$ cm. Độ dài $CE$ là",
            options: ["$3$ cm", "$12$ cm", "Không tính được vì thiếu dữ kiện", "$6$ cm"],
            answer: 3,
            explain: "$\\Delta ABD = \\Delta ACE$ (cạnh huyền $AB = AC$, góc nhọn $\\widehat{A}$ chung) nên $CE = BD = 6$ cm (hai cạnh tương ứng)."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SBT Bài 15 – BT 4.35", maxPoints: 2,
            q: "Cho tam giác $ABC$ vuông tại $C$ và tam giác $ABD$ vuông tại $D$ ($C$, $D$ nằm khác phía đối với $AB$) sao cho $\\widehat{CAB} = \\widehat{DAB}$.<br>a) Chứng minh $\\Delta ABC = \\Delta ABD$.<br>b) Chứng minh $BC = BD$." + figCD,
            modelAnswer: "a) Hai tam giác $ACB$ (vuông tại $C$) và $ADB$ (vuông tại $D$) có:<br>" +
              "• $AB$ là cạnh huyền chung;<br>• $\\widehat{CAB} = \\widehat{DAB}$ (giả thiết) — góc nhọn.<br>" +
              "Vậy $\\Delta ACB = \\Delta ADB$ (cạnh huyền – góc nhọn), tức $\\Delta ABC = \\Delta ABD$.<br>" +
              "b) Từ câu a suy ra $BC = BD$ (hai cạnh tương ứng).",
            rubric: [
              { pts: 0.5, text: "Chỉ ra hai tam giác vuông tại $C$ và $D$." },
              { pts: 0.5, text: "Nêu $AB$ là cạnh huyền chung và $\\widehat{CAB} = \\widehat{DAB}$." },
              { pts: 0.5, text: "Kết luận $\\Delta ABC = \\Delta ABD$ (cạnh huyền – góc nhọn)." },
              { pts: 0.5, text: "Suy ra $BC = BD$." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SBT Bài 15 – BT 4.36", maxPoints: 1,
            q: "Cho $\\Delta ABC = \\Delta DEF$. Kẻ $AH \\perp BC$ ($H \\in BC$) và $DK \\perp EF$ ($K \\in EF$). Chứng minh $AH = DK$.",
            modelAnswer: "Vì $\\Delta ABC = \\Delta DEF$ nên $AB = DE$ và $\\widehat{B} = \\widehat{E}$.<br>" +
              "Hai tam giác $AHB$ (vuông tại $H$) và $DKE$ (vuông tại $K$) có: $AB = DE$ (cạnh huyền), $\\widehat{ABH} = \\widehat{DEK}$ (góc nhọn).<br>" +
              "Vậy $\\Delta AHB = \\Delta DKE$ (cạnh huyền – góc nhọn), suy ra $AH = DK$.",
            rubric: [
              { pts: 0.5, text: "Từ $\\Delta ABC = \\Delta DEF$ suy ra $AB = DE$, $\\widehat{B} = \\widehat{E}$." },
              { pts: 0.5, text: "Chứng minh $\\Delta AHB = \\Delta DKE$ (cạnh huyền – góc nhọn) và suy ra $AH = DK$." }
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
            q: "Hai tam giác vuông có một cạnh góc vuông và góc nhọn <b>đối diện</b> với cạnh ấy tương ứng bằng nhau thì",
            options: [
              "chưa chắc bằng nhau",
              "bằng nhau, vì góc nhọn còn lại cũng bằng nhau nên đưa được về trường hợp cạnh góc vuông – góc nhọn kề",
              "bằng nhau theo trường hợp hai cạnh góc vuông",
              "chỉ bằng nhau khi góc nhọn đó bằng $45^\\circ$"
            ],
            answer: 1,
            explain: "Hai góc nhọn đối diện bằng nhau thì hai góc nhọn kề cũng bằng nhau (cùng bằng $90^\\circ$ trừ góc kia). Khi đó có cạnh góc vuông và góc nhọn kề tương ứng bằng nhau nên hai tam giác bằng nhau."
          },
          {
            id: "d4q2", level: "vua", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $BC = EF = 10$ cm, $AB = DF = 6$ cm. Khẳng định nào đúng?",
            options: ["$\\Delta ABC = \\Delta DEF$", "$\\Delta ABC = \\Delta DFE$", "$\\Delta ABC = \\Delta EDF$", "Hai tam giác không bằng nhau"],
            answer: 1,
            explain: "Cạnh huyền $BC = FE$, cạnh góc vuông $AB = DF$. Đỉnh tương ứng: $A \\leftrightarrow D$, $B \\leftrightarrow F$, $C \\leftrightarrow E$. Vậy $\\Delta ABC = \\Delta DFE$ (cạnh huyền – cạnh góc vuông)."
          },
          {
            id: "d4q3", level: "kho", source: "SBT Bài 15 – BT 4.34",
            q: "Cho hình vuông $ABCD$; $M$, $N$ lần lượt là trung điểm của $AB$ và $AD$. Góc tạo bởi hai đường thẳng $BN$ và $CM$ bằng",
            options: ["$45^\\circ$", "$60^\\circ$", "$30^\\circ$", "$90^\\circ$"],
            answer: 3,
            explain: "$\\Delta ABN$ (vuông tại $A$) và $\\Delta BCM$ (vuông tại $B$) có $AB = BC$, $AN = BM$ (nửa cạnh hình vuông) nên bằng nhau (hai cạnh góc vuông). Suy ra $\\widehat{ABN} = \\widehat{BCM}$. Gọi $I$ là giao điểm của $BN$ và $CM$: $\\widehat{IBM} + \\widehat{IMB} = \\widehat{BCM} + \\widehat{BMC} = 90^\\circ$, nên $\\widehat{BIM} = 90^\\circ$."
          },
          {
            id: "d4q4", level: "kho", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$ có $\\widehat{ABC} = 60^\\circ$. Tia phân giác của $\\widehat{ABC}$ cắt $AC$ tại $D$; kẻ $DH \\perp BC$ ($H \\in BC$). Khẳng định nào <b>sai</b>?",
            options: ["$AB = HB$", "$DA = DH$", "$\\widehat{BDA} = 90^\\circ$", "$\\Delta ABD = \\Delta HBD$"],
            answer: 2,
            explain: "$\\Delta ABD$ (vuông tại $A$) và $\\Delta HBD$ (vuông tại $H$) có cạnh huyền $BD$ chung, $\\widehat{ABD} = \\widehat{HBD} = 30^\\circ$, nên bằng nhau; do đó $AB = HB$, $DA = DH$. Còn $\\widehat{BDA} = 90^\\circ - 30^\\circ = 60^\\circ \\ne 90^\\circ$."
          },
          {
            id: "d4q5", level: "kho", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$, $M$ là trung điểm của $BC$. Trên tia đối của tia $MA$ lấy điểm $E$ sao cho $ME = MA$. Biết $BC = 10$ cm. Độ dài $AM$ là",
            options: ["$5$ cm", "$10$ cm", "$20$ cm", "$2{,}5$ cm"],
            answer: 0,
            explain: "$\\Delta MAB = \\Delta MEC$ (c.g.c) nên $CE = AB$ và $\\widehat{MEC} = \\widehat{MAB}$, suy ra $CE \\parallel AB$, mà $AB \\perp AC$ nên $CE \\perp AC$. Hai tam giác vuông $ABC$ (tại $A$) và $CEA$ (tại $C$) có $AC$ chung, $AB = CE$ nên bằng nhau (hai cạnh góc vuông), suy ra $AE = BC = 10$ cm. Vậy $AM = \\frac{AE}{2} = 5$ cm."
          },
          {
            id: "d4q6", level: "kho", source: "SBT Bài 15 – BT 4.37",
            q: "Tam giác $ABC$ và $DEF$ có $AB = DE$, $AC = DF$ và hai đường cao $AH = DK$ ($H$ nằm giữa $B$, $C$; $K$ nằm giữa $E$, $F$). Khẳng định nào đúng?",
            options: ["Chỉ có $\\Delta ABH = \\Delta DEK$, chưa đủ để suy ra $\\Delta ABC = \\Delta DEF$", "$\\Delta ABC = \\Delta DFE$", "$BH = KF$", "$\\Delta ABC = \\Delta DEF$"],
            answer: 3,
            explain: "$\\Delta ABH = \\Delta DEK$ (cạnh huyền $AB = DE$, cạnh góc vuông $AH = DK$) nên $BH = EK$. Tương tự $\\Delta ACH = \\Delta DFK$ nên $HC = KF$. Suy ra $BC = EF$, do đó $\\Delta ABC = \\Delta DEF$ (c.c.c)."
          },
          {
            id: "d4q7", level: "kho", source: "SBT Bài 15 – BT 4.33",
            q: "Trong hình, $AB = AD$, $CB = CD$ và $AC \\perp BD$ tại $E$ ($AE \\ne CE$). Có bao nhiêu cặp tam giác vuông tại $E$ bằng nhau?" + figKite2,
            options: ["$1$", "$2$", "$3$", "$4$"],
            answer: 1,
            explain: "Bốn tam giác vuông tại $E$ là $ABE, ADE, CBE, CDE$. Ta có $\\Delta ABE = \\Delta ADE$ (cạnh huyền $AB = AD$, $AE$ chung) và $\\Delta CBE = \\Delta CDE$ (cạnh huyền $CB = CD$, $CE$ chung). Tam giác chứa $A$ không bằng tam giác chứa $C$ vì $AE \\ne CE$. Vậy có $2$ cặp."
          },
          {
            id: "d4q8", level: "kho", source: "SGK tr.75–76 – Mở đầu, Luyện tập 1",
            q: "Hai cột thẳng đứng cao bằng nhau dựng cạnh nhau. Tia nắng tạo với hai đỉnh cột các góc bằng nhau. Cột và bóng của nó tạo thành hai cạnh góc vuông của một tam giác vuông. Hai bóng cột dài bằng nhau vì hai tam giác vuông bằng nhau theo trường hợp",
            options: ["hai cạnh góc vuông", "cạnh huyền – góc nhọn", "cạnh góc vuông – góc nhọn kề", "cạnh huyền – cạnh góc vuông"],
            answer: 2,
            explain: "Chiều cao cột là cạnh góc vuông; góc giữa tia nắng và cột (ở đỉnh cột) là góc nhọn kề cạnh đó. Hai yếu tố này bằng nhau nên hai tam giác bằng nhau (cạnh góc vuông – góc nhọn kề), suy ra hai bóng dài bằng nhau."
          },
          {
            id: "d4q9", level: "kho", source: "mới",
            q: "Tia phân giác của $\\widehat{BAC}$ trong tam giác $ABC$ cắt $BC$ tại $D$. Kẻ $DE \\perp AB$ ($E \\in AB$), $DF \\perp AC$ ($F \\in AC$). Biết $DE = 2{,}5$ cm. Độ dài $DF$ là",
            options: ["$2{,}5$ cm", "$5$ cm", "$1{,}25$ cm", "Không tính được vì thiếu dữ kiện"],
            answer: 0,
            explain: "$\\Delta AED$ (vuông tại $E$) và $\\Delta AFD$ (vuông tại $F$) có cạnh huyền $AD$ chung, $\\widehat{EAD} = \\widehat{FAD}$ nên bằng nhau (cạnh huyền – góc nhọn). Suy ra $DF = DE = 2{,}5$ cm."
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Tam giác $ABC$ vuông tại $A$ có $AB = 3$ cm, $AC = 4$ cm, $BC = 5$ cm. Tam giác $MNP$ vuông tại $M$ có $NP = 5$ cm, $MN = 4$ cm. Độ dài $MP$ là",
            options: ["$4$ cm", "$5$ cm", "$3$ cm", "$1$ cm"],
            answer: 2,
            explain: "Cạnh huyền $NP = CB = 5$ cm, cạnh góc vuông $MN = AC = 4$ cm nên $\\Delta MNP = \\Delta ACB$ (cạnh huyền – cạnh góc vuông), với $M \\leftrightarrow A$, $N \\leftrightarrow C$, $P \\leftrightarrow B$. Suy ra $MP = AB = 3$ cm."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ vuông tại $A$ có $AB = AC$. Qua $A$ kẻ đường thẳng $d$ không cắt đoạn $BC$. Kẻ $BD \\perp d$ ($D \\in d$), $CE \\perp d$ ($E \\in d$). Chứng minh $DE = BD + CE$.",
            modelAnswer: "Vì $D, A, E$ thẳng hàng và $\\widehat{BAC} = 90^\\circ$ nên $\\widehat{BAD} + \\widehat{CAE} = 180^\\circ - 90^\\circ = 90^\\circ$.<br>" +
              "Trong $\\Delta ABD$ vuông tại $D$: $\\widehat{ABD} + \\widehat{BAD} = 90^\\circ$. Suy ra $\\widehat{ABD} = \\widehat{CAE}$.<br>" +
              "Hai tam giác $ABD$ (vuông tại $D$) và $CAE$ (vuông tại $E$) có: $AB = CA$ (cạnh huyền), $\\widehat{ABD} = \\widehat{CAE}$ (góc nhọn). Vậy $\\Delta ABD = \\Delta CAE$ (cạnh huyền – góc nhọn).<br>" +
              "Suy ra $BD = AE$, $AD = CE$. Do đó $DE = DA + AE = CE + BD$.",
            rubric: [
              { pts: 0.5, text: "Chứng minh $\\widehat{ABD} = \\widehat{CAE}$ (cùng phụ với $\\widehat{BAD}$)." },
              { pts: 0.5, text: "Chứng minh $\\Delta ABD = \\Delta CAE$ (cạnh huyền – góc nhọn)." },
              { pts: 0.5, text: "Suy ra $BD = AE$, $AD = CE$ và kết luận $DE = BD + CE$." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "SBT Bài 15 – BT 4.38", maxPoints: 1.5,
            q: "Cho bốn điểm $A, B, C, D$ sao cho $A$ và $D$ nằm cùng phía đối với đường thẳng $BC$, $\\widehat{BAC} = \\widehat{CDB} = 90^\\circ$ và $AB = DC$. Chứng minh:<br>a) $AC = BD$;<br>b) $\\widehat{ACB} = \\widehat{DBC}$.",
            modelAnswer: "a) Hai tam giác $BAC$ (vuông tại $A$) và $CDB$ (vuông tại $D$) có:<br>" +
              "• $BC$ là cạnh huyền chung;<br>• $AB = DC$ (giả thiết) — cạnh góc vuông.<br>" +
              "Vậy $\\Delta BAC = \\Delta CDB$ (cạnh huyền – cạnh góc vuông), suy ra $AC = DB$.<br>" +
              "b) Cũng từ $\\Delta BAC = \\Delta CDB$ (với $B \\leftrightarrow C$, $A \\leftrightarrow D$, $C \\leftrightarrow B$) suy ra $\\widehat{ACB} = \\widehat{DBC}$ (hai góc tương ứng).",
            rubric: [
              { pts: 0.5, text: "Nêu đúng hai tam giác vuông với $BC$ chung, $AB = DC$." },
              { pts: 0.5, text: "Kết luận $\\Delta BAC = \\Delta CDB$ đúng thứ tự đỉnh và suy ra $AC = BD$." },
              { pts: 0.5, text: "Suy ra $\\widehat{ACB} = \\widehat{DBC}$." }
            ]
          }
        ]
      }
    ]
  });
})();
