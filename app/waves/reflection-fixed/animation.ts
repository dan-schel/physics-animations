import { pulse, reflectAndInvert } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const reflectionFixed = WaveAnimationType.fromObject({
  title: "Reflection (fixed end)",
  description:
    "The wave reflects and inverts when it reaches the fixed end of the rope.",
  href: "/waves/reflection-fixed",
  duration: 7,
  waves: [pulse(0.2, 5, 40), reflectAndInvert(pulse(0.2, 5, 40))],
});
