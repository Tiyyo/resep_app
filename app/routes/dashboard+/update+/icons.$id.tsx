import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import icon from "~/api/icon";
import Modal from "~/components/modal";
import { UpdateIconsForm } from "~/components/update_forms/Icons";

export async function loader({ params }: LoaderArgs) {
  const { id: iconId } = params;
  try {
    if (iconId) {
      return json({ icon: await icon.findById(+iconId) });
    }
    throw new Error("No id provided");
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function ModalUpdate() {
  const { icon } = useLoaderData();

  return (
    <Modal>
      <UpdateIconsForm icon={icon} />
    </Modal>
  );
}
