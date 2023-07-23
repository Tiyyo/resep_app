import StarEmptyIcon from "~/assets/icons/StarEmptyIcon";
import StarFilledIcon from "~/assets/icons/StarFilledIcon";
import StarHalfFilledIcon from "~/assets/icons/StarHalfFiled";
import type { StarProps } from "./interface";

export default function Star({ position, rating }: StarProps) {
  const determinant = rating - position;

  return (
    <div className="relative text-secondary-300 ">
      <div className={`absolute ${determinant >= 0.9 ? "" : "hidden"}`}>
        <StarFilledIcon />
      </div>
      <div
        className={`absolute ${
          determinant >= 0.5 && determinant < 0.9 ? "" : "hidden"
        }`}
      >
        <StarHalfFilledIcon />
      </div>
      <div className={`absolute ${determinant > 0.5 ? "hidden" : ""}`}>
        <StarEmptyIcon />
      </div>
    </div>
  );
}
