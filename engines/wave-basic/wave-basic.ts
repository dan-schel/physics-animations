import { AnimationEngine } from "../animation-engine";
import { WaveFunction, pulse } from "./functions";

export class WaveBasicEngine extends AnimationEngine {
  constructor(readonly waves: WaveFunction[]) {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    width: number,
    height: number
  ): void {
    ctx.save();
    ctx.translate(0, height * 0.5);

    const superposition: WaveFunction = (x, t) => {
      let y = 0;
      for (let wave of this.waves) {
        y += wave(x, t);
      }
      return y;
    };

    drawWave(ctx, superposition, time, `#ffffff`, 2, "open", 0, 100, width);
    ctx.restore();
  }
}

function drawWave(
  ctx: CanvasRenderingContext2D,
  wave: WaveFunction,
  time: number,
  style: string,
  thickness: number,
  end: "open" | "fixed",
  offset: number,
  segments: number,
  width: number
) {
  ctx.strokeStyle = style;
  ctx.lineWidth = thickness;
  ctx.beginPath();
  for (let i = 0; i < segments; i++) {
    let x = (i / (segments - 1)) * width;
    let y = wave(i / segments, time) + offset;
    if (i == 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    if (i == segments - 1) {
      ctx.stroke();

      if (end == "open") {
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (end == "fixed") {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function drawWaveParticles(
  ctx: CanvasRenderingContext2D,
  wave: WaveFunction,
  time: number,
  style: string,
  size: number,
  segments: number,
  segmentWidth: number,
  particleEvery: number,
  showLongitudinal: boolean
) {
  ctx.fillStyle = style;
  for (let i = 0; i < segments; i += particleEvery) {
    let x = i * segmentWidth - segments * 0.5 * segmentWidth;
    let y = 0;

    if (!showLongitudinal) {
      y += wave(i / segments, time);
    } else {
      x += wave(i / segments, time) * 0.75;
    }

    ctx.beginPath();
    ctx.ellipse(x, y, size, size, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}
