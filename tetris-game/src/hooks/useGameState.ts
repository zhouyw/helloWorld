import { useState, useCallback, useEffect, useRef } from 'react';
import {
  GameState
} from '../types/gameTypes';
import {
  createEmptyBoard,
  getRandomTetromino,
  isValidPosition,
  rotatePiece,
  placePiece,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropInterval,
  isGameOver
} from '../utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    level: 0,
    lines: 0,
    isGameOver: false,
    isPaused: false
  });

  const dropIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initializeGame = useCallback(() => {
    const firstPiece = getRandomTetromino();
    const secondPiece = getRandomTetromino();
    
    setGameState({
      board: createEmptyBoard(),
      currentPiece: firstPiece,
      nextPiece: secondPiece,
      score: 0,
      level: 0,
      lines: 0,
      isGameOver: false,
      isPaused: false
    });
  }, []);

  const movePiece = useCallback((direction: 'left' | 'right' | 'down') => {
    setGameState(prevState => {
      if (!prevState.currentPiece || prevState.isGameOver || prevState.isPaused) {
        return prevState;
      }

      const { currentPiece, board } = prevState;
      let newPosition = { ...currentPiece.position };

      switch (direction) {
        case 'left':
          newPosition.x -= 1;
          break;
        case 'right':
          newPosition.x += 1;
          break;
        case 'down':
          newPosition.y += 1;
          break;
      }

      if (isValidPosition(board, currentPiece, newPosition)) {
        return {
          ...prevState,
          currentPiece: {
            ...currentPiece,
            position: newPosition
          }
        };
      } else if (direction === 'down') {
        // Piece can't move down, so place it and spawn new piece
        const newBoard = placePiece(board, currentPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        const newScore = prevState.score + calculateScore(linesCleared, prevState.level);
        const newLines = prevState.lines + linesCleared;
        const newLevel = calculateLevel(newLines);
        const nextPiece = getRandomTetromino();

        // Check if game is over
        if (isGameOver(clearedBoard, prevState.nextPiece!)) {
          return {
            ...prevState,
            board: clearedBoard,
            currentPiece: null,
            isGameOver: true,
            score: newScore,
            lines: newLines,
            level: newLevel
          };
        }

        return {
          ...prevState,
          board: clearedBoard,
          currentPiece: prevState.nextPiece,
          nextPiece: nextPiece,
          score: newScore,
          lines: newLines,
          level: newLevel
        };
      }

      return prevState;
    });
  }, []);

  const rotatePieceHandler = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || prevState.isGameOver || prevState.isPaused) {
        return prevState;
      }

      const rotatedPiece = rotatePiece(prevState.currentPiece);
      
      if (isValidPosition(prevState.board, rotatedPiece, rotatedPiece.position)) {
        return {
          ...prevState,
          currentPiece: rotatedPiece
        };
      }

      return prevState;
    });
  }, []);

  const dropPiece = useCallback(() => {
    movePiece('down');
  }, [movePiece]);

  const hardDrop = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || prevState.isGameOver || prevState.isPaused) {
        return prevState;
      }

      const { currentPiece, board } = prevState;
      let newPosition = { ...currentPiece.position };

      // Move piece down until it can't move anymore
      while (isValidPosition(board, currentPiece, { ...newPosition, y: newPosition.y + 1 })) {
        newPosition.y += 1;
      }

      const pieceAtBottom = { ...currentPiece, position: newPosition };
      const newBoard = placePiece(board, pieceAtBottom);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      const newScore = prevState.score + calculateScore(linesCleared, prevState.level);
      const newLines = prevState.lines + linesCleared;
      const newLevel = calculateLevel(newLines);
      const nextPiece = getRandomTetromino();

      // Check if game is over
      if (isGameOver(clearedBoard, prevState.nextPiece!)) {
        return {
          ...prevState,
          board: clearedBoard,
          currentPiece: null,
          isGameOver: true,
          score: newScore,
          lines: newLines,
          level: newLevel
        };
      }

      return {
        ...prevState,
        board: clearedBoard,
        currentPiece: prevState.nextPiece,
        nextPiece: nextPiece,
        score: newScore,
        lines: newLines,
        level: newLevel
      };
    });
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused
    }));
  }, []);

  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Auto-drop timer
  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused || !gameState.currentPiece) {
      if (dropIntervalRef.current) {
        clearInterval(dropIntervalRef.current);
        dropIntervalRef.current = null;
      }
      return;
    }

    const interval = getDropInterval(gameState.level);
    dropIntervalRef.current = setInterval(() => {
      dropPiece();
    }, interval);

    return () => {
      if (dropIntervalRef.current) {
        clearInterval(dropIntervalRef.current);
        dropIntervalRef.current = null;
      }
    };
  }, [gameState.level, gameState.isGameOver, gameState.isPaused, gameState.currentPiece, dropPiece]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    gameState,
    movePiece,
    rotatePiece: rotatePieceHandler,
    hardDrop,
    togglePause,
    resetGame
  };
};