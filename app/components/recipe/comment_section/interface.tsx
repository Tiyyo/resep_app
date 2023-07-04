import  type { Reviews } from "~/types/recipe";

export interface CommentSectionProps {
    reviews: Reviews
    recipeId: number
    authorId: number
}