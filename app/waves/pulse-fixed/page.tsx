"use client";

import AnimationPage from "@/app/(utils)/animation-page";
import { pulseFixed } from "./animation";

export default function Page() {
  return <AnimationPage animation={pulseFixed}></AnimationPage>;
}
