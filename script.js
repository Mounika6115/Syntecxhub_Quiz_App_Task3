// ==================================================
// QUIZ QUESTIONS
// ==================================================

const questions = [

    {
        question: "Which language is used to structure a web page?",
        answers: [
            { text: "HTML", correct: true },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "Which language is used to style a web page?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "Which language is used to add interactivity to a web page?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style System", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<p>", correct: false },
            { text: "<img>", correct: false },
            { text: "<a>", correct: true },
            { text: "<div>", correct: false }
        ]
    },

    {
        question: "Which symbol is used for an ID selector in CSS?",
        answers: [
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "*", correct: false },
            { text: "@", correct: false }
        ]
    },

    {
        question: "Which symbol is used for a class selector in CSS?",
        answers: [
            { text: "#", correct: false },
            { text: ".", correct: true },
            { text: "*", correct: false },
            { text: "&", correct: false }
        ]
    },

    {
        question: "Which method is commonly used to print a message in the browser console?",
        answers: [
            { text: "print()", correct: false },
            { text: "console.log()", correct: true },
            { text: "display()", correct: false },
            { text: "show()", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used to display an image?",
        answers: [
            { text: "<image>", correct: false },
            { text: "<picture>", correct: false },
            { text: "<img>", correct: true },
            { text: "<src>", correct: false }
        ]
    },

    {
        question: "Which keyword can be used to declare a variable in JavaScript?",
        answers: [
            { text: "variable", correct: false },
            { text: "var", correct: true },
            { text: "integer", correct: false },
            { text: "define", correct: false }
        ]
    }

];


// ==================================================
// PAGE ELEMENTS
// ==================================================

const loginPage =
    document.getElementById("login-page");

const dashboardPage =
    document.getElementById("dashboard-page");

const quizPage =
    document.getElementById("quiz-page");

const resultPage =
    document.getElementById("result-page");


// ==================================================
// LOGIN ELEMENTS
// ==================================================

const loginForm =
    document.getElementById("login-form");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginError =
    document.getElementById("login-error");

const togglePassword =
    document.getElementById("toggle-password");


// ==================================================
// DASHBOARD ELEMENTS
// ==================================================

const userName =
    document.getElementById("user-name");

const startButton =
    document.getElementById("start-btn");

const logoutButton =
    document.getElementById("logout-btn");

const bestScoreElement =
    document.getElementById("best-score");

const lastResultText =
    document.getElementById("last-result-text");

const questionCountElement =
    document.getElementById("question-count");

const quizTimeElement =
    document.getElementById("quiz-time");


// ==================================================
// THEME ELEMENTS
// ==================================================

const themeToggle =
    document.getElementById("theme-toggle");

const quizThemeToggle =
    document.getElementById("quiz-theme-toggle");


// ==================================================
// QUIZ ELEMENTS
// ==================================================

const questionElement =
    document.getElementById("question");

const answerButtons =
    document.getElementById("answer-buttons");

const nextButton =
    document.getElementById("next-btn");

const questionNumber =
    document.getElementById("question-number");

const questionScore =
    document.getElementById("question-score");

const progressBar =
    document.getElementById("progress-bar");

const timerElement =
    document.getElementById("timer");

const questionCard =
    document.getElementById("question-card");


// ==================================================
// RESULT ELEMENTS
// ==================================================

const finalScore =
    document.getElementById("final-score");

const correctAnswers =
    document.getElementById("correct-answers");

const wrongAnswers =
    document.getElementById("wrong-answers");

const percentage =
    document.getElementById("percentage");

const resultMessage =
    document.getElementById("result-message");

const restartButton =
    document.getElementById("restart-btn");

const homeButton =
    document.getElementById("home-btn");

const timeTakenElement =
    document.getElementById("time-taken");

const resultBestScore =
    document.getElementById("result-best-score");

const reviewButton =
    document.getElementById("review-btn");

const reviewContainer =
    document.getElementById("review-container");


// ==================================================
// VARIABLES
// ==================================================

let currentQuestionIndex = 0;

let score = 0;

let selectedAnswer = false;

let timer;

let timeLeft = 600;

let quizStartTime = 0;

let quizEndTime = 0;

let quizQuestions = [];

let userAnswers = [];


// ==================================================
// SHOW PAGE
// ==================================================

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(function(section) {

            section.classList.remove("active");

        });

    page.classList.add("active");

}


// ==================================================
// SHUFFLE ARRAY
// ==================================================

