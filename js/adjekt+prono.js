// Lataa tallennetut pisteet localStoragesta
function loadScore() {
    let score = localStorage.getItem('playerScore');
    if (score !== null) {
        document.getElementById('score').innerText = `Pisteet: ${score}`;
        return parseInt(score); // Palautetaan ladatut pisteet
    }
    return 0; // Jos ei ole tallennettu, palauta 0
}

// Lataa pisteet, kun sivu ladataan
window.onload = () => {
    score = loadScore(); // Aseta ladatut pisteet 'score' muuttujaan
    loadScore(); // Päivitä näkyviin pisteet heti
};

// Tallenna pistemäärä localStorageen
function saveScore(score) {
    localStorage.setItem('playerScore', score);
}

// Päivittää pisteet ja tallentaa ne localStorageen
function updateScore() {
    document.getElementById("score").textContent = `Pisteet: ${score}`;
    saveScore(score);  // Tallenna pisteet joka kerta, kun niitä päivitetään
}

document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    const maxScore = 50; // Maksimipisteet pelille
    let timeLeft = 30;
    let timer;
    let correctAdjectives = 0; // Track correct adjectives
    let correctPronouns = 0; // Track correct pronouns
    let currentPhase = "adjectives"; // Initial phase is "adjectives"
    let gameOver = false; // Track whether the game is over

    const adjectives = ["iso", "pieni", "kaunis", "nopea", "hiljainen", "punainen", "ystävällinen", "älykäs", "mukava", "vihreä"];
    const nonAdjectives = ["kissa", "hän", "me", "talo", "yksi", "tämä", "juosta", "pallo", "puu", "nukkua"];
    const allWords = [...adjectives, ...nonAdjectives];
    const pronouns = ["hän", "me", "te", "se", "tämä", "tuo", "nämä", "joka", "kuka", "mikä"];
    const nonPronouns = ["hyvä", "nopea", "kaunis", "iso", "keltainen", "talo", "auto", "kirja", "kesä", "peli"]; // Fake pronouns

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

        const wordsToDisplay = currentPhase === "adjectives" ? allWords : pronouns.concat(nonPronouns);
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

        if (currentPhase === "adjectives") {
            if (adjectives.includes(word)) {
                button.style.backgroundColor = "green";
                button.style.color = "white";
                score += 1;
                correctAdjectives++;
            } else {
                button.style.backgroundColor = "red";
                button.style.color = "white";
                if (score > 0) score -= 1; // Decrease score by 1 for wrong answers
            }
        } else if (currentPhase === "pronouns") {
            if (pronouns.includes(word)) {
                button.style.backgroundColor = "green";
                button.style.color = "white";
                score += 1;
                correctPronouns++;
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
        if (currentPhase === "adjectives") {
            if (correctAdjectives === adjectives.length) {
                clearInterval(timer);
                showAdjectiveCompletionPopup();
            } else if (timeLeft <= 0) {
                clearInterval(timer);
                showAdjectiveCompletionPopup();
            }
        } else if (currentPhase === "pronouns") {
            if (correctPronouns === pronouns.length) {
                clearInterval(timer);
                showCompletionPopup();
            } else if (timeLeft <= 0) {
                clearInterval(timer);
                showCompletionPopup();
            }
        }
    }
    
    function showAdjectiveCompletionPopup() {
        gameOver = true; // Estää pelin jatkumisen
        const overlay = document.getElementById("overlay");
        overlay.style.display = "block"; // Näytä taustakerros
        const popup = document.getElementById("adjective-popup");
        popup.style.display = "block"; // Näytä ponnahdusikkuna
        document.getElementById("adjective-score-display").textContent = `${score}/${maxScore}`;
    
        document.getElementById("adjective-next-phase").onclick = () => {
            popup.style.display = "none"; // Piilota ponnahdusikkuna
            overlay.style.display = "none"; // Piilota taustakerros
            gameOver = false; // Salli pelin jatkuminen
            startPronounPhase(); // Siirry pronomini-osioon
        };
    }

    function showCompletionPopup() {
        gameOver = true; // Estää pelin jatkumisen
        const overlay = document.getElementById("overlay");
        overlay.style.display = "block"; // Näytä taustakerros
        const popup = document.getElementById("pronoun-popup"); // Muutettu id
        popup.style.display = "block"; // Näytä ponnahdusikkuna
        document.getElementById("score-display").textContent = `${score}/${maxScore}`;
    
        document.getElementById("completion-continue").onclick = () => {
            popup.style.display = "none"; // Piilota ponnahdusikkuna
            overlay.style.display = "none"; // Piilota taustakerros
            gameOver = false; // Salli pelin jatkuminen, jos peliin lisätään jatko-osio
            // Lisää tarvittaessa seuraavan vaiheen logiikka tähän
        };
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

    function startPronounPhase() {
        currentPhase = "pronouns";
        timeLeft = 30;

        document.getElementById("game-title").style.display = "none";
        document.getElementById("game-title-pronominit").style.display = "block";

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
