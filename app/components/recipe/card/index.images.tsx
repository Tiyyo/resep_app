import { Link } from "@remix-run/react";
import type { CardRecipeImageProps } from "./interface";

export default function CardRecipeImage({
  variant,
  imageLink,
  recipeId,
  recipeName,
}: CardRecipeImageProps) {
  return (
    <div
      className={`${
        variant === "horizontal"
          ? "aspect-square basis-1/3"
          : "min-h-[150px] basis-2/3 border-2"
      }`}
    >
      <Link to={`/home/recipe/${recipeId}`}>
        {imageLink && (
          <img
            src={imageLink}
            alt={recipeName}
            className="h-full rounded-md object-cover"
          />
        )}
      </Link>
    </div>
  );
}
