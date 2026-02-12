function showSection(sectionId) {
  // Скрыть все секции
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Показать нужную
  document.getElementById(sectionId).classList.add('active');
}

// При загрузке — показываем главную
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
});

// Генерация снега
function createSnow() {
  const container = document.querySelector('.snowflakes');
  if (!container) return;

  const total = 150; // количество снежинок

  for (let i = 0; i < total; i++) {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');

    // Случайные параметры
    const size = Math.random() * 8 + 2; // 2–10px
    const posX = Math.random() * 100; // %
    const opacity = Math.random() * 0.7 + 0.3; // 0.3–1.0
    const offset = (Math.random() - 0.5) * 200; // -100px to +100px
    const duration = Math.random() * 15 + 10; // 10–25s
    const delay = Math.random() * -20; // старт в разное время

    snow.style.width = `${size}px`;
    snow.style.height = `${size}px`;
    snow.style.left = `${posX}vw`;
    snow.style.setProperty('--opacity', opacity);
    snow.style.setProperty('--offset', `${offset}px`);
    snow.style.animationDuration = `${duration}s`;
    snow.style.animationDelay = `${delay}s`;

    container.appendChild(snow);
  }
}
// Запуск после загрузки
document.addEventListener('DOMContentLoaded', createSnow);

      
// === Вспомогательная функция: затемнение HEX-цвета ===
function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.min(255, Math.max(0, R + (R * percent / 100)));
  G = Math.min(255, Math.max(0, G + (G * percent / 100)));
  B = Math.min(255, Math.max(0, B + (B * percent / 100)));

  return '#' + 
    Math.round(R).toString(16).padStart(2, '0') +
    Math.round(G).toString(16).padStart(2, '0') +
    Math.round(B).toString(16).padStart(2, '0');
}

// === Переключение игр ===
function loadGame(gameName) {
  const container = document.getElementById('game-container');
  
  if (gameName === 'clicker') {
    container.innerHTML = `
      <h3>Кликер</h3>
      <div>Очки: <span id="score">0</span></div>
      <div>Времени осталось: <span id="timer">30</span> сек</div>
      <div class="clicker-buttons">
        <button id="clickBtn">Кликай!</button>
        <button id="resetBtn">Сбросить</button>
      </div>
      <div id="result"></div>
    `;
    initClicker();
  } 
  else if (gameName === 'adventure') {
    container.innerHTML = `
      <h3>Генератор приключений</h3>
      <p id="story">Нажмите кнопку, чтобы начать приключение!</p>
      <div class="adventure-buttons">
        <button id="genBtn">Сгенерировать приключение</button>
        <button id="clearBtn">Очистить историю</button>
      </div>
      <div id="history"></div>
    `;
    initAdventure();
  }
  else if (gameName === 'guess') {
    container.innerHTML = `
      <h3>Угадай число (от 1 до 100)</h3>
      <div class="guess-input-wrapper">
        <input type="text" id="guessInput" placeholder="Введите число">
      </div>
      <div class="guess-buttons">
        <button id="checkBtn">Проверить</button>
        <button id="resetBtnGuess">Начать заново</button>
      </div>
      <div id="hint"></div>
      <div>Попыток осталось: <span id="attempts">7</span></div>
      <div id="gameResult"></div>
    `;
    initGuessGame();
  }
  else if (gameName === 'reaction') {
 container.innerHTML = `
  <h3>Игра на скорость реакции</h3>
 <div>Осталось времени: <span id="reactionTimer">30</span> сек</div>

<div class="reaction-controls">
  <div class="reaction-stats">
    Нажатий: <span id="hits">0</span> | Среднее время: <span id="avgTime">—</span> мс
  </div>
  <button id="resetReaction" class="game-btn-red">Сбросить</button>
</div>
  <div id="reactionArea"></div>
`;
    initReactionGame();
  }
  else if (gameName === 'tic-tac-toe') {
    container.innerHTML = `
      <h3>Крестики-нолики</h3>
   <div class="ttt-container">
  <div id="tttStatus" class="ttt-element">Ходит игрок: X</div>
  <div id="tttScore" class="ttt-element">Счёт: X — <span id="scoreX">0</span> | O — <span id="scoreO">0</span></div>
  <div class="tic-tac-toe-grid" id="tttGrid"></div>
  <button id="tttReset" class="game-btn-red">Новая игра</button>
</div>
    `;
    initTicTacToe();
  }
 else if (gameName === 'maze') {
  container.innerHTML = `
    <h3>Лабиринт</h3>
    <p>Управляйте зелёным кружком стрелками. Найдите красный выход!</p>
    <div class="maze-container" id="mazeContainer"></div>
    <div id="mazeTimer">Время: <span id="timeValue">0</span> сек</div>
    <button id="mazeReset" class="game-btn-red">Начать заново</button>
  `;
  initMaze();
}
}

