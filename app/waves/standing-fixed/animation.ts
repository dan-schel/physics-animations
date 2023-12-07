import { sine, reflectAndInvert } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const standingFixed = WaveAnimationType.fromObject({
  title: "Standing wave (two fixed ends)",
  description:
    "A standing wave forms with nodes at both fixed ends due to the reflection.",
  href: "/waves/standing-fixed",
  duration: 12,
  waves: [sine(0.2, 3, 40), reflectAndInvert(sine(0.2, 3, 40))],
});
