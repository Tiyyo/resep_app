import type { LoaderArgs } from "@remix-run/node";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import meal_plans from "~/api/meal_plans";
import ArrowRightIcon from "~/assets/icons/ArrowRightIcon";
import TitleLevel1 from "~/components/title/TitleLevel1";
import NotFoundError from "~/helpers/errors/not.found.error";
import ResponseError from "~/helpers/response/response.error";
import formatDate from "~/utils/format.date";
import { getProfile } from "~/utils/get.user.infos";
import { useState, useEffect } from "react";
import type { MealPlan } from "~/types";

export async function loader({ request }: LoaderArgs) {
  try {
    const profile = await getProfile(request);
    if (!profile) throw new Error("no profile found");

    const mealPlans = await meal_plans.findAllByAuthor(profile.id, true);
    if (!mealPlans) throw new NotFoundError("no meal plans found");

    return mealPlans;
  } catch (error) {
    return new ResponseError(error);
  }
}

export default function () {
  const mealPlans = useLoaderData();
  const navigate = useNavigate();
  const [navMealPlansIndex, setNavMealPlansIndex] = useState<number>(0);

  const goNext = (index: number) => {
    index === mealPlans.length - 1
      ? setNavMealPlansIndex(0)
      : setNavMealPlansIndex(index + 1);
  };

  const goPrev = (index: number) => {
    if (index === 0) {
      setNavMealPlansIndex(mealPlans.length - 1);
    } else {
      setNavMealPlansIndex(navMealPlansIndex - 1);
    }
  };

  const handleClickNext = () => {
    goNext(navMealPlansIndex);
  };

  const handleClickPrev = () => {
    goPrev(navMealPlansIndex);
  };

  useEffect(() => {
    if (!mealPlans[navMealPlansIndex]?.id) return;
    navigate(`/home/meal_plans/my_plans/${mealPlans[navMealPlansIndex].id}`);
  }, [navMealPlansIndex, navigate]);

  return (
    <div>
      <TitleLevel1 title="Meal plans" />
      <div className="no-scrollbar hidden h-8 w-full flex-nowrap justify-evenly overflow-x-scroll  border-b-2 border-t-2 border-b-secondary-400 border-t-secondary-400 py-1 text-8 font-semibold lg:flex xl:text-7">
        {mealPlans.map((mealPlan: MealPlan) => (
          <NavLink to={`${mealPlan.id}`} key={mealPlan.id + 1}>
            <p className="w-screen sm:w-fit">
              {mealPlan?.created_at && formatDate(mealPlan?.created_at)}
            </p>
          </NavLink>
        ))}
      </div>
      <div className="center text-9 no-scrollbar 50 relative flex h-8 flex-nowrap overflow-x-scroll border-b-2 border-t-2 border-b-secondary-400 border-t-secondary-400 py-1 font-semibold lg:hidden">
        <button
          type="button"
          className="absolute left-1 z-10"
          onClick={handleClickPrev}
        >
          <div className="rotate-180">
            <ArrowRightIcon />
          </div>
        </button>
        <p className="tab w-screen  px-7 font-semibold text-text-accent sm:w-full">
          {mealPlans[navMealPlansIndex]?.created_at &&
            formatDate(mealPlans[navMealPlansIndex].created_at)}
        </p>
        <button
          type="button"
          className="absolute right-1 top-1/2 h-5 w-5 -translate-y-1/2"
          onClick={handleClickNext}
          data-nav="next"
        >
          <ArrowRightIcon />
        </button>
      </div>
      {(!mealPlans || mealPlans.length === 0) && (
        <>
          <p className="mt-8 text-center">
            You have not generate any meal plan yet{" "}
          </p>
          <p className="my-2 text-center">
            &#8608; &#8608;
            <Link
              to="/home/meal_plans/generate"
              className="font-semibold underline"
            >
              Try here
            </Link>
            &#8606; &#8606;
          </p>
        </>
      )}
      <Outlet />
    </div>
  );
}
