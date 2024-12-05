/* pelin tiedot */

const questions = [
    {
        question: "Tämä vipeltäjä viihtyy puiden latvoissa ja heiluu oksalta toiselle. Arvaa kuka se on?",
        answers: ["Apina", "Kirahvi", "Seepra"],
        correct: "Apina",
        background: "./images/substantiivisavanni/apina.png"
    },
    {
        question: "Tällä mahtavalla jättiläisellä on kärsä, jolla se voi napata ruokaa ja suihkuttaa vettä. Mikä eläin on kyseessä?",
        answers: ["Elefantti", "Virtahepo", "Krokotiili"],
        correct: "Elefantti",
        background: "./images/substantiivisavanni/elefantti.png"
    },
    {
        question: "Kukahan se nauraja on? Tämä kaveri hekottaa niin, että savanni raikaa!",
        answers: ["Hyeena", "Apina", "Leijona"],
        correct: "Hyeena",
        background: "./images/substantiivisavanni/hyeena.png"
    },
    {
        question: "Pystyisitkö kurkottamaan tämän eläimen kanssa samaan korkeuteen? Sen kaula yltää pilviin asti!",
        answers: ["Kirahvi", "Strutsi", "Krokotiili"],
        correct: "Kirahvi",
        background: "./images/substantiivisavanni/kirahvi.png"
    },
    {
        question: "Tässä veden valtias: terävät hampaat ja iso hymy! Mikä eläin tämä voisi olla?",
        answers: ["Krokotiili", "Elefantti", "Strutsi"],
        correct: "Krokotiili",
        background: "./images/substantiivisavanni/krokotiili.png"
    },
    {
        question: "Kuka se savannin hallitsija on, jolla on muhkea harja ja kova karjaisu?",
        answers: ["Leijona", "Kirahvi", "Seepra"],
        correct: "Leijona",
        background: "./images/substantiivisavanni/leijona.png"
    },
    {
        question: "Tässä eläimessä on jotain erityistä päässään – iso sarvi! Mikä eläin on kyseessä?",
        answers: ["Sarvikuono", "Krokotiili", "Elefantti"],
        correct: "Sarvikuono",
        background: "./images/substantiivisavanni/sarvikuono.png"
    },
    {
        question: "Tämä eläin pukeutuu aina tyylikkäästi mustavalkoisiin raitoihin. Tiedätkö, kuka se on?",
        answers: ["Seepra", "Strutsi", "Apina"],
        correct: "Seepra",
        background: "./images/substantiivisavanni/seepra.png"
    },
    {
        question: "Vaikka tämä lintu ei lennä, se pinkoo nopeammin kuin moni auto. Kuka se voisi olla?",
        answers: ["Strutsi", "Apina", "Hyeena"],
        correct: "Strutsi",
        background: "./images/substantiivisavanni/strutsi.png"
    },
    {
        question: "Tämä jättiläinen viihtyy vedessä, mutta on myös melkoinen mahtipontinen maalla. Mikä eläin se on?",
        answers: ["Virtahepo", "Krokotiili", "Elefantti"],
        correct: "Virtahepo",
        background: "./images/substantiivisavanni/virtahepo.png"
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

/* pisteet ja kyssärit */
let score = 0;
let currentQuestionIndex = 0;

/* shuffelit */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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

/* vastaukset */
function handleAnswer(selected) {
    const buttons = document.querySelectorAll(".answer-button");
    buttons.forEach((button) => (button.disabled = true));

    const correctAnswer = questions[currentQuestionIndex].correct;
    let feedbackMessage;

    if (selected === correctAnswer) {
        score++;
        feedbackMessage = getRandomFeedback(true);
    } else {
        feedbackMessage = getRandomFeedback(false, correctAnswer); 
    }

    showFeedbackMessage(feedbackMessage);
    currentQuestionIndex++;
}

const correctFeedbackMessages = [
        "Täysosuma! 🐘 Savannin kuningas on ylpeä sinusta!",
        "Jee! Osuit nappiin! 🐒 Eläimet taputtavat sinulle tassuillaan!",
        "Wow, olet ihan kuin eläintieteen professori! 🦉 Hyvää työtä!",
        "Oikein! Sinusta tulee vielä savannin supertähti! 🌟",
        "Mahtavaa, eläinmestari! 🐾 Tämä meni kuin leijonan karjaisu!",
        "Oikein! Nyt olet askeleen lähempänä eläinasiantuntijan titteliä! 🦒"
]

const incorrectFeedbackMessages = [
        "Väärin, mutta ei haittaa! Oikea vastaus on ${correctAnswer}. Kokeile seuraavaa kysymystä rohkeasti! 🌟",
        "Ei osunut tällä kertaa! Oikea vastaus on ${correctAnswer}. Seuraava kysymys odottaa sinua! 🌱",
        "Ei haittaa, jokainen oppii! Oikea vastaus on ${correctAnswer}. Nyt vain uutta yritystä! 🦋",
        "Melkein! Oikea vastaus on ${correctAnswer}. Jatka samaan malliin, sinä pystyt siihen! 🦒",
        "Väärin, mutta hei, nyt tiedät enemmän! Oikea vastaus on ${correctAnswer}. Hyvä yritys! 🐾"
];

/* shuffeli palautteen */
function getRandomFeedback(isCorrect, correctAnswer) {
    if (isCorrect) {
        return correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)];
    } else {

        const randomMessage = incorrectFeedbackMessages[Math.floor(Math.random() * incorrectFeedbackMessages.length)];
        return randomMessage.replace("${correctAnswer}", correctAnswer);
    }
}


/* ponnarit */
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


/* loppari*/
function showEndScreen() {
    gameContainer.classList.add("d-none"); 
    endScreen.classList.remove("d-none"); 
    document.body.style.background = "linear-gradient(to bottom right, #9ddca5, #e8dba4)"; 

    endMessage.textContent = `Savannin seikkailu päättyi mutta seikkailusi jatkuu vielä muualla!🎉Tunnistit ${score}/${questions.length} savannin eläimistä!🐾`;

    // pisteiden tallennus
    tallennaPisteet("Substantiivit", score);
}

/* aloita peli uudelleen */
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
    // Tallenna pisteet ennen siirtymistä
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

/*responsiivisuus tableteille ja mobiileille ehkä*/
/*tässä on käytetty apua tekoälyltä*/
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navbarLinks = document.querySelector('.navbar-links');

hamburgerMenu.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

