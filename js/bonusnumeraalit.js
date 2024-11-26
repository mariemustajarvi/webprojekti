// Lataa tallennetut pisteet localStoragesta
function loadScore() {
    let score = localStorage.getItem('playerScore');
    if (score !== null) {
        document.getElementById('score').innerText = `Pisteet: ${score}`;
        return parseInt(score); // Palautetaan ladatut pisteet
    }
    return 0; // Jos ei ole tallennettu, palauta 0
}

// Tallenna pistemäärä localStorageen
function saveScore(score) {
    localStorage.setItem('playerScore', score);
}

// Päivittää pisteet ja tallentaa ne localStorageen
function updateScore() {
    document.getElementById("score").textContent = `Pisteet: ${score}`;
    saveScore(score); // Tallenna pisteet joka kerta, kun niitä päivitetään
}

document.addEventListener("DOMContentLoaded", () => {
    let score = loadScore(); // Käytä aiemmin tallennettuja pisteitä
    const maxScore = 50; // Maksimipisteet pelille
    let timeLeft = 30;
    let timer;
    let correctNumerals = 0; // Oikeiden numeraalien määrä
    let gameOver = false; // Estetään pelin jatkuminen, kun peli päättyy

    const numerals = ["yksi", "ensimmäinen", "kolme", "viides", "miljoona", "199", "seitsemän", "nolla", "toinen", "kymmenen"];
    const nonNumerals = ["punainen", "talo", "hän", "se", "juosta", "iso", "nopea", "auto", "kirja", "koira"];
    const allWords = [...numerals, ...nonNumerals];

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

        shuffle(allWords);

        allWords.forEach(word => {
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

        if (numerals.includes(word)) {
            button.style.backgroundColor = "green";
            button.style.color = "white";
            score += 1;
            correctNumerals++;
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white";
            if (score > 0) score -= 1; // Vähennä piste, jos vastaus on väärin
        }
        button.disabled = true;
        updateScore();
        checkCompletion();
    }

    function checkCompletion() {
        if (correctNumerals === numerals.length) {
            clearInterval(timer);
            showCompletionPopup();
        } else if (timeLeft <= 0) {
            clearInterval(timer);
            showCompletionPopup();
        }
    }

    function showCompletionPopup() {
        gameOver = true; // Estää pelin jatkumisen
        const overlay = document.getElementById("overlay");
        overlay.style.display = "block"; // Näytä taustakerros
        const popup = document.getElementById("numeral-popup"); // Numeralit popup
        popup.style.display = "block"; // Näytä ponnahdusikkuna
        document.getElementById("numeral-score-display").textContent = `${score}/${maxScore}`;
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
                checkCompletion();
            }
        }, 1000);
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
