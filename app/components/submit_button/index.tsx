import type { SubmitButtonProps } from "./interface";

export default function SubmitButton({text, height} : SubmitButtonProps) {
  return (
    <button type="submit" className={` ${height ? "h-" + height : "h-9" } file:text-7 px-4 text-text-100 font-semibold bg-secondary-300 rounded-lg`}>{text}</button>
  );
}