function shuffleArray(array) {

    const shuffled =
        [...array];

    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            shuffled[i],
            shuffled[randomIndex]
        ] = [
            shuffled[randomIndex],
            shuffled[i]
        ];

    }

    return shuffled;

}


// ==================================================
// PREPARE QUIZ
// ==================================================

function prepareQuiz() {

    quizQuestions =
        shuffleArray(questions)
            .map(function(question) {

                return {
                    question: question.question,

                    answers:
                        shuffleArray(question.answers)
                };

            });

}


// ==================================================
// LOGIN
// ==================================================

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();


        if (
            email === "" ||
            password === ""
        ) {

            loginError.textContent =
                "Please enter your email and password.";

            return;

        }


        if (!email.includes("@")) {

            loginError.textContent =
                "Please enter a valid email address.";

            return;

        }


        if (password.length < 4) {

            loginError.textContent =
                "Password must contain at least 4 characters.";

            return;

        }


        // GET USER NAME FROM EMAIL

        const namePart =
            email.split("@")[0];


        const formattedName =
            namePart.charAt(0).toUpperCase() +
            namePart.slice(1);


        // SAVE USER

        localStorage.setItem(
            "quizUser",
            formattedName
        );


        userName.textContent =
            formattedName;


        loginError.textContent = "";


        updateDashboard();


        showPage(dashboardPage);

    }
);


// ==================================================
// SHOW / HIDE PASSWORD
// ==================================================

togglePassword.addEventListener(
    "click",
    function() {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            togglePassword.textContent =
                "Hide";

        } else {

            passwordInput.type =
                "password";

            togglePassword.textContent =
                "Show";

        }

    }
);


// ==================================================
// START QUIZ
// ==================================================

startButton.addEventListener(
    "click",
    function() {

        startQuiz();

    }
);


// ==================================================
// START QUIZ FUNCTION
// ==================================================

function startQuiz() {

    currentQuestionIndex = 0;

    score = 0;

    selectedAnswer = false;

    timeLeft = 600;

    quizStartTime =
        Date.now();

    quizEndTime = 0;

    userAnswers = [];


    // RANDOMIZE QUESTIONS

    prepareQuiz();


    // RESET REVIEW

    reviewContainer.innerHTML = "";

    reviewContainer.classList.remove("show");


    reviewButton.textContent =
        "Review Answers";


    showPage(quizPage);


    updateTimerDisplay();

    startTimer();

    showQuestion();

}


// ==================================================
// SHOW QUESTION
// ==================================================

function showQuestion() {

    resetAnswers();

    selectedAnswer = false;


    const currentQuestion =
        quizQuestions[currentQuestionIndex];


    questionCard.classList.remove(
        "question-changing"
    );


    questionElement.textContent =
        currentQuestion.question;


    questionNumber.textContent =
        `Question ${
            currentQuestionIndex + 1
        } of ${
            quizQuestions.length
        }`;


    questionScore.textContent =
        `Score: ${score}`;


    const progress =
        (
            (currentQuestionIndex + 1) /
            quizQuestions.length
        ) * 100;


    progressBar.style.width =
        progress + "%";


    // CREATE ANSWER BUTTONS

    currentQuestion.answers.forEach(
        function(answer) {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                answer.text;


            button.classList.add(
                "answer-btn"
            );


            if (answer.correct) {

                button.dataset.correct =
                    "true";

            }


            button.addEventListener(
                "click",
                selectAnswer
            );


            answerButtons.appendChild(
                button
            );

        }
    );


    // CHANGE BUTTON TEXT

    if (
        currentQuestionIndex ===
        quizQuestions.length - 1
    ) {

        nextButton.textContent =
            "Submit";

    } else {

        nextButton.textContent =
            "Next";

    }

}


// ==================================================
// RESET ANSWERS
// ==================================================

function resetAnswers() {

    answerButtons.innerHTML = "";

}


// ==================================================
// SELECT ANSWER
// ==================================================

