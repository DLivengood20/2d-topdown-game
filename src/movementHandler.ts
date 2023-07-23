import { Collidable } from './collidable';
import { FacingAngles } from './facingAngles';
import { PhysObject } from './physObject';

export class MovementHandler {
  static knockback(object: PhysObject, hazard: PhysObject) {
    const dx = object.x - hazard.x;
    const dy = object.y - hazard.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize the direction vector
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    // Move the player away from the enemy based on the normalized direction
    const moveDistance = object.speed * 2;

    this.right(object, normalizedDx * moveDistance);
    this.down(object, normalizedDy * moveDistance);
  }

  static upLeft(object: PhysObject, speed: number, changeHeading?: boolean) {
    if (changeHeading) {
      object.heading = FacingAngles.TopLeft;
    }
    const wallCollision = Collidable.border(object);
    if (!wallCollision.top) {
      object.y -= speed;
    }
    if (!wallCollision.left) {
      object.x -= speed;
    }
  }

  static upRight(object: PhysObject, speed: number, changeHeading?: boolean) {
    const wallCollision = Collidable.border(object);
    if (changeHeading) {
      object.heading = FacingAngles.TopRight;
    }
    if (!wallCollision.top) {
      object.y -= speed;
    }
    if (!wallCollision.right) {
      object.x += speed;
    }
  }

  static bottomLeft(
    object: PhysObject,
    speed: number,
    changeHeading?: boolean
  ) {
    const wallCollision = Collidable.border(object);
    if (changeHeading) {
      object.heading = FacingAngles.BottomLeft;
    }
    if (!wallCollision.bottom) {
      object.y += speed;
    }
    if (!wallCollision.left) {
      object.x -= speed;
    }
  }

  static bottomRight(
    object: PhysObject,
    speed: number,
    changeHeading?: boolean
  ) {
    const wallCollision = Collidable.border(object);
    if (changeHeading) {
      object.heading = FacingAngles.BottomRight;
    }
    if (!wallCollision.bottom) {
      object.y += speed;
    }
    if (!wallCollision.right) {
      object.x += speed;
    }
  }

  static up(object: PhysObject, speed: number, changeHeading?: boolean) {
    const wallCollision = Collidable.border(object);
    if (!wallCollision.top) {
      if (changeHeading) {
        object.heading = FacingAngles.Top;
      }
      object.y -= speed;
    }
  }

  static down(object: PhysObject, speed: number, changeHeading?: boolean) {
    const wallCollision = Collidable.border(object);
    if (!wallCollision.bottom) {
      if (changeHeading) {
        object.heading = FacingAngles.Bottom;
      }
      object.y += speed;
    }
  }

  static left(object: PhysObject, speed: number, changeHeading?: boolean) {
    const wallCollision = Collidable.border(object);
    if (!wallCollision.left) {
      if (changeHeading) {
        object.heading = FacingAngles.Left;
      }

      object.x -= speed;
    }
  }

  static right(object: PhysObject, speed: number, changeHeading?: boolean) {
    const wallCollision = Collidable.border(object);
    if (!wallCollision.right) {
      if (changeHeading) {
        object.heading = FacingAngles.Right;
      }
      object.x += speed;
    }
  }
}
