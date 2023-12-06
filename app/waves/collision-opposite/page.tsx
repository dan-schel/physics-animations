"use client";

import AnimationPage from "@/app/(utils)/animation-page";
import { collisionOpposite } from "./animation";

export default function Page() {
  return <AnimationPage animation={collisionOpposite}></AnimationPage>;
}
