import React, { useRef, useEffect, useState } from 'react';
import { User } from '../objects/User';
import { Platform } from '../objects/Platform';
import { Coin } from '../objects/Coin';
import { Enemy } from '../objects/Enemy';
import { isColliding } from '../utils/collision';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const coinSprite = '/sprites/coin.png';
const enemySprite = '/sprites/goomba.png';
const marioSprite = '/sprites/mario.png';

const platforms = [
  new Platform(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH, 50),
  new Platform(200, CANVAS_HEIGHT - 150, 200, 20),
  new Platform(500, CANVAS_HEIGHT - 250, 150, 20),
];

const initialCoins = () => [
  new Coin(220, CANVAS_HEIGHT - 182, coinSprite),
  new Coin(550, CANVAS_HEIGHT - 282, coinSprite),
  new Coin(400, CANVAS_HEIGHT - 82, coinSprite),
];
const initialEnemies = () => [
  new Enemy(300, CANVAS_HEIGHT - 82, enemySprite, 3),
];

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [coins, setCoins] = useState(initialCoins());
  const [enemies, setEnemies] = useState(initialEnemies());
  const user = useRef(new User(100, CANVAS_HEIGHT - 90, marioSprite));

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    setCoins(initialCoins());
    setEnemies(initialEnemies());
    user.current.x = 40; // Start at far left
    user.current.y = CANVAS_HEIGHT - 90;
    user.current.vy = 0;
    user.current.vx = 0;
    user.current.onGround = false;
    user.current.moveLeft = false;
    user.current.moveRight = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrameId: number;

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      platforms.forEach((p) => p.draw(ctx));
      coins.forEach((coin) => coin.draw(ctx));
      enemies.forEach((enemy) => enemy.draw(ctx));
      user.current.draw(ctx);
      ctx.font = '24px Arial';
      ctx.fillStyle = '#222';
      ctx.fillText(`Score: ${score}`, 20, 40);
      if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '48px Arial';
        ctx.fillText('Game Over!', CANVAS_WIDTH / 2 - 120, CANVAS_HEIGHT / 2);
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [score, gameOver, coins, enemies]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameOver) user.current.handleInput(e.key, true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!gameOver) user.current.handleInput(e.key, false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameOver]);

  useEffect(() => {
    function gameLoop() {
      if (!gameOver) {
        user.current.update(platforms);
        enemies.forEach((enemy) => enemy.update());
        // Coin collision
        coins.forEach((coin) => {
          if (!coin.collected &&
            isColliding(
              user.current.x - user.current.size / 2,
              user.current.y - user.current.size / 2,
              user.current.size,
              user.current.size,
              coin.x,
              coin.y,
              32,
              32
            )
          ) {
            coin.collect();
            setScore((s) => s + 1);
          }
        });
        // Enemy collision
        let collided = false;
        enemies.forEach((enemy) => {
          if (
            isColliding(
              user.current.x - user.current.size / 2,
              user.current.y - user.current.size / 2,
              user.current.size,
              user.current.size,
              enemy.x,
              enemy.y,
              32,
              32
            )
          ) {
            collided = true;
          }
        });
        if (collided) {
          setGameOver(true);
        }
      }
      requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
    return () => {};
  }, [gameOver, coins, enemies]);

  return (
    <div style={{ position: 'relative', width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
      <div
        data-testid="score"
        style={{
          position: 'absolute',
          left: 20,
          top: 10,
          fontFamily: 'Press Start 2P, Arial, sans-serif',
          fontSize: 24,
          color: '#222',
          background: 'rgba(255,255,255,0.7)',
          padding: '4px 12px',
          borderRadius: 8,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        Score: {score}
      </div>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ border: '1px solid #333' }} />
      {gameOver && (
        <button
          style={{
            position: 'absolute',
            left: CANVAS_WIDTH / 2 - 60,
            top: CANVAS_HEIGHT / 2 + 40,
            fontSize: 24,
            padding: '12px 32px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            zIndex: 2,
          }}
          onClick={handleRestart}
        >
          Restart
        </button>
      )}
    </div>
  );
};

export default GameCanvas;
