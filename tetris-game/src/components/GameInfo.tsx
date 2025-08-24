import React from 'react';
import { GameState } from '../types/gameTypes';
import './GameInfo.css';

interface GameInfoProps {
  gameState: GameState;
  onTogglePause: () => void;
  onResetGame: () => void;
}

export const GameInfo: React.FC<GameInfoProps> = ({ 
  gameState, 
  onTogglePause, 
  onResetGame 
}) => {
  const { score, level, lines, isGameOver, isPaused } = gameState;

  return (
    <div className="game-info">
      <div className="info-section">
        <h3>Score</h3>
        <div className="info-value">{score.toLocaleString()}</div>
      </div>
      
      <div className="info-section">
        <h3>Level</h3>
        <div className="info-value">{level}</div>
      </div>
      
      <div className="info-section">
        <h3>Lines</h3>
        <div className="info-value">{lines}</div>
      </div>

      <div className="game-controls">
        <button
          className="control-button"
          onClick={onTogglePause}
          disabled={isGameOver}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        
        <button
          className="control-button reset-button"
          onClick={onResetGame}
        >
          New Game
        </button>
      </div>

      {isGameOver && (
        <div className="game-over-message">
          <h2>Game Over!</h2>
          <p>Press Enter or click New Game to play again</p>
        </div>
      )}

      {isPaused && !isGameOver && (
        <div className="pause-message">
          <h2>Paused</h2>
          <p>Press P to continue</p>
        </div>
      )}

      <div className="controls-help">
        <h4>Controls:</h4>
        <ul>
          <li><strong>←/A:</strong> Move Left</li>
          <li><strong>→/D:</strong> Move Right</li>
          <li><strong>↓/S:</strong> Soft Drop</li>
          <li><strong>↑/W:</strong> Rotate</li>
          <li><strong>Space:</strong> Hard Drop</li>
          <li><strong>P:</strong> Pause</li>
          <li><strong>Enter:</strong> New Game</li>
        </ul>
      </div>
    </div>
  );
};