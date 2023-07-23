import CloseIcon from "~/assets/icons/CloseIcon";
import type { TagProps } from "./interface";

export default function Tag({ index, removeTag, value }: TagProps) {
  return (
    <div
      key={index}
      className="flex h-10 w-fit items-center gap-x-2 rounded-md bg-main-300 px-4 text-10  font-semibold"
    >
      <p>{value}</p>
      <input name="tags" defaultValue={value} hidden />
      <div
        data-index={index}
        onClick={removeTag}
        className="cursor-pointer transition-all hover:text-secondary-300"
      >
        <CloseIcon size="6" />
      </div>
    </div>
  );
}
