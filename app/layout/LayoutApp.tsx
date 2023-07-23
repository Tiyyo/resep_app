import { Link, NavLink } from "@remix-run/react";
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const profile = useProfileData();

  const handleClick = () => {};

  return (
    <LayoutPage>
      <div></div>
      <div className="grid h-full min-h-screen grid-cols-app grid-rows-app">
        <div className="center col-start-1 col-end-2 row-start-1 border-r "></div>
        <div className="relative col-start-2 col-end-3 row-start-1 place-self-center text-2xl font-bold">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary-400 opacity-90">
            <BrushOne />
          </div>
          <div className="relative -top-1 z-10 -rotate-3 text-15">
            <span>r</span>
            <span>e</span>
            <span>s</span>
            <span className="scale-x-flip">e</span>
            <span>p</span>
          </div>
        </div>
        <header className="col-start-3 col-end-4 flex items-center justify-between px-5">
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
                      <div className="dark:hover:text-white flex w-full items-center justify-between px-4 py-2 font-semibold hover:bg-main-100 dark:hover:bg-gray-600">
                        Profile
                        <ProfileIcon />
                      </div>
                    </li>
                    <li>
                      <div className="dark:hover:text-white flex w-full items-center justify-between px-4 py-2 font-semibold hover:bg-main-100 dark:hover:bg-gray-600">
                        Settings
                        <SettingIcons size="4" />
                      </div>
                    </li>
                    <li className="flex h-6 items-center justify-between">
                      <Link
                        to="/logout"
                        className="dark:hover:text-white flex h-6 w-full items-center justify-between px-4 py-4 font-semibold hover:bg-main-100 dark:hover:bg-gray-600"
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
      </div>
    </LayoutPage>
  );
}
