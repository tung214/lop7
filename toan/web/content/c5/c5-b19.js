(function () {
  // ---------- Hình vẽ ----------
  // Số thập phân kiểu Việt Nam (dấu phẩy)
  function fmt(v) { return String(v).replace('.', ','); }

  // Vẽ biểu đồ đoạn thẳng bằng SVG (chữ, trục dùng currentColor để hợp chế độ sáng/tối).
  // o = { title, xs: [nhãn trục ngang], series: [{ name, data: [...], color, below: bool | [bool...] }],
  //       yMin, yMax, yStep, xLabel, yLabel, values: true/false (ghi giá trị tại điểm), w, h }
  function line(o) {
    var W = o.w || 360, multi = o.series.length > 1;
    var H = o.h || (multi ? 262 : 240);
    var L = 48, R = 14, T = 34, B = multi ? 66 : 46;
    var n = o.xs.length, pw = W - L - R, ph = H - T - B;
    var X = function (i) { return (L + pw * (i + 0.5) / n).toFixed(1); };
    var Y = function (v) { return (T + ph * (1 - (v - o.yMin) / (o.yMax - o.yMin))).toFixed(1); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:6px auto" role="img" aria-label="' + (o.title || 'Biểu đồ đoạn thẳng') + '">';
    if (o.title) s += '<text x="' + (W / 2) + '" y="16" font-size="13" font-weight="bold" text-anchor="middle" fill="currentColor">' + o.title + '</text>';
    var steps = Math.round((o.yMax - o.yMin) / o.yStep);
    for (var k = 0; k <= steps; k++) {
      var v = Math.round((o.yMin + k * o.yStep) * 1000) / 1000, yy = Y(v);
      s += '<line x1="' + L + '" y1="' + yy + '" x2="' + (W - R) + '" y2="' + yy + '" stroke="currentColor" stroke-opacity="' + (k ? 0.18 : 0.9) + '" stroke-width="1"/>';
      s += '<text x="' + (L - 5) + '" y="' + (+yy + 4) + '" font-size="11" text-anchor="end" fill="currentColor">' + fmt(v) + '</text>';
    }
    s += '<line x1="' + L + '" y1="' + (T - 6) + '" x2="' + L + '" y2="' + Y(o.yMin) + '" stroke="currentColor" stroke-width="1.2"/>';
    o.xs.forEach(function (x, i) {
      s += '<line x1="' + X(i) + '" y1="' + Y(o.yMin) + '" x2="' + X(i) + '" y2="' + (+Y(o.yMin) + 4) + '" stroke="currentColor"/>';
      s += '<text x="' + X(i) + '" y="' + (T + ph + 16) + '" font-size="11" text-anchor="middle" fill="currentColor">' + x + '</text>';
    });
    if (o.xLabel) s += '<text x="' + (L + pw / 2) + '" y="' + (T + ph + 33) + '" font-size="11" font-style="italic" text-anchor="middle" fill="currentColor">' + o.xLabel + '</text>';
    if (o.yLabel) s += '<text transform="translate(11 ' + (T + ph / 2) + ') rotate(-90)" font-size="11" font-style="italic" text-anchor="middle" fill="currentColor">' + o.yLabel + '</text>';
    o.series.forEach(function (sr) {
      var c = sr.color || '#3b82f6';
      s += '<polyline points="' + sr.data.map(function (v, i) { return X(i) + ',' + Y(v); }).join(' ') + '" fill="none" stroke="' + c + '" stroke-width="2.2"/>';
      sr.data.forEach(function (v, i) {
        s += '<circle cx="' + X(i) + '" cy="' + Y(v) + '" r="3.6" fill="' + c + '"/>';
        if (o.values !== false) {
          var below = Array.isArray(sr.below) ? sr.below[i] : sr.below;
          s += '<text x="' + X(i) + '" y="' + (+Y(v) + (below ? 15 : -7)) + '" font-size="10.5" font-weight="bold" text-anchor="middle" fill="' + c + '">' + fmt(v) + '</text>';
        }
      });
    });
    if (multi) {
      var lx = L, ly = H - 9;
      o.series.forEach(function (sr) {
        var c = sr.color || '#3b82f6';
        s += '<line x1="' + lx + '" y1="' + (ly - 4) + '" x2="' + (lx + 18) + '" y2="' + (ly - 4) + '" stroke="' + c + '" stroke-width="2.2"/>';
        s += '<circle cx="' + (lx + 9) + '" cy="' + (ly - 4) + '" r="3.2" fill="' + c + '"/>';
        s += '<text x="' + (lx + 23) + '" y="' + ly + '" font-size="11" fill="currentColor">' + sr.name + '</text>';
        lx += 30 + sr.name.length * 6.2;
      });
    }
    return s + '</svg>';
  }

  // Bảng số liệu 2 dòng: tbl("Năm", [...], "Số dân", [...])
  function tbl(h1, r1, h2, r2) {
    var td = function (x) { return '<td>' + fmt(x) + '</td>'; };
    return '<table><tr><th>' + h1 + '</th>' + r1.map(td).join('') + '</tr><tr><th>' + h2 + '</th>' + r2.map(td).join('') + '</tr></table>';
  }

  // Câu trắc nghiệm: opts[0] là đáp án ĐÚNG; `pos` là vị trí đặt đáp án đúng (0..3) để rải đều A/B/C/D.
  function mc(id, level, source, q, opts, pos, explain) {
    var o = opts.slice(), t = o[0]; o[0] = o[pos]; o[pos] = t;
    return { id: id, level: level, source: source, q: q, options: o, answer: pos, explain: explain };
  }

  var BLUE = '#3b82f6', RED = '#e5484d', GREEN = '#16a34a';

  // ---------- Biểu đồ dùng trong bài ----------
  var H_CAY = line({ title: 'Số cây xanh trường trồng được', xs: ['2019', '2020', '2021', '2022', '2023'],
    series: [{ data: [120, 150, 145, 190, 230], color: BLUE }], yMin: 0, yMax: 250, yStep: 50, xLabel: 'Năm', yLabel: 'Số cây' });
  var H_NGO = line({ title: 'Chiều cao cây ngô', xs: ['1', '2', '3', '4', '5'],
    series: [{ data: [4, 7, 12, 20, 31], color: GREEN }], yMin: 0, yMax: 35, yStep: 5, xLabel: 'Tuần', yLabel: 'Chiều cao (cm)' });
  var H_XE = line({ title: 'Số xe máy bán được của một cửa hàng', xs: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    series: [{ name: 'Xe máy xăng', data: [60, 52, 45, 40, 32, 25], color: RED, below: [false, false, false, false, true, true] },
             { name: 'Xe máy điện', data: [10, 15, 22, 30, 38, 46], color: BLUE, below: [true, true, true, true, false, false] }],
    yMin: 0, yMax: 70, yStep: 10, xLabel: 'Tháng', yLabel: 'Số xe' });
  var H_NHIET = line({ title: 'Nhiệt độ trong ngày', xs: ['6', '9', '12', '15', '18', '21'],
    series: [{ data: [22, 26, 31, 33, 28, 24], color: RED }], yMin: 0, yMax: 35, yStep: 5, xLabel: 'Giờ', yLabel: 'Nhiệt độ (°C)' });
  var H_CAO_P = line({ title: 'Biểu đồ P', xs: ['2019', '2020', '2021', '2022', '2023'], w: 300, h: 200,
    series: [{ data: [148, 149, 150.5, 151, 152], color: BLUE }], yMin: 0, yMax: 160, yStep: 40, xLabel: 'Năm', yLabel: 'cm', values: false });
  var H_CAO_Q = line({ title: 'Biểu đồ Q', xs: ['2019', '2020', '2021', '2022', '2023'], w: 300, h: 200,
    series: [{ data: [148, 149, 150.5, 151, 152], color: BLUE }], yMin: 147, yMax: 153, yStep: 1, xLabel: 'Năm', yLabel: 'cm', values: false });

  // Đề 1
  var C1 = line({ title: 'Số lượt mượn sách của thư viện trường', xs: ['T9', 'T10', 'T11', 'T12', 'T1'],
    series: [{ data: [120, 150, 135, 180, 95], color: BLUE }], yMin: 0, yMax: 200, yStep: 50, xLabel: 'Tháng', yLabel: 'Số lượt' });
  var C2 = line({ title: 'Cân nặng của bé An', xs: ['0', '2', '4', '6', '8'],
    series: [{ data: [3.2, 5.1, 6.4, 7.3, 8], color: GREEN }], yMin: 0, yMax: 10, yStep: 2, xLabel: 'Tháng tuổi', yLabel: 'Cân nặng (kg)' });
  var C3 = line({ title: 'Tỉ lệ học sinh đạt điểm giỏi môn Toán', xs: ['Lần 1', 'Lần 2', 'Lần 3', 'Lần 4'],
    series: [{ name: 'Lớp 7A', data: [30, 35, 42, 50], color: RED, below: [true, true, true, false] },
             { name: 'Lớp 7B', data: [40, 41, 43, 44], color: BLUE }],
    yMin: 20, yMax: 60, yStep: 10, xLabel: 'Lần kiểm tra', yLabel: 'Tỉ lệ (%)' });
  var C_KHACH = line({ title: 'Số lượt khách đến khu du lịch', xs: ['2019', '2020', '2021', '2022', '2023'],
    series: [{ data: [45, 12, 18, 40, 52], color: BLUE }], yMin: 0, yMax: 60, yStep: 10, xLabel: 'Năm', yLabel: 'Nghìn lượt' });

  // Đề 2
  var D1 = line({ title: 'Lượng mưa trung bình tháng ở địa phương X', xs: ['T5', 'T6', 'T7', 'T8', 'T9', 'T10'],
    series: [{ data: [180, 240, 310, 330, 260, 150], color: BLUE }], yMin: 0, yMax: 350, yStep: 50, xLabel: 'Tháng', yLabel: 'Lượng mưa (mm)' });
  var D2 = line({ title: 'Số máy điều hoà và máy sưởi bán được', xs: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    series: [{ name: 'Máy điều hoà', data: [5, 8, 15, 30, 45, 60], color: RED, below: [false, false, true, false, false, false] },
             { name: 'Máy sưởi', data: [40, 30, 18, 8, 4, 2], color: BLUE, below: [false, false, false, true, true, true] }],
    yMin: 0, yMax: 70, yStep: 10, xLabel: 'Tháng', yLabel: 'Số máy' });
  var D3 = line({ title: 'Số dân của một xã', xs: ['2000', '2005', '2010', '2015', '2020'],
    series: [{ data: [8.2, 8.9, 9.5, 10.4, 11], color: GREEN }], yMin: 7, yMax: 12, yStep: 1, xLabel: 'Năm', yLabel: 'Nghìn người' });
  var D_LAN = line({ title: 'Điểm kiểm tra Toán của Lan', xs: ['1', '2', '3', '4', '5', '6'],
    series: [{ data: [6, 7, 6.5, 8, 8.5, 9], color: BLUE }], yMin: 0, yMax: 10, yStep: 2, xLabel: 'Bài kiểm tra', yLabel: 'Điểm' });

  // Đề 3
  var E1 = line({ title: 'Giá 1 kg cà chua ở chợ', xs: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    series: [{ data: [18, 22, 15, 12, 16, 25], color: RED }], yMin: 0, yMax: 30, yStep: 5, xLabel: 'Tháng', yLabel: 'Nghìn đồng' });
  var E2 = line({ title: 'Nhiệt độ cao nhất trung bình tháng', xs: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    series: [{ name: 'Thành phố A', data: [20, 22, 26, 30, 33, 34], color: RED, below: [true, true, false, false, false, false] },
             { name: 'Thành phố B', data: [22, 23, 24, 25, 25, 24], color: BLUE, below: [false, false, true, true, true, true] }],
    yMin: 15, yMax: 40, yStep: 5, xLabel: 'Tháng', yLabel: 'Nhiệt độ (°C)' });
  var E3 = line({ title: 'Số lượt xem video của một kênh', xs: ['1', '2', '3', '4', '5', '6'],
    series: [{ data: [2, 3.5, 5, 4, 7, 11], color: BLUE }], yMin: 0, yMax: 12, yStep: 2, xLabel: 'Tuần', yLabel: 'Nghìn lượt' });
  var E_P = line({ title: 'Biểu đồ P', xs: ['2019', '2020', '2021', '2022', '2023'], w: 300, h: 200,
    series: [{ data: [50, 51, 52, 52.5, 53.5], color: GREEN }], yMin: 0, yMax: 60, yStep: 20, xLabel: 'Năm', yLabel: 'Tỉ đồng' });
  var E_Q = line({ title: 'Biểu đồ Q', xs: ['2019', '2020', '2021', '2022', '2023'], w: 300, h: 200,
    series: [{ data: [50, 51, 52, 52.5, 53.5], color: GREEN }], yMin: 49, yMax: 54, yStep: 1, xLabel: 'Năm', yLabel: 'Tỉ đồng' });

  // Đề 4
  var F1 = line({ title: 'Số ô tô bán ra của một đại lí', xs: ['2019', '2020', '2021', '2022', '2023'],
    series: [{ name: 'Ô tô chạy xăng', data: [120, 110, 95, 80, 60], color: RED },
             { name: 'Ô tô điện', data: [5, 15, 40, 75, 110], color: BLUE, below: [true, true, true, true, false] }],
    yMin: 0, yMax: 140, yStep: 20, xLabel: 'Năm', yLabel: 'Số xe' });
  var F2 = line({ title: 'Quãng đường ô tô đã đi được', xs: ['0', '1', '2', '3', '4', '5'],
    series: [{ data: [0, 40, 85, 85, 135, 160], color: BLUE }], yMin: 0, yMax: 180, yStep: 30, xLabel: 'Thời gian (giờ)', yLabel: 'Quãng đường (km)' });
  var F3 = line({ title: 'Tỉ lệ hộ gia đình dùng internet', xs: ['2018', '2019', '2020', '2021', '2022'],
    series: [{ name: 'Xã X', data: [20, 30, 45, 60, 80], color: RED, below: [false, false, true, true, false] },
             { name: 'Xã Y', data: [50, 55, 60, 64, 70], color: BLUE, below: [false, false, false, false, true] }],
    yMin: 0, yMax: 100, yStep: 20, xLabel: 'Năm', yLabel: 'Tỉ lệ (%)' });
  var F_CAY = line({ title: 'Số cây trồng được mỗi tuần', xs: ['1', '2', '3', '4', '5'],
    series: [{ data: [40, 55, 35, 70, 50], color: GREEN, below: [false, false, true, false, false] }], yMin: 0, yMax: 80, yStep: 20, xLabel: 'Tuần', yLabel: 'Số cây' });
  var F_CO = line({ title: 'Số học sinh đăng kí câu lạc bộ cờ vua', xs: ['2019', '2020', '2021', '2022', '2023'],
    series: [{ data: [12, 18, 24, 30, 36], color: BLUE }], yMin: 0, yMax: 40, yStep: 10, xLabel: 'Năm', yLabel: 'Số học sinh' });

  registerLesson({
    id: "c5-b19",
    chapter: 5,
    kind: "lesson",
    title: "Bài 19. Biểu đồ đoạn thẳng",
    sgkPages: [100, 105],
    sbtPages: [85, 91],
    objectives: [
      "Nhận biết các thành phần của biểu đồ đoạn thẳng",
      "Đọc và mô tả dữ liệu từ biểu đồ đoạn thẳng; lập bảng thống kê từ biểu đồ",
      "Vẽ biểu đồ đoạn thẳng biểu diễn một bảng số liệu",
      "Nhận ra xu thế, quy luật đơn giản (tăng, giảm, tăng nhanh nhất…) từ biểu đồ đoạn thẳng"
    ],

    theory: [
      {
        heading: "1. Biểu đồ đoạn thẳng là gì?",
        html: "<b>Biểu đồ đoạn thẳng</b> thường dùng để biểu diễn <b>sự thay đổi của một đại lượng theo thời gian</b>. Các thành phần:" +
          "<ul><li><b>Trục ngang</b>: biểu diễn thời gian (ngày, tháng, năm, giờ…).</li>" +
          "<li><b>Trục đứng</b>: biểu diễn đại lượng ta quan tâm (kèm đơn vị).</li>" +
          "<li>Mỗi <b>điểm</b> biểu diễn giá trị của đại lượng tại một thời điểm; hai điểm liên tiếp được nối với nhau bằng một <b>đoạn thẳng</b>.</li>" +
          "<li><b>Tiêu đề</b> của biểu đồ thường ở dòng trên cùng.</li></ul>" +
          "Ví dụ: biểu đồ dưới đây cho biết số cây xanh một trường trồng được trong 5 năm. Trục ngang là năm, trục đứng là số cây, điểm ứng với năm 2022 cho biết năm đó trường trồng được 190 cây." +
          H_CAY
      },
      {
        heading: "2. Đọc và phân tích biểu đồ đoạn thẳng",
        html: "<ul><li><b>Đọc số liệu:</b> mỗi điểm cho ta một cặp (thời điểm; giá trị). Đọc hết các điểm ta lập được <b>bảng thống kê</b>.</li>" +
          "<li><b>Xu thế:</b> đoạn thẳng đi lên ↗ thì đại lượng <b>tăng</b>, đi xuống ↘ thì <b>giảm</b>, nằm ngang → thì <b>không đổi</b>.</li>" +
          "<li><b>Độ dốc</b> của đoạn thẳng cho biết đại lượng tăng (giảm) nhanh hay chậm: đoạn càng dốc thì thay đổi càng nhiều. Muốn biết chính xác, ta tính hiệu hai giá trị liên tiếp.</li>" +
          "<li>Có thể vẽ <b>nhiều đường</b> trên cùng một biểu đồ để so sánh nhiều bộ số liệu; mỗi đường có màu riêng và có <b>chú giải</b>.</li></ul>" +
          "Ví dụ: trong biểu đồ dưới đây, số xe máy xăng bán được giảm dần, còn số xe máy điện tăng dần; từ tháng 5, xe máy điện bán được nhiều hơn xe máy xăng." +
          H_XE
      },
      {
        heading: "3. Vẽ biểu đồ đoạn thẳng",
        html: "Để vẽ biểu đồ đoạn thẳng từ một bảng số liệu, ta làm theo 4 bước:" +
          "<ul><li><b>Bước 1.</b> Vẽ trục ngang (thời gian) và trục đứng (đại lượng). Đánh dấu các thời điểm trên trục ngang; dựa vào giá trị lớn nhất, nhỏ nhất để chọn đơn vị và giá trị lớn nhất trên trục đứng.</li>" +
          "<li><b>Bước 2.</b> Với mỗi thời điểm, chấm một điểm có độ cao bằng giá trị tương ứng.</li>" +
          "<li><b>Bước 3.</b> Nối các điểm liên tiếp bằng các đoạn thẳng.</li>" +
          "<li><b>Bước 4.</b> Ghi chú thích cho các trục, ghi giá trị tại các điểm (nếu cần) và ghi tiêu đề cho biểu đồ.</li></ul>"
      },
      {
        heading: "4. Chọn đơn vị trên trục đứng",
        html: "Độ dốc của biểu đồ phụ thuộc vào cách chọn đơn vị trên trục đứng. Khi số liệu lớn nhưng thay đổi ít, ta <b>không nhất thiết</b> cho trục đứng bắt đầu từ 0 để thấy rõ sự thay đổi." +
          "<br>Hai biểu đồ sau biểu diễn <b>cùng một</b> dãy số liệu (chiều cao trung bình của học sinh lớp 7 một trường: 148; 149; 150,5; 151; 152 cm). Biểu đồ Q (trục đứng từ 147) cho thấy rõ chiều cao tăng dần, còn biểu đồ P (trục đứng từ 0) trông gần như nằm ngang." +
          H_CAO_P + H_CAO_Q +
          "Vì vậy khi so sánh hai biểu đồ, cần xem kĩ đơn vị trên trục đứng, không chỉ nhìn độ dốc."
      }
    ],

    skills: [
      "<b>Đọc biểu đồ:</b> xác định tiêu đề, trục ngang biểu diễn gì, trục đứng biểu diễn gì (đơn vị nào), rồi đọc giá trị tại từng điểm.",
      "<b>Lập bảng từ biểu đồ:</b> dòng 1 ghi các thời điểm trên trục ngang theo đúng thứ tự, dòng 2 ghi giá trị tương ứng.",
      "<b>Tìm khoảng tăng (giảm) nhiều nhất:</b> tính hiệu giữa hai giá trị liên tiếp, so sánh các hiệu; đoạn thẳng dốc nhất ứng với thay đổi lớn nhất (khi các thời điểm cách đều nhau).",
      "<b>Nhận xét xu thế:</b> nhìn hướng của đường gấp khúc: đi lên → tăng, đi xuống → giảm, nằm ngang → không đổi. Nêu cả các ngoại lệ (năm nào giảm, tháng nào tăng đột biến).",
      "<b>Biểu đồ nhiều đường:</b> đọc chú giải để biết mỗi đường ứng với số liệu nào; chỗ hai đường cắt nhau là lúc hai đại lượng xấp xỉ bằng nhau, sau đó đại lượng kia vượt lên.",
      "<b>Khi vẽ:</b> chọn đơn vị trục đứng sao cho giá trị lớn nhất vẫn nằm trong trục; khoảng cách giữa các vạch phải đều nhau; nhớ ghi tên trục, đơn vị và tiêu đề.",
      "<b>Lỗi hay gặp:</b> đọc nhầm giá trị của điểm bên cạnh; quên đơn vị (nghìn người, triệu đồng, %); kết luận \"tăng nhanh\" chỉ vì đường dốc mà không để ý trục đứng không bắt đầu từ 0."
    ],

    examples: [
      {
        q: "Biểu đồ dưới đây cho biết chiều cao của một cây ngô trong 5 tuần đầu." + H_NGO +
          "a) Lập bảng thống kê chiều cao của cây ngô theo tuần.<br>b) Tuần nào chiều cao cây ngô tăng nhiều nhất so với tuần trước? Tăng bao nhiêu?",
        solution: "a) Bảng thống kê:" + tbl('Tuần', [1, 2, 3, 4, 5], 'Chiều cao (cm)', [4, 7, 12, 20, 31]) +
          "b) Mức tăng so với tuần trước: tuần 2: $7 - 4 = 3$; tuần 3: $12 - 7 = 5$; tuần 4: $20 - 12 = 8$; tuần 5: $31 - 20 = 11$ (cm).<br>" +
          "Vậy tuần 5 cây ngô tăng nhiều nhất, tăng $11$ cm (đoạn thẳng cuối cùng dốc nhất)."
      },
      {
        q: "Dựa vào biểu đồ số xe máy bán được của một cửa hàng trong 6 tháng đầu năm (mục 2 phần lý thuyết):<br>a) Trong tháng 4, cửa hàng bán được loại xe nào nhiều hơn và nhiều hơn bao nhiêu chiếc?<br>b) Nhận xét xu thế của mỗi loại xe. Cửa hàng nên nhập nhiều loại xe nào trong thời gian tới?",
        solution: "a) Tháng 4: xe máy xăng $40$ chiếc, xe máy điện $30$ chiếc. Xe máy xăng bán được nhiều hơn $40 - 30 = 10$ chiếc.<br>" +
          "b) Số xe máy xăng giảm liên tục (từ 60 xuống 25 chiếc); số xe máy điện tăng liên tục (từ 10 lên 46 chiếc). Từ tháng 5, xe máy điện bán được nhiều hơn xe máy xăng. Vì vậy thời gian tới cửa hàng nên nhập nhiều xe máy điện hơn."
      },
      {
        q: "Nhiệt độ ở một địa phương vào một ngày được ghi lại trong bảng sau:" + tbl('Giờ', [6, 9, 12, 15, 18, 21], 'Nhiệt độ (°C)', [22, 26, 31, 33, 28, 24]) +
          "Vẽ biểu đồ đoạn thẳng biểu diễn bảng số liệu trên và cho biết lúc nào nóng nhất.",
        solution: "<b>Bước 1.</b> Trục ngang ghi các thời điểm 6, 9, 12, 15, 18, 21 giờ. Nhiệt độ cao nhất là 33 °C nên trục đứng chọn đơn vị 5 °C, giá trị lớn nhất 35 °C.<br>" +
          "<b>Bước 2, 3.</b> Chấm các điểm (6; 22), (9; 26), (12; 31), (15; 33), (18; 28), (21; 24) rồi nối các điểm liên tiếp.<br>" +
          "<b>Bước 4.</b> Ghi tên trục, giá trị tại các điểm và tiêu đề:" + H_NHIET +
          "Lúc 15 giờ nóng nhất (33 °C)."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          mc("d1q1", "de", "SGK tr.100 – Khái niệm",
            "Biểu đồ đoạn thẳng thường được dùng để biểu diễn",
            ["sự thay đổi của một đại lượng theo thời gian", "tỉ lệ phần trăm của các phần so với tổng thể", "vị trí của các điểm trên một đường tròn", "tên các đối tượng được điều tra"], 2,
            "Biểu đồ đoạn thẳng biểu diễn sự thay đổi của một đại lượng theo thời gian (trục ngang là thời gian). Tỉ lệ các phần so với tổng thể thường dùng biểu đồ hình quạt tròn."),
          mc("d1q2", "de", "SGK tr.101 – Luyện tập 1",
            "Cho biểu đồ:" + C1 + "Trục đứng của biểu đồ biểu diễn đại lượng nào?",
            ["Số lượt mượn sách", "Các tháng trong năm học", "Số đầu sách của thư viện", "Số học sinh của trường"], 0,
            "Trục đứng (có các vạch 0, 50, 100, …) ghi \"Số lượt\", tức là số lượt mượn sách. Trục ngang biểu diễn các tháng."),
          mc("d1q3", "de", "SBT Bài 19 – BT 5.17",
            "Cho biểu đồ:" + C1 + "Tháng 11 thư viện có bao nhiêu lượt mượn sách?",
            ["$135$", "$150$", "$120$", "$180$"], 3,
            "Điểm ứng với T11 ghi giá trị $135$. ($150$ là tháng 10, $120$ là tháng 9, $180$ là tháng 12.)"),
          mc("d1q4", "de", "SBT Bài 19 – BT 5.18a",
            "Cho biểu đồ:" + C1 + "Tháng nào thư viện có nhiều lượt mượn sách nhất?",
            ["Tháng 12", "Tháng 10", "Tháng 9", "Tháng 1"], 1,
            "Điểm cao nhất của biểu đồ ứng với tháng 12 ($180$ lượt)."),
          mc("d1q5", "vua", "SGK Bài 19 – BT 5.10b",
            "Cho biểu đồ:" + C1 + "Từ tháng 12 đến tháng 1, số lượt mượn sách giảm bao nhiêu?",
            ["$85$ lượt", "$95$ lượt", "$75$ lượt", "$45$ lượt"], 0,
            "Tháng 12: $180$ lượt; tháng 1: $95$ lượt. Số lượt giảm $180 - 95 = 85$ (lượt)."),
          mc("d1q6", "vua", "SBT Bài 19 – BT 5.17c",
            "Cho biểu đồ:" + C1 + "Tổng số lượt mượn sách trong 5 tháng là",
            ["$680$", "$660$", "$700$", "$590$"], 2,
            "$120 + 150 + 135 + 180 + 95 = 680$ (lượt)."),
          mc("d1q7", "vua", "mới",
            "Cho biểu đồ:" + C1 + "Khẳng định nào sau đây đúng?",
            ["Số lượt mượn sách tháng 10 nhiều hơn tháng 11", "Số lượt mượn sách tăng liên tục từ tháng 9 đến tháng 12", "Số lượt mượn sách tháng 1 ít hơn tháng 9 là $35$ lượt", "Số lượt mượn sách tháng 12 gấp đôi tháng 9"], 1,
            "Tháng 10: $150$ &gt; tháng 11: $135$ — đúng. Từ T10 đến T11 số lượt giảm nên không tăng liên tục; tháng 1 ít hơn tháng 9 là $120 - 95 = 25$ lượt; $2 \\cdot 120 = 240 \\ne 180$."),
          mc("d1q8", "vua", "SGK tr.102 – Ví dụ 1a",
            "Biểu đồ dưới đây cho biết cân nặng của bé An khi mới sinh (0 tháng tuổi) và sau đó cứ 2 tháng cân một lần." + C2 + "Dãy số liệu (kg) theo thứ tự thời gian được biểu diễn là",
            ["$3{,}2;\\ 5{,}1;\\ 6{,}4;\\ 7{,}3;\\ 8$", "$3{,}2;\\ 5{,}1;\\ 7{,}3;\\ 6{,}4;\\ 8$", "$3;\\ 5;\\ 6;\\ 7;\\ 8$", "$8;\\ 7{,}3;\\ 6{,}4;\\ 5{,}1;\\ 3{,}2$"], 3,
            "Đọc lần lượt các điểm từ trái sang phải (0, 2, 4, 6, 8 tháng tuổi): $3{,}2;\\ 5{,}1;\\ 6{,}4;\\ 7{,}3;\\ 8$ (kg)."),
          mc("d1q9", "kho", "SGK tr.102 – Ví dụ 1b",
            "Cho biểu đồ:" + C2 + "Giữa hai lần cân liên tiếp nào bé An tăng cân nhiều nhất?",
            ["Từ 0 đến 2 tháng tuổi", "Từ 2 đến 4 tháng tuổi", "Từ 4 đến 6 tháng tuổi", "Từ 6 đến 8 tháng tuổi"], 3,
            "Mức tăng: $5{,}1 - 3{,}2 = 1{,}9$; $6{,}4 - 5{,}1 = 1{,}3$; $7{,}3 - 6{,}4 = 0{,}9$; $8 - 7{,}3 = 0{,}7$ (kg). Lớn nhất là $1{,}9$ kg, từ 0 đến 2 tháng tuổi (đoạn thẳng đầu tiên dốc nhất)."),
          mc("d1q10", "kho", "SGK tr.103 – Luyện tập 3",
            "Biểu đồ cho biết tỉ lệ học sinh đạt điểm giỏi môn Toán của hai lớp 7A, 7B qua 4 lần kiểm tra." + C3 + "Từ lần 1 đến lần 4, lớp nào có tỉ lệ học sinh giỏi tăng nhanh hơn?",
            ["Lớp 7A (từ 30% lên 50%)", "Lớp 7B (từ 40% lên 44%)", "Lớp 7A (từ 35% lên 50%)", "Lớp 7B (từ 41% lên 44%)"], 0,
            "Lớp 7A tăng từ 30% lên 50%, thêm 20%; lớp 7B tăng từ 40% lên 44%, chỉ thêm 4%. Vậy lớp 7A tăng nhanh hơn (đường màu đỏ dốc hơn).")
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SGK Bài 19 – BT 5.12 (biến đổi)", maxPoints: 3,
            q: "Số lượt khách đến một khu du lịch (đơn vị: nghìn lượt) trong các năm được cho trong bảng sau:" +
              tbl('Năm', [2019, 2020, 2021, 2022, 2023], 'Số lượt khách (nghìn)', [45, 12, 18, 40, 52]) +
              "a) Vẽ biểu đồ đoạn thẳng biểu diễn bảng số liệu trên.<br>b) Năm nào số lượt khách giảm nhiều nhất so với năm trước? Giảm bao nhiêu?<br>c) Nhận xét xu thế số lượt khách từ năm 2020 đến năm 2023.",
            modelAnswer: "a) Trục ngang ghi các năm 2019 → 2023; giá trị lớn nhất là 52 nên trục đứng chọn đơn vị 10 (nghìn lượt), lớn nhất 60. Chấm các điểm (2019; 45), (2020; 12), (2021; 18), (2022; 40), (2023; 52), nối các điểm liên tiếp, ghi tên trục và tiêu đề:" + C_KHACH +
              "b) So với năm trước: 2020 giảm $45 - 12 = 33$; 2021 tăng $6$; 2022 tăng $22$; 2023 tăng $12$ (nghìn lượt). Năm 2020 giảm nhiều nhất, giảm $33$ nghìn lượt.<br>" +
              "c) Từ 2020 đến 2023 số lượt khách tăng liên tục (12 → 18 → 40 → 52 nghìn lượt); năm 2023 đã vượt năm 2019 ($52 > 45$).",
            rubric: [
              { pts: 0.5, text: "Câu a: vẽ đúng hai trục, chọn đơn vị trục đứng hợp lí (chứa được giá trị 52)." },
              { pts: 0.5, text: "Câu a: chấm đúng 5 điểm và nối các điểm liên tiếp bằng đoạn thẳng." },
              { pts: 0.5, text: "Câu a: có tên trục / đơn vị và tiêu đề biểu đồ." },
              { pts: 0.75, text: "Câu b: chỉ ra năm 2020, giảm 33 nghìn lượt (có phép tính)." },
              { pts: 0.75, text: "Câu c: nhận xét đúng: tăng liên tục từ 2020 đến 2023." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          mc("d2q1", "de", "SGK tr.100 – Khái niệm",
            "Trong biểu đồ đoạn thẳng, hai điểm liên tiếp được nối với nhau bằng",
            ["một đoạn thẳng", "một đường cong", "một cột hình chữ nhật", "một hình quạt"], 1,
            "Đúng như tên gọi: hai điểm liên tiếp được nối bằng một đoạn thẳng, tạo thành một đường gấp khúc."),
          mc("d2q2", "de", "SGK Bài 19 – BT 5.10a",
            "Cho biểu đồ:" + D1 + "Lượng mưa trung bình tháng 7 ở địa phương X là",
            ["$310$ mm", "$240$ mm", "$330$ mm", "$260$ mm"], 3,
            "Điểm ứng với T7 ghi $310$ (mm)."),
          mc("d2q3", "de", "SBT Bài 19 – BT 5.18a",
            "Cho biểu đồ:" + D1 + "Tháng nào có lượng mưa trung bình ít nhất?",
            ["Tháng 10", "Tháng 5", "Tháng 6", "Tháng 9"], 0,
            "Điểm thấp nhất ứng với tháng 10 ($150$ mm)."),
          mc("d2q4", "de", "mới",
            "Cho biểu đồ:" + D1 + "Lượng mưa tháng 8 nhiều hơn tháng 5 bao nhiêu mi-li-mét?",
            ["$150$ mm", "$130$ mm", "$160$ mm", "$510$ mm"], 2,
            "$330 - 180 = 150$ (mm)."),
          mc("d2q5", "vua", "SGK tr.101 – HĐ2",
            "Cho biểu đồ:" + D1 + "Trong khoảng thời gian nào lượng mưa tăng liên tục?",
            ["Từ tháng 5 đến tháng 8", "Từ tháng 7 đến tháng 10", "Từ tháng 8 đến tháng 10", "Từ tháng 5 đến tháng 10"], 3,
            "Từ T5 đến T8 đường gấp khúc đi lên: $180 < 240 < 310 < 330$. Từ T8 trở đi lượng mưa giảm."),
          mc("d2q6", "vua", "SGK tr.102 – Ví dụ 1b",
            "Cho biểu đồ:" + D1 + "Giữa hai tháng liên tiếp nào lượng mưa giảm nhiều nhất?",
            ["Từ tháng 9 sang tháng 10", "Từ tháng 8 sang tháng 9", "Từ tháng 7 sang tháng 8", "Từ tháng 5 sang tháng 6"], 1,
            "Lượng mưa chỉ giảm ở hai khoảng: T8 → T9 giảm $330 - 260 = 70$ mm; T9 → T10 giảm $260 - 150 = 110$ mm. Giảm nhiều nhất từ tháng 9 sang tháng 10."),
          mc("d2q7", "vua", "mới",
            "Cho biểu đồ:" + D1 + "Lượng mưa trung bình mỗi tháng trong 6 tháng trên là",
            ["$245$ mm", "$255$ mm", "$1\\,470$ mm", "$235$ mm"], 0,
            "Tổng: $180 + 240 + 310 + 330 + 260 + 150 = 1\\,470$ (mm). Trung bình: $1\\,470 : 6 = 245$ (mm)."),
          mc("d2q8", "vua", "SGK tr.104 – Nhận xét",
            "Thời gian chạy 100 m của bạn Nam qua 5 lần kiểm tra lần lượt là $15{,}2;\\ 14{,}8;\\ 14{,}9;\\ 14{,}5;\\ 14{,}1$ (giây). Khi vẽ biểu đồ đoạn thẳng, cách chọn trục đứng nào hợp lí nhất để thấy rõ sự thay đổi?",
            ["Từ $14$ đến $15{,}5$ giây, mỗi vạch $0{,}5$ giây", "Từ $0$ đến $100$ giây, mỗi vạch $10$ giây", "Từ $0$ đến $15$ giây, mỗi vạch $5$ giây", "Từ $15$ đến $20$ giây, mỗi vạch $1$ giây"], 2,
            "Số liệu nằm trong khoảng $14{,}1$ đến $15{,}2$ và thay đổi ít, nên chọn trục đứng từ $14$ đến $15{,}5$ để thấy rõ. Trục từ $0$ đến $100$ làm đường gần như nằm ngang; trục đến $15$ không chứa được $15{,}2$; trục từ $15$ không chứa được các giá trị nhỏ hơn 15."),
          mc("d2q9", "kho", "SGK tr.102 – Ví dụ 2",
            "Biểu đồ cho biết số máy điều hoà và máy sưởi một cửa hàng bán được trong 6 tháng đầu năm." + D2 + "Từ tháng nào trở đi, số máy điều hoà bán được luôn nhiều hơn số máy sưởi?",
            ["Tháng 4", "Tháng 3", "Tháng 5", "Tháng 2"], 2,
            "Tháng 3: điều hoà $15$ &lt; máy sưởi $18$. Tháng 4: điều hoà $30$ &gt; máy sưởi $8$, và các tháng sau điều hoà tiếp tục tăng, máy sưởi tiếp tục giảm. Vậy từ tháng 4."),
          mc("d2q10", "kho", "SBT Bài 19 – BT 5.21",
            "Cho biểu đồ:" + D2 + "Tháng nào cửa hàng bán được <b>tổng cộng</b> (cả hai loại) ít máy nhất?",
            ["Tháng 3", "Tháng 1", "Tháng 2", "Tháng 4"], 1,
            "Tổng từng tháng: T1: $5 + 40 = 45$; T2: $8 + 30 = 38$; T3: $15 + 18 = 33$; T4: $30 + 8 = 38$; T5: $45 + 4 = 49$; T6: $60 + 2 = 62$. Ít nhất là tháng 3.")
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SBT Bài 19 – BT 5.18, 5.19", maxPoints: 1.5,
            q: "Biểu đồ dưới đây cho biết số dân của một xã (đơn vị: nghìn người)." + D3 +
              "a) Lập bảng thống kê số dân của xã theo năm.<br>b) Từ năm 2000 đến năm 2020, số dân của xã tăng bao nhiêu người?<br>c) Trong giai đoạn 5 năm nào số dân tăng nhiều nhất?",
            modelAnswer: "a)" + tbl('Năm', [2000, 2005, 2010, 2015, 2020], 'Số dân (nghìn người)', [8.2, 8.9, 9.5, 10.4, 11]) +
              "b) Số dân tăng $11 - 8{,}2 = 2{,}8$ (nghìn người), tức là $2\\,800$ người.<br>" +
              "c) Mức tăng từng giai đoạn: 2000–2005: $0{,}7$; 2005–2010: $0{,}6$; 2010–2015: $0{,}9$; 2015–2020: $0{,}6$ (nghìn người). Giai đoạn 2010–2015 tăng nhiều nhất ($900$ người).",
            rubric: [
              { pts: 0.5, text: "Câu a: lập đúng bảng (đủ 5 năm, đúng giá trị)." },
              { pts: 0.5, text: "Câu b: tính đúng $2{,}8$ nghìn người (= 2 800 người)." },
              { pts: 0.5, text: "Câu c: tính mức tăng các giai đoạn và chỉ ra 2010–2015." }
            ]
          },
          {
            id: "d2e2", level: "vua", source: "SGK tr.104 – Luyện tập 4 (biến đổi)", maxPoints: 1.5,
            q: "Điểm 6 bài kiểm tra Toán của bạn Lan lần lượt là: $6;\\ 7;\\ 6{,}5;\\ 8;\\ 8{,}5;\\ 9$.<br>a) Vẽ biểu đồ đoạn thẳng biểu diễn dãy số liệu trên.<br>b) Nhận xét về kết quả học tập môn Toán của Lan.",
            modelAnswer: "a) Trục ngang ghi các bài kiểm tra 1 → 6; trục đứng biểu diễn điểm, chọn đơn vị 2, lớn nhất 10. Chấm 6 điểm, nối các điểm liên tiếp, ghi tên trục và tiêu đề:" + D_LAN +
              "b) Nhìn chung điểm của Lan có xu hướng tăng (từ 6 lên 9). Chỉ có bài 3 giảm nhẹ so với bài 2 ($6{,}5 < 7$), sau đó điểm tăng liên tục.",
            rubric: [
              { pts: 0.5, text: "Vẽ đúng hai trục, đơn vị trục đứng hợp lí, có tên trục và tiêu đề." },
              { pts: 0.5, text: "Chấm đúng 6 điểm và nối các điểm liên tiếp." },
              { pts: 0.5, text: "Nhận xét đúng: xu hướng tăng, bài 3 giảm nhẹ." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          mc("d3q1", "de", "SGK tr.100 – Khái niệm",
            "Thành phần nào sau đây <b>không</b> có trong một biểu đồ đoạn thẳng?",
            ["Hình tròn được chia thành các hình quạt", "Trục ngang biểu diễn thời gian", "Các điểm được nối với nhau bằng đoạn thẳng", "Tiêu đề của biểu đồ"], 3,
            "Biểu đồ đoạn thẳng gồm trục ngang, trục đứng, các điểm nối bằng đoạn thẳng và tiêu đề. Hình tròn chia thành các hình quạt là biểu đồ hình quạt tròn."),
          mc("d3q2", "de", "SGK Bài 19 – BT 5.10a",
            "Cho biểu đồ:" + E1 + "Giá 1 kg cà chua trong tháng 2 là",
            ["$22$ nghìn đồng", "$18$ nghìn đồng", "$25$ nghìn đồng", "$15$ nghìn đồng"], 1,
            "Điểm ứng với T2 ghi $22$ (nghìn đồng)."),
          mc("d3q3", "de", "SBT Bài 19 – BT 5.18a",
            "Cho biểu đồ:" + E1 + "Tháng nào giá cà chua thấp nhất?",
            ["Tháng 4", "Tháng 3", "Tháng 1", "Tháng 5"], 2,
            "Điểm thấp nhất ứng với tháng 4 ($12$ nghìn đồng)."),
          mc("d3q4", "de", "mới",
            "Cho biểu đồ:" + E1 + "Giá cà chua cao nhất là bao nhiêu, vào tháng nào?",
            ["$25$ nghìn đồng, tháng 6", "$22$ nghìn đồng, tháng 2", "$25$ nghìn đồng, tháng 5", "$30$ nghìn đồng, tháng 6"], 0,
            "Điểm cao nhất ứng với tháng 6, giá $25$ nghìn đồng. (Số $30$ chỉ là vạch lớn nhất trên trục đứng.)"),
          mc("d3q5", "vua", "SGK tr.101 – HĐ2",
            "Cho biểu đồ:" + E1 + "Trong khoảng thời gian nào giá cà chua giảm liên tục?",
            ["Từ tháng 2 đến tháng 4", "Từ tháng 1 đến tháng 3", "Từ tháng 4 đến tháng 6", "Từ tháng 3 đến tháng 5"], 1,
            "Từ T2 đến T4 giá giảm: $22 \\to 15 \\to 12$. Từ T1 sang T2 giá tăng; từ T4 trở đi giá tăng."),
          mc("d3q6", "vua", "SGK Bài 19 – BT 5.10b",
            "Cho biểu đồ:" + E1 + "So với tháng 4, giá cà chua tháng 6",
            ["tăng $13$ nghìn đồng", "giảm $13$ nghìn đồng", "tăng $9$ nghìn đồng", "tăng $37$ nghìn đồng"], 3,
            "Tháng 4: $12$; tháng 6: $25$ (nghìn đồng). Giá tăng $25 - 12 = 13$ (nghìn đồng)."),
          mc("d3q7", "vua", "mới",
            "Cho biểu đồ:" + E1 + "Mẹ mua 3 kg cà chua vào tháng 1 và 3 kg vào tháng 6. Số tiền mua ở tháng 6 nhiều hơn tháng 1 là",
            ["$21$ nghìn đồng", "$7$ nghìn đồng", "$75$ nghìn đồng", "$54$ nghìn đồng"], 0,
            "Mỗi kg đắt hơn $25 - 18 = 7$ (nghìn đồng), nên 3 kg đắt hơn $3 \\cdot 7 = 21$ (nghìn đồng). ($75$ và $54$ là số tiền mua 3 kg ở tháng 6 và tháng 1.)"),
          mc("d3q8", "vua", "SGK tr.103 – Thực hành",
            "Quãng đường chạy bộ mỗi tuần của bác Hùng (km):" + tbl('Tuần', [1, 2, 3, 4, 5], 'Quãng đường (km)', [10, 12, 12, 15, 9]) +
              "Khi vẽ biểu đồ đoạn thẳng, đoạn thẳng nối điểm của tuần 2 và tuần 3 có đặc điểm gì?",
            ["Nằm ngang (song song với trục ngang)", "Đi lên", "Đi xuống", "Song song với trục đứng"], 2,
            "Tuần 2 và tuần 3 đều là $12$ km, hai điểm có cùng độ cao nên đoạn nối chúng nằm ngang (đại lượng không đổi)."),
          mc("d3q9", "kho", "SGK tr.102 – Ví dụ 1b",
            "Quãng đường chạy bộ mỗi tuần của bác Hùng (km):" + tbl('Tuần', [1, 2, 3, 4, 5], 'Quãng đường (km)', [10, 12, 12, 15, 9]) +
              "Trên biểu đồ đoạn thẳng, đoạn thẳng nào đi xuống và dốc nhất?",
            ["Đoạn nối tuần 4 và tuần 5", "Đoạn nối tuần 1 và tuần 2", "Đoạn nối tuần 3 và tuần 4", "Đoạn nối tuần 2 và tuần 3"], 3,
            "Chỉ có từ tuần 4 sang tuần 5 quãng đường giảm ($15 \\to 9$, giảm $6$ km), nên đó là đoạn duy nhất đi xuống. Đoạn 1–2 và 3–4 đi lên, đoạn 2–3 nằm ngang."),
          mc("d3q10", "kho", "SGK tr.103 – Luyện tập 3",
            "Cho biểu đồ nhiệt độ cao nhất trung bình tháng của hai thành phố A và B:" + E2 + "Tháng nào nhiệt độ của hai thành phố chênh lệch nhiều nhất?",
            ["Tháng 6", "Tháng 5", "Tháng 1", "Tháng 4"], 2,
            "Chênh lệch từng tháng: T1: $2$; T2: $1$; T3: $2$; T4: $5$; T5: $8$; T6: $34 - 24 = 10$ (°C). Lớn nhất là tháng 6.")
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SBT Bài 19 – BT 5.17", maxPoints: 2,
            q: "Biểu đồ dưới đây cho biết số lượt xem video của một kênh trong 6 tuần đầu (đơn vị: nghìn lượt)." + E3 +
              "a) Lập bảng thống kê số lượt xem theo tuần.<br>b) Tuần nào số lượt xem giảm so với tuần trước?<br>c) Số lượt xem tuần 6 gấp bao nhiêu lần tuần 1? Tổng số lượt xem trong 6 tuần là bao nhiêu?",
            modelAnswer: "a)" + tbl('Tuần', [1, 2, 3, 4, 5, 6], 'Lượt xem (nghìn)', [2, 3.5, 5, 4, 7, 11]) +
              "b) Tuần 4 giảm so với tuần 3 ($4 < 5$); các tuần còn lại đều tăng.<br>" +
              "c) $11 : 2 = 5{,}5$, vậy tuần 6 gấp $5{,}5$ lần tuần 1.<br>Tổng: $2 + 3{,}5 + 5 + 4 + 7 + 11 = 32{,}5$ (nghìn lượt), tức $32\\,500$ lượt.",
            rubric: [
              { pts: 0.5, text: "Câu a: lập đúng bảng thống kê." },
              { pts: 0.5, text: "Câu b: chỉ ra tuần 4." },
              { pts: 0.5, text: "Câu c: tính đúng tuần 6 gấp $5{,}5$ lần tuần 1." },
              { pts: 0.5, text: "Câu c: tính đúng tổng $32{,}5$ nghìn lượt." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SBT Bài 19 – BT 5.23", maxPoints: 1,
            q: "Doanh thu (tỉ đồng) của một công ty từ năm 2019 đến 2023 được biểu diễn bằng hai biểu đồ P và Q dưới đây." + E_P + E_Q +
              "Bạn Hùng nói: \"Biểu đồ Q cho thấy doanh thu tăng rất mạnh, còn biểu đồ P cho thấy doanh thu gần như không đổi, nên hai biểu đồ mâu thuẫn nhau.\" Em có đồng ý không? Giải thích.",
            modelAnswer: "Không đồng ý. Đọc các điểm, cả hai biểu đồ đều biểu diễn <b>cùng một</b> dãy số liệu: $50;\\ 51;\\ 52;\\ 52{,}5;\\ 53{,}5$ (tỉ đồng), nên không mâu thuẫn.<br>" +
              "Hai đường có độ dốc khác nhau chỉ vì cách chọn trục đứng: biểu đồ P bắt đầu từ 0, mỗi vạch 20 tỉ; biểu đồ Q bắt đầu từ 49, mỗi vạch 1 tỉ. Thực tế doanh thu tăng đều nhưng ít: từ 50 lên $53{,}5$ tỉ đồng (tăng $3{,}5$ tỉ đồng trong 4 năm).",
            rubric: [
              { pts: 0.5, text: "Khẳng định hai biểu đồ cùng biểu diễn một dãy số liệu (đọc đúng các giá trị) nên không mâu thuẫn." },
              { pts: 0.5, text: "Giải thích độ dốc khác nhau do chọn đơn vị / điểm bắt đầu của trục đứng khác nhau." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 4 – NÂNG CAO =======================
      {
        id: "d4", name: "Đề 4 – Nâng cao", advanced: true,
        mcq: [
          mc("d4q1", "vua", "SGK Bài 19 – Khái niệm",
            "Dữ liệu nào sau đây <b>không</b> thích hợp để biểu diễn bằng biểu đồ đoạn thẳng?",
            ["Tỉ lệ phần trăm các loại trái cây được yêu thích của lớp 7A", "Nhiệt độ của một thành phố đo vào các giờ trong ngày", "Cân nặng của một em bé qua các tháng tuổi", "Số dân của Việt Nam qua các lần tổng điều tra"], 0,
            "Biểu đồ đoạn thẳng biểu diễn sự thay đổi theo thời gian. Tỉ lệ các loại trái cây yêu thích (các phần của một tổng thể, tại một thời điểm) nên dùng biểu đồ hình quạt tròn hoặc biểu đồ cột."),
          mc("d4q2", "vua", "SGK tr.102 – Ví dụ 2",
            "Cho biểu đồ:" + F1 + "Năm đầu tiên đại lí bán được nhiều ô tô điện hơn ô tô chạy xăng là",
            ["năm 2023", "năm 2022", "năm 2021", "chưa có năm nào"], 2,
            "Năm 2022: ô tô điện $75$ &lt; ô tô xăng $80$. Năm 2023: ô tô điện $110$ &gt; ô tô xăng $60$. Vậy là năm 2023."),
          mc("d4q3", "vua", "mới",
            "Cho biểu đồ:" + F1 + "So với năm 2019, tổng số ô tô (cả hai loại) đại lí bán được năm 2022",
            ["nhiều hơn $30$ chiếc", "ít hơn $30$ chiếc", "nhiều hơn $70$ chiếc", "bằng nhau"], 1,
            "Năm 2019: $120 + 5 = 125$ chiếc. Năm 2022: $80 + 75 = 155$ chiếc. Năm 2022 nhiều hơn $155 - 125 = 30$ chiếc."),
          mc("d4q4", "kho", "mới",
            "Cho biểu đồ:" + F1 + "Số ô tô điện bán được năm 2023 gấp bao nhiêu lần năm 2019?",
            ["$22$ lần", "$105$ lần", "$2{,}2$ lần", "$11$ lần"], 3,
            "$110 : 5 = 22$ (lần). ($105 = 110 - 5$ là số xe tăng thêm, không phải số lần.)"),
          mc("d4q5", "kho", "mới",
            "Cho biểu đồ:" + F1 + "Từ năm 2019 đến năm 2023, trung bình mỗi năm số ô tô chạy xăng bán được giảm bao nhiêu chiếc?",
            ["$15$ chiếc", "$12$ chiếc", "$60$ chiếc", "$20$ chiếc"], 2,
            "Trong 4 năm (2019 → 2023) số xe giảm $120 - 60 = 60$ chiếc, trung bình mỗi năm giảm $60 : 4 = 15$ (chiếc). Lưu ý: từ 2019 đến 2023 là 4 khoảng năm, không phải 5."),
          mc("d4q6", "kho", "SBT Bài 19 – BT 5.17",
            "Biểu đồ cho biết quãng đường một ô tô đã đi được (tính từ lúc xuất phát) sau mỗi giờ." + F2 + "Trong khoảng thời gian nào ô tô dừng lại (không di chuyển)?",
            ["Từ giờ thứ 2 đến giờ thứ 3", "Từ giờ thứ 0 đến giờ thứ 1", "Từ giờ thứ 3 đến giờ thứ 4", "Từ giờ thứ 4 đến giờ thứ 5"], 0,
            "Sau 2 giờ và sau 3 giờ, quãng đường đều là $85$ km (đoạn thẳng nằm ngang), nên trong giờ thứ 3 ô tô không di chuyển."),
          mc("d4q7", "kho", "mới",
            "Cho biểu đồ:" + F2 + "Trong giờ nào ô tô đi được quãng đường dài nhất?",
            ["Từ giờ thứ 3 đến giờ thứ 4 ($50$ km)", "Từ giờ thứ 1 đến giờ thứ 2 ($45$ km)", "Từ giờ thứ 0 đến giờ thứ 1 ($40$ km)", "Từ giờ thứ 4 đến giờ thứ 5 ($25$ km)"], 3,
            "Quãng đường từng giờ: $40$; $85 - 40 = 45$; $0$; $135 - 85 = 50$; $160 - 135 = 25$ (km). Dài nhất là $50$ km, từ giờ thứ 3 đến giờ thứ 4 (đoạn dốc nhất)."),
          mc("d4q8", "kho", "mới",
            "Cho biểu đồ:" + F2 + "Vận tốc trung bình của ô tô trên cả hành trình 5 giờ (kể cả thời gian dừng) là",
            ["$32$ km/h", "$40$ km/h", "$30$ km/h", "$45$ km/h"], 1,
            "Sau 5 giờ ô tô đi được $160$ km. Vận tốc trung bình: $160 : 5 = 32$ (km/h). ($40$ km/h là vận tốc trung bình nếu chỉ tính 4 giờ xe chạy.)"),
          mc("d4q9", "kho", "SBT Bài 19 – BT 5.19b",
            "Số học sinh tham gia CLB bóng rổ qua 5 tuần lần lượt là $30;\\ 34;\\ 38;\\ 42;\\ 46$. Trên biểu đồ đoạn thẳng biểu diễn dãy số liệu này, các điểm",
            ["nằm trên cùng một đường thẳng đi lên", "nằm trên cùng một đường thẳng nằm ngang", "tạo thành đường gấp khúc đi lên rồi đi xuống", "tạo thành đường gấp khúc ngày càng dốc"], 3,
            "Mỗi tuần số học sinh tăng đều thêm $4$, các thời điểm cách đều nhau nên mọi đoạn thẳng có cùng độ dốc: các điểm nằm trên một đường thẳng đi lên."),
          mc("d4q10", "kho", "SGK tr.103 – Luyện tập 3",
            "Cho biểu đồ:" + F3 + "Khẳng định nào sau đây đúng?",
            ["Mức tăng tỉ lệ của xã X (từ 20% lên 80%) gấp 3 lần mức tăng của xã Y (từ 50% lên 70%)", "Năm 2021, tỉ lệ của xã X đã cao hơn xã Y", "Tỉ lệ của xã Y tăng nhanh hơn xã X", "Năm 2020, tỉ lệ của hai xã bằng nhau"], 1,
            "Xã X tăng thêm $80 - 20 = 60$ (%), xã Y tăng thêm $70 - 50 = 20$ (%), và $60 = 3 \\cdot 20$. Năm 2021: X $60\\%$ &lt; Y $64\\%$; năm 2020: X $45\\%$, Y $60\\%$; xã X tăng nhanh hơn.")
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "mới", maxPoints: 1.5,
            q: "Một đội tình nguyện ghi lại <b>tổng số cây</b> đã trồng được (cộng dồn từ đầu) sau mỗi tuần:" +
              tbl('Sau tuần', [1, 2, 3, 4, 5], 'Tổng số cây', [40, 95, 130, 200, 250]) +
              "a) Lập bảng số cây trồng được <b>trong từng tuần</b>.<br>b) Vẽ biểu đồ đoạn thẳng biểu diễn số cây trồng được trong từng tuần.<br>c) Tuần nào đội trồng được nhiều cây nhất?",
            modelAnswer: "a) Số cây trồng trong mỗi tuần bằng hiệu hai tổng liên tiếp: tuần 1: $40$; tuần 2: $95 - 40 = 55$; tuần 3: $130 - 95 = 35$; tuần 4: $200 - 130 = 70$; tuần 5: $250 - 200 = 50$." +
              tbl('Tuần', [1, 2, 3, 4, 5], 'Số cây trồng trong tuần', [40, 55, 35, 70, 50]) +
              "b) Biểu đồ:" + F_CAY +
              "c) Tuần 4 trồng được nhiều cây nhất ($70$ cây).",
            rubric: [
              { pts: 0.5, text: "Câu a: tính đúng số cây từng tuần (40; 55; 35; 70; 50)." },
              { pts: 0.5, text: "Câu b: vẽ đúng biểu đồ (trục, đơn vị, điểm, đoạn nối, tiêu đề)." },
              { pts: 0.5, text: "Câu c: chỉ ra tuần 4 với 70 cây." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "SBT Bài 19 – BT 5.19 (nâng cao)", maxPoints: 1.5,
            q: "Biểu đồ dưới đây cho biết số học sinh đăng kí câu lạc bộ cờ vua của một trường." + F_CO +
              "a) Em có nhận xét gì về quy luật thay đổi số học sinh đăng kí qua các năm?<br>b) Nếu quy luật đó tiếp tục, dự đoán năm 2025 có bao nhiêu học sinh đăng kí?<br>c) Năm nào số học sinh đăng kí gấp 3 lần năm 2019?",
            modelAnswer: "a) Số học sinh: $12;\\ 18;\\ 24;\\ 30;\\ 36$. Mỗi năm tăng đều thêm $6$ học sinh (các điểm nằm trên một đường thẳng đi lên).<br>" +
              "b) Năm 2024: $36 + 6 = 42$; năm 2025: $42 + 6 = 48$ (học sinh).<br>" +
              "c) $3 \\cdot 12 = 36$, ứng với năm 2023.",
            rubric: [
              { pts: 0.5, text: "Câu a: nêu được quy luật mỗi năm tăng 6 học sinh." },
              { pts: 0.5, text: "Câu b: dự đoán đúng 48 học sinh năm 2025." },
              { pts: 0.5, text: "Câu c: tính $3 \\cdot 12 = 36$ và chỉ ra năm 2023." }
            ]
          }
        ]
      }
    ]
  });
})();
