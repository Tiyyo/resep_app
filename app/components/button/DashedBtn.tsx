import { Link } from "@remix-run/react";
import { DashedButtonProps } from "./interface";

export default function ({ value, link = "" }: DashedButtonProps) {
  return (
    <Link to={link}>
      <button
        type="button"
        className="flex justify-center mx-auto my-10 cursor-pointer rounded-xl border-2 border-black-light border-dashed py-6 w-52 bg-main-100 font-semibold text-opacity-50"
      >
        {value}
      </button>
    </Link>
  );
}
