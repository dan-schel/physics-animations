"use client";

import AnimationPage from "@/components/animation-page";
import { refractionCriticalAngle } from "./animation";

export default function Page() {
  return <AnimationPage animation={refractionCriticalAngle}></AnimationPage>;
}
