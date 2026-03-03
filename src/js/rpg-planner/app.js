/**
 * Главный файл приложения
 */

let character;
let taskManager;

const elements = {
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

function init() {
    character = Character.load();
    taskManager = TaskManager.load();
    
    elements.charNameInput.value = character.name;
    elements.avatarDisplay.textContent = character.avatar;
    
    elements.avatarButtons.forEach(btn => {
        if (btn.dataset.avatar === character.avatar) {
            btn.classList.add('active');
        }
    });
    
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
        elements.noTasksMessage.style.display = 'block';
    } else {
        elements.noTasksMessage.style.display = 'none';
    }
    
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

function renderStats() {
    elements.totalCompleted.textContent = taskManager.getTotalCompleted();
    elements.totalXp.textContent = character.totalXp;
}

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
            elements.avatarDisplay.textContent = character.avatar;
            character.save();
        });
    });
    
    elements.taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = elements.taskTitleInput.value.trim();
        const description = elements.taskDescInput.value.trim();
        const xp = parseInt(elements.taskDifficultySelect.value);
        const difficulty = elements.taskDifficultySelect.value;
        
        if (!title) return;
        
        const task = new Task(title, description, difficulty, xp);
        taskManager.addTask(task);
        
        elements.taskForm.reset();
        renderTasks();
    });
    
    elements.activeTasksList.addEventListener('click', handleTaskAction);
    elements.completedTasksList.addEventListener('click', handleTaskAction);
    
    elements.resetBtn.addEventListener('click', () => {
        if (confirm('⚠️ Вы уверены? Весь прогресс будет удален!')) {
            Storage.clearAll();
            location.reload();
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