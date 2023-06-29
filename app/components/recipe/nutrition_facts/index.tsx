import Calories from "~/assets/icons/Calories";
import Carbs from "~/assets/icons/Carbs";
import Lipids from "~/assets/icons/Lipids";
import Proteins from "~/assets/icons/Proteins";
import Water from "~/assets/icons/Water";
import NutrientIndicator from "../nutrient_indicator";

export default function NutritionFacts({
  calories,
  carbs,
  proteins,
  fat,
  water,
}) {

  
  return (
    <div className="macros">
      <div className="macros__head">
        <h2 className="text-8 leading-none">Nutrition Facts</h2>
        <p className="text-7 pl-4 text-text-accent_soft">|serv</p>
      </div>
      <div className="flex justify-evenly max-w-[600px]">
        <NutrientIndicator value={calories} addText="Kcal" Icon={<Calories/>}/>
        <NutrientIndicator value={proteins} addText="g Proteins" Icon={<Proteins />}/>
        <NutrientIndicator value={carbs} addText="g Carbs" Icon={<Carbs />}/>
        <NutrientIndicator value={fat} addText="g Fat" Icon={<Lipids />}/>
        <NutrientIndicator value={water} addText="ml Water" Icon={<Water/>}/>
      </div>
    </div>
  );
}
