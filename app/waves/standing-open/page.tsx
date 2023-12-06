"use client";

import { useMemo } from "react";
import AnimationCanvas from "../../(utils)/animation-canvas";
import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic-engine";
import { reflectAndInvert, sine } from "@/engines/wave-basic/functions";
import AnimationHeader from "@/app/(utils)/animation-header";
import PlaybackControls from "@/app/(utils)/playback-controls";
import OptionMenu from "@/app/(utils)/option-menu";

export default function Animation() {
  const engine = useMemo(() => {
    return new WaveBasicEngine(
      [sine(1 / 5.5, 3, 40), reflectAndInvert(sine(1 / 5.5, 3, 40))],
      12,
      false
    );
  }, []);

  return (
    <div>
      <AnimationHeader title="Standing wave (open)"></AnimationHeader>
      <AnimationCanvas engine={engine}></AnimationCanvas>
      <PlaybackControls engine={engine}></PlaybackControls>
      <OptionMenu engine={engine}></OptionMenu>
    </div>
  );
}
