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
    <div className="my-6 flex items-center justify-around gap-2.5 self-start  px-2.5 py-1.5 text-8 font-normal ">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <Prep size="6" />
          <p className="font-light">{prepTime} min</p>
        </div>{" "}
        |{" "}
        <div className="flex items-center gap-x-1">
          {" "}
          <Cook size="6" />
          <p className="font-light">{cookTime} min</p>
        </div>{" "}
        |{" "}
        <div className="flex items-center gap-x-1 ">
          <GaugeIcon size="6" />
          <p className="font-light">{difficulty}</p>
        </div>{" "}
        {favorite < 1 ? (
          ""
        ) : (
          <>
            |{" "}
            <div className="flex items-center gap-x-1 opacity-70">
              <LikeIcon size="6" />
              {favorite ? favorite + " likes" : ""}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
