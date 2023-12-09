import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { ink20 } from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { BlankAnimationOptions } from "./blank-animation";

const width = 250;
const height = 200;

export class BlankAnimationRenderer extends AnimationRenderer<BlankAnimationOptions> {
  constructor() {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    metrics: CanvasMetrics,
    _options: AnimationOptionValues<BlankAnimationOptions>,
  ): void {
    ctx.save();
    centerFrame(ctx, metrics, width, height);

    ctx.fillStyle = ink20;
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.restore();
  }
}
