import { useEffect, useRef, useState } from "react";
import MinusCircleIcon from "~/assets/icons/MinusCircleIcon";
import PlusCircleIcon from "~/assets/icons/PlusCircleIcon";
import ServingIcon from "~/assets/icons/ServingsIcon";
import Input from "~/components/input";
import AddPlusIcon from "~/assets/icons/AddPlusIcon";
import MinusIcon from "~/assets/icons/MinusIcon";
import IngredientItem from "./ingredientItem";
import TitleLevel3 from "~/components/title/TilteLevel3";
import type { IngredientItemProps, MeasureFetch } from "./interface";

export default function IngredientsList({
  measures,
  servings: originalServings,
}: IngredientItemProps) {
  const [servings, setServings] = useState<number>(originalServings);
  const [listIsOpen, setListIsOpen] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const ingrContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClickSevings = (e: React.MouseEvent) => {
    if ((e.currentTarget as HTMLElement).dataset.count === "plus") {
      setServings(servings + 1);
    } else if (servings > 1) {
      setServings(servings - 1);
    }
  };

  useEffect(() => {
    if (ingrContainerRef.current) {
      console.log(ingrContainerRef);
      ingrContainerRef.current.scrollHeight ===
      ingrContainerRef.current.clientHeight
        ? setHasMore(false)
        : setHasMore(true);
    }
  }, []);

  return (
    <>
      <TitleLevel3 title="Ingredients" />
      <div className="relative mt-1 flex min-w-[290px] flex-col gap-y-3 rounded-lg border bg-main-100 py-2 shadow-sober">
        <div className="flex w-full items-center justify-between gap-x-8 self-center border-b border-dashed border-slate-900 border-opacity-20 px-6 text-secondary-300">
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
              value={servings}
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
          className={`flex flex-col gap-y-4 overflow-hidden transition-all ${
            listIsOpen ? " max-h-fit" : "max-h-[75px] xl:max-h-[650px]"
          }`}
          ref={ingrContainerRef}
        >
          <div className="py-4.5  flex pl-4 pr-8 text-8 text-text-200">
            <p className="flex-80">Ingredients</p>
            <p className="text-7 font-normal text-text-accent_soft">
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
        <div className="flex h-10 items-center justify-between border-t border-dashed border-slate-900 border-opacity-20 px-10">
          {hasMore && (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
