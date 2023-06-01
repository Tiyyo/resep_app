import TreeMenu from "../tree_menu";
import type { SideMenuProps } from "./interface";

export default function SideMenu({menu} : SideMenuProps) {

  return (
    <div className="">
      {menu ?  <TreeMenu paddingLevel="0" menu={menu}/> : ""}  
    </div>
    );
}