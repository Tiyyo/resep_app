import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getCategoriesById } from "~/api/get.one.by.id.request";
import Modal from "~/components/modal";

export async function loader ({params} : LoaderArgs) {
    const {id : categoryId} = params
    try {
      if(categoryId) {
        return json({ category : await getCategoriesById(+categoryId)});
      }
      throw new Error("No id provided");   
    } catch (error : any) {
        throw new Error(error.message);    
    }
}

export default function EditCategories() {
    const {UpdateForm} = useOutletContext<any>();
    const {category} = useLoaderData()
    
  return (
    <Modal>
        <UpdateForm data={category}/>
    </Modal>
  );
}