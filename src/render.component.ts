export class RenderComponent {
  defaultColor: string;
  currentColor: string;
  facingColor: string;
  stunColor: string;
  constructor(color: string, facingColor: string, stunColor: string) {
    this.defaultColor = color;
    this.facingColor = facingColor;
    this.currentColor = color;
    this.stunColor = stunColor;
  }
}
