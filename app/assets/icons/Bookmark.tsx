import type { Icons } from "./interface";

export default function BookmarkIcon({
  size,
  outlineColor,
  fillColor,
  height,
  width,
}: Icons) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#fbe3c8"
      viewBox={`0 0 ${size ? size : "24"} ${size ? size : "24"}`}
      strokeWidth={1.5}
      stroke={outlineColor ? outlineColor : "current"}
      className={`fill-${fillColor ? fillColor : "transparent"} stroke-${
        outlineColor ? outlineColor : "none"
      } w-${height ? height : 6} h-${width ? width : 6}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}
