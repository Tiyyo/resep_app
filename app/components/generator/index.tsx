import AddPlusIcon from "~/assets/icons/AddPlusIcon";
import AddButton from "../button_add";
import { useState } from "react";
import Error from "../error";
import type { GenerateJSXProps } from "./interface";

export default function GenerateJSX({
  buttonProps,
  errors,
  ElementToGenerate,
  elementProps,
}: GenerateJSXProps) {
  const [length, setLength] = useState<String[]>([]);

  const addOneElement = () => {
    setLength((prevState) => [...prevState, "item"]);
  };

  const remove = (e: React.MouseEvent<HTMLElement>) => {
    let index = e.currentTarget.dataset.index;
    const copy = [...length];
    if (index) {
      const convertIndex = parseInt(index, 10);
      copy.splice(convertIndex, 1);
      setLength(copy);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <AddButton
        condition={buttonProps.condition}
        type={buttonProps.type}
        value={buttonProps.value}
        addStyle={buttonProps.addStyle}
        onClick={addOneElement}
      >
        <AddPlusIcon size="8" />
      </AddButton>
      <div className="flex w-full flex-col gap-y-4">
        {length.map((el, index) => {
          return ElementToGenerate({ index, remove, ...elementProps });
        })}
        {errors &&
          errors.length > 0 &&
          errors.map((errors: string, index: number) => {
            return <Error message={errors} key={index} />;
          })}
      </div>
    </div>
  );
}
