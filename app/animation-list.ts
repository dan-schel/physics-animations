export type AnimationEntry = {
  title: string;
  href: string;
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
  },
  {
    title: "Waves",
    children: [
      {
        title: "Pulse fixed at one end",
        href: "/waves/pulse-fixed",
      },
      {
        title: "Pulse free at one end",
        href: "/waves/pulse-free",
      },
    ],
  },
];
