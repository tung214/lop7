(function () {
  // ---------- Hình vẽ SVG (currentColor để hợp chế độ sáng/tối; điểm nhấn #e5484d) ----------
  var RAD = Math.PI / 180, RED = '#e5484d';
  function f(n) { return (+n).toFixed(1); }
  function P(o, a, r) { return [o[0] + r * Math.cos(a * RAD), o[1] - r * Math.sin(a * RAD)]; }   // góc a (độ) theo chiều ngược kim đồng hồ
  function fig(w, h, body) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="100%" style="max-width:' + Math.min(w, 320) + 'px;display:block;margin:6px auto" role="img" aria-label="Hình vẽ">' + body + '</svg>';
  }
  function line(p, q, o) {
    o = o || {};
    return '<line x1="' + f(p[0]) + '" y1="' + f(p[1]) + '" x2="' + f(q[0]) + '" y2="' + f(q[1]) + '" stroke="' + (o.red ? RED : 'currentColor') + '" stroke-width="1.5"' + (o.dash ? ' stroke-dasharray="6 4"' : '') + '/>';
  }
  function txt(p, t, o) {
    o = o || {};
    return '<text x="' + f(p[0]) + '" y="' + f(p[1]) + '" font-size="' + (o.size || 14) + '" font-style="italic" text-anchor="middle" dominant-baseline="middle" fill="' + (o.red ? RED : 'currentColor') + '">' + t + '</text>';
  }
  function arc(o, r, a1, a2, red) {
    var p1 = P(o, a1, r), p2 = P(o, a2, r), large = (a2 - a1) > 180 ? 1 : 0;
    return '<path d="M' + f(p1[0]) + ' ' + f(p1[1]) + ' A' + r + ' ' + r + ' 0 ' + large + ' 0 ' + f(p2[0]) + ' ' + f(p2[1]) + '" fill="none" stroke="' + (red ? RED : 'currentColor') + '" stroke-width="1.3"/>';
  }
  function rightMark(o, a, s) {
    var p1 = P(o, a, s), p3 = P(o, a + 90, s), p2 = [p1[0] + p3[0] - o[0], p1[1] + p3[1] - o[1]];
    return '<path d="M' + f(p1[0]) + ' ' + f(p1[1]) + ' L' + f(p2[0]) + ' ' + f(p2[1]) + ' L' + f(p3[0]) + ' ' + f(p3[1]) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
  }
  function dot(p) { return '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2.5" fill="currentColor"/>'; }

  // Hai đường thẳng song song a, b bị cắt bởi c tại A, B. kind: "dongvi" | "sole"
  var A = [170, 50], B = [130, 120], CU = Math.atan2(70, 40) / RAD;   // góc của tia hướng lên trên của c
  function figPar(kind) {
    var s = line([20, 50], [300, 50]) + line([20, 120], [300, 120]) + line([110, 155], [190, 15]) +
      txt([308, 50], 'a') + txt([308, 120], 'b') + txt([200, 14], 'c') + dot(A) + dot(B) +
      txt(P(A, 125, 15), 'A') + txt(P(B, 125, 15), 'B');
    if (kind === 'sole') {
      s += arc(A, 14, 180, 180 + CU, true) + txt(P(A, 180 + CU / 2, 25), '1', { size: 12, red: true });
    } else {
      s += arc(A, 14, 0, CU, true) + txt(P(A, CU / 2, 25), '1', { size: 12, red: true });
    }
    s += arc(B, 14, 0, CU, true) + txt(P(B, CU / 2, 25), '1', { size: 12, red: true });
    return fig(320, 165, s);
  }
  // Hình kiểu H.3.46: kẻ thêm b' qua B (nét đứt)
  function fig346() {
    var s = line([20, 50], [300, 50]) + line([20, 120], [300, 120]) + line([110, 155], [190, 15]) +
      line(P(B, 202, 30), P(B, 22, 150), { dash: true }) +
      txt([308, 50], 'a') + txt([308, 120], 'b') + txt([200, 14], 'c') + txt(P(B, 22, 164), 'b′') +
      dot(A) + dot(B) + txt(P(A, 125, 15), 'A') + txt(P(B, 125, 15), 'B') +
      arc(A, 14, 0, CU, true) + txt(P(A, CU / 2, 25), '1', { size: 12, red: true }) +
      arc(B, 14, 0, CU, true) + txt(P(B, 9, 27), '1', { size: 11, red: true }) +
      arc(B, 32, 22, CU) + txt(P(B, (22 + CU) / 2, 42), '2', { size: 12 });
    return fig(320, 165, s);
  }
  // d ⊥ d', d' // d''
  function figPerp() {
    var s = line([120, 10], [120, 160]) + line([30, 50], [290, 50]) + line([30, 120], [290, 120]) +
      rightMark([120, 50], 0, 10) + txt([108, 16], 'd') + txt([285, 38], 'd′') + txt([285, 108], 'd″');
    return fig(320, 170, s);
  }
  // Hai đường thẳng x'x, y'y cắt nhau tại O (theta: góc của tia Oy)
  function figCross(theta, right) {
    var O = [160, 90];
    var s = line([30, 90], [290, 90]) + line(P(O, theta, 75), P(O, theta + 180, 75)) + dot(O) +
      txt([302, 90], 'x') + txt([16, 90], 'x′') + txt(P(O, theta, 87), 'y') + txt(P(O, theta + 180, 87), 'y′') +
      txt(P(O, (theta + 180) / 2, 15), 'O');
    s += right ? rightMark(O, 0, 10) : arc(O, 16, 0, theta, true);
    return fig(320, 180, s);
  }
  // Góc xOy (80°) có tia phân giác Ot; Ox', Oy', Ot' là các tia đối
  function figBis() {
    var O = [160, 95], s = '';
    [[0, 'x'], [80, 'y'], [180, 'x′'], [260, 'y′']].forEach(function (r) { s += txt(P(O, r[0], 93), r[1]); });
    s += line(P(O, 0, 82), P(O, 180, 82)) + line(P(O, 80, 82), P(O, 260, 82)) +
      line(P(O, 40, 82), P(O, 220, 82), { red: true }) + txt(P(O, 40, 93), 't', { red: true }) + txt(P(O, 220, 93), 't′', { red: true }) +
      arc(O, 16, 0, 40) + arc(O, 20, 40, 80) + arc(O, 16, 180, 220, true) + arc(O, 20, 220, 260, true) +
      dot(O) + txt(P(O, 130, 14), 'O');
    return fig(320, 190, s);
  }
  // Phản ví dụ: Ot' là tia đối của tia phân giác Ot thì xOt' = t'Oy nhưng Ot' không là tia phân giác
  function figBis2() {
    var O = [150, 110], s = '';
    s += line(O, P(O, 0, 120)) + line(O, P(O, 100, 85)) + line(O, P(O, 50, 85)) + line(O, P(O, 230, 75), { red: true, dash: true }) +
      txt(P(O, 0, 130), 'x') + txt(P(O, 100, 95), 'y') + txt(P(O, 50, 95), 't') + txt(P(O, 230, 86), 't′', { red: true }) +
      arc(O, 18, 230, 360, true) + arc(O, 28, 100, 230, true) + dot(O) + txt(P(O, 75, 14), 'O');
    return fig(320, 190, s);
  }
  // Bảng GT / KL
  function gtkl(gt, kl) {
    var c = 'padding:3px 10px 3px 0;border-right:1px solid currentColor;', b = 'border-bottom:1px solid currentColor;';
    return '<table style="border-collapse:collapse;margin:6px 0"><tr><td style="' + c + b + '"><b>GT</b></td><td style="padding:3px 10px;' + b + '">' + gt + '</td></tr>' +
      '<tr><td style="' + c + '"><b>KL</b></td><td style="padding:3px 10px">' + kl + '</td></tr></table>';
  }

  registerLesson({
    id: "c3-b11",
    chapter: 3,
    kind: "lesson",
    title: "Bài 11. Định lí và chứng minh định lí",
    sgkPages: [55, 57],
    sbtPages: [45, 46],
    objectives: [
      "Nhận biết một định lí; chỉ ra giả thiết và kết luận của định lí",
      "Viết giả thiết, kết luận của định lí bằng kí hiệu kèm hình vẽ",
      "Làm quen với chứng minh định lí: lập luận có căn cứ từ giả thiết và các khẳng định đúng đã biết",
      "Biết dùng một ví dụ (phản ví dụ) để chỉ ra một khẳng định là sai"
    ],

    theory: [
      {
        heading: "1. Định lí. Giả thiết và kết luận",
        html: "<b>Định lí</b> là một khẳng định được suy ra từ những khẳng định đúng đã biết. Định lí thường được phát biểu dưới dạng <b>“Nếu … thì …”</b>:" +
          "<ul><li>Phần nằm giữa từ “nếu” và từ “thì” là <b>giả thiết</b> (viết tắt <b>GT</b>) – điều đã cho.</li>" +
          "<li>Phần sau từ “thì” là <b>kết luận</b> (viết tắt <b>KL</b>) – điều phải suy ra.</li></ul>" +
          "Ví dụ: “Nếu <u>hai góc đối đỉnh</u> thì <u>hai góc đó bằng nhau</u>” có GT là “hai góc đối đỉnh”, KL là “hai góc đó bằng nhau”.<br>" +
          "Một định lí không có sẵn chữ “nếu … thì” vẫn viết lại được dưới dạng đó. Chẳng hạn “Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng còn lại” viết bằng kí hiệu:" +
          figPerp() + gtkl("$d, d', d''$ là các đường thẳng; $d' \\parallel d''$; $d \\perp d'$", "$d \\perp d''$")
      },
      {
        heading: "2. Chứng minh định lí",
        html: "<b>Chứng minh một định lí</b> là dùng lập luận để từ <b>giả thiết</b> và những <b>khẳng định đúng đã biết</b> suy ra <b>kết luận</b>." +
          "<ul><li>Đo đạc trên hình vẽ chỉ cho kết quả gần đúng và chỉ trong một trường hợp cụ thể, nên <b>không phải</b> là chứng minh.</li>" +
          "<li>Các bước thường làm: vẽ hình → ghi GT, KL bằng kí hiệu → lập luận từng bước, <b>mỗi bước có căn cứ</b> (theo GT, theo định lí, tính chất, tiên đề đã biết).</li></ul>" +
          "Ví dụ: chứng minh “Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc đồng vị bằng nhau” (GT: $a \\parallel b$, $c$ cắt $a$ tại $A$, cắt $b$ tại $B$; KL: $\\widehat{A_1} = \\widehat{B_1}$)." +
          fig346() +
          "• Qua $B$ kẻ đường thẳng $b'$ sao cho $\\widehat{B_2} = \\widehat{A_1}$. Khi đó $c$ tạo với $a$ và $b'$ hai góc đồng vị bằng nhau nên $a \\parallel b'$ (dấu hiệu nhận biết hai đường thẳng song song).<br>" +
          "• Qua $B$ có hai đường thẳng $b$ và $b'$ cùng song song với $a$; theo tiên đề Euclid, $b'$ trùng $b$.<br>" +
          "• Vậy $\\widehat{B_1} = \\widehat{B_2} = \\widehat{A_1}$."
      },
      {
        heading: "3. Khẳng định đúng – khẳng định sai",
        html: "<ul><li>Đổi chỗ giả thiết và kết luận của một định lí ta được một khẳng định mới, khẳng định này <b>có thể sai</b>. Ví dụ: “Hai góc đối đỉnh thì bằng nhau” là định lí, nhưng “Hai góc bằng nhau thì đối đỉnh” là <b>sai</b>.</li>" +
          "<li>Muốn chứng tỏ một khẳng định là <b>đúng</b> ta phải <b>chứng minh</b> (cho mọi trường hợp). Muốn chứng tỏ một khẳng định là <b>sai</b>, chỉ cần nêu <b>một ví dụ</b> mà ở đó giả thiết thoả mãn nhưng kết luận không đúng (gọi là <b>phản ví dụ</b>).</li></ul>"
      },
      {
        heading: "4. Một số khẳng định đúng đã biết (hay dùng làm căn cứ)",
        html: "<ul><li>Hai góc kề bù có tổng số đo bằng $180^\\circ$.</li>" +
          "<li>Hai góc đối đỉnh thì bằng nhau.</li>" +
          "<li>Tia phân giác $Ot$ của góc $xOy$: $\\widehat{xOt} = \\widehat{tOy} = \\frac{1}{2}\\widehat{xOy}$.</li>" +
          "<li>Dấu hiệu nhận biết: nếu $c$ cắt $a, b$ tạo thành một cặp góc so le trong (hoặc đồng vị) bằng nhau thì $a \\parallel b$.</li>" +
          "<li>Tiên đề Euclid: qua một điểm ở ngoài một đường thẳng chỉ có một đường thẳng song song với đường thẳng đó.</li>" +
          "<li>Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau, hai góc đồng vị bằng nhau.</li>" +
          "<li>Hai đường thẳng phân biệt cùng vuông góc (hoặc cùng song song) với một đường thẳng thứ ba thì song song với nhau.</li></ul>"
      }
    ],

    skills: [
      "<b>Tìm GT, KL:</b> viết định lí về dạng “Nếu … thì …”; phần giữa “nếu” và “thì” là GT, phần sau “thì” là KL. Đừng nhầm KL là “điều đã cho”.",
      "<b>Ghi GT, KL bằng kí hiệu:</b> vẽ hình, đặt tên điểm, đường thẳng, góc; GT ghi đủ mọi điều đã cho (kể cả “phân biệt”, “cắt nhau tại …”), KL ghi điều cần chứng minh.",
      "<b>Trình bày chứng minh:</b> mỗi dòng là một khẳng định kèm lí do trong ngoặc: (GT), (hai góc kề bù), (hai góc đối đỉnh), (tiên đề Euclid)… Dòng cuối là KL.",
      "<b>Chứng minh hai góc bằng nhau</b> thường dùng: cùng bằng một góc thứ ba; cùng bù (hoặc cùng phụ) với một góc; đối đỉnh; so le trong / đồng vị khi có hai đường thẳng song song.",
      "<b>Bác bỏ một khẳng định:</b> chỉ cần một phản ví dụ thoả mãn giả thiết mà sai kết luận. Còn đo đạc nhiều hình vẫn <b>không</b> chứng minh được một khẳng định là đúng.",
      "<b>Lỗi hay gặp:</b> dùng chính kết luận làm lí do; lập luận “nhìn hình thấy bằng nhau”; quên điều kiện “phân biệt”; nghĩ rằng đổi chỗ GT và KL thì vẫn được định lí."
    ],

    examples: [
      {
        q: "Vẽ hình, ghi giả thiết, kết luận và chứng minh định lí “Hai góc đối đỉnh thì bằng nhau”.",
        solution: figCross(60) +
          gtkl("Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$", "$\\widehat{xOy} = \\widehat{x'Oy'}$") +
          "<i>Chứng minh.</i> $\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$ (hai góc kề bù).<br>" +
          "$\\widehat{x'Oy'} + \\widehat{yOx'} = 180^\\circ$ (hai góc kề bù).<br>" +
          "Suy ra $\\widehat{xOy} = 180^\\circ - \\widehat{yOx'} = \\widehat{x'Oy'}$."
      },
      {
        q: "Chứng minh định lí: “Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng còn lại”. Trong chứng minh đã dùng những điều đúng đã biết nào?",
        solution: gtkl("$d' \\parallel d''$; $d \\perp d'$ tại $A$", "$d \\perp d''$") +
          "<i>Chứng minh.</i> Đường thẳng $d$ cắt $d''$ (nếu không thì $d \\parallel d''$, khi đó qua $A$ có hai đường thẳng $d$ và $d'$ cùng song song với $d''$, trái với tiên đề Euclid). Gọi giao điểm là $B$.<br>" +
          "Góc tạo bởi $d$ và $d'$ tại $A$ bằng $90^\\circ$ (vì $d \\perp d'$). Vì $d' \\parallel d''$ nên góc đồng vị với nó tại $B$ cũng bằng $90^\\circ$ (tính chất hai đường thẳng song song). Vậy $d \\perp d''$.<br>" +
          "Đã dùng: tiên đề Euclid, tính chất hai đường thẳng song song, định nghĩa hai đường thẳng vuông góc."
      },
      {
        q: "Cho góc $xOy$ không phải góc bẹt. Khẳng định “Nếu tia $Ot'$ thoả mãn $\\widehat{xOt'} = \\widehat{t'Oy}$ thì $Ot'$ là tia phân giác của góc $xOy$” đúng hay sai?",
        solution: "Khẳng định này <b>sai</b>. Phản ví dụ: gọi $Ot$ là tia phân giác của góc $xOy$ và $Ot'$ là tia đối của tia $Ot$." + figBis2() +
          "Ta có $\\widehat{xOt'} = 180^\\circ - \\widehat{xOt}$ và $\\widehat{t'Oy} = 180^\\circ - \\widehat{tOy}$ (các cặp góc kề bù). Vì $\\widehat{xOt} = \\widehat{tOy}$ nên $\\widehat{xOt'} = \\widehat{t'Oy}$.<br>" +
          "Nhưng tia $Ot'$ không nằm trong góc $xOy$, nên $Ot'$ không phải tia phân giác của góc $xOy$. (Chiều ngược lại “Nếu $Ot$ là tia phân giác thì $\\widehat{xOt} = \\widehat{tOy}$” thì đúng.)"
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.55 – Định lí",
            q: "Định lí là",
            options: ["một khẳng định được suy ra từ những khẳng định đúng đã biết", "một khẳng định được kiểm tra bằng cách đo đạc trên một hình vẽ", "một hình vẽ có ghi đầy đủ kí hiệu", "mọi câu được viết dưới dạng “Nếu … thì …”"],
            answer: 0,
            explain: "Định lí là khẳng định được suy ra (bằng lập luận) từ những khẳng định đúng đã biết. Đo đạc chỉ là kiểm nghiệm; câu dạng “Nếu … thì …” có thể sai."
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.55 – Giả thiết, kết luận",
            q: "Giả thiết của định lí “Nếu hai góc đối đỉnh thì hai góc đó bằng nhau” là",
            options: ["hai góc đó bằng nhau", "hai góc đối đỉnh", "hai góc kề bù", "hai góc có chung đỉnh"],
            answer: 1,
            explain: "Giả thiết là phần giữa “nếu” và “thì”: “hai góc đối đỉnh”. Phần “hai góc đó bằng nhau” là kết luận."
          },
          {
            id: "d1q3", level: "de", source: "SBT Bài 11 – Kiến thức cần nhớ",
            q: "Kết luận của định lí “Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì chúng song song với nhau” là",
            options: ["hai đường thẳng phân biệt", "cùng song song với một đường thẳng thứ ba", "chúng song song với nhau", "chúng vuông góc với nhau"],
            answer: 2,
            explain: "Kết luận là phần sau từ “thì”: “chúng song song với nhau”. Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba là giả thiết."
          },
          {
            id: "d1q4", level: "de", source: "SGK tr.56 – Ví dụ",
            q: "Định lí “Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng còn lại” được minh hoạ bởi hình dưới (với $d' \\parallel d''$). Kết luận của định lí viết bằng kí hiệu là" + figPerp(),
            options: ["$d' \\parallel d''$", "$d \\perp d'$", "$d \\parallel d''$", "$d \\perp d''$"],
            answer: 3,
            explain: "GT: $d' \\parallel d''$, $d \\perp d'$. KL: $d \\perp d''$ (đường thẳng $d$ cũng vuông góc với đường thẳng còn lại)."
          },
          {
            id: "d1q5", level: "vua", source: "SGK tr.56 – Chứng minh định lí",
            q: "Chứng minh một định lí là",
            options: ["vẽ thật nhiều hình rồi đo để kiểm tra", "dùng lập luận để từ giả thiết và những khẳng định đúng đã biết suy ra kết luận", "viết lại định lí dưới dạng “Nếu … thì …”", "ghi giả thiết và kết luận bằng kí hiệu"],
            answer: 1,
            explain: "Chứng minh là lập luận từ giả thiết và các khẳng định đúng đã biết để suy ra kết luận. Đo đạc, viết lại, ghi kí hiệu chỉ là các bước chuẩn bị."
          },
          {
            id: "d1q6", level: "vua", source: "SGK tr.57 – Tranh luận",
            q: "Khẳng định nào sau đây là một định lí (luôn đúng)?",
            options: ["Hai góc bằng nhau thì đối đỉnh", "Hai góc có chung một đỉnh thì kề nhau", "Hai góc đối đỉnh thì bằng nhau", "Hai góc kề nhau thì bù nhau"],
            answer: 2,
            explain: "“Hai góc đối đỉnh thì bằng nhau” đã được chứng minh từ tính chất hai góc kề bù. Các khẳng định còn lại đều có phản ví dụ (chẳng hạn hai góc $30^\\circ$ ở hai nơi khác nhau bằng nhau nhưng không đối đỉnh)."
          },
          {
            id: "d1q7", level: "vua", source: "SGK Bài 11 – BT 3.24",
            q: "Định lí: “Hai đường thẳng phân biệt $a, b$ cùng vuông góc với đường thẳng $c$ thì $a \\parallel b$”. Giả thiết của định lí viết bằng kí hiệu là",
            options: ["$a, b$ phân biệt; $a \\perp c$; $b \\perp c$", "$a \\parallel b$", "$a \\perp b$; $b \\perp c$", "$a \\parallel c$; $b \\parallel c$"],
            answer: 0,
            explain: "Điều đã cho là: $a, b$ phân biệt, cùng vuông góc với $c$. Còn $a \\parallel b$ là kết luận."
          },
          {
            id: "d1q8", level: "vua", source: "SGK tr.42 – Tập suy luận (góc đối đỉnh)",
            q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$ (hình dưới). Khi chứng minh $\\widehat{xOy} = \\widehat{x'Oy'}$, ta viết $\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$. Căn cứ của bước này là" + figCross(60),
            options: ["hai góc đối đỉnh thì bằng nhau", "tính chất của hai đường thẳng song song", "định nghĩa tia phân giác của một góc", "hai góc kề bù có tổng số đo bằng $180^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xOy}$ và $\\widehat{yOx'}$ có chung cạnh $Oy$, hai cạnh còn lại $Ox, Ox'$ là hai tia đối nhau nên chúng kề bù, tổng bằng $180^\\circ$. Không được dùng “đối đỉnh thì bằng nhau” vì đó chính là điều đang chứng minh."
          },
          {
            id: "d1q9", level: "kho", source: "SGK tr.57 – Tranh luận",
            q: "Để chứng tỏ khẳng định “Hai góc bằng nhau thì đối đỉnh” là <b>sai</b>, cách làm nào đúng?",
            options: ["Chỉ ra một ví dụ có hai góc bằng nhau nhưng không đối đỉnh", "Vẽ hai góc đối đỉnh rồi đo thấy chúng bằng nhau", "Đo nhiều cặp góc bằng nhau và thấy chúng đều đối đỉnh", "Chứng minh định lí “Hai góc đối đỉnh thì bằng nhau”"],
            answer: 0,
            explain: "Muốn bác bỏ một khẳng định chỉ cần một phản ví dụ: giả thiết đúng (hai góc bằng nhau) mà kết luận sai (không đối đỉnh). Ví dụ: hai góc tạo bởi tia phân giác $Ot$ của góc $xOy$ là $\\widehat{xOt} = \\widehat{tOy}$ nhưng không đối đỉnh."
          },
          {
            id: "d1q10", level: "kho", source: "SGK tr.56 – Chứng minh (H.3.46)",
            q: "Cho $a \\parallel b$, đường thẳng $c$ cắt $a$ tại $A$, cắt $b$ tại $B$ (hình dưới). Biết $\\widehat{A_1} = 70^\\circ$. Lập luận nào sau đây đúng?" + figPar('dongvi'),
            options: ["$\\widehat{B_1} = 110^\\circ$ vì $\\widehat{A_1}$ và $\\widehat{B_1}$ là hai góc kề bù", "$\\widehat{B_1} = 70^\\circ$ vì $\\widehat{A_1}$ và $\\widehat{B_1}$ là hai góc đối đỉnh", "$\\widehat{B_1} = 70^\\circ$ vì $a \\parallel b$ nên hai góc đồng vị bằng nhau", "$\\widehat{B_1} = 70^\\circ$ vì đo bằng thước đo góc thấy bằng nhau"],
            answer: 2,
            explain: "$\\widehat{A_1}$ và $\\widehat{B_1}$ là hai góc đồng vị; vì $a \\parallel b$ nên chúng bằng nhau (tính chất hai đường thẳng song song). Hai góc này không đối đỉnh, không kề bù; còn “đo thấy bằng” không phải lập luận."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SBT Bài 11 – BT 3.30b", maxPoints: 3,
            q: "Cho định lí: “Hai góc cùng bù với một góc thứ ba thì bằng nhau”.<br>a) Ghi giả thiết và kết luận của định lí bằng kí hiệu (gọi ba góc là $\\widehat{A}, \\widehat{B}, \\widehat{C}$).<br>b) Chứng minh định lí đó.",
            modelAnswer: "a) " + gtkl("$\\widehat{A} + \\widehat{C} = 180^\\circ$; $\\ \\widehat{B} + \\widehat{C} = 180^\\circ$", "$\\widehat{A} = \\widehat{B}$") +
              "b) Từ giả thiết $\\widehat{A} + \\widehat{C} = 180^\\circ$ suy ra $\\widehat{A} = 180^\\circ - \\widehat{C}$.<br>" +
              "Từ giả thiết $\\widehat{B} + \\widehat{C} = 180^\\circ$ suy ra $\\widehat{B} = 180^\\circ - \\widehat{C}$.<br>" +
              "Hai góc $\\widehat{A}$ và $\\widehat{B}$ cùng bằng $180^\\circ - \\widehat{C}$ nên $\\widehat{A} = \\widehat{B}$.",
            rubric: [
              { pts: 0.5, text: "Ghi đúng GT: $\\widehat{A} + \\widehat{C} = 180^\\circ$ và $\\widehat{B} + \\widehat{C} = 180^\\circ$." },
              { pts: 0.5, text: "Ghi đúng KL: $\\widehat{A} = \\widehat{B}$." },
              { pts: 1, text: "Suy ra đúng $\\widehat{A} = 180^\\circ - \\widehat{C}$ và $\\widehat{B} = 180^\\circ - \\widehat{C}$ (có căn cứ từ GT)." },
              { pts: 1, text: "Kết luận $\\widehat{A} = \\widehat{B}$ với lí do “cùng bằng $180^\\circ - \\widehat{C}$”." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SGK tr.55 – Giả thiết, kết luận",
            q: "Khi một định lí được phát biểu dưới dạng “Nếu … thì …”, giả thiết của định lí là",
            options: ["phần sau từ “thì”", "phần giữa từ “nếu” và từ “thì”", "toàn bộ câu phát biểu", "phần hình vẽ minh hoạ"],
            answer: 1,
            explain: "Giả thiết là phần giữa “nếu” và “thì”; kết luận là phần sau “thì”."
          },
          {
            id: "d2q2", level: "de", source: "SBT Bài 11 – BT 3.27a",
            q: "Kết luận của định lí “Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau” là",
            options: ["một đường thẳng cắt hai đường thẳng song song", "hai đường thẳng song song", "hai góc đồng vị bằng nhau", "hai góc so le trong bằng nhau"],
            answer: 3,
            explain: "Phần sau từ “thì” là kết luận: “hai góc so le trong bằng nhau”."
          },
          {
            id: "d2q3", level: "de", source: "mới",
            q: "Định lí “Hai góc kề bù có tổng số đo bằng $180^\\circ$” được phát biểu dưới dạng “Nếu … thì …” là",
            options: ["Nếu tổng số đo của hai góc bằng $180^\\circ$ thì hai góc đó kề bù", "Nếu hai góc kề nhau thì hai góc đó bù nhau", "Nếu hai góc kề bù thì tổng số đo của chúng bằng $180^\\circ$", "Nếu hai góc bù nhau thì hai góc đó kề nhau"],
            answer: 2,
            explain: "Điều đã cho là “hai góc kề bù” (GT), điều suy ra là “tổng số đo bằng $180^\\circ$” (KL). Phương án “Nếu tổng bằng $180^\\circ$ thì kề bù” là đổi chỗ GT và KL, và là khẳng định sai."
          },
          {
            id: "d2q4", level: "de", source: "mới",
            q: "Định lí: “Hai đường thẳng phân biệt $a, b$ cùng song song với đường thẳng $c$ thì $a \\parallel b$”. Giả thiết viết bằng kí hiệu là",
            options: ["$a, b$ phân biệt; $a \\parallel c$; $b \\parallel c$", "$a \\parallel b$", "$a \\parallel c$; $a \\parallel b$", "$a, b$ phân biệt; $a \\perp c$; $b \\perp c$"],
            answer: 0,
            explain: "Điều đã cho: $a, b$ phân biệt và cùng song song với $c$. Còn $a \\parallel b$ là kết luận."
          },
          {
            id: "d2q5", level: "vua", source: "SGK tr.55–56",
            q: "Khẳng định nào sau đây là <b>sai</b>?",
            options: ["Định lí là khẳng định được suy ra từ những khẳng định đúng đã biết", "Trong chứng minh, mỗi bước lập luận đều phải có căn cứ", "Có thể chứng minh một định lí bằng cách đo trên một hình vẽ", "Muốn chỉ ra một khẳng định là sai, chỉ cần nêu một ví dụ mà khẳng định đó không đúng"],
            answer: 2,
            explain: "Đo đạc chỉ cho kết quả gần đúng và chỉ trong một trường hợp cụ thể, nên không phải là chứng minh. Ba khẳng định còn lại đều đúng."
          },
          {
            id: "d2q6", level: "vua", source: "SBT Bài 11 – Ví dụ 2",
            q: "Cho định lí: “Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$ tạo thành bốn góc; nếu $\\widehat{xOy} = 90^\\circ$ thì ba góc còn lại cũng là góc vuông” (hình dưới). Kết luận của định lí viết bằng kí hiệu là" + figCross(90, true),
            options: ["$\\widehat{xOy} = 90^\\circ$", "$\\widehat{yOx'} = \\widehat{x'Oy'} = \\widehat{y'Ox} = 90^\\circ$", "$xx'$ cắt $yy'$ tại $O$", "$\\widehat{xOy} = \\widehat{x'Oy'}$"],
            answer: 1,
            explain: "GT: $xx'$ cắt $yy'$ tại $O$, $\\widehat{xOy} = 90^\\circ$. KL: ba góc còn lại $\\widehat{yOx'}, \\widehat{x'Oy'}, \\widehat{y'Ox}$ đều bằng $90^\\circ$."
          },
          {
            id: "d2q7", level: "vua", source: "SGK tr.57 – Tranh luận",
            q: "Đổi chỗ giả thiết và kết luận của định lí “Hai góc đối đỉnh thì bằng nhau”, ta được khẳng định nào? Khẳng định đó đúng hay sai?",
            options: ["“Hai góc bằng nhau thì đối đỉnh” – khẳng định đúng", "“Hai góc không đối đỉnh thì không bằng nhau” – khẳng định đúng", "“Hai góc đối đỉnh thì không bằng nhau” – khẳng định sai", "“Hai góc bằng nhau thì đối đỉnh” – khẳng định sai"],
            answer: 3,
            explain: "Đổi chỗ GT (“hai góc đối đỉnh”) và KL (“bằng nhau”) được “Hai góc bằng nhau thì đối đỉnh”. Khẳng định này sai: hai góc $40^\\circ$ vẽ ở hai chỗ khác nhau bằng nhau nhưng không đối đỉnh."
          },
          {
            id: "d2q8", level: "vua", source: "SGK tr.57 – Luyện tập 2",
            q: "Chứng minh định lí “Hai góc kề bù bằng nhau thì mỗi góc là một góc vuông”: cho $\\widehat{xOy}$ và $\\widehat{yOx'}$ kề bù, $\\widehat{xOy} = \\widehat{yOx'}$. Vì $\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$ nên $2\\,\\widehat{xOy} = 180^\\circ$. Suy ra",
            options: ["$\\widehat{xOy} = 90^\\circ$", "$\\widehat{xOy} = 180^\\circ$", "$\\widehat{xOy} = 360^\\circ$", "$\\widehat{xOy} = 45^\\circ$"],
            answer: 0,
            explain: "$2\\,\\widehat{xOy} = 180^\\circ \\Rightarrow \\widehat{xOy} = 90^\\circ$, và $\\widehat{yOx'} = \\widehat{xOy} = 90^\\circ$: mỗi góc là góc vuông."
          },
          {
            id: "d2q9", level: "kho", source: "SGK Bài 11 – BT 3.26",
            q: "Cho góc $xOy$ không phải góc bẹt. Xét hai khẳng định:<br>(1) Nếu $Ot$ là tia phân giác của góc $xOy$ thì $\\widehat{xOt} = \\widehat{tOy}$.<br>(2) Nếu tia $Ot$ thoả mãn $\\widehat{xOt} = \\widehat{tOy}$ thì $Ot$ là tia phân giác của góc $xOy$.<br>Kết luận nào đúng?",
            options: ["(1) sai, (2) đúng", "(1) và (2) cùng sai", "(1) đúng, (2) sai", "(1) và (2) cùng đúng"],
            answer: 2,
            explain: "(1) đúng theo định nghĩa tia phân giác. (2) sai: tia đối $Ot'$ của tia phân giác $Ot$ cũng thoả mãn $\\widehat{xOt'} = \\widehat{t'Oy}$ (cùng bằng $180^\\circ - \\widehat{xOt}$) nhưng không nằm trong góc $xOy$ nên không là tia phân giác."
          },
          {
            id: "d2q10", level: "kho", source: "SGK tr.56 – Chứng minh (H.3.46)",
            q: "Chứng minh “Nếu $a \\parallel b$ thì hai góc đồng vị $\\widehat{A_1}, \\widehat{B_1}$ bằng nhau”: qua $B$ kẻ đường thẳng $b'$ sao cho $\\widehat{B_2} = \\widehat{A_1}$, suy ra $a \\parallel b'$ (hình dưới). Ta khẳng định được $b'$ trùng $b$ dựa vào" + fig346(),
            options: ["tính chất hai góc đối đỉnh", "tính chất hai góc kề bù", "định nghĩa tia phân giác của một góc", "tiên đề Euclid về đường thẳng song song"],
            answer: 3,
            explain: "Qua điểm $B$ nằm ngoài đường thẳng $a$ có hai đường thẳng $b$ và $b'$ cùng song song với $a$. Theo tiên đề Euclid chỉ có một đường thẳng như vậy, nên $b'$ trùng $b$."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SBT Bài 11 – BT 3.27", maxPoints: 1.5,
            q: "Cho định lí: “Một đường thẳng cắt hai đường thẳng song song thì tạo thành một cặp góc so le trong bằng nhau”.<br>a) Chỉ ra giả thiết và kết luận của định lí.<br>b) Dựa vào hình dưới, ghi giả thiết và kết luận bằng kí hiệu." + figPar('sole'),
            modelAnswer: "a) Giả thiết: một đường thẳng cắt hai đường thẳng song song. Kết luận: cặp góc so le trong tạo thành bằng nhau.<br>b) " +
              gtkl("$a \\parallel b$; $c$ cắt $a$ tại $A$, cắt $b$ tại $B$; $\\widehat{A_1}, \\widehat{B_1}$ là hai góc so le trong", "$\\widehat{A_1} = \\widehat{B_1}$"),
            rubric: [
              { pts: 0.5, text: "Câu a: nêu đúng giả thiết và kết luận bằng lời." },
              { pts: 0.5, text: "Câu b: GT kí hiệu đủ: $a \\parallel b$, $c$ cắt $a$ tại $A$, cắt $b$ tại $B$, $\\widehat{A_1}, \\widehat{B_1}$ so le trong." },
              { pts: 0.5, text: "Câu b: KL $\\widehat{A_1} = \\widehat{B_1}$." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SBT Bài 11 – BT 3.30a", maxPoints: 1.5,
            q: "Ghi giả thiết, kết luận bằng kí hiệu và chứng minh định lí: “Hai góc cùng phụ với một góc thứ ba thì bằng nhau” (gọi ba góc là $\\widehat{A}, \\widehat{B}, \\widehat{C}$).",
            modelAnswer: gtkl("$\\widehat{A} + \\widehat{C} = 90^\\circ$; $\\ \\widehat{B} + \\widehat{C} = 90^\\circ$", "$\\widehat{A} = \\widehat{B}$") +
              "<i>Chứng minh.</i> Từ GT: $\\widehat{A} = 90^\\circ - \\widehat{C}$ và $\\widehat{B} = 90^\\circ - \\widehat{C}$.<br>" +
              "Hai góc $\\widehat{A}, \\widehat{B}$ cùng bằng $90^\\circ - \\widehat{C}$ nên $\\widehat{A} = \\widehat{B}$.",
            rubric: [
              { pts: 0.5, text: "GT, KL ghi đúng bằng kí hiệu." },
              { pts: 0.5, text: "Suy ra $\\widehat{A} = 90^\\circ - \\widehat{C}$ và $\\widehat{B} = 90^\\circ - \\widehat{C}$." },
              { pts: 0.5, text: "Kết luận $\\widehat{A} = \\widehat{B}$ có lí do." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.55 – Giả thiết, kết luận",
            q: "Trong định lí phát biểu dưới dạng “Nếu … thì …”, phần sau từ “thì” được gọi là",
            options: ["giả thiết", "chứng minh", "kết luận", "định nghĩa"],
            answer: 2,
            explain: "Phần sau từ “thì” là kết luận (KL) của định lí."
          },
          {
            id: "d3q2", level: "de", source: "SBT Bài 11 – BT 3.28a",
            q: "Giả thiết của định lí “Nếu hai đường thẳng $a, b$ cắt đường thẳng $c$ và trong các góc tạo thành có một cặp góc đồng vị bằng nhau thì $a \\parallel b$” là",
            options: ["$a \\parallel b$", "$a, b$ cắt $c$ và tạo thành một cặp góc đồng vị bằng nhau", "$a \\perp c$ và $b \\perp c$", "$a$ và $b$ cắt nhau"],
            answer: 1,
            explain: "Phần giữa “nếu” và “thì”: $a, b$ cắt $c$ tạo thành một cặp góc đồng vị bằng nhau. $a \\parallel b$ là kết luận."
          },
          {
            id: "d3q3", level: "de", source: "SGK tr.56 – Luyện tập 1",
            q: "Cách phát biểu nào đúng của định lí “Hai góc đối đỉnh thì bằng nhau” dưới dạng “Nếu … thì …”?",
            options: ["Nếu hai góc bằng nhau thì hai góc đó đối đỉnh", "Nếu hai góc kề nhau thì hai góc đó bằng nhau", "Nếu hai góc bù nhau thì hai góc đó bằng nhau", "Nếu hai góc là hai góc đối đỉnh thì hai góc đó bằng nhau"],
            answer: 3,
            explain: "GT “hai góc đối đỉnh” đặt sau “nếu”, KL “bằng nhau” đặt sau “thì”. Phương án “Nếu hai góc bằng nhau thì đối đỉnh” đã đổi chỗ GT và KL."
          },
          {
            id: "d3q4", level: "de", source: "SBT Bài 11 – Ví dụ 1",
            q: "Định lí “Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc đồng vị bằng nhau” được minh hoạ như hình dưới, với GT: $a \\parallel b$; $c$ cắt $a$ tại $A$, cắt $b$ tại $B$; $\\widehat{A_1}, \\widehat{B_1}$ là hai góc đồng vị. Kết luận của định lí là" + figPar('dongvi'),
            options: ["$\\widehat{A_1} = \\widehat{B_1}$", "$\\widehat{A_1} + \\widehat{B_1} = 180^\\circ$", "$a \\perp c$", "$a \\parallel b$"],
            answer: 0,
            explain: "Kết luận là “hai góc đồng vị bằng nhau”: $\\widehat{A_1} = \\widehat{B_1}$. Còn $a \\parallel b$ nằm trong giả thiết."
          },
          {
            id: "d3q5", level: "vua", source: "SGK tr.55 – Mở đầu",
            q: "Bạn An vẽ 10 cặp góc đối đỉnh, dùng thước đo góc và thấy mỗi cặp đều bằng nhau. Nhận xét nào đúng?",
            options: ["Bạn An đã chứng minh xong định lí “Hai góc đối đỉnh thì bằng nhau”", "Đo thêm thật nhiều hình nữa thì sẽ chứng minh được định lí", "Đo đạc chỉ kiểm nghiệm trong vài trường hợp cụ thể; muốn chắc chắn đúng với mọi trường hợp phải chứng minh", "Hai góc đối đỉnh chỉ bằng nhau trong 10 hình An đã vẽ"],
            answer: 2,
            explain: "Đo đạc cho kết quả gần đúng và chỉ trong các trường hợp đã vẽ. Để khẳng định đúng cho mọi trường hợp phải chứng minh bằng lập luận."
          },
          {
            id: "d3q6", level: "vua", source: "SBT Ôn tập chương III – câu 2",
            q: "Khẳng định nào sau đây đúng?",
            options: ["Hai góc đối đỉnh thì bằng nhau", "Hai góc bằng nhau thì đối đỉnh", "Hai góc không đối đỉnh thì không bằng nhau", "Hai góc bằng nhau thì kề bù"],
            answer: 0,
            explain: "Đây là định lí đã chứng minh. Ba khẳng định còn lại sai: ví dụ $\\widehat{xOt} = \\widehat{tOy}$ ($Ot$ là tia phân giác) bằng nhau mà không đối đỉnh, không kề bù."
          },
          {
            id: "d3q7", level: "vua", source: "SBT Bài 11 – BT 3.29",
            q: "Cho $\\widehat{xOy} = 80^\\circ$, $Ot$ là tia phân giác của góc $xOy$. Các tia $Ox', Oy', Ot'$ lần lượt là tia đối của các tia $Ox, Oy, Ot$ (hình dưới). Số đo góc $x'Ot'$ là" + figBis(),
            options: ["$80^\\circ$", "$40^\\circ$", "$140^\\circ$", "$100^\\circ$"],
            answer: 1,
            explain: "$\\widehat{xOt} = \\frac{80^\\circ}{2} = 40^\\circ$. Góc $x'Ot'$ đối đỉnh với góc $xOt$ (vì $Ox'$, $Ot'$ là tia đối của $Ox$, $Ot$) nên $\\widehat{x'Ot'} = 40^\\circ$."
          },
          {
            id: "d3q8", level: "vua", source: "SGK Bài 11 – BT 3.25",
            q: "Để chứng minh định lí “Nếu $d \\perp d'$ và $d' \\parallel d''$ thì $d \\perp d''$”, điều đúng đã biết được dùng chủ yếu là",
            options: ["tính chất hai góc đối đỉnh", "định nghĩa tia phân giác của một góc", "dấu hiệu nhận biết hai đường thẳng song song", "tính chất của hai đường thẳng song song (hai góc đồng vị bằng nhau)"],
            answer: 3,
            explain: "$d$ cắt $d'$ tạo góc $90^\\circ$; vì $d' \\parallel d''$ nên góc đồng vị tại giao điểm của $d$ với $d''$ cũng bằng $90^\\circ$ (tính chất hai đường thẳng song song). Dấu hiệu nhận biết dùng để chứng minh hai đường thẳng song song, không dùng ở đây."
          },
          {
            id: "d3q9", level: "kho", source: "mới",
            q: "Khẳng định “Hai góc có tổng số đo bằng $180^\\circ$ thì kề bù” là sai. Ví dụ nào sau đây chứng tỏ điều đó?",
            options: ["Hai góc kề bù $\\widehat{xOy} = 120^\\circ$ và $\\widehat{yOx'} = 60^\\circ$", "Hai góc $100^\\circ$ và $100^\\circ$ ở hai vị trí khác nhau", "Một góc $120^\\circ$ có đỉnh $A$ và một góc $60^\\circ$ có đỉnh $B$ khác $A$", "Hai góc $50^\\circ$ và $40^\\circ$ kề nhau"],
            answer: 2,
            explain: "Phản ví dụ phải thoả mãn giả thiết (tổng $= 180^\\circ$) mà sai kết luận (không kề bù): $120^\\circ + 60^\\circ = 180^\\circ$ nhưng hai góc khác đỉnh nên không kề bù. Hai góc $100^\\circ, 100^\\circ$ hay $50^\\circ, 40^\\circ$ không có tổng $180^\\circ$; còn hai góc kề bù thì không phải phản ví dụ."
          },
          {
            id: "d3q10", level: "kho", source: "SBT Bài 11 – BT 3.31",
            q: "Cho góc vuông $uOv$ và tia $Oy$ nằm trong góc đó. Vẽ tia $Ox$ sao cho $Ou$ là tia phân giác của góc $xOy$, vẽ tia $Oz$ sao cho $Ov$ là tia phân giác của góc $yOz$. Tổng $\\widehat{xOy} + \\widehat{yOz}$ bằng",
            options: ["$90^\\circ$", "$135^\\circ$", "$360^\\circ$", "$180^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xOy} = 2\\,\\widehat{uOy}$, $\\widehat{yOz} = 2\\,\\widehat{yOv}$. Vì $Oy$ nằm trong góc vuông $uOv$ nên $\\widehat{uOy} + \\widehat{yOv} = 90^\\circ$. Vậy tổng $= 2 \\cdot 90^\\circ = 180^\\circ$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "kho", source: "SBT Bài 11 – BT 3.29", maxPoints: 2,
            q: "Cho định lí: “Tia đối của tia phân giác của một góc là tia phân giác của góc đối đỉnh với góc đó”. Hãy vẽ hình, ghi giả thiết, kết luận và chứng minh định lí.",
            modelAnswer: figBis() +
              gtkl("$Ot$ là tia phân giác của góc $xOy$; $Ox', Oy', Ot'$ lần lượt là tia đối của $Ox, Oy, Ot$", "$Ot'$ là tia phân giác của góc $x'Oy'$") +
              "<i>Chứng minh.</i> $\\widehat{x'Ot'} = \\widehat{xOt}$ (hai góc đối đỉnh).<br>" +
              "$\\widehat{y'Ot'} = \\widehat{yOt}$ (hai góc đối đỉnh).<br>" +
              "Mà $\\widehat{xOt} = \\widehat{yOt}$ ($Ot$ là tia phân giác của góc $xOy$) nên $\\widehat{x'Ot'} = \\widehat{y'Ot'}$.<br>" +
              "Tia $Ot'$ nằm trong góc $x'Oy'$ (vì $Ot$ nằm trong góc $xOy$, các tia đối tương ứng đổi chiều cùng nhau), do đó $Ot'$ là tia phân giác của góc $x'Oy'$.",
            rubric: [
              { pts: 0.5, text: "Vẽ hình đúng, ghi đúng GT và KL." },
              { pts: 0.5, text: "Chỉ ra $\\widehat{x'Ot'} = \\widehat{xOt}$ (đối đỉnh)." },
              { pts: 0.5, text: "Chỉ ra $\\widehat{y'Ot'} = \\widehat{yOt}$ (đối đỉnh)." },
              { pts: 0.5, text: "Dùng $\\widehat{xOt} = \\widehat{yOt}$ suy ra $\\widehat{x'Ot'} = \\widehat{y'Ot'}$ và kết luận $Ot'$ là tia phân giác của $\\widehat{x'Oy'}$." }
            ]
          },
          {
            id: "d3e2", level: "vua", source: "SGK tr.57 – Luyện tập 2", maxPoints: 1,
            q: "Chứng minh định lí: “Hai góc kề bù bằng nhau thì mỗi góc là một góc vuông”.",
            modelAnswer: "Gọi hai góc kề bù bằng nhau là $\\widehat{xOy}$ và $\\widehat{yOx'}$ (GT: kề bù, $\\widehat{xOy} = \\widehat{yOx'}$; KL: $\\widehat{xOy} = \\widehat{yOx'} = 90^\\circ$).<br>" +
              "Vì hai góc kề bù nên $\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$. Thay $\\widehat{yOx'} = \\widehat{xOy}$ được $2\\,\\widehat{xOy} = 180^\\circ$, suy ra $\\widehat{xOy} = 90^\\circ$.<br>" +
              "Do đó $\\widehat{yOx'} = \\widehat{xOy} = 90^\\circ$: mỗi góc là một góc vuông.",
            rubric: [
              { pts: 0.5, text: "Dùng tính chất kề bù và GT để được $2\\,\\widehat{xOy} = 180^\\circ$." },
              { pts: 0.5, text: "Suy ra mỗi góc bằng $90^\\circ$ và kết luận." }
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
            q: "Giả thiết (GT) và kết luận (KL) của định lí “Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì chúng song song với nhau”, viết bằng kí hiệu, là",
            options: ["GT: $a \\parallel b$; KL: $a \\parallel c$, $b \\parallel c$", "GT: $a, b$ phân biệt, $a \\parallel c$, $b \\parallel c$; KL: $a \\parallel b$", "GT: $a \\parallel c$; KL: $b \\parallel c$", "GT: $a, b$ phân biệt, $a \\perp c$, $b \\perp c$; KL: $a \\parallel b$"],
            answer: 1,
            explain: "Điều đã cho: $a, b$ phân biệt, $a \\parallel c$, $b \\parallel c$. Điều suy ra: $a \\parallel b$. Phương án cuối là định lí khác (cùng vuông góc)."
          },
          {
            id: "d4q2", level: "vua", source: "SGK Bài 11 – BT 3.24",
            q: "Từ định lí “Nếu $a \\parallel b$ và $c \\perp a$ thì $c \\perp b$”, đổi chỗ “$a \\parallel b$” với “$c \\perp b$” ta được khẳng định “Nếu $c \\perp a$ và $c \\perp b$ thì $a \\parallel b$” (với $a, b$ là hai đường thẳng phân biệt). Khẳng định này",
            options: ["sai, vì khi đó $a$ và $b$ luôn cắt nhau", "không xác định được đúng hay sai", "sai, vì khi đó $c \\parallel a$", "đúng; đó là định lí về hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba"],
            answer: 3,
            explain: "$c$ cắt $a, b$ tạo thành các góc so le trong (hoặc đồng vị) cùng bằng $90^\\circ$, theo dấu hiệu nhận biết thì $a \\parallel b$. Đây là định lí đã học."
          },
          {
            id: "d4q3", level: "vua", source: "SGK tr.57 – Tranh luận",
            q: "Khẳng định nào sau đây là một định lí?",
            options: ["Hai góc bằng nhau thì đối đỉnh", "Hai góc có tổng số đo bằng $180^\\circ$ thì kề bù", "Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì song song với nhau", "Hai góc kề nhau thì bù nhau"],
            answer: 2,
            explain: "Đây là hệ quả của tiên đề Euclid. Ba khẳng định còn lại đều có phản ví dụ (hai góc bằng nhau nhưng không đối đỉnh; hai góc khác đỉnh có tổng $180^\\circ$; hai góc kề nhau $30^\\circ$ và $40^\\circ$)."
          },
          {
            id: "d4q4", level: "kho", source: "SBT Ôn tập chương III – câu 4",
            q: "Hai đường thẳng cắt nhau tạo thành bốn góc (khác góc bẹt). Số đo bốn góc đó có thể là",
            options: ["$90^\\circ, 90^\\circ, 90^\\circ, 90^\\circ$", "$70^\\circ, 70^\\circ, 70^\\circ, 110^\\circ$", "$60^\\circ, 120^\\circ, 120^\\circ, 120^\\circ$", "$80^\\circ, 50^\\circ, 130^\\circ, 100^\\circ$"],
            answer: 0,
            explain: "Bốn góc gồm hai cặp đối đỉnh (bằng nhau) và hai góc kề nhau thì kề bù, nên có dạng $\\alpha, 180^\\circ - \\alpha, \\alpha, 180^\\circ - \\alpha$. Chỉ bộ $90^\\circ$ (bốn lần) thoả mãn: $70, 70, 70, 110$ có hai góc kề nhau $70 + 70 \\ne 180$; $60, 120, 120, 120$ tương tự; $80, 50, 130, 100$ không có cặp nào bằng nhau."
          },
          {
            id: "d4q5", level: "kho", source: "SGK tr.56 – Chứng minh (H.3.46)",
            q: "Cho $a \\parallel b$, $c$ cắt $a$ tại $A$, cắt $b$ tại $B$. Để chứng minh $\\widehat{A_1} = \\widehat{B_1}$ (hình dưới), các bước sau bị xáo trộn:<br>(1) Theo dấu hiệu nhận biết, $a \\parallel b'$.<br>(2) Qua $B$ kẻ đường thẳng $b'$ sao cho $\\widehat{B_2} = \\widehat{A_1}$.<br>(3) Qua $B$ có hai đường thẳng $b, b'$ cùng song song với $a$ nên theo tiên đề Euclid, $b'$ trùng $b$.<br>(4) Suy ra $\\widehat{B_1} = \\widehat{B_2} = \\widehat{A_1}$.<br>Thứ tự đúng là" + fig346(),
            options: ["(1), (2), (3), (4)", "(2), (1), (3), (4)", "(2), (3), (1), (4)", "(3), (2), (1), (4)"],
            answer: 1,
            explain: "Phải kẻ $b'$ trước (2), rồi mới suy ra $a \\parallel b'$ (1), rồi dùng tiên đề Euclid để có $b'$ trùng $b$ (3), cuối cùng kết luận (4)."
          },
          {
            id: "d4q6", level: "kho", source: "mới",
            q: "Cho hai góc kề bù $xOy$ và $yOz$. Tia $Om$ là tia phân giác của góc $xOy$, tia $On$ là tia phân giác của góc $yOz$. Số đo góc $mOn$ là",
            options: ["$45^\\circ$", "$60^\\circ$", "$90^\\circ$", "$180^\\circ$"],
            answer: 2,
            explain: "$\\widehat{mOn} = \\widehat{mOy} + \\widehat{yOn} = \\frac{1}{2}\\widehat{xOy} + \\frac{1}{2}\\widehat{yOz} = \\frac{1}{2} \\cdot 180^\\circ = 90^\\circ$. (Hai tia phân giác của hai góc kề bù thì vuông góc với nhau.)"
          },
          {
            id: "d4q7", level: "kho", source: "SGK Bài 11 – BT 3.26",
            q: "Cho $\\widehat{xOy} = 100^\\circ$, $Ot$ là tia phân giác của góc $xOy$, $Ot'$ là tia đối của tia $Ot$. Số đo góc $xOt'$ là",
            options: ["$50^\\circ$", "$80^\\circ$", "$100^\\circ$", "$130^\\circ$"],
            answer: 3,
            explain: "$\\widehat{xOt} = 50^\\circ$. Hai góc $xOt$ và $xOt'$ kề bù (vì $Ot, Ot'$ là hai tia đối nhau) nên $\\widehat{xOt'} = 180^\\circ - 50^\\circ = 130^\\circ$. Tương tự $\\widehat{t'Oy} = 130^\\circ$."
          },
          {
            id: "d4q8", level: "kho", source: "mới",
            q: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$ sao cho $\\widehat{xOy} = 3\\,\\widehat{yOx'}$. Số đo góc $x'Oy'$ là",
            options: ["$135^\\circ$", "$45^\\circ$", "$90^\\circ$", "$60^\\circ$"],
            answer: 0,
            explain: "$\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$ (kề bù) nên $4\\,\\widehat{yOx'} = 180^\\circ$, $\\widehat{yOx'} = 45^\\circ$, $\\widehat{xOy} = 135^\\circ$. Góc $x'Oy'$ đối đỉnh với góc $xOy$ nên bằng $135^\\circ$."
          },
          {
            id: "d4q9", level: "kho", source: "SGK Bài 11 – BT 3.24",
            q: "Khẳng định “Nếu $a \\perp c$ và $b \\perp c$ thì $a \\parallel b$” chưa phải là một định lí. Cần thêm điều kiện nào vào giả thiết để được một định lí?",
            options: ["$a$ và $c$ phân biệt", "$a$ và $b$ phân biệt", "$a \\parallel c$", "$b$ cắt $a$"],
            answer: 1,
            explain: "Nếu $a$ trùng $b$ thì vẫn có $a \\perp c$, $b \\perp c$ nhưng không nói $a \\parallel b$ được. Thêm “$a, b$ phân biệt” thì được định lí."
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Từ định lí “Hai góc đối đỉnh thì bằng nhau”, khẳng định nào sau đây <b>chắc chắn đúng</b>?",
            options: ["Nếu hai góc bằng nhau thì chúng đối đỉnh", "Nếu hai góc không đối đỉnh thì chúng không bằng nhau", "Nếu hai góc không bằng nhau thì chúng không đối đỉnh", "Hai góc bằng nhau luôn có chung đỉnh"],
            answer: 2,
            explain: "Nếu hai góc không bằng nhau mà lại đối đỉnh thì trái với định lí (đối đỉnh phải bằng nhau). Vậy chúng không đối đỉnh. Ba khẳng định còn lại đều có phản ví dụ."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "SBT Bài 11 – BT 3.31", maxPoints: 1.5,
            q: "Cho góc vuông $uOv$ và tia $Oy$ đi qua một điểm trong của góc đó. Vẽ tia $Ox$ sao cho $Ou$ là tia phân giác của góc $xOy$. Vẽ tia $Oz$ sao cho $Ov$ là tia phân giác của góc $yOz$. Chứng minh rằng hai góc $xOy$ và $yOz$ là hai góc kề bù.",
            modelAnswer: "Vì $Ou$ là tia phân giác của góc $xOy$ nên $\\widehat{xOy} = 2\\,\\widehat{uOy}$; vì $Ov$ là tia phân giác của góc $yOz$ nên $\\widehat{yOz} = 2\\,\\widehat{yOv}$.<br>" +
              "Tia $Oy$ nằm trong góc vuông $uOv$ nên $\\widehat{uOy} + \\widehat{yOv} = \\widehat{uOv} = 90^\\circ$.<br>" +
              "Do đó $\\widehat{xOy} + \\widehat{yOz} = 2(\\widehat{uOy} + \\widehat{yOv}) = 2 \\cdot 90^\\circ = 180^\\circ$.<br>" +
              "Hai góc $xOy$ và $yOz$ có chung cạnh $Oy$, nằm về hai phía của $Oy$ ($Ox$ ở phía $Ou$, $Oz$ ở phía $Ov$) và có tổng $180^\\circ$, nên $Ox, Oz$ là hai tia đối nhau: hai góc $xOy$, $yOz$ kề bù.",
            rubric: [
              { pts: 0.5, text: "Viết đúng $\\widehat{xOy} = 2\\,\\widehat{uOy}$ và $\\widehat{yOz} = 2\\,\\widehat{yOv}$ (theo tia phân giác)." },
              { pts: 0.5, text: "Dùng $\\widehat{uOy} + \\widehat{yOv} = 90^\\circ$ suy ra $\\widehat{xOy} + \\widehat{yOz} = 180^\\circ$." },
              { pts: 0.5, text: "Nêu hai góc có chung cạnh $Oy$, nằm về hai phía và kết luận kề bù." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "SBT Bài 11 – BT 3.32", maxPoints: 1.5,
            q: "Ghi giả thiết, kết luận bằng kí hiệu và chứng minh định lí: “Nếu một đường thẳng cắt một trong hai đường thẳng song song thì nó cũng cắt đường thẳng kia”.",
            modelAnswer: gtkl("$a \\parallel b$; đường thẳng $c$ cắt $a$ tại $A$", "$c$ cắt $b$") +
              "<i>Chứng minh.</i> Giả sử $c$ không cắt $b$. Vì $A \\in a$ và $a \\parallel b$ nên $A \\notin b$, do đó $c$ khác $b$; hai đường thẳng $c, b$ không có điểm chung nên $c \\parallel b$.<br>" +
              "Khi đó qua điểm $A$ nằm ngoài $b$ có hai đường thẳng $a$ và $c$ (khác nhau vì $c$ cắt $a$) cùng song song với $b$, trái với tiên đề Euclid.<br>" +
              "Vậy điều giả sử là sai, tức là $c$ cắt $b$.",
            rubric: [
              { pts: 0.5, text: "Ghi đúng GT, KL." },
              { pts: 0.5, text: "Giả sử $c$ không cắt $b$ thì $c \\parallel b$." },
              { pts: 0.5, text: "Chỉ ra mâu thuẫn với tiên đề Euclid (qua $A$ có hai đường thẳng $a, c$ cùng song song với $b$) và kết luận." }
            ]
          }
        ]
      }
    ]
  });
})();
