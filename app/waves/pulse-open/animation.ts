import { pulse, reflect } from "@/data/wave-animation/functions";
import { WaveAnimationType } from "@/data/wave-animation/wave-animation";

export const pulseOpen = WaveAnimationType.fromObject({
  title: "Pulse (open)",
  description: null,
  href: "/waves/pulse-open",
  duration: 7,
  waves: [pulse(0.2, 5, 40), reflect(pulse(0.2, 5, 40))],
});
