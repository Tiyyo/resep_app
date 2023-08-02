import type { Measure } from "~/types/recipe";

export interface MeasureFetch extends Measure {
  ingredient_id: number;
  recipe_id: string;
}

export interface IngredientItemProps {
  measures: Array<MeasureFetch>;
  servings: number;
}
