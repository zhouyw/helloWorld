import { Position, Size, Piece, Direction, GRID_SIZE, WIN_CONDITION } from '../types/game';

// 检查位置是否在网格内
export function isValidPosition(position: Position, size: Size): boolean {
  return (
    position.row >= 0 &&
    position.col >= 0 &&
    position.row + size.height <= GRID_SIZE.rows &&
    position.col + size.width <= GRID_SIZE.cols
  );
}

// 检查两个棋子是否重叠
export function isPieceOverlapping(piece1: Piece, piece2: Piece): boolean {
  if (piece1.id === piece2.id) return false;
  
  const p1 = piece1.position;
  const s1 = piece1.size;
  const p2 = piece2.position;
  const s2 = piece2.size;
  
  return !(
    p1.row + s1.height <= p2.row ||
    p2.row + s2.height <= p1.row ||
    p1.col + s1.width <= p2.col ||
    p2.col + s2.width <= p1.col
  );
}

// 获取指定方向的新位置
export function getNewPosition(position: Position, direction: Direction): Position {
  switch (direction) {
    case 'up':
      return { row: position.row - 1, col: position.col };
    case 'down':
      return { row: position.row + 1, col: position.col };
    case 'left':
      return { row: position.row, col: position.col - 1 };
    case 'right':
      return { row: position.row, col: position.col + 1 };
    default:
      return position;
  }
}

// 检查棋子是否可以移动到指定方向
export function canMovePiece(piece: Piece, direction: Direction, allPieces: Piece[]): boolean {
  const newPosition = getNewPosition(piece.position, direction);
  
  // 检查新位置是否在网格内
  if (!isValidPosition(newPosition, piece.size)) {
    return false;
  }
  
  // 创建移动后的棋子
  const movedPiece = { ...piece, position: newPosition };
  
  // 检查是否与其他棋子重叠
  const otherPieces = allPieces.filter(p => p.id !== piece.id);
  return !otherPieces.some(otherPiece => isPieceOverlapping(movedPiece, otherPiece));
}

// 移动棋子
export function movePiece(pieces: Piece[], pieceId: string, direction: Direction): Piece[] | null {
  const pieceIndex = pieces.findIndex(p => p.id === pieceId);
  if (pieceIndex === -1) return null;
  
  const piece = pieces[pieceIndex];
  if (!canMovePiece(piece, direction, pieces)) {
    return null;
  }
  
  const newPieces = [...pieces];
  newPieces[pieceIndex] = {
    ...piece,
    position: getNewPosition(piece.position, direction)
  };
  
  return newPieces;
}

// 检查是否获胜
export function checkWin(pieces: Piece[]): boolean {
  const caocao = pieces.find(p => p.id === 'caocao');
  if (!caocao) return false;
  
  return (
    caocao.position.row === WIN_CONDITION.row &&
    caocao.position.col === WIN_CONDITION.col
  );
}

// 获取所有可能的移动方向
export function getPossibleMoves(piece: Piece, allPieces: Piece[]): Direction[] {
  const directions: Direction[] = ['up', 'down', 'left', 'right'];
  return directions.filter(direction => canMovePiece(piece, direction, allPieces));
}

// 创建网格状态表示（用于调试和可视化）
export function createGridState(pieces: Piece[]): string[][] {
  const grid: string[][] = Array(GRID_SIZE.rows).fill(null).map(() => 
    Array(GRID_SIZE.cols).fill('.')
  );
  
  pieces.forEach(piece => {
    for (let r = 0; r < piece.size.height; r++) {
      for (let c = 0; c < piece.size.width; c++) {
        const row = piece.position.row + r;
        const col = piece.position.col + c;
        if (row >= 0 && row < GRID_SIZE.rows && col >= 0 && col < GRID_SIZE.cols) {
          grid[row][col] = piece.id.charAt(0).toUpperCase();
        }
      }
    }
  });
  
  return grid;
}