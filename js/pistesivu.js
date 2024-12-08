'use strict'

import { getAllScores, gameIsBeaten } from './scores.js'

const scores = getAllScores()

const scoreList = document.querySelector('#scoreList')

let sList = ''

Object.keys(scores).forEach(e => {
    // Käydään kaikki pelit läpi ja lisätään listaan.
    // Jos peli ei ole menty läpi, pelin läpäisyä osottavaa tähteä ei näytetä, joten lisätään tähtikuvaan class hidden.
    sList += `<li><img class="starPic${gameIsBeaten(e) ? '' : ' hidden'}" src="./images/pistesivu/star.png"></img><img class="gamePic" src='./images/pistesivu/${scores[e].gameIcon}'></img><p class="anton-regular">${scores[e].score}</p></li>`
});

scoreList.innerHTML = sList