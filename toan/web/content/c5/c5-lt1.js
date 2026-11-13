(function () {
  // ---------- Hình vẽ SVG (dùng currentColor cho chữ để hợp chế độ sáng/tối) ----------
  var COLORS = ['#5fb98a', '#ef8a6f', '#f2c94c', '#6fa0e8', '#b48ad8', '#9aa5b1'];
  var fmt = function (v) { return String(v).replace('.', ','); };

  // Biểu đồ quạt tròn. o = { title, data: [[nhãn, phần trăm, "nhãn hiển thị" (tuỳ chọn)]] }
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
      s += '<text x="' + (cx + rr * Math.cos(am)).toFixed(1) + '" y="' + (cy + rr * Math.sin(am) + 4).toFixed(1) + '" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#1f2328">' + (d[2] || fmt(d[1]) + '%') + '</text>';
      a0 = a1;
    });
    o.data.forEach(function (d, i) {
      var y = 52 + i * 24;
      s += '<rect x="186" y="' + (y - 10) + '" width="12" height="12" fill="' + COLORS[i % COLORS.length] + '"/>';
      s += '<text x="204" y="' + y + '" font-size="12" fill="currentColor">' + d[0] + '</text>';
    });
    return s + '</svg>';
  }

  // Biểu đồ đoạn thẳng. o = { title, xs: [nhãn trục ngang], ys: [giá trị], yMin, yMax, step, yName, xName }
  function line(o) {
    var W = 340, H = 226, L = 46, R = 16, T = 32, B = 44;
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
    var pts = o.ys.map(function (v, i) { return X(i).toFixed(1) + ',' + Y(v).toFixed(1); }).join(' ');
    s += '<polyline points="' + pts + '" fill="none" stroke="#3b82c4" stroke-width="2.2"/>';
    o.ys.forEach(function (v, i) {
      s += '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(v).toFixed(1) + '" r="3.6" fill="#3b82c4"/>';
      s += '<text x="' + X(i).toFixed(1) + '" y="' + (Y(v) - 8).toFixed(1) + '" font-size="11" text-anchor="middle" fill="currentColor">' + fmt(v) + '</text>';
    });
    o.xs.forEach(function (x, i) {
      s += '<text x="' + X(i).toFixed(1) + '" y="' + (T + ph + 16) + '" font-size="11" text-anchor="middle" fill="currentColor">' + x + '</text>';
    });
    if (o.xName) s += '<text x="' + (W - R) + '" y="' + (H - 6) + '" font-size="11" text-anchor="end" fill="currentColor" font-style="italic">' + o.xName + '</text>';
    if (o.yName) s += '<text x="4" y="' + (T - 10) + '" font-size="11" fill="currentColor" font-style="italic">' + o.yName + '</text>';
    return s + '</svg>';
  }

  // ---------- Dữ liệu các hình ----------
  var pieEx = pie({ title: "Mức độ yêu thích môn Toán (40 HS)", data: [["Rất thích", 35], ["Thích", 40], ["Bình thường", 20], ["Không thích", 5]] });
  var lineEx = line({ title: "Nhiệt độ trung bình năm (°C)", xs: ["2017", "2018", "2019", "2020", "2021", "2022"], ys: [23.8, 24.1, 24.5, 24.2, 24.6, 24.9], yMin: 23.5, yMax: 25, step: 0.5, yName: "°C", xName: "Năm" });

  var pieSport = pie({ title: "Môn thể thao yêu thích của 40 HS lớp 7A", data: [["Bóng đá", 45], ["Cầu lông", 25], ["Bơi", 20], ["Cờ vua", 10]] });
  var lineRain = line({ title: "Lượng mưa tại một thành phố", xs: ["T1", "T2", "T3", "T4", "T5", "T6"], ys: [20, 35, 48, 90, 180, 240], yMin: 0, yMax: 250, step: 50, yName: "mm", xName: "Tháng" });
  var pieHealth = pie({ title: "Thể trạng học sinh THCS của một tỉnh", data: [["Béo phì", 15], ["Bình thường", 75], ["Còi xương", 10]] });
  var lineMuseum = line({ title: "Lượt khách tham quan bảo tàng", xs: ["2018", "2019", "2020", "2021", "2022"], ys: [52, 60, 24, 31, 58], yMin: 0, yMax: 70, step: 10, yName: "nghìn lượt", xName: "Năm" });
  var pieMath = pie({ title: "Mức độ yêu thích môn Toán (40 HS)", data: [["Rất thích", 35], ["Thích", 40], ["Bình thường", 20], ["Không thích", 5]] });

  var pieTrees = pie({ title: "Tỉ lệ các loại cây trong vườn trường", data: [["Bàng", 40], ["Phượng", 30], ["Xà cừ", 20], ["Sấu", 10]] });
  var pieMissing = pie({ title: "Thể loại sách được mượn nhiều", data: [["Truyện", 35], ["Khoa học", 28], ["Lịch sử", 22], ["Khác", 15, "?"]] });
  var lineGood = line({ title: "Số HS lớp 7A đạt điểm giỏi môn Toán", xs: ["T9", "T10", "T11", "T12", "T1"], ys: [8, 10, 9, 13, 15], yMin: 0, yMax: 16, step: 4, yName: "học sinh", xName: "Tháng" });
  var pieTransport = pie({ title: "Phương tiện đến trường của 1 200 HS", data: [["Xe đạp", 45], ["Đi bộ", 25], ["Xe buýt", 15], ["Bố mẹ đưa", 15]] });
  var lineFlu = line({ title: "Số ca cúm tại một phường", xs: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5", "Tuần 6"], ys: [12, 18, 25, 21, 14, 9], yMin: 0, yMax: 30, step: 5, yName: "ca", xName: "Tuần" });

  var pieFree = pie({ title: "Thời gian rảnh mỗi ngày của Nam", data: [["Đọc sách", 20], ["Thể thao", 35], ["Xem ti vi", 15], ["Học đàn", 30, "?"]] });
  var lineRice = line({ title: "Giá 1 kg gạo tại một chợ", xs: ["T1", "T2", "T3", "T4", "T5", "T6"], ys: [16, 17, 17, 19, 18, 20], yMin: 14, yMax: 21, step: 1, yName: "nghìn đồng", xName: "Tháng" });
  var lineShop = line({ title: "Doanh thu của một cửa hàng", xs: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"], ys: [120, 150, 135, 180], yMin: 0, yMax: 200, step: 50, yName: "triệu đồng", xName: "Quý" });
  var pieBus = pie({ title: "Phương tiện đến trường của 280 HS khối 7", data: [["Xe đạp", 40], ["Đi bộ", 25], ["Xe buýt", 20], ["Bố mẹ đưa", 15]] });
  var lineLib = line({ title: "Số lượt mượn sách ở thư viện", xs: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5"], ys: [45, 60, 52, 70, 83], yMin: 0, yMax: 90, step: 15, yName: "lượt", xName: "Tuần" });

  registerLesson({
    id: "c5-lt1",
    chapter: 5,
    kind: "review",
    title: "Luyện tập chung (Bài 17–19)",
    sgkPages: [106, 107],
    sbtPages: [75, 90],
    objectives: [
      "Phân loại dữ liệu: số liệu; dữ liệu không là số (có thể / không thể sắp thứ tự)",
      "Nhận biết phương pháp thu thập dữ liệu và tính đại diện của dữ liệu",
      "Đọc, phân tích biểu đồ hình quạt tròn; tính số lượng từ tỉ lệ phần trăm",
      "Đọc, phân tích biểu đồ đoạn thẳng; nhận xét xu hướng tăng, giảm",
      "Chọn loại biểu đồ phù hợp với dữ liệu"
    ],

    theory: [
      { heading: "1. Thu thập và phân loại dữ liệu",
        html: "<ul><li><b>Số liệu</b>: dữ liệu là số (chiều cao, cân nặng, điểm số, nhiệt độ…).</li>" +
              "<li><b>Dữ liệu không là số</b>: có loại <b>sắp được thứ tự</b> (mức độ: rất thích – thích – không thích; xếp loại Tốt – Khá – Đạt) và loại <b>không sắp được thứ tự</b> (tên, màu sắc, nơi sinh, phương tiện đến trường…).</li>" +
              "<li>Cách thu thập: quan sát, làm thí nghiệm, lập phiếu hỏi, phỏng vấn; hoặc lấy từ nguồn có sẵn (sách báo, Internet).</li>" +
              "<li>Muốn kết luận hợp lí, dữ liệu phải <b>đảm bảo tính đại diện</b> cho toàn bộ đối tượng quan tâm: không chỉ hỏi một nhóm riêng (chỉ bạn nam, chỉ câu lạc bộ…), mà nên chọn ngẫu nhiên.</li></ul>" },
      { heading: "2. Biểu đồ hình quạt tròn",
        html: "Biểu đồ hình quạt tròn biểu diễn tỉ lệ phần trăm của từng phần so với <b>toàn thể</b>; cả hình tròn ứng với $100\\%$ và tổng các phần bằng $100\\%$.<br>" +
              "Nếu tổng thể có $N$ đối tượng, phần chiếm $a\\%$ có $\\frac{a}{100}\\cdot N$ đối tượng. Mỗi $1\\%$ ứng với góc ở tâm $3{,}6^\\circ$." + pieEx },
      { heading: "3. Biểu đồ đoạn thẳng",
        html: "Biểu đồ đoạn thẳng biểu diễn sự <b>thay đổi của một đại lượng theo thời gian</b>. Trục ngang ghi thời điểm, trục đứng ghi giá trị; các điểm nối với nhau bằng đoạn thẳng.<br>" +
              "Đoạn đi lên: đại lượng tăng; đoạn đi xuống: đại lượng giảm; đoạn nằm ngang: không đổi." + lineEx }
    ],

    skills: [
      "Phân loại dữ liệu: hỏi \"có phải là số không?\" → nếu không, hỏi tiếp \"có xếp được từ thấp đến cao không?\".",
      "Đọc biểu đồ quạt tròn: số đối tượng $= \\frac{\\text{phần trăm}}{100}\\cdot$ tổng số. Phần trăm còn thiếu $= 100\\%$ trừ tổng các phần đã biết.",
      "Góc ở tâm của phần chiếm $a\\%$ là $a \\cdot 3{,}6^\\circ$; ngược lại, góc $\\alpha$ ứng với $\\frac{\\alpha}{3{,}6}\\%$ (ví dụ $90^\\circ$ ứng với $25\\%$).",
      "Đọc biểu đồ đoạn thẳng: tìm điểm cao nhất / thấp nhất; so sánh hai điểm liền nhau để biết tăng hay giảm, tăng (giảm) bao nhiêu.",
      "Chọn biểu đồ: so sánh các phần với toàn thể → quạt tròn; theo dõi sự thay đổi theo thời gian → đoạn thẳng.",
      "Lỗi hay gặp: quên nhân với tổng số khi đổi phần trăm ra số lượng; đọc nhầm nhãn trục; kết luận cho cả trường khi chỉ khảo sát một nhóm nhỏ không đại diện."
    ],

    examples: [
      { q: "Khảo sát 40 học sinh về mức độ yêu thích môn Toán, kết quả như biểu đồ ở mục 2. a) Dữ liệu thu được thuộc loại nào? b) Mỗi mức độ có bao nhiêu bạn chọn?",
        solution: "a) Dữ liệu không phải là số nhưng <b>có thể sắp thứ tự</b> (Không thích → Bình thường → Thích → Rất thích).<br>" +
                  "b) Rất thích: $\\frac{35}{100}\\cdot 40 = 14$ bạn; Thích: $\\frac{40}{100}\\cdot 40 = 16$ bạn; Bình thường: $\\frac{20}{100}\\cdot 40 = 8$ bạn; Không thích: $\\frac{5}{100}\\cdot 40 = 2$ bạn.<br>Kiểm tra: $14 + 16 + 8 + 2 = 40$." },
      { q: "Dựa vào biểu đồ nhiệt độ ở mục 3: năm nào nóng nhất, năm nào nhiệt độ giảm so với năm trước? Nêu xu hướng chung.",
        solution: "Điểm cao nhất ứng với năm 2022 ($24{,}9^\\circ$C). Từ 2019 ($24{,}5$) đến 2020 ($24{,}2$) đoạn thẳng đi xuống nên năm 2020 giảm. Nhìn chung từ 2017 đến 2022 nhiệt độ có <b>xu hướng tăng</b>." },
      { q: "Để biết thời gian ngủ của học sinh cả trường, bạn Hà hỏi các bạn trong câu lạc bộ cờ vua. Cách làm này có đảm bảo tính đại diện không?",
        solution: "Không. Các bạn trong câu lạc bộ cờ vua chỉ là một nhóm nhỏ, không đại diện cho toàn trường. Nên chọn ngẫu nhiên học sinh ở tất cả các khối, các lớp." }
    ],

    sets: [
      /* ======================= ĐỀ 1 ======================= */
      { id: "d1", name: "Đề 1",
        mcq: [
          { id: "d1q1", level: "de", source: "SGK Bài 17",
            q: "Dữ liệu nào sau đây là <b>số liệu</b>?",
            options: ["Màu sắc yêu thích của các bạn trong lớp", "Chiều cao (cm) của các bạn trong lớp", "Tên các môn thể thao được yêu thích", "Mức độ hài lòng (tốt, khá, chưa tốt) về bữa ăn bán trú"],
            answer: 1,
            explain: "Chiều cao đo bằng số (cm) nên là số liệu. Các dữ liệu còn lại không phải là số." },
          { id: "d1q2", level: "de", source: "SGK Luyện tập chung tr.107 – BT 5.14",
            q: "Dữ liệu nào sau đây <b>không phải là số</b> nhưng <b>có thể sắp thứ tự</b>?",
            options: ["Phương tiện các bạn dùng để đến trường", "Cân nặng (kg) của các bạn trong tổ", "Mức độ tập thể dục buổi sáng (rất thường xuyên, thường xuyên, không thường xuyên)", "Số anh chị em ruột của mỗi bạn"],
            answer: 2,
            explain: "Mức độ thường xuyên không là số nhưng xếp được từ thấp đến cao. Phương tiện không sắp thứ tự được; cân nặng và số anh chị em là số liệu." },
          { id: "d1q3", level: "de", source: "SGK Bài 17",
            q: "Để biết nhiệt độ cao nhất mỗi ngày trong tuần qua ở Hà Nội, Mai tra cứu trên một trang web dự báo thời tiết. Mai đã thu thập dữ liệu bằng cách nào?",
            options: ["Làm thí nghiệm", "Phỏng vấn", "Lập phiếu hỏi", "Lấy từ nguồn có sẵn (Internet)"],
            answer: 3,
            explain: "Dữ liệu có sẵn trên trang web, Mai chỉ tra cứu lại nên đó là thu thập từ nguồn có sẵn (Internet)." },
          { id: "d1q4", level: "de", source: "mới",
            q: "Biểu đồ dưới đây cho biết tỉ lệ học sinh lớp 7A chọn môn thể thao yêu thích. Môn nào được yêu thích nhất?" + pieSport,
            options: ["Bóng đá", "Cầu lông", "Bơi", "Cờ vua"],
            answer: 0,
            explain: "Phần Bóng đá chiếm $45\\%$, lớn nhất trong các phần." },
          { id: "d1q5", level: "vua", source: "SGK tr.106 – Ví dụ 1",
            q: "Lớp 7A có 40 học sinh (biểu đồ ở câu trước: Bóng đá $45\\%$, Cầu lông $25\\%$, Bơi $20\\%$, Cờ vua $10\\%$). Có bao nhiêu bạn thích cầu lông?",
            options: ["$25$ bạn", "$15$ bạn", "$10$ bạn", "$8$ bạn"],
            answer: 2,
            explain: "$\\frac{25}{100}\\cdot 40 = 10$ (bạn)." },
          { id: "d1q6", level: "vua", source: "SBT Bài 19",
            q: "Biểu đồ dưới đây cho biết lượng mưa 6 tháng đầu năm tại một thành phố. Lượng mưa tháng nào tăng <b>nhiều nhất</b> so với tháng liền trước?" + lineRain,
            options: ["Tháng 4", "Tháng 6", "Tháng 3", "Tháng 5"],
            answer: 3,
            explain: "Mức tăng: T2: $15$; T3: $13$; T4: $42$; T5: $180 - 90 = 90$; T6: $60$ (mm). Tăng nhiều nhất là tháng 5." },
          { id: "d1q7", level: "vua", source: "SGK tr.107 – Ví dụ 2",
            q: "Theo biểu đồ lượng mưa ở câu trước, từ tháng 1 đến tháng 6 lượng mưa có xu hướng thế nào?",
            options: ["Tăng", "Giảm", "Không thay đổi", "Lúc tăng lúc giảm xen kẽ"],
            answer: 0,
            explain: "Các đoạn thẳng đều đi lên ($20 \\to 35 \\to 48 \\to 90 \\to 180 \\to 240$) nên lượng mưa tăng dần." },
          { id: "d1q8", level: "vua", source: "SGK Luyện tập chung tr.107 – BT 5.15",
            q: "Để tìm hiểu thời gian ngủ của học sinh khối 7, cách thu thập nào sau đây <b>đảm bảo tính đại diện</b>?",
            options: ["Hỏi các bạn trong đội tuyển Toán của khối 7", "Hỏi các bạn nam lớp 7A", "Chọn ngẫu nhiên ở mỗi lớp 7 một số bạn để hỏi", "Hỏi các bạn đến thư viện vào buổi tối"],
            answer: 2,
            explain: "Chọn ngẫu nhiên ở tất cả các lớp 7 mới đại diện cho cả khối. Các cách còn lại chỉ hỏi một nhóm riêng." },
          { id: "d1q9", level: "kho", source: "SGK Bài 18",
            q: "Trong biểu đồ hình quạt tròn, phần biểu diễn $20\\%$ có góc ở tâm bằng",
            options: ["$20^\\circ$", "$72^\\circ$", "$36^\\circ$", "$60^\\circ$"],
            answer: 1,
            explain: "Cả hình tròn $360^\\circ$ ứng với $100\\%$, nên $1\\%$ ứng với $3{,}6^\\circ$. Phần $20\\%$ có góc $20 \\cdot 3{,}6^\\circ = 72^\\circ$." },
          { id: "d1q10", level: "kho", source: "SGK Luyện tập chung tr.107 – BT 5.16",
            q: "Biểu đồ dưới đây cho biết thể trạng học sinh THCS của một tỉnh. Một trường THCS của tỉnh có $1\\,200$ học sinh. Ước lượng số học sinh béo phì của trường đó." + pieHealth,
            options: ["$180$ học sinh", "$15$ học sinh", "$120$ học sinh", "$900$ học sinh"],
            answer: 0,
            explain: "Béo phì chiếm $15\\%$: $\\frac{15}{100}\\cdot 1\\,200 = 180$ (học sinh). ($120$ là $10\\%$ – còi xương; $900$ là $75\\%$ – bình thường.)" },
          { id: "d1q11", level: "kho", source: "SBT Bài 19 – BT 5.18",
            q: "Biểu đồ dưới đây cho biết số lượt khách tham quan một bảo tàng. Khẳng định nào sau đây là <b>sai</b>?" + lineMuseum,
            options: ["Năm 2020 có ít khách nhất", "Từ 2019 đến 2020 số khách giảm $36$ nghìn lượt", "Năm 2019 có nhiều khách nhất", "Số khách năm 2022 gấp đôi năm 2021"],
            answer: 3,
            explain: "$31 \\cdot 2 = 62 \\ne 58$ nên số khách năm 2022 không gấp đôi năm 2021. Các khẳng định khác đúng: $24$ nhỏ nhất, $60$ lớn nhất, $60 - 24 = 36$." }
        ],
        essay: [
          { id: "d1e1", level: "vua", source: "SGK tr.106 – Ví dụ 1 (biến đổi)", maxPoints: 1.5,
            q: "Khảo sát 40 học sinh về mức độ yêu thích môn Toán, kết quả cho bởi biểu đồ sau." + pieMath +
               "a) Dữ liệu thu được thuộc loại nào?<br>b) Tính số học sinh chọn mỗi mức độ.",
            modelAnswer: "a) Dữ liệu không phải là số, có thể sắp thứ tự (Không thích → Bình thường → Thích → Rất thích).<br>" +
                         "b) Rất thích: $\\frac{35}{100}\\cdot 40 = 14$; Thích: $\\frac{40}{100}\\cdot 40 = 16$; Bình thường: $\\frac{20}{100}\\cdot 40 = 8$; Không thích: $\\frac{5}{100}\\cdot 40 = 2$ (học sinh).<br>Kiểm tra: $14 + 16 + 8 + 2 = 40$.",
            rubric: [
              { pts: 0.5, text: "Câu a: dữ liệu không là số, có thể sắp thứ tự." },
              { pts: 1, text: "Câu b: tính đúng đủ 4 mức $14;\\ 16;\\ 8;\\ 2$ (mỗi mức 0,25 điểm)." }
            ] },
          { id: "d1e2", level: "kho", source: "SGK Luyện tập chung tr.107 – BT 5.17 (biến đổi)", maxPoints: 1.5,
            q: "Nhiệt độ trung bình năm ($^\\circ$C) của một thành phố được cho bởi biểu đồ sau." + lineEx +
               "a) Năm nào có nhiệt độ cao nhất, năm nào thấp nhất?<br>b) Năm nào nhiệt độ giảm so với năm trước?<br>c) Nêu xu hướng thay đổi nhiệt độ từ 2017 đến 2022.",
            modelAnswer: "a) Cao nhất: năm 2022 ($24{,}9^\\circ$C); thấp nhất: năm 2017 ($23{,}8^\\circ$C).<br>" +
                         "b) Năm 2020: $24{,}2 < 24{,}5$ (năm 2019), đoạn thẳng đi xuống.<br>" +
                         "c) Nhìn chung nhiệt độ có xu hướng tăng (từ $23{,}8$ lên $24{,}9^\\circ$C), chỉ giảm nhẹ năm 2020.",
            rubric: [
              { pts: 0.5, text: "Câu a: đúng năm 2022 cao nhất và năm 2017 thấp nhất." },
              { pts: 0.5, text: "Câu b: chỉ ra năm 2020." },
              { pts: 0.5, text: "Câu c: nêu được xu hướng tăng." }
            ] }
        ] },

      /* ======================= ĐỀ 2 ======================= */
      { id: "d2", name: "Đề 2",
        mcq: [
          { id: "d2q1", level: "de", source: "SGK Bài 17",
            q: "Dữ liệu nào sau đây <b>không phải là số</b>?",
            options: ["Điểm kiểm tra môn Toán", "Thời gian chạy $100$ m (giây)", "Số sách mỗi bạn đọc trong tháng", "Nơi sinh của các bạn trong lớp"],
            answer: 3,
            explain: "Nơi sinh là tên địa danh, không phải là số. Ba dữ liệu còn lại là số liệu." },
          { id: "d2q2", level: "de", source: "SGK Bài 17",
            q: "Để biết món ăn sáng yêu thích của các bạn, Lan phát cho mỗi bạn một tờ giấy ghi câu hỏi kèm các lựa chọn để đánh dấu. Lan đã thu thập dữ liệu bằng cách nào?",
            options: ["Lập phiếu hỏi", "Quan sát", "Làm thí nghiệm", "Lấy từ sách báo"],
            answer: 0,
            explain: "Tờ giấy có câu hỏi và các lựa chọn là phiếu hỏi." },
          { id: "d2q3", level: "de", source: "SGK Bài 17",
            q: "Dữ liệu về xếp loại học tập (Tốt, Khá, Đạt, Chưa đạt) thuộc loại nào?",
            options: ["Số liệu", "Không phải là số, không thể sắp thứ tự", "Không phải là số, có thể sắp thứ tự", "Vừa là số liệu, vừa không là số"],
            answer: 2,
            explain: "Xếp loại là chữ, không phải số, nhưng xếp được thứ tự: Chưa đạt → Đạt → Khá → Tốt." },
          { id: "d2q4", level: "de", source: "mới",
            q: "Biểu đồ dưới đây cho biết tỉ lệ các loại cây trong vườn trường. Loại cây nào ít nhất?" + pieTrees,
            options: ["Bàng", "Sấu", "Xà cừ", "Phượng"],
            answer: 1,
            explain: "Sấu chiếm $10\\%$, nhỏ nhất." },
          { id: "d2q5", level: "vua", source: "SGK tr.106 – Ví dụ 1",
            q: "Vườn trường ở câu trước có tất cả $60$ cây (Bàng $40\\%$, Phượng $30\\%$, Xà cừ $20\\%$, Sấu $10\\%$). Số cây phượng là",
            options: ["$30$ cây", "$20$ cây", "$18$ cây", "$24$ cây"],
            answer: 2,
            explain: "$\\frac{30}{100}\\cdot 60 = 18$ (cây). ($24$ là số cây bàng.)" },
          { id: "d2q6", level: "vua", source: "SBT Bài 18",
            q: "Biểu đồ dưới đây cho biết tỉ lệ các thể loại sách được mượn ở thư viện, trong đó phần \"Khác\" bị che (?). Phần \"Khác\" chiếm bao nhiêu phần trăm?" + pieMissing,
            options: ["$15\\%$", "$25\\%$", "$10\\%$", "$20\\%$"],
            answer: 0,
            explain: "$100\\% - (35\\% + 28\\% + 22\\%) = 100\\% - 85\\% = 15\\%$." },
          { id: "d2q7", level: "vua", source: "SBT Bài 19",
            q: "Biểu đồ dưới đây cho biết số học sinh lớp 7A đạt điểm giỏi môn Toán qua các tháng. Tháng nào số học sinh đạt điểm giỏi <b>giảm</b> so với tháng trước?" + lineGood,
            options: ["Tháng 10", "Tháng 12", "Tháng 1", "Tháng 11"],
            answer: 3,
            explain: "Tháng 10 có $10$ bạn, tháng 11 có $9$ bạn: đoạn thẳng đi xuống. Các tháng khác đều tăng." },
          { id: "d2q8", level: "vua", source: "SBT Bài 19",
            q: "Theo biểu đồ ở câu trước, từ tháng 9 đến tháng 1, số học sinh đạt điểm giỏi tăng thêm bao nhiêu bạn?",
            options: ["$5$ bạn", "$7$ bạn", "$15$ bạn", "$6$ bạn"],
            answer: 1,
            explain: "Tháng 9: $8$ bạn; tháng 1: $15$ bạn. Tăng $15 - 8 = 7$ (bạn)." },
          { id: "d2q9", level: "vua", source: "SGK Luyện tập chung tr.107 – BT 5.15",
            q: "Cách thu thập dữ liệu nào sau đây <b>không</b> đảm bảo tính đại diện?",
            options: ["Để biết chiều cao học sinh khối 7, chọn ngẫu nhiên mỗi lớp 7 năm bạn để đo", "Để biết sức bật cao của học sinh khối 7, chỉ cho các bạn trong câu lạc bộ bóng rổ bật cao", "Để biết ý kiến học sinh về quy định mới, chọn ngẫu nhiên học sinh các khối để hỏi", "Để biết thời gian tự học của lớp 7B, hỏi lần lượt từng bạn của lớp 7B"],
            answer: 1,
            explain: "Các bạn chơi bóng rổ thường bật cao hơn hẳn, nên kết quả không đại diện cho cả khối 7." },
          { id: "d2q10", level: "kho", source: "SGK Bài 18",
            q: "Trong một biểu đồ hình quạt tròn, một phần có góc ở tâm bằng $90^\\circ$. Phần đó biểu diễn bao nhiêu phần trăm?",
            options: ["$90\\%$", "$9\\%$", "$25\\%$", "$30\\%$"],
            answer: 2,
            explain: "$90^\\circ$ là $\\frac{90}{360} = \\frac{1}{4}$ hình tròn, tức $25\\%$ (hoặc $90 : 3{,}6 = 25$)." },
          { id: "d2q11", level: "kho", source: "SGK Luyện tập chung tr.107 – BT 5.16 (biến đổi)",
            q: "Biểu đồ dưới đây cho biết phương tiện đến trường của $1\\,200$ học sinh một trường. Số học sinh đi xe đạp nhiều hơn số học sinh đi bộ là bao nhiêu?" + pieTransport,
            options: ["$20$ học sinh", "$300$ học sinh", "$540$ học sinh", "$240$ học sinh"],
            answer: 3,
            explain: "Xe đạp $45\\%$, đi bộ $25\\%$: chênh lệch $20\\%$. $\\frac{20}{100}\\cdot 1\\,200 = 240$ (học sinh). (Hoặc $540 - 300 = 240$.)" }
        ],
        essay: [
          { id: "d2e1", level: "vua", source: "SBT Bài 19 – BT 5.18 (biến đổi)", maxPoints: 1.5,
            q: "Số ca mắc cúm tại một phường trong 6 tuần được cho bởi biểu đồ sau." + lineFlu +
               "a) Tuần nào có nhiều ca mắc nhất, bao nhiêu ca?<br>b) Từ tuần nào đến tuần nào số ca mắc giảm liên tục?<br>c) Tính tổng số ca mắc trong 6 tuần.",
            modelAnswer: "a) Tuần 3, với $25$ ca.<br>" +
                         "b) Từ tuần 3 đến tuần 6 số ca giảm liên tục: $25 \\to 21 \\to 14 \\to 9$.<br>" +
                         "c) $12 + 18 + 25 + 21 + 14 + 9 = 99$ (ca).",
            rubric: [
              { pts: 0.5, text: "Câu a: tuần 3, $25$ ca." },
              { pts: 0.5, text: "Câu b: từ tuần 3 đến tuần 6." },
              { pts: 0.5, text: "Câu c: tổng $99$ ca." }
            ] },
          { id: "d2e2", level: "kho", source: "SGK Luyện tập chung tr.107 – BT 5.15 (biến đổi)", maxPoints: 1.5,
            q: "Để biết môn thể thao được yêu thích nhất của học sinh cả trường:<br>• Hùng hỏi ý kiến các bạn trong đội bóng đá của trường.<br>• Minh chọn ngẫu nhiên mỗi lớp 5 bạn để hỏi.<br>a) Cách của bạn nào đảm bảo tính đại diện? Giải thích.<br>b) Từ kết quả của mình, Hùng kết luận: \"Bóng đá là môn được yêu thích nhất trường\". Kết luận này có hợp lí không? Vì sao?",
            modelAnswer: "a) Cách của Minh đảm bảo tính đại diện vì chọn ngẫu nhiên ở tất cả các lớp. Cách của Hùng không đảm bảo vì chỉ hỏi các bạn đội bóng đá – một nhóm đương nhiên thích bóng đá.<br>" +
                         "b) Không hợp lí: dữ liệu của Hùng không đại diện cho học sinh cả trường nên không thể kết luận chung cho cả trường.",
            rubric: [
              { pts: 0.5, text: "Câu a: chọn đúng cách của Minh." },
              { pts: 0.5, text: "Câu a: giải thích vì sao cách của Hùng không đại diện." },
              { pts: 0.5, text: "Câu b: kết luận không hợp lí, có lí do." }
            ] }
        ] },

      /* ======================= ĐỀ 3 ======================= */
      { id: "d3", name: "Đề 3",
        mcq: [
          { id: "d3q1", level: "de", source: "SGK Bài 17",
            q: "Dữ liệu nào sau đây <b>không phải là số</b> và <b>không thể sắp thứ tự</b>?",
            options: ["Tên các loài hoa yêu thích của các bạn", "Mức độ yêu thích môn Văn (rất thích, thích, không thích)", "Số giờ ngủ mỗi đêm", "Nhiệt độ cao nhất trong ngày"],
            answer: 0,
            explain: "Tên loài hoa không là số và không có thứ tự cao thấp. Mức độ yêu thích sắp được thứ tự; số giờ ngủ, nhiệt độ là số liệu." },
          { id: "d3q2", level: "de", source: "SGK Bài 17",
            q: "Một phóng viên hỏi trực tiếp 10 người đi đường về ý kiến của họ đối với tuyến xe buýt mới. Phóng viên đã thu thập dữ liệu bằng cách nào?",
            options: ["Lập phiếu hỏi", "Làm thí nghiệm", "Phỏng vấn", "Lấy từ Internet"],
            answer: 2,
            explain: "Hỏi trực tiếp và ghi lại câu trả lời là phỏng vấn." },
          { id: "d3q3", level: "de", source: "SGK Bài 19",
            q: "Biểu đồ đoạn thẳng thích hợp nhất để",
            options: ["so sánh từng phần với toàn thể", "biểu diễn tỉ lệ phần trăm các phần của một tổng thể", "liệt kê tên các đối tượng", "biểu diễn sự thay đổi của một đại lượng theo thời gian"],
            answer: 3,
            explain: "Biểu đồ đoạn thẳng dùng để theo dõi sự thay đổi (tăng, giảm) của đại lượng theo thời gian. So sánh phần với toàn thể dùng biểu đồ quạt tròn." },
          { id: "d3q4", level: "de", source: "SBT Bài 18",
            q: "Biểu đồ dưới đây cho biết tỉ lệ thời gian rảnh mỗi ngày Nam dành cho các hoạt động; phần \"Học đàn\" bị che (?). Phần đó chiếm bao nhiêu phần trăm?" + pieFree,
            options: ["$25\\%$", "$30\\%$", "$35\\%$", "$20\\%$"],
            answer: 1,
            explain: "$100\\% - (20\\% + 35\\% + 15\\%) = 100\\% - 70\\% = 30\\%$." },
          { id: "d3q5", level: "vua", source: "SGK tr.106 – Ví dụ 1",
            q: "Mỗi ngày Nam có $4$ giờ rảnh (biểu đồ ở câu trước: Đọc sách $20\\%$, Thể thao $35\\%$, Xem ti vi $15\\%$, Học đàn $30\\%$). Thời gian Nam chơi thể thao mỗi ngày là bao nhiêu phút?",
            options: ["$35$ phút", "$140$ phút", "$84$ phút", "$72$ phút"],
            answer: 2,
            explain: "$4$ giờ $= 240$ phút. $\\frac{35}{100}\\cdot 240 = 84$ (phút)." },
          { id: "d3q6", level: "vua", source: "SBT Bài 19",
            q: "Biểu đồ dưới đây cho biết giá 1 kg gạo tại một chợ trong 6 tháng. Tháng nào giá gạo <b>không thay đổi</b> so với tháng trước?" + lineRice,
            options: ["Tháng 3", "Tháng 2", "Tháng 5", "Tháng 6"],
            answer: 0,
            explain: "Tháng 2 và tháng 3 đều $17$ nghìn đồng: đoạn thẳng nằm ngang." },
          { id: "d3q7", level: "vua", source: "SBT Bài 19",
            q: "Theo biểu đồ ở câu trước, giá gạo cao nhất hơn giá gạo thấp nhất bao nhiêu nghìn đồng (mỗi kg)?",
            options: ["$2$", "$3$", "$5$", "$4$"],
            answer: 3,
            explain: "Cao nhất $20$ (tháng 6), thấp nhất $16$ (tháng 1): $20 - 16 = 4$ (nghìn đồng)." },
          { id: "d3q8", level: "vua", source: "SGK Bài 18",
            q: "Để biểu diễn tỉ lệ phần trăm các loại sách (truyện, khoa học, lịch sử, khác) trong thư viện, nên dùng loại biểu đồ nào?",
            options: ["Biểu đồ đoạn thẳng", "Biểu đồ hình quạt tròn", "Bảng tên các cuốn sách", "Không dùng biểu đồ được"],
            answer: 1,
            explain: "Biểu diễn các phần so với toàn thể (theo phần trăm) dùng biểu đồ hình quạt tròn." },
          { id: "d3q9", level: "vua", source: "SBT Bài 17",
            q: "Bảng tỉ lệ học sinh chọn môn học yêu thích (mỗi bạn chọn đúng một môn): Toán $35\\%$, Văn $25\\%$, Tiếng Anh $30\\%$, Môn khác $15\\%$. Khẳng định nào sau đây đúng?",
            options: ["Bảng hợp lí, Toán được chọn nhiều nhất", "Bảng hợp lí vì có đủ bốn môn", "Bảng chưa hợp lí vì tổng các tỉ lệ là $105\\%$", "Bảng chưa hợp lí vì Văn ít hơn Tiếng Anh"],
            answer: 2,
            explain: "$35 + 25 + 30 + 15 = 105 \\ne 100$, nên dữ liệu chưa hợp lí (mỗi bạn chỉ chọn một môn thì tổng phải là $100\\%$)." },
          { id: "d3q10", level: "kho", source: "SGK Bài 18",
            q: "Lớp 7B có $36$ học sinh. Trong biểu đồ hình quạt tròn biểu diễn môn thể thao yêu thích của lớp, phần \"Bơi\" có góc ở tâm $120^\\circ$. Số học sinh thích bơi là",
            options: ["$12$ bạn", "$10$ bạn", "$120$ bạn", "$18$ bạn"],
            answer: 0,
            explain: "$120^\\circ$ là $\\frac{120}{360} = \\frac{1}{3}$ hình tròn. Số bạn thích bơi: $\\frac{1}{3}\\cdot 36 = 12$." },
          { id: "d3q11", level: "kho", source: "mới",
            q: "Biểu đồ dưới đây cho biết doanh thu của một cửa hàng theo quý. Doanh thu quý 4 tăng khoảng bao nhiêu phần trăm so với quý 3?" + lineShop,
            options: ["$45\\%$", "$25\\%$", "$50\\%$", "$33{,}3\\%$"],
            answer: 3,
            explain: "Tăng $180 - 135 = 45$ (triệu đồng). So với quý 3: $\\frac{45}{135}\\cdot 100\\% \\approx 33{,}3\\%$. ($25\\%$ là $\\frac{45}{180}$ – chia nhầm cho quý 4.)" }
        ],
        essay: [
          { id: "d3e1", level: "vua", source: "SGK Luyện tập chung tr.107 – BT 5.16 (biến đổi)", maxPoints: 1.5,
            q: "Khối 7 của một trường có $280$ học sinh. Phương tiện đến trường của các bạn cho bởi biểu đồ sau." + pieBus +
               "a) Dữ liệu \"phương tiện đến trường\" thuộc loại nào?<br>b) Tính số học sinh dùng mỗi loại phương tiện.<br>c) Số học sinh đi xe đạp gấp mấy lần số học sinh đi xe buýt?",
            modelAnswer: "a) Dữ liệu không phải là số và không thể sắp thứ tự.<br>" +
                         "b) Xe đạp: $\\frac{40}{100}\\cdot 280 = 112$; Đi bộ: $\\frac{25}{100}\\cdot 280 = 70$; Xe buýt: $\\frac{20}{100}\\cdot 280 = 56$; Bố mẹ đưa: $\\frac{15}{100}\\cdot 280 = 42$ (học sinh). Kiểm tra: $112 + 70 + 56 + 42 = 280$.<br>" +
                         "c) $112 : 56 = 2$. Số học sinh đi xe đạp gấp $2$ lần số học sinh đi xe buýt.",
            rubric: [
              { pts: 0.5, text: "Câu a: không phải là số, không sắp thứ tự được." },
              { pts: 0.5, text: "Câu b: tính đúng $112;\\ 70;\\ 56;\\ 42$." },
              { pts: 0.5, text: "Câu c: gấp $2$ lần." }
            ] },
          { id: "d3e2", level: "kho", source: "SGK tr.107 – Ví dụ 2 (biến đổi)", maxPoints: 1.5,
            q: "Số lượt mượn sách ở thư viện trường trong 5 tuần cho bởi biểu đồ sau." + lineLib +
               "a) Tuần nào có nhiều lượt mượn nhất? Tuần nào số lượt mượn giảm so với tuần trước?<br>b) Tính tổng số lượt mượn trong 5 tuần.<br>c) Nhận xét xu hướng số lượt mượn sách.",
            modelAnswer: "a) Nhiều nhất: tuần 5 ($83$ lượt). Tuần 3 giảm so với tuần 2 ($52 < 60$).<br>" +
                         "b) $45 + 60 + 52 + 70 + 83 = 310$ (lượt).<br>" +
                         "c) Nhìn chung số lượt mượn có xu hướng tăng (từ $45$ lên $83$), chỉ giảm ở tuần 3.",
            rubric: [
              { pts: 0.5, text: "Câu a: tuần 5 nhiều nhất và tuần 3 giảm." },
              { pts: 0.5, text: "Câu b: tổng $310$ lượt." },
              { pts: 0.5, text: "Câu c: nêu xu hướng tăng." }
            ] }
        ] }
    ]
  });
})();
