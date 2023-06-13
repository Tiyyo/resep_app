import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Outlet,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { promiseHash } from "remix-utils";
import {
  getCategories,
  getIcons,
  getIngredients,
  getMacros,
} from "~/api/get.all.request";
import type { IngredientCreateForm } from "~/api/post.request";
import { addIngredients } from "~/api/post.request";
import Error from "~/components/error";
import Input from "~/components/input";
import SelectSearch from "~/components/select_search";
import SubmitButton from "~/components/submit_button";
import { convertStringToNumber } from "~/helpers/convert.to.number";
import * as Z from "zod";
import { validationError } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import Table from "~/components/table";
import { UpdateIngredientsForm } from "~/components/update_forms";

export async function loader({ request }: LoaderArgs) {
  return json(
    await promiseHash({
      categories: getCategories(),
      macros: getMacros(),
      icons: getIcons(),
      ingredients: getIngredients(),
    })
  );
}

export const validator = withZod(
  Z.object({
    name: Z.string().toLowerCase(),
    categoryId: Z.string(),
    unitWeight: Z.string().optional(),
    macrosId: Z.string().optional(),
    iconId: Z.string().optional(),
  })
);

export async function action({ request }: ActionArgs) {
  const formData = await validator.validate(await request.formData());
  if (formData.error) return validationError(formData.error);

  const { iconId, categoryId, macrosId, name, unitWeight } = formData.data;

  const fieldToConvert = {
    iconId,
    categoryId,
    macrosId,
    unitWeight,
  };

  const formConverted = convertStringToNumber(fieldToConvert);
  let form: IngredientCreateForm;

  form = {
    name,
    categoryId: formConverted.categoryId,
    iconId: formConverted.iconId,
    macrosId: formConverted.macrosId,
    unitWeight: formConverted.unitWeight,
  };

  console.log(typeof form.unitWeight);

  try {
    await addIngredients(form);
    return json({ status: 200 });
  } catch (error: any) {
    return json({ error: error.message }, { status: 400 });
  }
}

export default function () {
  // can't type useLoaderData bugs still not fixed
  // convert type to Serialize object
  const { categories, macros, icons, ingredients } = useLoaderData();
  const navigation = useNavigation();
  const addIngredientFormRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData();

  // change location to an execution on server
  const dataIngr = ingredients.map((ingr) => {
    return {
      id: ingr.id,
      image: ingr.icon.link,
      name: ingr.name,
      unit_weight: ingr.unit_weight ?? "",
      category: ingr.category.name,
      calories: ingr.macros.calories,
      proteins: ingr.macros.proteins,
      carbs: ingr.macros.carbs,
      fat: ingr.macros.fat,
      water: ingr.macros.water,
    };
  });


  useEffect(() => {
    if (
      navigation.state == "idle" &&
      addIngredientFormRef &&
      addIngredientFormRef.current
    ) {
      addIngredientFormRef.current.reset();
    }
  }, [navigation.state]);

  return (
    <div>
      <Outlet context={{ UpdateForm : UpdateIngredientsForm}}/>
      <Form method="POST">
        <div className="flex flex-wrap justify-center gap-3 mt-3">
          <Input name="name" placeholder="Ingredient name" label="Name" />
          <Input
            type="number"
            width="12"
            name="unitWeight"
            label="Average weight for 1 unit"
            placeholder="g/ml"
          />
          <SelectSearch
            name="categoryId"
            data={categories}
            index="id"
            filterBy="name"
            placeholder="Pick a category"
          />
          <SelectSearch
            name="macrosId"
            data={macros}
            index="id"
            filterBy="food"
            optionMax={5}
            placeholder="Food reference"
          />
          <SelectSearch
            name="iconId"
            data={icons}
            index="id"
            filterBy="name"
            optionMax={5}
            placeholder="Search for an Icon"
          />
          <SubmitButton text="Add ingredient" />
        </div>
        <Error message={actionData?.error} />
      </Form>
      {ingredients ? (
        <Table data={dataIngr} image={true} search="name" endpoint="/api/ingredients"/>
      ) : (
        ""
      )}
    </div>
  );
}
