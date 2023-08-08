import type { RecipeRawForm } from "~/types/index";

const convertRecipeFormToNumber = (rawForm: RecipeRawForm) => {
  const convertRecipe = {
    name: rawForm.name,
    prep_time: parseInt(rawForm.prep_time, 10),
    cook_time: parseInt(rawForm.cook_time, 10),
    author_id: parseInt(rawForm.author),
    servings: parseInt(rawForm.servings, 10),
    level: rawForm.level,
    tags: rawForm.tags ?? undefined,
    image: rawForm.image ?? undefined,
    ytLink: rawForm.ytLink ?? undefined,
    instructions: rawForm.instructions,
    measures: rawForm.measures.map((m) => {
      return {
        qty: parseFloat(m.qty),
        ingredient_id: parseInt(m.ingredient, 10),
        unit_measure_id: parseInt(m.unit_measure, 10),
      };
    }),
  };
  return convertRecipe;
};

export default convertRecipeFormToNumber;
