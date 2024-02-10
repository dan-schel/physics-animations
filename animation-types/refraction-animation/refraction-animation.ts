import {
  AnimationOptionDefinition,
  AnimationOptions,
} from "../animation-options";
import { AnimationType } from "../animation-type";
import { RefractionEnvironment } from "./functions";
import { RefractionAnimationRenderer } from "./refraction-animation-renderer";

export class RefractionAnimationType extends AnimationType<RefractionAnimationOptions> {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    autoLoop: boolean,
    renderer: RefractionAnimationRenderer,
  ) {
    super(
      title,
      description,
      href,
      duration,
      autoLoop,
      new RefractionAnimationOptions(),
      renderer,
    );
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,
    top,
    bottom,
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
    top: RefractionEnvironment;
    bottom: RefractionEnvironment;
  }) {
    return new RefractionAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new RefractionAnimationRenderer(top, bottom),
    );
  }
}

export class RefractionAnimationOptions extends AnimationOptions {
  static readonly normal = "normal";

  constructor() {
    super([
      AnimationOptionDefinition.boolean(
        RefractionAnimationOptions.normal,
        "Show normal",
        true,
      ),
    ]);
  }
}
