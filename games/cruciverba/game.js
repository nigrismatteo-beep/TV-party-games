// ===============================
// CRUCIVERBA FINALE - GAME ENGINE
// ===============================

// Indice parola corrente
let currentWordIndex = 0;

// Oggetto parola attuale
let current = words[currentWordIndex];

// Array lettere rivelate
let revealed = [];

// Timer partita
let timer = 45;

// Stato gioco
let gameEnded = false;

// Elementi HTML
const definitionElement = document.getElementById("definition");
const lettersElement = document.getElementById("letters");

// ===============================
// INIZIALIZZAZIONE GIOCO
// ===============================

function initGame() {

    // Reset array lettere
    revealed = [];

    // Inserisce definizione
    definitionElement.innerText = current.definition;

    // Tutte le lettere nascoste
    for(let i = 0; i < current.word.length; i++) {
        revealed.push(false);
    }

    // Mostra automaticamente prima lettera
    revealed[0] = true;

    // Render grafico
    renderWord();

    // Avvio timer
    startTimer();

}

// ===============================
// RENDER GRAFICO PAROLA
// ===============================

function renderWord() {

    // Svuota contenitore
    lettersElement.innerHTML = "";

    // Creazione caselle lettere
    for(let i = 0; i < current.word.length; i++) {

        const div = document.createElement("div");

        div.classList.add("letter");

        // Se lettera visibile
        if(revealed[i]) {
            div.innerText = current.word[i];

            // Glow giallo TV
            div.style.boxShadow = "0 0 20px yellow";
        }
        else {
            div.innerText = "";
        }

        lettersElement.appendChild(div);

    }

}

// ===============================
// MOSTRA LETTERA RANDOM
// ===============================

function revealLetter() {

    // Fine gioco
    if(gameEnded) return;

    let hiddenIndexes = [];

    // Cerca lettere nascoste
    for(let i = 0; i < current.word.length; i++) {

        if(!revealed[i]) {
            hiddenIndexes.push(i);
        }

    }

    // Se tutte mostrate
    if(hiddenIndexes.length === 0) {

        alert("Tutte le lettere sono state rivelate!");
        return;

    }

    // Estrazione casuale
    let randomIndex = hiddenIndexes[
        Math.floor(Math.random() * hiddenIndexes.length)
    ];

    // Rende visibile lettera
    revealed[randomIndex] = true;

    // Aggiorna grafica
    renderWord();

}

// ===============================
// TIMER
// ===============================

function startTimer() {

    const timerElements = document.querySelectorAll(".team");

    const interval = setInterval(() => {

        if(gameEnded) {
            clearInterval(interval);
            return;
        }

        timer--;

        // Formattazione 00:00
        let seconds = timer.toString().padStart(2, '0');

        timerElements[0].innerText = `00:${seconds}`;
        timerElements[1].innerText = `00:${seconds}`;

        // Ultimi 10 secondi
        if(timer <= 10) {

            timerElements[0].style.color = "red";
            timerElements[1].style.color = "red";

            timerElements[0].style.textShadow = "0 0 20px red";
            timerElements[1].style.textShadow = "0 0 20px red";

        }

        // Tempo finito
        if(timer <= 0) {

            gameEnded = true;

            clearInterval(interval);

            alert("TEMPO SCADUTO!");

        }

    }, 1000);

}

// ===============================
// CONTROLLO RISPOSTA
// ===============================

function checkAnswer() {

    // Input risposta
    const answer = prompt("Inserisci la parola:");

    if(answer === null) return;

    // Confronto
    if(answer.toUpperCase() === current.word) {

        gameEnded = true;

        alert("CORRETTO! HAI VINTO!");

        // Glow verde vittoria
        document.body.style.boxShadow = "inset 0 0 200px green";

    }
    else {

        alert("RISPOSTA ERRATA!");

        // Flash rosso errore
        document.body.style.boxShadow = "inset 0 0 200px red";

        setTimeout(() => {
            document.body.style.boxShadow = "none";
        }, 500);

    }

}

// ===============================
// NUOVA PAROLA
// ===============================

function nextWord() {

    currentWordIndex++;

    if(currentWordIndex >= words.length) {
        currentWordIndex = 0;
    }

    current = words[currentWordIndex];

    timer = 45;

    gameEnded = false;

    initGame();

}

// ===============================
// CREAZIONE PULSANTI DINAMICI
// ===============================

const controls = document.querySelector('.controls');

// Pulsante risposta
const answerButton = document.createElement('button');
answerButton.innerText = 'RISPONDI';
answerButton.onclick = checkAnswer;
controls.appendChild(answerButton);

// Pulsante nuova parola
const nextButton = document.createElement('button');
nextButton.innerText = 'NUOVA PAROLA';
nextButton.onclick = nextWord;
controls.appendChild(nextButton);

// Avvio gioco
initGame();
