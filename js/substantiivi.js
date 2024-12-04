/*kyssärit*/
const questions = [
    {
        question: "Tämä eläin rakastaa kiipeillä puissa, mikä se on?",
        answers: ["Apina", "Kirahvi", "Seepra"],
        correct: "Apina",
        background: "images/apina.png"
    },
    {
        question: "Tällä eläimellä on pitkä kärsä, mikä se on?",
        answers: ["Elefantti", "Leijona", "Krokotiili"],
        correct: "Elefantti",
        background: "images/elefantti.png"
    },
    {
        question: "Tämä eläin nauraa usein ja kovaa, mikä se on?",
        answers: ["Hyeena", "Apina", "Virtahepo"],
        correct: "Hyeena",
        background: "images/hyeena.png"
    },
    {
        question: "Tällä eläimellä on erittäin pitkä kaula, mikä se on?",
        answers: ["Kirahvi", "Seepra", "Sarvikuono"],
        correct: "Kirahvi",
        background: "images/kirahvi.png"
    },
    {
        question: "Tällä eläimellä on terävät hampaat ja se asuu vedessä, mikä se on?",
        answers: ["Krokotiili", "Elefantti", "Strutsi"],
        correct: "Krokotiili",
        background: "images/krokotiili.png"
    },
    {
        question: "Tämä eläin on savannin kuningas, mikä se on?",
        answers: ["Leijona", "Kirahvi", "Seepra"],
        correct: "Leijona",
        background: "images/leijona.png"
    },
    {
        question: "Tällä eläimellä on sarvi päässä, mikä se on?",
        answers: ["Sarvikuono", "Krokotiili", "Elefantti"],
        correct: "Sarvikuono",
        background: "images/sarvikuono.png"
    },
    {
        question: "Tällä eläimellä on mustavalkoiset raidat, mikä se on?",
        answers: ["Seepra", "Strutsi", "Apina"],
        correct: "Seepra",
        background: "images/seepra.png"
    },
    {
        question: "Tämä eläin ei lennä, mutta juoksee todella nopeasti, mikä se on?",
        answers: ["Strutsi", "Leijona", "Hyeena"],
        correct: "Strutsi",
        background: "images/strutsi.png"
    },
    {
        question: "Tämä eläin viettää paljon aikaa vedessä, mikä se on?",
        answers: ["Virtahepo", "Krokotiili", "Elefantti"],
        correct: "Virtahepo",
        background: "images/virtahepo.png"
    }
];

/*dom elementit*/
const startButton = document.getElementById("aloita-btn");
const gameContainer = document.getElementById("game-container");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedbackContainer = document.getElementById("feedback");
const feedbackMessage = document.getElementById("feedback-message");
const closeFeedbackButton = document.getElementById("close-feedback");
const endScreen = document.getElementById("end-screen");
const endMessage = document.getElementById("end-message");
const restartButton = document.getElementById("restart-btn");
const homeButton = document.getElementById("home-btn");

/*Pisteet ja nykyinen kysymys*/
let score = 0;
let currentQuestionIndex = 0;

/*sekoitus*/
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/*aloitus*/
startButton.addEventListener("click", () => {
    resetGameStyles();
    shuffleArray(questions);
    showQuestion();
    document.querySelector(".etusivu").classList.add("d-none");
    gameContainer.classList.remove("d-none");
});

/*kysymykset*/
function showQuestion() {
    const questionData = questions[currentQuestionIndex];

    document.body.style.backgroundImage = `url('${questionData.background}')`;
    document.body.style.backgroundSize = "contain";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundColor = "var(--vihrea)"; // Asetetaan varmistus vihreälle taustalle

    questionElement.textContent = questionData.question;
    answersContainer.innerHTML = "";

    const shuffledAnswers = shuffleArray([...questionData.answers]);
    shuffledAnswers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-button");
        button.addEventListener("click", () => handleAnswer(answer));
        answersContainer.appendChild(button);
    });
}

/*vastaukset*/
function handleAnswer(selected) {
    const buttons = document.querySelectorAll(".answer-button");
    buttons.forEach((button) => (button.disabled = true));

    const correctAnswer = questions[currentQuestionIndex].correct;

    if (selected === correctAnswer) {
        score++;
        showFeedbackMessage(`Oikein! Hyvin tehty! 🐾`);
    } else {
        showFeedbackMessage(`Väärin! Oikea vastaus on ${correctAnswer}. 🌱`);
    }

    currentQuestionIndex++;
}

/*ponnarit*/
function showFeedbackMessage(message) {
    feedbackMessage.textContent = message;
    feedbackContainer.classList.remove("d-none");
    feedbackContainer.classList.add("active");
}

closeFeedbackButton.addEventListener("click", () => {
    feedbackContainer.classList.remove("active");
    feedbackContainer.classList.add("d-none");

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showEndScreen();
    }
});

/*lopari*/
function showEndScreen() {
    gameContainer.classList.add("d-none");
    endScreen.classList.remove("d-none");
    document.body.style.background = "linear-gradient(to bottom right, #9ddca5, #e8dba4)";
    endMessage.textContent = `Peli ohi! Sait ${score}/${questions.length} pistettä! 🎉`;
}

/*uusi peli*/
restartButton.addEventListener("click", () => {
    resetGame();
    shuffleArray(questions);
    showQuestion();
});

/*etusivulle*/
homeButton.addEventListener("click", () => {
    resetGame();
    document.querySelector(".etusivu").classList.remove("d-none");
    endScreen.classList.add("d-none");
});


function resetGame() {
    score = 0;
    currentQuestionIndex = 0;
    gameContainer.classList.remove("d-none");
    endScreen.classList.add("d-none");
    resetGameStyles();
}

function resetGameStyles() {
    document.body.style.background = "";
    const gameContent = document.querySelector(".game-content");
    gameContent.style.bottom = "5%"; // Varmistaa alareunan sijoituksen
    gameContent.style.transform = "translateX(-50%)";
    feedbackContainer.classList.add("d-none");
    feedbackContainer.classList.remove("active");
}
