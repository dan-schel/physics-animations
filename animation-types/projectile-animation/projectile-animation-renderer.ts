import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { drawArrow } from "../utils/arrows";
import {
  accent,
  background,
  darkBlue,
  green,
  ink20,
  ink60,
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
const surfaceMargins = 5;

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

const axisColor = ink60;
const axisThickness = 2;
const traceColor = ink20;
const traceThickness = 1;
const markerColor = accent;
const markerRadius = 4;

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

    this._renderDimensions(ctx, options, ballX, ballY, ballIsAirborne);

    // Render the ball.
    if (ballIsAirborne) {
      ctx.fillStyle = ballColor;
      ctx.beginPath();
      ctx.ellipse(ballX, ballY, ballRadius, ballRadius, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    this._renderCannon(ctx, time);

    // Render the ground.
    ctx.strokeStyle = surfaceColor;
    ctx.lineWidth = surfaceThickness;
    ctx.beginPath();
    ctx.moveTo(-width / 2 - offsetX + surfaceMargins, -surfaceOffset);
    ctx.lineTo(width / 2 - offsetX - surfaceMargins, -surfaceOffset);
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
      const x2 = ballX + this.motion.velocityX(time) * velocityScaling;
      const y2 = ballY - this.motion.velocityY(time) * velocityScaling;
      drawArrow(ctx, ballX, ballY, x2, ballY, arrowThickness, velocityXColor);
      drawArrow(ctx, ballX, ballY, ballX, y2, arrowThickness, velocityYColor);
    }
    if (showVelocity) {
      const x2 = ballX + this.motion.velocityX(time) * velocityScaling;
      const y2 = ballY - this.motion.velocityY(time) * velocityScaling;
      drawArrow(ctx, ballX, ballY, x2, y2, arrowThickness, totalVelocityColor);
    }
    if (showNetForce) {
      const x2 = ballX + this.motion.accelerationX(time) * accelerationScaling;
      const y2 = ballY - this.motion.accelerationY(time) * accelerationScaling;
      drawArrow(ctx, ballX, ballY, x2, y2, arrowThickness, netForceColor);
    }
  }

  private _renderDimensions(
    ctx: CanvasRenderingContext2D,
    options: AnimationOptionValues<ProjectileAnimationOptions>,
    ballX: number,
    ballY: number,
    ballIsAirborne: boolean,
  ) {
    const showDimensions = options.requireBoolean(
      ProjectileAnimationOptions.dimensions,
    );
    if (!showDimensions) {
      return;
    }

    const left = -width / 2 - offsetX;
    const centerX = -offsetX;
    const right = width / 2 - offsetX;
    const top = -height / 2 + offsetY;
    const centerY = offsetY;
    const bottom = height / 2 + offsetY;

    if (ballIsAirborne) {
      ctx.strokeStyle = traceColor;
      ctx.lineWidth = traceThickness;
      ctx.beginPath();
      ctx.moveTo(left, ballY);
      ctx.lineTo(right, ballY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ballX, top);
      ctx.lineTo(ballX, bottom);
      ctx.stroke();
    }

    drawArrow(ctx, centerX, bottom, left, bottom, axisThickness, axisColor);
    drawArrow(ctx, centerX, bottom, right, bottom, axisThickness, axisColor);
    drawArrow(ctx, left, centerY, left, top, axisThickness, axisColor);
    drawArrow(ctx, left, centerY, left, bottom, axisThickness, axisColor);

    if (ballIsAirborne) {
      ctx.fillStyle = markerColor;
      ctx.beginPath();
      ctx.ellipse(ballX, bottom, markerRadius, markerRadius, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(left, ballY, markerRadius, markerRadius, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
