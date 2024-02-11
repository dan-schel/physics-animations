import {
  AnimationOptionDefinition,
  AnimationOptions,
} from "../animation-options";
import { AnimationType } from "../animation-type";
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
    orbitalPeriod,
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
    orbitalPeriod: number;
  }) {
    return new ProjectileAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new ProjectileAnimationRenderer(orbitalPeriod),
    );
  }
}

export class ProjectileAnimationOptions extends AnimationOptions {
  static readonly netForce = "net-force";
  static readonly velocity = "velocity";

  constructor() {
    super([
      AnimationOptionDefinition.boolean(
        ProjectileAnimationOptions.netForce,
        "Show net force",
        true,
      ),
      AnimationOptionDefinition.boolean(
        ProjectileAnimationOptions.velocity,
        "Show velocity",
        false,
      ),
    ]);
  }
}
