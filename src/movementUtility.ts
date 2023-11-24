import { PhysicalComponent } from './components/physical.component';
import { CanvasValues, Directions } from './constants';

/**
 * Update the heading of a physical component based on the specified direction.
 *
 * @param {PhysicalComponent} object - The physical component to update.
 * @param {Directions} direction - The new facing direction.
 * @param {boolean} [changeHeading] - Flag indicating whether to change the heading.
 * @returns {void}
 */
function updateHeading(
  object: PhysicalComponent,
  direction: Directions,
  changeHeading?: boolean
): void {
  if (changeHeading) {
    object.heading = direction;
  }
}

/**
 * Check for collisions with the canvas edges for a given physical component.
 *
 * @param {PhysicalComponent} object - The physical component to check for collisions.
 * @returns {{top: boolean, bottom: boolean, left: boolean, right: boolean}} - Object indicating collisions on each side.
 */
function checkWallCollision(object: PhysicalComponent): {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
} {
  return {
    top: object.y - object.height / 2 - object.speed < 0,
    bottom: object.y + object.speed + object.height / 2 > CanvasValues.HEIGHT,
    left: object.x - object.width / 2 - object.speed < 0,
    right: object.x + object.speed + object.width / 2 > CanvasValues.WIDTH,
  };
}

/**
 * Move a physical component in a specified direction at a given speed.
 *
 * @param {PhysicalComponent} object - The physical component to move.
 * @param {number} speed - The speed at which to move the object.
 * @param {Directions} direction - The direction in which to move the object.
 * @param {boolean} [changeHeading] - Flag indicating whether to change the heading.
 * @returns {void}
 */
export function move(
  object: PhysicalComponent,
  speed: number,
  direction: Directions,
  changeHeading?: boolean
): void {
  updateHeading(object, direction, changeHeading);

  const wallCollision = checkWallCollision(object);

  switch (direction) {
    case Directions.TOP_LEFT:
      if (!wallCollision.top) {
        object.y -= speed;
      }
      if (!wallCollision.left) {
        object.x -= speed;
      }
      break;

    case Directions.TOP_RIGHT:
      if (!wallCollision.top) {
        object.y -= speed;
      }
      if (!wallCollision.right) {
        object.x += speed;
      }
      break;

    case Directions.BOTTOM_LEFT:
      if (!wallCollision.bottom) {
        object.y += speed;
      }
      if (!wallCollision.left) {
        object.x -= speed;
      }
      break;

    case Directions.BOTTOM_RIGHT:
      if (!wallCollision.bottom) {
        object.y += speed;
      }
      if (!wallCollision.right) {
        object.x += speed;
      }
      break;

    case Directions.TOP:
      if (!wallCollision.top) {
        object.y -= speed;
      }
      break;

    case Directions.BOTTOM:
      if (!wallCollision.bottom) {
        object.y += speed;
      }
      break;

    case Directions.LEFT:
      if (!wallCollision.left) {
        object.x -= speed;
      }
      break;

    case Directions.RIGHT:
      if (!wallCollision.right) {
        object.x += speed;
      }
      break;

    default:
      break;
  }
}
