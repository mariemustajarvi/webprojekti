'use strict'
import { toggleSanaluokatNav } from './path/to/sanaluokatToggle.js'
import { getAllScores, gameIsBeaten } from './scores.js'

const scores = getAllScores()
let bonusUnlocked = true
for (let game in scores) {
    if (game !== 'sanaluokat') {
        if (!gameIsBeaten(game)) {
            bonusUnlocked = false
            break
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    toggleSanaluokatNav()
    const centerIcon = document.querySelector(".center-icon img")
    const outerIcons = document.querySelectorAll(".outer-icons img")
    const overlay = document.querySelector(".center-icon .overlay")

    if (bonusUnlocked) {
        overlay.classList.remove('disabledIcon')
    }

    // ymyprän asettelu
    const circleLayout = document.querySelector(".circle-layout")
    const circleWidth = circleLayout.offsetWidth / 2 // ovaalin vaakasäde
    const circleHeight = circleLayout.offsetHeight / 2 // ovaalin pystysäde
    const centerX = circleWidth; // keskipiste X
    const centerY = circleHeight; // keskipiste Y
    const totalIcons = outerIcons.length; // ulkokehän kuvakkeiden määrää

    // keskimmäisen kuvakkeen säätö
    centerIcon.style.position = "absolute"
    centerIcon.style.left = `${centerX - centerIcon.offsetWidth / 2}px`
    centerIcon.style.top = `${centerY - centerIcon.offsetHeight / 2}px`

    // ulkokehän kuvakkeet ovaalin/ympyrän kehälle
    outerIcons.forEach((icon, index) => {
        const angle = (index / totalIcons) * 2 * Math.PI
        const x = centerX + (circleWidth - icon.offsetWidth / 2) * Math.cos(angle) - icon.offsetWidth / 2
        const y = centerY + (circleHeight - icon.offsetHeight / 2) * Math.sin(angle) - icon.offsetHeight / 2

        icon.style.position = "absolute"
        icon.style.left = `${x}px`
        icon.style.top = `${y}px`
    });

    window.addEventListener("resize", () => {
        const newCircleWidth = circleLayout.offsetWidth / 2
        const newCircleHeight = circleLayout.offsetHeight / 2
        const newCenterX = newCircleWidth
        const newCenterY = newCircleHeight

        centerIcon.style.left = `${newCenterX - centerIcon.offsetWidth / 2}px`
        centerIcon.style.top = `${newCenterY - centerIcon.offsetHeight / 2}px`

        outerIcons.forEach((icon, index) => {
            const angle = (index / totalIcons) * 2 * Math.PI
            const x = newCenterX + (newCircleWidth - icon.offsetWidth / 2) * Math.cos(angle) - icon.offsetWidth / 2
            const y = newCenterY + (newCircleHeight - icon.offsetHeight / 2) * Math.sin(angle) - icon.offsetHeight / 2

            icon.style.left = `${x}px`
            icon.style.top = `${y}px`
        });
    });

    /*
    let userPoints = 0
    const requiredPoints = 10

    const overlay = document.querySelector(".center-icon .overlay")
    const scoreDisplay = document.getElementById("score")

    function updateOverlay() {
        if (userPoints >= requiredPoints) {
            overlay.classList.add("hidden")
            overlay.style.pointerEvents = "auto"
        } else {
            overlay.classList.remove("hidden")
            overlay.style.pointerEvents = "none"
        }
    }

    function addPoints(points) {
        userPoints += points
        console.log(`Pisteet: ${userPoints}`)
        updateScoreDisplay()
        updateOverlay()
    }

    function updateScoreDisplay() {
        if (scoreDisplay) {
            scoreDisplay.textContent = userPoints
        }
    }

    outerIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            addPoints(2);
        })
    })

    updateScoreDisplay()
    updateOverlay()
    */
})
