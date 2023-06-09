import { Macros } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ZodNull } from "zod";
import {
  getCategories,
  getIcons,
  getIngredients,
  getMacros,
} from "~/api/get.all.request";
import { addIngredients } from "~/api/post.request";
import Categories from "~/components/categories";
import { FormField } from "~/components/form_field";
import SelectInput from "~/components/recipe/select_input";
import SelectSearch from "~/components/select_search";
import { convertStringToNumber } from "~/helpers/convert.to.number";

export async function loader({ request }: LoaderArgs) {
  const categories = await getCategories();
  const macros = await getMacros();
  const icons = await getIcons();
  const ingredients = await getIngredients();
  return json({ categories, macros, icons, ingredients });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  let iconId: string | null;
  let macroId: string | null;
  let categoryId: string | null;
  let unitWeight: string | null;
  const name = formData.get("name");

  if (typeof formData.get("iconId") === "string" && formData.get("iconId")) {
    iconId = formData.get("iconId") as string;
  }

  if (typeof formData.get("macroId") === "string" && formData.get("macroId")) {
    macroId = formData.get("macroId") as string;
  }

  if (
    typeof formData.get("categoryId") === "string" &&
    formData.get("categoryId")
  ) {
    categoryId = formData.get("categoryId") as string;
  }

  if (
    typeof formData.get("unitWeight") === "string" &&
    formData.get("unitWeight")
  ) {
    unitWeight = formData.get("unitWeight") as string;
  }

  const idsTypeString = {
    iconId,
    macroId,
    categoryId,
    unitWeight,
  };

  const IdsTypeNumber = convertStringToNumber(idsTypeString);

  const form = { ...IdsTypeNumber, name };

  // convert falsy values to null
  for (const key in form) {
    if (!form[key as keyof typeof form]) form[key as keyof typeof form] = null;
  }

  const newIngredients = await addIngredients(form);

  return newIngredients;
}

export default function () {
  const { categories, macros, icons, ingredients } =
    useLoaderData<typeof loader>();

  return (
    <div>
      Ingredients edtion goes here
      <Form method="POST">
        <label htmlFor="name">Name this ingredient</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="unitWeight">
          Average weight for one unit ingredient
        </label>
        <input
          type="number"
          id="unitWeight"
          name="unitWeight"
          defaultValue={undefined}
          placeholder=""
        />
        <div>
          <SelectSearch
            name="categoryId"
            data={categories}
            index="id"
            filterBy="name"
            optionMax={categories.length}
            placeholder="Pick a category"
          />
          <SelectSearch
            name="macroId"
            data={macros}
            index="id"
            filterBy="food"
            optionMax={5}
            placeholder="Search for a food reference"
          />
          <SelectSearch
            name="iconId"
            data={icons}
            index="id"
            filterBy="name"
            optionMax={5}
            placeholder="Search for an Icon"
          />
        </div>
        <button type="submit">Add ingredients</button>
      </Form>
      <div>
        {/* {/*--- do check exist and length/*} */}
        {ingredients.map((ingredient) => {
          return <FullRow key={ingredient.id} ingredient={ingredient} />;
        })}
      </div>
    </div>
  );
}

function RowMacro({
  macros,
  allMacros,
}: {
  macros: Macros;
  allMacros: Array<Macros>;
}) {
  const [shouldChangeMacro, setShouldChangeMacro] = useState<boolean>(false);
  const [macroValues, setMacroValues] = useState({
    id: macros.id,
    calories: macros.calories,
    carbs: macros.carbs,
    proteins: macros.proteins,
    fat: macros.fat,
    water: macros.water,
  });
  const [newMacroId, setNewMacroId] = useState(null);

  function handleClick(e: any) {
    setShouldChangeMacro(true);
    setNewMacroId(null)
  }

  function getMacroId(state) {
    setNewMacroId(state);
    const newMacros = allMacros.find((m) => state.value === m.id);
    if (newMacros) {
      setMacroValues({
        id: newMacros.id,
        calories: newMacros.calories,
        carbs: newMacros.carbs,
        proteins: newMacros.proteins,
        fat: newMacros.fat,
        water: newMacros.water,
      });
    }
    setShouldChangeMacro(false);
  }

  console.log(allMacros);
  return (
    <>
      {shouldChangeMacro ? (
        newMacroId ? (
          <>
          </>
        ) : (
          <SelectSearch
            data={allMacros}
            index="id"
            filterBy="food"
            optionMax={5}
            name="macros"
            getState={getMacroId}
          />
        )
      ) : (
        <>
          <input type="number" defaultValue={macroValues.id} hidden />
          <div>{macroValues.calories}</div>
          <div>{macroValues.carbs}</div>
          <div>{macroValues.proteins}</div>
          <div>{macroValues.fat}</div>
          <div>{macroValues.water}</div>
          <div onClick={handleClick}>Del thoses macros</div>
        </>
      )}
    </>
  );
}

function FullRow({ ingredient }) {
  const deleteIngredient = useFetcher();
  const { macros } = useLoaderData();

  return (
    <div className="flex pt-5">
      <div className="aspect-square h-7 rounded-full overflow-hidden">
        <img src={ingredient.icon.link} alt="" />
      </div>
      <div>{ingredient.name}</div>
      <div>{ingredient.category.name}</div>

      <RowMacro macros={ingredient.macros} allMacros={macros} />

      <deleteIngredient.Form method="DELETE" action="/api/ingredients">
        <button type="submit" name="ingredientId" value={ingredient.id}>
          {" "}
          Delete Ingredient
        </button>
      </deleteIngredient.Form>
    </div>
  );
}
