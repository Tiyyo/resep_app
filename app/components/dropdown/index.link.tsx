import { Link } from "@remix-run/react";

export default function DropdownLink({
  Icon,
  text,
  height,
  endpoint,
  handleClick,
}: {
  Icon: JSX.Element;
  text: string;
  endpoint: string;
  height?: "simple" | "double";
  handleClick?: (arg: any) => void;
}) {
  return (
    <Link
      to={endpoint}
      className={`flex w-full items-center justify-between px-4 ${
        height === "double" ? "py-4" : "py-2"
      } font-semibold hover:bg-main-100`}
    >
      {text}
      {Icon}
    </Link>
  );
}
