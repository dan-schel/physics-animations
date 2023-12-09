"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./animation-canvas.module.scss";
import { AnimationType } from "@/animation-types/animation-type";
import {
  AnimationOptionValues,
  AnimationOptions,
} from "@/animation-types/animation-options";
import { CanvasMetrics } from "@/animation-types/animation-renderer";

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

  private canvasMetrics: CanvasMetrics | null = null;

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
    const canvasWidth = size.width;
    const canvasHeight = size.height;
    const dpiRatio =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.devicePixelRatio / ((this.ctx as any).backingStorePixelRatio ?? 1);

    this.canvas.style.width = `${canvasWidth}px`;
    this.canvas.style.height = `${canvasHeight}px`;
    this.canvas.width = canvasWidth * dpiRatio;
    this.canvas.height = canvasHeight * dpiRatio;

    const style = window.getComputedStyle(document.documentElement);
    const remSize = parseInt(style.fontSize);
    const docWidth = document.documentElement.getBoundingClientRect().width;
    const isDesktopLayout = docWidth >= 60 * remSize;

    this.canvasMetrics = {
      canvasWidth,
      canvasHeight,
      dpiRatio,
      remSize,
      isDesktopLayout,
    };

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
    if (this.canvasMetrics == null) {
      return;
    }

    const { canvasWidth, canvasHeight, dpiRatio } = this.canvasMetrics;

    this.ctx.save();
    this.ctx.clearRect(0, 0, canvasWidth * dpiRatio, canvasHeight * dpiRatio);
    this.ctx.scale(dpiRatio, dpiRatio);
    animation.renderer.render(this.ctx, time, this.canvasMetrics, optionValues);
    this.ctx.restore();

    this.lastRender = { animation, time, optionValues };
  }
}
