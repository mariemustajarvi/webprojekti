// start-painikkeen toiminnallisuus
const startButton = document.getElementById("start-button")
const startGame = document.getElementById("startgame-container")
const game = document.getElementById("game-container")

startButton.addEventListener("click", () => {
    startGame.style.display = "none"
    game.style.display = "block"
})

document.addEventListener("DOMContentLoaded", () => {
    const upperParts = document.getElementById("upper-parts")
    const bottomParts = document.getElementById("bottom-parts")
    const scoreDisplay = document.getElementById("score")
    const totalPairsDisplay = document.getElementById("total-pairs")
    const notification = document.getElementById("notification")
    const finalBox = document.getElementById("final-box")
    const finalScore = document.getElementById("final-score")

    let score = 0
    let currentRound = 1

    const rounds = [
        {
            correctBoxes: [
                { text: "Tuhat", value: "1000" },
                { text: "Kolme", value: "3" },
                { text: "Nolla", value: "0" },
                { text: "Kolmekymmentä", value: "30" },
                { text: "Sata", value: "100" },
                { text: "Kaksikymmentäkaksi", value: "22" },
                { text: "Viisitoista", value: "15" },
                { text: "Kaksi", value: "2" },
            ],
            extraBoxes: [
                { text: "Kolmetoista", value: "13" },
                { text: "Neljäkymmentä", value: "40" },
                { text: "Yhdeksän", value: "9" },
                { text: "Viisi", value: "5" },
            ],
        },
        {
            correctBoxes: [
                { text: "Miljoona", value: "1000000" },
                { text: "Seitsemän", value: "7" },
                { text: "Viisikymmentä", value: "50" },
                { text: "Satatuhatta", value: "100000" },
                { text: "Kymmenen", value: "10" },
                { text: "Kaksikymmentä", value: "20" },
                { text: "Sata", value: "100" },
                { text: "Kolmekymmentäkolme", value: "33" },
            ],
            extraBoxes: [
                { text: "Kaksisataa", value: "200" },
                { text: "Kahdeksan", value: "8" },
                { text: "Viisituhatta", value: "5000" },
                { text: "Neljäkymmentäkaksi", value: "42" },
            ],
        },
        {
            correctBoxes: [
                { text: "Kaksituhatta", value: "2000" },
                { text: "Kahdeksan", value: "8" },
                { text: "Kolmekymmentäkahdeksan", value: "38" },
                { text: "Neljätoista", value: "14" },
                { text: "Yksitoista", value: "11" },
                { text: "Yhdeksän", value: "9" },
                { text: "Seitsemäntoista", value: "17" },
                { text: "Kolmekymmentä", value: "30" },
            ],
            extraBoxes: [
                { text: "Viisi", value: "5" },
                { text: "Neljä", value: "4" },
                { text: "Kolmesataa", value: "300" },
                { text: "Kaksikymmentäkahdeksan", value: "28" },
            ],
        },
    ]

    const totalScore = rounds.reduce((sum, round) => sum + round.correctBoxes.length, 0)

    function showFinalResults() {
        finalScore.textContent = `${score} / ${totalScore}`
        finalBox.style.display = "block"
        upperParts.style.display = "none"
        bottomParts.style.display = "none"
    }

    function startRound(roundIndex) {
        const round = rounds[roundIndex]
        upperParts.innerHTML = ""
        bottomParts.innerHTML = ""

        round.correctBoxes.forEach((box) => {
            const targetBox = document.createElement("div")
            targetBox.classList.add("target-box")
            targetBox.setAttribute("data-value", box.value)
            targetBox.innerHTML = `<p class="anton-regular">${box.value}</p>`
            bottomParts.appendChild(targetBox)
        })

        const allBoxes = [...round.correctBoxes, ...round.extraBoxes]
        allBoxes.sort(() => Math.random() - 0.5)

        const placedPositions = []
        allBoxes.forEach((box) => {
            const draggableBox = document.createElement("div")
            draggableBox.classList.add("draggable-box")
            draggableBox.setAttribute("data-value", box.value)
            draggableBox.setAttribute("draggable", "true")
            draggableBox.innerHTML = `<p class="anton-regular">${box.text}</p>`

            let left, top, isOverlapping
            do {
                left = Math.random() * (window.innerWidth - 200)
                top = Math.random() * (window.innerHeight / 2 - 100)
                isOverlapping = placedPositions.some(
                    (pos) =>
                        Math.abs(pos.left - left) < 100 && Math.abs(pos.top - top) < 50
                )
            } while (isOverlapping)

            placedPositions.push({ left, top })
            draggableBox.style.position = "absolute"
            draggableBox.style.left = `${left}px`
            draggableBox.style.top = `${top}px`

            upperParts.appendChild(draggableBox)
        })

        scoreDisplay.textContent = `${score} / ${totalScore}`
        addDragAndDropEvents()
    }

    function addDragAndDropEvents() {
        const draggableBoxes = document.querySelectorAll(".draggable-box")
        const targetBoxes = document.querySelectorAll(".target-box")

        draggableBoxes.forEach((item) => {
            item.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text", e.target.dataset.value)
            })
        })

        targetBoxes.forEach((box) => {
            box.addEventListener("dragover", (e) => {
                e.preventDefault()
            })

            box.addEventListener("drop", (e) => {
                e.preventDefault()

                const draggedValue = e.dataTransfer.getData("text")
                const targetValue = box.getAttribute("data-value")

                if (draggedValue === targetValue) {
                    const draggedItem = document.querySelector(
                        `.draggable-box[data-value="${draggedValue}"]`
                    )

                    if (draggedItem) {
                        draggedItem.parentNode.removeChild(draggedItem)
                        score++
                        scoreDisplay.textContent = `${score} / ${totalScore}`
                        showNotification("Oikein!", "success");

                        if (
                            score % rounds[currentRound - 1].correctBoxes.length === 0 &&
                            score !== 0
                        ) {
                            if (currentRound < rounds.length) {
                                currentRound++
                                setTimeout(() => {
                                    startRound(currentRound - 1)
                                }, 1000)
                            } else {
                                setTimeout(showFinalResults, 1000)
                            }
                        }
                    }
                } else {
                    showNotification("Väärä pari, yritä uudelleen!", "error")
                }
            })
        })
    }

    function showNotification(message, type) {
        notification.textContent = message
        notification.className =
            type === "success" ? "notification success" : "notification error"
        notification.style.opacity = 1

        setTimeout(() => {
            notification.style.opacity = 0
        }, 2000)
    }

    startRound(0)
})
