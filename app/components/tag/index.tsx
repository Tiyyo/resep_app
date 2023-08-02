import CloseIcon from "~/assets/icons/CloseIcon";
import type { TagProps } from "./interface";



export default function Tag({index, removeTag, value} : TagProps) {
  return (
    <div
      key={index}
      className="bg-main-300 h-10 flex w-fit items-center px-4 text-10 gap-x-2 rounded-md  font-semibold"
    >
      <p>{value}</p>
      <input name="tags" defaultValue={value} hidden />
      <div
        data-index={index}
        onClick={removeTag}
        className="cursor-pointer hover:text-secondary-300 transition-all"
      >
        <CloseIcon size="6" />
      </div>
    </div>
  );
}
