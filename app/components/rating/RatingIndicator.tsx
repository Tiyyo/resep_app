import Star from "./Star";
import type { RatingIndicatorProps } from "./interface";

export default function RatingIndicator({
  avgRating,
  countRating,
  numStars,
}: RatingIndicatorProps) {
  if (!numStars) numStars = 0;
  const stars = new Array(numStars).fill(1);

  return (
    <>
      {avgRating && (
        <div className="flex">
          <div className="flex justify-end gap-x-6 text-blue-700">
            {stars.map((star, index) => {
              return <Star key={index} position={index} rating={avgRating} />;
            })}
          </div>
          {numStars ? (
            <span className="pl-8 text-8 font-medium text-slate-400">
              ({countRating}){"  "}
              {avgRating.toFixed(2)} out of {numStars}
            </span>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
