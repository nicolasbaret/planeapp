import { User } from './User';

describe('User', () => {
  it('initializes with correct position and sprite', () => {
    const user = new User(10, 20, '/sprites/mario.png');
    expect(user.x).toBe(10);
    expect(user.y).toBe(20);
    expect(user.sprite.src).toContain('/sprites/mario.png');
    expect(user.size).toBe(40);
    expect(user.speed).toBe(15);
    expect(user.vx).toBe(0);
    expect(user.vy).toBe(0);
    expect(user.gravity).toBe(1);
    expect(user.jumpPower).toBe(18);
    expect(user.onGround).toBe(false);
  });

  it('handles input for movement', () => {
    const user = new User(0, 0);
    user.handleInput('a', true);
    expect(user.moveLeft).toBe(true);
    user.handleInput('d', true);
    expect(user.moveRight).toBe(true);
    user.handleInput('a', false);
    expect(user.moveLeft).toBe(false);
    user.handleInput('d', false);
    expect(user.moveRight).toBe(false);
  });

  it('updates position and clamps to canvas', () => {
    const user = new User(0, 0);
    user.moveRight = true;
    user.update([{ x: 0, y: 100, width: 200, height: 20 }]);
    expect(user.x).toBeGreaterThanOrEqual(0);
    expect(user.y).toBeGreaterThanOrEqual(0);
  });
});
