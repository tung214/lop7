(function () {
  // Vẽ tam giác ABC bằng SVG (dùng currentColor để hợp chế độ sáng/tối).
  // o = { b, c: số đo góc tại B, C (độ) – cạnh BC nằm ngang,
  //       n: tên ba đỉnh [A, B, C] (mặc định ["A","B","C"]),
  //       lab: { A, B, C, X }: nhãn góc (X = góc ngoài tại C), hl: ["A", ...] nhãn tô đỏ,
  //       right: "A" | "B" | "C" (kí hiệu góc vuông), ext: true (vẽ tia Cx đối với tia CB),
  //       par: true (vẽ đường thẳng xy qua A song song với BC) }
  function tri(o) {
    var r = Math.PI / 180, b = o.b * r, c = o.c * r;
    var t = Math.sin(c) / Math.sin(b + c);
    var P = { B: [0, 0], C: [1, 0], A: [t * Math.cos(b), t * Math.sin(b)] };
    if (o.ext) P.X = [1.45, 0];
    if (o.par) { P.x = [P.A[0] - 0.55, P.A[1]]; P.y = [P.A[0] + 0.55, P.A[1]]; }
    var xs = [], ys = [];
    for (var k in P) { xs.push(P[k][0]); ys.push(P[k][1]); }
    var minx = Math.min.apply(null, xs), maxx = Math.max.apply(null, xs);
    var miny = Math.min.apply(null, ys), maxy = Math.max.apply(null, ys);
    var W = 300, pad = 26, s = Math.min((W - 2 * pad) / (maxx - minx), 150 / (maxy - miny));
    var H = Math.round((maxy - miny) * s + 2 * pad), ox = (W - (maxx - minx) * s) / 2;
    var S = {};
    for (var q in P) S[q] = [ox + (P[q][0] - minx) * s, pad + (maxy - P[q][1]) * s];
    var f = function (v) { return v.toFixed(1); };
    var unit = function (u) { var l = Math.hypot(u[0], u[1]) || 1; return [u[0] / l, u[1] / l]; };
    var sub = function (p, q2) { return [p[0] - q2[0], p[1] - q2[1]]; };
    var n = o.n || ["A", "B", "C"], lab = o.lab || {}, hl = o.hl || [];
    var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:320px;display:block;margin:6px auto" role="img" aria-label="Hình tam giác">';
    out += '<polygon points="' + [S.A, S.B, S.C].map(function (p) { return f(p[0]) + ',' + f(p[1]); }).join(' ') + '" fill="none" stroke="currentColor" stroke-width="1.6"/>';
    if (o.ext) out += '<line x1="' + f(S.C[0]) + '" y1="' + f(S.C[1]) + '" x2="' + f(S.X[0]) + '" y2="' + f(S.X[1]) + '" stroke="currentColor" stroke-width="1.6"/>' +
      '<text x="' + f(S.X[0] - 4) + '" y="' + f(S.X[1] + 16) + '" font-size="13" font-style="italic" fill="currentColor">x</text>';
    if (o.par) out += '<line x1="' + f(S.x[0]) + '" y1="' + f(S.x[1]) + '" x2="' + f(S.y[0]) + '" y2="' + f(S.y[1]) + '" stroke="currentColor" stroke-width="1.4"/>' +
      '<text x="' + f(S.x[0] + 2) + '" y="' + f(S.x[1] - 7) + '" font-size="13" font-style="italic" fill="currentColor">x</text>' +
      '<text x="' + f(S.y[0] - 8) + '" y="' + f(S.y[1] - 7) + '" font-size="13" font-style="italic" fill="currentColor">y</text>';
    // tên đỉnh: đẩy ra xa trọng tâm
    var G = [(S.A[0] + S.B[0] + S.C[0]) / 3, (S.A[1] + S.B[1] + S.C[1]) / 3];
    ["A", "B", "C"].forEach(function (key, i) {
      var d = unit(sub(S[key], G)), p = [S[key][0] + d[0] * 15, S[key][1] + d[1] * 15 + 5];
      if (o.par && key === "A") p = [S.A[0], S.A[1] - 9];
      out += '<text x="' + f(p[0]) + '" y="' + f(p[1]) + '" font-size="14" font-weight="bold" text-anchor="middle" fill="currentColor">' + n[i] + '</text>';
    });
    // nhãn góc: đặt trên tia phân giác của góc
    var nb = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"], X: ["A", "X"] };
    for (var key in lab) {
      var V = key === "X" ? S.C : S[key];
      var u1 = unit(sub(S[nb[key][0]], V)), u2 = unit(sub(S[nb[key][1]], V));
      var ang = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) * 180 / Math.PI;
      var d = unit([u1[0] + u2[0], u1[1] + u2[1]]), rr = (key === "X" ? 24 : 30) + Math.max(0, 60 - ang) * 0.6;   // góc nhỏ → đặt nhãn xa đỉnh hơn
      out += '<text x="' + f(V[0] + d[0] * rr) + '" y="' + f(V[1] + d[1] * rr + 4) + '" font-size="12" text-anchor="middle" fill="' +
        (hl.indexOf(key) >= 0 ? '#e5484d' : 'currentColor') + '"' + (hl.indexOf(key) >= 0 ? ' font-weight="bold"' : '') + '>' + lab[key] + '</text>';
    }
    if (o.right) {
      var R = S[o.right], w1 = unit(sub(S[nb[o.right][0]], R)), w2 = unit(sub(S[nb[o.right][1]], R)), m = 10;
      out += '<polyline points="' + f(R[0] + w1[0] * m) + ',' + f(R[1] + w1[1] * m) + ' ' + f(R[0] + w1[0] * m + w2[0] * m) + ',' + f(R[1] + w1[1] * m + w2[1] * m) + ' ' +
        f(R[0] + w2[0] * m) + ',' + f(R[1] + w2[1] * m) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
    }
    return out + '</svg>';
  }

  registerLesson({
    id: "c4-b12",
    chapter: 4,
    kind: "lesson",
    title: "Bài 12. Tổng các góc trong một tam giác",
    sgkPages: [60, 62],
    sbtPages: [51, 54],
    objectives: [
      "Giải thích được định lí: tổng ba góc trong một tam giác bằng $180^\\circ$",
      "Tính số đo một góc của tam giác khi biết hai góc còn lại",
      "Nhận biết tam giác nhọn, tam giác tù, tam giác vuông; cạnh góc vuông, cạnh huyền",
      "Vận dụng: hai góc nhọn của tam giác vuông phụ nhau; góc ngoài của tam giác"
    ],

    theory: [
      {
        heading: "1. Định lí tổng ba góc của một tam giác",
        html: "<b>Tổng ba góc trong một tam giác bằng $180^\\circ$:</b> với mọi $\\Delta ABC$ ta có $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$." +
          tri({ b: 65, c: 45, par: true }) +
          "<b>Vì sao?</b> Qua $A$ kẻ đường thẳng $xy$ song song với $BC$. Theo tính chất hai đường thẳng song song (các cặp góc so le trong bằng nhau): $\\widehat{B} = \\widehat{BAx}$ và $\\widehat{C} = \\widehat{CAy}$." +
          "<br>Ba góc $\\widehat{BAx}$, $\\widehat{BAC}$, $\\widehat{CAy}$ ghép lại thành góc bẹt $\\widehat{xAy}$, nên $\\widehat{A} + \\widehat{B} + \\widehat{C} = \\widehat{xAy} = 180^\\circ$." +
          "<ul><li>Hệ quả: biết số đo hai góc thì tính được góc thứ ba: $\\widehat{A} = 180^\\circ - \\widehat{B} - \\widehat{C}$.</li></ul>"
      },
      {
        heading: "2. Tam giác nhọn, tam giác tù, tam giác vuông",
        html: "<ul><li><b>Tam giác nhọn:</b> cả ba góc đều nhọn (nhỏ hơn $90^\\circ$).</li>" +
          "<li><b>Tam giác tù:</b> có một góc tù (lớn hơn $90^\\circ$).</li>" +
          "<li><b>Tam giác vuông:</b> có một góc vuông. Trong $\\Delta MNP$ vuông tại $M$: $MN$, $MP$ là hai <b>cạnh góc vuông</b>, $NP$ (cạnh đối diện góc vuông) là <b>cạnh huyền</b>.</li>" +
          "<li>Vì tổng ba góc là $180^\\circ$ nên một tam giác có <b>nhiều nhất một</b> góc vuông hoặc góc tù, và luôn có <b>ít nhất hai góc nhọn</b>.</li>" +
          "<li>Muốn biết tam giác thuộc loại nào, chỉ cần xét <b>góc lớn nhất</b> của nó: nhỏ hơn, bằng hay lớn hơn $90^\\circ$.</li></ul>"
      },
      {
        heading: "3. Hai góc nhọn của tam giác vuông",
        html: "Hai góc có tổng bằng $90^\\circ$ gọi là hai góc <b>phụ nhau</b>." +
          "<br>Nếu $\\Delta ABC$ vuông tại $A$ thì $\\widehat{B} + \\widehat{C} = 180^\\circ - 90^\\circ = 90^\\circ$: <b>trong tam giác vuông, hai góc nhọn phụ nhau</b>." +
          tri({ b: 35, c: 55, right: "A", lab: { B: "35°", C: "55°" } })
      },
      {
        heading: "4. Góc ngoài của tam giác",
        html: "Cho $\\Delta ABC$, $Cx$ là tia đối của tia $CB$. Góc $\\widehat{ACx}$ (kề bù với góc $\\widehat{ACB}$) gọi là <b>góc ngoài tại đỉnh $C$</b> của tam giác. Hai góc $\\widehat{A}$, $\\widehat{B}$ gọi là hai góc trong <b>không kề</b> với nó." +
          tri({ b: 50, c: 60, ext: true, lab: { A: "70°", B: "50°", X: "120°" }, hl: ["X"] }) +
          "<ul><li><b>Tính chất:</b> mỗi góc ngoài của tam giác bằng <b>tổng hai góc trong không kề</b> với nó: $\\widehat{ACx} = \\widehat{A} + \\widehat{B}$.</li>" +
          "<li>Vì sao: $\\widehat{ACx} = 180^\\circ - \\widehat{ACB}$ (kề bù) và $\\widehat{A} + \\widehat{B} = 180^\\circ - \\widehat{ACB}$ (tổng ba góc).</li>" +
          "<li>Hệ quả: góc ngoài <b>lớn hơn mỗi góc trong không kề</b> với nó.</li></ul>"
      }
    ],

    skills: [
      "<b>Tính góc còn lại:</b> lấy $180^\\circ$ trừ đi tổng hai góc đã biết.",
      "<b>Tam giác vuông:</b> chỉ cần biết một góc nhọn, góc nhọn kia bằng $90^\\circ$ trừ góc đó.",
      "<b>Phân loại tam giác:</b> tính đủ ba góc, rồi xét góc lớn nhất ($< 90^\\circ$: nhọn; $= 90^\\circ$: vuông; $> 90^\\circ$: tù).",
      "<b>Góc ngoài:</b> góc ngoài = tổng hai góc trong không kề; góc ngoài + góc trong kề với nó $= 180^\\circ$.",
      "<b>Bài toán tỉ lệ / quan hệ giữa các góc:</b> đặt góc nhỏ nhất là ẩn, biểu diễn các góc kia theo ẩn, dùng tổng $180^\\circ$. Ví dụ $\\widehat{A} : \\widehat{B} : \\widehat{C} = 2 : 3 : 4$ thì mỗi \"phần\" bằng $180^\\circ : 9 = 20^\\circ$.",
      "<b>Hình có nhiều tam giác:</b> tìm tam giác chứa góc cần tính; dùng thêm góc kề bù, góc đối đỉnh, tia phân giác để chuyển số đo từ tam giác này sang tam giác khác.",
      "<b>Lỗi hay gặp:</b> quên trừ cả hai góc; nhầm góc ngoài với góc trong kề với nó; cho rằng tam giác có thể có hai góc tù; nhầm cạnh huyền với cạnh góc vuông (cạnh huyền luôn đối diện góc vuông)."
    ],

    examples: [
      {
        q: "Cho $\\Delta ABC$ có $\\widehat{B} = 45^\\circ$, $\\widehat{C} = 65^\\circ$. Tính $\\widehat{A}$. Tam giác $ABC$ là tam giác gì?",
        solution: "Trong $\\Delta ABC$: $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$, nên $\\widehat{A} = 180^\\circ - 45^\\circ - 65^\\circ = 70^\\circ$." +
          tri({ b: 45, c: 65, lab: { A: "?", B: "45°", C: "65°" }, hl: ["A"] }) +
          "Ba góc $70^\\circ, 45^\\circ, 65^\\circ$ đều nhọn nên $\\Delta ABC$ là tam giác nhọn."
      },
      {
        q: "Cho $\\Delta ABC$ vuông tại $A$ có $\\widehat{B} = 38^\\circ$. Tính $\\widehat{C}$.",
        solution: "Trong tam giác vuông, hai góc nhọn phụ nhau: $\\widehat{B} + \\widehat{C} = 90^\\circ$.<br>Do đó $\\widehat{C} = 90^\\circ - 38^\\circ = 52^\\circ$."
      },
      {
        q: "Cho $\\Delta ABC$ có $\\widehat{A} = 55^\\circ$, $\\widehat{B} = 70^\\circ$; $Cx$ là tia đối của tia $CB$. Tính góc ngoài $\\widehat{ACx}$ và góc $\\widehat{ACB}$.",
        solution: "Góc ngoài tại $C$ bằng tổng hai góc trong không kề: $\\widehat{ACx} = \\widehat{A} + \\widehat{B} = 55^\\circ + 70^\\circ = 125^\\circ$.<br>" +
          "Góc $\\widehat{ACB}$ kề bù với $\\widehat{ACx}$: $\\widehat{ACB} = 180^\\circ - 125^\\circ = 55^\\circ$.<br>" +
          "(Kiểm tra: $55^\\circ + 70^\\circ + 55^\\circ = 180^\\circ$.)"
      },
      {
        q: "Cho $\\Delta ABC$ có $\\widehat{B} = 2\\widehat{A}$ và $\\widehat{C} = 3\\widehat{A}$. Tính các góc của tam giác và cho biết tam giác thuộc loại nào.",
        solution: "Ta có $\\widehat{A} + \\widehat{B} + \\widehat{C} = \\widehat{A} + 2\\widehat{A} + 3\\widehat{A} = 6\\widehat{A} = 180^\\circ$, nên $\\widehat{A} = 30^\\circ$.<br>" +
          "Suy ra $\\widehat{B} = 60^\\circ$, $\\widehat{C} = 90^\\circ$. Vậy $\\Delta ABC$ là tam giác vuông tại $C$."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.61 – Ví dụ",
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = 60^\\circ$, $\\widehat{B} = 80^\\circ$. Số đo góc $C$ là",
            options: ["$40^\\circ$", "$50^\\circ$", "$30^\\circ$", "$140^\\circ$"],
            answer: 0,
            explain: "$\\widehat{C} = 180^\\circ - \\widehat{A} - \\widehat{B} = 180^\\circ - 60^\\circ - 80^\\circ = 40^\\circ$. ($140^\\circ$ là tổng $\\widehat{A} + \\widehat{B}$, chưa lấy $180^\\circ$ trừ đi.)"
          },
          {
            id: "d1q2", level: "de", source: "mới",
            q: "Ba số đo nào sau đây có thể là số đo ba góc của một tam giác?",
            options: ["$50^\\circ;\\ 60^\\circ;\\ 80^\\circ$", "$40^\\circ;\\ 50^\\circ;\\ 100^\\circ$", "$45^\\circ;\\ 55^\\circ;\\ 80^\\circ$", "$30^\\circ;\\ 60^\\circ;\\ 80^\\circ$"],
            answer: 2,
            explain: "Tổng ba góc phải bằng $180^\\circ$: $45^\\circ + 55^\\circ + 80^\\circ = 180^\\circ$. Các bộ còn lại có tổng $190^\\circ$, $190^\\circ$, $170^\\circ$."
          },
          {
            id: "d1q3", level: "de", source: "SGK tr.62 – Chú ý",
            q: "Cho $\\Delta MNP$ vuông tại $M$. Cạnh huyền của tam giác là",
            options: ["$MN$", "$NP$", "$MP$", "$MN$ và $MP$"],
            answer: 1,
            explain: "Cạnh huyền là cạnh đối diện với góc vuông. Góc vuông ở $M$ nên cạnh huyền là $NP$; còn $MN$, $MP$ là hai cạnh góc vuông."
          },
          {
            id: "d1q4", level: "de", source: "SGK tr.62 – Luyện tập",
            q: "Cho $\\Delta ABC$ vuông tại $A$ có $\\widehat{B} = 35^\\circ$. Số đo góc $C$ là",
            options: ["$35^\\circ$", "$45^\\circ$", "$145^\\circ$", "$55^\\circ$"],
            answer: 3,
            explain: "Trong tam giác vuông, hai góc nhọn phụ nhau: $\\widehat{C} = 90^\\circ - 35^\\circ = 55^\\circ$."
          },
          {
            id: "d1q5", level: "vua", source: "SBT Bài 12 – BT 4.2",
            q: "Cho $\\Delta DEF$ có $\\widehat{D} = 35^\\circ$, $\\widehat{E} = 40^\\circ$. Tam giác $DEF$ là",
            options: ["tam giác nhọn", "tam giác vuông", "tam giác tù", "chưa đủ dữ kiện để kết luận"],
            answer: 2,
            explain: "$\\widehat{F} = 180^\\circ - 35^\\circ - 40^\\circ = 105^\\circ > 90^\\circ$, nên $\\Delta DEF$ là tam giác tù (tù tại $F$)."
          },
          {
            id: "d1q6", level: "vua", source: "SGK tr.62 – Vận dụng",
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = 65^\\circ$, $\\widehat{B} = 45^\\circ$; $Cx$ là tia đối của tia $CB$ (hình dưới). Số đo góc $\\widehat{ACx}$ là" +
              tri({ b: 45, c: 70, ext: true, lab: { A: "65°", B: "45°", X: "?" }, hl: ["X"] }),
            options: ["$110^\\circ$", "$70^\\circ$", "$65^\\circ$", "$120^\\circ$"],
            answer: 0,
            explain: "$\\widehat{ACx}$ là góc ngoài tại $C$, bằng tổng hai góc trong không kề: $65^\\circ + 45^\\circ = 110^\\circ$. ($70^\\circ$ là góc trong $\\widehat{ACB}$.)"
          },
          {
            id: "d1q7", level: "vua", source: "mới",
            q: "Một tam giác có thể có nhiều nhất bao nhiêu góc tù?",
            options: ["$0$", "$2$", "$3$", "$1$"],
            answer: 3,
            explain: "Nếu có hai góc tù thì tổng hai góc đó đã lớn hơn $180^\\circ$, trái với định lí tổng ba góc. Vậy có nhiều nhất $1$ góc tù (và có tam giác có đúng 1 góc tù)."
          },
          {
            id: "d1q8", level: "vua", source: "mới",
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = \\widehat{B}$ và $\\widehat{C} = 40^\\circ$. Số đo góc $A$ là",
            options: ["$40^\\circ$", "$70^\\circ$", "$140^\\circ$", "$50^\\circ$"],
            answer: 1,
            explain: "$\\widehat{A} + \\widehat{B} = 180^\\circ - 40^\\circ = 140^\\circ$, mà $\\widehat{A} = \\widehat{B}$ nên $\\widehat{A} = 140^\\circ : 2 = 70^\\circ$."
          },
          {
            id: "d1q9", level: "kho", source: "mới",
            q: "Ba góc của $\\Delta ABC$ tỉ lệ với $2;\\ 3;\\ 4$ (tức $\\widehat{A} : \\widehat{B} : \\widehat{C} = 2 : 3 : 4$). Số đo góc lớn nhất của tam giác là",
            options: ["$60^\\circ$", "$100^\\circ$", "$80^\\circ$", "$90^\\circ$"],
            answer: 2,
            explain: "Tổng số phần: $2 + 3 + 4 = 9$; mỗi phần bằng $180^\\circ : 9 = 20^\\circ$. Ba góc là $40^\\circ, 60^\\circ, 80^\\circ$; lớn nhất là $80^\\circ$."
          },
          {
            id: "d1q10", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ có góc ngoài tại đỉnh $C$ bằng $120^\\circ$ và $\\widehat{B} = 2\\widehat{A}$. Số đo góc $B$ là",
            options: ["$40^\\circ$", "$80^\\circ$", "$60^\\circ$", "$100^\\circ$"],
            answer: 1,
            explain: "Góc ngoài tại $C$ bằng $\\widehat{A} + \\widehat{B} = 3\\widehat{A} = 120^\\circ$, nên $\\widehat{A} = 40^\\circ$ và $\\widehat{B} = 80^\\circ$."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SBT Bài 12 – BT 4.9 (biến đổi)", maxPoints: 3,
            q: "Cho $\\Delta ABC$ có $\\widehat{B} = \\widehat{C} = 2\\widehat{A}$.<br>a) Tính số đo các góc của tam giác $ABC$.<br>b) Tam giác $ABC$ là tam giác nhọn, vuông hay tù? Vì sao?<br>c) Tia phân giác của góc $B$ cắt cạnh $AC$ tại $D$. Tính số đo góc $\\widehat{BDC}$.",
            modelAnswer: "a) Ta có $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$, tức $\\widehat{A} + 2\\widehat{A} + 2\\widehat{A} = 5\\widehat{A} = 180^\\circ$.<br>" +
              "Suy ra $\\widehat{A} = 36^\\circ$, $\\widehat{B} = \\widehat{C} = 72^\\circ$.<br>" +
              "b) Cả ba góc $36^\\circ, 72^\\circ, 72^\\circ$ đều nhỏ hơn $90^\\circ$ nên $\\Delta ABC$ là tam giác nhọn.<br>" +
              "c) $BD$ là tia phân giác của góc $B$ nên $\\widehat{ABD} = \\widehat{DBC} = 72^\\circ : 2 = 36^\\circ$.<br>" +
              "Góc $\\widehat{BDC}$ là góc ngoài tại $D$ của $\\Delta ABD$, nên $\\widehat{BDC} = \\widehat{A} + \\widehat{ABD} = 36^\\circ + 36^\\circ = 72^\\circ$.<br>" +
              "(Hoặc trong $\\Delta BDC$: $\\widehat{BDC} = 180^\\circ - 36^\\circ - 72^\\circ = 72^\\circ$.)",
            rubric: [
              { pts: 1, text: "Lập được $5\\widehat{A} = 180^\\circ$ từ định lí tổng ba góc." },
              { pts: 0.5, text: "Tính đúng $\\widehat{A} = 36^\\circ$, $\\widehat{B} = \\widehat{C} = 72^\\circ$." },
              { pts: 0.5, text: "Kết luận đúng tam giác nhọn, có giải thích." },
              { pts: 0.5, text: "Tính đúng $\\widehat{ABD} = \\widehat{DBC} = 36^\\circ$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{BDC} = 72^\\circ$ (bằng góc ngoài hoặc tổng ba góc của $\\Delta BDC$)." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SBT Bài 12 – BT 4.1",
            q: "Cho $\\Delta DEF$ có $\\widehat{E} = 70^\\circ$, $\\widehat{F} = 50^\\circ$. Số đo góc $D$ là",
            options: ["$50^\\circ$", "$60^\\circ$", "$70^\\circ$", "$120^\\circ$"],
            answer: 1,
            explain: "$\\widehat{D} = 180^\\circ - 70^\\circ - 50^\\circ = 60^\\circ$."
          },
          {
            id: "d2q2", level: "de", source: "SGK Bài 12 – BT 4.2",
            q: "Tam giác $ABC$ nào sau đây là tam giác vuông?",
            options: ["$\\widehat{A} = 40^\\circ,\\ \\widehat{B} = 60^\\circ$", "$\\widehat{A} = 30^\\circ,\\ \\widehat{B} = 70^\\circ$", "$\\widehat{A} = 100^\\circ,\\ \\widehat{B} = 40^\\circ$", "$\\widehat{A} = 35^\\circ,\\ \\widehat{B} = 55^\\circ$"],
            answer: 3,
            explain: "Với $\\widehat{A} = 35^\\circ$, $\\widehat{B} = 55^\\circ$ thì $\\widehat{C} = 180^\\circ - 90^\\circ = 90^\\circ$: tam giác vuông tại $C$. Các trường hợp khác: $\\widehat{C} = 80^\\circ$ (nhọn), $80^\\circ$ (nhọn), $40^\\circ$ (tam giác tù vì $\\widehat{A} = 100^\\circ$)."
          },
          {
            id: "d2q3", level: "de", source: "SGK tr.62 – Nhận xét",
            q: "Trong một tam giác vuông, hai góc nhọn",
            options: ["phụ nhau", "bằng nhau", "có tổng bằng $180^\\circ$", "đều lớn hơn $45^\\circ$"],
            answer: 0,
            explain: "Góc vuông bằng $90^\\circ$ nên tổng hai góc nhọn bằng $180^\\circ - 90^\\circ = 90^\\circ$: hai góc nhọn phụ nhau. Chúng không nhất thiết bằng nhau (ví dụ $30^\\circ$ và $60^\\circ$)."
          },
          {
            id: "d2q4", level: "de", source: "SGK Bài 12 – BT 4.1",
            q: "Trong hình dưới, $\\Delta ABC$ có $\\widehat{B} = 110^\\circ$, $\\widehat{C} = 30^\\circ$. Số đo góc $A$ là" +
              tri({ b: 110, c: 30, lab: { A: "?", B: "110°", C: "30°" }, hl: ["A"] }),
            options: ["$30^\\circ$", "$50^\\circ$", "$40^\\circ$", "$140^\\circ$"],
            answer: 2,
            explain: "$\\widehat{A} = 180^\\circ - 110^\\circ - 30^\\circ = 40^\\circ$."
          },
          {
            id: "d2q5", level: "vua", source: "SGK tr.62 – Nhận xét (góc ngoài)",
            q: "Cho $\\Delta ABC$ có góc ngoài tại đỉnh $B$ bằng $115^\\circ$ và $\\widehat{A} = 50^\\circ$. Số đo góc $C$ là",
            options: ["$50^\\circ$", "$115^\\circ$", "$15^\\circ$", "$65^\\circ$"],
            answer: 3,
            explain: "Góc ngoài tại $B$ bằng $\\widehat{A} + \\widehat{C}$, nên $\\widehat{C} = 115^\\circ - 50^\\circ = 65^\\circ$."
          },
          {
            id: "d2q6", level: "vua", source: "mới",
            q: "Khẳng định nào sau đây <b>sai</b>?",
            options: ["Mỗi tam giác có ít nhất hai góc nhọn", "Một tam giác có thể có hai góc vuông", "Mỗi góc ngoài của tam giác bằng tổng hai góc trong không kề với nó", "Tam giác có một góc tù gọi là tam giác tù"],
            answer: 1,
            explain: "Nếu có hai góc vuông thì tổng hai góc đó đã bằng $180^\\circ$, góc thứ ba bằng $0^\\circ$ – vô lí. Vậy tam giác không thể có hai góc vuông. Các khẳng định khác đều đúng."
          },
          {
            id: "d2q7", level: "vua", source: "mới",
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = 80^\\circ$ và $\\widehat{B} - \\widehat{C} = 20^\\circ$. Số đo góc $C$ là",
            options: ["$40^\\circ$", "$60^\\circ$", "$50^\\circ$", "$30^\\circ$"],
            answer: 0,
            explain: "$\\widehat{B} + \\widehat{C} = 180^\\circ - 80^\\circ = 100^\\circ$ và $\\widehat{B} - \\widehat{C} = 20^\\circ$. Suy ra $\\widehat{C} = (100^\\circ - 20^\\circ) : 2 = 40^\\circ$ (và $\\widehat{B} = 60^\\circ$)."
          },
          {
            id: "d2q8", level: "vua", source: "SBT Bài 12 – BT 4.8",
            q: "Tứ giác $ABCD$ có đường chéo $BD$. Biết $\\widehat{ABD} = 35^\\circ$, $\\widehat{ADB} = 45^\\circ$, $\\widehat{DBC} = 65^\\circ$, $\\widehat{BDC} = 40^\\circ$. Tổng $\\widehat{A} + \\widehat{C}$ bằng",
            options: ["$180^\\circ$", "$185^\\circ$", "$175^\\circ$", "$165^\\circ$"],
            answer: 2,
            explain: "Trong $\\Delta ABD$: $\\widehat{A} = 180^\\circ - 35^\\circ - 45^\\circ = 100^\\circ$. Trong $\\Delta BCD$: $\\widehat{C} = 180^\\circ - 65^\\circ - 40^\\circ = 75^\\circ$. Vậy $\\widehat{A} + \\widehat{C} = 175^\\circ$."
          },
          {
            id: "d2q9", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ vuông tại $A$ có $\\widehat{B} = 2\\widehat{C}$. Số đo góc $B$ là",
            options: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "$90^\\circ$"],
            answer: 1,
            explain: "Hai góc nhọn phụ nhau: $\\widehat{B} + \\widehat{C} = 2\\widehat{C} + \\widehat{C} = 3\\widehat{C} = 90^\\circ$, nên $\\widehat{C} = 30^\\circ$, $\\widehat{B} = 60^\\circ$."
          },
          {
            id: "d2q10", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ có $\\widehat{B} = 60^\\circ$, $\\widehat{C} = 40^\\circ$. Tia phân giác của góc $A$ cắt $BC$ tại $D$. Số đo góc $\\widehat{ADC}$ là",
            options: ["$80^\\circ$", "$90^\\circ$", "$120^\\circ$", "$100^\\circ$"],
            answer: 3,
            explain: "$\\widehat{BAC} = 180^\\circ - 60^\\circ - 40^\\circ = 80^\\circ$, nên $\\widehat{BAD} = 40^\\circ$. Góc $\\widehat{ADC}$ là góc ngoài tại $D$ của $\\Delta ABD$: $\\widehat{ADC} = \\widehat{B} + \\widehat{BAD} = 60^\\circ + 40^\\circ = 100^\\circ$. ($80^\\circ$ là góc $\\widehat{ADB}$.)"
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SGK tr.62 – Vận dụng (biến đổi)", maxPoints: 1.5,
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = 60^\\circ$; $Cx$ là tia đối của tia $CB$ và $\\widehat{ACx} = 135^\\circ$.<br>a) Tính $\\widehat{B}$ và $\\widehat{ACB}$.<br>b) Tam giác $ABC$ là tam giác nhọn, vuông hay tù?",
            modelAnswer: "a) $\\widehat{ACx}$ là góc ngoài tại $C$ nên $\\widehat{ACx} = \\widehat{A} + \\widehat{B}$, suy ra $\\widehat{B} = 135^\\circ - 60^\\circ = 75^\\circ$.<br>" +
              "$\\widehat{ACB}$ kề bù với $\\widehat{ACx}$ nên $\\widehat{ACB} = 180^\\circ - 135^\\circ = 45^\\circ$.<br>" +
              "b) Ba góc $60^\\circ, 75^\\circ, 45^\\circ$ đều nhọn nên $\\Delta ABC$ là tam giác nhọn.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{B} = 75^\\circ$ (dùng tính chất góc ngoài hoặc cách khác hợp lí)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{ACB} = 45^\\circ$." },
              { pts: 0.5, text: "Kết luận đúng tam giác nhọn." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Chứng tỏ rằng một tam giác không thể có hai góc tù.",
            modelAnswer: "Giả sử $\\Delta ABC$ có hai góc tù, chẳng hạn $\\widehat{B} > 90^\\circ$ và $\\widehat{C} > 90^\\circ$.<br>" +
              "Khi đó $\\widehat{B} + \\widehat{C} > 90^\\circ + 90^\\circ = 180^\\circ$, nên $\\widehat{A} + \\widehat{B} + \\widehat{C} > 180^\\circ$.<br>" +
              "Điều này trái với định lí tổng ba góc trong một tam giác bằng $180^\\circ$. Vậy một tam giác không thể có hai góc tù.",
            rubric: [
              { pts: 0.5, text: "Giả sử tam giác có hai góc tù (nêu rõ hai góc)." },
              { pts: 0.5, text: "Suy ra tổng hai góc đó lớn hơn $180^\\circ$." },
              { pts: 0.5, text: "Chỉ ra mâu thuẫn với định lí tổng ba góc và kết luận." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.61 – Ví dụ",
            q: "Cho $\\Delta MNP$ có $\\widehat{M} = 90^\\circ$, $\\widehat{N} = 60^\\circ$. Số đo góc $P$ là",
            options: ["$60^\\circ$", "$90^\\circ$", "$30^\\circ$", "$45^\\circ$"],
            answer: 2,
            explain: "$\\widehat{P} = 180^\\circ - 90^\\circ - 60^\\circ = 30^\\circ$."
          },
          {
            id: "d3q2", level: "de", source: "SGK tr.61 – Định lí",
            q: "Tổng ba góc trong một tam giác bằng",
            options: ["$180^\\circ$", "$90^\\circ$", "$360^\\circ$", "$270^\\circ$"],
            answer: 0,
            explain: "Định lí: tổng ba góc trong một tam giác bằng $180^\\circ$."
          },
          {
            id: "d3q3", level: "de", source: "SGK tr.62 – Chú ý",
            q: "Tam giác có ba góc đều nhọn được gọi là",
            options: ["tam giác vuông", "tam giác tù", "tam giác bẹt", "tam giác nhọn"],
            answer: 3,
            explain: "Tam giác có ba góc đều nhọn gọi là tam giác nhọn. (Không có khái niệm \"tam giác bẹt\".)"
          },
          {
            id: "d3q4", level: "de", source: "SGK tr.62 – Luyện tập",
            q: "Cho $\\Delta ABC$ vuông tại $A$, $\\widehat{B} = 58^\\circ$ (hình dưới). Số đo góc $C$ là" +
              tri({ b: 58, c: 32, right: "A", lab: { B: "58°", C: "?" }, hl: ["C"] }),
            options: ["$58^\\circ$", "$32^\\circ$", "$42^\\circ$", "$122^\\circ$"],
            answer: 1,
            explain: "Hai góc nhọn của tam giác vuông phụ nhau: $\\widehat{C} = 90^\\circ - 58^\\circ = 32^\\circ$."
          },
          {
            id: "d3q5", level: "vua", source: "SGK tr.62 – Nhận xét (góc ngoài)",
            q: "Cho $\\Delta ABC$ có góc ngoài tại đỉnh $A$ bằng $100^\\circ$. Khẳng định nào sau đây đúng?",
            options: ["$\\widehat{B} + \\widehat{C} = 100^\\circ$", "$\\widehat{B} + \\widehat{C} = 80^\\circ$", "$\\widehat{BAC} = 100^\\circ$", "$\\widehat{B} = \\widehat{C} = 40^\\circ$"],
            answer: 0,
            explain: "Góc ngoài tại $A$ bằng tổng hai góc trong không kề: $\\widehat{B} + \\widehat{C} = 100^\\circ$. Còn góc trong $\\widehat{BAC} = 180^\\circ - 100^\\circ = 80^\\circ$."
          },
          {
            id: "d3q6", level: "vua", source: "mới",
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = 40^\\circ$ và $\\widehat{B} = 3\\widehat{C}$. Tam giác $ABC$ là",
            options: ["tam giác nhọn", "tam giác vuông", "tam giác tù", "không tồn tại tam giác như vậy"],
            answer: 2,
            explain: "$\\widehat{B} + \\widehat{C} = 4\\widehat{C} = 180^\\circ - 40^\\circ = 140^\\circ$, nên $\\widehat{C} = 35^\\circ$, $\\widehat{B} = 105^\\circ > 90^\\circ$. Vậy tam giác tù."
          },
          {
            id: "d3q7", level: "vua", source: "SBT Bài 12 – BT 4.7a (biến đổi)",
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = 60^\\circ$ và $\\widehat{B} < \\widehat{A}$. Sắp xếp ba góc theo thứ tự tăng dần, ta được",
            options: ["$\\widehat{A} < \\widehat{B} < \\widehat{C}$", "$\\widehat{B} < \\widehat{A} < \\widehat{C}$", "$\\widehat{C} < \\widehat{A} < \\widehat{B}$", "$\\widehat{B} < \\widehat{C} < \\widehat{A}$"],
            answer: 1,
            explain: "$\\widehat{B} + \\widehat{C} = 120^\\circ$ và $\\widehat{B} < 60^\\circ$, nên $\\widehat{C} = 120^\\circ - \\widehat{B} > 60^\\circ$. Vậy $\\widehat{B} < \\widehat{A} < \\widehat{C}$."
          },
          {
            id: "d3q8", level: "vua", source: "mới",
            q: "Trong một tam giác vuông, một góc nhọn gấp 4 lần góc nhọn còn lại. Góc nhọn lớn hơn có số đo là",
            options: ["$18^\\circ$", "$60^\\circ$", "$45^\\circ$", "$72^\\circ$"],
            answer: 3,
            explain: "Gọi góc nhỏ là $x$ thì góc lớn là $4x$; $x + 4x = 90^\\circ$ nên $x = 18^\\circ$, góc lớn bằng $72^\\circ$."
          },
          {
            id: "d3q9", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ có góc ngoài tại $B$ bằng $120^\\circ$ và góc ngoài tại $C$ bằng $130^\\circ$. Số đo góc $A$ là",
            options: ["$70^\\circ$", "$50^\\circ$", "$60^\\circ$", "$110^\\circ$"],
            answer: 0,
            explain: "Góc trong tại $B$: $180^\\circ - 120^\\circ = 60^\\circ$; góc trong tại $C$: $180^\\circ - 130^\\circ = 50^\\circ$. Vậy $\\widehat{A} = 180^\\circ - 60^\\circ - 50^\\circ = 70^\\circ$."
          },
          {
            id: "d3q10", level: "kho", source: "mới",
            q: "Tại mỗi đỉnh của một tam giác lấy một góc ngoài. Tổng ba góc ngoài đó bằng",
            options: ["$180^\\circ$", "$270^\\circ$", "$360^\\circ$", "$540^\\circ$"],
            answer: 2,
            explain: "Mỗi góc ngoài bằng $180^\\circ$ trừ góc trong kề với nó. Tổng ba góc ngoài $= 3 \\cdot 180^\\circ - (\\widehat{A} + \\widehat{B} + \\widehat{C}) = 540^\\circ - 180^\\circ = 360^\\circ$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SBT Bài 12 – BT 4.4 (biến đổi)", maxPoints: 2,
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = 50^\\circ$, $\\widehat{B} = 70^\\circ$. Tia phân giác của góc $C$ cắt cạnh $AB$ tại $D$. Tính số đo các góc $\\widehat{ACD}$, $\\widehat{ADC}$ và $\\widehat{BDC}$.",
            modelAnswer: "Trong $\\Delta ABC$: $\\widehat{ACB} = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$.<br>" +
              "$CD$ là tia phân giác của góc $C$ nên $\\widehat{ACD} = \\widehat{BCD} = 60^\\circ : 2 = 30^\\circ$.<br>" +
              "Trong $\\Delta ACD$: $\\widehat{ADC} = 180^\\circ - \\widehat{A} - \\widehat{ACD} = 180^\\circ - 50^\\circ - 30^\\circ = 100^\\circ$.<br>" +
              "$\\widehat{BDC}$ kề bù với $\\widehat{ADC}$ nên $\\widehat{BDC} = 180^\\circ - 100^\\circ = 80^\\circ$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\widehat{ACB} = 60^\\circ$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{ACD} = 30^\\circ$ (dùng tia phân giác)." },
              { pts: 0.5, text: "Tính đúng $\\widehat{ADC} = 100^\\circ$." },
              { pts: 0.5, text: "Tính đúng $\\widehat{BDC} = 80^\\circ$." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "mới", maxPoints: 1,
            q: "Cho $\\Delta ABC$ vuông tại $A$. Kẻ $AH$ vuông góc với $BC$ ($H$ thuộc $BC$). Chứng minh rằng $\\widehat{BAH} = \\widehat{C}$.",
            modelAnswer: "$\\Delta AHB$ vuông tại $H$ nên hai góc nhọn phụ nhau: $\\widehat{BAH} + \\widehat{B} = 90^\\circ$, suy ra $\\widehat{BAH} = 90^\\circ - \\widehat{B}$.<br>" +
              "$\\Delta ABC$ vuông tại $A$ nên $\\widehat{C} + \\widehat{B} = 90^\\circ$, suy ra $\\widehat{C} = 90^\\circ - \\widehat{B}$.<br>" +
              "Vậy $\\widehat{BAH} = \\widehat{C}$ (cùng phụ với góc $B$).",
            rubric: [
              { pts: 0.5, text: "Viết được $\\widehat{BAH} = 90^\\circ - \\widehat{B}$ (từ $\\Delta AHB$ vuông tại $H$)." },
              { pts: 0.5, text: "Viết được $\\widehat{C} = 90^\\circ - \\widehat{B}$ và kết luận." }
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
            q: "Cho $\\Delta ABC$ có $\\widehat{A} : \\widehat{B} : \\widehat{C} = 1 : 2 : 3$. Tam giác $ABC$ là",
            options: ["tam giác nhọn", "tam giác tù", "tam giác có một góc bằng $120^\\circ$", "tam giác vuông"],
            answer: 3,
            explain: "Mỗi phần bằng $180^\\circ : 6 = 30^\\circ$; ba góc là $30^\\circ, 60^\\circ, 90^\\circ$. Vậy tam giác vuông tại $C$."
          },
          {
            id: "d4q2", level: "vua", source: "mới",
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = \\widehat{B} + \\widehat{C}$. Số đo góc $A$ là",
            options: ["$60^\\circ$", "$90^\\circ$", "$120^\\circ$", "$45^\\circ$"],
            answer: 1,
            explain: "$\\widehat{A} + \\widehat{B} + \\widehat{C} = \\widehat{A} + \\widehat{A} = 2\\widehat{A} = 180^\\circ$, nên $\\widehat{A} = 90^\\circ$."
          },
          {
            id: "d4q3", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = 70^\\circ$. Các tia phân giác của góc $B$ và góc $C$ cắt nhau tại $I$. Số đo góc $\\widehat{BIC}$ là",
            options: ["$110^\\circ$", "$145^\\circ$", "$125^\\circ$", "$135^\\circ$"],
            answer: 2,
            explain: "$\\widehat{B} + \\widehat{C} = 110^\\circ$, nên $\\widehat{IBC} + \\widehat{ICB} = 110^\\circ : 2 = 55^\\circ$. Trong $\\Delta IBC$: $\\widehat{BIC} = 180^\\circ - 55^\\circ = 125^\\circ$."
          },
          {
            id: "d4q4", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ có góc ngoài tại $A$ bằng $110^\\circ$ và $\\widehat{B} - \\widehat{C} = 30^\\circ$. Số đo góc $C$ là",
            options: ["$40^\\circ$", "$70^\\circ$", "$55^\\circ$", "$30^\\circ$"],
            answer: 0,
            explain: "Góc ngoài tại $A$: $\\widehat{B} + \\widehat{C} = 110^\\circ$. Kết hợp $\\widehat{B} - \\widehat{C} = 30^\\circ$: $\\widehat{C} = (110^\\circ - 30^\\circ) : 2 = 40^\\circ$, $\\widehat{B} = 70^\\circ$."
          },
          {
            id: "d4q5", level: "kho", source: "SBT Bài 12 – BT 4.7b (biến đổi)",
            q: "Cho $\\Delta ABC$ có $\\widehat{A} > 100^\\circ$ và $\\widehat{B} > 40^\\circ$. Sắp xếp ba góc theo thứ tự giảm dần, ta được",
            options: ["$\\widehat{B} > \\widehat{A} > \\widehat{C}$", "$\\widehat{A} > \\widehat{C} > \\widehat{B}$", "$\\widehat{C} > \\widehat{B} > \\widehat{A}$", "$\\widehat{A} > \\widehat{B} > \\widehat{C}$"],
            answer: 3,
            explain: "$\\widehat{C} = 180^\\circ - \\widehat{A} - \\widehat{B} < 180^\\circ - 100^\\circ - 40^\\circ = 40^\\circ < \\widehat{B}$. Lại có $\\widehat{B} < 180^\\circ - \\widehat{A} < 80^\\circ < \\widehat{A}$. Vậy $\\widehat{A} > \\widehat{B} > \\widehat{C}$."
          },
          {
            id: "d4q6", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ vuông tại $A$, kẻ $AH$ vuông góc với $BC$ ($H$ thuộc $BC$). Biết $\\widehat{B} = 35^\\circ$. Số đo góc $\\widehat{HAC}$ là",
            options: ["$55^\\circ$", "$35^\\circ$", "$45^\\circ$", "$90^\\circ$"],
            answer: 1,
            explain: "$\\widehat{C} = 90^\\circ - 35^\\circ = 55^\\circ$. Trong $\\Delta AHC$ vuông tại $H$: $\\widehat{HAC} = 90^\\circ - 55^\\circ = 35^\\circ$ (bằng $\\widehat{B}$ vì cùng phụ với $\\widehat{C}$)."
          },
          {
            id: "d4q7", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ có $\\widehat{A} = 80^\\circ$. Các tia phân giác của hai góc ngoài tại $B$ và tại $C$ cắt nhau tại $K$. Số đo góc $\\widehat{BKC}$ là",
            options: ["$50^\\circ$", "$130^\\circ$", "$40^\\circ$", "$100^\\circ$"],
            answer: 0,
            explain: "Góc ngoài tại $B$ bằng $180^\\circ - \\widehat{B}$, nên $\\widehat{KBC} = \\frac{180^\\circ - \\widehat{B}}{2}$; tương tự $\\widehat{KCB} = \\frac{180^\\circ - \\widehat{C}}{2}$. Do $\\widehat{B} + \\widehat{C} = 100^\\circ$: $\\widehat{KBC} + \\widehat{KCB} = \\frac{360^\\circ - 100^\\circ}{2} = 130^\\circ$. Vậy $\\widehat{BKC} = 180^\\circ - 130^\\circ = 50^\\circ$."
          },
          {
            id: "d4q8", level: "kho", source: "mới",
            q: "Trong $\\Delta ABC$, góc ngoài tại đỉnh $A$ gấp đôi góc trong tại đỉnh $A$. Số đo góc $\\widehat{BAC}$ là",
            options: ["$90^\\circ$", "$120^\\circ$", "$60^\\circ$", "$45^\\circ$"],
            answer: 2,
            explain: "Góc ngoài và góc trong tại $A$ kề bù: $\\widehat{BAC} + 2\\widehat{BAC} = 180^\\circ$, nên $\\widehat{BAC} = 60^\\circ$."
          },
          {
            id: "d4q9", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ nhọn có $\\widehat{A} = 60^\\circ$. Kẻ $BD$ vuông góc với $AC$ ($D$ thuộc $AC$), $CE$ vuông góc với $AB$ ($E$ thuộc $AB$); $BD$ cắt $CE$ tại $H$. Số đo góc $\\widehat{BHC}$ là",
            options: ["$60^\\circ$", "$90^\\circ$", "$150^\\circ$", "$120^\\circ$"],
            answer: 3,
            explain: "$\\Delta ABD$ vuông tại $D$ nên $\\widehat{ABD} = 90^\\circ - 60^\\circ = 30^\\circ$. $\\Delta BEH$ vuông tại $E$ có $\\widehat{EBH} = 30^\\circ$ nên $\\widehat{BHE} = 60^\\circ$. Ba điểm $E, H, C$ thẳng hàng nên $\\widehat{BHC} = 180^\\circ - 60^\\circ = 120^\\circ$."
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Cho $\\Delta ABC$ có góc ngoài tại $C$ bằng $125^\\circ$ và $\\widehat{A} - \\widehat{B} = 15^\\circ$. Số đo góc $A$ là",
            options: ["$55^\\circ$", "$70^\\circ$", "$62{,}5^\\circ$", "$85^\\circ$"],
            answer: 1,
            explain: "$\\widehat{A} + \\widehat{B} = 125^\\circ$ (góc ngoài tại $C$) và $\\widehat{A} - \\widehat{B} = 15^\\circ$, nên $\\widehat{A} = (125^\\circ + 15^\\circ) : 2 = 70^\\circ$, $\\widehat{B} = 55^\\circ$."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Cho $\\Delta ABC$, các tia phân giác của góc $B$ và góc $C$ cắt nhau tại $I$.<br>a) Biết $\\widehat{A} = 80^\\circ$, tính $\\widehat{BIC}$.<br>b) Chứng minh rằng với mọi tam giác $ABC$ ta có $\\widehat{BIC} = 90^\\circ + \\frac{\\widehat{A}}{2}$.",
            modelAnswer: "b) (làm tổng quát trước) Vì $BI$, $CI$ là các tia phân giác nên $\\widehat{IBC} = \\frac{\\widehat{B}}{2}$, $\\widehat{ICB} = \\frac{\\widehat{C}}{2}$.<br>" +
              "Do đó $\\widehat{IBC} + \\widehat{ICB} = \\frac{\\widehat{B} + \\widehat{C}}{2} = \\frac{180^\\circ - \\widehat{A}}{2} = 90^\\circ - \\frac{\\widehat{A}}{2}$.<br>" +
              "Trong $\\Delta IBC$: $\\widehat{BIC} = 180^\\circ - \\left(90^\\circ - \\frac{\\widehat{A}}{2}\\right) = 90^\\circ + \\frac{\\widehat{A}}{2}$.<br>" +
              "a) Với $\\widehat{A} = 80^\\circ$: $\\widehat{BIC} = 90^\\circ + 40^\\circ = 130^\\circ$. (Hoặc tính trực tiếp: $\\widehat{B} + \\widehat{C} = 100^\\circ$, $\\widehat{IBC} + \\widehat{ICB} = 50^\\circ$, $\\widehat{BIC} = 130^\\circ$.)",
            rubric: [
              { pts: 0.5, text: "Câu a: tính đúng $\\widehat{BIC} = 130^\\circ$." },
              { pts: 0.5, text: "Câu b: viết được $\\widehat{IBC} + \\widehat{ICB} = \\frac{180^\\circ - \\widehat{A}}{2}$." },
              { pts: 0.5, text: "Câu b: suy ra đúng $\\widehat{BIC} = 90^\\circ + \\frac{\\widehat{A}}{2}$." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Cho $\\Delta ABC$ có hai góc $B$, $C$ nhọn và $\\widehat{B} > \\widehat{C}$. Kẻ $AH$ vuông góc với $BC$ ($H$ thuộc $BC$) và tia phân giác $AD$ của góc $A$ ($D$ thuộc $BC$). Chứng minh rằng $\\widehat{HAD} = \\frac{\\widehat{B} - \\widehat{C}}{2}$.",
            modelAnswer: "$\\Delta ABH$ vuông tại $H$ nên $\\widehat{BAH} = 90^\\circ - \\widehat{B}$.<br>" +
              "$AD$ là tia phân giác góc $A$ nên $\\widehat{BAD} = \\frac{\\widehat{A}}{2} = \\frac{180^\\circ - \\widehat{B} - \\widehat{C}}{2} = 90^\\circ - \\frac{\\widehat{B} + \\widehat{C}}{2}$.<br>" +
              "Vì $\\widehat{B} > \\widehat{C}$ nên $\\widehat{B} > \\frac{\\widehat{B} + \\widehat{C}}{2}$, do đó $\\widehat{BAH} < \\widehat{BAD}$: tia $AH$ nằm giữa hai tia $AB$ và $AD$.<br>" +
              "Suy ra $\\widehat{HAD} = \\widehat{BAD} - \\widehat{BAH} = \\left(90^\\circ - \\frac{\\widehat{B} + \\widehat{C}}{2}\\right) - (90^\\circ - \\widehat{B}) = \\frac{\\widehat{B} - \\widehat{C}}{2}$.",
            rubric: [
              { pts: 0.5, text: "Tính được $\\widehat{BAH} = 90^\\circ - \\widehat{B}$." },
              { pts: 0.5, text: "Tính được $\\widehat{BAD} = 90^\\circ - \\frac{\\widehat{B} + \\widehat{C}}{2}$." },
              { pts: 0.5, text: "Lập luận tia $AH$ nằm giữa $AB$, $AD$ và trừ ra đúng kết quả." }
            ]
          }
        ]
      }
    ]
  });
})();
