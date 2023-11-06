import { EnemyEntity } from './enemy.entity';
import { PhysicalComponent } from './physical.component';
import { PlayerEntity } from './player.entity';
import { RenderComponent } from './render.component';
import { StatusComponent } from './status.component';
import { WeaponComponent } from './weapon.component';

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
  BROADSWORD: new WeaponComponent(
    20,
    2,
    (90 * Math.PI) / 180,
    200,
    500,
    'black'
  ),
  GLAIVE: new WeaponComponent(30, 2, (30 * Math.PI) / 180, 300, 600, 'black'),
  DAGGER: new WeaponComponent(10, 4, Math.PI, 200, 300, 'black'),
};

export const Characters = {
  DEFAULT_PLAYER: new PlayerEntity(
    'PLAYER',
    new PhysicalComponent(
      CanvasValues.WIDTH / 2,
      CanvasValues.HEIGHT / 2,
      FacingAngles.BOTTOM,
      20,
      20,
      5
    ),
    new RenderComponent('blue', 'orange', 'green'),
    Weapons.BROADSWORD,
    new StatusComponent(100, 1000, 0)
  ),

  ENEMY_1: new EnemyEntity(
    'ENEMY_1',
    new PhysicalComponent(100, 100, FacingAngles.RIGHT, 20, 20, 4),
    new RenderComponent('red', 'green', 'blue'),
    new StatusComponent(10, 0, 10)
  ),
  ENEMY_2: new EnemyEntity(
    'ENEMY_2',
    new PhysicalComponent(121, 121, FacingAngles.BOTTOM, 20, 20, 3),
    new RenderComponent('red', 'green', 'blue'),
    new StatusComponent(10, 0, 10)
  ),
  ENEMY_3: new EnemyEntity(
    'ENEMY_3',
    new PhysicalComponent(600, 400, FacingAngles.LEFT, 40, 40, 2),
    new RenderComponent('red', 'green', 'blue'),
    new StatusComponent(10, 0, 10)
  ),
};
