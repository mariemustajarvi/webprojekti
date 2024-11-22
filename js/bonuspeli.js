document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    let timeLeft = 30;
    let timer;

    const verbs = ["juoksee", "syö", "haukkuu", "lentää", "rääkkää", "kiipeää", "uida", "sukeltaa", "mennä", "pyrkii"];
    const nonVerbs = ["kissa", "koira", "puu", "taivas", "järvi", "merikotka", "hevoset", "kalat", "linna", "taulu"];
    const allWords = [...verbs, ...nonVerbs];

    // Shuffle function for random word placement
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Check if two elements overlap
    function isOverlapping(element, existingElements) {
        const rect = element.getBoundingClientRect();
        for (let otherElement of existingElements) {
            const otherRect = otherElement.getBoundingClientRect();
            if (!(rect.right < otherRect.left || rect.left > otherRect.right || rect.bottom < otherRect.top || rect.top > otherRect.bottom)) {
                return true; // There is an overlap
            }
        }
        return false; // No overlap
    }

    // Display words
    function displayWords() {
        shuffle(allWords);
        const container = document.getElementById("words-container");
        container.innerHTML = ""; // Clear previous words
        const existingElements = []; // Array to store placed elements

        allWords.forEach(word => {
            const wordElement = document.createElement("button");
            wordElement.textContent = word;
            wordElement.classList.add("word-button");

            let top, left, attempts = 0;

            // Try random placement and ensure no overlap
            do {
                // Calculate random position with space for the button
                top = `${Math.random() * (80)}%`;  // Ensuring space at the bottom
                left = `${Math.random() * (80)}%`; // Ensuring space at the right

                wordElement.style.top = top;
                wordElement.style.left = left;
                attempts++;

                // Prevent infinite loops if it can't find a good spot
                if (attempts > 50) {
                    break; 
                }
            } while (isOverlapping(wordElement, existingElements));

            existingElements.push(wordElement); // Add the element to the list of placed elements
            wordElement.onclick = () => checkAnswer(wordElement, word);
            container.appendChild(wordElement);
        });
    }

    // Check if the answer is correct
    function checkAnswer(button, word) {
        if (verbs.includes(word)) {
            button.style.backgroundColor = "green";
            button.style.color = "white"; // Tekstin väri valkoiseksi
            score += 3;
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white"; // Tekstin väri valkoiseksi
            score -= 3;
        }
        button.disabled = true;
        updateScore();
    }
    

    // Update score
    function updateScore() {
        document.getElementById("score").textContent = `Pisteet: ${score}`;
    }

    // Timer
    function startTimer() {
        const timeDisplay = document.getElementById("time-left");
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timeDisplay.textContent = `Aikaa jäljellä: ${timeLeft}`;
            } else {
                clearInterval(timer);
                alert("Aika loppui! Peli päättyi.");
                document.getElementById("words-container").style.display = "none";
            }
        }, 1000);
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
