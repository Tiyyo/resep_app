import Cook from "~/assets/icons/CookIcon";
import GaugeIcon from "~/assets/icons/Gauge";
import LikeIcon from "~/assets/icons/Like";
import Prep from "~/assets/icons/PrepIcon";
import type { RecipeInfosProps } from "./interface";

export default function RecipeInfos({
  prepTime,
  cookTime,
  difficulty,
  favorite,
}: RecipeInfosProps) {
  return (
    <div className="font-normal gap-2.5 flex items-center justify-around text-8  py-1.5 px-2.5 my-6 self-start ">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <Prep size="4" />
          <p className="font-light">{prepTime} min</p>
        </div>{" "}
        |{" "}
        <div className="flex items-center gap-x-1">
          {" "}
          <Cook size="4" />
          <p className="font-light">{cookTime} min</p>
        </div>{" "}
        |{" "}
        <div className="flex items-center gap-x-1">
          <GaugeIcon size="4" />
          <p className="font-light">{difficulty}</p>
        </div>{" "}
        |{" "}
        <div className="flex items-center gap-x-1">
          <LikeIcon size="4"  />
          {favorite}
        </div>
      </div>
      {/* <p className="flex flex-10 items-center gap-2 py-2 px-1.5">
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
      </p> */}
    </div>
  );
}
