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
        question: "Minkä värinen meduusa on?",
        options: ["Musta", "Valkoinen", "Sininen"],
        correct: "Sininen",
        image: "./images/adjektiivipeli/jellyfish.png"
       
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

// Näyttää kysymyksen 
function displayQuestion() {
    const questionElement = document.getElementById("question-text");
    const formElement = document.getElementById("quiz-form");
    const imageElement = document.getElementById("question-image");

    const currentQuestion = questions[currentQuestionIndex];
    
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
    } else {
        resultElement.textContent = `Väärin. Oikea vastaus on: ${currentQuestion.correct}`;
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
            resultElement.textContent = "Visailu on ohi! Kiitos osallistumisesta.";
            document.getElementById("quiz").innerHTML = ""; // Tyhjennä visailu
        }, 2000);
    }
}

window.onload = displayQuestion;