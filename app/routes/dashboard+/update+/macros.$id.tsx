import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import macro from "~/api/macro";
import Modal from "~/components/modal";
import UpdateMacrosForm from "~/components/update_forms/Macros";
import NotFoundError from "~/helpers/errors/not.found.error";
import ServerError from "~/helpers/errors/server.error";
import ResponseError from "~/helpers/response/response.error";

export async function loader({ params }: LoaderArgs) {
  const { id: macroId } = params;
  try {
    if (!macroId) {
      throw new NotFoundError("No id provided");
    }
    return json({ macros: await macro.findById(+macroId) });
  } catch (error: any) {
    return new ResponseError(error);
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
