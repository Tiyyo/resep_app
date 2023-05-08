import Gauge from "~/assets/icons/Gauge";

export default function RecipeTitle({ name, difficulty }: RecipeTitle) {
  return (
    <div className="flex justify-between items-center py-2">
      <p className="relative -top-4 text-text-200 text-10 text-center tracking-wide">
        {name}
      </p>
      <p className="text-7 flex gap-2 items-center font-normal text-text-accent_soft">
        <Gauge />
        <span>{difficulty}</span>
      </p>
    </div>
  );
}
