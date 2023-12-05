import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic";
import { useEffect, useRef } from "react";
import AnimationCanvas from "../animation-canvas";

export default function Animation() {
  return (
    <div>
      <p>Regular</p>
      <AnimationCanvas></AnimationCanvas>
    </div>
  );
}
