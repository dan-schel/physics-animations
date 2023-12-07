"use client";

import AnimationPage from "@/app/(utils)/animation-page";
import { reflectionFree } from "./animation";

export default function Page() {
  return <AnimationPage animation={reflectionFree}></AnimationPage>;
}
