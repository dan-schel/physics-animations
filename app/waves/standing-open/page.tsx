"use client";

import AnimationPage from "@/app/(utils)/animation-page";
import { reflectAndInvert, sine } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const standingOpen = WaveAnimationType.fromObject({
  name: "Standing wave (open)",
  description: null,
  href: "/waves/standing-open",
  duration: 12,
  waves: [sine(1 / 5.5, 3, 40), reflectAndInvert(sine(1 / 5.5, 3, 40))],
});

export default function () {
  return <AnimationPage animation={standingOpen}></AnimationPage>;
}
