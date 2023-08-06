import type { UserRecipeInfo } from "~/types";

export interface CommentSectionProps {
  reviews: UserRecipeInfo[];
  recipeId: number;
  authorId: number;
}
