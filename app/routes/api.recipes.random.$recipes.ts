import { LoaderArgs, json } from "@remix-run/node";
import recipe from "~/api/recipe";

export async function loader({ params }: LoaderArgs) {
    if (!params) return json({ error: "No params provided" }, { status: 500 })
    const numOfRecipes = params.recipes
    const recipes = await recipe.findRandom(Number(numOfRecipes));
    if (!recipes) return json({ error: "Couldn't load any recipes" }, { status: 500 })
    return recipes
}