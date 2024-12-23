import type { SVGProps } from "react";
import React from "react";

export function EmbedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      focusable="false"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.6667 4H5.33333C4.59695 4 4 4.59695 4 5.33333V14.6667C4 15.403 4.59695 16 5.33333 16H14.6667C15.403 16 16 15.403 16 14.6667V5.33333C16 4.59695 15.403 4 14.6667 4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>

      <path
        d="M8 6.66699L12 9.99933L8 13.3327V6.66699Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
