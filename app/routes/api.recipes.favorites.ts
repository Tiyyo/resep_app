import { json, type ActionArgs } from "@remix-run/node";
import favorite from "~/api/favorite";
import review from "~/api/review";

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const method = request.method.toLowerCase();
    const recipeId = formData.get("recipeId");
    const authorId = formData.get("authorId");

    if (typeof authorId === "string" && typeof recipeId === "string") {
        const infos = await review.findByIds(+authorId, +recipeId);
        infos ? null : await favorite.like(authorId, recipeId);
        infos?.is_liked
            ? await favorite.destroy(authorId, recipeId)
            : await favorite.like(authorId, recipeId);
        return json({ status: 200 });
    }
    return json(
        { error: "Recipe id and author id should be string" },
        { status: 500 }
    );

    // switch (method) {
    //     case "post": {
    //         //bloc de code
    //     }
    //     case "patch": {
    //         // bloc de code
    //     }
    //     case "delete": {
    //         // bloc de code
    //     }
    //     default: {
    //         return json({ error: 'Invalid method' })
    //         throw new Error('Invalid method')
    //     }

    // }
}
