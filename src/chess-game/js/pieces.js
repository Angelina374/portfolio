//Базовый класс для всех фигур 
class Piece {
    constructor(color, type, row, col) {
        this.color = color;
        this.type = type;
        this.row = row;
        this.col = col;
        this.hasMoved = false;
    }

    //Получить символ фигуры
    getSymbol() {
        return Utils.PIECE_SYMBOLS[this.color][this.type];
    }

    //Получить допустимые ходы (переопределяется в наследниках)
    getValidMoves(board) {
        return [];
    }

    //Проверить, может ли фигура двигаться в этом направлении
    getDirectionalMoves(board, directions) {
        const moves = [];
        
        for (const [rowDir, colDir] of directions) {
            let newRow = this.row + rowDir;
            let newCol = this.col + colDir;
            
            while (Utils.isValidPosition(newRow, newCol)) {
                const targetPiece = board[newRow][newCol];
                
                if (targetPiece === null) {
                    moves.push({ row: newRow, col: newCol });
                } else {
                    if (targetPiece.color !== this.color) {
                        moves.push({ row: newRow, col: newCol });
                    }
                    break;
                }
                
                newRow += rowDir;
                newCol += colDir;
            }
        }
        
        return moves;
    }
}

//Пешка
class Pawn extends Piece {
    constructor(color, row, col) {
        super(color, 'pawn', row, col);
    }

    getValidMoves(board) {
        const moves = [];
        const direction = this.color === 'white' ? -1 : 1;
        const startRow = this.color === 'white' ? 6 : 1;

        // Ход вперёд на 1 клетку
        const oneStepRow = this.row + direction;
        if (Utils.isValidPosition(oneStepRow, this.col) && 
            board[oneStepRow][this.col] === null) {
            moves.push({ row: oneStepRow, col: this.col });
            
            // Ход вперёд на 2 клетки (только с начальной позиции)
            if (this.row === startRow) {
                const twoStepRow = this.row + 2 * direction;
                if (board[twoStepRow][this.col] === null) {
                    moves.push({ row: twoStepRow, col: this.col });
                }
            }
        }

        // Взятие по диагонали
        const captureDirections = [[direction, -1], [direction, 1]];
        for (const [rowDir, colDir] of captureDirections) {
            const newRow = this.row + rowDir;
            const newCol = this.col + colDir;
            
            if (Utils.isValidPosition(newRow, newCol)) {
                const targetPiece = board[newRow][newCol];
                if (targetPiece !== null && targetPiece.color !== this.color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }

        return moves;
    }
}

//Ладья
class Rook extends Piece {
    constructor(color, row, col) {
        super(color, 'rook', row, col);
    }

    getValidMoves(board) {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        return this.getDirectionalMoves(board, directions);
    }
}

//Конь
class Knight extends Piece {
    constructor(color, row, col) {
        super(color, 'knight', row, col);
    }

    getValidMoves(board) {
        const moves = [];
        const knightMoves = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];

        for (const [rowDir, colDir] of knightMoves) {
            const newRow = this.row + rowDir;
            const newCol = this.col + colDir;
            
            if (Utils.isValidPosition(newRow, newCol)) {
                const targetPiece = board[newRow][newCol];
                if (targetPiece === null || targetPiece.color !== this.color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }

        return moves;
    }
}

//Слон
class Bishop extends Piece {
    constructor(color, row, col) {
        super(color, 'bishop', row, col);
    }

    getValidMoves(board) {
        const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        return this.getDirectionalMoves(board, directions);
    }
}

//Ферзь
class Queen extends Piece {
    constructor(color, row, col) {
        super(color, 'queen', row, col);
    }

    getValidMoves(board) {
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1],
            [-1, -1], [-1, 1], [1, -1], [1, 1]
        ];
        return this.getDirectionalMoves(board, directions);
    }
}

//Король
class King extends Piece {
    constructor(color, row, col) {
        super(color, 'king', row, col);
    }

    getValidMoves(board) {
        const moves = [];
        const kingMoves = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (const [rowDir, colDir] of kingMoves) {
            const newRow = this.row + rowDir;
            const newCol = this.col + colDir;
            
            if (Utils.isValidPosition(newRow, newCol)) {
                const targetPiece = board[newRow][newCol];
                if (targetPiece === null || targetPiece.color !== this.color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }

        return moves;
    }
}

// Экспорт классов
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Piece, Pawn, Rook, Knight, Bishop, Queen, King };
}