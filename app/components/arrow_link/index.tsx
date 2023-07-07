import { Link } from "@remix-run/react";
import ArrowRightIcon from "~/assets/icons/ArrowRightIcon";
import { ArrowLinkProps } from "./interface";

export default function ArrowLink({ text, link }: ArrowLinkProps) {
  return (
    <Link to={link}>
      <p className="flex items-center cursor-pointer">
        {text}{" "}
        <span>
          <ArrowRightIcon />
        </span>
      </p>
    </Link>
  );
}
