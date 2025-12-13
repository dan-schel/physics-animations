export function degToRad(degrees: number) {
  return (degrees / 180) * Math.PI;
}

/** @knipignore */
export function radToDeg(radians: number) {
  return (radians / Math.PI) * 180;
}
