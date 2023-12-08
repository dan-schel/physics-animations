import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, centerFrame } from "../animation-renderer";
import { SatelliteAnimationOptions } from "./satellite-animation";

const width = 300;
const height = 300;
const planetRadius = 75;
const orbitRadius = 100;
const planetColor = "#ffffff20";
const satelliteColor = "#ffffffa0";

export class SatelliteAnimationRenderer extends AnimationRenderer<SatelliteAnimationOptions> {
  constructor(readonly orbitalPeriod: number) {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    canvasWidth: number,
    canvasHeight: number,
    options: AnimationOptionValues<SatelliteAnimationOptions>,
  ): void {
    ctx.save();
    centerFrame(ctx, canvasWidth, canvasHeight, width, height);
    ctx.translate(width / 2, height / 2);

    ctx.fillStyle = planetColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, planetRadius, planetRadius, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(Math.PI * -0.5);
    ctx.rotate((time / this.orbitalPeriod) * Math.PI * 2);
    ctx.translate(orbitRadius, 0);
    ctx.rotate(Math.PI * 0.5);

    ctx.fillStyle = satelliteColor;
    ctx.beginPath();
    ctx.rect(-16, -3, 10, 6);
    ctx.rect(6, -3, 10, 6);
    ctx.rect(-6, -1, 12, 2);
    ctx.rect(-3, -5, 6, 10);
    ctx.fill();

    drawArrowOfLength(ctx, 0, 0, Math.PI / 2, 80, 2, "#ff0000");

    ctx.restore();
  }
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  thickness: number,
  color: string,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  drawArrowOfLength(ctx, x1, y1, angle, length, thickness, color);
}
function drawArrowOfLength(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  thickness: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const headLength = Math.min(thickness * 4, length * 0.75);
  const headWidth = thickness * 4;

  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.fillStyle = color;

  // Multiply by 0.75 to avoid a tiny gap between the arrow head and the line.
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(length - headLength * 0.75, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(length, 0);
  ctx.lineTo(length - headLength, headWidth * -0.5);
  ctx.lineTo(length - headLength, headWidth * 0.5);
  ctx.fill();

  ctx.restore();
}
