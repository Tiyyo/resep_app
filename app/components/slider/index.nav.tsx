import LongArrowRightIcon from "~/assets/icons/LongArrowIcon";

export default function SliderNav({
  handleClick,
}: {
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <div className="absolute -bottom-8 right-6 hidden items-center gap-x-10 text-secondary-300 xl:flex ">
      <button
        type="button"
        className="cursor-pointer"
        data-nav="next"
        onClick={handleClick}
      >
        <LongArrowRightIcon />
      </button>
      <button
        className="rotate-180 cursor-pointer"
        data-nav="prev"
        onClick={handleClick}
      >
        <LongArrowRightIcon />
      </button>
    </div>
  );
}
