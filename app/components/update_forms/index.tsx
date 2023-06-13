import { Form, useFetcher } from "@remix-run/react";
import Input from "../input";
import SubmitButton from "../submit_button";
import FileInput from "../file_input";
import SelectSearch from "../select_search";

export default function UpdateMacrosForm({ data: macros }) {
  const updateMacros = useFetcher();
  return (
    <updateMacros.Form method="PATCH" action="/api/macros">
      <div className="flex center gap-x-4">
        <input type="text" name="id" defaultValue={macros.id} hidden/>
        <Input
          label="Food"
          name="food"
          type="text"
          unit=""
          width="25"
          defaultValue={macros.food}
        />
        <Input
          label="Calories"
          unit="g"
          type="number"
          name="calories"
          width="12"
          defaultValue={macros.calories}
        />
        <Input
          label="Proteins"
          unit="g"
          type="number"
          name="proteins"
          width="12"
          defaultValue={macros.proteins}
        />
        <Input
          label="Carbs"
          unit="g"
          type="number"
          name="carbs"
          width="12"
          defaultValue={macros.carbs}
        />
        <Input
          label="Fat"
          unit="g"
          type="number"
          name="fat"
          width="12"
          defaultValue={macros.fat}
        />
        <Input
          label="Water"
          unit="ml"
          type="number"
          name="water"
          width="12"
          defaultValue={macros.water}
        />
        <SubmitButton text="Edit food" />
      </div>
    </updateMacros.Form>
  );
}

export function UpdateCategoriesForm({ data: category }) {
  const updateCategory = useFetcher();
  return (
    <updateCategory.Form method="PATCH" action="/api/categories">
      <div className="flex justify-center gap-x-3">
        <input type="text" name="id" defaultValue={category.id} hidden/>
        <Input name="category" placeholder="Category name" defaultValue={category.name}/>
        <SubmitButton text="Edit Category" />
      </div>
    </updateCategory.Form>
  );
}

export function UpdateIconsForm({ data: icon }) {
  const updateIcon = useFetcher();
    console.log(icon);

  return (
    <Form method="PATCH" encType="multipart/form-data" action="/api/icons">
      <div className="flex center gap-x-4">
        <input type="text" hidden name="id" defaultValue={icon.id}/>
        <input type="text" hidden name="imageLink" defaultValue={icon.link}/>
        <input type="text" hidden name="imageKey" defaultValue={icon.image_key}/>
        <Input name="name" placeholder="Icon name" defaultValue={icon.name}/>
        <Input name="tags" placeholder="Tags" defaultValue={icon.tags.join(" ")}/>
        <FileInput />
        <SubmitButton text="Edit icon" />
      </div>
      {/* <Error message={actionData?.error} /> */}
    </Form>
  );
}

export function UpdateIngredientsForm({ data: ingredient , categories, icons, macros }) {
  const updateIngredient = useFetcher();

  console.log(ingredient)

  const defaultOptionIcon = {
    value : ingredient.icon.id,
    label : ingredient.icon.name
  }

  const defaultOptionMacroId = {
    value : ingredient.macros.id,
    label : ingredient.macros.food
  }

  const defaultOptionCategory = {
    value : ingredient.category.id,
    label : ingredient.category.name
  }

  console.log(defaultOptionIcon);


  return (
    <updateIngredient.Form method="PATCH" action="/api/ingredients">
      <div className="flex flex-wrap justify-center gap-3 mt-3">
        <input type="text" hidden name="id" defaultValue={ingredient.id} />
        <Input name="name" placeholder="Ingredient name" label="Name" defaultValue={ingredient.name}/>
        <Input
          type="number"
          width="12"
          name="unitWeight"
          label="Average weight for 1 unit"
          placeholder="g/ml"
          defaultValue={ingredient.unit_weight}
        />
        <SelectSearch
          name="categoryId"
          data={categories}
          index="id"
          filterBy="name"
          placeholder="Pick a category"
          defaultValue={defaultOptionCategory}
        />
        <SelectSearch
          name="macrosId"
          data={macros}
          index="id"
          filterBy="food"
          optionMax={5}
          placeholder="Food reference"
          defaultValue={defaultOptionMacroId}
        />
        <SelectSearch
          name="iconId"
          data={icons}
          index="id"
          filterBy="name"
          optionMax={5}
          placeholder="Search for an Icon"
          defaultValue={defaultOptionIcon}
        />
        <SubmitButton text="Add ingredient" />
      </div>
      {/* <Error message={actionData?.error} /> */}
    </updateIngredient.Form>
  );
}
