import {
  RefractionEnvironment,
  criticalAngle,
  inverseCubicEasing,
  snellsLaw,
} from "@/animation-types/refraction-animation/functions";
import { RefractionAnimationType } from "@/animation-types/refraction-animation/refraction-animation";
import { degToRad } from "@/animation-types/utils/angles";
import { mapClamp } from "@dan-schel/js-utils";

const duration = 6;
const easingSmoothing = 0;

const topRefractiveIndex = 1;
const bottomRefractiveIndex = 2.42;

const centralAngle = criticalAngle(bottomRefractiveIndex, topRefractiveIndex);
const minAngle = centralAngle - degToRad(15);
const maxAngle = centralAngle + degToRad(15);
const fudgeAngle = degToRad(1);

const bottom: RefractionEnvironment = {
  type: "incidence",
  angle: (time: number) =>
    mapClamp(
      inverseCubicEasing(time, duration, easingSmoothing),
      0,
      duration,
      minAngle,
      maxAngle,
    ),
  materialName: "Diamond",
  refractiveIndex: bottomRefractiveIndex,
};

const top: RefractionEnvironment = {
  type: "refraction",
  angle: (time: number) =>
    snellsLaw(
      bottomRefractiveIndex,
      topRefractiveIndex,
      bottom.angle(time),
      fudgeAngle,
    ),
  materialName: "Air",
  refractiveIndex: topRefractiveIndex,
};

export const refractionCriticalAngle = RefractionAnimationType.fromObject({
  title: "Refraction: The critical angle",
  description:
    "After reaching the critical angle, light reflects back into the medium.",
  href: "/light/refraction-critical-angle",
  duration: duration,
  autoLoop: true,
  top: top,
  bottom: bottom,
});
