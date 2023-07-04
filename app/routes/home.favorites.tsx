import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getFavoriteRecipes } from "~/api/get.many.by.id";
import RecipeCard from "~/components/recipe/card";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
  const profile = await getProfile(request);
  if (profile && profile.id) {
    const favoriteRecipes = await getFavoriteRecipes(profile.id);
    return { favoriteRecipes };
  }
}

export default function FavoriteRecipes() {
  const { favoriteRecipes } = useLoaderData();

  return (
    <div className="flex gap-4 justify-start p-4 flex-wrap">
      {favoriteRecipes &&
        favoriteRecipes.length > 0 &&
        favoriteRecipes.map((recipe: any) => {
          //  TODO: fix type
          return (
            <RecipeCard
              key={recipe.id}
              recipeId={recipe.id}
              imageLink={recipe.image.link}
              recipeName={recipe.name}
              recipeCalories={recipe.macro_recipe.calories}
              isLiked={true}
            />
          );
        })}
    </div>
  );
}
