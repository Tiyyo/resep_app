import { Measure } from "~/types/recipe";

const calcQty = (measure: Measure): number => {
  let qty = 1;
  if (
    typeof measure.unit_measure === "number" ||
    typeof measure.ingredient === "number"
  )
    return 0;

  if (
    measure.unit_measure.name === "pieces" &&
    measure.ingredient.unit_weight
  ) {
    qty = (measure.qty as number) * (measure.ingredient?.unit_weight as number);
    return qty;
  }
  if (measure.unit_measure.equivalent) {
    qty = (measure.qty as number) * (measure.unit_measure.equivalent as number);
    return qty;
  }
  return qty;
};

export default calcQty;
