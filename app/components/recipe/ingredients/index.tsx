import { useState } from "react";
import MinusCircleIcon from "~/assets/icons/MinusCircleIcon";
import PlusCircleIcon from "~/assets/icons/PlusCircleIcon";
import ServingIcon from "~/assets/icons/ServingsIcon";
import Input from "~/components/input";
import Fraction from "fraction.js";
import type { Measure } from "~/utils/recipe.builder.server";
import AddPlusIcon from "~/assets/icons/AddPlusIcon";
import MinusIcon from "~/assets/icons/MinusIcon";

export default function IngredientsList({
  measures,
  servings: originalServings,
}: any) {
  const [servings, setServings] = useState<number>(originalServings);
  const [listIsOpen, setListIsOpen] = useState<boolean>(false);

  const UNIT_FORMAT_FRACTION = ["tbsp", "tsp", "pods"];
  const styleOpenIngredientList =
    "max-h-fit overflow-hidden flex flex-col gap-y-4 transition-all";
  const styleCloseIngredientList =
    "max-h-[410px] overflow-hidden flex flex-col gap-y-4 transition-all";

  const handleClickSevings = (e: React.MouseEvent) => {
    if ((e.currentTarget as HTMLElement).dataset.count === "plus") {
      setServings(servings + 1);
    } else if (servings > 1) {
      setServings(servings - 1);
    }
  };

  const displayQty = (qty: number, unitAbreviation: string) => {
    if (unitAbreviation === "pch") return qty + " " + unitAbreviation;
    if (UNIT_FORMAT_FRACTION.includes(unitAbreviation)) {
      let newQty = (servings * qty) / originalServings;
      console.log(findNearestFraction(newQty, 2));
      return <div className="flex gap-x-1 items-center"><>{findNearestFraction(newQty, 2)}</>{unitAbreviation}</div>;
      // return findNearestFraction(newQty, 2) + " " + unitAbreviation;
    }
    let newQty = (servings * qty) / originalServings;
    if (Number.isInteger(newQty))
      return newQty.toFixed(0) + " " + unitAbreviation;
    return findNearestFraction(newQty, 1) + " " + unitAbreviation;
  };

  /**
   *
   * @param number
   * @param tape number who define the precision of the fraction (1/tape)
   * @returns
   */
  const findNearestFraction = (number: number, tape: number) => {
    const fraction = new Fraction(
      Math.round(tape * Fraction(number).valueOf()),
      tape
    );
    if (fraction.d === 1) return fraction.n;
    return (
      <div className="flex justify-center h-8 max-h-8 text-8">
        <span className="self-start">{fraction.n}</span>
        <span className="self-center">/</span>
        <span className="self-end">{fraction.d}</span>
      </div>
    );
    // return `${fraction.n} / ${fraction.d}`;
  };

  return (
    <div className="relative flex flex-col bg-main-300 rounded-lg mt-4 gap-y-3 py-2 shadow-sober min-w-[290px]">
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
        className={
          listIsOpen ? styleOpenIngredientList : styleCloseIngredientList
        }
      >
        <div className="flex  text-text-200 py-4.5 pl-4 pr-8 text-8">
          <p className="flex-80">Ingredients</p>
          <p className="text-7 text-text-accent_soft font-normal">
            {measures.length} Items
          </p>
        </div>
        {measures.map((measure: Measure, index: number) => {
          return (
            <div
              key={index}
              className="flex justify-between max-h-8 items-center rounded-2xl py-.5 px-1.5 mx-1"
            >
              <p className="pl-2 flex items-center gap-x-4 ">
                <img
                  src={measure?.ingredient?.icon?.link}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-8">{measure.ingredient.name}</span>
              </p>
              <p className="pr-6 text-8 text-text-300 opacity-80">
                {displayQty(
                  Number(measure.qty),
                  measure.unit_measure.abreviation
                )}
              </p>
            </div>
          );
        })}
      </div>
      <div className="h-10 flex items-center justify-between px-10 border-t border-dashed border-slate-900 border-opacity-20">
        <p className="italic">...full list</p>
        <div
          className="cursor-pointer"
          onClick={() => setListIsOpen(!listIsOpen)}
        >
          {listIsOpen ? <MinusIcon /> : <AddPlusIcon />}
        </div>
      </div>
    </div>
  );
}
