import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function ModalNotRoute({
  getActionToPerform,
  isOpen,
}: {
  getActionToPerform: (action: "new" | "old" | null) => void;
  isOpen: boolean;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const action = e.currentTarget.dataset.choice as "new" | "old";
    action ? getActionToPerform(action) : getActionToPerform(null);
    (window as any).my_modal_5.close();
  };

  // force dialog to stay close for a certain amout of time on refresh
  function forceDialogClose() {
    const timeout = setTimeout(() => {
      setIsDialogOpen(true);
    }, 300);
    return timeout;
  }

  useEffect(() => {
    if (isOpen) {
      forceDialogClose();
    }
    return () => clearTimeout(forceDialogClose());
  }, [isOpen]);

  useEffect(() => {
    (window as any).my_modal_5.close();
    if (!isOpen) {
      (window as any).my_modal_5.close();
    } else if (isOpen) {
      (window as any).my_modal_5.showModal();
    }
  }, [isOpen]);

  return (
    <div className={`sticky ${isDialogOpen ? "" : "hidden"}`}>
      <dialog
        id="my_modal_5"
        aria-modal="false"
        className={`smodal-middle modal -z-10 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <Form
          method="POST"
          className="modal-box bg-primary-300"
          action="/home/meal_plans/generate"
        >
          <p className="my-2 text-center  font-bold">
            Do you want to load the last set of recipes you used ?
          </p>
          <p className="text-center text-8 opacity-70">
            {" "}
            (if no a new random set will be generated)
          </p>

          <div className="center modal-action">
            <button
              className="btn w-24 text-text-accent hover:bg-slate-200 hover:opacity-80 dark:border-0 dark:bg-white-100"
              data-choice="new"
              onClick={handleClick}
            >
              No
            </button>
            <button
              className="btn w-24 border-0 bg-secondary-200 text-text-accent hover:bg-secondary-200 hover:opacity-80"
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
