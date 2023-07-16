import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useState } from "react";

import SubmitButton from "~/components/submit_button";
import TitleLevel1 from "~/components/title/TitleLevel1";
import { Recipe } from "~/types/recipe";
// import { buildShoppingList } from "~/service/shopping.builder.server";
import { buildShoppingList } from "~/service/algo.builder.safer.server";
import Input from "~/components/input";
// import type { RecipeCardShop } from "~/context/shoplist.context";
import { useEffect } from "react";
import recipe from "~/api/recipe";
import Wrapper from "~/layout/WrapperShoplist";
import { mealPlanStorage } from "~/session";
import meal_plans from "~/api/meal_plans";
import { getProfile } from "~/utils/get.user.infos";
import { MealPlanCreateInput } from "~/api/interfaces";
import DeleteIcon from "~/assets/icons/DeleteIcon";

export interface RecipeCardShop {
  id: number;
  image_id: number;
  link: string;
  name: string;
}

export async function loader({ request }: LoaderArgs) {
  // check if a session which contains a shopping list already exists
  // if yes, load it
  // if no let user decide how many recipes he wants to generate
  const session = await mealPlanStorage.getSession(
    request.headers.get("Cookie")
  );
  const mealPlan = session.get("meal_plan");
  if (mealPlan) {
    return json({ recipes: mealPlan });
  }
  return json({ message: "No plan saved in session" });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const profile = await getProfile(request);
  if (!profile) {
    return json({ error: "No profile found , User not logged in" });
  }
  const action = formData.get("action");

  switch (action) {
    case "getRandom": {
      const numRecipes = Number(formData.get("numRecipes"));
      const recipes = await recipe.findRandom(numRecipes);
      const session = await mealPlanStorage.getSession();
      session.set("meal_plan", recipes);
      return json(
        { recipes },
        {
          headers: {
            "Set-Cookie": await mealPlanStorage.commitSession(session),
          },
        }
      );
    }
    case "getShoppingList": {
      const session = await mealPlanStorage.getSession(
        request.headers.get("Cookie")
      );
      const mealPlan = session.get("meal_plan");

      // save meal plan in db
      const mealPlanSaved = await meal_plans.add(profile.id, mealPlan);

      // generate shopping lit
      const recipeIds = formData.getAll("recipeId");
      const shoppingList = await buildShoppingList(recipeIds as string[]);

      // save shopping list in db

      // destroy session
      await mealPlanStorage.destroySession(session);

      // redirect to shopping list
      return redirect("/home/shopping/list");
    }
    case "remove": {
      const session = await mealPlanStorage.getSession(
        request.headers.get("Cookie")
      );
      const mealPlan = session.get("meal_plan");
      const position = Number(formData.get("position"));
      mealPlan.splice(position, 1);
      session.set("meal_plan", mealPlan);
      return json(
        { recipes: mealPlan },
        {
          headers: {
            "Set-Cookie": await mealPlanStorage.commitSession(session),
          },
        }
      );
    }
    case "increase": {
      const session = await mealPlanStorage.getSession(
        request.headers.get("Cookie")
      );
      const mealPlan = session.get("meal_plan");
      const position = Number(formData.get("position"));
      mealPlan[position].servings += 1;
      session.set("meal_plan", mealPlan);
      return json(
        { recipes: mealPlan },
        {
          headers: {
            "Set-Cookie": await mealPlanStorage.commitSession(session),
          },
        }
      );
    }
    case "decrease": {
      const session = await mealPlanStorage.getSession(
        request.headers.get("Cookie")
      );
      const mealPlan = session.get("meal_plan");
      const position = Number(formData.get("position"));
      if (mealPlan[position].servings - 1 >= 1) {
        mealPlan[position].servings -= 1;
      }
      session.set("meal_plan", mealPlan);
      return json(
        { recipes: mealPlan },
        {
          headers: {
            "Set-Cookie": await mealPlanStorage.commitSession(session),
          },
        }
      );
    }
    default:
      return json({ message: "No action" }, { status: 400 });
  }
}

export default function () {
  const [recipes, setRecipes] = useState<MealPlanCreateInput | null>(null);
  const fetchRandomRecipes = useFetcher();
  const updateServings = useSubmit();
  const { recipes: cachedRecipes } = useLoaderData<{
    recipes: MealPlanCreateInput;
  }>();

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    updateServings(e.currentTarget, { method: "POST" });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const copyRecipes = [...recipes]; //TODO fix this Symbol Iterator error
    const position = Number(e.currentTarget.dataset.position);
    if (e.currentTarget.value === "increase") {
      copyRecipes[position].servings += 1;
      setRecipes(copyRecipes);
    }
    if (
      e.currentTarget.value === "decrease" &&
      copyRecipes[position].servings - 1 >= 1
    ) {
      copyRecipes[position].servings -= 1;
      setRecipes(copyRecipes);
    }
  };

  useEffect(() => {
    if (fetchRandomRecipes.data?.recipes) {
      setRecipes(fetchRandomRecipes.data.recipes);
    }
  }, [fetchRandomRecipes.data]);

  useEffect(() => {
    if (cachedRecipes) {
      setRecipes(cachedRecipes);
    }
  }, [cachedRecipes]);

  return (
    <div>
      <div>
        <TitleLevel1 title="Shopping" />
        {recipes && recipes.length > 0 && (
          <div>
            <div className="flex justify-center flex-wrap gap-4">
              {recipes.map((recipe, index: number) => {
                return (
                  <Form
                    method="POST"
                    key={recipe.recipe_id * index}
                    onChange={handleChange}
                  >
                    <div>
                      <input
                        name="recipeId"
                        hidden
                        defaultValue={recipe.recipe_id}
                      />
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
                            <p className="text-7">
                              Number of people for that recipes ?{" "}
                            </p>

                            <button
                              type="submit"
                              name="action"
                              value="decrease"
                              data-position={index}
                              onClick={handleClick}
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
                              // onChange={handleChange}
                            />
                            <button
                              type="submit"
                              name="action"
                              value="increase"
                              data-position={index}
                              onClick={handleClick}
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
                              <input
                                name="position"
                                hidden
                                defaultValue={index}
                              />
                              <button
                                type="submit"
                                name="action"
                                value="remove"
                              >
                                <DeleteIcon size="4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              })}
            </div>
            <Link to={`/home/finder/${recipes.length}`}>
              <div className="flex justify-center mx-auto my-10 cursor-pointer rounded-xl border-2 border-black-light border-dashed py-6 w-52 bg-main-100 font-semibold text-opacity-50">
                ADD ANOTHER RECIPE
              </div>
            </Link>
            <div className="w-full flex justify-center my-10">
              <SubmitButton
                text="Generate shopping list"
                name="action"
                value="getShoppingList"
              />
            </div>
          </div>
        )}
        {!recipes ||
          (recipes.length === 0 && (
            <fetchRandomRecipes.Form
              className="center flex-col gap-y-8"
              // onSubmit={handleClickGenerate}
              method="POST"
            >
              <p className="text-12 font-semibold text-text-accent_soft">
                How many meals do you want to prepare ?
              </p>
              <Input type="number" name="numRecipes" width="16" />
              <SubmitButton text="Let's Go" name="action" value="getRandom" />
            </fetchRandomRecipes.Form>
          ))}
      </div>
    </div>
  );
}
