import { interferenceDestructive } from "./waves/interference-destructive/animation";
import { interferenceConstructive } from "./waves/interference-constructive/animation";
import { reflectionFixed } from "./waves/reflection-fixed/animation";
import { reflectionFree } from "./waves/reflection-free/animation";
import { travelling } from "./waves/travelling/animation";
import { standingFixed } from "./waves/standing-fixed/animation";
import { standingFree } from "./waves/standing-free/animation";
import { centripetalForce } from "./motion/centripetal-force/animation";
import { bankedTrackFriction } from "./motion/banked-track-friction/animation";
import { refractionCriticalAngle } from "./light/refraction-critical-angle/animation";
import { refractionSlowingDown } from "./light/refraction-slowing-down/animation";
import { projectileMotion } from "./motion/projectile-motion/animation";
import { NavTree, fromAnimation } from "./nav-tree-utils";
import { doppler } from "./waves/doppler/animation";

export const navTree: NavTree = [
  {
    title: "Home",
    href: "/",
    type: "document",
  },
  {
    title: "Light",
    children: [
      fromAnimation(refractionSlowingDown),
      fromAnimation(refractionCriticalAngle),
    ],
  },
  {
    title: "Motion",
    children: [
      fromAnimation(centripetalForce),
      fromAnimation(bankedTrackFriction),
      fromAnimation(projectileMotion),
    ],
  },
  {
    title: "Waves",
    children: [
      fromAnimation(travelling),
      fromAnimation(interferenceConstructive),
      fromAnimation(interferenceDestructive),
      fromAnimation(reflectionFree),
      fromAnimation(reflectionFixed),
      fromAnimation(standingFixed),
      fromAnimation(standingFree),
      fromAnimation(doppler),
    ],
  },
];
