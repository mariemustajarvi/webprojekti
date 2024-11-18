// Muuttujat
let score = 0;
let timeLeft = 30;
let timer;
let gameStarted = false;

window.onload = function() {
    // Piilotetaan pisteet ja aika heti sivun latautuessa
    document.getElementById('score-container').style.display = 'none';
    document.getElementById('game-title').style.display = 'none';
};

function startGame() {
    console.log("Peli käynnistyi");

    // Piilotetaan bonusviesti
    document.getElementById('bonus-message-box').style.display = 'none';

    // Piilotetaan aloituslinkki ja näytetään pisteet & aika
    document.querySelector('.bonus-texts').style.display = 'none';
    document.getElementById('score-container').style.display = 'flex';

    // Piilotetaan pelin otsikko ennen peliä ja näytetään se vasta pelin alkaessa
    document.getElementById('game-title').style.display = 'block';

    // Asetetaan peli alkuun
    gameStarted = true;
    score = 0;
    timeLeft = 30;
    document.getElementById('score').textContent = 'Pisteet: 0';
    document.getElementById('time-left').textContent = 'Aikaa jäljellä: ' + timeLeft;

    // Käynnistetään ajastin
    timer = setInterval(updateTimer, 1000);
}



// Päivitetään ajastin
function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
    } else {
        timeLeft--;
        document.getElementById('time-left').textContent = 'Aikaa jäljellä: ' + timeLeft;
    }
}

// Lopetetaan peli ja näytetään loppuviesti
function endGame() {
    gameStarted = false;
    alert('Aika loppui! Pisteet: ' + score);

    // Näytetään lopputulos ja aloita peli uudelleen
    document.querySelector('.bonus-texts').style.display = 'block';
    document.getElementById('score-container').style.display = 'none';
    document.getElementById('game-title').style.display = 'block';
}

// Lisää pisteitä
function addPoints() {
    if (gameStarted) {
        score++;
        document.getElementById('score').textContent = 'Pisteet: ' + score;
    }
}

// Testaa verbi
function testVerb(isVerb) {
    if (isVerb) {
        addPoints();
    }
}

// Esimerkki, jossa peli voi reagoida oikeisiin ja väärin valittuihin sanoihin
document.querySelectorAll('.word').forEach(wordElement => {
    wordElement.addEventListener('click', () => {
        const isVerb = wordElement.classList.contains('verb');
        testVerb(isVerb);
    });
});
