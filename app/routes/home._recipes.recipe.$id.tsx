import { ActionArgs, json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllReviewByRecipeId } from "~/api/get.all.request";
import { getRecipeById } from "~/api/get.one.by.id.request";
import { addReview } from "~/api/post.request";
import FormReview from "~/components/form_review";
import CommentSection from "~/components/recipe/comment_section";
import RecipeInfos from "~/components/recipe/infos";
import IngredientsList from "~/components/recipe/ingredients";
import InstructionsList from "~/components/recipe/instructions";
import NutritionFacts from "~/components/recipe/nutrition_facts";
import Review from "~/components/recipe/reviews";
import { convertStringToNumber } from "~/utils/convert.to.number";
import computeNewMacroAfterToUpdateRecipe from "~/utils/recipe.builder.server";

export async function loader({ params }: LoaderArgs) {
  if (!params.id)
    return json({ message: "No id was provided" }, { status: 400 });
  const recipeId = +params.id;

  //remove that part when the recipe builder will be done
  await computeNewMacroAfterToUpdateRecipe(recipeId);
  const reviews = await getAllReviewByRecipeId(recipeId);


  const recipe = await getRecipeById(recipeId);
  return json({recipe, reviews});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  const rating = formData.get("rating");
  const authorId = formData.get("authorId");
  const recipeId = formData.get("recipeId");
  const comment = formData.get("comment");


  const fieldToConvert = { rating, authorId, recipeId };

  const fieldConverted = await convertStringToNumber({ rating, authorId, recipeId });

  console.log(fieldConverted);

  const body = { ...fieldConverted, comment };

  console.log(body);
  try {
   const newReview = await addReview(body)
   console.log(newReview);
  } catch (error) {
    console.log(error);
  }

  return json({ message: "ok" });
}

export default function RecipePage() {
  const {recipe, reviews} = useLoaderData();

  console.log(reviews, recipe);

  return (
    <div className="flex h-full w-full ">
      <div className="w-1/3 max-w-[400px] min-w-[290px] px-4 mx-6">
        <div className="w-full py-4 center aspect-square overflow-hidden max-h-64">
          <img
            src={recipe.image.link}
            alt=""
            className="object-cover object-center rounded-2xl w-full"
          />
        </div>
        <IngredientsList
          measures={recipe.measures}
          servings={recipe.servings}
        />
      </div>
      <div className="flex flex-col px-2">
        <h2 className="text-20 font-semibold text-secondary-400">
          {recipe.name}
        </h2>
        <RecipeInfos
          prepTime={recipe.prep_time}
          cookTime={recipe.cook_time}
          difficulty={recipe.difficulty.name}
          favorite={recipe.favorite}
        />
        <NutritionFacts
          calories={recipe.macro_recipe.calories}
          carbs={recipe.macro_recipe.carbs}
          fat={recipe.macro_recipe.fat}
          proteins={recipe.macro_recipe.proteins}
          water={recipe.macro_recipe.water}
        />
        <InstructionsList instructions={recipe.instructions} />
      </div>
      <div className="flex flex-col justify-end gap-y-6 p-4 flex-grow">
        <CommentSection reviews={reviews}/>
      </div>
    </div>
  );
}
