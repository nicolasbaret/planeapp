import { GameObject } from './GameObject';

describe('GameObject', () => {
  it('can extend and instantiate subclass', () => {
    class Dummy extends GameObject {
      draw() {}
    }
    const dummy = new Dummy(1, 2);
    expect(dummy.x).toBe(1);
    expect(dummy.y).toBe(2);
  });
});
