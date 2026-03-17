//Вспомогательные функции (utils.js)
const Utils = {
    /**
     * Конвертирует индексы массива в шахматную нотацию
     * @param {number} row - ряд (0-7)
     * @param {number} col - колонка (0-7)
     * @returns {string} - нотация (a1-h8)
     */
    toNotation(row, col) {
        const files = 'abcdefgh';
        const ranks = '87654321';
        return `${files[col]}${ranks[row]}`;
    },

    /**
     * Проверяет, находится ли позиция в пределах доски
     * @param {number} row 
     * @param {number} col 
     * @returns {boolean}
     */
    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    },

    //Unicode символы шахматных фигур
    PIECE_SYMBOLS: {
        white: {
            king: '♔',
            queen: '♕',
            rook: '♖',
            bishop: '♗',
            knight: '♘',
            pawn: '♙'
        },
        black: {
            king: '♚',
            queen: '♛',
            rook: '♜',
            bishop: '♝',
            knight: '♞',
            pawn: '♟'
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}