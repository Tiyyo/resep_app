import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useContext, useState } from "react";

import SubmitButton from "~/components/submit_button";
import TitleLevel1 from "~/components/title/TitleLevel1";
import { Recipe } from "~/types/recipe";
// import { buildShoppingList } from "~/service/shopping.builder.server";
import { buildShoppingList } from "~/service/algo.builder.safer.server";
import Input from "~/components/input";
import {
  RecipeCardShop,
  ShoppingContext,
  ShoppingContextProvider,
} from "~/context/shoplist.context";
import { useEffect } from "react";
import recipe from "~/api/recipe";
import Wrapper from "~/layout/WrapperShoplist";
import { mealPlanStorage } from "~/session";

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
  return json({ recipes: null });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const action = formData.get("action");
  console.log(action);
  switch (action) {
    case "getRandom":
      const numRecipes = Number(formData.get("numRecipes"));
      const recipes = await recipe.findRandom(numRecipes);
      const session = await mealPlanStorage.getSession();
      session.set("meal_plan", recipes);
      return redirect("/home/shopping", {
        headers: {
          "Set-Cookie": await mealPlanStorage.commitSession(session),
        },
      });
    default:
      return json({ message: "No action" }, { status: 400 });
  }

  // const recipeIds = formData.getAll("recipeId");
  // const shoppingList = await buildShoppingList(recipeIds as string[]);
  // console.log(shoppingList);
}

export default function () {
  const [recipes, setRecipes] = useState<Array<RecipeCardShop> | null>(null);
  const fetchRandomRecipes = useFetcher();
  const { recipes: cachedRecipes } = useLoaderData();

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

  // const handleClickGenerate = (
  //   e: React.MouseEvent<HTMLFormElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   const value: number = Number(e.currentTarget.numRecipes.value);
  //   setNumRecipes(Math.abs(value));
  // };

  // const [recipes, setRecipes] = useState<Array<RecipeCardShop>>();
  // const [numRecipes, setNumRecipes] = useState<number | null>(null);

  // useEffect(() => {
  //   if (numRecipes) {
  //     fetcherRandomRecipes.load(`/api/recipes/random/${numRecipes}`);
  //   }
  // }, [numRecipes]);

  // useEffect(() => {
  //   setRecipes(fetcherRandomRecipes.data);
  // }, [fetcherRandomRecipes.data]);

  return (
    <div>
      <div>
        <TitleLevel1 title="Shopping" />
        {recipes && (
          <Form method="POST">
            <div className="flex justify-center flex-wrap gap-4">
              {recipes.map((recipe, index: number) => {
                return (
                  <div key={recipe.id}>
                    <input name="recipeId" hidden defaultValue={recipe.id} />
                    <div className="flex border p-2 bg-main-100 shadow-md h-44 aspect-2/1">
                      <div className="aspect-square basis-1/3">
                        <Link to={`/home/recipe/${recipe.id}`}>
                          <img
                            src={recipe.link}
                            alt={recipe.name}
                            className="h-full rounded-full p-2"
                          />
                        </Link>
                      </div>
                      <div className="flex flex-col justify-start">
                        <p className="min-h-8 text-8 font-semibold text-text-accent">
                          {recipe.name}
                        </p>
                        <div className="flex items-center text-8 opacity-90 flex-grow ">
                          <p className="text-7">
                            Number of people for that recipes ?{" "}
                          </p>
                          <Input
                            type="number"
                            name="parts"
                            width="14"
                            align="center"
                            step={1}
                            defaultValue={4}
                          />
                        </div>
                        <Link to={`/home/finder/${index}`}>
                          <p className="opacity-70 text-7 underline self-end cursor-pointer">
                            Change recipe
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center my-10 cursor-pointer">
              ADD ANOTHER RECIPE
            </div>
            <div className="w-full flex justify-center my-10">
              <SubmitButton text="Generate shopping list" />
            </div>
          </Form>
        )}
        {!recipes && (
          <fetchRandomRecipes.Form
            className="center flex-col gap-y-8"
            // onSubmit={handleClickGenerate}
            method="POST"
          >
            <p className="text-12 font-semibold text-text-accent_soft">
              How many meals do you want to prepare ?
            </p>
            <Input type="number" name="numRecipes" width="16" />
            <button type="submit" name="action" value="getRandom">
              Let's Go !
            </button>
            {/* <SubmitButton text="Let's Go !" /> */}
          </fetchRandomRecipes.Form>
        )}
      </div>
    </div>
  );
}
