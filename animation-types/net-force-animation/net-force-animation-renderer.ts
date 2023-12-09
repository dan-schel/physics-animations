import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { drawArrow, drawArrowOfLength } from "../utils/arrows";
import { ink20, ink50, red } from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { Force, ForcesFunction } from "./functions";
import { Graphic } from "./graphics";
import { NetForceAnimationOptions } from "./net-force-animation";

const width = 250;
const height = 200;
const netForceColor = red;

const boxGap = 5;

type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
};

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
    metrics: CanvasMetrics,
    options: AnimationOptionValues<NetForceAnimationOptions>,
  ): void {
    const forces = this.forceProvider(time);
    const showNetForce = options.requireBoolean(
      NetForceAnimationOptions.netForce,
    );

    ctx.save();
    centerFrame(ctx, metrics, width, height);

    const boxWidth = (width - boxGap) / 2;
    const leftBox = defineBox(0, 0, boxWidth, height);
    const rightBox = defineBox(width - boxWidth, 0, boxWidth, height);

    drawLeftPanel(ctx, this.graphicRenderer, forces, showNetForce, leftBox);
    drawRightPanel(ctx, forces, showNetForce, rightBox);
    ctx.restore();
  }
}

function drawLeftPanel(
  ctx: CanvasRenderingContext2D,
  graphicRenderer: Graphic,
  forces: Force[],
  showNetForce: boolean,
  box: Box,
) {
  drawBox(ctx, box);

  ctx.save();
  ctx.translate(box.centerX, box.centerY);
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
  box: Box,
) {
  drawBox(ctx, box);

  ctx.save();
  ctx.translate(box.centerX, box.centerY);
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

function defineBox(x: number, y: number, width: number, height: number): Box {
  return {
    x,
    y,
    width,
    height,
    centerX: x + width * 0.5,
    centerY: y + height * 0.5,
  };
}

function drawBox(ctx: CanvasRenderingContext2D, box: Box) {
  ctx.strokeStyle = ink20;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(box.x + 0.5, box.y + 0.5, box.width - 1, box.height - 1, 5);
  ctx.stroke();
}
