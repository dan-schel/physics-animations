"use client";

import AnimationPage from "@/app/(utils)/animation-page";
import { standingOpen } from "./animation";

export default function Page() {
  return <AnimationPage animation={standingOpen}></AnimationPage>;
}
