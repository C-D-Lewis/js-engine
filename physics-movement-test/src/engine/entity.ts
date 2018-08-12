import { Bounds } from './types';

export default abstract class Entity {

  constructor(protected bounds: Bounds) {}

  abstract update(): void;
  abstract draw(ctx: any): void;
  abstract onCollide(other: Entity): void;

  move(dx: number, dy: number) {
    this.bounds.x += dx;
    this.bounds.y += dy;
  }
  
  getBounds(): Bounds {
    return this.bounds;
  }
  
  collidesWith(other: Entity) {
    return this.bounds.intersects(other.getBounds());
  }
}
