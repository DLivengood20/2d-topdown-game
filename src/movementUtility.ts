import { getCanvasEdgeCollision } from './collisionUtility';
import { FacingAngles } from './constants';
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
    object.heading = FacingAngles.TOP_LEFT;
  }
  const wallCollision = getCanvasEdgeCollision(object);
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
  const wallCollision = getCanvasEdgeCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.TOP_RIGHT;
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
  const wallCollision = getCanvasEdgeCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.BOTTOM_LEFT;
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
  const wallCollision = getCanvasEdgeCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.BOTTOM_RIGHT;
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
  const wallCollision = getCanvasEdgeCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.TOP;
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
  const wallCollision = getCanvasEdgeCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.BOTTOM;
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
  const wallCollision = getCanvasEdgeCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.LEFT;
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
  const wallCollision = getCanvasEdgeCollision(object);
  if (changeHeading) {
    object.heading = FacingAngles.RIGHT;
  }
  if (!wallCollision.right) {
    object.x += speed;
  }
}
