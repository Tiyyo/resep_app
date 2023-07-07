import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMacrosById } from "~/api/get.one.by.request";
import Modal from "~/components/modal";
import UpdateMacrosForm from "~/components/update_forms/Macros";

export async function loader({ params }: LoaderArgs) {
  const { id: macroId } = params;
  try {
    if (macroId) {
      return json({ macros: await getMacrosById(+macroId) });
    }
    throw new Error("No id provided");
  } catch (error: any) {
    return json({ macros: null, error: "Couldn't find data" }, { status: 404 });
  }
}

export default function ModalUpdate() {
  const { macros } = useLoaderData();

  return (
    <Modal>
      <UpdateMacrosForm data={macros} />
    </Modal>
  );
}
