import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer } from "../animation-renderer";
import { drawArrow, drawArrowOfLength } from "../utils/arrows";
import { red } from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { Force, ForcesFunction } from "./functions";
import { Graphic } from "./graphics";
import { NetForceAnimationOptions } from "./net-force-animation";

const width = 300;
const height = 150;
const netForceColor = red;

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
    options: AnimationOptionValues<NetForceAnimationOptions>,
  ): void {
    const forces = this.forceProvider(time);
    const showNetForce = options.requireBoolean(
      NetForceAnimationOptions.netForce,
    );

    ctx.save();
    centerFrame(ctx, canvasWidth, canvasHeight, width, height);
    drawLeftPanel(ctx, this.graphicRenderer, forces, showNetForce);
    drawRightPanel(ctx, forces, showNetForce);
    ctx.restore();
  }
}

function drawLeftPanel(
  ctx: CanvasRenderingContext2D,
  graphicRenderer: Graphic,
  forces: Force[],
  showNetForce: boolean,
) {
  ctx.save();
  ctx.translate(width * 0.25, height * 0.5);
  graphicRenderer(ctx);
  forces.forEach((force) => {
    drawArrowOfLength(ctx, 0, 0, force.angle, force.magnitude, 2, force.color);
  });
  if (showNetForce) {
    const { x: netX, y: netY } = forces.reduce(
      (sum, f) => {
        return {
          x: sum.x + Math.cos(f.angle) * f.magnitude,
          y: sum.y + Math.sin(f.angle) * f.magnitude,
        };
      },
      { x: 0, y: 0 },
    );
    drawArrow(ctx, 0, 0, netX, netY, 2, netForceColor);
  }
  ctx.restore();
}

function drawRightPanel(
  ctx: CanvasRenderingContext2D,
  forces: Force[],
  showNetForce: boolean,
) {
  ctx.save();
  ctx.translate(width * 0.75, height * 0.5);
  let fromX = 0;
  let fromY = 0;
  forces.forEach((force) => {
    const toX = fromX + Math.cos(force.angle) * force.magnitude;
    const toY = fromY + Math.sin(force.angle) * force.magnitude;
    drawArrow(ctx, fromX, fromY, toX, toY, 2, force.color);
    fromX = toX;
    fromY = toY;
  });
  if (showNetForce) {
    drawArrow(ctx, 0, 0, fromX, fromY, 2, netForceColor);
  }
  ctx.restore();
}
