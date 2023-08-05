import { useParams } from "@remix-run/react";
import RecipeCard from "../recipe/card";
import type { Recipe } from "~/types/recipe";
import RecipeContainer from "../container";

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
    <div className="mx-auto flex h-full max-w-[1325px] flex-col">
      <RecipeContainer
        Card={RecipeCard}
        data={recipes}
        profileId={profileId}
        pickedMeal={Number(params.index)}
      />
    </div>
  );
}
