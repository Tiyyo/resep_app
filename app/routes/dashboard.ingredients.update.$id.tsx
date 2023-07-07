import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { promiseHash } from "remix-utils";
import { getCategories, getIcons, getMacros } from "~/api/get.all.request";
import { getIngredientsById } from "~/api/get.one.by.request";
import Modal from "~/components/modal";
import UpdateIngredientsForm from "~/components/update_forms/Ingredients";

export async function loader({ params }: LoaderArgs) {
  const { id: ingredientId } = params;
  try {
    if (ingredientId) {
      return json(
        await promiseHash({
          categories: getCategories(),
          macros: getMacros(),
          icons: getIcons(),
          ingredientToEdit: getIngredientsById(+ingredientId),
        })
      );
    }
    throw new Error("No id provided");
  } catch (error: any) {
    return json({ macros: null, error: "Couldn't find data" }, { status: 404 });
  }
}

export default function ModalUpdate() {
  const { ingredientToEdit, categories, macros, icons } = useLoaderData();
  console.log(ingredientToEdit, "INGREDIENT TO EDIT");
  return (
    <Modal>
      <UpdateIngredientsForm
        data={ingredientToEdit}
        categories={categories}
        icons={icons}
        macros={macros}
      />
    </Modal>
  );
}
