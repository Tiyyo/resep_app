import LongArrowRightIcon from "~/assets/icons/LongArrowIcon";

export type SliderNavVariant = "spread" | "end";

export default function SliderNav({
  handleClick,
  variant = "spread",
}: {
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  variant: SliderNavVariant;
}) {
  if (variant === "end") {
    return (
      <div className="absolute -bottom-8 right-6 hidden items-center gap-x-10 text-secondary-300 xl:flex ">
        <button
          type="button"
          className="cursor-pointer"
          data-nav="prev"
          onClick={handleClick}
        >
          <LongArrowRightIcon />
        </button>
        <button
          className="rotate-180 cursor-pointer"
          data-nav="next"
          onClick={handleClick}
        >
          <LongArrowRightIcon />
        </button>
      </div>
    );
  }
  if (variant === "spread") {
    return (
      <>
        <button
          type="button"
          className="absolute bottom-0 left-2 hidden cursor-pointer text-secondary-300 lg:flex"
          data-nav="prev"
          onClick={handleClick}
        >
          <LongArrowRightIcon />
        </button>
        <button
          className="absolute bottom-0 right-2 hidden rotate-180 cursor-pointer text-secondary-300 lg:flex"
          data-nav="next"
          onClick={handleClick}
        >
          <LongArrowRightIcon />
        </button>
      </>
    );
  }
}