// === Игра 1: Кликер с радужной анимацией ===
function initClicker() {
  let score = 0;
  let timeLeft = 30;
  let timer;

  const scoreEl = document.getElementById('score');
  const timerEl = document.getElementById('timer');
  const clickBtn = document.getElementById('clickBtn');
  const resetBtn = document.getElementById('resetBtn');
  const resultEl = document.getElementById('result');

  const colors = [
    '#4A90E2', // синий
    '#7d4b06', // коричневый
    '#FFD700', // жёлтый
    '#4CAF50', // зелёный
    '#FF69B4', // розовый
    '#9B5DE5', // фиолетовый
    '#00C9FF'  // голубой
  ];

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        clickBtn.disabled = true;
        const best = localStorage.getItem('clickerBest') || 0;
        if (score > best) localStorage.setItem('clickerBest', score);
        resultEl.innerHTML = `<strong>Игра окончена! Очков: ${score}. Рекорд: ${Math.max(score, best)}</strong>`;
      }
    }, 1000);
  }

  clickBtn.onclick = () => {
    score++;
    scoreEl.textContent = score;

    const newColor = getRandomColor();
    clickBtn.style.background = `linear-gradient(135deg, ${newColor}, ${shadeColor(newColor, -20)})`;

    clickBtn.style.transform = 'scale(0.96)';
    setTimeout(() => {
      clickBtn.style.transform = '';
    }, 100);
  };

  resetBtn.onclick = () => {
    clearInterval(timer);
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = '0';
    timerEl.textContent = '30';
    resultEl.textContent = '';
    clickBtn.disabled = false;
    startTimer();
  };

  startTimer();
}

// === Игра 2: Генератор приключений ===
function initAdventure() {
  const characters = ['Рыцарь', 'Маг', 'Эльф', 'Гном'];
  const locations = ['Тёмном лесу', 'Заброшенном замке', 'Подводном царстве', 'Пещере дракона'];
  const enemies = ['Коварным вампиром', 'Демоном хаоса', 'Ледяным големом', 'Проклятым королем'];

  const storyEl = document.getElementById('story');
  const historyEl = document.getElementById('history');
  const genBtn = document.getElementById('genBtn');
  const clearBtn = document.getElementById('clearBtn');

  let history = JSON.parse(localStorage.getItem('adventureHistory') || '[]');

  function updateHistory() {
    historyEl.innerHTML = history.map(h => `<div>${h}</div>`).join('');
    localStorage.setItem('adventureHistory', JSON.stringify(history));
  }

  genBtn.onclick = () => {
    const char = characters[Math.floor(Math.random() * characters.length)];
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const enemy = enemies[Math.floor(Math.random() * enemies.length)];
    const story = `Ваш персонаж — ${char} находится в ${loc} и сражается с ${enemy}.`;
    storyEl.textContent = story;
    history.unshift(`${new Date().toLocaleString()} — ${story}`);
    if (history.length > 3) history.pop();                   //сохранение толь 3 последние истории
    updateHistory();
  };

  clearBtn.onclick = () => {
    history = [];
    updateHistory();
    storyEl.textContent = 'История очищена!';
  };

  updateHistory();
}

