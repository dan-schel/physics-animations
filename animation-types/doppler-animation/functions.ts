export type PositionFunction = (time: number) => { x: number; y: number };

export function sine(period: number, width: number): PositionFunction {
  return (time: number) => ({
    x: Math.sin((time / period) * Math.PI * 2) * width,
    y: 0,
  });
}

export function stationary(x: number, y: number): PositionFunction {
  return () => ({ x, y });
}
