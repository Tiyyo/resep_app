import { type ActionArgs } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import review from "~/api/review";
import MethodError from "~/helpers/errors/method.error";
import ResponseError from "~/helpers/response/response.error";
import convertStringToNumber from "~/utils/convert.to.number";
import * as Z from "zod";
import { validationError } from "remix-validated-form";
import ResponseValid from "~/helpers/response/response.ok";
import ServerError from "~/helpers/errors/server.error";
import type { UserRecipeInfo } from "~/types";

export const validator = withZod(
  Z.object({
    rating: Z.string().optional(),
    authorId: Z.string(),
    recipeId: Z.string(),
    comment: Z.string()
      .min(5, { message: "Comment must be at least 5 characters long" })
      .optional(),
  })
);

export async function action({ request }: ActionArgs) {
  const method = request.method.toLowerCase();

  switch (method) {
    case "post": {
      const formData = await validator.validate(await request.formData());
      if (formData.error) return validationError(formData.error);
      const { rating, authorId, recipeId, comment } = formData.data;

      try {
        const fieldConverted = await convertStringToNumber({
          rating,
          authorId,
          recipeId,
        });


        if (typeof fieldConverted.authorId === 'number' && typeof fieldConverted.recipeId === 'number') {
          let body: UserRecipeInfo = {
            rating: fieldConverted.rating || undefined,
            author_id: fieldConverted.authorId,
            recipe_id: fieldConverted.recipeId,
            comment: comment ?? undefined,
          };
          if (!body)
            throw new ServerError("author id or recipe id is missing");

          await review.add(body);
          return new ResponseValid(201, "Successfully added", null);
        }
        throw new ServerError("author id or recipe id is missing");
      } catch (error: any) {
        return new ResponseError(error);
      }
    }
    case "patch": {
      // bloc de code
    }
    case "delete": {
      // bloc de code
    }
    default: {
      return new ResponseError(new MethodError("Invali method"));
    }
  }
}
