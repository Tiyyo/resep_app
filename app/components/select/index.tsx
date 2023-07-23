import { useId } from "react";
import type { SelectProps } from "./interface";

export default function Select({ children, options }: SelectProps) {
  const id = useId();
  return (
    <div className="flex items-center gap-x-2 text-secondary-400">
      {children}
      <select
        name="level"
        className="h-9 w-28 rounded-md bg-main-300 px-4 py-2 focus:outline-secondary-300"
      >
        {options.map((option, index) => {
          return (
            <option key={id + index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
