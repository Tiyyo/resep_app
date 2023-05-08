export default function IngredientsList({
  ingredients,
  measures,
}: IngredientsList) {
  return (
    <div className="relative flex flex-col mt-4 gap-y-3 bg-primary-200 py-8">
      <div className="flex text-text-200 py-4.5 pl-4 pr-8">
        <p className="flex-80">Ingredients</p>
        <p className="text-7 text-text-accent_soft font-normal">
          {ingredients.length} Items
        </p>
      </div>
      {ingredients.map((ingr, index) => {
        let qty = null;
        measures.forEach((measure) =>
          measure.name.toLowerCase() === ingr.name.toLowerCase()
            ? (qty = measure.qty)
            : null
        );
        return (
          <div
            key={index}
            className="flex items-center bg-primary-100 rounded-2xl py-2.5 px-1.5 mx-1"
          >
            <p className="flex-80 pl-2 flex items-center gap-x-1">
              <img
                src={ingr.icons?.h100}
                alt=""
                className="h-6 w-6 rounded-xl"
              />
              <span>{ingr.name}</span>
            </p>
            <p className="pr-6 text-8 text-text-300">
              {qty} {ingr.unit_measure}
            </p>
          </div>
        );
      })}
    </div>
  );
}
