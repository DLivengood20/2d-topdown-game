import { CanvasValues } from './constants';
import { Player } from './player';

export function createPlayer() {
  return new Player(
    CanvasValues.Width / 2,
    CanvasValues.Height / 2,
    20,
    20,
    100
  );
}
