import {
  Bounds,
  Point,
} from './engine/types';
import Engine from './engine/engine';
import Pawn from './entity/Pawn';
import { toRadians, randomInt } from './engine/util';

let engine: Engine;
let pawn: Pawn;

const init = () => {
  pawn = new Pawn(new Bounds(400, 100, 15, 15), 'red', {
    speed: 0,
    acceleration: 1,
    drag: 0.3,
    maxSpeed: 5,
  });
  
  pawn.setTargetLocation(new Point(randomInt(engine.width), randomInt(engine.height)));
  
  setInterval(() => {
    pawn.setTargetLocation(new Point(randomInt(engine.width), randomInt(engine.height)));
  }, 3000);
};

const update = () => {
  pawn.update();
};

const draw = (ctx: any) => {
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
