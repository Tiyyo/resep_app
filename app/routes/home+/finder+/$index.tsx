import { NavLink, Outlet } from "@remix-run/react";
import capitalize from "~/utils/capitalize";

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
    <>
      <nav className="center tabs text-secondary-300">
        {navFinder.map((nav, index) => (
          <NavLink to={nav} key={index}>
            {({ isActive }) => (
              <button
                className={`tab tab-bordered px-7 ${
                  isActive
                    ? "border-b-secondary-300 font-semibold text-secondary-300"
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
    </>
  );
}
