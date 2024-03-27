import {
  AnimationOptions,
  AnimationOptionDefinition,
} from "../animation-options";

export class ProjectileAnimationOptions extends AnimationOptions {
  static readonly velocity = "velocity";
  static readonly velocityComponents = "velocity-components";
  static readonly netForce = "net-force";

  define() {
    return [
      AnimationOptionDefinition.boolean(
        ProjectileAnimationOptions.velocityComponents,
        "Show velocity components",
        true,
      ),
      AnimationOptionDefinition.boolean(
        ProjectileAnimationOptions.velocity,
        "Show total velocity",
        false,
      ),
      AnimationOptionDefinition.boolean(
        ProjectileAnimationOptions.netForce,
        "Show net force",
        false,
      ),
    ];
  }
}
