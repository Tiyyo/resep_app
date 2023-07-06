import { json, type LoaderArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { aggregateRecipes } from "~/api/aggregate";
import { getAllReviewByRecipeId } from "~/api/get.all.request";
import { getLastRecipes } from "~/api/get.many.by.id";
import { getRecipeById } from "~/api/get.one.by.id.request";
import { recipeOnUsers } from "~/api/get.relation.between";
import Label from "~/components/label";
import AddFavoriteIcon from "~/components/like_icon";
import RatingIndicator from "~/components/rating/RatingIndicator";
import CommentSection from "~/components/recipe/comment_section";
import LinearMacrosProportion from "~/components/recipe/graph_macro";
import RecipeInfos from "~/components/recipe/infos";
import IngredientsList from "~/components/recipe/ingredients";
import InstructionsList from "~/components/recipe/instructions";
import NutritionFacts from "~/components/recipe/nutrition_facts";
import TitleLevel2 from "~/components/title/TitleLevel2";
import { getProfile } from "~/utils/get.user.infos";
import computeNewMacroAfterToUpdateRecipe from "~/utils/recipe.builder.server";

export async function loader({ params, request }: LoaderArgs) {
  if (!params.id)
    return json({ message: "No id was provided" }, { status: 500 });
  const recipeId = +params.id;

  //remove that part when the recipe builder will be done
  await computeNewMacroAfterToUpdateRecipe(recipeId);

  const recipe = await getRecipeById(recipeId);
  const reviews = await getAllReviewByRecipeId(recipeId);
  const aggregate = await aggregateRecipes(recipeId);
  const profile = await getProfile(request);
  if (profile) {
    const infos = await recipeOnUsers(recipeId, profile.id);
    return json({ recipe, reviews, profile, infos, aggregate});
  }
  return json({ recipe, reviews, profile, aggregate });
}

export default function RecipePage() {
  const {
    recipe,
    reviews,
    profile,
    infos: infosRecipeByUser,
    aggregate,
  } = useLoaderData();

  const toggleFavorite = useFetcher<any>();

  const handleClickFavorite = () => {
    const formData = new FormData();
    formData.append("recipeId", recipe.id.toString());
    formData.append("authorId", profile.id.toString());

    toggleFavorite.submit(formData, {
      method: "post",
      action: "/api/recipes/favorites",
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
            calories={recipe.macro_recipe.calories}
            carbs={recipe.macro_recipe.carbs}
            fat={recipe.macro_recipe.fat}
            proteins={recipe.macro_recipe.proteins}
            water={recipe.macro_recipe.water}
          />
          <LinearMacrosProportion macros={recipe?.macro_recipe} />
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
      <div></div>
    </div>
  );
}
