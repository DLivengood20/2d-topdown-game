import { Weapon } from './weapon';
export class WeaponList {
  static broadsword() {
    return new Weapon(20, 2, (90 * Math.PI) / 180, 200, 500);
  }
  static glaive() {
    return new Weapon(30, 2, (30 * Math.PI) / 180, 300, 600);
  }
  static dagger() {
    return new Weapon(10, 4, Math.PI, 200, 300);
  }
}