function selectAnswer(event) {

    if (selectedAnswer) {

        return;

    }


    selectedAnswer = true;


    const selectedButton =
        event.target;


    const selectedText =
        selectedButton.textContent;


    const isCorrect =
        selectedButton.dataset.correct ===
        "true";


    const currentQuestion =
        quizQuestions[
            currentQuestionIndex
        ];


    const correctAnswer =
        currentQuestion.answers.find(
            function(answer) {

                return answer.correct;

            }
        );


    // SAVE USER ANSWER

    userAnswers[
        currentQuestionIndex
    ] = {

        question:
            currentQuestion.question,

        selected:
            selectedText,

        correct:
            correctAnswer.text,

        isCorrect:
            isCorrect

    };


    // SCORE

    if (isCorrect) {

        selectedButton.classList.add(
            "correct"
        );

        score++;

    } else {

        selectedButton.classList.add(
            "wrong"
        );

    }


    // SHOW CORRECT ANSWER

    Array.from(
        answerButtons.children
    ).forEach(
        function(button) {

            if (
                button.dataset.correct ===
                "true"
            ) {

                button.classList.add(
                    "correct"
                );

            }

            button.disabled = true;

        }
    );


    questionScore.textContent =
        `Score: ${score}`;

}


// ==================================================
// NEXT / SUBMIT
// ==================================================

nextButton.addEventListener(
    "click",
    function() {

        if (!selectedAnswer) {

            alert(
                "Please select an answer first."
            );

            return;

        }


        if (
            currentQuestionIndex <
            quizQuestions.length - 1
        ) {

            // SMALL TRANSITION

            questionCard.classList.add(
                "question-changing"
            );


            setTimeout(
                function() {

                    currentQuestionIndex++;

                    showQuestion();

                },
                200
            );

        } else {

            finishQuiz();

        }

    }
);


// ==================================================
// TIMER
// ==================================================

function startTimer() {

    clearInterval(timer);


    timer =
        setInterval(
            function() {

                timeLeft--;

                updateTimerDisplay();


                if (timeLeft <= 0) {

                    clearInterval(timer);

                    finishQuiz();

                }

            },
            1000
        );

}


// ==================================================
// UPDATE TIMER DISPLAY
// ==================================================

function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timeLeft / 60
        );


    const seconds =
        timeLeft % 60;


    timerElement.textContent =
        `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;


    // TIMER COLORS

    const timerBox =
        document.querySelector(".timer");


    timerBox.classList.remove(
        "warning",
        "danger"
    );


    if (timeLeft <= 60) {

        timerBox.classList.add(
            "danger"
        );

    } else if (timeLeft <= 180) {

        timerBox.classList.add(
            "warning"
        );

    }

}


// ==================================================
// FINISH QUIZ
// ==================================================

function finishQuiz() {

    clearInterval(timer);


    quizEndTime =
        Date.now();


    const totalQuestions =
        quizQuestions.length;


    const wrong =
        totalQuestions - score;


    const percentageValue =
        Math.round(
            (score / totalQuestions) *
            100
        );


    // TIME TAKEN

    const elapsedSeconds =
        Math.floor(
            (
                quizEndTime -
                quizStartTime
            ) / 1000
        );


    const timeTaken =
        formatTime(
            elapsedSeconds
        );


    // BEST SCORE

    const oldBest =
        Number(
            localStorage.getItem(
                "quizBestScore"
            )
        ) || 0;


    const newBest =
        Math.max(
            oldBest,
            score
        );


    localStorage.setItem(
        "quizBestScore",
        newBest
    );


    // LAST RESULT

    localStorage.setItem(
        "quizLastScore",
        score
    );


    localStorage.setItem(
        "quizLastPercentage",
        percentageValue
    );


    // DISPLAY RESULT

    finalScore.textContent =
        score;


    correctAnswers.textContent =
        score;


    wrongAnswers.textContent =
        wrong;


    percentage.textContent =
        percentageValue + "%";


    timeTakenElement.textContent =
        timeTaken;


    resultBestScore.textContent =
        `${newBest}/${totalQuestions}`;


    // RESULT MESSAGE

    if (percentageValue === 100) {

        resultMessage.textContent =
            "Perfect score! Excellent work.";

    } else if (percentageValue >= 70) {

        resultMessage.textContent =
            "Great job! You have a strong understanding.";

    } else if (percentageValue >= 50) {

        resultMessage.textContent =
            "Good effort! Keep practicing to improve.";

    } else {

        resultMessage.textContent =
            "Keep learning and try the quiz again.";

    }


    // PREPARE REVIEW

    createReview();


    showPage(resultPage);

}


// ==================================================
// FORMAT TIME
// ==================================================

function formatTime(totalSeconds) {

    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const seconds =
        totalSeconds % 60;


    return `${minutes
        .toString()
        .padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

}


// ==================================================
// CREATE REVIEW
// ==================================================

