/**
 * Класс Задачи
 */

class Task {
    constructor(title, description, difficulty, xp) {
        this.id = Date.now();
        this.title = title;
        this.description = description || '';
        this.difficulty = difficulty;
        this.xp = xp;
        this.completed = false;
        this.createdAt = new Date().toISOString();
        this.completedAt = null;
    }

    markComplete() {
        this.completed = true;
        this.completedAt = new Date().toISOString();
    }

    markIncomplete() {
        this.completed = false;
        this.completedAt = null;
    }

    getDifficultyText() {
        const difficulties = {
            '10': '🟢 Легкая',
            '25': '🟡 Средняя',
            '50': '🟠 Сложная',
            '100': '🔴 Эпическая'
        };
        return difficulties[this.difficulty] || this.difficulty;
    }

    getDifficultyColor() {
        const colors = {
            '10': '#27ae60',
            '25': '#f1c40f',
            '50': '#e67e22',
            '100': '#c0392b'
        };
        return colors[this.difficulty] || '#95a5a6';
    }
}

/**
 * Менеджер задач
 */

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.save();
    }

    removeTask(id) {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            this.save();
            return true;
        }
        return false;
    }

    completeTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            if (task.completed) {
                task.markIncomplete();
            } else {
                task.markComplete();
            }
            this.save();
            return task;
        }
        return null;
    }

    getActiveTasks() {
        return this.tasks.filter(task => !task.completed);
    }

    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    }

    getAllTasks() {
        return this.tasks;
    }

    getTotalCompleted() {
        return this.getCompletedTasks().length;
    }

    save() {
        Storage.save('rpg_tasks', this.tasks);
    }

    static load() {
        const data = Storage.load('rpg_tasks');
        const manager = new TaskManager();
        
        if (data && Array.isArray(data)) {
            manager.tasks = data.map(taskData => {
                const task = new Task(
                    taskData.title,
                    taskData.description,
                    taskData.difficulty,
                    taskData.xp
                );
                task.id = taskData.id;
                task.completed = taskData.completed;
                task.createdAt = taskData.createdAt;
                task.completedAt = taskData.completedAt;
                return task;
            });
        }
        
        return manager;
    }

    clearAll() {
        this.tasks = [];
        this.save();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Task, TaskManager };
}