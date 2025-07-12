export type Position = {
  x: number;
  y: number;
};

export function clampPosition(pos: Position, minX: number, minY: number, maxX: number, maxY: number): Position {
  return {
    x: Math.max(minX, Math.min(maxX, pos.x)),
    y: Math.max(minY, Math.min(maxY, pos.y)),
  };
}
