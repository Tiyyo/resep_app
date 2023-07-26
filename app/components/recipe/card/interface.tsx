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

export interface CardRecipeImageProps {
  variant: string;
  imageLink?: string;
  recipeId: number;
  recipeName: string;
}

export interface CardRecipePickProps {
  pickedMeal?: number;
  recipeId: number;
  recipeName: string;
  imageLink?: string;
  servings: number;
}
