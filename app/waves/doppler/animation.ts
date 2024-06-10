import { DopplerAnimationType } from "@/animation-types/doppler-animation/doppler-animation";
import {
  sine,
  stationary,
} from "@/animation-types/doppler-animation/functions";
import { person } from "@/animation-types/doppler-animation/graphics";

export const doppler = DopplerAnimationType.fromObject({
  title: "The Doppler effect",
  description:
    "The apparent frequency of the wave can depend on how its source is moving.",
  href: "/waves/doppler",
  duration: 15,
  autoLoop: true,
  sourcePositionFunction: sine(15, 100),
  graphics: [person(stationary(0, 0), 0.75)],
});
