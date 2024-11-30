'use strict'

const startupContainer = document.querySelector('#startupContainer')
const gameContainer = document.querySelector('#gameContainer')

const startBtn = document.querySelector('#startBtn')
const symbolDiv = document.querySelector('#symboldiv')
const gamepic = document.querySelector('#gamepic')
const verbButtons = document.querySelector('#answerBtnContainer')

const popup = document.querySelector('#popup')
const popupPic = document.querySelector('#popupPic')
const overlay = document.querySelector('#overlay')
const nextBtn = document.querySelector('#nextVerbBtn')
const posConjs = document.querySelector('#posConjs')
const negConjs = document.querySelector('#negConjs')
const verbText = document.querySelector('#verbText')
const popupTitle = document.querySelector('#popupTitle')

const scoreContainer = document.querySelector('#scoreContainer')
const scoreCount = document.querySelector('#scoreCount')
const restartBtn = document.querySelector('#restartBtn')

const maxRounds = 10

let askedVerb = ''
let corrAnswers = 0;
let gameRound = 0;
let question = ''

const showElement = (element) => {
    element.style.display = 'block'
}

const showFlexElement = (element) => {
    element.style.display = 'flex'
}

const hideElement = (element) => {
    element.style.display = 'none'
}

const verbs = ['Maata', 'Juoda', 'Karjua', 'Kiivetä', 'Roikkua', 'Nukkua', 'Haukotella', 'Lentää', 'Syödä', 'Nuolla', 'Kävellä', 'Kaivaa', 'Juosta', 'Lyödä', 'Hypätä']

const questions = [
    {
        img: '0.png',
        verb: 'Maata',
        sentence: 'Tiikeri <strong>makaa</strong> maassa.',
        conjsPos: ['minä makaan', 'sinä makaat', 'hän makaa', 'me makaamme', 'te makaatte', 'he makaavat', 'passiivi: maataan'],
        conjsNeg: ['en makaa', 'et makaa', 'ei makaa', 'emme makaa', 'ette makaa', 'eivät makaa', 'passiivi: ei maata']
    },
    {
        img: '1.png',
        verb: 'Juoda',
        sentence: 'Tiikeri <strong>juo</strong> vettä.',
        conjsPos: ['minä juon', 'sinä juot', 'hän juo', 'me juomme', 'te juotte', 'he juovat', 'passiivi: juodaan'],
        conjsNeg: ['en juo', 'et juo', 'ei juo', 'emme juo', 'ette juo', 'eivät juo', 'passiivi: ei juoda']
    }
]

startBtn.addEventListener('click', () => {
    hideElement(startupContainer)
    showElement(gameContainer)
})

nextBtn.addEventListener('click', () => {
    if (gameRound === maxRounds) {
        hideElement(overlay)
        hideElement(popup)
        hideElement(gameContainer)

        scoreCount.innerHTML = 'Pisteesi: ' + corrAnswers + '/10.'
        showElement(scoreContainer)
    } else {
        buildGame()
        hideElement(overlay)
        hideElement(popup)
    }
})

restartBtn.addEventListener('click', () => {
    hideElement(scoreContainer)
    gameRound = 0
    symbolDiv.innerHTML = ''
    buildGame()
    showElement(gameContainer)
})

const showVerbInfo = () => {
    posConjs.innerHTML = ''
    negConjs.innerHTML = ''
    verbText.innerHTML = question.sentence

    for (let i = 0; i < question.conjsPos.length; i++) {
        posConjs.innerHTML += '<li>'+ question.conjsPos[i] + '</li>'
    }

    for (let i = 0; i < question.conjsNeg.length; i++) {
        negConjs.innerHTML += '<li>'+ question.conjsNeg[i] + '</li>'
    }

    showElement(overlay)
    showFlexElement(popup)
    if (gameRound === maxRounds) {
        nextBtn.innerHTML = 'Pisteet'
    }
}

verbButtons.addEventListener('click', (e) => {
    if (gameRound < maxRounds) {
        gameRound++

        if (e.target.nodeName === 'BUTTON') {
            // Katso onko napin teksti kysytty verbi, eli vastattiinko oikein.
            if (e.target.innerHTML == askedVerb) {
                popupTitle.innerHTML = 'Oikein!'
                updateSymbols('correct')
                corrAnswers += 1
            } else {
                popupTitle.innerHTML = 'Väärin!'
                updateSymbols('wrong')
            }
        }

        showVerbInfo()
    }
})

const buildGame = () => {
    // Arvo mitä verbiä kysytään
    const questenNo = Math.floor(Math.random() * questions.length)
    question = questions[questenNo]
    // Tallenna haettu verbi eli oikea vastaus muuttujaan.
    askedVerb = question.verb
    setGamePic(question.img)
    // Tehdään array johon lisätään näytettävien nappien verbit.
    let questionVerbs = []
    // Lisätään kysytty verbi listaan.
    questionVerbs.push(question.verb)
    // Arvo muut verbit. Jos arvottu verbi on jo listassa, arvo uusi verbi kunnes on kysytty verbi ja 3 satunnaista verbiä.
    while (questionVerbs.length < 4) {
        let randNo = Math.floor(Math.random() * verbs.length)
        let randVerb = verbs[randNo]
        if (questionVerbs.includes(randVerb) === false) {
            questionVerbs.push(randVerb)
        }
    }
    // Laita arvotut verbit satunnaiseen järjestykseen
    questionVerbs.sort(() => {return 0.5 - Math.random()})
    // Rakenna vastausnapit
    buildButtons(questionVerbs)
    
}

const setGamePic = (img) => {
    gamepic.src = './images/verbiviidakko/gamepics/' + img
    popupPic.src = './images/verbiviidakko/gamepics/' + img
}

const buildButtons = (v) => {
    verbButtons.innerHTML = ''
    for (let i = 0; i < v.length; i++) {
        verbButtons.innerHTML += '<button class="answerBtn barlow-medium">' + v[i] + '</button>'
    }
}

const updateSymbols = (answer) => {
    let symbolClass = ''
    let symbol = ''

    if (answer === 'correct') {
        symbolClass = 'correctAnsw'
        symbol = 'check'
    } else {
        symbolClass = 'wrongAnsw'
        symbol = 'close'
    }

    symbolDiv.innerHTML += '<span class="material-symbols-outlined ' + symbolClass + '">' + symbol + '</span>'
}

document.addEventListener('DOMContentLoaded', () => {
    buildGame()
})