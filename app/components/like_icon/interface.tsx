import type{ InfosRecipeByUser } from "~/types/recipe";

export interface AddFavoriteIconProps { 
    infosRecipeByUser: InfosRecipeByUser;
    onClick: (event : React.MouseEvent) => void;
}