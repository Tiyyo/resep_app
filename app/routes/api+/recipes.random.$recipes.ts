import type { LoaderArgs } from "@remix-run/node";
import recipe from "~/api/recipe";
import ServerError from "~/helpers/errors/server.error";
import ResponseError from "~/helpers/response/response.error";

export async function loader({ params }: LoaderArgs) {
  try {
    if (!params) throw new ServerError("No params found");

    const numOfRecipes = params.recipes;

    const recipes = await recipe.findRandom(Number(numOfRecipes));

    if (!recipes) throw new ServerError("No recipes found");

    return recipes;
  } catch (error) {
    return new ResponseError(error);
  }
}
