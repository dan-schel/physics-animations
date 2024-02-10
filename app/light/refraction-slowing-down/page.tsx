"use client";

import AnimationPage from "@/components/animation-page";
import { refractionSlowingDown } from "./animation";

export default function Page() {
  return <AnimationPage animation={refractionSlowingDown}></AnimationPage>;
}
