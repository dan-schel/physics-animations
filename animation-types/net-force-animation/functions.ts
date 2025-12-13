export type Force = { magnitude: number; angle: number; color: string };
export type ForcesFunction = (time: number) => Force[];
