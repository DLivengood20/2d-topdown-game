import { Component } from '../components/component';
import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { Entity } from './entity';

/**
 * Represents a character entity in the game, extending the base Entity class.
 */
export class CharacterEntity extends Entity {
  /**
   * Creates an instance of CharacterEntity.
   * @param {string} id - The unique identifier for the entity.
   * @param {PhysicalComponent} physicalComponent - The physical component representing the entity's position and dimensions.
   * @param {RenderComponent} renderComponent - The render component defining how the entity should be displayed.
   * @param {StatusComponent} statusComponent - The status component representing the entity's health and other status attributes.
   * @param {...Component} additionalComponents - Additional components that can be attached to the character entity.
   */
  constructor(
    id: string,
    physicalComponent: PhysicalComponent,
    renderComponent: RenderComponent,
    statusComponent: StatusComponent,
    ...additionalComponents: Component[]
  ) {
    super(id, [
      physicalComponent,
      renderComponent,
      statusComponent,
      ...additionalComponents,
    ]);
  }
}
