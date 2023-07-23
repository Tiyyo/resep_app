import { type ActionArgs } from "@remix-run/node";
import favorite from "~/api/favorite";
import review from "~/api/review";
import UserInputError from "~/helpers/errors/user.inputs.error";
import ResponseError from "~/helpers/response/response.error";
import ResponseValid from "~/helpers/response/response.ok";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const recipeId = formData.get("recipeId");
  const authorId = formData.get("authorId");

  try {
    if (typeof authorId === "string" && typeof recipeId === "string") {
      const infos = await review.findByIds(+authorId, +recipeId);

      infos && await favorite.like(authorId, recipeId);
      infos?.is_liked
        ? await favorite.destroy(authorId, recipeId)
        : await favorite.like(authorId, recipeId);

      return new ResponseValid(200, "Successfully added", null);
    }
    throw new UserInputError(
      "Either authorId or recipeId is not a string and cannot be converted to a number",
      "Invalid input"
    );
  } catch (error) {
    return new ResponseError(error);
  }
}
