import { UNIT_FORMAT_FRACTION } from "~/constants/unit.format";
import findNearestFraction from "./find.nearest.fraction";

export const displayQty = (qty: number, unitAbreviation: string, servings : number, originalServings : number) => {

  if (unitAbreviation === "pch") return qty + " " + unitAbreviation;

  if (UNIT_FORMAT_FRACTION.includes(unitAbreviation)) {
    let newQty = (servings * qty) / originalServings;

    return (
      <div className="flex gap-x-1 items-center">
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
