import { CollisionCheck as collision } from './collisionCheck';
import { Enemy } from './enemy';
import { Player } from './player';

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private keysPressed: { [key: string]: boolean };

  private isPlayerStunned: boolean;
  private playerStunDuration: number;
  private playerStunTimer: number;
  private playerStunColor: string;
  private playerDefaultColor: string;

  private enemies: Array<Enemy>;
  private enemy: Enemy;
  private player: Player;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = 800; // Adjust the width as per your requirements
    this.canvas.height = 600; // Adjust the height as per your requirements
    document.body.appendChild(this.canvas);

    if (this.context === null) {
      throw new Error('Unable to initialize CanvasRenderingContext2D.');
    }

    this.keysPressed = {};
    this.registerEventListeners();

    this.isPlayerStunned = false;
    this.playerStunDuration = 1000; // Adjust the stun duration as needed (in milliseconds)
    this.playerStunTimer = 0;
    this.playerStunColor = 'green'; // Color to indicate player stun
    this.playerDefaultColor = 'blue'; // Default player color

    // Create an instance of the player
    this.player = new Player(
      this.canvas,
      this.canvas.width / 2,
      this.canvas.height / 2,
      20,
      20,
      100,
      this.playerDefaultColor
    );

    this.enemies = new Array<Enemy>();

    // Create an instance of the enemy
    this.enemy = new Enemy(this.canvas, 100, 100, 20, 20);

    this.enemies.push(new Enemy(this.canvas, 100, 100, 20, 20));
    this.enemies.push(new Enemy(this.canvas, 600, 400, 40, 40));
  }

  private registerEventListeners() {
    document.addEventListener('keydown', (event) => {
      this.keysPressed[event.key] = true;
    });

    document.addEventListener('keyup', (event) => {
      this.keysPressed[event.key] = false;
    });
  }

  private drawPlayerHealth() {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    // Set the font color to black (or any color that contrasts with the background)
    this.context.fillStyle = 'black';
    this.context.font = '18px Arial';
    this.context.fillText(`Health: ${this.player.health}`, 10, 30);
  }

  private damagePlayer(amount: number, stun?: boolean) {
    this.player.health -= amount;
    if (stun) {
      this.stunPlayer();
    }
  }

  private stunPlayer() {
    this.isPlayerStunned = true;
    this.playerStunTimer = Date.now();
  }

  private updatePlayerStun() {
    const elapsed = Date.now() - this.playerStunTimer;
    if (elapsed >= this.playerStunDuration) {
      this.isPlayerStunned = false;
      this.player.color = this.playerDefaultColor;
    } else {
      // Set the player color
      this.player.color = this.playerStunColor;
    }
  }

  update() {
    // Update game logic here
    if (!this.isPlayerStunned) {
      this.handlePlayerMovement();
    } else {
      this.updatePlayerStun();
    }
  }

  private handlePlayerMovement() {
    const speed = 5; // Adjust the movement speed as needed
    const diagonalSpeed = Math.cos(45) * 5;

    if (this.keysPressed['ArrowUp'] && this.keysPressed['ArrowLeft']) {
      if (collision.check(this.player, this.enemies)) {
        this.player.y += diagonalSpeed * 2;
        this.player.x += diagonalSpeed * 2;
        this.damagePlayer(10, true);
      } else {
        if (this.player.y - this.player.height / 2 - speed >= 0) {
          this.player.y -= diagonalSpeed;
        } else {
          this.player.y = this.player.height / 2;
        }
        if (this.player.x - this.player.width / 2 - speed >= 0) {
          this.player.x -= diagonalSpeed;
        } else {
          this.player.x = this.player.width / 2;
        }
      }
    } else if (this.keysPressed['ArrowUp'] && this.keysPressed['ArrowRight']) {
      if (collision.check(this.player, this.enemies)) {
        this.player.y += diagonalSpeed * 2;
        this.player.x -= diagonalSpeed * 2;
        this.damagePlayer(10, true);
      } else {
        if (this.player.y - this.player.height / 2 - speed >= 0) {
          this.player.y -= diagonalSpeed;
        } else {
          this.player.y = this.player.height / 2;
        }
        if (
          this.player.x + speed + this.player.width / 2 <=
          this.canvas.width
        ) {
          this.player.x += diagonalSpeed;
        } else {
          this.player.x = this.canvas.width - this.player.width / 2;
        }
      }
    } else if (this.keysPressed['ArrowDown'] && this.keysPressed['ArrowLeft']) {
      if (collision.check(this.player, this.enemies)) {
        this.player.y -= diagonalSpeed * 2;
        this.player.x += diagonalSpeed * 2;
        this.damagePlayer(10, true);
      } else {
        if (
          this.player.y + speed + this.player.height / 2 <=
          this.canvas.height
        ) {
          this.player.y += diagonalSpeed;
        } else {
          this.player.y = this.canvas.height - this.player.height / 2;
        }
        if (this.player.x - this.player.width / 2 - speed >= 0) {
          this.player.x -= diagonalSpeed;
        } else {
          this.player.x = this.player.width / 2;
        }
      }
    } else if (
      this.keysPressed['ArrowDown'] &&
      this.keysPressed['ArrowRight']
    ) {
      if (collision.check(this.player, this.enemies)) {
        this.player.y -= diagonalSpeed * 2;
        this.player.x -= diagonalSpeed * 2;
        this.damagePlayer(10, true);
      } else {
        if (
          this.player.y + speed + this.player.height / 2 <=
          this.canvas.height
        ) {
          this.player.y += diagonalSpeed;
        } else {
          this.player.y = this.canvas.height - this.player.height / 2;
        }
        if (
          this.player.x + speed + this.player.width / 2 <=
          this.canvas.width
        ) {
          this.player.x += diagonalSpeed;
        } else {
          this.player.x = this.canvas.width - this.player.width / 2;
        }
      }
    } else if (this.keysPressed['ArrowUp']) {
      if (collision.check(this.player, this.enemies)) {
        this.player.y += speed * 2;
        this.damagePlayer(10, true);
      } else if (this.player.y - this.player.height / 2 - speed >= 0) {
        this.player.y -= speed;
      } else {
        this.player.y = this.player.height / 2;
      }
    } else if (this.keysPressed['ArrowDown']) {
      if (collision.check(this.player, this.enemies)) {
        this.player.y -= speed * 2;
        this.damagePlayer(10, true);
      } else if (
        this.player.y + speed + this.player.height / 2 <=
        this.canvas.height
      ) {
        this.player.y += speed;
      } else {
        this.player.y = this.canvas.height - this.player.height / 2;
      }
    } else if (this.keysPressed['ArrowLeft']) {
      if (collision.check(this.player, this.enemies)) {
        this.player.x += speed * 2;
        this.damagePlayer(10, true);
      } else if (this.player.x - this.player.width / 2 - speed >= 0) {
        this.player.x -= speed;
      } else {
        this.player.x = this.player.width / 2;
      }
    } else if (this.keysPressed['ArrowRight']) {
      if (collision.check(this.player, this.enemies)) {
        this.player.x -= speed * 2;
        this.damagePlayer(10, true);
      } else if (
        this.player.x + speed + this.player.width / 2 <=
        this.canvas.width
      ) {
        this.player.x += speed;
      } else {
        this.player.x = this.canvas.width - this.player.width / 2;
      }
    }
  }

  render() {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = 'yellow';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render game elements here
    this.context.fillStyle = this.player.color;
    this.context.fillRect(
      this.player.x - this.player.width / 2,
      this.player.y - this.player.height / 2,
      this.player.width,
      this.player.height
    );

    for (let i = 0; i < this.enemies.length; i++) {
      // Render the enemy
      this.enemies[i].draw();
    }

    // Render the player health
    this.drawPlayerHealth();
  }
}
