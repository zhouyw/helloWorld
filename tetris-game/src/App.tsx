import React from 'react';
import { GameBoard } from './components/GameBoard';
import { NextPiece } from './components/NextPiece';
import { GameInfo } from './components/GameInfo';
import { useGameState } from './hooks/useGameState';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import './App.css';

function App() {
  const { 
    gameState, 
    movePiece, 
    rotatePiece, 
    hardDrop, 
    togglePause, 
    resetGame 
  } = useGameState();

  useKeyboardControls({
    moveLeft: () => movePiece('left'),
    moveRight: () => movePiece('right'),
    moveDown: () => movePiece('down'),
    rotate: rotatePiece,
    hardDrop,
    togglePause,
    resetGame,
    isGameActive: !gameState.isGameOver
  });

  return (
    <div className="App">
      <header className="app-header">
        <h1>Tetris</h1>
        <p className="subtitle">Use arrow keys or WASD to play</p>
      </header>
      
      <div className="game-container">
        <div className="left-panel">
          <NextPiece nextPiece={gameState.nextPiece} />
        </div>
        
        <div className="game-area">
          <GameBoard gameState={gameState} />
        </div>
        
        <div className="right-panel">
          <GameInfo 
            gameState={gameState}
            onTogglePause={togglePause}
            onResetGame={resetGame}
          />
        </div>
      </div>
      
      <footer className="app-footer">
        <p>Made with React & TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
