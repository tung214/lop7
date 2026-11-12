(function () {
  // Vẽ hình học bằng SVG (currentColor để hợp chế độ sáng/tối).
  // o = { w, h, pts: {A:[x,y]}, segs: [["A","B"]], ticks: [["A","B",số gạch]], right: [["A","B","C"]] (góc vuông tại A),
  //       txt: [[x, y, "chữ"]] (số đo góc, màu nhấn), hide: ["X"] (điểm không ghi nhãn) }
  function fig(o) {
    var W = o.w || 300, H = o.h || 200, P = o.pts, k, s;
    var names = Object.keys(P), cx = 0, cy = 0;
    names.forEach(function (n) { cx += P[n][0]; cy += P[n][1]; });
    cx /= names.length; cy /= names.length;
    s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:320px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">';
    (o.segs || []).forEach(function (g) {
      var a = P[g[0]], b = P[g[1]];
      s += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="currentColor" stroke-width="1.6"/>';
    });
    (o.ticks || []).forEach(function (t) {
      var a = P[t[0]], b = P[t[1]], n = t[2] || 1;
      var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy);
      var ux = dx / L, uy = dy / L, nx = -uy, ny = ux, mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      for (k = 0; k < n; k++) {
        var off = (k - (n - 1) / 2) * 5, px = mx + off * ux, py = my + off * uy;
        s += '<line x1="' + (px - 6 * nx).toFixed(1) + '" y1="' + (py - 6 * ny).toFixed(1) + '" x2="' + (px + 6 * nx).toFixed(1) + '" y2="' + (py + 6 * ny).toFixed(1) + '" stroke="currentColor" stroke-width="1.4"/>';
      }
    });
    (o.right || []).forEach(function (r) {
      var v = P[r[0]], a = P[r[1]], b = P[r[2]];
      var la = Math.hypot(a[0] - v[0], a[1] - v[1]), lb = Math.hypot(b[0] - v[0], b[1] - v[1]);
      var ax = (a[0] - v[0]) / la * 10, ay = (a[1] - v[1]) / la * 10, bx = (b[0] - v[0]) / lb * 10, by = (b[1] - v[1]) / lb * 10;
      s += '<path d="M' + (v[0] + ax).toFixed(1) + ' ' + (v[1] + ay).toFixed(1) + ' L' + (v[0] + ax + bx).toFixed(1) + ' ' + (v[1] + ay + by).toFixed(1) + ' L' + (v[0] + bx).toFixed(1) + ' ' + (v[1] + by).toFixed(1) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
    });
    names.forEach(function (n) {
      if ((o.hide || []).indexOf(n) >= 0) return;
      var p = P[n], dx = p[0] - cx, dy = p[1] - cy, L = Math.sqrt(dx * dx + dy * dy) || 1;
      s += '<text x="' + (p[0] + dx / L * 13).toFixed(1) + '" y="' + (p[1] + dy / L * 13 + 4).toFixed(1) + '" font-size="14" font-style="italic" text-anchor="middle" fill="currentColor">' + n + '</text>';
    });
    (o.txt || []).forEach(function (t) {
      s += '<text x="' + t[0] + '" y="' + t[1] + '" font-size="12" text-anchor="middle" fill="#e5484d">' + t[2] + '</text>';
    });
    return s + '</svg>';
  }

  registerLesson({
    id: "c4-lt1",
    chapter: 4,
    kind: "review",
    title: "Luyện tập chung (Bài 12–13)",
    sgkPages: [68, 69],
    sbtPages: [51, 58],
    objectives: [
      "Vận dụng định lí tổng ba góc của tam giác để tính số đo góc",
      "Nhận biết tam giác nhọn, tam giác vuông, tam giác tù; hai góc nhọn của tam giác vuông phụ nhau",
      "Viết đúng kí hiệu hai tam giác bằng nhau, chỉ ra các cạnh, các góc tương ứng",
      "Chứng minh hai tam giác bằng nhau theo trường hợp cạnh – cạnh – cạnh (c.c.c) và suy ra các góc bằng nhau"
    ],

    theory: [
      { heading: "1. Tổng ba góc trong một tam giác",
        html: "Trong mọi tam giác $ABC$: $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$.<br>" +
              "Biết hai góc thì tính được góc còn lại: $\\widehat{C} = 180^\\circ - \\widehat{A} - \\widehat{B}$." },
      { heading: "2. Phân loại tam giác theo góc",
        html: "<ul><li><b>Tam giác nhọn</b>: ba góc đều nhọn.</li>" +
              "<li><b>Tam giác vuông</b>: có một góc vuông. Trong tam giác vuông, <b>hai góc nhọn phụ nhau</b> (tổng bằng $90^\\circ$).</li>" +
              "<li><b>Tam giác tù</b>: có một góc tù.</li>" +
              "<li>Mỗi tam giác có ít nhất hai góc nhọn; có nhiều nhất một góc vuông hoặc một góc tù.</li></ul>" },
      { heading: "3. Hai tam giác bằng nhau",
        html: "Hai tam giác bằng nhau là hai tam giác có các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau.<br>" +
              "Khi viết $\\Delta ABC = \\Delta DEF$, các đỉnh tương ứng được viết <b>theo cùng thứ tự</b>: $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$. Khi đó:" +
              "$$AB = DE,\\ BC = EF,\\ CA = FD;\\quad \\widehat{A} = \\widehat{D},\\ \\widehat{B} = \\widehat{E},\\ \\widehat{C} = \\widehat{F}.$$" },
      { heading: "4. Trường hợp bằng nhau cạnh – cạnh – cạnh (c.c.c)",
        html: "Nếu ba cạnh của tam giác này bằng ba cạnh của tam giác kia thì hai tam giác đó bằng nhau.<br>" +
              "Ví dụ: $AB = DE$, $BC = EF$, $CA = FD$ thì $\\Delta ABC = \\Delta DEF$ (c.c.c)." +
              fig({ w: 310, h: 150, pts: { A: [60, 22], B: [22, 128], C: [140, 128], D: [212, 22], E: [174, 128], F: [292, 128] },
                    segs: [["A", "B"], ["B", "C"], ["C", "A"], ["D", "E"], ["E", "F"], ["F", "D"]],
                    ticks: [["A", "B", 1], ["D", "E", 1], ["B", "C", 2], ["E", "F", 2], ["A", "C", 3], ["D", "F", 3]] }) +
              "Sau khi chứng minh được hai tam giác bằng nhau, ta suy ra các <b>góc tương ứng</b> (hoặc cạnh tương ứng) bằng nhau." }
    ],

    skills: [
      "<b>Tính góc:</b> luôn bắt đầu từ \"tổng ba góc bằng $180^\\circ$\". Nếu có góc kề bù (tạo bởi một cạnh và phần kéo dài của cạnh kia) thì dùng thêm: hai góc kề bù có tổng $180^\\circ$.",
      "<b>Tam giác vuông:</b> chỉ cần một góc nhọn là tính được góc nhọn còn lại: $\\widehat{B} = 90^\\circ - \\widehat{C}$.",
      "<b>Bài toán tổng – hiệu, tỉ lệ:</b> biết $\\widehat{B} + \\widehat{C}$ (bằng $180^\\circ - \\widehat{A}$) và hiệu $\\widehat{B} - \\widehat{C}$ thì $\\widehat{B}$ = (tổng + hiệu) : 2. Nếu $\\widehat{A} = 2\\widehat{B}$, ... thì đặt góc nhỏ nhất là một \"phần\".",
      "<b>Tìm cặp tương ứng:</b> đọc kí hiệu $\\Delta ABC = \\Delta MNP$ theo vị trí: chữ thứ nhất ↔ chữ thứ nhất, ... Cạnh $BC$ (chữ thứ 2 và 3) ứng với $NP$.",
      "<b>Chứng minh c.c.c:</b> viết đủ ba cặp cạnh bằng nhau kèm lí do (giả thiết, cạnh chung), rồi kết luận và ghi \"(c.c.c)\". Hình có hai tam giác chung một cạnh thì đó thường là cặp cạnh thứ ba.",
      "<b>Lỗi hay gặp:</b> viết sai thứ tự đỉnh ($\\Delta ABC = \\Delta EDF$ khi $A$ ứng với $D$); quên cạnh chung; cho rằng hai tam giác có ba góc bằng nhau thì bằng nhau (chưa đủ!)."
    ],

    examples: [
      { q: "Cho tam giác $ABC$ có $\\widehat{A} = 70^\\circ$, $\\widehat{B} - \\widehat{C} = 30^\\circ$. Tính $\\widehat{B}$ và $\\widehat{C}$.",
        solution: "$\\widehat{B} + \\widehat{C} = 180^\\circ - 70^\\circ = 110^\\circ$.<br>" +
                  "Do đó $\\widehat{B} = (110^\\circ + 30^\\circ) : 2 = 70^\\circ$ và $\\widehat{C} = 110^\\circ - 70^\\circ = 40^\\circ$." },
      { q: "Cho hình vẽ, biết $AC = AD$, $BC = BD$, $\\widehat{BAC} = 35^\\circ$, $\\widehat{ABC} = 75^\\circ$. Tính $\\widehat{ADB}$." +
           fig({ w: 250, h: 260, pts: { A: [20, 130], B: [220, 130], C: [188, 12], D: [188, 248] },
                 segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "D"], ["B", "D"]],
                 ticks: [["A", "C", 1], ["A", "D", 1], ["B", "C", 2], ["B", "D", 2]],
                 txt: [[62, 123, "35°"], [192, 123, "75°"]] }),
        solution: "Xét $\\Delta ABC$ và $\\Delta ABD$: $AC = AD$, $BC = BD$ (giả thiết), $AB$ là cạnh chung. Do đó $\\Delta ABC = \\Delta ABD$ (c.c.c).<br>" +
                  "Trong $\\Delta ABC$: $\\widehat{ACB} = 180^\\circ - 35^\\circ - 75^\\circ = 70^\\circ$.<br>" +
                  "Suy ra $\\widehat{ADB} = \\widehat{ACB} = 70^\\circ$ (hai góc tương ứng)." },
      { q: "Cho $\\Delta ABC = \\Delta DEF$, biết $\\widehat{A} = 60^\\circ$, $\\widehat{E} = 70^\\circ$. Tính các góc còn lại của hai tam giác.",
        solution: "Vì $\\Delta ABC = \\Delta DEF$ nên $\\widehat{D} = \\widehat{A} = 60^\\circ$, $\\widehat{B} = \\widehat{E} = 70^\\circ$.<br>" +
                  "$\\widehat{C} = 180^\\circ - 60^\\circ - 70^\\circ = 50^\\circ$, và $\\widehat{F} = \\widehat{C} = 50^\\circ$." }
    ],

    sets: [
      /* ======================= ĐỀ 1 ======================= */
      { id: "d1", name: "Đề 1",
        mcq: [
          { id: "d1q1", level: "de", source: "SGK tr.61 – Định lí",
            q: "Tổng ba góc trong một tam giác bằng",
            options: ["$90^\\circ$", "$180^\\circ$", "$360^\\circ$", "$120^\\circ$"],
            answer: 1,
            explain: "Định lí: tổng ba góc trong một tam giác bằng $180^\\circ$." },
          { id: "d1q2", level: "de", source: "SGK Luyện tập chung – Ví dụ 1",
            q: "Cho tam giác $ABC$ có $\\widehat{A} = 72^\\circ$, $\\widehat{B} = 48^\\circ$. Số đo góc $C$ là",
            options: ["$70^\\circ$", "$50^\\circ$", "$65^\\circ$", "$60^\\circ$"],
            answer: 3,
            explain: "$\\widehat{C} = 180^\\circ - 72^\\circ - 48^\\circ = 60^\\circ$." },
          { id: "d1q3", level: "de", source: "SBT Bài 12 – BT 4.2",
            q: "Tam giác có ba góc lần lượt là $30^\\circ$, $45^\\circ$, $105^\\circ$ là",
            options: ["Tam giác nhọn", "Tam giác vuông", "Tam giác tù", "Tam giác đều"],
            answer: 2,
            explain: "Có góc $105^\\circ > 90^\\circ$ là góc tù nên đó là tam giác tù." },
          { id: "d1q4", level: "de", source: "SGK Luyện tập chung – BT 4.7",
            q: "Cho tam giác $ABC$ vuông tại $A$ có $\\widehat{B} = 35^\\circ$ (hình vẽ). Số đo góc $C$ là" +
               fig({ w: 280, h: 190, pts: { A: [50, 160], B: [230, 160], C: [50, 34] },
                     segs: [["A", "B"], ["B", "C"], ["C", "A"]], right: [["A", "B", "C"]],
                     txt: [[192, 153, "35°"]] }),
            options: ["$55^\\circ$", "$65^\\circ$", "$145^\\circ$", "$45^\\circ$"],
            answer: 0,
            explain: "Trong tam giác vuông, hai góc nhọn phụ nhau: $\\widehat{C} = 90^\\circ - 35^\\circ = 55^\\circ$." },
          { id: "d1q5", level: "vua", source: "SBT Bài 13 – BT 4.10",
            q: "Cho $\\Delta ABC = \\Delta MNP$. Cạnh tương ứng với cạnh $BC$ là",
            options: ["$NP$", "$MN$", "$MP$", "$AB$"],
            answer: 0,
            explain: "$B \\leftrightarrow N$, $C \\leftrightarrow P$ nên cạnh $BC$ tương ứng với cạnh $NP$." },
          { id: "d1q6", level: "vua", source: "SGK Luyện tập chung – BT 4.11",
            q: "Cho $\\Delta ABC = \\Delta DEF$, biết $\\widehat{A} = 50^\\circ$, $\\widehat{E} = 70^\\circ$. Số đo góc $F$ là",
            options: ["$70^\\circ$", "$50^\\circ$", "$60^\\circ$", "$130^\\circ$"],
            answer: 2,
            explain: "$\\widehat{B} = \\widehat{E} = 70^\\circ$, nên $\\widehat{C} = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$. Mà $\\widehat{F} = \\widehat{C}$ nên $\\widehat{F} = 60^\\circ$." },
          { id: "d1q7", level: "vua", source: "SGK Luyện tập chung – Ví dụ 1b",
            q: "Cho tam giác $ABC$, điểm $D$ nằm trên tia đối của tia $CB$. Biết $\\widehat{ACD} = 120^\\circ$, $\\widehat{BAC} = 50^\\circ$. Số đo góc $ABC$ là" +
               fig({ w: 290, h: 195, pts: { A: [84, 21], B: [30, 170], C: [170, 170], D: [270, 170] },
                     segs: [["A", "B"], ["B", "C"], ["C", "A"], ["C", "D"]],
                     txt: [[86, 52, "50°"], [196, 160, "120°"]] }),
            options: ["$60^\\circ$", "$70^\\circ$", "$50^\\circ$", "$130^\\circ$"],
            answer: 1,
            explain: "$\\widehat{ACB} = 180^\\circ - 120^\\circ = 60^\\circ$ (hai góc kề bù). Do đó $\\widehat{ABC} = 180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ$." },
          { id: "d1q8", level: "vua", source: "SBT Bài 13 – BT 4.12",
            q: "Hai tam giác $ABC$ và $DEF$ có $AB = DE$, $BC = EF$, $AC = DF$. Cách viết nào sau đây <b>đúng</b>?",
            options: ["$\\Delta ABC = \\Delta EDF$", "$\\Delta ABC = \\Delta DFE$", "$\\Delta BAC = \\Delta EDF$", "$\\Delta CAB = \\Delta DEF$"],
            answer: 2,
            explain: "Ba cặp cạnh bằng nhau cho thấy $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$. Cách viết $\\Delta BAC = \\Delta EDF$ giữ đúng thứ tự $B \\leftrightarrow E$, $A \\leftrightarrow D$, $C \\leftrightarrow F$." },
          { id: "d1q9", level: "vua", source: "SGK Luyện tập chung – Ví dụ 2",
            q: "Cho hình vẽ, biết $AC = AD$, $BC = BD$, $\\widehat{BAC} = 30^\\circ$, $\\widehat{ABC} = 80^\\circ$. Số đo góc $ADB$ là" +
               fig({ w: 250, h: 260, pts: { A: [20, 130], B: [220, 130], C: [188, 12], D: [188, 248] },
                     segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "D"], ["B", "D"]],
                     ticks: [["A", "C", 1], ["A", "D", 1], ["B", "C", 2], ["B", "D", 2]],
                     txt: [[62, 123, "30°"], [192, 123, "80°"]] }),
            options: ["$80^\\circ$", "$30^\\circ$", "$110^\\circ$", "$70^\\circ$"],
            answer: 3,
            explain: "$\\Delta ABC = \\Delta ABD$ (c.c.c: $AC = AD$, $BC = BD$, $AB$ chung). $\\widehat{ACB} = 180^\\circ - 30^\\circ - 80^\\circ = 70^\\circ$, nên $\\widehat{ADB} = \\widehat{ACB} = 70^\\circ$." },
          { id: "d1q10", level: "kho", source: "mới",
            q: "Tam giác $ABC$ có $\\widehat{A} = 2\\widehat{B}$ và $\\widehat{C} = 3\\widehat{B}$. Khẳng định nào sau đây đúng?",
            options: ["Tam giác $ABC$ nhọn", "Tam giác $ABC$ vuông tại $C$", "Tam giác $ABC$ tù", "Tam giác $ABC$ vuông tại $A$"],
            answer: 1,
            explain: "$\\widehat{B} + 2\\widehat{B} + 3\\widehat{B} = 180^\\circ$ nên $6\\widehat{B} = 180^\\circ$, $\\widehat{B} = 30^\\circ$. Suy ra $\\widehat{A} = 60^\\circ$, $\\widehat{C} = 90^\\circ$: tam giác vuông tại $C$." },
          { id: "d1q11", level: "kho", source: "SGK Luyện tập chung – BT 4.10",
            q: "Cho tam giác $ABC$ có $\\widehat{C} = 50^\\circ$, điểm $M$ nằm trên cạnh $BC$ sao cho $\\widehat{BAM} = 25^\\circ$, $\\widehat{AMC} = 85^\\circ$. Số đo góc $BAC$ là" +
               fig({ w: 250, h: 200, pts: { C: [30, 180], A: [210, 180], B: [156, 30], M: [112, 82] },
                     segs: [["C", "A"], ["C", "B"], ["A", "B"], ["A", "M"]],
                     txt: [[62, 172, "50°"], [124, 104, "85°"], [184, 140, "25°"]] }),
            options: ["$70^\\circ$", "$45^\\circ$", "$60^\\circ$", "$95^\\circ$"],
            answer: 0,
            explain: "Trong $\\Delta AMC$: $\\widehat{MAC} = 180^\\circ - 85^\\circ - 50^\\circ = 45^\\circ$. Do đó $\\widehat{BAC} = \\widehat{BAM} + \\widehat{MAC} = 25^\\circ + 45^\\circ = 70^\\circ$." }
        ],
        essay: [
          { id: "d1e1", level: "vua", source: "mới", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ có $\\widehat{A} = 80^\\circ$ và $\\widehat{B} - \\widehat{C} = 20^\\circ$. Tính số đo các góc $B$ và $C$.",
            modelAnswer: "Trong $\\Delta ABC$: $\\widehat{B} + \\widehat{C} = 180^\\circ - \\widehat{A} = 180^\\circ - 80^\\circ = 100^\\circ$.<br>" +
                         "Mà $\\widehat{B} - \\widehat{C} = 20^\\circ$, nên $\\widehat{B} = (100^\\circ + 20^\\circ) : 2 = 60^\\circ$.<br>" +
                         "$\\widehat{C} = 100^\\circ - 60^\\circ = 40^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{B} + \\widehat{C} = 100^\\circ$ (dùng tổng ba góc)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{B} = 60^\\circ$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{C} = 40^\\circ$." }
            ] },
          { id: "d1e2", level: "kho", source: "SBT Bài 13 – BT 4.17", maxPoints: 1.5,
            q: "Cho hình vẽ, biết $AB = AD$, $CB = CD$, $\\widehat{DAC} = 35^\\circ$, $\\widehat{DCA} = 55^\\circ$.<br>a) Chứng minh $\\Delta ABC = \\Delta ADC$.<br>b) Tính số đo các góc của tam giác $ABC$." +
               fig({ w: 260, h: 240, pts: { A: [20, 120], C: [240, 120], D: [168, 17], B: [168, 223] },
                     segs: [["A", "C"], ["A", "D"], ["D", "C"], ["A", "B"], ["B", "C"]],
                     ticks: [["A", "D", 1], ["A", "B", 1], ["C", "D", 2], ["C", "B", 2]],
                     txt: [[60, 113, "35°"], [208, 113, "55°"]] }),
            modelAnswer: "a) Xét $\\Delta ABC$ và $\\Delta ADC$ có: $AB = AD$ (giả thiết); $CB = CD$ (giả thiết); $AC$ là cạnh chung.<br>" +
                         "Vậy $\\Delta ABC = \\Delta ADC$ (c.c.c).<br>" +
                         "b) Từ câu a suy ra $\\widehat{BAC} = \\widehat{DAC} = 35^\\circ$, $\\widehat{BCA} = \\widehat{DCA} = 55^\\circ$ (các góc tương ứng).<br>" +
                         "Trong $\\Delta ABC$: $\\widehat{ABC} = 180^\\circ - 35^\\circ - 55^\\circ = 90^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Nêu đủ ba cặp cạnh bằng nhau (có cạnh chung $AC$)." },
              { pts: 0.25, text: "Kết luận $\\Delta ABC = \\Delta ADC$ (c.c.c)." },
              { pts: 0.25, text: "Suy ra $\\widehat{BAC} = 35^\\circ$, $\\widehat{BCA} = 55^\\circ$ (góc tương ứng)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{ABC} = 90^\\circ$." }
            ] }
        ] },

      /* ======================= ĐỀ 2 ======================= */
      { id: "d2", name: "Đề 2",
        mcq: [
          { id: "d2q1", level: "de", source: "SGK tr.62 – Nhận xét",
            q: "Trong một tam giác vuông, tổng hai góc nhọn bằng",
            options: ["$180^\\circ$", "$90^\\circ$", "$45^\\circ$", "$100^\\circ$"],
            answer: 1,
            explain: "Góc vuông bằng $90^\\circ$, nên tổng hai góc nhọn bằng $180^\\circ - 90^\\circ = 90^\\circ$ (hai góc nhọn phụ nhau)." },
          { id: "d2q2", level: "de", source: "SGK Luyện tập chung – BT 4.8",
            q: "Cho tam giác $MNP$ có $\\widehat{M} = 45^\\circ$, $\\widehat{N} = 100^\\circ$. Số đo góc $P$ là",
            options: ["$35^\\circ$", "$45^\\circ$", "$55^\\circ$", "$145^\\circ$"],
            answer: 0,
            explain: "$\\widehat{P} = 180^\\circ - 45^\\circ - 100^\\circ = 35^\\circ$." },
          { id: "d2q3", level: "de", source: "mới",
            q: "Bộ ba số đo nào sau đây có thể là số đo ba góc của một tam giác?",
            options: ["$50^\\circ, 60^\\circ, 80^\\circ$", "$40^\\circ, 60^\\circ, 90^\\circ$", "$45^\\circ, 45^\\circ, 80^\\circ$", "$30^\\circ, 70^\\circ, 80^\\circ$"],
            answer: 3,
            explain: "Chỉ có $30^\\circ + 70^\\circ + 80^\\circ = 180^\\circ$. Các bộ còn lại có tổng $190^\\circ$; $190^\\circ$; $170^\\circ$." },
          { id: "d2q4", level: "de", source: "SGK Luyện tập chung – BT 4.8",
            q: "Một tam giác có hai góc bằng $35^\\circ$ và $55^\\circ$. Tam giác đó là",
            options: ["Tam giác nhọn", "Tam giác tù", "Tam giác vuông", "Không xác định được"],
            answer: 2,
            explain: "Góc thứ ba bằng $180^\\circ - 35^\\circ - 55^\\circ = 90^\\circ$, nên đó là tam giác vuông." },
          { id: "d2q5", level: "vua", source: "SBT Bài 13 – BT 4.11",
            q: "Cho $\\Delta ABC = \\Delta MNP$. Khẳng định nào sau đây <b>sai</b>?",
            options: ["$AB = MN$", "$\\widehat{B} = \\widehat{N}$", "$AC = MP$", "$BC = MP$"],
            answer: 3,
            explain: "Cạnh $BC$ tương ứng với cạnh $NP$, không phải $MP$. Các khẳng định khác đều đúng theo thứ tự đỉnh $A \\leftrightarrow M$, $B \\leftrightarrow N$, $C \\leftrightarrow P$." },
          { id: "d2q6", level: "vua", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta DEF$, biết $AB = 4$ cm, $BC = 6$ cm, $DF = 5$ cm. Chu vi tam giác $DEF$ là",
            options: ["$14$ cm", "$15$ cm", "$16$ cm", "$10$ cm"],
            answer: 1,
            explain: "$DE = AB = 4$ cm, $EF = BC = 6$ cm, $DF = 5$ cm. Chu vi $\\Delta DEF = 4 + 6 + 5 = 15$ (cm)." },
          { id: "d2q7", level: "vua", source: "SGK Luyện tập chung – BT 4.9",
            q: "Cho hình vẽ, biết $AB = AC$, $DB = DC$, $\\widehat{DAC} = 55^\\circ$. Số đo góc $BAC$ là" +
               fig({ w: 330, h: 195, pts: { A: [165, 20], B: [22, 120], C: [308, 120], D: [165, 170] },
                     segs: [["A", "B"], ["A", "C"], ["A", "D"], ["B", "D"], ["C", "D"]],
                     ticks: [["A", "B", 1], ["A", "C", 1], ["D", "B", 2], ["D", "C", 2]],
                     txt: [[182, 56, "55°"]] }),
            options: ["$55^\\circ$", "$125^\\circ$", "$110^\\circ$", "$70^\\circ$"],
            answer: 2,
            explain: "$\\Delta ABD = \\Delta ACD$ (c.c.c: $AB = AC$, $DB = DC$, $AD$ chung) nên $\\widehat{DAB} = \\widehat{DAC} = 55^\\circ$. Vậy $\\widehat{BAC} = 55^\\circ + 55^\\circ = 110^\\circ$." },
          { id: "d2q8", level: "vua", source: "SBT Bài 12 – BT 4.6",
            q: "Tam giác $ABC$ có $\\widehat{B} = \\widehat{C}$ và $\\widehat{A} = 40^\\circ$. Số đo góc $B$ là",
            options: ["$40^\\circ$", "$140^\\circ$", "$50^\\circ$", "$70^\\circ$"],
            answer: 3,
            explain: "$\\widehat{B} + \\widehat{C} = 180^\\circ - 40^\\circ = 140^\\circ$, mà $\\widehat{B} = \\widehat{C}$ nên $\\widehat{B} = 140^\\circ : 2 = 70^\\circ$." },
          { id: "d2q9", level: "vua", source: "SBT Bài 13 – BT 4.12",
            q: "Cho $\\Delta ABC = \\Delta PQR$. Cách viết nào sau đây cũng <b>đúng</b>?",
            options: ["$\\Delta BCA = \\Delta QRP$", "$\\Delta ACB = \\Delta PQR$", "$\\Delta CAB = \\Delta QPR$", "$\\Delta BAC = \\Delta PQR$"],
            answer: 0,
            explain: "Đỉnh tương ứng: $A \\leftrightarrow P$, $B \\leftrightarrow Q$, $C \\leftrightarrow R$. Cách viết $\\Delta BCA = \\Delta QRP$ giữ đúng các cặp $B$–$Q$, $C$–$R$, $A$–$P$." },
          { id: "d2q10", level: "kho", source: "mới",
            q: "Tam giác $ABC$ có $\\widehat{A} - \\widehat{B} = 30^\\circ$ và $\\widehat{B} - \\widehat{C} = 30^\\circ$. Góc lớn nhất của tam giác bằng",
            options: ["$60^\\circ$", "$90^\\circ$", "$120^\\circ$", "$100^\\circ$"],
            answer: 1,
            explain: "$\\widehat{A} = \\widehat{B} + 30^\\circ$, $\\widehat{C} = \\widehat{B} - 30^\\circ$. Tổng: $3\\widehat{B} = 180^\\circ$, $\\widehat{B} = 60^\\circ$. Suy ra $\\widehat{A} = 90^\\circ$, $\\widehat{C} = 30^\\circ$. Góc lớn nhất là $90^\\circ$." },
          { id: "d2q11", level: "kho", source: "SBT Bài 13 – BT 4.18",
            q: "Cho hình vẽ, biết $AD = BC$, $AC = BD$, $\\widehat{ABD} = 35^\\circ$; $E$ là giao điểm của $AC$ và $BD$. Số đo góc $DEC$ là" +
               fig({ w: 280, h: 175, pts: { A: [40, 150], B: [240, 150], D: [76, 35], C: [204, 35], E: [140, 80] },
                     segs: [["A", "B"], ["A", "D"], ["B", "C"], ["A", "C"], ["B", "D"]],
                     ticks: [["A", "D", 1], ["B", "C", 1]],
                     txt: [[198, 143, "35°"]] }),
            options: ["$110^\\circ$", "$35^\\circ$", "$70^\\circ$", "$145^\\circ$"],
            answer: 0,
            explain: "$\\Delta ABD = \\Delta BAC$ (c.c.c: $AD = BC$, $BD = AC$, $AB$ chung) nên $\\widehat{BAC} = \\widehat{ABD} = 35^\\circ$. Trong $\\Delta EAB$: $\\widehat{AEB} = 180^\\circ - 35^\\circ - 35^\\circ = 110^\\circ$. $\\widehat{DEC} = \\widehat{AEB} = 110^\\circ$ (hai góc đối đỉnh)." }
        ],
        essay: [
          { id: "d2e1", level: "vua", source: "mới", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ có $\\widehat{A} = 60^\\circ$. Tia phân giác của góc $B$ cắt cạnh $AC$ tại $D$, biết $\\widehat{ADB} = 80^\\circ$. Tính số đo các góc $ABC$ và $ACB$.",
            modelAnswer: "Trong $\\Delta ABD$: $\\widehat{ABD} = 180^\\circ - \\widehat{A} - \\widehat{ADB} = 180^\\circ - 60^\\circ - 80^\\circ = 40^\\circ$.<br>" +
                         "$BD$ là tia phân giác của góc $B$ nên $\\widehat{ABC} = 2\\widehat{ABD} = 80^\\circ$.<br>" +
                         "Trong $\\Delta ABC$: $\\widehat{ACB} = 180^\\circ - 60^\\circ - 80^\\circ = 40^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{ABD} = 40^\\circ$." },
              { pts: 0.5, text: "Dùng tia phân giác, tính đúng $\\widehat{ABC} = 80^\\circ$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{ACB} = 40^\\circ$." }
            ] },
          { id: "d2e2", level: "kho", source: "SBT Bài 13 – BT 4.15", maxPoints: 1.5,
            q: "Cho đoạn thẳng $AB$. Hai điểm $C$, $D$ nằm ở hai phía của đường thẳng $AB$ sao cho $CA = DA$, $CB = DB$ (hình vẽ).<br>a) Chứng minh $\\Delta ACB = \\Delta ADB$.<br>b) Chứng minh tia $AB$ là tia phân giác của góc $CAD$." +
               fig({ w: 290, h: 225, pts: { A: [40, 110], B: [260, 110], C: [170, 20], D: [170, 200] },
                     segs: [["A", "B"], ["A", "C"], ["A", "D"], ["B", "C"], ["B", "D"]],
                     ticks: [["A", "C", 1], ["A", "D", 1], ["B", "C", 2], ["B", "D", 2]] }),
            modelAnswer: "a) Xét $\\Delta ACB$ và $\\Delta ADB$ có: $CA = DA$ (giả thiết); $CB = DB$ (giả thiết); $AB$ là cạnh chung.<br>" +
                         "Vậy $\\Delta ACB = \\Delta ADB$ (c.c.c).<br>" +
                         "b) Từ câu a suy ra $\\widehat{CAB} = \\widehat{DAB}$ (hai góc tương ứng).<br>" +
                         "Vì $C$, $D$ nằm ở hai phía của $AB$ nên tia $AB$ nằm giữa hai tia $AC$ và $AD$. Do đó tia $AB$ là tia phân giác của góc $CAD$.",
            rubric: [
              { pts: 0.5, text: "Nêu đủ ba cặp cạnh bằng nhau (có cạnh chung $AB$)." },
              { pts: 0.25, text: "Kết luận $\\Delta ACB = \\Delta ADB$ (c.c.c)." },
              { pts: 0.5, text: "Suy ra $\\widehat{CAB} = \\widehat{DAB}$ (góc tương ứng)." },
              { pts: 0.25, text: "Lập luận tia $AB$ nằm giữa $AC$, $AD$ và kết luận là tia phân giác." }
            ] }
        ] },

      /* ======================= ĐỀ 3 ======================= */
      { id: "d3", name: "Đề 3",
        mcq: [
          { id: "d3q1", level: "de", source: "SGK tr.62 – Nhận xét",
            q: "Một tam giác có nhiều nhất bao nhiêu góc tù?",
            options: ["$1$", "$2$", "$3$", "$0$"],
            answer: 0,
            explain: "Nếu có hai góc tù thì tổng hai góc đó đã lớn hơn $180^\\circ$, vô lí. Vậy một tam giác có nhiều nhất một góc tù." },
          { id: "d3q2", level: "de", source: "SGK Luyện tập chung – BT 4.7",
            q: "Cho tam giác $DEF$ vuông tại $D$ có $\\widehat{E} = 38^\\circ$. Số đo góc $F$ là",
            options: ["$38^\\circ$", "$52^\\circ$", "$62^\\circ$", "$128^\\circ$"],
            answer: 1,
            explain: "Hai góc nhọn của tam giác vuông phụ nhau: $\\widehat{F} = 90^\\circ - 38^\\circ = 52^\\circ$." },
          { id: "d3q3", level: "de", source: "SGK Bài 13 – Định nghĩa",
            q: "Hai tam giác bằng nhau là hai tam giác có",
            options: ["các cạnh tương ứng bằng nhau", "các góc tương ứng bằng nhau", "các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau", "chu vi bằng nhau"],
            answer: 2,
            explain: "Theo định nghĩa, hai tam giác bằng nhau phải có <b>cả</b> các cạnh tương ứng và các góc tương ứng bằng nhau." },
          { id: "d3q4", level: "de", source: "SGK Luyện tập chung – Ví dụ 1a",
            q: "Số đo $x$ trong hình vẽ bằng" +
               fig({ w: 280, h: 185, pts: { A: [82, 24], B: [30, 165], C: [250, 165] },
                     segs: [["A", "B"], ["B", "C"], ["C", "A"]],
                     txt: [[60, 157, "70°"], [212, 157, "40°"], [88, 56, "x"]] }),
            options: ["$40^\\circ$", "$110^\\circ$", "$80^\\circ$", "$70^\\circ$"],
            answer: 3,
            explain: "$x = 180^\\circ - 70^\\circ - 40^\\circ = 70^\\circ$." },
          { id: "d3q5", level: "vua", source: "SBT Bài 13 – BT 4.10",
            q: "Cho $\\Delta ABC = \\Delta HIK$. Góc tương ứng với góc $K$ là",
            options: ["$\\widehat{A}$", "$\\widehat{B}$", "$\\widehat{C}$", "$\\widehat{H}$"],
            answer: 2,
            explain: "$K$ là đỉnh thứ ba của $\\Delta HIK$, tương ứng với đỉnh thứ ba $C$ của $\\Delta ABC$. Vậy $\\widehat{K} = \\widehat{C}$." },
          { id: "d3q6", level: "vua", source: "SBT Bài 12 – BT 4.2",
            q: "Tam giác $ABC$ có $\\widehat{A} = 50^\\circ$, $\\widehat{B} = 70^\\circ$. Khẳng định nào sau đây đúng?",
            options: ["Tam giác $ABC$ là tam giác nhọn", "Tam giác $ABC$ là tam giác vuông", "Tam giác $ABC$ là tam giác tù", "Tam giác $ABC$ có $\\widehat{C} = 70^\\circ$"],
            answer: 0,
            explain: "$\\widehat{C} = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$. Ba góc $50^\\circ, 70^\\circ, 60^\\circ$ đều nhọn nên là tam giác nhọn." },
          { id: "d3q7", level: "vua", source: "SGK Luyện tập chung – BT 4.11",
            q: "Cho $\\Delta ABC = \\Delta DEF$, biết $\\widehat{A} = 45^\\circ$, $\\widehat{B} = 75^\\circ$. Số đo góc $F$ là",
            options: ["$75^\\circ$", "$60^\\circ$", "$45^\\circ$", "$120^\\circ$"],
            answer: 1,
            explain: "$\\widehat{C} = 180^\\circ - 45^\\circ - 75^\\circ = 60^\\circ$, mà $\\widehat{F} = \\widehat{C}$ nên $\\widehat{F} = 60^\\circ$." },
          { id: "d3q8", level: "vua", source: "mới",
            q: "Cho $\\Delta ABC = \\Delta DEF$ và $\\Delta DEF = \\Delta MNP$. Biết $AB = 5$ cm, $NP = 7$ cm, $MP = 6$ cm. Chu vi tam giác $ABC$ là",
            options: ["$18$ cm", "$17$ cm", "$12$ cm", "$11$ cm"],
            answer: 0,
            explain: "Từ hai đẳng thức suy ra $\\Delta ABC = \\Delta MNP$, nên $BC = NP = 7$ cm, $AC = MP = 6$ cm. Chu vi $= 5 + 7 + 6 = 18$ (cm)." },
          { id: "d3q9", level: "vua", source: "SBT Bài 13 – BT 4.17",
            q: "Cho hình vẽ, biết $AB = AD$, $CB = CD$ và $\\widehat{BAD} = 100^\\circ$. Số đo góc $BAC$ là" +
               fig({ w: 300, h: 220, pts: { A: [30, 110], C: [270, 110], B: [107, 18], D: [107, 202] },
                     segs: [["A", "C"], ["A", "B"], ["A", "D"], ["B", "C"], ["D", "C"]],
                     ticks: [["A", "B", 1], ["A", "D", 1], ["C", "B", 2], ["C", "D", 2]] }),
            options: ["$100^\\circ$", "$40^\\circ$", "$50^\\circ$", "$80^\\circ$"],
            answer: 2,
            explain: "$\\Delta ABC = \\Delta ADC$ (c.c.c: $AB = AD$, $CB = CD$, $AC$ chung) nên $\\widehat{BAC} = \\widehat{DAC}$. Do đó $\\widehat{BAC} = 100^\\circ : 2 = 50^\\circ$." },
          { id: "d3q10", level: "kho", source: "mới",
            q: "Tam giác $ABC$ có $\\widehat{A} = \\widehat{B} + \\widehat{C}$. Khẳng định nào sau đây đúng?",
            options: ["Tam giác $ABC$ nhọn", "Tam giác $ABC$ tù", "Tam giác $ABC$ vuông tại $B$", "Tam giác $ABC$ vuông tại $A$"],
            answer: 3,
            explain: "$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$ mà $\\widehat{B} + \\widehat{C} = \\widehat{A}$ nên $2\\widehat{A} = 180^\\circ$, $\\widehat{A} = 90^\\circ$: tam giác vuông tại $A$." },
          { id: "d3q11", level: "kho", source: "SBT Bài 13 – BT 4.19",
            q: "Cho tam giác $ABC$ có $AB = AC$, $M$ là trung điểm của $BC$ và $\\widehat{B} = 65^\\circ$. Số đo góc $BAM$ là" +
               fig({ w: 260, h: 195, pts: { A: [130, 20], B: [60, 170], C: [200, 170], M: [130, 170] },
                     segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "M"]],
                     ticks: [["A", "B", 1], ["A", "C", 1], ["B", "M", 2], ["M", "C", 2]],
                     txt: [[86, 162, "65°"]] }),
            options: ["$50^\\circ$", "$25^\\circ$", "$65^\\circ$", "$30^\\circ$"],
            answer: 1,
            explain: "$\\Delta ABM = \\Delta ACM$ (c.c.c: $AB = AC$, $BM = CM$, $AM$ chung) nên $\\widehat{C} = \\widehat{B} = 65^\\circ$ và $\\widehat{BAM} = \\widehat{CAM}$. $\\widehat{BAC} = 180^\\circ - 65^\\circ - 65^\\circ = 50^\\circ$, nên $\\widehat{BAM} = 25^\\circ$." }
        ],
        essay: [
          { id: "d3e1", level: "vua", source: "mới", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ vuông tại $A$ có $\\widehat{B} = 2\\widehat{C}$. Kẻ $AH$ vuông góc với $BC$ ($H$ thuộc $BC$).<br>a) Tính $\\widehat{B}$ và $\\widehat{C}$.<br>b) Tính $\\widehat{BAH}$.",
            modelAnswer: "a) Tam giác $ABC$ vuông tại $A$ nên $\\widehat{B} + \\widehat{C} = 90^\\circ$. Mà $\\widehat{B} = 2\\widehat{C}$ nên $3\\widehat{C} = 90^\\circ$, suy ra $\\widehat{C} = 30^\\circ$, $\\widehat{B} = 60^\\circ$.<br>" +
                         "b) Tam giác $ABH$ vuông tại $H$ nên $\\widehat{BAH} = 90^\\circ - \\widehat{B} = 90^\\circ - 60^\\circ = 30^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Nêu được $\\widehat{B} + \\widehat{C} = 90^\\circ$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{C} = 30^\\circ$, $\\widehat{B} = 60^\\circ$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{BAH} = 30^\\circ$ (dùng tam giác vuông $ABH$)." }
            ] },
          { id: "d3e2", level: "kho", source: "SBT Bài 13 – BT 4.19", maxPoints: 1.5,
            q: "Cho tam giác $ABC$ có $AB = AC$. Gọi $M$ là trung điểm của $BC$.<br>a) Chứng minh $\\Delta AMB = \\Delta AMC$.<br>b) Chứng minh $AM$ vuông góc với $BC$.",
            modelAnswer: "a) Xét $\\Delta AMB$ và $\\Delta AMC$ có: $AB = AC$ (giả thiết); $MB = MC$ ($M$ là trung điểm $BC$); $AM$ là cạnh chung.<br>" +
                         "Vậy $\\Delta AMB = \\Delta AMC$ (c.c.c).<br>" +
                         "b) Từ câu a suy ra $\\widehat{AMB} = \\widehat{AMC}$ (hai góc tương ứng).<br>" +
                         "Mà $\\widehat{AMB} + \\widehat{AMC} = 180^\\circ$ (hai góc kề bù) nên $\\widehat{AMB} = \\widehat{AMC} = 90^\\circ$. Vậy $AM \\perp BC$.",
            rubric: [
              { pts: 0.5, text: "Nêu đủ ba cặp cạnh bằng nhau (có $MB = MC$ và cạnh chung $AM$)." },
              { pts: 0.25, text: "Kết luận $\\Delta AMB = \\Delta AMC$ (c.c.c)." },
              { pts: 0.5, text: "Suy ra $\\widehat{AMB} = \\widehat{AMC}$ và dùng hai góc kề bù." },
              { pts: 0.25, text: "Kết luận mỗi góc bằng $90^\\circ$, $AM \\perp BC$." }
            ] }
        ] }
    ]
  });
})();
