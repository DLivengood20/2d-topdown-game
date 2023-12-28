import { CanvasValues } from '../constants';
import { ScreenElement } from './screenElement';

/**
 * Represents a collection of predefined screen elements.
 * @type {Record<string, ScreenElement>}
 */
export const ScreenElements: Record<string, ScreenElement> = {
  /**
   * The 1st button in menu screen element.
   * @type {ScreenElement}
   */
  Button_1: new ScreenElement(
    CanvasValues.WIDTH / 2 - 100,
    CanvasValues.HEIGHT / 2 - 60,
    200,
    50
  ),
  /**
   * The 2nd button in menu screen element.
   * @type {ScreenElement}
   */
  Button_2: new ScreenElement(
    CanvasValues.WIDTH / 2 - 100,
    CanvasValues.HEIGHT / 2,
    200,
    50
  ),
  /**
   * The 3rd button in menu screen element.
   * @type {ScreenElement}
   */
  Button_3: new ScreenElement(
    CanvasValues.WIDTH / 2 - 100,
    CanvasValues.HEIGHT / 2 + 60,
    200,
    50
  ),
  /**
   * The 4th button in menu screen element.
   * @type {ScreenElement}
   */
  Button_4: new ScreenElement(
    CanvasValues.WIDTH / 2 - 100,
    CanvasValues.HEIGHT / 2 + 120,
    200,
    50
  ),
};
