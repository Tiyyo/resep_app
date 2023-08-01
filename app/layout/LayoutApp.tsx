import { Link, NavLink, Outlet } from "@remix-run/react";
import LayoutPage from "./LayoutPage";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SideMenu from "~/components/side_menu";
import BottomNav from "~/components/layout/bottom.nav";
import SideNav from "~/components/layout/sidenav";
import HeaderDesktop from "~/components/layout/header.desktop";
import HeaderMobile from "~/components/layout/header.mobile";
import type { Item } from "~/components/tree_menu/interface";

export default function AppLayout({ menu }: { menu: Item[] }) {
  const sideMenuRef = useRef<HTMLDivElement | null>(null);
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState<boolean>(false);
  const [widthMenu, setWidthMenu] = useState<number>(-3500);

  const handleSideMenu = () => {
    setSideMenuIsOpen(!sideMenuIsOpen);
  };

  return (
    <LayoutPage>
      <div className="grid-rows-app xl:grid xl:h-full xl:min-h-screen xl:grid-cols-app">
        <HeaderMobile handleSideMenu={handleSideMenu} />
        <HeaderDesktop />
        <SideNav />
        <motion.div
          drag="x"
          whileTap={{ cursor: "grabbing" }}
          initial={{ x: widthMenu }}
          animate={{ x: sideMenuIsOpen ? 0 : widthMenu }}
          transition={{ ease: "easeInOut", duration: 0.5, type: "Spring" }}
          ref={sideMenuRef}
          className="absolute z-10 h-body w-[50%] max-w-[250px] bg-primary-100 xl:hidden"
        >
          <SideMenu menu={menu} />
        </motion.div>
        <div className="col-start-2 col-end-3 row-start-2 hidden h-body xl:block">
          <SideMenu menu={menu} />
        </div>
        <div
          className="xl:no-scrollbar overflow-y-scroll bg-primary-100 px-4 pb-14 pt-4 xl:h-body xl:border-l xl:border-secondary-400 xl:py-1 "
          onClick={() => setSideMenuIsOpen(false)}
        >
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </LayoutPage>
  );
}
