import { AnimationEngine } from "../animation-engine";

export class WaveBasicEngine extends AnimationEngine {
  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    width: number,
    height: number
  ): void {
    ctx.fillStyle = "#330000";
    ctx.fillRect(0, 0, width, height);
  }
}
