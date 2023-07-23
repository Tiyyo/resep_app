import { Recipe } from "~/types/recipe";

const isLikedByUser = (recipe: Recipe, userId: number) => {
  const reviews = recipe.reviews;
  if (reviews && reviews.length > 0) {
    return reviews?.some(
      (review) => review.author_id === userId && review.is_liked
    );
  }
  return false;
};

export default isLikedByUser;
