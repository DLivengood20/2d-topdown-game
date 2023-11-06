import { getCanvasEdgeCollision } from './collisionUtility';
import { FacingAngles } from './constants';
import { PhysicalComponent } from './physical.component';

export function moveUpLeft(
  object: PhysicalComponent,
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
  object: PhysicalComponent,
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
  object: PhysicalComponent,
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
  object: PhysicalComponent,
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
  object: PhysicalComponent,
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
  object: PhysicalComponent,
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
  object: PhysicalComponent,
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
  object: PhysicalComponent,
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
