import { CollisionCheck as collision } from './collisionCheck';
import { Enemy } from './enemy';

export class Player {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  x: number;
  y: number;
  width: number;
  height: number;
  private health: number;
  private color: string;
  isStunned: boolean;
  private stunDuration: number;
  private stunTimer: number;
  private stunColor: string;
  private defaultColor: string;

  constructor(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    health: number
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = health;

    this.defaultColor = 'blue'; // Default player color
    this.color = this.defaultColor;

    this.isStunned = false;
    this.stunDuration = 1000; // Adjust the stun duration as needed (in milliseconds)
    this.stunTimer = 0;
    this.stunColor = 'green'; // Color to indicate player stun
  }

  getHealth() {
    return this.health;
  }

  takeDamage(amount: number, stun?: boolean) {
    this.health -= amount;
    if (stun) {
      this.stun();
    }
  }

  private stun() {
    this.isStunned = true;
    this.stunTimer = Date.now();
  }

  updateStun() {
    const elapsed = Date.now() - this.stunTimer;
    if (elapsed >= this.stunDuration) {
      this.isStunned = false;
      this.color = this.defaultColor;
    } else {
      // Set the player color
      this.color = this.stunColor;
    }
  }

  draw() {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.context.fillStyle = this.color;
    this.context.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }

  handleMovement(
    keysPressed: { [key: string]: boolean },
    enemies: Array<Enemy>
  ) {
    const speed = 5; // Adjust the movement speed as needed
    const diagonalSpeed = Math.cos(45) * speed;

    if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
      if (collision.check(this, enemies)) {
        this.y += diagonalSpeed * 2;
        this.x += diagonalSpeed * 2;
        this.takeDamage(10, true);
      } else {
        if (this.y - this.height / 2 - speed >= 0) {
          this.y -= diagonalSpeed;
        } else {
          this.y = this.height / 2;
        }
        if (this.x - this.width / 2 - speed >= 0) {
          this.x -= diagonalSpeed;
        } else {
          this.x = this.width / 2;
        }
      }
    } else if (keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
      if (collision.check(this, enemies)) {
        this.y += diagonalSpeed * 2;
        this.x -= diagonalSpeed * 2;
        this.takeDamage(10, true);
      } else {
        if (this.y - this.height / 2 - speed >= 0) {
          this.y -= diagonalSpeed;
        } else {
          this.y = this.height / 2;
        }
        if (this.x + speed + this.width / 2 <= this.canvas.width) {
          this.x += diagonalSpeed;
        } else {
          this.x = this.canvas.width - this.width / 2;
        }
      }
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowLeft']) {
      if (collision.check(this, enemies)) {
        this.y -= diagonalSpeed * 2;
        this.x += diagonalSpeed * 2;
        this.takeDamage(10, true);
      } else {
        if (this.y + speed + this.height / 2 <= this.canvas.height) {
          this.y += diagonalSpeed;
        } else {
          this.y = this.canvas.height - this.height / 2;
        }
        if (this.x - this.width / 2 - speed >= 0) {
          this.x -= diagonalSpeed;
        } else {
          this.x = this.width / 2;
        }
      }
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
      if (collision.check(this, enemies)) {
        this.y -= diagonalSpeed * 2;
        this.x -= diagonalSpeed * 2;
        this.takeDamage(10, true);
      } else {
        if (this.y + speed + this.height / 2 <= this.canvas.height) {
          this.y += diagonalSpeed;
        } else {
          this.y = this.canvas.height - this.height / 2;
        }
        if (this.x + speed + this.width / 2 <= this.canvas.width) {
          this.x += diagonalSpeed;
        } else {
          this.x = this.canvas.width - this.width / 2;
        }
      }
    } else if (keysPressed['ArrowUp']) {
      if (collision.check(this, enemies)) {
        this.y += speed * 2;
        this.takeDamage(10, true);
      } else if (this.y - this.height / 2 - speed >= 0) {
        this.y -= speed;
      } else {
        this.y = this.height / 2;
      }
    } else if (keysPressed['ArrowDown']) {
      if (collision.check(this, enemies)) {
        this.y -= speed * 2;
        this.takeDamage(10, true);
      } else if (this.y + speed + this.height / 2 <= this.canvas.height) {
        this.y += speed;
      } else {
        this.y = this.canvas.height - this.height / 2;
      }
    } else if (keysPressed['ArrowLeft']) {
      if (collision.check(this, enemies)) {
        this.x += speed * 2;
        this.takeDamage(10, true);
      } else if (this.x - this.width / 2 - speed >= 0) {
        this.x -= speed;
      } else {
        this.x = this.width / 2;
      }
    } else if (keysPressed['ArrowRight']) {
      if (collision.check(this, enemies)) {
        this.x -= speed * 2;
        this.takeDamage(10, true);
      } else if (this.x + speed + this.width / 2 <= this.canvas.width) {
        this.x += speed;
      } else {
        this.x = this.canvas.width - this.width / 2;
      }
    }
  }
}
