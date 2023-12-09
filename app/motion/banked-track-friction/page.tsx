"use client";

import AnimationPage from "@/components/animation-page";
import { bankedTrackFriction } from "./animation";

export default function Page() {
  return <AnimationPage animation={bankedTrackFriction}></AnimationPage>;
}
