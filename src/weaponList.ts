import { Weapon } from './weapon';
export class WeaponList {
  static broadsword(ctx: CanvasRenderingContext2D) {
    return new Weapon(ctx, 20, 2, (90 * Math.PI) / 180, 200, 500);
  }
  static glaive(ctx: CanvasRenderingContext2D) {
    return new Weapon(ctx, 30, 2, (30 * Math.PI) / 180, 300, 600);
  }
  static dagger(ctx: CanvasRenderingContext2D) {
    return new Weapon(ctx, 10, 4, Math.PI, 200, 300);
  }
}
