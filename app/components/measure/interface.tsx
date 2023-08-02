import type {
  Ingredient,
  UnitMeasure,
} from "~/service/recipe_builder/index.server";

export interface MeasureProps {
  ingredients: Array<Ingredient>;
  units: Array<UnitMeasure>;
  remove: (event: React.MouseEvent<HTMLElement>) => void;
  clear: boolean;
  index: number;
}
