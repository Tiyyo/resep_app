import { LoaderArgs, redirect } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";

export default function () {
  return (
    <div>
      <nav className="tabs text-secondary-300 center">
        <NavLink to="favorites">
          {({ isActive }) => (
            <button
              className={`tab tab-bordered px-7 ${
                isActive
                  ? "text-secondary-300 font-semibold border-b-secondary-300"
                  : "text-text-accent"
              }  `}
            >
              Favorites
            </button>
          )}
        </NavLink>
        <NavLink to="myrecipes">
          {({ isActive }) => (
            <button
              className={`tab tab-bordered px-7 ${
                isActive
                  ? "text-secondary-300 font-semibold border-b-secondary-300"
                  : "text-text-accent"
              }  `}
            >
              My Recipes
            </button>
          )}
        </NavLink>
        <NavLink to="chicken">
          {({ isActive }) => (
            <button
              className={`tab tab-bordered px-7 ${
                isActive
                  ? "text-secondary-300 font-semibold border-b-secondary-300"
                  : "text-text-accent"
              }  `}
            >
              Chicken
            </button>
          )}
        </NavLink>
        <NavLink to="beef">
          {({ isActive }) => (
            <button
              className={`tab tab-bordered px-7 ${
                isActive
                  ? "text-secondary-300 font-semibold border-b-secondary-300"
                  : "text-text-accent"
              }  `}
            >
              Beef
            </button>
          )}
        </NavLink>
        <NavLink to="fish">
          {({ isActive }) => (
            <button
              className={`tab tab-bordered px-7 ${
                isActive
                  ? "text-secondary-300 font-semibold border-b-secondary-300"
                  : "text-text-accent"
              }  `}
            >
              Fish
            </button>
          )}
        </NavLink>
        <NavLink to="veggie">
          {({ isActive }) => (
            <button
              className={`tab tab-bordered px-7 ${
                isActive
                  ? "text-secondary-300 font-semibold border-b-secondary-300"
                  : "text-text-accent"
              }  `}
            >
              Veggie
            </button>
          )}
        </NavLink>
        <NavLink to="all">
          {({ isActive }) => (
            <button
              className={`tab tab-bordered px-7 ${
                isActive
                  ? "text-secondary-300 font-semibold border-b-secondary-300"
                  : "text-text-accent"
              }  `}
            >
              All
            </button>
          )}
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
