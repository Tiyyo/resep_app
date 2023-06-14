import type { LoaderArgs } from "@remix-run/node";
import  { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getMacrosById } from "~/api/get.one.by.id.request";
import Modal from "~/components/modal";

export async function loader({ params }: LoaderArgs) {
  const {id : macroId} = params
  try {
    if(macroId) {
      return json({ macros : await getMacrosById(+macroId)});
    }
    throw new Error("No id provided");   
  } catch (error : any) {
      throw new Error(error.message);    
  }
}

export default function ModalUpdate() {
  const {UpdateForm} = useOutletContext<any>();
  const {macros} = useLoaderData()

  return (
    <Modal>
        <UpdateForm data={macros}/>
    </Modal>
  );
}
