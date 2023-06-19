import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { promiseHash } from "remix-utils";
import {
  getCategories,
  getIcons,
  getIngredients,
  getMacros,
} from "~/api/get.all.request";
import SubmitButton from "~/components/submit_button";
import SelectSearch from "~/components/select_search";
import Input from "~/components/input";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import Error from "~/components/error";

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

export default function () {
  const [clear, setClear] = useState(false)
  
  const { categories, macros, icons } = useLoaderData();
  const navigation = useNavigation();
  const addIngredientFormRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData();
  const addIngredient = useFetcher()


  useEffect(() => {
    if (
      addIngredient.state === "idle" &&
      addIngredientFormRef &&
      addIngredientFormRef.current
    ) {
      console.log('When this is working');
      addIngredientFormRef.current.reset();
      setClear(true)
      console.log(clear);
    }
    return () => setClear(false)
  }, [addIngredient.state]);

  return (
    // fixed top-0 left-0 bg-black-light min-h-screen w-full
    <div className="center w-full ">
      <addIngredient.Form method="POST" action="/api/ingredients" ref={addIngredientFormRef}>
        <div className="flex flex-col flex-wrap items-center justify-center gap-y-8 first-letter:mt-3">
          <div className="center gap-x-12 ">
            <Input name="name" placeholder="Ingredient name" label="Name" />

            <Input
              type="number"
              width="12"
              name="unitWeight"
              label="Average weight for 1 unit"
              placeholder="g/ml"
              
            />
          </div>
          <div className="center gap-x-12">
            <SelectSearch
              name="categoryId"
              data={categories}
              index="id"
              filterBy="name"
              placeholder="Pick a category"
              clear={clear}
            />
            <SelectSearch
              name="macrosId"
              data={macros}
              index="id"
              filterBy="food"
              optionMax={5}
              placeholder="Food reference"
              clear={clear}
            />
            <SelectSearch
              name="iconId"
              data={icons}
              index="id"
              filterBy="name"
              optionMax={5}
              placeholder="Search for an Icon"
              clear={clear}
            />
          </div>
          <div className="center ">
          <SubmitButton text="Add ingredient" />
          </div>
        </div>
        <Error message={actionData?.error} />
      </addIngredient.Form>
    </div>
  );
}
