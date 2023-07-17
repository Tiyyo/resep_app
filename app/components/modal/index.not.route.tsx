import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import CloseIcon from "~/assets/icons/CloseIcon";

export default function ModalNotRoute({
  getActionToPerform,
  isOpen,
}: {
  getActionToPerform: (action: "new" | "old" | null) => void;
  isOpen: boolean;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const action = e.currentTarget.dataset.choice as "new" | "old";
    action ? getActionToPerform(action) : getActionToPerform(null);
    (window as any).my_modal_5.close();
  };

  useEffect(() => {
    (window as any).my_modal_5.close();
    if (!isOpen) {
      (window as any).my_modal_5.close();
    } else if (isOpen) {
      (window as any).my_modal_5.showModal();
    }
  }, [isOpen]);
  return (
    <div className="sticky">
      <dialog
        id="my_modal_5"
        aria-modal="false"
        className={`modal modal-bottom sm:modal-middle -z-10 transition-opacity
        //  ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <Form method="POST" className="modal-box" action="/home/shopping">
          <button
            className="btn hidden"
            onClick={() => window.my_modal_5.showModal()}
            hidden
          >
            open modal
          </button>
          <p className="text-center font-bold my-2">
            Do you want to load the last set of recipes you used ?
          </p>
          <p className="text-8 opacity-70 text-center">
            {" "}
            (if no a new random set will be generated)
          </p>

          <div className="modal-action center">
            <button
              className="btn w-24"
              data-choice="new"
              onClick={handleClick}
            >
              No
            </button>
            <button
              className="btn w-24 bg-secondary-200"
              data-choice="new"
              name="action"
              value="restore"
              onClick={handleClick}
            >
              {" "}
              Yes
            </button>
          </div>
        </Form>
      </dialog>
    </div>
  );
}
