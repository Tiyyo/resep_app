import { Icons } from "./interface";
export default function ({
  size,
  outlineColor,
  fillColor,
  height,
  width,
}: Icons) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`0 0 ${size ? size : "24"} ${size ? size : "24"}`}
      strokeWidth={2.5}
      // stroke={outlineColor ? outlineColor : "current"}
      // stroke="#f1c997D"
      stroke="#fbe3c8"
      className={`fill-${fillColor ? fillColor : "transparent"} stroke-${
        outlineColor ? outlineColor : "none"
      } w-${height ? height : "6"} h-${width ? width : "6"}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
}
