import { json, type LoaderArgs } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import Label from '~/components/label';
import AddFavoriteIcon from '~/components/like_icon';
import RatingIndicator from '~/components/rating/RatingIndicator';
import CommentSection from '~/components/recipe/comment_section';
import LinearMacrosProportion from '~/components/recipe/graph_macro';
import RecipeInfos from '~/components/recipe/infos';
import IngredientsList from '~/components/recipe/ingredients';
import InstructionsList from '~/components/recipe/instructions';
import NutritionFacts from '~/components/recipe/nutrition_facts';
import TitleLevel2 from '~/components/title/TitleLevel2';
import { getProfile } from '~/utils/get.user.infos';
import recipe from '~/api/recipe';
import review from '~/api/review';
import ServerError from '~/helpers/errors/server.error';
import ResponseError from '~/helpers/response/response.error';

export async function loader({ params, request }: LoaderArgs) {
  try {
    if (!params.id) throw new ServerError('Invalid params');
    const recipeId = +params.id;

    let response;

    // Promise all
    const foundRecipe = await recipe.findById(recipeId);
    const reviews = await review.findAllByRecipeId(recipeId);
    const aggregate = await review.aggretate(recipeId);

    response = { foundRecipe, reviews, aggregate };
    //
    const profile = await getProfile(request);

    if (profile) {
      const infos = await review.findByIds(recipeId, profile.id);
      response = { ...response, profile, infos };
    }
    return json(response);
  } catch (error) {
    return new ResponseError(error);
  }
}

export default function RecipePage() {
  const {
    foundRecipe: recipe,
    reviews,
    profile,
    infos: infosRecipeByUser,
    aggregate,
  } = useLoaderData();

  const toggleFavorite = useFetcher<any>();

  const handleClickFavorite = () => {
    const formData = new FormData();
    formData.append('recipeId', recipe.id.toString());
    formData.append('authorId', profile.id.toString());

    toggleFavorite.submit(formData, {
      method: 'post',
      action: '/api/recipes/favorites',
      replace: true,
    });
  };

  return (
    <div className="flex flex-col pb-4 max-w-[1600px] mx-auto">
      <div className="flex basis-11/12  w-full">
        <div className="flex flex-col px-2 max-w-[600px] min-w-[450px] gap-y-3">
          {/* title */}
          <div className="flex items-center justify-start gap-x-6">
            <TitleLevel2 title={recipe.name} />
            <AddFavoriteIcon
              onClick={handleClickFavorite}
              infosRecipeByUser={infosRecipeByUser}
            />
          </div>
          {/* image */}
          <div className="w-full py-4 center aspect-2/1 rounded-2xl overflow-hidden max-h-36">
            <img
              src={recipe.image.link}
              alt=""
              className="object-cover object-center rounded-2xl w-full"
            />
          </div>
          <RecipeInfos
            prepTime={recipe.prep_time}
            cookTime={recipe.cook_time}
            difficulty={recipe.difficulty.name}
            favorite={aggregate?._count?.is_liked}
          />
          <div className="my-4 flex justify-between">
            <RatingIndicator
              avgRating={aggregate?._avg?.rating}
              countRating={aggregate?._count?.rating}
              numStars={5}
            />
            <p className="text-8 opacity-90">
              by <span className="capitalize">{recipe?.author?.username}</span>
            </p>
          </div>
          <div className="flex gap-x-1 my-2 capitalize">
            {recipe.tags.map((label: string, index: number) => {
              return <Label key={index} label={label} />;
            })}
          </div>
          <NutritionFacts
            calories={recipe.macros.calories}
            carbs={recipe.macros.carbs}
            fat={recipe.macros.fat}
            proteins={recipe.macros.proteins}
            water={recipe.macros.water}
          />
          <LinearMacrosProportion macros={recipe?.macros} />
        </div>
        <div className="flex flex-col gap-y-6 px-4 flex-grow">
          <InstructionsList instructions={recipe.instructions} />
          <CommentSection
            reviews={reviews}
            recipeId={recipe.id}
            authorId={profile?.id}
          />
        </div>
        <div className="w-1/3 max-w-[300px] min-w-[290px] mx-6">
          <IngredientsList
            measures={recipe.measures}
            servings={recipe.servings}
          />
        </div>
      </div>
    </div>
  );
}
