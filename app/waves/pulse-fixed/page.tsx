"use client";

import { useMemo } from "react";
import AnimationCanvas from "../../(utils)/animation-canvas";
import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic-engine";
import { pulse, reflectAndInvert } from "@/engines/wave-basic/functions";
import AnimationHeader from "@/app/(utils)/animation-header";
import PlaybackControls from "@/app/(utils)/playback-controls";
import OptionMenu from "@/app/(utils)/option-menu";

export default function Animation() {
  const engine = useMemo(() => {
    return new WaveBasicEngine(
      [pulse(0.2, 5, 40), reflectAndInvert(pulse(0.2, 5, 40))],
      7,
      false
    );
  }, []);

  return (
    <div>
      <AnimationHeader title="Pulse (fixed)"></AnimationHeader>
      <AnimationCanvas engine={engine}></AnimationCanvas>
      <PlaybackControls engine={engine}></PlaybackControls>
      <OptionMenu engine={engine}></OptionMenu>
    </div>
  );
}
