import { PhysObject } from './physObject';

export class Collidable {
  constructor() {}
  collide(object: PhysObject, objects: Array<PhysObject>): Array<PhysObject> {
    const results: Array<PhysObject> = [];
    for (let i = 0; i < objects.length; i++) {
      if (
        objects[i].x + objects[i].width / 2 > object.x - object.width / 2 &&
        objects[i].x - objects[i].width / 2 < object.x + object.width / 2 &&
        objects[i].y + objects[i].height / 2 > object.y - object.height / 2 &&
        objects[i].y - objects[i].height / 2 < object.y + object.height / 2
      ) {
        results.push(objects[i]);
      }
    }
    return results;
  }

  border(object: PhysObject, speed: number, canvas: HTMLCanvasElement) {
    const results = { right: false, left: false, top: false, bottom: false };
    // right edge
    if (object.x + speed + object.width / 2 > canvas.width) {
      results.right = true;
    }
    // left edge
    if (object.x - object.width / 2 - speed < 0) {
      results.left = true;
    }
    // bottom edge
    if (object.y + speed + object.height / 2 > canvas.height) {
      results.bottom = true;
    }
    // top edge
    if (object.y - object.height / 2 - speed < 0) {
      results.top = true;
    }
    return results;
  }
}
