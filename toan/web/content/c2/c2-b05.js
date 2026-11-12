registerLesson({
  id: "c2-b05",
  chapter: 2,
  kind: "lesson",
  title: "Bài 5. Làm quen với số thập phân vô hạn tuần hoàn",
  sgkPages: [26, 28],
  sbtPages: [22, 25],
  objectives: [
    "Nhận biết số thập phân hữu hạn và số thập phân vô hạn tuần hoàn",
    "Tìm chu kì và viết gọn số thập phân vô hạn tuần hoàn",
    "Nhận biết phân số nào viết được thành số thập phân hữu hạn / vô hạn tuần hoàn",
    "Làm tròn số thập phân căn cứ vào độ chính xác cho trước; ước lượng kết quả phép tính"
  ],

  theory: [
    {
      heading: "1. Số thập phân hữu hạn và số thập phân vô hạn tuần hoàn",
      html: "Khi viết một phân số dưới dạng số thập phân (đặt tính chia tử cho mẫu) có hai khả năng:" +
        "<ul><li>Phép chia <b>dừng lại</b> sau một số bước: ta được <b>số thập phân hữu hạn</b>, ví dụ $\\frac{4}{5} = 0{,}8$; $\\ \\frac{5}{4} = 1{,}25$.</li>" +
        "<li>Phép chia <b>không bao giờ dừng</b>, nhưng từ một chỗ nào đó có một chữ số hoặc một cụm chữ số lặp đi lặp lại mãi: ta được <b>số thập phân vô hạn tuần hoàn</b>, ví dụ $\\frac{5}{18} = 0{,}2777\\ldots$; $\\ -\\frac{17}{11} = -1{,}545454\\ldots$</li></ul>" +
        "Cụm chữ số lặp lại gọi là <b>chu kì</b>. Ta viết gọn bằng cách đặt chu kì trong ngoặc đơn:" +
        "<ul><li>$0{,}2777\\ldots = 0{,}2(7)$, chu kì là $7$;</li>" +
        "<li>$-1{,}545454\\ldots = -1{,}(54)$, chu kì là $54$;</li>" +
        "<li>$\\frac{7}{22} = 0{,}31818\\ldots = 0{,}3(18)$, chu kì là $18$ (chu kì có thể gồm nhiều chữ số).</li></ul>" +
        "<b>Chú ý:</b> Mọi số hữu tỉ đều viết được dưới dạng số thập phân hữu hạn hoặc vô hạn tuần hoàn."
    },
    {
      heading: "2. Nhận biết qua mẫu của phân số",
      html: "Trước hết đưa phân số về dạng <b>tối giản, mẫu dương</b>, rồi phân tích mẫu ra thừa số nguyên tố:" +
        "<ul><li>Mẫu <b>chỉ có</b> ước nguyên tố $2$ và $5$ → số thập phân <b>hữu hạn</b>. Ví dụ $\\frac{3}{40} = \\frac{3}{2^3 \\cdot 5} = \\frac{3 \\cdot 5^2}{2^3 \\cdot 5^3} = \\frac{75}{1000} = 0{,}075$.</li>" +
        "<li>Mẫu <b>có</b> ước nguyên tố khác $2$ và $5$ (như $3, 7, 11, \\ldots$) → số thập phân <b>vô hạn tuần hoàn</b>. Ví dụ $\\frac{1}{3} = 0{,}(3)$; $\\ \\frac{5}{6} = 0{,}8(3)$.</li></ul>" +
        "Ngược lại, mỗi số thập phân vô hạn tuần hoàn cũng biểu diễn một số hữu tỉ, chẳng hạn $0{,}(1) = \\frac{1}{9}$; $\\ 0{,}(01) = \\frac{1}{99}$; $\\ 0{,}(17) = \\frac{17}{99}$; $\\ 0{,}(9) = 1$."
    },
    {
      heading: "3. Làm tròn số thập phân căn cứ vào độ chính xác",
      html: "Số thập phân vô hạn tuần hoàn được làm tròn giống như số thập phân hữu hạn: nhìn chữ số <b>ngay sau</b> hàng làm tròn; nếu nhỏ hơn 5 thì giữ nguyên, nếu lớn hơn hoặc bằng 5 thì cộng thêm 1 vào hàng làm tròn. Kí hiệu $\\approx$ đọc là \"xấp xỉ\"." +
        "<br>Ví dụ: $46{,}333\\ldots \\approx 46$ (làm tròn đến hàng đơn vị); $\\ -1{,}27(534) \\approx -1{,}28$ (làm tròn đến hàng phần trăm)." +
        "<br><b>Quy tắc:</b> Khi làm tròn số đến một hàng nào đó, kết quả làm tròn có <b>độ chính xác bằng một nửa đơn vị của hàng làm tròn</b>." +
        "<table><tr><th>Hàng làm tròn</th><th>Độ chính xác</th></tr>" +
        "<tr><td>trăm</td><td>$50$</td></tr><tr><td>chục</td><td>$5$</td></tr><tr><td>đơn vị</td><td>$0{,}5$</td></tr>" +
        "<tr><td>phần mười</td><td>$0{,}05$</td></tr><tr><td>phần trăm</td><td>$0{,}005$</td></tr></table>" +
        "Muốn làm tròn với độ chính xác cho trước, dùng bảng trên để tìm hàng cần làm tròn (ví dụ độ chính xác $0{,}05$ → làm tròn đến hàng phần mười)."
    },
    {
      heading: "4. Ước lượng kết quả phép tính",
      html: "Khi không cần kết quả chính xác, ta làm tròn các số rồi tính để <b>ước lượng</b>. Ví dụ $31{,}(81) \\cdot 4{,}9 \\approx 32 \\cdot 5 = 160$." +
        "<br>Nếu biết khi làm tròn ta đã tăng hay giảm các số, ta biết kết quả ước lượng lớn hơn hay nhỏ hơn kết quả đúng, nhờ đó phát hiện được kết quả tính sai."
    }
  ],

  skills: [
    "<b>Phân số → số thập phân:</b> đặt tính chia tử cho mẫu. Khi số dư lặp lại một số dư đã gặp thì các chữ số của thương bắt đầu lặp lại → tìm được chu kì.",
    "<b>Hữu hạn hay vô hạn tuần hoàn?</b> Luôn <b>rút gọn trước</b> rồi mới xét mẫu. Ví dụ $\\frac{21}{56}$ có mẫu chứa 7 nhưng $\\frac{21}{56} = \\frac{3}{8}$ nên là số thập phân hữu hạn ($0{,}375$).",
    "<b>So sánh số thập phân vô hạn tuần hoàn:</b> viết khai triển vài chữ số rồi so sánh từng hàng từ trái sang phải: $0{,}91(6) = 0{,}91666\\ldots < 0{,}95833\\ldots = 0{,}958(3)$.",
    "<b>Tìm chữ số thứ $n$ sau dấu phẩy</b> của số có chu kì gồm $k$ chữ số (chu kì bắt đầu ngay sau dấu phẩy): chia $n$ cho $k$, số dư $r$ cho biết đó là chữ số thứ $r$ của chu kì (dư $0$ thì là chữ số cuối của chu kì).",
    "<b>Số thập phân vô hạn tuần hoàn → phân số:</b> đặt $x = 0{,}(5)$ thì $10x = 5{,}(5) = 5 + x$, nên $9x = 5$, $x = \\frac{5}{9}$. Với chu kì 2 chữ số thì nhân với $100$: $0{,}(ab) = \\frac{\\overline{ab}}{99}$.",
    "<b>Lỗi hay gặp:</b> viết $0{,}2777\\ldots$ thành $0{,}(27)$ (sai, chu kì chỉ là $7$); xét mẫu khi phân số chưa tối giản; nhầm độ chính xác $0{,}05$ với làm tròn đến hàng phần trăm (đúng là hàng phần mười); quên rằng $0{,}(9) = 1$."
  ],

  examples: [
    {
      q: "Phân số $\\frac{33}{88}$ viết được dưới dạng số thập phân hữu hạn hay vô hạn tuần hoàn? Bạn Minh nói: \"Vô hạn tuần hoàn, vì mẫu $88 = 8 \\cdot 11$ có ước nguyên tố 11\". Minh đúng hay sai?",
      solution: "Minh <b>sai</b> vì chưa rút gọn phân số. Ta có $\\frac{33}{88} = \\frac{3}{8}$ (chia cả tử và mẫu cho 11).<br>" +
        "Mẫu $8 = 2^3$ chỉ có ước nguyên tố 2 nên $\\frac{3}{8}$ là số thập phân hữu hạn: $\\frac{33}{88} = \\frac{3}{8} = 0{,}375$."
    },
    {
      q: "Làm tròn số $7\\,864{,}315$ với độ chính xác: a) $50$; b) $0{,}05$.",
      solution: "a) Độ chính xác $50$ → làm tròn đến hàng trăm. Chữ số ngay sau hàng trăm là $6 \\ge 5$ nên $7\\,864{,}315 \\approx 7\\,900$.<br>" +
        "b) Độ chính xác $0{,}05$ → làm tròn đến hàng phần mười. Chữ số ngay sau hàng phần mười là $1 < 5$ nên $7\\,864{,}315 \\approx 7\\,864{,}3$."
    },
    {
      q: "Viết số thập phân $1{,}(6)$ dưới dạng phân số.",
      solution: "$1{,}(6) = 1 + 0{,}(6)$. Đặt $x = 0{,}(6)$ thì $10x = 6{,}(6) = 6 + x$, suy ra $9x = 6$, $x = \\frac{6}{9} = \\frac{2}{3}$.<br>" +
        "Vậy $1{,}(6) = 1 + \\frac{2}{3} = \\frac{5}{3}$."
    },
    {
      q: "Chữ số thứ 100 sau dấu phẩy của $\\frac{1}{7}$ là chữ số nào?",
      solution: "Đặt tính chia: $\\frac{1}{7} = 0{,}(142857)$, chu kì gồm 6 chữ số.<br>" +
        "$100 = 6 \\cdot 16 + 4$ (dư 4), nên chữ số thứ 100 là chữ số thứ 4 của chu kì $142857$, tức là chữ số $8$."
    }
  ],

  sets: [
    // ======================= ĐỀ 1 =======================
    {
      id: "d1", name: "Đề 1",
      mcq: [
        {
          id: "d1q1", level: "de", source: "SGK Bài 5 – BT 2.1",
          q: "Số nào sau đây là số thập phân vô hạn tuần hoàn?",
          options: ["$0{,}125$", "$-3{,}5$", "$1{,}(36)$", "$2{,}04$"],
          answer: 2,
          explain: "$1{,}(36) = 1{,}363636\\ldots$ có cụm $36$ lặp lại mãi. Ba số còn lại có hữu hạn chữ số sau dấu phẩy nên là số thập phân hữu hạn."
        },
        {
          id: "d1q2", level: "de", source: "SGK tr.27",
          q: "Số thập phân $0{,}2777\\ldots$ (chữ số 7 lặp lại mãi) được viết gọn là",
          options: ["$0{,}(27)$", "$0{,}2(7)$", "$0{,}(277)$", "$0{,}27$"],
          answer: 1,
          explain: "Chỉ có chữ số $7$ lặp lại, chữ số $2$ không lặp, nên chu kì là $7$: $0{,}2777\\ldots = 0{,}2(7)$. Còn $0{,}(27) = 0{,}272727\\ldots$ là số khác."
        },
        {
          id: "d1q3", level: "de", source: "SGK tr.27",
          q: "Chu kì của số thập phân vô hạn tuần hoàn $-1{,}545454\\ldots$ là",
          options: ["$5$", "$45$", "$54$", "$545$"],
          answer: 2,
          explain: "Ngay sau dấu phẩy, cụm $54$ lặp lại mãi: $-1{,}545454\\ldots = -1{,}(54)$. Chu kì là $54$."
        },
        {
          id: "d1q4", level: "de", source: "SGK tr.27 – Luyện tập 1",
          q: "Phân số $\\frac{1}{4}$ viết dưới dạng số thập phân là",
          options: ["$0{,}4$", "$0{,}(25)$", "$0{,}(4)$", "$0{,}25$"],
          answer: 3,
          explain: "$1 : 4 = 0{,}25$, phép chia dừng lại nên là số thập phân hữu hạn. (Mẫu $4 = 2^2$ chỉ có ước nguyên tố 2.)"
        },
        {
          id: "d1q5", level: "vua", source: "SGK tr.27 – Luyện tập 1",
          q: "Phân số $-\\frac{2}{11}$ viết dưới dạng số thập phân là",
          options: ["$-0{,}(18)$", "$-0{,}18$", "$-0{,}1(8)$", "$-0{,}(2)$"],
          answer: 0,
          explain: "$2 : 11 = 0{,}181818\\ldots = 0{,}(18)$, nên $-\\frac{2}{11} = -0{,}(18)$, chu kì là $18$."
        },
        {
          id: "d1q6", level: "vua", source: "SGK tr.28 – Ví dụ 2",
          q: "Làm tròn số $8\\,346{,}52$ với độ chính xác $50$, ta được",
          options: ["$8\\,350$", "$8\\,300$", "$8\\,346{,}5$", "$8\\,400$"],
          answer: 1,
          explain: "Độ chính xác $50$ → làm tròn đến hàng trăm. Chữ số ngay sau hàng trăm là $4 < 5$ nên $8\\,346{,}52 \\approx 8\\,300$."
        },
        {
          id: "d1q7", level: "vua", source: "SGK tr.28 – Luyện tập 2",
          q: "Làm tròn số $2{,}71828$ với độ chính xác $0{,}005$, ta được",
          options: ["$2{,}7$", "$2{,}718$", "$2{,}71$", "$2{,}72$"],
          answer: 3,
          explain: "Độ chính xác $0{,}005$ → làm tròn đến hàng phần trăm. Chữ số ngay sau hàng phần trăm là $8 \\ge 5$ nên $2{,}71828 \\approx 2{,}72$."
        },
        {
          id: "d1q8", level: "vua", source: "SBT Bài 5 – BT 2.1",
          q: "Phân số nào sau đây viết được dưới dạng số thập phân <b>hữu hạn</b>?",
          options: ["$\\frac{7}{12}$", "$\\frac{-9}{48}$", "$\\frac{5}{6}$", "$\\frac{4}{15}$"],
          answer: 1,
          explain: "Rút gọn: $\\frac{-9}{48} = \\frac{-3}{16}$, mẫu $16 = 2^4$ nên là số thập phân hữu hạn ($-0{,}1875$). Các mẫu $12 = 2^2 \\cdot 3$; $6 = 2 \\cdot 3$; $15 = 3 \\cdot 5$ đều có ước nguyên tố 3 nên cho số vô hạn tuần hoàn."
        },
        {
          id: "d1q9", level: "kho", source: "SBT Bài 5 – BT 2.6 (biến đổi)",
          q: "Chữ số thứ 25 sau dấu phẩy của số $0{,}(357)$ là",
          options: ["$3$", "$5$", "$7$", "$0$"],
          answer: 0,
          explain: "Chu kì $357$ gồm 3 chữ số. $25 = 3 \\cdot 8 + 1$ (dư 1) nên chữ số thứ 25 là chữ số thứ nhất của chu kì, tức là $3$."
        },
        {
          id: "d1q10", level: "kho", source: "SGK tr.28 – Vận dụng",
          q: "Ước lượng kết quả phép tính $21{,}(72) \\cdot 3{,}9$ bằng cách làm tròn hai thừa số đến hàng đơn vị, ta được",
          options: ["$84$", "$63$", "$88$", "$66$"],
          answer: 2,
          explain: "$21{,}(72) = 21{,}7272\\ldots \\approx 22$ (chữ số hàng phần mười là $7 \\ge 5$); $3{,}9 \\approx 4$. Ước lượng: $22 \\cdot 4 = 88$."
        }
      ],
      essay: [
        {
          id: "d1e1", level: "vua", source: "SBT Bài 5 – BT 2.4 (biến đổi)", maxPoints: 3,
          q: "Cho các phân số: $\\frac{7}{8};\\ \\frac{-5}{6};\\ \\frac{9}{40};\\ \\frac{4}{9};\\ \\frac{-3}{25}$.<br>" +
            "a) Phân số nào viết được dưới dạng số thập phân hữu hạn, phân số nào viết được dưới dạng số thập phân vô hạn tuần hoàn? Giải thích.<br>" +
            "b) Viết mỗi phân số trên dưới dạng số thập phân (viết gọn bằng chu kì nếu có).",
          modelAnswer: "a) Các phân số đều tối giản, mẫu dương. Phân tích mẫu: $8 = 2^3$; $\\ 6 = 2 \\cdot 3$; $\\ 40 = 2^3 \\cdot 5$; $\\ 9 = 3^2$; $\\ 25 = 5^2$.<br>" +
            "• Mẫu chỉ có ước nguyên tố 2 và 5: $\\frac{7}{8};\\ \\frac{9}{40};\\ \\frac{-3}{25}$ → số thập phân hữu hạn.<br>" +
            "• Mẫu có ước nguyên tố 3 (khác 2 và 5): $\\frac{-5}{6};\\ \\frac{4}{9}$ → số thập phân vô hạn tuần hoàn.<br>" +
            "b) $\\frac{7}{8} = 0{,}875$; $\\ \\frac{9}{40} = 0{,}225$; $\\ \\frac{-3}{25} = -0{,}12$; $\\ \\frac{-5}{6} = -0{,}8333\\ldots = -0{,}8(3)$; $\\ \\frac{4}{9} = 0{,}444\\ldots = 0{,}(4)$.",
          rubric: [
            { pts: 1, text: "Phân loại đúng cả 5 phân số, có giải thích dựa vào ước nguyên tố của mẫu." },
            { pts: 1, text: "Viết đúng $0{,}875$; $0{,}225$; $-0{,}12$." },
            { pts: 1, text: "Viết đúng và gọn $-0{,}8(3)$ và $0{,}(4)$." }
          ]
        }
      ]
    },

    // ======================= ĐỀ 2 =======================
    {
      id: "d2", name: "Đề 2",
      mcq: [
        {
          id: "d2q1", level: "de", source: "SGK Bài 5 – BT 2.1",
          q: "Số nào sau đây là số thập phân hữu hạn?",
          options: ["$0{,}(6)$", "$-2{,}1(3)$", "$5{,}(01)$", "$-7{,}25$"],
          answer: 3,
          explain: "$-7{,}25$ chỉ có hai chữ số sau dấu phẩy nên là số thập phân hữu hạn. Ba số còn lại có chu kì nên là số vô hạn tuần hoàn."
        },
        {
          id: "d2q2", level: "de", source: "SGK Bài 5 – BT 2.2",
          q: "Số thập phân vô hạn tuần hoàn $0{,}010101\\ldots$ được viết gọn là",
          options: ["$0{,}(01)$", "$0{,}0(1)$", "$0{,}(010)$", "$0{,}(10)$"],
          answer: 0,
          explain: "Ngay sau dấu phẩy, cụm $01$ lặp lại mãi: $0{,}01\\,01\\,01\\ldots = 0{,}(01)$. Còn $0{,}0(1) = 0{,}0111\\ldots$ và $0{,}(10) = 0{,}1010\\ldots$ là các số khác."
        },
        {
          id: "d2q3", level: "de", source: "SGK tr.27 – Câu hỏi",
          q: "Kết quả của phép chia $1 : 9$ là",
          options: ["$0{,}9$", "$0{,}(9)$", "$0{,}1$", "$0{,}(1)$"],
          answer: 3,
          explain: "Chia 1 cho 9: lần nào cũng dư 1 nên thương là $0{,}111\\ldots = 0{,}(1)$, một số thập phân vô hạn tuần hoàn."
        },
        {
          id: "d2q4", level: "de", source: "SGK tr.27 – bảng độ chính xác",
          q: "Khi làm tròn một số đến hàng phần trăm, kết quả làm tròn có độ chính xác bằng",
          options: ["$0{,}5$", "$0{,}05$", "$0{,}005$", "$0{,}01$"],
          answer: 2,
          explain: "Độ chính xác bằng một nửa đơn vị hàng làm tròn: $\\frac{1}{2} \\cdot 0{,}01 = 0{,}005$."
        },
        {
          id: "d2q5", level: "vua", source: "SGK tr.27 – Ví dụ 1",
          q: "Phân số $\\frac{5}{12}$ viết dưới dạng số thập phân là",
          options: ["$0{,}4(16)$", "$0{,}41(6)$", "$0{,}(416)$", "$0{,}416$"],
          answer: 1,
          explain: "$5 : 12 = 0{,}41666\\ldots$: chỉ chữ số $6$ lặp lại, bắt đầu từ chữ số thập phân thứ ba. Vậy $\\frac{5}{12} = 0{,}41(6)$."
        },
        {
          id: "d2q6", level: "vua", source: "SGK tr.27 (làm tròn số vô hạn tuần hoàn)",
          q: "Làm tròn số $-4{,}3(76)$ đến hàng phần trăm, ta được",
          options: ["$-4{,}37$", "$-4{,}4$", "$-4{,}38$", "$-4{,}376$"],
          answer: 2,
          explain: "$-4{,}3(76) = -4{,}37676\\ldots$ Chữ số ngay sau hàng phần trăm là $6 \\ge 5$ nên phần số $4{,}37676\\ldots \\approx 4{,}38$, do đó $-4{,}3(76) \\approx -4{,}38$."
        },
        {
          id: "d2q7", level: "vua", source: "SBT Bài 5 – BT 2.1",
          q: "Phân số nào sau đây viết được dưới dạng số thập phân <b>vô hạn tuần hoàn</b>?",
          options: ["$\\frac{18}{45}$", "$\\frac{15}{-36}$", "$\\frac{11}{80}$", "$\\frac{-7}{28}$"],
          answer: 1,
          explain: "Rút gọn: $\\frac{18}{45} = \\frac{2}{5}$ (hữu hạn); $\\frac{15}{-36} = \\frac{-5}{12}$, mẫu $12 = 2^2 \\cdot 3$ có ước 3 → vô hạn tuần hoàn ($-0{,}41(6)$); $\\frac{11}{80}$ có $80 = 2^4 \\cdot 5$ (hữu hạn); $\\frac{-7}{28} = \\frac{-1}{4}$ (hữu hạn)."
        },
        {
          id: "d2q8", level: "vua", source: "SBT Bài 5 – Ví dụ 2",
          q: "Khi so sánh $1{,}2(3)$ và $1{,}(23)$, khẳng định nào đúng?",
          options: ["$1{,}2(3) < 1{,}(23)$", "$1{,}2(3) = 1{,}(23)$", "$1{,}2(3) > 1{,}(23)$", "Không so sánh được vì đều là số thập phân vô hạn"],
          answer: 2,
          explain: "$1{,}2(3) = 1{,}2333\\ldots$ và $1{,}(23) = 1{,}2323\\ldots$ Hai số giống nhau đến hàng phần trăm; ở hàng phần nghìn $3 > 2$ nên $1{,}2(3) > 1{,}(23)$."
        },
        {
          id: "d2q9", level: "kho", source: "SBT Bài 5 – BT 2.6",
          q: "Biết $\\frac{3}{7} = 0{,}(428571)$. Chữ số thứ 100 sau dấu phẩy của $\\frac{3}{7}$ là",
          options: ["$4$", "$2$", "$8$", "$5$"],
          answer: 3,
          explain: "Chu kì gồm 6 chữ số. $100 = 6 \\cdot 16 + 4$ (dư 4) nên chữ số thứ 100 là chữ số thứ 4 của chu kì $428571$, tức là $5$."
        },
        {
          id: "d2q10", level: "kho", source: "SBT Bài 5 – BT 2.5",
          q: "Số thập phân $0{,}(4)$ bằng phân số nào sau đây?",
          options: ["$\\frac{4}{9}$", "$\\frac{4}{10}$", "$\\frac{2}{5}$", "$\\frac{4}{99}$"],
          answer: 0,
          explain: "Đặt $x = 0{,}(4)$ thì $10x = 4{,}(4) = 4 + x$, nên $9x = 4$, $x = \\frac{4}{9}$. ($\\frac{4}{10} = \\frac{2}{5} = 0{,}4$; $\\frac{4}{99} = 0{,}(04)$.)"
        }
      ],
      essay: [
        {
          id: "d2e1", level: "vua", source: "SBT Bài 5 – BT 2.5", maxPoints: 1.5,
          q: "Viết số thập phân $2{,}(7)$ dưới dạng phân số.",
          modelAnswer: "$2{,}(7) = 2 + 0{,}(7)$.<br>" +
            "Đặt $x = 0{,}(7)$ thì $10x = 7{,}(7) = 7 + x$, suy ra $9x = 7$, $x = \\frac{7}{9}$.<br>" +
            "Vậy $2{,}(7) = 2 + \\frac{7}{9} = \\frac{25}{9}$.",
          rubric: [
            { pts: 0.5, text: "Tách $2{,}(7) = 2 + 0{,}(7)$ và đặt ẩn / lập được $10x = 7 + x$." },
            { pts: 0.5, text: "Tìm đúng $0{,}(7) = \\frac{7}{9}$." },
            { pts: 0.5, text: "Kết luận đúng $2{,}(7) = \\frac{25}{9}$." }
          ]
        },
        {
          id: "d2e2", level: "kho", source: "SBT Bài 5 – BT 2.8 (biến đổi)", maxPoints: 1.5,
          q: "Cho hai số $a = 4{,}2861$ và $b = 1{,}(7)$.<br>" +
            "a) Gọi $a'$ là kết quả làm tròn $a$ đến hàng phần mười, $b'$ là kết quả làm tròn $b$ với độ chính xác $0{,}5$. Tìm $a', b'$ và so sánh $a$ với $a'$, $b$ với $b'$.<br>" +
            "b) Dùng kết quả câu a, giải thích vì sao kết luận $4{,}2861 \\cdot 1{,}(7) = 8{,}9(1)$ là sai.",
          modelAnswer: "a) Làm tròn $a$ đến hàng phần mười: chữ số ngay sau là $8 \\ge 5$ nên $a' = 4{,}3$ và $a < a'$.<br>" +
            "Độ chính xác $0{,}5$ → làm tròn $b = 1{,}777\\ldots$ đến hàng đơn vị: $b' = 2$ và $b < b'$.<br>" +
            "b) Vì $a, b$ dương, $a < 4{,}3$ và $b < 2$ nên $a \\cdot b < 4{,}3 \\cdot 2 = 8{,}6 < 8{,}9(1)$.<br>" +
            "Vậy kết luận $4{,}2861 \\cdot 1{,}(7) = 8{,}9(1)$ là sai.",
          rubric: [
            { pts: 0.5, text: "Tìm đúng $a' = 4{,}3$ và nhận xét $a < a'$." },
            { pts: 0.5, text: "Xác định làm tròn đến hàng đơn vị, $b' = 2$ và $b < b'$." },
            { pts: 0.5, text: "Lập luận $a \\cdot b < 8{,}6 < 8{,}9(1)$ và kết luận kết quả sai." }
          ]
        }
      ]
    },

    // ======================= ĐỀ 3 =======================
    {
      id: "d3", name: "Đề 3",
      mcq: [
        {
          id: "d3q1", level: "de", source: "SGK Bài 5 – BT 2.1",
          q: "Có bao nhiêu số thập phân vô hạn tuần hoàn trong các số sau: $3{,}7;\\ -0{,}(5);\\ 2{,}1(45);\\ -8{,}125;\\ 0{,}0(6)$?",
          options: ["$2$", "$3$", "$4$", "$1$"],
          answer: 1,
          explain: "Các số có chu kì: $-0{,}(5)$; $2{,}1(45)$; $0{,}0(6)$ — gồm 3 số. $3{,}7$ và $-8{,}125$ là số thập phân hữu hạn."
        },
        {
          id: "d3q2", level: "de", source: "SGK tr.27 – Ví dụ 1",
          q: "Số thập phân vô hạn tuần hoàn $0{,}3(18)$ có chu kì là",
          options: ["$3$", "$318$", "$18$", "$8$"],
          answer: 2,
          explain: "Phần trong ngoặc là chu kì: $0{,}3(18) = 0{,}31818\\ldots$ có chu kì $18$."
        },
        {
          id: "d3q3", level: "de", source: "SGK tr.27",
          q: "Số $-2{,}353535\\ldots$ được viết gọn là",
          options: ["$-2{,}(35)$", "$-2{,}3(5)$", "$-2{,}(353)$", "$-2{,}35$"],
          answer: 0,
          explain: "Ngay sau dấu phẩy cụm $35$ lặp lại mãi nên viết gọn là $-2{,}(35)$. ($-2{,}3(5) = -2{,}3555\\ldots$; $-2{,}35$ là số hữu hạn.)"
        },
        {
          id: "d3q4", level: "de", source: "SGK tr.27 – bảng độ chính xác",
          q: "Muốn kết quả làm tròn có độ chính xác $5$, ta làm tròn số đến hàng",
          options: ["đơn vị", "chục", "trăm", "phần mười"],
          answer: 1,
          explain: "Độ chính xác bằng một nửa đơn vị hàng làm tròn: một nửa của $10$ là $5$, nên làm tròn đến hàng chục."
        },
        {
          id: "d3q5", level: "vua", source: "SGK tr.27 – Ví dụ 1",
          q: "Phân số $\\frac{-13}{30}$ viết dưới dạng số thập phân là",
          options: ["$-0{,}(43)$", "$-0{,}43$", "$-0{,}4(3)$", "$-0{,}(433)$"],
          answer: 2,
          explain: "$13 : 30 = 0{,}4333\\ldots$, chỉ chữ số $3$ lặp lại. Vậy $\\frac{-13}{30} = -0{,}4(3)$."
        },
        {
          id: "d3q6", level: "vua", source: "SGK Bài 5 – BT 2.5b",
          q: "Làm tròn số $46{,}(36)$ với độ chính xác $0{,}5$, ta được",
          options: ["$46{,}4$", "$46{,}36$", "$47$", "$46$"],
          answer: 3,
          explain: "Độ chính xác $0{,}5$ → làm tròn đến hàng đơn vị. $46{,}3636\\ldots$ có chữ số hàng phần mười là $3 < 5$ nên $\\approx 46$."
        },
        {
          id: "d3q7", level: "vua", source: "SGK tr.28 – Em có biết",
          q: "Một phân số tối giản với mẫu dương viết được dưới dạng số thập phân hữu hạn khi mẫu của nó",
          options: ["là số chẵn", "không có ước nguyên tố khác 2 và 5", "chia hết cho 10", "là số nguyên tố"],
          answer: 1,
          explain: "Mẫu chỉ có ước nguyên tố 2 và 5 thì phân số viết được thành số thập phân hữu hạn. \"Số chẵn\" chưa đủ (ví dụ $\\frac{1}{6} = 0{,}1(6)$); \"chia hết cho 10\" không cần (ví dụ $\\frac{1}{4} = 0{,}25$)."
        },
        {
          id: "d3q8", level: "vua", source: "SBT Bài 5 – Ví dụ 2",
          q: "Sắp xếp các số $0{,}(3);\\ 0{,}3;\\ 0{,}3(4);\\ 0{,}(34)$ theo thứ tự tăng dần, ta được",
          options: [
            "$0{,}3 < 0{,}(3) < 0{,}(34) < 0{,}3(4)$",
            "$0{,}3 < 0{,}(3) < 0{,}3(4) < 0{,}(34)$",
            "$0{,}(3) < 0{,}3 < 0{,}(34) < 0{,}3(4)$",
            "$0{,}3 < 0{,}(34) < 0{,}(3) < 0{,}3(4)$"
          ],
          answer: 0,
          explain: "Khai triển: $0{,}3 = 0{,}3000$; $0{,}(3) = 0{,}3333\\ldots$; $0{,}(34) = 0{,}3434\\ldots$; $0{,}3(4) = 0{,}3444\\ldots$ So sánh từng hàng: $0{,}3 < 0{,}(3) < 0{,}(34) < 0{,}3(4)$."
        },
        {
          id: "d3q9", level: "kho", source: "SBT Bài 5 – BT 2.7 (biến đổi)",
          q: "Kết quả phép tính $2 : 0{,}(6)$ bằng",
          options: ["$0{,}(3)$", "$1{,}(3)$", "$3$", "$12$"],
          answer: 2,
          explain: "Đặt $x = 0{,}(6)$: $10x = 6 + x$ nên $x = \\frac{6}{9} = \\frac{2}{3}$. Do đó $2 : \\frac{2}{3} = 2 \\cdot \\frac{3}{2} = 3$."
        },
        {
          id: "d3q10", level: "kho", source: "SBT Bài 5 – Ví dụ 4",
          q: "Bằng cách làm tròn các thừa số đến hàng đơn vị để ước lượng, hãy cho biết kết quả nào sau đây hợp lí nhất cho tích $7{,}(8) \\cdot 5{,}1(2)$?",
          options: ["$40{,}4$", "$4{,}04$", "$404$", "$30{,}4$"],
          answer: 0,
          explain: "$7{,}(8) = 7{,}888\\ldots \\approx 8$; $5{,}1(2) = 5{,}122\\ldots \\approx 5$. Ước lượng tích $\\approx 8 \\cdot 5 = 40$, nên $40{,}4$ hợp lí nhất."
        }
      ],
      essay: [
        {
          id: "d3e1", level: "vua", source: "SGK Bài 5 – BT 2.3", maxPoints: 1.5,
          q: "Cho số $a = 5{,}2(83)$. Làm tròn $a$:<br>a) đến chữ số thập phân thứ ba;<br>b) với độ chính xác $0{,}05$.",
          modelAnswer: "Viết khai triển: $a = 5{,}2(83) = 5{,}283838\\ldots$<br>" +
            "a) Chữ số thập phân thứ ba là $3$; chữ số ngay sau nó là $8 \\ge 5$ nên $a \\approx 5{,}284$.<br>" +
            "b) Độ chính xác $0{,}05$ → làm tròn đến hàng phần mười. Chữ số ngay sau hàng phần mười là $8 \\ge 5$ nên $a \\approx 5{,}3$.",
          rubric: [
            { pts: 0.5, text: "Viết đúng khai triển $5{,}28383\\ldots$" },
            { pts: 0.5, text: "Câu a: $a \\approx 5{,}284$." },
            { pts: 0.5, text: "Câu b: xác định đúng hàng phần mười và $a \\approx 5{,}3$." }
          ]
        },
        {
          id: "d3e2", level: "kho", source: "SBT Bài 5 – BT 2.5 (biến đổi)", maxPoints: 1.5,
          q: "Viết $0{,}(18)$ dưới dạng phân số tối giản, rồi tính $0{,}(18) \\cdot 5{,}5$.",
          modelAnswer: "Đặt $x = 0{,}(18)$ thì $100x = 18{,}(18) = 18 + x$, suy ra $99x = 18$, $x = \\frac{18}{99} = \\frac{2}{11}$.<br>" +
            "$5{,}5 = \\frac{11}{2}$. Do đó $0{,}(18) \\cdot 5{,}5 = \\frac{2}{11} \\cdot \\frac{11}{2} = 1$.",
          rubric: [
            { pts: 0.5, text: "Lập được $100x = 18 + x$ (nhân với 100 vì chu kì có 2 chữ số)." },
            { pts: 0.5, text: "Tìm đúng $0{,}(18) = \\frac{2}{11}$ (tối giản)." },
            { pts: 0.5, text: "Tính đúng tích bằng $1$." }
          ]
        }
      ]
    },

    // ======================= ĐỀ 4 – NÂNG CAO =======================
    {
      id: "d4", name: "Đề 4 – Nâng cao", advanced: true,
      mcq: [
        {
          id: "d4q1", level: "vua", source: "SBT Bài 5 – BT 2.4",
          q: "Có bao nhiêu phân số trong các phân số $\\frac{3}{8};\\ \\frac{7}{12};\\ \\frac{9}{15};\\ \\frac{14}{35};\\ \\frac{5}{18}$ viết được dưới dạng số thập phân hữu hạn?",
          options: ["$2$", "$4$", "$3$", "$1$"],
          answer: 2,
          explain: "Rút gọn: $\\frac{9}{15} = \\frac{3}{5}$; $\\frac{14}{35} = \\frac{2}{5}$. Các phân số hữu hạn: $\\frac{3}{8}, \\frac{3}{5}, \\frac{2}{5}$ (3 phân số). $\\frac{7}{12}$ và $\\frac{5}{18}$ có mẫu chứa ước 3."
        },
        {
          id: "d4q2", level: "vua", source: "SGK tr.28 – Em có biết",
          q: "Số $0{,}(27)$ bằng phân số nào sau đây?",
          options: ["$\\frac{27}{100}$", "$\\frac{3}{11}$", "$\\frac{27}{90}$", "$\\frac{2}{7}$"],
          answer: 1,
          explain: "Đặt $x = 0{,}(27)$: $100x = 27 + x$ nên $99x = 27$, $x = \\frac{27}{99} = \\frac{3}{11}$."
        },
        {
          id: "d4q3", level: "vua", source: "SGK tr.28 – Em có biết",
          q: "Số $0{,}(9)$ bằng",
          options: ["$0{,}9$", "$\\frac{9}{10}$", "$1$", "$\\frac{99}{100}$"],
          answer: 2,
          explain: "Đặt $x = 0{,}(9)$: $10x = 9 + x$ nên $9x = 9$, $x = 1$. Vậy $0{,}(9) = 1$ (hai cách viết của cùng một số)."
        },
        {
          id: "d4q4", level: "kho", source: "SBT Bài 5 – BT 2.6",
          q: "Chữ số thứ 2024 sau dấu phẩy của $\\frac{1}{7}$ là",
          options: ["$1$", "$2$", "$8$", "$4$"],
          answer: 3,
          explain: "$\\frac{1}{7} = 0{,}(142857)$, chu kì 6 chữ số. $2024 = 6 \\cdot 337 + 2$ (dư 2) nên đó là chữ số thứ 2 của chu kì, tức là $4$."
        },
        {
          id: "d4q5", level: "kho", source: "mới",
          q: "Số $0{,}1(6)$ bằng phân số nào sau đây?",
          options: ["$\\frac{1}{6}$", "$\\frac{16}{99}$", "$\\frac{8}{45}$", "$\\frac{2}{15}$"],
          answer: 0,
          explain: "$0{,}1(6) = 0{,}1 + 0{,}0(6) = \\frac{1}{10} + \\frac{1}{10} \\cdot 0{,}(6) = \\frac{1}{10} + \\frac{1}{10} \\cdot \\frac{2}{3} = \\frac{3}{30} + \\frac{2}{30} = \\frac{1}{6}$. (Kiểm tra: $1 : 6 = 0{,}1666\\ldots$)"
        },
        {
          id: "d4q6", level: "kho", source: "mới",
          q: "Số tự nhiên $n$ nhỏ nhất, khác 0, để phân số $\\frac{n}{30}$ viết được dưới dạng số thập phân hữu hạn là",
          options: ["$1$", "$3$", "$5$", "$6$"],
          answer: 1,
          explain: "$30 = 2 \\cdot 3 \\cdot 5$. Để sau khi rút gọn mẫu không còn ước 3 thì $n$ phải chia hết cho 3. Số nhỏ nhất là $n = 3$: $\\frac{3}{30} = \\frac{1}{10} = 0{,}1$."
        },
        {
          id: "d4q7", level: "kho", source: "mới",
          q: "Một số thập phân dương $a$ khi làm tròn đến hàng phần trăm được $3{,}47$. Khẳng định nào sau đây đúng?",
          options: ["$3{,}465 \\le a < 3{,}475$", "$3{,}46 \\le a < 3{,}48$", "$3{,}47 \\le a < 3{,}48$", "$3{,}4 \\le a < 3{,}5$"],
          answer: 0,
          explain: "Kết quả làm tròn đến hàng phần trăm có độ chính xác $0{,}005$, nên $a$ cách $3{,}47$ không quá $0{,}005$: $3{,}465 \\le a < 3{,}475$ (số $3{,}475$ sẽ làm tròn thành $3{,}48$)."
        },
        {
          id: "d4q8", level: "kho", source: "SGK tr.28 – Em có biết",
          q: "Cho $x = 0{,}(3) + 0{,}(6)$. Khẳng định nào đúng?",
          options: ["$x = 0{,}(9)$ và $x < 1$", "$x = 0{,}9$", "$x = 1$", "$x = 0{,}(36)$"],
          answer: 2,
          explain: "$0{,}(3) = \\frac{1}{3}$, $0{,}(6) = \\frac{2}{3}$ nên $x = \\frac{1}{3} + \\frac{2}{3} = 1$. (Viết $x = 0{,}(9)$ cũng đúng nhưng $0{,}(9) = 1$, không nhỏ hơn 1.)"
        },
        {
          id: "d4q9", level: "kho", source: "SBT Bài 5 – BT 2.8",
          q: "Bạn Hà tính được $5{,}83 \\cdot 2{,}(7) = 18{,}4$. Không tính chính xác, nhận xét nào sau đây đúng?",
          options: ["Kết quả đúng", "Kết quả sai vì tích nhỏ hơn $18$", "Kết quả sai vì tích lớn hơn $20$", "Không thể nhận xét nếu không tính chính xác"],
          answer: 1,
          explain: "Làm tròn lên: $5{,}83 < 6$ và $2{,}(7) = 2{,}777\\ldots < 3$. Vì các số đều dương nên tích $< 6 \\cdot 3 = 18 < 18{,}4$. Vậy kết quả của Hà sai (tích thực tế $\\approx 16{,}2$)."
        },
        {
          id: "d4q10", level: "kho", source: "mới",
          q: "Có bao nhiêu số tự nhiên $n$ với $1 \\le n \\le 20$ sao cho $\\frac{1}{n}$ viết được dưới dạng số thập phân hữu hạn?",
          options: ["$6$", "$7$", "$9$", "$8$"],
          answer: 3,
          explain: "$\\frac{1}{n}$ đã tối giản; cần $n$ chỉ có ước nguyên tố 2 và 5 (hoặc $n = 1$): $n \\in \\{1; 2; 4; 5; 8; 10; 16; 20\\}$, gồm 8 số."
        }
      ],
      essay: [
        {
          id: "d4e1", level: "kho", source: "mới", maxPoints: 1.5,
          q: "Chứng tỏ rằng $0{,}(37) + 0{,}(62) = 1$.",
          modelAnswer: "Đặt $x = 0{,}(37)$ thì $100x = 37 + x$, nên $99x = 37$, $x = \\frac{37}{99}$.<br>" +
            "Tương tự $0{,}(62) = \\frac{62}{99}$.<br>" +
            "Do đó $0{,}(37) + 0{,}(62) = \\frac{37}{99} + \\frac{62}{99} = \\frac{99}{99} = 1$.",
          rubric: [
            { pts: 0.5, text: "Đổi đúng $0{,}(37) = \\frac{37}{99}$ (có cách làm)." },
            { pts: 0.5, text: "Đổi đúng $0{,}(62) = \\frac{62}{99}$." },
            { pts: 0.5, text: "Cộng đúng và kết luận bằng $1$." }
          ]
        },
        {
          id: "d4e2", level: "kho", source: "SBT Bài 5 – BT 2.6 (nâng cao)", maxPoints: 1.5,
          q: "a) Viết $\\frac{5}{13}$ dưới dạng số thập phân vô hạn tuần hoàn và chỉ ra chu kì.<br>" +
            "b) Tìm chữ số thứ 50 sau dấu phẩy của $\\frac{5}{13}$.<br>c) Làm tròn $\\frac{5}{13}$ với độ chính xác $0{,}005$.",
          modelAnswer: "a) Đặt tính chia $5 : 13$: các số dư lần lượt $11, 6, 8, 2, 7, 5$ rồi lặp lại, thương là $0{,}384615\\,384615\\ldots$ Vậy $\\frac{5}{13} = 0{,}(384615)$, chu kì $384615$ (6 chữ số).<br>" +
            "b) $50 = 6 \\cdot 8 + 2$ (dư 2) nên chữ số thứ 50 là chữ số thứ 2 của chu kì, tức là $8$.<br>" +
            "c) Độ chính xác $0{,}005$ → làm tròn đến hàng phần trăm. $0{,}3846\\ldots$ có chữ số ngay sau hàng phần trăm là $4 < 5$ nên $\\frac{5}{13} \\approx 0{,}38$.",
          rubric: [
            { pts: 0.5, text: "Câu a: $\\frac{5}{13} = 0{,}(384615)$, chu kì $384615$." },
            { pts: 0.5, text: "Câu b: chia 50 cho 6 dư 2, chữ số cần tìm là $8$." },
            { pts: 0.5, text: "Câu c: làm tròn đến hàng phần trăm, được $0{,}38$." }
          ]
        }
      ]
    }
  ]
});
