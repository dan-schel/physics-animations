"use client";

import AnimationPage from "@/app/(utils)/animation-page";
import { pulse, reversePulse } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const collisionSame = WaveAnimationType.fromObject({
  title: "Collision (same)",
  description: null,
  href: "/waves/collision-same",
  duration: 4,
  waves: [pulse(0.2, 5, 40), reversePulse(0.2, 5, 40)],
});

export default function () {
  return <AnimationPage animation={collisionSame}></AnimationPage>;
}
