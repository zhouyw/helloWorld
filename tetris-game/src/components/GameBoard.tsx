import React from 'react';
import { GameState, Tetromino } from '../types/gameTypes';
import './GameBoard.css';

interface GameBoardProps {
  gameState: GameState;
}

const renderBoard = (board: string[][], currentPiece: Tetromino | null) => {
  // Create a copy of the board to render the current piece on
  const displayBoard = board.map(row => [...row]);

  // Add current piece to display board
  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;
          if (boardY >= 0 && boardY < displayBoard.length && boardX >= 0 && boardX < displayBoard[0].length) {
            displayBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }
  }

  return displayBoard;
};

export const GameBoard: React.FC<GameBoardProps> = ({ gameState }) => {
  const displayBoard = renderBoard(gameState.board, gameState.currentPiece);

  return (
    <div className="game-board">
      {displayBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`board-cell ${cell ? 'filled' : 'empty'}`}
              style={{
                backgroundColor: cell || '#1a1a1a',
                border: cell ? '1px solid #333' : '1px solid #333'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};