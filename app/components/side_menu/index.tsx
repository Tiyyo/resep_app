import TreeMenu from "../tree_menu";
import type { MenuItem } from "../tree_menu/interface";

export default function SideMenu({ menu }: { menu: MenuItem[] }) {
  return (
    <div className="">{menu ? <TreeMenu level={1} menu={menu} /> : ""}</div>
  );
}
