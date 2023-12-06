"use client";

import { pulse, reversePulse } from "@/engines/wave-basic/functions";
import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic-engine";
import { useMemo } from "react";
import AnimationCanvas from "./animation-canvas";
import AnimationHeader from "./animation-header";
import OptionMenu from "./option-menu";
import PlaybackControls from "./playback-controls";

export default function AnimationPage() {
  const engine = useMemo(() => {
    return new WaveBasicEngine(
      [pulse(0.2, 5, 40), reversePulse(0.2, 5, -40)],
      4,
      false
    );
  }, []);

  return (
    <div>
      <AnimationHeader title="Collision (opposite)"></AnimationHeader>
      <AnimationCanvas engine={engine}></AnimationCanvas>
      <PlaybackControls engine={engine}></PlaybackControls>
      <OptionMenu engine={engine}></OptionMenu>
    </div>
  );
}
