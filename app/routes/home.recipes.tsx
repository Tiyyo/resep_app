import { json, type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getRecipes } from "~/api/get.all.request";
import RecipeCard from "~/components/recipe/card";

export async function loader({ request }: LoaderArgs) {
  const recipes = await getRecipes();
  return json({recipes});
}

export default function () {
  const {recipes} = useLoaderData();
  console.log(recipes);


  return (
    <div>
      <Outlet />
      <div className="flex gap-4 justify-center p-4 flex-wrap">
        {recipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              recipeId={recipe.id}
              imageLink={recipe.image.link}
              recipeName={recipe.name}
              recipeCalories={recipe.macro_recipe.calories}
              isLiked={recipe?.reviews[0]?.is_liked}
            />
          );
        })}
      </div>
    </div>
  );
}
