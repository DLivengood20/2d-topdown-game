import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { CanvasValues, Directions } from '../constants';
import { Weapons } from '../components/components';
import { EnemyEntity } from './enemy.entity';
import { PlayerEntity } from './player.entity';

/**
 * Predefined entities with default configurations.
 *
 * @enum {PlayerEntity | EnemyEntity}
 */
export const Entities = {
  /**
   * Default player entity with predefined components and settings.
   *
   * @type {PlayerEntity}
   */
  DEFAULT_PLAYER: new PlayerEntity(
    'PLAYER',
    new PhysicalComponent(
      CanvasValues.WIDTH / 2,
      CanvasValues.HEIGHT / 2,
      Directions.BOTTOM,
      20,
      20,
      5
    ),
    new RenderComponent('blue', 'orange', 'green'),
    new StatusComponent(100, 1000, 0),
    Weapons.BROADSWORD
  ),

  /**
   * First enemy entity with predefined components and settings.
   *
   * @type {EnemyEntity}
   */
  ENEMY_1: new EnemyEntity(
    'ENEMY_1',
    new PhysicalComponent(100, 100, Directions.RIGHT, 20, 20, 4),
    new RenderComponent('red', 'green', 'blue'),
    new StatusComponent(10, 0, 10)
  ),
  /**
   * Second enemy entity with predefined components and settings.
   *
   * @type {EnemyEntity}
   */
  ENEMY_2: new EnemyEntity(
    'ENEMY_2',
    new PhysicalComponent(121, 121, Directions.BOTTOM, 20, 20, 3),
    new RenderComponent('red', 'green', 'blue'),
    new StatusComponent(10, 0, 10)
  ),
  /**
   * Third enemy entity with predefined components and settings.
   *
   * @type {EnemyEntity}
   */
  ENEMY_3: new EnemyEntity(
    'ENEMY_3',
    new PhysicalComponent(600, 400, Directions.LEFT, 40, 40, 2),
    new RenderComponent('red', 'green', 'blue'),
    new StatusComponent(10, 0, 10)
  ),
};
