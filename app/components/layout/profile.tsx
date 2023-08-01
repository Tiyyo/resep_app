import LogoutIcon from "~/assets/icons/LogoutIcon";
import NotificationIcon from "~/assets/icons/NotificationIcon";
import ProfileIcon from "~/assets/icons/ProfileIcon";
import SettingIcons from "~/assets/icons/SettingIcon";
import useProfileData from "~/hooks/useProfileData";
import DropdownLink from "../dropdown/index.link";

export default function ProfileLinksMenu() {
  const profile = useProfileData();
  const handleClick = () => {};
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
    <>
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
        </>
      ) : (
        "signin/signup"
      )}
    </>
  );
}
