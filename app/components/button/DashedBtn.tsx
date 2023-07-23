import { Link } from "@remix-run/react";
import { DashedButtonProps } from "./interface";

export default function ({ value, link = "" }: DashedButtonProps) {
  return (
    <Link to={link}>
      <button
        type="button"
        className="mx-auto my-10 flex w-52 cursor-pointer justify-center rounded-xl border-2 border-dashed border-black-light bg-main-100 py-6 font-semibold text-opacity-50"
      >
        {value}
      </button>
    </Link>
  );
}
