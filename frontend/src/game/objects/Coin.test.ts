import { Coin } from './Coin';

describe('Coin', () => {
  it('initializes with correct position and sprite', () => {
    const coin = new Coin(10, 20, '/sprites/coin.png');
    expect(coin.x).toBe(10);
    expect(coin.y).toBe(20);
    expect(coin.sprite.src).toContain('/sprites/coin.png');
    expect(coin.collected).toBe(false);
  });

  it('collect() sets collected to true', () => {
    const coin = new Coin(0, 0, '');
    coin.collect();
    expect(coin.collected).toBe(true);
  });
});
