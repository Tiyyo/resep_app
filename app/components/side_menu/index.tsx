import type { Item } from "aws-sdk/clients/mediastoredata";
import TreeMenu from "../tree_menu";

export default function SideMenu({menu} : {menu : Item[]}) {

  return (
    <div className="">
      {menu ?  <TreeMenu  level={1} menu={menu}/> : ""}  
    </div>
    );
}