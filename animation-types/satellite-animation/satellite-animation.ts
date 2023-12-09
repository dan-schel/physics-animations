import {
  AnimationOptionDefinition,
  AnimationOptions,
} from "../animation-options";
import { AnimationType } from "../animation-type";
import { SatelliteAnimationRenderer } from "./satellite-animation-renderer";

export class SatelliteAnimationType extends AnimationType<SatelliteAnimationOptions> {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    autoLoop: boolean,
    renderer: SatelliteAnimationRenderer,
  ) {
    super(
      title,
      description,
      href,
      duration,
      autoLoop,
      new SatelliteAnimationOptions(),
      renderer,
    );
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,
    orbitalPeriod,
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
    orbitalPeriod: number;
  }) {
    return new SatelliteAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new SatelliteAnimationRenderer(orbitalPeriod),
    );
  }
}

export class SatelliteAnimationOptions extends AnimationOptions {
  static readonly netForce = "net-force";
  static readonly velocity = "velocity";

  constructor() {
    super([
      AnimationOptionDefinition.boolean(
        SatelliteAnimationOptions.netForce,
        "Show net force",
        true,
      ),
      AnimationOptionDefinition.boolean(
        SatelliteAnimationOptions.velocity,
        "Show velocity",
        false,
      ),
    ]);
  }
}
