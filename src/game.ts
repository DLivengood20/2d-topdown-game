import { Enemy } from './enemy';
import { Player } from './player';
import { FacingAngles } from './facingAngles';
import { createPlayer } from './playerUtility';
import { playerInput } from './playerController';
import { CanvasValues } from './constants';
import { CanvasController } from './canvasController';
import { updateCharacters } from './characterManager';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private canvasController: CanvasController;
  private keysPressed: { [key: string]: boolean };

  private enemies: Array<Enemy>;
  private player: Player;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = CanvasValues.Width; // Adjust the width as per your requirements
    this.canvas.height = CanvasValues.Height; // Adjust the height as per your requirements
    document.body.appendChild(this.canvas);

    if (this.ctx === null) {
      throw new Error('Unable to initialize CanvasRenderingContext2D.');
    }

    this.canvasController = new CanvasController(this.ctx);

    this.keysPressed = {};
    this.registerEventListeners();

    // Create an instance of the player
    this.player = createPlayer();

    this.enemies = new Array<Enemy>();

    this.enemies.push(new Enemy(100, 100, 20, 20, FacingAngles.Right, 4));
    this.enemies.push(new Enemy(121, 121, 20, 20, FacingAngles.Bottom, 3));
    this.enemies.push(new Enemy(600, 400, 40, 40, FacingAngles.Left, 2));
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

  startGameLoop() {
    const update = () => {
      this.update();
      this.render();
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

  update() {
    // Update game logic here
    playerInput(this.keysPressed, this.player);
    updateCharacters(this.player, this.enemies);
  }

  render() {
    this.canvasController.draw(this.player, this.enemies);
  }
}
