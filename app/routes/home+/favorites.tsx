import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import recipe from "~/api/recipe";
import RecipeContainer from "~/components/container";
import RecipeCard from "~/components/recipe/card";
import LayoutRecipePages from "~/layout/LayoutRecipesPage";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
  const profile = await getProfile(request);
  if (!profile) return { favoriteRecipes: [] };
  const favoriteRecipes = await recipe.findLikedByUser(profile.id);
  return { favoriteRecipes };
}

export default function FavoriteRecipes() {
  const { favoriteRecipes } = useLoaderData();

  return (
    <LayoutRecipePages title="Recipes you liked">
      <RecipeContainer
        Card={RecipeCard}
        data={favoriteRecipes}
        likeByDefault={true}
      />
    </LayoutRecipePages>
  );
}
