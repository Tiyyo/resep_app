import type { FileInputProps } from "./interface";

export default function FileInput({label, width , height} : FileInputProps) {
  return (
    <>
      <label
        className="block mb-2 font-medium text-7 text-text-accent_soft dark:text-white"
        htmlFor="name"
      >
        {label}
      </label>
      <div className={`w-${width ?? "60"} h-${height ?? "8"}`}>
        <input
          className="block w-full h-full  text-7 text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-main-300 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:h-full file:bg-secondary-300 file:border-none file:text-text-100"
          aria-describedby="file_input_help"
          name="image"
          type="file"
        />
      </div>
      {/* <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </p> */}
    </>
  );
}
