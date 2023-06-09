import Select from "react-select";
import type { SelectSearchProps } from "./interface";

export default function SelectSearch({
  name,
  data,
  filterBy,
  placeholder,
  index,
  getState,
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

  console.log(data , 'DATA SEACH');

  return (
    <Select
      name={name}
      options={getOptions()}
      placeholder={placeholder ?? "Search"}
      onChange={(e) => getState(e)}
    />
  );
}
