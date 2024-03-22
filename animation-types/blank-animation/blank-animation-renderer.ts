import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { centerFrame } from "../utils/framing";

const width = 250;
const height = 200;

export class BlankAnimationRenderer extends AnimationRenderer {
  constructor() {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    _time: number,
    metrics: CanvasMetrics,
    _options: AnimationOptionValues,
  ): void {
    ctx.save();

    // Remove this variable (add only pass 4 arguments to centerFrame) for
    // proper animations!
    const isDebugMode = true;
    centerFrame(ctx, metrics, width, height, isDebugMode);

    ctx.restore();
  }
}
