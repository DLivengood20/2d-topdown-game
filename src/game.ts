import { Enemy } from './enemy';
import { Player } from './player';

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private keysPressed: { [key: string]: boolean };

  private enemies: Array<Enemy>;
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

    // Create an instance of the player
    this.player = new Player(
      this.canvas,
      this.canvas.width / 2,
      this.canvas.height / 2,
      20,
      20,
      100
    );

    this.enemies = new Array<Enemy>();

    this.enemies.push(new Enemy(this.canvas, 100, 100, 20, 20));
    this.enemies.push(new Enemy(this.canvas, 121, 121, 20, 20));
    this.enemies.push(new Enemy(this.canvas, 600, 400, 40, 40));
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
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    // Set the font color to black (or any color that contrasts with the background)
    this.context.fillStyle = 'black';
    this.context.font = '18px Arial';
    this.context.fillText(`Health: ${this.player.getHealth()}`, 10, 30);
  }

  update() {
    // Update game logic here
    this.player.update(this.enemies);
    if (!this.player.isStunned && !this.player.isAttacking) {
      this.player.handleAttack(this.keysPressed, this.enemies);
      this.player.handleMovement(this.keysPressed, this.enemies);
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
    this.player.draw();

    for (let i = 0; i < this.enemies.length; i++) {
      // Render the enemy
      this.enemies[i].draw();
    }

    // Render the player health
    this.drawPlayerHealth();
  }
}
