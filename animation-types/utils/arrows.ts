export function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  thickness: number,
  color: string,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  drawArrowOfLength(ctx, x1, y1, angle, length, thickness, color);
}

export function drawArrowOfLength(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  thickness: number,
  color: string,
) {
  // If length is given as a negative, draw the arrow in the opposite direction.
  const nLength = Math.abs(length);
  const nAngle = length < 0 ? angle + Math.PI : angle;

  if (nLength < thickness * 0.5) {
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(nAngle);

  const headLength = Math.min(thickness * 4, nLength * 0.75);
  const headWidth = thickness * 4;

  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.fillStyle = color;

  // Multiply by 0.75 to avoid a tiny gap between the arrow head and the line.
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(nLength - headLength * 0.75, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(nLength, 0);
  ctx.lineTo(nLength - headLength, headWidth * -0.5);
  ctx.lineTo(nLength - headLength, headWidth * 0.5);
  ctx.fill();

  ctx.restore();
}
