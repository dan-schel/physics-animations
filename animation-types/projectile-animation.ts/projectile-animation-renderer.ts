import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { background, ink20, ink40, ink80 } from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { ProjectileMotionValues, cannonMouth, cannonRecoil } from "./functions";
import { ProjectileAnimationOptions } from "./projectile-animation";

const width = 300;
const height = 150;
const offsetX = -120;
const offsetY = -50;

const surfaceColor = ink20;
const surfaceOffset = -8;
const surfaceThickness = 4;

const cannonColor = ink40;
const cannonRecoilDuration = 0.15;
const cannonRecoilSize = 4;
const cannonMouthX = 10;
const cannonMouthY = -5;

const ballColor = ink80;
const ballRadius = 2;

export class ProjectileAnimationRenderer extends AnimationRenderer<ProjectileAnimationOptions> {
  constructor(readonly motion: ProjectileMotionValues) {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    metrics: CanvasMetrics,
    _options: AnimationOptionValues<ProjectileAnimationOptions>,
  ): void {
    // const showVelocity = options.requireBoolean(
    //   ProjectileAnimationOptions.velocity,
    // );

    ctx.save();
    centerFrame(ctx, metrics, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.translate(offsetX, -offsetY);

    const mouth = cannonMouth(cannonMouthX, cannonMouthY, -this.motion.angle);
    const ballX = this.motion.positionX(time) + mouth.x;
    const ballY = -this.motion.positionY(time) + mouth.y;
    if (ballY < -surfaceOffset) {
      ctx.fillStyle = ballColor;
      ctx.beginPath();
      ctx.ellipse(ballX, ballY, ballRadius, ballRadius, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    this._renderCannon(ctx, time);

    ctx.strokeStyle = surfaceColor;
    ctx.lineWidth = surfaceThickness;
    ctx.beginPath();
    ctx.moveTo(-width / 2 - offsetX, -surfaceOffset);
    ctx.lineTo(width / 2 - offsetX, -surfaceOffset);
    ctx.stroke();

    ctx.restore();
  }

  private _renderCannon(ctx: CanvasRenderingContext2D, time: number) {
    ctx.save();
    ctx.rotate(-this.motion.angle);

    ctx.fillStyle = cannonColor;
    ctx.beginPath();
    ctx.rect(
      -8 - cannonRecoil(time, cannonRecoilDuration, cannonRecoilSize),
      -9,
      22,
      8,
    );
    ctx.fill();

    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = cannonColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 6, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
