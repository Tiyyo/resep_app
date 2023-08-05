import { type V2_MetaFunction, type LoaderArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import recipe from "~/api/recipe";
import Slider from "~/components/slider";
import useWindowSize from "~/hooks/useWindowsSize";
import LayoutRecipePages from "~/layout/LayoutRecipesPage";
import { getProfile } from "~/utils/get.user.infos";
import { useState, useEffect } from "react";
import { Toast } from "~/components/toast";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Resep ! Have control over your macros",
      description:
        "Home recipes pages with recommended recipes based on your preference",
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  // TODO promise all with Promise hash and build a cache for profileId
  const profile = await getProfile(request);
  const lastestRecipes = await recipe.findLast();
  const asianRecipes = await recipe.findByTags(["Asia", "Japan", "China"]);
  const italianRecipes = await recipe.findByTags(["Italy"]);
  if (!profile) {
    return json(
      {
        message: "no user found",
        asianRecipes,
        lastestRecipes,
        italianRecipes,
      },
      { status: 400 }
    );
  }
  const profileId = profile.id;
  return json({ profileId, asianRecipes, lastestRecipes, italianRecipes });
}

export default function () {
  const { profileId, asianRecipes, lastestRecipes, italianRecipes } =
    useLoaderData();
  const [axisCard, setAxisCard] = useState<"horizontal" | "vertical">(
    "vertical"
  );

  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize && windowSize.width > 1280) {
      setAxisCard("horizontal");
    }
  }, [windowSize.width, windowSize]);

  return (
    <>
      <Outlet />
      <Toast />
      <LayoutRecipePages title={"Recommended for you"}>
        <Slider
          banner={false}
          title="Just added"
          profileId={profileId}
          content={lastestRecipes}
          linkText="See all"
          link="/home/recipes/new"
          shouldBeCentered={true}
          navPosition="end"
        />
        <Slider
          banner={true}
          title="Asia"
          cardAxis={axisCard}
          content={asianRecipes}
          profileId={profileId}
          linkText="See all"
          link="/home/recipes/asia"
          navPosition={"end"}
        />
        <Slider
          banner={true}
          title="Italy"
          cardAxis={axisCard}
          content={italianRecipes}
          profileId={profileId}
          linkText="See all"
          link="/home/recipes/italy"
          navPosition={"end"}
        />
      </LayoutRecipePages>
    </>
  );
}
