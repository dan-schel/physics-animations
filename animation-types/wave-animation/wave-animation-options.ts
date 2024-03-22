import {
  AnimationOptionDefinition,
  AnimationOptions,
} from "../animation-options";

export class WaveAnimationOptions extends AnimationOptions {
  static readonly superposition = "superposition";
  static readonly components = "components";
  static readonly particles = "particles";
  static readonly longitudinal = "longitudinal";
  static readonly rulers = "rulers";

  constructor(readonly rulersOption: string | null) {
    super();
  }

  define() {
    return [
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.superposition,
        "Show superposition",
        true,
      ),
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.components,
        "Show wave components",
        false,
      ),
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.particles,
        "Show particles",
        false,
      ),
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.longitudinal,
        "Show particles as longitudinal",
        false,
      ),
      ...(this.rulersOption != null
        ? [
            AnimationOptionDefinition.boolean(
              WaveAnimationOptions.rulers,
              this.rulersOption,
              false,
            ),
          ]
        : []),
    ];
  }
}
