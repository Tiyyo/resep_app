import { NavLink } from "@remix-run/react";
import type { TreeMenuProps } from "./interface";
import { mapRecursive } from "../side_menu";
import { useEffect, useState } from "react";

export default function TreeMenu({
  paddingLevel,
  menu,
  ...props
}: TreeMenuProps) {
  const [menu, setMenu] = useState(menu || []);
  const [paddingLeft, setPaddingleft] = useState();

  const openChildren = (id) => {
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
    <div className={``} {...props}>
      {menu.map((item, index: number) => (
        <div className={`pl-${paddingLevel}`} key={index}>
          <div onClick={openChildren(item.id)}>
            <NavLink to={item.link}>
              <p>{item.name}</p>
            </NavLink>
          </div>
          {item.children && (
            <div className="">
              <TreeMenu menu={item.children} paddingLevel={paddingLevel + 2} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
