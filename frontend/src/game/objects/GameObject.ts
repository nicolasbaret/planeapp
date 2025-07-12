export abstract class GameObject {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
