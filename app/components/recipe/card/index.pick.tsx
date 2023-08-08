import { Form } from "@remix-run/react";
import AddPlusIcon from "~/assets/icons/AddPlusIcon";

export interface CardRecipePickProps {
  pickedMeal?: number;
  recipeId: number;
  recipeName: string;
  imageLink?: string;
  servings: number;
}

export default function CardRecipePick({
  pickedMeal,
  recipeId,
  recipeName,
  imageLink,
  servings,
}: CardRecipePickProps) {
  if (typeof pickedMeal === null) return null;
  if (typeof pickedMeal === "undefined") return null;
  if (pickedMeal < 0) return null;
  if (typeof pickedMeal !== "number") return null;

  return (
    <Form method="POST" className="flex cursor-pointer items-center gap-x-1">
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
  );
}
