import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { drawArrowOfLength } from "../utils/arrows";
import { green, ink20, ink80, red } from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { SatelliteAnimationOptions } from "./satellite-animation-options";

const width = 250;
const height = 250;

const planetRadius = 75;
const orbitRadius = 100;
const netForceLength = 80;
const velocityLength = 60;
const vectorThickness = 2;

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
    metrics: CanvasMetrics,
    options: AnimationOptionValues<SatelliteAnimationOptions>,
  ): void {
    const showNetForce = options.requireBoolean(
      SatelliteAnimationOptions.netForce,
    );
    const showVelocity = options.requireBoolean(
      SatelliteAnimationOptions.velocity,
    );

    ctx.save();
    centerFrame(ctx, metrics, width, height);
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

    if (showNetForce) {
      drawArrowOfLength(
        ctx,
        0,
        0,
        Math.PI / 2,
        netForceLength,
        vectorThickness,
        netForceColor,
      );
    }

    if (showVelocity) {
      drawArrowOfLength(
        ctx,
        0,
        0,
        0,
        velocityLength,
        vectorThickness,
        velocityColor,
      );
    }

    ctx.restore();
  }
}
