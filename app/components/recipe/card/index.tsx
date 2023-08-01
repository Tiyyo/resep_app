import LikeIcon from "~/assets/icons/Like";
import type { RecipeCardProps } from "./interface";
import CardRecipePick from "./index.pick";
import CardRecipeImage from "./index.images";
import CardRecipeName from "./index.name";
import CardRecipeTags from "./index.tags";

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
      key={recipeId}
      className={`flex   border bg-main-100 px-2 py-4 shadow-md  ${
        variant === "horizontal"
          ? " aspect-3/2 max-h-[200px]"
          : "aspect-2/3  max-h-[305px] min-w-[170px] flex-col xl:w-48"
      } `}
    >
      <CardRecipeImage
        recipeId={recipeId}
        variant={variant ?? "vertical"}
        recipeName={recipeName}
        imageLink={imageLink}
      />
      <div
        className={` flex h-full flex-col ${
          variant === "horizontal"
            ? "basis-2/3 p-2"
            : "min-h-[85px] flex-shrink-0 basis-1/3 justify-between"
        }`}
      >
        <CardRecipeName recipeName={recipeName} variant={variant} />
        <CardRecipeTags tags={tags} variant={variant} />
        <div className="flex items-center justify-between">
          <div className="text-8 opacity-80">
            {recipeCalories && Number(recipeCalories).toFixed(0)}
            kcal
          </div>
          <CardRecipePick
            pickedMeal={pickedMeal}
            servings={servings ?? 4}
            recipeId={recipeId}
            recipeName={recipeName}
            imageLink={imageLink}
          />
          {isLiked ? <LikeIcon size="5" fill={true} /> : <LikeIcon size="5" />}
        </div>
      </div>
    </div>
  );
}
