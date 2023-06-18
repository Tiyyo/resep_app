import { Outlet } from "@remix-run/react";
import SideMenu from "~/components/side_menu";
import type { Item } from "~/components/tree_menu/interface";

export default function RoutesLayout({menu} : {menu : Item[]}) {
  return (
    <div className="flex min-h-full  ">
      <div className="basis-2/12">
        <SideMenu menu={menu}/>
      </div>
      <div className="border-l border-secondary-400
      
      my-8 basis-10/12 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}
