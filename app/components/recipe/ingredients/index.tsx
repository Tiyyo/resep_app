import { useState } from "react";
import MinusCircleIcon from "~/assets/icons/MinusCircleIcon";
import PlusCircleIcon from "~/assets/icons/PlusCircleIcon";
import ServingIcon from "~/assets/icons/ServingsIcon";
import Input from "~/components/input";
import AddPlusIcon from "~/assets/icons/AddPlusIcon";
import MinusIcon from "~/assets/icons/MinusIcon";
import IngredientItem from "./ingredientItem";
import TitleLevel3 from "~/components/title/TilteLevel3";
import { IngredientItemProps, MeasureFetch } from "./interface";

export default function IngredientsList({
  measures,
  servings: originalServings,
}: IngredientItemProps) {
  const [servings, setServings] = useState<number>(originalServings);
  const [listIsOpen, setListIsOpen] = useState<boolean>(false);

  const handleClickSevings = (e: React.MouseEvent) => {
    if ((e.currentTarget as HTMLElement).dataset.count === "plus") {
      setServings(servings + 1);
    } else if (servings > 1) {
      setServings(servings - 1);
    }
  };

  return (
    <div className="">
      <TitleLevel3 title="Ingredients" />
      <div className="relative flex flex-col bg-main-100 border rounded-lg mt-1 gap-y-3 py-2 shadow-sober min-w-[290px]">
        <div className="flex gap-x-8 items-center self-center text-secondary-300 border-b border-dashed border-slate-900 border-opacity-20 w-full px-6 justify-between">
          <div className="flex items-center gap-x-2">
            <ServingIcon size="4" />
            <p className="text-7">Servings</p>
          </div>
          <div className="flex items-center">
            <div
              data-count="minus"
              onClick={handleClickSevings}
              className="cursor-pointer"
            >
              <MinusCircleIcon />
            </div>
            <Input
              name="servings"
              type="number"
              width="10"
              align="center"
              disabled={true}
              defaultValue={servings}
            />
            <div
              id="plus"
              data-count="plus"
              onClick={handleClickSevings}
              className="cursor-pointer"
            >
              <PlusCircleIcon />
            </div>
          </div>
        </div>
        <div
          className={`overflow-hidden flex flex-col gap-y-4 transition-all ${
            listIsOpen ? " max-h-fit" : "max-h-[650px]"
          }`}
        >
          <div className="flex  text-text-200 py-4.5 pl-4 pr-8 text-8">
            <p className="flex-80">Ingredients</p>
            <p className="text-7 text-text-accent_soft font-normal">
              {measures.length} Items
            </p>
          </div>
          {measures.map((measure: MeasureFetch) => {
            const measureId = measure.ingredient_id + measure.recipe_id;
            return (
              <IngredientItem
                key={measureId}
                measure={measure}
                servings={servings}
                originalServings={originalServings}
              />
            );
          })}
        </div>
        <div className="h-10 flex items-center justify-between px-10 border-t border-dashed border-slate-900 border-opacity-20">
          <p className="italic">
            {listIsOpen
              ? "...Hide the complete list"
              : "...Show the complete list"}
          </p>
          <div
            className="cursor-pointer"
            onClick={() => setListIsOpen(!listIsOpen)}
          >
            {listIsOpen ? <MinusIcon /> : <AddPlusIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}
