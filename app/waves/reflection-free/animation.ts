import { pulse, reflect } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const reflectionFree = WaveAnimationType.fromObject({
  title: "Reflection (free end)",
  description:
    "The wave reflects when it reaches the end of the rope, which can freely move.",
  href: "/waves/reflection-free",
  duration: 7,
  waves: [pulse(0.2, 5, 40), reflect(pulse(0.2, 5, 40))],
});
