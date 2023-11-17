import { Component } from '../components/component';
import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { Entity } from './entity';

export class CharacterEntity extends Entity {
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