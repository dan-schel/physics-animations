import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer } from "../animation-renderer";
import { drawArrowOfLength } from "../utils/arrows";
import { centerFrame } from "../utils/framing";
import { ForcesFunction } from "./functions";
import { Graphic } from "./graphics";
import { NetForceAnimationOptions } from "./net-force-animation";

const width = 300;
const height = 150;

export class NetForceAnimationRenderer extends AnimationRenderer<NetForceAnimationOptions> {
  constructor(
    readonly forceProvider: ForcesFunction,
    readonly graphicRenderer: Graphic,
  ) {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    canvasWidth: number,
    canvasHeight: number,
    _options: AnimationOptionValues<NetForceAnimationOptions>,
  ): void {
    const forces = this.forceProvider(time);

    ctx.save();
    centerFrame(ctx, canvasWidth, canvasHeight, width, height);

    // Draw the left panel showing the force diagram on the object.
    ctx.save();
    ctx.translate(width * 0.25, height * 0.5);
    this.graphicRenderer(ctx);
    forces.forEach((force) => {
      drawArrowOfLength(
        ctx,
        0,
        0,
        force.angle,
        force.magnitude,
        2,
        force.color,
      );
    });
    ctx.restore();

    ctx.restore();
  }
}
