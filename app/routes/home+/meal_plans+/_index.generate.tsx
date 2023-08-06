import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import { useState, useEffect } from "react";

import SubmitButton from "~/components/submit_button";
import TitleLevel1 from "~/components/title/TitleLevel1";
// import { buildShoppingList } from "~/service/shopping.builder.server";
import { buildShoppingList } from "~/service/algo.builder.safer.server";
// import type { RecipeCardShop } from "~/context/shoplist.context";
import recipe from "~/api/recipe";
import meal_plans from "~/api/meal_plans";
import { getProfile } from "~/utils/get.user.infos";
import { getUserSession, storage } from "~/service/auth.server";
import Intro from "~/components/meal_plans/index.intro";
import ModalNotRoute from "~/components/modal/index.not.route";
import shopping_lists from "~/api/shopping_lists";
import DashedBtn from "~/components/button/DashedBtn";
import CardMeals from "~/components/cards/index.meals";
import type { Meal } from "~/types";

export interface RecipeCardShop {
  id: number;
  image_id: number;
  link: string;
  name: string;
}

export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);
  const mealPlan = session.get("meal_plan");

  if (mealPlan) {
    return json({ recipes: mealPlan });
  }
  return json({ message: "No plan saved in session" });
}

export async function action({ request }: ActionArgs) {
  const profile = await getProfile(request);
  if (!profile) {
    return redirect("/login");
  }
  const formData = await request.formData();
  const action = formData.get("action");
  const position = Number(formData.get("position"));

  const session = await getUserSession(request);
  const mealPlan = session.get("meal_plan");

  switch (action) {
    case "getRandom": {
      const numRecipes = Number(formData.get("numRecipes"));
      // TODO send a message to users instead of formating the value for them

      if (isNaN(numRecipes)) {
        return json(
          { error: { numRecipes: "Please enter a number" } },
          { status: 400 }
        );
      }
      if (numRecipes < 1) {
        return json(
          {
            error: {
              numRecipes: "Please enter a number greater than 0",
            },
          },
          { status: 400 }
        );
      }
      const numberOfRecipesToGenerate = Math.floor(Math.abs(numRecipes));
      const recipes = await recipe.findRandom(numberOfRecipesToGenerate);
      session.set("meal_plan", recipes);
      return json(
        { recipes },
        {
          headers: {
            "Set-Cookie": await storage.commitSession(session),
          },
          status: 201,
        }
      );
    }
    case "getShoppingList": {
      const mealPlanSaved = await meal_plans.add(profile.id, mealPlan);
      const shoppingList = await buildShoppingList(mealPlan);

      if (!mealPlanSaved)
        return json(
          { message: "Error while saving meal plan" },
          { status: 500 }
        );

      const shoppingListSaved = await shopping_lists.add(
        Number(mealPlanSaved.id),
        shoppingList
      );
      if (!shoppingListSaved)
        return json(
          { message: "Error while saving shopping list" },
          { status: 500 }
        );
      session.unset("meal_plan");
      return redirect(`/home/meal_plans/my_plans/${mealPlanSaved.id}`, {
        headers: { "Set-Cookie": await storage.commitSession(session) },
        status: 301,
      });
      // return "hello world";
    }
    case "remove": {
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
      const mealPlan = await meal_plans.findLast(profile.id);

      if (!mealPlan.meals)
        return json({ message: "No meal plan found" }, { status: 404 });

      const meals = mealPlan.meals.map((meal) => meal.meals);
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
  const [recipes, setRecipes] = useState<Meal[] | null>(null);
  const [action, setAction] = useState<"new" | "old" | null>(null);
  const [hasToOpenModal, setHasToOpenModal] = useState(true);
  const fetchRandomRecipes = useFetcher();
  const updateServings = useSubmit();
  const { recipes: cachedRecipes } = useLoaderData();

  const getActionToPerform = (action: "new" | "old" | null) => {
    setAction(action);
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    updateServings(e.currentTarget, { method: "POST" });
  };

  const handleIncrAndDecr = (value: string, copyArr: any, position: number) => {
    const increaseServings = () => {
      copyArr[position].servings++;
    };

    const decreaseServings = () => {
      if (copyArr[position].servings - 1 >= 1) copyArr[position].servings--;
    };

    value === "increase" ? increaseServings() : decreaseServings();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //TODO do a deep copy instead
    let copyRecipes;
    if (!recipes) return;
    copyRecipes = [...recipes];
    const position = Number(e.currentTarget.dataset.position);
    const value = e.currentTarget.value;
    handleIncrAndDecr(value, copyRecipes, position);
    setRecipes(copyRecipes);
  };

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
    <div>
      <ModalNotRoute
        getActionToPerform={getActionToPerform}
        isOpen={hasToOpenModal}
      />
      <TitleLevel1 title="Meal plans generator" />
      {recipes && (
        <>
          <div className="flex flex-wrap justify-center gap-4">
            {recipes.map((recipe: Meal, index: number) => {
              return (
                <Form
                  method="POST"
                  key={recipe.recipe_id * index}
                  onChange={handleChange}
                >
                  <CardMeals
                    handleServings={handleClick}
                    index={index}
                    recipe={recipe}
                  />
                </Form>
              );
            })}
          </div>
          <DashedBtn
            value={"ADD ANOTHER RECIPE"}
            link={`/home/finder/${recipes.length}`}
          />
          <Form
            method="POST"
            className="my-10 flex w-full cursor-pointer justify-center"
          >
            <SubmitButton
              text="Generate shopping list"
              name="action"
              value="getShoppingList"
            />
          </Form>
        </>
      )}
      {!recipes && <Intro action={action} />}
    </div>
  );
}
