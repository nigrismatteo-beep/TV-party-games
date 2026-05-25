/* ============================================================
   AVANTI UN ALTRO — GAME LOGIC
   ============================================================ */

(function () {
  'use strict';

  /* --- State --- */
  const state = {
    progress: 0,         // correct wrong answers (goal: 21)
    questionCount: 0,
    correctCount: 0,
    wrongCount: 0,
    timeLimit: 30,
    timeLeft: 30,
    timerInterval: null,
    timerEnabled: true,
    usedIndices: new Set(),
    currentQuestion: null,
    totalTime: 0,
    startTime: null
  };

  const TARGET = 21;

  /* --- DOM --- */
  const screens = {
    setup: document.getElementById('screen-setup'),
    game:  document.getElementById('screen-game'),
    win:   document.getElementById('screen-win')
  };
  const ui = {
    startBtn:        document.getElementById('start-game-btn'),
    playAgainBtn:    document.getElementById('play-again-btn'),
    counterDisplay:  document.getElementById('counter-display'),
    progressBar:     document.getElementById('progress-bar'),
    timerDisplay:    document.getElementById('timer-display'),
    timerBox:        document.getElementById('timer-box'),
    questionNumber:  document.getElementById('question-number'),
    questionText:    document.getElementById('question-text'),
    btnWrongCorrect: document.getElementById('btn-wrong-correct'),
    btnWrongWrong:   document.getElementById('btn-wrong-wrong'),
    resultOverlay:   document.getElementById('result-overlay'),
    resultContent:   document.getElementById('result-content'),
    winStats:        document.getElementById('win-stats')
  };

  /* --- Setup Option Selectors --- */
  document.querySelectorAll('#time-selector .opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#time-selector .opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = parseInt(btn.dataset.value);
      state.timeLimit = val;
      state.timerEnabled = val > 0;
    });
  });

  /* --- Screen Manager --- */
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  /* --- Question Logic --- */
  function getRandomQuestion() {
    if (state.usedIndices.size >= QUESTIONS.length) state.usedIndices.clear();
    let idx;
    do { idx = Math.floor(Math.random() * QUESTIONS.length); }
    while (state.usedIndices.has(idx));
    state.usedIndices.add(idx);
    return QUESTIONS[idx];
  }

  function loadQuestion() {
    state.currentQuestion = getRandomQuestion();
    state.questionCount++;

    ui.questionText.classList.add('animate-out');
    setTimeout(() => {
      ui.questionNumber.textContent = `Domanda #${state.questionCount}`;
      ui.questionText.textContent = state.currentQuestion.q;
      ui.questionText.classList.remove('animate-out');
    }, 200);

    if (state.timerEnabled) resetTimer();
  }

  /* --- Timer --- */
  function resetTimer() {
    clearInterval(state.timerInterval);
    state.timeLeft = state.timeLimit;
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= 0) {
        clearInterval(state.timerInterval);
        // Auto-judge as wrong wrong (missed = wrong answer given correctly / didn't answer)
        judgeAnswer(false);
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    ui.timerDisplay.textContent = state.timeLeft;
    if (state.timeLeft <= 5) {
      ui.timerBox.classList.add('warning');
    } else {
      ui.timerBox.classList.remove('warning');
    }
  }

  /* --- Progress --- */
  function updateProgress() {
    ui.counterDisplay.textContent = state.progress;
    const pct = (state.progress / TARGET) * 100;
    ui.progressBar.style.width = pct + '%';

    // Counter pop animation
    ui.counterDisplay.style.transform = 'scale(1.4)';
    setTimeout(() => { ui.counterDisplay.style.transform = 'scale(1)'; }, 300);
  }

  /* --- Judge --- */
  function judgeAnswer(isWrongCorrect) {
    clearInterval(state.timerInterval);

    // Disable buttons momentarily
    ui.btnWrongCorrect.disabled = true;
    ui.btnWrongWrong.disabled   = true;

    if (isWrongCorrect) {
      state.progress = Math.min(state.progress + 1, TARGET);
      state.correctCount++;
      showResult('✅ SBAGLIATO!', 'correct');
    } else {
      state.progress = Math.max(state.progress - 1, 0);
      state.wrongCount++;
      showResult('❌ GIUSTO!', 'wrong');
    }

    updateProgress();

    setTimeout(() => {
      hideResult();
      if (state.progress >= TARGET) {
        showWinScreen();
      } else {
        loadQuestion();
        ui.btnWrongCorrect.disabled = false;
        ui.btnWrongWrong.disabled   = false;
      }
    }, 1200);
  }

  /* --- Result Flash --- */
  function showResult(text, type) {
    ui.resultContent.textContent = text;
    ui.resultContent.className = 'result-content ' + type;
    ui.resultOverlay.classList.add('active');
  }

  function hideResult() {
    ui.resultOverlay.classList.remove('active');
  }

  /* --- Win Screen --- */
  function showWinScreen() {
    const elapsed = Math.round((Date.now() - state.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    ui.winStats.innerHTML = `
      📊 Domande totali: <strong>${state.questionCount}</strong><br>
      ✅ Sbagliate giuste: <strong>${state.correctCount}</strong><br>
      ❌ Sbagliate sbagliate: <strong>${state.wrongCount}</strong><br>
      ⏱ Tempo: <strong>${mins}m ${secs}s</strong>
    `;

    showScreen('win');
    spawnConfetti();
  }

  /* --- Confetti --- */
  function spawnConfetti() {
    const container = document.getElementById('win-confetti');
    container.innerHTML = '';
    const colors = ['#b400ff','#ff006e','#ffd700','#00ff88','#00d4ff','#fff'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.cssText = `
        left: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        width: ${6 + Math.random() * 10}px;
        height: ${6 + Math.random() * 10}px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation-duration: ${1.5 + Math.random() * 2}s;
        animation-delay: ${Math.random() * 1.5}s;
      `;
      container.appendChild(piece);
    }
  }

  /* --- Game Initialization --- */
  function initGame() {
    const selectedTime = parseInt(document.querySelector('#time-selector .opt-btn.active').dataset.value);
    state.timeLimit    = selectedTime;
    state.timerEnabled = selectedTime > 0;
    state.progress     = 0;
    state.questionCount = 0;
    state.correctCount = 0;
    state.wrongCount   = 0;
    state.usedIndices.clear();
    state.startTime    = Date.now();

    if (!state.timerEnabled) {
      ui.timerBox.style.display = 'none';
    } else {
      ui.timerBox.style.display = '';
    }

    updateProgress();
    showScreen('game');
    loadQuestion();
  }

  /* --- Event Listeners --- */
  ui.startBtn.addEventListener('click', initGame);
  ui.playAgainBtn.addEventListener('click', initGame);
  ui.btnWrongCorrect.addEventListener('click', () => judgeAnswer(true));
  ui.btnWrongWrong.addEventListener('click',   () => judgeAnswer(false));

  /* --- Keyboard --- */
  document.addEventListener('keydown', e => {
    if (!screens.game.classList.contains('active')) return;
    if (ui.btnWrongCorrect.disabled) return;
    if (e.code === 'ArrowRight' || e.code === 'KeyV') judgeAnswer(true);
    if (e.code === 'ArrowLeft'  || e.code === 'KeyX') judgeAnswer(false);
  });

})();
