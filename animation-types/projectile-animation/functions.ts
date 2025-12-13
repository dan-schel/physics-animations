type MotionFunction = (time: number) => number;
export type ProjectileMotionValues = {
  angle: number;
  positionX: MotionFunction;
  positionY: MotionFunction;
  velocityX: MotionFunction;
  velocityY: MotionFunction;
  accelerationX: MotionFunction;
  accelerationY: MotionFunction;
};

export function projectileMotionFunctions(
  angle: number,
  velocity: number,
  gravity: number,
): ProjectileMotionValues {
  const initialVelocityX = velocity * Math.cos(angle);
  const initialVelocityY = velocity * Math.sin(angle);
  const positionX = (time: number) => {
    return initialVelocityX * time;
  };
  const positionY = (time: number) => {
    return initialVelocityY * time - 0.5 * gravity * time ** 2;
  };
  const velocityX = (_time: number) => {
    return initialVelocityX;
  };
  const velocityY = (time: number) => {
    return initialVelocityY - gravity * time;
  };
  const accelerationX = (_time: number) => {
    return 0;
  };
  const accelerationY = (_time: number) => {
    return -gravity;
  };

  return {
    angle,
    positionX,
    positionY,
    velocityX,
    velocityY,
    accelerationX,
    accelerationY,
  };
}

export function cannonRecoil(
  time: number,
  duration: number,
  size: number,
): number {
  if (time > duration) {
    return 0;
  }
  return (-4 * size * time * (time - duration)) / duration ** 2;
}

export function cannonMouth(mouthX: number, mouthY: number, angle: number) {
  return {
    x: mouthX * Math.cos(angle) - mouthY * Math.sin(angle),
    y: mouthX * Math.sin(angle) + mouthY * Math.cos(angle),
  };
}
