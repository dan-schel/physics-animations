export abstract class AnimationEngine {
  private resizeEvent: EventListener | null = null;

  private width = 0;
  private height = 0;
  private dpiRatio = 1;
  private destroyed = false;

  private time = 0;
  private isPaused = false;

  constructor() {}

  init(canvas: HTMLCanvasElement) {
    if (this.destroyed) {
      throw new Error("Cannot initialize destroyed engine.");
    }

    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("Failed to get 2D context for canvas.");
    }

    this.resize(canvas, ctx);
    this.resizeEvent = () => this.resize(canvas, ctx);
    window.addEventListener("resize", this.resizeEvent);

    this.beginRenderLoop(ctx);
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

  destroy(): void {
    if (this.resizeEvent != null) {
      window.removeEventListener("resize", this.resizeEvent);
    }
    this.destroyed = true;
  }

  beginRenderLoop(ctx: CanvasRenderingContext2D): void {
    let lastTime = performance.now();
    const renderLoop = () => {
      if (this.destroyed) {
        return;
      }

      const time = performance.now();
      const deltaTime = time - lastTime;
      if (!this.isPaused) {
        this.time += deltaTime;
      }

      ctx.save();
      ctx.fillStyle = "#000000";
      ctx.fillRect(
        0,
        0,
        this.width * this.dpiRatio,
        this.height * this.dpiRatio
      );
      ctx.scale(this.dpiRatio, this.dpiRatio);

      this.render(ctx, this.time, this.width, this.height);
      requestAnimationFrame(renderLoop);

      ctx.restore();
    };
    requestAnimationFrame(renderLoop);
  }

  pause(): void {
    this.isPaused = true;
  }

  unpause(): void {
    this.isPaused = false;
  }

  getTime(): number {
    return this.time;
  }

  setTime(time: number): void {
    this.time = time;
  }

  abstract render(
    ctx: CanvasRenderingContext2D,
    time: number,
    width: number,
    height: number
  ): void;
}
