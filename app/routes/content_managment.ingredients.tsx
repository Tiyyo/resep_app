import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getCategories } from "~/api/get.ingredient.categories";
import { getUnitComputes } from "~/api/get.unit_computes";
import Calories from "~/assets/icons/Calories";
import Carbs from "~/assets/icons/Carbs";
import Lipids from "~/assets/icons/Lipids";
import Proteins from "~/assets/icons/Proteins";
import Water from "~/assets/icons/Water";
import FieldForm from "~/components/recipe/inputs/input";
import InputWithIcon from "~/components/recipe/inputs/macro_inputs";
import SelectInput from "~/components/recipe/select_input";

export async function loader ({request} : LoaderArgs) {
        const categories = await getCategories()
        const unitComputes = await getUnitComputes()
        return {categories, unitComputes}
}

export async function action ({request} : ActionArgs) {
    const formData = await request.formData()
    const category = formData.get('category')
    console.log(category);
    return true

}




export default function () {
    const {categories, unitComputes} = useLoaderData()


  return (
//     <input
//     type="text"
//     placeholder="Type here"
//     className="input input-bordered w-full max-w-xs"
//   />
    <div>
      <p>Ingredient</p>
      <Form method="post">
        <FieldForm type="text" label="Name or Rename the Ingredient" nameInput="ingredientName" value="" />
      <SelectInput
        nameInput={"category"}
        label={"category"}
        options={categories}
      />
      <SelectInput
        nameInput={"unit"}
        label={"Choose an unit to use for all calculation"}
        options={unitComputes}
      />
      <FieldForm />
      <FieldForm />

      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
          />
          <button className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <InputWithIcon unit="kcal" name="calories">
        <Calories />
      </InputWithIcon>
      <InputWithIcon unit="g" name="carbs">
        <Carbs />
      </InputWithIcon>
      <InputWithIcon unit="g" name="proteins" >
        <Proteins />
      </InputWithIcon>
      <InputWithIcon  unit="g" name="lipids">
        <Lipids />
      </InputWithIcon>
      <InputWithIcon unit="ml" name="water">
        <Water />
      </InputWithIcon>
      <button type="submit" className="btn bg-secondary-200">
        Add Ingredient
      </button>
    </Form>
    </div>
  );
} 