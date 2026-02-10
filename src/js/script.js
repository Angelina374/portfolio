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

        // === Переключение игр ===
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