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
    })
  );
}

export default function () {
  const [clear, setClear] = useState(false);

  // TODO check why this is not used currently
  const [errorText, setErrorText] = useState("");

  const { categories, macros, icons } = useLoaderData();
  const addIngredientFormRef = useRef<HTMLFormElement>(null);
  const addIngredient = useFetcher();

  useEffect(() => {
    if (
      addIngredient.state === "idle" &&
      addIngredientFormRef &&
      addIngredientFormRef.current
    ) {
      if (addIngredient?.data?.fields?.name) {
        setErrorText(addIngredient?.data?.fields?.name);
      }
      if (addIngredient.data?.error) {
        setErrorText(addIngredient.data?.error);
      }
      if (addIngredient.data?.status === 200) {
        setClear(true);
        addIngredientFormRef.current.reset();
      }

      addIngredientFormRef.current.reset();
    }
    return () => setClear(false);
  }, [addIngredient.state]);

  return (
    <div className="center w-full ">
      <addIngredient.Form
        method="POST"
        action="/api/ingredients"
        ref={addIngredientFormRef}
      >
        <div className="flex flex-col flex-wrap items-center justify-center gap-y-8 first-letter:mt-3">
          <div className="flex items-start gap-x-12 ">
            <div className="flex flex-col items-center">
              <Input
                name="name"
                placeholder="Ingredient name"
                label="Name"
                align="start"
              />
              <Error message={addIngredient?.data?.fieldErrors?.name} />
            </div>
            <div className="flex w-full">
              <Input
                type="number"
                width="14"
                name="unitWeight"
                label="Average weight for 1 unit"
                placeholder="g/ml"
              />
              <p className="text-6 self-center">(optional)</p>
            </div>
          </div>

          <div className="flex items-start  gap-x-12">
            <div>
              <SelectSearch
                name="categoryId"
                data={categories}
                index="id"
                filterBy="name"
                placeholder="Pick a category"
                clear={clear}
              />
              <Error message={addIngredient?.data?.fieldErrors?.categoryId} />
            </div>
            <div className="flex">
              <SelectSearch
                name="macrosId"
                data={macros}
                index="id"
                filterBy="food"
                optionMax={5}
                placeholder="Food reference"
                clear={clear}
              />
              <p className="text-6 px-2 self-center">(optional)</p>
            </div>
            <div className="flex">
              <SelectSearch
                name="iconId"
                data={icons}
                index="id"
                filterBy="name"
                optionMax={5}
                placeholder="Search for an Icon"
                clear={clear}
              />
              <p className="text-6 px-2 self-center">(optional)</p>
            </div>
          </div>
          <div className="center ">
            <SubmitButton text="Add ingredient" />
          </div>
        </div>
        <div className="my-2">
          <Error message={addIngredient?.data?.error} />
        </div>
      </addIngredient.Form>
    </div>
  );
}
