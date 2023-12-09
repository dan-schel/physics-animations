import { AnimationOptions } from "../animation-options";
import { AnimationType } from "../animation-type";
import { ForcesFunction } from "./functions";
import { Graphic } from "./graphics";
import { NetForceAnimationRenderer } from "./net-force-animation-renderer";

export class NetForceAnimationType extends AnimationType<NetForceAnimationOptions> {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    autoLoop: boolean,
    renderer: NetForceAnimationRenderer,
  ) {
    super(
      title,
      description,
      href,
      duration,
      autoLoop,
      new NetForceAnimationOptions(),
      renderer,
    );
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,
    forces,
    graphic,
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
    forces: ForcesFunction;
    graphic: Graphic;
  }) {
    return new NetForceAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new NetForceAnimationRenderer(forces, graphic),
    );
  }
}

export class NetForceAnimationOptions extends AnimationOptions {
  constructor() {
    super([]);
  }
}
