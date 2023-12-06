"use client";

import AnimationPage from "@/app/(utils)/animation-page";
import { sine } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const regular = WaveAnimationType.fromObject({
  title: "Regular",
  description: null,
  href: "/waves/regular",
  duration: 6,
  waves: [sine(0.2, 3, 40)],
});

export default function () {
  return <AnimationPage animation={regular}></AnimationPage>;
}
