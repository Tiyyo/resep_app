import { NavLink } from "@remix-run/react";
import LayoutPage from "./LayoutPage";
import HomeIcon from "~/assets/icons/HomeIcon";
import SettingIcons from "~/assets/icons/SettingIcon";
import AddFileIcon from "~/assets/icons/AddFileIcon";
import { getTodayDate } from "~/utils/get.today.date";
import useProfileData from "~/hooks/useProfileData";
import NotificationIcon from "~/assets/icons/NotificationIcon";
import BrushOne from "~/assets/brush/UnderlineBrush";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const profile = useProfileData();

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
                    <div className="font-bold text-11">
                        Today, {getTodayDate()}
                    </div>
                    <div className="flex gap-x-4 items-center">
                        {profile.state === "loaded" ? (
                            <>
                                {profile.profile ? (
                                    <>
                                        <div>
                                            <NotificationIcon size="5" />
                                        </div>
                                        <NavLink to="/profile">
                                            <div className="h-10 aspect-square rounded-full overflow-hidden">
                                                <img
                                                    src={profile.profile.avatar}
                                                    alt=""
                                                    className="object-cover"
                                                />
                                            </div>
                                        </NavLink>
                                    </>
                                ) : (
                                    "signin/signup"
                                )}
                            </>
                        ) : (
                            ""
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
