import { LoaderArgs } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import meal_plans from "~/api/meal_plans";
import TitleLevel1 from "~/components/title/TitleLevel1";
import NotFoundError from "~/helpers/errors/not.found.error";
import ResponseError from "~/helpers/response/response.error";
import formatDate from "~/utils/format.data";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
  try {
    const profile = await getProfile(request);
    if (!profile) throw new Error("no profile found");

    const mealPlans = await meal_plans.findAllByAuthor(profile.id);
    if (!mealPlans) throw new NotFoundError("no meal plans found");

    return mealPlans;
  } catch (error) {
    return new ResponseError(error);
  }
}

export default function () {
  const mealPlans = useLoaderData();

  return (
    <div>
      <TitleLevel1 title="Meal plans" />
      <div className="text-9 flex h-8  w-full justify-evenly border-b-2 border-t-2 border-b-gray-950 border-t-gray-950 py-1 font-semibold">
        {mealPlans.map((mealPlan) => (
          <NavLink to={`${mealPlan.id}`} key={mealPlan.id + 1}>
            <p>{formatDate(mealPlan.created_at)}</p>
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
