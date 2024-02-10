import { AnimationOptions } from "../animation-options";
import { AnimationType } from "../animation-type";
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
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
  }) {
    return new RefractionAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new RefractionAnimationRenderer(),
    );
  }
}

export class RefractionAnimationOptions extends AnimationOptions {
  constructor() {
    super([]);
  }
}
