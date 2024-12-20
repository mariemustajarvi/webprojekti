import { setScore } from './scores.js'

let score = 0; // Globaali pisteiden muuttuja

// Lataa tallennetut pisteet localStoragesta
function loadScore() {
    const savedScore = localStorage.getItem('playerScore');
    return savedScore ? parseInt(savedScore, 10) : 0; // Palautetaan tallennetut pisteet tai 0
}

// Päivittää pisteet käyttöliittymässä
function updateScoreUI() {
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
        scoreElement.textContent = `Pisteet: ${score}`;
    }
}

// Tallentaa pisteet localStorageen
function saveScore() {
    localStorage.setItem('playerScore', score);
}

// Päivittää pisteet ja tallentaa ne
function updateScore() {
    saveScore();
    updateScoreUI();
}

// Kutsutaan, kun sivu ladataan
document.addEventListener("DOMContentLoaded", () => {
    score = loadScore(); // Lataa tallennetut pisteet ja aseta ne globaaliin muuttujaan
    updateScoreUI(); // Päivitä pisteet käyttöliittymässä aloituksessa

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
        container.innerHTML = ""; // Tyhjennetään aiemmat sanat
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
            score += 1; // Lisää piste
            correctNumerals++;
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white";
            if (score > 0) score -= 1; // Vähennä piste, jos vastaus on väärin
        }
        button.disabled = true; // Estä painikkeen käyttö uudelleen
        updateScore(); // Päivitä käyttöliittymä ja tallennetaan pisteet
        checkCompletion(); // Tarkista, onko peli päättynyt
    }

    function checkCompletion() {
        if (correctNumerals === numerals.length || timeLeft <= 0) {
            clearInterval(timer);
            saveScore(); // Tallennetaan pisteet pelin lopussa
            setScore('sanaluokat', score)
            showCompletionPopup();
        }
    }

    function showCompletionPopup() {
        gameOver = true; // Lopetetaan peli
        const overlay = document.getElementById("overlay");
        if (overlay) overlay.style.display = "block";

        const popup = document.getElementById("end-popup");
        if (popup) {
            popup.style.display = "block";
            document.getElementById("final-score-display").textContent = `${score}/${maxScore}`;

            // Lisätään tsemppiviesti
            const messageElement = document.getElementById("final-message");
            if (messageElement) {
                let message = "";
                if (score >= 45) {
                    message = "Uskomaton suoritus! Olet mestari!";
                } else if (score >= 40) {
                    message = "Mahtavaa! Olet todella taitava!";
                } else if (score >= 30) {
                    message = "Hyvin meni! Vielä hieman treeniä!";
                } else {
                    message = "Ei hätää, harjoitus tekee mestarin!";
                }
                messageElement.textContent = message;
            }
        }
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
