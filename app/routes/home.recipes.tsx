import { json, type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getRecipes } from "~/api/get.all.request";
import RecipeCard from "~/components/recipe/card";
import { getProfile } from "~/utils/get.user.infos";
import { isLikedByUser } from "~/utils/is.liked.by.user";

export async function loader({ request }: LoaderArgs) {
  const profile = await getProfile(request);
  const recipes = await getRecipes();
  if (!profile || !profile.id) {
    return json({ message: "no user found", recipes }, { status: 400 });
  }
  const profileId = profile.id;
  return json({ recipes, profileId });
}

export default function () {
  const { recipes, profileId } = useLoaderData();

  console.log(profileId, recipes);

  return (
    <div>
      <Outlet />
      {recipes && recipes.length > 0 && (
        <div className="flex gap-4 justify-center p-4 flex-wrap">
          {recipes.map((recipe: any) => {
            //  TODO: fix type
            return (
              <RecipeCard
                key={recipe.id}
                recipeId={recipe.id}
                imageLink={recipe.image?.link}
                recipeName={recipe.name}
                recipeCalories={recipe.macro_recipe?.calories}
                isLiked={isLikedByUser(recipe, profileId)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
