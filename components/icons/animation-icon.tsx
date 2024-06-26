import React from "react";
import type { SVGProps } from "react";

// Can't remember the Unicons icon name for this one. :(
export function AnimationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15 2a6.998 6.998 0 0 0-6.88 5.737a6 6 0 0 1 8.143 8.143A6.997 6.997 0 0 0 15 2z"
        opacity=".25"
      />
      <circle cx="7" cy="17" r="5" fill="currentColor" />
      <path
        fill="currentColor"
        d="M11 7a6 6 0 0 0-5.97 5.406a4.997 4.997 0 0 1 6.564 6.564A6 6 0 0 0 11 7z"
        opacity=".5"
      />
    </svg>
  );
}
