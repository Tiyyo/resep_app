import { Outlet, useLocation } from "@remix-run/react";
import LayoutPage from "./LayoutPage";
import { useEffect, useRef, useState } from "react";
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
  const [widthMenu] = useState<number>(-3500);
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  const handleSideMenu = () => {
    setSideMenuIsOpen(!sideMenuIsOpen);
  };

  // force scroll to top on route change
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
          className="absolute z-20 h-body w-[50%] max-w-[250px] bg-primary-100 xl:hidden"
        >
          <SideMenu menu={menu} />
        </motion.div>
        <div className="col-start-2 col-end-3 row-start-2 hidden h-body xl:block">
          <SideMenu menu={menu} />
        </div>

        <div
          className="xl:no-scrollbar overflow-y-auto bg-primary-100 px-4 pb-24 pt-4 xl:h-body xl:border-l xl:border-secondary-300 xl:border-opacity-30 xl:pb-12 xl:pt-1"
          ref={mainContentRef}
          onClick={() => setSideMenuIsOpen(false)}
        >
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </LayoutPage>
  );
}

// className="xl:no-scrollbar overflow-y-scroll bg-primary-100 px-4 pb-12 pt-4 xl:h-body xl:border-l xl:border-secondary-300 xl:border-opacity-30 xl:pt-1"
