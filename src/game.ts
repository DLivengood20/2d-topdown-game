import { Enemy } from './enemy';
import { MovementHandler } from './movementHandler';
import { Player } from './player';
import { AttackHandler } from './attackHandler';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private keysPressed: { [key: string]: boolean };

  private enemies: Array<Enemy>;
  private player: Player;
  private attack: AttackHandler;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800; // Adjust the width as per your requirements
    this.canvas.height = 600; // Adjust the height as per your requirements
    document.body.appendChild(this.canvas);

    if (this.ctx === null) {
      throw new Error('Unable to initialize CanvasRenderingContext2D.');
    }

    this.keysPressed = {};
    this.registerEventListeners();

    this.attack = new AttackHandler();
    // Create an instance of the player
    this.player = new Player(
      this.ctx,
      this.attack,
      this.canvas.width / 2,
      this.canvas.height / 2,
      20,
      20,
      100
    );

    this.enemies = new Array<Enemy>();

    this.enemies.push(new Enemy(this.ctx, 100, 100, 20, 20));
    this.enemies.push(new Enemy(this.ctx, 121, 121, 20, 20));
    this.enemies.push(new Enemy(this.ctx, 600, 400, 40, 40));
  }

  private registerEventListeners() {
    document.addEventListener('keydown', (event) => {
      this.keysPressed[event.key] = true;
    });

    document.addEventListener('keyup', (event) => {
      this.keysPressed[event.key] = false;
    });

    document.addEventListener('mousedown', (event) => {
      if (event.button === 0) {
        this.keysPressed['mousedown'] = true;
      }
    });

    document.addEventListener('mouseup', (event) => {
      if (event.button === 0) {
        this.keysPressed['mousedown'] = false;
      }
    });
  }

  private drawPlayerHealth() {
    if (this.ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    // Set the font color to black (or any color that contrasts with the background)
    this.ctx.fillStyle = 'black';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Health: ${this.player.getHealth()}`, 10, 30);
  }

  update() {
    // Update game logic here
    this.player.update(this.enemies);
    if (!this.player.isStunned && !this.attack.isAttacking) {
      this.attack.handleAttack(this.keysPressed, this.player);
      // rechecks attacking flag incase player initiated an attack this loop
      if (!this.attack.isAttacking) {
        MovementHandler.handleMovement(
          this.keysPressed,
          this.player,
          this.enemies,
          this.canvas
        );
      }
    }
  }

  render() {
    if (this.ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render game elements here
    this.player.draw();

    for (let i = 0; i < this.enemies.length; i++) {
      // Render the enemy
      this.enemies[i].draw();
    }

    // Render the player health
    this.drawPlayerHealth();
  }
}