// === Игра 3: Угадай число ===
function initGuessGame() {
  const secret = Math.floor(Math.random() * 100) + 1;
  let attempts = 7;

  const input = document.getElementById('guessInput');
  const checkBtn = document.getElementById('checkBtn');
  const resetBtn = document.getElementById('resetBtnGuess');
  const hintEl = document.getElementById('hint');
  const attemptsEl = document.getElementById('attempts');
  const resultEl = document.getElementById('gameResult');

  checkBtn.onclick = () => {
    const guess = parseInt(input.value.trim());
    if (isNaN(guess) || guess < 1 || guess > 100) {
      hintEl.textContent = 'Введите число от 1 до 100!';
      return;
    }

    attempts--;
    attemptsEl.textContent = attempts;

    if (guess === secret) {
      const best = localStorage.getItem('guessBest') || Infinity;
      if (attempts + 1 < best) localStorage.setItem('guessBest', attempts + 1);
      resultEl.innerHTML = `<strong>🎉 Поздравляем! Вы угадали число ${secret} за ${8 - attempts} попыток! Рекорд: ${Math.min(attempts + 1, best)} попыток.</strong>`;
      input.disabled = true;
      checkBtn.disabled = true;
    } else if (attempts <= 0) {
      resultEl.innerHTML = `<strong>❌ Игра окончена! Загаданное число: ${secret}</strong>`;
      input.disabled = true;
      checkBtn.disabled = true;
    } else {
      hintEl.textContent = guess > secret ? 'Слишком много!' : 'Слишком мало!';
    }

    input.value = '';
  };

  resetBtn.onclick = () => {
    loadGame('guess'); // перезапуск с новым числом
  };
}

// === Игра 4: Скорость реакции ===
let reactionGame = null;

function initReactionGame() {
  const area = document.getElementById('reactionArea');
  const timerEl = document.getElementById('reactionTimer');
  const hitsEl = document.getElementById('hits');
  const avgEl = document.getElementById('avgTime');
  const resetBtn = document.getElementById('resetReaction');

  let timeLeft = 30;
  let hits = 0;
  let totalReactionTime = 0;
  let gameActive = true;
  let buttonStartTime = 0;

  function startTimer() {
    const interval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(interval);
        gameActive = false;
        area.innerHTML = '<p>Игра окончена!</p>';
        if (hits > 0) {
          avgEl.textContent = Math.round(totalReactionTime / hits);
        }
      }
    }, 1000);
  }

  function showButton() {
    if (!gameActive) return;
    area.innerHTML = ''; 

    const btn = document.createElement('button');
    btn.id = 'reactionBtn';
    btn.textContent = 'Нажми!';
    
    const maxX = area.offsetWidth - 120;
    const maxY = area.offsetHeight - 60;
    const left = Math.max(0, Math.random() * maxX);
    const top = Math.max(0, Math.random() * maxY);

    btn.style.left = left + 'px';
    btn.style.top = top + 'px';

    btn.onclick = () => {
      const reactionTime = Date.now() - buttonStartTime;
      hits++;
      totalReactionTime += reactionTime;
      hitsEl.textContent = hits;
      area.innerHTML = '<p>Отлично! Ждите следующую кнопку...</p>';
      
      setTimeout(showButton, 1000 + Math.random() * 4000);
    };

    area.appendChild(btn);
    buttonStartTime = Date.now();
  }

  resetBtn.onclick = () => {
    loadGame('reaction');
  };

  startTimer();
  setTimeout(showButton, 1000 + Math.random() * 4000);
}

// === Игра 5: Крестики-нолики ===
function initTicTacToe() {
  const grid = document.getElementById('tttGrid');
  const statusEl = document.getElementById('tttStatus');
  const resetBtn = document.getElementById('tttReset');
  const scoreXEl = document.getElementById('scoreX');
  const scoreOEl = document.getElementById('scoreO');

  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let gameOver = false;

  const scores = JSON.parse(localStorage.getItem('tttScores')) || { X: 0, O: 0 };

  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;

  function renderBoard() {
    grid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'tic-tac-toe-cell';
      cell.textContent = board[i] || '';
      cell.onclick = () => makeMove(i);
      grid.appendChild(cell);
    }
  }

  function makeMove(index) {
    if (board[index] || gameOver) return;
    board[index] = currentPlayer;
    if (checkWin()) {
      gameOver = true;
      statusEl.textContent = `Победил: ${currentPlayer}!`;
      scores[currentPlayer]++;
      localStorage.setItem('tttScores', JSON.stringify(scores));
      scoreXEl.textContent = scores.X;
      scoreOEl.textContent = scores.O;
    } else if (board.every(cell => cell)) {
      gameOver = true;
      statusEl.textContent = 'Ничья!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusEl.textContent = `Ходит игрок: ${currentPlayer}`;
    }
    renderBoard();
  }

  function checkWin() {
    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6]          // diagonals
    ];
    return winPatterns.some(pattern =>
      pattern.every(i => board[i] === currentPlayer)
    );
  }

  resetBtn.onclick = () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    statusEl.textContent = 'Ходит: X';
    renderBoard();
  };

  renderBoard();
}

