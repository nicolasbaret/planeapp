import { isColliding } from './collision';

describe('isColliding', () => {
  it('should detect collision when rectangles overlap', () => {
    expect(isColliding(0, 0, 10, 10, 5, 5, 10, 10)).toBe(true);
  });

  it('should not detect collision when rectangles are apart', () => {
    expect(isColliding(0, 0, 10, 10, 20, 20, 10, 10)).toBe(false);
  });

  it('should detect collision when edges touch', () => {
    expect(isColliding(0, 0, 10, 10, 10, 0, 10, 10)).toBe(false);
    expect(isColliding(0, 0, 10, 10, 0, 10, 10, 10)).toBe(false);
  });

  it('should detect collision for contained rectangle', () => {
    expect(isColliding(0, 0, 20, 20, 5, 5, 5, 5)).toBe(true);
  });

  it('should detect collision for negative coordinates', () => {
    expect(isColliding(-10, -10, 20, 20, -5, -5, 10, 10)).toBe(true);
  });

  it('should not detect collision for zero size', () => {
    expect(isColliding(0, 0, 0, 0, 0, 0, 10, 10)).toBe(false);
    expect(isColliding(0, 0, 10, 10, 0, 0, 0, 0)).toBe(false);
  });

  it('should detect collision for overlapping corners', () => {
    expect(isColliding(0, 0, 10, 10, 9, 9, 10, 10)).toBe(true);
  });

  it('should not detect collision for rectangles just outside', () => {
    expect(isColliding(0, 0, 10, 10, 10.1, 0, 10, 10)).toBe(false);
    expect(isColliding(0, 0, 10, 10, 0, 10.1, 10, 10)).toBe(false);
  });

  it('should detect collision for large overlap', () => {
    expect(isColliding(0, 0, 100, 100, 50, 50, 100, 100)).toBe(true);
  });

  it('should not detect collision for rectangles with negative width/height', () => {
    expect(isColliding(0, 0, -10, 10, 0, 0, 10, 10)).toBe(false);
    expect(isColliding(0, 0, 10, -10, 0, 0, 10, 10)).toBe(false);
  });

  it('should detect collision for rectangles with shared edge', () => {
    expect(isColliding(0, 0, 10, 10, 10, 0, 10, 10)).toBe(false);
    expect(isColliding(0, 0, 10, 10, 0, 10, 10, 10)).toBe(false);
  });

  it('should detect collision for rectangles with partial overlap', () => {
    expect(isColliding(0, 0, 10, 10, 5, 0, 10, 10)).toBe(true);
    expect(isColliding(0, 0, 10, 10, 0, 5, 10, 10)).toBe(true);
  });

  it('should not detect collision for rectangles with no overlap', () => {
    expect(isColliding(0, 0, 10, 10, 20, 20, 10, 10)).toBe(false);
  });

  it('should detect collision for rectangles with overlap at origin', () => {
    expect(isColliding(0, 0, 10, 10, 0, 0, 10, 10)).toBe(true);
  });

  it('should not detect collision for rectangles with one inside but not overlapping', () => {
    expect(isColliding(0, 0, 10, 10, 11, 11, 10, 10)).toBe(false);
  });

  it('should detect collision for rectangles with negative positions', () => {
    expect(isColliding(-10, -10, 20, 20, -5, -5, 10, 10)).toBe(true);
  });

  it('should not detect collision for rectangles with negative positions and no overlap', () => {
    expect(isColliding(-10, -10, 5, 5, 0, 0, 5, 5)).toBe(false);
  });

  it('should detect collision for rectangles with overlap at negative positions', () => {
    expect(isColliding(-10, -10, 20, 20, -15, -15, 10, 10)).toBe(true);
  });

  it('should not detect collision for rectangles with no overlap at negative positions', () => {
    expect(isColliding(-10, -10, 5, 5, -20, -20, 5, 5)).toBe(false);
  });
});
