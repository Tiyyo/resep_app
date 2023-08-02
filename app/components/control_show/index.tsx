import ChevronDownIcon from "~/assets/icons/ChevronDownIcon";
import ChevronUpIcon from "~/assets/icons/ChevronUpIcon";

export default function ControlShow({ variant }: { variant: "more" | "less" }) {
  return (
    <div className="mx-2 flex cursor-pointer items-center gap-x-2 rounded-3xl bg-secondary-300 px-3 py-2 text-7 font-semibold text-white-200 shadow-xl">
      <p>{variant === "more" ? "Show more" : "Show less"}</p>
      {variant === "more" ? (
        <ChevronDownIcon size="4" />
      ) : (
        <ChevronUpIcon size="4" />
      )}
    </div>
  );
}
