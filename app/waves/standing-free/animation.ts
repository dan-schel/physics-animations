import { sine, reflectAndInvert } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const standingFree = WaveAnimationType.fromObject({
  title: "Standing wave (one free end)",
  description:
    "A standing wave along a rope with a free end will have an antinode at the free end.",
  href: "/waves/standing-free",
  duration: 12,
  waves: [sine(1 / 5.5, 3, 40), reflectAndInvert(sine(1 / 5.5, 3, 40))],
});
