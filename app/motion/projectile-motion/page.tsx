"use client";

import AnimationPage from "@/components/animation-page";
import { projectileMotion } from "./animation";

export default function Page() {
  return <AnimationPage animation={projectileMotion}></AnimationPage>;
}
