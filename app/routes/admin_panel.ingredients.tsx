import type { LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function loader ({request} : LoaderArgs) {



return null
}


export default function () {
  return (
    <div>
      Ingredients edtion goes here
      <Form>
          <input type="text" id="name" name="name" />
          <input type="number" id="unitWeight"  name="unitWeight"/>
          <select name="ingredientCategories" id="ingredientCategories">
            <option value={"id categories"}>Option 1</option>
          </select>
          <div>
            <div>
                <input type="text" />
                <select name="macros" id="macros" >
                  <option id={"macro id"}>Chicken</option>
                  <option id={"macro2 id"}>Chicken</option>
                  <option id={"macro3 id"}>Chicken</option>
                </select>
            </div>
            <div>
                <input type="text" />
                <select name="icon" id="icon" >
                  <option id={"icon id"}>Icon</option>
                  <option id={"icon2 id"}>Icon2</option>
                  <option id={"icon3 id"}>Icon3</option>
                </select>
            </div>
          </div>
      </Form>
    </div>
  );
}