let index=0;
let score=0;

const question=document.getElementById('question');
const counter=document.getElementById('counter');

function loadQuestion(){
question.innerText=questions[index];
counter.innerText=score+' / 21';
}

function correct(){
score++;
nextQuestion();

if(score>=21){
alert('HAI VINTO');
location.reload();
}
}

function wrong(){
score--;
if(score<0){
score=0;
}
nextQuestion();
}

function nextQuestion(){
index++;
if(index>=questions.length){
index=0;
}
loadQuestion();
}

loadQuestion();
