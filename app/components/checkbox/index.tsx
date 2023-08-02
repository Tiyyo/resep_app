import ErrorIcon from "~/assets/icons/ErrorIcon";
import type { CheckboxProps } from "./interface";
import { useState, useEffect } from "react";

export default function Checkbox({
  label,
  name,
  error,
  onChange,
}: CheckboxProps) {
  const [errorText, setErrorText] = useState(error);

  function handleChange(e: React.SyntheticEvent): void {
    setErrorText("");
  }

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  console.log(error, errorText);
  return (
    <div className="flex flex-col">
      <label className="label flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleChange}
          name={name}
        />
        <span className="label-text pl-2">{label}</span>
      </label>
      {errorText && (
        <div className="text-red-600 flex w-full items-center gap-x-4  px-2 py-1 text-center text-xs font-semibold text-red">
          <ErrorIcon />
          <p>{errorText}</p>
        </div>
      )}
    </div>
  );
}
