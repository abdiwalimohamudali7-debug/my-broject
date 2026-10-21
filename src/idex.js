        const questions = [
            {
                question: "Muxuu u taagan yahay HTML?",
                options: [
                    "Hyper Text Markup Language",
                    "High Text Machine Language",
                    "Hyperlink Text Management",
                    "Home Tool Markup Language"
                ],
                answer: 0
            },
            {
                question: "Property-ga CSS ee loo adeegsado fogaanta gudaha (inner spacing) waa ku xee?",
                options: ["margin", "padding", "border", "gap"],
                answer: 1
            },
            {
                question: "Waa maxay magaalada madaxda dalka Soomaaliya?",
                options: ["Hargeysa", "Kismaayo", "Garowe", "Muqdisho"],
                answer: 3
            },
            {
                question: "Astaanta (Symbol) loo adeegsado ID-ga gudaha CSS waa maxay?",
                options: [". (Dot)", "# (Hashtag)", "* (Asterisk)", "@ (At)"],
                answer: 1
            },
            {
                question: "Shanta tiir ee Islaamka, tiirka 2-aad waa maxay?",
                options: ["Sadaqada", "Soomka", "Salaada", "Xajjka"],
                answer: 2
            },
            {
                question: "JavaScript dhexdeeda, keyword-kee loo adeegsadaa variable aan la bedeli karin?",
                options: ["let", "var", "const", "static"],
                answer: 2
            },
            {
                question: "Tag-ka HTML ee loo adeegsado abuurista link-yada (links) waa ku xee?",
                options: ["<a>", "<link>", "<src>", "<href>"],
                answer: 0
            },
            {
                question: "Badda ugu weyn dunida waa maxay?",
                options: ["Badda Atlantik-ka", "Badda Hindiya", "Badda Baasifik-ka", "Badda Woqooyi"],
                answer: 2
            },
            {
                question: "Waa kuwee nooca loo adeegsado styling-ka bogga web-ka?",
                options: ["HTML", "CSS", "JavaScript", "PHP"],
                answer: 1
            },
            {
                question: "Event-ka JavaScript ee la kiciyo marka button la rixo waa maxay?",
                options: ["onhover", "onchange", "onload", "onclick"],
                answer: 3
            }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let timerCount = 15;
        let timerInterval;

        const startBox = document.getElementById("start-box");
        const quizBox = document.getElementById("quiz-box");
        const resultBox = document.getElementById("result-box");

        const questionText = document.getElementById("question-text");
        const optionsGrid = document.getElementById("options-grid");
        const questionCount = document.getElementById("question-count");
        const timerSec = document.getElementById("timer-sec");
        const progressBar = document.getElementById("progress-bar");
        const nextBtn = document.getElementById("next-btn");

        const correctScoreEl = document.getElementById("correct-score");
        const wrongScoreEl = document.getElementById("wrong-score");
        const totalPercentEl = document.getElementById("total-percent");
        const resultMessageEl = document.getElementById("result-message");

        function startQuiz() {
            startBox.classList.remove("active");
            quizBox.classList.add("active");
            
            currentQuestionIndex = 0;
            score = 0;
            showQuestion();
        }

        function showQuestion() {
            resetState();
            startTimer();

            let currentQ = questions[currentQuestionIndex];
            questionText.innerText = `${currentQuestionIndex + 1}. ${currentQ.question}`;
            questionCount.innerText = `Su'aasha ${currentQuestionIndex + 1} / ${questions.length}`;

            let progressWidth = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressBar.style.width = `${progressWidth}%`;

            currentQ.options.forEach((option, index) => {
                const button = document.createElement("button");
                button.classList.add("option-btn");
                button.innerHTML = `<span>${option}</span> <i class="fa-regular fa-circle"></i>`;
                button.addEventListener("click", () => selectOption(button, index, currentQ.answer));
                optionsGrid.appendChild(button);
            });
        }

        function resetState() {
            clearInterval(timerInterval);
            timerCount = 15;
            timerSec.innerText = timerCount;
            nextBtn.disabled = true;
            optionsGrid.innerHTML = "";
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                timerCount--;
                timerSec.innerText = timerCount;

                if (timerCount <= 0) {
                    clearInterval(timerInterval);
                    autoSelectAnswer();
                }
            }, 1000);
        }

        function selectOption(selectedBtn, selectedIndex, correctIndex) {
            clearInterval(timerInterval);

            const allButtons = optionsGrid.children;

            if (selectedIndex === correctIndex) {
                selectedBtn.classList.add("correct");
                selectedBtn.querySelector("i").className = "fa-solid fa-circle-check";
                score++;
            } else {
                selectedBtn.classList.add("incorrect");
                selectedBtn.querySelector("i").className = "fa-solid fa-circle-xmark";

                allButtons[correctIndex].classList.add("correct");
                allButtons[correctIndex].querySelector("i").className = "fa-solid fa-circle-check";
            }

            for (let btn of allButtons) {
                btn.disabled = true;
            }

            nextBtn.disabled = false;
        }

        function autoSelectAnswer() {
            const correctIndex = questions[currentQuestionIndex].answer;
            const allButtons = optionsGrid.children;

            allButtons[correctIndex].classList.add("correct");
            allButtons[correctIndex].querySelector("i").className = "fa-solid fa-circle-check";

            for (let btn of allButtons) {
                btn.disabled = true;
            }

            nextBtn.disabled = false;
        }

        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            quizBox.classList.remove("active");
            resultBox.classList.add("active");

            const wrongScore = questions.length - score;
            const percentage = Math.round((score / questions.length) * 100);

            correctScoreEl.innerText = score;
            wrongScoreEl.innerText = wrongScore;
            totalPercentEl.innerText = `${percentage}%`;

            if (percentage >= 80) {
                resultMessageEl.innerText = "Hambalyo! Waxaad muujisay aqoon heer sare ah! 👏";
            } else if (percentage >= 50) {
                resultMessageEl.innerText = "Aad baad u wanaagsan tahay, laakiin dib u eegis sii sameey! 👍";
            } else {
                resultMessageEl.innerText = "Iska jir, waxaad u baahan tahay in aad wax badan sii baratid! 📚";
            }
        }

        function restartQuiz() {
            resultBox.classList.remove("active");
            startQuiz();
        }