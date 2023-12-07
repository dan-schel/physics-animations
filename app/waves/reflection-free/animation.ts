import { pulse, reflect } from "@/animation-types/wave-animation/functions";
import { WaveAnimationType } from "@/animation-types/wave-animation/wave-animation";

export const reflectionFree = WaveAnimationType.fromObject({
  title: "Reflection (free end)",
  description:
    "The wave reflects when it reaches the end of the rope, which can freely move.",
  href: "/waves/reflection-free",
  duration: 7,
  waves: [pulse(0.2, 5, 0.3), reflect(pulse(0.2, 5, 0.3))],
  leftEnd: "none",
  rightEnd: "free",
});
