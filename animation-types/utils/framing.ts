import { CanvasMetrics } from "../animation-renderer";

export type FrameMetrics = CanvasMetrics & {
  extraWidth: number;
  extraHeight: number;
};

export function centerFrame(
  ctx: CanvasRenderingContext2D,
  metrics: CanvasMetrics,
  width: number,
  height: number,
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

  return {
    ...metrics,
    extraWidth,
    extraHeight,
  };
}
