import { Sprite } from './Sprite';

describe('Sprite', () => {
  it('initializes with correct position', () => {
    const sprite = new Sprite(10, 20);
    expect(sprite.x).toBe(10);
    expect(sprite.y).toBe(20);
    expect(sprite.image).toBeNull();
  });

  it('loads image if src is provided', () => {
    const sprite = new Sprite(0, 0, '/sprites/coin.png');
    expect(sprite.image).not.toBeNull();
    expect(sprite.image?.src).toContain('/sprites/coin.png');
  });
});
