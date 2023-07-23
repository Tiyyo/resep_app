import { isLikedByUser } from "~/utils/is.liked.by.user";
import RecipeCard from "../recipe/card";
import TitleLevel3 from "../title/TilteLevel3";
import Chevron from "../chevron";
import ArrowRightIcon from "~/assets/icons/ArrowRightIcon";
import { CarouselProps } from "./interface";

export default function Carousel({ title, recipes, profileId }: CarouselProps) {
  return (
    <div className="w-fit self-center px-4 py-2">
      <div className="flex items-center justify-between">
        <TitleLevel3 title={title} />
        <a>
          <p className="flex cursor-pointer items-center">
            See all{" "}
            <span>
              <ArrowRightIcon />
            </span>
          </p>
        </a>
      </div>
      <div className="w-full">
        <div className="no-scrollbar flex gap-x-4 overflow-x-scroll">
          {recipes &&
            recipes.length > 0 &&
            recipes.map((recipe: any): JSX.Element => {
              //  TODO: fix type
              return (
                <RecipeCard
                  key={recipe.id}
                  recipeId={recipe.id}
                  imageLink={recipe.image?.link}
                  recipeName={recipe.name}
                  recipeCalories={recipe.macro_recipe?.calories}
                  isLiked={isLikedByUser(recipe, profileId)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
