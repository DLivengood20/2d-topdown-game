import { CanvasValues } from './constants';
import { InputService } from './inputService';

class UIElement {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
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

const UIElements: Record<string, UIElement> = {
  start: new UIElement(
    CanvasValues.WIDTH / 2 - 100,
    CanvasValues.HEIGHT / 2,
    200,
    50
  ),
};

interface Screen {
  isActive: boolean;
  getElements(): UIElement[];
  render(ctx: CanvasRenderingContext2D): void;
}

class StartScreen implements Screen {
  isActive: boolean = false;
  startButton: UIElement;

  constructor() {
    this.startButton = UIElements.start;
  }

  getElements(): UIElement[] {
    return [this.startButton];
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.clearCanvas(ctx);
    this.drawStartButton(ctx);
  }

  private clearCanvas(ctx: CanvasRenderingContext2D): void {
    ctx?.clearRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
  }

  private drawStartButton(ctx: CanvasRenderingContext2D): void {
    const { x, y, width, height, isHovered } = this.startButton;
    if (!ctx) return;
    const offset = isHovered ? 3 : 0;

    // Draw the title
    this.drawText(
      ctx,
      'Game Title',
      this.startButton.x,
      this.startButton.y - 20
    );

    // Draw the start button with different color based on hover state
    const buttonColor = isHovered ? '#0066cc' : '#00f';
    ctx.fillStyle = buttonColor;
    ctx.fillRect(x + offset, y + offset, width, height);

    // Draw the start button text
    this.drawText(
      ctx,
      'Start',
      this.startButton.x + 20 + offset,
      this.startButton.y + 40 + offset,
      '#fff'
    );
  }

  private drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    color: string = 'black'
  ): void {
    ctx.fillStyle = color;
    ctx.font = '48px Arial';
    ctx.fillText(text, x, y);
  }
}

class ItemWorldScreen implements Screen {
  isActive: boolean = true;

  getElements(): UIElement[] {
    return [];
  }

  render(ctx: CanvasRenderingContext2D): void {
    // Implement rendering for ItemWorldScreen
  }
}

export class ScreenManager {
  start: StartScreen;
  itemWorld: ItemWorldScreen;

  constructor(private inputService: InputService) {
    this.start = new StartScreen();
    this.itemWorld = new ItemWorldScreen();
  }

  private updateElements(): void {
    const { x, y } = this.inputService.mousePosition;
    const elements: UIElement[] = [...this.start.getElements()];
    for (const element of elements) {
      element.checkMouseHover(x, y);
    }
  }

  update(): void {
    this.updateElements();
    const { keysPressed } = this.inputService;
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
