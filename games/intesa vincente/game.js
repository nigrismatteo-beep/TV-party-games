let currentIndex = 0;
let score = 0;
let timer = 60;
let prenotato = false;

const wordElement = document.getElementById("word");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

function updateWord() {
    wordElement.innerText = parole[currentIndex];
}

function correctWord() {
    score++;
    scoreElement.innerText = score;

    nextWord();
}

function skipWord() {
    nextWord();
}

function nextWord() {
    currentIndex++;

    if(currentIndex >= parole.length) {
        currentIndex = 0;
    }

    updateWord();
}

function startTimer() {

    setInterval(() => {

        timer--;

        timerElement.innerText = timer;

        if(timer <= 0) {
            alert("Tempo scaduto!");
        }

    }, 1000);

}

function prenota(nome) {

    if(prenotato) return;

    prenotato = true;

    document.getElementById("selectedPlayer").innerText =
        nome + " prenotato!";

}

updateWord();
startTimer();