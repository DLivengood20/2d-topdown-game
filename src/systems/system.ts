import { Entity } from '../entities/entity';

export interface System {
  update(entities: Entity[]): void;
}
