import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { map } from "zod";
import recipe from "~/api/recipe";
import SearchIcon from "~/assets/icons/SearchIcon";
import Finder from "~/components/finder";
import RecipeCard from "~/components/recipe/card";
import { storage } from "~/service/auth.server";
import { Recipe } from "~/types/recipe";
import { getProfile } from "~/utils/get.user.infos";
import { isLikedByUser } from "~/utils/is.liked.by.user";

export async function loader({ request, params }: LoaderArgs) {
  if (!params.index) return json({ error: "Invalid search params" });
  const positionMealToReplace = +params.index;
  const searchedTags = params.tags;
  const profile = await getProfile(request);
  if (!profile) return json({ error: "Invalid user" }, { status: 401 });

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
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  if (!formData.get("pickedMeal"))
    return json({ error: "No item has been chosen" });
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
}

export default function () {
  const { recipes: firstLoadedRecipes, profileId } = useLoaderData();

  return <Finder recipes={firstLoadedRecipes} profileId={profileId} />;
}
