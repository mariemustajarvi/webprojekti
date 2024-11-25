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

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function displayWords() {
        if (gameOver) return;

        const container = document.getElementById("words-container");
        container.innerHTML = ""; 
        const existingElements = []; 

        const wordsToDisplay = currentPhase === "verbs" ? allWords : nouns.concat(nonNouns);
        shuffle(wordsToDisplay);

        wordsToDisplay.forEach(word => {
            const wordElement = document.createElement("button");
            wordElement.textContent = word;
            wordElement.classList.add("word-button");
            wordElement.style.position = "absolute";

            let top, left, attempts = 0;

            container.appendChild(wordElement);

            do {
                top = Math.random() * (container.offsetHeight - wordElement.offsetHeight);
                left = Math.random() * (container.offsetWidth - wordElement.offsetWidth);

                wordElement.style.top = `${top}px`;
                wordElement.style.left = `${left}px`;

                attempts++;
                if (attempts > 100) {
                    console.warn("Unable to place word without overlap.");
                    break;
                }
            } while (isOverlapping(wordElement, existingElements));

            existingElements.push(wordElement);
            wordElement.onclick = () => checkAnswer(wordElement, word);
        });
    }

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

    function checkAnswer(button, word) {
        if (gameOver) return;

        if (currentPhase === "verbs") {
            if (verbs.includes(word)) {
                button.style.backgroundColor = "green";
                button.style.color = "white";
                score += 1;
                correctVerbs++;
            } else {
                button.style.backgroundColor = "red";
                button.style.color = "white";
                if (score > 0) score -= 1; // Decrease score by 1 for wrong answers
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
                if (score > 0) score -= 1; // Decrease score by 1 for wrong answers
            }
        }
        button.disabled = true;
        updateScore();
        checkPhaseTransition();
    }

    function checkPhaseTransition() {
        if (currentPhase === "verbs" && correctVerbs === verbs.length) {
            clearInterval(timer);
            showVerbCompletionPopup();
        } else if (currentPhase === "verbs" && timeLeft <= 0) {
            clearInterval(timer);
            showVerbCompletionPopup();
        } else if (currentPhase === "nouns" && correctNouns === nouns.length) {
            clearInterval(timer);
            showCompletionPopup();
        } else if (currentPhase === "nouns" && timeLeft <= 0) {
            clearInterval(timer);
            showCompletionPopup();
        }
    }

    function showVerbCompletionPopup() {
        const popup = document.getElementById("verbi-popup");
        popup.style.display = "block";
        document.getElementById("verbi-score-display").textContent = score;

        document.getElementById("verbi-next-phase").onclick = () => {
            popup.style.display = "none";
            startNounPhase();
        };
    }

    function showCompletionPopup() {
        gameOver = true;
        const popup = document.getElementById("completion-popup");
        popup.style.display = "block";
        document.getElementById("score-display").textContent = `${score} / 20`;
    }

    function startTimer() {
        const timeDisplay = document.getElementById("time-left");
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timeDisplay.textContent = `Aikaa jäljellä: ${timeLeft}`;
                if (timeLeft <= 10) timeDisplay.classList.add('sykkiva');
            } else {
                clearInterval(timer);
                timeDisplay.classList.remove('sykkiva');
                checkPhaseTransition();
            }
        }, 1000);
    }

    function startNounPhase() {
        currentPhase = "nouns";
        timeLeft = 30;

        document.getElementById("game-title").style.display = "none";
        document.getElementById("game-title-substantiivit").style.display = "block";

        displayWords();
        startTimer();
    }

    function updateScore() {
        document.getElementById("score").textContent = `Pisteet: ${score}`;
    }

    function startGame() {
        document.getElementById("game-title").style.display = "block";
        document.getElementById("score-container").style.display = "flex";
        document.getElementById("words-container").style.display = "block";
        startTimer();
        displayWords();
    }

    startGame();
});