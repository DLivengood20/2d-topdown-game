import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { CharacterEntity } from './character.entity';

/**
 * Represents an enemy entity in the game, extending the CharacterEntity class.
 */
export class EnemyEntity extends CharacterEntity {
  /**
   * Creates an instance of EnemyEntity.
   * @param {string} id - The unique identifier for the enemy entity.
   * @param {PhysicalComponent} physicalComponent - The physical component representing the enemy's position and dimensions.
   * @param {RenderComponent} renderComponent - The render component defining how the enemy should be displayed.
   * @param {StatusComponent} statusComponent - The status component representing the enemy's health and other status attributes.
   */
  constructor(
    id: string,
    physicalComponent: PhysicalComponent,
    renderComponent: RenderComponent,
    statusComponent: StatusComponent
  ) {
    super(id, physicalComponent, renderComponent, statusComponent);
  }
}
