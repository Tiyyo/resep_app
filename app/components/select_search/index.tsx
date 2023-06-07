import Select from "react-select";
import type { SelectSearchProps } from "./interface";

export default function SelectSearch({
  name,
  data,
  filterBy,
  optionMax,
  placeholder,
  index,
}: SelectSearchProps) {
  const options = data
    .map((d) => {
      return {
        value: d[`${index}` as keyof typeof d],
        label: d[`${filterBy}` as keyof typeof d],
      };
    })
    .slice(0, optionMax ?? 5);

  return (
    <Select
      name={name}
      options={options}
      placeholder={placeholder ?? "Search"}
    />
  );
}
