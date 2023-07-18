import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import meal_plans from "~/api/meal_plans";
import shopping_lists from "~/api/shopping_lists";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";
import { buildShoppingList } from "~/service/algo.builder.safer.server";

import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request, params }: LoaderArgs) {
  const { mealplanid } = params;
  const profile = await getProfile(request);
  if (!profile) return json({ error: "no profile found" }, { status: 401 });
  if (typeof mealplanid === "string" && mealplanid) {
    const mealPlans = await meal_plans.findById(Number(mealplanid), profile.id);
    // if (!mealPlans)
    //   return json({ error: "no meal plan found" }, { status: 404 });

    // Move to genration meal plan
    // const mealIds = mealPlans.meals.map((meal) => { recipe_id : meal.recipe_id , servings : meal.servings});
    const shoppingList = await buildShoppingList(mealPlans.meals);
    console.log(shoppingList, "SHOPING LIST");

    const shoppingListSaved = await shopping_lists.add(
      Number(mealplanid),
      shoppingList
    );

    return json({
      mealPlans,
      profileId: profile.id,
      // shoppingListSaved,
    });
  }

  return json({ error: "no meal plan found" }, { status: 404 });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const mealPlanId = formData.get("mealPlanId");
  const profileId = formData.get("profileId");
  // if (typeof mealPlanId === "string"  && typeof profileId === "string") {
  //   const mealIds = await
  // }

  return "hehe";
}

export default function () {
  const { mealPlans, profileId, shoppingListSaved } = useLoaderData();

  // console.log(mealPlans);

  return (
    <>
      <div className="flex gap-x-4 py-4 overflow-scroll no-scrollbar">
        {mealPlans &&
          mealPlans.meals &&
          mealPlans.meals.length > 0 &&
          mealPlans.meals.map((recipe, index) => (
            <Fragment key={index}>
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
                  <div className="flex items-center text-8 opacity-90 flex-grow ">
                    <p className="text-7">Number of people for that recipes </p>
                    <Input
                      type="number"
                      name="parts"
                      width="14"
                      align="center"
                      step={1}
                      value={recipe.servings}
                      disabled
                      // onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
      </div>
      <div className="center flex-col">
        {/* <Form method="POST">
          <input
            type="text"
            name="mealPlanId"
            hidden
            defaultValue={mealPlans.id}
          />
          <input type="text" name="profileId" hidden defaultValue={profileId} />
          <SubmitButton text="generate shopping list" />
        </Form> */}
        <div className="flex center flex-wrap gap-4 p-4">
          {mealPlans.shopping &&
            mealPlans.shopping.map((item) => {
              console.log(item);
              return (
                <div
                  key={item.id}
                  className="flex rounded-2xl items-center gap-x-2 w-52 bg-main-100 px-4 py-1"
                >
                  <img
                    src={item.ingredient.icon?.link}
                    className="rounded-full h-8 aspect-square"
                  />
                  <p className="text-8 opacity-80 flex-grow">
                    {item.ingredient.name}
                  </p>
                  <p className="text-7 opacity-80 w-[20%]">
                    {item.qty}
                    <span>{item.unit_measure.abreviation}</span>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
