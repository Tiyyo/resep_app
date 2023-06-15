import { NavLink } from "@remix-run/react";
import type { TreeMenuProps } from "./interface";
import { mapRecursive } from "../side_menu";
import { useEffect, useState } from "react";
import Chevron from "../chevron";

export default function TreeMenu({
  level = 1,
  menu: menuProps,
  ...props
}: TreeMenuProps) {
  const [menu, setMenu] = useState(menuProps || []);
  const [paddingLeft, setPaddingleft] = useState<number>(0);

  const openChildren = (id : number) => () => {
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

  console.log(level);

  return (
    <div className={`mx-2`} {...props}>
      {menu.map((item, index: number) => (
        <>
          <div
            key={index}
            onClick={openChildren(item.id)}
            className="flex justify-between px-3 py-1  shadow-inner mt-2 rounded-md hover:bg-main-300 transition-colors items-center"
          >
            {/* containter text + icon open  */}

            <NavLink to={item.link} className={`pl-${paddingLeft}`}>
              <div className="flex items-center justify-start gap-x-1 font">
                {item.icon ? <div>{item.icon({ size: "5" })}</div> : ""}
                <p className={level === 1 ? "font-semibold" : "font-normal"}>{item.name}</p>
              </div>
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
        </>
      ))}
    </div>
  );
}
