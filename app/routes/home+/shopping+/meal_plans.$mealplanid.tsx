import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import meal_plans from "~/api/meal_plans";
import Input from "~/components/input";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request, params }: LoaderArgs) {
  const { mealplanid } = params;
  const profile = await getProfile(request);
  if (!profile) return json({ error: "no profile found" }, { status: 401 });
  if (typeof mealplanid === "string" && mealplanid) {
    const mealPlans = await meal_plans.findById(Number(mealplanid), profile.id);
    return json({ mealPlans });
  }

  return json({ error: "no meal plan found" }, { status: 404 });
}

export default function () {
  const { mealPlans } = useLoaderData();

  console.log(mealPlans);
  return (
    <>
      <div className="flex gap-x-4 py-4 overflow-scroll no-scrollbar">
        {mealPlans &&
          mealPlans.meals &&
          mealPlans.meals.length > 0 &&
          mealPlans.meals.map((recipe) => (
            <Fragment key={recipe.id}>
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
      <div>Here goes the shopping list</div>
    </>
  );
}
