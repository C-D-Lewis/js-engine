import {
  Bounds,
  Point,
} from './engine/types';
import Engine from './engine/engine';
import Pawn from './entity/Pawn';
import { toRadians, randomInt } from './engine/util';
import { Map } from './engine/pathfinding';

const GRID_SIZE = { width: 40, height: 20 };

let engine: Engine;
let map: Map;
let pawn: Pawn;

const init = () => {
  const tileSize =Math.round(engine.width / GRID_SIZE.width)
  map = new Map(GRID_SIZE, tileSize);
  
  pawn = new Pawn(new Bounds(400, 100, tileSize, tileSize), 'red', {
    speed: 0,
    acceleration: 1,
    drag: 0.3,
    maxSpeed: 5,
  });
  
  pawn.setTargetLocation(map.getTile({
    x: randomInt(GRID_SIZE.width),
    y: randomInt(GRID_SIZE.height),
  }).getOrigin());
};

const update = () => {
  pawn.update();
};

const draw = (ctx: any) => {
  map.draw(ctx);
  pawn.draw(ctx);
};

(() => {
  engine = new Engine({
    init,
    update,
    draw,
    mouseMove: () => {},
    mouseClick: () => {},
    keyDown: (key: string) => {
      if (key === 'p') engine.togglePaused();
    },
    keyUp: () => {},
    debug: true,
  });

  engine.begin();
})();
