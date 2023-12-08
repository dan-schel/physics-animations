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