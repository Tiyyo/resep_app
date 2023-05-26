import type { ButtonProps } from "./interface";

export default function Button({type,value, name, action, valueStyle, sx, children}:ButtonProps) {
  return (
    <button type={type} className={"px-4 py-2 text-10 border center gap-2 rounded-2xl border-slate-200 hover:shadow hover:border-secondary-300 transition duration-150 tracking-wide " + sx}>
        {children}
        <span className={valueStyle}>{value}</span>
    </button>
  );
}