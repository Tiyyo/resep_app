import TitleLogo from "../title/TitleLogo";
import ProfileLinksMenu from "./profile";

export default function HeaderMobile({ handleSideMenu }) {
  return (
    <header className="navbar border-b bg-primary-100 xl:hidden">
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
          <ProfileLinksMenu />
        </div>
      </div>
    </header>
  );
}
