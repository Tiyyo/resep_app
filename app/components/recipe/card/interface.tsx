export interface RecipeCardProps {
  imageLink?: string;
  recipeName: string;
  recipeCalories?: string;
  recipeId: number;
  isLiked?: boolean;
  tags?: string[];
  variant?: "vertical" | "horizontal";
}
