import {
  AnimationOptionDefinition,
  AnimationOptions,
} from "../animation-options";

export class RefractionAnimationOptions extends AnimationOptions {
  static readonly normal = "normal";
  static readonly materials = "materials";

  define() {
    return [
      AnimationOptionDefinition.boolean(
        RefractionAnimationOptions.normal,
        "Show normal",
        true,
      ),
      AnimationOptionDefinition.boolean(
        RefractionAnimationOptions.materials,
        "Show materials",
        true,
      ),
    ];
  }
}
