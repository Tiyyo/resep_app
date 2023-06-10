import { useEffect, useState } from "react";
import type { InputProps, TextAlign } from "./interface";

export default function Input({
  name,
  type,
  placeholder,
  width,
  unit,
  label,
  step,
  defaultValue
}: InputProps) {
  const [textAlign, setTextAlign] = useState<TextAlign | null>("text-start");

  useEffect(() => {
    if (type === "number") {
      setTextAlign("text-end");
    } else {
      setTextAlign("text-start");
    }
  }, [type]);

  return (
    <div className="flex gap-x-1 center">
      <label htmlFor={name} className="text-8">{label}</label>
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        name={name}
        id={name}
        defaultValue={defaultValue}
        step={step ?? "0.1"}
        className={`pl-2 pr-1 text-8 h-9 bg-main-300 rounded-md placeholder:pl-2 placeholder:text-7 focus-visible:outline-secondary-300 w-${
          width ?? "40"
        } ${textAlign}`}
      />
      <p>{unit ? "(" + unit + ")" : ""}</p>
    </div>
  );
}
