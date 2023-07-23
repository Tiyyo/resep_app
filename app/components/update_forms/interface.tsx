import type {
  Ingredient,
  Macros,
  Icon,
} from "../../service/recipe_builder/index.server";
import type { Category } from "../categories/interface";

export interface UpdateMacrosFormProps {
  data: Macros;
}

export interface UpdateIngredientsFormProps {
  data: any;
  categories: Category[];
  icons: Icon[];
  macros: Macros[];
}

// export interface UpdateRecipeFormProps {}

// export interface UpdateUnitMeasuresFormProps {}

export interface UpdateCategoriesFormProps {
  category: Category;
}

export interface UpdateIconsFormProps {
  icon: Icon;
}
