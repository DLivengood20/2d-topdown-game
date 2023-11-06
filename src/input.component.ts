import { Component } from './component';

export class InputComponent implements Component {
  keysPressed: { [key: string]: boolean } = {};
}
