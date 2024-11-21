// Muuttujat
let score = 0;
let timeLeft = 30;
let timer;
let gameStarted = false;
let currentPhase = 'verbs'; // Pelissä kaksi vaihetta: 'verbs' ja 'nouns'

// Sanat ja niiden luokittelu
const verbs = ["juosta", "syödä", "puhua", "nukkua", "pelata", "juoda", "lentää", "herätä", "kävellä", "nauraa"];

const nonVerbs = ["kiinteistö", "auto", "taivas", "katto", "musiikki", "koira", "kissa", "talvi", "kesä", "vuori"];

const nouns = ["metsä", "kaupunki", "joki", "lumi", "taivas", "maito", "kukka", "kirja", "pöytä", "ruoka"];
const nonNouns = ["lentää", "tanssia", "pieni", "kaunis", "kolmas", "tämä", "kaikki", "hyvin", "seitsemäs", "muutama"];
let words = [];

// Alustetaan peli ja sekoitetaan sanat
function initializeWords() {
    if (currentPhase === 'verbs') {
        words = [...verbs, ...nonVerbs]; // Verbit + väärät (substantiivit)
        document.getElementById('game-title').textContent = 'Valitse kaikki verbit!';
    } else if (currentPhase === 'nouns') {
        words = [...nouns, ...nonNouns]; // Substantiivit + väärät (verbit)
        document.getElementById('game-title').textContent = 'Valitse kaikki substantiivit!';
    }

    words = words.sort(() => Math.random() - 0.5); // Sekoitellaan lista
    const wordsContainer = document.getElementById('words-container');
    wordsContainer.innerHTML = ''; // Tyhjennetään lista ennen uusien sanojen näyttämistä

    const usedPositions = []; // Lista käytetyistä sijainneista

    // Näytetään sanat käyttäjälle ympäri sivustoa
    words.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordElement.classList.add('word');
        wordElement.classList.add(currentPhase === 'verbs' ? 'verb' : 'non-verb');
        wordElement.addEventListener('click', () => handleWordClick(wordElement));

        let randomX, randomY, positionOccupied;

        // Etsitään uusi satunnainen sijainti, jos paikka on jo varattu
        do {
            randomX = Math.floor(Math.random() * 90) + '%';
            randomY = Math.floor(Math.random() * 80) + 20 + '%';  // Muutettu alemmaksi
            positionOccupied = false;

            // Tarkistetaan, onko uusi sijainti päällekkäinen
            for (let i = 0; i < usedPositions.length; i++) {
                const usedPosition = usedPositions[i];
                if (Math.abs(parseFloat(usedPosition.x) - parseFloat(randomX)) < 10 && 
                    Math.abs(parseFloat(usedPosition.y) - parseFloat(randomY)) < 10) {
                    positionOccupied = true;
                    break;
                }
            }
        } while (positionOccupied);

        // Tallennetaan uusi sijainti käytetyksi
        usedPositions.push({ x: randomX, y: randomY });

        // Asetetaan sana satunnaiseen sijaintiin
        wordElement.style.left = randomX;
        wordElement.style.top = randomY;

        wordsContainer.appendChild(wordElement);
    });
}

// Pelin aloitus
function startGame() {
    console.log("Peli käynnistyi");

    // Poistetaan taustakuva ja asetetaan taustaväriksi keltainen
    document.body.style.backgroundImage = 'none';  // Poistaa taustakuvan
    document.body.style.backgroundColor = 'var(--keltainen)';  // Asettaa taustavärin keltaiseksi

    // Piilotetaan bonusviesti ja bonuskuva
    document.getElementById('bonus-message-box').style.display = 'none';
    document.querySelector('.bonus-texts').style.display = 'none';

    // Näytetään peli-elementit
    document.getElementById('game-title').style.display = 'block';
    document.getElementById('words-container').style.display = 'block';
    document.getElementById('score-container').style.display = 'flex';

    // Alustetaan peli
    gameStarted = true;
    score = 0;
    timeLeft = 30;
    document.getElementById('score').textContent = 'Pisteet: 0';
    document.getElementById('time-left').textContent = 'Aikaa jäljellä: ' + timeLeft;

    // Alustetaan ajanlaskija
    timer = setInterval(function () {
        timeLeft--;
        document.getElementById('time-left').textContent = 'Aikaa jäljellä: ' + timeLeft;
        if (timeLeft <= 0) {
            if (currentPhase === 'verbs') {
                // Verbi-vaihe on ohi, siirrytään substantiivivaiheeseen
                currentPhase = 'nouns';
                timeLeft = 30; // Resetoi aika seuraavaa vaihetta varten
                initializeWords(); // Näytetään substantiivit
            } else if (currentPhase === 'nouns') {
                // Substantiivi-vaihe on ohi, peli päättyy
                endGame("Aika loppui!");
            }
        }
    }, 1000);

    // Alustetaan sanat
    initializeWords();
}

// Sanan klikkaaminen
function handleWordClick(wordElement) {
    if (!gameStarted) return;

    const word = wordElement.textContent;
    const isVerb = verbs.includes(word);  // Tarkistetaan, onko sana verbi
    const isNoun = nouns.includes(word);  // Tarkistetaan, onko sana substantiivi

    // Määritetään väri oikein / väärin
    if (currentPhase === 'verbs') {
        if (isVerb) {
            wordElement.style.backgroundColor = 'lightgreen'; // Oikein (verbi)
            score += 3; // Oikeasta vastauksesta +3 pistettä
        } else {
            wordElement.style.backgroundColor = 'lightcoral'; // Väärin (ei-verbi)
        }
    } else if (currentPhase === 'nouns') {
        if (isNoun) {
            wordElement.style.backgroundColor = 'lightgreen'; // Oikein (substantiivi)
            score += 3; // Oikeasta vastauksesta +3 pistettä
        } else {
            wordElement.style.backgroundColor = 'lightcoral'; // Väärin (ei-substantiivi)
        }
    }

    // Poistetaan sana listalta
    wordElement.style.pointerEvents = 'none'; // Estetään sanaa klikkaamasta uudelleen
    document.getElementById('score').textContent = 'Pisteet: ' + score;

    // Tarkistetaan, onko kaikki oikeat sanat valittu
    checkPhaseCompletion();
}

// Tarkistetaan, onko vaihe valmis
function checkPhaseCompletion() {
    const remainingWords = Array.from(document.querySelectorAll('.word')).filter(word => {
        const text = word.textContent;
        if (currentPhase === 'verbs') {
            return verbs.includes(text); // Palauttaa jäljellä olevat verbit
        } else if (currentPhase === 'nouns') {
            return nouns.includes(text); // Palauttaa jäljellä olevat substantiivit
        }
        return false;
    });

    if (remainingWords.length === 0) {
        if (currentPhase === 'verbs') {
            // Siirrytään substantiivivaiheeseen
            currentPhase = 'nouns';
            timeLeft = 30; // Resetoi aika
            initializeWords();
        } else if (currentPhase === 'nouns') {
            // Peli päättyy
            endGame('Onneksi olkoon! Suoritit pelin!');
        }
    }
}

// Pelin lopetus
function endGame(message) {
    clearInterval(timer); // Lopetetaan ajastin
    gameStarted = false;
    alert(message);
}
