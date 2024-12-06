import { setScore } from './scores.js'

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
]

let currentQuestionIndex = 0
let correctAnswers = 0
let wrongAnswers = 0

const quizCopy = document.getElementById("quiz").innerHTML

// Kysymys funktio 
function displayQuestion() {
    const questionElement = document.getElementById("question-text")
    const formElement = document.getElementById("quiz-form")
    const imageElement = document.getElementById("question-image")
    const progressElement = document.getElementById("question-progress") 

    const currentQuestion = questions[currentQuestionIndex]

    progressElement.textContent = `Kysymys ${currentQuestionIndex + 1}/${questions.length}`
    
    questionElement.textContent = currentQuestion.question

    imageElement.src = currentQuestion.image
    imageElement.alt = "Kuva liittyen kysymykseen"

    formElement.innerHTML = ""
    currentQuestion.options.forEach(option => {
        const label = document.createElement("label")
        const input = document.createElement("input")
        input.type = "radio"
        input.name = "quiz-option"
        input.value = option

        label.appendChild(input)
        label.append(option)
        formElement.appendChild(label)
        formElement.appendChild(document.createElement("br"))
    })
}

//Tarkistus funktio ja seuraavan kysymyksen näyttämine
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked')
    const resultElement = document.getElementById("result")

    if (!selectedOption) {
        resultElement.textContent = "Valitse vastaus ennen tarkistamista!"
        return
    }
    
    const currentQuestion = questions[currentQuestionIndex]
    if (selectedOption.value === currentQuestion.correct) {
        resultElement.textContent = "Oikein!"
        correctAnswers++
    } else {
        resultElement.textContent = `Väärin. Oikea vastaus on: ${currentQuestion.correct}`
        wrongAnswers++
    }
    
    // Siirtyy seuraavaan kysymykseen
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            resultElement.textContent = "" 
            displayQuestion() 
        }, 2000)
    } else {
        
        setTimeout(() => {
            displayResults() // Näyttää loppuarvion
        }, 2000)
    }
}

// Tulos funktio
function displayResults() {
    setScore('adjektiivi', correctAnswers)
    const quizElement = document.getElementById("quiz")
    const instructionsElement = document.getElementById("instructions") 
    quizElement.innerHTML = "" 

    const resultMessage = document.createElement("h2")
    const starContainer = document.createElement("div")
    starContainer.style.display = "flex"
    starContainer.style.justifyContent = "center"
    starContainer.style.gap = "10px"

    
    for (let i = 0; i < correctAnswers; i++) {
        const star = document.createElement("img")
        star.src = "./images/adjektiivipeli/star.png"
        star.classList.add("star")
        starContainer.appendChild(star)
    }

    if (correctAnswers > questions.length / 2) {
        resultMessage.textContent = `Hyvää työtä! Sait ${correctAnswers}/${questions.length} oikein.`
    } else {
        resultMessage.textContent = `Yritä uudelleen! Sait vain ${correctAnswers}/${questions.length} oikein.`
    }

    quizElement.appendChild(resultMessage)
    quizElement.appendChild(starContainer)

    const replayButton = document.createElement("button")
    replayButton.textContent = "Pelaa uudelleen"
    replayButton.onclick = resetGame;
    quizElement.appendChild(replayButton)

    instructionsElement.style.display = "none" // ohjeet piiloon
}

// Reset funktio alottaa pelin uudestaan
function resetGame() {
    document.getElementById("quiz").innerHTML = quizCopy

    console.log("Resetointi käynnistetty!")
    correctAnswers = 0 
    wrongAnswers = 0
    currentQuestionIndex = 0

    const resultElement = document.getElementById("result")
    if (resultElement) {
        resultElement.textContent = ""
    }

    const quizElement = document.getElementById("quiz-form")
    const instructionsElement = document.getElementById("instructions")
    if (instructionsElement) {
        instructionsElement.style.display = "block" 
    }
    if (quizElement) {
        quizElement.innerHTML = "" 
    }

    displayQuestion()
}

window.onload = function() {
    displayQuestion() 
}