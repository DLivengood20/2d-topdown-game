import { CanvasValues } from './constants';

export class CanvasInitialization {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    if (this.ctx === null) {
      throw new Error('Unable to initialize CanvasRenderingContext2D.');
    }

    this.configureCanvas();
  }

  private configureCanvas() {
    this.canvas.width = CanvasValues.WIDTH;
    this.canvas.height = CanvasValues.HEIGHT;
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getContext(): CanvasRenderingContext2D {
    if (this.ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }
    return this.ctx;
  }
}
