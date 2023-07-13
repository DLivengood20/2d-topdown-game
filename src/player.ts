import { CollisionCheck as collision } from './collisionCheck';
import { Enemy } from './enemy';
import { FacingAngles } from './facingAngles';
import { Weapon } from './weapon';

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
  private faceColor: string;
  speed: number;
  diagonalSpeed: number;
  facing: number;
  isAttacking: boolean;
  weapon: Weapon;
  attackTimer: number;

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
    this.faceColor = 'orange';

    this.isStunned = false;
    this.stunDuration = 1000; // Adjust the stun duration as needed (in milliseconds)
    this.stunTimer = 0;
    this.stunColor = 'green'; // Color to indicate player stun

    this.speed = 5;
    this.diagonalSpeed = Math.cos(45) * this.speed;
    this.facing = FacingAngles.Bottom;

    this.isAttacking = false;
    this.weapon = new Weapon(this.canvas, this.width, 2);
    this.attackTimer = 0;
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

  private updateStun() {
    const elapsed = Date.now() - this.stunTimer;
    if (elapsed >= this.stunDuration) {
      this.isStunned = false;
      this.color = this.defaultColor;
    } else {
      // Set the player color
      this.color = this.stunColor;
    }
  }

  private attack() {
    this.isAttacking = true;
    this.attackTimer = Date.now();
  }

  private updateAttack() {
    const elapsed = Date.now() - this.attackTimer;
    if (elapsed >= this.weapon.attackDuration) {
      this.isAttacking = false;
    }
  }

  draw() {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.facing);

    this.context.fillStyle = this.color;
    this.context.fillRect(
      (-1 * this.width) / 2,
      (-1 * this.height) / 2,
      this.width,
      this.height
    );

    this.context.fillStyle = this.faceColor;
    this.context.fillRect(
      (-1 * this.width) / 2,
      this.height / 2 - 2,
      this.width,
      2
    );

    if (this.isAttacking) {
      const weaponRotation =
        (((90 * Math.PI) / 180) * (Date.now() - this.attackTimer)) /
        this.weapon.attackDuration;
      this.context.rotate((45 * Math.PI) / 180 - weaponRotation);
      this.context.translate(0, this.width / 2);
      this.weapon.draw();
    }

    this.context.restore();
  }

  update() {
    if (this.isStunned) {
      this.updateStun();
    }
    if (this.isAttacking) {
      this.updateAttack();
    }
  }

  handleMovement(
    keysPressed: { [key: string]: boolean },
    enemies: Array<Enemy>
  ) {
    const enemyCollision = collision.enemies(this, enemies);
    const wallCollision = collision.border(this, this.canvas);

    if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
      this.facing = FacingAngles.TopLeft;
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
      this.facing = FacingAngles.TopRight;
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
      this.facing = FacingAngles.BottomLeft;
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
      this.facing = FacingAngles.BottomRight;
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
      this.facing = FacingAngles.Top;
      if (enemyCollision) {
        this.y += this.speed * 2;
        this.takeDamage(10, true);
      } else if (wallCollision.top) {
        this.y = this.height / 2;
      } else {
        this.y -= this.speed;
      }
    } else if (keysPressed['ArrowDown']) {
      this.facing = FacingAngles.Bottom;
      if (enemyCollision) {
        this.y -= this.speed * 2;
        this.takeDamage(10, true);
      } else if (wallCollision.bottom) {
        this.y = this.canvas.height - this.height / 2;
      } else {
        this.y += this.speed;
      }
    } else if (keysPressed['ArrowLeft']) {
      this.facing = FacingAngles.Left;
      if (enemyCollision) {
        this.x += this.speed * 2;
        this.takeDamage(10, true);
      } else if (wallCollision.left) {
        this.x = this.width / 2;
      } else {
        this.x -= this.speed;
      }
    } else if (keysPressed['ArrowRight']) {
      this.facing = FacingAngles.Right;
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

  handleAttack(keysPressed: { [key: string]: boolean }, enemies: Array<Enemy>) {
    if (
      keysPressed['mousedown'] &&
      Date.now() - this.attackTimer >= this.weapon.cooldown
    ) {
      this.attack();
    }
  }
}
