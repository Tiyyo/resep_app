import { NavLink } from "@remix-run/react";
import type { Item, TreeMenuProps } from "./interface";
import { useEffect, useState } from "react";
import Chevron from "../chevron";
import mapRecursive from "~/utils/recursive.menu";
import MenuLink from "../menu_link";

export default function TreeMenu({
  level = 1,
  menu: menuProps,
  ...props
}: TreeMenuProps) {
  const [menu, setMenu] = useState<Item[]>(menuProps || []);
  const [paddingLeft, setPaddingleft] = useState<number>(0);

  const openChildren = (id: number) => () => {
    setMenu((prevMenu) =>
      mapRecursive(prevMenu, (item) => {
        if (item.id === id) {
          return { ...item, open: !item.open };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    if (level) {
      setPaddingleft(1 + level);
    }
  }, [level]);

  return (
    <div className={`mx-2`} {...props}>
      {menu.map((item, index: number) => (
        <div key={index + item.id}>
          <div
            onClick={openChildren(item.id)}
            className="mt-2 flex cursor-pointer items-center  justify-between rounded-md px-3 py-1 shadow-inner transition-colors hover:bg-main-300"
          >
            <NavLink to={item.link} className={`pl-${paddingLeft} `}>
              {({ isActive }) => (
                <MenuLink active={isActive} item={item} level={level} />
              )}
            </NavLink>
            <div>{item.children && <Chevron state={item.open} />}</div>
          </div>
          {item.children && (
            <div
              className="transition-all"
              style={
                item.open
                  ? { maxHeight: "fit-content" }
                  : { maxHeight: "0", display: "none" }
              }
            >
              <TreeMenu menu={item.children} level={level + 2} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
