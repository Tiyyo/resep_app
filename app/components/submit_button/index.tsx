import type { SubmitButtonProps } from "./interface";

export default function SubmitButton({text} : SubmitButtonProps) {
  return (
    <button type="submit" className="h-8 text-7 px-4 text-text-100 font-semibold bg-secondary-300 rounded-lg">{text}</button>
  );
}