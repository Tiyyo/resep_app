import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useRef, useState } from "react";

import SubmitButton from "~/components/submit_button";
import TitleLevel1 from "~/components/title/TitleLevel1";
import { Recipe } from "~/types/recipe";
// import { buildShoppingList } from "~/service/shopping.builder.server";
import { buildShoppingList } from "~/service/algo.builder.safer.server";
import Input from "~/components/input";
// import type { RecipeCardShop } from "~/context/shoplist.context";
import { useEffect } from "react";
import recipe from "~/api/recipe";
import { mealPlanStorage } from "~/session";
import meal_plans from "~/api/meal_plans";
import { getProfile } from "~/utils/get.user.infos";
import { MealPlanCreateInput } from "~/api/interfaces";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import { storage } from "~/service/auth.server";
import Intro from "~/components/shopping/intro";
import ModalNotRoute from "~/components/modal/index.not.route";

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
  const session = await storage.getSession(request.headers.get("Cookie"));

  const mealPlan = session.get("meal_plan");

  if (mealPlan) {
    return json({ recipes: mealPlan });
  }
  return json({ message: "No plan saved in session" });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  debugger;

  const profile = await getProfile(request);

  if (!profile) {
    return json({ error: "No profile found , User not logged in" });
  }
  const action = formData.get("action");

  console.log("ACTION", action);

  switch (action) {
    case "getRandom": {
      const numRecipes = Number(formData.get("numRecipes"));

      // avoid negative value and float value
      // Idea send a message to the user instead of formating the value for him
      const numberOfRecipesToGenerate = Math.floor(Math.abs(numRecipes));

      const recipes = await recipe.findRandom(numberOfRecipesToGenerate);

      const session = await storage.getSession(request.headers.get("Cookie"));

      session.set("meal_plan", recipes);
      const userId = session.get("userId");

      console.log("USER ID IS PRESENT AFTER GENERATE PLAN IN SESSION", userId);
      return json(
        { recipes },
        {
          headers: {
            "Set-Cookie": await storage.commitSession(session),
          },
        }
      );
    }
    case "getShoppingList": {
      const session = await storage.getSession(request.headers.get("Cookie"));
      const mealPlan = session.get("meal_plan");

      console.log("MEAL PLAN IN SESSION", mealPlan);

      // save meal plan in db
      const mealPlanSaved = await meal_plans.add(profile.id, mealPlan);
      console.log("MEAL PLAN SAVED", mealPlanSaved);

      // generate shopping lit
      // const recipeIds = mealPlan.map((recipe) => recipe.recipe_id);
      // const shoppingList = await buildShoppingList(recipeIds as string[]);

      // save shopping list in db

      // destroy session
      session.unset("meal_plan");
      // session.set("meal_plan", "");

      // redirect to shopping list
      return redirect("/home/shopping/meal_plans", {
        headers: { "Set-Cookie": await storage.commitSession(session) },
      });
    }
    case "remove": {
      const session = await storage.getSession(request.headers.get("Cookie"));
      const mealPlan = session.get("meal_plan");
      const position = Number(formData.get("position"));
      mealPlan.splice(position, 1);
      session.set("meal_plan", mealPlan);
      return json(
        { recipes: mealPlan },
        {
          headers: {
            "Set-Cookie": await storage.commitSession(session),
          },
        }
      );
    }
    case "increase": {
      const session = await storage.getSession(request.headers.get("Cookie"));
      const mealPlan = session.get("meal_plan");
      const position = Number(formData.get("position"));
      mealPlan[position].servings += 1;
      session.set("meal_plan", mealPlan);
      return json(
        { recipes: mealPlan },
        {
          headers: {
            "Set-Cookie": await storage.commitSession(session),
          },
        }
      );
    }
    case "decrease": {
      const session = await storage.getSession(request.headers.get("Cookie"));
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
            "Set-Cookie": await storage.commitSession(session),
          },
        }
      );
    }
    case "restore": {
      const session = await storage.getSession(request.headers.get("Cookie"));
      const mealPlan = await meal_plans.findLast(profile.id);

      const meals = mealPlan.meals.map((meal) => meal.meals);

      console.log("MEAL PLAN RESTORED", mealPlan.meals);
      session.set("meal_plan", meals);
      return json(
        { recipes: meals },
        { headers: { "Set-Cookie": await storage.commitSession(session) } }
      );
    }
    default:
      return json({ message: "No action" }, { status: 400 });
  }
}

export default function () {
  const [recipes, setRecipes] = useState<MealPlanCreateInput | null>(null);
  const [action, setAction] = useState<"new" | "old" | null>(null);
  const [hasToOpenModal, setHasToOpenModal] = useState(true);
  const fetchRandomRecipes = useFetcher();
  const updateServings = useSubmit();
  const { recipes: cachedRecipes } = useLoaderData<{
    recipes: MealPlanCreateInput;
  }>();

  const modal = useRef(null);

  const getActionToPerform = (action: "new" | "old" | null) => {
    setAction(action);
  };

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

  console.log("RECIPES", recipes);

  useEffect(() => {
    if (fetchRandomRecipes.data?.recipes) {
      setRecipes(fetchRandomRecipes.data.recipes);
      setHasToOpenModal(false);
    }
  }, [fetchRandomRecipes.data]);

  useEffect(() => {
    if (cachedRecipes) {
      setRecipes(cachedRecipes);
      setHasToOpenModal(false);
    }
  }, [cachedRecipes]);

  useEffect(() => {
    if (action === "new" || action === "old") {
      setHasToOpenModal(false);
    }
  }, [action]);

  return (
    <>
      <ModalNotRoute
        getActionToPerform={getActionToPerform}
        isOpen={hasToOpenModal}
      />
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
                            <button type="submit" name="action" value="remove">
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
          <Form
            method="POST"
            className="w-full flex justify-center my-10 cursor-pointer"
          >
            <SubmitButton
              text="Generate shopping list"
              name="action"
              value="getShoppingList"
            />
          </Form>
        </div>
      )}
      {!recipes && <Intro action={action} />}
    </>
  );
}
