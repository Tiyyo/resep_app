import type { SubmitButtonProps } from "./interface";

export default function SubmitButton({
  text,
  height,
  name,
  value,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      name={name}
      value={value}
      className={` ${
        height ? "h-" + height : "h-9"
      } rounded-lg bg-secondary-300 px-4 text-7 font-semibold text-text-100`}
    >
      {text}
    </button>
  );
}
