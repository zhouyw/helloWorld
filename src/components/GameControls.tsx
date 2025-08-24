import React from 'react';
import { GameState } from '../types/game';

interface GameControlsProps {
  gameState: GameState;
  onRestart: () => void;
  onNewGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  gameState, 
  onRestart, 
  onNewGame 
}) => {
  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    margin: '20px 0',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '100px',
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#4ecdc4',
    color: 'white',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f39c12',
    color: 'white',
  };

  const statsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
  };

  const statItemStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <div style={controlsStyle}>
      <div style={statsStyle}>
        <div style={statItemStyle}>移动步数</div>
        <div style={statValueStyle}>{gameState.moves}</div>
      </div>
      
      <div style={statsStyle}>
        <div style={statItemStyle}>游戏状态</div>
        <div style={{
          ...statValueStyle,
          color: gameState.isWin ? '#27ae60' : '#e74c3c'
        }}>
          {gameState.isWin ? '已获胜!' : '进行中'}
        </div>
      </div>
      
      <button
        style={primaryButtonStyle}
        onClick={onRestart}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#45b7d1';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#4ecdc4';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        重新开始
      </button>
      
      <button
        style={secondaryButtonStyle}
        onClick={onNewGame}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e67e22';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f39c12';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        新游戏
      </button>
    </div>
  );
};

export default GameControls;