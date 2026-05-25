let current=words[0];
let timer=45;

const definition=document.getElementById('definition');
const letters=document.getElementById('letters');
const timerBox=document.getElementById('timer');

let visible=[];

function init(){

letters.innerHTML='';
definition.innerText=current.definition;

visible=[];

for(let i=0;i<current.word.length;i++){
visible.push(false);
}

visible[0]=true;
render();
}

function render(){
letters.innerHTML='';

for(let i=0;i<current.word.length;i++){

const div=document.createElement('div');
div.classList.add('letter');

if(visible[i]){
div.innerText=current.word[i];
}

letters.appendChild(div);

}
}

function revealLetter(){

let hidden=[];

for(let i=0;i<visible.length;i++){
if(!visible[i]){
hidden.push(i);
}
}

if(hidden.length===0)return;

let random=hidden[Math.floor(Math.random()*hidden.length)];
visible[random]=true;

render();
}

function checkAnswer(){

let answer=prompt('Inserisci parola');

if(answer===null)return;

if(answer.toUpperCase()===current.word){
alert('CORRETTO');
location.reload();
}else{
alert('ERRATO');
}
}

setInterval(()=>{
timer--;
timerBox.innerText=timer;

if(timer<=0){
alert('TEMPO SCADUTO');
location.reload();
}

},1000);

init();
