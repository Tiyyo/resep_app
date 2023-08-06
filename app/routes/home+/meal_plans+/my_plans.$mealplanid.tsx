import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import category from "~/api/category";
import meal_plans from "~/api/meal_plans";
import ItemsGroup from "~/components/shopping";
import NotFoundError from "~/helpers/errors/not.found.error";
import ServerError from "~/helpers/errors/server.error";
import ResponseError from "~/helpers/response/response.error";
import { harmonzeUnit } from "~/utils/convert.grams.to.pieces";
import { getProfile } from "~/utils/get.user.infos";
import Carousel from "~/components/slider/index.carousel";
import MealPlanCard from "~/components/cards/index.meal.plan";
import type { Recipe } from "~/types";
import { groupIngrByCategory } from "~/service/group.list.by.cty.server";

export async function loader({ request, params }: LoaderArgs) {
  try {
    const { mealplanid } = params;
    if (!mealplanid && typeof mealplanid !== "string")
      throw new ServerError("no meal plan id found");
    const profile = await getProfile(request);

    if (!profile) throw new Error("no profile found");

    const mealPlans = await meal_plans.findById(Number(mealplanid), profile.id);
    const categories = await category.findAll();

    if (!mealPlans) throw new NotFoundError("no meal plan found");

    const mealsHarmonize = harmonzeUnit(mealPlans);
    if (!mealsHarmonize) throw new ServerError("Could not harmonize meals");
    const groupByCategory = groupIngrByCategory(categories, mealsHarmonize);

    return json({
      mealPlans,
      groupByCategory,
      categories,
      profileId: profile.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: "no profile found" }, { status: 401 });
    }
    return new ResponseError(error).send();
  }
}

export default function () {
  const { mealPlans, groupByCategory } = useLoaderData();

  const categoryName = Object.keys(groupByCategory);

  return (
    <>
      <div className="no-scrollbar relative flex w-full">
        <Carousel extraStyle="py-8" navPosition="spread">
          {mealPlans &&
            mealPlans.meals &&
            mealPlans.meals.length > 0 &&
            mealPlans.meals.map((recipe: Recipe, index: number) => (
              <MealPlanCard recipe={recipe} key={index} />
            ))}
        </Carousel>
      </div>
      <div className="flex w-full  flex-wrap content-start items-center justify-center gap-2">
        {categoryName.sort().map((name, index) => {
          if (groupByCategory[name].length <= 0) return null;
          return (
            <ItemsGroup
              key={index}
              data={groupByCategory}
              categoryName={name}
            />
          );
        })}
      </div>
    </>
  );
}
