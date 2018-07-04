import {
  Bounds, Point
} from './engine/types';
import * as Graphics from './engine/graphics';
import Engine from './engine/engine';
import BouncingBox from './entity/BouncingBox';

const GAME_NAME: string = 'js-engine test';
const CANVAS_ID: string = 'canvas_engine';

let engine: Engine;
let bouncingBox: BouncingBox;

(() => {
  console.log(`${GAME_NAME} start`);

  engine = new Engine(CANVAS_ID, {
    init: () => {
      bouncingBox = new BouncingBox(engine, new Bounds(0, 0, 100, 100), 'blue', 10);
    },
    update: () => {
      bouncingBox.update();
    },
    draw: (ctx: any) => {
      bouncingBox.draw(ctx);
    },
    mouseMove: () => {},
    mouseClick: () => {},
    keyDown: () => {

    },
    keyUp: () => {

    }
  }, {
    debug: true
  });

  engine.begin();
})();
