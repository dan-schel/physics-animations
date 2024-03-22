import {
  AnimationOptions,
  AnimationOptionDefinition,
} from "../animation-options";

export class NetForceAnimationOptions extends AnimationOptions {
  static readonly netForce = "net-force";

  define() {
    return [
      AnimationOptionDefinition.boolean(
        NetForceAnimationOptions.netForce,
        "Show net force",
        true,
      ),
    ];
  }
}
