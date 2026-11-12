registerLesson({
  "id": "c1-lt2",
  "chapter": 1,
  "kind": "review",
  "title": "Luyện tập chung (Bài 3–4)",
  "sgkPages": [
    23,
    24
  ],
  "sbtPages": [
    13,
    19
  ],
  "objectives": [
    "Củng cố luỹ thừa với số mũ tự nhiên của số hữu tỉ và các quy tắc tính",
    "Vận dụng thứ tự thực hiện phép tính, quy tắc dấu ngoặc để tính, tính hợp lí",
    "Vận dụng quy tắc chuyển vế để tìm x; giải bài toán thực tế"
  ],
  "theory": [
    {
      "heading": "1. Luỹ thừa với số mũ tự nhiên (Bài 3)",
      "html": "$x^n = \\underbrace{x\\cdot x\\cdots x}_{n}$ (tích của $n$ thừa số $x$; $x \\in \\mathbb{Q}$, $n \\in \\mathbb{N}$, $n > 1$); quy ước $x^1 = x$, $x^0 = 1$ ($x \\ne 0$).<ul><li>$x^m \\cdot x^n = x^{m+n}$; &nbsp; $x^m : x^n = x^{m-n}$ ($x \\ne 0$, $m \\ge n$).</li><li>$(x^m)^n = x^{m\\cdot n}$.</li><li>$(x\\cdot y)^n = x^n \\cdot y^n$; &nbsp; $\\left(\\frac{x}{y}\\right)^n = \\frac{x^n}{y^n}$ ($y \\ne 0$).</li><li>Luỹ thừa bậc chẵn của số âm là số dương, bậc lẻ của số âm là số âm: $(-2)^4 = 16$, $(-2)^3 = -8$.</li><li>Số rất lớn thường viết gọn dạng $a \\cdot 10^n$ với $1 \\le a < 10$, ví dụ $9\\,460\\,000\\,000\\,000 = 9{,}46 \\cdot 10^{12}$.</li></ul>"
    },
    {
      "heading": "2. Thứ tự thực hiện phép tính (Bài 4)",
      "html": "Không có ngoặc: <b>Luỹ thừa → Nhân, chia → Cộng, trừ</b> (cùng cấp thì từ trái sang phải). Có ngoặc: $(\\;) \\to [\\;] \\to \\{\\;\\}$.<br>Bỏ ngoặc có dấu “−” đứng trước thì đổi dấu mọi số hạng trong ngoặc."
    },
    {
      "heading": "3. Quy tắc chuyển vế (Bài 4)",
      "html": "Chuyển một số hạng sang vế kia thì đổi dấu số hạng đó: $a + b = c \\Rightarrow a = c - b$; $a - b = c \\Rightarrow a = c + b$.<br>Dạng $a\\,x + b = c$: chuyển $b$ trước được $a\\,x = c - b$, rồi chia cho $a$."
    }
  ],
  "skills": [
    "Gặp luỹ thừa trong biểu thức: tính luỹ thừa <b>đầu tiên</b>, chú ý dấu: $(-0{,}5)^2 = 0{,}25$ nhưng $-0{,}5^2 = -0{,}25$.",
    "Đưa về <b>cùng cơ số</b> trước khi nhân, chia luỹ thừa: $4^5 = (2^2)^5 = 2^{10}$, $27^5 = 3^{15}$.",
    "Thấy hai tích có thừa số chung (kể cả sau khi tính luỹ thừa) thì đặt thừa số chung: $12{,}4\\cdot 6\\frac{1}{4} + (-12{,}4)\\cdot(-2{,}5)^2 = 12{,}4\\cdot 6{,}25 - 12{,}4\\cdot 6{,}25 = 0$.",
    "Tìm số mũ $n$: đưa hai vế về luỹ thừa cùng cơ số rồi so sánh số mũ ($a^m = a^n \\Rightarrow m = n$ với $a \\ne 0, a \\ne \\pm 1$).",
    "So sánh các số dạng $a \\cdot 10^n$: so sánh số mũ của $10$ trước; cùng số mũ thì so sánh $a$.",
    "<b>Lỗi hay gặp:</b> $x^m \\cdot x^n = x^{m\\cdot n}$ (sai, phải cộng số mũ); $(x^m)^n = x^{m+n}$ (sai, phải nhân số mũ); $\\left(a - b\\right)^2 = a^2 - b^2$ (sai, phải tính trong ngoặc trước); chuyển vế quên đổi dấu."
  ],
  "examples": [
    {
      "q": "Tính $A = 3 - \\left(\\frac{1}{2}\\right)^2 \\cdot 4 + (-2)^3 : 4$.",
      "solution": "Tính luỹ thừa trước: $\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}$, $(-2)^3 = -8$.$$A = 3 - \\frac{1}{4}\\cdot 4 + (-8) : 4 = 3 - 1 + (-2) = 0.$$"
    },
    {
      "q": "Tìm $x$, biết $2x - (0{,}3)^2 = (0{,}5)^2$.",
      "solution": "Ta có $2x - 0{,}09 = 0{,}25$. Chuyển vế: $2x = 0{,}25 + 0{,}09 = 0{,}34$. Suy ra $x = 0{,}34 : 2 = 0{,}17$."
    },
    {
      "q": "Tính một cách hợp lí: $B = 7{,}5 \\cdot (-1{,}2)^2 + (-7{,}5) \\cdot 1\\frac{11}{25}$.",
      "solution": "$(-1{,}2)^2 = 1{,}44$ và $1\\frac{11}{25} = \\frac{36}{25} = 1{,}44$. Do đó$$B = 7{,}5 \\cdot 1{,}44 - 7{,}5 \\cdot 1{,}44 = 7{,}5\\cdot(1{,}44 - 1{,}44) = 0.$$"
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
          "source": "SGK Bài 3 – Ví dụ 1",
          "q": "Giá trị của $(-2)^3$ là:",
          "options": [
            "$-8$",
            "$8$",
            "$-6$",
            "$6$"
          ],
          "answer": 0,
          "explain": "$(-2)^3 = (-2)\\cdot(-2)\\cdot(-2) = -8$ (bậc lẻ của số âm là số âm)."
        },
        {
          "id": "d1q2",
          "level": "de",
          "source": "SGK Bài 3 – Ví dụ 3",
          "q": "Kết quả của $\\left(\\frac{2}{3}\\right)^5 \\cdot \\left(\\frac{2}{3}\\right)^3$ là:",
          "options": [
            "$\\left(\\frac{2}{3}\\right)^{15}$",
            "$\\left(\\frac{2}{3}\\right)^2$",
            "$\\left(\\frac{2}{3}\\right)^8$",
            "$\\left(\\frac{4}{9}\\right)^8$"
          ],
          "answer": 2,
          "explain": "Nhân hai luỹ thừa cùng cơ số: giữ cơ số, cộng số mũ $5 + 3 = 8$."
        },
        {
          "id": "d1q3",
          "level": "de",
          "source": "SGK tr.23 – Ví dụ 1",
          "q": "Một năm ánh sáng khoảng $9\\,460\\,000\\,000\\,000$ km. Viết gọn số này là:",
          "options": [
            "$9{,}46\\cdot 10^{11}$ km",
            "$9{,}46\\cdot 10^{12}$ km",
            "$9{,}46\\cdot 10^{13}$ km",
            "$94{,}6\\cdot 10^{12}$ km"
          ],
          "answer": 1,
          "explain": "Sau chữ số $9$ có $12$ chữ số, nên $9\\,460\\,000\\,000\\,000 = 9{,}46\\cdot 10^{12}$."
        },
        {
          "id": "d1q4",
          "level": "de",
          "source": "SGK tr.22 – Luyện tập 2",
          "q": "Tìm $x$, biết $x + 2{,}5 = 6{,}25$.",
          "options": [
            "$8{,}75$",
            "$-3{,}75$",
            "$4{,}25$",
            "$3{,}75$"
          ],
          "answer": 3,
          "explain": "$x = 6{,}25 - 2{,}5 = 3{,}75$."
        },
        {
          "id": "d1q5",
          "level": "vua",
          "source": "SGK Luyện tập chung – BT 1.33",
          "q": "Giá trị của $2{,}25 + \\left(-\\frac{1}{2}\\right)^3 + 0{,}5^2 - 2\\cdot\\left(-\\frac{3}{8}\\right)$ là:",
          "options": [
            "$3{,}375$",
            "$3{,}125$",
            "$1{,}625$",
            "$3{,}875$"
          ],
          "answer": 1,
          "explain": "$2{,}25 - 0{,}125 + 0{,}25 + 0{,}75 = 3{,}125$. Chú ý $\\left(-\\frac{1}{2}\\right)^3 = -\\frac{1}{8}$ và $-2\\cdot\\left(-\\frac{3}{8}\\right) = +\\frac{3}{4}$."
        },
        {
          "id": "d1q6",
          "level": "vua",
          "source": "SGK Bài 3 – BT 1.19",
          "q": "Viết $\\left(\\frac{1}{9}\\right)^4$ dưới dạng luỹ thừa cơ số $\\frac{1}{3}$:",
          "options": [
            "$\\left(\\frac{1}{3}\\right)^8$",
            "$\\left(\\frac{1}{3}\\right)^6$",
            "$\\left(\\frac{1}{3}\\right)^{16}$",
            "$\\left(\\frac{1}{3}\\right)^4$"
          ],
          "answer": 0,
          "explain": "$\\frac{1}{9} = \\left(\\frac{1}{3}\\right)^2$ nên $\\left(\\frac{1}{9}\\right)^4 = \\left(\\frac{1}{3}\\right)^{2\\cdot 4} = \\left(\\frac{1}{3}\\right)^8$."
        },
        {
          "id": "d1q7",
          "level": "vua",
          "source": "SGK Bài 3 – Luyện tập 2",
          "q": "Giá trị của $(-125)^3 : 25^3$ là:",
          "options": [
            "$125$",
            "$-5$",
            "$-125$",
            "$-25$"
          ],
          "answer": 2,
          "explain": "$(-125)^3 : 25^3 = \\left(\\frac{-125}{25}\\right)^3 = (-5)^3 = -125$."
        },
        {
          "id": "d1q8",
          "level": "vua",
          "source": "SGK Luyện tập chung – BT 1.31",
          "q": "Tìm $x$, biết $2x - \\frac{3}{4} = \\frac{5}{4}$.",
          "options": [
            "$\\frac{1}{4}$",
            "$4$",
            "$2$",
            "$1$"
          ],
          "answer": 3,
          "explain": "$2x = \\frac{5}{4} + \\frac{3}{4} = 2 \\Rightarrow x = 1$."
        },
        {
          "id": "d1q9",
          "level": "vua",
          "source": "SGK Luyện tập chung – BT 1.33",
          "q": "Tính một cách hợp lí: $25{,}4 - (5{,}2 + 15{,}4) - (40 + 4{,}8)$.",
          "options": [
            "$-40$",
            "$40$",
            "$-30{,}4$",
            "$-9{,}2$"
          ],
          "answer": 0,
          "explain": "$= (25{,}4 - 15{,}4) - (5{,}2 + 4{,}8) - 40 = 10 - 10 - 40 = -40$."
        },
        {
          "id": "d1q10",
          "level": "kho",
          "source": "SBT Bài 3 – BT 1.25",
          "q": "Tìm số tự nhiên $n$, biết $5 \\cdot 2^n = 160$.",
          "options": [
            "$4$",
            "$5$",
            "$6$",
            "$32$"
          ],
          "answer": 1,
          "explain": "$2^n = 160 : 5 = 32 = 2^5$, nên $n = 5$."
        },
        {
          "id": "d1q11",
          "level": "kho",
          "source": "SGK Bài 3 – BT 1.24",
          "q": "Khoảng cách từ Trái Đất đến Mặt Trời khoảng $1{,}5\\cdot 10^8$ km, từ Sao Hoả đến Mặt Trời khoảng $2{,}28\\cdot 10^8$ km. Khoảng cách từ Sao Hoả đến Mặt Trời gấp bao nhiêu lần khoảng cách từ Trái Đất đến Mặt Trời?",
          "options": [
            "$0{,}78$ lần",
            "$15{,}2$ lần",
            "$1{,}52$ lần",
            "$3{,}42$ lần"
          ],
          "answer": 2,
          "explain": "$\\frac{2{,}28\\cdot 10^8}{1{,}5\\cdot 10^8} = \\frac{2{,}28}{1{,}5} = 1{,}52$ (lần)."
        }
      ],
      "essay": [
        {
          "id": "d1e1",
          "level": "vua",
          "source": "SBT Bài 3 – BT 1.20",
          "maxPoints": 1.5,
          "q": "Tính giá trị của các biểu thức:<br>a) $A = \\left(\\frac{1}{3}\\right)^2 \\cdot 6 + \\frac{1}{3}$; &nbsp; b) $B = 8^2 : 2^4 + 2^5 : 4^2$.",
          "modelAnswer": "a) $A = \\frac{1}{9}\\cdot 6 + \\frac{1}{3} = \\frac{2}{3} + \\frac{1}{3} = 1$.<br>b) $B = 64 : 16 + 32 : 16 = 4 + 2 = 6$ (hoặc $8^2 = 2^6$, $4^2 = 2^4$ nên $B = 2^2 + 2^1 = 6$).",
          "rubric": [
            {
              "pts": 0.25,
              "text": "a) Tính đúng $\\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9}$."
            },
            {
              "pts": 0.5,
              "text": "a) Nhân trước, cộng sau, được $A = 1$."
            },
            {
              "pts": 0.25,
              "text": "b) Tính đúng các luỹ thừa ($64$; $16$; $32$; $16$) hoặc đưa về cơ số $2$."
            },
            {
              "pts": 0.5,
              "text": "b) Kết quả $B = 6$."
            }
          ]
        },
        {
          "id": "d1e2",
          "level": "kho",
          "source": "SGK Luyện tập chung – BT 1.31",
          "maxPoints": 1.5,
          "q": "Tìm $x$, biết:<br>a) $2x + \\frac{1}{3} = \\frac{7}{6}$; &nbsp; b) $(0{,}4)^2 + 3x = 1$.",
          "modelAnswer": "a) $2x = \\frac{7}{6} - \\frac{1}{3} = \\frac{7}{6} - \\frac{2}{6} = \\frac{5}{6}$, nên $x = \\frac{5}{6} : 2 = \\frac{5}{12}$.<br>b) $(0{,}4)^2 = 0{,}16$. Ta có $0{,}16 + 3x = 1 \\Rightarrow 3x = 1 - 0{,}16 = 0{,}84 \\Rightarrow x = 0{,}84 : 3 = 0{,}28$.",
          "rubric": [
            {
              "pts": 0.5,
              "text": "a) Chuyển vế đúng: $2x = \\frac{5}{6}$."
            },
            {
              "pts": 0.25,
              "text": "a) Kết quả $x = \\frac{5}{12}$."
            },
            {
              "pts": 0.5,
              "text": "b) Tính $(0{,}4)^2 = 0{,}16$ và chuyển vế được $3x = 0{,}84$."
            },
            {
              "pts": 0.25,
              "text": "b) Kết quả $x = 0{,}28$."
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
          "source": "SGK Bài 3 – Luyện tập 1",
          "q": "Giá trị của $\\left(-\\frac{1}{2}\\right)^4$ là:",
          "options": [
            "$-\\frac{1}{16}$",
            "$\\frac{1}{16}$",
            "$-\\frac{1}{8}$",
            "$\\frac{1}{8}$"
          ],
          "answer": 1,
          "explain": "Bậc chẵn của số âm là số dương: $\\left(-\\frac{1}{2}\\right)^4 = \\frac{1}{16}$."
        },
        {
          "id": "d2q2",
          "level": "de",
          "source": "SGK Bài 3 – Luyện tập 3",
          "q": "Kết quả của $(0{,}3)^7 : (0{,}3)^4$ là:",
          "options": [
            "$(0{,}3)^{11}$",
            "$(0{,}3)^{28}$",
            "$(0{,}09)^3$",
            "$(0{,}3)^3$"
          ],
          "answer": 3,
          "explain": "Chia hai luỹ thừa cùng cơ số: trừ số mũ $7 - 4 = 3$."
        },
        {
          "id": "d2q3",
          "level": "de",
          "source": "SGK Bài 3 – Ví dụ 4",
          "q": "Kết quả của $\\left[(-2)^3\\right]^2$ là:",
          "options": [
            "$(-2)^6$",
            "$(-2)^5$",
            "$(-2)^9$",
            "$-2^6$"
          ],
          "answer": 0,
          "explain": "Luỹ thừa của luỹ thừa: nhân số mũ $3\\cdot 2 = 6$. Chú ý $(-2)^6 = 64$, còn $-2^6 = -64$."
        },
        {
          "id": "d2q4",
          "level": "de",
          "source": "SGK tr.22 – Luyện tập 2",
          "q": "Tìm $x$, biết $x - 0{,}8 = -1{,}2$.",
          "options": [
            "$0{,}4$",
            "$-2$",
            "$-0{,}4$",
            "$2$"
          ],
          "answer": 2,
          "explain": "$x = -1{,}2 + 0{,}8 = -0{,}4$."
        },
        {
          "id": "d2q5",
          "level": "vua",
          "source": "SBT Bài 3 – Ví dụ 2",
          "q": "Giá trị của $5 - \\left(-\\frac{2}{3}\\right)^0 + \\left(\\frac{1}{2}\\right)^2 : 2$ là:",
          "options": [
            "$\\frac{33}{8}$",
            "$\\frac{41}{8}$",
            "$\\frac{9}{2}$",
            "$\\frac{49}{8}$"
          ],
          "answer": 0,
          "explain": "$\\left(-\\frac{2}{3}\\right)^0 = 1$; $\\frac{1}{4} : 2 = \\frac{1}{8}$. Vậy $5 - 1 + \\frac{1}{8} = \\frac{33}{8}$."
        },
        {
          "id": "d2q6",
          "level": "vua",
          "source": "SGK Bài 3 – BT 1.22",
          "q": "Viết $25^3 : 27^2$ dưới dạng luỹ thừa của một số hữu tỉ:",
          "options": [
            "$\\left(\\frac{5}{3}\\right)^5$",
            "$\\left(\\frac{25}{27}\\right)^6$",
            "$\\left(\\frac{5}{3}\\right)^6$",
            "$\\left(\\frac{5}{3}\\right)^{12}$"
          ],
          "answer": 2,
          "explain": "$25^3 = 5^6$, $27^2 = 3^6$ nên $25^3 : 27^2 = \\frac{5^6}{3^6} = \\left(\\frac{5}{3}\\right)^6$."
        },
        {
          "id": "d2q7",
          "level": "vua",
          "source": "SGK tr.23 – Ví dụ 2",
          "q": "Tính một cách hợp lí: $\\frac{3}{7}\\cdot\\left(-\\frac{2}{5}\\right) + \\frac{3}{7}\\cdot\\left(-\\frac{3}{5}\\right)$.",
          "options": [
            "$\\frac{3}{7}$",
            "$-\\frac{3}{7}$",
            "$-\\frac{6}{35}$",
            "$-\\frac{3}{35}$"
          ],
          "answer": 1,
          "explain": "$\\frac{3}{7}\\cdot\\left(-\\frac{2}{5} - \\frac{3}{5}\\right) = \\frac{3}{7}\\cdot(-1) = -\\frac{3}{7}$."
        },
        {
          "id": "d2q8",
          "level": "vua",
          "source": "SGK Bài 4 – BT 1.27",
          "q": "Tìm $x$, biết $x - \\left(\\frac{3}{4} - \\frac{1}{2}\\right) = \\frac{1}{8}$.",
          "options": [
            "$-\\frac{1}{8}$",
            "$\\frac{11}{8}$",
            "$\\frac{5}{8}$",
            "$\\frac{3}{8}$"
          ],
          "answer": 3,
          "explain": "$x - \\frac{1}{4} = \\frac{1}{8} \\Rightarrow x = \\frac{1}{8} + \\frac{2}{8} = \\frac{3}{8}$."
        },
        {
          "id": "d2q9",
          "level": "vua",
          "source": "SGK Luyện tập chung – BT 1.32",
          "q": "Diện tích mặt nước (m²) của bốn hồ cho dưới đây. Hồ nào có diện tích <b>lớn nhất</b>?",
          "options": [
            "Caspian: $3{,}71\\cdot 10^{11}$",
            "Baikal: $3{,}17\\cdot 10^{10}$",
            "Superior: $8{,}21\\cdot 10^{10}$",
            "Nicaragua: $8{,}264\\cdot 10^{9}$"
          ],
          "answer": 0,
          "explain": "Số mũ của $10$ lớn nhất là $11$ nên $3{,}71\\cdot 10^{11} = 37{,}1\\cdot 10^{10}$ lớn hơn $8{,}21\\cdot 10^{10}$ và các số còn lại."
        },
        {
          "id": "d2q10",
          "level": "kho",
          "source": "SBT Bài 4 – BT 1.30",
          "q": "Tìm $x$, biết $(0{,}6)^2 - 2x = (0{,}4)^2$.",
          "options": [
            "$0{,}2$",
            "$-0{,}1$",
            "$0{,}1$",
            "$0{,}26$"
          ],
          "answer": 2,
          "explain": "$0{,}36 - 2x = 0{,}16 \\Rightarrow 2x = 0{,}36 - 0{,}16 = 0{,}2 \\Rightarrow x = 0{,}1$."
        },
        {
          "id": "d2q11",
          "level": "kho",
          "source": "mới",
          "q": "Một tờ giấy dày $0{,}1$ mm. Mỗi lần gấp đôi thì độ dày tăng gấp $2$. Sau $5$ lần gấp đôi, xấp giấy dày bao nhiêu?",
          "options": [
            "$1$ mm",
            "$3{,}2$ mm",
            "$1{,}6$ mm",
            "$0{,}5$ mm"
          ],
          "answer": 1,
          "explain": "Độ dày $= 0{,}1\\cdot 2^5 = 0{,}1 \\cdot 32 = 3{,}2$ (mm)."
        }
      ],
      "essay": [
        {
          "id": "d2e1",
          "level": "vua",
          "source": "SGK Bài 4 – BT 1.29",
          "maxPoints": 1.5,
          "q": "Bỏ dấu ngoặc rồi tính: $\\frac{23}{6} + \\left(\\frac{5}{3} - \\frac{7}{4}\\right) - \\left(\\frac{1}{4} + \\frac{5}{6}\\right)$.",
          "modelAnswer": "$\\frac{23}{6} + \\frac{5}{3} - \\frac{7}{4} - \\frac{1}{4} - \\frac{5}{6}$<br>$= \\left(\\frac{23}{6} - \\frac{5}{6}\\right) - \\left(\\frac{7}{4} + \\frac{1}{4}\\right) + \\frac{5}{3} = 3 - 2 + \\frac{5}{3} = \\frac{8}{3}$.",
          "rubric": [
            {
              "pts": 0.5,
              "text": "Bỏ ngoặc đúng dấu: $\\frac{23}{6} + \\frac{5}{3} - \\frac{7}{4} - \\frac{1}{4} - \\frac{5}{6}$."
            },
            {
              "pts": 0.5,
              "text": "Nhóm hợp lí: $\\frac{23}{6} - \\frac{5}{6} = 3$; $\\frac{7}{4} + \\frac{1}{4} = 2$."
            },
            {
              "pts": 0.5,
              "text": "Kết quả $\\frac{8}{3}$."
            }
          ]
        },
        {
          "id": "d2e2",
          "level": "kho",
          "source": "SGK Bài 3 – Vận dụng",
          "maxPoints": 1.5,
          "q": "Bác An có một thùng chứa nước hình lập phương, cạnh $0{,}8$ m.<br>a) Viết công thức thể tích thùng dưới dạng luỹ thừa rồi tính thể tích.<br>b) Thùng đang có $0{,}2$ m³ nước. Gọi $x$ (m³) là lượng nước cần đổ thêm để thùng đầy. Viết đẳng thức và tìm $x$.",
          "modelAnswer": "a) $V = 0{,}8^3 = 0{,}8\\cdot 0{,}8\\cdot 0{,}8 = 0{,}512$ (m³).<br>b) Ta có $x + 0{,}2 = 0{,}512$. Chuyển vế: $x = 0{,}512 - 0{,}2 = 0{,}312$.<br>Vậy cần đổ thêm $0{,}312$ m³ nước.",
          "rubric": [
            {
              "pts": 0.25,
              "text": "Viết $V = 0{,}8^3$."
            },
            {
              "pts": 0.5,
              "text": "Tính đúng $V = 0{,}512$ m³."
            },
            {
              "pts": 0.25,
              "text": "Viết đúng đẳng thức $x + 0{,}2 = 0{,}512$."
            },
            {
              "pts": 0.5,
              "text": "Tìm đúng $x = 0{,}312$ m³ và kết luận."
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
          "source": "SGK Bài 3 – Quy ước",
          "q": "Giá trị của $\\left(-\\frac{5}{7}\\right)^0$ là:",
          "options": [
            "$0$",
            "$-\\frac{5}{7}$",
            "$-1$",
            "$1$"
          ],
          "answer": 3,
          "explain": "Quy ước $x^0 = 1$ với mọi $x \\ne 0$."
        },
        {
          "id": "d3q2",
          "level": "de",
          "source": "SGK Bài 3 – Luyện tập 2",
          "q": "Giá trị của $(0{,}5)^3 \\cdot 2^3$ là:",
          "options": [
            "$1$",
            "$8$",
            "$0{,}125$",
            "$6$"
          ],
          "answer": 0,
          "explain": "Luỹ thừa của một tích: $(0{,}5)^3\\cdot 2^3 = (0{,}5\\cdot 2)^3 = 1^3 = 1$."
        },
        {
          "id": "d3q3",
          "level": "de",
          "source": "SGK tr.20 – Ví dụ 1",
          "q": "Giá trị của $20 - 4\\cdot 3^2 + 6$ là:",
          "options": [
            "$150$",
            "$2$",
            "$-10$",
            "$-22$"
          ],
          "answer": 2,
          "explain": "$3^2 = 9$; $4\\cdot 9 = 36$; $20 - 36 + 6 = -10$."
        },
        {
          "id": "d3q4",
          "level": "de",
          "source": "SGK Bài 4 – BT 1.26",
          "q": "Tìm $x$, biết $x - \\frac{1}{4} = \\frac{3}{4}$.",
          "options": [
            "$\\frac{1}{2}$",
            "$1$",
            "$-\\frac{1}{2}$",
            "$-1$"
          ],
          "answer": 1,
          "explain": "$x = \\frac{3}{4} + \\frac{1}{4} = 1$."
        },
        {
          "id": "d3q5",
          "level": "de",
          "source": "SGK tr.23 – Ví dụ 1",
          "q": "Khoảng cách gần nhất từ Mộc tinh đến Trái Đất khoảng $588\\,000\\,000$ km. Viết gọn số đó là:",
          "options": [
            "$5{,}88\\cdot 10^{7}$ km",
            "$5{,}88\\cdot 10^{9}$ km",
            "$588\\cdot 10^{5}$ km",
            "$5{,}88\\cdot 10^{8}$ km"
          ],
          "answer": 3,
          "explain": "$588\\,000\\,000 = 5{,}88\\cdot 100\\,000\\,000 = 5{,}88\\cdot 10^8$."
        },
        {
          "id": "d3q6",
          "level": "vua",
          "source": "SGK Bài 3 – Luyện tập 2",
          "q": "Kết quả của $\\left(\\frac{2}{3}\\right)^{10}\\cdot 3^{10}$ là:",
          "options": [
            "$6^{10}$",
            "$2^{20}$",
            "$2^{10}$",
            "$\\left(\\frac{2}{9}\\right)^{10}$"
          ],
          "answer": 2,
          "explain": "$\\left(\\frac{2}{3}\\right)^{10}\\cdot 3^{10} = \\left(\\frac{2}{3}\\cdot 3\\right)^{10} = 2^{10}$."
        },
        {
          "id": "d3q7",
          "level": "vua",
          "source": "SGK Bài 4 – BT 1.27",
          "q": "Tìm $x$, biết $5 - x = \\frac{3}{4} - \\left(-\\frac{5}{4}\\right)$.",
          "options": [
            "$3$",
            "$7$",
            "$-3$",
            "$\\frac{11}{2}$"
          ],
          "answer": 0,
          "explain": "Vế phải $= \\frac{3}{4} + \\frac{5}{4} = 2$. Ta có $5 - x = 2 \\Rightarrow x = 5 - 2 = 3$."
        },
        {
          "id": "d3q8",
          "level": "vua",
          "source": "SBT Bài 4 – Ví dụ 1",
          "q": "Giá trị của $\\left(\\frac{5}{6} - \\frac{1}{3}\\right)\\cdot\\frac{4}{5} + \\frac{3}{5}$ là:",
          "options": [
            "$\\frac{7}{6}$",
            "$\\frac{7}{10}$",
            "$-\\frac{1}{5}$",
            "$1$"
          ],
          "answer": 3,
          "explain": "$\\frac{1}{2}\\cdot\\frac{4}{5} + \\frac{3}{5} = \\frac{2}{5} + \\frac{3}{5} = 1$."
        },
        {
          "id": "d3q9",
          "level": "vua",
          "source": "SBT Bài 3 – BT 1.22",
          "q": "Tìm số tự nhiên $n$, biết $\\left(-\\frac{3}{4}\\right)^n : \\left(-\\frac{3}{4}\\right)^7 = \\left(-\\frac{3}{4}\\right)^2$.",
          "options": [
            "$5$",
            "$9$",
            "$14$",
            "$2$"
          ],
          "answer": 1,
          "explain": "$\\left(-\\frac{3}{4}\\right)^{n-7} = \\left(-\\frac{3}{4}\\right)^2$ nên $n - 7 = 2$, $n = 9$."
        },
        {
          "id": "d3q10",
          "level": "kho",
          "source": "SGK Luyện tập chung – BT 1.31",
          "q": "Tìm $x$, biết $\\frac{5}{6} - 4x = \\frac{1}{3}$.",
          "options": [
            "$-\\frac{1}{8}$",
            "$\\frac{7}{24}$",
            "$\\frac{1}{8}$",
            "$2$"
          ],
          "answer": 2,
          "explain": "$4x = \\frac{5}{6} - \\frac{1}{3} = \\frac{1}{2} \\Rightarrow x = \\frac{1}{2} : 4 = \\frac{1}{8}$."
        },
        {
          "id": "d3q11",
          "level": "kho",
          "source": "SBT Bài 3 – BT 1.26",
          "q": "Giá trị của $A = \\dfrac{4^5 + 2^8}{2^6 + 4^2}$ là:",
          "options": [
            "$8$",
            "$4$",
            "$32$",
            "$16$"
          ],
          "answer": 3,
          "explain": "$4^5 = 2^{10}$, $4^2 = 2^4$. $A = \\frac{2^8(2^2+1)}{2^4(2^2+1)} = 2^4 = 16$."
        }
      ],
      "essay": [
        {
          "id": "d3e1",
          "level": "vua",
          "source": "SGK Bài 3 – BT 1.23",
          "maxPoints": 1.5,
          "q": "Tính:<br>a) $2 : \\left(\\frac{1}{3} - \\frac{1}{4}\\right)^2$; &nbsp; b) $\\left(1 + \\frac{1}{3} - \\frac{1}{2}\\right)^2\\cdot\\left(3 - \\frac{3}{5}\\right)$.",
          "modelAnswer": "a) $\\frac{1}{3} - \\frac{1}{4} = \\frac{1}{12}$; $\\left(\\frac{1}{12}\\right)^2 = \\frac{1}{144}$; $2 : \\frac{1}{144} = 2\\cdot 144 = 288$.<br>b) $1 + \\frac{1}{3} - \\frac{1}{2} = \\frac{6+2-3}{6} = \\frac{5}{6}$; $3 - \\frac{3}{5} = \\frac{12}{5}$.<br>$\\left(\\frac{5}{6}\\right)^2\\cdot\\frac{12}{5} = \\frac{25}{36}\\cdot\\frac{12}{5} = \\frac{5}{3}$.",
          "rubric": [
            {
              "pts": 0.25,
              "text": "a) Tính đúng ngoặc $\\frac{1}{12}$ và luỹ thừa $\\frac{1}{144}$."
            },
            {
              "pts": 0.5,
              "text": "a) Kết quả $288$."
            },
            {
              "pts": 0.25,
              "text": "b) Tính đúng hai ngoặc: $\\frac{5}{6}$ và $\\frac{12}{5}$."
            },
            {
              "pts": 0.5,
              "text": "b) Kết quả $\\frac{5}{3}$."
            }
          ]
        },
        {
          "id": "d3e2",
          "level": "kho",
          "source": "SBT Bài 4 – Ví dụ 2",
          "maxPoints": 1.5,
          "q": "Một cửa hàng niêm yết giá: bánh mì $15{,}5$ nghìn đồng/chiếc; sữa $8{,}25$ nghìn đồng/hộp; xôi $12{,}75$ nghìn đồng/gói. Minh mua $2$ chiếc bánh mì, $4$ hộp sữa và $3$ gói xôi, đưa người bán $200$ nghìn đồng. Hỏi người bán phải trả lại Minh bao nhiêu tiền?",
          "modelAnswer": "Số tiền Minh phải trả: $15{,}5\\cdot 2 + 8{,}25\\cdot 4 + 12{,}75\\cdot 3 = 31 + 33 + 38{,}25 = 102{,}25$ (nghìn đồng).<br>Gọi số tiền trả lại là $x$ (nghìn đồng): $x + 102{,}25 = 200$, suy ra $x = 200 - 102{,}25 = 97{,}75$.<br>Vậy người bán trả lại Minh $97{,}75$ nghìn đồng ($97\\,750$ đồng).",
          "rubric": [
            {
              "pts": 0.75,
              "text": "Tính đúng tổng tiền phải trả $102{,}25$ nghìn đồng (nhân trước, cộng sau)."
            },
            {
              "pts": 0.25,
              "text": "Lập đúng đẳng thức $x + 102{,}25 = 200$ (hoặc phép trừ tương ứng)."
            },
            {
              "pts": 0.5,
              "text": "Kết quả $97{,}75$ nghìn đồng, có đơn vị."
            }
          ]
        }
      ]
    }
  ]
});
