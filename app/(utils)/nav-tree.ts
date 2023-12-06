import { AnimationType } from "@/data/animation";
import { collisionOpposite } from "../waves/collision-opposite/animation";
import { collisionSame } from "../waves/collision-same/animation";
import { pulseFixed } from "../waves/pulse-fixed/animation";
import { pulseOpen } from "../waves/pulse-open/animation";
import { regular } from "../waves/regular/animation";
import { standingFixed } from "../waves/standing-fixed/animation";
import { standingOpen } from "../waves/standing-open/animation";
import { AnimationOptions } from "@/data/options";

export type NavPage = {
  title: string;
  href: string;
  type: "document" | "animation";
};

export type NavCollection = {
  title: string;
  children: NavTree;
};

export type NavTreeNode = NavCollection | NavPage;

export type NavTree = NavTreeNode[];

function fromAnimation(animation: AnimationType<AnimationOptions>): NavPage {
  return {
    title: animation.title,
    href: animation.href,
    type: "animation",
  };
}

export const navTree: NavTree = [
  {
    title: "Home",
    href: "/",
    type: "document",
  },
  {
    title: "Waves",
    children: [
      fromAnimation(regular),
      fromAnimation(collisionSame),
      fromAnimation(collisionOpposite),
      fromAnimation(pulseFixed),
      fromAnimation(pulseOpen),
      fromAnimation(standingFixed),
      fromAnimation(standingOpen),
    ],
  },
];
