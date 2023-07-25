import { PhysObject } from './physObject';
import { CanvasValues } from './constants';

export function getCollidedWith(
  object: PhysObject,
  objects: Array<PhysObject>
): Array<PhysObject> {
  const results: Array<PhysObject> = [];
  for (const collidable of objects) {
    if (
      collidable.x + collidable.width / 2 > object.x - object.width / 2 &&
      collidable.x - collidable.width / 2 < object.x + object.width / 2 &&
      collidable.y + collidable.height / 2 > object.y - object.height / 2 &&
      collidable.y - collidable.height / 2 < object.y + object.height / 2
    ) {
      results.push(collidable);
    }
  }
  return results;
}

export function getCanvasEdgeCollision(object: PhysObject): {
  right: boolean;
  left: boolean;
  top: boolean;
  bottom: boolean;
} {
  const results = { right: false, left: false, top: false, bottom: false };
  // right edge
  if (object.x + object.speed + object.width / 2 > CanvasValues.Width) {
    results.right = true;
  }
  // left edge
  if (object.x - object.width / 2 - object.speed < 0) {
    results.left = true;
  }
  // bottom edge
  if (object.y + object.speed + object.height / 2 > CanvasValues.Height) {
    results.bottom = true;
  }
  // top edge
  if (object.y - object.height / 2 - object.speed < 0) {
    results.top = true;
  }
  return results;
}
