import { unitFormatFraction } from "~/constants/unit.format";
import findNearestFraction from "./find.nearest.fraction";

export const displayQty = (
  qty: number,
  unitAbreviation: string,
  servings: number,
  originalServings: number
) => {
  if (unitAbreviation === "pch") return qty + " " + unitAbreviation;

  if (unitFormatFraction.includes(unitAbreviation)) {
    let newQty = (servings * qty) / originalServings;

    return (
      <div className="flex items-center gap-x-1">
        <>{findNearestFraction(newQty, 4)}</>
        {unitAbreviation}
      </div>
    );
  }
  let newQty = (servings * qty) / originalServings;
  if (Number.isInteger(newQty))
    return newQty.toFixed(0) + " " + unitAbreviation;
  return findNearestFraction(newQty, 1) + " " + unitAbreviation;
};
