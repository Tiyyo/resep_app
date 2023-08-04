import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { Fragment, useEffect, useRef, useState } from "react";
import category from "~/api/category";
import meal_plans from "~/api/meal_plans";
import LongArrowRightIcon from "~/assets/icons/LongArrowIcon";
import ServingIcon from "~/assets/icons/ServingsIcon";
import ItemsGroup from "~/components/shopping";
import NotFoundError from "~/helpers/errors/not.found.error";
import ServerError from "~/helpers/errors/server.error";
import ResponseError from "~/helpers/response/response.error";
import { harmonzeUnit } from "~/utils/convert.grams.to.pieces";
import { motion } from "framer-motion";
import { getProfile } from "~/utils/get.user.infos";

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

    // create a function to do this
    const groupByCategory = {};

    categories.map((c) => {
      return (groupByCategory[c.name] = []);
    });
    mealsHarmonize.forEach((m) => {
      const matchingCategory = categories.find((c) => c.id === m.category_id);
      groupByCategory[matchingCategory.name].push(m);
    });

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

export default function ({}) {
  const { mealPlans, groupByCategory } = useLoaderData();
  const [width, setWidth] = useState<number | null>(2);
  const [scrollXValue, setScrollXvalue] = useState<number>(0);
  const carousel = useRef<HTMLDivElement>(null);
  const innerCarousel = useRef<HTMLDivElement>(null);
  const params = useParams();

  const categoryName = Object.keys(groupByCategory);

  function nextSlide() {
    // if (widthCard === null) return;
    console.log(scrollXValue, "scroll position");
    console.log(scrollXValue - 200, "scroll + delta");
    console.log(width, "width");
    // if (scrollXValue + 200)
    if (!width) return;
    if (Math.abs(scrollXValue - 200) > width) {
      console.log("is working");
      setScrollXvalue(-width);
    } else {
      setScrollXvalue(scrollXValue - 200);
    }
  }

  function prevSlide() {
    // if (widthCard === null) return;
    if (!width) return;
    if (scrollXValue + 200 > 0) {
      setScrollXvalue(0);
    } else {
      setScrollXvalue(scrollXValue + 200);
    }
  }

  const handleClickNav = (e) => {
    if (e.currentTarget.dataset.nav === "prev") {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  useEffect(() => {
    if (carousel?.current) {
      console.log(carousel.current.scrollWidth);
      console.log(carousel.current.offsetWidth);
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [params.mealplanid]);

  return (
    <>
      <div className="no-scrollbar relative flex w-full">
        <button
          type="button"
          className="absolute bottom-0 left-2 hidden cursor-pointer text-secondary-300 lg:flex"
          data-nav="prev"
          onClick={handleClickNav}
        >
          <LongArrowRightIcon />
        </button>
        <button
          className="absolute bottom-0 right-2 hidden rotate-180 cursor-pointer text-secondary-300 lg:flex"
          data-nav="next"
          onClick={handleClickNav}
        >
          <LongArrowRightIcon />
        </button>
        <motion.div
          className="no-scrollbar flex w-full gap-x-6 overflow-x-scroll px-6 py-8 "
          ref={carousel}
        >
          <motion.div
            drag="x"
            whileTap={{ cursor: "grabbing" }}
            // dragConstraints={{ right: 0, left: -width }}
            className="flex w-full gap-x-6"
            ref={innerCarousel}
            animate={{ x: scrollXValue }}
            transition={{ ease: "easeInOut", duration: 1 }}
          >
            {mealPlans &&
              mealPlans.meals &&
              mealPlans.meals.length > 0 &&
              mealPlans.meals.map((recipe, index: number) => (
                <div
                  key={index}
                  className="flex h-32 w-[120px] min-w-[120px] flex-col rounded-b-lg rounded-t-3xl bg-main-100 px-2 shadow-sober"
                >
                  <div className="relative -left-3 -top-2 flex items-center justify-between scroll-smooth">
                    <img
                      src={recipe.image}
                      alt={recipe.recipe_name}
                      className="aspect-square w-16 rounded-full "
                    />
                    <div className="flex">
                      <ServingIcon size="4" />
                      <p>{recipe.servings}</p>
                    </div>
                  </div>
                  <p className="my-auto text-7 font-semibold text-text-accent">
                    {recipe.recipe_name}
                  </p>
                </div>
              ))}
          </motion.div>
        </motion.div>
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