// === Игра 6: Лабиринт ===
function initMaze() {
  const container = document.getElementById('mazeContainer');
  const timerEl = document.getElementById('timeValue');
  const resetBtn = document.getElementById('mazeReset');

  container.innerHTML = '';

  const layout = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,1,1,0,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,0,1,0,0,0,0,0,1,0,0],
    [0,1,1,1,1,1,0,0,0,1,1,1,1,0],
    [0,1,0,0,1,0,0,1,1,1,0,1,0,0],
    [0,1,1,1,1,1,0,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,0,1,0,0,1,1,1,0],
    [0,1,1,1,0,0,0,1,1,0,1,0,1,3],
  ];

  const rows = layout.length;
  const cols = layout[0].length;
  const cellSize = 32;

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
  grid.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
  grid.style.width = `${cols * cellSize}px`;
  grid.style.height = `${rows * cellSize}px`;
  grid.style.margin = '0 auto';
  grid.style.border = '2px solid #333';
  grid.style.borderRadius = '8px';
  grid.style.overflow = 'hidden';

  let playerRow = -1, playerCol = -1;
  let exitRow = -1, exitCol = -1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.style.boxSizing = 'border-box';
      cell.style.position = 'relative';

      const val = layout[r][c];
      if (val === 0) {
        cell.style.backgroundColor = '#5c2187';
        cell.style.border = '1px solid #2b2b2b';
      } else {
        cell.style.backgroundColor = '#0d1117';
        cell.style.border = '1px solid #222';
      }

      if (val === 2) {
        playerRow = r;
        playerCol = c;
      } else if (val === 3) {
        exitRow = r;
        exitCol = c;
        const exitDot = document.createElement('div');
        exitDot.style.position = 'absolute';
        exitDot.style.width = '20px';
        exitDot.style.height = '20px';
        exitDot.style.background = '#FF5252';
        exitDot.style.borderRadius = '4px';
        exitDot.style.top = '5px';
        exitDot.style.left = '5px';
        cell.appendChild(exitDot);
      }

      grid.appendChild(cell);
    }
  }

  container.appendChild(grid);

  const playerDot = document.createElement('div');
  playerDot.className = 'maze-player-dot';
  playerDot.style.position = 'absolute';
  playerDot.style.width = '20px';
  playerDot.style.height = '20px';
  playerDot.style.background = '#4CAF50';
  playerDot.style.borderRadius = '50%';
  playerDot.style.top = `${playerRow * cellSize + 5}px`;
  playerDot.style.left = `${playerCol * cellSize + 5}px`;
  playerDot.style.zIndex = '10';
  grid.appendChild(playerDot);

  // === Таймер ===
  let startTime = Date.now();
  let gameActive = true;
  const updateTimer = () => {
    if (!gameActive) return;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerEl.textContent = elapsed;
    requestAnimationFrame(updateTimer);
  };
  updateTimer();

  // === Управление ===
  function movePlayer(newRow, newCol) {
    if (
      newRow >= 0 && newRow < rows &&
      newCol >= 0 && newCol < cols &&
      layout[newRow][newCol] !== 0
    ) {
      playerRow = newRow;
      playerCol = newCol;
      playerDot.style.top = `${playerRow * cellSize + 5}px`;
      playerDot.style.left = `${playerCol * cellSize + 5}px`;

      if (playerRow === exitRow && playerCol === exitCol) {
        gameActive = false;
        alert(`🎉 Победа! Время: ${timerEl.textContent} секунд`);
      }
    }
  }

  document.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowUp': movePlayer(playerRow - 1, playerCol); break;
      case 'ArrowDown': movePlayer(playerRow + 1, playerCol); break;
      case 'ArrowLeft': movePlayer(playerRow, playerCol - 1); break;
      case 'ArrowRight': movePlayer(playerRow, playerCol + 1); break;
    }
  });

  // === Сброс ===
  resetBtn.onclick = () => {
    loadGame('maze'); // перезапуск
  };
}