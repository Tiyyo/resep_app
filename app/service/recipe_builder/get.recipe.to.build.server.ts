import { RecipeRawForm } from "~/types/recipe";
import convertRecipeFormToNumber from "./convert.recipe.form.number.server";
import ServerError from "~/helpers/errors/server.error";
import recipe from "~/api/recipe";

const getRecipeToBuild = async (rawForm: RecipeRawForm) => {
    const rawRecipe = convertRecipeFormToNumber(rawForm);

    try {
        const newRecipeId = await recipe.add(rawRecipe);
        if (!newRecipeId) throw new Error("Couldn't add recipe to database")

        const partialRecipe = await recipe.findById(newRecipeId);
        return partialRecipe;

    } catch (error: any) {
        throw new ServerError(error.message)
    }
}

export default getRecipeToBuild;