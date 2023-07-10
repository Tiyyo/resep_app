import { json, type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getLastRecipes } from "~/api/get.all.request";
import { getRecipesByTags } from "~/api/get.many.by.request";
import Slider from "~/components/slider";
import LayoutRecipePages from "~/layout/LayoutRecipesPage";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
  const profile = await getProfile(request);
  const lastestRecipes = await getLastRecipes();
  const asianRecipes = await getRecipesByTags(["Asia", "Japan", "China"]);
  const italianRecipes = await getRecipesByTags(["Italy"]);
  if (!profile || !profile.id) {
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

  return (
    <LayoutRecipePages title="Recommended for you">
      <>
        <Outlet />
        <Slider
          banner={false}
          title="Just added"
          profileId={profileId}
          content={lastestRecipes}
          linkText="See all"
          link="/"
          shouldBeCentered={true}
        />
        <Slider
          banner={true}
          title="Asia"
          cardAxis="horizontal"
          content={asianRecipes}
          profileId={profileId}
          linkText="See all"
          link="/"
        />
        <Slider
          banner={true}
          title="Italy"
          cardAxis="horizontal"
          content={italianRecipes}
          profileId={profileId}
          linkText="See all"
          link="/"
        />
      </>
    </LayoutRecipePages>
  );
}
