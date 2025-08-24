import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 15;
const PADDLE_SPEED = 8;
const BALL_SPEED = 4;

const App = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'paused', 'gameOver'
  const [scores, setScores] = useState({ player: 0, computer: 0 });
  const [gameStats, setGameStats] = useState({
    ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED },
    leftPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
    rightPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 }
  });

  const keysPressed = useRef({});
  const animationId = useRef(null);

  // 键盘事件处理
  const handleKeyDown = useCallback((e) => {
    keysPressed.current[e.key] = true;
    
    if (e.key === ' ') {
      e.preventDefault();
      if (gameState === 'playing') {
        setGameState('paused');
      } else if (gameState === 'paused') {
        setGameState('playing');
      }
    }
    
    if (e.key === 'Enter' && gameState === 'menu') {
      startGame();
    }
    
    if (e.key === 'Escape') {
      setGameState('menu');
      resetGame();
    }
  }, [gameState]);

  const handleKeyUp = useCallback((e) => {
    keysPressed.current[e.key] = false;
  }, []);

  // 游戏开始
  const startGame = () => {
    setGameState('playing');
    resetGame();
  };

  // 重置游戏
  const resetGame = () => {
    setScores({ player: 0, computer: 0 });
    setGameStats({
      ball: { 
        x: CANVAS_WIDTH / 2, 
        y: CANVAS_HEIGHT / 2, 
        dx: Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED, 
        dy: (Math.random() - 0.5) * BALL_SPEED 
      },
      leftPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
      rightPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 }
    });
  };

  // 更新游戏状态
  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;

    setGameStats(prevStats => {
      const newStats = { ...prevStats };
      
      // 更新左侧玩家挡板 (W/S 键)
      if (keysPressed.current['w'] || keysPressed.current['W']) {
        newStats.leftPaddle.y = Math.max(0, newStats.leftPaddle.y - PADDLE_SPEED);
      }
      if (keysPressed.current['s'] || keysPressed.current['S']) {
        newStats.leftPaddle.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, newStats.leftPaddle.y + PADDLE_SPEED);
      }

      // 电脑AI控制右侧挡板
      const paddleCenter = newStats.rightPaddle.y + PADDLE_HEIGHT / 2;
      const ballY = newStats.ball.y;
      
      if (paddleCenter < ballY - 35) {
        newStats.rightPaddle.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, newStats.rightPaddle.y + PADDLE_SPEED * 0.8);
      } else if (paddleCenter > ballY + 35) {
        newStats.rightPaddle.y = Math.max(0, newStats.rightPaddle.y - PADDLE_SPEED * 0.8);
      }

      // 更新球的位置
      newStats.ball.x += newStats.ball.dx;
      newStats.ball.y += newStats.ball.dy;

      // 球与上下边界碰撞
      if (newStats.ball.y <= BALL_SIZE / 2 || newStats.ball.y >= CANVAS_HEIGHT - BALL_SIZE / 2) {
        newStats.ball.dy = -newStats.ball.dy;
      }

      // 球与左侧挡板碰撞
      if (newStats.ball.x <= PADDLE_WIDTH + BALL_SIZE / 2 &&
          newStats.ball.y >= newStats.leftPaddle.y &&
          newStats.ball.y <= newStats.leftPaddle.y + PADDLE_HEIGHT) {
        newStats.ball.dx = Math.abs(newStats.ball.dx);
        // 根据击球位置改变角度
        const hitPos = (newStats.ball.y - newStats.leftPaddle.y) / PADDLE_HEIGHT;
        newStats.ball.dy = (hitPos - 0.5) * BALL_SPEED * 1.5;
      }

      // 球与右侧挡板碰撞
      if (newStats.ball.x >= CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE / 2 &&
          newStats.ball.y >= newStats.rightPaddle.y &&
          newStats.ball.y <= newStats.rightPaddle.y + PADDLE_HEIGHT) {
        newStats.ball.dx = -Math.abs(newStats.ball.dx);
        // 根据击球位置改变角度
        const hitPos = (newStats.ball.y - newStats.rightPaddle.y) / PADDLE_HEIGHT;
        newStats.ball.dy = (hitPos - 0.5) * BALL_SPEED * 1.5;
      }

      // 球出界，计分
      if (newStats.ball.x < 0) {
        setScores(prev => ({ ...prev, computer: prev.computer + 1 }));
        // 重新开始
        newStats.ball = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: BALL_SPEED, dy: (Math.random() - 0.5) * BALL_SPEED };
      } else if (newStats.ball.x > CANVAS_WIDTH) {
        setScores(prev => ({ ...prev, player: prev.player + 1 }));
        // 重新开始
        newStats.ball = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: -BALL_SPEED, dy: (Math.random() - 0.5) * BALL_SPEED };
      }

      return newStats;
    });
  }, [gameState]);

  // 渲染游戏
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // 清空画布
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 绘制中线
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // 绘制左侧挡板 (玩家)
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, gameStats.leftPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // 绘制右侧挡板 (电脑)
    ctx.fillStyle = '#f44336';
    ctx.fillRect(CANVAS_WIDTH - PADDLE_WIDTH, gameStats.rightPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // 绘制球
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(gameStats.ball.x, gameStats.ball.y, BALL_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();

    // 绘制分数
    ctx.font = '48px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(scores.player, CANVAS_WIDTH / 4, 60);
    ctx.fillText(scores.computer, CANVAS_WIDTH * 3 / 4, 60);

    // 游戏状态提示
    if (gameState === 'paused') {
      ctx.font = '32px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('游戏暂停', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.font = '16px Arial';
      ctx.fillText('按空格键继续', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
    }
  }, [gameState, gameStats, scores]);

  // 游戏循环
  useEffect(() => {
    const gameLoop = () => {
      updateGame();
      draw();
      animationId.current = requestAnimationFrame(gameLoop);
    };

    if (gameState === 'playing' || gameState === 'paused') {
      gameLoop();
    }

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [updateGame, draw, gameState]);

  // 添加键盘事件监听
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // 检查游戏结束
  useEffect(() => {
    if (scores.player >= 10 || scores.computer >= 10) {
      setGameState('gameOver');
    }
  }, [scores]);

  return (
    <div className="app">
      <h1>React 弹球游戏</h1>
      
      {gameState === 'menu' && (
        <div className="menu">
          <h2>欢迎来到弹球游戏!</h2>
          <p>使用 W/S 键控制左侧挡板</p>
          <p>空格键暂停/继续游戏</p>
          <p>ESC键返回主菜单</p>
          <p>先得到10分的一方获胜!</p>
          <button onClick={startGame}>开始游戏</button>
        </div>
      )}

      {gameState === 'gameOver' && (
        <div className="menu">
          <h2>游戏结束!</h2>
          <h3>
            {scores.player > scores.computer ? '玩家获胜!' : '电脑获胜!'}
          </h3>
          <p>最终分数: 玩家 {scores.player} - {scores.computer} 电脑</p>
          <button onClick={startGame}>再玩一次</button>
          <button onClick={() => { setGameState('menu'); resetGame(); }}>返回主菜单</button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="game-container">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="game-canvas"
          />
          <div className="controls">
            <button onClick={() => setGameState('paused')}>
              {gameState === 'playing' ? '暂停' : '继续'}
            </button>
            <button onClick={() => { setGameState('menu'); resetGame(); }}>
              返回主菜单
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;