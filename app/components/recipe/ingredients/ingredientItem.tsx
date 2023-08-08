import { displayQty } from "~/components/fraction/display.qty";
import type { IngredientItemProps } from "./interface";

export default function IngredientItem({
  measure,
  servings,
  originalServings,
}: IngredientItemProps) {
  return (
    <div className="py-.5 mx-1 flex max-h-8 items-center justify-between rounded-2xl px-1.5">
      <div className="flex items-center gap-x-4 pl-2 ">
        <img
          src={measure?.ingredient?.icon?.link}
          alt=""
          className="h-8 w-8 rounded-full"
        />
        <span className="text-8">{measure.ingredient?.name}</span>
      </div>
      <div className="pr-6 text-8 text-text-300 opacity-80">
        {displayQty(
          Number(measure.qty),
          measure.unit_measure?.abreviation ?? "",
          servings,
          originalServings
        )}
      </div>
    </div>
  );
}
