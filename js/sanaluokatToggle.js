'use strict'

import { getAllScores, gameIsBeaten } from './scores.js'

function toggleSanaluokatNav() {
    // haetaan kaikki pelit ja niiden pisteet
    const scores = getAllScores()

    // tarkistetaan onko kaikki muut pelit (paitsi Sanaluokat) voitettu
    let bonusUnlocked = true
    for (let game in scores) {
        if (game !== 'sanaluokat' && !gameIsBeaten(game)) {
            bonusUnlocked = false
            break
        }
    }
    
    // päivitetäään Sanaluokat-navigaatiokohdan näkyvyys
    const sanaluokatNav = document.querySelector('a[href="bonusetusivu.html"')
    
    if (sanaluokatNav) {
        if (!bonusUnlocked) {
            sanaluokatNav.style.pointerEvents = 'none'
            sanaluokatNav.style.color = 'grey'
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    toggleSanaluokatNav()
})