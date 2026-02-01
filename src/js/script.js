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