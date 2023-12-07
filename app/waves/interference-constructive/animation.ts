import {
  pulse,
  reversePulse,
} from "@/animation-types/wave-animation/functions";
import { WaveAnimationType } from "@/animation-types/wave-animation/wave-animation";

export const interferenceConstructive = WaveAnimationType.fromObject({
  title: "Constructive interference",
  description: "Two waves collide, causing constructive interference.",
  href: "/waves/interference-constructive",
  duration: 4,
  waves: [pulse(0.2, 5, 40), reversePulse(0.2, 5, 40)],
});
