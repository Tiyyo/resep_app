import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRecipes } from "~/api/get.all.request";
import RecipeCard from "~/components/recipe/card";

export async function loader({ request }: LoaderArgs) {
  const recipes = await getRecipes();

  return json(recipes);
}

export default function () {
  const recipes = useLoaderData();

  return (
    <div className="flex gap-x-4 justify-start p-4">
      {recipes.map((recipe) => {
        return (
          <RecipeCard
            key={recipe.id}
            recipeId={recipe.id}
            imageLink={recipe.image.link}
            recipeName={recipe.name}
            recipeCalories={recipe.macro_recipe.calories}
          />
        );
      })}
    </div>
  );
}
