import { background, ink20, ink80 } from "../utils/colors";

const trackColor = ink20;
const carColor = ink80;
const a = Math.atan2(11, 50);
const b = Math.sqrt(50 * 50 + 11 * 11);

export const drawCar = car();

export type Graphic = (ctx: CanvasRenderingContext2D) => void;

export function bankedTrack(angle: number, scale: number): Graphic {
  // Points for banked track triangle.
  const x1 = b * Math.cos(a - angle);
  const y1 = b * Math.sin(a - angle);
  const x2 = -b * Math.cos(-a - angle);
  const y2 = -b * Math.sin(-a - angle);

  return (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.scale(scale, scale);

    // Render a car at the specified angle.
    ctx.save();
    ctx.rotate(-angle);
    drawCar(ctx);
    ctx.restore();

    // Render banked track triangle.
    ctx.fillStyle = trackColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x1, y2);
    ctx.fill();

    ctx.restore();
  };
}

export function car(): Graphic {
  return (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = carColor;
    ctx.beginPath();
    ctx.rect(-15, -3, 30, 10);
    ctx.rect(-10, -11, 20, 10);
    ctx.rect(-12, 7, 3, 4);
    ctx.rect(9, 7, 3, 4);
    ctx.fill();

    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.ellipse(-10, 2, 3, 3, 0, 0, Math.PI * 2);
    ctx.ellipse(10, 2, 3, 3, 0, 0, Math.PI * 2);
    ctx.fill();
  };
}
