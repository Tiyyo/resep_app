import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
} from "@remix-run/react";
import { promiseHash } from "remix-utils";
import {
  getCategories,
  getIcons,
  getIngredients,
  getMacros,
  getUnitMeasures,
} from "~/api/get.all.request";
import { getRecipeById } from "~/api/get.one.by.id.request";
import Table from "~/components/table";
import  UpdateIngredientsForm  from "~/components/update_forms";

export async function loader({ request }: LoaderArgs) {
  return json(
    await promiseHash({
      categories: getCategories(),
      macros: getMacros(),
      icons: getIcons(),
      ingredients: getIngredients(),
    })) 
}


export default function () {
  // can't type useLoaderData bugs still not fixed
  // convert type to Serialize object
  const { ingredients, recipe } = useLoaderData();

  console.log(recipe);

  // change location to an execution on server
  // add type
  const dataIngr = ingredients.map((ingr : any) => {
    return {
      id: ingr.id,
      image: ingr.icon?.link,
      name: ingr.name,
      unit_weight: ingr.unit_weight ?? "",
      category: ingr.category.name,
      calories: ingr.macros?.calories,
      proteins: ingr.macros?.proteins,
      carbs: ingr.macros?.carbs,
      fat: ingr.macros?.fat,
      water: ingr.macros?.water,
    };
  });


  return (
    <div>
      <Outlet context={{ UpdateForm : UpdateIngredientsForm}}/>
      {ingredients ? (
        <Table data={dataIngr} image={true} search="name" endpoint="/api/ingredients"/>
      ) : (
        ""
      )}
    </div>
  );
}
