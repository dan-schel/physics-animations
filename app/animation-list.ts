export type AnimationEntry = {
  title: string;
  href: string;
  type: "document" | "animation";
};

export type AnimationCollection = {
  title: string;
  children: AnimationTree;
};

export type AnimationTreeNode = AnimationCollection | AnimationEntry;

export type AnimationTree = AnimationTreeNode[];

export const AnimationList: AnimationTree = [
  {
    title: "Home",
    href: "/",
    type: "document",
  },
  {
    title: "Waves",
    children: [
      {
        title: "Regular",
        href: "/waves/regular",
        type: "animation",
      },
      {
        title: "Collision (same)",
        href: "/waves/collision-same",
        type: "animation",
      },
      {
        title: "Collision (opposite)",
        href: "/waves/collision-opposite",
        type: "animation",
      },
      {
        title: "Pulse (fixed)",
        href: "/waves/pulse-fixed",
        type: "animation",
      },
      {
        title: "Pulse (open)",
        href: "/waves/pulse-open",
        type: "animation",
      },
      {
        title: "Standing wave (fixed)",
        href: "/waves/standing-fixed",
        type: "animation",
      },
      {
        title: "Standing wave (open)",
        href: "/waves/standing-open",
        type: "animation",
      },
    ],
  },
];
