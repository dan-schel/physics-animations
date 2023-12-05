"use client";

import { useMemo } from "react";
import AnimationCanvas from "../../(utils)/animation-canvas";
import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic";
import { reflectAndInvert, sine } from "@/engines/wave-basic/functions";
import AnimationHeader from "@/app/(utils)/animation-header";

export default function Animation() {
  const engine = useMemo(() => {
    return new WaveBasicEngine([
      sine(0.2, 3, 40),
      reflectAndInvert(sine(0.2, 3, 40)),
    ]);
  }, []);

  return (
    <div>
      <AnimationHeader title="Standing wave (fixed)"></AnimationHeader>
      <AnimationCanvas engine={engine}></AnimationCanvas>
    </div>
  );
}
