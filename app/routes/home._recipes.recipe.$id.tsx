import { ActionArgs, json, type LoaderArgs } from "@remix-run/node";
import { Form, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { getAllReviewByRecipeId } from "~/api/get.all.request";
import { getRecipeById } from "~/api/get.one.by.id.request";
import { recipeOnUsers } from "~/api/get.relation.between";
import { addReview } from "~/api/post.request";
import LikeIcon from "~/assets/icons/Like";
import FormReview from "~/components/form_review";
import CommentSection from "~/components/recipe/comment_section";
import RecipeInfos from "~/components/recipe/infos";
import IngredientsList from "~/components/recipe/ingredients";
import InstructionsList from "~/components/recipe/instructions";
import NutritionFacts from "~/components/recipe/nutrition_facts";
import Review from "~/components/recipe/reviews";
import SubmitButton from "~/components/submit_button";
import { convertStringToNumber } from "~/utils/convert.to.number";
import { getProfile } from "~/utils/get.user.infos";
import computeNewMacroAfterToUpdateRecipe from "~/utils/recipe.builder.server";

export async function loader({ params, request }: LoaderArgs) {
  if (!params.id)
    return json({ message: "No id was provided" }, { status: 400 });
  const recipeId = +params.id;

  //remove that part when the recipe builder will be done
  await computeNewMacroAfterToUpdateRecipe(recipeId);
  const reviews = await getAllReviewByRecipeId(recipeId);

  const recipe = await getRecipeById(recipeId);
  const profile = await getProfile(request);
  const infos = await recipeOnUsers(recipeId, profile.id);
  return json({ recipe, reviews, profile, infos });
}

// export async function action({ request }: ActionArgs) {
//   const formData = await request.formData();
//   const form = Object.fromEntries(formData);
//   const rating = formData.get("rating");
//   const authorId = formData.get("authorId");
//   const recipeId = formData.get("recipeId");
//   const comment = formData.get("comment");

//   const fieldToConvert = { rating, authorId, recipeId };

//   const fieldConverted = await convertStringToNumber({
//     rating,
//     authorId,
//     recipeId,
//   });

//   const body = { ...fieldConverted, comment };

//   try {
//     const newReview = await addReview(body);
//   } catch (error) {
//     console.log(error);
//   }

//   return json({ message: "ok" });
// }

export default function RecipePage() {
  const { recipe, reviews, profile, infos } = useLoaderData();
  const toggleFavorite = useFetcher();
  const [openLeaveReviewSection, setOpenLeaveReviewSection] = useState(false);

  const handleClickComment = (event) => {
    console.log(event.target.id);
    event.target.id === "leaveReviewSection" ? setOpenLeaveReviewSection(true) : setOpenLeaveReviewSection(false);
  }



  const handleClickFavorite = (event) => {
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
    <div className="flex h-full w-full" onClick={handleClickComment}>
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
        <div className="flex items-center justify-start gap-x-6">
          <h2 className="text-20 font-semibold text-secondary-400">
            {recipe.name}
          </h2>
          <div onClick={handleClickFavorite} className="text-secondary-400">
            {infos && infos.is_liked ? (
              <LikeIcon size="8" fill={true} />
            ) : (
              <LikeIcon size="8" />
            )}
          </div>
        </div>
        <RecipeInfos
          prepTime={recipe.prep_time}
          cookTime={recipe.cook_time}
          difficulty={recipe.difficulty.name}
          favorite={recipe.favorite}
        />
        <div className="flex gap-x-1 my-2 capitalize">
          {recipe.tags.map((tag, index) => {
            return (
              <div
                key={index}
                className=" rounded-lg text-7 font-semibold bg-secondary-300 py-1 px-2 w-fit text-white-100"
              >
                {tag}
              </div>
            );
          })}
        </div>
        <NutritionFacts
          calories={recipe.macro_recipe.calories}
          carbs={recipe.macro_recipe.carbs}
          fat={recipe.macro_recipe.fat}
          proteins={recipe.macro_recipe.proteins}
          water={recipe.macro_recipe.water}
        />
        <CommentSection reviews={reviews} openReviewSection={openLeaveReviewSection}/>
      </div>
      <div className="flex flex-col gap-y-6 p-4 flex-grow">
        <InstructionsList instructions={recipe.instructions} />
        
      </div>
    </div>
  );
}
