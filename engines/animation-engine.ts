export abstract class AnimationEngine {
  private resizeEvent: EventListener | null = null;

  private width = 0;
  private height = 0;
  private dpiRatio = 1;
  private detached = false;

  private time = 0;
  private lastTimestamp: number | null = null;
  private playback: "playing" | "held" | "paused" = "playing";

  constructor() {}

  attachCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("Failed to get 2D context for canvas.");
    }

    this.detached = false;
    this.resize(canvas, ctx);
    this.resizeEvent = () => this.resize(canvas, ctx);
    window.addEventListener("resize", this.resizeEvent);

    this.beginRenderLoop(ctx);
  }

  detachCanvas(): void {
    if (this.resizeEvent != null) {
      window.removeEventListener("resize", this.resizeEvent);
    }
    this.detached = true;
  }

  private resize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const parent = canvas.parentElement;
    if (parent == null) {
      throw new Error("Failed to resize the canvas. It has no parent element.");
    }

    const size = parent.getBoundingClientRect();
    this.width = size.width;
    this.height = size.height;
    this.dpiRatio =
      window.devicePixelRatio / ((ctx as any).backingStorePixelRatio ?? 1);

    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;
    canvas.width = this.width * this.dpiRatio;
    canvas.height = this.height * this.dpiRatio;
  }

  beginRenderLoop(ctx: CanvasRenderingContext2D): void {
    const renderLoop = (timestamp: number) => {
      if (this.detached) {
        return;
      }

      if (!this.isPaused()) {
        const delta =
          this.lastTimestamp == null ? 0 : timestamp - this.lastTimestamp;
        this.time += delta / 1000;
        this.lastTimestamp = timestamp;
      }

      ctx.save();
      ctx.clearRect(
        0,
        0,
        this.width * this.dpiRatio,
        this.height * this.dpiRatio
      );
      ctx.scale(this.dpiRatio, this.dpiRatio);

      this.render(ctx, this.time, this.width, this.height);
      requestAnimationFrame((timestamp) => renderLoop(timestamp));

      ctx.restore();
    };
    requestAnimationFrame((timestamp) => renderLoop(timestamp));
  }

  isPaused(explicitly = false): boolean {
    return explicitly ? this.playback == "paused" : this.playback != "playing";
  }

  pause(explicit: boolean): void {
    if (this.playback === "playing") {
      this.playback = explicit ? "paused" : "held";
      this.lastTimestamp = null;
    }
  }

  unpause(explicit: boolean): void {
    if (explicit || this.playback !== "paused") {
      this.playback = "playing";
    }
  }

  getTime(): number {
    return this.time;
  }

  setTime(time: number): void {
    this.time = time;
  }

  abstract getDuration(): number;

  abstract isLooping(): boolean;

  abstract render(
    ctx: CanvasRenderingContext2D,
    time: number,
    width: number,
    height: number
  ): void;
}
