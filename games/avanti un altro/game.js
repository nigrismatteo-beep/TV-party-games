let currentQuestion = 0;
let progress = 0;
let timer = 150;

const questionElement = document.getElementById("question");
const wrongBtn = document.getElementById("wrongBtn");
const correctBtn = document.getElementById("correctBtn");
const progressElement = document.getElementById("progress");
const timerElement = document.getElementById("timer");

function renderQuestion() {

    const q = questions[currentQuestion];

    questionElement.innerText = q.question;

    wrongBtn.innerText = q.wrong;
    correctBtn.innerText = q.correct;

}

wrongBtn.onclick = () => {

    progress++;

    updateProgress();

    nextQuestion();

}

correctBtn.onclick = () => {

    progress = 0;

    updateProgress();

    alert("Hai sbagliato! Hai dato la risposta corretta.");

}

function nextQuestion() {

    currentQuestion++;

    if(currentQuestion >= questions.length) {
        currentQuestion = 0;
    }

    renderQuestion();

}

function updateProgress() {

    progressElement.innerHTML = "";

    for(let i = 0; i < 21; i++) {

        const box = document.createElement("div");

        box.classList.add("progress-box");

        if(i < progress) {
            box.style.background = "yellow";
        }

        progressElement.appendChild(box);

    }

    if(progress >= 21) {
        alert("HAI VINTO!");
    }

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

renderQuestion();
updateProgress();
startTimer();
