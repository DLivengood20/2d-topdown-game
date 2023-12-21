import { CanvasValues } from './constants';

class UIElement {
  x: number;
  y: number;
  width: number;
  height: number;
  isHovered: boolean = false;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  checkMouseHover(mouseX: number, mouseY: number): boolean {
    this.isHovered =
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height;
    return this.isHovered;
  }
}

const UIElements = {
  start: new UIElement(
    CanvasValues.WIDTH / 2 - 100,
    CanvasValues.HEIGHT / 2,
    200,
    50
  ),
};

export class ScreenManager {
  canvas: HTMLCanvasElement;
  start: StartScreen;
  itemWorld: ItemWorldScreen;

  mouseX: number = 0;
  mouseY: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.start = new StartScreen(this.canvas);
    this.itemWorld = new ItemWorldScreen();

    // Use arrow function for event listener
    canvas.addEventListener('mousemove', (event) =>
      this.handleMouseMove(event)
    );
    // Prevent the default context menu on right-click
    canvas.addEventListener('contextmenu', (event) => event.preventDefault());
  }

  private handleMouseMove(event: MouseEvent) {
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;

    const elements: UIElement[] = [...this.start.getElements()];
    for (const element of elements) {
      element.checkMouseHover(this.mouseX, this.mouseY);
    }
  }

  update(keysPressed: { [key: string]: boolean }) {
    if (this.start.isActive) {
      if (
        keysPressed['Enter'] ||
        (keysPressed['mousedown'] && this.start.startButton.isHovered)
      ) {
        this.start.isActive = false;
        this.itemWorld.isActive = true;
      }
    }
    if (keysPressed['Escape']) {
      this.start.isActive = true;
      this.itemWorld.isActive = false;
    }
  }
}

interface Screen {
  isActive: boolean;
  getElements(): UIElement[];
}

class StartScreen implements Screen {
  isActive: boolean;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  startButton: UIElement;

  constructor(canvas: HTMLCanvasElement) {
    this.isActive = false;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.startButton = UIElements.start;
  }

  getElements(): UIElement[] {
    return [this.startButton];
  }

  render() {
    // Clear the canvas
    this.ctx?.clearRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
    this.drawStartButton();
  }

  drawStartButton() {
    const { x, y, width, height, isHovered } = this.startButton;
    if (this.ctx === null) {
      return;
    }
    let offset = isHovered ? 3 : 0;

    // Draw the title
    this.ctx.fillStyle = 'black';
    this.ctx.font = '48px Arial';
    this.ctx.fillText(
      'Game Title',
      CanvasValues.WIDTH / 2 - 200,
      CanvasValues.HEIGHT / 3
    );

    // Draw the start button with different color based on hover state
    this.ctx.fillStyle = isHovered ? '#0066cc' : '#00f';
    this.ctx.fillRect(x + offset, y + offset, width, height);

    // Draw the start button text
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '24px Arial';
    this.ctx.fillText(
      'Start',
      CanvasValues.WIDTH / 2 - 80 + offset,
      CanvasValues.HEIGHT / 2 + 35 + offset
    );
  }
}

class ItemWorldScreen implements Screen {
  isActive: boolean;

  constructor() {
    this.isActive = true;
  }
  getElements(): UIElement[] {
    throw new Error('Method not implemented.');
  }
}
