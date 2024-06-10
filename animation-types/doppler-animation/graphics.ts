import { ink80 } from "../utils/colors";
import { PositionFunction } from "./functions";

export type Graphic = {
  position: PositionFunction;
  size: number;
  render: (ctx: CanvasRenderingContext2D) => void;
};

const personColor = ink80;

export function person(position: PositionFunction, size: number): Graphic {
  return {
    position,
    size,
    render: (ctx: CanvasRenderingContext2D) => {
      ctx.strokeStyle = personColor;
      ctx.lineWidth = 2;

      // Head
      ctx.beginPath();
      ctx.ellipse(0, -7, 4, 4, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Torso.
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(0, 2);
      ctx.stroke();

      // Arms.
      ctx.beginPath();
      ctx.moveTo(-9, -1);
      ctx.lineTo(9, -1);
      ctx.stroke();

      // Legs.
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.lineTo(-5, 12);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.lineTo(5, 12);
      ctx.stroke();
    },
  };
}
