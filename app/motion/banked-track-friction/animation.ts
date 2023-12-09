import { constant } from "@/animation-types/net-force-animation/functions";
import { bankedTrack } from "@/animation-types/net-force-animation/graphics";
import { NetForceAnimationType } from "@/animation-types/net-force-animation/net-force-animation";
import { degToRad } from "@/animation-types/utils/angles";
import { green, darkBlue, red } from "@/animation-types/utils/colors";

export const bankedTrackFriction = NetForceAnimationType.fromObject({
  title: "Friction on a banked track",
  description:
    "Friction is required to travel on a banked track, unless you're going the design speed.",
  href: "/motion/banked-track-friction",
  duration: 10,
  autoLoop: true,
  forces: constant([
    {
      magnitude: 50,
      angle: degToRad(90),
      color: darkBlue,
    },
    {
      magnitude: 50,
      angle: degToRad(240),
      color: green,
    },
    {
      magnitude: 30,
      angle: degToRad(-30),
      color: red,
    },
  ]),
  graphic: bankedTrack(degToRad(30), 1),
});
