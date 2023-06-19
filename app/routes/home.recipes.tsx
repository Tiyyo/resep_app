import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { getRecipeById } from "~/api/get.one.by.id.request";
import { recipe } from "~/utils/recipe.builder.server";

export async function loader({ request }) {
  const recipe = await getRecipeById(1);
  return recipe;
}

export default function () {

  return <div>Home to recipes</div>;
}
