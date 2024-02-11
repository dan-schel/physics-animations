import { projectileMotionFunctions } from "@/animation-types/projectile-animation.ts/functions";
import { ProjectileAnimationType } from "@/animation-types/projectile-animation.ts/projectile-animation";
import { degToRad } from "@/animation-types/utils/angles";

export const projectileMotion = ProjectileAnimationType.fromObject({
  title: "Projectile motion",
  description:
    "Assuming no air resistance, gravity is the only force on the cannonball once fired.",
  href: "/motion/projectile-motion",
  duration: 4,
  autoLoop: true,
  motion: projectileMotionFunctions(degToRad(45), 108, 50),
});
