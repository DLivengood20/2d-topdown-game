import { FacingAngles } from './facingAngles';
import { PhysObject } from './physObject';

export class MovementHandler {
  static handleMovement(
    keysPressed: { [key: string]: boolean },
    object: PhysObject,
    wallCollision: {
      right: boolean;
      left: boolean;
      top: boolean;
      bottom: boolean;
    }
  ) {
    const move = object.move;

    if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
      object.heading = FacingAngles.TopLeft;
      if (!wallCollision.top) {
        move.up(object, move.diagonalSpeed);
      }
      if (!wallCollision.left) {
        move.left(object, move.diagonalSpeed);
      }
    } else if (keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
      object.heading = FacingAngles.TopRight;
      if (!wallCollision.top) {
        move.up(object, move.diagonalSpeed);
      }
      if (!wallCollision.right) {
        move.right(object, move.diagonalSpeed);
      }
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowLeft']) {
      object.heading = FacingAngles.BottomLeft;
      if (!wallCollision.bottom) {
        move.down(object, move.diagonalSpeed);
      }
      if (!wallCollision.left) {
        move.left(object, move.diagonalSpeed);
      }
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
      object.heading = FacingAngles.BottomRight;
      if (!wallCollision.bottom) {
        move.down(object, move.diagonalSpeed);
      }
      if (!wallCollision.right) {
        move.right(object, move.diagonalSpeed);
      }
    } else if (keysPressed['ArrowUp'] && !wallCollision.top) {
      object.heading = FacingAngles.Top;
      move.up(object, move.speed);
    } else if (keysPressed['ArrowDown'] && !wallCollision.bottom) {
      object.heading = FacingAngles.Bottom;
      move.down(object, move.speed);
    } else if (keysPressed['ArrowLeft'] && !wallCollision.left) {
      object.heading = FacingAngles.Left;
      move.left(object, move.speed);
    } else if (keysPressed['ArrowRight'] && !wallCollision.right) {
      object.heading = FacingAngles.Right;
      move.right(object, move.speed);
    }
  }

  static knockback(object: PhysObject, hazard: PhysObject) {
    const dx = object.x - hazard.x;
    const dy = object.y - hazard.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize the direction vector
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    // Move the player away from the enemy based on the normalized direction
    const moveDistance = object.move.speed * 2;

    object.move.right(object, normalizedDx * moveDistance);
    object.move.down(object, normalizedDy * moveDistance);
  }
}
