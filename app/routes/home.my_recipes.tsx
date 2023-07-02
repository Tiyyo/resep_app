import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRecipesByUser } from "~/api/get.many.by.id";
import RecipeCard from "~/components/recipe/card";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
  try {
    const profile = await getProfile(request);
    if (!profile || !profile.id) {
      return json({ message: "no user found" }, { status: 400 });
    }
    const recipes = await getRecipesByUser(profile.id);
    return json({ recipes });
  } catch (error : any) {
    return json({ message: error.message }, { status: 500 });
  }
}

export default function () {
  const {recipes} = useLoaderData();

  return (
    <div className="flex gap-4 justify-start p-4 flex-wrap">
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
  );
}
