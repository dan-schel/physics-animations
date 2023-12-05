"use client";

import { useMemo } from "react";
import AnimationCanvas from "../../(utils)/animation-canvas";
import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic";
import { reflectAndInvert, sine } from "@/engines/wave-basic/functions";

export default function Animation() {
  const engine = useMemo(() => {
    return new WaveBasicEngine([
      sine(1 / 5.5, 3, 40),
      reflectAndInvert(sine(1 / 5.5, 3, 40)),
    ]);
  }, []);

  return (
    <div>
      <p>Standing open</p>
      <AnimationCanvas engine={engine}></AnimationCanvas>
    </div>
  );
}
