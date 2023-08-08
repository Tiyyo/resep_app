import type { UserRecipeInfo } from "~/types/index";

export interface AddFavoriteIconProps {
  infosRecipeByUser: UserRecipeInfo;
  onClick: (event: React.MouseEvent) => void;
}
