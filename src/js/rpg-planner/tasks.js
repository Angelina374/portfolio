<<<<<<< HEAD
// Класс Задачи
class Task {
    constructor(title, description, difficulty, xp) {        //конструктор задач с параметрами 
=======
/**
 * Класс Задачи
 */

class Task {
    constructor(title, description, difficulty, xp) {
>>>>>>> 41a63d8
        this.id = Date.now();
        this.title = title;
        this.description = description || '';
        this.difficulty = difficulty;
        this.xp = xp;
        this.completed = false;
        this.createdAt = new Date().toISOString();
        this.completedAt = null;
    }
<<<<<<< HEAD
                               //отметка задачи выполнено
    markComplete() {
        this.completed = true;                     //фиксирует время выполнения
        this.completedAt = new Date().toISOString();
    }
                              //отмена отметки выполненой задачи
=======

    markComplete() {
        this.completed = true;
        this.completedAt = new Date().toISOString();
    }

>>>>>>> 41a63d8
    markIncomplete() {
        this.completed = false;
        this.completedAt = null;
    }

<<<<<<< HEAD
    getDifficultyText() {        //отображение сложности 
=======
    getDifficultyText() {
>>>>>>> 41a63d8
        const difficulties = {
            '10': '🟢 Легкая',
            '25': '🟡 Средняя',
            '50': '🟠 Сложная',
            '100': '🔴 Эпическая'
        };
<<<<<<< HEAD
        return difficulties[this.difficulty] || this.difficulty;     // Возвращаем текст по коду сложности или сам код, если не найдено
    }

    getDifficultyColor() {      //цвет для индикатора сложностей
=======
        return difficulties[this.difficulty] || this.difficulty;
    }

    getDifficultyColor() {
>>>>>>> 41a63d8
        const colors = {
            '10': '#27ae60',
            '25': '#f1c40f',
            '50': '#e67e22',
            '100': '#c0392b'
        };
<<<<<<< HEAD
        return colors[this.difficulty] || '#95a5a6';      // Серый по умолчанию
    }
}

// Менеджер задач
class TaskManager {   
    constructor() {        //создаёт пустой менеджер задач
        this.tasks = [];      // Массив всех задач (активных и выполненных)
    }

    addTask(task) {  //добав новой задачи в список
        this.tasks.push(task);        // добав задачу в конец массива
        this.save();
    }

    removeTask(id) { //удаление задачи по id
        const taskIndex = this.tasks.findIndex(t => t.id === id);     // Находим индекс задачи с таким ID
        if (taskIndex !== -1) {            // Если задача найдена (индекс не -1)
            this.tasks.splice(taskIndex, 1);    //удал 1 элемент 
            this.save();
            return true;
        }
        return false;      //задача не найдена
    }

    completeTask(id) {  //переключ задач выполнено или нет
        const task = this.tasks.find(t => t.id === id);    //находим задачи по id
        if (task) {                 // Переключаем статус на противоположный
            if (task.completed) { 
                task.markIncomplete();   //снять галочку
            } else {
                task.markComplete();      //пост галочку
            }
            this.save(); 
            return task;      //Вернуть задачу (чтобы начислить XP в app.js)
        }
        return null;    //задача не найдена
=======
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
>>>>>>> 41a63d8
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

<<<<<<< HEAD
    static load() {                           
        const data = Storage.load('rpg_tasks');      //загружаем данные из хранилища
        const manager = new TaskManager();          //создаём новый пустой менеджер
         
        if (data && Array.isArray(data)) {      // Если данные найдены и это массив
            manager.tasks = data.map(taskData => {    // Преобразуем каждый plain-объект обратно в экземпляр класса Task
                const task = new Task(                   // Создаём новый Task с базовыми параметрами
=======
    static load() {
        const data = Storage.load('rpg_tasks');
        const manager = new TaskManager();
        
        if (data && Array.isArray(data)) {
            manager.tasks = data.map(taskData => {
                const task = new Task(
>>>>>>> 41a63d8
                    taskData.title,
                    taskData.description,
                    taskData.difficulty,
                    taskData.xp
                );
<<<<<<< HEAD
                task.id = taskData.id;             // Восстанавливаем остальные свойства, которые не передаются в конструктор
                task.completed = taskData.completed;
                task.createdAt = taskData.createdAt;
                task.completedAt = taskData.completedAt;
                return task;            // Возвращаем полноценный объект Task
            });
        }
        return manager;     // Если дан нет возвращ менеджер с пустым списком
    }

    clearAll() {      //полностью очищаем список задач
        this.tasks = [];     //обнуляем массив
=======
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
>>>>>>> 41a63d8
        this.save();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Task, TaskManager };
}
