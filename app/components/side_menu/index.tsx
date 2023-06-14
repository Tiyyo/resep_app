import { EXAMPLE_MENU } from "~/constants/menus";
import TreeMenu from "../tree_menu";
import type { SideMenuProps } from "./interface";

export const mapRecursive = (oldArray, callback, newArray = []) => {
  if(oldArray.length <= 0 ) {
    return newArray
  } else {
      let [item, ...theRest] = oldArray

      if(item.children) {
        item = {...item, children : mapRecursive(item.children, callback) }
      }
      const interimArray = [...newArray, callback(item)]
      return mapRecursive(theRest, callback, interimArray)
  }
}



export default function SideMenu({menu} : SideMenuProps) {

  const essaiRecursive = mapRecursive(EXAMPLE_MENU, (menu) => {
    return {...menu, open : true}
  })

  console.log(essaiRecursive);


  return (
    <div className="">
      {menu ?  <TreeMenu paddingLevel="0" menu={menu}/> : ""}  
    </div>
    );
}