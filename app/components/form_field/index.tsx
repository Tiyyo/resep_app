import { useEffect, useState } from "react";
import type { FormFieldProps } from "./interface";

export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  error,
  children,
  subIcon
}: FormFieldProps) {

  const [errorText, setErrorText] = useState(error);
  const [icon, setIcon] = useState(true)


  function handleChange(e: React.SyntheticEvent): void {
    onChange(e);
    setErrorText("");
  }

  function toggleIcon () {
    setIcon(!icon)
  }

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
      <>
        <div className="relative my-1">
          <input
            type={type === 'password' && !icon ? 'text' : type}
            id={htmlFor}
            name={htmlFor}
            onChange={handleChange}
            value={value}
            className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 rounded-xl border appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary-300 focus:outline-none focus:ring-0 focus:border-secondary-300 peer"
            placeholder=" "
          />
          <label
            htmlFor={htmlFor}
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-secondary-300 peer-focus:dark:text-secondary-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-80 peer-focus:-translate-y-4 left-1 bg-white-100"
          >
            {label}
          </label>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black-light peer-focus:text-secondary-300" onClick={() => {
            toggleIcon()
          } }>
                {!icon && subIcon ? subIcon : children}
        </div>
        </div>
        <div className="text-xs font-semibold text-center text-red-600 w-full">
          {errorText || ""}
        </div>
      </>
  );
}
