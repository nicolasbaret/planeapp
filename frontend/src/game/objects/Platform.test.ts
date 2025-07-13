import { Platform } from './Platform';

describe('Platform', () => {
  it('initializes with correct position and size', () => {
    const platform = new Platform(10, 20, 100, 10);
    expect(platform.x).toBe(10);
    expect(platform.y).toBe(20);
    expect(platform.width).toBe(100);
    expect(platform.height).toBe(10);
  });
});
