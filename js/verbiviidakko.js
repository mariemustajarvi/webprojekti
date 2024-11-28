'use strict'

const symbolDiv = document.querySelector('#symboldiv')
const gamepic = document.querySelector('#gamepic')
const verbButtons = document.querySelector('#answerBtnContainer')

let askedVerb = ''
let corrAnswers = 0;

const verbs = ['Maata', 'Juoda', 'Karjua', 'Kiivetä', 'Roikkua', 'Nukkua', 'Haukotella', 'Lentää', 'Syödä', 'Nuolla', 'Kävellä', 'Kaivaa', 'Juosta', 'Lyödä', 'Hypätä']

const questions = [
    {
        img: '0.png',
        verb: 'Maata',
        sentence: 'Tiikeri <strong>makaa</strong> maassa.',
        conjsPos: ['makaan', 'makaat', 'makaa', 'makaamme', 'makaatte', 'makaavat', 'maataan'],
        conjsNeg: ['en makaa', 'et makaa', 'ei makaa', 'emme makaa', 'ette makaa', 'eivät makaa', 'ei maata']
    },
    {
        img: '1.png',
        verb: 'Juoda',
        sentence: 'Tiikeri <strong>juo</strong> vettä.',
        conjsPos: ['juon', 'juot', 'juo', 'juomme', 'juotte', 'juovat', 'juodaan'],
        conjsNeg: ['en juo', 'et juo', 'ei juo', 'emme juo', 'ette juo', 'eivät juo', 'ei juoda']
    }
]

verbButtons.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.innerHTML == askedVerb) {
            updateSymbols('correct')
            corrAnswers += 1
        } else {
            updateSymbols('wrong')
        }
    }
    buildGame()
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