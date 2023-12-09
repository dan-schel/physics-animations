import { CanvasMetrics } from "../animation-renderer";
import { ink20 } from "./colors";

export type FrameMetrics = CanvasMetrics & {
  extraWidth: number;
  extraHeight: number;
};

export function centerFrame(
  ctx: CanvasRenderingContext2D,
  metrics: CanvasMetrics,
  width: number,
  height: number,
  debug: boolean = false,
) {
  const horizontalMargin = metrics.isDesktopLayout
    ? metrics.remSize * 2
    : metrics.remSize * 1;

  const effectiveWidth = metrics.canvasWidth - horizontalMargin * 2;
  const effectiveHeight = metrics.canvasHeight - metrics.remSize * 4;

  const scaleFactor = Math.min(
    effectiveWidth / width,
    effectiveHeight / height,
  );
  ctx.scale(scaleFactor, scaleFactor);
  const extraWidth = metrics.canvasWidth / scaleFactor - width;
  const extraHeight = metrics.canvasHeight / scaleFactor - height;
  ctx.translate(extraWidth / 2, extraHeight / 2);

  if (debug) {
    ctx.strokeStyle = ink20;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(1, 1, width - 2, height - 2);
    ctx.stroke();
  }

  return {
    ...metrics,
    extraWidth,
    extraHeight,
  };
}
