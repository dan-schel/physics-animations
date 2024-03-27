import {
  AnimationOptionDefinition,
  AnimationOptions,
} from "../animation-options";

export class SatelliteAnimationOptions extends AnimationOptions {
  static readonly netForce = "net-force";
  static readonly velocity = "velocity";

  define() {
    return [
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
    ];
  }
}
