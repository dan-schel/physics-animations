import { AnimationOptionValues, AnimationOptions } from "./animation-options";

export abstract class AnimationRenderer<OptionType extends AnimationOptions> {
  abstract render(
    ctx: CanvasRenderingContext2D,
    time: number,
    canvasWidth: number,
    canvasHeight: number,
    options: AnimationOptionValues<OptionType>,
  ): void;
}

export function frameForWidth(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  width: number,
) {
  const scaleFactor = canvasWidth / width;
  const frameHeight = canvasHeight / scaleFactor;
  ctx.scale(scaleFactor, scaleFactor);
  ctx.translate(0, frameHeight / 2);

  return {
    frameHeight,
  };
}

export function centerFrame(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  width: number,
  height: number,
) {
  const scaleFactor = Math.min(canvasWidth / width, canvasHeight / height);
  ctx.scale(scaleFactor, scaleFactor);
  const extraWidth = canvasWidth / scaleFactor - width;
  const extraHeight = canvasHeight / scaleFactor - height;
  ctx.translate(extraWidth / 2, extraHeight / 2);

  return {
    extraWidth,
    extraHeight,
  };
}
