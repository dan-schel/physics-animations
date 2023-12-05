"use client";

import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic";
import { useRef, useEffect, useState } from "react";
import styles from "./animation-canvas.module.scss";
import { AnimationEngine } from "@/engines/animation-engine";

export default function AnimationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<AnimationEngine | null>(null);

  useEffect(() => {
    if (canvasRef.current != null) {
      const engine = new WaveBasicEngine();
      engine.init(canvasRef.current);
      setEngine(engine);
      return () => engine.destroy();
    }
  }, [canvasRef]);

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
