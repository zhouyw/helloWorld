import React from 'react';
import { Piece, Direction } from '../types/game';

interface GamePieceProps {
  piece: Piece;
  cellSize: number;
  isSelected: boolean;
  possibleMoves: Direction[];
  onPieceClick: (pieceId: string) => void;
  onPieceMove: (pieceId: string, direction: Direction) => void;
}

const GamePiece: React.FC<GamePieceProps> = ({
  piece,
  cellSize,
  isSelected,
  possibleMoves,
  onPieceClick,
  onPieceMove
}) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: piece.position.col * cellSize,
    top: piece.position.row * cellSize,
    width: piece.size.width * cellSize - 2,
    height: piece.size.height * cellSize - 2,
    backgroundColor: piece.color,
    border: isSelected ? '3px solid #fff' : '2px solid #333',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: Math.min(cellSize / 3, 16),
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
    transition: 'all 0.2s ease',
    boxShadow: isSelected ? '0 0 15px rgba(255,255,255,0.8)' : '0 2px 5px rgba(0,0,0,0.3)',
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isSelected) return;
    
    event.preventDefault();
    let direction: Direction | null = null;
    
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
    
    if (direction && possibleMoves.includes(direction)) {
      onPieceMove(piece.id, direction);
    }
  };

  return (
    <div
      style={style}
      onClick={() => onPieceClick(piece.id)}
      onKeyDown={handleKeyDown}
      tabIndex={isSelected ? 0 : -1}
      role="button"
      aria-label={`${piece.name} 棋子`}
    >
      <span>{piece.name}</span>
      {isSelected && possibleMoves.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '4px',
          fontSize: '10px',
          color: '#666',
          whiteSpace: 'nowrap'
        }}>
          使用方向键移动
        </div>
      )}
    </div>
  );
};

export default GamePiece;