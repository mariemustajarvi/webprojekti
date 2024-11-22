document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    let timeLeft = 30;
    let timer;
    let correctVerbs = 0; // Track correct verbs
    let correctNouns = 0; // Track correct nouns
    let currentPhase = "verbs"; // Initial phase is "verbs"
    let gameOver = false; // Track whether the game is over

    const verbs = ["juosta", "syödä", "olla", "nukkua", "puhua", "lukea", "kirjoittaa", "pelata", "katsoa", "piirtää"];
    const nonVerbs = ["iso", "koira", "ensimmäinen", "se", "puussa", "keltainen", "pallo", "iloinen", "hauskasti", "kesä"];
    const allWords = [...verbs, ...nonVerbs];
    const nouns = ["kissa", "pallo", "kesä", "karkki", "avaruus", "huvipuisto", "taikuri", "auto", "koulu", "peli"];
    const nonNouns = ["hyvä", "nopea", "syödä", "se", "kolmas", "tanssia", "miettiä", "hauskasti", "vihreä", "tämä"]; // Fake nouns

    // Shuffle function for random word placement
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Display words
    function displayWords() {
        if (gameOver) return; // Prevent interaction if the game is over

        const container = document.getElementById("words-container");
        container.innerHTML = ""; // Clear previous words
        const existingElements = []; // Array to store placed elements

        const wordsToDisplay = currentPhase === "verbs" ? allWords : nouns.concat(nonNouns); // Include fake nouns in noun phase
        shuffle(wordsToDisplay);

        wordsToDisplay.forEach(word => {
            const wordElement = document.createElement("button");
            wordElement.textContent = word;
            wordElement.classList.add("word-button");
            wordElement.style.position = "absolute";

            let top, left, attempts = 0;

            // Add element to DOM temporarily to measure its size
            container.appendChild(wordElement);

            // Try random placement and ensure no overlap
            do {
                top = Math.random() * (container.offsetHeight - wordElement.offsetHeight);
                left = Math.random() * (container.offsetWidth - wordElement.offsetWidth);

                wordElement.style.top = `${top}px`;
                wordElement.style.left = `${left}px`;

                attempts++;

                // Prevent infinite loops if no valid position is found
                if (attempts > 100) {
                    console.warn("Unable to place word without overlap.");
                    break;
                }
            } while (isOverlapping(wordElement, existingElements));

            // Add placed word to the list
            existingElements.push(wordElement);
            wordElement.onclick = () => checkAnswer(wordElement, word);
        });
    }

    // Check if two elements overlap
    function isOverlapping(element, existingElements) {
        const rect = element.getBoundingClientRect();

        return existingElements.some(otherElement => {
            const otherRect = otherElement.getBoundingClientRect();
            return !(
                rect.right < otherRect.left || 
                rect.left > otherRect.right || 
                rect.bottom < otherRect.top || 
                rect.top > otherRect.bottom
            );
        });
    }


// Check if the answer is correct
function checkAnswer(button, word) {
    if (gameOver) return; // Prevent interaction if the game is over

    if (currentPhase === "verbs") {
        if (verbs.includes(word)) {
            button.style.backgroundColor = "green";
            button.style.color = "white";
            score += 1;
            correctVerbs++;
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white";
            if (score > 0) {
                score -= 1; // Deduct 1 point for incorrect answer, but ensure score doesn't go negative
            }
        }
    } else if (currentPhase === "nouns") {
        if (nouns.includes(word)) {
            button.style.backgroundColor = "green";
            button.style.color = "white";
            score += 1;
            correctNouns++;
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white";
            if (score > 0) {
                score -= 1; // Deduct 1 point for incorrect answer, but ensure score doesn't go negative
            }
        }
    }
    button.disabled = true;
    updateScore();
    checkPhaseTransition(); // Check if we need to move to the next phase
}



    // Check if all verbs or nouns have been selected or time is up, and move to next phase
    function checkPhaseTransition() {
        if (currentPhase === "verbs" && correctVerbs === verbs.length) {
            clearInterval(timer); // Stop timer when all verbs are selected
            startNounPhase();
        } else if (currentPhase === "verbs" && timeLeft <= 0) {
            clearInterval(timer);
            startNounPhase();
        } else if (currentPhase === "nouns" && correctNouns === nouns.length) {
            clearInterval(timer); // Stop timer when all nouns are selected
            showCompletionPopup();
        } else if (currentPhase === "nouns" && timeLeft <= 0) {
            clearInterval(timer);
            showCompletionPopup(); // Show completion message when time runs out
        }
    }

// Show the completion popup when the nouns phase ends
function showCompletionPopup() {
    gameOver = true; // Set gameOver to true to stop further interaction
    const popup = document.getElementById("completion-popup");
    const overlay = document.getElementById("overlay");
    popup.style.display = "block"; // Show popup
    overlay.style.display = "block"; // Show overlay (taustan himmennys)
    document.getElementById("score-display").textContent = `${score} / 20`; // Display score and max score
}


    
    // Start the timer
    function startTimer() {
        const timeDisplay = document.getElementById("time-left");
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timeDisplay.textContent = `Aikaa jäljellä: ${timeLeft}`;
                if (timeLeft <= 10) {
                    timeDisplay.classList.add('sykkiva');
                }
            } else {
                clearInterval(timer);
                timeDisplay.classList.remove('sykkiva');
                checkPhaseTransition(); // Automatically move to next phase when time runs out
            }
        }, 1000);
    }

    // Start noun phase
    function startNounPhase() {
        currentPhase = "nouns"; // Change to noun phase
        correctVerbs = 0; // Reset verb counter
        timeLeft = 30; // Reset timer

        // Hide verb phase title and show noun phase title
        document.getElementById("game-title").style.display = "none";
        document.getElementById("game-title-substantiivit").style.display = "block"; // Show noun phase title

        displayWords(); // Display nouns
        startTimer(); // Start new timer for noun phase
    }

    // Update score
    function updateScore() {
        document.getElementById("score").textContent = `Pisteet: ${score}`;
    }

    // Start game
    function startGame() {
        document.getElementById("game-title").style.display = "block";
        document.getElementById("score-container").style.display = "flex";
        document.getElementById("words-container").style.display = "block";
        startTimer();
        displayWords();
    }

    // Initialize game
    startGame();
});
