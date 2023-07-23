import type { Macros } from "~/service/recipe_builder/index.server";

export interface Parts {
  proteins: number | null;
  carbs: number | null;
  fat: number | null;
}

export interface LinearMacrosProportionProps {
  macros: Macros;
}
