import { sine } from "@/animation-types/wave-animation/functions";
import { WaveAnimationType } from "@/animation-types/wave-animation/wave-animation";

export const travelling = WaveAnimationType.fromObject({
  title: "Travelling wave",
  description: "A single wave travelling through a rope.",
  href: "/waves/travelling",
  duration: 8,
  waves: [sine(0.2, 3, 40)],
});
