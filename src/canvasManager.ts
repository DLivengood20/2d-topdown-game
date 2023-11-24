import { CanvasValues } from './constants';

/**
 * Class representing the initialization of a canvas for rendering graphics.
 */
export class CanvasManager {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;

  /**
   * Constructs a new CanvasInitialization instance.
   * @throws {Error} Throws an error if the CanvasRenderingContext2D cannot be initialized.
   */
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    if (this.ctx === null) {
      throw new Error('Unable to initialize CanvasRenderingContext2D.');
    }

    this.configureCanvas();
  }

  /**
   * Configures the canvas with predefined width and height.
   * @private
   */
  private configureCanvas() {
    this.canvas.width = CanvasValues.WIDTH;
    this.canvas.height = CanvasValues.HEIGHT;
  }

  /**
   * Gets the HTMLCanvasElement instance.
   * @returns {HTMLCanvasElement} The canvas element.
   */
  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  /**
   * Gets the CanvasRenderingContext2D instance.
   * @throws {Error} Throws an error if the CanvasRenderingContext2D is null.
   * @returns {CanvasRenderingContext2D} The 2D rendering context.
   */
  getContext(): CanvasRenderingContext2D {
    if (this.ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }
    return this.ctx;
  }
}
