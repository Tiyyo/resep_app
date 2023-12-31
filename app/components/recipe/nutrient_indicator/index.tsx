import displayValue from "~/utils/display.value.one.float";
import type { NutrientIndicatorProps } from "./interface";

export default function NutrientIndicator({
  Icon,
  value,
  unit,
  addText,
}: NutrientIndicatorProps) {
  return (
    <div className="macro my-2 flex flex-col items-center justify-center gap-y-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-300 p-2 text-text-200 shadow-facebook">
        {Icon}
      </div>
      <p className="center flex-col text-7 text-text-accent">
        <span>
          {displayValue(value)}
          {unit}
        </span>
        <span>{addText}</span>
      </p>
    </div>
  );
}
