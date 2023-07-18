import { CollisionCheck } from './collisionCheck';
import { FacingAngles } from './facingAngles';

export class Moveable {
  width: number;
  height: number;
  x: number;
  y: number;
  speed: number;
  diagonalSpeed: number;
  heading: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
    heading: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.diagonalSpeed = Math.cos(Math.PI / 4) * speed;
    this.heading = heading;
  }

  getWallCollisions(canvas: HTMLCanvasElement) {
    return CollisionCheck.border(this, canvas);
  }

  up(canvas: HTMLCanvasElement, enemyCollision: boolean) {
    this.heading = FacingAngles.Top;
    if (enemyCollision) {
      this.y += this.speed * 2;
    } else if (this.getWallCollisions(canvas).top) {
      this.y = this.height / 2;
    } else {
      this.y -= this.speed;
    }
  }

  down(canvas: HTMLCanvasElement, enemyCollision: boolean) {
    this.heading = FacingAngles.Bottom;
    if (enemyCollision) {
      this.y -= this.speed * 2;
    } else if (this.getWallCollisions(canvas).bottom) {
      this.y = canvas.height - this.height / 2;
    } else {
      this.y += this.speed;
    }
  }

  left(canvas: HTMLCanvasElement, enemyCollision: boolean) {
    this.heading = FacingAngles.Left;
    if (enemyCollision) {
      this.x += this.speed * 2;
    } else if (this.getWallCollisions(canvas).left) {
      this.x = this.width / 2;
    } else {
      this.x -= this.speed;
    }
  }

  right(canvas: HTMLCanvasElement, enemyCollision: boolean) {
    this.heading = FacingAngles.Right;
    if (enemyCollision) {
      this.x -= this.speed * 2;
    } else if (this.getWallCollisions(canvas).right) {
      this.x = canvas.width - this.width / 2;
    } else {
      this.x += this.speed;
    }
  }

  upperRight(canvas: HTMLCanvasElement, enemyCollision: boolean) {
    this.heading = FacingAngles.TopRight;
    if (enemyCollision) {
      this.y += this.diagonalSpeed * 2;
      this.x -= this.diagonalSpeed * 2;
    } else {
      if (this.getWallCollisions(canvas).top) {
        this.y = this.height / 2;
      } else {
        this.y -= this.diagonalSpeed;
      }
      if (this.getWallCollisions(canvas).right) {
        this.x = canvas.width - this.width / 2;
      } else {
        this.x += this.diagonalSpeed;
      }
    }
  }

  upperLeft(canvas: HTMLCanvasElement, enemyCollision: boolean) {
    this.heading = FacingAngles.TopLeft;
    if (enemyCollision) {
      this.y += this.diagonalSpeed * 2;
      this.x += this.diagonalSpeed * 2;
    } else {
      if (this.getWallCollisions(canvas).top) {
        this.y = this.height / 2;
      } else {
        this.y -= this.diagonalSpeed;
      }
      if (this.getWallCollisions(canvas).left) {
        this.x = this.width / 2;
      } else {
        this.x -= this.diagonalSpeed;
      }
    }
  }

  lowerRight(canvas: HTMLCanvasElement, enemyCollision: boolean) {
    this.heading = FacingAngles.BottomRight;
    if (enemyCollision) {
      this.y -= this.diagonalSpeed * 2;
      this.x -= this.diagonalSpeed * 2;
    } else {
      if (this.getWallCollisions(canvas).bottom) {
        this.y = canvas.height - this.height / 2;
      } else {
        this.y += this.diagonalSpeed;
      }
      if (this.getWallCollisions(canvas).right) {
        this.x = canvas.width - this.width / 2;
      } else {
        this.x += this.diagonalSpeed;
      }
    }
  }

  lowerLeft(canvas: HTMLCanvasElement, enemyCollision: boolean) {
    this.heading = FacingAngles.BottomLeft;
    if (enemyCollision) {
      this.y -= this.diagonalSpeed * 2;
      this.x += this.diagonalSpeed * 2;
    } else {
      if (this.getWallCollisions(canvas).bottom) {
        this.y = canvas.height - this.height / 2;
      } else {
        this.y += this.diagonalSpeed;
      }
      if (this.getWallCollisions(canvas).left) {
        this.x = this.width / 2;
      } else {
        this.x -= this.diagonalSpeed;
      }
    }
  }
}
