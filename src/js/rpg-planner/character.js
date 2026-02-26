class Character {                //Класс Персонажа
    constructor(name = "Герой", level = 1, xp = 0, avatar = "🧙") {
        this.name = name;
        this.level = level;            //создание обьекта со след свойствами
        this.xp = xp;
        this.avatar = avatar;
        this.totalXp = 0;
        this.createdAt = new Date().toISOString();  //дата в формате ISO
    }

    getXpForNextLevel() {             //формула расчета опыта
        return 100 * this.level;
    }

    addXp(amount) {
        this.xp += amount;            // Увеличиваем текущий опыт
        this.totalXp += amount;       // Увеличиваем общий опыт для статистики
        this.checkLevelUp();          // Проверяем достигнут ли следующий уровень
    }

    checkLevelUp() {                  //проверка для повышения уровня
        const needed = this.getXpForNextLevel();        // Узнаём сколько нужно XP для следующего уровня
        
        if (this.xp >= needed) {
            this.xp -= needed;                   // Вычитаем потраченный опыт
            this.level++;                  // Повышаем уровень на 1
            //создание и отправка события 
            document.dispatchEvent(new CustomEvent('characterLevelUp', {
                detail: { level: this.level }
            }));
            
            this.checkLevelUp();
        }
    }
                         //Сохраняет текущее состояние персонажа
    save() {         
        Storage.save('rpg_character', this);
    }
                                    //загрузка персонажа при запуске сайта
    static load() {                  
        const data = Storage.load('rpg_character');  //проверка есть ли сохраненый герой
        if (data) {                           //если есть востанавливает все 
            return Object.assign(new Character(), data);
        }
        return new Character();      //если нет создает нового
    }

    reset() {              //сброс прогресса при гажатии на кнопку сбросить прогресс
        this.level = 1;
        this.xp = 0;
        this.totalXp = 0;
        this.save();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Character;
}