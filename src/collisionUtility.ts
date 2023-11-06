import { CanvasValues } from './constants';
import { PhysicalComponent } from './physical.component';

export function getCanvasEdgeCollision(object: PhysicalComponent): {
  right: boolean;
  left: boolean;
  top: boolean;
  bottom: boolean;
} {
  return {
    right: object.x + object.speed + object.width / 2 > CanvasValues.WIDTH,
    left: object.x - object.width / 2 - object.speed < 0,
    top: object.y - object.height / 2 - object.speed < 0,
    bottom: object.y + object.speed + object.height / 2 > CanvasValues.HEIGHT,
  };
}
