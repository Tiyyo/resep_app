import {  Form , useFetcher,  } from "@remix-run/react";
import SubmitButton from "../submit_button";
import PickRating from "../rating";
import { useEffect, useState } from "react";



export default function FormReview({ authorId, recipeId,openReviewSection }) {


  const styleTextaeraOpen = "resize-none h-20 w-full bg-primary-100 border p-2 text-7 focus-visible:outline-none"
  const styleTextaeraClose = "resize-none h-10 w-full bg-primary-100 border p-2 text-7 focus-visible:outline-none"

  const addReview = useFetcher();

  return (
    <div className="border shadow-xl w-96 bg-primary-100 rounded-xl py-2 px-4 min-w-[750px]">
      <Form method="POST" className="flex flex-col gap-y-4">
        <input type="number" hidden defaultValue={authorId} name="authorId" />
        <input type="number" hidden defaultValue={recipeId} name="recipeId" />
        {/* <PickRating/> */}
        <textarea
          className={openReviewSection ? styleTextaeraOpen : styleTextaeraClose}
          name="comment"
          id="leaveReviewSection"
          placeholder="Leave a comment"
        ></textarea>
        <div className="self-end">
          <SubmitButton text={authorId ? "send" : "sign in to send"}  height="7"/>
        </div>
      </Form>
    </div>
  );
}
