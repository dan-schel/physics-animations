import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { ink60, ink80 } from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { PositionFunction } from "./functions";
import { Graphic } from "./graphics";

const width = 300;
const height = 200;

const sourceColor = ink80;
const sourceRadius = 5;

const waveColor = ink60;
const waveCount = 50;
const waveAge = 1.5;
const waveRadius = 100;

export class DopplerAnimationRenderer extends AnimationRenderer {
  constructor(
    readonly duration: number,
    readonly sourcePositionFunction: PositionFunction,
    readonly graphics: Graphic[],
  ) {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    metrics: CanvasMetrics,
    _options: AnimationOptionValues,
  ): void {
    ctx.save();
    centerFrame(ctx, metrics, width, height);
    ctx.translate(width / 2, height / 2);

    const wavesPerSecond = waveCount / this.duration;
    const extraWaves = Math.ceil(waveAge * wavesPerSecond);
    for (let i = -extraWaves; i < waveCount; i++) {
      this._drawWave(ctx, (i / waveCount) * this.duration, time);
    }

    const { x, y } = this.sourcePositionFunction(time);
    ctx.fillStyle = sourceColor;
    ctx.beginPath();
    ctx.ellipse(x, y, sourceRadius, sourceRadius, 0, 0, Math.PI * 2);
    ctx.fill();

    this.graphics.forEach((graphic) => {
      const { x, y } = graphic.position(time);
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(graphic.size, graphic.size);
      graphic.render(ctx);
      ctx.restore();
    });

    ctx.restore();
  }

  private _drawWave(
    ctx: CanvasRenderingContext2D,
    originTime: number,
    time: number,
  ) {
    const age = (time - originTime) / waveAge;
    if (age < 0 || age > 1) {
      return;
    }

    const { x, y } = this.sourcePositionFunction(originTime);
    const radius = sourceRadius + (waveRadius - sourceRadius) * age;

    ctx.strokeStyle = waveColor;
    ctx.lineWidth = 2;
    ctx.globalAlpha = this._waveOpacity(age);
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  private _waveOpacity(age: number) {
    return 1 - age ** 2;
  }
}
