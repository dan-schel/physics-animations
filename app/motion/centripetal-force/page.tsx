"use client";

import AnimationPage from "@/components/AnimationPage";
import { centripetalForce } from "./animation";

export default function Page() {
  return <AnimationPage animation={centripetalForce}></AnimationPage>;
}
