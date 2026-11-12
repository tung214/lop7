(function () {
  // Bảng dữ liệu đơn giản: tbl(["Cột 1", "Cột 2"], [["a", "b"], ...])
  function tbl(head, rows) {
    var s = '<table style="border-collapse:collapse;margin:6px 0">';
    s += '<tr>' + head.map(function (h) { return '<th style="border:1px solid currentColor;padding:3px 10px">' + h + '</th>'; }).join('') + '</tr>';
    rows.forEach(function (r) {
      s += '<tr>' + r.map(function (c) { return '<td style="border:1px solid currentColor;padding:3px 10px;text-align:center">' + c + '</td>'; }).join('') + '</tr>';
    });
    return s + '</table>';
  }

  // Sơ đồ phân loại dữ liệu (SVG, dùng currentColor để hợp chế độ sáng/tối)
  function tree() {
    var W = 520, H = 170;
    var box = function (x, y, w, t, c) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="34" rx="10" fill="none" stroke="' + c + '" stroke-width="1.6"/>' +
        '<text x="' + (x + w / 2) + '" y="' + (y + 22) + '" font-size="13" text-anchor="middle" fill="currentColor">' + t + '</text>';
    };
    var ln = function (x1, y1, x2, y2) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="currentColor" stroke-width="1.2"/>'; };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:8px auto" role="img" aria-label="Sơ đồ phân loại dữ liệu">';
    s += box(200, 4, 120, 'Dữ liệu', '#e5484d');
    s += ln(260, 38, 120, 66) + ln(260, 38, 390, 66);
    s += box(10, 66, 220, 'Là số (số liệu, định lượng)', '#2f80ed');
    s += box(270, 66, 240, 'Không là số (định tính)', '#2f9e44');
    s += ln(390, 100, 330, 128) + ln(390, 100, 450, 128);
    s += box(230, 128, 170, 'Không thể sắp thứ tự', '#2f9e44');
    s += box(405, 128, 112, 'Có thể sắp thứ tự', '#2f9e44');
    return s + '</svg>';
  }

  // Các phương án phân loại dùng lại nhiều lần
  var SL = "Số liệu (dữ liệu định lượng)";
  var TT = "Dữ liệu không là số, có thể sắp thứ tự";
  var KTT = "Dữ liệu không là số, không thể sắp thứ tự";
  var KD = "Không phải là dữ liệu";

  registerLesson({
    id: "c5-b17",
    chapter: 5,
    kind: "lesson",
    title: "Bài 17. Thu thập và phân loại dữ liệu",
    sgkPages: [88, 92],
    sbtPages: [75, 77],
    objectives: [
      "Thu thập dữ liệu bằng quan sát, làm thí nghiệm, lập bảng hỏi, phỏng vấn",
      "Phân loại dữ liệu: số liệu (định lượng) và dữ liệu không là số (định tính) – có thể hoặc không thể sắp thứ tự",
      "Nhận biết tính đại diện của dữ liệu",
      "Đánh giá tính hợp lí của một kết luận dựa trên dữ liệu thu thập được"
    ],

    theory: [
      {
        heading: "1. Thu thập dữ liệu",
        html: "Có nhiều cách thu thập dữ liệu:" +
          "<ul><li><b>Quan sát</b>: ví dụ đếm số bạn bỏ rác đúng chỗ trên sân trường.</li>" +
          "<li><b>Làm thí nghiệm</b>: ví dụ đo nhiệt độ của nước sau mỗi phút đun.</li>" +
          "<li><b>Lập bảng hỏi</b> (phiếu khảo sát): phát phiếu có sẵn câu hỏi và các lựa chọn để người được hỏi đánh dấu.</li>" +
          "<li><b>Phỏng vấn</b> (hỏi trực tiếp): đặt câu hỏi và ghi lại câu trả lời.</li></ul>" +
          "Câu hỏi khảo sát nên <b>ngắn gọn, rõ ràng, dễ trả lời</b>, không dẫn dắt người trả lời theo ý mình. " +
          "Ví dụ: \"Mỗi ngày bạn xem ti vi khoảng bao nhiêu giờ?\" hoặc \"Bạn có thường xuyên lên thư viện không? (Rất thường xuyên / Thường xuyên / Thỉnh thoảng / Không bao giờ)\"."
      },
      {
        heading: "2. Phân loại dữ liệu",
        html: "Dữ liệu thu được có thể là số hoặc không là số:" + tree() +
          "<ul><li><b>Dữ liệu là số</b> còn gọi là <b>số liệu</b> hay <b>dữ liệu định lượng</b>. Ví dụ: cân nặng (kg) của 5 bạn: $43;\\ 41;\\ 48;\\ 45;\\ 52$.</li>" +
          "<li><b>Dữ liệu không là số</b> còn gọi là <b>dữ liệu định tính</b>. Có hai loại:" +
          "<ul><li><b>Không thể sắp thứ tự</b>: tên các tỉnh, màu sắc yêu thích, môn thể thao yêu thích…</li>" +
          "<li><b>Có thể sắp thứ tự</b>: mức đánh giá Xuất sắc – Tốt – Khá – Trung bình; cỡ áo S – M – L – XL; mức độ Rất đồng ý – Đồng ý – Không đồng ý – Rất không đồng ý…</li></ul></li>" +
          "<li><b>Chú ý:</b> có những dữ liệu viết bằng chữ số nhưng các số chỉ dùng để <b>gọi tên, đánh dấu</b> (số tuyến xe buýt, số áo cầu thủ, số báo danh, số điện thoại…). Tính toán trên các số này (cộng, tính trung bình) không có ý nghĩa, nên chúng <b>không phải là số liệu</b>.</li></ul>"
      },
      {
        heading: "3. Tính đại diện của dữ liệu",
        html: "Để đưa ra kết luận hợp lí, dữ liệu thu được phải <b>đảm bảo tính đại diện</b> cho <b>toàn bộ</b> đối tượng đang quan tâm." +
          "<ul><li>Nếu đối tượng quan tâm là toàn thể học sinh của trường thì không thể chỉ hỏi các bạn nam, hay chỉ hỏi các bạn trong một câu lạc bộ, một lớp… mà phải chọn học sinh <b>một cách ngẫu nhiên</b> từ toàn trường (ví dụ: mỗi lớp chọn ngẫu nhiên vài bạn).</li>" +
          "<li>Một cách chọn hay dùng: đánh số các đối tượng rồi chọn đều đặn, ví dụ các số $5;\\ 10;\\ 15;\\ \\ldots;\\ 100$ trong $100$ hành khách của chuyến bay.</li>" +
          "<li>Nhóm được chọn có đặc điểm \"đặc biệt\" (chỉ khách hạng thương gia, chỉ người từ 20 đến 30 tuổi, chỉ đội tuyển bóng đá…) thì dữ liệu <b>không</b> đại diện cho toàn bộ.</li></ul>"
      },
      {
        heading: "4. Tính hợp lí của kết luận",
        html: "Một kết luận dựa trên khảo sát chỉ hợp lí khi <b>đối tượng được khảo sát đại diện được cho đối tượng mà kết luận nói tới</b>." +
          "<br>Ví dụ: cho 100 người bệnh từ 20 đến 30 tuổi dùng thuốc, 95 người khỏi bệnh. Kết luận \"95% người dùng khỏi bệnh\" (nói về mọi người dùng) là <b>không hợp lí</b>, vì người ở các độ tuổi khác không được khảo sát." +
          "<br>Kết luận hợp lí hơn: \"Trong 100 người từ 20 đến 30 tuổi được thử thuốc, có 95% khỏi bệnh sau ba ngày\"."
      }
    ],

    skills: [
      "<b>Phân loại dữ liệu:</b> tự hỏi \"Dữ liệu có phải là số đo, số đếm không?\" → nếu có thì là <b>số liệu</b>. Nếu không, hỏi tiếp \"Có xếp được từ thấp đến cao (hoặc ngược lại) không?\" → có thể / không thể sắp thứ tự.",
      "<b>Số dùng để gọi tên</b> (số áo, số xe buýt, số báo danh, số điện thoại, mã số…) không phải số liệu: cộng hay tính trung bình chúng không có ý nghĩa.",
      "<b>Chọn cách thu thập:</b> đo đạc trong phòng thí nghiệm → <b>làm thí nghiệm</b>; xem hành vi thực tế → <b>quan sát</b>; hỏi ý kiến nhiều người → <b>lập bảng hỏi</b>; hỏi trực tiếp từng người → <b>phỏng vấn</b>.",
      "<b>Kiểm tra tính đại diện:</b> so sánh <b>nhóm được hỏi</b> với <b>nhóm mà kết luận nói tới</b>. Nhóm được hỏi phải được chọn ngẫu nhiên và có mặt đủ các thành phần (nam/nữ, các lớp, các khối, các độ tuổi…).",
      "<b>Đếm số đối tượng được chọn đều đặn:</b> chọn các số $a;\\ a + k;\\ a + 2k;\\ \\ldots;\\ b$ thì số đối tượng là $\\frac{b - a}{k} + 1$. Ví dụ $1;\\ 11;\\ \\ldots;\\ 4\\,991$ có $\\frac{4\\,991 - 1}{10} + 1 = 500$ hộ.",
      "<b>Lỗi hay gặp:</b> coi số áo, số xe buýt là số liệu; nhầm mức đánh giá (Tốt, Khá…) là dữ liệu không thể sắp thứ tự; cho rằng hỏi nhiều người là đủ, mà quên kiểm tra nhóm được hỏi có đại diện không; lấy tỉ lệ của mẫu áp cho một nhóm lớn hơn khác hẳn (từ học sinh một trường suy ra học sinh cả nước)."
    ],

    examples: [
      {
        q: "Mỗi dãy dữ liệu sau thuộc loại nào?<br>a) Tên các bạn trong đội văn nghệ của lớp: An, Bình, Chi, Dung.<br>b) Đánh giá của khán giả về một trận đấu: Rất hay, Hay, Bình thường, Chán.<br>c) Số bàn thắng của các đội trong một giải bóng đá: $5;\\ 3;\\ 7;\\ 2$.",
        solution: "a) Tên người không phải là số, cũng không có thứ tự hơn kém: <b>dữ liệu không là số, không thể sắp thứ tự</b>.<br>" +
          "b) Không phải là số nhưng xếp được từ mức cao nhất đến thấp nhất (Rất hay → Hay → Bình thường → Chán): <b>dữ liệu không là số, có thể sắp thứ tự</b>.<br>" +
          "c) Số bàn thắng là số đếm: <b>số liệu</b> (dữ liệu định lượng)."
      },
      {
        q: "Một hãng xe khách muốn biết mức độ hài lòng của hành khách trên một chuyến xe có 40 hành khách. Có hai cách:<br>Cách 1: hỏi 8 hành khách ngồi ở hàng ghế đầu (ghế rộng, giá vé cao hơn).<br>Cách 2: đánh số 40 hành khách rồi hỏi những người có số $5;\\ 10;\\ 15;\\ \\ldots;\\ 40$.<br>Cách nào hợp lí hơn?",
        solution: "Đối tượng cần lấy ý kiến là <b>toàn bộ</b> hành khách trên chuyến xe.<br>" +
          "Cách 1 chỉ hỏi những người ngồi ghế đặc biệt, những người khác không được hỏi nên dữ liệu <b>không đảm bảo tính đại diện</b>.<br>" +
          "Cách 2 chọn đều đặn $\\frac{40 - 5}{5} + 1 = 8$ người trong toàn bộ hành khách, nên <b>cách 2 hợp lí hơn</b>."
      },
      {
        q: "Một nhóm bạn phỏng vấn 60 học sinh trong câu lạc bộ Cờ vua của trường, thấy 45 bạn thích các trò chơi trí tuệ. Nhóm kết luận: \"75% học sinh của trường thích các trò chơi trí tuệ\". Kết luận này có hợp lí không?",
        solution: "Tỉ lệ trong nhóm được hỏi: $\\frac{45}{60} = 0{,}75 = 75\\%$ (tính đúng).<br>" +
          "Nhưng kết luận nói về <b>toàn bộ học sinh của trường</b>, trong khi chỉ hỏi các bạn câu lạc bộ Cờ vua – những bạn vốn thích trò chơi trí tuệ hơn mức chung. Dữ liệu không đại diện nên kết luận <b>không hợp lí</b>.<br>" +
          "Nên chọn ngẫu nhiên học sinh ở tất cả các lớp để hỏi."
      }
    ],

    sets: [
      // ======================= ĐỀ 1 =======================
      {
        id: "d1", name: "Đề 1",
        mcq: [
          {
            id: "d1q1", level: "de", source: "SGK Bài 17 – BT 5.1",
            q: "Dữ liệu nào sau đây là số liệu (dữ liệu định lượng)?",
            options: ["Tên các môn thể thao các bạn yêu thích", "Chiều cao (cm) của các bạn trong tổ", "Màu sắc yêu thích của các bạn", "Mức độ hài lòng: Rất hài lòng, Hài lòng, Không hài lòng"],
            answer: 1,
            explain: "Chiều cao là số đo nên là số liệu. Tên môn thể thao, màu sắc, mức độ hài lòng đều không là số (dữ liệu định tính)."
          },
          {
            id: "d1q2", level: "de", source: "SGK tr.89 – Ví dụ 1",
            q: "Dãy dữ liệu về tên các thành phố bạn muốn đến du lịch: Hà Nội, Huế, Cần Thơ, Đà Lạt thuộc loại nào?",
            options: [SL, TT, KTT, KD],
            answer: 2,
            explain: "Tên thành phố không phải là số và không có thứ tự hơn kém giữa các tên, nên đây là dữ liệu không là số, không thể sắp thứ tự."
          },
          {
            id: "d1q3", level: "de", source: "SBT Bài 17 – BT 5.2",
            q: "Để biết nước muối ở các nồng độ khác nhau sôi ở nhiệt độ bao nhiêu, cách thu thập dữ liệu phù hợp nhất là",
            options: ["Phỏng vấn các bạn trong lớp", "Lập bảng hỏi", "Làm thí nghiệm", "Quan sát trên sân trường"],
            answer: 2,
            explain: "Nhiệt độ sôi phải đo trực tiếp khi đun các dung dịch, tức là làm thí nghiệm. Hỏi ý kiến người khác không cho số đo chính xác."
          },
          {
            id: "d1q4", level: "de", source: "SGK tr.89 – Chú ý",
            q: "Dữ liệu về xếp loại kết quả học tập: Tốt, Khá, Đạt, Chưa đạt thuộc loại nào?",
            options: [TT, SL, KTT, KD],
            answer: 0,
            explain: "Các mức xếp loại không phải là số nhưng xếp được từ cao đến thấp: Tốt → Khá → Đạt → Chưa đạt. Đây là dữ liệu không là số, có thể sắp thứ tự."
          },
          {
            id: "d1q5", level: "vua", source: "SGK tr.91 – Nhận xét",
            q: "Để tìm hiểu môn thể thao yêu thích của học sinh lớp 7A (gồm cả nam và nữ), cách chọn người để hỏi nào đảm bảo tính đại diện nhất?",
            options: ["Hỏi các bạn nam trong lớp", "Hỏi các bạn trong đội bóng đá của lớp", "Hỏi các bạn ngồi ở bàn đầu", "Hỏi các bạn có số thứ tự lẻ trong danh sách lớp"],
            answer: 3,
            explain: "Số thứ tự trong danh sách không liên quan đến sở thích thể thao, nên chọn các bạn có số thứ tự lẻ là một cách chọn ngẫu nhiên trong cả lớp. Chỉ hỏi bạn nam hay đội bóng đá thì thiếu các bạn khác; các bạn bàn đầu chỉ là một nhóm nhỏ ở một vị trí."
          },
          {
            id: "d1q6", level: "vua", source: "SGK tr.90 – Tranh luận",
            q: "Số áo của một số cầu thủ trong đội bóng là: $1;\\ 7;\\ 10;\\ 23$. Khẳng định nào sau đây đúng?",
            options: ["Đây là số liệu vì được viết bằng các chữ số", "Đây không phải là số liệu vì các số chỉ dùng để gọi tên, đánh dấu cầu thủ", "Tính trung bình cộng số áo cho ta biết thông tin có ý nghĩa về đội bóng", "Đây không phải là dữ liệu"],
            answer: 1,
            explain: "Số áo chỉ để phân biệt các cầu thủ (giống như tên). Cộng hay tính trung bình số áo không có ý nghĩa, nên đây không phải là số liệu."
          },
          {
            id: "d1q7", level: "vua", source: "mới",
            q: "Dãy dữ liệu nào sau đây là dữ liệu không là số nhưng có thể sắp thứ tự?",
            options: ["Cỡ áo: S, M, L, XL", "Môn học yêu thích: Toán, Ngữ văn, Tiếng Anh", "Số anh chị em ruột: $0;\\ 1;\\ 2;\\ 3$", "Loài hoa yêu thích: hồng, cúc, lan"],
            answer: 0,
            explain: "Cỡ áo không là số nhưng xếp được từ nhỏ đến lớn: S → M → L → XL. Môn học, loài hoa không sắp thứ tự được; số anh chị em ruột là số liệu."
          },
          {
            id: "d1q8", level: "vua", source: "SBT Bài 17 – BT 5.4",
            q: "Bình phát phiếu hỏi: \"Bạn lên thư viện đọc sách mấy ngày trong tuần?\" với các lựa chọn $1;\\ 2;\\ 3;\\ 4;\\ 5$. Dữ liệu Bình thu được thuộc loại nào?",
            options: [KTT, TT, KD, SL],
            answer: 3,
            explain: "Số ngày lên thư viện là số đếm (có thể cộng, tính trung bình có ý nghĩa), nên đây là số liệu."
          },
          {
            id: "d1q9", level: "kho", source: "SBT Bài 17 – BT 5.8 (biến đổi)",
            q: "Một nhóm phỏng vấn 200 khách đến một cửa hàng xe đạp, thấy có 150 người thích đi xe đạp. Nhóm kết luận: \"75% người dân trong thành phố thích đi xe đạp\". Nhận xét nào sau đây đúng?",
            options: ["Hợp lí, vì số người được hỏi khá lớn", "Hợp lí, vì $150 : 200 = 75\\%$", "Không hợp lí, vì khách của cửa hàng xe đạp không đại diện cho người dân thành phố", "Không hợp lí, vì phép tính $150 : 200$ không bằng $75\\%$"],
            answer: 2,
            explain: "Tỉ lệ $\\frac{150}{200} = 75\\%$ tính đúng, nhưng khách đến cửa hàng xe đạp thường là người thích xe đạp hơn mức chung. Nhóm được hỏi không đại diện cho người dân cả thành phố nên kết luận không hợp lí."
          },
          {
            id: "d1q10", level: "kho", source: "SGK Bài 17 – BT 5.4a (biến đổi)",
            q: "Một trường có 800 học sinh được đánh số từ 1 đến 800. Người ta chọn các bạn có số thứ tự $8;\\ 16;\\ 24;\\ \\ldots;\\ 800$ để khảo sát. Số học sinh được chọn là",
            options: ["$80$", "$100$", "$99$", "$101$"],
            answer: 1,
            explain: "Các số được chọn là bội của 8 từ 8 đến 800: $\\frac{800 - 8}{8} + 1 = 99 + 1 = 100$ học sinh."
          }
        ],
        essay: [
          {
            id: "d1e1", level: "vua", source: "SBT Bài 17 – BT 5.4 (biến đổi)", maxPoints: 3,
            q: "Lan phát phiếu hỏi cho các bạn lớp 7B với ba câu hỏi:<br>" +
              "(1) Bạn cao bao nhiêu xăng-ti-mét?<br>" +
              "(2) Môn thể thao bạn thích nhất là gì?<br>" +
              "(3) Bạn thấy giờ ra chơi thế nào? (Rất vui / Vui / Bình thường / Chán)<br>" +
              "a) Dữ liệu thu được ở mỗi câu hỏi thuộc loại nào?<br>" +
              "b) Dãy dữ liệu nào là dữ liệu không là số nhưng sắp xếp được theo thứ tự? Hãy sắp xếp các mức của dãy đó từ cao đến thấp.<br>" +
              "c) Lan chỉ phát phiếu cho các bạn nữ trong lớp rồi đưa ra kết luận về môn thể thao yêu thích của cả lớp 7B. Kết luận như vậy có hợp lí không? Vì sao?",
            modelAnswer: "a) (1) Chiều cao là số đo → <b>số liệu</b> (dữ liệu định lượng).<br>" +
              "(2) Tên môn thể thao → <b>dữ liệu không là số, không thể sắp thứ tự</b>.<br>" +
              "(3) Mức độ cảm nhận → <b>dữ liệu không là số, có thể sắp thứ tự</b>.<br>" +
              "b) Dãy (3). Thứ tự từ cao đến thấp: Rất vui → Vui → Bình thường → Chán.<br>" +
              "c) Không hợp lí. Đối tượng cần kết luận là cả lớp 7B (gồm cả nam và nữ), nhưng Lan chỉ hỏi các bạn nữ, ý kiến của các bạn nam không được thu thập. Dữ liệu không đảm bảo tính đại diện cho cả lớp.",
            rubric: [
              { pts: 0.5, text: "Câu (1): số liệu (dữ liệu định lượng)." },
              { pts: 0.5, text: "Câu (2): dữ liệu không là số, không thể sắp thứ tự." },
              { pts: 0.5, text: "Câu (3): dữ liệu không là số, có thể sắp thứ tự." },
              { pts: 0.5, text: "Câu b: chỉ ra dãy (3) và sắp xếp đúng Rất vui → Vui → Bình thường → Chán." },
              { pts: 1, text: "Câu c: kết luận không hợp lí, giải thích được là thiếu ý kiến các bạn nam nên dữ liệu không đại diện cho cả lớp." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 2 =======================
      {
        id: "d2", name: "Đề 2",
        mcq: [
          {
            id: "d2q1", level: "de", source: "SGK tr.89 – Ghi nhớ",
            q: "Dữ liệu nào sau đây là dữ liệu định tính (dữ liệu không là số)?",
            options: ["Cân nặng (kg) của các bạn trong lớp", "Số bàn thắng của một đội bóng trong các trận", "Tên các nhân vật hoạt hình được yêu thích", "Nhiệt độ ($^\\circ$C) các ngày trong tuần"],
            answer: 2,
            explain: "Tên nhân vật không phải là số nên là dữ liệu định tính. Cân nặng, số bàn thắng, nhiệt độ đều là số liệu."
          },
          {
            id: "d2q2", level: "de", source: "SBT Bài 17 – BT 5.1a",
            q: "Dãy dữ liệu về tên các hành tinh trong hệ Mặt Trời: Sao Thuỷ, Sao Kim, Trái Đất, Sao Hoả, … thuộc loại nào?",
            options: [KTT, SL, TT, KD],
            answer: 0,
            explain: "Tên các hành tinh không phải là số và không có thứ tự hơn kém về mức độ, nên là dữ liệu không là số, không thể sắp thứ tự."
          },
          {
            id: "d2q3", level: "de", source: "SBT Bài 17 – BT 5.2b",
            q: "Muốn thống kê thời gian tự học ở nhà mỗi ngày của các bạn trong lớp, cách thu thập dữ liệu phù hợp là",
            options: ["Làm thí nghiệm", "Lập bảng hỏi (phiếu khảo sát) cho các bạn", "Quan sát các bạn ở trường", "Đo bằng thước"],
            answer: 1,
            explain: "Thời gian tự học diễn ra ở nhà, ta không quan sát hay làm thí nghiệm được; cách phù hợp là hỏi các bạn bằng phiếu khảo sát (hoặc phỏng vấn)."
          },
          {
            id: "d2q4", level: "de", source: "SBT Bài 17 – BT 5.1b",
            q: "Đánh giá của học sinh về đề thi với các mức: Rất khó, Khó, Vừa sức, Dễ, Rất dễ thuộc loại dữ liệu nào?",
            options: [SL, KTT, KD, TT],
            answer: 3,
            explain: "Các mức đánh giá không là số nhưng xếp được theo độ khó giảm dần: Rất khó → Khó → Vừa sức → Dễ → Rất dễ. Đây là dữ liệu không là số, có thể sắp thứ tự."
          },
          {
            id: "d2q5", level: "vua", source: "SGK tr.91 – Ví dụ 2",
            q: "Một rạp chiếu phim muốn khảo sát mức độ hài lòng của khán giả trong một suất chiếu có 120 khán giả. Cách nào sau đây hợp lí nhất?",
            options: ["Hỏi 15 khán giả ngồi ở hàng ghế VIP", "Hỏi 15 khán giả là người quen của nhân viên rạp", "Đánh số 120 khán giả và hỏi những người có số $8;\\ 16;\\ \\ldots;\\ 120$", "Hỏi 15 khán giả rời rạp sớm nhất"],
            answer: 2,
            explain: "Đánh số rồi chọn đều đặn giúp mọi khán giả đều có cơ hội được hỏi, dữ liệu đảm bảo tính đại diện. Các cách còn lại chỉ hỏi một nhóm đặc biệt (ghế VIP, người quen, người bỏ về sớm – có thể vì không thích phim)."
          },
          {
            id: "d2q6", level: "vua", source: "SGK tr.90 – Tranh luận",
            q: "Dãy dữ liệu nào sau đây là số liệu?",
            options: ["Số giờ ngủ mỗi đêm của các bạn trong tổ", "Số báo danh của các thí sinh", "Số các tuyến xe buýt bạn từng đi", "Mã số học sinh của các bạn"],
            answer: 0,
            explain: "Số giờ ngủ là số đo thời gian, tính trung bình có ý nghĩa nên là số liệu. Số báo danh, số tuyến xe buýt, mã số học sinh chỉ dùng để gọi tên, đánh dấu."
          },
          {
            id: "d2q7", level: "vua", source: "SBT Bài 17 – BT 5.3",
            q: "Câu hỏi khảo sát nào sau đây thu được dữ liệu không là số nhưng có thể sắp thứ tự?",
            options: ["Bạn sinh năm nào?", "Bạn có thường tập thể dục buổi sáng không? (Rất thường xuyên / Thường xuyên / Thỉnh thoảng / Không bao giờ)", "Món ăn bạn thích nhất là gì?", "Gia đình bạn có mấy người?"],
            answer: 1,
            explain: "Các mức Rất thường xuyên → Thường xuyên → Thỉnh thoảng → Không bao giờ không là số nhưng sắp được thứ tự. Năm sinh, số người là số liệu; món ăn là dữ liệu không sắp thứ tự."
          },
          {
            id: "d2q8", level: "vua", source: "SBT Bài 17 – BT 5.6",
            q: "Để ước lượng chiều cao trung bình của học sinh khối 7, cách chọn học sinh để đo nào đảm bảo tính đại diện?",
            options: ["Chọn 30 bạn trong đội bóng rổ của khối", "Chọn 30 bạn nữ của lớp 7A", "Chọn 30 bạn cao nhất khối", "Chọn ngẫu nhiên từ mỗi lớp khối 7 ra 5 bạn"],
            answer: 3,
            explain: "Chọn ngẫu nhiên ở mọi lớp thì nhóm được đo có đủ các bạn cao, thấp, nam, nữ – đại diện cho cả khối. Đội bóng rổ hay các bạn cao nhất sẽ cho chiều cao trung bình lớn hơn thực tế; chỉ chọn bạn nữ lớp 7A thì thiếu bạn nam và các lớp khác."
          },
          {
            id: "d2q9", level: "kho", source: "SBT Bài 17 – BT 5.7 (biến đổi)",
            q: "Một cửa hàng đồ uống đánh số khách hàng và ghi lại đồ uống của các khách thứ $4;\\ 8;\\ 12;\\ \\ldots;\\ 400$. Trong số khách này có 30 người mua trà sữa. Kết luận nào sau đây hợp lí?",
            options: ["Khoảng $30\\%$ khách hàng mua trà sữa", "Khoảng $3\\%$ khách hàng mua trà sữa", "Khoảng $7{,}5\\%$ khách hàng mua trà sữa", "Không thể kết luận gì vì chỉ hỏi một số khách"],
            answer: 0,
            explain: "Số khách được ghi lại: $\\frac{400 - 4}{4} + 1 = 100$ người, chọn đều đặn nên đảm bảo tính đại diện. Tỉ lệ: $\\frac{30}{100} = 30\\%$. (Chia $30$ cho $400$ được $7{,}5\\%$ là sai, vì chỉ có 100 khách được ghi lại.)"
          },
          {
            id: "d2q10", level: "kho", source: "SBT Bài 17 – Ví dụ 2 (biến đổi)",
            q: "Một nhóm khảo sát 400 học sinh của một trường chuyên Tin học, thấy 360 em sử dụng máy tính thành thạo. Nhóm kết luận: \"90% học sinh THCS của tỉnh sử dụng máy tính thành thạo\". Nhận xét nào sau đây đúng?",
            options: ["Hợp lí, vì $360 : 400 = 90\\%$", "Không hợp lí, vì học sinh trường chuyên Tin học không đại diện cho học sinh THCS của tỉnh", "Không hợp lí, vì phải khảo sát ít nhất 1 000 học sinh", "Hợp lí, vì đã khảo sát hơn 100 học sinh"],
            answer: 1,
            explain: "Tỉ lệ $\\frac{360}{400} = 90\\%$ tính đúng, nhưng học sinh trường chuyên Tin học có điều kiện học máy tính tốt hơn mức chung. Dữ liệu không đại diện cho học sinh THCS cả tỉnh nên kết luận không hợp lí."
          }
        ],
        essay: [
          {
            id: "d2e1", level: "vua", source: "SGK tr.92 – Tranh luận", maxPoints: 1.5,
            q: "Để khảo sát thời gian dùng Internet vào hai ngày cuối tuần của học sinh trong trường:<br>" +
              "• Vuông chọn ngẫu nhiên một số bạn ở các lớp và gửi phiếu hỏi đến bố mẹ các bạn đó, nhờ trả lời rồi gửi lại.<br>" +
              "• Tròn gửi phiếu hỏi đến các bạn trong câu lạc bộ Tin học của trường.<br>" +
              "Theo em, cách làm của bạn nào hợp lí hơn? Giải thích.",
            modelAnswer: "Đối tượng cần tìm hiểu là <b>toàn bộ học sinh trong trường</b>.<br>" +
              "• Cách của Tròn chỉ hỏi các bạn câu lạc bộ Tin học – những bạn thường dùng máy tính, Internet nhiều hơn mức chung, nên dữ liệu không đảm bảo tính đại diện.<br>" +
              "• Cách của Vuông chọn ngẫu nhiên học sinh ở các lớp nên đại diện được cho toàn trường; hỏi bố mẹ (người theo dõi con ở nhà vào cuối tuần) giúp thông tin khách quan hơn.<br>" +
              "Vậy cách của <b>Vuông</b> hợp lí hơn.",
            rubric: [
              { pts: 0.5, text: "Chỉ ra cách của Tròn không đại diện (chỉ hỏi câu lạc bộ Tin học)." },
              { pts: 0.5, text: "Chỉ ra cách của Vuông chọn ngẫu nhiên ở các lớp nên đại diện cho toàn trường." },
              { pts: 0.5, text: "Kết luận đúng: cách của Vuông hợp lí hơn." }
            ]
          },
          {
            id: "d2e2", level: "kho", source: "SGK Bài 17 – BT 5.5 (biến đổi)", maxPoints: 1.5,
            q: "An phỏng vấn 40 bạn nữ trong trường thì thấy có 28 bạn thích nhảy dây. An kết luận: \"Đa phần học sinh trong trường thích nhảy dây\".<br>" +
              "a) Tính tỉ lệ phần trăm số bạn thích nhảy dây trong những bạn được phỏng vấn.<br>" +
              "b) Kết luận của An có hợp lí không? Vì sao? Em hãy đề xuất một cách khảo sát tốt hơn.",
            modelAnswer: "a) Tỉ lệ: $\\frac{28}{40} = 0{,}7 = 70\\%$.<br>" +
              "b) Kết luận <b>không hợp lí</b>: kết luận nói về toàn bộ học sinh trong trường (cả nam và nữ), nhưng An chỉ hỏi các bạn nữ, nên dữ liệu không đảm bảo tính đại diện.<br>" +
              "Cách tốt hơn: ở mỗi lớp chọn ngẫu nhiên một số bạn (cả nam và nữ, ví dụ các bạn có số thứ tự $5;\\ 10;\\ 15;\\ \\ldots$ trong danh sách lớp) để phỏng vấn.",
            rubric: [
              { pts: 0.5, text: "Tính đúng tỉ lệ $70\\%$." },
              { pts: 0.5, text: "Kết luận không hợp lí, giải thích: chỉ hỏi bạn nữ nên không đại diện cho toàn trường." },
              { pts: 0.5, text: "Đề xuất được cách chọn ngẫu nhiên học sinh (cả nam và nữ) ở các lớp." }
            ]
          }
        ]
      },

      // ======================= ĐỀ 3 =======================
      {
        id: "d3", name: "Đề 3",
        mcq: [
          {
            id: "d3q1", level: "de", source: "SGK tr.89 – Ghi nhớ",
            q: "Dữ liệu là số còn được gọi là",
            options: ["dữ liệu định tính", "dữ liệu định lượng", "dữ liệu có thứ tự", "dữ liệu đại diện"],
            answer: 1,
            explain: "Dữ liệu là số còn gọi là số liệu hay dữ liệu định lượng; dữ liệu không là số gọi là dữ liệu định tính."
          },
          {
            id: "d3q2", level: "de", source: "SGK Bài 17 – BT 5.1b",
            q: "Dãy dữ liệu về môn học yêu thích của các bạn: Toán, Ngữ văn, Tiếng Anh, Tin học thuộc loại nào?",
            options: [SL, TT, KD, KTT],
            answer: 3,
            explain: "Tên môn học không phải là số, cũng không có môn nào \"cao hơn\" môn nào, nên đây là dữ liệu không là số, không thể sắp thứ tự."
          },
          {
            id: "d3q3", level: "de", source: "SBT Bài 17 – BT 5.2c",
            q: "Muốn biết tỉ lệ học sinh nhặt rác bỏ vào thùng khi nhìn thấy rác trên sân trường, cách thu thập dữ liệu phù hợp nhất là",
            options: ["Quan sát", "Làm thí nghiệm", "Phỏng vấn các thầy cô", "Lập bảng hỏi gửi phụ huynh"],
            answer: 0,
            explain: "Hành vi nhặt rác diễn ra trên sân trường, cần xem trực tiếp các bạn làm gì nên quan sát là phù hợp. Hỏi thì các bạn có thể trả lời không đúng với việc mình làm."
          },
          {
            id: "d3q4", level: "de", source: "SBT Bài 17 – BT 5.1d",
            q: "Số năm học ngoại ngữ của các bạn trong lớp: $2;\\ 4;\\ 5;\\ 3;\\ 4$ thuộc loại dữ liệu nào?",
            options: [KTT, TT, SL, KD],
            answer: 2,
            explain: "Số năm học là số đếm, có thể cộng, tính trung bình có ý nghĩa, nên đây là số liệu."
          },
          {
            id: "d3q5", level: "vua", source: "mới",
            q: "Dữ liệu về loại huy chương các vận động viên đạt được: Vàng, Bạc, Đồng thuộc loại nào?",
            options: [TT, KTT, SL, KD],
            answer: 0,
            explain: "Huy chương không phải là số nhưng xếp được theo thành tích: Vàng (nhất) → Bạc (nhì) → Đồng (ba). Đây là dữ liệu không là số, có thể sắp thứ tự."
          },
          {
            id: "d3q6", level: "vua", source: "SGK tr.91 – Nhận xét",
            q: "Để đánh giá chất lượng bữa ăn bán trú của toàn trường, cách lấy ý kiến nào đảm bảo tính đại diện?",
            options: ["Hỏi ý kiến các bạn ăn bán trú của lớp 6A", "Hỏi ý kiến các bạn trong ban cán sự các lớp", "Mỗi lớp chọn ngẫu nhiên 3 bạn ăn bán trú để hỏi", "Chỉ hỏi những bạn ăn hết suất cơm"],
            answer: 2,
            explain: "Chọn ngẫu nhiên các bạn ăn bán trú ở mọi lớp thì nhóm được hỏi đại diện cho toàn trường. Hỏi một lớp, ban cán sự hay chỉ những bạn ăn hết suất đều là nhóm đặc biệt."
          },
          {
            id: "d3q7", level: "vua", source: "SGK Bài 17 – BT 5.4b",
            q: "Để đánh giá thể lực của học sinh toàn trường, thầy giáo cho các bạn trong câu lạc bộ Điền kinh chạy 800 m và ghi lại kết quả. Dữ liệu thu được có đảm bảo tính đại diện không?",
            options: ["Có, vì các bạn đều là học sinh của trường", "Không, vì các bạn câu lạc bộ Điền kinh thường có thể lực tốt hơn mức chung", "Có, vì chạy 800 m là bài kiểm tra phổ biến", "Không, vì cự li 800 m quá ngắn"],
            answer: 1,
            explain: "Đối tượng cần đánh giá là toàn trường, nhưng chỉ kiểm tra các bạn tập điền kinh – nhóm có thể lực tốt hơn mức chung. Dữ liệu không đại diện cho toàn trường."
          },
          {
            id: "d3q8", level: "vua", source: "SGK Bài 17 – BT 5.4a (biến đổi)",
            q: "Một khu dân cư có 3 000 hộ được đánh số từ 1 đến 3 000. Người ta ghi lại số xe máy của các hộ có số thứ tự $1;\\ 11;\\ 21;\\ \\ldots;\\ 2\\,991$. Số hộ được ghi lại là",
            options: ["$299$", "$30$", "$301$", "$300$"],
            answer: 3,
            explain: "Các số cách đều nhau 10 đơn vị: $\\frac{2\\,991 - 1}{10} + 1 = 299 + 1 = 300$ hộ."
          },
          {
            id: "d3q9", level: "kho", source: "SGK Bài 17 – BT 5.5",
            q: "Bình phỏng vấn 50 bạn nam trong trường, thấy có 30 bạn thích bóng đá. Kết luận nào sau đây là hợp lí?",
            options: ["Đa phần học sinh trong trường thích bóng đá", "$60\\%$ học sinh trong trường thích bóng đá", "Trong 50 bạn nam được hỏi, có $60\\%$ thích bóng đá", "Các bạn nữ trong trường không thích bóng đá"],
            answer: 2,
            explain: "$\\frac{30}{50} = 60\\%$. Chỉ hỏi bạn nam nên không thể kết luận cho toàn trường (hay cho các bạn nữ); kết luận hợp lí chỉ nói về nhóm 50 bạn nam được hỏi."
          },
          {
            id: "d3q10", level: "kho", source: "SGK tr.90 – Tranh luận",
            q: "Với dãy dữ liệu nào sau đây, việc tính trung bình cộng là có ý nghĩa?",
            options: ["Số trang sách mỗi bạn đọc trong tuần: $50;\\ 80;\\ 120;\\ 64$", "Số áo của các cầu thủ: $3;\\ 9;\\ 11;\\ 20$", "Mã bưu chính của một số tỉnh", "Số các tuyến xe buýt: $01;\\ 02;\\ 12;\\ 15$"],
            answer: 0,
            explain: "Số trang sách là số đếm (số liệu) nên trung bình cộng cho biết trung bình mỗi bạn đọc bao nhiêu trang. Số áo, mã bưu chính, số tuyến xe buýt chỉ dùng để gọi tên nên trung bình cộng không có ý nghĩa."
          }
        ],
        essay: [
          {
            id: "d3e1", level: "vua", source: "SBT Bài 17 – BT 5.1 (biến đổi)", maxPoints: 2,
            q: "Cho biết mỗi dãy dữ liệu sau thuộc loại nào. Giải thích ngắn gọn.<br>" +
              "a) Thời gian (phút) đi từ nhà đến trường của các bạn trong tổ.<br>" +
              "b) Phương tiện các bạn đi đến trường: xe đạp, đi bộ, xe buýt, bố mẹ đưa.<br>" +
              "c) Mức độ yêu thích môn Toán: Rất thích, Thích, Bình thường, Không thích.<br>" +
              "d) Số điện thoại của phụ huynh các bạn trong tổ.",
            modelAnswer: "a) Thời gian là số đo → <b>số liệu</b> (dữ liệu định lượng).<br>" +
              "b) Tên phương tiện, không có thứ tự hơn kém → <b>dữ liệu không là số, không thể sắp thứ tự</b>.<br>" +
              "c) Các mức độ xếp được từ cao đến thấp → <b>dữ liệu không là số, có thể sắp thứ tự</b>.<br>" +
              "d) Số điện thoại tuy viết bằng chữ số nhưng chỉ dùng để liên lạc, gọi tên; cộng hay tính trung bình không có ý nghĩa → <b>không phải số liệu</b> (là dữ liệu không là số, không thể sắp thứ tự).",
            rubric: [
              { pts: 0.5, text: "a) Số liệu." },
              { pts: 0.5, text: "b) Dữ liệu không là số, không thể sắp thứ tự." },
              { pts: 0.5, text: "c) Dữ liệu không là số, có thể sắp thứ tự." },
              { pts: 0.5, text: "d) Không phải số liệu, có giải thích (số chỉ để gọi tên/liên lạc)." }
            ]
          },
          {
            id: "d3e2", level: "kho", source: "SBT Bài 17 – BT 5.6", maxPoints: 1,
            q: "Để ước lượng chiều cao trung bình của học sinh khối 7, một nhóm nghiên cứu chọn ngẫu nhiên ở mỗi lớp khối 7 ra 10 học sinh và đo chiều cao. Số liệu thu được có đảm bảo tính đại diện không? Vì sao?",
            modelAnswer: "Đối tượng cần quan tâm là toàn bộ học sinh khối 7. Nhóm nghiên cứu chọn <b>ngẫu nhiên</b> học sinh ở <b>tất cả</b> các lớp của khối 7, nên mọi học sinh khối 7 đều có cơ hội được chọn và nhóm được đo có đủ thành phần (cao, thấp, nam, nữ, các lớp).<br>" +
              "Vậy số liệu thu được <b>đảm bảo tính đại diện</b>.",
            rubric: [
              { pts: 0.5, text: "Nêu được: chọn ngẫu nhiên ở tất cả các lớp của khối 7." },
              { pts: 0.5, text: "Kết luận đúng: số liệu đảm bảo tính đại diện." }
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
            q: "Cho các dãy dữ liệu: (1) Số học sinh của mỗi lớp; (2) Số điện thoại của các bạn trong tổ; (3) Cân nặng (kg) của các bạn; (4) Năm sinh của các thành viên trong gia đình; (5) Mã số học sinh. Có bao nhiêu dãy là số liệu?",
            options: ["$2$", "$3$", "$4$", "$5$"],
            answer: 1,
            explain: "Số liệu: (1) số đếm, (3) số đo, (4) năm sinh (dùng để tính tuổi, so sánh có ý nghĩa) – gồm 3 dãy. Số điện thoại (2) và mã số học sinh (5) chỉ dùng để gọi tên, đánh dấu."
          },
          {
            id: "d4q2", level: "vua", source: "mới",
            q: "Câu hỏi khảo sát nào sau đây được đặt <b>chưa</b> hợp lí (dẫn dắt người trả lời theo một ý)?",
            options: ["Mỗi ngày bạn dành khoảng bao nhiêu phút để tập thể thao?", "Bạn có đồng ý rằng ai lười tập thể thao là người lười biếng không?", "Môn thể thao bạn thích nhất là gì?", "Mỗi tuần bạn tập thể thao mấy buổi?"],
            answer: 1,
            explain: "Câu hỏi \"ai lười tập thể thao là người lười biếng\" đã gài sẵn ý kiến của người hỏi, khiến người trả lời ngại nói thật. Câu hỏi khảo sát cần trung lập, rõ ràng, dễ trả lời."
          },
          {
            id: "d4q3", level: "kho", source: "SBT Bài 17 – Ví dụ 2",
            q: "Một nhóm khảo sát 500 học sinh THCS ở Hà Nội, Thành phố Hồ Chí Minh và Đà Nẵng, thấy 150 học sinh có kiến thức tin học tốt, rồi kết luận: \"30% học sinh THCS Việt Nam có kiến thức tin học tốt\". Lí do chính khiến kết luận chưa hợp lí là",
            options: ["Tính sai tỉ lệ phần trăm", "Không được khảo sát học sinh THCS", "Học sinh ở các thành phố lớn có điều kiện tiếp cận tin học tốt hơn, không đại diện cho học sinh cả nước", "Phải khảo sát đúng 1 000 học sinh mới được kết luận"],
            answer: 2,
            explain: "$\\frac{150}{500} = 30\\%$ tính đúng. Vấn đề là đối tượng kết luận là học sinh THCS cả nước, mà chỉ khảo sát ở ba thành phố lớn – nơi học sinh có điều kiện học tin học tốt hơn. Dữ liệu không đại diện nên kết luận chưa hợp lí."
          },
          {
            id: "d4q4", level: "kho", source: "SGK Bài 17 – BT 5.4a (biến đổi)",
            q: "Một nhà máy sản xuất 2 400 sản phẩm mỗi ngày, được đánh số từ 1 đến 2 400. Bộ phận kiểm tra chọn các sản phẩm có số $5;\\ 25;\\ 45;\\ 65;\\ \\ldots$ (mỗi số hơn số trước 20 đơn vị, không vượt quá 2 400). Số sản phẩm được kiểm tra là",
            options: ["$120$", "$119$", "$121$", "$100$"],
            answer: 0,
            explain: "Các số có dạng $5 + 20k$. Số lớn nhất không vượt quá 2 400 là $2\\,385$ (vì $2\\,385 + 20 = 2\\,405 > 2\\,400$). Số sản phẩm: $\\frac{2\\,385 - 5}{20} + 1 = 119 + 1 = 120$."
          },
          {
            id: "d4q5", level: "kho", source: "SBT Bài 17 – BT 5.7 (biến đổi)",
            q: "Một siêu thị chọn đều đặn 120 khách (theo số thứ tự vào cửa) trong một ngày và thấy có 42 người mang túi vải đi chợ. Mỗi ngày siêu thị có khoảng 3 000 khách. Ước lượng số khách mang túi vải mỗi ngày là khoảng",
            options: ["$1\\,260$ người", "$420$ người", "$350$ người", "$1\\,050$ người"],
            answer: 3,
            explain: "Tỉ lệ trong mẫu: $\\frac{42}{120} = 0{,}35 = 35\\%$. Mẫu chọn đều đặn nên đại diện, ước lượng: $35\\% \\cdot 3\\,000 = 1\\,050$ người."
          },
          {
            id: "d4q6", level: "kho", source: "mới",
            q: "Mai khảo sát các bạn về mức độ yêu thích môn Mĩ thuật và ghi lại: Rất thích: 12 bạn; Thích: 15 bạn; Bình thường: 8 bạn; Không thích: 5 bạn. Dữ liệu về mức độ yêu thích thuộc loại nào và Mai đã hỏi bao nhiêu bạn?",
            options: ["Số liệu; 40 bạn", "Dữ liệu không là số, không thể sắp thứ tự; 40 bạn", "Dữ liệu không là số, có thể sắp thứ tự; 35 bạn", "Dữ liệu không là số, có thể sắp thứ tự; 40 bạn"],
            answer: 3,
            explain: "Các mức Rất thích → Thích → Bình thường → Không thích không là số nhưng sắp được thứ tự. Số bạn được hỏi: $12 + 15 + 8 + 5 = 40$ bạn. (Các số 12, 15, 8, 5 là số bạn chọn mỗi mức, không phải bản thân dữ liệu về mức độ yêu thích.)"
          },
          {
            id: "d4q7", level: "kho", source: "mới",
            q: "Lớp trưởng ghi lại cân nặng (kg) của năm bạn lớp 7: $38;\\ 41;\\ 450;\\ 45;\\ 39$. Giá trị nào chắc chắn là <b>không hợp lí</b> (ghi nhầm)?",
            options: ["$38$", "$41$", "$450$", "$39$"],
            answer: 2,
            explain: "Một học sinh lớp 7 không thể nặng 450 kg; có lẽ lớp trưởng ghi nhầm (chẳng hạn 45,0 kg). Các giá trị còn lại đều hợp lí."
          },
          {
            id: "d4q8", level: "kho", source: "SGK Bài 17 – BT 5.4a (biến đổi)",
            q: "Một trường có 1 200 học sinh được đánh số từ 1 đến 1 200. Chọn các bạn có số thứ tự $6;\\ 12;\\ 18;\\ \\ldots;\\ 1\\,200$ thì thấy có 46 bạn bị cận thị. Ước lượng số học sinh bị cận thị của trường là khoảng",
            options: ["$230$ bạn", "$276$ bạn", "$46$ bạn", "$460$ bạn"],
            answer: 1,
            explain: "Số bạn được chọn: $\\frac{1\\,200 - 6}{6} + 1 = 200$. Tỉ lệ cận thị: $\\frac{46}{200} = 23\\%$. Ước lượng cả trường: $23\\% \\cdot 1\\,200 = 276$ bạn."
          },
          {
            id: "d4q9", level: "kho", source: "SGK tr.91 – Nhận xét",
            q: "Để khảo sát thời gian ngủ mỗi đêm của học sinh toàn trường (từ khối 6 đến khối 9), cách chọn mẫu nào tốt nhất?",
            options: ["Mỗi khối chọn ngẫu nhiên 10 học sinh", "Chọn ngẫu nhiên 40 học sinh khối 9", "Hỏi 40 học sinh đi học muộn vào sáng thứ Hai", "Hỏi 40 học sinh trong đội tuyển học sinh giỏi"],
            answer: 0,
            explain: "Thời gian ngủ có thể khác nhau giữa các khối, nên cần chọn ngẫu nhiên ở mọi khối. Chỉ hỏi khối 9, các bạn đi học muộn hay đội tuyển (thường thức khuya ôn bài) đều không đại diện."
          },
          {
            id: "d4q10", level: "kho", source: "SGK tr.91 – Ví dụ 3",
            q: "Chọn ngẫu nhiên 100 học sinh của một trường, thấy có 64 bạn có xe đạp riêng. Kết luận nào sau đây hợp lí?",
            options: ["Đúng 64 học sinh của trường có xe đạp riêng", "Khoảng $64\\%$ học sinh cả nước có xe đạp riêng", "Những bạn không có xe đạp riêng đều đi bộ đến trường", "Khoảng $64\\%$ học sinh của trường có xe đạp riêng"],
            answer: 3,
            explain: "Mẫu chọn ngẫu nhiên trong trường nên đại diện cho học sinh của trường: tỉ lệ $\\frac{64}{100} = 64\\%$. Không thể nói \"đúng 64 bạn\" (trường có nhiều hơn 100 bạn), không thể suy rộng ra cả nước, và dữ liệu không cho biết các bạn khác đi học bằng gì."
          }
        ],
        essay: [
          {
            id: "d4e1", level: "kho", source: "SGK tr.91 – Ví dụ 3 (biến đổi)", maxPoints: 1.5,
            q: "Một công ty thử một loại kem đánh răng mới bằng cách cho 200 người từ 18 đến 25 tuổi sử dụng. Sau một tháng, 180 người thấy răng trắng hơn. Công ty quảng cáo: \"90% người dùng thấy răng trắng hơn sau một tháng\".<br>" +
              "a) Kiểm tra tỉ lệ $90\\%$.<br>b) Quảng cáo này có hợp lí không? Vì sao? Hãy viết lại một câu kết luận hợp lí dựa trên khảo sát đó.",
            modelAnswer: "a) $\\frac{180}{200} = 0{,}9 = 90\\%$, tỉ lệ tính đúng.<br>" +
              "b) Quảng cáo <b>không hợp lí</b>: \"người dùng\" gồm mọi độ tuổi (trẻ em, người lớn tuổi…), nhưng công ty chỉ thử trên người từ 18 đến 25 tuổi, nên dữ liệu không đại diện cho toàn bộ người dùng.<br>" +
              "Kết luận hợp lí: \"Trong 200 người từ 18 đến 25 tuổi dùng thử, có $90\\%$ thấy răng trắng hơn sau một tháng\".",
            rubric: [
              { pts: 0.5, text: "Tính đúng $\\frac{180}{200} = 90\\%$." },
              { pts: 0.5, text: "Quảng cáo không hợp lí, giải thích: chỉ khảo sát người 18–25 tuổi, không đại diện cho mọi người dùng." },
              { pts: 0.5, text: "Viết được kết luận hợp lí, giới hạn đúng nhóm được khảo sát." }
            ]
          },
          {
            id: "d4e2", level: "kho", source: "SBT Bài 17 – BT 5.7 (biến đổi)", maxPoints: 1.5,
            q: "Một hiệu sách đánh số khách hàng trong tuần và ghi lại thể loại sách mà các vị khách thứ $10;\\ 20;\\ 30;\\ \\ldots;\\ 1\\,500$ đã mua. Trong số khách này, có 36 người mua truyện tranh.<br>" +
              "a) Hiệu sách đã ghi lại thông tin của bao nhiêu khách?<br>" +
              "b) Hiệu sách kết luận: \"Khoảng 24% khách hàng mua truyện tranh\". Kết luận này có hợp lí không? Giải thích.<br>" +
              "c) Dữ liệu \"thể loại sách đã mua\" thuộc loại nào?",
            modelAnswer: "a) Số khách: $\\frac{1\\,500 - 10}{10} + 1 = 149 + 1 = 150$ khách.<br>" +
              "b) Tỉ lệ: $\\frac{36}{150} = 0{,}24 = 24\\%$. Khách được chọn đều đặn theo số thứ tự (không phụ thuộc vào loại sách họ mua) nên dữ liệu đảm bảo tính đại diện cho khách hàng của hiệu sách. Kết luận <b>hợp lí</b>.<br>" +
              "c) Thể loại sách (truyện tranh, sách tham khảo, văn học…) là <b>dữ liệu không là số, không thể sắp thứ tự</b>.",
            rubric: [
              { pts: 0.5, text: "Tính đúng 150 khách." },
              { pts: 0.5, text: "Tính tỉ lệ $24\\%$ và kết luận hợp lí vì cách chọn khách đảm bảo tính đại diện." },
              { pts: 0.5, text: "Phân loại đúng: dữ liệu không là số, không thể sắp thứ tự." }
            ]
          }
        ]
      }
    ]
  });
})();
