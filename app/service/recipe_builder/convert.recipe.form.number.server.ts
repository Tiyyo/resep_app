import { RecipeRawForm } from "~/types/recipe";

const convertRecipeFormToNumber = (rawForm: RecipeRawForm) => {
  const convertRecipe = {
    name: rawForm.name,
    prepTime: parseInt(rawForm.prepTime, 10),
    cookTime: parseInt(rawForm.cookTime, 10),
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
        ingredient: parseInt(m.ingredient, 10),
        unit_measure: parseInt(m.unit_measure, 10),
      };
    }),
  };
  return convertRecipe;
};

export default convertRecipeFormToNumber;
