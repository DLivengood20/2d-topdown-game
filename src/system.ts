import { Entity } from './entity';

export interface System {
  update(entities: Entity[]): void;
}
