import { Point } from './types';

export const drawText = (ctx: any, msg: string, color: string, pos: Point) => {
  ctx.font = '20px Arial';
  ctx.fillStyle = color;
  ctx.fillText(msg, pos.x, pos.y);
};
