export interface RecipeCardProps {
  imageLink?: string;
  recipeName: string;
  recipeCalories?: string;
  recipeId: number;
  servings?: number;
  isLiked?: boolean;
  tags?: string[];
  variant?: "vertical" | "horizontal";
  pickedMeal?: number;
}
