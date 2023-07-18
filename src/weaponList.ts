import { Weapon } from './weapon';
export class WeaponList {
  static broadsword(canvas: HTMLCanvasElement) {
    return new Weapon(canvas, 20, 2, (90 * Math.PI) / 180, 200, 500);
  }
  static glaive(canvas: HTMLCanvasElement) {
    return new Weapon(canvas, 30, 2, (30 * Math.PI) / 180, 300, 600);
  }
  static dagger(canvas: HTMLCanvasElement) {
    return new Weapon(canvas, 10, 4, Math.PI, 200, 300);
  }
}
