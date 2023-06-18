import Select from "react-select";
import type { SelectSearchProps } from "./interface";
import {useHydrated} from "remix-utils"


export default function SelectSearch({
  name,
  data,
  filterBy,
  placeholder,
  index,
  width,
  pageSize,
  getState,
  defaultValue,
}: SelectSearchProps) {

  const getOptions = () => {
    if (data && data.length > 0) {
      const options = data.map((d) => {
        return {
          value: d[`${index}` as keyof typeof d],
          label: d[`${filterBy}` as keyof typeof d],
        };
      });
      return options;
    }
  };

  const placeholderStyles = "text-gray-500 text-7 pl-2 py-0.5";
  const controlStyles =
    "rounded-md bg-main-300 hover:cursor-pointer min-h-6 h-8";
  const selectInputStyles = "pl-2 py-0.5 h-6 min-w-max max-w-xxs";
  const valueContainerStyles = `pl-2 gap-1 w-${width ?? "32"}`;
  const menuStyles =
    "p-1 mt-2 border border-secondary-400 bg-main-300 rounded-md";
  const noOptionsMessageStyles = "text-gray-500 bg-main-300 rounded";
  const dropdownIndicatorStyles =
    "py-2 hover:bg-primary-200 text-gray-500 rounded-md hover:text-black";
  const indicatorSeparatorStyles = "bg-secondary-400";
  const optionStyles =
    "hover:cursor-pointer px-2 py-0.5 hover:bg-primary-200 focus:bg-primary-100  selected:text-secondary-100";
  const clearIndicatorStyles =
    "text-gray-500 p-0 rounded-md hover:bg-red-50 hover:text-red";
  // base: "hover:cursor-pointer px-3 py-2 rounded",
  // focus: "bg-gray-100 active:bg-gray-200",
  // selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
  // const controlStyles = {

  //   base: "border rounded-lg bg-white hover:cursor-pointer",
  //   focus: "border-primary-600 ring-1 ring-primary-500",
  //   nonFocus: "border-gray-300 hover:border-gray-400",
  // };

  const singleValueStyles = "leading-7 ml-1";
  const multiValueStyles =
    "bg-gray-100 rounded items-center py-0 pl-2 pr-1 gap-1.5";
  const multiValueLabelStyles = "leading-6 py-0.5";
  const multiValueRemoveStyles =
    "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
  const indicatorsContainerStyles = "px-2 gap-1";
  // const menuStyles = "p-1 mt-2 border border-gray-200 bg-white rounded-lg";
  const groupHeadingStyles = "ml-0 mt-0 mb-1 text-gray-500 text-sm";
  // const optionStyles = {
  //   base: "hover:cursor-pointer px-3 py-2 rounded",
  //   focus: "bg-gray-100 active:bg-gray-200",
  //   selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
  // };
  const isHydrated = useHydrated();

  return isHydrated ? (
    <Select
      name={name}
      options={getOptions()}
      placeholder={placeholder ?? "Search"}
      pageSize={5}
      isClearable={true}
      isRtl={false}
      instanceId={name}
      id={name}
      defaultValue={defaultValue}
      // onChange={(e) => getState(e)}
      unstyled
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        // On mobile, the label will truncate automatically, so we want to
        // override that behaviour.
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
        }),
        control: (base) => ({
          ...base,
          transition: "none",
        }),
      }}
      // components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
      classNames={{
        // control: ({ isFocused }) =>

        //     isFocused ? controlStyles.focus : controlStyles.nonFocus,
        //     controlStyles.base,
        // ,
        control: () => controlStyles,
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        menu: () => menuStyles,
        noOptionsMessage: () => noOptionsMessageStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        option: () => optionStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        // option: ({ isFocused, isSelected }) =>
        //   clsx(
        //     isFocused && optionStyles.focus,
        //     isSelected && optionStyles.selected,
        //     optionStyles.base,
        //   ),

        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        clearIndicator: () => clearIndicatorStyles,
        groupHeading: () => groupHeadingStyles,
      }}
      // {...props}
    />
  ) : null;
}
