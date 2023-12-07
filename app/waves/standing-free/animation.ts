import {
  sine,
  reflectAndInvert,
} from "@/animation-types/wave-animation/functions";
import { WaveAnimationType } from "@/animation-types/wave-animation/wave-animation";

export const standingFree = WaveAnimationType.fromObject({
  title: "Standing wave (one free end)",
  description:
    "If one end is free, the standing wave will have an antinode at the free end.",
  href: "/waves/standing-free",
  duration: 15,
  autoLoop: false,
  waves: [sine(1 / 5.5, 3, 0.3), reflectAndInvert(sine(1 / 5.5, 3, 0.3))],
  leftEnd: "free",
  rightEnd: "fixed",
});
