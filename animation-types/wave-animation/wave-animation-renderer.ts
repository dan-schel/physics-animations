import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, centerFrame } from "../animation-renderer";
import { WaveFunction } from "./functions";
import { WaveAnimationOptions } from "./wave-animation";

const width = 500;
const height = 250;
const horizontalPadding = 30;
const effectiveWidth = width - horizontalPadding * 2;

const waveResolution = 100;
const particleCount = 21;

const superpositionColor = "#ffffffa0";
const waveThickness = 2;
const particleColor = "#ffffff";
const subwaveColors = ["#ff0000a0", "#00ff00a0"];
const subwaveOffset = 2;

export class WaveAnimationRenderer extends AnimationRenderer<WaveAnimationOptions> {
  constructor(readonly waves: WaveFunction[]) {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    canvasWidth: number,
    canvasHeight: number,
    options: AnimationOptionValues<WaveAnimationOptions>
  ): void {
    const showSuperposition = options.requireBoolean(
      WaveAnimationOptions.superposition
    );
    const showComponents = options.requireBoolean(
      WaveAnimationOptions.components
    );
    const showParticles = options.requireBoolean(
      WaveAnimationOptions.particles
    );
    const showAsLongitudinal = options.requireBoolean(
      WaveAnimationOptions.longitudinal
    );

    ctx.save();
    centerFrame(ctx, canvasWidth, canvasHeight, width, height);
    ctx.translate(0, height / 2);

    if (showComponents) {
      this.waves.forEach((wave, i) => {
        const color = subwaveColors[i % subwaveColors.length];
        const offset =
          i * subwaveOffset - (this.waves.length * subwaveOffset) / 2;
        drawWave(ctx, wave, time, color, "none", "none", offset);
      });
    }

    const superposition: WaveFunction = (x, t) => {
      let y = 0;
      for (let wave of this.waves) {
        y += wave(x, t);
      }
      return y;
    };

    if (showSuperposition) {
      drawWave(ctx, superposition, time, superpositionColor, "free", "free", 0);
    }

    if (showParticles) {
      drawParticles(
        ctx,
        superposition,
        time,
        particleColor,
        5,
        showAsLongitudinal,
        true,
        true
      );
    }

    ctx.restore();
  }
}

function drawWave(
  ctx: CanvasRenderingContext2D,
  wave: WaveFunction,
  time: number,
  color: string,
  leftEnd: "fixed" | "free" | "none",
  rightEnd: "fixed" | "free" | "none",
  offset: number
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = waveThickness;
  ctx.beginPath();

  for (let i = 0; i < waveResolution; i++) {
    const percentage = i / (waveResolution - 1);
    const x = horizontalPadding + percentage * effectiveWidth;
    const y = wave(percentage, time) + offset;

    if (i == 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  if (leftEnd != "none") {
    const x = horizontalPadding;
    const y = wave(0, time) + offset;
    drawEndpoint(ctx, x, y, leftEnd);
  }
  if (rightEnd != "none") {
    const x = horizontalPadding + effectiveWidth;
    const y = wave(1, time) + offset;
    drawEndpoint(ctx, x, y, rightEnd);
  }
}

function drawEndpoint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  type: "fixed" | "free"
) {
  if (type == "free") {
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  wave: WaveFunction,
  time: number,
  color: string,
  size: number,
  showLongitudinal: boolean,
  skipLeft: boolean,
  skipRight: boolean
) {
  ctx.fillStyle = color;
  const first = skipLeft ? 1 : 0;
  const last = skipRight ? particleCount - 1 : particleCount;
  for (let i = first; i < last; i++) {
    const percentage = i / (particleCount - 1);
    let x = horizontalPadding + percentage * effectiveWidth;
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
