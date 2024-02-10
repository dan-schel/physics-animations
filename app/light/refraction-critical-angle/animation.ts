import {
  RefractionEnvironment,
  criticalAngle,
  inverseCubicEasing,
  snellsLaw,
} from "@/animation-types/refraction-animation/functions";
import { RefractionAnimationType } from "@/animation-types/refraction-animation/refraction-animation";
import { degToRad } from "@/animation-types/utils/angles";
import { mapClamp } from "@dan-schel/js-utils";

const duration = 8;
const easingSmoothing = 0;

const topRefractiveIndex = 1;
const bottomRefractiveIndex = 1.52;

const centralAngle = criticalAngle(bottomRefractiveIndex, topRefractiveIndex);
const minAngle = centralAngle - degToRad(25);
const maxAngle = centralAngle + degToRad(25);
const fudgeAngle = degToRad(0.1);

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
  materialName: "Glass",
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
  title: "Refraction (speeding up & critical angle)",
  description:
    "Light bends away from the normal when speeding up, until it reaches the critical angle.",
  href: "/light/refraction-critical-angle",
  duration: duration,
  autoLoop: true,
  top: top,
  bottom: bottom,
});
