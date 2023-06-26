import { useState } from "react";
import MinusCircleIcon from "~/assets/icons/MinusCircleIcon";
import PlusCircleIcon from "~/assets/icons/PlusCircleIcon";
import ServingIcon from "~/assets/icons/ServingsIcon";
import Input from "~/components/input";
import  Fraction  from 'fraction.js'

export default function IngredientsList({
  measures,
  servings: originalServings,
}: any) {
  const [servings, setServings] = useState<number>(originalServings);

  const handleClickSevings = (e: React.MouseEvent) => {
    console.log(e);
    if ((e.currentTarget as HTMLElement).dataset.count === "plus") {
      setServings(servings + 1);
    } else if (servings > 1) {
      setServings(servings - 1);
    }
  };

  const findNearastFraction = (number) => {
      const fraction =  new Fraction(Math.round( 4 *  Fraction(number).valueOf()) , 4)
      return `${fraction.n} / ${fraction.d}`
  }

  console.log(findNearastFraction(0.6));

  return (
    <div className="relative flex flex-col mt-4 gap-y-3 py-2">
      <div className="flex gap-x-8 items-center self-center text-secondary-300">
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
      <div className="flex text-text-200 py-4.5 pl-4 pr-8 text-8">
        <p className="flex-80">Ingredients</p>
        <p className="text-7 text-text-accent_soft font-normal">
          {measures.length} Items
        </p>
      </div>
      {measures.map((measure, index) => {
        // let qty = null;
        // measures.forEach((measure) =>
        //   measure.name.toLowerCase() === ingr.name.toLowerCase()
        //     ? (qty = measure.qty)
        //     : null
        // );
        return (
          <div
            key={index}
            className="flex items-center bg-primary-100 rounded-2xl py-.5 px-1.5 mx-1"
          >
            <p className="flex-80 pl-2 flex items-center gap-x-1">
              <img
                src={measure.ingredient.icon.link}
                alt=""
                className="h-4 w-4 rounded-full"
              />
              <span className="text-6">{measure.ingredient.name}</span>
            </p>
            <p className="pr-6 text-6 text-text-300">
              {(servings * measure.qty / originalServings).toFixed(1)} {measure.unit_measure.abreviation}
            </p>
          </div>
        );
      })}
    </div>
  );
}
