import { AnimationType } from "../animation-type";
import { ProjectileMotionValues } from "./functions";
import { ProjectileAnimationOptions } from "./projectile-animation-options";
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
