import Engine from './engine/engine';
import Box from './entity/box';

const GAME_NAME: string = 'js-engine test';
const CANVAS_ID: string = 'canvas_engine';

let engine: Engine, box: Box;

const boxes: Box[] = [];

const randomInt = (min: number, max: number): number => Math.round(Math.random() * (max - min)) + min;

const addBox = (): void => {
  const size = randomInt(10, 200);
  const color = `rgb(${randomInt(10, 230)},${randomInt(10, 230)},${randomInt(10, 230)})`;
  const speed = randomInt(2, 10);
  boxes.push(new Box(engine, [0, 0, size, size], color, speed));
};

(() => {
  console.log(`${GAME_NAME} start`);

  engine = new Engine(CANVAS_ID, {
    update: (): void => boxes.forEach(item => item.update()),
    draw: (ctx: any) => boxes.forEach(item => item.draw(ctx)),
    mouseMove: (): void => {},
    mouseClick: (): void => {},
    keyDown: addBox,
    keyUp: addBox
  });

  for (let i = 0; i < 10; i += 1) addBox();

  engine.begin();
})();
