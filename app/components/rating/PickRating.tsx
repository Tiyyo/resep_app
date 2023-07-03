import { useState } from "react";
import Star from "./Star";
import StarIcon from "~/assets/icons/StarIcon";

export default function PickRating({numOfStars} : { numOfStars: number }) {
  const [ratePrePick, setRatePrePick] = useState<number>(0);
  const stars = new Array(numOfStars).fill(1)


  const handleChange = (event) => {
    setRatePrePick(Number(event.target.value));
  };


  return (
    <fieldset onChange={handleChange} className="flex text-secondary-300">
      {stars.map((star, index) => {
        return (
          <label
            key={index}
            htmlFor={`rating-${index + 1}`}
            className="relative center"
          >
            <input
              type="radio"
              name="rating"
              id="rating-1"
              className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 appearance-none"
              defaultValue={index + 1}
            />
            <StarIcon fill={ratePrePick >= index + 1 ? true : false} />
          </label>
        );
      })}
    </fieldset>
  );
}
