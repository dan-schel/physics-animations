import { AnimationOptions } from "../animation-options";
import { AnimationType } from "../animation-type";
import { DopplerAnimationRenderer } from "./doppler-animation-renderer";
import { PositionFunction } from "./functions";
import { Graphic } from "./graphics";

export class DopplerAnimationType extends AnimationType {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    autoLoop: boolean,
    options: AnimationOptions,
    renderer: DopplerAnimationRenderer,
  ) {
    super(title, description, href, duration, autoLoop, options, renderer);
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,
    sourcePositionFunction,
    graphics = [],
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
    sourcePositionFunction: PositionFunction;
    graphics?: Graphic[];
  }) {
    return new DopplerAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new AnimationOptions(),
      new DopplerAnimationRenderer(duration, sourcePositionFunction, graphics),
    );
  }
}
