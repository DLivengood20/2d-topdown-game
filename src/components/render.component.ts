export class RenderComponent {
  defaultColor: string;
  currentColor: string;
  facingColor: string;
  stunColor: string;
  constructor(defaultColor: string, facingColor: string, stunColor: string) {
    this.defaultColor = defaultColor;
    this.facingColor = facingColor;
    this.currentColor = defaultColor;
    this.stunColor = stunColor;
  }
}
