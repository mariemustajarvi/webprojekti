'use strict'

import { getAllScores, gameIsBeaten } from './scores.js'

const scores = getAllScores()

const scoreList = document.querySelector('#scoreList')

let sList = ''

Object.keys(scores).forEach(e => {
    let lapiviesti = 'Ei.'
    if (gameIsBeaten(e)) {
        lapiviesti = 'Kyllä!'
    }
    sList += `<li>${e}: ${scores[e].score}. Peli läpäisty: ${lapiviesti}</li>`
});

scoreList.innerHTML = sList