import { borderCollision } from './collidable';
import { FacingAngles } from './facingAngles';
import { PhysObject } from './physObject';

export function knockback(object: PhysObject, hazard: PhysObject) {
  const dx = object.x - hazard.x;
  const dy = object.y - hazard.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  // Normalize the direction vector
  const normalizedDx = dx / distance;
  const normalizedDy = dy / distance;

  // Move the player away from the enemy based on the normalized direction
  const moveDistance = object.speed * 2;

  moveRight(object, normalizedDx * moveDistance);
  moveDown(object, normalizedDy * moveDistance);
}

export function moveUpLeft(
  object: PhysObject,
  speed: number,
  changeHeading?: boolean
) {
  if (changeHeading) {
    object.heading = FacingAngles.TopLeft;
  }
  const wallCollision = borderCollision(object);
  if (!wallCollision.top) {
    object.y -= speed;
  }
  if (!wallCollision.left) {
    object.x -= speed;
  }
}

export function moveUpRight(
  object: PhysObject,
  speed: number,
  changeHeading?: boolean
) {
  const wallCollision = borderCollision(object);
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

export function moveBottomLeft(
  object: PhysObject,
  speed: number,
  changeHeading?: boolean
) {
  const wallCollision = borderCollision(object);
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

export function moveBottomRight(
  object: PhysObject,
  speed: number,
  changeHeading?: boolean
) {
  const wallCollision = borderCollision(object);
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

export function moveUp(
  object: PhysObject,
  speed: number,
  changeHeading?: boolean
) {
  const wallCollision = borderCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.Top;
  }
  if (!wallCollision.top) {
    object.y -= speed;
  }
}

export function moveDown(
  object: PhysObject,
  speed: number,
  changeHeading?: boolean
) {
  const wallCollision = borderCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.Bottom;
  }
  if (!wallCollision.bottom) {
    object.y += speed;
  }
}

export function moveLeft(
  object: PhysObject,
  speed: number,
  changeHeading?: boolean
) {
  const wallCollision = borderCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.Left;
  }
  if (!wallCollision.left) {
    object.x -= speed;
  }
}

export function moveRight(
  object: PhysObject,
  speed: number,
  changeHeading?: boolean
) {
  const wallCollision = borderCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.Right;
  }
  if (!wallCollision.right) {
    object.x += speed;
  }
}
