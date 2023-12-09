"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./animation-canvas.module.scss";
import { AnimationType } from "@/animation-types/animation-type";
import {
  AnimationOptionValues,
  AnimationOptions,
} from "@/animation-types/animation-options";

export default function AnimationCanvas({
  animation,
  time,
  optionValues,
  className,
}: {
  animation: AnimationType<AnimationOptions>;
  time: number;
  optionValues: AnimationOptionValues<AnimationOptions>;
  className?: string;
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
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export class CanvasController {
  private parent: HTMLElement;
  private ctx: CanvasRenderingContext2D;
  private resizeObserver: ResizeObserver;

  private canvasWidth = 0;
  private canvasHeight = 0;
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
    this.canvasWidth = size.width;
    this.canvasHeight = size.height;
    this.dpiRatio =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.devicePixelRatio / ((this.ctx as any).backingStorePixelRatio ?? 1);

    this.canvas.style.width = `${this.canvasWidth}px`;
    this.canvas.style.height = `${this.canvasHeight}px`;
    this.canvas.width = this.canvasWidth * this.dpiRatio;
    this.canvas.height = this.canvasHeight * this.dpiRatio;

    if (this.lastRender != null) {
      this.render(
        this.lastRender.animation,
        this.lastRender.time,
        this.lastRender.optionValues,
      );
    }
  }

  render(
    animation: AnimationType<AnimationOptions>,
    time: number,
    optionValues: AnimationOptionValues<AnimationOptions>,
  ) {
    this.ctx.save();
    this.ctx.clearRect(
      0,
      0,
      this.canvasWidth * this.dpiRatio,
      this.canvasHeight * this.dpiRatio,
    );
    this.ctx.scale(this.dpiRatio, this.dpiRatio);

    animation.renderer.render(
      this.ctx,
      time,
      this.canvasWidth,
      this.canvasHeight,
      optionValues,
    );

    this.ctx.restore();

    this.lastRender = { animation, time, optionValues };
  }
}
