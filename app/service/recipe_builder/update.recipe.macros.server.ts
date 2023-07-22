import macro from "~/api/macro";
import computeTotalMacro from "./compute.macros.server";
import recipe from "~/api/recipe";

const computeNewMacroAfterToUpdateRecipe = async (
    recipeId: number,
) => {
    const foundRecipe = await recipe.findById(recipeId);

    if (!recipe) {
        throw new Error("Couldn't find recipe");
    }

    const macroRecipe = await computeTotalMacro(
        foundRecipe.measures,
        foundRecipe.servings,
    );

    const form = {
        id: foundRecipe.macros_id,
        calories: macroRecipe?.calories ?? 0,
        proteins: macroRecipe?.proteins ?? 0,
        carbs: macroRecipe?.carbs ?? 0,
        fat: macroRecipe?.fat ?? 0,
        water: macroRecipe?.water ?? 0,
    }

    const updatedMacroRecipe = await macro.update(form);

    return updatedMacroRecipe;
}

export default computeNewMacroAfterToUpdateRecipe;