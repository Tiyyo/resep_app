import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getRandomRecipes } from "~/api/get.many.by.request";
import SubmitButton from "~/components/submit_button";
import TitleLevel1 from "~/components/title/TitleLevel1";
import { Recipe } from "~/types/recipe";
import { buildShoppingList } from "~/utils/shopping/shopping.builder.server";

export async function loader({ request }: LoaderArgs) {
  const recipes = await getRandomRecipes(7);
  return json({ recipes });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const recipeIds = formData.getAll("recipeId");
  const shoppingList = await buildShoppingList(recipeIds);

  return json({ message: "Shopping list created" }, { status: 201 });
}

export default function () {
  const { recipes } = useLoaderData();

  return (
    <div>
      <TitleLevel1 title="Shopping" />
      <Form method="POST">
        {recipes &&
          recipes.map((recipe: Recipe) => {
            return <input name="recipeId" hidden defaultValue={recipe.id} />;
          })}
        <SubmitButton text="Create shopping list" />
      </Form>
      <button>Do you want to create a new shopping list?</button>
    </div>
  );
}
