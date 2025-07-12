import { GameObject } from './GameObject';

export class Coin extends GameObject {
  collected: boolean = false;
  sprite: HTMLImageElement;

  constructor(x: number, y: number, spriteSrc: string) {
    super(x, y);
    this.sprite = new window.Image();
    this.sprite.src = spriteSrc;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.collected && this.sprite.complete && this.sprite.naturalWidth > 0) {
      ctx.drawImage(this.sprite, this.x, this.y, 32, 32);
    } else if (!this.collected) {
      ctx.fillStyle = 'gold';
      ctx.beginPath();
      ctx.arc(this.x + 16, this.y + 16, 16, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  collect() {
    this.collected = true;
  }
}
