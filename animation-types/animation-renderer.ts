import { AnimationOptionValues, AnimationOptions } from "./animation-options";

export type CanvasMetrics = {
  canvasWidth: number;
  canvasHeight: number;
  dpiRatio: number;
  remSize: number;
  isDesktopLayout: boolean;
};

export abstract class AnimationRenderer<
  OptionType extends AnimationOptions = AnimationOptions,
> {
  abstract render(
    ctx: CanvasRenderingContext2D,
    time: number,
    metrics: CanvasMetrics,
    options: AnimationOptionValues<OptionType>,
  ): void;
}
