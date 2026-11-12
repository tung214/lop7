registerLesson({
  id: "c2-on",
  chapter: 2,
  kind: "review",
  title: "Ôn tập chương II",
  sgkPages: [26, 39],
  sbtPages: [33, 34],
  objectives: [
    "Nhận biết số thập phân hữu hạn, số thập phân vô hạn tuần hoàn; viết gọn bằng chu kì và đổi về phân số",
    "Làm tròn số theo độ chính xác cho trước, ước lượng kết quả phép tính",
    "Nhận biết số vô tỉ; tính căn bậc hai số học, so sánh các căn bậc hai",
    "Nhận biết tập hợp số thực, biểu diễn và so sánh số thực trên trục số",
    "Tính giá trị tuyệt đối của một số thực và vận dụng để giải bài tập"
  ],

  theory: [
    {
      heading: "1. Số thập phân hữu hạn và vô hạn tuần hoàn (Bài 5)",
      html: "<ul>" +
        "<li>Chia tử cho mẫu của một phân số, ta được <b>số thập phân hữu hạn</b> (phép chia dừng lại, ví dụ $\\frac{3}{8} = 0{,}375$) hoặc <b>số thập phân vô hạn tuần hoàn</b> (một nhóm chữ số lặp lại mãi, ví dụ $\\frac{5}{6} = 0{,}8333\\ldots$).</li>" +
        "<li>Nhóm chữ số lặp lại gọi là <b>chu kì</b>; viết gọn bằng cách đặt chu kì trong ngoặc: $0{,}8333\\ldots = 0{,}8(3)$; $\\ 1{,}424242\\ldots = 1{,}(42)$.</li>" +
        "<li>Phân số tối giản, mẫu dương: nếu mẫu <b>chỉ có ước nguyên tố 2 và 5</b> thì viết được dạng số thập phân hữu hạn; nếu mẫu <b>có ước nguyên tố khác 2 và 5</b> thì viết được dạng số thập phân vô hạn tuần hoàn.</li>" +
        "<li>Mỗi số thập phân vô hạn tuần hoàn biểu diễn một số hữu tỉ: $0{,}(1) = \\frac{1}{9}$; $\\ 0{,}(01) = \\frac{1}{99}$; $\\ 0{,}(17) = \\frac{17}{99}$.</li>" +
        "<li><b>Làm tròn theo độ chính xác $d$</b>: làm tròn đến hàng nào thì độ chính xác bằng nửa đơn vị hàng đó. Độ chính xác $0{,}5$ → hàng đơn vị; $0{,}05$ → hàng phần mười; $0{,}005$ → hàng phần trăm; $5$ → hàng chục; $50$ → hàng trăm.</li>" +
        "</ul>"
    },
    {
      heading: "2. Số vô tỉ. Căn bậc hai số học (Bài 6)",
      html: "<ul>" +
        "<li><b>Số vô tỉ</b> là số viết được dưới dạng số thập phân vô hạn <b>không tuần hoàn</b>. Tập hợp các số vô tỉ kí hiệu là $\\mathbb{I}$. Ví dụ: $\\pi = 3{,}14159\\ldots$, $\\sqrt{2} = 1{,}41421\\ldots$</li>" +
        "<li><b>Căn bậc hai số học</b> của số $a \\ge 0$ là số $x \\ge 0$ sao cho $x^2 = a$, kí hiệu $\\sqrt{a}$. Ví dụ $\\sqrt{49} = 7$; $\\sqrt{0{,}36} = 0{,}6$; $\\sqrt{0} = 0$. Số âm không có căn bậc hai số học.</li>" +
        "<li>Với $a \\ge 0$: $\\left(\\sqrt{a}\\right)^2 = a$ và $\\sqrt{a^2} = a$.</li>" +
        "<li>Nếu số tự nhiên $n$ là số chính phương ($0; 1; 4; 9; 16; \\ldots$) thì $\\sqrt{n}$ là số tự nhiên; nếu $n$ không phải số chính phương thì $\\sqrt{n}$ là số vô tỉ (ví dụ $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}$).</li>" +
        "<li>Dùng máy tính cầm tay (phím $\\sqrt{\\ }$) để tính gần đúng căn bậc hai, rồi làm tròn theo yêu cầu.</li>" +
        "</ul>"
    },
    {
      heading: "3. Tập hợp các số thực (Bài 7)",
      html: "<ul>" +
        "<li>Số hữu tỉ và số vô tỉ gọi chung là <b>số thực</b>, kí hiệu $\\mathbb{R}$. Ta có $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ và $\\mathbb{I} \\subset \\mathbb{R}$.</li>" +
        "<li>Mỗi số thực được biểu diễn bởi đúng một điểm trên trục số và ngược lại (trục số thực). Mỗi số thực $a$ có số đối là $-a$.</li>" +
        "<li><b>So sánh</b>: với hai số thực $a, b$ luôn có $a = b$, $a \\lt b$ hoặc $a \\gt b$; tính chất bắc cầu vẫn đúng. Nếu $0 \\le a \\lt b$ thì $\\sqrt{a} \\lt \\sqrt{b}$, ví dụ $\\sqrt{2} \\lt \\sqrt{5}$.</li>" +
        "<li><b>Giá trị tuyệt đối</b> của số thực $a$, kí hiệu $|a|$, là khoảng cách từ điểm $a$ đến gốc $O$: $|a| = a$ nếu $a \\ge 0$; $|a| = -a$ nếu $a \\lt 0$.</li>" +
        "<li>Luôn có $|a| \\ge 0$, $|-a| = |a|$; hai số đối nhau có giá trị tuyệt đối bằng nhau. Trong hai số âm, số nào có giá trị tuyệt đối lớn hơn thì số đó <b>nhỏ hơn</b>.</li>" +
        "</ul>"
    }
  ],

  skills: [
    "<b>Phân số → số thập phân</b>: rút gọn phân số về tối giản, mẫu dương rồi phân tích mẫu ra thừa số nguyên tố để biết là hữu hạn hay vô hạn tuần hoàn mà không cần chia. Ví dụ $\\frac{6}{75} = \\frac{2}{25}$ (mẫu $5^2$) là hữu hạn.",
    "<b>Số thập phân vô hạn tuần hoàn → phân số</b>: đặt $x$ bằng số đó, nhân với $10, 100, 1000, \\ldots$ để dịch đúng một chu kì rồi trừ. Ví dụ $x = 0{,}(36)$: $100x = 36 + x$ nên $99x = 36$, $x = \\frac{36}{99} = \\frac{4}{11}$. Có chữ số đứng trước chu kì thì tách: $1{,}2(3) = 1{,}2 + \\frac{1}{10} \\cdot 0{,}(3) = \\frac{12}{10} + \\frac{1}{30} = \\frac{37}{30}$.",
    "<b>Làm tròn theo độ chính xác</b>: tìm hàng làm tròn (độ chính xác bằng nửa đơn vị hàng đó), rồi làm tròn bình thường. Với số vô hạn tuần hoàn, viết thêm vài chữ số của chu kì trước khi làm tròn: $3{,}2(31) = 3{,}2313131\\ldots$",
    "<b>So sánh căn bậc hai với một số</b>: bình phương số kia rồi so sánh. Ví dụ $4{,}1^2 = 16{,}81 \\lt 17$ nên $4{,}1 \\lt \\sqrt{17}$.",
    "<b>Tìm $x$ khi có giá trị tuyệt đối</b>: $|A| = m$ với $m \\gt 0$ thì $A = m$ hoặc $A = -m$ (hai trường hợp); $|A| = 0$ thì $A = 0$; $|A| = m$ với $m \\lt 0$ thì không có $x$.",
    "<b>Giá trị lớn nhất, nhỏ nhất</b>: dùng $\\sqrt{A} \\ge 0$ và $|A| \\ge 0$. Ví dụ $\\sqrt{x^2 + 9} \\ge \\sqrt{9} = 3$, dấu bằng khi $x = 0$.",
    "<b>Chứng tỏ $\\sqrt{n}$ là số vô tỉ</b>: chỉ ra $n$ không phải số chính phương, chẳng hạn vì chữ số tận cùng là $2, 3, 7, 8$ (số chính phương chỉ tận cùng bằng $0, 1, 4, 5, 6, 9$).",
    "<b>Lỗi hay gặp 1</b>: viết $\\sqrt{49} = \\pm 7$ hay $\\sqrt{49} = -7$. Căn bậc hai số học luôn <b>không âm</b>: $\\sqrt{49} = 7$.",
    "<b>Lỗi hay gặp 2</b>: viết sai chu kì: $2{,}1363636\\ldots = 2{,}1(36)$ chứ không phải $2{,}(136)$; và nhầm $0{,}(3) = \\frac{3}{10}$ (đúng là $\\frac{3}{9} = \\frac{1}{3}$).",
    "<b>Lỗi hay gặp 3</b>: chỉ lấy một trường hợp khi tìm $x$ trong $|x - 1| = 3$ (quên $x = -2$), hoặc nghĩ $|x| = x$ với mọi $x$.",
    "<b>Lỗi hay gặp 4</b>: nghĩ tổng (tích) của hai số vô tỉ luôn là số vô tỉ. Phản ví dụ: $\\sqrt{2} + (-\\sqrt{2}) = 0$; $\\sqrt{2} \\cdot \\sqrt{2} = 2$."
  ],

  examples: [
    {
      q: "Viết số $0{,}1(2)$ dưới dạng phân số tối giản.",
      solution: "Ta có $0{,}(2) = 2 \\cdot 0{,}(1) = \\frac{2}{9}$.<br>" +
        "$0{,}1(2) = 0{,}1222\\ldots = \\frac{1{,}222\\ldots}{10} = \\frac{1 + \\frac{2}{9}}{10} = \\frac{11}{9} : 10 = \\frac{11}{90}$.<br>" +
        "Thử lại: $11 : 90 = 0{,}1222\\ldots$ ✓. Vậy $0{,}1(2) = \\frac{11}{90}$."
    },
    {
      q: "So sánh $-\\sqrt{26}$ và $-5{,}1$ (không dùng máy tính).",
      solution: "So sánh hai giá trị tuyệt đối: $5{,}1^2 = 26{,}01 \\gt 26$ nên $\\sqrt{26} \\lt 5{,}1$.<br>" +
        "Trong hai số âm, số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn, nên $-5{,}1 \\lt -\\sqrt{26}$, tức là $-\\sqrt{26} \\gt -5{,}1$."
    },
    {
      q: "Tìm $x$, biết $|x| - 1{,}5 = 2$.",
      solution: "Chuyển vế: $|x| = 2 + 1{,}5 = 3{,}5$.<br>" +
        "Số có giá trị tuyệt đối bằng $3{,}5$ là $3{,}5$ và $-3{,}5$.<br>" +
        "Vậy $x = 3{,}5$ hoặc $x = -3{,}5$."
    }
  ],

  sets: [
    // ========================= ĐỀ 1 =========================
    { id: "d1", name: "Đề 1",
      mcq: [
        { id: "d1q1", level: "de", source: "SBT Ôn tập chương II – câu 1",
          q: "Phân số nào sau đây viết được dưới dạng số thập phân vô hạn tuần hoàn?",
          options: ["$\\frac{7}{40}$", "$\\frac{9}{250}$", "$\\frac{11}{24}$", "$\\frac{13}{64}$"],
          answer: 2,
          explain: "Các phân số đều tối giản. Mẫu $24 = 2^3 \\cdot 3$ có ước nguyên tố $3$ (khác 2 và 5) nên $\\frac{11}{24} = 0{,}458(3)$ là số thập phân vô hạn tuần hoàn. Các mẫu $40 = 2^3 \\cdot 5$, $250 = 2 \\cdot 5^3$, $64 = 2^6$ chỉ có ước 2, 5." },
        { id: "d1q2", level: "de", source: "SGK tr.28 – Em có biết",
          q: "Số $0{,}(4)$ viết dưới dạng phân số là:",
          options: ["$\\frac{4}{10}$", "$\\frac{4}{9}$", "$\\frac{2}{5}$", "$\\frac{4}{99}$"],
          answer: 1,
          explain: "$0{,}(4) = 4 \\cdot 0{,}(1) = 4 \\cdot \\frac{1}{9} = \\frac{4}{9}$. ($\\frac{4}{10} = \\frac{2}{5} = 0{,}4$ là số thập phân hữu hạn; $\\frac{4}{99} = 0{,}(04)$.)" },
        { id: "d1q3", level: "de", source: "mới",
          q: "$\\sqrt{49}$ bằng:",
          options: ["$7$", "$-7$", "$\\pm 7$", "$24{,}5$"],
          answer: 0,
          explain: "Căn bậc hai số học của $49$ là số <b>không âm</b> có bình phương bằng $49$, đó là $7$. Không viết $\\pm 7$." },
        { id: "d1q4", level: "de", source: "mới",
          q: "Giá trị tuyệt đối của $-3{,}5$ là:",
          options: ["$-3{,}5$", "$0$", "$7$", "$3{,}5$"],
          answer: 3,
          explain: "$-3{,}5 \\lt 0$ nên $|-3{,}5| = -(-3{,}5) = 3{,}5$. Giá trị tuyệt đối luôn không âm." },
        { id: "d1q5", level: "vua", source: "mới",
          q: "Khẳng định nào sau đây đúng?",
          options: ["$\\sqrt{9} \\in \\mathbb{I}$", "$-\\sqrt{2} \\in \\mathbb{Q}$", "$0{,}(12) \\in \\mathbb{I}$", "$\\pi \\in \\mathbb{R}$"],
          answer: 3,
          explain: "$\\pi$ là số vô tỉ nên là số thực. $\\sqrt{9} = 3$ là số hữu tỉ; $-\\sqrt{2}$ là số vô tỉ; $0{,}(12) = \\frac{12}{99}$ là số hữu tỉ." },
        { id: "d1q6", level: "vua", source: "SGK tr.28 – Ví dụ 2",
          q: "Làm tròn số $4\\,728{,}163$ với độ chính xác $5$ ta được:",
          options: ["$4\\,728$", "$4\\,730$", "$4\\,700$", "$4\\,728{,}2$"],
          answer: 1,
          explain: "Độ chính xác $5$ là nửa đơn vị hàng chục, nên làm tròn đến hàng chục: chữ số hàng đơn vị là $8 \\ge 5$ nên $4\\,728{,}163 \\approx 4\\,730$." },
        { id: "d1q7", level: "vua", source: "SGK tr.35 – Luyện tập 3",
          q: "So sánh $\\sqrt{17}$ và $4{,}1$, ta được:",
          options: ["$\\sqrt{17} \\lt 4{,}1$", "$\\sqrt{17} = 4{,}1$", "$\\sqrt{17} \\gt 4{,}1$", "Không so sánh được vì $\\sqrt{17}$ là số vô tỉ"],
          answer: 2,
          explain: "$4{,}1^2 = 16{,}81 \\lt 17$ nên $4{,}1 = \\sqrt{16{,}81} \\lt \\sqrt{17}$. (Máy tính: $\\sqrt{17} \\approx 4{,}123$.)" },
        { id: "d1q8", level: "vua", source: "SBT Ôn tập chương II – câu 6",
          q: "Về phép tính với số vô tỉ, khẳng định nào sau đây đúng?",
          options: ["Tích của hai số vô tỉ là một số vô tỉ", "Tổng của hai số vô tỉ là một số vô tỉ", "Tổng của một số hữu tỉ và một số vô tỉ là một số vô tỉ", "Thương của hai số vô tỉ là một số vô tỉ"],
          answer: 2,
          explain: "Phản ví dụ cho các câu sai: $\\sqrt{2} \\cdot \\sqrt{2} = 2$; $\\sqrt{2} + (-\\sqrt{2}) = 0$; $\\sqrt{2} : \\sqrt{2} = 1$ đều là số hữu tỉ. Còn nếu $q + r$ (với $q$ hữu tỉ, $r$ vô tỉ) là số hữu tỉ $s$ thì $r = s - q$ sẽ là số hữu tỉ, vô lí." },
        { id: "d1q9", level: "kho", source: "mới",
          q: "Tìm $x$, biết $|x - 1| = 3$.",
          options: ["$x = 4$", "$x = -2$", "$x = 4$ hoặc $x = -2$", "$x = 2$ hoặc $x = -4$"],
          answer: 2,
          explain: "$|x - 1| = 3$ nên $x - 1 = 3$ hoặc $x - 1 = -3$, tức $x = 4$ hoặc $x = -2$. Phải xét đủ hai trường hợp." },
        { id: "d1q10", level: "kho", source: "SBT Ôn tập chương II – câu 4",
          q: "Giá trị nhỏ nhất của biểu thức $\\sqrt{x^2 + 9} - 5$ là:",
          options: ["$-5$", "$-2$", "$3$", "$0$"],
          answer: 1,
          explain: "$x^2 \\ge 0$ nên $x^2 + 9 \\ge 9$, suy ra $\\sqrt{x^2 + 9} \\ge 3$ và biểu thức $\\ge 3 - 5 = -2$. Dấu bằng khi $x = 0$. Vậy giá trị nhỏ nhất là $-2$." },
        { id: "d1q11", level: "kho", source: "SGK Bài tập cuối chương II – BT 2.29",
          q: "Chia một sợi dây dài $10$ m thành $7$ đoạn bằng nhau. Độ dài mỗi đoạn (m) viết dưới dạng số thập phân vô hạn tuần hoàn là:",
          options: ["$1{,}(428571)$", "$1{,}4(28571)$", "$1{,}(42857)$", "$1{,}43$"],
          answer: 0,
          explain: "$10 : 7 = 1{,}428571\\,428571\\ldots$, nhóm $428571$ lặp lại ngay sau dấu phẩy nên viết gọn là $1{,}(428571)$." }
      ],
      essay: [
        { id: "d1e1", level: "vua", source: "SBT Ôn tập chương II – BT 2.40 (biến đổi)", maxPoints: 1.5,
          q: "Viết các số sau dưới dạng phân số tối giản:<br>a) $0{,}(36)$;<br>b) $1{,}2(3)$.",
          modelAnswer: "a) Đặt $x = 0{,}(36)$. Khi đó $100x = 36{,}(36) = 36 + x$, suy ra $99x = 36$, $x = \\frac{36}{99} = \\frac{4}{11}$.<br>" +
            "b) $0{,}(3) = \\frac{3}{9} = \\frac{1}{3}$ nên $0{,}0(3) = \\frac{1}{3} : 10 = \\frac{1}{30}$.<br>" +
            "$1{,}2(3) = 1{,}2 + 0{,}0(3) = \\frac{12}{10} + \\frac{1}{30} = \\frac{36}{30} + \\frac{1}{30} = \\frac{37}{30}$.<br>" +
            "Thử lại: $4 : 11 = 0{,}3636\\ldots$; $\\ 37 : 30 = 1{,}2333\\ldots$ ✓",
          rubric: [
            { pts: 0.5, text: "Câu a: lập luận đúng ($100x - x = 36$ hoặc dùng $0{,}(01) = \\frac{1}{99}$) và được $\\frac{36}{99}$." },
            { pts: 0.25, text: "Câu a: rút gọn đúng $\\frac{4}{11}$." },
            { pts: 0.5, text: "Câu b: tách đúng $1{,}2(3) = 1{,}2 + 0{,}0(3)$ và đổi $0{,}0(3) = \\frac{1}{30}$." },
            { pts: 0.25, text: "Câu b: kết quả đúng $\\frac{37}{30}$." }
          ] },
        { id: "d1e2", level: "kho", source: "SGK Bài tập cuối chương II – BT 2.30 (biến đổi)", maxPoints: 1.5,
          q: "Cho hai số thực $a = -2{,}7$ và $b = -\\sqrt{7}$.<br>a) So sánh $|a|$ và $|b|$ (không dùng máy tính).<br>b) Từ đó so sánh $a$ và $b$.",
          modelAnswer: "a) $|a| = 2{,}7$; $\\ |b| = \\sqrt{7}$.<br>" +
            "Ta có $2{,}7^2 = 7{,}29 \\gt 7$ nên $2{,}7 = \\sqrt{7{,}29} \\gt \\sqrt{7}$. Vậy $|a| \\gt |b|$.<br>" +
            "b) $a$ và $b$ đều là số âm. Trong hai số âm, số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn, nên $a \\lt b$, tức là $-2{,}7 \\lt -\\sqrt{7}$.",
          rubric: [
            { pts: 0.5, text: "Tính đúng $|a| = 2{,}7$ và $|b| = \\sqrt{7}$." },
            { pts: 0.5, text: "So sánh đúng $2{,}7 \\gt \\sqrt{7}$ có lập luận (qua $2{,}7^2 = 7{,}29$)." },
            { pts: 0.5, text: "Kết luận đúng $a \\lt b$ (dùng nhận xét về hai số âm)." }
          ] }
      ] },

    // ========================= ĐỀ 2 =========================
    { id: "d2", name: "Đề 2",
      mcq: [
        { id: "d2q1", level: "de", source: "SGK Bài 5 – BT 2.1",
          q: "Phân số nào sau đây viết được dưới dạng số thập phân hữu hạn?",
          options: ["$\\frac{1}{3}$", "$\\frac{5}{12}$", "$\\frac{7}{20}$", "$\\frac{2}{15}$"],
          answer: 2,
          explain: "$20 = 2^2 \\cdot 5$ chỉ có ước nguyên tố 2 và 5 nên $\\frac{7}{20} = 0{,}35$. Các mẫu $3$, $12 = 2^2 \\cdot 3$, $15 = 3 \\cdot 5$ đều có ước 3 nên cho số vô hạn tuần hoàn." },
        { id: "d2q2", level: "de", source: "SGK Bài 5 – BT 2.2",
          q: "Số $2{,}1363636\\ldots$ viết gọn là:",
          options: ["$2{,}(136)$", "$2{,}1(36)$", "$2{,}13(6)$", "$2{,}1(363)$"],
          answer: 1,
          explain: "Sau chữ số $1$, nhóm $36$ lặp lại mãi nên chu kì là $36$: $2{,}1363636\\ldots = 2{,}1(36)$. ($2{,}(136) = 2{,}136136\\ldots$ là số khác.)" },
        { id: "d2q3", level: "de", source: "mới",
          q: "Căn bậc hai số học của $0{,}36$ là:",
          options: ["$0{,}6$", "$-0{,}6$", "$0{,}06$", "$0{,}18$"],
          answer: 0,
          explain: "$0{,}6 \\ge 0$ và $0{,}6^2 = 0{,}36$ nên $\\sqrt{0{,}36} = 0{,}6$. Chú ý $0{,}06^2 = 0{,}0036$." },
        { id: "d2q4", level: "de", source: "mới",
          q: "Số đối của $-\\sqrt{3}$ là:",
          options: ["$-\\frac{1}{\\sqrt{3}}$", "$\\frac{1}{\\sqrt{3}}$", "$-\\sqrt{3}$", "$\\sqrt{3}$"],
          answer: 3,
          explain: "Số đối của $a$ là $-a$, nên số đối của $-\\sqrt{3}$ là $-(-\\sqrt{3}) = \\sqrt{3}$." },
        { id: "d2q5", level: "vua", source: "mới",
          q: "Trong các số sau, số nào là số vô tỉ?",
          options: ["$\\sqrt{16}$", "$-0{,}(3)$", "$\\sqrt{5}$", "$\\frac{22}{7}$"],
          answer: 2,
          explain: "$5$ không phải số chính phương nên $\\sqrt{5}$ là số vô tỉ. $\\sqrt{16} = 4$; $-0{,}(3) = -\\frac{1}{3}$; $\\frac{22}{7}$ là số hữu tỉ (chỉ gần bằng $\\pi$)." },
        { id: "d2q6", level: "vua", source: "SBT Ôn tập chương II – câu 2",
          q: "Số $2{,}(7)$ viết được thành phân số nào sau đây?",
          options: ["$\\frac{27}{10}$", "$\\frac{25}{9}$", "$\\frac{27}{9}$", "$\\frac{7}{9}$"],
          answer: 1,
          explain: "$2{,}(7) = 2 + 0{,}(7) = 2 + \\frac{7}{9} = \\frac{25}{9}$. Thử lại: $25 : 9 = 2{,}777\\ldots$ ✓" },
        { id: "d2q7", level: "vua", source: "SGK tr.28 – Luyện tập 2",
          q: "Làm tròn số $3{,}14159$ với độ chính xác $0{,}005$ ta được:",
          options: ["$3{,}141$", "$3{,}1$", "$3{,}142$", "$3{,}14$"],
          answer: 3,
          explain: "Độ chính xác $0{,}005$ là nửa đơn vị hàng phần trăm, nên làm tròn đến hàng phần trăm: chữ số bỏ đi đầu tiên là $1 \\lt 5$, được $3{,}14$." },
        { id: "d2q8", level: "vua", source: "mới",
          q: "Giá trị của biểu thức $|-5| + |3| - |-2|$ là:",
          options: ["$0$", "$6$", "$-4$", "$10$"],
          answer: 1,
          explain: "$|-5| = 5$; $|3| = 3$; $|-2| = 2$. Vậy $5 + 3 - 2 = 6$." },
        { id: "d2q9", level: "kho", source: "SGK Bài 7 – Luyện tập 3",
          q: "Sắp xếp các số $\\sqrt{2};\\ -1{,}(5);\\ 1{,}4;\\ -\\sqrt{2}$ theo thứ tự tăng dần, ta được:",
          options: [
            "$-\\sqrt{2} \\lt -1{,}(5) \\lt 1{,}4 \\lt \\sqrt{2}$",
            "$-1{,}(5) \\lt -\\sqrt{2} \\lt \\sqrt{2} \\lt 1{,}4$",
            "$-1{,}(5) \\lt -\\sqrt{2} \\lt 1{,}4 \\lt \\sqrt{2}$",
            "$-\\sqrt{2} \\lt -1{,}(5) \\lt \\sqrt{2} \\lt 1{,}4$"
          ],
          answer: 2,
          explain: "$\\sqrt{2} = 1{,}414\\ldots \\gt 1{,}4$ (vì $1{,}4^2 = 1{,}96 \\lt 2$). Hai số âm: $1{,}(5) = 1{,}555\\ldots \\gt 1{,}414\\ldots$ nên $-1{,}(5) \\lt -\\sqrt{2}$. Vậy $-1{,}(5) \\lt -\\sqrt{2} \\lt 1{,}4 \\lt \\sqrt{2}$." },
        { id: "d2q10", level: "kho", source: "SBT Ôn tập chương II – câu 7",
          q: "Với mọi số thực $x$, khẳng định nào sau đây là <b>sai</b>?",
          options: ["$|x| \\ge x$", "$|x| \\ge -x$", "$|x|^2 = x^2$", "$\\big||x|\\big| = x$"],
          answer: 3,
          explain: "$\\big||x|\\big| = |x|$, chỉ bằng $x$ khi $x \\ge 0$. Ví dụ $x = -2$: $\\big||-2|\\big| = 2 \\ne -2$. Ba khẳng định còn lại đúng với mọi $x$." },
        { id: "d2q11", level: "kho", source: "SBT Ôn tập chương II – câu 5",
          q: "Giá trị lớn nhất của biểu thức $3 - 2\\sqrt{x - 4}$ (với $x \\ge 4$) là:",
          options: ["$3$", "$-3$", "$1$", "$5$"],
          answer: 0,
          explain: "$\\sqrt{x - 4} \\ge 0$ nên $2\\sqrt{x - 4} \\ge 0$ và $3 - 2\\sqrt{x - 4} \\le 3$. Dấu bằng khi $x = 4$. Vậy giá trị lớn nhất là $3$." }
      ],
      essay: [
        { id: "d2e1", level: "vua", source: "SGK Bài tập cuối chương II – BT 2.29 (biến đổi)", maxPoints: 1.5,
          q: "Rót đều $5$ lít nước vào $3$ bình.<br>a) Tính lượng nước trong mỗi bình, viết kết quả dưới dạng số thập phân vô hạn tuần hoàn.<br>b) Làm tròn kết quả câu a với độ chính xác $0{,}05$.<br>c) Bạn An lấy số đã làm tròn ở câu b nhân với $3$ để tính lại tổng lượng nước. An có được đúng $5$ lít không? Vì sao?",
          modelAnswer: "a) Mỗi bình có $5 : 3 = 1{,}666\\ldots = 1{,}(6)$ (lít).<br>" +
            "b) Độ chính xác $0{,}05$ → làm tròn đến hàng phần mười: $1{,}(6) = 1{,}666\\ldots \\approx 1{,}7$ (lít).<br>" +
            "c) $3 \\cdot 1{,}7 = 5{,}1$ (lít) $\\ne 5$ lít. Không đúng, vì $1{,}7$ chỉ là giá trị gần đúng (lớn hơn giá trị thật $\\frac{5}{3}$ một chút), nhân lên $3$ lần thì sai số cũng tăng lên.",
          rubric: [
            { pts: 0.5, text: "Câu a: đúng $\\frac{5}{3} = 1{,}(6)$ lít." },
            { pts: 0.5, text: "Câu b: xác định đúng hàng phần mười và được $1{,}7$." },
            { pts: 0.5, text: "Câu c: tính $5{,}1$ lít và giải thích được do dùng giá trị làm tròn (gần đúng)." }
          ] },
        { id: "d2e2", level: "kho", source: "mới", maxPoints: 1.5,
          q: "Tìm $x$, biết $\\left|x + \\frac{1}{2}\\right| - \\frac{3}{4} = \\frac{1}{4}$.",
          modelAnswer: "Chuyển vế: $\\left|x + \\frac{1}{2}\\right| = \\frac{1}{4} + \\frac{3}{4} = 1$.<br>" +
            "Suy ra $x + \\frac{1}{2} = 1$ hoặc $x + \\frac{1}{2} = -1$.<br>" +
            "• $x + \\frac{1}{2} = 1$ thì $x = \\frac{1}{2}$.<br>" +
            "• $x + \\frac{1}{2} = -1$ thì $x = -\\frac{3}{2}$.<br>" +
            "Vậy $x = \\frac{1}{2}$ hoặc $x = -\\frac{3}{2}$.",
          rubric: [
            { pts: 0.5, text: "Chuyển vế đúng: $\\left|x + \\frac{1}{2}\\right| = 1$." },
            { pts: 0.5, text: "Tách đúng hai trường hợp $x + \\frac{1}{2} = 1$ hoặc $x + \\frac{1}{2} = -1$." },
            { pts: 0.5, text: "Tìm đúng và đủ $x = \\frac{1}{2}$; $x = -\\frac{3}{2}$." }
          ] }
      ] },

    // ========================= ĐỀ 3 =========================
    { id: "d3", name: "Đề 3",
      mcq: [
        { id: "d3q1", level: "de", source: "mới",
          q: "Phân số $\\frac{3}{8}$ viết dưới dạng số thập phân là:",
          options: ["$0{,}38$", "$0{,}375$", "$0{,}(375)$", "$3{,}8$"],
          answer: 1,
          explain: "$3 : 8 = 0{,}375$ (phép chia dừng lại vì $8 = 2^3$)." },
        { id: "d3q2", level: "de", source: "mới",
          q: "Phân số $\\frac{5}{6}$ viết dưới dạng số thập phân vô hạn tuần hoàn là:",
          options: ["$0{,}(83)$", "$0{,}83$", "$0{,}(8)3$", "$0{,}8(3)$"],
          answer: 3,
          explain: "$5 : 6 = 0{,}8333\\ldots$; chỉ chữ số $3$ lặp lại nên viết $0{,}8(3)$." },
        { id: "d3q3", level: "de", source: "mới",
          q: "Nếu $\\sqrt{x} = 4$ thì $x$ bằng:",
          options: ["$2$", "$8$", "$16$", "$-16$"],
          answer: 2,
          explain: "$\\sqrt{x} = 4$ nghĩa là $x = 4^2 = 16$." },
        { id: "d3q4", level: "de", source: "mới",
          q: "$\\left|-\\sqrt{5}\\right|$ bằng:",
          options: ["$5$", "$-5$", "$-\\sqrt{5}$", "$\\sqrt{5}$"],
          answer: 3,
          explain: "$-\\sqrt{5} \\lt 0$ nên $\\left|-\\sqrt{5}\\right| = \\sqrt{5}$." },
        { id: "d3q5", level: "vua", source: "SBT Ôn tập chương II – câu 3",
          q: "Số nào sau đây là bình phương của một số hữu tỉ?",
          options: ["$18$", "$0{,}9$", "$12{,}25$", "$0{,}101001000\\ldots$"],
          answer: 2,
          explain: "$12{,}25 = 3{,}5^2$. Số $18$ không chính phương; $0{,}9 = \\frac{9}{10}$ mà $10$ không chính phương; số $0{,}101001000\\ldots$ là số vô tỉ nên không thể là bình phương của số hữu tỉ." },
        { id: "d3q6", level: "vua", source: "SGK Bài 5 – BT 2.5b",
          q: "Làm tròn số $12\\,345{,}678$ với độ chính xác $0{,}5$ ta được:",
          options: ["$12\\,345$", "$12\\,345{,}7$", "$12\\,346$", "$12\\,350$"],
          answer: 2,
          explain: "Độ chính xác $0{,}5$ là nửa đơn vị hàng đơn vị, nên làm tròn đến hàng đơn vị: chữ số hàng phần mười là $6 \\ge 5$ nên được $12\\,346$." },
        { id: "d3q7", level: "vua", source: "SGK tr.35 – Luyện tập 3a",
          q: "Cho $a = 2{,}(15)$ và $b = 2{,}151$. Khẳng định nào đúng?",
          options: ["$a \\lt b$", "$a = b$", "$a \\gt b$", "Không so sánh được vì $a$ là số vô hạn"],
          answer: 2,
          explain: "$a = 2{,}151515\\ldots$ và $b = 2{,}151000\\ldots$ Hai số giống nhau đến chữ số thập phân thứ ba; ở chữ số thứ tư $5 \\gt 0$ nên $a \\gt b$." },
        { id: "d3q8", level: "vua", source: "SGK tr.35 – Hình 2.5",
          q: "Trên trục số, điểm biểu diễn số $-\\sqrt{10}$ nằm giữa hai điểm biểu diễn hai số nguyên nào?",
          options: ["$-4$ và $-3$", "$-3$ và $-2$", "$3$ và $4$", "$-11$ và $-10$"],
          answer: 0,
          explain: "$9 \\lt 10 \\lt 16$ nên $3 \\lt \\sqrt{10} \\lt 4$, suy ra $-4 \\lt -\\sqrt{10} \\lt -3$." },
        { id: "d3q9", level: "kho", source: "SBT Ôn tập chương II – câu 8",
          q: "Cho $x, y$ là hai số thực tuỳ ý. Khẳng định nào sau đây đúng?",
          options: ["$|x - y| = x - y$", "$|x - y| = |x| - |y|$", "$|x + y| = |x| + |y|$", "$|x + y| = |x| - |y|$ nếu $x \\gt 0 \\gt y$ và $|x| \\ge |y|$"],
          answer: 3,
          explain: "Khi $x \\gt 0 \\gt y$ thì $|x| = x$, $|y| = -y$; nếu thêm $|x| \\ge |y|$ thì $x + y \\ge 0$ nên $|x + y| = x + y = |x| - |y|$. Các câu kia sai, ví dụ $x = 1, y = -2$: $|x - y| = 3$ nhưng $|x| - |y| = -1$; $|x + y| = 1$ nhưng $|x| + |y| = 3$; $x = 1, y = 2$: $|x - y| = 1 \\ne -1$." },
        { id: "d3q10", level: "kho", source: "mới",
          q: "Có bao nhiêu số nguyên $x$ thỏa mãn $|x| \\lt \\sqrt{10}$?",
          options: ["$3$", "$6$", "$7$", "$10$"],
          answer: 2,
          explain: "$3 \\lt \\sqrt{10} \\lt 4$ nên $|x| \\lt \\sqrt{10}$ khi $|x| \\in \\{0; 1; 2; 3\\}$, tức $x \\in \\{-3; -2; -1; 0; 1; 2; 3\\}$: có $7$ số." },
        { id: "d3q11", level: "kho", source: "SBT Ôn tập chương II – BT 2.38 (biến đổi)",
          q: "Kết quả của phép tính $0{,}(3) \\cdot 1{,}(5)$ là:",
          options: ["$0{,}(518)$", "$0{,}5(18)$", "$0{,}(51)$", "$0{,}52$"],
          answer: 0,
          explain: "$0{,}(3) = \\frac{1}{3}$; $1{,}(5) = 1 + \\frac{5}{9} = \\frac{14}{9}$. Tích: $\\frac{1}{3} \\cdot \\frac{14}{9} = \\frac{14}{27} = 0{,}518518\\ldots = 0{,}(518)$." }
      ],
      essay: [
        { id: "d3e1", level: "vua", source: "SBT Ôn tập chương II – BT 2.41 (biến đổi)", maxPoints: 1.5,
          q: "Tính $3{,}75 - 1{,}(6)$ và làm tròn kết quả đến hàng phần nghìn.",
          modelAnswer: "Đổi ra phân số: $3{,}75 = \\frac{15}{4}$; $\\ 1{,}(6) = 1 + \\frac{6}{9} = \\frac{5}{3}$.<br>" +
            "$3{,}75 - 1{,}(6) = \\frac{15}{4} - \\frac{5}{3} = \\frac{45}{12} - \\frac{20}{12} = \\frac{25}{12}$.<br>" +
            "$25 : 12 = 2{,}08333\\ldots$; làm tròn đến hàng phần nghìn (chữ số bỏ đi là $3 \\lt 5$): $\\approx 2{,}083$.",
          rubric: [
            { pts: 0.5, text: "Đổi đúng $1{,}(6) = \\frac{5}{3}$ (và $3{,}75 = \\frac{15}{4}$)." },
            { pts: 0.5, text: "Tính đúng hiệu $\\frac{25}{12} = 2{,}08(3)$." },
            { pts: 0.5, text: "Làm tròn đúng $2{,}083$." }
          ] },
        { id: "d3e2", level: "kho", source: "SBT Ôn tập chương II – BT 2.43 (biến đổi)", maxPoints: 1.5,
          q: "Không dùng máy tính, hãy cho biết $\\sqrt{222\\,222}$ là số hữu tỉ hay số vô tỉ. Giải thích.",
          modelAnswer: "Bình phương của một số tự nhiên chỉ có chữ số tận cùng là $0; 1; 4; 5; 6; 9$ (vì $0^2, 1^2, \\ldots, 9^2$ tận cùng bằng $0; 1; 4; 9; 6; 5; 6; 9; 4; 1$).<br>" +
            "Số $222\\,222$ có chữ số tận cùng là $2$ nên không phải là số chính phương.<br>" +
            "Căn bậc hai số học của một số tự nhiên không chính phương là số vô tỉ. Vậy $\\sqrt{222\\,222}$ là số vô tỉ.",
          rubric: [
            { pts: 0.5, text: "Nêu được chữ số tận cùng có thể có của số chính phương (hoặc lập luận khác đúng, ví dụ $222\\,222$ chia 9 dư 3)." },
            { pts: 0.5, text: "Kết luận $222\\,222$ không phải số chính phương." },
            { pts: 0.5, text: "Kết luận đúng $\\sqrt{222\\,222}$ là số vô tỉ (có nêu tính chất căn của số không chính phương)." }
          ] }
      ] }
  ]
});
