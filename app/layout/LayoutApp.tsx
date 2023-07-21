import { Link, NavLink } from "@remix-run/react";
import LayoutPage from "./LayoutPage";
import HomeIcon from "~/assets/icons/HomeIcon";
import SettingIcons from "~/assets/icons/SettingIcon";
import AddFileIcon from "~/assets/icons/AddFileIcon";
import { getTodayDate } from "~/utils/get.today.date";
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
      <div className="grid grid-cols-app grid-rows-app h-full min-h-screen">
        <div className="col-start-1 col-end-2 row-start-1 center border-r "></div>
        <div className="col-start-2 col-end-3 row-start-1 place-self-center font-bold text-2xl relative">
          <div className="text-secondary-400 opacity-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <BrushOne />
          </div>
          <div className="relative -top-1 z-10 text-15 -rotate-3">
            <span>r</span>
            <span>e</span>
            <span>s</span>
            <span className="scale-x-flip">e</span>
            <span>p</span>
          </div>
        </div>
        <header className="col-start-3 col-end-4 flex justify-between items-center px-5">
          <div className="font-bold text-11">Today, {getTodayDate()}</div>
          <div className="flex gap-x-4 items-center">
            {profile.state === "loaded" && profile.profile ? (
              <>
                <div>
                  <NotificationIcon size="5" />
                </div>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn m-1 h-10 bg-transparent hover:bg-transparent border-0"
                  >
                    <img
                      tabIndex={0}
                      src={profile.profile.avatar}
                      alt=""
                      className="object-cover w-full rounded-full h-10"
                    />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content  z-[1] menu p-1 shadow bg-primary-200 rounded-box w-40 h-32"
                  >
                    <li>
                      <a className="flex items-center justify-between w-full px-4 py-2 hover:bg-main-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold">
                        Profile
                        <ProfileIcon />
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center justify-between w-full px-4 py-2 hover:bg-main-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold">
                        Settings
                        <SettingIcons size="4" />
                      </a>
                    </li>
                    <li className="flex items-center justify-between h-6">
                      <Link
                        to="/logout"
                        className="flex items-center justify-between h-6 w-full px-4 py-4 hover:bg-main-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold"
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
        <nav className="col-start-1 row-start-2 min-h-full flex flex-col items-center gap-y-6 pt-24 border-r">
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
