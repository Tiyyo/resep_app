import { NavLink, Outlet } from "@remix-run/react";

export default function () {
  return (
    <div className="bg-primary-100 min-h-screen">
      <h2>Content Management Page</h2>
      <nav className="tabs">
        <NavLink to="ingredients">Ingredient</NavLink>
        <NavLink to="icons">Icon</NavLink>
      </nav>
      <Outlet/>
    </div>
  );
}
