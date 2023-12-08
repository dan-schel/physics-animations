import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, centerFrame } from "../animation-renderer";
import { SatelliteAnimationOptions } from "./satellite-animation";

const width = 400;
const height = 400;

export class SatelliteAnimationRenderer extends AnimationRenderer<SatelliteAnimationOptions> {
  constructor() {
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
    ctx.translate(0, height / 2);

    ctx.restore();
  }
}
