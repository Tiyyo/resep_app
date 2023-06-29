import {  Form , useFetcher } from "@remix-run/react";
import SubmitButton from "../submit_button";
import PickRating from "../rating";



export default function FormReview({ authorId, recipeId }) {
  const addReview = useFetcher();
  return (
    <div className="border shadow-xl w-96 bg-main-300 rounded-xl py-2 px-4">
      <Form method="POST" className="flex flex-col gap-y-4">
        <input type="number" hidden defaultValue={authorId} name="authorId" />
        <input type="number" hidden defaultValue={recipeId} name="recipeId" />
        <PickRating/>
        <textarea
          className="resize-none h-20 w-full border border-red text-7"
          name="comment"
        ></textarea>
        <div className="self-end">
          <SubmitButton text="Send" />
        </div>
      </Form>
    </div>
  );
}
