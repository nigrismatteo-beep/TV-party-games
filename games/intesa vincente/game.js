/* ============================================================
   INTESA VINCENTE — GAME LOGIC
   ============================================================ */
(function() {
  'use strict';
  /* --- State --- */
  const state = {
    timeLimit: 60,
    totalRounds: 3,
    currentRound: 1,
    score: 0,
    passCount: 0,
    correctCount: 0,
    timeLeft: 60,
    running: false,
    timerInterval: null,
    usedWords: new Set(),
    currentWord: '',
    roundScores: []
  };
  /* --- DOM References --- */
  const screens = {
    setup: document.getElementById('screen-setup'),
    game:  document.getElementById('screen-game'),
    end:   document.getElementById('screen-end')
  };
  const ui = {
    scoreDisplay:  document.getElementById('score-display'),
    timerDisplay:  document.getElementById('timer-display'),
    roundDisplay:  document.getElementById('round-display'),
    wordMain:      document.getElementById('word-main'),
    wordCategory:  document.getElementById('word-category'),
    wordBox:       document.getElementById('word-box'),
    feedbackFlash: document.getElementById('feedback-flash'),
    ringFill:      document.getElementById('ring-fill'),
    btnPass:       document.getElementById('btn-pass'),
    btnCorrect:    document.getElementById('btn-correct'),
    btnStartRound: document.getElementById('btn-start-round'),
    endScore:      document.getElementById('end-score'),
    endStats:      document.getElementById('end-stats'),
    startBtn:      document.getElementById('start-game-btn'),
    playAgainBtn:  document.getElementById('play-again-btn')
  };
  const RING_CIRCUMFERENCE = 327;
  /* --- Setup Screen Option Selectors --- */
  document.querySelectorAll('#time-selector .opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#time-selector .opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.timeLimit = parseInt(btn.dataset.value);
    });
  });
  document.querySelectorAll('#rounds-selector .opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#rounds-selector .opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.totalRounds = parseInt(btn.dataset.value);
    });
  });
  /* --- Screen Management --- */
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }
  /* --- Word Logic --- */
  function getRandomWord() {
    const available = WORDS.filter(w => !state.usedWords.has(w));
    if (available.length === 0) state.usedWords.clear();
    const pool = available.length > 0 ? available : WORDS;
    const word = pool[Math.floor(Math.random() * pool.length)];
    state.usedWords.add(word);
    return word;
  }
  function animateWordChange(newWord, callback) {
    ui.wordMain.classList.add('animate-out');
    setTimeout(() => {
      ui.wordMain.textContent = newWord;
      ui.wordMain.classList.remove('animate-out');
      ui.wordMain.classList.add('animate-in');
      if (callback) callback();
      setTimeout(() => ui.wordMain.classList.remove('animate-in'), 200);
    }, 150);
  }
  function loadNextWord() {
    state.currentWord = getRandomWord();
    animateWordChange(state.currentWord);
    ui.wordCategory.textContent = '● INDOVINA LA PAROLA';
  }
  /* --- Timer --- */
  function updateTimerRing() {
    const fraction = state.timeLeft / state.timeLimit;
    const offset = RING_CIRCUMFERENCE * (1 - fraction);
    ui.ringFill.style.strokeDashoffset = offset;
    if (fraction <= 0.33) {
      ui.ringFill.style.stroke = '#ff3366';
    } else if (fraction <= 0.6) {
      ui.ringFill.style.stroke = '#ffd700';
    } else {
      ui.ringFill.style.stroke = '#00d4ff';
    }
    ui.timerDisplay.textContent = state.timeLeft;
    if (state.timeLeft <= 10) {
      ui.timerDisplay.style.color = '#ff3366';
      ui.timerDisplay.style.textShadow = '0 0 20px #ff3366';
    } else {
      ui.timerDisplay.style.color = '#fff';
      ui.timerDisplay.style.textShadow = 'none';
    }
  }
  function startTimer() {
    clearInterval(state.timerInterval);
    state.timeLeft = state.timeLimit;
    updateTimerRing();
    state.timerInterval = setInterval(() => {
      state.timeLeft--;
      updateTimerRing();
      if (state.timeLeft <= 0) {
        clearInterval(state.timerInterval);
        endRound();
      }
    }, 1000);
  }
  /* --- Round Management --- */
  function startRound() {
    state.running = true;
    setActionState(true);
    ui.btnStartRound.style.display = 'none';
    ui.wordCategory.textContent = '● INDOVINA LA PAROLA';
    loadNextWord();
    startTimer();
    updateHUD();
  }
  function endRound() {
    state.running = false;
    clearInterval(state.timerInterval);
    setActionState(false);
    const roundScore = state.score - (state.roundScores.reduce((a,b) => a+b, 0));
    state.roundScores.push(Math.max(0, roundScore));
    if (state.currentRound >= state.totalRounds) {
      setTimeout(() => showEndScreen(), 1200);
    } else {
      state.currentRound++;
      updateHUD();
      prepareNextRound();
    }
  }
  function prepareNextRound() {
    ui.wordMain.textContent = '—';
    ui.wordCategory.textContent = `TURNO ${state.currentRound} — PREMI AVVIA`;
    ui.btnStartRound.style.display = 'flex';
    state.timeLeft = state.timeLimit;
    updateTimerRing();
  }
  function setActionState(enabled) {
    ui.btnPass.disabled    = !enabled;
    ui.btnCorrect.disabled = !enabled;
  }
  function updateHUD() {
    ui.scoreDisplay.textContent = state.score;
    ui.roundDisplay.textContent = `${state.currentRound} / ${state.totalRounds}`;
  }
  /* --- Actions --- */
  function markCorrect() {
    if (!state.running) return;
    state.score++;
    state.correctCount++;
    updateHUD();
    flashFeedback('correct');
    loadNextWord();
  }
  function markPass() {
    if (!state.running) return;
    state.passCount++;
    flashFeedback('pass');
    loadNextWord();
  }
  function flashFeedback(type) {
    ui.wordBox.classList.remove('flash-correct','flash-pass');
    ui.feedbackFlash.classList.remove('show-correct','show-pass');
    if (type === 'correct') {
      ui.wordBox.classList.add('flash-correct');
      ui.feedbackFlash.classList.add('show-correct');
    } else {
      ui.wordBox.classList.add('flash-pass');
      ui.feedbackFlash.classList.add('show-pass');
    }
    setTimeout(() => {
      ui.wordBox.classList.remove('flash-correct','flash-pass');
      ui.feedbackFlash.classList.remove('show-correct','show-pass');
    }, 400);
  }
  /* --- End Screen --- */
  function showEndScreen() {
    showScreen('end');
    ui.endScore.textContent = state.score;
    ui.endStats.innerHTML = `
      ✅ Parole indovinate: <strong>${state.correctCount}</strong><br>
      ⏭ Passate: <strong>${state.passCount}</strong><br>
      🎯 Efficienza: <strong>${state.correctCount + state.passCount > 0
        ? Math.round(state.correctCount / (state.correctCount + state.passCount) * 100)
        : 0}%</strong>
    `;
    // Animate score count up
    let display = 0;
    const target = state.score;
    const step = Math.max(1, Math.floor(target / 30));
    const counter = setInterval(() => {
      display = Math.min(display + step, target);
      ui.endScore.textContent = display;
      if (display >= target) clearInterval(counter);
    }, 40);
  }
  /* --- Game Initialization --- */
  function initGame() {
    state.timeLimit    = parseInt(document.querySelector('#time-selector .opt-btn.active').dataset.value);
    state.totalRounds  = parseInt(document.querySelector('#rounds-selector .opt-btn.active').dataset.value);
    state.currentRound = 1;
    state.score        = 0;
    state.passCount    = 0;
    state.correctCount = 0;
    state.timeLeft     = state.timeLimit;
    state.running      = false;
    state.usedWords.clear();
    state.roundScores  = [];
    showScreen('game');
    updateHUD();
    setActionState(false);
    ui.btnStartRound.style.display = 'flex';
    ui.wordMain.textContent = '—';
    ui.wordCategory.textContent = `TURNO 1 — PREMI AVVIA`;
    updateTimerRing();
  }
  function resetToSetup() {
    clearInterval(state.timerInterval);
    showScreen('setup');
  }
  /* --- Event Listeners --- */
  ui.startBtn.addEventListener('click', initGame);
  ui.playAgainBtn.addEventListener('click', initGame);
  ui.btnStartRound.addEventListener('click', startRound);
  ui.btnCorrect.addEventListener('click', markCorrect);
  ui.btnPass.addEventListener('click', markPass);
  /* --- Keyboard Shortcuts --- */
  document.addEventListener('keydown', e => {
    if (!screens.game.classList.contains('active')) return;
    switch(e.code) {
      case 'Space':
        e.preventDefault();
        markCorrect();
        break;
      case 'KeyP':
        e.preventDefault();
        markPass();
        break;
      case 'Enter':
        if (!state.running) startRound();
        break;
      case 'KeyF':
        toggleFullscreen();
        break;
    }
  });
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
})();