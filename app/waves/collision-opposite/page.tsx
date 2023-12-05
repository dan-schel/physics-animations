"use client";

import { useMemo } from "react";
import AnimationCanvas from "../../(utils)/animation-canvas";
import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic";
import { pulse, reversePulse } from "@/engines/wave-basic/functions";

export default function Animation() {
  const engine = useMemo(() => {
    return new WaveBasicEngine([pulse(0.2, 5, 40), reversePulse(0.2, 5, -40)]);
  }, []);

  return (
    <div>
      <p>Collision opposite</p>
      <AnimationCanvas engine={engine}></AnimationCanvas>
    </div>
  );
}
