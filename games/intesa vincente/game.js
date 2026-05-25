const words=[
"MONTAGNA",
"COMPUTER",
"VENEZIA",
"PIZZA",
"AEROPORTO",
"GATTO",
"TELEFONO",
"BICICLETTA",
"MOTORE",
"CINEMA"
];

let current=0;
let score=0;
let time=60;

const word=document.getElementById('word');
const timer=document.getElementById('timer');
const scoreBox=document.getElementById('score');

function showWord(){
word.innerText=words[current];
}

function correctWord(){
score++;
scoreBox.innerText=score;
nextWord();
}

function skipWord(){
nextWord();
}

function nextWord(){
current++;
if(current>=words.length){
current=0;
}
showWord();
}

setInterval(()=>{
time--;
timer.innerText=time;
if(time<=0){
alert('TEMPO SCADUTO');
location.reload();
}
},1000);

showWord();