function createReview() {

    reviewContainer.innerHTML = "";


    userAnswers.forEach(
        function(item, index) {

            if (!item) {

                return;

            }


            const reviewItem =
                document.createElement(
                    "div"
                );


            reviewItem.classList.add(
                "review-item"
            );


            const questionText =
                document.createElement(
                    "div"
                );


            questionText.classList.add(
                "review-question"
            );


            questionText.textContent =
                `${index + 1}. ${item.question}`;


            const userAnswer =
                document.createElement(
                    "div"
                );


            userAnswer.classList.add(
                "review-answer"
            );


            if (item.isCorrect) {

                userAnswer.classList.add(
                    "correct-answer"
                );

                userAnswer.textContent =
                    `Your answer: ${item.selected} ✓`;

            } else {

                userAnswer.classList.add(
                    "user-wrong"
                );

                userAnswer.textContent =
                    `Your answer: ${item.selected} ✗`;

            }


            const correctAnswer =
                document.createElement(
                    "div"
                );


            correctAnswer.classList.add(
                "review-answer",
                "correct-answer"
            );


            correctAnswer.textContent =
                `Correct answer: ${item.correct}`;


            reviewItem.appendChild(
                questionText
            );


            reviewItem.appendChild(
                userAnswer
            );


            if (!item.isCorrect) {

                reviewItem.appendChild(
                    correctAnswer
                );

            }


            reviewContainer.appendChild(
                reviewItem
            );

        }
    );

}


// ==================================================
// REVIEW BUTTON
// ==================================================

reviewButton.addEventListener(
    "click",
    function() {

        reviewContainer.classList.toggle(
            "show"
        );


        if (
            reviewContainer.classList.contains(
                "show"
            )
        ) {

            reviewButton.textContent =
                "Hide Answers";

        } else {

            reviewButton.textContent =
                "Review Answers";

        }

    }
);


// ==================================================
// RESTART
// ==================================================

restartButton.addEventListener(
    "click",
    function() {

        startQuiz();

    }
);


// ==================================================
// HOME
// ==================================================

homeButton.addEventListener(
    "click",
    function() {

        clearInterval(timer);

        updateDashboard();

        showPage(dashboardPage);

    }
);


// ==================================================
// UPDATE DASHBOARD
// ==================================================

function updateDashboard() {

    const bestScore =
        Number(
            localStorage.getItem(
                "quizBestScore"
            )
        ) || 0;


    const lastScore =
        localStorage.getItem(
            "quizLastScore"
        );


    const lastPercentage =
        localStorage.getItem(
            "quizLastPercentage"
        );


    bestScoreElement.textContent =
        `${bestScore}/${questions.length}`;


    questionCountElement.textContent =
        questions.length;


    quizTimeElement.textContent =
        "10";


    if (
        lastScore !== null &&
        lastPercentage !== null
    ) {

        lastResultText.textContent =
            `${lastScore}/${questions.length} `
            +
            `(${lastPercentage}%)`;

    } else {

        lastResultText.textContent =
            "No attempt yet";

    }

}


// ==================================================
// LOGOUT
// ==================================================

logoutButton.addEventListener(
    "click",
    function() {

        clearInterval(timer);


        localStorage.removeItem(
            "quizUser"
        );


        emailInput.value = "";

        passwordInput.value = "";


        showPage(loginPage);

    }
);


// ==================================================
// DARK MODE
// ==================================================

function updateThemeButtons() {

    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    const icon =
        isDark ? "☀️" : "🌙";


    themeToggle.textContent =
        icon;


    quizThemeToggle.textContent =
        icon;

}


// ==================================================
// TOGGLE THEME
// ==================================================

function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "quizTheme",
        isDark ? "dark" : "light"
    );


    updateThemeButtons();

}


// ==================================================
// THEME BUTTON EVENTS
// ==================================================

themeToggle.addEventListener(
    "click",
    toggleTheme
);


quizThemeToggle.addEventListener(
    "click",
    toggleTheme
);


// ==================================================
// LOAD SAVED THEME
// ==================================================

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "quizTheme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    updateThemeButtons();

}


// ==================================================
// CHECK EXISTING LOGIN
// ==================================================

const savedUser =
    localStorage.getItem(
        "quizUser"
    );


if (savedUser) {

    userName.textContent =
        savedUser;


    updateDashboard();


    showPage(
        dashboardPage
    );

} else {

    showPage(
        loginPage
    );

}


// ==================================================
// INITIALIZE
// ==================================================

loadTheme();

updateDashboard();