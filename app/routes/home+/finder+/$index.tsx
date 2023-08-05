import { NavLink, Outlet, useNavigate, useParams } from "@remix-run/react";
import { useState, useEffect, useMemo } from "react";
import ArrowRightIcon from "~/assets/icons/ArrowRightIcon";
import capitalize from "~/utils/capitalize";

export default function () {
  const [navFinderLinksIndex, setNavFinderLinksIndex] = useState<number>(0);

  const navigate = useNavigate();
  const params = useParams();
  const navFinder = useMemo(() => {
    return [
      "favorites",
      "myrecipes",
      "chicken",
      "beef",
      "fish",
      "veggie",
      "all",
    ];
  }, []);

  const goNext = (index: number) => {
    index === navFinder.length - 1
      ? setNavFinderLinksIndex(0)
      : setNavFinderLinksIndex(index + 1);
  };

  const goPrev = (index: number) => {
    if (index === 0) {
      setNavFinderLinksIndex(navFinder.length - 1);
    } else {
      setNavFinderLinksIndex(navFinderLinksIndex - 1);
    }
  };

  const handleClickNext = () => {
    goNext(navFinderLinksIndex);
  };

  const handleClickPrev = () => {
    goPrev(navFinderLinksIndex);
  };

  useEffect(() => {
    navigate(`/home/finder/${params.index}/${navFinder[navFinderLinksIndex]}`);
  }, [navFinderLinksIndex, navigate, navFinder, params.index]);

  return (
    <>
      <nav className="center tabs hidden  text-secondary-300 sm:flex sm:overflow-auto">
        {navFinder.map((nav, index) => (
          <NavLink to={nav} key={index}>
            {({ isActive }) => (
              <button
                className={`tab tab-bordered w-screen px-7 sm:w-full ${
                  isActive
                    ? "border-b-secondary-300 font-semibold text-secondary-300"
                    : "text-text-accent"
                }  `}
              >
                {capitalize(nav)}
              </button>
            )}
          </NavLink>
        ))}
      </nav>
      <nav className="center no-scrollbar tabs relative h-14 flex-nowrap overflow-x-scroll text-secondary-300 sm:hidden">
        <button
          type="button"
          className="absolute left-1 z-10"
          onClick={handleClickPrev}
          data-nav="prev"
        >
          <div className="rotate-180">
            <ArrowRightIcon />
          </div>
        </button>
        <button
          className={`tab tab-bordered w-screen border-b-secondary-300 px-7 font-semibold text-secondary-300 text-text-accent sm:w-full`}
        >
          {capitalize(navFinder[navFinderLinksIndex])}
        </button>
        <button
          type="button"
          className="absolute right-1 top-1/2 h-5 w-5 -translate-y-1/2"
          onClick={handleClickNext}
          data-nav="next"
        >
          <ArrowRightIcon />
        </button>
      </nav>
      <Outlet />
    </>
  );
}
