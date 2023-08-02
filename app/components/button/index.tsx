import type { ButtonProps } from "./interface";

export default function Button({
  type,
  value,
  name,
  action,
  valueStyle,
  sx,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={
        "center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-10 tracking-wide transition duration-150 hover:border-secondary-300 hover:shadow " +
        sx
      }
    >
      {children}
      <span className={valueStyle}>{value}</span>
    </button>
  );
}
