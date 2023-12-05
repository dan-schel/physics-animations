"use client";

import { useMemo } from "react";
import AnimationCanvas from "../../(utils)/animation-canvas";
import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic";
import { pulse, reflectAndInvert } from "@/engines/wave-basic/functions";
import AnimationHeader from "@/app/(utils)/animation-header";

export default function Animation() {
  const engine = useMemo(() => {
    return new WaveBasicEngine([
      pulse(0.2, 5, 40),
      reflectAndInvert(pulse(0.2, 5, 40)),
    ]);
  }, []);

  return (
    <div>
      <AnimationHeader title="Pulse (fixed)"></AnimationHeader>
      <AnimationCanvas engine={engine}></AnimationCanvas>
    </div>
  );
}
