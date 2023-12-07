import { AnimationOptions } from "./animation-options";
import { AnimationRenderer } from "./animation-renderer";

export class AnimationType<OptionType extends AnimationOptions> {
  constructor(
    readonly title: string,
    readonly description: string | null,
    readonly href: string,
    readonly duration: number,
    readonly options: OptionType,
    readonly renderer: AnimationRenderer<OptionType>
  ) {}
}
