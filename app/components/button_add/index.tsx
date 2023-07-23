import type { AddButtonProps } from "./interface";

export default function AddButton({
  children,
  value,
  condition,
  type,
  addStyle,
  onClick,
}: AddButtonProps) {
  return (
    <>
      <p className="my-2 text-7">{condition ? "(" + condition + ")" : ""}</p>
      <button
        type={type}
        onClick={onClick}
        className={`mb-8 flex items-center gap-x-8 rounded-lg px-4 py-2 text-8 font-bold tracking-wide  transition duration-150 hover:shadow ${addStyle}`}
      >
        {value}
        <div className="text-secondary-300">{children}</div>
      </button>
    </>
  );
}
