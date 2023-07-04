import type { Measure } from "~/types/recipe";

// interface IngredientsList {
//   ingredients: Array<Ingredients>;
//   measures: Array<Measure>;
// }

export interface IngredientItemProps {
  measure: Measure;
  servings: number;
  originalServings: number;
}
