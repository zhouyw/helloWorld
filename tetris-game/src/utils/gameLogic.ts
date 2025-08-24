import { 
  Tetromino, 
  Position, 
  BOARD_WIDTH, 
  BOARD_HEIGHT, 
  TETROMINO_SHAPES
} from '../types/gameTypes';

export const createEmptyBoard = (): string[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(''));
};

export const getRandomTetromino = (): Tetromino => {
  const randomShape = TETROMINO_SHAPES[Math.floor(Math.random() * TETROMINO_SHAPES.length)];
  return {
    shape: randomShape.shape,
    position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(randomShape.shape[0].length / 2), y: 0 },
    color: randomShape.color
  };
};

export const isValidPosition = (board: string[][], piece: Tetromino, newPosition: Position): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = newPosition.x + x;
        const newY = newPosition.y + y;
        
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }
        
        if (newY >= 0 && board[newY][newX] !== '') {
          return false;
        }
      }
    }
  }
  return true;
};

export const rotatePiece = (piece: Tetromino): Tetromino => {
  const rotated = piece.shape[0].map((_, index) =>
    piece.shape.map(row => row[index]).reverse()
  );
  
  return {
    ...piece,
    shape: rotated
  };
};

export const placePiece = (board: string[][], piece: Tetromino): string[][] => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;
        if (boardY >= 0) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }
  
  return newBoard;
};

export const clearLines = (board: string[][]): { newBoard: string[][], linesCleared: number } => {
  const newBoard = board.filter(row => row.some(cell => cell === ''));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(''));
  }
  
  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const baseScores = [0, 40, 100, 300, 1200];
  return baseScores[linesCleared] * (level + 1);
};

export const calculateLevel = (totalLines: number): number => {
  return Math.floor(totalLines / 10);
};

export const getDropInterval = (level: number): number => {
  return Math.max(50, 1000 - (level * 50));
};

export const isGameOver = (board: string[][], piece: Tetromino): boolean => {
  return !isValidPosition(board, piece, piece.position);
};