import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer } from "../animation-renderer";
import { drawArrowOfLength } from "../utils/arrows";
import { green, ink20, ink80, red } from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { SatelliteAnimationOptions } from "./satellite-animation";

const width = 300;
const height = 300;
const planetRadius = 75;
const orbitRadius = 100;
const planetColor = ink20;
const satelliteColor = ink80;
const netForceColor = red;
const velocityColor = green;

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

    drawArrowOfLength(ctx, 0, 0, Math.PI / 2, 80, 2, netForceColor);
    drawArrowOfLength(ctx, 0, 0, 0, 60, 2, velocityColor);

    ctx.restore();
  }
}
