import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
// import { ink20, ink80 } from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { RefractionAnimationOptions } from "./refraction-animation";

const width = 250;
const height = 250;

// const planetRadius = 75;
// const orbitRadius = 100;

// const planetColor = ink20;
// const satelliteColor = ink80;

export class RefractionAnimationRenderer extends AnimationRenderer<RefractionAnimationOptions> {
  constructor() {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    metrics: CanvasMetrics,
    _options: AnimationOptionValues<RefractionAnimationOptions>,
  ): void {
    ctx.save();
    centerFrame(ctx, metrics, width, height);
    ctx.translate(width / 2, height / 2);

    // ctx.fillStyle = planetColor;
    // ctx.beginPath();
    // ctx.ellipse(0, 0, planetRadius, planetRadius, 0, 0, Math.PI * 2);
    // ctx.fill();

    // ctx.rotate(Math.PI * -0.5);
    // ctx.rotate((time / this.orbitalPeriod) * Math.PI * 2);
    // ctx.translate(orbitRadius, 0);
    // ctx.rotate(Math.PI * 0.5);

    // ctx.fillStyle = satelliteColor;
    // ctx.beginPath();
    // ctx.rect(-16, -3, 10, 6);
    // ctx.rect(6, -3, 10, 6);
    // ctx.rect(-6, -1, 12, 2);
    // ctx.rect(-3, -5, 6, 10);
    // ctx.fill();

    ctx.restore();
  }
}
