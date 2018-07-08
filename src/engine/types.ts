export class Point {

  constructor(public x: number, public y: number) {}

}

export class Bounds {
  
  constructor(public x: number, public y: number, public width: number, public height: number) {}

  contains(query: Point) {
    return (query.x >= this.x && query.x <= (this.x + this.width)) &&
           (query.y >= this.y && query.y <= (this.y + this.height));
  }
  
  getTopLeftCorner() {
    return new Point(this.x, this.y);
  }
  
  getTopRightCorner() {
    return new Point(this.x + this.width, this.y);
  }
  
  getBottomLeftCorner() {
    return  new Point(this.x, this.y + this.height);
  }
  
  getBottomRightCorner() {
    return new Point(this.x + this.width, this.y + this.height);
  }
  
  // If any corners are inside
  intersects(other: Bounds) {
    if (this.contains(other.getTopLeftCorner())) return true;
    if (this.contains(other.getTopRightCorner())) return true;
    if (this.contains(other.getBottomLeftCorner())) return true;
    if (this.contains(other.getBottomRightCorner())) return true;
    
    if (other.contains(this.getTopLeftCorner())) return true;
    if (other.contains(this.getTopRightCorner())) return true;
    if (other.contains(this.getBottomLeftCorner())) return true;
    if (other.contains(this.getBottomRightCorner())) return true;
    
    return false;
  }

}
