import { Enemy } from './enemy';
import { Player } from './player';
import { Weapon } from './weapon';

export enum CanvasValues {
  WIDTH = 800,
  HEIGHT = 600,
}

export enum FacingAngles {
  TOP = Math.PI,
  BOTTOM = 0,
  LEFT = (90 * Math.PI) / 180,
  RIGHT = (270 * Math.PI) / 180,
  TOP_LEFT = (135 * Math.PI) / 180,
  TOP_RIGHT = (225 * Math.PI) / 180,
  BOTTOM_LEFT = (45 * Math.PI) / 180,
  BOTTOM_RIGHT = (315 * Math.PI) / 180,
}

export const Weapons = {
  BROADSWORD: new Weapon(20, 2, (90 * Math.PI) / 180, 200, 500),
  GLAIVE: new Weapon(30, 2, (30 * Math.PI) / 180, 300, 600),
  DAGGER: new Weapon(10, 4, Math.PI, 200, 300),
};

export const Characters = {
  DEFAULT_PLAYER: new Player(
    CanvasValues.WIDTH / 2,
    CanvasValues.HEIGHT / 2,
    20,
    20,
    100
  ),

  ENEMY_1: new Enemy(100, 100, 20, 20, FacingAngles.RIGHT, 4),
  ENEMY_2: new Enemy(121, 121, 20, 20, FacingAngles.BOTTOM, 3),
  ENEMY_3: new Enemy(600, 400, 40, 40, FacingAngles.LEFT, 2),
};
