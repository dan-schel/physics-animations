"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./animation-canvas.module.scss";
import { AnimationEngine } from "@/engines/animation-engine";

export default function AnimationCanvas({
  engine,
}: {
  engine: AnimationEngine;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current != null) {
      engine.attachCanvas(canvasRef.current);
      return () => engine.detachCanvas();
    }
  }, [canvasRef, engine]);

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
