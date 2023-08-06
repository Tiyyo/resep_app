import type { Macros } from "~/types";

export interface Parts {
  proteins: number | null;
  carbs: number | null;
  fat: number | null;
}

export interface LinearMacrosProportionProps {
  macros: Macros;
}
