import { InputService } from './inputService';
import { ItemWorldScreen } from './screens/itemWorldScreen';
import { ScreenElement } from './screens/screenElement';
import { StartScreen } from './screens/startScreen';

export class ScreenManager {
  readonly startScreen: StartScreen;
  readonly itemWorldScreen: ItemWorldScreen;

  constructor(private inputService: InputService) {
    this.startScreen = new StartScreen();
    this.itemWorldScreen = new ItemWorldScreen();
  }

  private updateScreenElements(): void {
    const { x, y } = this.inputService.mousePosition;
    const elements: ScreenElement[] = [...this.startScreen.getElements()];
    for (const element of elements) {
      element.checkMouseHover(x, y);
    }
  }

  update(): void {
    this.updateScreenElements();
    const { keysPressed } = this.inputService;
    if (this.startScreen.isActive) {
      if (
        keysPressed['Enter'] ||
        (keysPressed['mousedown'] && this.startScreen.startButton.isHovered)
      ) {
        this.startScreen.isActive = false;
        this.itemWorldScreen.isActive = true;
      }
    }
    if (keysPressed['Escape']) {
      this.startScreen.isActive = true;
      this.itemWorldScreen.isActive = false;
    }
  }
}
