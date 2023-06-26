import { Outlet } from "@remix-run/react";
import SideMenu from "~/components/side_menu";
import type { Item } from "~/components/tree_menu/interface";

export default function RoutesLayout({menu} : {menu : Item[]}) {
  return (
    <>
      <div className="col-start-2 col-end-3 row-start-2 h-body">
        <SideMenu menu={menu}/>
      </div>
      <div className="border-l border-secondary-400 py-1 overflow-y-scroll h-body no-scrollbar">
        <Outlet />
      </div>
    </>
  );
}
