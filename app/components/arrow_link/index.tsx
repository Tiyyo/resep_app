import { Link } from "@remix-run/react";
import ArrowRightIcon from "~/assets/icons/ArrowRightIcon";
import { ArrowLinkProps } from "./interface";

export default function ArrowLink({ text, link }: ArrowLinkProps) {
  return (
    <Link to={link}>
      <p className="flex cursor-pointer items-center">
        {text}{" "}
        <span>
          <ArrowRightIcon />
        </span>
      </p>
    </Link>
  );
}
