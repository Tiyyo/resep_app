import type { Recipe } from "~/types";


const isLikedByUser = (recipe: Recipe, authorId?: number) => {
  if (!authorId) return false;
  const reviews = recipe.reviews;
  if (reviews && reviews.length > 0) {
    return reviews?.some(
      (review) => review.author_id === authorId && review.is_liked
    );
  }
  return false;
};

export default isLikedByUser;
