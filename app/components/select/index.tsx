import { useId } from "react";
import type { SelectProps } from "./interface";

export default function Select({ children, options } : SelectProps) {
    const id = useId()
  return (
    <div className="flex gap-x-2 items-center text-secondary-400">
      {children}
      <select
        name="level"
        className="h-9 rounded-md focus:outline-secondary-300 bg-main-300 px-4 py-2 w-28"
      >
        {options.map((option, index) => {
          return <option key={id + index} value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
}
