const startButton = document.getElementById("start-button")
const startGame = document.getElementById("startgame-container")
const game = document.getElementById("game-container")



startButton.addEventListener("click", () => {
    startGame.style.display = "none"
    game.style.display = "block"
}
)
