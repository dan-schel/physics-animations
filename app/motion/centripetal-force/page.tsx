"use client";

import AnimationPage from "@/components/animation-page";
import { centripetalForce } from "./animation";

export default function Page() {
  return <AnimationPage animation={centripetalForce}></AnimationPage>;
}
