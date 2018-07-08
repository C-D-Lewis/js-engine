import { Point } from './types';

export const drawText = (ctx: any, msg: string, color: string, pos: Point) => {
  ctx.font = '20px Arial';
  ctx.fillStyle = color;
  ctx.fillText(msg, pos.x, pos.y);
};

export const drawLine = (ctx: any, from: Point, to: Point) => {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
};
