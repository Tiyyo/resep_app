import Calories from "~/assets/icons/Calories";
import Carbs from "~/assets/icons/Carbs";
import Lipids from "~/assets/icons/Lipids";
import Proteins from "~/assets/icons/Proteins";
import Water from "~/assets/icons/Water";

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
        <p className="text-6 pl-4 text-text-accent_soft">|serv</p>
      </div>
      <div className="flex items-center justify-center my-2 macro">
        <div className="rounded-full text-text-200 flex items-center justify-center h-10 w-10 bg-primary-300 p-2">
          <Calories />
        </div>
        <p className="text-8">
          <span>{calories ? calories : ""}</span>
          Kcal
        </p>
      </div>
      <div className="grid grid-cols-2 gap-y-2.5">
        <div className="flex items-center justify-center text-7 gap-2.5">
          <div className="rounded-full text-text-200 flex items-center justify-center h-10 w-10 bg-primary-300 p-2 text-7 gap-2.5">
            <Carbs />
          </div>
          <p>
            <span>{carbs ? carbs : ""}</span> g carbs
          </p>
        </div>
        <div className="flex items-center justify-center text-7 gap-2.5">
          <div className="rounded-full text-text-200 flex items-center justify-center h-10 w-10 bg-primary-300 p-2">
            <Proteins />
          </div>
          <p>
            <span>{proteins ? proteins : ""}</span> g proteins
          </p>
        </div>
        <div className="flex items-center justify-center text-7 gap-2.5">
          <div className="rounded-full text-text-200 flex items-center justify-center h-10 w-10 bg-primary-300 p-2">
            <Lipids />
          </div>
          <p>
            <span>{fat ? fat : ""}</span> g lipids
          </p>
        </div>
        <div className="flex items-center justify-center text-7 gap-2.5">
          <div className="rounded-full text-text-200 flex items-center justify-center h-10 w-10 bg-primary-300 p-2">
            <Water fillColor="text-200" />
          </div>
          <p>
            <span>{water ? water : ""}</span> ml water
          </p>
        </div>
      </div>
    </div>
  );
}
