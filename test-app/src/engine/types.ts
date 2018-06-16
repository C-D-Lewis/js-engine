export class Point {

  constructor(public x: number, public y: number) {}

}

export class Bounds {

  constructor(public x: number, public y: number, public width: number, public height: number) {}

  contains(query: Point) {
    return (query.x > this.x && query.x < (this.x + this.width)) &&
           (query.y > this.y && query.y < (this.y + this.height));
  }

}