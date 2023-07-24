import LikeIcon from "~/assets/icons/Like";
import type { RecipeCardProps } from "./interface";
import { Form, Link } from "@remix-run/react";
import AddPlusIcon from "~/assets/icons/AddPlusIcon";

export default function RecipeCard({
  imageLink,
  recipeName,
  recipeCalories,
  recipeId,
  isLiked,
  variant,
  tags,
  pickedMeal,
  servings,
}: RecipeCardProps) {
  return (
    <div
      className={`flex border bg-main-100 p-2 shadow-md ${
        variant === "horizontal"
          ? "aspect-2/1 h-52"
          : " h-32 w-48 min-w-[170px] flex-col xl:h-72 xl:w-48"
      }`}
    >
      <div
        className={`${
          variant === "horizontal" ? "aspect-square basis-1/3" : ""
        }`}
      >
        <Link to={`/home/recipe/${recipeId}`}>
          {imageLink && (
            <img src={imageLink} alt={recipeName} className="rounded-md" />
          )}
        </Link>
      </div>
      <div
        className={` flex h-full flex-col ${
          variant === "horizontal" ? "basis-2/3 p-2" : " justify-between pt-1"
        }`}
      >
        <div
          className={`text-10 font-semibold ${
            variant === "horizontal" ? "min-h-12" : ""
          }`}
        >
          {recipeName}
        </div>
        {variant === "horizontal" && tags && tags.length > 0 && (
          <div className="mt-4 flex-grow text-8 opacity-80">
            {tags.map((tag: string, index: number) => {
              return (
                <span key={index} className="capitalize">
                  {" "}
                  {tag}
                  {""}
                </span>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-8 opacity-80">
            {recipeCalories && Number(recipeCalories).toFixed(0)}
            kcal
          </div>
          {typeof pickedMeal === "number" && pickedMeal >= 0 ? (
            <Form
              method="POST"
              className="flex cursor-pointer items-center gap-x-1"
            >
              <input name="recipe_id" hidden defaultValue={recipeId} />
              <input name="pickedMeal" hidden defaultValue={pickedMeal} />
              <input name="recipe_name" hidden defaultValue={recipeName} />
              <input name="image" defaultValue={imageLink} hidden />
              <input name="servings" defaultValue={servings} hidden />
              <button
                type="submit"
                className="rounded-xl  bg-secondary-300 px-2.5 text-7 text-white-100 text-opacity-80"
              >
                pick
              </button>
              <AddPlusIcon size="4" />
            </Form>
          ) : null}
          <div className="">
            {isLiked ? (
              <LikeIcon size="5" fill={true} />
            ) : (
              <LikeIcon size="5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
