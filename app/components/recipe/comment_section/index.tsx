import { useState } from "react";
import Review from "../reviews";
import ChevronDownIcon from "~/assets/icons/ChevronDownIcon";
import ControlShow from "~/components/control_show";
import FormReview from "~/components/form_review";

export default function CommentSection({ reviews, close,openReviewSection  }) {
  
  const [sectionIsOpen, setSectionIsOpen] = useState<boolean>(false);

  const conditionalStyle = reviews.length > 1 && sectionIsOpen ? "overflow-y-scroll" : "" ;

  function controlSizeCommentSection(reviews) {
    if (sectionIsOpen) {
      return reviews;
    }
    const copyReviews = [...reviews];
    return copyReviews.slice(0, 3);
  }

  return (
    <div className="flex flex-col gap-y-2 items-center overflow-x-hidden">
      <FormReview authorId={1} recipeId={reviews[0]?.recipeId} openReviewSection={openReviewSection} />
      <div className={`flex flex-col gap-y-2 items-center max-h-[410px] h-fit  overflow-x-hidden py-4 ${conditionalStyle}`}>
        {controlSizeCommentSection(reviews).map((review) => (
          <Review
            key={review.id}
            text={review.comment}
            rate={review.rating}
            author={review.author.username}
          />
        ))}
      </div>
      {reviews.length > 0 && (
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
