import HomeIcon from "~/assets/icons/HomeIcon";
import NavlinkBtn from "../button/NavlinkBtn";
import AddFileIcon from "~/assets/icons/AddFileIcon";
import SettingIcons from "~/assets/icons/SettingIcon";

export default function BottomNav() {
  const linkToSettings = "/settings";
  const linkToHome = "/";
  const linkToDashboard = "/dashboard";

  return (
    <div className="fixed bottom-0 flex w-full  items-center justify-center gap-x-4 bg-primary-100 py-2 xl:hidden">
      <NavlinkBtn endpoint={linkToHome} Icon={<HomeIcon size="6" />} />
      <NavlinkBtn endpoint={linkToDashboard} Icon={<AddFileIcon size="6" />} />
      <NavlinkBtn endpoint={linkToSettings} Icon={<SettingIcons size="6" />} />
    </div>
  );
}
