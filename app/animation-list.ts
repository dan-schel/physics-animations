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
        title: "Pulse fixed at one end",
        href: "/waves/pulse-fixed",
        type: "animation",
      },
      {
        title: "Pulse free at one end",
        href: "/waves/pulse-free",
        type: "animation",
      },
      {
        title: "Waves",
        children: [
          {
            title: "Pulse fixed at one end",
            href: "/waves/pulse-fixed",
            type: "animation",
          },
          {
            title: "Pulse free at one end",
            href: "/waves/pulse-free",
            type: "animation",
          },
          {
            title: "Waves",
            children: [
              {
                title: "Pulse fixed at one end",
                href: "/waves/pulse-fixed",
                type: "animation",
              },
              {
                title: "Pulse free at one end",
                href: "/waves/pulse-free",
                type: "animation",
              },
            ],
          },
        ],
      },
      {
        title: "Pulse fixed at one end",
        href: "/waves/pulse-fixed",
        type: "animation",
      },
      {
        title: "Pulse free at one end",
        href: "/waves/pulse-free",
        type: "animation",
      },
    ],
  },
];
