import {
  AnimationOptionDefinition,
  AnimationOptions,
} from "../animation-options";
import { AnimationType } from "../animation-type";
import { ProjectileMotionValues } from "./functions";
import { ProjectileAnimationRenderer } from "./projectile-animation-renderer";

export class ProjectileAnimationType extends AnimationType<ProjectileAnimationOptions> {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    autoLoop: boolean,
    renderer: ProjectileAnimationRenderer,
  ) {
    super(
      title,
      description,
      href,
      duration,
      autoLoop,
      new ProjectileAnimationOptions(),
      renderer,
    );
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,
    motion,
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
    motion: ProjectileMotionValues;
  }) {
    return new ProjectileAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new ProjectileAnimationRenderer(motion),
    );
  }
}

export class ProjectileAnimationOptions extends AnimationOptions {
  static readonly velocity = "velocity";
  static readonly velocityComponents = "velocity-components";
  static readonly netForce = "net-force";

  constructor() {
    super([
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
    ]);
  }
}
