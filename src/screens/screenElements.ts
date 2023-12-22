import { CanvasValues } from '../constants';
import { ScreenElement } from './screenElement';

export const ScreenElements: Record<string, ScreenElement> = {
  startButton: new ScreenElement(
    CanvasValues.WIDTH / 2 - 100,
    CanvasValues.HEIGHT / 2,
    200,
    50
  ),
};
