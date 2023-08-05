import ServingIcon from "~/assets/icons/ServingsIcon";

export default function MealPlanCard({ recipe }: { recipe: any }) {
  return (
    <div className="flex h-32 w-[120px] min-w-[120px] flex-col rounded-b-lg rounded-t-3xl bg-main-100 px-2 shadow-sober">
      <div className="relative -left-3 -top-2 flex items-center justify-between scroll-smooth">
        <img
          src={recipe.image}
          alt={recipe.recipe_name}
          className="aspect-square w-16 rounded-full "
        />
        <div className="flex">
          <ServingIcon size="4" />
          <p>{recipe.servings}</p>
        </div>
      </div>
      <p className="my-auto text-7 font-semibold text-text-accent">
        {recipe.recipe_name}
      </p>
    </div>
  );
}
