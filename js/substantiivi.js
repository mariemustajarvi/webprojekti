/* pelin tiedot */

const questions = [
    {
        question: "Tämä eläin rakastaa kiipeillä puissa, mikä se on?",
        answers: ["Apina", "Kirahvi", "Seepra"],
        correct: "Apina",
        background: "images/substantiivisavanni/apina.png"
    },
    {
        question: "Tällä eläimellä on pitkä kärsä, mikä se on?",
        answers: ["Elefantti", "Leijona", "Krokotiili"],
        correct: "Elefantti",
        background: "images/substantiivisavanni/elefantti.png"
    },
    {
        question: "Tämä eläin nauraa usein ja kovaa, mikä se on?",
        answers: ["Hyeena", "Apina", "Virtahepo"],
        correct: "Hyeena",
        background: "images/substantiivisavanni/hyeena.png"
    },
    {
        question: "Tällä eläimellä on erittäin pitkä kaula, mikä se on?",
        answers: ["Kirahvi", "Seepra", "Sarvikuono"],
        correct: "Kirahvi",
        background: "images/substantiivisavanni/kirahvi.png"
    },
    {
        question: "Tällä eläimellä on terävät hampaat ja se asuu vedessä, mikä se on?",
        answers: ["Krokotiili", "Elefantti", "Strutsi"],
        correct: "Krokotiili",
        background: "images/substantiivisavanni/krokotiili.png"
    },
    {
        question: "Tämä eläin on savannin kuningas, mikä se on?",
        answers: ["Leijona", "Kirahvi", "Seepra"],
        correct: "Leijona",
        background: "images/substantiivisavanni/leijona.png"
    },
    {
        question: "Tällä eläimellä on sarvi päässä, mikä se on?",
        answers: ["Sarvikuono", "Krokotiili", "Elefantti"],
        correct: "Sarvikuono",
        background: "images/substantiivisavanni/sarvikuono.png"
    },
    {
        question: "Tällä eläimellä on mustavalkoiset raidat, mikä se on?",
        answers: ["Seepra", "Strutsi", "Apina"],
        correct: "Seepra",
        background: "images/substantiivisavanni/seepra.png"
    },
    {
        question: "Tämä eläin ei lennä, mutta juoksee todella nopeasti, mikä se on?",
        answers: ["Strutsi", "Leijona", "Hyeena"],
        correct: "Strutsi",
        background: "images/substantiivisavanni/strutsi.png"
    },
    {
        question: "Tämä eläin viettää paljon aikaa vedessä, mikä se on?",
        answers: ["Virtahepo", "Krokotiili", "Elefantti"],
        correct: "Virtahepo",
        background: "images/substantiivisavanni/virtahepo.png"
    }
];

/* dom elementit */

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

/* pisteet ja kyssärien määrä */
let score = 0;
let currentQuestionIndex = 0;

/* shuffeli */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Vaihdetaan elementtien paikkaa
    }
    return array;
}

/* pelin aloitus */
startButton.addEventListener("click", () => {
    document.querySelector(".etusivu").classList.add("d-none");
    gameContainer.classList.remove("d-none");

    shuffleArray(questions);
    showQuestion();
});

/* näytä kyssärit */
function showQuestion() {
    const questionData = questions[currentQuestionIndex];

    document.body.style.backgroundImage = `url('${questionData.background}')`;
    document.body.style.backgroundSize = "contain";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundColor = "#9ddca5";

    questionElement.textContent = questionData.question;

    // tyhjentää vanhat vastaukset
    answersContainer.innerHTML = "";

    // shuffeli vastaukset
    const shuffledAnswers = shuffleArray([...questionData.answers]);

    shuffledAnswers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-button");
        button.addEventListener("click", () => handleAnswer(answer));
        answersContainer.appendChild(button);
    });
}

/* vastaukset*/
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

/* ponnari */
function showFeedbackMessage(message) {
    feedbackMessage.textContent = message;
    feedbackContainer.classList.add("active");
}

closeFeedbackButton.addEventListener("click", () => {
    feedbackContainer.classList.remove("active");

    if (currentQuestionIndex < questions.length) {
        showQuestion(); 
    } else {
        showEndScreen(); 
    }
});

/* loparit */
function showEndScreen() {
    gameContainer.classList.add("d-none"); 
    endScreen.classList.remove("d-none"); 
    document.body.style.background = "linear-gradient(to bottom right, #9ddca5, #e8dba4)"; 

    // lopari viesti
    endMessage.textContent = `Peli ohi! Sait ${score}/${questions.length} pistettä! 🎉`;

    // pisteiden tallennus substantiiviin
    tallennaPisteet("Substantiivit", score);
}

/* pelaa uudestaan */
document.getElementById("restart-btn").addEventListener("click", () => {
    //tyhjennä substantiivin pisteet
    tyhjennaPisteet("Substantiivit");

    // palauttaa peli alkuasetuksiin
    score = 0;
    currentQuestionIndex = 0;

    // palauttaa alkuperäinen näkymä
    endScreen.classList.add("d-none");
    gameContainer.classList.remove("d-none");
    document.body.style.background = "";
    shuffleArray(questions);
    showQuestion();
});

document.getElementById("home-btn").addEventListener("click", () => {
    // tallentaa pisteet ennen siirtymistä
    tallennaPisteet("Substantiivit", score);

    // etusivulle
    window.location.href = "etusivu.html";
});

/* pisteiden tallennus */
function tallennaPisteet(kategoria, pisteet) {
    let pisteetData = JSON.parse(localStorage.getItem("pisteet")) || {}; 
    pisteetData[kategoria] = pisteet; 
    localStorage.setItem("pisteet", JSON.stringify(pisteetData)); 
}

function tyhjennaPisteet(kategoria) {
    let pisteetData = JSON.parse(localStorage.getItem("pisteet")) || {}; 
    delete pisteetData[kategoria]; 
    localStorage.setItem("pisteet", JSON.stringify(pisteetData)); 
}

document.getElementById("home-btn").addEventListener("click", () => {
    tallennaPisteet("Substantiivit", score); 
    window.location.href = "substantiivi.html";
});

