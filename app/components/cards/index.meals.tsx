import { Link } from "@remix-run/react";
import Input from "../input";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import { MealCreateInput } from "~/session";

export interface CardMealsProps {
  handleServings: (e: React.MouseEvent<HTMLButtonElement>) => void;
  recipe: MealCreateInput;
  index: number;
}

export default function CardMeals({
  handleServings,
  recipe,
  index,
}: CardMealsProps) {
  return (
    <>
      <input name="recipeId" hidden defaultValue={recipe.recipe_id} />
      <div className="flex border p-2 bg-main-100 shadow-md h-44 aspect-2/1">
        <div className="aspect-square basis-1/3">
          <Link to={`/home/recipe/${recipe.recipe_id}`}>
            <img
              src={recipe.image}
              alt={recipe.recipe_name}
              className="h-full rounded-full p-2"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-start">
          <p className="min-h-8 text-8 font-semibold text-text-accent">
            {recipe.recipe_name}
          </p>
          <div
            className="flex items-center text-8 opacity-90 flex-grow "
            data-position={index}
          >
            <p className="text-7">Number of people for that recipes ? </p>

            <button
              type="submit"
              name="action"
              value="decrease"
              data-position={index}
              onClick={handleServings}
            >
              -
            </button>
            <Input
              type="number"
              name="parts"
              width="14"
              align="center"
              step={1}
              value={recipe.servings}
              data-position={index}
              disabled
            />
            <button
              type="submit"
              name="action"
              value="increase"
              data-position={index}
              onClick={handleServings}
            >
              +
            </button>
          </div>
          <div className="flex items-center justify-between">
            <Link to={`/home/finder/${index}`}>
              <p className="opacity-70 text-7 underline self-end cursor-pointer">
                Change recipe
              </p>
            </Link>
            <div className="cursor-pointer hover:text-secondary-300">
              <input name="position" hidden defaultValue={index} />
              <button type="submit" name="action" value="remove">
                <DeleteIcon size="4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
