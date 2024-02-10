import { RefractionAnimationType } from "@/animation-types/refraction-animation/refraction-animation";

export const refractionCriticalAngle = RefractionAnimationType.fromObject({
  title: "Refraction: The critical angle",
  description:
    "After reaching the critical angle, light reflects back into the medium.",
  href: "/light/refraction-critical-angle",
  duration: 4,
  autoLoop: true,
});
