// start-painikkeen toiminnallisuus
const startButton = document.getElementById("start-button")
const startGame = document.getElementById("startgame-container")
const game = document.getElementById("game-container")

startButton.addEventListener("click", () => {
    startGame.style.display = "none"
    game.style.display = "block"
})

// drag-and-drop
document.addEventListener("DOMContentLoaded", () => {
    const upperParts = document.querySelectorAll("#upper-parts .draggable")
    const bottomParts = document.getElementById("bottom-parts")
    const scoreDisplay = document.getElementById("score")
    let score = 0
    const totalPairs = 5

    // raahattavat laatikot yläosaan
    upperParts.forEach((item) => {
        const randomX = Math.random() * (window.innerWidth - 100)
        const randomY = Math.random() * (window.innerHeight / 2)
        item.style.left = `${randomX}px`
        item.style.top = `${randomY}px`
        item.style.position = "absolute"
        item.setAttribute("draggable", true)
    })

    // raahauslogiikka
    upperParts.forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", e.target.id)
        })
    })

    
    bottomParts.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    bottomParts.addEventListener("drop", (e) => {
        e.preventDefault()


        const draggedItemId = e.dataTransfer.getData("text")
        const draggedItem = document.getElementById(draggedItemId)


        let targetBox = e.target.closest(".col-md-2")
        if (!targetBox && e.target.tagName === "IMG") {
            targetBox = e.target.parentElement.closest(".col-md-2")
        }

        if (targetBox) {
            const targetValue = targetBox.getAttribute("data-value")
            const draggedValue = draggedItem.getAttribute("data-value")

            if (targetValue === draggedValue) {

                targetBox.style.position = "relative"
                draggedItem.style.position = "absolute"
                draggedItem.style.left = "50%"
                draggedItem.style.top = "50%"
                draggedItem.style.transform = "translate(-50%, -50%)"
                targetBox.appendChild(draggedItem)

                score++
                scoreDisplay.textContent = score

                if (score === totalPairs) {
                    setTimeout(() => {
                        alert("Kaikki parit yhdistetty! Hyvä työ!")
                    }, 500); 
                }
            } else {
                alert("Väärä pari, yritä uudelleen!")
            }
        }
    })
})