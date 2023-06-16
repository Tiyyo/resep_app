import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { promiseHash } from "remix-utils";
import {
  getCategories,
  getIcons,
  getMacros,
} from "~/api/get.all.request";
import { getIngredientsById } from "~/api/get.one.by.id.request";
import Modal from "~/components/modal";

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
    throw new Error(error.message);
  }
}

export default function ModalUpdate() {
  const { UpdateForm } = useOutletContext<any>();
  const { ingredientToEdit, categories, macros, icons  } = useLoaderData();

  return (
    <Modal>
      <UpdateForm data={ingredientToEdit} categories={categories} icons={icons} macros={macros}/>
    </Modal>
  );
}
