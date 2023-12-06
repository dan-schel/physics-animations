"use client";

import AnimationPage from "@/app/(utils)/animation-page";
import { pulseOpen } from "./animation";

export default function Page() {
  return <AnimationPage animation={pulseOpen}></AnimationPage>;
}
