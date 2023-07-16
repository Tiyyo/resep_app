import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import recipe from "~/api/recipe";
import RecipeCard from "~/components/recipe/card";
import { mealPlanStorage } from "~/session";
import { Recipe } from "~/types/recipe";
import { getProfile } from "~/utils/get.user.infos";
import { isLikedByUser } from "~/utils/is.liked.by.user";

export async function loader({ request, params }: LoaderArgs) {
  if (!params.index) return json({ error: "Invalid search params" });
  const positionMealToReplace = +params.index;
  const searchedTags = params.tags;
  const profile = await getProfile(request);
  if (!profile) return json({ error: "Invalid user" }, { status: 401 });

  switch (searchedTags?.toLowerCase()) {
    case "favorites": {
      const recipes = await recipe.findLikedByUser(profile.id);
      return {
        positionMealToReplace,
        recipes,
        searchedTags,
        profileId: profile.id,
      };
    }
    case "myrecipes": {
      const recipes = await recipe.findByAuthor(profile.id);
      return {
        positionMealToReplace,
        recipes,
        searchedTags,
        profileId: profile.id,
      };
    }
    case "chicken": {
      const recipes = await recipe.findByTags(["chicken"]);
      return {
        positionMealToReplace,
        recipes,
        searchedTags,
        profileId: profile.id,
      };
    }
    case "beef": {
      const recipes = await recipe.findByTags(["beef"]);
      return {
        positionMealToReplace,
        recipes,
        searchedTags,
        profileId: profile.id,
      };
    }
    case "fish": {
      const recipes = await recipe.findByTags(["fish"]);
      return {
        positionMealToReplace,
        recipes,
        searchedTags,
        profileId: profile.id,
      };
    }
    case "veggie": {
      const recipes = await recipe.findByTags(["vegetarian"]);
      return {
        positionMealToReplace,
        recipes,
        searchedTags,
        profileId: profile.id,
      };
    }
    case "all": {
      const recipes = await recipe.findRandom(10);
      return {
        positionMealToReplace,
        recipes,
        searchedTags,
        profileId: profile.id,
      };
    }
    default: {
      return json({ error: "Invalid search params" });
    }
  }
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const positionMealToReplace = +formData.get("pickedMeal");

  const session = await mealPlanStorage.getSession(
    request.headers.get("Cookie")
  );

  const mealPlan = session.get("meal_plan");
  const newMeal = {
    recipe_id: Number(formData.get("recipe_id")),
    recipe_name: formData.get("recipe_name"),
    image: formData.get("image"),
    servings: Number(formData.get("servings")),
  };

  mealPlan[positionMealToReplace] = {
    ...mealPlan[positionMealToReplace],
    ...newMeal,
  };

  session.set("meal_plan", mealPlan);

  return redirect("/home/shopping", {
    headers: {
      "Set-Cookie": await mealPlanStorage.commitSession(session),
    },
  });
}

export default function () {
  const { positionMealToReplace, searchedTags, recipes, profileId } =
    useLoaderData();
  const data = useLoaderData();
  const transition = useNavigation();

  if (!recipes || recipes.length === 0)
    return <div className="center italic mt-10">No recipes found</div>;

  return (
    <div className="max-w-[1325px] mx-auto">
      <div className="flex flex-wrap gap-4 justify-start content-start w-full py-8">
        {recipes.map((recipe: Recipe, index: number) => {
          return (
            <RecipeCard
              key={recipe.id}
              recipeId={recipe.id}
              imageLink={recipe.image?.link}
              recipeName={recipe.name}
              servings={recipe.servings}
              recipeCalories={recipe.macros?.calories}
              isLiked={isLikedByUser(recipe, profileId)}
              pickedMeal={positionMealToReplace}
            />
          );
        })}
      </div>
    </div>
  );
}
