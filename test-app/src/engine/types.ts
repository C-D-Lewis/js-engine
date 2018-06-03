export class Point {

  constructor(public x: number, public y: number) {}

}

export class Bounds {

  constructor(public x: number, public y: number, public width: number, public height: number) {}

  contains(point: Point) {
    return (point.x > this.x && point.x < (this.x + this.width)) &&
           (point.y > this.y && point.y < (this.y + this.height));
  }

}