import { AnimationType } from "@/data/animation";
import { regular } from "../waves/regular/page";
import { collisionSame } from "../waves/collision-same/page";
import { collisionOpposite } from "../waves/collision-opposite/page";
import { pulseFixed } from "../waves/pulse-fixed/page";
import { pulseOpen } from "../waves/pulse-open/page";
import { standingFixed } from "../waves/standing-fixed/page";
import { standingOpen } from "../waves/standing-open/page";

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

function fromAnimation(animation: AnimationType): NavPage {
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
