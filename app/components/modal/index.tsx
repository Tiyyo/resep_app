import { useNavigate } from "@remix-run/react";
import CloseIcon from "~/assets/icons/CloseIcon";

export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    // Reminder Check if the z-index raise to 10 have no side effect
    <div className="absolute left-0 top-0 z-10 min-h-screen w-full backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 rounded-xl border border-black-light bg-primary-100">
        <div className="sticky">
          <div
            className="flex cursor-pointer justify-end py-2 pr-4"
            onClick={goBack}
          >
            <CloseIcon size="8" />
          </div>
          <div className="px-12 py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
