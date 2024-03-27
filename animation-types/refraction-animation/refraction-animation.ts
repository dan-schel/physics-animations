import { AnimationType } from "../animation-type";
import { RefractionEnvironment } from "./functions";
import { RefractionAnimationOptions } from "./refraction-animation-options";
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
