export type Force = { magnitude: number; angle: number; color: string };
export type ForcesFunction = (time: number) => Force[];

export function constant(forces: Force[]): ForcesFunction {
  return (_time: number) => {
    return forces;
  };
}
