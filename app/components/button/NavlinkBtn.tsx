import { NavLink } from "@remix-run/react";

export default function NavlinkBtn({
  endpoint,
  Icon,
}: {
  endpoint: string;
  Icon?: React.ReactNode;
}) {
  return (
    <NavLink to={endpoint}>
      {({ isActive }) => (
        <button
          className={`px-7 ${
            isActive ? "border-t-4 border-secondary-400" : ""
          }  `}
        >
          {Icon}
        </button>
      )}
    </NavLink>
  );
}
