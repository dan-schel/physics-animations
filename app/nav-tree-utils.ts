import { AnimationOptions } from "@/animation-types/animation-options";
import { AnimationType } from "@/animation-types/animation-type";
import { Metadata } from "next";
import { blank } from "./blank/animation";

const canonicalUrl = "https://physics.danschellekens.com";

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

export function fromAnimation(
  animation: AnimationType<AnimationOptions>,
): NavPage {
  return {
    title: animation.title,
    href: animation.href,
    type: "animation",
  };
}

export function getMetadataForPage(title: string, href: string): Metadata {
  return {
    title: `${title} | VCE Physics Animations`,
    description:
      "A small collection of animations useful for explaining VCE Physics concepts.",
    alternates: {
      canonical: `${canonicalUrl}${href}`,
    },
  };
}

export function getMetadataForAnimation(
  animation: AnimationType<AnimationOptions>,
): Metadata {
  if (animation === blank) {
    return {
      title: "Blank animation [demo purposes only]",
      robots: { index: false },
    };
  }

  return {
    title: `${animation.title} | VCE Physics Animations`,
    description: `${animation.description} This site contains small collection of animations useful for explaining VCE Physics concepts.`,
    alternates: {
      canonical: `${canonicalUrl}${animation.href}`,
    },
  };
}
