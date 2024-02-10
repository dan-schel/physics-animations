import { Force } from "@/animation-types/net-force-animation/functions";
import { bankedTrack } from "@/animation-types/net-force-animation/graphics";
import { NetForceAnimationType } from "@/animation-types/net-force-animation/net-force-animation";
import { degToRad } from "@/animation-types/utils/angles";
import { green, darkBlue, teal } from "@/animation-types/utils/colors";
import { mapClamp } from "@dan-schel/js-utils";

const bankDegrees = 30;
const duration = 8;
const minNetForce = -8;
const maxNetForce = -50;
const gravity = 50;

const gravityAngle = degToRad(90);
const reactionAngle = degToRad(270 - bankDegrees);
const frictionAngle = degToRad(-bankDegrees);

function bankedTrackForces(time: number): Force[] {
  const netForce = mapClamp(time, 0, duration, minNetForce, maxNetForce);

  const reaction =
    (netForce * Math.sin(frictionAngle) + gravity * Math.cos(frictionAngle)) /
    -Math.sin(reactionAngle - frictionAngle);

  const friction =
    (-gravity - reaction * Math.sin(reactionAngle)) / Math.sin(frictionAngle);

  return [
    {
      magnitude: gravity,
      angle: gravityAngle,
      color: darkBlue,
    },
    {
      magnitude: reaction,
      angle: reactionAngle,
      color: green,
    },
    {
      magnitude: friction,
      angle: frictionAngle,
      color: teal,
    },
  ];
}

export const bankedTrackFriction = NetForceAnimationType.fromObject({
  title: "Friction on a banked track",
  description:
    "Friction is required to travel on a banked track, unless you're going the design speed.",
  href: "/motion/banked-track-friction",
  duration: duration,
  autoLoop: true,
  forces: bankedTrackForces,
  graphic: bankedTrack(degToRad(bankDegrees), 1),
  forceDiagramOffset: { x: 20, y: -15 },
});
