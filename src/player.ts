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
  speed: number;
  diagonalSpeed: number;

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

    this.speed = 5;
    this.diagonalSpeed = Math.cos(45) * this.speed;
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
    const enemyCollision = collision.enemies(this, enemies);
    const wallCollision = collision.border(this, this.canvas);

    if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
      if (enemyCollision) {
        this.y += this.diagonalSpeed * 2;
        this.x += this.diagonalSpeed * 2;
        this.takeDamage(10, true);
      } else {
        if (wallCollision.top) {
          this.y = this.height / 2;
        } else {
          this.y -= this.diagonalSpeed;
        }
        if (wallCollision.left) {
          this.x = this.width / 2;
        } else {
          this.x -= this.diagonalSpeed;
        }
      }
    } else if (keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
      if (enemyCollision) {
        this.y += this.diagonalSpeed * 2;
        this.x -= this.diagonalSpeed * 2;
        this.takeDamage(10, true);
      } else {
        if (wallCollision.top) {
          this.y = this.height / 2;
        } else {
          this.y -= this.diagonalSpeed;
        }
        if (wallCollision.right) {
          this.x = this.canvas.width - this.width / 2;
        } else {
          this.x += this.diagonalSpeed;
        }
      }
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowLeft']) {
      if (enemyCollision) {
        this.y -= this.diagonalSpeed * 2;
        this.x += this.diagonalSpeed * 2;
        this.takeDamage(10, true);
      } else {
        if (wallCollision.bottom) {
          this.y = this.canvas.height - this.height / 2;
        } else {
          this.y += this.diagonalSpeed;
        }
        if (wallCollision.left) {
          this.x = this.width / 2;
        } else {
          this.x -= this.diagonalSpeed;
        }
      }
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
      if (enemyCollision) {
        this.y -= this.diagonalSpeed * 2;
        this.x -= this.diagonalSpeed * 2;
        this.takeDamage(10, true);
      } else {
        if (wallCollision.bottom) {
          this.y = this.canvas.height - this.height / 2;
        } else {
          this.y += this.diagonalSpeed;
        }
        if (wallCollision.right) {
          this.x = this.canvas.width - this.width / 2;
        } else {
          this.x += this.diagonalSpeed;
        }
      }
    } else if (keysPressed['ArrowUp']) {
      if (enemyCollision) {
        this.y += this.speed * 2;
        this.takeDamage(10, true);
      } else if (wallCollision.top) {
        this.y = this.height / 2;
      } else {
        this.y -= this.speed;
      }
    } else if (keysPressed['ArrowDown']) {
      if (enemyCollision) {
        this.y -= this.speed * 2;
        this.takeDamage(10, true);
      } else if (wallCollision.bottom) {
        this.y = this.canvas.height - this.height / 2;
      } else {
        this.y += this.speed;
      }
    } else if (keysPressed['ArrowLeft']) {
      if (enemyCollision) {
        this.x += this.speed * 2;
        this.takeDamage(10, true);
      } else if (wallCollision.left) {
        this.x = this.width / 2;
      } else {
        this.x -= this.speed;
      }
    } else if (keysPressed['ArrowRight']) {
      if (enemyCollision) {
        this.x -= this.speed * 2;
        this.takeDamage(10, true);
      } else if (wallCollision.right) {
        this.x = this.canvas.width - this.width / 2;
      } else {
        this.x += this.speed;
      }
    }
  }
}
