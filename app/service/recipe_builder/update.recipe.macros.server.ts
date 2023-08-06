import macro from "~/api/macro";
import computeTotalMacro from "./compute.macros.server";
import recipe from "~/api/recipe";
import NotFoundError from "~/helpers/errors/not.found.error";

const computeNewMacroAfterToUpdateRecipe = async (recipeId: number) => {
  const foundRecipe = await recipe.findById(recipeId);

  if (!foundRecipe) {
    throw new NotFoundError("Couldn't find recipe");
  }

  if (!foundRecipe.measures) {
    throw new NotFoundError("Couldn't find recipe measures");
  }

  const macroRecipe = await computeTotalMacro(
    foundRecipe.measures,
    foundRecipe.servings
  );

  const form = {
    id: foundRecipe.macros_id,
    calories: macroRecipe?.calories ?? 0,
    proteins: macroRecipe?.proteins ?? 0,
    carbs: macroRecipe?.carbs ?? 0,
    fat: macroRecipe?.fat ?? 0,
    water: macroRecipe?.water ?? 0,
  };

  const updatedMacroRecipe = await macro.update(form);

  return updatedMacroRecipe;
};

export default computeNewMacroAfterToUpdateRecipe;
