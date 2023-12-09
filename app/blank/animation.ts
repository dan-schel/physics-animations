import { BlankAnimationType } from "@/animation-types/blank-animation/blank-animation";

export const blank = BlankAnimationType.fromObject({
  title: "Blank animation",
  description:
    "This is a blank animation. Use the navigation menu to find the real animations!",
  href: "/blank",
  duration: 5,
  autoLoop: true,
});
