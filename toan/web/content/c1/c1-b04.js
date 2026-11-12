registerLesson({
  "id": "c1-b04",
  "chapter": 1,
  "kind": "lesson",
  "title": "Bài 4. Thứ tự thực hiện các phép tính. Quy tắc chuyển vế",
  "sgkPages": [
    20,
    22
  ],
  "sbtPages": [
    17,
    19
  ],
  "objectives": [
    "Nắm và vận dụng đúng thứ tự thực hiện các phép tính với số hữu tỉ",
    "Vận dụng quy tắc dấu ngoặc để tính nhanh, tính hợp lí",
    "Hiểu đẳng thức, vế trái, vế phải; vận dụng quy tắc chuyển vế để tìm x",
    "Giải một số bài toán thực tế bằng cách lập đẳng thức"
  ],
  "theory": [
    {
      "heading": "1. Thứ tự thực hiện các phép tính",
      "html": "Thứ tự thực hiện phép tính đã học với số tự nhiên, số nguyên vẫn đúng với <b>số hữu tỉ</b>:<ul><li>Biểu thức chỉ có cộng, trừ (hoặc chỉ có nhân, chia): làm lần lượt <b>từ trái sang phải</b>.<br>Ví dụ: $6 : 3 \\cdot 2 = 2 \\cdot 2 = 4$ (không phải $6 : 6 = 1$).</li><li>Biểu thức <b>không có dấu ngoặc</b>: <b>Luỹ thừa → Nhân và chia → Cộng và trừ</b>.<br>Ví dụ: $1{,}2 - 3^2 + 7{,}5 : 3 = 1{,}2 - 9 + 2{,}5 = -5{,}3$.</li><li>Biểu thức <b>có dấu ngoặc</b>: làm trong ngoặc trước, ngoài ngoặc sau, theo thứ tự $(\\;) \\to [\\;] \\to \\{\\;\\}$.<br>Ví dụ: $9{,}8 + 1{,}5 \\cdot 6 + (6{,}8 - 2) : 3 = 9{,}8 + 9 + 4{,}8 : 3 = 18{,}8 + 1{,}6 = 20{,}4$.</li></ul>Khi có thể, hãy dùng tính chất giao hoán, kết hợp, phân phối để <b>tính hợp lí</b> (nhóm các số có tổng tròn, đặt thừa số chung)."
    },
    {
      "heading": "2. Quy tắc dấu ngoặc",
      "html": "<ul><li>Bỏ ngoặc có dấu <b>“+”</b> đứng trước: giữ nguyên dấu các số hạng trong ngoặc: $a + (b - c) = a + b - c$.</li><li>Bỏ ngoặc có dấu <b>“−”</b> đứng trước: <b>đổi dấu tất cả</b> các số hạng trong ngoặc: $a - (b - c + d) = a - b + c - d$.</li><li>Ngược lại, khi đưa các số hạng vào trong ngoặc có dấu “−” đứng trước thì cũng phải đổi dấu chúng: $a - b + c = a - (b - c)$.</li></ul>Ví dụ: $\\left(\\frac{5}{7}+\\frac{2}{9}\\right) - \\left(\\frac{5}{7} - \\frac{7}{9}\\right) = \\frac{5}{7}+\\frac{2}{9}-\\frac{5}{7}+\\frac{7}{9} = 1$."
    },
    {
      "heading": "3. Đẳng thức",
      "html": "Một <b>đẳng thức</b> có dạng $A = B$, trong đó $A$ là <b>vế trái</b>, $B$ là <b>vế phải</b>. Ví dụ: $5{,}1 + x = 7$ có vế trái $5{,}1 + x$, vế phải $7$.<br>Tính chất: nếu $a = b$ thì $b = a$ và $a + c = b + c$ (cộng cùng một số vào hai vế, đẳng thức vẫn đúng)."
    },
    {
      "heading": "4. Quy tắc chuyển vế",
      "html": "Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải <b>đổi dấu</b> số hạng đó: dấu “+” thành dấu “−”, dấu “−” thành dấu “+”.$$a + b = c \\;\\Rightarrow\\; a = c - b; \\qquad a - b = c \\;\\Rightarrow\\; a = c + b.$$Ví dụ: $x + \\frac{1}{2} = -\\frac{6}{7} \\Rightarrow x = -\\frac{6}{7} - \\frac{1}{2} = -\\frac{19}{14}$; $x - \\frac{3}{4} = \\frac{9}{8} \\Rightarrow x = \\frac{9}{8} + \\frac{3}{4} = \\frac{15}{8}$."
    },
    {
      "heading": "5. Các dạng tìm x thường gặp",
      "html": "<ul><li>$x + a = b \\Rightarrow x = b - a$; &nbsp; $x - a = b \\Rightarrow x = b + a$.</li><li>$a - x = b \\Rightarrow x = a - b$ (chuyển $x$ sang vế phải và $b$ sang vế trái).</li><li>$a\\,x + b = c \\Rightarrow a\\,x = c - b \\Rightarrow x = (c - b) : a$ ($a \\ne 0$).</li><li>Nếu $x$ nằm trong ngoặc hoặc vế phải là một biểu thức: <b>tính gọn vế còn lại</b> (hoặc bỏ ngoặc) trước, rồi mới chuyển vế.</li><li>Nếu $x$ có mặt ở cả hai vế: chuyển các hạng tử chứa $x$ về một vế, các số về vế kia: $a\\,x + b = c\\,x + d \\Rightarrow (a - c)\\,x = d - b$.</li></ul>Sau khi tìm được $x$, nên <b>thay lại</b> vào đẳng thức ban đầu để kiểm tra."
    }
  ],
  "skills": [
    "Trước khi tính, hãy <b>đánh dấu thứ tự</b>: ngoặc tròn → ngoặc vuông → ngoặc nhọn; trong mỗi ngoặc: luỹ thừa → nhân, chia → cộng, trừ.",
    "Nhìn trước xem có thể <b>tính hợp lí</b> không: nhóm các số có tổng tròn (ví dụ $-1{,}2 + (-0{,}8) = -2$; $0{,}25 + 5{,}75 = 6$), hoặc đặt thừa số chung $a\\cdot b + a \\cdot c = a\\cdot(b + c)$.",
    "Biểu thức phức tạp dạng $A = [\\dots] : [\\dots]$: tính riêng từng ngoặc lớn cho gọn rồi mới chia.",
    "Tìm $x$: đưa về dạng $x = \\dots$ bằng quy tắc chuyển vế; nếu có hệ số ($2x$, $-6x$) thì chuyển các số trước, chia cho hệ số sau.",
    "Bài toán thực tế: gọi đại lượng chưa biết là $x$, viết một <b>đẳng thức</b> mô tả tình huống (ví dụ cân thăng bằng: tổng bên trái = tổng bên phải), rồi chuyển vế để tìm $x$. Nhớ ghi đơn vị.",
    "<b>Lỗi hay gặp 1:</b> chuyển vế mà <b>quên đổi dấu</b>: $x + \\frac{1}{3} = 1 \\Rightarrow x = 1 + \\frac{1}{3}$ là <b>sai</b>; đúng là $x = 1 - \\frac{1}{3} = \\frac{2}{3}$.",
    "<b>Lỗi hay gặp 2:</b> bỏ ngoặc có dấu “−” đứng trước nhưng chỉ đổi dấu số hạng đầu: $5 - (2 - 3) = 5 - 2 - 3$ là <b>sai</b>; đúng là $5 - 2 + 3 = 6$.",
    "<b>Lỗi hay gặp 3:</b> làm từ trái sang phải bất chấp thứ tự ưu tiên: $10 + 36 : 2 \\cdot 3$ phải tính $36 : 2 \\cdot 3 = 54$ trước, được $64$ (không phải $(10+36):6$).",
    "<b>Lỗi hay gặp 4:</b> với $a - x = b$ học sinh hay viết $x = b - a$. Đúng là $x = a - b$ (ví dụ $-\\frac{1}{3} - x = \\frac{17}{6} \\Rightarrow x = -\\frac{1}{3} - \\frac{17}{6} = -\\frac{19}{6}$).",
    "<b>Lỗi hay gặp 5:</b> với $2x + \\frac{1}{2} = \\frac{7}{9}$ chia cho $2$ quá sớm hoặc nhân thay vì chia: phải chuyển vế trước được $2x = \\frac{5}{18}$, rồi $x = \\frac{5}{18} : 2 = \\frac{5}{36}$."
  ],
  "examples": [
    {
      "q": "Tính giá trị biểu thức $A = 1{,}5 - 2^3 + 9{,}6 : 3$.",
      "solution": "Biểu thức không có ngoặc: tính luỹ thừa, rồi chia, cuối cùng cộng trừ từ trái sang phải.$$A = 1{,}5 - 8 + 3{,}2 = -6{,}5 + 3{,}2 = -3{,}3.$$"
    },
    {
      "q": "Tính $B = \\left(\\frac{3}{4}+\\frac{1}{2}\\right) : \\frac{5}{2} + \\left(\\frac{1}{3}-\\frac{1}{6}\\right)\\cdot 3$.",
      "solution": "Tính trong ngoặc trước: $\\frac{3}{4}+\\frac{1}{2} = \\frac{5}{4}$; $\\frac{1}{3}-\\frac{1}{6} = \\frac{1}{6}$.$$B = \\frac{5}{4} : \\frac{5}{2} + \\frac{1}{6}\\cdot 3 = \\frac{5}{4}\\cdot\\frac{2}{5} + \\frac{1}{2} = \\frac{1}{2} + \\frac{1}{2} = 1.$$"
    },
    {
      "q": "Tìm $x$, biết: a) $x - \\frac{2}{3} = -\\frac{5}{6}$; &nbsp; b) $2x + \\frac{1}{4} = \\frac{3}{4}$.",
      "solution": "a) Chuyển $-\\frac{2}{3}$ sang vế phải thành $+\\frac{2}{3}$: $x = -\\frac{5}{6} + \\frac{2}{3} = -\\frac{5}{6} + \\frac{4}{6} = -\\frac{1}{6}$.<br>b) Chuyển $\\frac{1}{4}$ sang vế phải: $2x = \\frac{3}{4} - \\frac{1}{4} = \\frac{1}{2}$. Suy ra $x = \\frac{1}{2} : 2 = \\frac{1}{4}$.<br>Thử lại b): $2\\cdot\\frac{1}{4} + \\frac{1}{4} = \\frac{3}{4}$ ✓."
    },
    {
      "q": "Một chiếc cân thăng bằng: đĩa trái có một quả dưa (chưa biết khối lượng) và một túi cam $1{,}2$ kg; đĩa phải có hai quả bưởi nặng $0{,}8$ kg và $2{,}9$ kg. Tính khối lượng quả dưa.",
      "solution": "Gọi khối lượng quả dưa là $x$ (kg). Cân thăng bằng nên $x + 1{,}2 = 0{,}8 + 2{,}9$, tức $x + 1{,}2 = 3{,}7$.<br>Chuyển vế: $x = 3{,}7 - 1{,}2 = 2{,}5$. Vậy quả dưa nặng $2{,}5$ kg."
    }
  ],
  "sets": [
    {
      "id": "d1",
      "name": "Đề 1",
      "mcq": [
        {
          "id": "d1q1",
          "level": "de",
          "source": "SGK tr.20 – Kiến thức",
          "q": "Với biểu thức <b>không có dấu ngoặc</b>, thứ tự thực hiện các phép tính là:",
          "options": [
            "Luỹ thừa → Nhân và chia → Cộng và trừ",
            "Nhân và chia → Luỹ thừa → Cộng và trừ",
            "Cộng và trừ → Nhân và chia → Luỹ thừa",
            "Làm lần lượt từ trái sang phải, không phân biệt phép tính"
          ],
          "answer": 0,
          "explain": "Thứ tự đúng: luỹ thừa trước, rồi nhân và chia, cuối cùng cộng và trừ."
        },
        {
          "id": "d1q2",
          "level": "de",
          "source": "SGK tr.21 – Quy tắc chuyển vế",
          "q": "Nếu $x + a = b$ thì:",
          "options": [
            "$x = b + a$",
            "$x = b - a$",
            "$x = a - b$",
            "$x = -b - a$"
          ],
          "answer": 1,
          "explain": "Chuyển $a$ sang vế phải, đổi dấu “+” thành “−”: $x = b - a$."
        },
        {
          "id": "d1q3",
          "level": "de",
          "source": "SGK tr.20 – Ví dụ 1",
          "q": "Giá trị của biểu thức $1{,}5 - 2^2 + 6 : 4$ là:",
          "options": [
            "$0{,}875$",
            "$-4$",
            "$-1$",
            "$7$"
          ],
          "answer": 2,
          "explain": "$1{,}5 - 4 + 1{,}5 = -1$ (tính luỹ thừa, phép chia trước rồi mới cộng trừ)."
        },
        {
          "id": "d1q4",
          "level": "de",
          "source": "SGK Bài 4 – BT 1.26",
          "q": "Tìm $x$, biết $x + 0{,}75 = 2$.",
          "options": [
            "$2{,}75$",
            "$-1{,}25$",
            "$1{,}5$",
            "$1{,}25$"
          ],
          "answer": 3,
          "explain": "$x = 2 - 0{,}75 = 1{,}25$."
        },
        {
          "id": "d1q5",
          "level": "vua",
          "source": "SGK tr.21 – Luyện tập 1",
          "q": "Giá trị của $\\left(\\frac{1}{2}+\\frac{1}{3}\\right) : \\frac{5}{3}$ là:",
          "options": [
            "$\\frac{25}{18}$",
            "$\\frac{1}{2}$",
            "$\\frac{7}{10}$",
            "$2$"
          ],
          "answer": 1,
          "explain": "$\\frac{5}{6} : \\frac{5}{3} = \\frac{5}{6}\\cdot\\frac{3}{5} = \\frac{1}{2}$."
        },
        {
          "id": "d1q6",
          "level": "vua",
          "source": "SGK Bài 4 – BT 1.26",
          "q": "Tìm $x$, biết $x - \\left(-\\frac{3}{5}\\right) = \\frac{7}{10}$.",
          "options": [
            "$\\frac{1}{10}$",
            "$\\frac{13}{10}$",
            "$-\\frac{1}{10}$",
            "$-\\frac{13}{10}$"
          ],
          "answer": 0,
          "explain": "$x + \\frac{3}{5} = \\frac{7}{10} \\Rightarrow x = \\frac{7}{10} - \\frac{6}{10} = \\frac{1}{10}$."
        },
        {
          "id": "d1q7",
          "level": "vua",
          "source": "SBT Bài 4 – BT 1.27",
          "q": "Bỏ dấu ngoặc rồi tính: $(6{,}2 - 1{,}8) - (3{,}2 - 1{,}8)$.",
          "options": [
            "$-0{,}6$",
            "$9{,}4$",
            "$3$",
            "$6{,}6$"
          ],
          "answer": 2,
          "explain": "$6{,}2 - 1{,}8 - 3{,}2 + 1{,}8 = (6{,}2 - 3{,}2) + (-1{,}8 + 1{,}8) = 3$."
        },
        {
          "id": "d1q8",
          "level": "vua",
          "source": "SGK Bài 4 – BT 1.30",
          "q": "Để làm mứt cần $3\\frac{1}{4}$ kg đường. Mẹ đã có $1\\frac{2}{3}$ kg đường. Mẹ cần mua thêm bao nhiêu kilôgam đường?",
          "options": [
            "$2\\frac{5}{12}$ kg",
            "$4\\frac{11}{12}$ kg",
            "$2\\frac{1}{12}$ kg",
            "$1\\frac{7}{12}$ kg"
          ],
          "answer": 3,
          "explain": "Gọi số đường cần thêm là $x$: $x + 1\\frac{2}{3} = 3\\frac{1}{4} \\Rightarrow x = \\frac{13}{4} - \\frac{5}{3} = \\frac{39-20}{12} = \\frac{19}{12} = 1\\frac{7}{12}$ (kg)."
        },
        {
          "id": "d1q9",
          "level": "kho",
          "source": "SGK Bài 4 – BT 1.31",
          "q": "Tìm $x$, biết $2x + \\frac{1}{3} = \\frac{5}{6}$.",
          "options": [
            "$1$",
            "$\\frac{1}{4}$",
            "$\\frac{7}{12}$",
            "$\\frac{1}{2}$"
          ],
          "answer": 1,
          "explain": "$2x = \\frac{5}{6} - \\frac{1}{3} = \\frac{1}{2} \\Rightarrow x = \\frac{1}{2} : 2 = \\frac{1}{4}$."
        },
        {
          "id": "d1q10",
          "level": "kho",
          "source": "SBT Bài 4 – Ví dụ 1",
          "q": "Giá trị của $A = \\left[\\left(\\frac{3}{4}-\\frac{1}{2}\\right)\\cdot\\frac{8}{5}+\\frac{3}{5}\\right] : \\left[\\left(\\frac{1}{3}+\\frac{1}{6}\\right)\\cdot\\frac{4}{5}+\\frac{1}{10}\\right]$ là:",
          "options": [
            "$2$",
            "$\\frac{1}{2}$",
            "$1$",
            "$\\frac{5}{2}$"
          ],
          "answer": 0,
          "explain": "Ngoặc thứ nhất: $\\frac{1}{4}\\cdot\\frac{8}{5}+\\frac{3}{5} = \\frac{2}{5}+\\frac{3}{5} = 1$. Ngoặc thứ hai: $\\frac{1}{2}\\cdot\\frac{4}{5}+\\frac{1}{10} = \\frac{1}{2}$. Vậy $A = 1 : \\frac{1}{2} = 2$."
        }
      ],
      "essay": [
        {
          "id": "d1e1",
          "level": "vua",
          "source": "SGK Bài 4 – BT 1.27",
          "maxPoints": 1.5,
          "q": "Tìm $x$, biết: $\\frac{3}{4} - x = \\frac{1}{2} - \\left(-\\frac{1}{3}\\right)$.",
          "modelAnswer": "Tính vế phải: $\\frac{1}{2} - \\left(-\\frac{1}{3}\\right) = \\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}$.<br>Ta có $\\frac{3}{4} - x = \\frac{5}{6}$. Chuyển vế: $x = \\frac{3}{4} - \\frac{5}{6} = \\frac{9}{12} - \\frac{10}{12} = -\\frac{1}{12}$.<br>Vậy $x = -\\frac{1}{12}$.",
          "rubric": [
            {
              "pts": 0.5,
              "text": "Tính đúng vế phải bằng $\\frac{5}{6}$."
            },
            {
              "pts": 0.5,
              "text": "Chuyển vế đúng: $x = \\frac{3}{4} - \\frac{5}{6}$."
            },
            {
              "pts": 0.5,
              "text": "Quy đồng, tính đúng $x = -\\frac{1}{12}$ và kết luận."
            }
          ]
        },
        {
          "id": "d1e2",
          "level": "kho",
          "source": "SGK tr.22 – Vận dụng",
          "maxPoints": 1.5,
          "q": "Mỗi hộp quà Tết nặng $1{,}2$ kg, gồm $0{,}45$ kg chè, $0{,}35$ kg bánh, vỏ hộp nặng $0{,}15$ kg, còn lại là mứt.<br>a) Viết một đẳng thức và tính khối lượng mứt trong mỗi hộp.<br>b) Cô Hoa mua $6$ hộp quà như vậy. Tổng khối lượng mứt trong $6$ hộp là bao nhiêu kilôgam?",
          "modelAnswer": "a) Gọi khối lượng mứt trong mỗi hộp là $x$ (kg). Ta có $x + 0{,}45 + 0{,}35 + 0{,}15 = 1{,}2$, tức $x + 0{,}95 = 1{,}2$.<br>Chuyển vế: $x = 1{,}2 - 0{,}95 = 0{,}25$. Mỗi hộp có $0{,}25$ kg mứt.<br>b) Khối lượng mứt trong $6$ hộp: $6 \\cdot 0{,}25 = 1{,}5$ (kg).",
          "rubric": [
            {
              "pts": 0.5,
              "text": "Gọi ẩn và viết đúng đẳng thức $x + 0{,}45 + 0{,}35 + 0{,}15 = 1{,}2$."
            },
            {
              "pts": 0.5,
              "text": "Chuyển vế, tính đúng $x = 0{,}25$ kg."
            },
            {
              "pts": 0.5,
              "text": "Tính đúng $6 \\cdot 0{,}25 = 1{,}5$ kg, có đơn vị."
            }
          ]
        }
      ]
    },
    {
      "id": "d2",
      "name": "Đề 2",
      "mcq": [
        {
          "id": "d2q1",
          "level": "de",
          "source": "SGK tr.21 – Quy tắc chuyển vế",
          "q": "Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải:",
          "options": [
            "giữ nguyên dấu của số hạng đó",
            "đổi dấu mọi số hạng ở hai vế",
            "đổi dấu số hạng đó: “+” thành “−”, “−” thành “+”",
            "chỉ đổi dấu khi số hạng đó là số âm"
          ],
          "answer": 2,
          "explain": "Quy tắc chuyển vế: chuyển số hạng nào sang vế kia thì đổi dấu số hạng đó."
        },
        {
          "id": "d2q2",
          "level": "de",
          "source": "SGK tr.20 – Kiến thức",
          "q": "Khi tính giá trị biểu thức $5 - 3 \\cdot 2^2$, phép tính được thực hiện <b>đầu tiên</b> là:",
          "options": [
            "phép nâng lên luỹ thừa",
            "phép trừ",
            "phép nhân",
            "phép cộng"
          ],
          "answer": 0,
          "explain": "Không có ngoặc nên tính luỹ thừa trước: $2^2 = 4$, rồi nhân, rồi trừ: $5 - 12 = -7$."
        },
        {
          "id": "d2q3",
          "level": "de",
          "source": "SGK tr.20 – Ví dụ 1",
          "q": "Giá trị của biểu thức $8 - 1{,}2 \\cdot 5 + 0{,}5$ là:",
          "options": [
            "$34{,}5$",
            "$2{,}5$",
            "$1{,}5$",
            "$1{,}4$"
          ],
          "answer": 1,
          "explain": "Nhân trước: $1{,}2\\cdot 5 = 6$. Rồi $8 - 6 + 0{,}5 = 2{,}5$."
        },
        {
          "id": "d2q4",
          "level": "de",
          "source": "SGK tr.22 – Luyện tập 2",
          "q": "Tìm $x$, biết $x - 1{,}25 = 3{,}5$.",
          "options": [
            "$2{,}25$",
            "$-4{,}75$",
            "$-2{,}25$",
            "$4{,}75$"
          ],
          "answer": 3,
          "explain": "Chuyển $-1{,}25$ sang vế phải thành $+1{,}25$: $x = 3{,}5 + 1{,}25 = 4{,}75$."
        },
        {
          "id": "d2q5",
          "level": "vua",
          "source": "SGK Bài 4 – BT 1.28",
          "q": "Tính một cách hợp lí: $-0{,}3 + \\frac{7}{5} + 5{,}3 + \\frac{-12}{5}$.",
          "options": [
            "$6$",
            "$5$",
            "$4$",
            "$-6$"
          ],
          "answer": 2,
          "explain": "$(-0{,}3 + 5{,}3) + \\left(\\frac{7}{5} - \\frac{12}{5}\\right) = 5 + (-1) = 4$."
        },
        {
          "id": "d2q6",
          "level": "vua",
          "source": "SGK tr.22 – Luyện tập 2",
          "q": "Tìm $x$, biết $-\\frac{1}{3} - x = \\frac{5}{6}$.",
          "options": [
            "$\\frac{7}{6}$",
            "$-\\frac{7}{6}$",
            "$\\frac{1}{2}$",
            "$-\\frac{1}{2}$"
          ],
          "answer": 1,
          "explain": "$x = -\\frac{1}{3} - \\frac{5}{6} = -\\frac{2}{6} - \\frac{5}{6} = -\\frac{7}{6}$."
        },
        {
          "id": "d2q7",
          "level": "vua",
          "source": "SBT Bài 4 – BT 1.27",
          "q": "Giá trị của $-\\left(\\frac{2}{3}+\\frac{1}{4}\\right) - \\left(-\\frac{1}{4}+\\frac{1}{3}\\right)$ là:",
          "options": [
            "$-1$",
            "$1$",
            "$-\\frac{1}{2}$",
            "$-\\frac{3}{2}$"
          ],
          "answer": 0,
          "explain": "Bỏ ngoặc: $-\\frac{2}{3}-\\frac{1}{4}+\\frac{1}{4}-\\frac{1}{3} = -\\left(\\frac{2}{3}+\\frac{1}{3}\\right) + 0 = -1$."
        },
        {
          "id": "d2q8",
          "level": "vua",
          "source": "SBT Bài 4 – BT 1.31",
          "q": "Một cân đĩa thăng bằng: đĩa trái có quả bí (nặng $x$ kg) và quả dưa $2{,}3$ kg; đĩa phải có quả bưởi $1{,}8$ kg và quả mít $3{,}5$ kg. Quả bí nặng:",
          "options": [
            "$7{,}6$ kg",
            "$1{,}2$ kg",
            "$5{,}3$ kg",
            "$3$ kg"
          ],
          "answer": 3,
          "explain": "$x + 2{,}3 = 1{,}8 + 3{,}5 = 5{,}3 \\Rightarrow x = 5{,}3 - 2{,}3 = 3$ (kg)."
        },
        {
          "id": "d2q9",
          "level": "kho",
          "source": "SGK Bài 4 – BT 1.31",
          "q": "Tìm $x$, biết $\\frac{5}{6} - 3x = \\frac{1}{3}$.",
          "options": [
            "$\\frac{3}{2}$",
            "$-\\frac{1}{6}$",
            "$\\frac{1}{6}$",
            "$\\frac{7}{18}$"
          ],
          "answer": 2,
          "explain": "$3x = \\frac{5}{6} - \\frac{1}{3} = \\frac{1}{2} \\Rightarrow x = \\frac{1}{2} : 3 = \\frac{1}{6}$."
        },
        {
          "id": "d2q10",
          "level": "kho",
          "source": "SBT Bài 4 – BT 1.30",
          "q": "Tìm $x$, biết $(0{,}3)^2 + 2x = (0{,}5)^2$.",
          "options": [
            "$0{,}16$",
            "$0{,}08$",
            "$0{,}17$",
            "$0{,}1$"
          ],
          "answer": 1,
          "explain": "$0{,}09 + 2x = 0{,}25 \\Rightarrow 2x = 0{,}16 \\Rightarrow x = 0{,}08$."
        }
      ],
      "essay": [
        {
          "id": "d2e1",
          "level": "vua",
          "source": "SGK Bài 4 – BT 1.29",
          "maxPoints": 1.5,
          "q": "Bỏ dấu ngoặc rồi tính: $\\frac{13}{7} - \\left(\\frac{4}{9} - \\frac{8}{7}\\right) + \\frac{22}{9}$.",
          "modelAnswer": "$\\frac{13}{7} - \\left(\\frac{4}{9} - \\frac{8}{7}\\right) + \\frac{22}{9} = \\frac{13}{7} - \\frac{4}{9} + \\frac{8}{7} + \\frac{22}{9}$<br>$= \\left(\\frac{13}{7} + \\frac{8}{7}\\right) + \\left(-\\frac{4}{9} + \\frac{22}{9}\\right) = \\frac{21}{7} + \\frac{18}{9} = 3 + 2 = 5.$",
          "rubric": [
            {
              "pts": 0.5,
              "text": "Bỏ ngoặc đúng (đổi dấu cả hai số hạng): $\\frac{13}{7} - \\frac{4}{9} + \\frac{8}{7} + \\frac{22}{9}$."
            },
            {
              "pts": 0.5,
              "text": "Nhóm hợp lí các phân số cùng mẫu."
            },
            {
              "pts": 0.5,
              "text": "Tính đúng kết quả $5$."
            }
          ]
        },
        {
          "id": "d2e2",
          "level": "kho",
          "source": "SBT Bài 4 – Ví dụ 2",
          "maxPoints": 1.5,
          "q": "Mẹ đi chợ mua $2$ kg táo giá $42{,}5$ nghìn đồng/kg, $3$ hộp sữa chua giá $15{,}5$ nghìn đồng/hộp và một bó rau giá $8{,}5$ nghìn đồng. Mẹ đưa người bán $200$ nghìn đồng. Gọi $x$ (nghìn đồng) là số tiền người bán trả lại. Viết đẳng thức liên hệ và tìm $x$.",
          "modelAnswer": "Số tiền mẹ phải trả: $2 \\cdot 42{,}5 + 3 \\cdot 15{,}5 + 8{,}5 = 85 + 46{,}5 + 8{,}5 = 140$ (nghìn đồng).<br>Ta có đẳng thức $x + 140 = 200$. Chuyển vế: $x = 200 - 140 = 60$.<br>Vậy người bán trả lại mẹ $60$ nghìn đồng.",
          "rubric": [
            {
              "pts": 0.75,
              "text": "Tính đúng số tiền phải trả $140$ nghìn đồng (đúng thứ tự: nhân trước, cộng sau)."
            },
            {
              "pts": 0.25,
              "text": "Viết đúng đẳng thức $x + 140 = 200$."
            },
            {
              "pts": 0.5,
              "text": "Tìm đúng $x = 60$ và kết luận có đơn vị."
            }
          ]
        }
      ]
    },
    {
      "id": "d3",
      "name": "Đề 3",
      "mcq": [
        {
          "id": "d3q1",
          "level": "de",
          "source": "SGK tr.20 – Kiến thức",
          "q": "Với biểu thức có các loại dấu ngoặc, thứ tự thực hiện là:",
          "options": [
            "$\\{\\;\\} \\to [\\;] \\to (\\;)$",
            "$(\\;) \\to [\\;] \\to \\{\\;\\}$",
            "$[\\;] \\to (\\;) \\to \\{\\;\\}$",
            "$(\\;) \\to \\{\\;\\} \\to [\\;]$"
          ],
          "answer": 1,
          "explain": "Làm trong ngoặc tròn trước, rồi ngoặc vuông, cuối cùng ngoặc nhọn."
        },
        {
          "id": "d3q2",
          "level": "de",
          "source": "SGK tr.21 – Quy tắc chuyển vế",
          "q": "Nếu $a - b = c$ thì:",
          "options": [
            "$a = c - b$",
            "$a = b - c$",
            "$a = -c - b$",
            "$a = c + b$"
          ],
          "answer": 3,
          "explain": "Chuyển $-b$ sang vế phải, đổi thành $+b$: $a = c + b$."
        },
        {
          "id": "d3q3",
          "level": "de",
          "source": "SGK tr.20 – Hoạt động",
          "q": "Giá trị của biểu thức $10 - 2^3 : 4$ là:",
          "options": [
            "$8$",
            "$0{,}5$",
            "$8{,}5$",
            "$128$"
          ],
          "answer": 0,
          "explain": "$2^3 = 8$; $8 : 4 = 2$; $10 - 2 = 8$."
        },
        {
          "id": "d3q4",
          "level": "de",
          "source": "SGK Bài 4 – BT 1.26",
          "q": "Tìm $x$, biết $x + \\frac{3}{5} = 1$.",
          "options": [
            "$\\frac{8}{5}$",
            "$-\\frac{2}{5}$",
            "$\\frac{2}{5}$",
            "$-\\frac{8}{5}$"
          ],
          "answer": 2,
          "explain": "$x = 1 - \\frac{3}{5} = \\frac{2}{5}$."
        },
        {
          "id": "d3q5",
          "level": "vua",
          "source": "SGK tr.20 – Ví dụ 1",
          "q": "Giá trị của $9{,}8 + 1{,}5 \\cdot 4 - (6{,}4 - 2) : 2$ là:",
          "options": [
            "$43$",
            "$8{,}4$",
            "$10{,}4$",
            "$13{,}6$"
          ],
          "answer": 3,
          "explain": "$9{,}8 + 6 - 4{,}4 : 2 = 9{,}8 + 6 - 2{,}2 = 13{,}6$."
        },
        {
          "id": "d3q6",
          "level": "vua",
          "source": "SGK Bài 4 – BT 1.27",
          "q": "Tìm $x$, biết $x - \\left(\\frac{2}{3} - \\frac{3}{4}\\right) = \\frac{5}{12}$.",
          "options": [
            "$\\frac{1}{2}$",
            "$\\frac{1}{3}$",
            "$\\frac{11}{6}$",
            "$-\\frac{1}{3}$"
          ],
          "answer": 1,
          "explain": "$\\frac{2}{3} - \\frac{3}{4} = -\\frac{1}{12}$, nên $x + \\frac{1}{12} = \\frac{5}{12} \\Rightarrow x = \\frac{4}{12} = \\frac{1}{3}$."
        },
        {
          "id": "d3q7",
          "level": "vua",
          "source": "SGK Bài 4 – BT 1.28",
          "q": "Tính một cách hợp lí: $-2{,}5 + (-0{,}5) + 0{,}35 + 4{,}65 - 2022$.",
          "options": [
            "$-2020$",
            "$-2024$",
            "$2020$",
            "$-2019$"
          ],
          "answer": 0,
          "explain": "$[-2{,}5 + (-0{,}5)] + (0{,}35 + 4{,}65) - 2022 = -3 + 5 - 2022 = -2020$."
        },
        {
          "id": "d3q8",
          "level": "vua",
          "source": "SGK tr.22 – Vận dụng",
          "q": "Một chiếc bánh chưng nặng khoảng $1{,}2$ kg gồm $0{,}7$ kg gạo, $0{,}2$ kg đậu xanh, $0{,}06$ kg lá dong, còn lại là thịt. Khối lượng thịt khoảng:",
          "options": [
            "$0{,}44$ kg",
            "$2{,}16$ kg",
            "$0{,}24$ kg",
            "$0{,}36$ kg"
          ],
          "answer": 2,
          "explain": "$x + 0{,}7 + 0{,}2 + 0{,}06 = 1{,}2 \\Rightarrow x = 1{,}2 - 0{,}96 = 0{,}24$ (kg)."
        },
        {
          "id": "d3q9",
          "level": "kho",
          "source": "SBT Bài 4 – BT 1.28",
          "q": "Tìm $x$, biết $1 - 3x = \\frac{1}{2} + \\frac{3}{4} : \\frac{3}{8}$.",
          "options": [
            "$-\\frac{7}{9}$",
            "$\\frac{7}{6}$",
            "$\\frac{1}{2}$",
            "$-\\frac{1}{2}$"
          ],
          "answer": 3,
          "explain": "Vế phải: $\\frac{1}{2} + \\frac{3}{4}\\cdot\\frac{8}{3} = \\frac{1}{2} + 2 = \\frac{5}{2}$. Ta có $3x = 1 - \\frac{5}{2} = -\\frac{3}{2} \\Rightarrow x = -\\frac{1}{2}$."
        },
        {
          "id": "d3q10",
          "level": "kho",
          "source": "SGK Bài 4 – BT 1.34",
          "q": "Đặt một cặp dấu ngoặc vào biểu thức $1{,}5 - 2{,}5 + 3{,}5 - 4{,}5$. Cách đặt nào cho kết quả bằng $0$?",
          "options": [
            "$1{,}5 - (2{,}5 + 3{,}5) - 4{,}5$",
            "$1{,}5 - (2{,}5 + 3{,}5 - 4{,}5)$",
            "$(1{,}5 - 2{,}5 + 3{,}5) - 4{,}5$",
            "$1{,}5 - 2{,}5 + (3{,}5 - 4{,}5)$"
          ],
          "answer": 1,
          "explain": "$2{,}5 + 3{,}5 - 4{,}5 = 1{,}5$ nên $1{,}5 - 1{,}5 = 0$. Các cách khác cho $-9$; $-2$; $-2$."
        }
      ],
      "essay": [
        {
          "id": "d3e1",
          "level": "vua",
          "source": "SBT Bài 4 – BT 1.30",
          "maxPoints": 1.5,
          "q": "Tìm $x$, biết: $x - \\left(\\frac{1}{2} + \\frac{1}{4} - \\frac{1}{6}\\right) = \\frac{1}{6} - \\frac{1}{2}$.",
          "modelAnswer": "Chuyển vế: $x = \\frac{1}{6} - \\frac{1}{2} + \\left(\\frac{1}{2} + \\frac{1}{4} - \\frac{1}{6}\\right)$<br>$x = \\frac{1}{6} - \\frac{1}{2} + \\frac{1}{2} + \\frac{1}{4} - \\frac{1}{6}$<br>$x = \\left(\\frac{1}{6} - \\frac{1}{6}\\right) + \\left(-\\frac{1}{2} + \\frac{1}{2}\\right) + \\frac{1}{4} = \\frac{1}{4}$.<br>Vậy $x = \\frac{1}{4}$.",
          "rubric": [
            {
              "pts": 0.5,
              "text": "Chuyển vế đúng (biểu thức trong ngoặc sang vế phải với dấu “+”)."
            },
            {
              "pts": 0.5,
              "text": "Bỏ ngoặc đúng và nhóm các số đối nhau (hoặc quy đồng tính đúng)."
            },
            {
              "pts": 0.5,
              "text": "Kết quả $x = \\frac{1}{4}$."
            }
          ]
        },
        {
          "id": "d3e2",
          "level": "kho",
          "source": "SBT Bài 4 – BT 1.29",
          "maxPoints": 1.5,
          "q": "Tính $A = \\left[\\left(\\frac{1}{4} - \\frac{3}{8}\\right)\\cdot\\frac{16}{3} + \\frac{5}{6}\\right] : \\left[\\left(\\frac{2}{9} + \\frac{1}{18}\\right)\\cdot\\frac{6}{5} + 2\\right]$.",
          "modelAnswer": "Ngoặc thứ nhất: $\\left(\\frac{2}{8} - \\frac{3}{8}\\right)\\cdot\\frac{16}{3} + \\frac{5}{6} = -\\frac{1}{8}\\cdot\\frac{16}{3} + \\frac{5}{6} = -\\frac{2}{3} + \\frac{5}{6} = \\frac{1}{6}$.<br>Ngoặc thứ hai: $\\left(\\frac{4}{18} + \\frac{1}{18}\\right)\\cdot\\frac{6}{5} + 2 = \\frac{5}{18}\\cdot\\frac{6}{5} + 2 = \\frac{1}{3} + 2 = \\frac{7}{3}$.<br>Vậy $A = \\frac{1}{6} : \\frac{7}{3} = \\frac{1}{6}\\cdot\\frac{3}{7} = \\frac{1}{14}$.",
          "rubric": [
            {
              "pts": 0.5,
              "text": "Tính đúng ngoặc thứ nhất bằng $\\frac{1}{6}$."
            },
            {
              "pts": 0.5,
              "text": "Tính đúng ngoặc thứ hai bằng $\\frac{7}{3}$."
            },
            {
              "pts": 0.5,
              "text": "Thực hiện phép chia đúng, $A = \\frac{1}{14}$."
            }
          ]
        }
      ]
    },
    {
      "id": "d4",
      "name": "Đề 4 – Nâng cao",
      "advanced": true,
      "mcq": [
        {
          "id": "d4q1",
          "level": "vua",
          "source": "SBT Bài 4 – BT 1.28",
          "q": "Tìm $x$, biết $-x + \\frac{5}{6} = \\frac{2}{3} - \\frac{1}{4}$.",
          "options": [
            "$\\frac{5}{12}$",
            "$-\\frac{5}{12}$",
            "$\\frac{5}{4}$",
            "$-\\frac{5}{4}$"
          ],
          "answer": 0,
          "explain": "Vế phải bằng $\\frac{5}{12}$. Ta có $-x = \\frac{5}{12} - \\frac{5}{6} = -\\frac{5}{12}$, nên $x = \\frac{5}{12}$."
        },
        {
          "id": "d4q2",
          "level": "vua",
          "source": "SGK Bài 3 – BT 1.23",
          "q": "Giá trị của $\\left(1 - \\frac{1}{3}\\right)^2 \\cdot \\left(3 + \\frac{3}{4}\\right)$ là:",
          "options": [
            "$\\frac{10}{3}$",
            "$5$",
            "$\\frac{5}{3}$",
            "$1$"
          ],
          "answer": 2,
          "explain": "$\\left(\\frac{2}{3}\\right)^2\\cdot\\frac{15}{4} = \\frac{4}{9}\\cdot\\frac{15}{4} = \\frac{15}{9} = \\frac{5}{3}$."
        },
        {
          "id": "d4q3",
          "level": "kho",
          "source": "mới",
          "q": "Tìm $x$, biết $\\frac{3}{4} - \\left(x - \\frac{1}{2}\\right) = \\frac{5}{6}$.",
          "options": [
            "$-\\frac{7}{12}$",
            "$\\frac{7}{12}$",
            "$-\\frac{5}{12}$",
            "$\\frac{5}{12}$"
          ],
          "answer": 3,
          "explain": "$x - \\frac{1}{2} = \\frac{3}{4} - \\frac{5}{6} = -\\frac{1}{12} \\Rightarrow x = -\\frac{1}{12} + \\frac{1}{2} = \\frac{5}{12}$."
        },
        {
          "id": "d4q4",
          "level": "kho",
          "source": "mới",
          "q": "Tìm $x$, biết $\\frac{2}{3}x - \\frac{1}{2} = \\frac{1}{4}x + \\frac{1}{3}$.",
          "options": [
            "$\\frac{1}{2}$",
            "$2$",
            "$-2$",
            "$\\frac{25}{72}$"
          ],
          "answer": 1,
          "explain": "Chuyển vế: $\\frac{2}{3}x - \\frac{1}{4}x = \\frac{1}{3} + \\frac{1}{2}$, tức $\\frac{5}{12}x = \\frac{5}{6}$, nên $x = \\frac{5}{6} : \\frac{5}{12} = 2$."
        },
        {
          "id": "d4q5",
          "level": "kho",
          "source": "mới",
          "q": "Giá trị của $\\left(-\\frac{3}{4}+\\frac{2}{3}\\right) : \\frac{5}{11} + \\left(-\\frac{1}{4}+\\frac{1}{3}\\right) : \\frac{5}{11}$ là:",
          "options": [
            "$\\frac{11}{10}$",
            "$-\\frac{11}{10}$",
            "$0$",
            "$-\\frac{2}{5}$"
          ],
          "answer": 2,
          "explain": "Vì $a : c + b : c = (a + b) : c$ nên biểu thức bằng $\\left(-\\frac{3}{4}-\\frac{1}{4}+\\frac{2}{3}+\\frac{1}{3}\\right) : \\frac{5}{11} = (-1 + 1) : \\frac{5}{11} = 0$."
        },
        {
          "id": "d4q6",
          "level": "kho",
          "source": "SGK tr.23 – Ví dụ 2",
          "q": "Tính một cách hợp lí: $5{,}6 \\cdot 2\\frac{1}{4} + (-5{,}6)\\cdot(-1{,}5)^2$.",
          "options": [
            "$0$",
            "$25{,}2$",
            "$-25{,}2$",
            "$11{,}2$"
          ],
          "answer": 0,
          "explain": "$(-1{,}5)^2 = 2{,}25 = 2\\frac{1}{4}$, nên biểu thức $= 5{,}6\\cdot 2{,}25 - 5{,}6 \\cdot 2{,}25 = 0$."
        },
        {
          "id": "d4q7",
          "level": "kho",
          "source": "mới",
          "q": "Tìm $x$, biết $2 - \\left[x - \\left(\\frac{1}{2} - \\frac{1}{3}\\right)\\right] = 1$.",
          "options": [
            "$\\frac{5}{6}$",
            "$\\frac{11}{6}$",
            "$-\\frac{7}{6}$",
            "$\\frac{7}{6}$"
          ],
          "answer": 3,
          "explain": "$x - \\frac{1}{6} = 2 - 1 = 1 \\Rightarrow x = 1 + \\frac{1}{6} = \\frac{7}{6}$."
        },
        {
          "id": "d4q8",
          "level": "kho",
          "source": "mới",
          "q": "Một bể đang chứa $\\frac{1}{3}$ bể nước. Người ta bơm thêm $\\frac{2}{5}$ bể rồi dùng hết $\\frac{1}{4}$ bể. Cần bơm thêm bao nhiêu phần bể nữa thì bể đầy?",
          "options": [
            "$\\frac{1}{60}$",
            "$\\frac{31}{60}$",
            "$\\frac{29}{60}$",
            "$\\frac{4}{15}$"
          ],
          "answer": 1,
          "explain": "Gọi phần cần bơm thêm là $x$: $\\frac{1}{3}+\\frac{2}{5}-\\frac{1}{4}+x = 1$. Vế trái có $\\frac{29}{60}+x$, nên $x = 1-\\frac{29}{60} = \\frac{31}{60}$ (bể)."
        },
        {
          "id": "d4q9",
          "level": "kho",
          "source": "mới",
          "q": "Tìm $x$, biết $\\frac{1}{1\\cdot 2}+\\frac{1}{2\\cdot 3}+\\frac{1}{3\\cdot 4}+\\frac{1}{4\\cdot 5}+x = 1$.",
          "options": [
            "$\\frac{4}{5}$",
            "$\\frac{1}{4}$",
            "$\\frac{1}{5}$",
            "$-\\frac{1}{5}$"
          ],
          "answer": 2,
          "explain": "Vì $\\frac{1}{n(n+1)} = \\frac{1}{n}-\\frac{1}{n+1}$ nên tổng bằng $1-\\frac{1}{5} = \\frac{4}{5}$. Suy ra $x = 1-\\frac{4}{5} = \\frac{1}{5}$."
        }
      ],
      "essay": [
        {
          "id": "d4e1",
          "level": "kho",
          "source": "mới",
          "maxPoints": 1.5,
          "q": "Tìm $x$, biết: $\\frac{1}{2}x + \\frac{1}{3}x - \\frac{3}{4} = \\frac{1}{4}x + \\frac{2}{3}$.",
          "modelAnswer": "Chuyển các hạng tử chứa $x$ sang vế trái, các số sang vế phải (nhớ đổi dấu):<br>$\\frac{1}{2}x + \\frac{1}{3}x - \\frac{1}{4}x = \\frac{2}{3} + \\frac{3}{4}$<br>$\\left(\\frac{6}{12}+\\frac{4}{12}-\\frac{3}{12}\\right)x = \\frac{8}{12}+\\frac{9}{12}$<br>$\\frac{7}{12}x = \\frac{17}{12}$<br>$x = \\frac{17}{12} : \\frac{7}{12} = \\frac{17}{7}$.<br>Vậy $x = \\frac{17}{7}$.",
          "rubric": [
            {
              "pts": 0.5,
              "text": "Chuyển vế đúng: $\\frac{1}{2}x + \\frac{1}{3}x - \\frac{1}{4}x = \\frac{2}{3} + \\frac{3}{4}$."
            },
            {
              "pts": 0.5,
              "text": "Thu gọn đúng: $\\frac{7}{12}x = \\frac{17}{12}$."
            },
            {
              "pts": 0.5,
              "text": "Tính đúng $x = \\frac{17}{7}$."
            }
          ]
        },
        {
          "id": "d4e2",
          "level": "kho",
          "source": "SBT Bài 4 – BT 1.29",
          "maxPoints": 1.5,
          "q": "Tính $A = \\left[\\left(\\frac{1}{27} - \\frac{5}{54}\\right)\\cdot\\frac{27}{7} + \\frac{5}{14}\\right] : \\left[\\left(\\frac{4}{21} + \\frac{1}{42}\\right)\\cdot\\frac{42}{9} + 2022\\right]$.",
          "modelAnswer": "Ngoặc thứ nhất: $\\left(\\frac{2}{54} - \\frac{5}{54}\\right)\\cdot\\frac{27}{7} + \\frac{5}{14} = -\\frac{1}{18}\\cdot\\frac{27}{7} + \\frac{5}{14} = -\\frac{3}{14} + \\frac{5}{14} = \\frac{1}{7}$.<br>Ngoặc thứ hai: $\\left(\\frac{8}{42} + \\frac{1}{42}\\right)\\cdot\\frac{42}{9} + 2022 = \\frac{9}{42}\\cdot\\frac{42}{9} + 2022 = 1 + 2022 = 2023$.<br>Vậy $A = \\frac{1}{7} : 2023 = \\frac{1}{14161}$.",
          "rubric": [
            {
              "pts": 0.5,
              "text": "Tính đúng ngoặc thứ nhất bằng $\\frac{1}{7}$."
            },
            {
              "pts": 0.5,
              "text": "Tính đúng ngoặc thứ hai bằng $2023$."
            },
            {
              "pts": 0.5,
              "text": "Kết quả $A = \\frac{1}{14161}$ (chấp nhận viết $\\frac{1}{7\\cdot 2023}$)."
            }
          ]
        }
      ]
    }
  ]
});
