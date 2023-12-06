import { AnimationOptions } from "./options";
import { AnimationRenderer } from "./renderer";

export class AnimationType<
  OptionType extends AnimationOptions = AnimationOptions
> {
  constructor(
    readonly title: string,
    readonly description: string | null,
    readonly href: string,
    readonly duration: number,
    readonly options: OptionType,
    readonly renderer: AnimationRenderer<OptionType>
  ) {}
}
