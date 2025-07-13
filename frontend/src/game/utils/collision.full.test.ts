import { isColliding } from './collision';

describe('isColliding', () => {
  it('returns true for overlapping rectangles', () => {
    expect(isColliding(0, 0, 10, 10, 5, 5, 10, 10)).toBe(true);
  });
  it('returns false for non-overlapping rectangles', () => {
    expect(isColliding(0, 0, 10, 10, 20, 20, 10, 10)).toBe(false);
  });
  it('returns true for edge-touching rectangles', () => {
    expect(isColliding(0, 0, 10, 10, 10, 0, 10, 10)).toBe(false);
    expect(isColliding(0, 0, 10, 10, 9, 0, 10, 10)).toBe(true);
  });
});
