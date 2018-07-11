import {
  Dimension, Point,
} from './types';

export class PathNode {
  
  public g: number = 0;
  public h: number = 0;
  
  f() { return this.g + this.h; }
}

export class PathGrid {
  
  private grid: PathNode[][] = [];
  
  constructor(private gridSize: Dimension, private tileSize: number) {
    for (let x = 0; x < gridSize.width; x += 1) {
      this.grid[x] = [];
      for (let y = 0; y < gridSize.height; y += 1) {
        this.grid[x][y] = new PathNode();
      }
    }
  }
  
  draw(ctx: any) {
    ctx.strokeStyle = 'grey';
    
    for (let y = 0; y < this.gridSize.height; y += 1) {
      for (let x = 0; x < this.gridSize.width; x += 1) {
        ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
      }
    }
  }
  
  calculatePath(from: Point, to: Point) {
    
  }
  
}