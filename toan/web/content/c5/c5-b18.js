(function () {
  // Màu các hình quạt: đủ tương phản trên cả nền sáng và nền tối.
  var COLORS = ["#4c9aff", "#f2994a", "#3dbe8b", "#a97bf0", "#f2c94c", "#eb5757"];
  var fmt = function (p) { return String(p).replace(".", ","); };

  // Biểu đồ hình quạt tròn bằng SVG.
  // o = { title: "…", data: [[tên, phần trăm, nhãn tuỳ chọn (vd "?")], …] }
  function pie(o) {
    var W = 360, R = 64, cx = 112, top = o.title ? 30 : 12, cy = top + R + 20;
    var rows = o.data.length;
    var H = Math.max(cy + R + 24, top + rows * 22 + 24);
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:6px auto" role="img" aria-label="' + (o.title || "Biểu đồ hình quạt tròn") + '">';
    if (o.title) s += '<text x="' + (W / 2) + '" y="18" font-size="13" font-weight="bold" text-anchor="middle" fill="currentColor">' + o.title + '</text>';
    var a = -Math.PI / 2;
    var px = function (ang, r) { return (cx + r * Math.cos(ang)).toFixed(1); };
    var py = function (ang, r) { return (cy + r * Math.sin(ang)).toFixed(1); };
    o.data.forEach(function (d, i) {
      var p = d[1], a2 = a + p / 100 * 2 * Math.PI, col = COLORS[i % COLORS.length];
      if (p >= 99.999) s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="' + col + '"/>';
      else s += '<path d="M' + cx + ' ' + cy + ' L' + px(a, R) + ' ' + py(a, R) + ' A' + R + ' ' + R + ' 0 ' + (p > 50 ? 1 : 0) + ' 1 ' + px(a2, R) + ' ' + py(a2, R) + ' Z" fill="' + col + '" stroke="#ffffff" stroke-width="1.2"/>';
      var m = (a + a2) / 2, c = Math.cos(m);
      var anchor = c > 0.3 ? "start" : (c < -0.3 ? "end" : "middle");
      var lab = d[2] != null ? d[2] : fmt(p) + "%";
      s += '<text x="' + px(m, R + 10) + '" y="' + (+py(m, R + 12) + 4).toFixed(1) + '" font-size="12" text-anchor="' + anchor + '" fill="currentColor">' + lab + '</text>';
      a = a2;
    });
    var ly = cy - rows * 11 + 4;
    o.data.forEach(function (d, i) {
      var y = ly + i * 22;
      s += '<rect x="222" y="' + (y - 10) + '" width="12" height="12" rx="2" fill="' + COLORS[i % COLORS.length] + '"/>';
      s += '<text x="240" y="' + y + '" font-size="12" fill="currentColor">' + d[0] + '</text>';
    });
    return s + '</svg>';
  }

  // Hình tròn đã chia sẵn n hình quạt bằng nhau (để học sinh tô), kèm chú giải ô trống.
  function blank(n, names, title) {
    var W = 360, R = 64, cx = 112, top = title ? 30 : 12, cy = top + R + 14;
    var H = Math.max(cy + R + 16, top + names.length * 22 + 24);
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:6px auto" role="img" aria-label="Hình tròn chia sẵn">';
    if (title) s += '<text x="' + (W / 2) + '" y="18" font-size="13" font-weight="bold" text-anchor="middle" fill="currentColor">' + title + '</text>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="currentColor" stroke-width="1.5"/>';
    for (var k = 0; k < n; k++) {
      var ang = -Math.PI / 2 + k * 2 * Math.PI / n;
      s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + R * Math.cos(ang)).toFixed(1) + '" y2="' + (cy + R * Math.sin(ang)).toFixed(1) + '" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3"/>';
    }
    var ly = cy - names.length * 11 + 4;
    names.forEach(function (nm, i) {
      var y = ly + i * 22;
      s += '<rect x="222" y="' + (y - 10) + '" width="12" height="12" fill="none" stroke="currentColor"/>';
      s += '<text x="240" y="' + y + '" font-size="12" fill="currentColor">' + nm + '</text>';
    });
    return s + '</svg>';
  }

  // Bảng thống kê 2 dòng: tbl(["Loại", "A", "B"], ["Tỉ lệ", "40%", "60%"])
  function tbl(r1, r2) {
    var row = function (r) { return '<tr>' + r.map(function (c, i) { return (i ? '<td>' : '<th>') + c + (i ? '</td>' : '</th>'); }).join('') + '</tr>'; };
    return '<table>' + row(r1) + row(r2) + '</table>';
  }

  // ----- Các biểu đồ dùng lại trong nhiều câu -----
  var P1 = pie({ title: "Môn học yêu thích của lớp 7A", data: [["Toán", 35], ["Ngữ văn", 20], ["Tiếng Anh", 25], ["Môn khác", 20]] });
  var P2 = pie({ title: "Cách học sinh khối 7 đến trường", data: [["Đi bộ", 15], ["Xe đạp", 45], ["Xe buýt", 10], ["Được đưa đón", 30]] });
  var P5 = pie({ title: "Loại trái cây yêu thích", data: [["Xoài", 30], ["Dưa hấu", 25], ["Cam", 10], ["Nho", 35]] });

  registerLesson({
    id: "c5-b18",
    chapter: 5,
    kind: "lesson",
    title: "Bài 18. Biểu đồ hình quạt tròn",
    sgkPages: [93, 99],
    sbtPages: [78, 84],
    objectives: [
      "Đọc và mô tả dữ liệu từ biểu đồ hình quạt tròn",
      "Biểu diễn dữ liệu vào biểu đồ hình quạt tròn cho sẵn",
      "Phân tích biểu đồ hình quạt tròn: so sánh, tính tổng các phần, ước lượng số lượng"
    ],

    theory: [
      {
        heading: "1. Biểu đồ hình quạt tròn là gì?",
        html: "<b>Biểu đồ hình quạt tròn</b> dùng để <b>so sánh các phần trong toàn bộ dữ liệu</b>." +
          "<ul><li>Hình tròn biểu diễn dữ liệu được chia thành nhiều <b>hình quạt</b> (tô màu khác nhau). Mỗi hình quạt biểu diễn <b>tỉ lệ</b> của một phần so với toàn bộ dữ liệu.</li>" +
          "<li><b>Cả hình tròn</b> biểu diễn toàn bộ dữ liệu, tức là ứng với <b>100%</b>.</li>" +
          "<li>Các thành phần của biểu đồ: <b>tiêu đề</b>, <b>hình tròn biểu diễn dữ liệu</b>, <b>chú giải</b> (cho biết mỗi màu ứng với phần nào).</li></ul>" +
          pie({ title: "Các loại sách trong tủ sách lớp", data: [["Truyện", 40], ["Tham khảo", 25], ["Khoa học", 20], ["Sách khác", 15]] }) +
          "Ví dụ: trong biểu đồ trên, hình tròn được chia thành 4 hình quạt; truyện chiếm nhiều nhất (40%), sách khác ít nhất (15%)."
      },
      {
        heading: "2. Đọc và mô tả biểu đồ hình quạt tròn",
        html: "<ul><li>Hình quạt <b>lớn hơn</b> biểu diễn tỉ lệ <b>lớn hơn</b>; hai hình quạt <b>giống nhau</b> biểu diễn <b>cùng một tỉ lệ</b>.</li>" +
          "<li>Hình quạt bằng <b>nửa</b> hình tròn ứng với <b>50%</b>; bằng $\\frac{1}{4}$ hình tròn ứng với <b>25%</b>.</li>" +
          "<li>Từ biểu đồ có thể lập lại <b>bảng thống kê</b> tỉ lệ: mỗi cột của bảng là một phần (đọc tên ở chú giải) và tỉ lệ ghi trên hình quạt tương ứng.</li>" +
          "<li>Tổng tất cả các tỉ lệ trong biểu đồ luôn bằng <b>100%</b> → nếu thiếu một tỉ lệ, lấy 100% trừ đi tổng các tỉ lệ còn lại.</li></ul>"
      },
      {
        heading: "3. Biểu diễn dữ liệu vào biểu đồ hình quạt tròn",
        html: "<ul><li>Nếu bảng cho <b>số lượng</b>, trước hết tính <b>tỉ lệ</b> của mỗi phần: tỉ lệ = (số lượng của phần đó) : (tổng số lượng) $\\cdot\\ 100\\%$.</li>" +
          "<li>Hình tròn thường được <b>chia sẵn</b> thành các hình quạt bằng nhau (mỗi phần 10% hoặc 5%). Phần chiếm $a\\%$ thì tô $a : 10$ (hoặc $a : 5$) hình quạt nhỏ cùng một màu, rồi ghi tỉ lệ và điền chú giải.</li></ul>" +
          "Ví dụ: hình tròn chia thành 20 phần, mỗi phần 5%. Phần chiếm 35% thì tô $35 : 5 = 7$ phần." +
          blank(20, ["Phần A", "Phần B", "Phần C"], "Hình tròn chia sẵn 20 phần (mỗi phần 5%)")
      },
      {
        heading: "4. Phân tích dữ liệu trong biểu đồ hình quạt tròn",
        html: "<ul><li>So sánh: tìm phần lớn nhất / nhỏ nhất, phần này gấp mấy lần phần kia, hơn kém bao nhiêu phần trăm.</li>" +
          "<li>Tổng tỉ lệ của một nhóm = cộng các tỉ lệ thành phần (ví dụ \"đọc sách <b>hoặc</b> nghe nhạc\").</li>" +
          "<li><b>Tính số lượng</b> từ tỉ lệ: số lượng = tổng $\\cdot\\ a\\%$ = tổng $\\cdot \\frac{a}{100}$.</li>" +
          "<li>Khi dùng tỉ lệ của mẫu khảo sát để nói về một nhóm khác (một trường, một xã…), kết quả chỉ là <b>ước lượng / dự đoán</b> (\"khoảng\"), không phải con số chắc chắn.</li></ul>"
      }
    ],

    skills: [
      "<b>Đọc biểu đồ:</b> nhìn chú giải để biết mỗi màu là phần nào, rồi đọc tỉ lệ ghi trên hình quạt cùng màu.",
      "<b>Tìm tỉ lệ còn thiếu:</b> lấy $100\\%$ trừ tổng các tỉ lệ đã biết.",
      "<b>Từ số lượng sang tỉ lệ:</b> tính tổng trước, rồi chia từng số lượng cho tổng và nhân $100\\%$. Kiểm tra lại: tổng các tỉ lệ phải bằng $100\\%$.",
      "<b>Từ tỉ lệ sang số lượng:</b> nhân tổng với tỉ lệ, ví dụ $600 \\cdot 45\\% = 600 \\cdot \\frac{45}{100} = 270$.",
      "<b>Biết số lượng của một phần và tỉ lệ của nó → tìm tổng:</b> tổng = số lượng $: \\frac{a}{100}$. Ví dụ 27 bạn ứng với 15% thì tổng là $27 : 0{,}15 = 180$ bạn.",
      "<b>Lỗi hay gặp:</b> quên rằng cả hình tròn là 100%; cộng nhầm tỉ lệ của các phần không được hỏi; nói số lượng ước lượng là \"chắc chắn\"; so sánh tỉ lệ giữa hai nhóm có tổng khác nhau rồi kết luận về số lượng."
    ],

    examples: [
      {
        q: "Cho biểu đồ sau." + pie({ title: "Cách các bạn lớp 7C đến trường", data: [["Đi bộ", 25], ["Xe đạp", 40], ["Xe buýt", 15], ["Bố mẹ đưa", 20]] }) +
          "a) Lập bảng thống kê tỉ lệ các cách đến trường.<br>b) Cách nào được nhiều bạn chọn nhất? Ít nhất?",
        solution: "a) Bảng thống kê:" + tbl(["Cách đến trường", "Đi bộ", "Xe đạp", "Xe buýt", "Bố mẹ đưa"], ["Tỉ lệ", "25%", "40%", "15%", "20%"]) +
          "b) Đi xe đạp nhiều nhất (40%); đi xe buýt ít nhất (15%)."
      },
      {
        q: "Tủ sách của lớp 7D có: 18 cuốn truyện, 12 cuốn sách khoa học, 6 cuốn sách lịch sử, 4 cuốn sách khác. Tính tỉ lệ mỗi loại và biểu diễn bằng biểu đồ hình quạt tròn.",
        solution: "Tổng số sách: $18 + 12 + 6 + 4 = 40$ (cuốn).<br>" +
          "Tỉ lệ: truyện $\\frac{18}{40} = 45\\%$; khoa học $\\frac{12}{40} = 30\\%$; lịch sử $\\frac{6}{40} = 15\\%$; sách khác $\\frac{4}{40} = 10\\%$. Kiểm tra: $45 + 30 + 15 + 10 = 100$.<br>" +
          "Biểu đồ:" + pie({ title: "Tủ sách lớp 7D", data: [["Truyện", 45], ["Khoa học", 30], ["Lịch sử", 15], ["Sách khác", 10]] })
      },
      {
        q: "Biểu đồ sau cho biết môn thể thao yêu thích của học sinh khối 7 một trường." +
          pie({ title: "Môn thể thao yêu thích", data: [["Bóng đá", 35], ["Cầu lông", 25], ["Bơi lội", 15], ["Bóng rổ", 10], ["Môn khác", 15]] }) +
          "Khối 7 của trường có 360 học sinh. Hãy ước lượng:<br>a) Số học sinh thích cầu lông.<br>b) Số học sinh thích bóng đá hoặc bơi lội.",
        solution: "a) Khoảng $360 \\cdot 25\\% = 360 \\cdot \\frac{25}{100} = 90$ (học sinh).<br>" +
          "b) Tỉ lệ thích bóng đá hoặc bơi lội: $35\\% + 15\\% = 50\\%$. Số học sinh khoảng $360 \\cdot 50\\% = 180$ (học sinh).<br>" +
          "Lưu ý: đây là các con số <b>ước lượng</b> dựa trên tỉ lệ, không phải con số chính xác."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK tr.93 – Kiến thức",
            q: "Trong biểu đồ hình quạt tròn, cả hình tròn biểu diễn",
            options: ["50% dữ liệu", "phần dữ liệu lớn nhất", "toàn bộ dữ liệu, tức là ứng với 100%", "360% dữ liệu"],
            answer: 2,
            explain: "Cả hình tròn biểu diễn toàn bộ dữ liệu, ứng với 100%. Mỗi hình quạt chỉ biểu diễn tỉ lệ của một phần."
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.94 – Luyện tập 1",
            q: "Cho biểu đồ:" + P1 + "Môn học nào được các bạn lớp 7A yêu thích nhất?",
            options: ["Toán", "Tiếng Anh", "Ngữ văn", "Môn khác"],
            answer: 0,
            explain: "Hình quạt lớn nhất là Toán với 35% (Tiếng Anh 25%, Ngữ văn 20%, Môn khác 20%)."
          },
          {
            id: "d1q3", level: "de", source: "SGK tr.94 – HĐ1",
            q: "Cho biểu đồ:" + P1 + "Hai phần nào có cùng tỉ lệ?",
            options: ["Toán và Tiếng Anh", "Toán và Ngữ văn", "Tiếng Anh và Môn khác", "Ngữ văn và Môn khác"],
            answer: 3,
            explain: "Ngữ văn và Môn khác đều chiếm 20% (hai hình quạt giống nhau)."
          },
          {
            id: "d1q4", level: "de", source: "SGK tr.94 – Nhận xét",
            q: "Hình quạt ứng với một nửa hình tròn biểu diễn tỉ lệ",
            options: ["25%", "50%", "100%", "180%"],
            answer: 1,
            explain: "Cả hình tròn ứng với 100%, nên nửa hình tròn ứng với $100\\% : 2 = 50\\%$."
          },
          {
            id: "d1q5", level: "vua", source: "SGK tr.96 – Ví dụ 2",
            q: "Một cửa hàng bán được:" + tbl(["Loại quả", "Táo", "Cam", "Chuối"], ["Khối lượng (kg)", "24", "16", "40"]) +
              "Khi biểu diễn bằng biểu đồ hình quạt tròn, hình quạt biểu diễn Cam chiếm tỉ lệ",
            options: ["16%", "25%", "20%", "30%"],
            answer: 2,
            explain: "Tổng: $24 + 16 + 40 = 80$ (kg). Tỉ lệ cam: $\\frac{16}{80} = 0{,}2 = 20\\%$."
          },
          {
            id: "d1q6", level: "vua", source: "SGK Bài 18 – BT 5.7",
            q: "Biểu đồ sau bị mờ mất một tỉ lệ:" +
              pie({ title: "Kết quả bình chọn lớp trưởng", data: [["Bạn An", 30], ["Bạn Bình", 45], ["Bạn Chi", 25, "?"]] }) +
              "Tỉ lệ bình chọn cho bạn Chi là",
            options: ["35%", "25%", "15%", "75%"],
            answer: 1,
            explain: "Tổng các tỉ lệ bằng 100%: $100\\% - 30\\% - 45\\% = 25\\%$."
          },
          {
            id: "d1q7", level: "vua", source: "SGK tr.98 – Ví dụ 4",
            q: "Cho biểu đồ:" + P1 + "Lớp 7A có 40 học sinh. Số học sinh thích môn Toán là",
            options: ["14", "35", "20", "10"],
            answer: 0,
            explain: "$40 \\cdot 35\\% = 40 \\cdot \\frac{35}{100} = 14$ (học sinh)."
          },
          {
            id: "d1q8", level: "vua", source: "SGK tr.97 – Ví dụ 3",
            q: "Cho biểu đồ:" + P1 + "Tổng tỉ lệ học sinh thích Toán hoặc Tiếng Anh là",
            options: ["55%", "45%", "40%", "60%"],
            answer: 3,
            explain: "$35\\% + 25\\% = 60\\%$."
          },
          {
            id: "d1q9", level: "kho", source: "SGK Bài 18 – BT 5.8",
            q: "Một đội hiến máu có 200 tình nguyện viên, tỉ lệ theo nhóm máu như biểu đồ:" +
              pie({ title: "Tỉ lệ thành viên theo nhóm máu", data: [["Nhóm A", 25], ["Nhóm B", 30], ["Nhóm AB", 5], ["Nhóm O", 40]] }) +
              "Số người nhóm máu O nhiều hơn số người nhóm máu A là",
            options: ["15 người", "80 người", "30 người", "50 người"],
            answer: 2,
            explain: "Nhóm O: $200 \\cdot 40\\% = 80$ người; nhóm A: $200 \\cdot 25\\% = 50$ người. Hơn nhau $80 - 50 = 30$ người (hoặc $200 \\cdot 15\\% = 30$)."
          },
          {
            id: "d1q10", level: "kho", source: "SBT Bài 18 – Ví dụ 2",
            q: "Số đồ dùng học tập bán được trong một ngày:" + tbl(["Loại", "Bút bi", "Bút chì", "Thước", "Tẩy"], ["Số lượng", "45", "30", "30", "15"]) +
              "Trong biểu đồ hình quạt tròn biểu diễn bảng trên, hình quạt biểu diễn Thước chiếm bao nhiêu phần hình tròn?",
            options: ["$\\frac{1}{3}$", "$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{3}{8}$"],
            answer: 1,
            explain: "Tổng: $45 + 30 + 30 + 15 = 120$. Thước: $\\frac{30}{120} = \\frac{1}{4}$ (tức 25%) hình tròn. ($\\frac{3}{8}$ là phần của bút bi.)"
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK Bài 18 – BT 5.7 (biến đổi)", maxPoints: 3,
            q: "Học sinh khối 7 đăng kí câu lạc bộ như sau:" +
              tbl(["Câu lạc bộ", "Bóng đá", "Cờ vua", "Âm nhạc", "Mĩ thuật"], ["Số học sinh", "80", "40", "60", "20"]) +
              "a) Tính tỉ lệ học sinh đăng kí mỗi câu lạc bộ.<br>" +
              "b) Để biểu diễn vào hình tròn dưới đây (đã chia sẵn 10 phần, mỗi phần 10%), mỗi câu lạc bộ cần tô bao nhiêu phần?" +
              blank(10, ["Bóng đá", "Cờ vua", "Âm nhạc", "Mĩ thuật"], "Câu lạc bộ học sinh khối 7") +
              "c) Câu lạc bộ nào đông nhất? Tỉ lệ đăng kí Bóng đá hơn Mĩ thuật bao nhiêu phần trăm?",
            modelAnswer: "a) Tổng: $80 + 40 + 60 + 20 = 200$ (học sinh).<br>" +
              "Bóng đá $\\frac{80}{200} = 40\\%$; Cờ vua $\\frac{40}{200} = 20\\%$; Âm nhạc $\\frac{60}{200} = 30\\%$; Mĩ thuật $\\frac{20}{200} = 10\\%$.<br>" +
              "b) Mỗi phần là 10% nên tô: Bóng đá 4 phần, Cờ vua 2 phần, Âm nhạc 3 phần, Mĩ thuật 1 phần (tổng 10 phần), mỗi câu lạc bộ một màu, ghi tỉ lệ và chú giải." +
              pie({ data: [["Bóng đá", 40], ["Cờ vua", 20], ["Âm nhạc", 30], ["Mĩ thuật", 10]] }) +
              "c) Bóng đá đông nhất (40%). Bóng đá hơn Mĩ thuật $40\\% - 10\\% = 30\\%$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng tổng 200 học sinh." },
              { pts: 1, text: "Tính đúng 4 tỉ lệ 40%, 20%, 30%, 10%." },
              { pts: 1, text: "Nêu đúng số phần cần tô 4; 2; 3; 1 (hoặc vẽ đúng biểu đồ)." },
              { pts: 0.5, text: "Kết luận Bóng đá đông nhất và hơn Mĩ thuật 30%." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SGK tr.93 – Kiến thức",
            q: "Biểu đồ hình quạt tròn thường được dùng để",
            options: ["biểu diễn sự thay đổi của một đại lượng theo thời gian", "so sánh các phần trong toàn bộ dữ liệu", "biểu diễn các điểm trên trục số", "liệt kê dữ liệu theo thứ tự tăng dần"],
            answer: 1,
            explain: "Biểu đồ hình quạt tròn dùng để so sánh các phần trong toàn bộ dữ liệu (mỗi hình quạt là tỉ lệ của một phần)."
          },
          {
            id: "d2q2", level: "de", source: "SGK Bài 18 – BT 5.6",
            q: "Cho biểu đồ:" + P2 + "Cách đến trường nào được ít học sinh chọn nhất?",
            options: ["Đi bộ", "Được đưa đón", "Xe đạp", "Xe buýt"],
            answer: 3,
            explain: "Hình quạt nhỏ nhất là Xe buýt (10%)."
          },
          {
            id: "d2q3", level: "de", source: "SGK tr.94 – Câu hỏi",
            q: "Cho biểu đồ:" + P2 + "Tỉ lệ học sinh đi xe đạp đến trường là",
            options: ["45%", "30%", "15%", "55%"],
            answer: 0,
            explain: "Hình quạt màu của \"Xe đạp\" (xem chú giải) ghi 45%."
          },
          {
            id: "d2q4", level: "de", source: "SGK tr.94 – Nhận xét",
            q: "Hình quạt ứng với $\\frac{1}{4}$ hình tròn biểu diễn tỉ lệ",
            options: ["4%", "40%", "25%", "75%"],
            answer: 2,
            explain: "$\\frac{1}{4}$ của 100% là 25%."
          },
          {
            id: "d2q5", level: "vua", source: "SGK Bài 18 – BT 5.7",
            q: "Biểu đồ sau bị che mất một tỉ lệ:" +
              pie({ title: "Học sinh dự thi theo lớp", data: [["Lớp 7A", 35], ["Lớp 7B", 20], ["Lớp 7C", 30, "?"], ["Lớp 7D", 15]] }) +
              "Tỉ lệ của lớp 7C là",
            options: ["20%", "70%", "35%", "30%"],
            answer: 3,
            explain: "$100\\% - (35\\% + 20\\% + 15\\%) = 100\\% - 70\\% = 30\\%$."
          },
          {
            id: "d2q6", level: "vua", source: "SGK tr.96 – Ví dụ 2",
            q: "Một quầy nước bán được trong ngày:" + tbl(["Loại", "Trà sữa", "Nước cam", "Sinh tố", "Nước khoáng"], ["Số cốc", "45", "30", "15", "60"]) +
              "Tỉ lệ số cốc sinh tố trên tổng số cốc bán được là",
            options: ["10%", "15%", "20%", "30%"],
            answer: 0,
            explain: "Tổng: $45 + 30 + 15 + 60 = 150$ (cốc). Sinh tố: $\\frac{15}{150} = 10\\%$."
          },
          {
            id: "d2q7", level: "vua", source: "SGK tr.98 – Ví dụ 4",
            q: "Cho biểu đồ:" + P2 + "Khối 7 có 600 học sinh. Ước lượng số học sinh đi xe đạp đến trường.",
            options: ["45", "270", "180", "300"],
            answer: 1,
            explain: "$600 \\cdot 45\\% = 600 \\cdot \\frac{45}{100} = 270$ (học sinh). (180 là số học sinh được đưa đón.)"
          },
          {
            id: "d2q8", level: "vua", source: "mới",
            q: "Cho biểu đồ:" + P2 + "Tỉ lệ học sinh đi xe đạp gấp mấy lần tỉ lệ học sinh đi xe buýt?",
            options: ["3 lần", "4 lần", "$4{,}5$ lần", "5 lần"],
            answer: 2,
            explain: "$45\\% : 10\\% = 4{,}5$ (lần)."
          },
          {
            id: "d2q9", level: "kho", source: "SBT Bài 18 – BT 5.12",
            q: "Biểu đồ sau cho biết cách chi tiêu thu nhập hằng tháng của một gia đình:" +
              pie({ title: "Chi tiêu của gia đình", data: [["Ăn uống", 40], ["Học tập", 20], ["Tiết kiệm", 15], ["Điện nước", 10], ["Khoản khác", 15]] }) +
              "Thu nhập của gia đình là 25 triệu đồng mỗi tháng. Tiền chi cho học tập nhiều hơn tiền điện nước bao nhiêu?",
            options: ["2,5 triệu đồng", "10 triệu đồng", "5 triệu đồng", "2,25 triệu đồng"],
            answer: 0,
            explain: "Học tập: $25 \\cdot 20\\% = 5$ triệu; điện nước: $25 \\cdot 10\\% = 2{,}5$ triệu. Hơn nhau $5 - 2{,}5 = 2{,}5$ triệu đồng."
          },
          {
            id: "d2q10", level: "kho", source: "mới",
            q: "Trong biểu đồ hình quạt tròn biểu diễn kết quả khảo sát môn thể thao yêu thích, hình quạt \"Bơi lội\" chiếm 15% và ứng với 27 bạn. Số bạn tham gia khảo sát là",
            options: ["405", "42", "150", "180"],
            answer: 3,
            explain: "15% tổng số bạn là 27 bạn, nên tổng số bạn là $27 : \\frac{15}{100} = 27 \\cdot \\frac{100}{15} = 180$."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SGK Bài 18 – BT 5.6 (biến đổi)", maxPoints: 1.5,
            q: "Biểu đồ sau cho biết thời gian trong một ngày (24 giờ) của bạn An:" +
              pie({ title: "Một ngày của An", data: [["Ngủ", 35], ["Học ở trường", 25], ["Tự học", 15], ["Vui chơi", 10], ["Việc khác", 15]] }) +
              "a) Hoạt động nào chiếm nhiều thời gian nhất? Hai hoạt động nào chiếm thời gian bằng nhau?<br>" +
              "b) Mỗi ngày An ngủ bao nhiêu giờ và tự học bao nhiêu giờ?",
            modelAnswer: "a) Ngủ chiếm nhiều thời gian nhất (35%). Tự học và Việc khác bằng nhau (cùng 15%).<br>" +
              "b) Thời gian ngủ: $24 \\cdot 35\\% = 24 \\cdot \\frac{35}{100} = 8{,}4$ (giờ), tức 8 giờ 24 phút.<br>" +
              "Thời gian tự học: $24 \\cdot 15\\% = 3{,}6$ (giờ), tức 3 giờ 36 phút.",
            rubric: [
              { pts: 0.5, text: "Câu a: nêu đúng Ngủ nhiều nhất; Tự học và Việc khác bằng nhau." },
              { pts: 0.5, text: "Tính đúng thời gian ngủ $8{,}4$ giờ." },
              { pts: 0.5, text: "Tính đúng thời gian tự học $3{,}6$ giờ." }
            ]
          },
          {
            id: "d2e2", level: "vua", source: "SGK tr.96 – Ví dụ 2 (biến đổi)", maxPoints: 1.5,
            q: "Kết quả rèn luyện của 40 học sinh lớp 7B:" + tbl(["Mức", "Tốt", "Khá", "Đạt", "Chưa đạt"], ["Số học sinh", "14", "18", "6", "2"]) +
              "a) Tính tỉ lệ học sinh mỗi mức (để vẽ biểu đồ hình quạt tròn).<br>b) Trong biểu đồ, hình quạt nào lớn nhất? Tỉ lệ học sinh đạt mức Tốt hoặc Khá là bao nhiêu?",
            modelAnswer: "a) Tốt $\\frac{14}{40} = 35\\%$; Khá $\\frac{18}{40} = 45\\%$; Đạt $\\frac{6}{40} = 15\\%$; Chưa đạt $\\frac{2}{40} = 5\\%$ (tổng 100%).<br>" +
              "b) Hình quạt Khá lớn nhất (45%). Tốt hoặc Khá: $35\\% + 45\\% = 80\\%$.",
            rubric: [
              { pts: 1, text: "Tính đúng 4 tỉ lệ 35%, 45%, 15%, 5% (mỗi tỉ lệ 0,25 điểm)." },
              { pts: 0.5, text: "Nêu hình quạt Khá lớn nhất và tỉ lệ Tốt hoặc Khá là 80%." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.93 – Hình 5.5",
            q: "Các thành phần của biểu đồ hình quạt tròn gồm",
            options: ["tiêu đề, hình tròn biểu diễn dữ liệu, chú giải", "trục ngang, trục đứng, các cột", "tiêu đề, trục số, các điểm", "bảng số liệu và các đoạn thẳng"],
            answer: 0,
            explain: "Biểu đồ hình quạt tròn gồm: tiêu đề, hình tròn biểu diễn dữ liệu (chia thành các hình quạt) và chú giải."
          },
          {
            id: "d3q2", level: "de", source: "SGK tr.94 – Luyện tập 1",
            q: "Cho biểu đồ:" + P5 + "Loại trái cây được yêu thích nhất là",
            options: ["Xoài", "Dưa hấu", "Nho", "Cam"],
            answer: 2,
            explain: "Nho chiếm tỉ lệ lớn nhất: 35%."
          },
          {
            id: "d3q3", level: "de", source: "SGK tr.94 – Nhận xét",
            q: "Trong một biểu đồ hình quạt tròn, hai hình quạt giống nhau biểu diễn",
            options: ["hai tỉ lệ có tổng bằng 100%", "cùng một tỉ lệ", "hai tỉ lệ có tổng bằng 50%", "hai tỉ lệ khác nhau"],
            answer: 1,
            explain: "Hai hình quạt giống nhau (cùng kích thước) biểu diễn cùng một tỉ lệ."
          },
          {
            id: "d3q4", level: "de", source: "SGK tr.94 – Câu hỏi",
            q: "Cho biểu đồ:" + P5 + "Tỉ lệ các bạn thích cam là",
            options: ["25%", "30%", "35%", "10%"],
            answer: 3,
            explain: "Theo chú giải, hình quạt của Cam ghi 10%."
          },
          {
            id: "d3q5", level: "vua", source: "SGK tr.96 – Luyện tập 3",
            q: "Biểu đồ sau bị che mất một tỉ lệ:" +
              pie({ title: "Cỡ áo đồng phục lớp 7A", data: [["Cỡ S", 20], ["Cỡ M", 15], ["Cỡ L", 25, "?"], ["Cỡ XL", 30], ["Cỡ XXL", 10]] }) +
              "Tỉ lệ cỡ áo L là",
            options: ["25%", "75%", "20%", "35%"],
            answer: 0,
            explain: "$100\\% - (20\\% + 15\\% + 30\\% + 10\\%) = 100\\% - 75\\% = 25\\%$."
          },
          {
            id: "d3q6", level: "vua", source: "SGK tr.96 – Ví dụ 2",
            q: "Số học sinh tham gia các câu lạc bộ:" + tbl(["Câu lạc bộ", "Cờ vua", "Bóng bàn", "Đàn", "Vẽ"], ["Số học sinh", "12", "18", "6", "24"]) +
              "Trong biểu đồ hình quạt tròn, hình quạt biểu diễn câu lạc bộ Bóng bàn chiếm",
            options: ["18%", "20%", "30%", "40%"],
            answer: 2,
            explain: "Tổng: $12 + 18 + 6 + 24 = 60$. Bóng bàn: $\\frac{18}{60} = 30\\%$."
          },
          {
            id: "d3q7", level: "vua", source: "SGK tr.98 – Luyện tập 5",
            q: "Cho biểu đồ:" + P5 + "Trong 300 học sinh, ước lượng có khoảng bao nhiêu bạn thích xoài hoặc dưa hấu?",
            options: ["55", "90", "75", "165"],
            answer: 3,
            explain: "Tỉ lệ thích xoài hoặc dưa hấu: $30\\% + 25\\% = 55\\%$. Số học sinh khoảng $300 \\cdot 55\\% = 165$."
          },
          {
            id: "d3q8", level: "vua", source: "mới",
            q: "Cho biểu đồ:" + P5 + "Tỉ lệ các bạn thích nho gấp mấy lần tỉ lệ các bạn thích cam?",
            options: ["$2{,}5$ lần", "$3{,}5$ lần", "$\\frac{2}{7}$ lần", "3 lần"],
            answer: 1,
            explain: "$35\\% : 10\\% = 3{,}5$ (lần)."
          },
          {
            id: "d3q9", level: "kho", source: "SGK tr.97 – Luyện tập 4",
            q: "Biểu đồ sau cho biết sản lượng điện theo nguồn của một quốc gia trong một năm:" +
              pie({ title: "Sản lượng điện theo nguồn", data: [["Thuỷ điện", 30], ["Điện than", 45], ["Điện khí", 15], ["Điện tái tạo", 8], ["Nhập khẩu", 2]] }) +
              "Tổng sản lượng điện năm đó là $250 \\cdot 10^9$ kWh. Lượng điện nhập khẩu là",
            options: ["$2 \\cdot 10^9$ kWh", "$50 \\cdot 10^9$ kWh", "$5 \\cdot 10^9$ kWh", "$0{,}5 \\cdot 10^9$ kWh"],
            answer: 2,
            explain: "$250 \\cdot 10^9 \\cdot 2\\% = 250 \\cdot \\frac{2}{100} \\cdot 10^9 = 5 \\cdot 10^9$ (kWh)."
          },
          {
            id: "d3q10", level: "kho", source: "mới",
            q: "Một cửa hàng bán 4 loại bánh. Loại A bán được 30 chiếc và chiếm 25% tổng số bánh bán ra. Loại B bán được 18 chiếc. Trong biểu đồ hình quạt tròn, loại B chiếm tỉ lệ",
            options: ["15%", "18%", "12%", "60%"],
            answer: 0,
            explain: "Tổng số bánh: $30 : 25\\% = 30 \\cdot \\frac{100}{25} = 120$ (chiếc). Loại B: $\\frac{18}{120} = 15\\%$."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SGK Bài 18 – BT 5.7 (biến đổi)", maxPoints: 2,
            q: "40 bạn lớp 7C chọn vật nuôi yêu thích như sau:" +
              tbl(["Vật nuôi", "Chó", "Mèo", "Chim", "Cá"], ["Số bạn", "14", "12", "8", "6"]) +
              "a) Tính tỉ lệ các bạn chọn mỗi loại vật nuôi.<br>" +
              "b) Hình tròn dưới đây đã chia sẵn 20 phần bằng nhau (mỗi phần 5%). Mỗi loại vật nuôi cần tô bao nhiêu phần?" +
              blank(20, ["Chó", "Mèo", "Chim", "Cá"], "Vật nuôi yêu thích của lớp 7C") +
              "c) Vật nuôi nào được yêu thích nhất, ít nhất?",
            modelAnswer: "a) Tổng 40 bạn. Chó $\\frac{14}{40} = 35\\%$; Mèo $\\frac{12}{40} = 30\\%$; Chim $\\frac{8}{40} = 20\\%$; Cá $\\frac{6}{40} = 15\\%$.<br>" +
              "b) Mỗi phần 5% nên: Chó $35 : 5 = 7$ phần; Mèo $30 : 5 = 6$ phần; Chim $20 : 5 = 4$ phần; Cá $15 : 5 = 3$ phần (tổng 20 phần)." +
              pie({ data: [["Chó", 35], ["Mèo", 30], ["Chim", 20], ["Cá", 15]] }) +
              "c) Chó được yêu thích nhất (35%), cá ít nhất (15%).",
            rubric: [
              { pts: 0.75, text: "Tính đúng 4 tỉ lệ 35%, 30%, 20%, 15%." },
              { pts: 0.75, text: "Nêu đúng số phần cần tô 7; 6; 4; 3 (hoặc vẽ đúng biểu đồ)." },
              { pts: 0.5, text: "Kết luận đúng: Chó nhiều nhất, Cá ít nhất." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SGK tr.98 – Tranh luận", maxPoints: 1,
            q: "Một biểu đồ hình quạt tròn cho biết khoảng 30% học sinh trung học của một tỉnh bị cận thị. Bạn Minh nói: \"Trường em có 900 học sinh nên <b>chắc chắn</b> có đúng 270 bạn bị cận thị.\" Em có đồng ý với Minh không? Vì sao?",
            modelAnswer: "Theo tỉ lệ, số học sinh cận thị của trường <b>khoảng</b> $900 \\cdot 30\\% = 270$ (học sinh).<br>" +
              "Tuy nhiên đây chỉ là con số <b>ước lượng</b>, vì tỉ lệ 30% là của cả tỉnh (từ mẫu khảo sát), mỗi trường có thể khác. Vì vậy không đồng ý với Minh rằng \"chắc chắn có đúng 270 bạn\".",
            rubric: [
              { pts: 0.5, text: "Tính đúng $900 \\cdot 30\\% = 270$." },
              { pts: 0.5, text: "Giải thích được đây chỉ là ước lượng, không chắc chắn đúng 270." }
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
            q: "Cả hình tròn ứng với góc $360^\\circ$ ở tâm và ứng với 100%. Hình quạt biểu diễn tỉ lệ 15% có góc ở tâm bằng",
            options: ["$15^\\circ$", "$45^\\circ$", "$60^\\circ$", "$54^\\circ$"],
            answer: 3,
            explain: "$360^\\circ \\cdot 15\\% = 360^\\circ \\cdot \\frac{15}{100} = 54^\\circ$."
          },
          {
            id: "d4q2", level: "vua", source: "mới",
            q: "Trong một biểu đồ hình quạt tròn, một hình quạt có góc ở tâm bằng $72^\\circ$. Hình quạt đó biểu diễn tỉ lệ",
            options: ["72%", "20%", "25%", "18%"],
            answer: 1,
            explain: "$\\frac{72}{360} = \\frac{1}{5} = 20\\%$."
          },
          {
            id: "d4q3", level: "vua", source: "SBT Bài 18 – BT 5.12",
            q: "Lớp 7A dự kiến chi quỹ lớp 4 000 000 đồng theo biểu đồ:" +
              pie({ title: "Dự kiến chi quỹ lớp", data: [["Liên hoan", 35], ["Quà tặng", 25], ["Văn phòng phẩm", 15], ["Dự phòng", 25]] }) +
              "Tiền chi cho văn phòng phẩm ít hơn tiền liên hoan bao nhiêu?",
            options: ["800 000 đồng", "200 000 đồng", "600 000 đồng", "1 400 000 đồng"],
            answer: 0,
            explain: "Chênh lệch tỉ lệ: $35\\% - 15\\% = 20\\%$. Số tiền: $4\\,000\\,000 \\cdot 20\\% = 800\\,000$ (đồng)."
          },
          {
            id: "d4q4", level: "kho", source: "mới",
            q: "Lớp 7A có 40 học sinh, trong đó 30% thích môn Toán. Lớp 7B có 50 học sinh, trong đó 24% thích môn Toán. Khẳng định nào đúng về <b>số</b> học sinh thích môn Toán?",
            options: ["Lớp 7A nhiều hơn", "Lớp 7B nhiều hơn", "Hai lớp bằng nhau", "Không so sánh được"],
            answer: 2,
            explain: "Lớp 7A: $40 \\cdot 30\\% = 12$; lớp 7B: $50 \\cdot 24\\% = 12$. Hai lớp bằng nhau. Tỉ lệ lớn hơn chưa chắc số lượng lớn hơn khi tổng khác nhau."
          },
          {
            id: "d4q5", level: "kho", source: "SBT Bài 18 – Ví dụ 2 (biến đổi)",
            q: "Một cửa hàng bán được: Lê 40 kg, Táo 60 kg, Nhãn $x$ kg, Nho 20 kg. Trong biểu đồ hình quạt tròn, Nhãn chiếm 40%. Giá trị của $x$ là",
            options: ["48", "80", "40", "120"],
            answer: 1,
            explain: "Ba loại còn lại: $40 + 60 + 20 = 120$ (kg), chiếm $100\\% - 40\\% = 60\\%$. Tổng: $120 : 60\\% = 200$ (kg), nên $x = 200 - 120 = 80$. Thử lại: $\\frac{80}{200} = 40\\%$."
          },
          {
            id: "d4q6", level: "kho", source: "mới",
            q: "Một biểu đồ hình quạt tròn có 4 hình quạt A, B, C, D. Biết C chiếm 40%, D chiếm 15% và tỉ lệ của A gấp đôi tỉ lệ của B. Tỉ lệ của A là",
            options: ["15%", "45%", "20%", "30%"],
            answer: 3,
            explain: "A + B $= 100\\% - 40\\% - 15\\% = 45\\%$. Mà A = 2B nên 3B = 45%, B = 15%, A = 30%."
          },
          {
            id: "d4q7", level: "kho", source: "SBT Bài 18 – BT 5.15",
            q: "Biểu đồ sau cho biết chỉ số BMI của người trưởng thành ở một địa phương:" +
              pie({ title: "Chỉ số BMI người trưởng thành", data: [["Dưới 18,5", 20], ["18,5 đến dưới 23", 55], ["23 đến dưới 25", 15], ["25 đến dưới 30", 8], ["Từ 30 trở lên", 2]] }) +
              "Người có BMI từ 23 trở lên được coi là thừa cân. Tỉ lệ người thừa cân là",
            options: ["25%", "15%", "10%", "75%"],
            answer: 0,
            explain: "BMI từ 23 trở lên gồm ba phần: $15\\% + 8\\% + 2\\% = 25\\%$."
          },
          {
            id: "d4q8", level: "kho", source: "SBT Bài 18 – BT 5.12",
            q: "Theo quy tắc chi tiêu 50/20/30, một gia đình dành 50% thu nhập cho chi tiêu thiết yếu, 20% cho tiết kiệm và 30% cho chi tiêu cá nhân. Nếu gia đình muốn tiết kiệm $7{,}2$ triệu đồng mỗi tháng thì thu nhập mỗi tháng phải là",
            options: ["$14{,}4$ triệu đồng", "27 triệu đồng", "36 triệu đồng", "72 triệu đồng"],
            answer: 2,
            explain: "20% thu nhập là $7{,}2$ triệu, nên thu nhập là $7{,}2 : \\frac{20}{100} = 7{,}2 \\cdot 5 = 36$ (triệu đồng)."
          },
          {
            id: "d4q9", level: "kho", source: "mới",
            q: "Năm 2022 một cửa hàng bán 500 sản phẩm, trong đó đồ chơi chiếm 30%. Năm 2023 cửa hàng bán 800 sản phẩm, trong đó đồ chơi chiếm 25%. So với năm 2022, số đồ chơi bán được năm 2023",
            options: ["giảm 5 sản phẩm", "tăng 50 sản phẩm", "giảm 50 sản phẩm", "tăng 5 sản phẩm"],
            answer: 1,
            explain: "Năm 2022: $500 \\cdot 30\\% = 150$; năm 2023: $800 \\cdot 25\\% = 200$. Tăng $200 - 150 = 50$ sản phẩm (dù tỉ lệ giảm)."
          },
          {
            id: "d4q10", level: "kho", source: "mới",
            q: "Biểu đồ hình quạt tròn của lớp A cho biết học sinh nam chiếm 40%; của lớp B cho biết học sinh nam chiếm 50%. Không biết sĩ số mỗi lớp. Khẳng định nào <b>chắc chắn</b> đúng?",
            options: ["Lớp B có nhiều học sinh nam hơn lớp A", "Lớp A có nhiều học sinh nữ hơn lớp B", "Số học sinh nam lớp B gấp $1{,}25$ lần lớp A", "Tỉ lệ học sinh nữ của lớp A lớn hơn tỉ lệ học sinh nữ của lớp B"],
            answer: 3,
            explain: "Tỉ lệ nữ lớp A là 60%, lớp B là 50%, nên tỉ lệ nữ lớp A lớn hơn. Các khẳng định về <b>số</b> học sinh không chắc chắn vì không biết sĩ số (ví dụ lớp A 50 bạn có 20 nam, lớp B 30 bạn có 15 nam)."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "SGK Bài 18 – BT 5.6 (nâng cao)", maxPoints: 1.5,
            q: "Một xã có tổng diện tích 1 200 ha, được sử dụng như biểu đồ:" +
              pie({ title: "Sử dụng đất của xã", data: [["Nông nghiệp", 45], ["Đất ở", 20], ["Đất rừng", 25], ["Đất khác", 10]] }) +
              "a) Tính diện tích đất rừng.<br>b) Diện tích đất nông nghiệp nhiều hơn đất ở bao nhiêu ha?<br>" +
              "c) Nếu xã chuyển 60 ha đất nông nghiệp thành đất ở thì tỉ lệ đất nông nghiệp và đất ở mới là bao nhiêu?",
            modelAnswer: "a) Đất rừng: $1\\,200 \\cdot 25\\% = 300$ (ha).<br>" +
              "b) Đất nông nghiệp: $1\\,200 \\cdot 45\\% = 540$ (ha); đất ở: $1\\,200 \\cdot 20\\% = 240$ (ha). Hơn nhau $540 - 240 = 300$ (ha).<br>" +
              "c) Sau khi chuyển: nông nghiệp $540 - 60 = 480$ (ha), chiếm $\\frac{480}{1\\,200} = 40\\%$; đất ở $240 + 60 = 300$ (ha), chiếm $\\frac{300}{1\\,200} = 25\\%$.",
            rubric: [
              { pts: 0.5, text: "Câu a: đất rừng 300 ha." },
              { pts: 0.5, text: "Câu b: tính 540 ha, 240 ha và hiệu 300 ha." },
              { pts: 0.5, text: "Câu c: tỉ lệ mới 40% và 25%." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Khảo sát môn thể thao yêu thích của học sinh khối 7: Bóng đá chiếm 40%, Cầu lông chiếm 25%, Bơi lội chiếm 20%, còn lại là Bóng rổ với 18 bạn.<br>" +
              "a) Bóng rổ chiếm bao nhiêu phần trăm?<br>b) Có bao nhiêu bạn tham gia khảo sát?<br>c) Tính số bạn chọn mỗi môn còn lại.",
            modelAnswer: "a) Bóng rổ: $100\\% - (40\\% + 25\\% + 20\\%) = 15\\%$.<br>" +
              "b) 15% số bạn là 18 bạn, nên tổng số bạn: $18 : \\frac{15}{100} = 120$ (bạn).<br>" +
              "c) Bóng đá $120 \\cdot 40\\% = 48$; Cầu lông $120 \\cdot 25\\% = 30$; Bơi lội $120 \\cdot 20\\% = 24$ (bạn). Kiểm tra: $48 + 30 + 24 + 18 = 120$.",
            rubric: [
              { pts: 0.5, text: "Tính đúng tỉ lệ Bóng rổ 15%." },
              { pts: 0.5, text: "Tính đúng tổng 120 bạn." },
              { pts: 0.5, text: "Tính đúng 48; 30; 24 bạn." }
            ]
          }
        ]
      }
    ]
  });
})();
