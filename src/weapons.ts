export class Weapons {
  static Broadsword = {
    length: 20,
    weaponWidth: 2,
    swingAngle: (90 * Math.PI) / 180,
    attackDuration: 200,
    cooldown: 500,
  };
  static Glaive = {
    length: 30,
    weaponWidth: 2,
    swingAngle: (30 * Math.PI) / 180,
    attackDuration: 300,
    cooldown: 600,
  };
  static Dagger = {
    length: 10,
    weaponWidth: 4,
    swingAngle: Math.PI,
    attackDuration: 200,
    cooldown: 300,
  };
}
