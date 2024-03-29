import {
  sine,
  reflectAndInvert,
} from "@/animation-types/wave-animation/functions";
import { WaveAnimationType } from "@/animation-types/wave-animation/wave-animation";

export const standingFixed = WaveAnimationType.fromObject({
  title: "Standing wave (two fixed ends)",
  description:
    "If both ends are fixed, the standing wave must have nodes at each end.",
  href: "/waves/standing-fixed",
  duration: 14,
  autoLoop: false,
  waves: [sine(0.2, 3, 0.3), reflectAndInvert(sine(0.2, 3, 0.3))],
  leftEnd: "fixed",
  rightEnd: "fixed",
  rulers: [0.3, 0.6],
  rulersOptionText: "Highlight one node and antinode",
});
