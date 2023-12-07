"use client";

import AnimationPage from "@/components/animation-page";
import { reflectionFree } from "./animation";

export default function Page() {
  return <AnimationPage animation={reflectionFree}></AnimationPage>;
}
