import { sine } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const regular = WaveAnimationType.fromObject({
  title: "Regular",
  description: null,
  href: "/waves/regular",
  duration: 6,
  waves: [sine(0.2, 3, 40)],
});
