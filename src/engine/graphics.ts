import { Point } from './types';

export const drawText = (ctx: any, message: string, color: string, position: Point) => {
  ctx.font = '20px Arial';
  ctx.fillStyle = color;
  ctx.fillText(message, position.x, position.y);
};

export const drawLine = (ctx: any, from: Point, to: Point) => {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
};
