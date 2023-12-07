import {
  pulse,
  reflectAndInvert,
} from "@/animation-types/wave-animation/functions";
import { WaveAnimationType } from "@/animation-types/wave-animation/wave-animation";

export const reflectionFixed = WaveAnimationType.fromObject({
  title: "Reflection (fixed end)",
  description:
    "The wave reflects and inverts when it reaches the fixed end of the rope.",
  href: "/waves/reflection-fixed",
  duration: 7,
  autoLoop: true,
  waves: [pulse(0.2, 5, 0.3), reflectAndInvert(pulse(0.2, 5, 0.3))],
  leftEnd: "none",
  rightEnd: "fixed",
});
