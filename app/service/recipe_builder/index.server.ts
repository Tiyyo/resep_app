import recipe from "~/api/recipe";
import ServerError from "~/helpers/errors/server.error";
import type { RecipeRawForm } from "~/types/index";
import computeTotalMacro from "./compute.macros.server";
import getRecipeToBuild from "./get.recipe.to.build.server";

export async function buildRecipe(rawForm: RecipeRawForm) {
  const partialRecipe = await getRecipeToBuild(rawForm);

  if (!partialRecipe || !partialRecipe.measures) {
    throw new ServerError(
      "Couldn't add raw data to the database. Couldn't get recipe from database"
    );
  }

  // TODO : fix typescript error -- partialRecipe.measures is not a Measures type -- thought best way to fix it is to optimize query to get only necessary data
  const macroRecipe = await computeTotalMacro(
    partialRecipe.measures,
    partialRecipe.servings
  );

  if (!macroRecipe) return;

  const updateRecipe = await recipe.addMacro(macroRecipe, partialRecipe.id);

  return updateRecipe;
}
