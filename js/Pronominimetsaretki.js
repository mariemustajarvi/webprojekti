const questions = [
    {
        question: "Mikä pronomini sopii lauseeseen: '___ on minun lempivärini?'",
        options: ["Hän", "Tämä", "Mikä", "Sinun"],
        correct: "Mikä",
        image: "./images/IMG_3012.jpg" 
    },
    {
        question: "Mikä pronomini täydentää lauseen: 'Kaikki odottavat, että ___ saapuu ajoissa.'",
        options: ["He", "Hän", "Joka", "Kuka"],
        correct: "Hän",
        image: "./images/IMG_3013.jpg"
    },
    {
        question: "Mikä pronomini kuuluu lauseeseen: 'Kirja, ___ lainasit minulle, oli todella hyvä.'",
        options: ["Kuka", "Mikä", "Joka", "Tuo"],
        correct: "Joka",
        image: "./images/IMG_3014.jpg"
    },
    {
        question: "Valitse oikea pronomini: 'Kenelle nämä kuuluvat? Ovatko ne ___?'",
        options: ["Sinun", "Minun", "Meidän", "Teidän"],
        correct: "Sinun",
        image: "./images/IMG_3015.jpg"
    },
    {
        question: "Täydennä lause: '___ näistä vaihtoehdoista on mielestäsi paras?'",
        options: ["Mikä", "Mitä", "Kuka", "Ne"],
        correct: "Mikä",
        image: "./images/IMG_3017.jpg"
    },
    {
        question: "Mikä pronomini puuttuu: 'Henkilö, ___ näin eilen, oli vanha opettajani.'",
        options: ["Kenet", "Jonka", "Joka", "Jotka"],
        correct: "Jonka",
        image: "./images/IMG_3018.jpg"
    },
    {
        question: "Valitse oikea pronomini: 'Tiedätkö, ___ tämä kuuluu?'",
        options: ["Kenen", "Kuka", "Minkä", "Kenenkä"],
        correct: "Kenen",
        image: "./images/IMG_3019.jpg"
    },
    {
        question: "Mikä pronomini sopii lauseeseen: '___ tuo on?'",
        options: ["Kuka", "Mikä", "Kenen", "Mitä"],
        correct: "Mikä",
        image: "./images/IMG_3012.jpg"
    },
    {
        question: "Valitse oikea pronomini: '___ heistä haluaa tulla mukaan?'",
        options: ["Kuka", "Mikä", "Kenen", "Ketkä"],
        correct: "Kuka",
        image: "./images/IMG_3013.jpg"
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
const quizCopy = document.getElementById("quiz").innerHTML;
let musicPlaying = false;

const audio = document.getElementById("forest-symphony");

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "flex";

    audio.play().then(() => {
        musicPlaying = true;
    }).catch(err => console.log('Autoplay blocked:', err));

    displayQuestion();
}

function displayQuestion() {
    const questionElement = document.getElementById("question-text");
    const formElement = document.getElementById("quiz-form");
    const imageElement = document.getElementById("question-image");
    const progressElement = document.getElementById("question-progress");

    const currentQuestion = questions[currentQuestionIndex];
    progressElement.textContent = `Kysymys ${currentQuestionIndex + 1}/${questions.length}`;
    questionElement.textContent = currentQuestion.question;
    imageElement.src = currentQuestion.image;
    imageElement.alt = "Kuva liittyen kysymykseen";

    formElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "quiz-option";
        input.value = option;

        label.appendChild(input);
        label.append(" " + option);
        formElement.appendChild(label);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    const resultElement = document.getElementById("result");

    if (!selectedOption) {
        resultElement.textContent = "Valitse vastaus ennen tarkistamista!";
        resultElement.style.color = "red";
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption.value === currentQuestion.correct) {
        resultElement.textContent = "Oikein!";
        resultElement.style.color = "green";
        correctAnswers++;
        glowCorrect();
        showSymbol('correct');
    } else {
        resultElement.textContent = `Väärin. Oikea vastaus on: ${currentQuestion.correct}`;
        resultElement.style.color = "red";
        wrongAnswers++;
        showSymbol('wrong');
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            resultElement.textContent = "";
            displayQuestion();
        }, 1500);
    } else {
        setTimeout(() => {
            displayResults();
        }, 1500);
    }
}

function displayResults() {
    const quizElement = document.getElementById("quiz");
    const instructionsElement = document.getElementById("instructions");
    quizElement.innerHTML = "";

    const resultMessage = document.createElement("h2");
    resultMessage.style.textAlign = "center";
    resultMessage.style.marginBottom = "20px";

    const starContainer = document.createElement("div");
    starContainer.style.display = "flex";
    starContainer.style.justifyContent = "center";
    starContainer.style.gap = "10px";
    starContainer.style.flexWrap = "wrap";
    starContainer.style.marginBottom = "20px";

    for (let i = 0; i < correctAnswers; i++) {
        const star = document.createElement("img");
        star.src = "./images/IMG_0022.webp";
        star.classList.add("star");
        starContainer.appendChild(star);
    }

    if (correctAnswers > questions.length / 2) {
        resultMessage.textContent = `Hyvää työtä! Sait ${correctAnswers}/${questions.length} oikein.`;
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = `Yritä uudelleen! Sait ${correctAnswers}/${questions.length} oikein.`;
        resultMessage.style.color = "red";
    }

    quizElement.appendChild(resultMessage);
    quizElement.appendChild(starContainer);

    const replayButton = document.createElement("button");
    replayButton.textContent = "Pelaa uudelleen";
    replayButton.onclick = resetGame;
    replayButton.classList.add("btn", "btn-dark", "fw-bold");
    replayButton.style.borderRadius = "30px";
    replayButton.style.padding = "10px 30px";
    quizElement.appendChild(replayButton);

    instructionsElement.style.display = "none";
}

function resetGame() {
    document.getElementById("quiz").innerHTML = quizCopy;
    correctAnswers = 0;
    wrongAnswers = 0;
    currentQuestionIndex = 0;

    const instructionsElement = document.getElementById("instructions");
    if (instructionsElement) {
        instructionsElement.style.display = "block";
    }

    displayQuestion();
}

function glowCorrect() {
    const container = document.querySelector('.content');
    container.style.boxShadow = "0 0 20px rgba(0,255,0,0.7)";
    setTimeout(() => {
        container.style.boxShadow = "";
    }, 1000);
}

function toggleMusic() {
    if (!musicPlaying) {
        audio.play().then(() => {
            musicPlaying = true;
        }).catch(err => console.log("Play attempt blocked:", err));
    } else {
        audio.pause();
        musicPlaying = false;
    }
}

function showSymbol(type) {
    const container = document.getElementById('question-container');
    const symbol = document.createElement('div');
    symbol.classList.add('effect-symbol');
    if (type === 'correct') {
        symbol.textContent = '✓';
        symbol.style.color = 'green';
    } else {
        symbol.textContent = '✗';
        symbol.style.color = 'red';
    }
    container.appendChild(symbol);
    setTimeout(() => {
        if (symbol.parentNode) {
            symbol.parentNode.removeChild(symbol);
        }
    }, 1000);
}