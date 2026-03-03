<<<<<<< HEAD
//Главный файл приложения
let character;
let taskManager;

const elements = {                           //создание пустых переменых для хранения обьектов и задач 
=======
/**
 * Главный файл приложения
 */

let character;
let taskManager;

const elements = {
>>>>>>> 41a63d8
    charNameInput: document.getElementById('character-name'),
    charLevel: document.getElementById('level'),
    charXpCurrent: document.getElementById('current-xp'),
    charXpNeeded: document.getElementById('needed-xp'),
    xpBar: document.getElementById('xp-bar'),
    avatarDisplay: document.getElementById('avatar'),
    avatarButtons: document.querySelectorAll('.avatar-btn'),
    
    taskForm: document.getElementById('task-form'),
    taskTitleInput: document.getElementById('task-title'),
    taskDescInput: document.getElementById('task-description'),
    taskDifficultySelect: document.getElementById('task-difficulty'),
    activeTasksList: document.getElementById('active-tasks-list'),
    completedTasksList: document.getElementById('completed-tasks-list'),
    noTasksMessage: document.getElementById('no-tasks-message'),
    
    totalCompleted: document.getElementById('total-completed'),
    totalXp: document.getElementById('total-xp'),
    createdDate: document.getElementById('created-date'),
    resetBtn: document.getElementById('reset-btn'),
    
    characterSection: document.getElementById('character-section')
};

<<<<<<< HEAD
function init() {                    //загружаем сохран. даные перса и задач
    character = Character.load();
    taskManager = TaskManager.load();
                                         //Заполняем поля формы значениями из загруженного персонажа
    elements.charNameInput.value = character.name;
    elements.avatarDisplay.textContent = character.avatar;
                                        //подсветка кнопки выбран. аватара как активную
=======
function init() {
    character = Character.load();
    taskManager = TaskManager.load();
    
    elements.charNameInput.value = character.name;
    elements.avatarDisplay.textContent = character.avatar;
    
>>>>>>> 41a63d8
    elements.avatarButtons.forEach(btn => {
        if (btn.dataset.avatar === character.avatar) {
            btn.classList.add('active');
        }
    });
<<<<<<< HEAD
                           //дата создания перса
    if (character.createdAt) {
        elements.createdDate.textContent = new Date(character.createdAt).toLocaleDateString();
    }
                        //отрисовка даных на странице 
    renderCharacter();               //обнов.уров. xp, полоса прогрес. 
    renderTasks();                   //список задач
    renderStats();                   // обнов. статистика
    
    addEventListeners();          //обработ. кликов и задач
     // Логируем успешный запуск (видно в консоли F12)
    console.log('[App] Приложение инициализировано');
}

function renderCharacter() {          //функц. отображение даных
    elements.charLevel.textContent = character.level;               // Обновляем текстовые значения
    elements.charXpCurrent.textContent = character.xp;
    elements.charXpNeeded.textContent = character.getXpForNextLevel();
                                        // Рассчитываем процент заполнения полосы XP
    const needed = character.getXpForNextLevel();
    const percent = Math.min(100, (character.xp / needed) * 100);
    elements.xpBar.style.width = `${percent}%`;  // Применяем ширину к полосе прогресса
    
    character.save(); //сохранение изменение прессонажа в localStorage
}

function renderTasks() {                //Отрисовывает списки активных и выполненных задач
    const activeTasks = taskManager.getActiveTasks();     // Получаем отсортированные списки задач от TaskManager
    const completedTasks = taskManager.getCompletedTasks();
    
    elements.activeTasksList.innerHTML = '';         // Очищаем текущее содержимое списков
    elements.completedTasksList.innerHTML = '';
    
    if (activeTasks.length === 0) {              // Показываем/скрываем сообщение "Нет задач"
=======
    
    if (character.createdAt) {
        elements.createdDate.textContent = new Date(character.createdAt).toLocaleDateString();
    }
    
    renderCharacter();
    renderTasks();
    renderStats();
    
    addEventListeners();
    
    console.log('[App] Приложение инициализировано');
}

function renderCharacter() {
    elements.charLevel.textContent = character.level;
    elements.charXpCurrent.textContent = character.xp;
    elements.charXpNeeded.textContent = character.getXpForNextLevel();
    
    const needed = character.getXpForNextLevel();
    const percent = Math.min(100, (character.xp / needed) * 100);
    elements.xpBar.style.width = `${percent}%`;
    
    character.save();
}

function renderTasks() {
    const activeTasks = taskManager.getActiveTasks();
    const completedTasks = taskManager.getCompletedTasks();
    
    elements.activeTasksList.innerHTML = '';
    elements.completedTasksList.innerHTML = '';
    
    if (activeTasks.length === 0) {
>>>>>>> 41a63d8
        elements.noTasksMessage.style.display = 'block';
    } else {
        elements.noTasksMessage.style.display = 'none';
    }
<<<<<<< HEAD
                                 // Создаём HTML-элемент для каждой активной задачи и добавляем в список (и для выполненых)
=======
    
>>>>>>> 41a63d8
    activeTasks.forEach(task => {
        elements.activeTasksList.appendChild(createTaskElement(task));
    });
    
    completedTasks.forEach(task => {
        elements.completedTasksList.appendChild(createTaskElement(task));
    });
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    
    li.innerHTML = `
        <div class="task-content">
            <div class="task-header">
                <span class="task-title">${escapeHtml(task.title)}</span>
                <span class="task-xp">+${task.xp} XP</span>
            </div>
            ${task.description ? `<div class="task-desc">${escapeHtml(task.description)}</div>` : ''}
            <div class="task-meta">
                <span class="task-difficulty" style="color: ${task.getDifficultyColor()}">
                    ${task.getDifficultyText()}
                </span>
                <span class="task-date">${new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
        <div class="task-actions">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <button class="delete-btn" title="Удалить задачу">🗑️</button>
        </div>
    `;
    
    return li;
}
<<<<<<< HEAD
                            //Обновляет отображение статистики
=======

>>>>>>> 41a63d8
function renderStats() {
    elements.totalCompleted.textContent = taskManager.getTotalCompleted();
    elements.totalXp.textContent = character.totalXp;
}
<<<<<<< HEAD
                                
function addEventListeners() {
    elements.charNameInput.addEventListener('change', (e) => {        //изменен имени перса
        character.name = e.target.value;             //обнов имя в обьекте
        character.save();           
    });
    
    elements.avatarButtons.forEach(btn => {       //выбор аватара
        btn.addEventListener('click', () => {
            elements.avatarButtons.forEach(b => b.classList.remove('active'));  //убираем актив у всех
            btn.classList.add('active');               //добав актив нажатой кнопки
            character.avatar = btn.dataset.avatar;        //обнов дан перса
=======

function addEventListeners() {
    elements.charNameInput.addEventListener('change', (e) => {
        character.name = e.target.value;
        character.save();
    });
    
    elements.avatarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.avatarButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            character.avatar = btn.dataset.avatar;
>>>>>>> 41a63d8
            elements.avatarDisplay.textContent = character.avatar;
            character.save();
        });
    });
<<<<<<< HEAD
                                            //отправка формы(создание нов задачи)
    elements.taskForm.addEventListener('submit', (e) => {
        e.preventDefault();                   // Отменяем стандартную перезагрузку страницы
        
        const title = elements.taskTitleInput.value.trim();             // Получаем и очищаем значения полей
=======
    
    elements.taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = elements.taskTitleInput.value.trim();
>>>>>>> 41a63d8
        const description = elements.taskDescInput.value.trim();
        const xp = parseInt(elements.taskDifficultySelect.value);
        const difficulty = elements.taskDifficultySelect.value;
        
<<<<<<< HEAD
        if (!title) return;            // Не создаём задачу без названия
        
        const task = new Task(title, description, difficulty, xp);     // Создаём новый объект задачи и добавляем в менеджер
        taskManager.addTask(task);
        
        elements.taskForm.reset();    // Очищаем форму и перерисовываем список
=======
        if (!title) return;
        
        const task = new Task(title, description, difficulty, xp);
        taskManager.addTask(task);
        
        elements.taskForm.reset();
>>>>>>> 41a63d8
        renderTasks();
    });
    
    elements.activeTasksList.addEventListener('click', handleTaskAction);
    elements.completedTasksList.addEventListener('click', handleTaskAction);
<<<<<<< HEAD
                                //Кнопка сброса прогресса
    elements.resetBtn.addEventListener('click', () => {
        if (confirm('⚠️ Вы уверены? Весь прогресс будет удален!')) {
            Storage.clearAll();                // Удаляем данные из localStorage
            location.reload();                 // Перезагружаем страницу
=======
    
    elements.resetBtn.addEventListener('click', () => {
        if (confirm('⚠️ Вы уверены? Весь прогресс будет удален!')) {
            Storage.clearAll();
            location.reload();
>>>>>>> 41a63d8
        }
    });
    
    document.addEventListener('characterLevelUp', (e) => {
        showLevelUpNotification(e.detail.level);
    });
}

function handleTaskAction(e) {
    const li = e.target.closest('li');
    if (!li) return;
    
    const taskId = parseInt(li.dataset.id);
    
    if (e.target.classList.contains('task-checkbox')) {
        const task = taskManager.completeTask(taskId);
        if (task) {
            if (task.completed) {
                character.addXp(task.xp);
                renderCharacter();
                renderStats();
                showNotification(`+${task.xp} XP получено!`, 'success');
            }
            renderTasks();
        }
    }
    
    if (e.target.classList.contains('delete-btn')) {
        if (confirm('Удалить эту задачу?')) {
            taskManager.removeTask(taskId);
            renderTasks();
            renderStats();
        }
    }
}
<<<<<<< HEAD
                      //уведомления и эффекты
=======

>>>>>>> 41a63d8
function showLevelUpNotification(level) {
    elements.characterSection.classList.add('level-up-animation');
    
    setTimeout(() => {
        alert(`🎉 УРОВЕНЬ ПОВЫШЕН! 🎉\nТеперь вы ${level} уровня!`);
    }, 300);
    
    setTimeout(() => {
        elements.characterSection.classList.remove('level-up-animation');
    }, 1000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', init);