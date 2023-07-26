import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import recipe from "~/api/recipe";
import RecipeContainer from "~/components/container";
import RecipeCard from "~/components/recipe/card";
import ResponseError from "~/helpers/response/response.error";
import LayoutRecipePages from "~/layout/LayoutRecipesPage";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
  try {
    const profile = await getProfile(request);
    const profileId = profile?.id;
    if (!profileId) throw new Error("No user found : unauthorized");
    const recipes = await recipe.findByAuthor(profileId);
    return json({ recipes, profileId });
  } catch (error: any) {
    return new ResponseError(error);
  }
}

export default function () {
  const { recipes, profileId } = useLoaderData();

  return (
    <LayoutRecipePages title="Your recipes">
      <RecipeContainer Card={RecipeCard} data={recipes} profileId={profileId} />
    </LayoutRecipePages>
  );
}
