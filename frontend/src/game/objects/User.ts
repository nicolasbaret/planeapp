import { clampPosition } from '../utils/position';

export class User {
  x: number;
  y: number;
  size: number = 40;
  speed: number = 15; // 3x faster
  vx: number = 0;
  vy: number = 0;
  gravity: number = 1;
  jumpPower: number = 18;
  onGround: boolean = false;
  sprite: HTMLImageElement;
  moveLeft: boolean = false;
  moveRight: boolean = false;

  constructor(x: number, y: number, spriteSrc: string = '/sprites/mario.png') {
    this.x = x;
    this.y = y;
    this.sprite = new window.Image();
    this.sprite.src = spriteSrc;
  }

  handleInput(key: string, isDown: boolean = true) {
    switch (key.toLowerCase()) {
      case 'a':
        this.moveLeft = isDown;
        break;
      case 'd':
        this.moveRight = isDown;
        break;
      case ' ': // Spacebar for jump
        if (isDown && this.onGround) {
          this.vy = -this.jumpPower;
          this.onGround = false;
        }
        break;
      default:
        break;
    }
  }

  update(platforms: Array<{ x: number; y: number; width: number; height: number }>) {
    // Horizontal movement with momentum
    if (this.moveLeft) {
      this.vx = -this.speed;
    } else if (this.moveRight) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    this.x += this.vx;

    // Gravity and vertical movement
    this.vy += this.gravity;
    this.y += this.vy;

    // Improved collision detection
    this.onGround = false;
    for (const p of platforms) {
      // Check for collision from above (landing)
      const nextY = this.y + this.size / 2;
      const prevY = this.y + this.size / 2 - this.vy;
      if (
        this.x + this.size / 2 > p.x &&
        this.x - this.size / 2 < p.x + p.width &&
        prevY <= p.y &&
        nextY >= p.y &&
        this.vy >= 0
      ) {
        this.y = p.y - this.size / 2;
        this.vy = 0;
        this.onGround = true;
      }
      // Prevent moving through platforms horizontally
      // (optional: can be improved for side collisions)
    }
    // Clamp to canvas
    const pos = clampPosition({ x: this.x, y: this.y }, 0 + this.size / 2, 0, 800 - this.size / 2, 600 - this.size / 2);
    this.x = pos.x;
    this.y = pos.y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.sprite.complete && this.sprite.naturalWidth > 0) {
      ctx.drawImage(this.sprite, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else {
      ctx.fillStyle = '#1976d2';
      ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
  }
}
