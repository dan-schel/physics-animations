import { ProjectileAnimationType } from "@/animation-types/projectile-animation.ts/projectile-animation";

export const projectileMotion = ProjectileAnimationType.fromObject({
  title: "Centripetal force",
  description:
    "Circular motion requires the net force to be towards the centre of the circle.",
  href: "/motion/projectile-motion",
  duration: 10,
  autoLoop: true,
  orbitalPeriod: 10,
});
