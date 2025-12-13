"use client";

import AnimationPage from "@/components/AnimationPage";
import { refractionSlowingDown } from "./animation";

export default function Page() {
  return <AnimationPage animation={refractionSlowingDown}></AnimationPage>;
}
