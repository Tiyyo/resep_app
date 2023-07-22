import { json, type LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import recipe from '~/api/recipe';
import RecipeCard from '~/components/recipe/card';
import ResponseError from '~/helpers/response/response.error';
import LayoutRecipePages from '~/layout/LayoutRecipesPage';
import { getProfile } from '~/utils/get.user.infos';
import isLikedByUser from '~/utils/is.liked.by.user';

export async function loader({ request }: LoaderArgs) {
  try {
    const profile = await getProfile(request);
    const profileId = profile?.id;
    if (!profileId) throw new Error('No user found : unauthorized');
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
      <div className="flex gap-4 justify-start p-4 flex-wrap">
        {recipes &&
          recipes.length > 0 &&
          recipes.map((recipe: any) => {
            // TODO: fix type
            return (
              <RecipeCard
                key={recipe.id}
                recipeId={recipe.id}
                imageLink={recipe.image?.link}
                recipeName={recipe.name}
                recipeCalories={recipe.macros.calories}
                isLiked={isLikedByUser(recipe, profileId)}
              />
            );
          })}
      </div>
    </LayoutRecipePages>
  );
}
