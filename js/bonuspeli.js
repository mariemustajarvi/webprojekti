document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    let timeLeft = 30;
    let timer;

    const verbs = ["juosta", "syödä", "olla", "nukkua", "puhua", "lukea", "kirjoittaa", "pelata", "katsoa", "piirtää"];
    const nonVerbs = ["iso", "koira", "ensimmäinen", "se", "puussa", "keltainen", "pallo", "iloinen", "hauskasti", "kesä"];
    const allWords = [...verbs, ...nonVerbs];

    // Shuffle function for random word placement
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
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
        if (verbs.includes(word)) {
            button.style.backgroundColor = "green";
            button.style.color = "white";
            score += 3;
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white";
            score -= 3;
        }
        button.disabled = true;
        updateScore();
    }

    // Update score
    function updateScore() {
        document.getElementById("score").textContent = `Pisteet: ${score}`;
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
