"use client";

import { useMemo } from "react";
import AnimationCanvas from "../../(utils)/animation-canvas";
import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic";
import { pulse, reflect } from "@/engines/wave-basic/functions";
import AnimationHeader from "@/app/(utils)/animation-header";
import PlaybackControls from "@/app/(utils)/playback-controls";

export default function Animation() {
  const engine = useMemo(() => {
    return new WaveBasicEngine(
      [pulse(0.2, 5, 40), reflect(pulse(0.2, 5, 40))],
      7,
      false
    );
  }, []);

  return (
    <div>
      <AnimationHeader title="Pulse (open)"></AnimationHeader>
      <AnimationCanvas engine={engine}></AnimationCanvas>
      <PlaybackControls engine={engine}></PlaybackControls>
    </div>
  );
}
