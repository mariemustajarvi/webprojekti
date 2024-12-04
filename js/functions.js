document.addEventListener("DOMContentLoaded", () => {
    // ympyrän/ellipsin kuvakkeiden asettelu
    const centerIcon = document.querySelector(".center-icon img")
    const outerIcons = document.querySelectorAll(".outer-icons img")

    const circleLayout = document.querySelector(".circle-layout")
    const circleWidth = circleLayout.offsetWidth / 2
    const circleHeight = circleLayout.offsetHeight / 2
    const centerX = circleWidth
    const centerY = circleHeight
    const totalIcons = outerIcons.length

    centerIcon.style.position = "absolute"
    centerIcon.style.left = `${centerX - centerIcon.offsetWidth / 2}px`
    centerIcon.style.top = `${centerY - centerIcon.offsetHeight / 2}px`

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
})
