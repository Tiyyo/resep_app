import { useState } from "react";
import AddPlusIcon from "~/assets/icons/AddPlusIcon";
import MinusIcon from "~/assets/icons/MinusIcon";
import type { IngredientListByCategory } from "~/service/group.list.by.cty.server";

export interface ItemsGroupProps {
  data: IngredientListByCategory;
  categoryName: string;
}

export default function ItemsGroup({ data, categoryName }: ItemsGroupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOpening = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex w-full max-w-[350px] flex-col items-center gap-y-2 rounded-lg border border-dotted border-secondary-300 border-opacity-10 px-2 ${
        isOpen ? "max-h-fit" : "max-h-10 "
      }`}
    >
      <div className="flex w-full items-center justify-between text-secondary-400">
        <p className="my-2  text-7 font-semibold  text-opacity-60">
          {categoryName}
        </p>
        <div className="cursor-pointer" onClick={handleClickOpening}>
          {isOpen ? <MinusIcon size="2" /> : <AddPlusIcon size="2" />}
        </div>
      </div>
      {data[categoryName]
        .sort((a, b) => Number(a.name) - Number(b.name)) // Not sure it's the best way to sort
        .map((item) => {
          return (
            <div
              key={item.id}
              className={`w-[90%] items-center justify-between gap-x-2 ${
                isOpen ? "flex" : "hidden"
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="aspect-square h-6 rounded-full"
              />
              <p className="flex-grow text-7 opacity-80">{item.name}</p>
              <p className="w-[12%] text-7 opacity-80">
                {item.qty ? Number(item.qty).toFixed(1) : item.qty}
                <span>{item.qty && item.unit}</span>
              </p>
            </div>
          );
        })}
    </div>
  );
}
