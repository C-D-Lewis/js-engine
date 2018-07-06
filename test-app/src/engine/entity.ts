import { Bounds } from './types';

export default abstract class Entity {

  constructor(protected bounds: Bounds) {}

  abstract update(): void;

  abstract draw(ctx: any): void;

  move(dx: number, dy: number) {
    this.bounds.x += dx;
    this.bounds.y += dy;
  }
  
  // If any corners are inside
  intersects(other: Entity) {
    const otherBounds = other.getBounds();
    
  }
  
  getBounds(): Bounds {
    return this.bounds;
  }

}
