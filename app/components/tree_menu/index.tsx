import { NavLink } from "@remix-run/react";
import type { TreeMenuProps } from "./interface";


export default function TreeMenu({
  paddingLevel,
  menu,
  ...props
}: TreeMenuProps) {
  return (
    <div className={``} {...props}>
      {menu.map((item, index: number) => (
        <div className={`pl-${paddingLevel}`} key={index}>
          <div></div>
          <NavLink to={item.link}>
            <p>{item.name}</p>
          </NavLink>
          {item.children && (
            <div className="">
              <TreeMenu
                menu={item.children}
                paddingLevel={paddingLevel + 2}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
