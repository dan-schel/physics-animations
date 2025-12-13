export type RefractionEnvironment = {
  type: "incidence" | "refraction";
  angle: RefractionAngle;
  materialName: string | null;
  refractiveIndex: number | null;
};

type RefractionAngle = (time: number) => number;

export function criticalAngle(n1: number, n2: number): number {
  return Math.asin(n2 / n1);
}

export function snellsLaw(
  n1: number,
  n2: number,
  angle1: number,
  fudge: number = 0,
): number {
  const critical = n2 < n1 ? criticalAngle(n1, n2) : Number.MAX_VALUE;
  if (angle1 < critical) {
    // Refraction.
    return Math.asin((n1 / n2) * Math.sin(angle1));
  } else if (angle1 > critical + fudge) {
    // Total internal reflection.
    return -angle1 + Math.PI;
  } else {
    // Show the critical angle even if we're a tiny bit (the fudge amount) over.
    return Math.PI * 0.5;
  }
}

/**
 * Uses the point of inflection of cubic function to slow down time at the
 * midway point.
 * @param time The current time.
 * @param duration The total duration.
 * @param smoothing A value between 0 and 1, where 0 uses the cubic function
 * alone and 1 is entirely linear.
 */
export function inverseCubicEasing(
  time: number,
  duration: number,
  smoothing: number,
) {
  const t = time / duration;
  const a = smoothing;
  const easing = 4 * (1 - a) * (t - 0.5) ** 3 + a * (t - 0.5) + 0.5;
  return easing * duration;
}
