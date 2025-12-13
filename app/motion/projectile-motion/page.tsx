"use client";

import AnimationPage from "@/components/AnimationPage";
import { projectileMotion } from "./animation";

export default function Page() {
  return <AnimationPage animation={projectileMotion}></AnimationPage>;
}
