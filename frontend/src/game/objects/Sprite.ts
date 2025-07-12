export class Sprite {
  x: number;
  y: number;
  image: HTMLImageElement | null = null;

  constructor(x: number, y: number, src?: string) {
    this.x = x;
    this.y = y;
    if (src) {
      this.image = new window.Image();
      this.image.src = src;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.image && this.image.complete) {
      ctx.drawImage(this.image, this.x, this.y);
    }
  }
}
