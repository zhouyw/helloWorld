import React from 'react';
import { Tetromino } from '../types/gameTypes';
import './NextPiece.css';

interface NextPieceProps {
  nextPiece: Tetromino | null;
}

export const NextPiece: React.FC<NextPieceProps> = ({ nextPiece }) => {
  if (!nextPiece) {
    return (
      <div className="next-piece-container">
        <h3>Next</h3>
        <div className="next-piece-preview">
          <div className="empty-preview">No piece</div>
        </div>
      </div>
    );
  }

  const { shape, color } = nextPiece;

  return (
    <div className="next-piece-container">
      <h3>Next</h3>
      <div className="next-piece-preview">
        {shape.map((row, rowIndex) => (
          <div key={rowIndex} className="preview-row">
            {row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`preview-cell ${cell ? 'filled' : 'empty'}`}
                style={{
                  backgroundColor: cell ? color : 'transparent'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};