import { CanvasValues } from '../constants';
import { ScreenElement } from './screenElement';

/**
 * Represents a collection of predefined screen elements.
 * @type {Record<string, ScreenElement>}
 */
export const ScreenElements: Record<string, ScreenElement> = {
  /**
   * The start button screen element.
   * @type {ScreenElement}
   */
  startButton: new ScreenElement(
    CanvasValues.WIDTH / 2 - 100,
    CanvasValues.HEIGHT / 2,
    200,
    50
  ),
  /**
   * The quit button screen element.
   * @type {ScreenElement}
   */
  quitButton: new ScreenElement(
    CanvasValues.WIDTH / 2 - 100,
    CanvasValues.HEIGHT / 2 + 60,
    200,
    50
  ),
};
