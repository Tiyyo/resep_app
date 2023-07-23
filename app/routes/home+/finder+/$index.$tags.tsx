import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import recipe from "~/api/recipe";
import Finder from "~/components/finder";
import ServerError from "~/helpers/errors/server.error";
import UserInputError from "~/helpers/errors/user.inputs.error";
import ResponseError from "~/helpers/response/response.error";
import { storage } from "~/service/auth.server";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request, params }: LoaderArgs) {
  try {
    if (!params.index) throw new ServerError("Invalid params");
    const positionMealToReplace = +params.index;
    const searchedTags = params.tags;
    const profile = await getProfile(request);
    if (!profile) throw new ServerError("Invalid profile : Unauthorized");
    switch (searchedTags?.toLowerCase()) {
      case "favorites": {
        const recipes = await recipe.findLikedByUser(profile.id);
        return {
          positionMealToReplace,
          recipes,
          searchedTags,
          profileId: profile.id,
        };
      }
      case "myrecipes": {
        const recipes = await recipe.findByAuthor(profile.id);
        return {
          positionMealToReplace,
          recipes,
          searchedTags,
          profileId: profile.id,
        };
      }
      case "chicken": {
        const recipes = await recipe.findByTags(["chicken"]);
        return {
          positionMealToReplace,
          recipes,
          searchedTags,
          profileId: profile.id,
        };
      }
      case "beef": {
        const recipes = await recipe.findByTags(["beef"]);
        return {
          positionMealToReplace,
          recipes,
          searchedTags,
          profileId: profile.id,
        };
      }
      case "fish": {
        const recipes = await recipe.findByTags(["fish"]);
        return {
          positionMealToReplace,
          recipes,
          searchedTags,
          profileId: profile.id,
        };
      }
      case "veggie": {
        const recipes = await recipe.findByTags(["vegetarian"]);
        return {
          positionMealToReplace,
          recipes,
          searchedTags,
          profileId: profile.id,
        };
      }
      case "all": {
        const recipes = await recipe.findAll();
        return {
          positionMealToReplace,
          recipes,
          searchedTags,
          profileId: profile.id,
        };
      }
      default: {
        return json({ error: "Invalid search params" });
      }
    }
  } catch (error) {
    return new ResponseError(error);
  }
}

export async function action({ request }: ActionArgs) {
  // Not very clear
  try {
    const formData = await request.formData();
    if (!formData.get("pickedMeal"))
      throw new UserInputError("No item has been chosen");

    const positionMealToReplace = formData.get("pickedMeal") as string;

    const session = await storage.getSession(request.headers.get("Cookie"));

    const mealPlan = session.get("meal_plan");

    const newMeal = {
      recipe_id: Number(formData.get("recipe_id")),
      recipe_name: formData.get("recipe_name"),
      image: formData.get("image"),
      servings: Number(formData.get("servings")),
    };

    mealPlan[+positionMealToReplace] = {
      ...mealPlan[+positionMealToReplace],
      ...newMeal,
    };

    session.set("meal_plan", mealPlan);

    return redirect("/home/meal_plans/generate", {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    });
  } catch (error) {
    return new ResponseError(error);
  }
}

export default function () {
  const { recipes: firstLoadedRecipes, profileId } = useLoaderData();

  return <Finder recipes={firstLoadedRecipes} profileId={profileId} />;
}
