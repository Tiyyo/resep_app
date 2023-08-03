import Error from "../error";
import type { FileInputProps } from "./interface";

export default function FileInput({
  label,
  width,
  height,
  name,
  error,
}: FileInputProps) {
  return (
    <>
      <label
        className=" mb-2 block text-7 font-medium text-text-accent_soft"
        htmlFor="name"
      >
        {label}
      </label>
      <div className={`w-${width ?? "60"} h-${height ?? "8"}`}>
        <input
          className="block h-full w-full  cursor-pointer rounded-md border border-gray-300 bg-main-300 text-7 text-gray-900 file:h-full file:border-none file:bg-secondary-300 file:text-text-100 focus:outline-none "
          aria-describedby="file_input_help"
          name={name}
          type="file"
        />
      </div>
      {error && <Error message="error" />}

      {/* <p
        className="mt-1 text-sm text-gray-500"
        id="file_input_help"
      >
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </p> */}
    </>
  );
}
