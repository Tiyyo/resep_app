import { Measures } from "~/types/recipe";
import calcQty from "./calc.qty.server";

const computeTotalMacro = async (measures: Measures, servings: number) => {
  const result = measures
    .map((m) => {
      if (typeof m.ingredient === "number") return;
      if (!m.ingredient.macros) {
        return {
          calories: 0,
          proteins: 0,
          carbs: 0,
          fat: 0,
          water: 0,
        };
      }
      return {
        calories: (calcQty(m) * (m.ingredient.macros.calories as number)) / 100,
        proteins: (calcQty(m) * (m.ingredient.macros.proteins as number)) / 100,
        carbs: (calcQty(m) * (m.ingredient.macros.carbs as number)) / 100,
        fat: (calcQty(m) * (m.ingredient.macros.fat as number)) / 100,
        water: (calcQty(m) * (m.ingredient.macros.water as number)) / 100,
      };
    })
    .reduce((acc, curr) => {
      if (!acc || !curr) return;
      return {
        calories: acc.calories + curr.calories,
        proteins: acc.proteins + curr.proteins,
        carbs: acc.carbs + curr.carbs,
        fat: acc.fat + curr.fat,
        water: acc.water + curr.water,
      };
    });

  if (!result) return;
  const keys = Object.keys(result) as (keyof typeof result)[];
  keys.forEach((key) => {
    result[key] = +(result[key] / servings).toFixed(1);
  });
  return result;
};

export default computeTotalMacro;
