import { useState } from "react";
import Review from "../reviews";
import ControlShow from "~/components/control_show";
import FormReview from "~/components/form_review";
import type { CommentSectionProps } from "./interface";
import type { UserRecipeInfo } from "~/types";

export default function CommentSection({
  reviews,
  recipeId,
  authorId,
}: CommentSectionProps) {
  const [sectionIsOpen, setSectionIsOpen] = useState<boolean>(false);

  const thereIsMoreThanThreeReviews = reviews.length > 3;

  function controlSizeCommentSection(reviews: UserRecipeInfo[]) {
    if (sectionIsOpen) {
      return reviews;
    }
    const copyReviews = [...reviews];
    return copyReviews.slice(0, 3);
  }

  return (
    <div className="flex flex-col items-center gap-y-2 overflow-x-hidden">
      <FormReview authorId={authorId} recipeId={recipeId} />
      <div
        className={`flex h-fit max-h-[410px] w-full flex-col items-center gap-y-2  overflow-x-hidden py-4`}
      >
        {controlSizeCommentSection(reviews).map(
          (review, index: number) =>
            review.comment &&
            review.author && (
              <Review
                key={index}
                comment={review.comment}
                rating={review.rating}
                author={review.author?.username ? review.author.username : ""}
              />
            )
        )}
      </div>
      {thereIsMoreThanThreeReviews && (
        <div onClick={() => setSectionIsOpen(!sectionIsOpen)}>
          {sectionIsOpen ? (
            <ControlShow variant="less" />
          ) : (
            <ControlShow variant="more" />
          )}
        </div>
      )}
    </div>
  );
}
