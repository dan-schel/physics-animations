"use client";

import { useMemo } from "react";
import AnimationCanvas from "../../(utils)/animation-canvas";
import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic";
import { sine } from "@/engines/wave-basic/functions";

export default function Animation() {
  const engine = useMemo(() => {
    return new WaveBasicEngine([sine(0.2, 3, 40)]);
  }, []);

  return (
    <div>
      <p>Regular</p>
      <AnimationCanvas engine={engine}></AnimationCanvas>
    </div>
  );
}
