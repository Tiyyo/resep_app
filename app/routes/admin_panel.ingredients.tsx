import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getCategories, getIcons, getMacros } from "~/api/get.all.request";
import SelectSearch from "~/components/select_search";

export async function loader({ request }: LoaderArgs) {
  const categories = await getCategories();
  const macros = await getMacros();
  const icons = await getIcons();
  return json({ categories, macros, icons });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const all = formData.get("icon");

  console.log(all, "ALL");

  return null;
}

export default function () {
  const { categories, macros, icons } = useLoaderData<typeof loader>();

  // state
  const [valueSearchIcon, setValueSearchIcon] = useState<string>("");

  return (
    <div>
      Ingredients edtion goes here
      <Form method="POST">
        <input type="text" id="name" name="name" />
        <input type="number" id="unitWeight" name="unitWeight" />
        <select name="ingredientCategories" id="ingredientCategories">
          <option value={"id categories"}>Option 1</option>
        </select>
        <div>
          <div>
            <input type="text" />
            <select name="macros" id="macros">
              <option id={"macro id"}>Macro 1</option>
              <option id={"macro2 id"}>Macro 2</option>
              <option id={"macro3 id"}>Macro 3</option>
            </select>
          </div>
          <SelectSearch
            name="macro"
            data={macros}
            index="id"
            filterBy="food"
            optionMax={5}
            placeholder="Search for a food reference"
          />
          <SelectSearch
            name="icon"
            data={icons}
            index="id"
            filterBy="name"
            optionMax={5}
            placeholder="Search for an Icon"
          />
        </div>
        <button type="submit">Add ingredients</button>
      </Form>
    </div>
  );
}
