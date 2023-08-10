import { Player } from './player';

export function createPlayer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('CanvasRenderingContext2D is null.');
  }
  return new Player(ctx, canvas.width / 2, canvas.height / 2, 20, 20, 100);
}
