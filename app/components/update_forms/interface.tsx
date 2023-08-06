import type { Macros, Category, Icon } from "~/types";

export interface UpdateIngredientsFormProps {
  data: any;
  categories: Category[];
  icons: Icon[];
  macros: Macros[];
}

export interface UpdateCategoriesFormProps {
  category: Category;
}

export interface UpdateIconsFormProps {
  icon: Icon;
}
