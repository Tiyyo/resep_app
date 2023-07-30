import { useEffect, useState } from "react";
import type { InputProps, TextAlign } from "./interface";
import Error from "../error";

export default function Input({
  name,
  type,
  placeholder,
  width = "40",
  unit,
  label,
  step,
  pattern,
  defaultValue,
  variant,
  disabled,
  value,
  align,
  error,
  sx,
  onChange,
}: InputProps) {
  const [textAlign, setTextAlign] = useState<TextAlign | null>("text-start");

  useEffect(() => {
    if (align === "end") {
      setTextAlign("text-end");
    } else if (align === "start") {
      setTextAlign("text-start");
    } else {
      setTextAlign("text-center");
    }
  }, [type]);

  const variantFlexNoControl = " flex gap-x-1 items-center justify-between";
  const variantControlGrid = "grid grid-cols-input gap-x-1 place-items-center ";

  return (
    <div
      className={variant === "grid" ? variantControlGrid : variantFlexNoControl}
    >
      <label htmlFor={name} className="text-8">
        {label}
      </label>
      <div className="flex flex-col items-center">
        <input
          type={type ?? "text"}
          placeholder={placeholder}
          name={name}
          id={name}
          defaultValue={defaultValue}
          step={step ?? "0.1"}
          pattern={pattern}
          value={value ?? undefined}
          disabled={disabled ? true : false}
          // onChange={onChange}
          className={` 
        h-9 rounded-md bg-main-300 pl-4 text-8 placeholder:pl-1 placeholder:text-7 focus-visible:outline-secondary-300 
        w-${width ?? "40"} ${textAlign}
        ${sx ?? ""}`}
        />
        {error && <Error message={error} />}
      </div>
      <p>{unit ? "(" + unit + ")" : ""}</p>
    </div>
  );
}
