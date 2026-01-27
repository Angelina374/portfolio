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