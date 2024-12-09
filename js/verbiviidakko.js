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
let alreadyAsked = []

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
    },
    {
        img: '2.png',
        verb: 'Karjua',
        sentence: 'Tiikeri <strong>karjuu</strong>.',
        conjsPos: ['minä karjun', 'sinä karjut', 'hän karjuu', 'me karjumme', 'te karjutte', 'he karjuvat', 'passiivi: karjutaan'],
        conjsNeg: ['en karju', 'et karju', 'ei karju', 'emme karju', 'ette karju', 'eivät karju', 'passiivi: ei karjuta']
    },
    {
        img: '3.png',
        verb: 'Kiivetä',
        sentence: 'Laiskiainen <strong>kiipeää</strong>.',
        conjsPos: ['minä kiipeän', 'sinä kiipeät', 'hän kiipeää', 'me kiipeämme', 'te kiipeätte', 'he kiipeävät', 'passiivi: kiivetään'],
        conjsNeg: ['en kiipeä', 'et kiipeä', 'ei kiipeä', 'emme kiipeä', 'ette kiipeä', 'eivät kiipeä', 'passiivi: ei kiivetä']
    },
    {
        img: '4.png',
        verb: 'Roikkua',
        sentence: 'Laiskiainen <strong>roikkuu</strong> oksasta.',
        conjsPos: ['minä roikun', 'sinä roikut', 'hän roikkuu', 'me roikumme', 'te roikutte', 'he roikkuvat', 'passiivi: roikutaan'],
        conjsNeg: ['en roiku', 'et roiku', 'ei roiku', 'emme roiku', 'ette roiku', 'eivät roiku', 'passiivi: ei roikuta']
    },
    {
        img: '5.png',
        verb: 'Nukkua',
        sentence: 'Leopardi <strong>nukkuu</strong>.',
        conjsPos: ['minä nukun', 'sinä nukut', 'hän nukkuu', 'me nukumme', 'te nukutte', 'he nukkuvat', 'passiivi: nukutaan'],
        conjsNeg: ['en nuku', 'et nuku', 'ei nuku', 'emme nuku', 'ette nuku', 'eivät nuku', 'passiivi: ei nukuta']
    },
    {
        img: '6.png',
        verb: 'Haukotella',
        sentence: 'Leopardi <strong>haukottelee</strong>.',
        conjsPos: ['minä haukottelen', 'sinä haukottet', 'hän haukottelee', 'me haukottelemme', 'te haukottelette', 'he haukottelevat', 'passiivi: haukotellaan'],
        conjsNeg: ['en haukottele', 'et haukottele', 'ei haukottele', 'emme haukottele', 'ette haukottele', 'eivät haukottele', 'passiivi: ei haukotella']
    },
    {
        img: '7.png',
        verb: 'Lentää',
        sentence: 'Papukaija <strong>lentää</strong> taivaalla.',
        conjsPos: ['minä lennän', 'sinä lennät', 'hän lentää', 'me lennämme', 'te lennätte', 'he lentävät', 'passiivi: lennetään'],
        conjsNeg: ['en lennä', 'et lennä', 'ei lennä', 'emme lennä', 'ette lennä', 'eivät lennä', 'passiivi: ei lennetä']
    },
    {
        img: '8.png',
        verb: 'Syödä',
        sentence: 'Gorilla <strong>syö</strong> kasvia.',
        conjsPos: ['minä juon', 'sinä juot', 'hän juo', 'me juomme', 'te juotte', 'he juovat', 'passiivi: juodaan'],
        conjsNeg: ['en juo', 'et juo', 'ei juo', 'emme juo', 'ette juo', 'eivät juo', 'passiivi: ei juoda']
    },
    {
        img: '9.png',
        verb: 'Nuolla',
        sentence: 'Tiikeri <strong>nuolee</strong> käpälää.',
        conjsPos: ['minä nuolen', 'sinä nuolet', 'hän nuolee', 'me nuolemme', 'te nuolette', 'he nuolevat', 'passiivi: nuollaan'],
        conjsNeg: ['en nuole', 'et nuole', 'ei nuole', 'emme nuole', 'ette nuole', 'eivät nuole', 'passiivi: ei nuolla']
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

        let afterGameMsg = ''
        if (corrAnswers > 5) {
            afterGameMsg = 'Tiesit todella hyvin! Pääsit Verbiviidakon läpi!'
        } else {
            afterGameMsg = 'Et selvinnyt viidakosta, mutta ei hätää sillä harjoitus tekee mestarin! Kokeile uudestaan!'
        }
        scoreCount.innerHTML = '<b>Pisteesi: ' + corrAnswers + '/10.</b> ' + afterGameMsg
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
    corrAnswers = 0
    alreadyAsked = []
    symbolDiv.innerHTML = ''
    nextBtn.innerHTML = 'Seuraava'
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
                corrAnswers += 1
                popupTitle.innerHTML = 'Oikein!'
                updateSymbols('correct')
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
    question = ''
    do {
        question = questions[Math.floor(Math.random() * questions.length)]
    }
    while (alreadyAsked.includes(question) === true)
    alreadyAsked.push(question)
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