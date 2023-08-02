import StarIcon from "~/assets/icons/StarIcon";
import type { ReviewsProps } from "./interface";

export default function Review({ comment, rating, author }: ReviewsProps) {
  return (
    <div className="w-full rounded-xl border bg-main-100 px-4 py-2 shadow-md">
      <div className="flex items-center justify-between">
        <p className="font-bold capitalize text-text-accent">{author}</p>
        {rating && (
          <div className="flex items-end gap-x-1">
            <div className="text-secondary-300 ">
              <StarIcon size="5" fill={true} />
            </div>
            <p className="relative top-[1px] text-8 ">
              {rating}
              <span className="mx-[1px]">/</span>5
            </p>
          </div>
        )}
      </div>
      <p className="py-4 text-7">{comment}</p>
    </div>
  );
}
