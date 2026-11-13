(function () {
  // ---------- Hình vẽ SVG (chữ dùng currentColor để hợp chế độ sáng/tối) ----------
  var COLORS = ['#5fb98a', '#ef8a6f', '#f2c94c', '#6fa0e8', '#b48ad8', '#9aa5b1'];
  var LINE_COLORS = ['#3b82c4', '#e5484d'];
  var fmt = function (v) { return String(v).replace('.', ','); };

  // Biểu đồ quạt tròn. o = { title, data: [[nhãn, phần trăm]] } — tổng phần trăm = 100
  function pie(o) {
    var W = 340, H = 196, cx = 92, cy = 108, r = 74;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:340px;display:block;margin:6px auto" role="img" aria-label="Biểu đồ hình quạt tròn">';
    if (o.title) s += '<text x="' + (W / 2) + '" y="16" font-size="12.5" font-weight="bold" text-anchor="middle" fill="currentColor">' + o.title + '</text>';
    var a0 = -Math.PI / 2;
    o.data.forEach(function (d, i) {
      var a1 = a0 + d[1] / 100 * 2 * Math.PI;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var large = d[1] > 50 ? 1 : 0;
      s += '<path d="M' + cx + ' ' + cy + ' L' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Z" fill="' + COLORS[i % COLORS.length] + '" stroke="#fff" stroke-width="1"/>';
      var am = (a0 + a1) / 2, rr = d[1] < 12 ? r * 0.72 : r * 0.6;
      s += '<text x="' + (cx + rr * Math.cos(am)).toFixed(1) + '" y="' + (cy + rr * Math.sin(am) + 4).toFixed(1) + '" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#1f2328">' + fmt(d[1]) + '%</text>';
      a0 = a1;
    });
    o.data.forEach(function (d, i) {
      var y = 52 + i * 24;
      s += '<rect x="186" y="' + (y - 10) + '" width="12" height="12" fill="' + COLORS[i % COLORS.length] + '"/>';
      s += '<text x="204" y="' + y + '" font-size="12" fill="currentColor">' + d[0] + '</text>';
    });
    return s + '</svg>';
  }

  // Biểu đồ đoạn thẳng (1 hoặc 2 đường).
  // o = { title, xs, ys | series: [{ name, ys }], yMin, yMax, step, yName, xName }
  function line(o) {
    var series = o.series || [{ ys: o.ys }];
    var legend = series.length > 1;
    var W = 340, H = legend ? 246 : 226, L = 46, R = 16, T = 32, B = legend ? 64 : 44;
    var pw = W - L - R, ph = H - T - B, n = o.xs.length, dx = pw / n;
    var X = function (i) { return L + dx * (i + 0.5); };
    var Y = function (v) { return T + ph - (v - o.yMin) / (o.yMax - o.yMin) * ph; };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:340px;display:block;margin:6px auto" role="img" aria-label="Biểu đồ đoạn thẳng">';
    if (o.title) s += '<text x="' + (W / 2) + '" y="15" font-size="12.5" font-weight="bold" text-anchor="middle" fill="currentColor">' + o.title + '</text>';
    for (var v = o.yMin; v <= o.yMax + 1e-9; v += o.step) {
      var yy = Y(v).toFixed(1);
      s += '<line x1="' + L + '" y1="' + yy + '" x2="' + (W - R) + '" y2="' + yy + '" stroke="currentColor" stroke-opacity="0.18"/>';
      s += '<text x="' + (L - 6) + '" y="' + (+yy + 4) + '" font-size="11" text-anchor="end" fill="currentColor">' + fmt(Math.round(v * 100) / 100) + '</text>';
    }
    s += '<line x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + (T + ph) + '" stroke="currentColor" stroke-width="1.2"/>';
    s += '<line x1="' + L + '" y1="' + (T + ph) + '" x2="' + (W - R) + '" y2="' + (T + ph) + '" stroke="currentColor" stroke-width="1.2"/>';
    series.forEach(function (se, k) {
      var col = LINE_COLORS[k % LINE_COLORS.length];
      var pts = se.ys.map(function (v, i) { return X(i).toFixed(1) + ',' + Y(v).toFixed(1); }).join(' ');
      s += '<polyline points="' + pts + '" fill="none" stroke="' + col + '" stroke-width="2.2"/>';
      se.ys.forEach(function (v, i) {
        s += k === 0 ? '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(v).toFixed(1) + '" r="3.6" fill="' + col + '"/>'
                     : '<rect x="' + (X(i) - 3.5).toFixed(1) + '" y="' + (Y(v) - 3.5).toFixed(1) + '" width="7" height="7" fill="' + col + '"/>';
        var ty = k === 0 ? Y(v) - 8 : Y(v) + 16;
        s += '<text x="' + X(i).toFixed(1) + '" y="' + ty.toFixed(1) + '" font-size="11" text-anchor="middle" fill="' + (legend ? col : 'currentColor') + '">' + fmt(v) + '</text>';
      });
    });
    o.xs.forEach(function (x, i) {
      s += '<text x="' + X(i).toFixed(1) + '" y="' + (T + ph + 16) + '" font-size="11" text-anchor="middle" fill="currentColor">' + x + '</text>';
    });
    if (o.xName) s += '<text x="' + (W - R) + '" y="' + (T + ph + 32) + '" font-size="11" text-anchor="end" fill="currentColor" font-style="italic">' + o.xName + '</text>';
    if (o.yName) s += '<text x="4" y="' + (T - 10) + '" font-size="11" fill="currentColor" font-style="italic">' + o.yName + '</text>';
    if (legend) series.forEach(function (se, k) {
      var lx = 60 + k * 140, ly = H - 10, col = LINE_COLORS[k % LINE_COLORS.length];
      s += '<line x1="' + lx + '" y1="' + (ly - 4) + '" x2="' + (lx + 22) + '" y2="' + (ly - 4) + '" stroke="' + col + '" stroke-width="2.2"/>';
      s += '<text x="' + (lx + 28) + '" y="' + ly + '" font-size="12" fill="currentColor">' + se.name + '</text>';
    });
    return s + '</svg>';
  }

  // ---------- Dữ liệu các hình ----------
  // Lý thuyết / ví dụ
  var pieThe = pie({ title: "Loại cây trồng trong vườn của bác Tư", data: [["Cam", 45], ["Bưởi", 30], ["Ổi", 15], ["Chanh", 10]] });
  var lineThe = line({ title: "Cân nặng của bé Na (kg)", xs: ["1 th", "2 th", "3 th", "4 th", "5 th", "6 th"], ys: [4.2, 5.1, 5.9, 6.4, 6.9, 7.3], yMin: 3, yMax: 8, step: 1, yName: "kg", xName: "Tháng tuổi" });
  var lineEx2 = line({ title: "Số dân hai thị trấn (nghìn người)", xs: ["2005", "2010", "2015", "2020"], series: [{ name: "Thị trấn P", ys: [20, 22, 23, 24] }, { name: "Thị trấn Q", ys: [16, 19, 22, 26] }], yMin: 14, yMax: 28, step: 2, yName: "nghìn người", xName: "Năm" });

  // Đề 1
  var pieDream = pie({ title: "Mơ ước nghề nghiệp của HS khối 7", data: [["Bác sĩ", 30], ["Giáo viên", 25], ["Công an", 20], ["Kĩ sư", 15], ["Nghề khác", 10]] });
  var lineTourist = line({ title: "Lượt khách du lịch đến một tỉnh", xs: ["2018", "2019", "2020", "2021", "2022"], ys: [420, 480, 210, 260, 510], yMin: 0, yMax: 600, step: 100, yName: "nghìn lượt", xName: "Năm" });
  var lineRevenue = line({ title: "Doanh thu của công ty X", xs: ["2019", "2020", "2021", "2022", "2023"], ys: [150, 165, 180, 210, 240], yMin: 100, yMax: 250, step: 50, yName: "tỉ đồng", xName: "Năm" });
  var pieRevenue = pie({ title: "Cơ cấu doanh thu công ty X năm 2023", data: [["Bán lẻ", 50], ["Bán buôn", 35], ["Dịch vụ", 15]] });

  // Đề 2
  var pieGift = pie({ title: "Quà tặng vùng lũ của lớp 7B (36 HS)", data: [["Đồ dùng học tập", 50], ["Quần áo", 25], ["Sách truyện", 25]] });
  var linePop = line({ title: "Số dân hai xã (nghìn người)", xs: ["2000", "2010", "2020", "2030"], series: [{ name: "Xã A", ys: [12, 13, 14, 15] }, { name: "Xã B", ys: [9, 11, 14, 17] }], yMin: 8, yMax: 18, step: 2, yName: "nghìn người", xName: "Năm" });
  var pieEconomy = pie({ title: "Cơ cấu kinh tế tỉnh M năm 2023", data: [["Dịch vụ", 42], ["Công nghiệp", 38], ["Nông nghiệp", 20]] });
  var lineEnglish = line({ title: "Kết quả 5 lần thi thử tiếng Anh của Hoa", xs: ["Lần 1", "Lần 2", "Lần 3", "Lần 4", "Lần 5"], ys: [40, 50, 70, 80, 88], yMin: 0, yMax: 100, step: 20, yName: "% câu đúng", xName: "Lần" });
  var lineSchools = line({ title: "Số học sinh hai trường", xs: ["2019", "2020", "2021", "2022", "2023"], series: [{ name: "Trường X", ys: [820, 850, 870, 860, 840] }, { name: "Trường Y", ys: [700, 760, 820, 870, 920] }], yMin: 650, yMax: 950, step: 50, yName: "học sinh", xName: "Năm" });

  // Đề 3
  var linePhone = line({ title: "Tỉ lệ HS THCS dùng mạng xã hội hằng ngày", xs: ["2018", "2019", "2020", "2021", "2022"], ys: [20, 24, 30, 38, 45], yMin: 0, yMax: 50, step: 10, yName: "%", xName: "Năm" });
  var pieBook = pie({ title: "Các loại sách trong thư viện (1 500 cuốn)", data: [["Sách giáo khoa", 40], ["Truyện", 30], ["Tham khảo", 20], ["Báo, tạp chí", 10]] });
  var lineTemp = line({ title: "Nhiệt độ ngoài trời trong một ngày", xs: ["6 h", "9 h", "12 h", "15 h", "18 h", "21 h"], ys: [22, 26, 31, 33, 28, 24], yMin: 20, yMax: 35, step: 5, yName: "°C", xName: "Giờ" });
  var lineMyopia = line({ title: "Tỉ lệ HS bị cận thị của trường K", xs: ["2019", "2020", "2021", "2022", "2023"], ys: [18, 21, 25, 28, 30], yMin: 10, yMax: 35, step: 5, yName: "%", xName: "Năm" });

  registerLesson({
    id: "c5-on",
    chapter: 5,
    kind: "review",
    title: "Ôn tập chương V",
    sgkPages: [88, 109],
    sbtPages: [92, 96],
    objectives: [
      "Thu thập, phân loại dữ liệu; đánh giá tính đại diện và tính hợp lí của dữ liệu",
      "Đọc, mô tả, phân tích biểu đồ hình quạt tròn; tính số lượng từ tỉ lệ phần trăm",
      "Đọc, mô tả, phân tích biểu đồ đoạn thẳng (một hoặc hai đường); nhận ra xu thế tăng, giảm",
      "Lựa chọn loại biểu đồ phù hợp; dùng biểu đồ để dự đoán, giải quyết bài toán thực tế"
    ],

    theory: [
      { heading: "1. Thu thập và phân loại dữ liệu",
        html: "<ul><li>Các cách thu thập: <b>quan sát</b>, <b>làm thí nghiệm</b>, <b>lập phiếu hỏi</b>, <b>phỏng vấn</b>; hoặc lấy từ nguồn có sẵn (sách báo, Internet).</li>" +
              "<li>Phân loại: <b>số liệu</b> (dữ liệu là số); <b>dữ liệu không là số</b> gồm loại <b>sắp được thứ tự</b> (mức độ, xếp loại) và loại <b>không sắp được thứ tự</b> (tên, màu, nơi ở…).</li>" +
              "<li>Dữ liệu phải <b>đại diện</b> cho toàn bộ đối tượng cần tìm hiểu (không chỉ hỏi một nhóm riêng) và <b>hợp lí</b> (đúng định dạng, nằm trong phạm vi có thể, tổng các tỉ lệ bằng $100\\%$…).</li></ul>" },
      { heading: "2. Biểu đồ hình quạt tròn",
        html: "Dùng để <b>so sánh các phần với toàn thể</b>. Cả hình tròn là $100\\%$, nửa hình tròn là $50\\%$, $\\frac{1}{4}$ hình tròn là $25\\%$; mỗi $1\\%$ ứng với góc ở tâm $3{,}6^\\circ$.<br>" +
              "Nếu tổng thể có $N$ đối tượng thì phần chiếm $a\\%$ gồm $\\frac{a}{100}\\cdot N$ đối tượng." + pieThe },
      { heading: "3. Biểu đồ đoạn thẳng",
        html: "Dùng để biểu diễn <b>sự thay đổi của một đại lượng theo thời gian</b>. Trục ngang ghi thời gian (theo thứ tự tăng dần), trục đứng ghi giá trị (gốc không nhất thiết là $0$). Đoạn đi lên – tăng; đi xuống – giảm; nằm ngang – không đổi." + lineThe +
              "Có thể vẽ <b>hai đường</b> trên cùng một biểu đồ để so sánh hai đại lượng; chỗ hai đường cắt nhau là lúc hai đại lượng (xấp xỉ) bằng nhau." },
      { heading: "4. Chọn biểu đồ phù hợp",
        html: "<table><tr><th>Mục đích</th><th>Loại biểu đồ</th></tr>" +
              "<tr><td>So sánh tỉ lệ các phần trong toàn thể</td><td>Hình quạt tròn</td></tr>" +
              "<tr><td>Theo dõi sự thay đổi theo thời gian, xu thế</td><td>Đoạn thẳng</td></tr>" +
              "<tr><td>So sánh số lượng giữa các nhóm (đã học ở lớp 6)</td><td>Cột, cột kép, tranh</td></tr></table>" }
    ],

    skills: [
      "Gặp câu hỏi \"bao nhiêu đối tượng\" trên biểu đồ quạt: lấy <b>phần trăm × tổng số</b>, rồi kiểm tra tổng các phần có bằng tổng số không.",
      "Phần trăm còn thiếu trong biểu đồ quạt $= 100\\%$ trừ tổng các phần đã biết. Góc ở tâm $\\alpha$ ứng với $\\frac{\\alpha}{3{,}6}\\%$.",
      "Đọc biểu đồ đoạn thẳng: so sánh từng cặp điểm liền nhau để biết tăng/giảm bao nhiêu; đoạn <b>dốc nhất</b> là lúc thay đổi nhiều nhất.",
      "Biểu đồ có hai đường: đọc chú giải trước; tìm năm hai đường gần nhau nhất hoặc cắt nhau để trả lời \"khi nào bằng nhau\".",
      "Dự đoán cho một nhóm mới (trường, lớp): giả sử tỉ lệ giống mẫu khảo sát rồi nhân với số người của nhóm đó.",
      "Lỗi hay gặp: nhầm \"tăng bao nhiêu\" với \"giá trị năm sau\"; quên đổi phần trăm ra số; kết luận cho cả trường khi chỉ hỏi một nhóm nhỏ."
    ],

    examples: [
      { q: "Biểu đồ ở mục 2 cho biết tỉ lệ các loại cây trong vườn của bác Tư. Vườn có 120 cây. Tính số cây mỗi loại.",
        solution: "Cam: $\\frac{45}{100}\\cdot 120 = 54$ cây; Bưởi: $\\frac{30}{100}\\cdot 120 = 36$ cây; Ổi: $\\frac{15}{100}\\cdot 120 = 18$ cây; Chanh: $\\frac{10}{100}\\cdot 120 = 12$ cây.<br>Kiểm tra: $54 + 36 + 18 + 12 = 120$." },
      { q: "Cho biểu đồ số dân hai thị trấn P và Q:" + lineEx2 + "a) Năm 2005 thị trấn nào đông dân hơn, hơn bao nhiêu? b) Khoảng năm nào số dân hai thị trấn gần bằng nhau? c) Nêu xu thế số dân mỗi thị trấn.",
        solution: "a) Năm 2005: P có $20$ nghìn, Q có $16$ nghìn người, nên P đông hơn $4$ nghìn người.<br>" +
                  "b) Năm 2015: P có $23$, Q có $22$ nghìn; năm 2020 Q ($26$) đã vượt P ($24$). Vậy khoảng năm 2015–2016 số dân hai thị trấn gần bằng nhau.<br>" +
                  "c) Cả hai đều tăng; Q tăng nhanh hơn P (Q tăng $10$ nghìn, P tăng $4$ nghìn người trong 15 năm)." },
      { q: "Để biết thời gian dùng điện thoại mỗi ngày của học sinh cả trường, Lan hỏi 15 bạn trong câu lạc bộ game. Kết luận rút ra có đáng tin không? Vì sao?",
        solution: "Không đáng tin, vì dữ liệu <b>không đảm bảo tính đại diện</b>: các bạn trong câu lạc bộ game có thể dùng điện thoại nhiều hơn bình thường. Nên chọn ngẫu nhiên học sinh ở mọi khối, mọi lớp." }
    ],

    sets: [
      /* ======================= ĐỀ 1 ======================= */
      { id: "d1", name: "Đề 1",
        mcq: [
          { id: "d1q1", level: "de", source: "SBT Ôn tập chương V – câu 1",
            q: "Bình đứng ở cổng trường và đếm số xe máy đi qua trong mỗi giờ. Bình đã thu thập dữ liệu bằng phương pháp nào?",
            options: ["Quan sát", "Làm thí nghiệm", "Lập phiếu hỏi", "Phỏng vấn"],
            answer: 0,
            explain: "Bình tự nhìn và đếm, không hỏi ai và không làm thí nghiệm, nên đó là phương pháp quan sát." },
          { id: "d1q2", level: "de", source: "SBT Ôn tập chương V – câu 3",
            q: "Trong biểu đồ hình quạt tròn, nửa hình tròn biểu diễn",
            options: ["$25\\%$", "$75\\%$", "$50\\%$", "$100\\%$"],
            answer: 2,
            explain: "Cả hình tròn biểu diễn $100\\%$ nên nửa hình tròn biểu diễn $50\\%$." },
          { id: "d1q3", level: "de", source: "mới",
            q: "Dữ liệu \"xếp loại học tập (Tốt, Khá, Đạt, Chưa đạt)\" thuộc loại nào?",
            options: ["Số liệu", "Dữ liệu không là số, có thể sắp thứ tự", "Dữ liệu không là số, không thể sắp thứ tự", "Không phải là dữ liệu thống kê"],
            answer: 1,
            explain: "Các mức xếp loại không phải là số nhưng sắp được từ thấp đến cao: Chưa đạt → Đạt → Khá → Tốt." },
          { id: "d1q4", level: "de", source: "SBT Ôn tập chương V – câu 5",
            q: "Để biểu diễn sự thay đổi nhiệt độ cơ thể của một bệnh nhân theo từng giờ, ta nên dùng",
            options: ["Biểu đồ hình quạt tròn", "Biểu đồ tranh", "Biểu đồ cột kép", "Biểu đồ đoạn thẳng"],
            answer: 3,
            explain: "Đại lượng thay đổi theo thời gian nên dùng biểu đồ đoạn thẳng." },
          { id: "d1q5", level: "vua", source: "SGK Bài tập cuối chương V – BT 5.18",
            q: "Biểu đồ dưới đây cho biết mơ ước nghề nghiệp của học sinh khối 7 một trường." + pieDream + "Tỉ lệ học sinh mơ ước làm bác sĩ nhiều hơn tỉ lệ mơ ước làm kĩ sư là",
            options: ["$10\\%$", "$15\\%$", "$5\\%$", "$45\\%$"],
            answer: 1,
            explain: "Bác sĩ $30\\%$, kĩ sư $15\\%$; chênh lệch $30\\% - 15\\% = 15\\%$." },
          { id: "d1q6", level: "vua", source: "SGK Bài tập cuối chương V – BT 5.18",
            q: "Dựa vào biểu đồ mơ ước nghề nghiệp ở câu trên, nếu khối 7 có 200 học sinh thì số bạn mơ ước làm giáo viên là",
            options: ["$25$", "$40$", "$75$", "$50$"],
            answer: 3,
            explain: "Giáo viên chiếm $25\\%$: $\\frac{25}{100}\\cdot 200 = 50$ học sinh." },
          { id: "d1q7", level: "vua", source: "SGK Bài 19",
            q: "Biểu đồ dưới đây cho biết lượt khách du lịch đến một tỉnh." + lineTourist + "Năm nào lượt khách <b>giảm</b> so với năm trước?",
            options: ["2019", "2021", "2020", "2022"],
            answer: 2,
            explain: "Từ 2019 ($480$) đến 2020 ($210$) đoạn thẳng đi xuống nên năm 2020 giảm. Các năm còn lại đều tăng so với năm trước." },
          { id: "d1q8", level: "vua", source: "SGK Bài 19",
            q: "Theo biểu đồ lượt khách du lịch ở câu trên, từ năm 2021 đến năm 2022 lượt khách tăng thêm bao nhiêu nghìn lượt?",
            options: ["$250$", "$90$", "$300$", "$30$"],
            answer: 0,
            explain: "$510 - 260 = 250$ (nghìn lượt)." },
          { id: "d1q9", level: "kho", source: "SGK Bài 18",
            q: "Trong biểu đồ mơ ước nghề nghiệp ở câu 5, hình quạt biểu diễn nghề công an ($20\\%$) có góc ở tâm bằng",
            options: ["$20^\\circ$", "$36^\\circ$", "$72^\\circ$", "$90^\\circ$"],
            answer: 2,
            explain: "Mỗi $1\\%$ ứng với $3{,}6^\\circ$ nên $20\\%$ ứng với $20 \\cdot 3{,}6^\\circ = 72^\\circ$." },
          { id: "d1q10", level: "kho", source: "SGK Bài 17",
            q: "Để tìm hiểu môn học yêu thích của học sinh khối 7, Hùng hỏi 30 bạn trong đội tuyển Toán của khối. Nhận xét nào sau đây đúng?",
            options: ["Dữ liệu đảm bảo tính đại diện vì Hùng hỏi tới 30 bạn", "Dữ liệu đảm bảo tính đại diện vì các bạn đều học khối 7", "Cần hỏi thêm giáo viên dạy Toán thì dữ liệu mới đại diện", "Dữ liệu không đảm bảo tính đại diện vì chỉ hỏi các bạn trong đội tuyển Toán"],
            answer: 3,
            explain: "Các bạn đội tuyển Toán nhiều khả năng thích môn Toán hơn bình thường, nên không đại diện cho cả khối. Cần chọn ngẫu nhiên học sinh ở các lớp." },
          { id: "d1q11", level: "kho", source: "mới",
            q: "Theo biểu đồ lượt khách du lịch ở câu 7, trung bình mỗi năm từ 2018 đến 2022 tỉnh đó đón bao nhiêu nghìn lượt khách?",
            options: ["$376$", "$470$", "$420$", "$360$"],
            answer: 0,
            explain: "Tổng: $420 + 480 + 210 + 260 + 510 = 1\\,880$ (nghìn lượt). Trung bình: $1\\,880 : 5 = 376$ (nghìn lượt)." }
        ],
        essay: [
          { id: "d1e1", level: "vua", source: "SGK Bài tập cuối chương V – BT 5.18 (biến đổi)", maxPoints: 1.5,
            q: "Dựa vào biểu đồ mơ ước nghề nghiệp của học sinh khối 7 (câu 5):" + pieDream +
               "a) Lập bảng thống kê tỉ lệ học sinh theo từng nghề.<br>b) Một trường khác có 240 học sinh khối 7. Hãy dự đoán số bạn mơ ước làm bác sĩ và số bạn mơ ước làm giáo viên.",
            modelAnswer: "a) <table><tr><th>Nghề</th><th>Bác sĩ</th><th>Giáo viên</th><th>Công an</th><th>Kĩ sư</th><th>Nghề khác</th></tr>" +
                         "<tr><td>Tỉ lệ</td><td>$30\\%$</td><td>$25\\%$</td><td>$20\\%$</td><td>$15\\%$</td><td>$10\\%$</td></tr></table>" +
                         "b) Giả sử tỉ lệ ở trường kia giống như biểu đồ:<br>Bác sĩ: $\\frac{30}{100}\\cdot 240 = 72$ (bạn).<br>Giáo viên: $\\frac{25}{100}\\cdot 240 = 60$ (bạn).",
            rubric: [
              { pts: 0.5, text: "Lập đúng bảng thống kê 5 nghề với tỉ lệ tương ứng." },
              { pts: 0.5, text: "Dự đoán đúng số bạn mơ ước làm bác sĩ: $72$." },
              { pts: 0.5, text: "Dự đoán đúng số bạn mơ ước làm giáo viên: $60$." }
            ] },
          { id: "d1e2", level: "kho", source: "SGK Bài tập cuối chương V – BT 5.19 (biến đổi)", maxPoints: 1.5,
            q: "Cho hai biểu đồ về công ty X:" + lineRevenue + pieRevenue +
               "a) Doanh thu của công ty X năm 2023 là bao nhiêu tỉ đồng? Nêu xu thế doanh thu từ 2019 đến 2023.<br>b) Năm 2023, mỗi mảng kinh doanh đóng góp bao nhiêu tỉ đồng?",
            modelAnswer: "a) Năm 2023 doanh thu là $240$ tỉ đồng. Từ 2019 đến 2023 doanh thu <b>tăng liên tục</b> (từ $150$ lên $240$ tỉ đồng).<br>" +
                         "b) Bán lẻ: $\\frac{50}{100}\\cdot 240 = 120$ (tỉ đồng);<br>Bán buôn: $\\frac{35}{100}\\cdot 240 = 84$ (tỉ đồng);<br>Dịch vụ: $\\frac{15}{100}\\cdot 240 = 36$ (tỉ đồng).<br>Kiểm tra: $120 + 84 + 36 = 240$.",
            rubric: [
              { pts: 0.5, text: "Đọc đúng doanh thu năm 2023 là $240$ tỉ đồng và nêu đúng xu thế tăng." },
              { pts: 0.5, text: "Tính đúng mảng bán lẻ: $120$ tỉ đồng." },
              { pts: 0.5, text: "Tính đúng bán buôn $84$ tỉ đồng và dịch vụ $36$ tỉ đồng." }
            ] }
        ] },

      /* ======================= ĐỀ 2 ======================= */
      { id: "d2", name: "Đề 2",
        mcq: [
          { id: "d2q1", level: "de", source: "SGK Bài 17",
            q: "Để biết loại hạt đậu nào nảy mầm nhanh nhất, Mai gieo mỗi loại 20 hạt và theo dõi hằng ngày. Mai đã thu thập dữ liệu bằng phương pháp nào?",
            options: ["Quan sát", "Phỏng vấn", "Lập phiếu hỏi", "Làm thí nghiệm"],
            answer: 3,
            explain: "Mai tự tạo ra điều kiện (gieo hạt) rồi ghi nhận kết quả, đó là làm thí nghiệm." },
          { id: "d2q2", level: "de", source: "SBT Ôn tập chương V – câu 4",
            q: "Trong biểu đồ hình quạt tròn, $\\frac{1}{4}$ hình tròn biểu diễn",
            options: ["$25\\%$", "$40\\%$", "$14\\%$", "$75\\%$"],
            answer: 0,
            explain: "$\\frac{1}{4}$ của $100\\%$ là $25\\%$." },
          { id: "d2q3", level: "de", source: "SBT Ôn tập chương V – câu 2",
            q: "Muốn so sánh tỉ lệ của các phần trong toàn bộ dữ liệu, ta nên dùng",
            options: ["Biểu đồ đoạn thẳng", "Biểu đồ hình quạt tròn", "Biểu đồ cột kép", "Biểu đồ tranh"],
            answer: 1,
            explain: "Biểu đồ hình quạt tròn biểu diễn từng phần so với toàn thể ($100\\%$)." },
          { id: "d2q4", level: "de", source: "SGK Bài 17",
            q: "Dữ liệu nào sau đây là <b>số liệu</b>?",
            options: ["Môn học yêu thích của mỗi bạn", "Nơi sinh của mỗi bạn", "Số giờ tự học mỗi ngày của mỗi bạn", "Mức độ hài lòng về giờ học (hài lòng, bình thường, không hài lòng)"],
            answer: 2,
            explain: "Số giờ tự học là một con số nên là số liệu. Các dữ liệu còn lại không phải là số." },
          { id: "d2q5", level: "vua", source: "SBT Ôn tập chương V – BT 5.27",
            q: "Biểu đồ dưới đây cho biết tỉ lệ học sinh lớp 7B (36 học sinh) tặng các loại quà cho vùng lũ, mỗi bạn tặng một món." + pieGift + "Số học sinh tặng đồ dùng học tập là",
            options: ["$18$", "$9$", "$12$", "$25$"],
            answer: 0,
            explain: "Đồ dùng học tập chiếm $50\\%$: $\\frac{50}{100}\\cdot 36 = 18$ học sinh." },
          { id: "d2q6", level: "vua", source: "SBT Ôn tập chương V – câu 6",
            q: "Trong biểu đồ đoạn thẳng, khẳng định nào sau đây <b>không</b> đúng?",
            options: ["Trục ngang thường biểu diễn thời gian", "Gốc của trục đứng không nhất thiết phải là $0$", "Các thời điểm trên trục ngang không cần sắp theo thứ tự thời gian", "Mỗi điểm cho biết giá trị của đại lượng tại một thời điểm"],
            answer: 2,
            explain: "Thời gian trên trục ngang phải sắp theo thứ tự tăng dần thì mới thấy được sự thay đổi (tăng, giảm) của đại lượng." },
          { id: "d2q7", level: "vua", source: "SGK Bài tập cuối chương V – BT 5.20",
            q: "Biểu đồ dưới đây cho biết số dân và dự báo số dân của hai xã A và B." + linePop + "Năm 2000, xã nào đông dân hơn và hơn bao nhiêu?",
            options: ["Xã B, hơn 3 nghìn người", "Xã A, hơn 3 nghìn người", "Xã A, hơn 2 nghìn người", "Hai xã đông dân bằng nhau"],
            answer: 1,
            explain: "Năm 2000: xã A có $12$ nghìn, xã B có $9$ nghìn người. Xã A đông hơn $12 - 9 = 3$ nghìn người." },
          { id: "d2q8", level: "vua", source: "SGK Bài tập cuối chương V – BT 5.20",
            q: "Theo biểu đồ số dân hai xã ở câu trên, năm nào số dân hai xã bằng nhau?",
            options: ["2010", "2030", "2000", "2020"],
            answer: 3,
            explain: "Năm 2020 hai đường gặp nhau: cả hai xã đều có $14$ nghìn người." },
          { id: "d2q9", level: "kho", source: "SGK Bài tập cuối chương V – BT 5.19",
            q: "Biểu đồ dưới đây cho biết cơ cấu kinh tế của tỉnh M năm 2023." + pieEconomy + "Tổng sản phẩm của tỉnh năm đó là $50$ nghìn tỉ đồng. Khu vực công nghiệp đóng góp",
            options: ["$19$ nghìn tỉ đồng", "$38$ nghìn tỉ đồng", "$21$ nghìn tỉ đồng", "$10$ nghìn tỉ đồng"],
            answer: 0,
            explain: "Công nghiệp chiếm $38\\%$: $\\frac{38}{100}\\cdot 50 = 19$ (nghìn tỉ đồng). ($21$ là của dịch vụ, $10$ là của nông nghiệp.)" },
          { id: "d2q10", level: "kho", source: "SGK Bài tập cuối chương V – BT 5.20",
            q: "Theo biểu đồ số dân hai xã ở câu 7, từ năm 2000 đến năm 2030, số dân xã B tăng thêm bao nhiêu nghìn người?",
            options: ["$3$", "$17$", "$8$", "$5$"],
            answer: 2,
            explain: "Xã B: năm 2000 có $9$ nghìn, năm 2030 có $17$ nghìn người; tăng $17 - 9 = 8$ nghìn người. ($3$ là mức tăng của xã A.)" },
          { id: "d2q11", level: "kho", source: "SGK Bài 18",
            q: "Trong một biểu đồ hình quạt tròn, một hình quạt có góc ở tâm $54^\\circ$. Hình quạt đó biểu diễn bao nhiêu phần trăm?",
            options: ["$54\\%$", "$15\\%$", "$30\\%$", "$5{,}4\\%$"],
            answer: 1,
            explain: "Cả hình tròn $360^\\circ$ ứng với $100\\%$, nên $1\\%$ ứng với $3{,}6^\\circ$. Ta có $54 : 3{,}6 = 15$, vậy hình quạt biểu diễn $15\\%$." }
        ],
        essay: [
          { id: "d2e1", level: "vua", source: "SBT Ôn tập chương V – BT 5.26 (biến đổi)", maxPoints: 1.5,
            q: "Hoa làm bài thi thử tiếng Anh 5 lần, kết quả (tỉ lệ câu trả lời đúng) cho bởi biểu đồ:" + lineEnglish +
               "a) Dữ liệu về kết quả các lần thi thuộc loại nào?<br>b) Lần thi nào Hoa tiến bộ nhiều nhất so với lần ngay trước đó? Tiến bộ bao nhiêu phần trăm?<br>c) Nhận xét chung về sự tiến bộ của Hoa.",
            modelAnswer: "a) Kết quả là các con số (tỉ lệ phần trăm) nên là <b>số liệu</b>.<br>" +
                         "b) Mức tăng so với lần trước: lần 2: $50 - 40 = 10$; lần 3: $70 - 50 = 20$; lần 4: $80 - 70 = 10$; lần 5: $88 - 80 = 8$ (điểm phần trăm).<br>" +
                         "Lần 3 tiến bộ nhiều nhất, tăng $20$ điểm phần trăm so với lần 2.<br>" +
                         "c) Kết quả của Hoa <b>tăng liên tục</b> qua 5 lần (từ $40\\%$ lên $88\\%$), Hoa tiến bộ đều; các lần sau tăng chậm lại vì kết quả đã cao.",
            rubric: [
              { pts: 0.5, text: "Câu a: xác định đúng là số liệu." },
              { pts: 0.5, text: "Câu b: tính các mức tăng và chỉ ra lần 3, tăng $20$ điểm phần trăm." },
              { pts: 0.5, text: "Câu c: nhận xét đúng xu thế tăng liên tục." }
            ] },
          { id: "d2e2", level: "kho", source: "SGK Bài tập cuối chương V – BT 5.20 (biến đổi)", maxPoints: 1.5,
            q: "Biểu đồ dưới đây cho biết số học sinh của hai trường X và Y:" + lineSchools +
               "a) Năm 2021 trường nào nhiều học sinh hơn, nhiều hơn bao nhiêu học sinh?<br>b) Từ năm nào số học sinh trường Y bắt đầu nhiều hơn trường X?<br>c) Nêu xu thế số học sinh của mỗi trường.",
            modelAnswer: "a) Năm 2021: trường X có $870$, trường Y có $820$ học sinh. Trường X nhiều hơn $870 - 820 = 50$ học sinh.<br>" +
                         "b) Năm 2022: X có $860$, Y có $870$ học sinh, nên từ năm 2022 trường Y nhiều học sinh hơn trường X (hai đường cắt nhau trong khoảng 2021–2022).<br>" +
                         "c) Trường X: tăng từ 2019 đến 2021 rồi giảm dần. Trường Y: tăng liên tục từ $700$ lên $920$ học sinh.",
            rubric: [
              { pts: 0.5, text: "Câu a: trường X, nhiều hơn $50$ học sinh." },
              { pts: 0.5, text: "Câu b: chỉ ra năm 2022 (có so sánh số liệu)." },
              { pts: 0.5, text: "Câu c: nêu đúng xu thế của cả hai trường." }
            ] }
        ] },

      /* ======================= ĐỀ 3 ======================= */
      { id: "d3", name: "Đề 3",
        mcq: [
          { id: "d3q1", level: "de", source: "SGK Bài 17",
            q: "Nhà trường phát cho mỗi học sinh một tờ giấy để đánh dấu vào môn thể thao mình yêu thích. Nhà trường đã thu thập dữ liệu bằng phương pháp nào?",
            options: ["Quan sát", "Lập phiếu hỏi", "Làm thí nghiệm", "Lấy từ sách báo có sẵn"],
            answer: 1,
            explain: "Tờ giấy có câu hỏi để học sinh tự đánh dấu là phiếu hỏi." },
          { id: "d3q2", level: "de", source: "SBT Ôn tập chương V – câu 4",
            q: "Trong biểu đồ hình quạt tròn, cả hình tròn biểu diễn",
            options: ["$50\\%$", "$360\\%$", "$100\\%$", "$75\\%$"],
            answer: 2,
            explain: "Cả hình tròn biểu diễn toàn thể, tức là $100\\%$ (góc ở tâm $360^\\circ$)." },
          { id: "d3q3", level: "de", source: "SGK Bài 17",
            q: "Dữ liệu nào sau đây <b>không phải là số</b> và <b>không thể sắp thứ tự</b>?",
            options: ["Cân nặng của các bạn trong lớp", "Loại vật nuôi trong nhà của mỗi bạn", "Mức độ yêu thích môn Văn (rất thích, thích, không thích)", "Số quyển sách mỗi bạn đọc trong tháng"],
            answer: 1,
            explain: "Tên loại vật nuôi (chó, mèo, gà…) không phải số và không có thứ tự cao thấp. Mức độ yêu thích thì sắp được thứ tự; cân nặng và số quyển sách là số liệu." },
          { id: "d3q4", level: "de", source: "SBT Ôn tập chương V – BT 5.31",
            q: "Biểu đồ dưới đây cho biết tỉ lệ học sinh THCS dùng mạng xã hội hằng ngày." + linePhone + "Tỉ lệ năm 2020 là",
            options: ["$24\\%$", "$38\\%$", "$45\\%$", "$30\\%$"],
            answer: 3,
            explain: "Điểm ứng với năm 2020 có giá trị $30$, tức $30\\%$." },
          { id: "d3q5", level: "vua", source: "SBT Ôn tập chương V – BT 5.30",
            q: "Biểu đồ dưới đây cho biết tỉ lệ các loại sách trong một thư viện có 1 500 cuốn." + pieBook + "Thư viện có bao nhiêu cuốn truyện?",
            options: ["$300$", "$450$", "$600$", "$150$"],
            answer: 1,
            explain: "Truyện chiếm $30\\%$: $\\frac{30}{100}\\cdot 1\\,500 = 450$ cuốn." },
          { id: "d3q6", level: "vua", source: "SGK Bài 19",
            q: "Biểu đồ dưới đây cho biết nhiệt độ ngoài trời trong một ngày." + lineTemp + "Chênh lệch giữa nhiệt độ cao nhất và thấp nhất trong các thời điểm đo là",
            options: ["$11^\\circ$C", "$9^\\circ$C", "$33^\\circ$C", "$7^\\circ$C"],
            answer: 0,
            explain: "Cao nhất $33^\\circ$C (15 h), thấp nhất $22^\\circ$C (6 h). Chênh lệch $33 - 22 = 11^\\circ$C." },
          { id: "d3q7", level: "vua", source: "SGK Bài 19",
            q: "Theo biểu đồ nhiệt độ ở câu trên, nhiệt độ <b>giảm</b> trong khoảng thời gian nào?",
            options: ["Từ 6 h đến 12 h", "Từ 9 h đến 15 h", "Từ 15 h đến 21 h", "Từ 6 h đến 9 h"],
            answer: 2,
            explain: "Từ 15 h ($33^\\circ$C) đến 18 h ($28^\\circ$C) rồi 21 h ($24^\\circ$C) đường đi xuống. Trước 15 h nhiệt độ tăng." },
          { id: "d3q8", level: "vua", source: "SBT Ôn tập chương V – câu 4",
            q: "Trong biểu đồ hình quạt tròn, khẳng định nào sau đây <b>không</b> đúng?",
            options: ["Hai hình quạt bằng nhau biểu diễn cùng một tỉ lệ", "Hình quạt lớn hơn biểu diễn tỉ lệ lớn hơn", "Cả hình tròn biểu diễn $75\\%$", "$\\frac{1}{4}$ hình tròn biểu diễn $25\\%$"],
            answer: 2,
            explain: "Cả hình tròn biểu diễn $100\\%$, không phải $75\\%$." },
          { id: "d3q9", level: "kho", source: "SBT Ôn tập chương V – BT 5.31",
            q: "Theo biểu đồ ở câu 4, năm 2022 một trường THCS có 800 học sinh. Ước lượng số học sinh của trường dùng mạng xã hội hằng ngày.",
            options: ["$360$", "$450$", "$304$", "$240$"],
            answer: 0,
            explain: "Năm 2022 tỉ lệ là $45\\%$: $\\frac{45}{100}\\cdot 800 = 360$ học sinh." },
          { id: "d3q10", level: "kho", source: "SBT Ôn tập chương V – BT 5.31",
            q: "Theo biểu đồ ở câu 4, năm nào tỉ lệ tăng <b>nhiều nhất</b> so với năm trước?",
            options: ["2019", "2020", "2022", "2021"],
            answer: 3,
            explain: "Mức tăng: 2019: $4\\%$; 2020: $6\\%$; 2021: $8\\%$; 2022: $7\\%$. Năm 2021 tăng nhiều nhất." },
          { id: "d3q11", level: "kho", source: "SBT Ôn tập chương V – BT 5.30",
            q: "Theo biểu đồ ở câu 5, số sách tham khảo nhiều hơn số báo, tạp chí bao nhiêu cuốn?",
            options: ["$150$", "$300$", "$10$", "$100$"],
            answer: 0,
            explain: "Tham khảo hơn báo, tạp chí $20\\% - 10\\% = 10\\%$ số sách, tức $\\frac{10}{100}\\cdot 1\\,500 = 150$ cuốn." }
        ],
        essay: [
          { id: "d3e1", level: "vua", source: "SBT Ôn tập chương V – BT 5.25 (biến đổi)", maxPoints: 1.5,
            q: "Tổ trưởng hỏi 20 bạn trong lớp về phương tiện đến trường và ghi lại (X: xe đạp, B: đi bộ, M: bố mẹ đưa):<br>" +
               "<b>X B X M X X B M X B X X M B X X B X M M</b><br>" +
               "a) Dữ liệu thu được thuộc loại nào?<br>b) Lập bảng thống kê số bạn theo từng phương tiện.<br>c) Tính tỉ lệ phần trăm của mỗi phương tiện (để vẽ biểu đồ hình quạt tròn).",
            modelAnswer: "a) Dữ liệu <b>không là số</b> và <b>không thể sắp thứ tự</b> (tên phương tiện).<br>" +
                         "b) Đếm: X có $10$, B có $5$, M có $5$ (tổng $20$).<br>" +
                         "<table><tr><th>Phương tiện</th><th>Xe đạp</th><th>Đi bộ</th><th>Bố mẹ đưa</th></tr><tr><td>Số bạn</td><td>10</td><td>5</td><td>5</td></tr></table>" +
                         "c) Xe đạp: $\\frac{10}{20}\\cdot 100\\% = 50\\%$; Đi bộ: $\\frac{5}{20}\\cdot 100\\% = 25\\%$; Bố mẹ đưa: $25\\%$.",
            rubric: [
              { pts: 0.5, text: "Câu a: xác định đúng loại dữ liệu." },
              { pts: 0.5, text: "Câu b: đếm đúng và lập bảng (10; 5; 5)." },
              { pts: 0.5, text: "Câu c: tính đúng $50\\%$; $25\\%$; $25\\%$." }
            ] },
          { id: "d3e2", level: "kho", source: "SBT Ôn tập chương V – BT 5.29 (biến đổi)", maxPoints: 1.5,
            q: "Biểu đồ dưới đây cho biết tỉ lệ học sinh bị cận thị của trường K:" + lineMyopia +
               "a) Nêu xu thế của tỉ lệ học sinh cận thị trong thời gian trên.<br>b) Năm 2023 trường K có 1 200 học sinh. Tính số học sinh bị cận thị.<br>c) Năm 2019 trường K có 1 100 học sinh. Số học sinh cận thị năm 2023 nhiều hơn năm 2019 bao nhiêu em?",
            modelAnswer: "a) Tỉ lệ học sinh cận thị <b>tăng liên tục</b> từ $18\\%$ (2019) lên $30\\%$ (2023).<br>" +
                         "b) Năm 2023: $\\frac{30}{100}\\cdot 1\\,200 = 360$ học sinh.<br>" +
                         "c) Năm 2019: $\\frac{18}{100}\\cdot 1\\,100 = 198$ học sinh. Nhiều hơn: $360 - 198 = 162$ học sinh.",
            rubric: [
              { pts: 0.5, text: "Câu a: nêu đúng xu thế tăng liên tục." },
              { pts: 0.5, text: "Câu b: tính đúng $360$ học sinh." },
              { pts: 0.5, text: "Câu c: tính đúng $198$ học sinh năm 2019 và chênh lệch $162$." }
            ] }
        ] }
    ]
  });
})();
