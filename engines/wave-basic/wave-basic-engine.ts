import { AnimationEngine } from "../animation-engine";
import { OptionValues } from "../animation-options";
import { WaveFunction, pulse } from "./functions";
import { WaveBasicOptions } from "./wave-basic-options";

const subwaveColors = ["#ff0000a0", "#00ff00a0"];
const subwaveOffset = 2;

export class WaveBasicEngine extends AnimationEngine {
  constructor(
    readonly waves: WaveFunction[],
    readonly duration: number,
    readonly looping: boolean
  ) {
    super(new WaveBasicOptions());
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    width: number,
    height: number,
    optionValues: OptionValues
  ): void {
    ctx.save();
    ctx.translate(0, height * 0.5);

    if (optionValues["components"]) {
      this.waves.forEach((wave, i) => {
        const color = subwaveColors[i % subwaveColors.length];
        drawWave(
          ctx,
          wave,
          time,
          color,
          2,
          "none",
          i * subwaveOffset - (this.waves.length * subwaveOffset) / 2,
          100,
          width
        );
      });
    }

    const superposition: WaveFunction = (x, t) => {
      let y = 0;
      for (let wave of this.waves) {
        y += wave(x, t);
      }
      return y;
    };

    if (optionValues["superposition"]) {
      drawWave(ctx, superposition, time, `#ffffff`, 2, "open", 0, 100, width);
    }

    if (optionValues["particles"]) {
      const longitudinal = optionValues["longitudinal"] as boolean;
      drawParticles(
        ctx,
        superposition,
        time,
        `#ffffff`,
        5,
        20,
        width,
        longitudinal
      );
    }

    ctx.restore();
  }

  getDuration(): number {
    return this.duration;
  }

  isLooping(): boolean {
    return this.looping;
  }
}

function drawWave(
  ctx: CanvasRenderingContext2D,
  wave: WaveFunction,
  time: number,
  style: string,
  thickness: number,
  end: "open" | "fixed" | "none",
  offset: number,
  segments: number,
  width: number
) {
  ctx.strokeStyle = style;
  ctx.lineWidth = thickness;
  ctx.beginPath();

  for (let i = 0; i < segments; i++) {
    const percentage = i / (segments - 1);
    const x = percentage * width;
    const y = wave(percentage, time) + offset;

    if (i == 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    // If this is the end of the line, draw the open or fixed endpoint.
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

function drawParticles(
  ctx: CanvasRenderingContext2D,
  wave: WaveFunction,
  time: number,
  style: string,
  size: number,
  particles: number,
  width: number,
  showLongitudinal: boolean
) {
  ctx.fillStyle = style;
  for (let i = 0; i < particles; i++) {
    const percentage = i / (particles - 1);
    let x = percentage * width;
    let y = 0;

    if (!showLongitudinal) {
      y += wave(percentage, time);
    } else {
      x += wave(percentage, time) * 0.75;
    }

    ctx.beginPath();
    ctx.ellipse(x, y, size, size, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}
