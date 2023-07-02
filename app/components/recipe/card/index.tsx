import LikeIcon from "~/assets/icons/Like";
import type { RecipeCardProps } from "./interface";
import { Link } from "@remix-run/react";

export default function RecipeCard({
  imageLink,
  recipeName,
  recipeCalories,
  recipeId,
  isLiked,
}: RecipeCardProps) {

  console.log(isLiked);
  return (
    <div className="flex flex-col h-72 w-48 border p-2 bg-main-300 shadow-xl">
      <div className="">
        <Link to={`/home/recipe/${recipeId}`}>
          <img src={imageLink} alt={recipeName} className="rounded-md" />
        </Link>
      </div>
      <div className="flex flex-col justify-between h-full pt-1">
        <div className="font-semibold text-10">{recipeName}</div>
        <div className="flex justify-between items-center">
          <div className="text-8 opacity-80">
            {Number(recipeCalories).toFixed(0)}kcal
          </div>
          <div className="">
            {isLiked ? (
              <LikeIcon size="8" fill={true} />
            ) : (
              <LikeIcon size="8" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
