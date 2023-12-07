"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import styles from "./animation-canvas.module.scss";
import { AnimationType } from "@/data/animation";
import { AnimationOptionValues, AnimationOptions } from "@/data/options";

export default function AnimationCanvas({
  animation,
  time,
  optionValues,
}: {
  animation: AnimationType<AnimationOptions>;
  time: number;
  optionValues: AnimationOptionValues<AnimationOptions>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [controller, setController] = useState<CanvasController | null>(null);

  useEffect(() => {
    if (canvasRef.current != null) {
      const controller = new CanvasController(canvasRef.current);
      setController(controller);
      return () => controller.destroy();
    }
  }, [canvasRef]);

  useEffect(() => {
    controller?.render(animation, time, optionValues);
  }, [controller, animation, time, optionValues]);

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export class CanvasController {
  private parent: HTMLElement;
  private ctx: CanvasRenderingContext2D;
  private resizeObserver: ResizeObserver;

  private width = 0;
  private height = 0;
  private dpiRatio = 1;

  private lastRender: {
    animation: AnimationType<AnimationOptions>;
    time: number;
    optionValues: AnimationOptionValues<AnimationOptions>;
  } | null = null;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("Failed to get 2D context for canvas.");
    }
    this.ctx = ctx;

    const parent = this.canvas.parentElement;
    if (parent == null) {
      throw new Error("Failed to get the parent element of the canvas.");
    }
    this.parent = parent;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.parent);
    this.resize();
  }

  destroy() {
    this.resizeObserver.disconnect();
  }

  private resize() {
    const size = this.parent.getBoundingClientRect();
    this.width = size.width;
    this.height = size.height;
    this.dpiRatio =
      window.devicePixelRatio / ((this.ctx as any).backingStorePixelRatio ?? 1);

    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.canvas.width = this.width * this.dpiRatio;
    this.canvas.height = this.height * this.dpiRatio;

    if (this.lastRender != null) {
      this.render(
        this.lastRender.animation,
        this.lastRender.time,
        this.lastRender.optionValues
      );
    }
  }

  render(
    animation: AnimationType<AnimationOptions>,
    time: number,
    optionValues: AnimationOptionValues<AnimationOptions>
  ) {
    this.ctx.save();
    this.ctx.clearRect(
      0,
      0,
      this.width * this.dpiRatio,
      this.height * this.dpiRatio
    );
    this.ctx.scale(this.dpiRatio, this.dpiRatio);

    animation.renderer.render(
      this.ctx,
      time,
      this.width,
      this.height,
      optionValues
    );

    this.ctx.restore();

    this.lastRender = { animation, time, optionValues };
  }
}
