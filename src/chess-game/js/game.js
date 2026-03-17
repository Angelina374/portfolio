class Game {
    constructor() {                  //создаем доску, первый ход белых, ничего не выбрано
        this.board = new Board();      
        this.currentTurn = 'white';
        this.selectedPiece = null;
        this.validMoves = [];         //пустой список ходов,  Игра активна
        this.gameOver = false;

        // Находим элементы интерфейса для обновления
        this.turnIndicator = document.getElementById('turn-indicator');
        this.newGameBtn = document.getElementById('new-game-btn');
        
        this.init();
    }

    //Инициализация игры
    init() {
        this.board.setupInitialPosition();              // Расстановка фигур
        this.board.render(this);                 // Отрисовка доски
        this.updateTurnIndicator();               // Обновление индикатора хода
        
        this.newGameBtn.addEventListener('click', () => {
            this.resetGame();                   // Сбросить игру к начальному состоянию
        });
    }

    //Сброс игры
        resetGame() {
        this.currentTurn = 'white';
        this.selectedPiece = null;
        this.validMoves = [];
        this.gameOver = false;
        this.board.setupInitialPosition();          // Пересоздаём доску и фигуры
        this.board.render(this);
        this.updateTurnIndicator();                // Обновляем интерфейс
    }

    //Обработка клика по клетке
    handleCellClick(row, col) {
        if (this.gameOver) return;
        
        const clickedPiece = this.board.getPiece(row, col);
        
        // Если уже выбрана фигура
        if (this.selectedPiece) {
            // Проверка, является ли ход допустимым
            const isValidMove = this.validMoves.some(
                move => move.row === row && move.col === col
            );
            
            if (isValidMove) {
                // Выполняем ход
                this.makeMove(this.selectedPiece.row, this.selectedPiece.col, row, col);
                return;
            }
            
            // Если кликнули на свою фигуру - выбираем её
            if (clickedPiece && clickedPiece.color === this.currentTurn) {
                this.selectPiece(row, col);
                return;
            }
            
            // Снимаем выделение
            this.deselectPiece();
        } else {
            // Если фигура не выбрана - пытаемся выбрать
            if (clickedPiece && clickedPiece.color === this.currentTurn) {
                this.selectPiece(row, col);
            }
        }
    }

    //Выбор фигуры
    selectPiece(row, col) {
        this.deselectPiece();
        
        const piece = this.board.getPiece(row, col);
        if (!piece) return;
        
        this.selectedPiece = piece;
        
        // Подсветка выбранной клетки
        const cell = this.board.element.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        if (cell) {
            cell.classList.add('selected');
        }
        
        // Получаем и подсвечиваем допустимые ходы
        this.validMoves = piece.getValidMoves(this.board.cells);
        this.highlightValidMoves();
    }

    //Снять выделение фигуры
    deselectPiece() {
        this.selectedPiece = null;
        this.validMoves = [];
        this.board.clearHighlights();
    }

    //Подсветка допустимых ходов
    highlightValidMoves() {
        for (const move of this.validMoves) {
            const targetPiece = this.board.getPiece(move.row, move.col);
            const type = targetPiece ? 'capture' : 'highlight';
            this.board.highlightCell(move.row, move.col, type);
        }
    }

    //Выполнение хода
    makeMove(fromRow, fromCol, toRow, toCol) {
        const capturedPiece = this.board.movePiece(fromRow, fromCol, toRow, toCol);
        
        // Смена хода
        this.switchTurn();
        
        // Перерисовка
        this.board.render(this);
        
        // Сброс выделения
        this.deselectPiece();
    }

    //Смена хода
    switchTurn() {
        this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
        this.updateTurnIndicator();
    }

    //Обновление индикатора хода
    updateTurnIndicator() {
        const text = this.currentTurn === 'white' ? 'Ход белых' : 'Ход чёрных';
        this.turnIndicator.textContent = text;
    }

    //Проверка, может ли фигура ходить на эту позицию
    isValidMove(piece, toRow, toCol) {
        if (!Utils.isValidPosition(toRow, toCol)) {
            return false;
        }
        
        const targetPiece = this.board.getPiece(toRow, toCol);
        
        // Нельзя брать свою фигуру
        if (targetPiece && targetPiece.color === piece.color) {
            return false;
        }
        
        return true;
    }
}

// Запуск игры после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});