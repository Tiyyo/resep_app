import LikeIcon from "~/assets/icons/Like";
import type{ AddFavoriteIconProps } from "./interface";

export default function AddFavoriteIcon({infosRecipeByUser : infos, onClick} : AddFavoriteIconProps) {
  return (
    <div onClick={onClick} className="text-secondary-400">
      {infos && infos.is_liked ? (
        <LikeIcon size="8" fill={true} />
      ) : (
        <LikeIcon size="8" />
      )}
    </div>

  );
}
