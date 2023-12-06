import { sine, reflectAndInvert } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const standingOpen = WaveAnimationType.fromObject({
  title: "Standing wave (open)",
  description: null,
  href: "/waves/standing-open",
  duration: 12,
  waves: [sine(1 / 5.5, 3, 40), reflectAndInvert(sine(1 / 5.5, 3, 40))],
});
