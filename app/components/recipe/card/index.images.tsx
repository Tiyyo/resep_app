import { Link } from "@remix-run/react";
import type { CardRecipeImageProps } from "./interface";
import LinkFixed from "~/components/link";

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
          : "mx-auto min-h-[120px] basis-2/3"
      }`}
    >
      <Link to={`/home/recipe/${recipeId}`} preventScrollReset={false}>
        {/* <LinkFixed to={`/home/recipe/${recipeId}`}> */}
        {imageLink && (
          <img
            src={imageLink}
            alt={recipeName}
            className="h-full rounded-md object-cover"
          />
        )}
        {/* </LinkFixed> */}
      </Link>
    </div>
  );
}
