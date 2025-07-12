import { GameObject } from './GameObject';

export class Enemy extends GameObject {
  sprite: HTMLImageElement;
  speed: number;
  direction: number;

  constructor(x: number, y: number, spriteSrc: string, speed: number = 2) {
    super(x, y);
    this.sprite = new window.Image();
    this.sprite.src = spriteSrc;
    this.speed = speed;
    this.direction = 1;
  }

  update() {
    this.x += this.speed * this.direction;
    // Reverse direction at canvas edges
    if (this.x < 0 || this.x > 768) {
      this.direction *= -1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.sprite.complete && this.sprite.naturalWidth > 0) {
      ctx.drawImage(this.sprite, this.x, this.y, 32, 32);
    } else {
      ctx.fillStyle = 'brown';
      ctx.fillRect(this.x, this.y, 32, 32);
    }
  }
}
