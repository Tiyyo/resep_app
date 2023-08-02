import Calories from "~/assets/icons/Calories";
import Carbs from "~/assets/icons/Carbs";
import Lipids from "~/assets/icons/Lipids";
import Proteins from "~/assets/icons/Proteins";
import Water from "~/assets/icons/Water";
import NutrientIndicator from "../nutrient_indicator";
import type { NutritionFactsProps } from "./interface";

export default function NutritionFacts({
  calories,
  carbs,
  proteins,
  fat,
  water,
}: NutritionFactsProps) {
  return (
    <div className="macros">
      <div className="macros__head">
        <h2 className="text-8 leading-none">Nutrition Facts</h2>
        <p className="pl-4 text-7 text-text-accent_soft">|serv</p>
      </div>
      <div className="flex max-w-[600px] justify-evenly">
        <NutrientIndicator
          value={calories}
          addText="kcal"
          Icon={<Calories />}
        />
        <NutrientIndicator
          value={proteins}
          unit="g"
          addText="Proteins"
          Icon={<Proteins />}
        />
        <NutrientIndicator
          value={carbs}
          unit="g"
          addText="Carbs"
          Icon={<Carbs />}
        />
        <NutrientIndicator
          value={fat}
          unit="g"
          addText="Fat"
          Icon={<Lipids />}
        />
        <NutrientIndicator
          value={water}
          unit="ml"
          addText="Water"
          Icon={<Water />}
        />
      </div>
    </div>
  );
}
