/* ============================================================
   CRUCIVERBA FINALE — GAME LOGIC
   ============================================================ */

(function () {
  'use strict';

  /* --- State --- */
  const state = {
    wordList: [],
    currentIndex: 0,
    totalWords: 10,
    currentEntry: null,
    revealedIndices: new Set(),
    score: 0,
    totalReveals: 0,
    solvedCount: 0,
    skippedCount: 0,
    timeLimit: 0,
    timeLeft: 0,
    timerEnabled: false,
    timerInterval: null,
    startTime: null
  };

  const MAX_SCORE_PER_WORD = 10;

  /* --- DOM --- */
  const screens = {
    setup: document.getElementById('screen-setup'),
    game:  document.getElementById('screen-game'),
    end:   document.getElementById('screen-end')
  };
  const ui = {
    startBtn:         document.getElementById('start-game-btn'),
    playAgainBtn:     document.getElementById('play-again-btn'),
    wordCountDisplay: document.getElementById('word-count-display'),
    scoreDisplay:     document.getElementById('score-display'),
    timerDisplay:     document.getElementById('timer-display'),
    revealsDisplay:   document.getElementById('reveals-display'),
    definitionText:   document.getElementById('definition-text'),
    wordLengthHint:   document.getElementById('word-length-hint'),
    letterBoxes:      document.getElementById('letter-boxes'),
    btnReveal:        document.getElementById('btn-reveal'),
    btnCorrect:       document.getElementById('btn-correct'),
    btnSkip:          document.getElementById('btn-skip'),
    endScore:         document.getElementById('end-score'),
    endStats:         document.getElementById('end-stats')
  };

  /* --- Setup Option Selectors --- */
  document.querySelectorAll('#timer-selector .opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#timer-selector .opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.querySelectorAll('#words-selector .opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#words-selector .opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* --- Screen Manager --- */
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  /* --- Word List Builder --- */
  function buildWordList(count) {
    const shuffled = [...WORD_LIST].sort(() => Math.random() - 0.5);
    return count >= 999 ? shuffled : shuffled.slice(0, Math.min(count, shuffled.length));
  }

  /* --- Load Word --- */
  function loadWord(entry) {
    state.currentEntry = entry;
    state.revealedIndices.clear();

    ui.definitionText.classList.add('animate-out');
    setTimeout(() => {
      ui.definitionText.textContent = entry.def;
      ui.definitionText.classList.remove('animate-out');
    }, 200);

    const word = entry.word;
    ui.wordLengthHint.textContent = `${word.length} lettere`;
    renderLetterBoxes(word);

    ui.btnReveal.disabled  = false;
    ui.btnCorrect.disabled = false;
    ui.btnSkip.disabled    = false;

    ui.wordCountDisplay.textContent = `${state.currentIndex + 1} / ${state.wordList.length}`;

    if (state.timerEnabled) resetTimer();
  }

  /* --- Letter Boxes Renderer --- */
  function renderLetterBoxes(word) {
    ui.letterBoxes.innerHTML = '';
    const letters = word.split('');

    letters.forEach((char, i) => {
      const box = document.createElement('div');
      if (char === ' ') {
        box.className = 'letter-box space-box';
      } else {
        box.className = 'letter-box';
        box.dataset.index = i;
        box.dataset.char  = char;
        box.textContent   = char; // hidden by CSS (transparent color)
      }
      ui.letterBoxes.appendChild(box);
    });
  }

  /* --- Reveal Random Letter --- */
  function revealRandomLetter() {
    const word = state.currentEntry.word;
    const boxes = [...ui.letterBoxes.querySelectorAll('.letter-box:not(.space-box):not(.revealed)')];
    if (boxes.length === 0) return;

    const randomBox = boxes[Math.floor(Math.random() * boxes.length)];
    const idx = parseInt(randomBox.dataset.index);
    state.revealedIndices.add(idx);
    state.totalReveals++;

    randomBox.classList.add('revealed');
    ui.revealsDisplay.textContent = state.totalReveals;

    // Stagger reveal animation
    setTimeout(() => {}, 0);

    // Check if all revealed
    const totalLetters = word.split('').filter(c => c !== ' ').length;
    if (state.revealedIndices.size >= totalLetters) {
      ui.btnReveal.disabled = true;
    }
  }

  /* --- Mark Correct --- */
  function markCorrect() {
    const word = state.currentEntry.word;
    const totalLetters = word.split('').filter(c => c !== ' ').length;
    const revealsUsed  = state.revealedIndices.size;
    const pointsEarned = Math.max(1, MAX_SCORE_PER_WORD - revealsUsed);

    // Reveal all remaining letters in green
    ui.letterBoxes.querySelectorAll('.letter-box:not(.space-box)').forEach((box, i) => {
      setTimeout(() => {
        box.classList.remove('revealed');
        box.classList.add('correct-reveal');
        box.style.color = 'var(--c-green)';
      }, i * 60);
    });

    state.score += pointsEarned;
    state.solvedCount++;
    animateScore();

    clearInterval(state.timerInterval);

    setTimeout(() => nextWord(), totalLetters * 60 + 600);
  }

  /* --- Mark Skip --- */
  function markSkip() {
    clearInterval(state.timerInterval);
    state.skippedCount++;

    // Reveal all letters in red style
    ui.letterBoxes.querySelectorAll('.letter-box:not(.space-box)').forEach((box, i) => {
      setTimeout(() => {
        box.classList.remove('revealed');
        box.style.color = 'var(--c-red)';
        box.style.borderColor = 'rgba(255,51,102,0.4)';
        box.style.textShadow = '0 0 10px var(--c-red)';
      }, i * 40);
    });

    setTimeout(() => nextWord(), 1000);
  }

  /* --- Next Word --- */
  function nextWord() {
    state.currentIndex++;
    if (state.currentIndex >= state.wordList.length) {
      showEndScreen();
    } else {
      loadWord(state.wordList[state.currentIndex]);
    }
  }

  /* --- Score Animation --- */
  function animateScore() {
    ui.scoreDisplay.textContent = state.score;
    ui.scoreDisplay.style.transform = 'scale(1.4)';
    ui.scoreDisplay.style.textShadow = '0 0 30px var(--c-gold)';
    setTimeout(() => {
      ui.scoreDisplay.style.transform = 'scale(1)';
      ui.scoreDisplay.style.textShadow = '0 0 15px var(--c-gold)';
    }, 300);
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
        markSkip();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    ui.timerDisplay.textContent = state.timeLeft;
    if (state.timeLeft <= 10) {
      ui.timerDisplay.classList.add('warning');
    } else {
      ui.timerDisplay.classList.remove('warning');
    }
  }

  /* --- End Screen --- */
  function showEndScreen() {
    const elapsed = Math.round((Date.now() - state.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const maxPossible = state.solvedCount * MAX_SCORE_PER_WORD;
    const efficiency = maxPossible > 0 ? Math.round((state.score / maxPossible) * 100) : 0;

    ui.endScore.textContent = state.score;
    ui.endStats.innerHTML = `
      ✅ Indovinate: <strong>${state.solvedCount}</strong><br>
      ⏭ Saltate: <strong>${state.skippedCount}</strong><br>
      💡 Lettere scoperte: <strong>${state.totalReveals}</strong><br>
      🎯 Efficienza: <strong>${efficiency}%</strong><br>
      ⏱ Tempo totale: <strong>${mins}m ${secs}s</strong>
    `;

    showScreen('end');

    // Animate score
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
    const timerVal = parseInt(document.querySelector('#timer-selector .opt-btn.active').dataset.value);
    const wordsVal = parseInt(document.querySelector('#words-selector .opt-btn.active').dataset.value);

    state.timeLimit    = timerVal;
    state.timerEnabled = timerVal > 0;
    state.totalWords   = wordsVal;
    state.wordList     = buildWordList(wordsVal);
    state.currentIndex = 0;
    state.score        = 0;
    state.totalReveals = 0;
    state.solvedCount  = 0;
    state.skippedCount = 0;
    state.startTime    = Date.now();

    if (state.timerEnabled) {
      document.getElementById('hud-timer').style.display = '';
      ui.timerDisplay.textContent = state.timeLimit;
    } else {
      document.getElementById('hud-timer').style.display = 'none';
    }

    ui.scoreDisplay.textContent   = '0';
    ui.revealsDisplay.textContent = '0';

    showScreen('game');
    loadWord(state.wordList[0]);
  }

  /* --- Event Listeners --- */
  ui.startBtn.addEventListener('click', initGame);
  ui.playAgainBtn.addEventListener('click', initGame);
  ui.btnReveal.addEventListener('click', revealRandomLetter);
  ui.btnCorrect.addEventListener('click', markCorrect);
  ui.btnSkip.addEventListener('click', markSkip);

  /* --- Keyboard --- */
  document.addEventListener('keydown', e => {
    if (!screens.game.classList.contains('active')) return;
    if (e.code === 'Space') { e.preventDefault(); revealRandomLetter(); }
    if (e.code === 'Enter') markCorrect();
    if (e.code === 'KeyS')  markSkip();
  });

})();
