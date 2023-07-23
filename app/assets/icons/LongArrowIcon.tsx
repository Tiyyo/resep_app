export default function LongArrowRightIcon({ size }: { size?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      id="arrow"
      stroke="currentColor"
      strokeWidth={4}
      className={`w-${size ?? "6"} h-${size ?? "6"} rotate-180`}
    >
      <path d="M1 26h43.586l-6.293 6.293 1.414 1.414L48.414 25l-8.707-8.707-1.414 1.414L44.586 24H1z"></path>
    </svg>
  );
}
