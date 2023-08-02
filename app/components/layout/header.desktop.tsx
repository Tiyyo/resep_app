import BrushOne from "~/assets/brush/UnderlineBrush";
import TitleLogo from "../title/TitleLogo";
import TodayDate from "../today_date";
import ProfileLinksMenu from "./profile";

export default function HeaderDesktop() {
  return (
    <>
      <div className="xl:center col-start-1 col-end-2 row-start-1 hidden border-r "></div>
      <div className="relative col-start-2 col-end-3 row-start-1 hidden place-self-center text-2xl font-bold xl:block">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary-400 opacity-90">
          <BrushOne />
        </div>
        <TitleLogo />
      </div>
      <header className="col-start-3 col-end-4 hidden items-center justify-between px-5 xl:flex">
        <TodayDate />
        <div className="flex items-center gap-x-4">
          <ProfileLinksMenu />
        </div>
      </header>
    </>
  );
}
