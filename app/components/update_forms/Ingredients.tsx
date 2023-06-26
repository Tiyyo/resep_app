import { useFetcher } from "@remix-run/react";
import Input from "../input";
import SelectSearch from "../select_search";
import SubmitButton from "../submit_button";
import type { UpdateIngredientsFormProps } from "./interface";
import Error from "../error";
import { Category } from "../categories/interface";

export default function UpdateIngredientsForm({
  data: ingredient,
  categories,
  icons,
  macros,
}: UpdateIngredientsFormProps) {
  const updateIngredient = useFetcher();


  const defaultOptionIcon = {
    value: ingredient?.icon?.id,
    label: ingredient?.icon?.name,
  };

  const defaultOptionMacroId = {
    value: ingredient?.macros?.id,
    label: ingredient?.macros?.food,
  };

  const defaultOptionCategory = {
    value: ingredient.category.id,
    label: ingredient.category.name,
  };

  return (
    <updateIngredient.Form method="PATCH" action="/api/ingredients">
      <div className="flex flex-col flex-wrap items-center justify-center gap-y-8 first-letter:mt-3">
        <input type="text" hidden name="ingredientId" defaultValue={ingredient.id} />

        <div className="flex items-start gap-x-12 ">
          <div className="flex flex-col items-center">
            <Input
              name="name"
              placeholder="Ingredient name"
              label="Name"
              defaultValue={ingredient.name}
            />
            <Error message={updateIngredient?.data?.fieldErrors?.name} />
          </div>
          <div className="flex">
            <Input
              type="number"
              width="14"
              name="unitWeight"
              label="Average weight for 1 unit"
              placeholder="g/ml"
              defaultValue={ingredient.unit_weight}
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
              defaultValue={defaultOptionCategory}
            />
            <Error message={updateIngredient?.data?.fieldErrors?.categoryId} />
          </div>
          <div className="flex">
            {ingredient?.macros?.food ? (
              <SelectSearch
                name="macrosId"
                data={macros}
                index="id"
                filterBy="food"
                optionMax={5}
                placeholder="Food reference"
                defaultValue={{
                  value: ingredient?.macros?.id,
                  label: ingredient?.macros?.food,
                }}
              />
            ) : (
                <SelectSearch
                name="macrosId"
                data={macros}
                index="id"
                filterBy="food"
                optionMax={5}
                placeholder="Food reference"
                defaultValue={{
                  value: ingredient?.macros?.id,
                  label: "",
                }}
              />
            )}

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
              defaultValue={defaultOptionIcon}
            />
            <p className="text-6 px-2 self-center">(optional)</p>
          </div>
        </div>
        <div className="center ">
          <SubmitButton text="Add ingredient" />
        </div>
      </div>
      <div className="my-2">
        <Error message={updateIngredient?.data?.error} />
      </div>
    </updateIngredient.Form>
  );
}
