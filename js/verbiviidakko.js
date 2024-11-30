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

const maxRounds = 10

let askedVerb = ''
let corrAnswers = 0;
let gameRound = 0;

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
    buildGame()
    hideElement(overlay)
    hideElement(popup)
})

const showVerbInfo = () => {
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
            if (e.target.innerHTML == askedVerb) {
                updateSymbols('correct')
                corrAnswers += 1
            } else {
                updateSymbols('wrong')
            }
        }

        showVerbInfo()
    }
})

const buildGame = () => {
    // Arvo mitä verbiä kysytään
    const questenNo = Math.floor(Math.random() * questions.length)
    const question = questions[questenNo]
    askedVerb = question.verb
    setGamePic(question.img)
    let questionVerbs = []
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