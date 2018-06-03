import { Bounds } from './types';
import Engine from './engine';

export default abstract class Entity {

  constructor(protected engine: Engine, protected bounds: Bounds) {}

  abstract update(): void;

  abstract draw(ctx: any): void;

  move(dx: number, dy: number) {
    this.bounds.x += dx;
    this.bounds.y += dy;
  }

}