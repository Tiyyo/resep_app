import { NavLink } from "@remix-run/react";

export default function NavlinkBtn({
  endpoint,
  Icon,
}: {
  endpoint: string;
  Icon?: React.ReactNode;
}) {
  return (
    <NavLink
      to={endpoint}
      className="center h-10 w-10 rounded-full border bg-white-100 bg-opacity-10 p-4 shadow-facebook"
    >
      {({ isActive }) => (
        <button className={`px-7 ${isActive ? "border-secondary-400" : ""}  `}>
          {Icon}
        </button>
      )}
    </NavLink>
  );
}
