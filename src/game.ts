import { playerInput } from './playerController';
import { CanvasValues } from './constants';
import { CanvasController } from './canvasController';
import { CharacterManager } from './characterManager';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private canvasController: CanvasController;
  private keysPressed: { [key: string]: boolean };
  private characterManager: CharacterManager;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = CanvasValues.WIDTH; // Adjust the width as per your requirements
    this.canvas.height = CanvasValues.HEIGHT; // Adjust the height as per your requirements
    document.body.appendChild(this.canvas);

    if (this.ctx === null) {
      throw new Error('Unable to initialize CanvasRenderingContext2D.');
    }

    this.canvasController = new CanvasController(this.ctx);

    this.keysPressed = {};
    this.registerEventListeners();

    this.characterManager = new CharacterManager();
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
    playerInput(this.keysPressed, this.characterManager.getPlayer());
    this.characterManager.updateCharacters();
  }

  render() {
    this.canvasController.draw(
      this.characterManager.getPlayer(),
      this.characterManager.getEnemies()
    );
  }
}
