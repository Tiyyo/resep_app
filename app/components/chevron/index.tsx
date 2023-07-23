import ChevronIcon from "~/assets/icons/ChevronRightIcon";

export default function Chevron({ state }: { state?: boolean }) {
  return (
    <div
      className={
        state
          ? "rotate-90 cursor-pointer transition-transform"
          : "rotate-0 cursor-pointer transition-transform"
      }
    >
      <ChevronIcon />
    </div>
  );
}
