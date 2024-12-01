/* pelin tiedot */
/* vaihan varmasti kyssärit vielä */
const questions = [
    {
        question: "Tämä eläin rakastaa kiipeillä puissa, mikä se on?",
        answers: ["Apina", "Kirahvi", "Seepra"],
        correct: "Apina",
        background: "images/subtantiivisavanni/apina.png"
    },
    {
        question: "Tällä eläimellä on pitkä kärsä, mikä se on?",
        answers: ["Elefantti", "Leijona", "Krokotiili"],
        correct: "Elefantti",
        background: "images/subtantiivisavanni/elefantti.png"
    },
    {
        question: "Tämä eläin nauraa usein ja kovaa, mikä se on?",
        answers: ["Hyeena", "Apina", "Virtahepo"],
        correct: "Hyeena",
        background: "images/subtantiivisavanni/hyeena.png"
    },
    {
        question: "Tällä eläimellä on erittäin pitkä kaula, mikä se on?",
        answers: ["Kirahvi", "Seepra", "Sarvikuono"],
        correct: "Kirahvi",
        background: "images/subtantiivisavanni/kirahvi.png"
    },
    {
        question: "Tällä eläimellä on terävät hampaat ja se asuu vedessä, mikä se on?",
        answers: ["Krokotiili", "Elefantti", "Strutsi"],
        correct: "Krokotiili",
        background: "images/subtantiivisavanni/krokotiili.png"
    },
    {
        question: "Tämä eläin on savannin kuningas, mikä se on?",
        answers: ["Leijona", "Kirahvi", "Seepra"],
        correct: "Leijona",
        background: "images/subtantiivisavanni/leijona.png"
    },
    {
        question: "Tällä eläimellä on sarvi päässä, mikä se on?",
        answers: ["Sarvikuono", "Krokotiili", "Elefantti"],
        correct: "Sarvikuono",
        background: "images/subtantiivisavanni/sarvikuono.png"
    },
    {
        question: "Tällä eläimellä on mustavalkoiset raidat, mikä se on?",
        answers: ["Seepra", "Strutsi", "Apina"],
        correct: "Seepra",
        background: "images/subtantiivisavanni/seepra.png"
    },
    {
        question: "Tämä eläin ei lennä, mutta juoksee todella nopeasti, mikä se on?",
        answers: ["Strutsi", "Leijona", "Hyeena"],
        correct: "Strutsi",
        background: "images/subtantiivisavanni/strutsi.png"
    },
    {
        question: "Tämä eläin viettää paljon aikaa vedessä, mikä se on?",
        answers: ["Virtahepo", "Krokotiili", "Elefantti"],
        correct: "Virtahepo",
        background: "images/subtantiivisavanni/virtahepo.png"
    }
];

/* dom ellut */

const startButton = document.getElementById("aloita-btn");
const gameContainer = document.getElementById("game-container");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedbackContainer = document.getElementById("feedback");
const feedbackMessage = document.getElementById("feedback-message");
const closeFeedbackButton = document.getElementById("close-feedback");

/* randomisti kyssärit */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* peli tilanne */

let currentQuestionIndex = 0;

/* pelin aloitus */

startButton.addEventListener("click", () => {
    document.querySelector(".etusivu").classList.add("d-none");
    gameContainer.classList.remove("d-none");

    shuffleArray(questions);

    showQuestion();
});

/* näytä kyssäri */

function showQuestion() {
    const questionData = questions[currentQuestionIndex];

    document.body.style.backgroundImage = `url('${questionData.background}')`;
    document.body.style.backgroundSize = "contain"; 
    document.body.style.backgroundRepeat = "no-repeat"; 
    document.body.style.backgroundPosition = "center"; 
    document.body.style.backgroundColor = "#9ddca5";

    questionElement.textContent = questionData.question;

    answersContainer.innerHTML = "";

    questionData.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => handleAnswer(answer));
        answersContainer.appendChild(button);
    });

}

/* vastaukset */
function handleAnswer(selected) {
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (selected === correctAnswer) {
        showFeedbackMessage(`Oikein! Hyvin tehty! 🐾`);
    } else {
        showFeedbackMessage(`Väärin! Oikea vastaus on ${correctAnswer}. 🌱`);
    }

    currentQuestionIndex++;
}

/* näytä ponnarit */
function showFeedbackMessage(message) {
    feedbackMessage.textContent = message;
    feedbackContainer.classList.add("active");
}

/* piilota ponnarit ja jatka */
closeFeedbackButton.addEventListener("click", () => {
    feedbackContainer.classList.remove("active");

    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Näytä seuraava kysymys
    } else {
        alert("Peli ohi!");
        location.reload(); // Restart the game
    }
});