export interface Point {
  x: number;
  y: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface PhysicsProps {
  speed: number;
  maxSpeed: number;
  acceleration: number;
  drag: number;
}

export class Bounds {
  
  constructor(public x: number, public y: number, public width: number, public height: number) {}

  contains(query: Point) {
    return (query.x >= this.x && query.x <= (this.x + this.width)) &&
           (query.y >= this.y && query.y <= (this.y + this.height));
  }
  
  getTopLeftCorner() {
    return { x: this.x, y: this.y };
  }
  
  getTopRightCorner() {
    return { x: this.x + this.width, y: this.y };
  }
  
  getBottomLeftCorner() {
    return  { x: this.x, y: this.y + this.height };
  }
  
  getBottomRightCorner() {
    return { x: this.x + this.width, y: this.y + this.height };
  }
  
  // If any corners are inside
  intersects(other: Bounds) {
    if (this.contains(other.getTopLeftCorner())) return true;
    if (this.contains(other.getTopRightCorner())) return true;
    if (this.contains(other.getBottomLeftCorner())) return true;
    if (this.contains(other.getBottomRightCorner())) return true;
    
    return false;
  }

}
