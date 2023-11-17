import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { WeaponComponent } from '../components/weapon.component';
import { CharacterEntity } from './character.entity';

/**
 * Represents a player entity in the game, extending the CharacterEntity class.
 */
export class PlayerEntity extends CharacterEntity {
  /**
   * Creates an instance of PlayerEntity.
   * @param {string} id - The unique identifier for the player entity.
   * @param {PhysicalComponent} physicalComponent - The physical component representing the player's position and dimensions.
   * @param {RenderComponent} renderComponent - The render component defining how the player should be displayed.
   * @param {StatusComponent} statusComponent - The status component representing the player's health and other status attributes.
   * @param {WeaponComponent} weaponComponent - The weapon component defining the player's weapon attributes.
   */
  constructor(
    id: string,
    physicalComponent: PhysicalComponent,
    renderComponent: RenderComponent,
    statusComponent: StatusComponent,
    weaponComponent: WeaponComponent
  ) {
    super(
      id,
      physicalComponent,
      renderComponent,
      statusComponent,
      weaponComponent
    );
  }
}
