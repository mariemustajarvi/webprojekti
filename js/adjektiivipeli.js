// Taulukko, jossa jokainen kysymys sisältää tekstin, vastausvaihtoehdot, oikean vastauksen ja kuvan
const questions = [
    {
        question: "Minkä muotoinen pallokala on?",
        options: ["Pyöreä", "Kulmikas", "Suippo"],
        correct: "Pyöreä",
        image: "./images/adjektiivipeli/pallokala.png"
        
    },
    {
        question: "Minkä värinen mustekala on?",
        options: ["Sininen", "Keltainen", "Punainen"],
        correct: "Punainen",
        image: "./images/adjektiivipeli/mustekala.png"
       
    },
    {
        question: "Minkä värinen kilpikonna on?",
        options: ["Harmaa", "Vihreä", "Oranssi"],
        correct: "Vihreä",
        image: "./images/adjektiivipeli/kilpikonna.png"
        
    },
    {
        question: "Minkä värinen valas on?",
        options: ["Musta", "Valkoinen", "Harmaa"],
        correct: "Harmaa",
        image: "./images/adjektiivipeli/wale.png"
       
    },
    {
        question: "Onko delfiini?",
        options: ["Vihainen", "Iloinen", "Surullinen"],
        correct: "Iloinen",
        image: "./images/adjektiivipeli/delfiini.png"
       
    },
    {
        question: "Onko kala?",
        options: ["Pilkullinen", "Raidallinen", "Yksivärinen"],
        correct: "Raidallinen",
        image: "./images/adjektiivipeli/raidallinen.png"
       
    },
];

let currentQuestionIndex = 0; // Pitää kirjaa nykyisestä kysymyksestä
let correctAnswers = 0; // Oikeiden vastausten määrä
let wrongAnswers = 0; // Väärien vastausten määrä

// Näyttää kysymyksen 
function displayQuestion() {
    const questionElement = document.getElementById("question-text");
    const formElement = document.getElementById("quiz-form");
    const imageElement = document.getElementById("question-image");
    const progressElement = document.getElementById("question-progress"); 

    const currentQuestion = questions[currentQuestionIndex];

    // Päivittää kysymysnumeron
    progressElement.textContent = `Kysymys ${currentQuestionIndex + 1}/${questions.length}`;
    
    // Päivittää kysymystekstin
    questionElement.textContent = currentQuestion.question;

    // Päivittää kuvan
    imageElement.src = currentQuestion.image;
    imageElement.alt = "Kuva liittyen kysymykseen";

    // Päivittää vastausvaihtoehdot
    formElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "quiz-option";
        input.value = option;

        label.appendChild(input);
        label.append(option);
        formElement.appendChild(label);
        formElement.appendChild(document.createElement("br"));
    });
}

//Vastauksen tarkistus ja seuraavan kysymyksen näyttämine
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    const resultElement = document.getElementById("result");

    if (!selectedOption) {
        resultElement.textContent = "Valitse vastaus ennen tarkistamista!";
        return;
    }
    
    // Tarkistaa, onko vastaus oikein
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption.value === currentQuestion.correct) {
        resultElement.textContent = "Oikein!";
        correctAnswers++; // Lisää oikeiden vastausten määrää
    } else {
        resultElement.textContent = `Väärin. Oikea vastaus on: ${currentQuestion.correct}`;
        wrongAnswers++; // Lisää väärien vastausten määrää
    }
    
    // Siirtyy seuraavaan kysymykseen
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            resultElement.textContent = ""; // Tyhjentää tulosviestin
            displayQuestion(); // Näyttää seuraavan kysymykse
        }, 2000); // Odottaa 2 sekuntia ennen seuraavan kysymyksen näyttämistä
    } else {
        // Jos kysymykset loppuu
        setTimeout(() => {
            displayResults(); // Näyttää loppuarvion
        }, 2000);
    }
}

// Näyttää tulokset kysymysten lopussa
function displayResults() {
    const quizElement = document.getElementById("quiz");
    const instructionsElement = document.getElementById("instructions"); // Lisätään tämä
    quizElement.innerHTML = ""; // Tyhjentää visailun sisällön

    const resultMessage = document.createElement("h2");
    const starContainer = document.createElement("div");
    starContainer.style.display = "flex";
    starContainer.style.justifyContent = "center";
    starContainer.style.gap = "10px";

    // Näytetään tähdet oikeiden vastausten määrän mukaan
    for (let i = 0; i < correctAnswers; i++) {
        const star = document.createElement("img");// Käytetään <img> elementtiä
        star.src = "./images/adjektiivipeli/star.png"
        star.classList.add("star"); // Lisätään CSS-luokka tähti-kuville
        starContainer.appendChild(star);
    }

    // Lisätään viesti tulosten mukaan
    if (correctAnswers > questions.length / 2) {
        resultMessage.textContent = `Hyvää työtä! Sait ${correctAnswers}/${questions.length} oikein.`;
    } else {
        resultMessage.textContent = `Yritä uudelleen! Sait vain ${correctAnswers}/${questions.length} oikein.`;
    }

    // Lisätään tulokset DOM:iin
    quizElement.appendChild(resultMessage);
    quizElement.appendChild(starContainer);

    // Uudelleenpelaamisen painike
    const replayButton = document.createElement("button");
    replayButton.textContent = "Pelaa uudelleen";
    replayButton.onclick = resetGame; // Liitetään painikkeeseen `resetGame`-funktio
    quizElement.appendChild(replayButton);

    // Piilotetaan ohjeet tulosten näyttämisen ajaksi
    instructionsElement.style.display = "none"; // Piilotetaan ohjeet
}

// Resetoi pelin tilan ja aloittaa alusta
function resetGame() {
    console.log("Resetointi käynnistetty!");
    correctAnswers = 0; // Nollaa oikeiden vastausten määrä
    wrongAnswers = 0; // Nollaa väärien vastausten määrä
    currentQuestionIndex = 0; // Asettaa kysymyksen ensimmäiseen
    
       // Tarkistetaan, että elementti on olemassa ennen kuin asetetaan sen sisältöä
    const resultElement = document.getElementById("result");
    if (resultElement) {
        resultElement.textContent = ""; // Tyhjennetään tulosviesti
    }
    
    
    // Näytetään ohjeet ja tulokset aluksi
    const quizElement = document.getElementById("quiz");
    const instructionsElement = document.getElementById("instructions");
    instructionsElement.style.display = "block"; // Näytetään ohjeet uudelleen
    quizElement.innerHTML = ""; // Tyhjentää mahdolliset tulokset ja painikkeet
   

    // Näytetään ensimmäinen kysymys
    displayQuestion();
}
window.onload = function() {
    displayQuestion(); // Tämä varmistaa, että peli käynnistyy vasta, kun kaikki elementit ovat ladattuja
};