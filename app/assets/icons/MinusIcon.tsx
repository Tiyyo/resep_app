export default function MinusIcon({ size }: { size?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-${size ?? "6"} h-${size ?? "6"}`}
    >
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}
