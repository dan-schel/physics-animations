import { AnimationType } from "../animation";
import { AnimationOptionDefinition, AnimationOptions } from "../options";
import { WaveAnimationRenderer } from "./wave-animation-renderer";

export class WaveAnimationType extends AnimationType<WaveAnimationOptions> {
  constructor(
    name: string,
    description: string | null,
    href: string,
    duration: number,
    renderer: WaveAnimationRenderer
  ) {
    super(
      name,
      description,
      href,
      duration,
      new WaveAnimationOptions(),
      renderer
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
