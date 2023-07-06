import { json, type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getRecipes } from "~/api/get.all.request";
import { getLastRecipes, getRecipesByTags } from "~/api/get.many.by.id";
import Carousel from "~/components/carousel";
import RecipeCard from "~/components/recipe/card";
import { getProfile } from "~/utils/get.user.infos";
import { isLikedByUser } from "~/utils/is.liked.by.user";

export async function loader({ request }: LoaderArgs) {
  const profile = await getProfile(request);
  const recipes = await getRecipes();
  const lastestRecipes = await getLastRecipes();
  const asianRecipes = await getRecipesByTags(["Asia", "Japan", "China"]);
  const italienRecipes = await getRecipesByTags(["Italy"]);
  if (!profile || !profile.id) {
    return json({ message: "no user found", recipes }, { status: 400 });
  }
  const profileId = profile.id;
  return json({ recipes, profileId, asianRecipes, lastestRecipes, italienRecipes });
}

export default function () {
  const { recipes, profileId, asianRecipes, lastestRecipes, italienRecipes } = useLoaderData();



  return (
    <div>
      <Outlet />
      <Carousel title="Just added" recipes={lastestRecipes} profileId={profileId} />
      <div className=" flex gap-x-4 my-8 ">
        <img
          src="/images/banner_asia.webp"
          alt="banner"
          className="aspect-2/1 max-h-[290px] object-cover rounded-2xl"
        />
        <div className="flex gap-x-4">
          {asianRecipes &&
            asianRecipes.length > 0 &&
            asianRecipes.map((recipe: any):JSX.Element => {
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

      </div>
      <div className="my-8">
      <img
          src="/images/banner_italy.webp"
          alt="banner"
          className="aspect-2/1 max-h-[290px] object-cover rounded-2xl"
        />
      <div className="flex gap-x-4">
          {italienRecipes &&
            italienRecipes.length > 0 &&
            italienRecipes.map((recipe: any):JSX.Element => {
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
        </div>
    </div>
  );
}
