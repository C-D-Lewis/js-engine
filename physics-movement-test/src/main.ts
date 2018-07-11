import {
  Bounds,
  Point,
} from './engine/types';
import Engine from './engine/engine';
import Pawn from './entity/Pawn';
import { toRadians, randomInt } from './engine/util';
import { PathGrid } from './engine/pathfinding';

const GRID_SIZE = { width: 40, height: 20 };

let engine: Engine;
let pathGrid: PathGrid;
let pawn: Pawn;

const update = () => {
  pawn.update();
};

const draw = (ctx: any) => {
  pathGrid.draw(ctx);
  pawn.draw(ctx);
};

(() => {
  engine = new Engine({
    init: () => {
      const tileSize =Math.round(engine.width / GRID_SIZE.width)
      pathGrid = new PathGrid(GRID_SIZE, tileSize);
      
      pawn = new Pawn(new Bounds(400, 100, tileSize, tileSize), 'red', {
        speed: 0,
        acceleration: 1,
        drag: 0.3,
        maxSpeed: 5,
      });
      
      pawn.setTargetLocation({ x: randomInt(engine.width), y: randomInt(engine.height) });
      
      setInterval(() => {
        pawn.setTargetLocation({ x: randomInt(engine.width), y: randomInt(engine.height) });
      }, 3000);
    },
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
