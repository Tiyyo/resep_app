import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRecipeById } from "~/api/get.one.by.id.request";
import RecipeInfos from "~/components/recipe/infos";
import IngredientsList from "~/components/recipe/ingredients";
import InstructionsList from "~/components/recipe/instructions";
import NutritionFacts from "~/components/recipe/nutrition_facts";
import computeNewMacroAfterToUpdateRecipe from "~/utils/recipe.builder.server";

export async function loader({ params }: LoaderArgs) {
  const recipeId = +params.id;
  if (!recipeId) {
    return json({ message: "Recipe not found" }, { status: 500 });
  }
  const updateRecipe = await computeNewMacroAfterToUpdateRecipe(recipeId);
  const recipe = await getRecipeById(recipeId);
  return json(recipe);
}

export default function RecipePage() {
  const recipe = useLoaderData();


  return (
    <div className="flex h-full w-full ">
      <div className="w-1/3 max-w-[400px] min-w-[250px] px-4">
        <div className="w-full py-4 center aspect-square overflow-hidden max-h-64">
          <img
            src={recipe.image.link}
            alt=""
            className="object-cover object-center rounded-2xl w-full"
          />
        </div>
        <IngredientsList
          measures={recipe.measures}
          servings={recipe.servings}
        />
      </div>
      <div className="flex flex-col w-2/3 px-2">
        <h2 className="text-20 font-semibold text-secondary-400">{recipe.name}</h2>
        {/* <RecipeInfos
          prepTime={recipe.prep_time}
          cookTime={recipe.cook_time}
          difficulty={recipe.difficulty.name}
          favorite={recipe.favorite}
        /> */}
        {/* <NutritionFacts
          calories={recipe.macro_recipe.calories}
          carbs={recipe.macro_recipe.carbs}
          fat={recipe.macro_recipe.fat}
          proteins={recipe.macro_recipe.proteins}
          water={recipe.macro_recipe.water}
        />
        <InstructionsList instructions={recipe.instructions} /> */}
      </div>
    </div>
  );
}
