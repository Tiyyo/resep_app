import SettingIcons from "~/assets/icons/SettingIcon";
import LayoutPage from "./LayoutPage";
import NavlinkBtn from "~/components/button/NavlinkBtn";
import HomeIcon from "~/assets/icons/HomeIcon";
import AddFileIcon from "~/assets/icons/AddFileIcon";
import TitleLogo from "~/components/title/TitleLogo";
import useProfileData from "~/hooks/useProfileData";
import LogoutIcon from "~/assets/icons/LogoutIcon";
import ProfileIcon from "~/assets/icons/ProfileIcon";
import DropdownLink from "~/components/dropdown/index.link";
import { Outlet } from "@remix-run/react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function LayoutAppMobile({
  children,
}: {
  children: React.ReactNode;
}) {
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

  useEffect(() => {
    if (sideMenuRef.current) {
      setWidthMenu(-sideMenuRef.current.clientWidth - 20);
    }
  }, [sideMenuRef?.current?.clientWidth]);

  return (
    <LayoutPage>
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
      <div onClick={() => setSideMenuIsOpen(false)} className="pb-14">
        <Outlet />
      </div>
      <div className="btm-nav fixed bottom-0 flex h-14 justify-center bg-primary-100">
        <NavlinkBtn endpoint={linkToHome} Icon={<HomeIcon size="4" />} />
        <NavlinkBtn
          endpoint={linkToDashboard}
          Icon={<AddFileIcon size="4" />}
        />
        <NavlinkBtn
          endpoint={linkToSettings}
          Icon={<SettingIcons size="4" />}
        />
      </div>
    </LayoutPage>
  );
}
