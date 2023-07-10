import { LoaderArgs, json } from "@remix-run/node";
import { getRandomRecipes } from "~/api/get.many.by.request";

export async function loader({ params }: LoaderArgs) {
    if (!params) return json({ error: "No params provided" }, { status: 500 })
    const numOfRecipes = params.recipes
    const recipes = await getRandomRecipes(Number(numOfRecipes));
    if (!recipes) return json({ error: "Couldn't load any recipes" }, { status: 500 })
    return recipes
}