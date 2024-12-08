'use strict'

// Pisteet sisältävän objektin pohja.
const scoreObj = {
    verbi: {score: 0, scoreReq: 6, gameIcon: 'verbi.png'},
    substantiivi: {score: 0, scoreReq: 6, gameIcon: 'substantiivi.png'},
    adjektiivi: {score: 0, scoreReq: 3, gameIcon: 'adjektiivi.png'},
    numeraali: {score: 0, scoreReq: 24, gameIcon: 'numeraali.png'},
    pronomini: {score: 0, scoreReq: 6, gameIcon: 'pronomini.png'},
    sanaluokat: {score: 0, scoreReq: 6, gameIcon: 'sanaluokat.png'}
}

let scores = {}

const updateScores = () => {
    // Haetaan pisteet localstoragesta.
    scores = JSON.parse(localStorage.getItem('scores'))
    
    // Jos pisteitä ei löydy localstoragesta, kopioidaan scoreObj objektin rakenne scoresiin.
    if (!scores) {
        // Käytetään spread operaattoria koska emme halua vain asettaa scorea referoimaan scoreObjectiin vaan haluamme vain kopioida
        // scoreObjectin arvot scoreen.
        scores = {...scoreObj}
    }
}

// Tämä funktio tarkistaa että peli jonka pisteitä yritetään hakea tai tallentaa
// on olemassa, eikä ole esimerkiksi kirjoitettu pelin nimeä väärin vahingossa.
const gameExists = (game) => {
    updateScores()
    if (!scores[game]) {
        console.error('Game ' + game + ' does not exist!')
        return false
    }
    return true
}

export const setScore = (game, newScore) => {
    updateScores()
    
    if (gameExists(game)) {
        // Tallennetaan pisteet mikäli uudet pisteet ovat isommat kuin vanhat.
        if (newScore > scores[game].score) {
            scores[game].score = newScore;
            localStorage.setItem('scores', JSON.stringify(scores))
        }
    }
}

export const getAllScores = () => {
    updateScores()
    return scores;
}

export const getScore = (game) => {
    updateScores()

    if (gameExists(game)) {
        return scores[game]
    }
}

export const gameIsBeaten = (game) => {
    updateScores()

    if (gameExists(game)) {
        if (scores[game].score >= scores[game].scoreReq) {
            return true
        } else {
            return false
        }
    }
}