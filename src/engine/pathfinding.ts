import {
  Size, Point, Color,
} from './types';

export class PathNode {
  
  public g: number = 0;
  public h: number = 0;
  
  f() { return this.g + this.h; }
}

class MapTile {
  
  private pathNode: PathNode = new PathNode();
  
  constructor(public x: number, public y: number, private color: Color, private isPassable: boolean, private size: number) {}
  
  getOrigin() {
    return { x: this.x * this.size, y: this.y * this.size };
  }
  
  getPathNode() {
    return this.pathNode;
  }
  
  draw(ctx: any) {
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.x * this.size, this.y * this.size, this.size, this.size);
  }
}

export class Map {
  
  private tiles: MapTile[][] = [];
  
  constructor(private gridSize: Size, tileSize: number) {
    const neutralColor = new Color(128, 128, 128);
    
    for (let x = 0; x < gridSize.width; x += 1) {
      this.tiles[x] = [];
      for (let y = 0; y < gridSize.height; y += 1) {
        this.tiles[x][y] = new MapTile(x, y, neutralColor, true, tileSize);
      }
    }
  }
  
  getTile(pos: Point) { return this.tiles[pos.x][pos.y]; }
  
  draw(ctx: any) {
    for (let y = 0; y < this.gridSize.height; y += 1) {
      for (let x = 0; x < this.gridSize.width; x += 1) {
        this.tiles[x][y].draw(ctx);
      }
    }
  }
  
  cityBlockDistance(from: Point, to: Point) {
    return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
  }
  
  isOnGrid(query: Point) {
    return query.x > 0 && query.x < this.gridSize.width && query.y > 0 && query.y < this.gridSize.height;
  }
  
  examineNeighbour(origin: Point, dx: number, dy: number, openList: MapTile[], closedList: MapTile[]) {
    const query = { x: origin.x + dx, y: origin.y + dy };
    if (this.isOnGrid(query)) openList.push(this.getTile(query));
    
    
  }
  
  calculatePath(from: Point, to: Point) {
    const openList: MapTile[] = [];
    const closedList: MapTile[] = [];
    
    // Start open list with from
    openList.push(this.getTile(from));
    
    const itemIsTarget = (item: MapTile) => (item.x === to.x) && (item.y === to.y);
    
    // While target is not in the open list
    while (!closedList.filter(itemIsTarget)) {
      // Take the node in open list with lowest score
      const nextTile = openList.reduce((result: MapTile, item: MapTile) => {
        const pathNode = item;
        if (item.getPathNode().f() < result.getPathNode().f()) result = item;
        
        return result;
      }, openList[0]);
      
      // Remove from open, add to closed
      openList.splice(openList.indexOf(nextTile), 1);
      closedList.push(nextTile);
      
      // Add the walkable neighbours to the open list
      const origin = { x: nextTile.x, y: nextTile.y };
      this.examineNeighbour(origin, 0, -1, openList, closedList);
      this.examineNeighbour(origin, 1, 0, openList, closedList);
      this.examineNeighbour(origin, 0, +1, openList, closedList);
      this.examineNeighbour(origin, -1, 0, openList, closedList);
    }
  }
}
