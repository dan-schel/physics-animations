import { AnimationType } from "@/data/animation";
import { interferenceDestructive } from "./waves/interference-destructive/animation";
import { interferenceConstructive } from "./waves/interference-constructive/animation";
import { reflectionFixed } from "./waves/reflection-fixed/animation";
import { reflectionFree } from "./waves/reflection-free/animation";
import { travelling } from "./waves/travelling/animation";
import { standingFixed } from "./waves/standing-fixed/animation";
import { standingFree } from "./waves/standing-free/animation";
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
      fromAnimation(travelling),
      fromAnimation(interferenceConstructive),
      fromAnimation(interferenceDestructive),
      fromAnimation(reflectionFree),
      fromAnimation(reflectionFixed),
      fromAnimation(standingFixed),
      fromAnimation(standingFree),
    ],
  },
];
