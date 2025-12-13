import React from "react";
import type { SVGProps } from "react";

// Can't remember the Unicons icon name for this one. :(
export function TextIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M13 16H3a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2ZM3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2Zm18 3H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Z"
      />
    </svg>
  );
}
