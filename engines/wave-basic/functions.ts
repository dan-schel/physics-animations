export type WaveFunction = (x: number, t: number) => number;

export function pulse(
  width: number,
  speed: number,
  height: number
): WaveFunction {
  return (x, t) => {
    const a = -x / (width / Math.PI) + t * speed;
    if (a < 0 || a > Math.PI) {
      return 0;
    }
    return -Math.sin(a) * height;
  };
}

export function reversePulse(
  width: number,
  speed: number,
  height: number,
  segments: number
): WaveFunction {
  return (x, t) => {
    const a = -(segments - x) / (width / Math.PI) + t * speed;
    if (a < 0 || a > Math.PI) {
      return 0;
    }
    return -Math.sin(a) * height;
  };
}

export function sine(
  width: number,
  speed: number,
  height: number
): WaveFunction {
  return (x, t) => {
    const a = -x / (width / Math.PI) + t * speed;
    if (a < 0) {
      return 0;
    }
    return -Math.sin(a) * height;
  };
}

export function reflect(wave: WaveFunction, segments: number): WaveFunction {
  return (x, t) => {
    return wave((segments - 1) * 2 - x, t);
  };
}

export function reflectAndInvert(
  wave: WaveFunction,
  segments: number
): WaveFunction {
  return (x, t) => {
    return -wave((segments - 1) * 2 - x, t);
  };
}
