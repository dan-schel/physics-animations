import { SatelliteAnimationType } from "@/animation-types/satellite-animation/satellite-animation";

export const centripetalForce = SatelliteAnimationType.fromObject({
  title: "Circular motion: Centripetal force",
  description:
    "Circular motion requires the net force to be towards the centre of the circle.",
  href: "/motion/centripetal-force",
  duration: 10,
  autoLoop: true,
  orbitalPeriod: 10,
});
