import { NavLink } from "@remix-run/react";
import AddFileIcon from "~/assets/icons/AddFileIcon";
import HomeIcon from "~/assets/icons/HomeIcon";
import SettingIcons from "~/assets/icons/SettingIcon";

export default function SideNav() {
  return (
    <nav className="col-start-1 row-start-2 hidden min-h-full flex-col items-center gap-y-6 border-r pt-24 xl:flex">
      <NavLink to="/">
        <HomeIcon size="6" />
      </NavLink>
      <NavLink to="/dashboard">
        <AddFileIcon size="6" />
      </NavLink>
      <NavLink to="">
        <SettingIcons size="9" />
      </NavLink>
    </nav>
  );
}
