import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { drawArrow } from "../utils/arrows";
import {
  background,
  darkBlue,
  green,
  ink20,
  ink80,
  red,
  teal,
} from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { ProjectileMotionValues, cannonMouth, cannonRecoil } from "./functions";
import { ProjectileAnimationOptions } from "./projectile-animation-options";

const width = 300;
const height = 200;
const offsetX = -125;
const offsetY = -70;

const surfaceColor = ink20;
const surfaceOffset = -9;
const surfaceThickness = 6;

const cannonColor = ink80;
const cannonRecoilDuration = 0.2;
const cannonRecoilSize = 4;
const cannonMouthX = 10;
const cannonMouthY = -5;

const ballColor = ink80;
const ballRadius = 3;

const totalVelocityColor = teal;
const velocityXColor = darkBlue;
const velocityYColor = green;
const netForceColor = red;
const arrowThickness = 2;
const velocityScaling = 0.5;
const accelerationScaling = 0.5;

export class ProjectileAnimationRenderer extends AnimationRenderer<ProjectileAnimationOptions> {
  constructor(readonly motion: ProjectileMotionValues) {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    metrics: CanvasMetrics,
    options: AnimationOptionValues<ProjectileAnimationOptions>,
  ): void {
    ctx.save();
    centerFrame(ctx, metrics, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.translate(offsetX, -offsetY);

    const mouth = cannonMouth(cannonMouthX, cannonMouthY, -this.motion.angle);
    const ballX = this.motion.positionX(time) + mouth.x;
    const ballY = -this.motion.positionY(time) + mouth.y;
    const ballIsAirborne = ballY < -surfaceOffset;
    if (ballIsAirborne) {
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

    if (ballIsAirborne) {
      this._renderArrows(ctx, time, options, ballX, ballY);
    }

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

  private _renderArrows(
    ctx: CanvasRenderingContext2D,
    time: number,
    options: AnimationOptionValues<ProjectileAnimationOptions>,
    ballX: number,
    ballY: number,
  ) {
    const showVelocity = options.requireBoolean(
      ProjectileAnimationOptions.velocity,
    );
    const showVelocityComponents = options.requireBoolean(
      ProjectileAnimationOptions.velocityComponents,
    );
    const showNetForce = options.requireBoolean(
      ProjectileAnimationOptions.netForce,
    );

    if (showVelocityComponents) {
      ctx.strokeStyle = totalVelocityColor;
      ctx.lineWidth = arrowThickness;
      const x2 = ballX + this.motion.velocityX(time) * velocityScaling;
      const y2 = ballY - this.motion.velocityY(time) * velocityScaling;
      drawArrow(ctx, ballX, ballY, x2, ballY, arrowThickness, velocityXColor);
      drawArrow(ctx, ballX, ballY, ballX, y2, arrowThickness, velocityYColor);
    }
    if (showVelocity) {
      ctx.strokeStyle = totalVelocityColor;
      ctx.lineWidth = arrowThickness;
      const x2 = ballX + this.motion.velocityX(time) * velocityScaling;
      const y2 = ballY - this.motion.velocityY(time) * velocityScaling;
      drawArrow(ctx, ballX, ballY, x2, y2, arrowThickness, totalVelocityColor);
    }
    if (showNetForce) {
      ctx.strokeStyle = totalVelocityColor;
      ctx.lineWidth = arrowThickness;
      const x2 = ballX + this.motion.accelerationX(time) * accelerationScaling;
      const y2 = ballY - this.motion.accelerationY(time) * accelerationScaling;
      drawArrow(ctx, ballX, ballY, x2, y2, arrowThickness, netForceColor);
    }
  }
}
