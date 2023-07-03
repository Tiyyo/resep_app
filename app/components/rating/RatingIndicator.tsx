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
          <div className="flex text-blue-700 justify-end gap-x-6">
            {stars.map((star, index) => {
              return <Star key={index} position={index} rating={avgRating} />;
            })}
          </div>
          {numStars ? (
            <span className="pl-8 text-8 text-slate-400 font-medium">
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
