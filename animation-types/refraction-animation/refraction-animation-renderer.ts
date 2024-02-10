import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { drawArrow } from "../utils/arrows";
import { ink100, ink20, ink40, ink80, lightBlue } from "../utils/colors";
import { centerFrame } from "../utils/framing";
import { RefractionEnvironment } from "./functions";
import { RefractionAnimationOptions } from "./refraction-animation";

const width = 250;
const height = 250;

const arrowLength = 100;
const lightThickness = 2;
const surfaceThickness = 2;

const surfaceColor = ink40;
const normalColor = ink20;
const normalDash = [5, 5];
const incidentLightColor = ink80;
const refractedLightColor = lightBlue;
const materialTextColor = ink100;
const indexTextColor = ink80;
const textOffset = 14;
const textSize = "12px";

export class RefractionAnimationRenderer extends AnimationRenderer<RefractionAnimationOptions> {
  constructor(
    readonly top: RefractionEnvironment,
    readonly bottom: RefractionEnvironment,
  ) {
    super();
  }

  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    metrics: CanvasMetrics,
    options: AnimationOptionValues<RefractionAnimationOptions>,
  ): void {
    const showNormal = options.requireBoolean(
      RefractionAnimationOptions.normal,
    );
    const showMaterials = options.requireBoolean(
      RefractionAnimationOptions.materials,
    );

    ctx.save();
    centerFrame(ctx, metrics, width, height);
    ctx.translate(width / 2, height / 2);

    if (showNormal) {
      ctx.strokeStyle = normalColor;
      ctx.lineWidth = surfaceThickness;
      ctx.setLineDash(normalDash);
      ctx.beginPath();
      ctx.moveTo(0, -height / 2);
      ctx.lineTo(0, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.strokeStyle = surfaceColor;
    ctx.lineWidth = surfaceThickness;
    ctx.beginPath();
    ctx.moveTo(-width / 2, 0);
    ctx.lineTo(width / 2, 0);
    ctx.stroke();

    if (showMaterials) {
      this._renderText(
        ctx,
        -textOffset,
        this.top.materialName,
        this.top.refractiveIndex,
      );
      this._renderText(
        ctx,
        textOffset,
        this.bottom.materialName,
        this.bottom.refractiveIndex,
      );
    }

    const topAngle = this.top.angle(time) - Math.PI / 2;
    this._renderLight(ctx, topAngle, this.top.type);

    const bottomAngle = this.bottom.angle(time) + Math.PI / 2;
    this._renderLight(ctx, bottomAngle, this.bottom.type);

    ctx.restore();
  }

  private _renderLight(
    ctx: CanvasRenderingContext2D,
    angle: number,
    type: "incidence" | "refraction",
  ) {
    const x = Math.cos(angle) * arrowLength;
    const y = Math.sin(angle) * arrowLength;
    if (type === "incidence") {
      drawArrow(ctx, x, y, 0, 0, lightThickness, incidentLightColor);
    } else {
      drawArrow(ctx, 0, 0, x, y, lightThickness, refractedLightColor);
    }
  }

  private _renderText(
    ctx: CanvasRenderingContext2D,
    offset: number,
    materialName: string | null,
    refractiveIndex: number | null,
  ) {
    if (materialName) {
      ctx.fillStyle = materialTextColor;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.font = `bold ${textSize} Inter, sans-serif`;
      ctx.fillText(materialName, -width / 2, offset);
    }
    if (refractiveIndex) {
      ctx.fillStyle = indexTextColor;
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.font = `${textSize} Inter, sans-serif`;
      ctx.fillText(`n = ${refractiveIndex.toFixed(2)}`, width / 2, offset);
    }
  }
}
