import { useEffect, useState } from "react";
import type { FormFieldProps } from "./interface";
import ErrorIcon from "~/assets/icons/ErrorIcon";

export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  error,
  children,
  subIcon,
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);
  const [icon, setIcon] = useState(true);

  function handleChange(e: React.SyntheticEvent): void {
    onChange(e);
    setErrorText("");
  }

  function toggleIcon() {
    setIcon(!icon);
  }

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <>
      <div className="relative my-1">
        <input
          style={
            errorText && errorText.length > 0
              ? { border: "2px solid #de4343" }
              : { border: "" }
          }
          type={type === "password" && !icon ? "text" : type}
          id={htmlFor}
          name={htmlFor}
          onChange={handleChange}
          value={value}
          className={`autofill:shadow-[inset_0_0_0px_1000px_rgb(255 248 242)] block w-full appearance-none rounded-xl border bg-primary-100 px-2.5 pb-2 pt-3 text-sm text-gray-900 autofill:shadow-[inset_0_0_0px_1000px_rgb(255,248,242)]  focus:border-secondary-300 focus:outline-none focus:ring-0 xl:bg-white-100 ${
            errorText && errorText.length > 0 ? "h-72" : ""
          }}`}
          placeholder=" "
          autoComplete={type === "password" ? "off" : "on"}
        />
        <label
          htmlFor={htmlFor}
          className="bg-white peer-focus:scale-80 absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-primary-100 px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:px-2 peer-focus:text-secondary-300 xl:bg-white-100"
        >
          {label}
        </label>
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 transform text-black-light peer-focus:text-secondary-300"
          onClick={() => {
            toggleIcon();
          }}
        >
          {!icon && subIcon ? subIcon : children}
        </div>
      </div>
      {errorText && (
        <div className="text-red-600 flex w-full items-center gap-x-4 px-2 py-1 text-center text-xs font-semibold text-red">
          <ErrorIcon />
          <p>{errorText}</p>
        </div>
      )}
    </>
  );
}
