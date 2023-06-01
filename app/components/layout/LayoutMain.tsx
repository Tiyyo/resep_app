import { NavLink, Outlet, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import SideMenu from "../side_menu";
import type{ LayoutMainProp } from "./interfaces";


export default function LayoutMain({menu} : LayoutMainProp) {
  const [data, setData] = useState({ admin: false, profile: null });
  const fetcher = useFetcher();
  

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == undefined) {
      fetcher.load("/api/profile");
    }
    if (fetcher.data) {
      setData((prevState) => {
        return {
          ...prevState,
          admin: fetcher.data.admin,
          profile: fetcher.data.profile,
        };
      });
    }
  }, [fetcher]);

  return (
    <div className="grid grid-cols-main grid-rows-main min-h-screen">
        <div className="relative col-start-1 col-end-3 center border-2">
          <nav className="bg-white-100 text-text-accent center gap-x-8 py-2.5 px-3 rounded-full text-10 font-semibold w-fit">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/recipes">Recipes</NavLink>
            <NavLink to="groceries">Groceries</NavLink>
            {data.admin ? <NavLink to="/admin_panel">Admin Panel</NavLink> : ""}
          </nav>
          <div className="absolute h-12 w-12 rounded-full top-1/2 -translate-y-1/2 right-6 border-2 border-secondary-400 overflow-hidden">
          <img src={data.profile?.avatar ? data.profile.avatar : ""} alt="" />
        </div>
        </div>
        <div className="p-4 row-start-2 row-end-3">
          <div className="border border-black rounded-xl h-full">
            <h2>Location</h2>
          </div>
        </div>
        <div className="p-4">
          <div className=" border border-black rounded-xl h-full">
            <SideMenu menu={menu}/>
          </div>
        </div>
        <div className="p-4 row-start-2 row-end-4 col-start-2 col-end-3">
          <div className="rounded-xl border border-black h-full">
            <h2>Outlet</h2>
            <Outlet />
          </div>
        </div>
    </div>
  );
}
