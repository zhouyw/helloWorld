export interface Position {
  x: number;
  y: number;
}

export interface TetrominoShape {
  shape: number[][];
  color: string;
}

export interface Tetromino {
  shape: number[][];
  position: Position;
  color: string;
}

export interface GameState {
  board: string[][];
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const TETROMINO_SHAPES: TetrominoShape[] = [
  // I-piece
  {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#00f5ff'
  },
  // O-piece
  {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#ffff00'
  },
  // T-piece
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#800080'
  },
  // S-piece
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#00ff00'
  },
  // Z-piece
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: '#ff0000'
  },
  // J-piece
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#0000ff'
  },
  // L-piece
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#ffa500'
  }
];