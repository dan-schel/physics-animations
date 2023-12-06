"use client";

import AnimationPage from "@/app/(utils)/animation-page";
import { collisionSame } from "./animation";

export default function Page() {
  return <AnimationPage animation={collisionSame}></AnimationPage>;
}
