import type { Ingredient, UnitMeasure } from "~/types";

export interface MeasureProps {
  ingredients: Ingredient[];
  units: UnitMeasure[];
  remove: (event: React.MouseEvent<HTMLElement>) => void;
  clear: boolean;
  index: number;
}
