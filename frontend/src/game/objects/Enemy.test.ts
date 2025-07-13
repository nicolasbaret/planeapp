import { Enemy } from './Enemy';

describe('Enemy', () => {
  it('initializes with correct position, sprite, speed, and direction', () => {
    const enemy = new Enemy(10, 20, '/sprites/goomba.png', 5);
    expect(enemy.x).toBe(10);
    expect(enemy.y).toBe(20);
    expect(enemy.sprite.src).toContain('/sprites/goomba.png');
    expect(enemy.speed).toBe(5);
    expect(enemy.direction).toBe(1);
  });

  it('reverses direction at canvas edges', () => {
    const enemy = new Enemy(769, 0, '', 2);
    enemy.update();
    expect(enemy.direction).toBe(-1);
    enemy.x = -1;
    enemy.update();
    expect(enemy.direction).toBe(1);
  });

  it('moves horizontally according to speed and direction', () => {
    const enemy = new Enemy(100, 0, '', 3);
    enemy.update();
    expect(enemy.x).toBe(103);
  });
});
