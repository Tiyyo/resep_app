import { Link, NavLink, Outlet } from "@remix-run/react";
import LayoutPage from "./LayoutPage";
import HomeIcon from "~/assets/icons/HomeIcon";
import SettingIcons from "~/assets/icons/SettingIcon";
import AddFileIcon from "~/assets/icons/AddFileIcon";
import getTodayDate from "~/utils/get.today.date";
import useProfileData from "~/hooks/useProfileData";
import NotificationIcon from "~/assets/icons/NotificationIcon";
import BrushOne from "~/assets/brush/UnderlineBrush";
import LogoutIcon from "~/assets/icons/LogoutIcon";
import ProfileIcon from "~/assets/icons/ProfileIcon";
import TitleLogo from "~/components/title/TitleLogo";
import NavlinkBtn from "~/components/button/NavlinkBtn";
import DropdownLink from "~/components/dropdown/index.link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const profile = useProfileData();
  const sideMenuRef = useRef<HTMLDivElement | null>(null);
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState<boolean>(false);
  const [widthMenu, setWidthMenu] = useState<number>(-3500);
  const linkToSettings = "/settings";
  const linkToHome = "/";
  const linkToDashboard = "/dashboard";

  const handleClick = () => {};

  const handleSideMenu = () => {
    setSideMenuIsOpen(!sideMenuIsOpen);
  };

  const dropdownConfig = [
    {
      Icon: <ProfileIcon />,
      text: "Profile",
      endpoint: "/profile",
      height: "simple",
      handleClick: handleClick,
    },
    {
      Icon: <SettingIcons size="4" />,
      text: "Settings",
      endpoint: "/settings",
      height: "simple",
      handleClick: handleClick,
    },
    {
      Icon: <LogoutIcon />,
      text: "Logout",
      endpoint: "/logout",
      height: "double",
      handleClick: handleClick,
    },
  ];

  return (
    <LayoutPage>
      {/* <div className=" hidden h-full min-h-screen grid-cols-app grid-rows-app xl:grid">
        <div className="center col-start-1 col-end-2 row-start-1 hidden border-r "></div>
        <div className="relative col-start-2 col-end-3 row-start-1 hidden place-self-center text-2xl font-bold xl:block">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary-400 opacity-90">
            <BrushOne />
          </div>
          <TitleLogo />
        </div>
        <header className="col-start-3 col-end-4 hidden items-center justify-between px-5 xl:flex">
          <div className="text-11 font-bold">Today, {getTodayDate()}</div>
          <div className="flex items-center gap-x-4">
            {profile.state === "loaded" && profile.profile ? (
              <>
                <div>
                  <NotificationIcon size="5" />
                </div>
                <div className="dropdown dropdown-end dropdown-bottom">
                  <label
                    tabIndex={0}
                    className="btn m-1 h-10 border-0 bg-transparent hover:bg-transparent"
                  >
                    <img
                      tabIndex={0}
                      src={profile.profile.avatar}
                      alt=""
                      className="h-10 w-full rounded-full object-cover"
                    />
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu  dropdown-content rounded-box z-[1] h-32 w-40 bg-primary-200 p-1 shadow"
                  >
                    <li>
                      <div className=" flex w-full items-center justify-between px-4 py-2 font-semibold hover:bg-main-100 ">
                        Profile
                        <ProfileIcon />
                      </div>
                    </li>
                    <li>
                      <div className="flex w-full items-center justify-between px-4 py-2 font-semibold hover:bg-main-100">
                        Settings
                        <SettingIcons size="4" />
                      </div>
                    </li>
                    <li className="flex h-6 items-center justify-between">
                      <Link
                        to="/logout"
                        className="flex h-6 w-full items-center justify-between px-4 py-4 font-semibold hover:bg-main-100 "
                        onClick={handleClick}
                      >
                        Logout
                        <LogoutIcon />
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              "signin/signup"
            )}
          </div>
        </header>
        <nav className="col-start-1 row-start-2 flex min-h-full flex-col items-center gap-y-6 border-r pt-24">
          <NavLink to="/">
            <HomeIcon size="6" />
          </NavLink>
          <NavLink to="/dashboard">
            <AddFileIcon size="6" />
          </NavLink>
          <NavLink to="/settings">
            <SettingIcons size="9" />
          </NavLink>
        </nav>
        <>{children}</>
      </div> */}
      <div className="xl:hidden">
        <header className="navbar border-b bg-primary-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-circle btn-ghost"
                onClick={handleSideMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
          </div>
          <div className="navbar-center">
            <TitleLogo />
          </div>
          <div className="navbar-end">
            <div className="flex items-center gap-x-4">
              {profile.state === "loaded" && profile.profile ? (
                <div className="dropdown dropdown-end dropdown-bottom">
                  <label
                    tabIndex={0}
                    className="btn m-1 h-10 border-0 bg-transparent hover:bg-transparent"
                  >
                    <div className="relative h-fit">
                      <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-secondary-300"></span>
                      <img
                        tabIndex={0}
                        src={profile.profile.avatar}
                        alt=""
                        className="h-10 w-full rounded-full object-cover"
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content rounded-box z-[1] flex w-40 flex-col border bg-primary-200 p-1 shadow-lg"
                  >
                    {dropdownConfig.map((item, index) => (
                      <DropdownLink
                        key={index}
                        Icon={item.Icon}
                        endpoint={item.endpoint}
                        text={item.text}
                        height={item.height as "simple" | "double"}
                      />
                    ))}
                  </ul>
                </div>
              ) : (
                "signin/signup"
              )}
            </div>
          </div>
        </header>
        <motion.div
          drag="x"
          whileTap={{ cursor: "grabbing" }}
          initial={{ x: widthMenu }}
          animate={{ x: sideMenuIsOpen ? 0 : widthMenu }}
          transition={{ ease: "easeInOut", duration: 0.5, type: "Spring" }}
          ref={sideMenuRef}
          className="absolute z-10 h-body w-[50%] max-w-[250px] bg-primary-100"
        >
          {children}
        </motion.div>
        <div
          onClick={() => setSideMenuIsOpen(false)}
          className="px-4 pb-14 pt-4"
        >
          <Outlet />
        </div>
        <div className="fixed bottom-0 flex w-full  items-center justify-center gap-x-4 bg-primary-100 py-2">
          <NavlinkBtn endpoint={linkToHome} Icon={<HomeIcon size="6" />} />
          <NavlinkBtn
            endpoint={linkToDashboard}
            Icon={<AddFileIcon size="6" />}
          />
          <NavlinkBtn
            endpoint={linkToSettings}
            Icon={<SettingIcons size="6" />}
          />
        </div>
      </div>
    </LayoutPage>
  );
}
