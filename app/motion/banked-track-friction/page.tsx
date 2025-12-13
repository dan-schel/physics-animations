"use client";

import AnimationPage from "@/components/AnimationPage";
import { bankedTrackFriction } from "./animation";

export default function Page() {
  return <AnimationPage animation={bankedTrackFriction}></AnimationPage>;
}
