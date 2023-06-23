import { useNavigate } from "@remix-run/react";
import CloseIcon from "~/assets/icons/CloseIcon";

export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full backdrop-blur-sm">
      <div className="absolute bg-primary-100 rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-black-light w-fit">
        <div className="sticky">
          <div
            className="flex justify-end pr-4 py-2 cursor-pointer"
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
