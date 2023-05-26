import ErrorIcon from "~/assets/icons/ErrorIcon";
import type { CheckboxProps } from "./interface";
import { useState } from "react";

export default function Checkbox({label, name, error,  onChange} : CheckboxProps) {
  const [errorText, setErrorText] = useState(error);

  function handleChange(e: React.SyntheticEvent): void {
    setErrorText("");
  }

  return (
    <>
      <label className="label cursor-pointer flex items-center">
        <input type="checkbox" className="checkbox" onChange={handleChange} name={name}/>
        <span className="label-text pl-2">{label}</span>
      </label>
      {errorText ? (
        <div className="text-xs font-semibold text-center text-red-600 w-full flex items-center gap-x-4 py-1 px-2 text-red">
          <ErrorIcon/>
          <p>{errorText}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
