"use client";

import AnimationPage from "@/app/(utils)/animation-page";
import { reflectAndInvert, sine } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const standingFixed = WaveAnimationType.fromObject({
  title: "Standing wave (fixed)",
  description: null,
  href: "/waves/standing-fixed",
  duration: 12,
  waves: [sine(0.2, 3, 40), reflectAndInvert(sine(0.2, 3, 40))],
});

export default function () {
  return <AnimationPage animation={standingFixed}></AnimationPage>;
}
