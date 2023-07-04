import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getCategoriesById } from "~/api/get.one.by.id.request";
import Modal from "~/components/modal";
import UpdateCategoriesForm from "~/components/update_forms/Categories";

export async function loader({ params }: LoaderArgs) {
  const { id: categoryId } = params;
  try {
    if (categoryId) {
      return json({ category: await getCategoriesById(+categoryId) });
    }
    throw new Error("No id provided");
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function EditCategories() {
  const { category } = useLoaderData();

  return (
    <Modal>
      <UpdateCategoriesForm category={category} />
    </Modal>
  );
}
