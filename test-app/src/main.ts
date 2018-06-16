import {
  Bounds, Point
} from './engine/types';
import * as Graphics from './engine/graphics';
import Engine from './engine/engine';
import PlayerBox from './entity/PlayerBox';
import StaticBox from './entity/StaticBox';

const GAME_NAME: string = 'js-engine test';
const CANVAS_ID: string = 'canvas_engine';

let engine: Engine, player: PlayerBox, ground: StaticBox;

(() => {
  console.log(`${GAME_NAME} start`);

  engine = new Engine(CANVAS_ID, {
    init: () => {
      player = new PlayerBox(new Bounds(200, 500, 100, 100), 'red');
      ground = new StaticBox(new Bounds(0, 800, engine.width, engine.height), 'gray');
    },
    update: () => {
      player.update();
    },
    draw: (ctx: any) => {
      player.draw(ctx);
      ground.draw(ctx);
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
