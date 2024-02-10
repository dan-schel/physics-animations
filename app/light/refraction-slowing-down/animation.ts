import {
  RefractionEnvironment,
  snellsLaw,
} from "@/animation-types/refraction-animation/functions";
import { RefractionAnimationType } from "@/animation-types/refraction-animation/refraction-animation";
import { degToRad } from "@/animation-types/utils/angles";
import { mapClamp } from "@dan-schel/js-utils";

const duration = 8;

const topRefractiveIndex = 1;
const bottomRefractiveIndex = 1.52;

const minAngle = degToRad(0);
const maxAngle = degToRad(85);

const top: RefractionEnvironment = {
  type: "incidence",
  angle: (time: number) => mapClamp(time, 0, duration, minAngle, maxAngle),
  materialName: "Air",
  refractiveIndex: topRefractiveIndex,
};

const bottom: RefractionEnvironment = {
  type: "refraction",
  angle: (time: number) =>
    snellsLaw(topRefractiveIndex, bottomRefractiveIndex, top.angle(time)),
  materialName: "Glass",
  refractiveIndex: bottomRefractiveIndex,
};

export const refractionSlowingDown = RefractionAnimationType.fromObject({
  title: "Refraction (slowing down)",
  description:
    "As the light enters the glass and slows, its angle bends towards the normal.",
  href: "/light/refraction-slowing-down",
  duration: duration,
  autoLoop: true,
  top: top,
  bottom: bottom,
});
