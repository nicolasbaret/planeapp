import { clampPosition } from '../utils/position';

describe('clampPosition', () => {
  it('clamps position within bounds', () => {
    const pos = clampPosition({ x: -10, y: 700 }, 0, 0, 800, 600);
    expect(pos.x).toBe(0);
    expect(pos.y).toBe(600);
  });

  it('returns position unchanged if within bounds', () => {
    const pos = clampPosition({ x: 400, y: 300 }, 0, 0, 800, 600);
    expect(pos.x).toBe(400);
    expect(pos.y).toBe(300);
  });
});
