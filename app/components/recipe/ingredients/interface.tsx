import type { Measure } from "~/types/index";

export interface IngredientItemProps {
  measure: Measure;
  servings: number;
  originalServings: number;
}

export interface IngredientListProps {
  measures: Measure[];
  servings: number;
}
