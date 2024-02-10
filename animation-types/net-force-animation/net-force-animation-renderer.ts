import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { drawArrow, drawArrowOfLength } from "../utils/arrows";
import { ink20, red } from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { Force, ForcesFunction } from "./functions";
import { Graphic } from "./graphics";
import { NetForceAnimationOptions } from "./net-force-animation";

const width = 200;
const height = 150;
const netForceColor = red;
const arrowThickness = 1.25;

const leftBox = defineBox(0, 0, 120, height);
const rightBox = defineBox(125, 0, 75, height);

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
    readonly graphicOffset: { x: number; y: number } = { x: 0, y: 0 },
    readonly forceDiagramOffset: { x: number; y: number } = { x: 0, y: 0 },
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

    drawLeftPanel(
      ctx,
      this.graphicRenderer,
      forces,
      showNetForce,
      leftBox,
      this.graphicOffset,
    );
    drawRightPanel(
      ctx,
      forces,
      showNetForce,
      rightBox,
      this.forceDiagramOffset,
    );

    ctx.restore();
  }
}

function drawLeftPanel(
  ctx: CanvasRenderingContext2D,
  graphicRenderer: Graphic,
  forces: Force[],
  showNetForce: boolean,
  box: Box,
  offset: { x: number; y: number },
) {
  drawBox(ctx, box);

  ctx.save();
  ctx.translate(box.centerX + offset.x, box.centerY + offset.y);
  graphicRenderer(ctx);
  forces.forEach((force) => {
    drawArrowOfLength(
      ctx,
      0,
      0,
      force.angle,
      force.magnitude,
      arrowThickness,
      force.color,
    );
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
    drawArrow(ctx, 0, 0, netX, netY, arrowThickness, netForceColor);
  }
  ctx.restore();
}

function drawRightPanel(
  ctx: CanvasRenderingContext2D,
  forces: Force[],
  showNetForce: boolean,
  box: Box,
  offset: { x: number; y: number },
) {
  drawBox(ctx, box);

  ctx.save();
  ctx.translate(box.centerX + offset.x, box.centerY + offset.y);
  let fromX = 0;
  let fromY = 0;
  forces.forEach((force) => {
    const toX = fromX + Math.cos(force.angle) * force.magnitude;
    const toY = fromY + Math.sin(force.angle) * force.magnitude;
    drawArrow(ctx, fromX, fromY, toX, toY, arrowThickness, force.color);
    fromX = toX;
    fromY = toY;
  });
  if (showNetForce) {
    drawArrow(ctx, 0, 0, fromX, fromY, arrowThickness, netForceColor);
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
