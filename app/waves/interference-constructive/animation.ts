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
  autoLoop: true,
  waves: [pulse(0.2, 5, 0.3), reversePulse(0.2, 5, 0.3)],
  leftEnd: "none",
  rightEnd: "none",
});
