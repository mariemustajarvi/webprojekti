'use strict'

import { getAllScores, gameIsBeaten } from './scores.js'

export function toggleSanaluokatNav() {
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
    const sanaluokatNav = document.querySelector(".sanaluokat-nav")
    if (sanaluokatNav) {
        if (bonusUnlocked) {
            sanaluokatNav.classList.remove("hidden") // näytä
        } else {
            sanaluokatNav.classList.add("hidden") // piilota
        }
    }
}

console.log('Scores:', scores)
console.log('Bonus Unlocked:', bonusUnlocked)
