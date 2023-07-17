import { NavLink, Outlet } from "@remix-run/react";
import { capitalize } from "~/utils/capitalize";

export default function () {
  const navFinder = [
    "favorites",
    "myrecipes",
    "chicken",
    "beef",
    "fish",
    "veggie",
    "all",
  ];

  return (
    <div>
      <nav className="tabs text-secondary-300 center">
        {navFinder.map((nav) => (
          <NavLink to={nav}>
            {({ isActive }) => (
              <button
                className={`tab tab-bordered px-7 ${
                  isActive
                    ? "text-secondary-300 font-semibold border-b-secondary-300"
                    : "text-text-accent"
                }  `}
              >
                {capitalize(nav)}
              </button>
            )}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
