import React, { useState, useCallback } from 'react';
import { GameState } from './types/game';
import { CLASSIC_LAYOUT, GRID_SIZE } from './types/game';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import './App.css';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    pieces: [...CLASSIC_LAYOUT],
    moves: 0,
    isWin: false,
    gridSize: GRID_SIZE,
  }));

  const handleGameStateChange = useCallback((newState: GameState) => {
    setGameState(newState);
  }, []);

  const handleRestart = useCallback(() => {
    setGameState({
      pieces: [...CLASSIC_LAYOUT],
      moves: 0,
      isWin: false,
      gridSize: GRID_SIZE,
    });
  }, []);

  const handleNewGame = useCallback(() => {
    // 目前只有一个经典布局，新游戏就是重新开始
    // 未来可以扩展更多布局
    handleRestart();
  }, [handleRestart]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>华容道</h1>
        <p>移动棋子，帮助曹操逃脱到底部中央位置！</p>
      </header>
      
      <main className="app-main">
        <GameControls
          gameState={gameState}
          onRestart={handleRestart}
          onNewGame={handleNewGame}
        />
        
        <GameBoard
          gameState={gameState}
          onGameStateChange={handleGameStateChange}
        />
        
        <div className="game-instructions">
          <h3>游戏说明</h3>
          <ul>
            <li>点击棋子选中，然后使用方向键移动</li>
            <li>目标：将曹操（红色大块）移动到底部中央位置</li>
            <li>关羽：绿色横块，张飞、赵云、马超、黄忠：彩色竖块</li>
            <li>小兵：粉色小块，可以灵活移动为大块让路</li>
            <li>按ESC键取消选择棋子</li>
          </ul>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>华容道 - 经典中国古代益智游戏</p>
      </footer>
    </div>
  );
};

export default App;