import { useParams } from "@remix-run/react";
import RecipeCard from "../recipe/card";
import type { Recipe } from "~/types/recipe";
import isLikedByUser from "~/utils/is.liked.by.user";

export default function FinderCategories({
  recipes,
  profileId,
}: {
  recipes: Recipe[];
  profileId: number;
}) {
  const params = useParams();

  if (!recipes || recipes.length === 0)
    return <div className="center mt-10 italic">No recipes found</div>;

  return (
    <div className="mx-auto max-w-[1325px]">
      <div className="flex w-full flex-wrap content-start justify-start gap-4 py-8">
        {recipes.map((recipe: Recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              recipeId={recipe.id}
              imageLink={recipe.image?.link}
              recipeName={recipe.name}
              servings={recipe.servings}
              recipeCalories={recipe.macros?.calories}
              isLiked={isLikedByUser(recipe, profileId)}
              pickedMeal={Number(params.index)}
            />
          );
        })}
      </div>
    </div>
  );
}
