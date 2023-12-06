import { pulse, reflectAndInvert } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const pulseFixed = WaveAnimationType.fromObject({
  title: "Pulse (fixed)",
  description: null,
  href: "/waves/pulse-fixed",
  duration: 7,
  waves: [pulse(0.2, 5, 40), reflectAndInvert(pulse(0.2, 5, 40))],
});
