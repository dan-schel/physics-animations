import { AnimationOptions } from "../animation-options";
import { AnimationType } from "../animation-type";
import { BlankAnimationRenderer } from "./blank-animation-renderer";

export class BlankAnimationType extends AnimationType {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    autoLoop: boolean,
    options: AnimationOptions,
    renderer: BlankAnimationRenderer,
  ) {
    super(title, description, href, duration, autoLoop, options, renderer);
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
  }) {
    return new BlankAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new AnimationOptions(),
      new BlankAnimationRenderer(),
    );
  }
}
