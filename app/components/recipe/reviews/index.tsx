import StarIcon from "~/assets/icons/StarIcon";
import type { ReviewsProps } from "./interface";

export default function Review({ comment, rating, author }: ReviewsProps) {
  return (
    <div className="border shadow-md w-full bg-main-100 rounded-xl py-2 px-4">
      <div className="flex justify-between items-center">
        <p className="text-text-accent font-bold capitalize">{author}</p>
        {rating && (
          <div className="flex items-end gap-x-1">
            <div className="text-secondary-300 ">
              <StarIcon size="5" fill={true} />
            </div>
            <p className="relative text-8 top-[1px] ">
              {rating}
              <span className="mx-[1px]">/</span>5
            </p>
          </div>
        )}
      </div>
      <p className="text-7 py-4">{comment}</p>
    </div>
  );
}
