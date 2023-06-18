import Cook from "~/assets/icons/CookIcon";
import LikeIcon from "~/assets/icons/Like";
import Prep from "~/assets/icons/PrepIcon";
import Servings from "~/assets/icons/ServingsIcon";

export default function RecipeInfos({
  prepTime,
  cookTime,
  servings,
  likes,
}: RecipeInfos) {
  return (
    <div className="bg-primary-300 font-normal gap-2.5 flex items-center justify-around text-6 rounded-50 py-1.5 px-2.5 my-6 ">
      <p className="flex flex-10 items-center gap-2 py-2 px-1.5">
        <Prep />
        <span className="text-text-accent_soft">{prepTime}min</span>
      </p>
      <p className="flex flex-10 items-center gap-2 py-2 px-1.5">
        <Cook />
        <span className="text-text-accent_soft">{cookTime} min</span>
      </p>
      <p className="flex flex-10 items-center gap-2 py-2 px-1.5">
        <Servings />
        <span className="text-text-accent_soft">{servings}pers</span>
      </p>
      <p className="flex flex-10 items-center gap-2 py-2 px-1.5">
        <LikeIcon fillColor="text-100" />
        <span className="text-text-accent_soft">{likes}min</span>
      </p>
    </div>
  );
}
