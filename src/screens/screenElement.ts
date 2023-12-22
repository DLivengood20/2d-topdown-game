export class ScreenElement {
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
