class Board {
    constructor() {
        this.cells = [];                               // Массив клеток ряд и колонка
        this.pieces = [];                              // Массив всех фигур
        this.element = document.getElementById('chess-board');
    }

    //Инициализация пустой доски
    initialize() {
        this.cells = [];
        this.pieces = [];
        
        for (let row = 0; row < 8; row++) {         // Создаём 8 рядов
            this.cells[row] = [];                   // Создаём новый ряд
            // В каждом ряду создаём 8 колонок
            for (let col = 0; col < 8; col++) {
                this.cells[row][col] = null;
            }
        }
    }

    //Расстановка фигур в начальную позицию
    setupInitialPosition() {
        this.initialize();
        
        // Чёрные фигуры (ряды 0-1)
        this.placePiece(new Rook('black', 0, 0), 0, 0);
        this.placePiece(new Knight('black', 0, 1), 0, 1);
        this.placePiece(new Bishop('black', 0, 2), 0, 2);
        this.placePiece(new Queen('black', 0, 3), 0, 3);
        this.placePiece(new King('black', 0, 4), 0, 4);
        this.placePiece(new Bishop('black', 0, 5), 0, 5);
        this.placePiece(new Knight('black', 0, 6), 0, 6);
        this.placePiece(new Rook('black', 0, 7), 0, 7);
        
        for (let col = 0; col < 8; col++) {                // пешки на 2-й горизонтали
            this.placePiece(new Pawn('black', 1, col), 1, col);
        }
        
        for (let col = 0; col < 8; col++) {               // Белые пешки (ряды 6-7)
            this.placePiece(new Pawn('white', 6, col), 6, col);
        }
        
        this.placePiece(new Rook('white', 7, 0), 7, 0);
        this.placePiece(new Knight('white', 7, 1), 7, 1);
        this.placePiece(new Bishop('white', 7, 2), 7, 2);
        this.placePiece(new Queen('white', 7, 3), 7, 3);
        this.placePiece(new King('white', 7, 4), 7, 4);
        this.placePiece(new Bishop('white', 7, 5), 7, 5);
        this.placePiece(new Knight('white', 7, 6), 7, 6);
        this.placePiece(new Rook('white', 7, 7), 7, 7);
    }

    //Разместить фигуру на доске
    placePiece(piece, row, col) {
        this.cells[row][col] = piece;       // Фигура теперь на этой клетке
        piece.row = row;                // Обновляем координаты фигуры
        piece.col = col;
        this.pieces.push(piece);        // Добавляем в список всех фигур   
    }

    //Удалить фигуру с доски (испол при взятие)
    removePiece(row, col) {
        const piece = this.cells[row][col];     // Получаем фигуру
        if (piece) {
            this.cells[row][col] = null;               //если фигура есть,очищаем
            this.pieces = this.pieces.filter(p => p !== piece);  //созд нов масива без фигуры
        }
        return piece;
    }

    //Переместить фигуру
    movePiece(fromRow, fromCol, toRow, toCol) {
        const piece = this.cells[fromRow][fromCol];        // Фигура, которую двигаем
        const capturedPiece = this.cells[toRow][toCol];     // Фигура на целевой клетке (если есть)
        
        if (piece) {
            this.cells[fromRow][fromCol] = null;      //если фигура есть, очищаем старую клетку
            this.cells[toRow][toCol] = piece;         // Размещаем на новой
            piece.row = toRow;                        // Обновляем координаты
            piece.col = toCol;
            piece.hasMoved = true;                    // Отмечаем, что фигура ходила
        }
        
        return capturedPiece;
    }

    //Получить фигуру на позиции
    getPiece(row, col) {
        return this.cells[row][col];
    }

    //Отрисовка доски в DOM
    render(game) {
        this.element.innerHTML = '';        // Полностью очищаем доску перед перерисовкой
        
        for (let row = 0; row < 8; row++) {              // Проходим по всем 64 клеткам
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');      // Создаём div для клетки
                cell.className = `cell ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                // Координаты
                if (col === 0) {
                    const rank = document.createElement('span');
                    rank.className = 'coordinates rank';
                    rank.textContent = 8 - row;
                    cell.appendChild(rank);
                }
                
                if (row === 7) {
                    const file = document.createElement('span');
                    file.className = 'coordinates file';
                    file.textContent = 'abcdefgh'[col];
                    cell.appendChild(file);
                }
                
                // Фигура
                const piece = this.cells[row][col];
                if (piece) {
                    const pieceElement = document.createElement('span');
                    pieceElement.className = `piece ${piece.color}`;
                    pieceElement.textContent = piece.getSymbol();
                    cell.appendChild(pieceElement);
                }
                
                // Обработчик клика
                cell.addEventListener('click', () => {
                    game.handleCellClick(row, col);
                });
                
                this.element.appendChild(cell);
            }
        }
    }

    //Подсветка клетки
    highlightCell(row, col, type = 'highlight') {
        const cell = this.element.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.classList.add(type);
        }
    }

    //Очистить все подсветки
    clearHighlights() {
        const cells = this.element.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('selected', 'highlight', 'capture', 'check');
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Board;
}