import { json, type ActionArgs } from "@remix-run/node";
import review from "~/api/review";
import { convertStringToNumber } from "~/utils/convert.to.number";

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const method = request.method.toLowerCase()




    switch (method) {
        case "post": {
            const rating = formData.get("rating") as string;
            const authorId = formData.get("authorId") as string;
            const recipeId = formData.get("recipeId") as string;
            const comment = formData.get("comment") as string;

            if (comment && comment.length < 3) {
                return json({
                    error: {
                        comment: "Comment must be at least 3 characters long"
                    }
                })
            }

            if ((typeof rating !== "string") && ((typeof rating !== null) || (typeof rating !== undefined) || (rating instanceof File))) {
                return json({
                    error: {
                        rating: "Expected a string, null or undefined"
                    }
                }, { status: 500 })
            }

            if (typeof recipeId !== "string") {
                return json({
                    error: {
                        recipeId: "Expected a string"
                    }
                }, { status: 500 })
            }
            if (typeof authorId !== "string") {
                return json({
                    error: {
                        authorId: "Expected a string"
                    }
                }, { status: 500 })
            }

            const fieldConverted = await convertStringToNumber({
                rating,
                authorId,
                recipeId,
            });

            const body = { rating: fieldConverted.rating, authorId: fieldConverted.authorId, recipeId: fieldConverted.recipeId, comment };

            try {
                await review.add(body);
                return json({ message: "ok" }, { status: 200 });
            } catch (error: any) {

                if (error.message === 'You cannot add several reviews , Please edit the one you already posted') {
                    return json({ message: error.message }, { status: 400 })
                }
                return json({ message: 'Server error' }, { status: 500 })
            }
        }
        case "patch": {
            // bloc de code
        }
        case "delete": {
            // bloc de code
        }
        default: {
            throw new Error('Invalid method')
        }
    }
}