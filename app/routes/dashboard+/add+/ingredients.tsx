import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { promiseHash } from "remix-utils";
import SubmitButton from "~/components/submit_button";
import SelectSearch from "~/components/select_search";
import Input from "~/components/input";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import Error from "~/components/error";
import category from "~/api/category";
import macro from "~/api/macro";
import icon from "~/api/icon";
import { Toast } from "~/components/toast";

export async function loader({ request }: LoaderArgs) {
  return json(
    await promiseHash({
      categories: category.findAll(),
      macros: macro.findAll(),
      icons: icon.findAll(),
    })
  );
}

export default function () {
  const [clear, setClear] = useState(false);

  // TODO check why this is not used currently
  // const [errorText, setErrorText] = useState("");

  const { categories, macros, icons } = useLoaderData();
  const addIngredientFormRef = useRef<HTMLFormElement>(null);
  const addIngredient = useFetcher();

  useEffect(() => {
    if (
      addIngredient.state === "idle" &&
      addIngredientFormRef &&
      addIngredientFormRef.current
    ) {
      // if (addIngredient?.data?.fields?.name) {
      //   setErrorText(addIngredient?.data?.fields?.name);
      // }
      // if (addIngredient.data?.error) {
      //   setErrorText(addIngredient.data?.error);
      // }

      if (addIngredient.data?.name === "ResponseValid") {
        setClear(true);
        addIngredientFormRef.current.reset();
      }

      addIngredientFormRef.current.reset();
    }
    return () => setClear(false);
  }, [
    addIngredient.state,
    addIngredient.data?.error,
    addIngredient.data?.fields?.name,
    addIngredient.data?.name,
  ]);

  return (
    <div className="center w-full ">
      <Toast message={addIngredient?.data?.message} />
      <addIngredient.Form
        method="POST"
        action="/api/ingredients"
        ref={addIngredientFormRef}
      >
        <div className="flex flex-col flex-wrap items-center justify-center gap-y-8 first-letter:mt-3">
          <div className="flex flex-col items-start gap-x-12 gap-y-8 md:flex-row ">
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
              <p className="self-center text-6">(optional)</p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-x-12 gap-y-6 md:flex-row">
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
              <p className="self-center px-2 text-6">(optional)</p>
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
              <p className="self-center px-2 text-6">(optional)</p>
            </div>
          </div>
          <div className="center ">
            <SubmitButton text="Add ingredient" />
          </div>
        </div>
        <div className="my-2">
          <Error message={addIngredient?.data?.error?.userMessage} />
        </div>
      </addIngredient.Form>
    </div>
  );
}
