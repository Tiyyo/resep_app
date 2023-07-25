import { useFetcher } from "@remix-run/react";
import SubmitButton from "../submit_button";
import PickRating from "../rating/PickRating";
import type { FormReviewProps } from "./interface";
import { useEffect, useRef, useState } from "react";
import Error from "../error";

export default function FormReview({ authorId, recipeId }: FormReviewProps) {
  const styleTextaeraOpen =
    "resize-none h-20 w-full bg-primary-100 border p-2 text-7 focus-visible:outline-none";
  const styleTextaeraClose =
    "resize-none h-10 w-full bg-primary-100 border p-2 text-7 focus-visible:outline-none ";

  const addReview = useFetcher();
  const addReviewFormRef = useRef<HTMLFormElement>(null);
  const textAera = useRef<HTMLTextAreaElement>(null);
  const [openReviewSection, setOpenLeaveReviewSection] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleHover = () => {
    setOpenLeaveReviewSection(false);
    textAera.current?.blur();
  };

  useEffect(() => {
    if (
      addReview.state === "idle" &&
      addReviewFormRef &&
      addReviewFormRef.current
    ) {
      if (addReview.data?.message) {
        setError(addReview.data?.message);
      }
      if (addReview.data?.status === 200) {
        addReviewFormRef.current.reset();
      }
    }
  }, [addReview.state, addReview.data?.status, addReview.data?.message]);

  return (
    <div
      className="w-full rounded-xl border bg-main-100 px-4 py-2 shadow-xl "
      onMouseLeave={handleHover}
    >
      <addReview.Form
        ref={addReviewFormRef}
        method="POST"
        action="/api/reviews"
        className="flex flex-col gap-y-4 "
      >
        <input type="number" hidden defaultValue={authorId} name="authorId" />
        <input type="number" hidden defaultValue={recipeId} name="recipeId" />
        <textarea
          ref={textAera}
          className={openReviewSection ? styleTextaeraOpen : styleTextaeraClose}
          name="comment"
          id="leaveReviewSection"
          placeholder="Leave a comment"
          onFocusCapture={() => setOpenLeaveReviewSection(true)}
        ></textarea>
        <div className="flex justify-between">
          {openReviewSection ? (
            <>
              <PickRating numOfStars={5} />
              <SubmitButton
                text={authorId ? "Send" : "sign in to send"}
                height="7"
              />{" "}
            </>
          ) : null}
        </div>
      </addReview.Form>
      <Error message={error} />
    </div>
  );
}
