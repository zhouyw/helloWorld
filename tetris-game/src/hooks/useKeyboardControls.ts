import { useEffect, useCallback } from 'react';

interface UseKeyboardControlsProps {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
  hardDrop: () => void;
  togglePause: () => void;
  resetGame: () => void;
  isGameActive: boolean;
}

export const useKeyboardControls = ({
  moveLeft,
  moveRight,
  moveDown,
  rotate,
  hardDrop,
  togglePause,
  resetGame,
  isGameActive
}: UseKeyboardControlsProps) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isGameActive && event.key !== 'Enter' && event.key !== 'p' && event.key !== 'P') {
      return;
    }

    switch (event.key.toLowerCase()) {
      case 'arrowleft':
      case 'a':
        event.preventDefault();
        moveLeft();
        break;
      case 'arrowright':
      case 'd':
        event.preventDefault();
        moveRight();
        break;
      case 'arrowdown':
      case 's':
        event.preventDefault();
        moveDown();
        break;
      case 'arrowup':
      case 'w':
        event.preventDefault();
        rotate();
        break;
      case ' ':
        event.preventDefault();
        hardDrop();
        break;
      case 'p':
        event.preventDefault();
        togglePause();
        break;
      case 'enter':
        event.preventDefault();
        resetGame();
        break;
      default:
        break;
    }
  }, [moveLeft, moveRight, moveDown, rotate, hardDrop, togglePause, resetGame, isGameActive]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};