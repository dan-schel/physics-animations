import { AnimationType } from "../animation-type";
import {
  AnimationOptionDefinition,
  AnimationOptions,
} from "../animation-options";
import { WaveFunction } from "./functions";
import { WaveAnimationRenderer } from "./wave-animation-renderer";

export class WaveAnimationType extends AnimationType<WaveAnimationOptions> {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    renderer: WaveAnimationRenderer
  ) {
    super(
      title,
      description,
      href,
      duration,
      new WaveAnimationOptions(),
      renderer
    );
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    waves,
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    waves: WaveFunction[];
  }) {
    return new WaveAnimationType(
      title,
      description,
      href,
      duration,
      new WaveAnimationRenderer(waves)
    );
  }
}

export class WaveAnimationOptions extends AnimationOptions {
  static readonly superposition = "superposition";
  static readonly components = "components";
  static readonly particles = "particles";
  static readonly longitudinal = "longitudinal";

  constructor() {
    super([
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.superposition,
        "Show superposition",
        true
      ),
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.components,
        "Show wave components",
        false
      ),
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.particles,
        "Show particles",
        false
      ),
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.longitudinal,
        "Show as longitudinal",
        false
      ),
    ]);
  }
}
