import { displayValue } from "~/utils/display.value.one.float";
import type { NutrientIndicatorProps } from "./interface"


export default function NutrientIndicator({Icon, value , addText}: NutrientIndicatorProps) {
  
  return (
    <div className="flex flex-col gap-y-2 items-center justify-center my-2 macro">
      <div className="rounded-full text-text-200 flex items-center justify-center h-10 w-10 bg-primary-300 p-2 shadow-facebook">
        {Icon}
      </div>
      <p className="text-7 text-text-accent">
        {displayValue(value)} {" "}
        {addText}
      </p>
    </div>
  );
}
