import React, { useState, useEffect, useCallback } from 'react';
import { Piece, Direction, GameState } from '../types/game';
import { movePiece, checkWin, getPossibleMoves } from '../utils/gameLogic';
import GamePiece from './GamePiece';

interface GameBoardProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, onGameStateChange }) => {
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Direction[]>([]);
  
  const cellSize = 80;
  const boardWidth = gameState.gridSize.cols * cellSize;
  const boardHeight = gameState.gridSize.rows * cellSize;

  // 更新可能的移动方向
  useEffect(() => {
    if (selectedPieceId) {
      const selectedPiece = gameState.pieces.find(p => p.id === selectedPieceId);
      if (selectedPiece) {
        const moves = getPossibleMoves(selectedPiece, gameState.pieces);
        setPossibleMoves(moves);
      }
    } else {
      setPossibleMoves([]);
    }
  }, [selectedPieceId, gameState.pieces]);

  const handlePieceClick = useCallback((pieceId: string) => {
    if (gameState.isWin) return;
    
    setSelectedPieceId(prevSelected => 
      prevSelected === pieceId ? null : pieceId
    );
  }, [gameState.isWin]);

  const handlePieceMove = useCallback((pieceId: string, direction: Direction) => {
    if (gameState.isWin) return;
    
    const newPieces = movePiece(gameState.pieces, pieceId, direction);
    if (newPieces) {
      const newState: GameState = {
        pieces: newPieces,
        moves: gameState.moves + 1,
        isWin: checkWin(newPieces),
        gridSize: gameState.gridSize
      };
      
      onGameStateChange(newState);
      
      // 如果移动成功，保持选中状态
      // 更新可能的移动方向将通过 useEffect 自动处理
    }
  }, [gameState, onGameStateChange]);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!selectedPieceId || gameState.isWin) return;
      
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
        case 'Escape':
          setSelectedPieceId(null);
          return;
      }
      
      if (direction && possibleMoves.includes(direction)) {
        event.preventDefault();
        handlePieceMove(selectedPieceId, direction);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPieceId, possibleMoves, handlePieceMove, gameState.isWin]);

  const boardStyle: React.CSSProperties = {
    position: 'relative',
    width: boardWidth,
    height: boardHeight,
    border: '4px solid #333',
    borderRadius: '12px',
    backgroundColor: '#f4f1de',
    backgroundImage: `
      linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)
    `,
    backgroundSize: `${cellSize}px ${cellSize}px`,
    margin: '20px auto',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
  };

  return (
    <div style={boardStyle}>
      {gameState.pieces.map(piece => (
        <GamePiece
          key={piece.id}
          piece={piece}
          cellSize={cellSize}
          isSelected={selectedPieceId === piece.id}
          possibleMoves={selectedPieceId === piece.id ? possibleMoves : []}
          onPieceClick={handlePieceClick}
          onPieceMove={handlePieceMove}
        />
      ))}
      
      {/* 获胜提示 */}
      {gameState.isWin && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333',
          border: '3px solid #4ecdc4',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 1000,
        }}>
          🎉 恭喜！您已成功救出曹操！ 🎉
          <br />
          <span style={{ fontSize: '14px', color: '#666' }}>
            总共用了 {gameState.moves} 步
          </span>
        </div>
      )}
    </div>
  );
};

export default GameBoard;