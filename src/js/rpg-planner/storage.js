<<<<<<< HEAD
/*localStorage сохранение загрузка и удаление данных*/

const Storage = {              // Объект Storage  единая точка доступа к localStorage
=======
/* Модуль для работы с localStorage 
сохранение загрузка и удаление данных*/

const Storage = {              // Объект Storage — единая точка доступа к localStorage
>>>>>>> 41a63d8
    save(key, data) {
        try {
            const jsonData = JSON.stringify(data);           // Преобразуем данные в JSON-строку
            localStorage.setItem(key, jsonData);            // Сохраняем строку в localStorage под ключом
            console.log(`[Storage] Сохранено: ${key}`, data);     // выводим успешное сохранение
        } catch (error) {
            console.error(`[Storage] Ошибка сохранения ${key}:`, error);
        }
    },

    load(key) {        // Загружает данные из localStorage по ключу 
        try {
            const jsonData = localStorage.getItem(key);          // Получаем строку из localStorage по ключу
            if (jsonData === null) {                            // Если данных нет выводит null
                console.log(`[Storage] Не найдено: ${key}`);
                return null;
            }
            const data = JSON.parse(jsonData);                  // Преобразуем JSON-строку обратно в JavaScript-объект
            console.log(`[Storage] Загружено: ${key}`, data);       // выводим успешную загрузку
            return data;                                                // Возвращаем данные для использования в приложении
        } catch (error) {
            console.error(`[Storage] Ошибка загрузки ${key}:`, error);
            return null;
        }
    },

    remove(key) {    //Удаляет данные из localStorage по указанному ключу
        try {
            localStorage.removeItem(key);      // Удаляем запись из localStorage
            console.log(`[Storage] Удалено: ${key}`);
        } catch (error) {
            console.error(`[Storage] Ошибка удаления ${key}:`, error);
        }
    },

    clearAll() {       //Полная очистка данных приложения
        try {
            localStorage.removeItem('rpg_character');           // Удаляем данные персонажа
            localStorage.removeItem('rpg_tasks');               // Удаляем список задач
            console.log('[Storage] Все данные очищены');        
        } catch (error) {
            console.error('[Storage] Ошибка очистки:', error);
        }
    },

    exists(key) {
        return localStorage.getItem(key) !== null;
    }
};
                          //Экспорт модуля для совместимости
if (typeof module !== 'undefined' && module.exports) {  //проверка позволяет использовать файл как в браузере, так и в Node.js
    module.exports = Storage;
}