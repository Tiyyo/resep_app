import { LoaderArgs, json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import meal_plans from "~/api/meal_plans";
import TitleLevel1 from "~/components/title/TitleLevel1";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
  const profile = await getProfile(request);
  if (!profile) return json({ error: "no profile found" });
  const mealPlans = await meal_plans.findAllByAuthor(profile.id);
  return mealPlans;
}

export default function () {
  const mealPlans = useLoaderData();

  const formatDate = (date: Date) => {
    const newDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
    return <p>{newDate}</p>;
  };

  return (
    <div>
      <TitleLevel1 title="Meal plans" />
      <div className="flex justify-evenly border-t-2  border-b-2 border-t-gray-950 border-b-gray-950 w-full py-1 font-semibold text-9 h-8">
        {mealPlans.map((mealPlan) => (
          <NavLink to={`${mealPlan.id}`} key={mealPlan.id + 1}>
            {formatDate(mealPlan.created_at)}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
