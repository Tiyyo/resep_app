import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRecipeById } from "~/api/get.one.by.id.request";
import IngredientsList from "~/components/recipe/ingredients";
import InstructionsList from "~/components/recipe/instructions";
import NutritionFacts from "~/components/recipe/nutrition_facts";

export async function loader({ params }: LoaderArgs) {
  const recipeId = +params.id;
  if (!recipeId) {
    return json({ message: "Recipe not found" }, { status: 500 });
  }
  const recipe = await getRecipeById(recipeId);
  return json(recipe);
}

export default function RecipePage() {
  const recipe = useLoaderData<typeof loader>();

  console.log(recipe);

  return (
    <div className="flex h-full w-full ">
      <div className="basis-1/3 ">
        <div className="w-full p-4 center aspect-square overflow-hidden max-h-80">
          <img src={recipe.image.link} alt="" className="object-cover object-center rounded-lg w-full"/>
        </div>
        <IngredientsList
          measures={recipe.measures}
          servings={recipe.servings}
        />
      </div>
      <div className="basis-2/3 border border-yellow-500">
        <div>{recipe.name}</div>
        <div className="flex">
          <div>{recipe.prep_time}min</div> | <div>{recipe.cook_time}min</div> |{" "}
          <div>{recipe.difficulty.name}</div> | <div>{recipe.favorite}</div>
        </div>
        <NutritionFacts
          calories={recipe.macro_recipe.calories}
          carbs={recipe.macro_recipe.calories}
          fat={recipe.macro_recipe.fat}
          proteins={recipe.macro_recipe.proteins}
          water={recipe.macro_recipe.water}
        />
        <InstructionsList instructions={recipe.instructions} />
      </div>
    </div>
  );
}
