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


  const getOptions = () => {
    if (data && data.length > 0 ) {
        const options = data
        .map((d) => {
          return {
            value: d[`${index}` as keyof typeof d],
            label: d[`${filterBy}` as keyof typeof d],
          };
        })
        return options
    }
  }

  return (
    <Select
      name={name}
      options={getOptions()}
      placeholder={placeholder ?? "Search"}
    />
  );
}
